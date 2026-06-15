import { LucideIcon, HeartPulse, GraduationCap, Car, Home, Scale, Lightbulb, ShoppingBag, ShieldPlus, Hospital, Book, Baby, FileText, Key, Bus, Coins, Users, Landmark, Monitor, Wine, Smartphone, AlertTriangle, Sun, Wifi, ShoppingCart, Store, Receipt, ChevronRight, Briefcase, Search } from 'lucide-react';

export interface GuideSection {
  heading: string;
  content: string;
  bullets?: string[];
  imageUrl?: string;
  address?: string;
  link?: {
    text: string;
    url: string;
  };
  listItems?: {
    title: string;
    description: string;
    link?: {
      text: string;
      url: string;
    };
  }[];
}

export interface GuideTab {
  id: string;
  label: string;
  icon: string;
  sections: GuideSection[];
}

export interface GuideArticle {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  tabs: GuideTab[];
}

export const EXPAT_GUIDES: GuideArticle[] = [
  {
    id: 'employment',
    title: 'Employment & Visas',
    shortDescription: 'Navigate the UAE visa system, employment laws, and the job market.',
    icon: 'Briefcase',
    tabs: [
      {
        id: 'visas',
        label: 'Visa Types',
        icon: 'FileText',
        sections: [
          {
            heading: 'Residency Visas',
            content: 'To live and work in Dubai, a valid residency visa is crucial. The UAE has been continuously updating its visa regime to attract talents and investors.',
            imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80',
            link: { text: 'Official UAE Visa Info', url: 'https://u.ae/en/information-and-services/visa-and-emirates-id' },
            listItems: [
              {
                title: 'Employment Visa',
                description: 'Sponsored by your employer. Usually valid for 2 years. Costs are borne by the employer by law.',
                link: { text: 'Learn More', url: 'https://u.ae/en/information-and-services/visa-and-emirates-id' }
              },
              {
                title: 'Golden Visa',
                description: 'A 5 or 10-year residency visa for investors, outstanding students, and specialized talents. No sponsor needed.',
                link: { text: 'Eligibility Check', url: 'https://gdrfad.gov.ae/en/services' }
              },
              {
                title: 'Green Visa',
                description: 'A 5-year visa for skilled employees (requires BA degree and specific salary threshold) or freelancers.',
                link: { text: 'Requirements', url: 'https://u.ae/en/information-and-services/visa-and-emirates-id' }
              },
              {
                title: 'Freelance & Remote Work',
                description: 'Various free zones offer specialized 1-year or 2-year visas to run your own micro-business or work remotely.',
                link: { text: 'GoFreelance', url: 'https://gofreelance.ae/' }
              }
            ]
          }
        ]
      },
      {
        id: 'emp_types',
        label: 'Employment Types',
        icon: 'Users',
        sections: [
          {
            heading: 'Mainland vs. Free Zone',
            content: 'Your employment structure deeply depends on where the company is registered, affecting your visa sponsor and applicable labor laws.',
            imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
            bullets: [
              'Mainland (MOHRE): Companies registered here are governed directly by the Ministry of Human Resources and Emiratisation.',
              'Free Zones (e.g., DIFC, DMCC): Have their own distinct labor rules and courts. For instance, DIFC courts operate under common law instead of UAE Federal Law.',
              'Part-Time work is legal but requires a specific part-time work permit and a primary sponsor NOC (No Objection Certificate).',
              'MNCs vs Local Companies: Multinational corporations generally conform to global HR practices (often standardizing benefits), whereas local groups might negotiate packages uniquely based on nationality, experience, and local market rates.'
            ]
          }
        ]
      },
      {
        id: 'jobs',
        label: 'Job Hunting',
        icon: 'Search',
        sections: [
          {
            heading: 'Where to Look',
            content: 'The Dubai job market is robust but hyper-competitive. Leveraging specialized headhunters and direct outreach is far more effective than casual applying.',
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80',
            listItems: [
              {
                title: 'LinkedIn Middle East',
                description: 'The number one tool for finding roles and networking in the GCC.',
                link: { text: 'Go to LinkedIn', url: 'https://www.linkedin.com/jobs/jobs-in-dubai/' }
              },
              {
                title: 'GulfTalent',
                description: 'Major regional job board offering direct applications across all industries.',
                link: { text: 'Visit GulfTalent', url: 'https://www.gulftalent.com/uae/jobs/dubai' }
              },
              {
                title: 'Bayt',
                description: 'One of the oldest and largest job portals in the Middle East.',
                link: { text: 'Visit Bayt', url: 'https://www.bayt.com/en/uae/' }
              },
              {
                title: 'Hays Middle East',
                description: 'Premium recruitment agency focusing on mid-to-senior level roles.',
                link: { text: 'Visit Hays', url: 'https://www.hays.ae/' }
              }
            ]
          }
        ]
      },
      {
        id: 'laws',
        label: 'Employment Laws',
        icon: 'Scale',
        sections: [
          {
            heading: 'Worker Rights & Contracts',
            content: 'The UAE updated its Federal Labor Law (Decree Law No. 33 of 2021) to enhance protections, introduce new work models, and align with global practices.',
            bullets: [
              'Probation periods cannot exceed 6 months by law. Notice periods during probation must be 14 days minimum.',
              'End of Service Gratuity: A severance payout calculated based on the final basic salary (21 days pay for first 5 years, 30 days thereafter) if quitting after 1+ years.',
              'Limited Contracts: All contracts are now fixed-term (max 3 years, renewable) offering clearer protections.',
              'Annual Leave: Employees are entitled to 30 calendar days of paid leave per year.',
              'Anti-Discrimination & Equal Pay: Laws strictly mandate equal pay for equal work and prohibit discrimination.',
              'A non-compete clause may be enforced if you join a direct competitor, provided it is geographically and temporally limited (max 2 years).'
            ]
          }
        ]
      },
      {
        id: 'tips',
        label: 'Visa & Job Tips',
        icon: 'Lightbulb',
        sections: [
          {
            heading: 'Surviving the Market',
            content: 'Key advice for navigating recruitment and settling in as an employee in Dubai.',
            bullets: [
              'Do NOT pay recruiters: It is strictly illegal under UAE law for recruitment agencies to charge job seekers a fee.',
              'Salary Negotiations: "Basic Salary" vs "Allowances". Your End of Service Gratuity is calculated only on the Basic, so ensure it makes up a healthy percentage (usually 50-60%) of your total package.',
              'Document Authentication: Ensure your degrees and marriage certificates are locally attested (Ministry of Foreign Affairs) before arriving, as this can take months.',
              'CV Formats & Market Approach: Middle Eastern CVs often (though not strictly legally required) include a professional headshot, clear disclosure of nationality, marital status, and current visa status. This helps HR quickly filter candidates based on visa quotas and allowance caps.',
              'Emirates ID: This is your absolute most vital card—required for renting, banking, internet, and driving. Your life is paused until it is printed.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Insurance',
    shortDescription: 'Navigate the private medical system, health coverage, and pharmacies in Dubai.',
    icon: 'HeartPulse',
    tabs: [
      {
        id: 'rules',
        label: 'Healthcare Rules',
        icon: 'Scale',
        sections: [
          {
            heading: 'Mandatory Health Insurance',
            content: 'In Dubai, the Dubai Health Authority (DHA) mandates that every resident must have health insurance. Uninsured residents face monthly fines.',
            bullets: [
              'Employer Responsibility: Employers are legally required to provide a minimum standard of health insurance for employees.',
              'Dependents: Employees are usually responsible for insuring their dependents (spouse/children), though some generous packages include family coverage.',
              'EBP (Essential Benefits Plan): A basic tier mandated by law, but highly restrictive with long wait times.',
              'Pre-approval: Many specialized treatments, MRIs, or non-emergency surgeries require prior approval from the insurance company before the hospital can proceed.'
            ]
          }
        ]
      },
      {
        id: 'insurance',
        label: 'Insurance Companies',
        icon: 'ShieldPlus',
        sections: [
          {
            heading: 'Major Providers',
            content: 'Insurers operate in tiers (Basic, Comprehensive, Premium). Selecting the right tier dictates which hospitals ("network") you can access without paying out of pocket.',
            listItems: [
              {
                title: 'Bupa Global / Oman Insurance',
                description: 'Premium worldwide coverage. Highly sought after for expats needing access to the absolute best facilities.',
                link: { text: 'Visit Bupa', url: 'https://www.bupaglobal.com/en' }
              },
              {
                title: 'Cigna',
                description: 'Top-tier international coverage, renowned for customer service and mental health inclusion.',
                link: { text: 'Visit Cigna', url: 'https://www.cigna-me.com/' }
              },
              {
                title: 'AXA / GIG',
                description: 'A very popular comprehensive choice for mid-to-high tier employer plans.',
                link: { text: 'Visit GIG', url: 'https://www.gulfinsurance.ae/' }
              },
              {
                title: 'Daman National',
                description: 'Major local provider offering everything from basic DHA plans to comprehensive premium tiers.',
                link: { text: 'Visit Daman', url: 'https://www.damanhealth.ae/' }
              }
            ]
          }
        ]
      },
      {
        id: 'hospitals',
        label: 'Hospitals & Clinics',
        icon: 'Hospital',
        sections: [
          {
            heading: 'Private Medical Centers',
            content: 'Dubai Healthcare City is a dedicated medical hub, but premium clinics are distributed everywhere. Quality is exceptionally high in premium tiers.',
            imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
            listItems: [
              {
                title: 'Mediclinic City Hospital',
                description: 'Located in Healthcare City. High-end multidisciplinary hospital with exceptional maternity & trauma care.',
                link: { text: 'Book Appointment', url: 'https://www.mediclinic.ae/' }
              },
              {
                title: 'Saudi German Hospital',
                description: 'Massive, highly equipped hospital in Al Barsha serving as a major tertiary care center.',
                link: { text: 'Book Appointment', url: 'https://sghdubai.ae/' }
              },
              {
                title: 'American Hospital Dubai',
                description: 'Pioneering private hospital known for complex surgeries and robotic medicine.',
                link: { text: 'Book Appointment', url: 'https://www.ahdubai.com/' }
              },
              {
                title: 'King’s College Hospital',
                description: 'Bringing British medical standards to Dubai Hills with UK-trained physicians.',
                link: { text: 'Book Appointment', url: 'https://kingscollegehospitaldubai.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'pharmacies',
        label: 'Pharmacies & Meds',
        icon: 'HeartPulse',
        sections: [
          {
            heading: 'Rules for Controlled Medication',
            content: 'The UAE has strict classifications for what counts as an illegal narcotic, a controlled drug, and an over-the-counter medicine.',
            bullets: [
              'Banned Medicines: Products containing codeine, poppy seeds, or CBD are strictly forbidden and can cause immediate arrest at the airport.',
              'Controlled Medicines: Sleeping pills (e.g. Ambien), anti-anxiety meds (e.g. Xanax), and some ADHD medications are highly restricted. You MUST obtain pre-approval from the Ministry of Health before traveling with them.',
              'Antibiotics are strictly prescription-only.',
              'Standard painkillers (Paracetamol, Ibuprofen) are available over the counter everywhere.'
            ]
          },
          {
            heading: 'Popular Pharmacies',
            content: 'Pharmacies are ubiquitous, found in every mall and neighborhood center.',
            listItems: [
              {
                title: 'Life Pharmacy',
                description: 'The largest chain in Dubai. Many branches operate 24/7. Huge range of supplements.',
                link: { text: 'Life Pharmacy', url: 'https://www.lifepharmacy.com/' }
              },
              {
                title: 'Aster Pharmacy',
                description: 'Widespread network across all neighborhoods, often attached to Aster clinics.',
                link: { text: 'Aster Online', url: 'https://www.asterpharmacy.ae/' }
              },
              {
                title: 'Boots',
                description: 'Familiar to UK expats, carrying familiar health and beauty brands. Found in most malls.',
                link: { text: 'Boots ME', url: 'https://me.boots.com/' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    title: 'Education & Schools',
    shortDescription: 'Understanding international curricula, KHDA ratings, and universities.',
    icon: 'GraduationCap',
    tabs: [
      {
        id: 'laws',
        label: 'Education Laws',
        icon: 'Scale',
        sections: [
          {
            heading: 'KHDA and Ministry of Education',
            content: 'The Knowledge and Human Development Authority (KHDA) governs all private education in Dubai.',
            bullets: [
              'Schools are inspected annually with ratings: Outstanding, Very Good, Good, Acceptable, Weak.',
              'Tuition fee increases are directly tied to these ratings by law (e.g., an Outstanding school can increase fees by a higher percentage than a Good school).',
              'Arabic language is mandatory for all students up to Year 10 / Grade 9.',
              'Islamic Studies is a mandatory subject for all Muslim students.'
            ]
          }
        ]
      },
      {
        id: 'schools',
        label: 'Schools (K-12)',
        icon: 'Book',
        sections: [
          {
            heading: 'Top-Rated International Schools',
            content: 'Dubai hosts an immense variety of international schools catering to expats, primarily British, American, Indian, and IB. Fees can be exorbitant (50k - 120k AED per year).',
            listItems: [
              {
                title: 'Dubai College (DC)',
                description: 'Consistently rated Outstanding. Highly academic British curriculum. Notoriously difficult to get into.',
                link: { text: 'Dubai College', url: 'https://www.dubaicollege.org/' }
              },
              {
                title: 'GEMS Wellington International',
                description: 'Massive, highly-rated British/IB school located in the central Al Sufouh area.',
                link: { text: 'Wellington Inter', url: 'https://www.wellingtoninternationalschool.com/' }
              },
              {
                title: 'American School of Dubai (ASD)',
                description: 'Non-profit US curriculum school. Huge campus, incredible facilities, favored by US/Canadian expats.',
                link: { text: 'ASD Dubai', url: 'https://www.asdubai.org/' }
              },
              {
                title: 'Dubai International Academy (DIA)',
                description: 'A leading IB (International Baccalaureate) continuum school located in Emirates Hills.',
                link: { text: 'DIA Emirates Hills', url: 'https://www.diadubai.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'kindergarten',
        label: 'Kindergartens & Nurseries',
        icon: 'Baby',
        sections: [
          {
            heading: 'Early Years Education',
            content: 'Nurseries usually cater to children from 45 days up to 4 years old (FS1/Pre-K). Competition for spots in top nurseries is fierce.',
            listItems: [
              {
                title: 'Blossom Nursery',
                description: 'Award-winning eco-friendly EYFS nurseries with branches in Marina, Downtown, and Arabian Ranches.',
                link: { text: 'Blossom Nursery', url: 'https://www.theblossomnursery.com/' }
              },
              {
                title: 'British Orchard Nursery',
                description: 'Focuses on early childhood development in a highly nurturing, community-based setting.',
                link: { text: 'British Orchard', url: 'https://www.britishorchardnursery.com/' }
              },
              {
                title: 'Step by Step Nursery',
                description: 'High-quality Reggio Emilia and EYFS hybrid located in Dubailand and Mirdif.',
                link: { text: 'Step by Step', url: 'https://stepbystepnursery.ae/' }
              }
            ]
          }
        ]
      },
      {
        id: 'universities',
        label: 'Universities',
        icon: 'GraduationCap',
        sections: [
          {
            heading: 'Higher Education Hubs',
            content: 'Dubai is home to several international university branch campuses, allowing students to earn globally recognized degrees without leaving the UAE.',
            imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80',
            address: 'Dubai Knowledge Park, Al Sufouh',
            listItems: [
              {
                title: 'University of Birmingham Dubai',
                description: 'A top UK Russell Group university offering identical degrees to its UK campus.',
                link: { text: 'UoB Dubai', url: 'https://www.birmingham.ac.uk/dubai' }
              },
              {
                title: 'Heriot-Watt University',
                description: 'Exceptional for engineering and business. Huge modern campus in Knowledge Park.',
                link: { text: 'Heriot-Watt', url: 'https://www.hw.ac.uk/dubai/' }
              },
              {
                title: 'American University in Dubai (AUD)',
                description: 'US-accredited institution in Media City offering strong media, engineering, and business programs.',
                link: { text: 'AUD', url: 'https://www.aud.edu/' }
              }
            ]
          },
          {
            heading: 'Remote Enrollment & Student Visas',
            content: 'Dubai heavily incentivizes international students to study in the emirate.',
            bullets: [
              'Enrollment from Outside: You can apply online to almost all branch campuses from your home country. Once accepted, the university acts as your visa sponsor.',
              'Student Visa: Usually valid for 1 year, renewable. You enter on a student entry permit, then complete the medical check and Emirates ID process locally.',
              'Golden Visa for Students: Outstanding university graduates (GPA 3.8+) or high school top performers may be nominated directly by the Ministry of Education for a 10-year Golden Visa.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cars',
    title: 'Cars & Traffic',
    shortDescription: 'Acquiring a vehicle, traffic laws, Salik tolls, and licensing.',
    icon: 'Car',
    tabs: [
      {
        id: 'traffic',
        label: 'Traffic Laws',
        icon: 'Scale',
        sections: [
          {
            heading: 'Strict Enforcement',
            content: 'Dubai utilizes an incredibly dense network of speed cameras, AI radar, and police patrols. Traffic laws are rigid and unforgiving.',
            bullets: [
              'Zero Tolerance for Alcohol: Drink-driving results in immediate jail time, vehicle confiscation, massive fines (up to 20,000 AED), and deportation.',
              'Speeding: Cameras flash at exactly 20 km/h over the posted limit (in Dubai). Note: Abu Dhabi has NO buffer.',
              'Tailgating: AI radars now automatically fine drivers for not leaving sufficient safe distance at high speeds.',
              'Black Points: Offenses generate black points on your file. Accrue 24, and your license is suspended.'
            ]
          }
        ]
      },
      {
        id: 'license',
        label: 'License Acquisition',
        icon: 'FileText',
        sections: [
          {
            heading: 'Getting a UAE License',
            content: 'The process depends entirely on the passport you hold and where your current driving license was issued.',
            bullets: [
              'Direct Exchange: Citizens of the UK, USA, most of the EU, Australia, and a few others can simply swap their home license for a Dubai one in 15 minutes at an RTA center.',
              'Testing Required: Most Asian, African, and South American expats must open a traffic file and take mandatory driving classes (10-20 hours) and pass an RTA road test.',
              'Costs: A direct exchange costs around 800 AED. Full testing and classes can cost between 4,000 to 8,000 AED.'
            ]
          }
        ]
      },
      {
        id: 'buyrent',
        label: 'Companies & Agencies',
        icon: 'Key',
        sections: [
          {
            heading: 'Where to Buy or Lease',
            content: 'Car leasing is extremely popular for new expats. If buying, the second-hand market is huge due to the transient population.',
            listItems: [
              {
                title: 'Cars24 & Kavak',
                description: 'Used car platforms offering fully inspected vehicles online, home delivery, and warranties.',
                link: { text: 'Visit Cars24', url: 'https://www.cars24.com/ae/' }
              },
              {
                title: 'YallaMotor',
                description: 'The largest automotive portal in the region, excellent for price research and finding new/used deals.',
                link: { text: 'YallaMotor', url: 'https://www.yallamotor.com/' }
              },
              {
                title: 'SellAnyCar.com',
                description: 'Massive operation for quickly liquidating your vehicle when leaving the country, though quotes tend to be wholesale.',
                link: { text: 'SellAnyCar', url: 'https://sellanycar.com/' }
              },
              {
                title: 'OneClickDrive',
                description: 'A massive aggregator for car rentals—ranging from cheap daily drives to luxury supercars.',
                link: { text: 'OneClickDrive', url: 'https://www.oneclickdrive.com/' }
              },
              {
                title: 'Ekar & Udrive',
                description: 'App-based smart car-sharing. Unlock cars parked on the street with your phone and pay per minute.',
                link: { text: 'Ekar', url: 'https://ekar.me/' }
              },
              {
                title: 'Dubizzle (Classifieds)',
                description: 'The standard P2P marketplace. Good deals but requires vigilance against scams or hidden damages.',
                link: { text: 'Dubizzle Autos', url: 'https://dubai.dubizzle.com/motors/' }
              }
            ]
          }
        ]
      },
      {
        id: 'public',
        label: 'Public Transport',
        icon: 'Bus',
        sections: [
          {
            heading: 'Metro & Taxis',
            content: 'Dubai has a world-class, but limited-reach, public transport network requiring a Nol Card to use.',
            bullets: [
              'Nol Card: The smart card used to pay for the Metro, Tram, RTA Buses, and RTA Taxis.',
              'Dubai Metro: Fully automated. Features a Gold Class (premium fare, less crowded) and a dedicated Women & Children cabin.',
              'Taxis: Relatively affordable. Starting fare is 12 AED if hailed from the street, or 12 AED via app.',
              'Careem/Hala: Use the Careem app to book standard RTA taxis (Hala Taxi) or premium Lexus cars.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'property',
    title: 'Property Renting',
    shortDescription: 'Navigating Ejari, cheques, brokerage fees, and tenant rights.',
    icon: 'Home',
    tabs: [
      {
        id: 'laws',
        label: 'Rental Laws & RERA',
        icon: 'Scale',
        sections: [
          {
            heading: 'Tenant Rights',
            content: 'The Real Estate Regulatory Agency (RERA) heavily regulates the landlord-tenant relationship to ensure stability.',
            bullets: [
              'Eviction Notice: A landlord CANNOT ask you to leave on a whim. They must provide 12 months written notice, delivered via Notary Public or Registered Mail, and only for specific reasons (e.g., selling, moving in themselves).',
              'Rent Increases: Determined strictly by the RERA Rent Calculator. If you are paying below market rate, they can only increase by a capped percentage (5-20% max).',
              'Maintenance: By convention (and contract), the landlord handles major repairs (above 500 AED), while the tenant assumes minor wear-and-tear costs.'
            ]
          }
        ]
      },
      {
        id: 'process',
        label: 'The Leasing Process',
        icon: 'FileText',
        sections: [
          {
            heading: 'Cheques and Ejari',
            content: 'The typical process for securing an apartment in Dubai.',
            bullets: [
              'Offer & Deposit: You place a 5% security deposit to take the property off the market.',
              'Tenancy Contract & Cheques: You sign the contract and hand over post-dated cheques (usually 1, 2, 4, or sometimes up to 12). Cheque bouncing is a serious offense.',
              'Ejari: You take the signed contract to a typing center to register it in the government Ejari system (approx 220 AED). This is required to activate water and electricity.',
              'DEWA: Setup deposit for water and electricity (2,000 AED for apartments, 4,000 AED for villas).'
            ]
          },
          {
            heading: 'The Short-Term Strategy',
            content: 'Highly recommended for new arrivals before committing to a 1-year Ejari.',
            bullets: [
              'Rent Airbnb First: Rent a holiday home or hotel apartment for your first 1-2 months. It costs a premium, but ensures you can explore neighborhoods and your commute during rush hour before signing a binding contract.',
              'No Utilities Hassle: Short-term rentals include high-speed internet, DEWA, and chiller fees—giving you time to get your Emirates ID printed without sitting in the dark.',
              'Beware Fake Agents: Short-term rentals are heavily targeted by scammers. Verify the agent\'s RERA ID and the company\'s trade license before wiring any deposit.'
            ]
          }
        ]
      },
      {
        id: 'platforms',
        label: 'Search Platforms',
        icon: 'Search',
        sections: [
          {
            heading: 'Where to find property',
            content: 'Do not just walk into buildings; the market is heavily broker-driven and digitized via major portals.',
            listItems: [
              {
                title: 'Property Finder',
                description: 'The most comprehensive and clean real estate portal in the UAE. Verified listings.',
                link: { text: 'Property Finder', url: 'https://www.propertyfinder.ae/' }
              },
              {
                title: 'Bayut',
                description: 'Major competitor to Property Finder. Excellent map and community data features.',
                link: { text: 'Bayut', url: 'https://www.bayut.com/' }
              },
              {
                title: 'Dubizzle Property',
                description: 'Classifieds site. Great for finding direct-from-landlord deals to avoid the 5% agency fee.',
                link: { text: 'Dubizzle', url: 'https://dubai.dubizzle.com/property-for-rent/' }
              },
              {
                title: 'Houza',
                description: 'Created by a network of real estate agencies to combat fake listings, ensuring only genuine properties are shown.',
                link: { text: 'Houza', url: 'https://houza.com/' }
              },
              {
                title: 'Zoom Property',
                description: 'Fast-growing property portal especially strong in affordable housing and new developments.',
                link: { text: 'Zoom Property', url: 'https://www.zoomproperty.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'brokers',
        label: 'Property Brokers',
        icon: 'Briefcase',
        sections: [
          {
            heading: 'Leading Real Estate Agencies',
            content: 'If buying, or looking for premium leasing assistance, these agencies dominate the market.',
            listItems: [
              {
                title: 'Allsopp & Allsopp',
                description: 'One of the largest, heavily awarded agencies, especially dominant in British expat networks.',
                link: { text: 'Allsopp & Allsopp', url: 'https://www.allsoppandallsopp.com/' }
              },
              {
                title: 'Betterhomes',
                description: 'The oldest real estate agency in Dubai, extensive portfolio across all price ranges.',
                link: { text: 'Betterhomes', url: 'https://www.bhomes.com/' }
              },
              {
                title: 'Haus & Haus',
                description: 'Specialists in premium areas like Dubai Hills, Arabian Ranches, and Marina.',
                link: { text: 'Haus & Haus', url: 'https://www.hausandhaus.com/' }
              },
              {
                title: 'fam Properties',
                description: 'Huge data-driven agency, heavily involved in off-plan (new development) sales.',
                link: { text: 'fam Properties', url: 'https://famproperties.com/' }
              },
              {
                title: 'D&B Properties',
                description: 'Award-winning firm highly connected with major developers like Emaar and Nakheel.',
                link: { text: 'D&B Properties', url: 'https://dandbdubai.com/' }
              },
              {
                title: 'Provident Real Estate',
                description: 'A leading full-service property agency with massive reach and specialized sub-teams.',
                link: { text: 'Provident', url: 'https://www.providentestate.com/' }
              },
              {
                title: 'Espace Real Estate',
                description: 'Particularly strong in villa communities like Jumeirah Islands, Meadows, and Springs.',
                link: { text: 'Espace', url: 'https://www.espace.ae/' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rules',
    title: 'Rules & Behavioral Laws',
    shortDescription: 'Essential cultural etiquettes, financial regulations, and public behavior.',
    icon: 'Scale',
    tabs: [
      {
        id: 'culture',
        label: 'Cultural Etiquette',
        icon: 'Users',
        sections: [
          {
            heading: 'Respecting Islamic Traditions',
            content: 'Dubai is extremely tolerant, hosting over 200 nationalities, but public decorum is strictly enforced to maintain harmony.',
            bullets: [
              'Modest Dress: Malls and government buildings have dress codes. Shoulders and knees should generally be covered. Swimwear is only for the beach or pool.',
              'PDA (Public Displays of Affection): Holding hands for married couples is okay. Kissing or passionate hugging in public is illegal and can lead to arrest.',
              'Ramadan: During the holy month, eating, drinking, chewing gum, or smoking in public during daylight hours is highly restricted and offensive.',
              'Photography: Taking photos of government buildings, military sites, or aircraft is prohibited. Crucially, taking photos of people without their consent (especially local women) is a massive offense.'
            ]
          }
        ]
      },
      {
        id: 'cyber',
        label: 'Cyber Laws',
        icon: 'Monitor',
        sections: [
          {
            heading: 'Online Behavior & Privacy',
            content: 'The UAE has some of the strictest cybercrime laws in the world to prevent defamation and fraud.',
            bullets: [
              'Swearing or Insulting: Using foul language, insulting someone, or sending the "middle finger" emoji on WhatsApp is a crime leading to heavy fines or deportation.',
              'Defamation: Naming and shaming a company online (e.g., leaving an angry, insulting Google Review) can result in a police case against you.',
              'VPN Usage: Using a VPN is technically legal for corporate use or accessing home media, but using it to commit a crime, access blocked illegal content, or bypass telecom laws for VOIP calls (like WhatsApp audio/video) carries multi-million Dirham fines if caught.',
              'Rumors & News: Spreading unverified fake news or rumors on social media is heavily penalized. Only share official government announcements.'
            ]
          }
        ]
      },
      {
        id: 'alcohol',
        label: 'Alcohol Rules',
        icon: 'Wine',
        sections: [
          {
            heading: 'Licensing & Consumption',
            content: 'Dubai has relaxed many rules recently, but strict boundaries remain regarding intoxication.',
            bullets: [
              'Where to Drink: Alcohol can only be consumed in licensed venues (hotels, specific clubs, some restaurants) or in your private home. Walking down the street with a beer is strictly illegal.',
              'Buying for Home: Non-Muslim residents can instantly get a free, digital Liquor License by presenting their Emirates ID at an MMI or African + Eastern store (the two official liquor retail chains). There is no longer a license fee or home-salary restriction.',
              'Alternative Buying: Expats often buy their alcohol duty-free at DXB airport upon arrival (with generous allowances) or legally drive 1 hour to the "Barracuda" resort in the emirate of Umm Al Quwain to buy in bulk without needing a license.',
              'Drunk Behavior: Zero tolerance for public intoxication, fighting, or offensive behavior under the influence. It will result in immediate arrest.',
              'DUI: Drink driving has exactly zero tolerance. 0.0 limit. Do not have a single sip and drive.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tips',
    title: 'Tips and Caveats',
    shortDescription: 'Hidden costs, useful apps, finances, and surviving the Dubai summer.',
    icon: 'Lightbulb',
    tabs: [
      {
        id: 'finance',
        label: 'Banking & Bills',
        icon: 'Landmark',
        sections: [
          {
            heading: 'Financial Management',
            content: 'The UAE banking system is highly advanced, but credit can be a trap for new arrivals.',
            bullets: [
              'Opening an Account: Requires your Emirates ID, passport, and a Salary Certificate from your employer. Emirates NBD, ADCB, and Mashreq are dominant local banks.',
              'Credit Cards: Banks hand them out aggressively. Missing payments incurs massive late fees and compound interest.',
              'Tax & Offshore Structuring: For high-earning freelancers and remote workers wanting maximum banking security and 0% corporate tax, a popular playbook is establishing a US LLC (e.g., via Stripe Atlas or Firstbase), opening a Singapore or US business bank account (e.g., Mercury, Wise), and then legally "hiring yourself" in Dubai. You live in Dubai tax-free (0% personal income tax) on a Green or Freelance Visa, while your foreign company shields its assets internationally.',
              'The "Housing Fee": Your monthly DEWA (electric/water) bill includes a municipal housing fee, which is automatically calculated as 5% of your annual rent, divided by 12.',
              'Knowledge Fee: Almost every government transaction (visa, licensing, fines) includes a standard 20 AED "Knowledge and Innovation Fee".'
            ]
          }
        ]
      },
      {
        id: 'apps',
        label: 'Must-Have Apps',
        icon: 'Smartphone',
        sections: [
          {
            heading: 'The Digital Lifestyle',
            content: 'Dubai operates on smartphone delivery and services. You rarely ever need cash.',
            listItems: [
              {
                title: 'Careem',
                description: 'The "Everything App". Taxishailing, food delivery, bike rentals, cleaning, PCR tests, and digital wallet.',
                link: { text: 'Download Careem', url: 'https://www.careem.com/' }
              },
              {
                title: 'Dubai Police App',
                description: 'Vital. Used to report minor car accidents instantly, pay fines, and access emergency services.',
                link: { text: 'Dubai Police', url: 'https://www.dubaipolice.gov.ae/' }
              },
              {
                title: 'Al Hosn',
                description: 'The national health registry app. Used for vaccination records and official medical results.',
                link: { text: 'Al Hosn', url: 'https://alhosnapp.ae/' }
              },
              {
                title: 'Dubizzle',
                description: 'The Craigslist of Dubai. Buy, sell, rent anything from cars to beds to apartments.',
                link: { text: 'Dubizzle', url: 'https://dubai.dubizzle.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'weather',
        label: 'Weather Survival',
        icon: 'Sun',
        sections: [
          {
            heading: 'Surviving Summer',
            content: 'From June to September, temperatures hover around 40-48°C (104-118°F) with intense humidity.',
            bullets: [
              'Indoor Living: The city anticipates this. Literally everything is aggressively air-conditioned (even bus stops).',
              'Car Safety: Never leave aerosol cans, hand sanitizers, or electronics in your car, as they can explode in the heat. Leather steering wheels can cause mild burns without a sunshade.',
              'Vitamin D: Ironically, many expats become Vitamin D deficient because they spend summer entirely indoors. Take supplements.',
              'Winter is Perfect: October to April is stunning, sunny, and 20-30°C. Everyone eats outdoors and hits the beach.'
            ]
          }
        ]
      },
      {
        id: 'deals',
        label: 'Deals & Perks',
        icon: 'Coins',
        sections: [
          {
            heading: 'Coupons & Discounts',
            content: 'Dubai can be incredibly expensive, but those in the know rarely pay full price for lifestyle outlays.',
            listItems: [
              {
                title: 'The Entertainer App',
                description: 'The golden rule of Dubai dining and entertainment. It costs around 400 AED per year but gives unlimited 2-for-1 vouchers across thousands of premium restaurants and theme parks.',
                link: { text: 'The Entertainer', url: 'https://www.theentertainerme.com/' }
              },
              {
                title: 'Cobone & Groupon UAE',
                description: 'Extensive daily deals for spas, desert safaris, dhow cruises, and car tinting services. Excellent for new arrivals trying to do tourist activities cheaply.',
                link: { text: 'Cobone', url: 'https://www.cobone.com/en/deals/dubai' }
              },
              {
                title: 'Supermarket Loyalty',
                description: 'Carrefour uses the SHARE app for points. Spinneys and Waitrose have their own loyalty tiers. These points quickly add up to free grocery shops.',
                link: { text: 'SHARE Rewards', url: 'https://www.sharerewards.com/' }
              }
            ]
          },
          {
            heading: 'Major Expat Perks',
            content: 'Beyond the sunshine and safety, being an official resident unlocks significant systemic advantages.',
            bullets: [
              'Tax Domicile Certificate: Once you have been a resident for 180+ days, you can apply for a Tax Residency Certificate from the Ministry of Finance. This is vital to prove to your home country that you should no longer be taxed by them.',
              'Zone Discounts: Many Free Zones (like DIFC or Media City) issue their own internal ID cards, which give baseline discounts (10-20%) across all coffee shops and gyms located within that geographical zone.',
              'Airport E-Gates: Your Emirates ID lets you bypass immigration queues at DXB entirely. You just walk through the smart gates by scanning your face in 10 seconds.'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping & Malls',
    shortDescription: 'Mega-malls, everyday groceries, taxes, and local markets.',
    icon: 'ShoppingBag',
    tabs: [
      {
        id: 'malls',
        label: 'Mega Malls',
        icon: 'ShoppingBag',
        sections: [
          {
            heading: 'The Retail Palaces',
            content: 'Malls in Dubai are essentially indoor climate-controlled cities serving as social hubs, dining districts, and entertainment centers.',
            listItems: [
              {
                title: 'Dubai Mall',
                description: 'The most visited mall on earth. Features an Olympic ice rink, huge aquarium, and the Burj Khalifa entrance.',
                link: { text: 'The Dubai Mall', url: 'https://thedubaimall.com/' }
              },
              {
                title: 'Mall of the Emirates',
                description: 'Iconic luxury mall located in Al Barsha featuring Ski Dubai, the famous indoor ski slope.',
                link: { text: 'Mall of the Emirates', url: 'https://www.malloftheemirates.com/' }
              },
              {
                title: 'Dubai Hills Mall',
                description: 'The newest mega-mall. Highly popular among residents due to better parking, a huge cinema, and an indoor rollercoaster.',
                link: { text: 'Dubai Hills Mall', url: 'https://www.dubaihillsmall.ae/' }
              },
              {
                title: 'Ibn Battuta Mall',
                description: 'Themed around the journeys of the explorer Ibn Battuta. Impressive architecture and very practical for southern expats.',
                link: { text: 'Ibn Battuta', url: 'https://www.ibnbattutamall.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'groceries',
        label: 'Supermarkets',
        icon: 'ShoppingCart',
        sections: [
          {
            heading: 'Everyday Groceries',
            content: 'The scale of imported goods means you can find your exact home-country brand of butter or cereal, but often at a premium.',
            listItems: [
              {
                title: 'Waitrose & Spinneys',
                description: 'Very high quality, premium pricing. Essential for British expats looking for home brands and pork products.',
                link: { text: 'Spinneys', url: 'https://www.spinneys.com/' }
              },
              {
                title: 'Carrefour Middle East',
                description: 'Massive French hypermarket offering excellent value on electronics, clothes, and standard groceries.',
                link: { text: 'Carrefour', url: 'https://www.carrefouruae.com/' }
              },
              {
                title: 'Viva',
                description: 'A massive recent success. A hard-discount German-style supermarket (like Aldi) offering incredibly cheap Euro imports.',
                link: { text: 'Viva', url: 'https://myviva.com/' }
              },
              {
                title: 'Kibsons (App Delivery)',
                description: 'The secret weapon for expats. Incredible app for cheap, high-quality bulk fruits, veg, and meat delivered next day.',
                link: { text: 'Kibsons', url: 'https://www.kibsons.com/' }
              }
            ]
          }
        ]
      },
      {
        id: 'souks',
        label: 'Traditional Souks',
        icon: 'Store',
        sections: [
          {
            heading: 'Old Dubai Markets',
            content: 'To experience the trading roots of Dubai, cross the creek on an Abra (wooden boat) for 1 AED and explore the Deira souks.',
            listItems: [
              {
                title: 'Dubai Gold Souk',
                description: 'Hundreds of retailers selling vast quantities of gold. Gold pricing is strict and government-regulated, but you negotiate the "making charge".',
                link: { text: 'Info', url: '#gold' }
              },
              {
                title: 'Spice Souk',
                description: 'Next to the Gold Souk, offering frankincense, saffron, dates, and huge sacks of spices. Haggling is mandatory.',
                link: { text: 'Info', url: '#spice' }
              },
              {
                title: 'Souk Madinat Jumeirah',
                description: 'A modern, high-end, air-conditioned reconstruction of a souk meant primarily for tourists, offering stunning Burj Al Arab views.',
                link: { text: 'Madinat', url: 'https://www.jumeirah.com/en/article/experiences/dubai/souk-madinat-jumeirah' }
              }
            ]
          }
        ]
      },
      {
        id: 'vat',
        label: 'VAT & Refunds',
        icon: 'Receipt',
        sections: [
          {
            heading: 'Tax System',
            content: 'The UAE implemented Value Added Tax to diversify revenue.',
            bullets: [
              'A standard 5% VAT applies to most goods and services, including restaurant bills, groceries, and electronics.',
              'Zero-Rated/Exemptions: Basic healthcare, education tuition, and residential real estate leases do not have VAT.',
              'Tourists (non-residents) can claim VAT refunds on major shopping purchases at the airport upon departure via the Planet tax free kiosks. Ensure you ask the shop for a "Tax Free Tag".'
            ]
          }
        ]
      }
    ]
  }
];
