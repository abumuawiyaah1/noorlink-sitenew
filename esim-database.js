// ====== NOORLINK eSIM - COMPLETE TWO-TIER SYSTEM ======
// Version 3.0: 50 Tier 1 countries with custom pricing + Template-based system

// ====== REGIONAL TEMPLATES (Tier 2 Defaults) ======
const regionalTemplates = {
  'europe': {
    name: 'Europe',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '5GB', days: 7, price: 19.99 },
      standard: { name: 'Standard', data: '10GB', days: 15, price: 34.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 69.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '50GB', days: 30, price: 89.99 }
    },
    note: '*Fair usage: 20GB high-speed, then 256kbps',
    features: [
      '40+ European countries covered',
      '5G in urban areas, 4G nationwide',
      'No roaming charges within EU',
      'Multilingual 24/7 support',
      'Schengen area coverage included'
    ],
    carrierPool: ['Vodafone', 'Orange', 'Deutsche Telekom', 'EE', 'TIM', 'Telefónica'],
    cityPool: ['Paris', 'London', 'Rome', 'Berlin', 'Amsterdam', 'Barcelona', 'Vienna'],
    networkTech: '5G in cities, 4G nationwide'
  },

  'asia-pacific': {
    name: 'Asia Pacific',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '3GB', days: 7, price: 14.99 },
      standard: { name: 'Standard', data: '7GB', days: 15, price: 24.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 49.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '35GB', days: 30, price: 79.99 }
    },
    note: '*Fair usage: 15GB high-speed, then 256kbps',
    features: [
      '25+ Asian countries',
      '5G in major cities',
      'Local network partners',
      'English & local language support',
      'High-speed for video calls'
    ],
    carrierPool: ['SoftBank', 'Singtel', 'AIS', 'Telkomsel', 'China Mobile', 'SK Telecom'],
    cityPool: ['Tokyo', 'Seoul', 'Singapore', 'Bangkok', 'Bali', 'Hong Kong', 'Taipei'],
    networkTech: '5G in major cities, 4G widespread'
  },

  'middle-east': {
    name: 'Middle East',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '5GB', days: 7, price: 17.99 },
      standard: { name: 'Standard', data: '10GB', days: 15, price: 29.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 59.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '60GB', days: 30, price: 94.99 }
    },
    note: '*Fair usage: 25GB high-speed, then 256kbps',
    features: [
      'GCC + Turkey + Egypt + Jordan + Lebanon',
      '5G in cities, 4G nationwide',
      'Arabic/English 24/7 support',
      'Halal travel optimized',
      'Desert & urban coverage'
    ],
    carrierPool: ['Etisalat', 'STC', 'Du', 'Ooredoo', 'Zain', 'Mobily'],
    cityPool: ['Dubai', 'Riyadh', 'Doha', 'Abu Dhabi', 'Jeddah', 'Muscat'],
    networkTech: '5G in cities, 4G nationwide'
  },

  'africa': {
    name: 'Africa',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '3GB', days: 7, price: 12.99 },
      standard: { name: 'Standard', data: '5GB', days: 15, price: 22.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 44.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '30GB', days: 30, price: 69.99 }
    },
    note: '*Fair usage: 10GB high-speed, then 128kbps',
    features: [
      'Major cities & tourist destinations',
      '4G/LTE in urban areas',
      'English/French/Arabic support',
      'Safari lodge coverage',
      'Reliable connectivity'
    ],
    carrierPool: ['MTN', 'Safaricom', 'Vodacom', 'Orange', 'Airtel', 'Glo'],
    cityPool: ['Cairo', 'Lagos', 'Nairobi', 'Cape Town', 'Accra', 'Casablanca'],
    networkTech: '4G/LTE in cities, 3G widespread'
  },

  'north-america': {
    name: 'North America',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '3GB', days: 7, price: 16.99 },
      standard: { name: 'Standard', data: '10GB', days: 15, price: 29.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 64.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '80GB', days: 30, price: 109.99 }
    },
    note: '*Fair usage: 30GB high-speed, then 512kbps',
    features: [
      'USA, Canada, Mexico coverage',
      '5G nationwide, 4G everywhere',
      'Unlimited calls & SMS',
      'Hotspot included',
      '24/7 English/Spanish support'
    ],
    carrierPool: ['T-Mobile', 'AT&T', 'Verizon', 'Rogers', 'Telcel', 'Bell'],
    cityPool: ['NYC', 'LA', 'Toronto', 'Vancouver', 'Miami', 'Chicago'],
    networkTech: '5G nationwide, 4G everywhere'
  },

  'south-america': {
    name: 'South America',
    currency: 'USD',
    plans: {
      basic: { name: 'Basic', data: '3GB', days: 7, price: 13.99 },
      standard: { name: 'Standard', data: '7GB', days: 15, price: 23.99, popular: true },
      premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 44.99 },
      family: { name: 'Family Bundle', lines: 4, sharedData: '40GB', days: 30, price: 74.99 }
    },
    note: '*Fair usage: 12GB high-speed, then 256kbps',
    features: [
      'Major cities & tourist areas',
      '4G in cities, 3G widespread',
      'Spanish/Portuguese support',
      'Andean & coastal coverage',
      'Reliable network partners'
    ],
    carrierPool: ['Claro', 'Movistar', 'Entel', 'TIM', 'Personal', 'Vivo'],
    cityPool: ['Rio', 'Buenos Aires', 'Lima', 'Santiago', 'Bogotá', 'Quito'],
    networkTech: '4G in cities, 3G widespread'
  }
};

