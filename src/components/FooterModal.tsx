import React from 'react';
import { motion } from 'framer-motion';
import { X, Scale, FileText, Landmark, Shield, MessageSquare, Phone, Building2, Eye } from 'lucide-react';

export type FooterModalType = 'tax' | 'land' | 'corporate' | 'contact' | 'accessibility' | 'privacy';

interface FooterModalProps {
  type: FooterModalType;
  onClose: () => void;
}

const MODAL_CONTENT: Record<FooterModalType, { title: string; subtitle: string; icon: React.ReactNode; renderContent: () => React.ReactNode }> = {
  tax: {
    title: 'Official UAE & Dubai Tax Guidelines 2026',
    subtitle: 'Ministry of Finance & Federal Tax Authority Regulations',
    icon: <Scale className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed">
        <p>The UAE implements a modern, transparent tax framework designed to foster long-term corporate growth while maintaining a tax-free personal income environment for expats.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">1. Personal Income Tax (0%)</h4>
        <p>Dubai residents and expats pay <strong>0% personal income tax</strong>. Salaries, capital gains from personal investments, and residential real estate returns are entirely tax-free for individuals holding a valid UAE residency visa.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">2. Corporate Tax (9%)</h4>
        <p>Introduced in June 2023, the UAE Federal Corporate Tax sits at a highly competitive baseline of <strong>9%</strong> on net profits exceeding AED 375,000.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>0% Rate:</strong> Applies to taxable income up to AED 375,000 to support small businesses and startups.</li>
          <li><strong>Free Zone Relief:</strong> Qualifying Free Zone Persons can continue to benefit from 0% corporate tax if their income is derived from "Qualifying Activities" and they maintain adequate substance in the UAE.</li>
        </ul>

        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">3. Value Added Tax (VAT - 5%)</h4>
        <p>A standard VAT of <strong>5%</strong> applies to most goods and services. Certain sectors (like residential real estate, basic healthcare, and education) are zero-rated or exempt. Mandatory VAT registration is required for businesses with annual taxable supplies exceeding AED 375,000.</p>
      </div>
    ),
  },
  land: {
    title: 'Land Register & DLD Portal',
    subtitle: 'Dubai Land Department (DLD) Information',
    icon: <Landmark className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed">
        <p>The Dubai Land Department (DLD) provides a highly digitized, secure, and transparent registry system for all real estate transactions across the Emirate.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">The Real Estate Regulatory Agency (RERA)</h4>
        <p>Operating under the DLD, RERA sets policies, regulates the market, and licenses real estate agents (who must carry a valid RERA ID), ensuring consumer protection.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Title Deeds & Oqood</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Title Deed:</strong> The official proof of ownership for completed (ready) properties.</li>
          <li><strong>Oqood:</strong> The official registration for off-plan properties (under construction) to secure buyer rights.</li>
        </ul>
        
        <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#EAE3D8] mt-6">
          <p className="mb-3 font-semibold text-[#8A7043]">Official Portal Portal:</p>
          <a href="https://dubailand.gov.ae/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#BFA57A] hover:bg-[#A88F65] transition-colors text-white font-bold py-2 px-4 rounded-lg text-sm">
            Visit Dubai Land Department Website
          </a>
        </div>
      </div>
    ),
  },
  corporate: {
    title: 'Corporate Licensing & Management',
    subtitle: 'Establishing Commercial Entities in Dubai',
    icon: <Building2 className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed">
        <p>Dubai offers two primary jurisdictions for corporate structuring: Mainland and Free Zone. Each serves distinct operational goals.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Mainland (DED)</h4>
        <p>Regulated by the Department of Economy and Tourism (DET), Mainland companies can trade directly anywhere in the UAE market without restrictions. Recent legal changes allow 100% foreign ownership for most commercial and industrial activities.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Free Zones</h4>
        <p>Free zones (e.g., DMCC, DIFC, JAFZA) cater specifically to international business, offering 100% foreign ownership without DET intervention, dedicated infrastructure, and industry-specific networking. However, to trade physical goods locally, a local distributor is usually needed.</p>

        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Key Steps</h4>
        <ul className="list-decimal pl-5 space-y-2">
          <li>Select business activity & jurisdiction.</li>
          <li>Register trade name & apply for initial approval.</li>
          <li>Draft Memorandum of Association (MOA).</li>
          <li>Lease an office space (Ejari) or flexible desk.</li>
          <li>Pay fees & collect the Trade License.</li>
        </ul>
      </div>
    ),
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'We are here to assist your residential transition',
    icon: <MessageSquare className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#FAF5EE] rounded-full flex items-center justify-center text-[#BFA57A] mb-2 shadow-inner border border-[#EAE3D8]">
          <Phone className="w-8 h-8" />
        </div>
        <p className="text-lg text-[#2C2A29]">We will be happy to contact you or assist with any inquiries regarding expat life, property sourcing, or corporate setups in Dubai.</p>
        
        <div className="bg-[#FAFBF9] border border-[#EAE3D8] p-5 rounded-xl mt-4 max-w-sm w-full">
          <p className="text-sm font-bold text-[#8C8375] uppercase tracking-wider mb-2">Direct Email</p>
          <a href="mailto:contact@dubaiexpatguide.com" className="font-mono font-bold text-[#8A7043] text-lg hover:underline transition-all">
            contact@dubaiexpatguide.com
          </a>
        </div>
      </div>
    ),
  },
  accessibility: {
    title: 'Accessibility Policy',
    subtitle: 'Committed to a barrier-free experience',
    icon: <Eye className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed">
        <p><strong>Dubai Expat Guide</strong> is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Measures to support accessibility</h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Including accessibility throughout our internal policies.</li>
          <li>Integrating accessibility into our procurement practices.</li>
          <li>Providing continual accessibility training for our staff.</li>
          <li>Adopting high-contrast, scalable visual representations.</li>
        </ul>
        <p>If you experience any difficulty accessing our content, please send us a message via our Contact Us channel, and we will work to provide you with the information you need in a suitable format.</p>
      </div>
    ),
  },
  privacy: {
    title: 'Legal & Privacy Policy',
    subtitle: 'Terms of Use and Data Privacy',
    icon: <Shield className="w-5 h-5" />,
    renderContent: () => (
      <div className="space-y-6 text-[#4F4A45] leading-relaxed">
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">No Data Collection</h4>
        <p><strong>Dubai Expat Guide</strong> is an informational directory. We respect your privacy definitively. <strong>We do not collect, store, or process any personal user data.</strong> We do not use tracking cookies, analytics engines, or external marketing telemetry.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">Limitations of Liability</h4>
        <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
        
        <p>Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
        
        <h4 className="font-serif font-bold text-[#2C2A29] text-lg border-b border-[#F0EAE1] pb-2">External Links</h4>
        <p>Through this website, you are able to link to other websites which are not under the control of Dubai Expat Guide. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
      </div>
    ),
  },
};

export default function FooterModal({ type, onClose }: FooterModalProps) {
  const content = MODAL_CONTENT[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211D]/60 backdrop-blur-md transition-opacity cursor-pointer animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative bg-[#FFFFFF] border border-[#EAE3D8] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col z-10 text-[#2C2A29] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#FFFFFF]/80 backdrop-blur-md hover:bg-[#FAF8F5]/90 border border-[#EAE3D8] text-[#6D675E] hover:text-[#2C2A29] flex items-center justify-center transition-all cursor-pointer shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#EAE3D8] p-5 sm:p-7 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#EAE3D8] flex items-center justify-center text-[#BFA57A] shadow-sm">
            {content.icon}
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2C2A29]">{content.title}</h2>
            <p className="text-xs sm:text-sm font-mono text-[#8C8375] uppercase tracking-wider font-bold mt-1">{content.subtitle}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto bg-[#FFFFFF] flex-grow">
          {content.renderContent()}
        </div>
      </motion.div>
    </div>
  );
}
