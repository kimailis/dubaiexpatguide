
import fs from 'fs';
import translate from 'translate';

// You need to set engine to google
translate.engine = 'google';

const langs = ['de', 'es', 'fr', 'ru'];

async function translateObject(obj, targetLang) {
  if (typeof obj === 'string') {
    // Only translate if it looks like a natural string, maybe skip URLs
    if (obj.startsWith('http') || obj.length < 3 || obj.match(/^[0-9a-zA-Z-\_]+$/)) return obj;
    try {
      const res = await translate(obj, { to: targetLang, from: 'en' });
      return res;
    } catch(e) { return obj; }
  }
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, targetLang)));
  }
  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      if (['id', 'icon', 'iconPath', 'colorTheme', 'url', 'careerUrl'].includes(key)) {
        result[key] = val; // skip translation
      } else {
        result[key] = await translateObject(val, targetLang);
      }
    }
    return result;
  }
  return obj;
}

async function run() {
  const enData = JSON.parse(fs.readFileSync('src/locales/en/data.json', 'utf8'));
  const enGuide = JSON.parse(fs.readFileSync('src/locales/en/guide.json', 'utf8'));

  for (const lang of langs) {
    console.log('Translating', lang);
    const transData = await translateObject(enData, lang);
    fs.writeFileSync('src/locales/' + lang + '/data.json', JSON.stringify(transData, null, 2));

    const transGuide = await translateObject(enGuide, lang);
    fs.writeFileSync('src/locales/' + lang + '/guide.json', JSON.stringify(transGuide, null, 2));
    console.log('Done', lang);
  }
}
run().catch(console.error);
