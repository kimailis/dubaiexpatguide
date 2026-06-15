import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';
import { DUBAI_DISTRICTS } from './src/data.ts';
import { EXTENDED_DISTRICTS } from './src/extendedData.ts';
import { EXPAT_GUIDES } from './src/guideData.ts';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

const langs = ['de', 'es', 'fr', 'ru'];
const allDistricts = [...DUBAI_DISTRICTS, ...EXTENDED_DISTRICTS];

async function run() {
  fs.writeFileSync('src/locales/en/data.json', JSON.stringify(allDistricts, null, 2));
  fs.writeFileSync('src/locales/en/guide.json', JSON.stringify(EXPAT_GUIDES, null, 2));

  const enDataChunk1 = JSON.stringify(allDistricts.slice(0, 7), null, 2);
  const enDataChunk2 = JSON.stringify(allDistricts.slice(7), null, 2);
  const enGuide = JSON.stringify(EXPAT_GUIDES, null, 2);

  for (const lang of langs) {
    console.log('Translating to', lang);
    try {
      const p1 = 'Translate this JSON array to ' + lang + '. Output JSON only. KEEP KEYS ENGLISH.\n' + enDataChunk1;
      const dataRes1 = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: p1,
        config: { responseMimeType: 'application/json' }
      });

      const p2 = 'Translate this JSON array to ' + lang + '. Output JSON only. KEEP KEYS ENGLISH.\n' + enDataChunk2;
      const dataRes2 = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: p2,
        config: { responseMimeType: 'application/json' }
      });

      const combined = [...JSON.parse(dataRes1.text), ...JSON.parse(dataRes2.text)];
      fs.writeFileSync('src/locales/' + lang + '/data.json', JSON.stringify(combined, null, 2));

      const p3 = 'Translate this JSON array to ' + lang + '. Output JSON only. KEEP KEYS ENGLISH.\n' + enGuide;
      const guideRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: p3,
        config: { responseMimeType: 'application/json' }
      });
      fs.writeFileSync('src/locales/' + lang + '/guide.json', guideRes.text.trim());
      console.log('Done', lang);
    } catch(e) {
      console.error('Error on', lang, e);
    }
  }
}
run();
