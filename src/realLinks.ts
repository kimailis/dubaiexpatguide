import type { Company, Apartment, Car } from './types';

/**
 * Real-link & data-reliability layer.
 *
 * The single most important rule in this file: **we never trust an LLM (or any
 * generated source) to produce a working URL or image.** Generated content is
 * great for descriptive text (company blurbs, job titles, realistic prices) but
 * routinely hallucinates URLs that 404. So every link a user can click and every
 * image we render is (re)built here deterministically and points at a real,
 * resolvable destination on a live marketplace.
 */

export interface DistrictDynamicData {
  companies: Company[];
  apartments: Apartment[];
  cars: Car[];
}

interface DistrictMarketRef {
  /** Location slug used in real Bayut / Dubizzle marketplace URLs. */
  slug: string;
  /** Human-readable location, used as free-text search query / display. */
  query: string;
}

/**
 * Maps every known district id to the location slug used by real Dubai property
 * marketplaces. Slugs follow Bayut's stable, SEO-driven URL scheme. Unknown
 * districts fall back to the (always-valid) Dubai-wide page via DUBAI_RENT_FALLBACK.
 */
export const DISTRICT_MARKET: Record<string, DistrictMarketRef> = {
  difc: { slug: 'difc', query: 'DIFC, Dubai' },
  downtown: { slug: 'downtown-dubai', query: 'Downtown Dubai' },
  marina: { slug: 'dubai-marina', query: 'Dubai Marina' },
  jlt: { slug: 'jlt', query: 'Jumeirah Lake Towers (JLT)' },
  'internet-city': { slug: 'barsha-heights-tecom', query: 'Dubai Internet City / TECOM' },
  'silicon-oasis': { slug: 'dubai-silicon-oasis', query: 'Dubai Silicon Oasis' },
  'business-bay': { slug: 'business-bay', query: 'Business Bay, Dubai' },
  'palm-jumeirah': { slug: 'palm-jumeirah', query: 'Palm Jumeirah, Dubai' },
  jvc: { slug: 'jvc', query: 'Jumeirah Village Circle (JVC)' },
  'al-quoz': { slug: 'al-quoz', query: 'Al Quoz, Dubai' },
  'dubai-hills': { slug: 'dubai-hills-estate', query: 'Dubai Hills Estate' },
  'discovery-gardens': { slug: 'discovery-gardens', query: 'Discovery Gardens, Dubai' },
  'al-barsha': { slug: 'al-barsha', query: 'Al Barsha, Dubai' },
  deira: { slug: 'deira', query: 'Deira, Dubai' },
};

const BAYUT = 'https://www.bayut.com';
const DUBAI_RENT_FALLBACK = `${BAYUT}/to-rent/apartments/dubai/`;
const DUBIZZLE_MOTORS = 'https://dubai.dubizzle.com/motors/used-cars/';

/** Real, resolvable Bayut search for apartments to rent in the given district. */
export function rentLink(districtId: string, bedrooms?: number | 'Studio'): string {
  const ref = DISTRICT_MARKET[districtId];
  if (!ref) return DUBAI_RENT_FALLBACK;
  const base = `${BAYUT}/to-rent/apartments/dubai/${ref.slug}/`;
  // Bayut accepts a beds filter via query string; Studio == 0.
  if (bedrooms === 'Studio') return `${base}?beds[]=0`;
  if (typeof bedrooms === 'number' && bedrooms > 0) return `${base}?beds[]=${bedrooms}`;
  return base;
}

/** Real, resolvable Dubizzle Motors search for used cars (optionally by make). */
export function carsLink(make?: string): string {
  if (make && make.trim()) return `${DUBIZZLE_MOTORS}?keywords=${encodeURIComponent(make.trim())}`;
  return DUBIZZLE_MOTORS;
}

/**
 * Real career destinations for well-known employers that actually operate in
 * Dubai. Matched by substring against a normalised company name, so e.g.
 * "Goldman Sachs MEA" resolves to the Goldman Sachs careers site.
 */