// ====== FLEX DATA OPTION (Consistent Across All) ======
const flexDataOption = {
  name: 'Flex Data',
  description: 'Pay for what you use',
  base: { data: '5GB', price: 25.00 },
  perGB: 5.00,
  days: 30,
  features: [
    'Start with 5GB ($25)',
    'Add more data as needed: $5/GB',
    '30-day validity',
    'No overage charges',
    'Perfect if unsure of usage'
  ]
};

// ====== TIER 1 COUNTRIES - YOUR CONTROLLED MARKETS ======
const tier1Countries = {
  codes: [
    // Middle East (10 countries)
    'saudi-arabia', 'uae', 'qatar', 'oman', 'kuwait',
    'bahrain', 'turkey', 'egypt', 'jordan', 'lebanon',
    
    // Americas (10 countries)
    'usa', 'canada', 'mexico', 'panama', 'costa-rica',
    'brazil', 'argentina', 'colombia', 'chile', 'peru',
    
    // Europe (15 countries)
    'uk', 'france', 'germany', 'italy', 'spain',
    'netherlands', 'switzerland', 'portugal', 'austria', 'belgium',
    'ireland', 'sweden', 'norway', 'denmark', 'finland',
    
    // Asia Pacific (10 countries)
    'japan', 'singapore', 'australia', 'india', 'thailand',
    'indonesia', 'malaysia', 'south-korea', 'china', 'philippines',
    
    // Islands & Special (5 countries)
    'iceland', 'fiji', 'maldives', 'bahamas', 'malta'
  ],
  
  byRegion: {
    'middle-east': ['saudi-arabia', 'uae', 'qatar', 'oman', 'kuwait', 'bahrain', 'turkey', 'egypt', 'jordan', 'lebanon'],
    'americas': ['usa', 'canada', 'mexico', 'panama', 'costa-rica', 'brazil', 'argentina', 'colombia', 'chile', 'peru'],
    'europe': ['uk', 'france', 'germany', 'italy', 'spain', 'netherlands', 'switzerland', 'portugal', 'austria', 'belgium', 'ireland', 'sweden', 'norway', 'denmark', 'finland'],
    'asia-pacific': ['japan', 'singapore', 'australia', 'india', 'thailand', 'indonesia', 'malaysia', 'south-korea', 'china', 'philippines'],
    'islands': ['iceland', 'fiji', 'maldives', 'bahamas', 'malta']
  },
  
  // Helper method to check if a country is Tier 1
  isTier1: function(countryCode) {
    return this.codes.includes(countryCode);
  },
  
  // Helper method to get region for a Tier 1 country
  getRegion: function(countryCode) {
    for (const [region, countries] of Object.entries(this.byRegion)) {
      if (countries.includes(countryCode)) {
        return region;
      }
    }
    return null;
  }
};

// ====== COUNTRY DATABASE ======
const countryDatabase = {};

// Helper function to add ANY country with proper tier detection
function addCountry(code, countryData) {
  // Determine if this is a Tier 1 country
  const isTier1 = tier1Countries.isTier1(code);
  
  // Set tier and pricing control flags
  countryData.tier = isTier1 ? 1 : 2;
  countryData.independent = isTier1;
  countryData.customPricing = isTier1;
  
  // If Tier 1 but no custom plans defined, use template as placeholder
  if (isTier1 && !countryData.plans) {
    const region = tier1Countries.getRegion(code) || countryData.region;
    if (regionalTemplates[region]) {
      // Copy template plans as placeholder - YOU WILL OVERRIDE THESE
      countryData.plans = JSON.parse(JSON.stringify(regionalTemplates[region].plans));
      countryData.note = '⚠️ TIER 1: Set custom pricing here';
    }
  }
  
  // Store in database
  countryDatabase[code] = countryData;
}

