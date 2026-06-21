import express from 'express';
import path from 'path';
import os from 'os';
import fsPromises from 'fs/promises';
import cron from 'node-cron';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { DUBAI_DISTRICTS } from './src/data.ts';
import { EXTENDED_DISTRICTS } from './src/extendedData.ts';
import {
  sanitizeDistrictData,
  fallbackCars,
  type DistrictDynamicData,
} from './src/realLinks.ts';
dotenv.config();

const app = express();
// Production is the default; the Vite dev server is only used when explicitly
// in development. This keeps containerised/hosted runs (Cloud Run, etc.) on the
// static-serving path even when NODE_ENV is not set.
const isDev = process.env.NODE_ENV === 'development';
// Hosting platforms (Cloud Run, Heroku, ...) inject the listen port via PORT.
const PORT = Number(process.env.PORT) || 3000;

// Initialize Google Gen AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || 'dummy_string',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In hosted/production environments the app directory is typically read-only,
// so the cache DB lives in a writable temp dir. Override with DB_FILE if needed.
const DB_FILE = process.env.DB_FILE || (isDev ? './database.json' : path.join(os.tmpdir(), 'dxb-database.json'));
const ONE_DAY = 24 * 60 * 60 * 1000;
const hasApiKey = () => !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'dummy_string';

// Models attempted in order. Both support Google Search grounding so the model
// fetches real, current information instead of inventing it.
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];

const ALL_DISTRICTS = [...DUBAI_DISTRICTS, ...EXTENDED_DISTRICTS];
const DISTRICT_BY_ID = new Map(ALL_DISTRICTS.map((d) => [d.id, d]));

async function initDb() {
  try {
    await fsPromises.access(DB_FILE);
  } catch {
    await fsPromises.writeFile(DB_FILE, JSON.stringify({ district_companies: {} }, null, 2));
  }
}

async function getDb() {
  try {
    const data = await fsPromises.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { district_companies: {} };
  }
}

async function saveDb(data: any) {
  await fsPromises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

initDb().catch(console.error);

// Schema for the structured-output fallback. We intentionally ask the model ONLY
// for descriptive fields — every id, link and image is generated deterministically
// by the sanitiser so the model can never inject a broken URL.
const genSchema = {
  type: Type.OBJECT,
  properties: {
    companies: {
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
              },
              required: ['title', 'department', 'salaryRange', 'experience'],
            },
          },
        },
        required: ['name', 'industry', 'description', 'openPositions'],
      },
    },
    apartments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          bedrooms: { type: Type.STRING },
          bathrooms: { type: Type.NUMBER },
          sizeSqFt: { type: Type.NUMBER },
          priceAED: { type: Type.NUMBER },
          locationDetails: { type: Type.STRING },
          amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title', 'bedrooms', 'bathrooms', 'sizeSqFt', 'priceAED', 'locationDetails', 'amenities'],
      },
    },
    cars: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          year: { type: Type.NUMBER },
          mileageKm: { type: Type.NUMBER },
          priceAED: { type: Type.NUMBER },
          location: { type: Type.STRING },
        },
        required: ['title', 'year', 'mileageKm', 'priceAED', 'location'],
      },
    },
  },
  required: ['companies', 'apartments', 'cars'],
};

function buildPrompt(districtName: string): string {
  return [
    `You are a Dubai real-estate and jobs data researcher. Using up-to-date, real information,`,
    `produce a realistic current snapshot for the Dubai district "${districtName}".`,
    ``,
    `Return ONLY a JSON object (no markdown fences, no commentary) with this exact shape:`,
    `{`,
    `  "companies": [ { "name": string, "industry": string, "description": string,`,
    `      "openPositions": [ { "title": string, "department": string, "salaryRange": string, "experience": string } ] } ],`,
    `  "apartments": [ { "title": string, "bedrooms": number | "Studio", "bathrooms": number, "sizeSqFt": number,`,
    `      "priceAED": number, "locationDetails": string, "amenities": string[] } ],`,
    `  "cars": [ { "title": string, "year": number, "mileageKm": number, "priceAED": number, "location": string } ]`,
    `}`,
    ``,
    `Rules:`,
    `- Provide exactly 5 companies that genuinely operate in or near ${districtName}, each with 4-6 real-sounding open roles.`,
    `- Prefer real, well-known employers and real building/tower names in the district.`,
    `- Provide 4 apartment rental listings and 4 used-car listings with realistic Dubai AED prices for ${new Date().getFullYear()}.`,
    `- Do NOT include any URLs, image links, or ids — the system generates those.`,
    `- Output must be strictly valid JSON.`,
  ].join('\n');
}

/** Defensively pull a JSON object out of a possibly-fenced / chatty model response. */
function extractJson(text: string | undefined): any {
  if (!text) throw new Error('empty response');
  let t = text.trim();
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) t = fenced[1].trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('no JSON object found');
  return JSON.parse(t.slice(start, end + 1));
}

