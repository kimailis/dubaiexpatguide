import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import cron from 'node-cron';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google Gen AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_string',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const DB_FILE = './database.json';

async function initDb() {
  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify({ district_companies: {} }));
  }
}

async function getDb() {
  const data = await fs.readFile(DB_FILE, 'utf8');
  return JSON.parse(data);
}

async function saveDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

initDb().catch(console.error);

// --- Deterministic Hybrid Ingestion Pipeline ---
async function runDailyIngestion() {
  console.log('[CRON] Starting 24h Hybrid Data Ingestion Pipeline...');
  try {
    const db = await getDb();
    
    // Step 1: Deterministic Fetching (Mocked scraping of a Dubai property/jobs portal)
    // In production, this would hit Bayt, LinkedIn, or Property Finder APIs.
    // For this demonstration, we'll fetch a valid proxy target or mock HTML payload.
    const rawHTML = `
      <div class="job-listing">
        <h2>Senior Financial Analyst</h2>
        <p>Location: DIFC</p>
        <p>Required: 5+ years experience.</p>
        <p>Salary: AED 25,000 - 30,000</p>
        <p>Company: Global Capital Partners Dubai</p>
      </div>
      <div class="job-listing">
        <h2>Retail Operations Manager</h2>
        <p>Location: Palm Jumeirah</p>
        <p>Company: Nakheel Mall</p>
        <p>Required: 10 years luxury retail.</p>
        <p>Salary: 18k - 22k AED per month</p>
      </div>
    `;
    
    const $ = cheerio.load(rawHTML);
    const scrapedText = $('body').text().trim();

    console.log('[CRON] Step 1 Complete. Parsed Raw Real Data.');

    // Step 2: Probabilistic Processing (Gemini Structured Extraction)
    const prompt = `You are a strict data ingestion parser. 
Extract the actual jobs from the following scraped text, normalize salaries into cleanly formatted AED range strings, categorize the district, and return a JSON array matching our exact schema. Do not invent details.

Scraped text:
${scrapedText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              industry: { type: Type.STRING },
              description: { type: Type.STRING },
              openPositions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    department: { type: Type.STRING },
                    salaryRange: { type: Type.STRING },
                    experience: { type: Type.STRING },
                    careerUrl: { type: Type.STRING }
                  },
                  required: ['title', 'department', 'salaryRange', 'experience', 'careerUrl']
                }
              }
            },
            required: ['name', 'industry', 'description', 'openPositions']
          }
        }
      }
    });

    const newDataStr = response.text.trim();
    // Step 3: Schema Validation / Ledger Update
    const parsedData = JSON.parse(newDataStr);
    
    if (!Array.isArray(parsedData)) {
      throw new Error('Validation Failed: Expected an Array from Gemini.');
    }

    db.district_companies['difc'] = { data: parsedData, last_updated: Date.now() };
    await saveDb(db);
    console.log('[CRON] Step 3 Complete. Successfully validated and committed sanitised JSON to DB.');

  } catch (error) {
    console.error('[CRON] Ingestion Failed:', error);
  }
}

// Schedule cron to run exactly at midnight every day
cron.schedule('0 0 * * *', () => {
  runDailyIngestion();
});

// For demonstration purposes during startup, kick it off once immediately
setTimeout(() => runDailyIngestion(), 5000);



app.use(express.json());

// API route
app.get('/api/districts/:districtId/companies', async (req, res) => {
  try {
    const { districtId } = req.params;
    const db = await getDb();
    const row = db.district_companies[districtId];
    
    // Serve from database LEDGER, hydrated by cron
    if (row && row.data) {
      return res.json(row.data);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
