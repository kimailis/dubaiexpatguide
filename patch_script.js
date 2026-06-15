const fs = require('fs');

const demographicsData = {
  'difc': {
    description: 'A cosmopolitan financial hub attracting high-net-worth professionals. Dominated by European and North American expats, alongside wealthy locals and high-earning Arab and Indian expats.',
    dominantGroups: ['European Expats', 'High-earning Indians', 'Arab Expats', 'Emiratis'],
    stats: [
      { groupName: 'Europeans/Westerners', percentage: 40 },
      { groupName: 'Arab Expats', percentage: 20 },
      { groupName: 'Indians/South Asians', percentage: 15 },
      { groupName: 'Emiratis', percentage: 10 },
      { groupName: 'Others', percentage: 15 }
    ]
  },
  'downtown': {
    description: 'A multicultural, luxurious center attracting affluent expatriates and locals who prefer metropolitan living near iconic landmarks.',
    dominantGroups: ['Wealthy Europeans', 'Affluent Indians/Pakistanis', 'Wealthy Emiratis', 'Chinese'],
    stats: [
      { groupName: 'Europeans', percentage: 35 },
      { groupName: 'Indians', percentage: 25 },
      { groupName: 'Arab Expats', percentage: 15 },
      { groupName: 'Emiratis', percentage: 15 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'marina': {
    description: 'A heavily Westernized demographic center. Frequented by British, Russian, and European expats who prioritize waterfront, resort-style living.',
    dominantGroups: ['European Expats (UK/EU)', 'Russian Expats', 'North Americans'],
    stats: [
      { groupName: 'Europeans & Russians', percentage: 55 },
      { groupName: 'Arab Expats', percentage: 15 },
      { groupName: 'Americans/Canadians', percentage: 10 },
      { groupName: 'Indians', percentage: 10 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'jlt': {
    description: 'Highly diverse free-zone with a prominent South Asian and European professional middle-class. Favored for comparatively affordable luxury.',
    dominantGroups: ['Indian Professionals', 'European Expats', 'Pakistani Professionals'],
    stats: [
      { groupName: 'Indians', percentage: 35 },
      { groupName: 'Europeans', percentage: 25 },
      { groupName: 'Pakistanis', percentage: 15 },
      { groupName: 'Arab Expats', percentage: 15 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'internet-city': {
    description: 'Dominated by global tech workers. A very heavily international workforce mixed from South Asia, Europe, and the Levant.',
    dominantGroups: ['Indian Tech Workers', 'European Expats', 'Levant Arab Expats'],
    stats: [
      { groupName: 'Indians', percentage: 40 },
      { groupName: 'Europeans', percentage: 25 },
      { groupName: 'Arab Expats', percentage: 20 },
      { groupName: 'Pakistanis', percentage: 10 },
      { groupName: 'Others', percentage: 5 }
    ]
  },
  'silicon-oasis': {
    description: 'A family-centric suburban tech hub popular with middle-income professionals, showing a very high concentration of South Asian and Arab expat families.',
    dominantGroups: ['Indian Families', 'Arab Expats', 'Pakistani Communities'],
    stats: [
      { groupName: 'Indians', percentage: 40 },
      { groupName: 'Arab Expats', percentage: 25 },
      { groupName: 'Pakistanis', percentage: 20 },
      { groupName: 'Emiratis', percentage: 5 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'business-bay': {
    description: 'Fast-paced corporate hub populated by young professionals across diverse domains. Popular among single expats and young couples.',
    dominantGroups: ['Indian Corporate Professionals', 'European Expats', 'Arab Expats'],
    stats: [
      { groupName: 'Indians', percentage: 30 },
      { groupName: 'Europeans', percentage: 25 },
      { groupName: 'Arab Expats', percentage: 20 },
      { groupName: 'Pakistanis', percentage: 10 },
      { groupName: 'Others', percentage: 15 }
    ]
  },
  'palm-jumeirah': {
    description: 'A global wealth haven. Dominated by ultra-high-net-worth locals and elites coming from Europe, Russia, and India.',
    dominantGroups: ['Wealthy European/Russians', 'Ultra-Rich Emiratis', 'Affluent Indians'],
    stats: [
      { groupName: 'Europeans/Russians', percentage: 45 },
      { groupName: 'Emiratis', percentage: 20 },
      { groupName: 'Indians', percentage: 15 },
      { groupName: 'Arab Expats', percentage: 10 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'jvc': {
    description: 'A highly diverse, mid-market community blending families from all over the world, particularly South Asia, the Philippines, and Europe.',
    dominantGroups: ['Indian Expats', 'Pakistani Expats', 'European Expats', 'Filipinos'],
    stats: [
      { groupName: 'Indians', percentage: 30 },
      { groupName: 'Pakistanis', percentage: 20 },
      { groupName: 'Europeans', percentage: 20 },
      { groupName: 'Filipinos', percentage: 15 },
      { groupName: 'Arab Expats', percentage: 15 }
    ]
  },
  'al-quoz': {
    description: 'Divided between a thriving arts hub frequented by Europeans and massive industrial sectors housing South Asian blue-collar workers. It also contains local Emirati homes.',
    dominantGroups: ['South Asian Blue-Collar', 'Emiratis', 'European Creatives'],
    stats: [
      { groupName: 'Indians/Pakistanis', percentage: 50 },
      { groupName: 'Emiratis', percentage: 20 },
      { groupName: 'Europeans', percentage: 15 },
      { groupName: 'Others', percentage: 15 }
    ]
  },
  'dubai-hills': {
    description: 'A high-end, family-oriented neighborhood heavily favored by affluent Emirati families and successful European and Indian expatriates.',
    dominantGroups: ['European Families', 'Emirati Families', 'Affluent Indians'],
    stats: [
      { groupName: 'Europeans', percentage: 40 },
      { groupName: 'Emiratis', percentage: 25 },
      { groupName: 'Indians', percentage: 20 },
      { groupName: 'Arab Expats', percentage: 15 }
    ]
  },
  'discovery-gardens': {
    description: 'A value-driven area predominantly populated by South Asian and Southeast Asian working and middle-class expatriates.',
    dominantGroups: ['Indian Working/Middle Class', 'Pakistanis', 'Filipinos'],
    stats: [
      { groupName: 'Indians', percentage: 45 },
      { groupName: 'Pakistanis', percentage: 25 },
      { groupName: 'Filipinos', percentage: 15 },
      { groupName: 'Arab Expats', percentage: 10 },
      { groupName: 'Others', percentage: 5 }
    ]
  },
  'al-barsha': {
    description: 'A blend of traditional Dubai and modern expatriate life, featuring large local Emirati villa communities and multi-ethnic apartment zones.',
    dominantGroups: ['Arab Expats', 'Emiratis', 'Indian Professionals'],
    stats: [
      { groupName: 'Arab Expats', percentage: 30 },
      { groupName: 'Emiratis', percentage: 25 },
      { groupName: 'Indians', percentage: 25 },
      { groupName: 'Europeans', percentage: 10 },
      { groupName: 'Others', percentage: 10 }
    ]
  },
  'deira': {
    description: 'The historic heart of Dubai. The traditional trading hub is densely populated by immigrants from South Asia (India, Pakistan, Bangladesh) and historic Emirati trading families.',
    dominantGroups: ['South Asian Immigrants', 'Historic Emiratis'],
    stats: [
      { groupName: 'Indians', percentage: 45 },
      { groupName: 'Pakistanis', percentage: 25 },
      { groupName: 'Bangladeshis', percentage: 15 },
      { groupName: 'Emiratis', percentage: 5 },
      { groupName: 'Others', percentage: 10 }
    ]
  }
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const ids = Object.keys(demographicsData);
  
  ids.forEach(id => {
    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)(companies:\\s*\\[)`);
    if (regex.test(content)) {
      const demoStr = `demographics: ${JSON.stringify(demographicsData[id], null, 4).replace(/\n/g, '\n    ')},\n    `;
      content = content.replace(regex, `$1${demoStr}$2`);
    } else {
        const fallbackRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)(avgRent:|laws:|bottomNotes:)`);
        if (fallbackRegex.test(content)) {
            const demoStr = `demographics: ${JSON.stringify(demographicsData[id], null, 4).replace(/\n/g, '\n    ')},\n    `;
            content = content.replace(fallbackRegex, `$1${demoStr}$2`);
        } else {
            console.log("Could not find injection point for", id, "in", filePath);
        }
    }
  });

  fs.writeFileSync(filePath, content, 'utf8');
}

processFile('./src/data.ts');
processFile('./src/extendedData.ts');
console.log("Done");
