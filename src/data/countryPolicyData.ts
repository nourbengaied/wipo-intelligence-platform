// Country-specific IP Policy data

// Countries with national models and their details
export const nationalModelCountries: Record<string, {
  languages: string[];
  documents?: string[];
}> = {
  "algeria": { languages: ["Arabic", "French"] },
  "colombia": { languages: ["Spanish"] },
  "el-salvador": { languages: ["Spanish"] },
  "india": { languages: ["English", "Hindi"] },
  "jordan": { languages: ["Arabic", "English"] },
  "kyrgyzstan": { languages: ["Russian", "Kyrgyz"] },
  "morocco": { languages: ["Arabic", "French"] },
  "panama": { languages: ["Spanish"] },
  "russian-federation": { languages: ["Russian"] },
  "south-africa": { languages: ["English"] },
  "viet-nam": { languages: ["Vietnamese", "English"] },
};

// Regional model regions
export const regionalModelRegions: Record<string, {
  name: string;
  countries: string[];
}> = {
  "africa": {
    name: "Africa",
    countries: [
      "angola", "benin", "botswana", "burkina-faso", "burundi", "cameroon",
      "cape-verde", "central-african-republic", "chad", "comoros", "congo",
      "cote-d-ivoire", "djibouti", "equatorial-guinea", "eritrea", "eswatini",
      "ethiopia", "gabon", "gambia", "ghana", "guinea", "guinea-bissau",
      "kenya", "lesotho", "liberia", "libya", "madagascar", "malawi", "mali",
      "mauritania", "mauritius", "mozambique", "namibia", "niger", "nigeria",
      "rwanda", "sao-tome-and-principe", "senegal", "seychelles", "sierra-leone",
      "somalia", "sudan", "south-sudan", "tanzania", "togo", "tunisia", "uganda",
      "zambia", "zimbabwe"
    ]
  },
  "asean": {
    name: "ASEAN",
    countries: [
      "brunei", "cambodia", "indonesia", "laos", "malaysia", "myanmar",
      "philippines", "singapore", "thailand", "vietnam"
    ]
  },
  "card": {
    name: "Central America and the Dominican Republic (CARD)",
    countries: [
      "belize", "costa-rica", "dominican-republic", "guatemala", "honduras",
      "nicaragua"
    ]
  }
};

// Helper function to check if country has national model
export const hasNationalModel = (countrySlug: string): boolean => {
  return Object.keys(nationalModelCountries).includes(countrySlug.toLowerCase());
};

// Helper function to get national model info
export const getNationalModelInfo = (countrySlug: string) => {
  return nationalModelCountries[countrySlug.toLowerCase()];
};

// Helper function to get regional model for a country
export const getRegionalModel = (countrySlug: string): { region: string; name: string } | null => {
  const normalizedSlug = countrySlug.toLowerCase();
  
  for (const [regionKey, regionData] of Object.entries(regionalModelRegions)) {
    if (regionData.countries.includes(normalizedSlug)) {
      return { region: regionKey, name: regionData.name };
    }
  }
  return null;
};

// Helper to determine what model type to show
export const getPolicyModelType = (countrySlug: string): "national" | "regional" | "toolkit-only" => {
  if (hasNationalModel(countrySlug)) {
    return "national";
  }
  if (getRegionalModel(countrySlug)) {
    return "regional";
  }
  return "toolkit-only";
};

