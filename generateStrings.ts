import fs from 'fs';
import translate from 'translate';
import { EXPAT_GUIDES } from './src/guideData';

translate.engine = 'google';

const uiExtra = {
  // DistrictMap
  "map_tax_reg": "Tax & Registration",
  "map_click_zone": "Click zone to open ledger",
  "map_carto": "Carto",
  "map_laid": "Laid precisely to Carto scale.",
  "map_pet_friendly": "Pet Friendly",
  "map_key_entities": "Key Entities",
  "map_metro": "Dubai Metro Red Line",
  "map_zoning": "Zoning Category",
  "map_annual_rent": "Annual Rent",
  "map_annual_yield": "Annual Salary Yield",
  "map_browse": "Browse",
  "map_scenic": "Scenic Setting",
  "map_transit": "Transit Network",
  
  // DistrictModal
  "modal_suitability": "Suitability Rating:",
  "modal_tax_free": "Tax-Free Salaries",
  "modal_corporate_levy": "Corporate Levy",
  "modal_import_duties": "Import Duties Tariff",
  "modal_base_wage": "Personal Base Wage Taxation",
  "modal_careers": "Primary Careers in DXB sector",
  "modal_dld": "DLD Registry status",
  "modal_q2": "Current Q2 2026 Archive",
  "modal_coord": "Coordinate baseline",
  
  // GuideModal
  "guide_dld_ref": "DLD Guideline Ref",
  "guide_status": "Guideline status",
  "guide_verified": "Verified Q2 2026",
  "guide_close_article": "Close Article Viewer",
  
  // Footer
  "footer_comprehensive": "A Comprehensive Guide to Living & Working in Dubai",
  "footer_terms": "Terms & Conditions",
  "footer_privacy": "Privacy Policy",
  "footer_guide_btn": "Relocation Guide",
  "footer_tax_btn": "Tax & Setup Legalities",
  "footer_disclaimer": "This system is a comprehensive resource provided for directional information.",

  // FooterModal Text
  "tab_privacy": "Privacy Policy",
  "tab_tcs": "Terms & Conditions",
  "tab_tax": "Taxation & Structuring",
  "tab_accessibility": "Accessibility Statement"
};