// Special function for Tier 1 countries with CUSTOM pricing
function addTier1Country(code, customConfig) {
  const region = tier1Countries.getRegion(code) || customConfig.region;
  
  addCountry(code, {
    // Core identity
    flag: customConfig.flag,
    name: customConfig.name,
    displayName: customConfig.name,
    region: region,
    currency: 'USD',
    
    // TIER 1: YOUR CUSTOM PRICING (This is where you control everything)
    plans: customConfig.plans, // YOU SET THESE EXACT PRICES
    
    // Your custom features
    features: customConfig.features || [],
    note: customConfig.note || regionalTemplates[region]?.note,
    
    // Local details
    localCarriers: customConfig.localCarriers || [],
    majorCities: customConfig.majorCities || [],
    languages: customConfig.languages || [],
    
    // Network info
    networkTech: customConfig.networkTech,
    has5G: customConfig.has5G || false,
    
    // Tier 1 flags (set by addCountry)
    tier: 1,
    independent: true,
    customPricing: true
  });
}

// Function for Tier 2 (template-based) countries
function addTier2Country(code, countryData) {
  const template = regionalTemplates[countryData.region];
  
  // Get random elements for personalization
  function getRandomFrom(array, count = 2) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  const carriers = getRandomFrom(template.carrierPool, 2);
  const cities = getRandomFrom(countryData.majorCities || [], 2);
  
  addCountry(code, {
    flag: countryData.flag,
    name: countryData.name,
    displayName: countryData.name,
    region: countryData.region,
    currency: template.currency,
    
    // NO PLANS DEFINED HERE - Will use template
    
    localCarriers: carriers,
    majorCities: countryData.majorCities || [],
    languages: countryData.languages || [],
    
    features: [
      `${carriers[0]} & ${carriers[1]} coverage`,
      `${cities[0]} to ${cities[1]} network access`,
      template.networkTech,
      `${template.features[3] || 'Reliable connectivity'}`,
      `${countryData.languages?.[0] || 'Local'} & English support`
    ],
    
    networkTech: template.networkTech,
    has5G: countryData.has5G || false
  });
}

// ====== ADD TIER 1 COUNTRIES WITH YOUR CUSTOM PRICING ======

// MIDDLE EAST - Your custom pricing
addTier1Country('saudi-arabia', {
  flag: '🇸🇦',
  name: 'Saudi Arabia',
  region: 'middle-east',
  plans: {
    basic: { name: 'Basic', data: '5GB', days: 7, price: 19.99 },
    standard: { name: 'Standard', data: '15GB', days: 15, price: 34.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 64.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '80GB', days: 30, price: 119.99 }
  },
  note: '*Fair usage: 30GB high-speed',
  localCarriers: ['STC', 'Mobily', 'Zain KSA'],
  majorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'],
  languages: ['Arabic', 'English'],
  features: [
    'Umrah & Hajj optimized coverage',
    'Harams 5G coverage',
    'Arabic priority support 24/7',
    'Prayer time alerts available'
  ],
  networkTech: '5G nationwide',
  has5G: true
});

addTier1Country('uae', {
  flag: '🇦🇪',
  name: 'United Arab Emirates',
  region: 'middle-east',
  plans: {
    basic: { name: 'Basic', data: '7GB', days: 7, price: 24.99 },
    standard: { name: 'Standard', data: '15GB', days: 15, price: 39.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 79.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '100GB', days: 30, price: 149.99 }
  },
  note: '*Fair usage: 35GB high-speed',
  localCarriers: ['Etisalat', 'Du', 'Virgin Mobile UAE'],
  majorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
  languages: ['Arabic', 'English'],
  features: [
    'All 7 emirates covered',
    '5G premium network access',
    'Business traveler optimized'
  ],
  networkTech: '5G premium',
  has5G: true
});

addTier1Country('qatar', {
  flag: '🇶🇦',
  name: 'Qatar',
  region: 'middle-east',
  plans: {
    basic: { name: 'Basic', data: '5GB', days: 7, price: 19.99 },
    standard: { name: 'Standard', data: '12GB', days: 15, price: 34.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 69.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '75GB', days: 30, price: 119.99 }
  },
  note: '*Fair usage: 25GB high-speed',
  localCarriers: ['Ooredoo Qatar', 'Vodafone Qatar'],
  majorCities: ['Doha', 'Al Wakrah', 'Al Khor'],
  languages: ['Arabic', 'English'],
  features: [
    'World Cup legacy infrastructure',
    'Business hub connectivity',
    'Lusail City coverage'
  ],
  networkTech: '5G in cities',
  has5G: true
});

