export interface Company {
  name: string;
  industry: string;
  description: string;
  openPositions: {
    title: string;
    department: string;
    salaryRange: string;
    experience: string;
    careerUrl: string;
  }[];
}

export interface Car {
  id: string;
  title: string;
  year: number;
  mileageKm: number;
  priceAED: number;
  location: string;
  image: string;
  link: string;
}

export interface Apartment {
  id: string;
  title: string;
  bedrooms: number | 'Studio';
  bathrooms: number;
  sizeSqFt: number;
  priceAED: number;
  locationDetails: string;
  image: string;
  amenities: string[];
  link: string;
}

export interface AverageRent {
  studio: number;
  bed1: number;
  bed2: number;
  bed3: number;
  bed4: number;
}

export interface District {
  id: string;
  name: string;
  arabicName: string;
  tagline: string;
  iconPath: string; // Lucide icon identifier
  colorTheme: string; // tailwind brand gradients/colors
  mapSvgPath: string; // Path or drawing instructions for the interactive map
  polygonCoords?: [number, number][]; // Leaflet LatLng tuples for borders
  mapCenter?: [number, number]; // Leaflet LatLng tuple for label center
  description: string;
  taxSituation: {
    status: string; // e.g., "Free Zone (DIFC Independent)", "Mainland", "Free Zone (DMCC)"
    corporateTax: string;
    personalTax: string;
    customsDuty: string;
    details: string;
  };
  petSituation: {
    friendlyRating: number; // 1 to 5 stars
    allowed: boolean;
    rules: string[];
    details: string;
    bestParks: string[];
  };
  demographics: {
    description: string;
    dominantGroups: string[];
    stats: {
      groupName: string;
      percentage: number;
    }[];
  };
  companies: Company[];
  apartments: Apartment[];
  cars?: Car[];
  avgRent: AverageRent;
  laws: {
    category: string;
    title: string;
    description: string;
  }[];
  bottomNotes: string;
  majorAttractions: string[];
}