const footerModalText = {
  "footer_privacy_body": "This platform is an informational directory. We respect your privacy definitively. We do not collect, store, or process any personal user data. We do not use tracking cookies, analytics engines, or external marketing telemetry.",
  "footer_privacy_contact": "We will be happy to contact you or assist with any inquiries regarding expat life, property sourcing, or corporate setups in Dubai.",
  "footer_tcs_body": "The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website. Through this website, you are able to link to other websites which are not under the control of Dubai Expat Guide. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.",
  "footer_tax_intro": "The UAE implements a modern, transparent tax framework designed to foster long-term corporate growth while maintaining a tax-free personal income environment for expats.",
  "footer_tax_1": "1. Personal Income Tax (0%)",
  "footer_tax_1_body": "Dubai residents and expats pay 0% personal income tax. Salaries, capital gains from personal investments, and residential real estate returns are entirely tax-free for individuals holding a valid UAE residency visa.",
  "footer_tax_2": "2. Corporate Tax (9%)",
  "footer_tax_2_body": "Introduced in June 2023, the UAE Federal Corporate Tax sits at a highly competitive baseline of 9% on net profits exceeding AED 375,000.",
  "footer_tax_2_b1": "0% Rate: Applies to taxable income up to AED 375,000 to support small businesses and startups.",
  "footer_tax_2_b2": "Free Zone Relief: Qualifying Free Zone Persons can continue to benefit from 0% corporate tax if their income is derived from 'Qualifying Activities' and they maintain adequate substance in the UAE.",
  "footer_tax_3": "3. Value Added Tax (VAT - 5%)",
  "footer_tax_3_body": "A standard VAT of 5% applies to most goods and services. Certain sectors (like residential real estate, basic healthcare, and education) are zero-rated or exempt. Mandatory VAT registration is required for businesses with annual taxable supplies exceeding AED 375,000.",
  "footer_setup_intro": "Dubai offers two primary jurisdictions for corporate structuring: Mainland and Free Zone. Each serves distinct operational goals.",
  "footer_setup_mainland": "Mainland (DED)",
  "footer_setup_mainland_body": "Regulated by the Department of Economy and Tourism (DET), Mainland companies can trade directly anywhere in the UAE market without restrictions. Recent legal changes allow 100% foreign ownership for most commercial and industrial activities.",
  "footer_setup_freezone": "Free Zones",
  "footer_setup_freezone_body": "Free zones (e.g., DMCC, DIFC, JAFZA) cater specifically to international business, offering 100% foreign ownership without DET intervention, dedicated infrastructure, and industry-specific networking. However, to trade physical goods locally, a local distributor is usually needed.",
  "footer_setup_steps": "Key Steps",
  "footer_setup_s1": "Select business activity & jurisdiction.",
  "footer_setup_s2": "Register trade name & apply for initial approval.",
  "footer_setup_s3": "Draft Memorandum of Association (MOA).",
  "footer_setup_s4": "Lease an office space (Ejari) or flexible desk.",
  "footer_setup_s5": "Pay fees & collect the Trade License.",
  "footer_setup_rera": "The Real Estate Regulatory Agency (RERA)",
  "footer_setup_rera_body": "Operating under the DLD, RERA sets policies, regulates the market, and licenses real estate agents (who must carry a valid RERA ID), ensuring consumer protection.",
  "footer_setup_dld": "Dubai Land Department (DLD)",
  "footer_setup_dld_body": "The Dubai Land Department (DLD) provides a highly digitized, secure, and transparent registry system for all real estate transactions across the Emirate.",
  "footer_setup_dld_b1": "Title Deed: The official proof of ownership for completed (ready) properties.",
  "footer_setup_dld_b2": "Oqood: The official registration for off-plan properties (under construction) to secure buyer rights.",
  "footer_accessibility_body": "Dubai Expat Guide is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.",
  "footer_accessibility_measures": "Measures to support accessibility",
  "footer_accessibility_m1": "Integrating accessibility into our procurement practices.",
  "footer_accessibility_m2": "Providing continual accessibility training for our staff.",
  "footer_accessibility_m3": "Including accessibility throughout our internal policies.",
  "footer_accessibility_m4": "Adopting high-contrast, scalable visual representations.",
  "footer_accessibility_contact": "If you experience any difficulty accessing our content, please send us a message via our Contact Us channel, and we will work to provide you with the information you need in a suitable format."
};

Object.assign(uiExtra, footerModalText);

const guideDataEnglish = EXPAT_GUIDES;
const langs = ['ru', 'de', 'fr', 'es'];

async function translateObject(obj: any, lang: string): Promise<any> {
  if (typeof obj === 'string') {
    return await translate(obj, { to: lang });
  } else if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, lang)));
  } else if (typeof obj === 'object' && obj !== null) {
    const res: any = {};
    for (const key of Object.keys(obj)) {
      if (['icon', 'id', 'imageUrl', 'address', 'link'].includes(key)) {
        if (key === 'link' && obj[key] && obj[key].text) {
          res[key] = { text: await translate(obj[key].text, {to: lang}), url: obj[key].url };
        } else {
          res[key] = obj[key]; // Do not translate IDs or URLs or icons
        }
      } else {
        res[key] = await translateObject(obj[key], lang);
      }
    }
    return res;
  }
  return obj;
}

async function run() {
  for (const lang of langs) {
    console.log("Translating extra ui strings to", lang);
    const translatedUiExtra = await translateObject(uiExtra, lang);
    let existingUi = {};
    try { existingUi = JSON.parse(fs.readFileSync(`./src/locales/${lang}/ui.json`, 'utf8')); } catch(e) {}
    fs.writeFileSync(`./src/locales/${lang}/ui.json`, JSON.stringify({...existingUi, ...translatedUiExtra}, null, 2));
    
    console.log("Translating guide data to", lang);
    const translatedGuide = await translateObject(guideDataEnglish, lang);
    fs.writeFileSync(`./src/locales/${lang}/guide.json`, JSON.stringify(translatedGuide, null, 2));
  }
  
  fs.writeFileSync(`./src/locales/en/guide.json`, JSON.stringify(guideDataEnglish, null, 2));
  
  let existingEnUi = {};
  try { existingEnUi = JSON.parse(fs.readFileSync(`./src/locales/en/ui.json`, 'utf8')); } catch(e) {}
  fs.writeFileSync(`./src/locales/en/ui.json`, JSON.stringify({...existingEnUi, ...uiExtra}, null, 2));
  
}

run().catch(console.error);