// NORTH AMERICA - Your custom pricing
addTier1Country('usa', {
  flag: '🇺🇸',
  name: 'United States',
  region: 'north-america',
  plans: {
    basic: { name: 'Basic', data: '3GB', days: 7, price: 9.99 },
    standard: { name: 'Standard', data: '10GB', days: 15, price: 19.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 64.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '100GB', days: 30, price: 119.99 }
  },
  note: '*Fair usage: 50GB high-speed',
  localCarriers: ['T-Mobile', 'AT&T', 'Verizon', 'Google Fi'],
  majorCities: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas'],
  languages: ['English', 'Spanish'],
  features: [
    'All 50 states coverage',
    '5G nationwide access',
    'Unlimited calls & SMS to US numbers',
    'Hotspot included up to 10GB'
  ],
  networkTech: '5G nationwide',
  has5G: true
});

addTier1Country('canada', {
  flag: '🇨🇦',
  name: 'Canada',
  region: 'north-america',
  plans: {
    basic: { name: 'Basic', data: '3GB', days: 7, price: 14.99 },
    standard: { name: 'Standard', data: '8GB', days: 15, price: 24.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 59.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '60GB', days: 30, price: 99.99 }
  },
  note: '*Fair usage: 25GB high-speed',
  localCarriers: ['Rogers', 'Bell', 'Telus', 'Freedom Mobile'],
  majorCities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  languages: ['English', 'French'],
  features: [
    'Major cities & provinces',
    '5G in metropolitan areas',
    'French language support',
    'Cross-border US roaming available'
  ],
  networkTech: '5G in cities',
  has5G: true
});

// EUROPE - Your custom pricing
addTier1Country('uk', {
  flag: '🇬🇧',
  name: 'United Kingdom',
  region: 'europe',
  plans: {
    basic: { name: 'Basic', data: '5GB', days: 7, price: 17.99 },
    standard: { name: 'Standard', data: '12GB', days: 15, price: 29.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 59.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '60GB', days: 30, price: 89.99 }
  },
  note: '*Fair usage: 25GB high-speed',
  localCarriers: ['EE', 'Vodafone UK', 'O2', 'Three'],
  majorCities: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool'],
  languages: ['English'],
  features: [
    'England, Scotland, Wales, N. Ireland',
    '5G in 100+ cities',
    'EU roaming included',
    'Tube & railway coverage'
  ],
  networkTech: '5G in 100+ cities',
  has5G: true
});

addTier1Country('france', {
  flag: '🇫🇷',
  name: 'France',
  region: 'europe',
  plans: {
    basic: { name: 'Basic', data: '5GB', days: 7, price: 18.99 },
    standard: { name: 'Standard', data: '10GB', days: 15, price: 32.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 62.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '55GB', days: 30, price: 92.99 }
  },
  note: '*Fair usage: 22GB high-speed',
  localCarriers: ['Orange', 'Free', 'SFR', 'Bouygues'],
  majorCities: ['Paris', 'Marseille', 'Lyon', 'Nice', 'Toulouse'],
  languages: ['French', 'English'],
  features: [
    'Alps & Mediterranean coverage',
    'EU roaming included',
    'TGV train coverage',
    'Ski resort connectivity'
  ],
  networkTech: '5G in cities',
  has5G: true
});

// ASIA PACIFIC - Your custom pricing
addTier1Country('japan', {
  flag: '🇯🇵',
  name: 'Japan',
  region: 'asia-pacific',
  plans: {
    basic: { name: 'Basic', data: '3GB', days: 7, price: 19.99 },
    standard: { name: 'Standard', data: '8GB', days: 15, price: 34.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 69.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '50GB', days: 30, price: 119.99 }
  },
  note: '*Fair usage: 20GB high-speed',
  localCarriers: ['SoftBank', 'NTT Docomo', 'KDDI', 'Rakuten Mobile'],
  majorCities: ['Tokyo', 'Osaka', 'Kyoto', 'Hiroshima', 'Sapporo'],
  languages: ['Japanese', 'English'],
  features: [
    'Shinkansen bullet train coverage',
    'Local Japanese number available',
    'Tokyo 2020 infrastructure'
  ],
  networkTech: '5G in major cities',
  has5G: true
});

