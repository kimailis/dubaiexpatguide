import React, { useState, useEffect } from 'react';
import { 
  X, HeartPulse, GraduationCap, Car, Home, Scale, Lightbulb, ShoppingBag, 
  ShieldPlus, Hospital, Book, Baby, FileText, Key, Bus, Coins,
  Users, Landmark, Monitor, Wine, Smartphone, AlertTriangle, Sun, Wifi,
  ShoppingCart, Store, Receipt, ChevronRight, MapPin, ExternalLink,
  Briefcase, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GuideArticle } from '../guideData';

interface GuideModalProps {
  guide: GuideArticle | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  ShieldPlus: <ShieldPlus className="w-5 h-5" />,
  Hospital: <Hospital className="w-5 h-5" />,
  Book: <Book className="w-5 h-5" />,
  Baby: <Baby className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Key: <Key className="w-5 h-5" />,
  Bus: <Bus className="w-5 h-5" />,
  Coins: <Coins className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  Wine: <Wine className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  Wifi: <Wifi className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Receipt: <Receipt className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />
};

export default function GuideModal({ guide, onClose }: GuideModalProps) {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (guide) {
      document.body.style.overflow = 'hidden';
      if (guide.tabs.length > 0) {
        setActiveTab(guide.tabs[0].id);
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [guide]);

  if (!guide) return null;

  const currentTabData = guide.tabs.find(t => t.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8" style={{ isolation: 'isolate' }}>
      
      {/* Dimmed Background Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-md transition-opacity cursor-pointer animate-fade-in"
      />

      {/* Main Luxury Modal Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative bg-[#FFFFFF] border border-[#EAE3D8] rounded-2xl shadow-2xl w-full max-w-6xl h-[88vh] md:h-[82vh] overflow-hidden z-10 text-[#2C2A29]"
      >
        <button
          onClick={onClose}
          id="close-guide-btn"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md hover:bg-[#FAF8F5]/90 border border-[#EAE3D8] text-[#6D675E] hover:text-[#2C2A29] flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          {/* --- LEFT NAVIGATION ACCENTS --- */}
        <div className="w-full md:w-72 bg-[#FAF7F2] border-b md:border-b-0 md:border-r border-[#EAE3D8] p-4 sm:p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* Stamp Branding */}
            <div className="flex items-center gap-3 border-b border-[#EAE3D8] pb-3 md:pb-4 mb-3 md:mb-5 pr-8 md:pr-0">
              <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-lg bg-[#FAF5EE] border border-[#E5DDD0] flex items-center justify-center text-[#BFA57A] shadow-sm">
                {iconMap[guide.icon] || <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />}
              </div>
              <div>
                <span className="text-[8px] md:text-[9px] font-mono tracking-widest text-[#8A7043] uppercase font-bold block">
                  Expat Guide Focus
                </span>
                <span className="text-sm font-serif font-bold text-[#2C2A29] line-clamp-1">
                  {guide.title}
                </span>
              </div>
            </div>

            <span className="text-[9px] md:text-[10px] font-mono text-[#8C8375] uppercase tracking-widest block mb-2 mt-1 md:mt-0 font-bold px-1">
              Directory Index
            </span>

            {/* Tab items list */}
            <nav className="space-y-1">
              {guide.tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left cursor-pointer ${
                      isActive 
                        ? 'bg-[#FAF5EE] text-[#8A7043] border-l-2 border-[#BFA57A] pl-3' 
                        : 'text-[#6D675E] hover:text-[#2C2A29] hover:bg-[#FAF8F5] pl-3.5'
                    }`}
                  >
                    <span className={isActive ? 'text-[#8A7043]' : 'text-[#8C8375]'}>
                      {iconMap[tab.icon] || <Lightbulb className="w-4 h-4" />}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Coordinates stamp */}
          <div className="mt-5 pt-4 border-t border-[#EAE3D8] hidden md:block">
            <div className="flex justify-between items-center bg-[#FAF5EE] p-3 rounded-lg border border-[#EAE3D8]">
              <div>
                <span className="text-[8px] font-mono text-[#8A7043] uppercase block">DLD Guideline Ref</span>
                <span className="text-[10px] font-semibold text-[#2C2A29] font-mono">
                  DXB-REG-{guide.id.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT DETAILED MAIN BOOK --- */}
        <div className="flex-grow p-5 sm:p-7 md:p-8 md:overflow-y-auto flex flex-col justify-between bg-[#FAF8F5]">
          <div className="mb-6">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#F0EAE1] pb-5 mb-5 items-start sm:items-center pr-8">
              <div>
                <div className="text-[10px] font-mono text-[#8A7043] uppercase tracking-widest font-bold mb-1">
                  OFFICIAL MUNICIPAL REGISTRY
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C2A29] tracking-tight leading-tight">
                  {guide.title}
                </h1>
                <p className="text-sm text-[#6D675E] mt-1.5 italic">
                  "{guide.shortDescription}"
                </p>
              </div>

              <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#EAE3D8] flex items-center gap-2.5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#7A8973]"></div>
                <div>
                  <span className="text-[8px] font-mono text-[#8A7043] uppercase block">Guideline status</span>
                  <span className="text-[10px] font-bold text-[#2C2A29]">Verified Q2 2026</span>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {currentTabData && (
                <motion.div
                  key={currentTabData.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  {currentTabData.sections.map((section, idx) => (
                    <div key={idx} className="bg-[#FFFFFF] border border-[#EAE3D8] rounded-xl overflow-hidden shadow-sm relative">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#BFA57A] z-10"></div>
                      
                      {section.imageUrl && (
                        <div className="w-full h-48 sm:h-56 bg-[#FAF8F5] relative border-b border-[#EAE3D8]">
                          <img 
                            src={section.imageUrl} 
                            alt={section.heading} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      <div className="p-5 sm:p-6">
                        <h3 className="font-serif font-bold text-lg text-[#2C2A29] mb-3 ml-2">
                          {section.heading}
                        </h3>
                        
                        <p className="text-sm text-[#4E4A45] leading-relaxed mb-4 ml-2">
                          {section.content}
                        </p>

                        {(section.address || section.link) && (
                          <div className="ml-2 mb-4 flex flex-wrap items-center gap-3">
                            {section.address && (
                              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8C8375] bg-[#FAF5EE] px-2.5 py-1.5 rounded-md border border-[#E5DDD0]">
                                <MapPin className="w-3.5 h-3.5 text-[#BFA57A]" />
                                <span>{section.address}</span>
                              </div>
                            )}
                            {section.link && (
                              <a 
                                href={section.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-[11px] font-mono text-[#FFFFFF] bg-[#8A7043] hover:bg-[#6C5733] transition-colors px-3 py-1.5 rounded-md shadow-sm"
                              >
                                <span>{section.link.text}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}

                        {section.bullets && section.bullets.length > 0 && (
                          <ul className="space-y-2.5 ml-2 mt-4 bg-[#FAFBF9] p-4 rounded-xl border border-[#F2EFE8]">
                            {section.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4E4A45]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA57A] mt-1.5 shrink-0"></span>
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.listItems && section.listItems.length > 0 && (
                          <div className="ml-2 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.listItems.map((item, iIdx) => (
                              <div key={iIdx} className="bg-[#FAFBF9] p-4 rounded-xl border border-[#F2EFE8] shadow-sm flex flex-col justify-between group">
                                <div>
                                  <h4 className="font-bold text-sm text-[#2C2A29] mb-1">{item.title}</h4>
                                  <p className="text-xs text-[#6D675E] leading-relaxed mb-4">{item.description}</p>
                                </div>
                                {item.link && (
                                  <a 
                                    href={item.link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold text-[#8A7043] bg-[#FFFFFF] border border-[#EAE3D8] hover:border-[#BFA57A] transition-colors px-3 py-2 rounded-lg w-full mt-auto"
                                  >
                                    <span>{item.link.text}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom disclaimer */}
          <div className="border-t border-[#F0EAE1] pt-3 mt-4 text-[9px] text-[#8C8375] text-center leading-relaxed font-mono uppercase tracking-wider shrink-0">
            Sourced via the Dubai Land Department & Municipal Guidelines. 2026 Sovereign Sector Analytics.
          </div>
        </div>

        </div>
      </motion.div>
    </div>
  );
}
