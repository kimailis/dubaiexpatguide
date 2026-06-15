import React, { useState } from 'react';
import { DUBAI_DISTRICTS } from './data';
import { EXTENDED_DISTRICTS } from './extendedData';
import { District } from './types';
import DistrictMap from './components/DistrictMap';
import DistrictModal from './components/DistrictModal';
import { EXPAT_GUIDES, GuideArticle } from './guideData';
import GuideModal from './components/GuideModal';
import {
  Compass,
  MapPin,
  ChevronRight,
  Search,
  Building,
  Scale,
  Coins,
  HeartPulse,
  GraduationCap,
  Car,
  Home,
  Lightbulb,
  ShoppingBag
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

const ALL_DISTRICTS = [...DUBAI_DISTRICTS, ...EXTENDED_DISTRICTS];

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-5 h-5 text-[#BFA57A]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#BFA57A]" />,
  Car: <Car className="w-5 h-5 text-[#BFA57A]" />,
  Home: <Home className="w-5 h-5 text-[#BFA57A]" />,
  Scale: <Scale className="w-5 h-5 text-[#BFA57A]" />,
  Lightbulb: <Lightbulb className="w-5 h-5 text-[#BFA57A]" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-[#BFA57A]" />,
};

export default function App() {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering districts based on search queried properties
  const filteredDistricts = ALL_DISTRICTS.filter((d) => {
    const rawSearch = searchQuery.toLowerCase();
    return (
      d.name.toLowerCase().includes(rawSearch) ||
      d.tagline.toLowerCase().includes(rawSearch) ||
      d.description.toLowerCase().includes(rawSearch) ||
      d.companies.some((c) => c.name.toLowerCase().includes(rawSearch))
    );
  });

  // Helper to convert AED to USD
  const toUSD = (aedVal: number) => {
    return Math.round(aedVal / 3.67).toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2A29] flex flex-col justify-between selection:bg-[#BFA57A]/30 selection:text-[#2C2A29] font-sans relative antialiased">
      
      {/* Subtle top horizontal golden aesthetic line */}
      <div className="h-1 bg-gradient-to-r from-[#BFA57A] via-[#E3CBB3] to-[#BFA57A] w-full z-25 relative" />

      {/* --- PREMIUM REAL ESTATE TOP BAR --- */}
      <header className="relative z-10 border-b border-[#EAE3D8] bg-[#FFFFFF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-0 border-r-0">
          
          {/* Logo / Curation Title Area */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-[#BFA57A] flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-[#FFFFFF]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#8A7043] uppercase font-bold">
                  Curated Expat Resources
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono bg-[#FAF5EE] px-1.5 py-0.5 rounded border border-[#E5DDD0] text-[#86755F] font-bold">
                  2026 INDEX
                </span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-extrabold text-[#2C2A29] tracking-tight flex items-center gap-1.5 sm:gap-2.5 flex-wrap">
                <span className="text-2xl sm:text-3xl font-medium text-[#BFA57A] leading-none mb-1 mr-1">دبي</span>
                <span>DUBAI</span>
                <span className="text-[#8A7043] font-serif italic font-medium">EXPAT GUIDE</span>
              </h1>
            </div>
          </div>

          {/* Luxury Property Indicators */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#6D675E] w-full md:w-auto">
            <div className="bg-[#FAF8F5] px-3.5 py-1.5 sm:py-2 rounded-full border border-[#EAE3D8] flex items-center gap-2 shadow-sm whitespace-nowrap">
              <Coins className="w-3.5 h-3.5 text-[#BFA57A]" />
              <span>USD/AED: <strong className="text-[#2C2A29] font-mono">3.673</strong></span>
            </div>
            <div className="bg-[#FAF8F5] px-3.5 py-1.5 sm:py-2 rounded-full border border-[#EAE3D8] flex items-center gap-2 shadow-sm whitespace-nowrap">
               <Scale className="w-3.5 h-3.5 text-[#BFA57A]" />
               <span>VAT: <strong className="text-[#2C2A29] font-mono">5%</strong></span>
            </div>
          </div>

        </div>
      </header>

      {/* --- RECONSTRUCTED HIGH-END SECTION GRID --- */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT 8 COLUMNS PART 1: Search & Integrated Vector Map */}
        <section className="lg:col-span-8 flex flex-col gap-5 h-[auto] order-1 lg:order-1" aria-label="Geographical Masterplan Board">
          
          {/* Dynamic Search Input with elegant sand outline */}
          <div className="relative shrink-0">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#86755F]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search property registries by corporate entities, district name, average rent parameters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] hover:border-[#C5A880] focus:border-[#BFA57A] border border-[#EAE3D8] focus:ring-1 focus:ring-[#BFA57A]/30 rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium text-[#2C2A29] placeholder-[#A69C8E] outline-none transition-all shadow-sm"
            />
          </div>

          {/* Map wrapper container in light plaster */}
          <div className="flex-grow bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#EAE3D8] overflow-hidden relative min-h-[450px] lg:h-[65vh]">
            <DistrictMap
              districts={ALL_DISTRICTS}
              activeDistrict={hoveredDistrict}
              onHoverDistrict={setHoveredDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
          </div>
        </section>

        {/* RIGHT 4 COLUMNS: Floating Broker Card & Sector Directories */}
        <section className="lg:col-span-4 lg:row-span-2 flex flex-col gap-5 order-2 lg:order-2" aria-label="Broker Portfolio and Directories">
          
          {/* Sector Card Directories scrollbox */}
          <div className="bg-[#FFFFFF] border border-[#EAE3D8] rounded-2xl p-5 flex flex-col shadow-sm max-h-[1400px] overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8375] px-1 font-bold mb-4 shrink-0">
              <span className="uppercase tracking-widest">
                VERIFIED DISTRICT PORTFOLIOS ({filteredDistricts.length})
              </span>
            </div>

            <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar pr-2 pb-2">
              {filteredDistricts.map((dist) => {
                const isHovered = hoveredDistrict?.id === dist.id;
                return (
                  <div
                    key={dist.id}
                    id={`district-card-${dist.id}`}
                    onMouseEnter={() => setHoveredDistrict(dist)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => setSelectedDistrict(dist)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden text-left ${
                      isHovered
                        ? 'bg-[#FAF5EE] border-[#BFA57A] shadow-sm'
                        : 'bg-[#FFFFFF] border-[#EAE3D8] hover:border-[#C5A880] hover:bg-[#FAFBF9]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#BFA57A]" />
                        <span className="text-[9px] font-mono text-[#8C8375] uppercase tracking-wider font-bold">
                          {dist.id === 'difc' || dist.id === 'jlt' || dist.id === 'internet-city' || dist.id === 'silicon-oasis' ? 'Free Zone Authority' : 'Mainland Department'}
                        </span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#2C2A29] flex items-center gap-2">
                        {dist.name}
                        <span className="text-[11px] font-serif font-normal text-[#8D755F] italic">
                          ({dist.arabicName})
                        </span>
                      </h4>
                      <p className="text-[11px] text-[#6D675E] mt-0.5 line-clamp-1 italic">
                        {dist.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right text-[10px] font-mono hidden sm:block">
                        <span className="text-[#8C8375] block uppercase font-mono text-[8px]">Avg 1-Bed Price</span>
                        <span className="text-emerald-800 font-bold">
                          {dist.avgRent.bed1.toLocaleString()} AED
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#E5DDD0] flex items-center justify-center text-[#8A7043] group-hover:bg-[#BFA57A] group-hover:text-[#FFFFFF] group-hover:border-[#BFA57A] transition-all shadow-sm">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredDistricts.length === 0 && (
                <div id="no-districts" className="p-6 text-center text-xs text-[#8C8375] border border-[#EAE3D8] rounded-xl font-mono italic bg-[#FFFFFF]">
                  No properties matched "{searchQuery}". Sourcing terms such as "DIFC", "Microsoft", or "0%" is advised.
                </div>
              )}
            </div>
          </div>

        </section>

        {/* LEFT 8 COLUMNS PART 2: IMMIGRATION & LIFESTYLE GUIDES SECTION */}
        <section className="lg:col-span-8 order-3 lg:order-3" aria-label="Immigration and Lifestyle Guides">
          <div className="bg-[#FFFFFF] border border-[#EAE3D8] rounded-2xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6 shrink-0">
              <Compass className="w-5 h-5 text-[#BFA57A]" />
              <h2 className="font-serif text-xl font-bold text-[#2C2A29] uppercase tracking-wide">Essential Expat Guides</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
              {EXPAT_GUIDES.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className="flex flex-col text-left bg-[#FAF8F5] border border-[#EAE3D8] hover:border-[#C5A880] rounded-xl p-4 transition-all hover:shadow-md group h-full justify-start"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#EAE3D8] flex items-center justify-center shadow-sm group-hover:border-[#BFA57A] transition-colors shrink-0">
                      {iconMap[guide.icon] || <Lightbulb className="w-5 h-5 text-[#BFA57A]" />}
                    </div>
                    <h3 className="font-serif font-bold text-sm text-[#2C2A29] group-hover:text-[#8A7043] transition-colors line-clamp-1">{guide.title}</h3>
                  </div>
                  <p className="text-xs text-[#6D675E] leading-relaxed line-clamp-2">
                    {guide.shortDescription}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- PLATFORM FOOTER SYSTEM --- */}
      <footer className="relative z-10 border-t border-[#EAE3D8] bg-[#FFFFFF] px-6 py-4.5 text-center text-xs text-[#8C8375] shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Dubai District Examiner. Sovereign land indices audited via Dubai Land Department (DLD).</p>
          <div className="flex gap-4 font-semibold text-[#8A7043]">
            <span className="hover:text-[#BFA57A] cursor-pointer">Official Tax Guidelines</span>
            <span className="hover:text-[#BFA57A] cursor-pointer">Land Register Portal</span>
            <span className="hover:text-[#BFA57A] cursor-pointer">Corporate Licensing</span>
          </div>
        </div>
      </footer>

      {/* --- MASTER MODEL WINDOW PORTAL --- */}
      <AnimatePresence>
        {selectedDistrict && (
          <DistrictModal
            district={selectedDistrict}
            onClose={() => setSelectedDistrict(null)}
          />
        )}
        {selectedGuide && (
          <GuideModal
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