addTier1Country('singapore', {
  flag: '🇸🇬',
  name: 'Singapore',
  region: 'asia-pacific',
  plans: {
    basic: { name: 'Basic', data: '5GB', days: 7, price: 17.99 },
    standard: { name: 'Standard', data: '12GB', days: 15, price: 29.99, popular: true },
    premium: { name: 'Premium', data: 'UNLIMITED*', days: 30, price: 54.99 },
    family: { name: 'Family Bundle', lines: 4, sharedData: '60GB', days: 30, price: 89.99 }
  },
  note: '*Fair usage: 25GB high-speed',
  localCarriers: ['Singtel', 'StarHub', 'M1', 'Circles.Life'],
  majorCities: ['Singapore City', 'Sentosa', 'Jurong East'],
  languages: ['English', 'Mandarin', 'Malay'],
  features: [
    'City-state full coverage',
    'Business hub connectivity',
    'Marina Bay Sands coverage',
    'Changi Airport priority'
  ],
  networkTech: '5G nationwide',
  has5G: true
});

// ====== ADD TIER 2 COUNTRIES (Template-Based) ======

// EUROPE - Template based
addTier2Country('germany', {
  flag: '🇩🇪',
  name: 'Germany',
  region: 'europe',
  majorCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
  languages: ['German', 'English']
});

addTier2Country('italy', {
  flag: '🇮🇹',
  name: 'Italy',
  region: 'europe',
  majorCities: ['Rome', 'Milan', 'Venice', 'Florence', 'Naples'],
  languages: ['Italian', 'English']
});

addTier2Country('spain', {
  flag: '🇪🇸',
  name: 'Spain',
  region: 'europe',
  majorCities: ['Madrid', 'Barcelona', 'Seville', 'Valencia', 'Malaga'],
  languages: ['Spanish', 'English']
});

addTier2Country('portugal', {
  flag: '🇵🇹',
  name: 'Portugal',
  region: 'europe',
  majorCities: ['Lisbon', 'Porto', 'Faro', 'Coimbra'],
  languages: ['Portuguese', 'English']
});

// ASIA PACIFIC - Template based
addTier2Country('vietnam', {
  flag: '🇻🇳',
  name: 'Vietnam',
  region: 'asia-pacific',
  majorCities: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong'],
  languages: ['Vietnamese', 'English']
});

addTier2Country('south-korea', {
  flag: '🇰🇷',
  name: 'South Korea',
  region: 'asia-pacific',
  majorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  languages: ['Korean', 'English']
});

addTier2Country('thailand', {
  flag: '🇹🇭',
  name: 'Thailand',
  region: 'asia-pacific',
  majorCities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi'],
  languages: ['Thai', 'English']
});

// AFRICA - Template based
addTier2Country('nigeria', {
  flag: '🇳🇬',
  name: 'Nigeria',
  region: 'africa',
  majorCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan'],
  languages: ['English', 'Hausa', 'Yoruba']
});

addTier2Country('south-africa', {
  flag: '🇿🇦',
  name: 'South Africa',
  region: 'africa',
  majorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'],
  languages: ['English', 'Afrikaans', 'Zulu']
});

addTier2Country('morocco', {
  flag: '🇲🇦',
  name: 'Morocco',
  region: 'africa',
  majorCities: ['Casablanca', 'Marrakech', 'Fes', 'Tangier', 'Rabat'],
  languages: ['Arabic', 'French', 'Berber']
});

// SOUTH AMERICA - Template based
addTier2Country('brazil', {
  flag: '🇧🇷',
  name: 'Brazil',
  region: 'south-america',
  majorCities: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador', 'Fortaleza'],
  languages: ['Portuguese', 'English']
});

addTier2Country('argentina', {
  flag: '🇦🇷',
  name: 'Argentina',
  region: 'south-america',
  majorCities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
  languages: ['Spanish', 'English']
});

addTier2Country('chile', {
  flag: '🇨🇱',
  name: 'Chile',
  region: 'south-america',
  majorCities: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'Viña del Mar'],
  languages: ['Spanish', 'English']
});

// ====== GET COUNTRY DATA FUNCTION ======
function getCountryPlans(countryCode) {
  const country = countryDatabase[countryCode];
  
  if (!country) return null;
  
  let plans, note;
  
  if (country.tier === 1) {
    // Tier 1: Use country's own custom plans
    plans = country.plans;
    note = country.note;
  } else {
    // Tier 2: Use regional template
    const template = regionalTemplates[country.region];
    plans = template.plans;
    note = template.note;
  }
  
  return {
    country: {
      flag: country.flag,
      name: country.name,
      displayName: country.displayName,
      tier: country.tier,
      independent: country.independent
    },
    plans: plans,
    features: country.features,
    note: note,
    localCarriers: country.localCarriers,
    flexData: flexDataOption
  };
}

