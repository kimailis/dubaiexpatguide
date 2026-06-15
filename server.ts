import express from 'express';
import path from 'path';
import fs from 'fs/promises';
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

app.use(express.json());

// API route
app.get('/api/districts/:districtId/companies', async (req, res) => {
  try {
    const { districtId } = req.params;
    const { districtName } = req.query; 
    
    const db = await getDb();
    const row = db.district_companies[districtId];
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (row && (now - row.last_updated) < ONE_DAY) {
      return res.json(row.data);
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is missing' });
    }

    const dName = districtName || districtId;
    const prompt = `Generate 5 realistic corporate companies and exactly 1 open job position within EACH of those companies, located in the Dubai district: ${dName}.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
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
    const newData = JSON.parse(newDataStr);

    db.district_companies[districtId] = {
      data: newData,
      last_updated: now
    };
    await saveDb(db);

    res.json(newData);

  } catch (error) {
    console.error('Error generating companies:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
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