/**
 * Ask the AI for a real, current snapshot. Tries Google Search grounded
 * generation first (real data), then falls back to structured output. Returns
 * null when no API key is configured or every attempt fails — callers then use
 * the reliable static dataset.
 */
async function generateWithAI(districtName: string): Promise<Partial<DistrictDynamicData> | null> {
  if (!hasApiKey()) return null;
  const prompt = buildPrompt(districtName);

  // 1) Grounded generation — pulls actual, current web data.
  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { tools: [{ googleSearch: {} }], temperature: 0.4 },
      });
      return extractJson(response.text);
    } catch (err) {
      console.warn(`[AI] grounded ${model} failed:`, (err as Error).message);
    }
  }

  // 2) Structured-output fallback (no grounding) for environments where the
  //    search tool is unavailable.
  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json', responseSchema: genSchema },
      });
      return JSON.parse((response.text || '').trim());
    } catch (err) {
      console.warn(`[AI] structured ${model} failed:`, (err as Error).message);
    }
  }

  return null;
}

/**
 * Reliable, curated baseline for a district with every link/image guaranteed real.
 * This is what we show whenever AI is unavailable or returns nothing usable.
 */
function staticFallback(districtId: string): DistrictDynamicData {
  const d = DISTRICT_BY_ID.get(districtId);
  const data = sanitizeDistrictData(districtId, {
    companies: d?.companies ?? [],
    apartments: d?.apartments ?? [],
    cars: d?.cars ?? [],
  });
  if (data.cars.length === 0) data.cars = fallbackCars(districtId);
  return data;
}

/**
 * Core data resolver: serves fresh cached data, otherwise refreshes via grounded
 * AI, and ALWAYS guarantees a non-empty, real-linked result by backfilling any
 * missing section from the curated static dataset. Only genuine AI results are
 * persisted, so a missing API key never poisons the cache.
 */
async function getDistrictData(
  districtId: string,
  districtName: string,
  force = false,
): Promise<{ data: DistrictDynamicData; source: string }> {
  const fallback = staticFallback(districtId);
  const db = await getDb();
  const row = db.district_companies?.[districtId];
  const now = Date.now();

  // Serve fresh cache (re-sanitised to upgrade any legacy/over-trusting rows).
  if (!force && row?.data && now - (row.last_updated || 0) < ONE_DAY) {
    const cached = sanitizeDistrictData(districtId, row.data);
    if (cached.companies.length) {
      return {
        data: {
          companies: cached.companies,
          apartments: cached.apartments.length ? cached.apartments : fallback.apartments,
          cars: cached.cars.length ? cached.cars : fallback.cars,
        },
        source: 'cache',
      };
    }
  }

  // Refresh from grounded AI, sanitising and backfilling for reliability.
  const ai = await generateWithAI(districtName);
  if (ai) {
    const clean = sanitizeDistrictData(districtId, ai);
    const data: DistrictDynamicData = {
      companies: clean.companies.length ? clean.companies : fallback.companies,
      apartments: clean.apartments.length ? clean.apartments : fallback.apartments,
      cars: clean.cars.length ? clean.cars : fallback.cars,
    };
    db.district_companies = db.district_companies || {};
    db.district_companies[districtId] = { data, last_updated: now };
    await saveDb(db).catch((e) => console.error('[DB] save failed:', e));
    return { data, source: 'ai' };
  }

  // No AI available — reliable curated data. Not persisted so AI can take over
  // immediately once a key is configured.
  return { data: fallback, source: 'static' };
}

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, aiEnabled: hasApiKey(), districts: ALL_DISTRICTS.length });
});

app.get('/api/districts/:districtId/data', async (req, res) => {
  const { districtId } = req.params;
  try {
    const districtName =
      (req.query.districtName as string) || DISTRICT_BY_ID.get(districtId)?.name || districtId;
    const force = req.query.refresh === '1' || req.query.refresh === 'true';

    const { data, source } = await getDistrictData(districtId, districtName, force);
    res.setHeader('X-Data-Source', source);
    res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    // Never fail the UI: always return reliable, real-linked static data.
    try {
      res.setHeader('X-Data-Source', 'static-error');
      res.json(staticFallback(districtId));
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// --- Daily real-data refresh across every district ---
async function runDailyIngestion() {
  if (!hasApiKey()) {
    console.log('[CRON] Skipped daily refresh: GEMINI_API_KEY not configured.');
    return;
  }
  console.log('[CRON] Starting daily real-data refresh for all districts...');
  for (const d of ALL_DISTRICTS) {
    try {
      const { source } = await getDistrictData(d.id, d.name, true);
      console.log(`[CRON] ${d.id}: ${source}`);
    } catch (err) {
      console.error(`[CRON] ${d.id} failed:`, (err as Error).message);
    }
  }
  console.log('[CRON] Daily refresh complete.');
}

cron.schedule('0 3 * * *', () => {
  runDailyIngestion();
});

async function startServer() {
  if (isDev) {
    // Dynamic import so vite is never loaded on the production path.
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