// ====== VISUAL RENDERER ======
function renderCountryDisplay(countryCode) {
  const data = getCountryPlans(countryCode);
  
  if (!data) {
    return `Country "${countryCode}" not found in our database.`;
  }
  
  const plans = data.plans;
  
  const visual = `
═══════════ ${data.country.name.toUpperCase()} eSIM PLANS ═══════════
${data.country.flag}

┌─────────────┬─────────────┬─────────────┬─────────────┐
│   BASIC     │  STANDARD ${plans.standard.popular ? '✓' : ' '}│   PREMIUM   │   FAMILY    │
│   ${plans.basic.data.padEnd(7)}│  ${plans.standard.data.padEnd(9)}│  ${plans.premium.data.padEnd(9)}│  ${plans.family.sharedData ? plans.family.sharedData.padEnd(7) : '4 lines'.padEnd(7)}│
│   ${plans.basic.days} days${' '.repeat(3)}│  ${plans.standard.days} days${' '.repeat(3)}│  ${plans.premium.days} days${' '.repeat(3)}│  ${plans.family.days} days${' '.repeat(3)}│
│   $${plans.basic.price.toFixed(2)}${' '.repeat(5)}│  $${plans.standard.price.toFixed(2)}${' '.repeat(5)}│  $${plans.premium.price.toFixed(2)}${' '.repeat(5)}│  $${plans.family.price.toFixed(2)}${' '.repeat(5)}│
└─────────────┴─────────────┴─────────────┴─────────────┘

${data.note ? `* ${data.note}\n` : ''}
${data.features.map(f => `✓ ${f}`).join('\n')}

[ GET ${data.country.name.toUpperCase()} eSIM NOW ]
`;
  
  return visual;
}

// ====== STATISTICS ======
function getDatabaseStats() {
  const totalCountries = Object.keys(countryDatabase).length;
  const tier1Count = Object.values(countryDatabase).filter(c => c.tier === 1).length;
  const tier2Count = Object.values(countryDatabase).filter(c => c.tier === 2).length;
  
  const byRegion = {};
  Object.values(countryDatabase).forEach(country => {
    byRegion[country.region] = (byRegion[country.region] || 0) + 1;
  });
  
  return {
    totalCountries,
    tier1: tier1Count,
    tier2: tier2Count,
    byRegion,
    coveragePercentage: Math.round((totalCountries / 195) * 100)
  };
}

// ====== SEARCH FUNCTION ======
function searchCountries(query) {
  const term = query.toLowerCase();
  return Object.entries(countryDatabase)
    .filter(([code, country]) => 
      country.name.toLowerCase().includes(term) ||
      code.toLowerCase().includes(term)
    )
    .map(([code, country]) => ({
      code,
      name: country.name,
      flag: country.flag,
      tier: country.tier,
      hasCustomPricing: country.customPricing
    }));
}

// ====== DEBUG & DEMONSTRATION ======
console.log("🚀 NOORLINK eSIM - TWO-TIER SYSTEM");
console.log("===================================\n");

console.log("📊 DATABASE STATISTICS:");
const stats = getDatabaseStats();
console.log(`• Total Countries: ${stats.totalCountries}`);
console.log(`• Tier 1 (Your Control): ${stats.tier1} countries`);
console.log(`• Tier 2 (Template-Based): ${stats.tier2} countries`);
console.log(`• Global Coverage: ${stats.coveragePercentage}% of countries\n`);

console.log("🎯 TIER 1 COUNTRIES (Your Custom Pricing):");
console.log("Total:", tier1Countries.codes.length);
console.log("Middle East:", tier1Countries.byRegion['middle-east'].length);
console.log("Americas:", tier1Countries.byRegion['americas'].length);
console.log("Europe:", tier1Countries.byRegion['europe'].length);
console.log("Asia Pacific:", tier1Countries.byRegion['asia-pacific'].length);
console.log("Islands:", tier1Countries.byRegion['islands'].length, "\n");

console.log("💰 PRICING COMPARISON EXAMPLES:");
console.log("USA (Tier 1 - Your Price):");
const usaData = getCountryPlans('usa');
console.log(`Premium: $${usaData.plans.premium.price} (YOUR SETTING)`);
console.log(`Template would be: $${regionalTemplates['north-america'].plans.premium.price}\n`);

