
import fs from 'fs';
import translate from 'translate';
import { DUBAI_DISTRICTS } from './src/data.js';
import { EXTENDED_DISTRICTS } from './src/extendedData.js';
import { EXPAT_GUIDES } from './src/guideData.js';

translate.engine = 'google';

const langs = ['en', 'de', 'es', 'fr', 'ru'];
const allDistricts = [...DUBAI_DISTRICTS, ...EXTENDED_DISTRICTS];

async function run() {
  for (const lang of langs) {
    if (lang === 'en') {
      fs.writeFileSync(`src/locales/en/data.json`, JSON.stringify(allDistricts, null, 2));
      fs.writeFileSync(`src/locales/en/guide.json`, JSON.stringify(EXPAT_GUIDES, null, 2));
      continue;
    }

    console.log('Translating to', lang);
    const distDataStr = JSON.stringify(allDistricts);
    const guideDataStr = JSON.stringify(EXPAT_GUIDES);
    
    // We can't translate pure JSON seamlessly with just translate package because it translates keys and syntax too.
    // So we'll just write a quick Gemini call to do bulk translation for each lang!
  }
}
run();
