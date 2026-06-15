import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { District } from '../types';
import { MAP_POLYGONS } from '../mapPolygons';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Briefcase, Building, BedDouble, Info, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface Props {
  districts: District[];
  activeDistrict: District | null;
  onHoverDistrict: (d: District | null) => void;
  onSelectDistrict: (d: District) => void;
}

// Map event listener to track mouse position securely
function MapMouseTracker({ onMouseMove }: { onMouseMove: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    mousemove(e) {
      onMouseMove(e);
    }
  });
  return null;
}

export default function DistrictMap({
  districts,
  activeDistrict,
  onHoverDistrict,
  onSelectDistrict,
}: Props) {
  const { t } = useTranslation();
  const DUBAI_CENTER: [number, number] = [25.140, 55.240]; 
  const mapStyleUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  
  const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: L.LeafletMouseEvent) => {
    if (activeDistrict && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.originalEvent.clientX - rect.left;
      const y = e.originalEvent.clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  // Reset mouse pos if not active
  useEffect(() => {
    if (!activeDistrict) {
      setMousePos(null);
    }
  }, [activeDistrict]);

  const renderTooltipContent = (d: District) => {
    return (
      <div className="w-[280px] sm:w-[320px] text-left leading-normal text-[#2C2A29] p-4 bg-[#FFFFFF] rounded-xl shadow-2xl border border-[#EAE3D8]">
        {/* Header */}
        <div className="border-b border-[#F0EAE1] pb-3 mb-3">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#2C2A29] leading-tight">
              {d.name}
              <span className="block text-xs font-serif italic text-[#86755F] font-normal mt-0.5">{d.arabicName}</span>
            </h4>
            <span className="text-[9px] sm:text-[10px] font-mono whitespace-nowrap bg-[#FAF5EE] border border-[#EAE3D8] text-[#8A7043] px-2 py-1 rounded-md font-bold uppercase tracking-widest shadow-sm">
              {d.taxSituation.status.includes('Zone') ? t('modal_fz_jur', 'Free Zone') : t('modal_ml_jur', 'Mainland')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6D675E] italic leading-snug">
            "{d.tagline}"
          </p>
        </div>

        {/* Content */}
        <div className="space-y-3.5">
          <p className="text-xs text-[#2C2A29] leading-relaxed line-clamp-3">
            {d.description}
          </p>

          <div className="flex justify-between items-center bg-[#FAFBF9] border border-[#EAE3D8] rounded-xl p-3 shadow-inner">
             <div>
                <h5 className="text-[10px] uppercase font-bold text-[#8C8375] tracking-widest mb-1.5 flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-[#BFA57A]"/> {t('map_annual_rent', 'Avg 1-Bed')}</h5>
                <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{d.avgRent.bed1.toLocaleString()} {t('aed', 'AED')}/yr</span>
             </div>
             <div className="text-right">
                <h5 className="text-[10px] uppercase font-bold text-[#8C8375] tracking-widest mb-1.5">{t('map_pet_friendly', 'Pet Friendly')}</h5>
                <div className="flex gap-0.5 justify-end">
                   {Array.from({ length: 5 }).map((_, i) => (
                     <span key={i} className={`text-xs ${i < d.petSituation.friendlyRating ? 'text-[#C5A880]' : 'text-[#E6E1D8]'}`}>★</span>
                   ))}
                </div>
             </div>
          </div>

          <div>
             <h5 className="text-[10px] uppercase font-bold text-[#8C8375] tracking-widest mb-1.5 flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-[#BFA57A]"/> {t('map_tax_reg', 'Tax & Registration')}</h5>
             <p className="text-xs text-[#6D675E] leading-relaxed line-clamp-2">{d.taxSituation.corporateTax}</p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase font-bold text-[#8C8375] tracking-widest mb-2 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[#BFA57A]"/> {t('map_key_entities', 'Key Entities')}</h5>
            <div className="flex flex-wrap gap-1.5">
              {d.companies.slice(0, 3).map(c => (
                <span key={c.name} className="text-[10px] bg-[#FAF8F5] text-[#5C564E] font-medium border border-[#EAE3D8] rounded-md px-2 py-1 truncate max-w-[120px] shadow-sm">{c.name}</span>
              ))}
              {d.companies.length > 3 && <span className="text-[10px] text-[#86755F] py-1 font-mono">+{d.companies.length - 3}</span>}
            </div>
          </div>

        </div>

        <div className="mt-4 pt-3 text-[10px] text-[#A69C8E] font-bold tracking-wide uppercase border-t border-[#F0EAE1] flex justify-between items-center">
            <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5 text-[#BFA57A]"/> {t('map_click_zone', 'Click zone to open ledger')}</span>
        </div>
      </div>
    );
  };

  // Safe clamping logic for tooltip
  let tooltipStyle: React.CSSProperties = { display: 'none' };
  if (mousePos && containerRef.current) {
    const { clientWidth, clientHeight } = containerRef.current;
    
    // Size assumptions for tooltip (roughly aligns with w-[320px] + some height)
    const TIP_W = 340; 
    const TIP_H = 380; 

    // Default offset from cursor (bottom-right)
    let x = mousePos.x + 15; 
    let y = mousePos.y + 15;

    // Boundary constraints
    // If it goes off the right edge, flip it to the left of the cursor
    if (x + TIP_W > clientWidth) {
      x = mousePos.x - TIP_W - 15;
    }
    
    // If it goes off the bottom edge, flip it above the cursor
    if (y + TIP_H > clientHeight) {
      y = mousePos.y - TIP_H - 15;
    }
    
    // Hard clamp to keep inside container if flipping isn't enough (e.g. small screen)
    if (x < 10) x = 10;
    if (x + TIP_W > clientWidth) x = clientWidth - TIP_W - 10;
    
    if (y < 10) y = 10;
    if (y + TIP_H > clientHeight) y = clientHeight - TIP_H - 10;

    tooltipStyle = {
      display: 'block',
      transform: `translate(${x}px, ${y}px)`,
      willChange: 'transform',
    };
  }

  // Memoize custom icons so Leaflet doesn't destroy the DOM node on hover
  const CUSTOM_ICONS = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    districts.forEach((dist) => {
      const SHORT_NAMES: Record<string, string> = {
        'marina': 'Marina',
        'jlt': 'JLT',
        'internet-city': 'Internet City',
        'downtown': 'Downtown',
        'difc': 'DIFC',
        'silicon-oasis': 'Silicon Oasis',
        'business-bay': 'Business Bay',
        'palm-jumeirah': 'Palm Jumeirah',
        'jvc': 'JVC',
        'al-quoz': 'Al Quoz',
        'dubai-hills': 'Dubai Hills',
        'discovery-gardens': 'Disc. Gardens',
        'al-barsha': 'Al Barsha',
        'deira': 'Deira'
      };
      
      const posMap = {
        left: 'right-1/2 mr-[8px] top-1/2 -translate-y-1/2',
        right: 'left-1/2 ml-[8px] top-1/2 -translate-y-1/2',
        top: 'bottom-1/2 mb-[8px] left-1/2 -translate-x-1/2',
        bottom: 'top-1/2 mt-[8px] left-1/2 -translate-x-1/2',
        topLeft: 'right-1/2 mr-[5px] bottom-1/2 mb-[5px]',
        topRight: 'left-1/2 ml-[5px] bottom-1/2 mb-[5px]',
        bottomLeft: 'right-1/2 mr-[5px] top-1/2 mt-[5px]',
        bottomRight: 'left-1/2 ml-[5px] top-1/2 mt-[5px]',
      };
      
      const LABEL_POSITIONS: Record<string, string> = {
        'marina': posMap.left,
        'jlt': posMap.bottomRight,
        'internet-city': posMap.bottom,
        'downtown': posMap.top,
        'business-bay': posMap.bottomRight,
        'difc': posMap.topRight,
        'silicon-oasis': posMap.right,
        'palm-jumeirah': posMap.top,
        'jvc': posMap.bottom,
        'al-quoz': posMap.topRight,
        'dubai-hills': posMap.bottomRight,
        'discovery-gardens': posMap.bottom,
        'al-barsha': posMap.topRight,
        'deira': posMap.top
      };
      
      const shortName = SHORT_NAMES[dist.id] || dist.name;
      const posClass = LABEL_POSITIONS[dist.id] || posMap.right;

      icons[dist.id] = L.divIcon({
        className: `custom-district-marker district-marker-${dist.id}`,
        html: `
          <div class="w-full h-full relative flex items-center justify-center">
            <div class="marker-dot w-[13px] h-[13px] rounded-full bg-[#BFA57A] shadow-md border-[1.5px] border-white transition-all duration-75"></div>
            <div class="absolute ${posClass} px-[4px] py-[2px] rounded text-[7px] leading-none font-bold tracking-widest uppercase whitespace-nowrap bg-white/95 backdrop-blur-sm border border-[#EAE3D8] text-[#2C2A29] shadow-sm pointer-events-none md:hidden transition-opacity">
              ${shortName}
            </div>
          </div>
        `,
        iconSize: [20, 20], 
        iconAnchor: [10, 10]
      });
    });
    return icons;
  }, [districts]);

  return (
    <div ref={containerRef} className="w-full h-full relative isolate z-10 group rounded-2xl overflow-hidden [&_.leaflet-container]:font-sans text-[#2C2A29] bg-[#EAF2F5]">
      
      <style>{`
        ${activeDistrict ? `
          .district-marker-${activeDistrict.id} .marker-dot {
            transform: scale(1.6);
            box-shadow: 0 0 0 3px rgba(191, 165, 122, 0.4);
            background-color: #A2875A;
          }
          .district-marker-${activeDistrict.id} {
            z-index: 1000 !important;
          }
        ` : ''}
      `}</style>
       
      {/* Decorative Header overlaid on map for aesthetic */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 pointer-events-none bg-gradient-to-b from-white/90 to-transparent">
         <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8A7043] tracking-widest uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFA57A] animate-pulse"></span>
            Real Estate Masterplan Division
         </div>
         <h3 className="font-serif text-xl font-bold text-[#2C2A29] tracking-tight">
            Interactive Sector Zoning Border Map
         </h3>
      </div>

      <MapContainer 
        center={DUBAI_CENTER} 
        zoom={11} 
        zoomControl={false}
        className="w-full h-full outline-none z-0 !bg-[#EAF2F5]"
        scrollWheelZoom={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url={mapStyleUrl}
        />
        <MapMouseTracker onMouseMove={handleMouseMove} />
        
        {districts.map(dist => {
          const mapData = MAP_POLYGONS[dist.id];
          if (!mapData) return null;

          return (
            <Marker
              key={dist.id}
              position={mapData.center}
              icon={CUSTOM_ICONS[dist.id]}
              eventHandlers={{
                mouseover: () => onHoverDistrict(dist),
                mouseout: () => onHoverDistrict(null),
                click: () => onSelectDistrict(dist),
              }}
            />
          );
        })}
      </MapContainer>

      {/* Floating Smart Tooltip custom rendered out of leaflet logic to avoid clipping/edge bugs */}
      {activeDistrict && mousePos && (
         <div 
           className="absolute top-0 left-0 z-[2000] pointer-events-none transition-transform duration-100 ease-out hidden md:block" 
           style={tooltipStyle}
         >
           <AnimatePresence>
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ duration: 0.15 }}
             >
               {renderTooltipContent(activeDistrict)}
             </motion.div>
           </AnimatePresence>
         </div>
      )}

      {/* Decorative Footer */}
      <div className="absolute bottom-6 left-6 z-[1000] pointer-events-none bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-[#EAE3D8] shadow-sm hidden sm:block">
        <div className="flex items-center gap-2 text-[10px] text-[#8A7043] uppercase font-bold tracking-wider font-mono">
           <MapPin className="w-4 h-4 text-[#BFA57A]" /> 
           <div>
              {t('map.sectorBoundaries', 'Sector Boundaries')} <br/> <span className="text-[#6D675E] font-medium tracking-normal text-[9px] capitalize">{t('map_laid', 'Laid precisely to Carto scale')}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
