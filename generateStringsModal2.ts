import fs from 'fs';
import translate from 'translate';

translate.engine = 'google';

const uiExtra = {
  // DistrictModal
  "modal_district_overview": "District Overview",
  "modal_tax_code": "Tax & Legal Codes",
  "modal_corporate_hub": "Corporate Hub",
  "modal_apt_rents": "Apartments & Rents",
  "modal_pet_reg": "Pet Regulations",
  "modal_demographics": "Demographics",
  "modal_muni_archive": "Municipal Archives",
  "modal_sector": "Sector:",
  "modal_prim_registers": "Primary Registers",
  "modal_coord_baseline": "Coordinate baseline",
  "modal_official_muni": "OFFICIAL MUNICIPAL REGISTRY",
  "modal_dld_status": "DLD Registry status",
  "modal_q2_archive": "Current Q2 2026 Archive",
  "modal_sector_demo": "Sector Demographics & Living Curation",
  "modal_sights": "Sights & Signature Landmarks",
  "modal_off_dxb": "Official DXB Spotlight Sight",
  "modal_zoning": "Zoning Category",
  "modal_fz_jur": "Free Zone jurisdiction",
  "modal_ml_jur": "Mainland jurisdiction",
  "modal_scenic": "Scenic Setting",
  "modal_lakeside": "Lakeside / Coastal",
  "modal_metro_inland": "Metropolitan / Inland",
  "modal_transit": "Transit Network",
  "modal_metro_red": "Dubai Metro Red Line",
  "modal_tax_profile": "Tax Profile Summary",
  "modal_corp_levy": "Corporate Levy",
  "modal_wage_tax": "Personal Base Wage Taxation",
  "modal_import_duty": "Import Duties Tariff",
  "modal_prim_zoning": "Primary Zoning Rules & Decrees",
  "modal_statute": "Statute #0",
  "modal_reg_zone": "REGISTERED ZONE EMPLOYER",
  "modal_ent_portal": "Enterprise Portal",
  "modal_prim_careers": "Primary Careers in DXB sector",
  "modal_tax_free": "Tax-Free Salaries",
  "modal_no_roles": "No public roles explicitly posted on DLD tracker for this entity currently.",
  "modal_division": "Division:",
  "modal_exp_req": "Experience required:",
  "modal_annual_yield": "Annual Salary Yield",
  "modal_annual_avg": "Annual Average Rental Estimates Benchmark",
  "modal_studio": "Studio Apartment",
  "modal_bed1": "1 Bedroom Suite",
  "modal_bed2": "2 Bedroom Suite",
  "modal_bed3": "3 Bedroom Suite",
  "modal_bed4": "4 Bedroom Suite",
  "modal_yr": "/ yr",
  "modal_curated_live": "Curated Live Properties on Market",
  "modal_baths": "Baths:",
  "modal_size": "Size:",
  "modal_sqft": "SqFt",
  "modal_annual_rent": "Annual Rent",
  "modal_browse": "Browse",
  "modal_pet_friend": "Pet Friendliness Profile",
  "modal_suitability": "Suitability Rating:",
  "modal_unleashed": "Curated Unleashed Dog Parks & Boardwalks",
  "modal_official_decrees": "Official Municipality Decrees & Penalties",
  "modal_socio_eco": "Socio-Economic Demographics",
  "modal_dom_social": "Dominant Social Classes / Nationalities",
  "modal_est_pop": "Estimated Population Distribution",
  "modal_sourced": "Sourced via the Dubai Land Department (DLD) open portal archives. 2026 Sovereign Sector Analytics."
};

const langs = ['de', 'ru'];

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
