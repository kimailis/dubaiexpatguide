import { District } from './types';

export const EXTENDED_DISTRICTS: District[] = [
  {
    id: 'business-bay',
    name: 'Business Bay',
    arabicName: 'الخليج التجاري',
    tagline: 'The Commercial Heart',
    iconPath: 'building',
    colorTheme: 'from-blue-600 via-indigo-600 to-purple-700',
    mapSvgPath: '', // Outdated
    description: 'A central commercial and residential district situated alongside the Dubai Water Canal. Known for its ambitious architecture, fast-paced corporate life, and stunning views of the Downtown skyline.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard UAE Corporate Tax of 9% on mainland registered retail & operations.',
      personalTax: '0% personal income tax.',
      customsDuty: 'Standard 5% customs duties.',
      details: 'Business Bay is primarily a mainland zone allowing companies to trade freely across Dubai, though some buildings offer free zone licenses via specific authorities.'
    },
    petSituation: {
      friendlyRating: 3,
      allowed: true,
      rules: [
        'Dogs must be leashed on the Canal walk.',
        'Not all commercial towers permit pets in lobbies.'
      ],
      details: 'The Dubai Water Canal promenade provides a beautiful, long walkway for pets, but finding pet-friendly residential buildings can be hit-or-miss depending on the landlord.',
      bestParks: ['Dubai Water Canal Boardwalk', 'Burj Park (nearby)']
    },
    demographics: {
        "description": "Fast-paced corporate hub populated by young professionals across diverse domains. Popular among single expats and young couples.",
        "dominantGroups": [
            "Indian Corporate Professionals",
            "European Expats",
            "Arab Expats"
        ],
        "stats": [
            {
                "groupName": "Indians",
                "percentage": 30
            },
            {
                "groupName": "Europeans",
                "percentage": 25
            },
            {
                "groupName": "Arab Expats",
                "percentage": 20
            },
            {
                "groupName": "Pakistanis",
                "percentage": 10
            },
            {
                "groupName": "Others",
                "percentage": 15
            }
        ]
    },
    companies: [
      {
        name: 'Bayut',
        industry: 'PropTech marketplace',
        description: 'Leading real estate search engine connecting buyers, investors, and landlords across the UAE.',
        openPositions: [
          { title: 'Senior Backend Engineer', department: 'Data Intelligence', salaryRange: '30k-40k AED', experience: '5+ yrs', careerUrl: '#' }
        ]
      }
    ],
    apartments: [
      {
        id: 'bb-1',
        title: 'Canal View 1-Bed, Executive Towers',
        bedrooms: 1,
        bathrooms: 2,
        sizeSqFt: 950,
        priceAED: 95000,
        locationDetails: 'Heart of Business Bay with quick access to SZR.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&auto=format&fit=crop',
        amenities: ['Pool', 'Gym'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 65000,
      bed1: 90000,
      bed2: 140000,
      bed3: 190000,
      bed4: 250000
    },
    laws: [
      { category: 'Commercial Law', title: 'Mainland Registration', description: 'Requires standard DED licensing.' }
    ],
    bottomNotes: 'Expect heavy traffic during office commute hours. A fantastic area for young professionals.',
    majorAttractions: ['Dubai Water Canal', 'Executive Towers Promenade']
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    arabicName: 'نخلة الجميرا',
    tagline: 'Eighth Wonder of the World',
    iconPath: 'palmtree',
    colorTheme: 'from-amber-400 via-orange-500 to-rose-500',
    mapSvgPath: '',
    description: 'Iconic man-made archipelago in the shape of a palm tree, offering premium beachfront residential villas, ultra-luxury resorts, and world-class dining.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'Mainly a residential and hospitality hub, commercial regulations follow mainland rules.'
    },
    petSituation: {
      friendlyRating: 5,
      allowed: true,
      rules: [
        'Pets are welcome on The Pointe promenade.',
        'Many private beaches are pet-exclusive to residents.'
      ],
      details: 'Considered one of the most pet-friendly areas in Dubai, especially for villa owners with private beach access.',
      bestParks: ['Al Ittihad Park', 'Palm West Beach']
    },
    demographics: {
        "description": "A global wealth haven. Dominated by ultra-high-net-worth locals and elites coming from Europe, Russia, and India.",
        "dominantGroups": [
            "Wealthy European/Russians",
            "Ultra-Rich Emiratis",
            "Affluent Indians"
        ],
        "stats": [
            {
                "groupName": "Europeans/Russians",
                "percentage": 45
            },
            {
                "groupName": "Emiratis",
                "percentage": 20
            },
            {
                "groupName": "Indians",
                "percentage": 15
            },
            {
                "groupName": "Arab Expats",
                "percentage": 10
            },
            {
                "groupName": "Others",
                "percentage": 10
            }
        ]
    },
    companies: [
      {
        name: 'Atlantis The Palm',
        industry: 'Hospitality & Entertainment',
        description: 'World-renowned ocean-themed resort.',
        openPositions: [
          { title: 'Guest Experience Director', department: 'Hospitality', salaryRange: '40k-50k AED', experience: '8+ yrs', careerUrl: '#' }
        ]
      }
    ],
    apartments: [
      {
        id: 'palm-1',
        title: 'Shoreline 2-Bed Beach Access',
        bedrooms: 2,
        bathrooms: 3,
        sizeSqFt: 1550,
        priceAED: 180000,
        locationDetails: 'Shoreline Apartments, trunk of the Palm.',
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=600&auto=format&fit=crop',
        amenities: ['Private Beach', 'Gym'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 95000,
      bed1: 140000,
      bed2: 210000,
      bed3: 350000,
      bed4: 600000
    },
    laws: [
      { category: 'Real Estate', title: 'Freehold Priority', description: 'One of the first dedicated freehold areas for international buyers.' }
    ],
    bottomNotes: 'Entry and exit to the island can be congested during weekends. The monorail offers great internal transit.',
    majorAttractions: ['Atlantis The Palm', 'The View at The Palm', 'Palm West Beach']
  },
  {
    id: 'jvc',
    name: 'Jumeirah Village Circle',
    arabicName: 'دائرة قرية جميرا',
    tagline: 'Community & Family Living',
    iconPath: 'home',
    colorTheme: 'from-amber-400 via-orange-500 to-rose-500',
    mapSvgPath: '',
    description: 'A family-friendly residential development combining community living with urban convenience. Known for its affordable rents and multiple parks.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'Strictly residential and commercial under mainland regulations.'
    },
    petSituation: {
      friendlyRating: 5,
      allowed: true,
      rules: [
        'Excellent for dog owners with numerous parks.',
        'Always clean up after pets.'
      ],
      details: 'One of the most pet-friendly communities for apartments and townhouses.',
      bestParks: ['JVC Circle Park', 'Community Gardens']
    },
    demographics: {
        "description": "A highly diverse, mid-market community blending families from all over the world, particularly South Asia, the Philippines, and Europe.",
        "dominantGroups": [
            "Indian Expats",
            "Pakistani Expats",
            "European Expats",
            "Filipinos"
        ],
        "stats": [
            {
                "groupName": "Indians",
                "percentage": 30
            },
            {
                "groupName": "Pakistanis",
                "percentage": 20
            },
            {
                "groupName": "Europeans",
                "percentage": 20
            },
            {
                "groupName": "Filipinos",
                "percentage": 15
            },
            {
                "groupName": "Arab Expats",
                "percentage": 15
            }
        ]
    },
    companies: [
      {
        name: 'FIVE Jumeirah Village',
        industry: 'Hospitality',
        description: 'Luxury hotel and residences famous for its architecture and lifestyle.',
        openPositions: [
          { title: 'Operations Manager', department: 'Management', salaryRange: '15k-25k AED', experience: '5+ yrs', careerUrl: '#' }
        ]
      }
    ],
    apartments: [
      {
        id: 'jvc-1',
        title: 'Modern 1-Bed in JVC',
        bedrooms: 1,
        bathrooms: 2,
        sizeSqFt: 850,
        priceAED: 65000,
        locationDetails: 'Heart of JVC with easy access to Hessa Street.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
        amenities: ['Pool', 'Gym', 'Balcony'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 45000,
      bed1: 65000,
      bed2: 95000,
      bed3: 130000,
      bed4: 160000
    },
    laws: [
      { category: 'Real Estate', title: 'Community Guidelines', description: 'Nakheel community rules apply.' }
    ],
    bottomNotes: 'Value for money is exceptional here, highly favored by expats with families.',
    majorAttractions: ['FIVE Jumeirah Village', 'Circle Mall']
  },
  {
    id: 'al-quoz',
    name: 'Al Quoz (Alserkal)',
    arabicName: 'القوز',
    tagline: 'The Creative & Industrial Hub',
    iconPath: 'brush',
    colorTheme: 'from-amber-400 via-orange-500 to-rose-500',
    mapSvgPath: '',
    description: 'A blend of an industrial area and Dubai\'s coolest art and culture hub, Alserkal Avenue. Features warehouses turned into galleries, cafes, and creative spaces.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'Industrial and commercial licenses available.'
    },
    petSituation: {
      friendlyRating: 4,
      allowed: true,
      rules: [
        'Many warehouses and cafes in Alserkal are dog-friendly.'
      ],
      details: 'Very dog-friendly cafes and indoor play areas available.',
      bestParks: ['My Second Home (Indoor Dog Park)']
    },
    demographics: {
        "description": "Divided between a thriving arts hub frequented by Europeans and massive industrial sectors housing South Asian blue-collar workers. It also contains local Emirati homes.",
        "dominantGroups": [
            "South Asian Blue-Collar",
            "Emiratis",
            "European Creatives"
        ],
        "stats": [
            {
                "groupName": "Indians/Pakistanis",
                "percentage": 50
            },
            {
                "groupName": "Emiratis",
                "percentage": 20
            },
            {
                "groupName": "Europeans",
                "percentage": 15
            },
            {
                "groupName": "Others",
                "percentage": 15
            }
        ]
    },
    companies: [
      {
        name: 'Alserkal Avenue',
        industry: 'Arts & Culture',
        description: 'Foremost arts hub in the region.',
        openPositions: [
          { title: 'Curator', department: 'Arts', salaryRange: '20k-30k AED', experience: '4+ yrs', careerUrl: '#' }
        ]
      }
    ],
    apartments: [
      {
        id: 'aq-1',
        title: 'Industrial Loft',
        bedrooms: 1,
        bathrooms: 1,
        sizeSqFt: 1100,
        priceAED: 90000,
        locationDetails: 'Converted warehouse space.',
        image: 'https://images.unsplash.com/photo-1542385151-ef0e12bd0816?q=80&w=600&auto=format&fit=crop',
        amenities: ['High Ceilings', 'Open Plan'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 50000,
      bed1: 70000,
      bed2: 100000,
      bed3: 140000,
      bed4: 0
    },
    laws: [
      { category: 'Commercial', title: 'Industrial Zoning', description: 'Certain areas restricted for industrial use only.' }
    ],
    bottomNotes: 'Best for creatives and those who prefer a non-traditional Dubai experience.',
    majorAttractions: ['Alserkal Avenue', 'Courtyard']
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills Estate',
    arabicName: 'دبي هيلز استيت',
    tagline: 'The Green Heart of Dubai',
    iconPath: 'leaf',
    colorTheme: 'from-emerald-600 via-green-600 to-teal-700',
    mapSvgPath: '',
    description: 'A premium lifestyle community built around an 18-hole championship golf course. It offers a mix of luxury villas, townhouses, and apartments with vast green spaces.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'A massive master-planned community by Emaar, governed by mainland laws.'
    },
    petSituation: {
      friendlyRating: 5,
      allowed: true,
      rules: [
        'Dogs must be kept on a leash in public parks.',
        'Extremely pet-friendly master community.'
      ],
      details: 'One of the best communities for dog owners due to an abundance of parks and walking trails.',
      bestParks: ['Dubai Hills Park (features a dedicated dog park)']
    },
    demographics: {
        "description": "A high-end, family-oriented neighborhood heavily favored by affluent Emirati families and successful European and Indian expatriates.",
        "dominantGroups": [
            "European Families",
            "Emirati Families",
            "Affluent Indians"
        ],
        "stats": [
            {
                "groupName": "Europeans",
                "percentage": 40
            },
            {
                "groupName": "Emiratis",
                "percentage": 25
            },
            {
                "groupName": "Indians",
                "percentage": 20
            },
            {
                "groupName": "Arab Expats",
                "percentage": 15
            }
        ]
    },
    companies: [
      {
        name: 'EMAAR',
        industry: 'Real Estate Developer',
        description: 'The master developer behind Dubai Hills Estate.',
        openPositions: []
      }
    ],
    apartments: [
      {
        id: 'dh-1',
        title: 'Park Heights 2-Bed',
        bedrooms: 2,
        bathrooms: 3,
        sizeSqFt: 1050,
        priceAED: 160000,
        locationDetails: 'Facing Dubai Hills Park.',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
        amenities: ['Park View', 'Pool', 'Gym'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 65000,
      bed1: 95000,
      bed2: 155000,
      bed3: 250000,
      bed4: 350000
    },
    laws: [
      { category: 'Community', title: 'Emaar Guidelines', description: 'Strict community rules govern modifications and landscaping.' }
    ],
    bottomNotes: 'Ideal for upscale family living with an attached high-end mall.',
    majorAttractions: ['Dubai Hills Mall', 'Dubai Hills Golf Club', 'Dubai Hills Park']
  },
  {
    id: 'discovery-gardens',
    name: 'Discovery Gardens & Ibn Battuta',
    arabicName: 'ديسكفري جاردنز',
    tagline: 'Affordable Garden Living',
    iconPath: 'tree-pine',
    colorTheme: 'from-orange-400 via-yellow-500 to-lime-600',
    mapSvgPath: '',
    description: 'A sprawling residential community inspired by garden living, located right next to Ibn Battuta Mall. Known for spacious, budget-friendly apartments.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'Developed by Nakheel, operates under mainland property laws.'
    },
    petSituation: {
      friendlyRating: 4,
      allowed: true,
      rules: [
        'Pets allowed in most buildings.',
        'Great outdoor spaces for walking.'
      ],
      details: 'The community features numerous walking paths and grass areas ideal for pets.',
      bestParks: ['Community Gardens walking paths']
    },
    demographics: {
        "description": "A value-driven area predominantly populated by South Asian and Southeast Asian working and middle-class expatriates.",
        "dominantGroups": [
            "Indian Working/Middle Class",
            "Pakistanis",
            "Filipinos"
        ],
        "stats": [
            {
                "groupName": "Indians",
                "percentage": 45
            },
            {
                "groupName": "Pakistanis",
                "percentage": 25
            },
            {
                "groupName": "Filipinos",
                "percentage": 15
            },
            {
                "groupName": "Arab Expats",
                "percentage": 10
            },
            {
                "groupName": "Others",
                "percentage": 5
            }
        ]
    },
    companies: [
      {
        name: 'Ibn Battuta Mall',
        industry: 'Retail',
        description: 'Themed mall located adjacent to the community.',
        openPositions: []
      }
    ],
    apartments: [
      {
        id: 'dg-1',
        title: 'Spacious 1-Bed near Metro',
        bedrooms: 1,
        bathrooms: 2,
        sizeSqFt: 950,
        priceAED: 55000,
        locationDetails: 'Discovery Gardens, walking distance to Metro.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
        amenities: ['Shared Pool', 'Near Metro'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 42000,
      bed1: 55000,
      bed2: 75000,
      bed3: 0,
      bed4: 0
    },
    laws: [
      { category: 'Community', title: 'Nakheel Guidelines', description: 'Residential zoning without high-rise towers.' }
    ],
    bottomNotes: 'Exceptional value and Metro accessibility, though older buildings.',
    majorAttractions: ['Ibn Battuta Mall', 'Metro Connection']
  },
  {
    id: 'al-barsha',
    name: 'Al Barsha',
    arabicName: 'البرشاء',
    tagline: 'Vibrant & Connected',
    iconPath: 'shopping-bag',
    colorTheme: 'from-blue-400 via-cyan-500 to-indigo-500',
    mapSvgPath: '',
    description: 'A key residential and commercial area known for Mall of the Emirates and a mix of villas, apartments, and diverse dining options.',
    taxSituation: {
      status: 'Mainland Premium Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'A mix of freehold and non-freehold areas.'
    },
    petSituation: {
      friendlyRating: 3,
      allowed: true,
      rules: [
        'Al Barsha Pond Park does NOT allow dogs.',
        'Pet policies depend strictly on landlord in apartment buildings.'
      ],
      details: 'Good for villa owners, but apartment renters should check building policies carefully.',
      bestParks: ['Some walking tracks but main park is pet-free']
    },
    demographics: {
        "description": "A blend of traditional Dubai and modern expatriate life, featuring large local Emirati villa communities and multi-ethnic apartment zones.",
        "dominantGroups": [
            "Arab Expats",
            "Emiratis",
            "Indian Professionals"
        ],
        "stats": [
            {
                "groupName": "Arab Expats",
                "percentage": 30
            },
            {
                "groupName": "Emiratis",
                "percentage": 25
            },
            {
                "groupName": "Indians",
                "percentage": 25
            },
            {
                "groupName": "Europeans",
                "percentage": 10
            },
            {
                "groupName": "Others",
                "percentage": 10
            }
        ]
    },
    companies: [
      {
        name: 'Mall of the Emirates',
        industry: 'Retail & Entertainment',
        description: 'One of the largest shopping malls in Dubai.',
        openPositions: []
      }
    ],
    apartments: [
      {
        id: 'ab-1',
        title: 'Modern 2-Bed Al Barsha 1',
        bedrooms: 2,
        bathrooms: 3,
        sizeSqFt: 1200,
        priceAED: 90000,
        locationDetails: 'Close to MOE and Metro.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1e52408437?q=80&w=600&auto=format&fit=crop',
        amenities: ['Gym', 'Rooftop Pool'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 55000,
      bed1: 70000,
      bed2: 95000,
      bed3: 130000,
      bed4: 200000
    },
    laws: [
      { category: 'Property', title: 'Leasehold', description: 'Many parts are leasehold strictly for UAE Nationals to own.' }
    ],
    bottomNotes: 'Very central with excellent public transport links.',
    majorAttractions: ['Mall of the Emirates', 'Ski Dubai', 'Al Barsha Pond Park']
  },
  {
    id: 'deira',
    name: 'Deira',
    arabicName: 'ديرة',
    tagline: 'The Historical Heartline',
    iconPath: 'ship',
    colorTheme: 'from-yellow-600 via-amber-600 to-orange-700',
    mapSvgPath: '',
    description: 'The historic commercial center of Dubai, bordered by the Dubai Creek. Famous for its traditional souks, bustling trade, and authentic cultural experiences.',
    taxSituation: {
      status: 'Mainland Commercial Zone',
      corporateTax: 'Standard 9%.',
      personalTax: '0%',
      customsDuty: '5%',
      details: 'The historic trading center, functioning mostly under DED mainland rules.'
    },
    petSituation: {
      friendlyRating: 2,
      allowed: true,
      rules: [
        'Crowded streets make walking dogs difficult.',
        'Older buildings often lack pet policies.'
      ],
      details: 'Not very pet-friendly due to dense crowds and lack of green spaces.',
      bestParks: ['None nearby for pets']
    },
    demographics: {
        "description": "The historic heart of Dubai. The traditional trading hub is densely populated by immigrants from South Asia (India, Pakistan, Bangladesh) and historic Emirati trading families.",
        "dominantGroups": [
            "South Asian Immigrants",
            "Historic Emiratis"
        ],
        "stats": [
            {
                "groupName": "Indians",
                "percentage": 45
            },
            {
                "groupName": "Pakistanis",
                "percentage": 25
            },
            {
                "groupName": "Bangladeshis",
                "percentage": 15
            },
            {
                "groupName": "Emiratis",
                "percentage": 5
            },
            {
                "groupName": "Others",
                "percentage": 10
            }
        ]
    },
    companies: [
      {
        name: 'Gold Souk Traders',
        industry: 'Retail & Trade',
        description: 'Thousands of independent jewelry, spice, and textile traders.',
        openPositions: []
      }
    ],
    apartments: [
      {
        id: 'deira-1',
        title: 'Old Town 2-Bed, Al Rigga',
        bedrooms: 2,
        bathrooms: 2,
        sizeSqFt: 1100,
        priceAED: 65000,
        locationDetails: 'Al Rigga Road, bustling area.',
        image: 'https://images.unsplash.com/photo-1582653211939-2e0f40d04db9?q=80&w=600&auto=format&fit=crop',
        amenities: ['Near Metro', 'Balcony'],
        link: '#'
      }
    ],
    avgRent: {
      studio: 35000,
      bed1: 50000,
      bed2: 70000,
      bed3: 95000,
      bed4: 0
    },
    laws: [
      { category: 'Commercial Law', title: 'Mainland DED', description: 'Center of traditional DED mainland trading companies.' }
    ],
    bottomNotes: 'Traffic can be challenging, but it offers the most authentic Dubai street food.',
    majorAttractions: ['Dubai Creek', 'Gold Souk', 'Spice Souk']
  }
];