// Publicly available country reports (online resources)
export const countryReports: Record<string, {
  title: string;
  type: string;
  url: string;
  year: number;
  source: string;
}[]> = {
  "kenya": [
    {
      title: "Kenya Intellectual Property Strategy 2030",
      type: "National IP Strategy",
      url: "https://www.wipo.int/edocs/pubdocs/en/wipo_pub_transition_ke.pdf",
      year: 2023,
      source: "WIPO"
    },
    {
      title: "KIPI Annual Report",
      type: "IP Office Report",
      url: "https://www.kipi.go.ke/reports",
      year: 2024,
      source: "KIPI"
    }
  ],
  "south-africa": [
    {
      title: "South Africa IP Policy Framework",
      type: "National IP Policy",
      url: "https://www.thedtic.gov.za/ip-policy",
      year: 2023,
      source: "DTI"
    },
    {
      title: "CIPC Annual Report",
      type: "IP Office Report",
      url: "https://www.cipc.co.za/annual-reports",
      year: 2024,
      source: "CIPC"
    }
  ],
  "india": [
    {
      title: "National Intellectual Property Rights Policy",
      type: "National IP Policy",
      url: "https://ipindia.gov.in/policy",
      year: 2023,
      source: "DPIIT"
    },
    {
      title: "India Innovation Index",
      type: "Innovation Report",
      url: "https://www.niti.gov.in/india-innovation-index",
      year: 2024,
      source: "NITI Aayog"
    }
  ],
  "brazil": [
    {
      title: "Brazil National IP Strategy",
      type: "National IP Strategy",
      url: "https://www.gov.br/inpi/ip-strategy",
      year: 2023,
      source: "INPI Brazil"
    }
  ],
  "nigeria": [
    {
      title: "Nigeria IP Commission Reports",
      type: "IP Office Report",
      url: "https://iponigeria.com/reports",
      year: 2024,
      source: "NCC"
    }
  ],
  "egypt": [
    {
      title: "Egypt IP Development Strategy",
      type: "National IP Strategy",
      url: "https://www.egypo.gov.eg/strategy",
      year: 2023,
      source: "EGYPO"
    }
  ],
  "morocco": [
    {
      title: "Morocco Innovation and IP Report",
      type: "Innovation Report",
      url: "https://www.ompic.ma/reports",
      year: 2024,
      source: "OMPIC"
    }
  ],
  "indonesia": [
    {
      title: "Indonesia IP Strategic Plan",
      type: "National IP Strategy",
      url: "https://dgip.go.id/strategic-plan",
      year: 2023,
      source: "DGIP"
    }
  ],
  "vietnam": [
    {
      title: "Vietnam IP Development Strategy to 2030",
      type: "National IP Strategy",
      url: "https://www.noip.gov.vn/strategy",
      year: 2023,
      source: "NOIP"
    }
  ],
  "colombia": [
    {
      title: "Colombia IP Statistics and Analysis",
      type: "IP Statistics",
      url: "https://www.sic.gov.co/estadisticas",
      year: 2024,
      source: "SIC"
    }
  ],
  "mexico": [
    {
      title: "Mexico Industrial Property Report",
      type: "IP Office Report",
      url: "https://www.gob.mx/impi/reports",
      year: 2024,
      source: "IMPI"
    }
  ],
  "thailand": [
    {
      title: "Thailand IP Roadmap 2027",
      type: "National IP Strategy",
      url: "https://www.ipthailand.go.th/roadmap",
      year: 2023,
      source: "DIP Thailand"
    }
  ],
  "philippines": [
    {
      title: "Philippines IP Development Plan",
      type: "National IP Strategy",
      url: "https://www.ipophil.gov.ph/dev-plan",
      year: 2024,
      source: "IPOPHL"
    }
  ],
  "ghana": [
    {
      title: "Ghana IP Policy Document",
      type: "National IP Policy",
      url: "https://www.rgd.gov.gh/ip-policy",
      year: 2023,
      source: "RGD Ghana"
    }
  ]
};

// WIPO Global Reports (available for all countries)
export const globalWIPOReports = [
  {
    title: "Global Innovation Index",
    type: "Innovation Report",
    url: "https://www.wipo.int/global_innovation_index/en/",
    year: 2024,
    source: "WIPO"
  },
  {
    title: "World Intellectual Property Indicators",
    type: "IP Statistics",
    url: "https://www.wipo.int/publications/en/series/index.jsp?id=37",
    year: 2024,
    source: "WIPO"
  },
  {
    title: "PCT Yearly Review",
    type: "Patent Report",
    url: "https://www.wipo.int/pct/en/activity/",
    year: 2024,
    source: "WIPO"
  },
  {
    title: "Madrid System Statistics",
    type: "Trademark Report",
    url: "https://www.wipo.int/madrid/en/statistics/",
    year: 2024,
    source: "WIPO"
  }
];