const KNOWN_COMPANY_CAREERS: Record<string, string> = {
  'goldman sachs': 'https://www.goldmansachs.com/careers/',
  binance: 'https://www.binance.com/en/careers',
  millennium: 'https://www.mlp.com/careers/',
  'standard chartered': 'https://www.sc.com/en/careers/',
  'franklin templeton': 'https://www.franklintempleton.com/about-us/careers',
  emaar: 'https://www.emaar.com/en/careers/',
  noon: 'https://careers.noon.com/',
  careem: 'https://www.careem.com/careers/',
  mckinsey: 'https://www.mckinsey.com/careers/search-jobs',
  oracle: 'https://careers.oracle.com/',
  bybit: 'https://www.bybit.com/en/careers',
  'property finder': 'https://www.propertyfinder.ae/en/careers',
  dubizzle: 'https://dubizzle.bamboohr.com/careers',
  yalla: 'https://www.yallatech.ae/careers',
  deliveroo: 'https://careers.deliveroo.co.uk/',
  dmcc: 'https://www.dmcc.ae/careers',
  instashop: 'https://instashop.com/en/careers',
  hikvision: 'https://www.hikvision.com/en/about/Join-Us/',
};

/**
 * Returns a real, working link for a job: the employer's actual careers page
 * when the company is recognised, otherwise a live LinkedIn Jobs search scoped
 * to the role and Dubai (always resolves to real, current postings).
 */
export function jobsLink(company: string, title: string): string {
  const norm = (company || '').toLowerCase().trim();
  for (const key of Object.keys(KNOWN_COMPANY_CAREERS)) {
    if (norm.includes(key)) return KNOWN_COMPANY_CAREERS[key];
  }
  const keywords = encodeURIComponent([company, title].filter(Boolean).join(' ').trim() || 'jobs');
  return `https://www.linkedin.com/jobs/search/?keywords=${keywords}&location=Dubai%2C%20United%20Arab%20Emirates`;
}

/**
 * Vetted pools of real Unsplash photographs. Generated data frequently invents
 * Unsplash photo ids that resolve to 404s, so any rendered image is pinned to
 * one of these known-good URLs. (The UI also has an onError fallback as a final
 * safety net.)
 */
const APARTMENT_IMAGES = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop',
];

const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop',
];

/** Deterministic, stable image picker so a given listing always shows the same photo. */
export function apartmentImage(index: number): string {
  return APARTMENT_IMAGES[Math.abs(index) % APARTMENT_IMAGES.length];
}

export function carImage(index: number): string {
  return CAR_IMAGES[Math.abs(index) % CAR_IMAGES.length];
}