console.log("UAE (Tier 1 - Your Price):");
const uaeData = getCountryPlans('uae');
console.log(`Premium: $${uaeData.plans.premium.price} (YOUR SETTING)`);
console.log(`Template would be: $${regionalTemplates['middle-east'].plans.premium.price}\n`);

console.log("Nigeria (Tier 2 - Template Price):");
const nigeriaData = getCountryPlans('nigeria');
console.log(`Premium: $${nigeriaData.plans.premium.price} (Africa Template)`);
console.log(`Template: Africa - $${regionalTemplates['africa'].plans.premium.price}\n`);

console.log("🎭 VISUAL EXAMPLES:");
console.log("\n1. Saudi Arabia (Tier 1 - Custom):");
console.log(renderCountryDisplay('saudi-arabia'));

console.log("\n2. Nigeria (Tier 2 - Template):");
console.log(renderCountryDisplay('nigeria'));

console.log("\n🔍 SEARCH EXAMPLES:");
console.log("Search 'japan':", searchCountries('japan').map(c => `${c.flag} ${c.name}`));
console.log("Search 'ger':", searchCountries('ger').map(c => `${c.flag} ${c.name}`));
console.log("Search 'south':", searchCountries('south').map(c => `${c.flag} ${c.name}`));

// ====== EXPORT FOR USE ======
const noorlinkDatabase = {
  // Data
  countryDatabase,
  regionalTemplates,
  tier1Countries,
  flexDataOption,
  
  // Functions
  getCountryPlans,
  renderCountryDisplay,
  getDatabaseStats,
  searchCountries,
  
  // Tier helper functions
  isTier1: tier1Countries.isTier1,
  getTier1Countries: () => tier1Countries.codes,
  getTier1Stats: () => ({
    total: tier1Countries.codes.length,
    byRegion: Object.fromEntries(
      Object.entries(tier1Countries.byRegion).map(([region, countries]) => [region, countries.length])
    )
  }),
  
  // Country addition functions
  addTier1Country,
  addTier2Country,
  addCountry,
  
  // Check pricing control
  hasCustomPricing: function(countryCode) {
    const country = countryDatabase[countryCode];
    return country ? country.customPricing : false;
  }
};

// Export for Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = noorlinkDatabase;
} else {
  window.noorlinkDatabase = noorlinkDatabase;
}

console.log("\n✅ SYSTEM READY! You can now:");
console.log("1. Add more Tier 1 countries with addTier1Country()");
console.log("2. Add Tier 2 countries with addTier2Country()");
console.log("3. Search countries with searchCountries()");
console.log("4. Get plans with getCountryPlans()");
console.log("5. Display with renderCountryDisplay()");
// Add this to your existing esim-database.js file
noorlinkDatabase.getAllCountriesWithData = function() {
    return Object.entries(this.countryDatabase).map(([code, country]) => {
        const plans = country.tier === 1 ? country.plans : this.regionalTemplates[country.region].plans;
        return {
            code,
            flag: country.flag,
            name: country.name,
            tier: country.tier,
            region: country.region,
            plans
        };
    });
};

// Also add a method to get region mapping
noorlinkDatabase.getRegionMapping = function() {
    return {
        'europe': 'Europe',
        'asia-pacific': 'Asia Pacific',
        'middle-east': 'Middle East',
        'africa': 'Africa',
        'north-america': 'North America',
        'south-america': 'South America'
    };
};// ====== ADD THESE FUNCTIONS TO YOUR EXISTING DATABASE FILE ======
// Add to the noorlinkDatabase object at the end of your file

noorlinkDatabase.getCountryDisplayData = function(countryCode) {
  // This function hides all tier/template information from users
  
  const country = this.countryDatabase[countryCode];
  
  if (!country) {
    // Country not in database - use template
    const region = this.determineRegion(countryCode);
    const template = this.regionalTemplates[region];
    
    return {
      flag: this.getFlagForCode(countryCode),
      name: this.formatCountryName(countryCode),
      displayName: this.formatCountryName(countryCode).toUpperCase(),
      plans: template.plans,
      features: this.generateFeaturesForCountry(countryCode, template),
      note: template.note,
      localCarriers: template.carrierPool.slice(0, 2),
      networkTech: template.networkTech
    };
  }
  
  // Country is in database - return data WITHOUT tier info
  return {
    flag: country.flag,
    name: country.name,
    displayName: country.displayName || country.name.toUpperCase(),
    plans: country.plans,
    features: country.features || [],
    note: country.note || '',
    localCarriers: country.localCarriers || [],
    networkTech: country.networkTech || ''
  };
};

