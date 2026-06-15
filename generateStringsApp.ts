import fs from 'fs';
import translate from 'translate';

translate.engine = 'google';

const uiExtra = {
  // App.tsx
  "app_essential_guides": "Essential Expat Guides",
  "app_copyright": "© 2026 Dubai Expat Guide. All rights reserved.",
  "app_accessibility": "Accessibility Policy",
  "app_privacy": "Legal & Privacy Policy",
  "app_tax_guidelines": "Official Tax Guidelines",
  "app_land_register": "Land Register Portal",
  "app_corp_licensing": "Corporate Licensing",
  "app_contact": "Contact Us"
};

const langs = ['fr', 'es', 'de', 'ru'];

async function translateObject(obj: any, lang: string): Promise<any> {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      res[key] = await translate(obj[key], {to: lang});
    }
    return res;
}

async function run() {
  for (const lang of langs) {
    console.log("Translating modal strings to", lang);
    const translatedUiExtra = await translateObject(uiExtra, lang);
    let existingUi = {};
    try { existingUi = JSON.parse(fs.readFileSync(`./src/locales/${lang}/ui.json`, 'utf8')); } catch(e) {}
    fs.writeFileSync(`./src/locales/${lang}/ui.json`, JSON.stringify({...existingUi, ...translatedUiExtra}, null, 2));
  }
  
  let existingEnUi = {};
  try { existingEnUi = JSON.parse(fs.readFileSync(`./src/locales/en/ui.json`, 'utf8')); } catch(e) {}
  fs.writeFileSync(`./src/locales/en/ui.json`, JSON.stringify({...existingEnUi, ...uiExtra}, null, 2));
}

run().catch(console.error);
