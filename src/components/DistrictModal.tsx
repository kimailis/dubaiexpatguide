import React, { useState } from 'react';
import { District, Company } from '../types';
import {
  X,
  Briefcase,
  Home,
  Scale,
  DollarSign,
  Dog,
  ExternalLink,
  MapPin,
  Building,
  Info,
  Layers,
  ChevronRight,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DistrictModalProps {
  district: District | null;
  onClose: () => void;
}

type TabType = 'overview' | 'companies' | 'apartments' | 'tax' | 'pets' | 'demographics';

export default function DistrictModal({ district, onClose }: DistrictModalProps) {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!district) return null;

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedCompany, setSelectedCompany] = useState<Company>(district.companies[0]);

  // Conversion helper to USD
  const toUSD = (aedVal: number) => {
    return Math.round(aedVal / 3.67).toLocaleString('en-US', {
      maximumFractionDigits: 0,
    });
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: 'District Overview',
      icon: <Info className="w-4 h-4" />,
    },
    {
      id: 'tax',
      label: 'Tax & Legal Codes',
      icon: <Scale className="w-4 h-4" />,
    },
    {
      id: 'companies',
      label: `Corporate Hub (${district.companies.length})`,
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'apartments',
      label: 'Apartments & Rents',
      icon: <Home className="w-4 h-4" />,
    },
    {
      id: 'pets',
      label: 'Pet Regulations',
      icon: <Dog className="w-4 h-4" />,
    },
    {
      id: 'demographics',
      label: 'Demographics',
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Warm dark blur backdrop overlay */}
      <div
        className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-md transition-opacity cursor-pointer animate-fade-in"
        onClick={onClose}
      />

      {/* Main Luxury Modal Board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative bg-[#FFFFFF] border border-[#EAE3D8] rounded-2xl shadow-2xl w-full max-w-6xl h-[88vh] md:h-[82vh] overflow-hidden z-10 text-[#2C2A29]"
      >
        {/* Absolute Elegant Close Button */}
        <button
          onClick={onClose}
          id="close-modal-btn"
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
            <div className="flex items-center gap-2 border-b border-[#EAE3D8] pb-3 md:pb-4 mb-3 md:mb-5 pr-8 md:pr-0">
              <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-lg bg-[#BFA57A] flex items-center justify-center text-[#FFFFFF] font-serif font-bold text-sm">
                DXB
              </div>
              <div>
                <span className="text-[8px] md:text-[9px] font-mono tracking-widest text-[#8A7043] uppercase font-bold block">
                  Municipal Archives
                </span>
                <span className="text-xs md:text-sm font-serif font-bold text-[#2C2A29] line-clamp-1">
                  Sector: {district.name}
                </span>
              </div>
            </div>

            <span className="text-[9px] md:text-[10px] font-mono text-[#8C8375] uppercase tracking-widest block mb-2 mt-1 md:mt-0 font-bold px-1">
              Primary Registers
            </span>

            {/* Tab items list */}
            <div className="space-y-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-btn-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF5EE] text-[#8A7043] border-l-2 border-[#BFA57A] pl-3'
                        : 'text-[#6D675E] hover:text-[#2C2A29] hover:bg-[#FAF8F5] pl-3.5'
                    }`}
                  >
                    <span className={isActive ? 'text-[#8A7043]' : 'text-[#8C8375]'}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Coordinates stamp */}
          <div className="mt-5 pt-4 border-t border-[#EAE3D8] hidden md:block">
            <div className="flex justify-between items-center bg-[#FAF5EE] p-3 rounded-lg border border-[#EAE3D8]">
              <div>
                <span className="text-[8px] font-mono text-[#8A7043] uppercase block">Coordinate baseline</span>
                <span className="text-[10px] font-semibold text-[#2C2A29] font-mono">
                  {district.id === 'silicon-oasis' ? '24.4539° N / E66' : '25.2048° N / E11'}
                </span>
              </div>
              <div className="text-right text-[11px] text-[#8D755F] font-serif font-semibold italic">
                {district.arabicName}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT DETAILED MAIN BOOK --- */}
        <div className="flex-grow p-5 sm:p-7 md:p-8 md:overflow-y-auto flex flex-col justify-between">
          <div className="mb-6">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EAE1] pb-5 mb-5">
              <div>
                <div className="text-[10px] font-mono text-[#8A7043] uppercase tracking-widest font-bold mb-1">
                  OFFICIAL MUNICIPAL REGISTRY
                </div>
                <h1 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-[#2C2A29] tracking-tight leading-tight flex items-center gap-2">
                  {district.name}
                  <span className="text-lg font-normal text-[#86755F] italic font-serif">
                    ({district.arabicName})
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-[#6D675E] mt-0.5">
                  {district.tagline}
                </p>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE3D8] flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#7A8973]"></div>
                <div>
                  <span className="text-[8px] font-mono text-[#8A7043] uppercase block">DLD Registry status</span>
                  <span className="text-[10px] font-bold text-[#2C2A29]">Current Q2 2026 Archive</span>
                </div>
              </div>
            </div>

            {/* ACTIVE TAB MAIN CONTENT CONTROLLER */}
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#EAE3D8] leading-relaxed">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono mb-2.5 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#BFA57A]" /> Sector Demographics & Living Curation
                    </h3>
                    <p className="text-sm text-[#2C2A29] leading-relaxed">
                      {district.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A7043] font-bold mb-3">
                      Sights & Signature Landmarks
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {district.majorAttractions.map((att, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3.5 p-3.5 bg-[#FAFBF9] border border-[#EAE3D8] rounded-xl hover:border-[#C5A880] transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-md bg-[#FAF5EE] text-[#8C7A6B] flex items-center justify-center text-xs font-mono font-bold font-serif">
                            0{index + 1}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#2C2A29] block">
                              {att}
                            </span>
                            <span className="text-[9px] text-[#8C8375] font-mono">
                              Official DXB Spotlight Sight
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick features board */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D8] text-center">
                      <span className="text-[9px] text-[#8C8375] block uppercase font-mono mb-1">Zoning Category</span>
                      <span className="text-xs font-bold text-[#8A7043] uppercase tracking-wider">
                        {district.id === 'difc' || district.id === 'jlt' || district.id === 'internet-city' || district.id === 'silicon-oasis'
                          ? 'Free Zone jurisdiction'
                          : 'Mainland jurisdiction'}
                      </span>
                    </div>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D8] text-center">
                      <span className="text-[9px] text-[#8C8375] block uppercase font-mono mb-1">Scenic Setting</span>
                      <span className="text-xs font-bold text-[#7B8E99]">
                        {district.id === 'marina' || district.id === 'jlt' || district.id === 'internet-city' ? 'Lakeside / Coastal' : 'Metropolitan / Inland'}
                      </span>
                    </div>
                    <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3D8] text-center col-span-2 sm:col-span-1">
                      <span className="text-[9px] text-[#8C8375] block uppercase font-mono mb-1">Transit Network</span>
                      <span className="text-xs font-bold text-[#7A8973]">Dubai Metro Red Line</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: TAX & LEGISLATION */}
              {activeTab === 'tax' && (
                <motion.div
                  key="tax"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Tax specifications info packaging */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono">
                        Tax Profile Summary
                      </h3>
                      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#EAE3D8] space-y-3">
                        <div>
                          <span className="text-[9px] font-mono text-[#8C8375] uppercase block">Corporate Levy</span>
                          <p className="text-xs font-bold text-[#2C2A29] mt-0.5 leading-relaxed">
                            {district.taxSituation.corporateTax}
                          </p>
                        </div>
                        <hr className="border-[#FAF5EE]" />
                        <div>
                          <span className="text-[9px] font-mono text-[#8C8375] uppercase block">Personal Base Wage Taxation</span>
                          <p className="text-xs font-bold text-[#2C2A29] mt-0.5 leading-relaxed">
                            {district.taxSituation.personalTax}
                          </p>
                        </div>
                        <hr className="border-[#FAF5EE]" />
                        <div>
                          <span className="text-[9px] font-mono text-[#8C8375] uppercase block">Import Duties Tariff</span>
                          <p className="text-xs font-bold text-[#2C2A29] mt-0.5 leading-relaxed">
                            {district.taxSituation.customsDuty}
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#FAF5EE] p-3.5 rounded-lg border-l border-[#BFA57A] text-xs text-[#6D675E] italic leading-relaxed">
                        "{district.taxSituation.details}"
                      </div>
                    </div>

                    {/* Legal regulations */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono">
                        Primary Zoning Rules & Decrees
                      </h3>
                      <div className="space-y-2.5">
                        {district.laws.map((law, index) => (
                          <div key={index} className="p-3.5 bg-[#FAFBF9] border border-[#EAE3D8] rounded-xl flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="px-1.5 py-0.5 bg-[#FAF5EE] border border-[#E5DDD0] text-[#86755F] text-[8px] font-mono rounded uppercase tracking-wider">
                                {law.category}
                              </span>
                              <span className="text-[9px] text-[#A69C8E] font-mono">Statute #0{index + 1}</span>
                            </div>
                            <span className="text-xs font-bold text-[#2C2A29]">
                              {law.title}
                            </span>
                            <span className="text-xs text-[#6D675E] leading-relaxed">
                              {law.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: CORPORATE LANDSCAPE & CAREER SITES */}
              {activeTab === 'companies' && (
                <motion.div
                  key="companies"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {/* List header tabs */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-[#FAF5EE] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {district.companies.map((comp) => {
                      const isSelected = selectedCompany.name === comp.name;
                      return (
                        <button
                          key={comp.name}
                          id={`comp-tab-${comp.name.replace(/\s+/g, '-')}`}
                          onClick={() => setSelectedCompany(comp)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all whitespace-nowrap cursor-pointer ${
                            isSelected
                              ? 'bg-[#FAF5EE] text-[#8A7043] border-[#BFA57A]/40 font-bold'
                              : 'bg-[#FAF8F5] text-[#6D675E] border-[#EAE3D8] hover:text-[#2C2A29]'
                          }`}
                        >
                          {comp.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Company details plate */}
                  <AnimatePresence mode="wait">
                    {selectedCompany && (
                      <motion.div
                        key={selectedCompany.name}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.12 }}
                        className="space-y-4"
                      >
                        <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#EAE3D8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <Building className="w-3.5 h-3.5 text-[#BFA57A]" />
                              <span className="text-[9px] font-mono text-[#8C8375] uppercase tracking-wider">
                                REGISTERED ZONE EMPLOYER
                              </span>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-[#2C2A29]">
                              {selectedCompany.name}
                            </h3>
                            <span className="text-[10px] text-[#8A7043] font-mono uppercase font-bold">
                              {selectedCompany.industry}
                            </span>
                            <p className="text-xs text-[#6D675E] mt-2 leading-relaxed">
                              {selectedCompany.description}
                            </p>
                          </div>

                          {selectedCompany.openPositions && selectedCompany.openPositions.length > 0 && (
                            <a
                              href={selectedCompany.openPositions[0].careerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              id={`career-btn-${selectedCompany.name.replace(/\s+/g, '-')}`}
                              className="bg-[#BFA57A] hover:bg-[#A2875A] text-[#FFFFFF] font-serif font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
                              referrerPolicy="no-referrer"
                            >
                              <span>Enterprise Portal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        {/* Open job listings list */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono text-[#8C8375] tracking-wider uppercase px-1">
                            <span>Primary Careers in DXB sector</span>
                            <span className="text-[#8A7043] font-bold">Tax-Free Salaries</span>
                          </div>

                          {(!selectedCompany.openPositions || selectedCompany.openPositions.length === 0) ? (
                            <div className="bg-[#FAFBF9] border border-[#EAE3D8] p-4 rounded-xl text-center text-[11px] font-mono text-[#A69C8E] italic">
                              No public roles explicitly posted on DLD tracker for this entity currently.
                            </div>
                          ) : (
                            selectedCompany.openPositions.map((post, idx) => (
                              <div
                                key={idx}
                                className="bg-[#FAFBF9] hover:bg-[#FAF5EE] border border-[#EAE3D8] p-3.5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-colors"
                              >
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFA57A]"></span>
                                    <h4 className="text-xs font-bold text-[#2C2A29]">
                                      {post.title}
                                    </h4>
                                  </div>
                                  <div className="flex gap-4 text-[9px] font-mono text-[#8C8375] mt-1 pl-3">
                                    <span>Division: {post.department}</span>
                                    <span>Experience required: {post.experience}</span>
                                  </div>
                                </div>
  
                                <div className="flex items-center justify-between sm:justify-end gap-3.5 pl-3 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2EFE8]">
                                  <div className="text-right">
                                    <span className="text-[8px] text-[#8C8375] uppercase block font-mono">Annual Salary Yield</span>
                                    <span className="text-xs font-bold text-emerald-800 font-mono">
                                      {post.salaryRange}
                                    </span>
                                  </div>
                                  <a
                                    href={post.careerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    id={`apply-btn-${idx}`}
                                    className="p-1.5 rounded bg-[#FFFFFF] border border-[#EAE3D8] hover:border-[#C5A880] text-[#6D675E] hover:text-[#2C2A29] transition-colors cursor-pointer"
                                    referrerPolicy="no-referrer"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* TAB 4: APARTMENTS & SPECIMEN LISTINGS */}
              {activeTab === 'apartments' && (
                <motion.div
                  key="apartments"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  {/* Rent comparative metrics meter */}
                  <div className="bg-[#FAF8F5] p-4.5 rounded-xl border border-[#EAE3D8]">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono mb-3.5 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#BFA57A]" /> Annual Average Rental Estimates Benchmark
                    </h3>
                    <div className="space-y-3">
                      {[
                        { k: 'studio', label: 'Studio Apartment', raw: district.avgRent.studio },
                        { k: 'bed1', label: '1 Bedroom Suite', raw: district.avgRent.bed1 },
                        { k: 'bed2', label: '2 Bedroom Suite', raw: district.avgRent.bed2 },
                        { k: 'bed3', label: '3 Bedroom Suite', raw: district.avgRent.bed3 },
                        { k: 'bed4', label: '4 Bedroom Suite', raw: district.avgRent.bed4 },
                      ].map((item) => {
                        const ratio = `${Math.min(100, (item.raw / 450000) * 100)}%`;
                        return (
                          <div key={item.k} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="font-bold text-[#2C2A29]">{item.label}</span>
                              <span className="text-[#6D675E]">
                                <strong className="text-[#2C2A29]">{item.raw.toLocaleString()} AED</strong> (~${toUSD(item.raw)}) / yr
                              </span>
                            </div>
                            <div className="h-2 w-full bg-[#FAF5EE] border border-[#EAE3D8] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#BFA57A] to-[#E3CBB3]"
                                style={{ width: ratio }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specimen properties list */}
                  <div>
                    <h3 className="text-[10px] font-mono text-[#8C8375] tracking-wider uppercase mb-3">
                      Curated Live Properties on Market
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {district.apartments.map((apt) => (
                        <div
                          key={apt.id}
                          className="bg-[#FFFFFF] border border-[#EAE3D8] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group"
                        >
                          <div className="relative h-32 bg-[#FAF8F5] overflow-hidden">
                            <img
                              src={apt.image}
                              alt={apt.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 left-2 bg-[#FAFBF9]/90 border border-[#DCD5CB] px-2 py-0.5 rounded text-[9px] font-mono font-bold text-[#2C2A29]">
                              {apt.bedrooms === 'Studio' ? 'STUDIO' : `${apt.bedrooms} BED`}
                            </div>
                          </div>

                          <div className="p-3.5 flex-grow flex flex-col justify-between gap-3">
                            <div>
                              <h4 className="text-xs font-bold text-[#2C2A29] line-clamp-1">
                                {apt.title}
                              </h4>
                              <p className="text-[10px] text-[#6D675E] mt-1 line-clamp-2 leading-relaxed">
                                {apt.locationDetails}
                              </p>
                              <div className="flex gap-3 text-[9px] font-mono text-[#8C8375] mt-2">
                                <span>Baths: {apt.bathrooms}</span>
                                <span>Size: {apt.sizeSqFt} SqFt</span>
                              </div>
                            </div>

                            <div className="border-t border-[#F2EFE8] pt-2.5 flex items-center justify-between">
                              <div>
                                <span className="text-[8px] text-[#8C8375] uppercase block font-mono">Annual Rent</span>
                                <span className="text-xs font-mono font-bold text-[#2C2A29]">
                                  {apt.priceAED.toLocaleString()} AED{' '}
                                  <span className="text-[#86755F] text-[9px] font-normal block font-sans">
                                    (~${toUSD(apt.priceAED)})
                                  </span>
                                </span>
                              </div>
                              <a
                                href={apt.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                id={`apt-link-${apt.id}`}
                                className="text-[#8A7043] hover:text-[#BFA57A] flex items-center gap-1 text-[10px] font-bold font-serif tracking-wide cursor-pointer"
                                referrerPolicy="no-referrer"
                              >
                                <span>Browse</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PET REGULATIONS */}
              {activeTab === 'pets' && (
                <motion.div
                  key="pets"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* General suitability score */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono">
                        Pet Friendliness Profile
                      </h3>
                      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#EAE3D8] space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#2C2A29]">Suitability Rating:</span>
                          <div className="flex gap-0.5 text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < district.petSituation.friendlyRating
                                    ? 'text-[#C5A880] text-sm'
                                    : 'text-[#E6E1D8] text-sm'
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#5C564E] leading-relaxed">
                          {district.petSituation.details}
                        </p>

                        <hr className="border-[#FAF5EE]" />

                        <div>
                          <span className="text-[9px] text-[#8C8375] uppercase block font-mono mb-2">
                            Curated Unleashed Dog Parks & Boardwalks
                          </span>
                          <div className="space-y-1.5 text-xs text-[#2C2A29]">
                            {district.petSituation.bestParks.map((park, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-3 bg-[#BFA57A] rounded-full inline-block"></span>
                                <span className="font-semibold">{park}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fines and specific rules lists */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono">
                        Official Municipality Decrees & Penalties
                      </h3>
                      <div className="space-y-2">
                        {district.petSituation.rules.map((rule, idx) => (
                          <div
                            key={idx}
                            className="bg-[#FAFBF9] p-3.5 border border-[#EAE3D8] rounded-xl flex gap-3 text-xs text-[#2C2A29] leading-relaxed"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#FAF5EE] border border-[#EAF2F5] text-[#8A7043] flex items-center justify-center font-serif text-[10px] font-bold shrink-0 mt-0.5">
                              !
                            </div>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'demographics' && (
                <motion.div
                  key="demographics"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, absolute: true }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Overview & Dominant Groups */}
                    <div className="space-y-6">
                      
                      <div className="bg-[#FAFBF9] border border-[#EAE3D8] rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#BFA57A]"></div>
                        <h3 className="text-sm font-bold font-serif text-[#2C2A29] mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#BFA57A]" /> Socio-Economic Demographics
                        </h3>
                        <p className="text-xs text-[#6D675E] leading-relaxed italic mb-4">
                          "{district.demographics.description}"
                        </p>
                        
                        <div className="text-[10px] text-[#8C8375] uppercase tracking-widest font-mono font-bold mb-2">
                          Dominant Social Classes / Nationalities
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {district.demographics.dominantGroups.map((group, idx) => (
                            <span
                              key={idx}
                              className="bg-[#FFFFFF] border border-[#EAE3D8] text-[#2C2A29] px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
                            >
                              {group}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Key Statistics List */}
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A7043] font-mono mb-4">
                        Estimated Population Distribution
                      </h3>
                      <div className="bg-[#FFFFFF] border border-[#EAE3D8] rounded-xl p-5 shadow-sm space-y-4">
                        {district.demographics.stats.map((stat, idx) => (
                          <div key={idx} className="relative">
                            <div className="flex justify-between items-center mb-1 drop-shadow-sm">
                              <span className="text-xs font-bold text-[#2C2A29]">{stat.groupName}</span>
                              <span className="text-xs font-mono font-bold text-[#8A7043]">{stat.percentage}%</span>
                            </div>
                            <div className="w-full bg-[#EAE3D8]/50 h-2 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${stat.percentage}%` }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                                className="h-full bg-gradient-to-r from-[#C5A880] to-[#A2875A]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom disclaimer */}
          <div className="border-t border-[#F0EAE1] pt-3 mt-4 text-[9px] text-[#8C8375] text-center leading-relaxed font-mono uppercase tracking-wider">
            Sourced via the Dubai Land Department (DLD) open portal archives. 2026 Sovereign Sector Analytics.
          </div>
        </div>

        </div>
      </motion.div>
    </div>
  );
}