/** Last-resort image fallback (used by the UI onError). picsum always returns an image. */
export function placeholderImage(seed: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/400`;
}

const isNonEmptyString = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const isFiniteNumber = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);

function sanitizeCompany(c: Company): Company {
  const positions = Array.isArray(c.openPositions) ? c.openPositions : [];
  return {
    name: c.name,
    industry: isNonEmptyString(c.industry) ? c.industry : 'Corporate Services',
    description: isNonEmptyString(c.description) ? c.description : '',
    openPositions: positions
      .filter((p) => p && isNonEmptyString(p.title))
      .map((p) => ({
        title: p.title,
        department: isNonEmptyString(p.department) ? p.department : 'General',
        salaryRange: isNonEmptyString(p.salaryRange) ? p.salaryRange : 'Competitive (AED)',
        experience: isNonEmptyString(p.experience) ? p.experience : 'See listing',
        // Always a real, resolvable destination — never the generated URL.
        careerUrl: jobsLink(c.name, p.title),
      })),
  };
}

function sanitizeApartment(districtId: string, a: Apartment, index: number): Apartment {
  return {
    id: isNonEmptyString(a.id) ? a.id : `${districtId}-apt-${index + 1}`,
    title: a.title,
    bedrooms: a.bedrooms === 'Studio' || isFiniteNumber(a.bedrooms) ? a.bedrooms : 1,
    bathrooms: isFiniteNumber(a.bathrooms) ? a.bathrooms : 1,
    sizeSqFt: isFiniteNumber(a.sizeSqFt) ? a.sizeSqFt : 0,
    priceAED: a.priceAED,
    locationDetails: isNonEmptyString(a.locationDetails) ? a.locationDetails : DISTRICT_MARKET[districtId]?.query || 'Dubai',
    image: apartmentImage(index),
    amenities: Array.isArray(a.amenities) ? a.amenities.filter(isNonEmptyString) : [],
    link: rentLink(districtId, a.bedrooms),
  };
}

/** Best-effort extraction of a car make from a free-text title (e.g. "2022 Nissan Patrol" -> "Nissan"). */
const CAR_MAKES = [
  'Toyota', 'Nissan', 'Mercedes-Benz', 'Mercedes', 'BMW', 'Audi', 'Lexus', 'Land Rover', 'Range Rover',
  'Porsche', 'Ferrari', 'Lamborghini', 'Bentley', 'Rolls-Royce', 'Ford', 'Chevrolet', 'Honda',
  'Hyundai', 'Kia', 'Mitsubishi', 'Jeep', 'Cadillac', 'GMC', 'Volkswagen', 'Tesla', 'Maserati',
];

function makeFromTitle(title: string): string | undefined {
  if (!isNonEmptyString(title)) return undefined;
  const lower = title.toLowerCase();
  return CAR_MAKES.find((m) => lower.includes(m.toLowerCase()));
}

function sanitizeCar(districtId: string, c: Car, index: number): Car {
  return {
    id: isNonEmptyString(c.id) ? c.id : `${districtId}-car-${index + 1}`,
    title: c.title,
    year: isFiniteNumber(c.year) ? c.year : new Date().getFullYear() - 1,
    mileageKm: isFiniteNumber(c.mileageKm) ? c.mileageKm : 0,
    priceAED: c.priceAED,
    location: isNonEmptyString(c.location) ? c.location : DISTRICT_MARKET[districtId]?.query || 'Dubai',
    image: carImage(index),
    link: carsLink(makeFromTitle(c.title)),
  };
}

/**
 * Takes raw data from ANY source (LLM output, legacy DB rows, static seed data)
 * and returns a clean, reliable shape where every link/image is guaranteed real.
 * Invalid records (missing the descriptive essentials) are dropped rather than
 * shown with placeholder garbage.
 */
export function sanitizeDistrictData(
  districtId: string,
  raw: Partial<DistrictDynamicData> | Company[] | null | undefined,
): DistrictDynamicData {
  let companies: Company[] = [];
  let apartments: Apartment[] = [];
  let cars: Car[] = [];

  if (Array.isArray(raw)) {
    // Legacy DB format: a bare array of companies.
    companies = raw as Company[];
  } else if (raw && typeof raw === 'object') {
    companies = Array.isArray(raw.companies) ? raw.companies : [];
    apartments = Array.isArray(raw.apartments) ? raw.apartments : [];
    cars = Array.isArray(raw.cars) ? raw.cars : [];
  }

  return {
    companies: companies
      .filter((c) => c && isNonEmptyString(c.name) && Array.isArray(c.openPositions))
      .map(sanitizeCompany),
    apartments: apartments
      .filter((a) => a && isNonEmptyString(a.title) && isFiniteNumber(a.priceAED))
      .map((a, i) => sanitizeApartment(districtId, a, i)),
    cars: cars
      .filter((c) => c && isNonEmptyString(c.title) && isFiniteNumber(c.priceAED))
      .map((c, i) => sanitizeCar(districtId, c, i)),
  };
}

/**
 * Deterministic, realistic used-car listings with real Dubizzle links. The
 * static dataset has no cars, so this guarantees the Cars tab is populated with
 * reliable, clickable listings even when the AI layer is unavailable.
 */
const CAR_TEMPLATES: { make: string; model: string; year: number; mileageKm: number; priceAED: number }[] = [
  { make: 'Toyota', model: 'Land Cruiser VXR', year: 2022, mileageKm: 41000, priceAED: 285000 },
  { make: 'Nissan', model: 'Patrol Platinum', year: 2021, mileageKm: 58000, priceAED: 215000 },
  { make: 'Mercedes-Benz', model: 'G 63 AMG', year: 2021, mileageKm: 32000, priceAED: 695000 },
  { make: 'BMW', model: 'X5 xDrive40i', year: 2022, mileageKm: 36000, priceAED: 245000 },
  { make: 'Lexus', model: 'LX 570', year: 2020, mileageKm: 72000, priceAED: 320000 },
  { make: 'Range Rover', model: 'Sport HSE', year: 2021, mileageKm: 49000, priceAED: 365000 },
];

export function fallbackCars(districtId: string): Car[] {
  const location = DISTRICT_MARKET[districtId]?.query || 'Dubai';
  return CAR_TEMPLATES.map((t, i) => ({
    id: `${districtId}-car-${i + 1}`,
    title: `${t.year} ${t.make} ${t.model}`,
    year: t.year,
    mileageKm: t.mileageKm,
    priceAED: t.priceAED,
    location,
    image: carImage(i),
    link: carsLink(t.make),
  }));
}