noorlinkDatabase.determineRegion = function(countryCode) {
  // Determine region based on country code
  const regionMapping = {
    // North America
    'usa': 'north-america', 'canada': 'north-america', 'mexico': 'north-america',
    
    // Europe
    'uk': 'europe', 'france': 'europe', 'germany': 'europe', 'italy': 'europe',
    'spain': 'europe', 'netherlands': 'europe', 'switzerland': 'europe',
    'portugal': 'europe', 'austria': 'europe', 'belgium': 'europe',
    'ireland': 'europe', 'sweden': 'europe', 'norway': 'europe', 'denmark': 'europe',
    'finland': 'europe',
    
    // Asia Pacific
    'japan': 'asia-pacific', 'china': 'asia-pacific', 'india': 'asia-pacific',
    'australia': 'asia-pacific', 'singapore': 'asia-pacific', 'thailand': 'asia-pacific',
    'south-korea': 'asia-pacific', 'indonesia': 'asia-pacific', 'malaysia': 'asia-pacific',
    'philippines': 'asia-pacific',
    
    // Middle East
    'saudi-arabia': 'middle-east', 'uae': 'middle-east', 'qatar': 'middle-east',
    'kuwait': 'middle-east', 'bahrain': 'middle-east', 'oman': 'middle-east',
    'turkey': 'middle-east', 'egypt': 'middle-east', 'jordan': 'middle-east',
    'lebanon': 'middle-east',
    
    // South America
    'brazil': 'south-america', 'argentina': 'south-america', 'chile': 'south-america',
    'colombia': 'south-america', 'peru': 'south-america',
    
    // Africa
    'south-africa': 'africa', 'nigeria': 'africa', 'morocco': 'africa',
    
    // Islands
    'iceland': 'europe', 'fiji': 'asia-pacific', 'maldives': 'asia-pacific',
    'bahamas': 'north-america', 'malta': 'europe'
  };
  
  return regionMapping[countryCode] || 'europe'; // Default to Europe
};

noorlinkDatabase.generateFeaturesForCountry = function(countryCode, template) {
  // Generate country-specific features based on template
  const countryName = this.formatCountryName(countryCode);
  const carriers = template.carrierPool.slice(0, 2);
  
  return [
    `${countryName} coverage included`,
    template.networkTech,
    `${carriers[0]} & ${carriers[1]} networks`,
    'Instant eSIM activation',
    'No contracts or commitments',
    '24/7 customer support'
  ];
};

noorlinkDatabase.formatCountryName = function(code) {
  return code
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

noorlinkDatabase.getFlagForCode = function(code) {
  const flagMap = {
    'usa': '🇺🇸', 'uk': '🇬🇧', 'uae': '🇦🇪', 'saudi-arabia': '🇸🇦',
    'japan': '🇯🇵', 'france': '🇫🇷', 'germany': '🇩🇪', 'australia': '🇦🇺',
    'canada': '🇨🇦', 'mexico': '🇲🇽', 'brazil': '🇧🇷', 'china': '🇨🇳',
    'india': '🇮🇳', 'singapore': '🇸🇬', 'thailand': '🇹🇭', 'south-korea': '🇰🇷',
    'qatar': '🇶🇦', 'kuwait': '🇰🇼', 'bahrain': '🇧🇭', 'oman': '🇴🇲',
    'turkey': '🇹🇷', 'egypt': '🇪🇬', 'spain': '🇪🇸', 'italy': '🇮🇹'
  };
  
  return flagMap[code] || '🌍';
};

// For search functionality
noorlinkDatabase.searchCountries = function(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  // Search in country database
  Object.entries(this.countryDatabase).forEach(([code, country]) => {
    if (country.name.toLowerCase().includes(lowerQuery) || 
        code.toLowerCase().includes(lowerQuery)) {
      results.push({
        code: code,
        name: country.name,
        flag: country.flag,
        type: 'country'
      });
    }
  });
  
  // If no results, check if it's a region
  const regionMap = {
    'europe': 'Europe',
    'asia': 'Asia Pacific',
    'middle east': 'Middle East',
    'africa': 'Africa',
    'america': 'Americas'
  };
  
  for (const [key, regionName] of Object.entries(regionMap)) {
    if (lowerQuery.includes(key)) {
      results.push({
        code: key.replace(' ', '-'),
        name: `${regionName} Region`,
        flag: '🌍',
        type: 'region'
      });
      break;
    }
  }
  
  return results;
};