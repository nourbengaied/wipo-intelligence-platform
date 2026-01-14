// Table of Contents data for IP Benchbooks
// This maps section names to page numbers for navigation

export interface TocSection {
  title: string;
  page: number;
  subsections?: TocSection[];
  keywords?: string[]; // Additional keywords for AI matching
}

// Philippines Benchbook Table of Contents
export const philippinesToC: TocSection[] = [
  {
    title: "Introduction",
    page: 1,
    keywords: ["overview", "introduction", "getting started", "about"]
  },
  {
    title: "Intellectual Property Overview",
    page: 3,
    keywords: ["IP basics", "IP overview", "what is IP", "types of IP"]
  },
  {
    title: "Patents",
    page: 5,
    subsections: [
      { title: "Patent Requirements", page: 6, keywords: ["patent criteria", "patentability"] },
      { title: "Patent Application Process", page: 8, keywords: ["filing patent", "how to apply"] },
      { title: "Patent Examination", page: 10, keywords: ["examination process", "patent review"] },
      { title: "Patent Rights and Duration", page: 12, keywords: ["patent protection", "patent term"] }
    ],
    keywords: ["patent", "patents", "invention protection"]
  },
  {
    title: "Trademarks",
    page: 15,
    subsections: [
      { title: "Trademark Registration", page: 16, keywords: ["register trademark", "trademark filing"] },
      { title: "Trademark Protection", page: 18, keywords: ["trademark rights", "brand protection"] },
      { title: "Trademark Renewal", page: 20, keywords: ["renew trademark", "trademark maintenance"] }
    ],
    keywords: ["trademark", "trademarks", "brand", "logo protection"]
  },
  {
    title: "Copyright",
    page: 22,
    subsections: [
      { title: "Copyright Basics", page: 23, keywords: ["copyright fundamentals", "what is copyright"] },
      { title: "Copyright Registration", page: 25, keywords: ["register copyright", "copyright filing"] },
      { title: "Copyright Duration", page: 27, keywords: ["copyright term", "protection period"] },
      { title: "Fair Use and Exceptions", page: 29, keywords: ["fair use", "copyright exceptions"] }
    ],
    keywords: ["copyright", "author rights", "creative work protection"]
  },
  {
    title: "Industrial Designs",
    page: 31,
    keywords: ["design protection", "industrial design", "aesthetic design"]
  },
  {
    title: "Trade Secrets",
    page: 34,
    keywords: ["confidential information", "trade secret", "proprietary information"]
  },
  {
    title: "IP Enforcement",
    page: 37,
    subsections: [
      { title: "Infringement Actions", page: 38, keywords: ["IP violation", "infringement lawsuit"] },
      { title: "Border Measures", page: 40, keywords: ["customs", "import controls"] },
      { title: "Criminal Enforcement", page: 42, keywords: ["IP crimes", "counterfeiting"] }
    ],
    keywords: ["enforcement", "IP protection", "legal action"]
  },
  {
    title: "IP Office Procedures",
    page: 44,
    keywords: ["IPOPHL", "IP office", "administrative procedures"]
  },
  {
    title: "International Treaties",
    page: 47,
    keywords: ["international agreements", "treaties", "conventions"]
  }
];

// Introduction Benchbook Table of Contents (default)
export const introductionToC: TocSection[] = [
  {
    title: "Introduction to Intellectual Property",
    page: 1,
    keywords: ["introduction", "overview", "getting started", "what is IP"]
  },
  {
    title: "Types of Intellectual Property",
    page: 3,
    keywords: ["IP types", "forms of IP", "IP categories"]
  },
  {
    title: "Chapter 1: Trademark",
    page: 10,
    subsections: [
      { title: "Introduction", page: 10, keywords: ["trademark intro", "trademark introduction"] },
      { title: "What is a trademark?", page: 10, keywords: ["trademark definition", "define trademark", "what is trademark"] },
      { title: "International sources of law", page: 12, keywords: ["international law", "trademark treaties"] },
      { title: "Obtaining registered trademark protection", page: 12, keywords: ["trademark registration", "register trademark", "trademark protection"] },
      { title: "Filing a trademark application", page: 13, keywords: ["file trademark", "trademark filing", "apply trademark"] },
      { title: "Opposition", page: 13, keywords: ["trademark opposition", "oppose trademark"] },
      { title: "Examination", page: 13, keywords: ["trademark examination", "trademark review"] },
      { title: "Registration duration and renewal", page: 14, keywords: ["trademark renewal", "renew trademark", "trademark duration"] },
      { title: "Appeal procedures", page: 14, keywords: ["trademark appeal", "appeal trademark decision"] },
      { title: "R or ® symbol", page: 14, keywords: ["registered symbol", "trademark symbol", "® symbol"] },
      { title: "Requirements for a valid trademark", page: 14, keywords: ["trademark requirements", "valid trademark", "trademark criteria"] },
      { title: "Signs that may serve as trademarks", page: 14, keywords: ["trademark signs", "types of trademarks"] },
      { title: "Actual or acquired distinctiveness", page: 14, keywords: ["distinctiveness", "trademark distinctiveness"] },
      { title: "Exclusion from registration", page: 15, keywords: ["trademark exclusions", "cannot register"] },
      { title: "Absolute and relative grounds for refusal", page: 15, keywords: ["refusal grounds", "trademark refusal"] },
      { title: "Use requirement", page: 16, keywords: ["trademark use", "use requirement"] },
      { title: "Rights conferred by trademark registration", page: 16, keywords: ["trademark rights", "rights of trademark owner"] },
      { title: "Right to prevent others from using the trademark", page: 16, keywords: ["exclusive rights", "prevent use"] },
      { title: "Right to prevent use of well-known marks", page: 16, keywords: ["well-known marks", "famous marks"] },
      { title: "Right to dispose of trademark as property", page: 17, keywords: ["trademark property", "trademark disposal"] },
      { title: "Assignment", page: 17, keywords: ["trademark assignment", "transfer trademark"] },
      { title: "Licensing", page: 17, keywords: ["trademark licensing", "license trademark"] },
      { title: "Coexistence agreements", page: 17, keywords: ["coexistence", "trademark coexistence"] },
      { title: "Restrictions of the exclusive right", page: 17, keywords: ["trademark restrictions", "limitations"] },
      { title: "Parallel imports", page: 17, keywords: ["parallel imports", "grey market"] },
      { title: "Public policy", page: 18, keywords: ["public policy", "trademark policy"] },
      { title: "Revocation or invalidation", page: 18, keywords: ["revoke trademark", "invalidate trademark", "trademark cancellation"] },
      { title: "Infringement proceedings", page: 18, keywords: ["trademark infringement", "infringement", "violation"] },
      { title: "Likelihood of confusion", page: 19, keywords: ["confusion", "likelihood of confusion", "consumer confusion"] },
      { title: "Similarity of trademarks", page: 19, keywords: ["similar trademarks", "trademark similarity"] },
      { title: "Similarity of goods or services", page: 20, keywords: ["similar goods", "similar services"] },
      { title: "Counterfeiting", page: 20, keywords: ["counterfeit", "fake trademarks", "counterfeiting"] }
    ],
    keywords: ["trademark", "trademarks", "brand", "logo", "mark"]
  },
  {
    title: "International IP Framework",
    page: 14,
    subsections: [
      { title: "WIPO and Its Role", page: 15, keywords: ["WIPO", "World Intellectual Property Organization"] },
      { title: "Paris Convention", page: 17, keywords: ["Paris Convention", "industrial property"] },
      { title: "Berne Convention", page: 19, keywords: ["Berne Convention", "copyright convention"] },
      { title: "TRIPS Agreement", page: 21, keywords: ["TRIPS", "WTO", "trade-related"] },
      { title: "PCT System", page: 23, keywords: ["PCT", "Patent Cooperation Treaty", "international patent"] }
    ],
    keywords: ["international", "treaties", "conventions", "global IP"]
  },
  {
    title: "IP Rights and Protection",
    page: 25,
    keywords: ["IP rights", "protection", "legal framework"]
  },
  {
    title: "IP Management",
    page: 28,
    subsections: [
      { title: "IP Strategy", page: 29, keywords: ["IP strategy", "IP planning"] },
      { title: "IP Portfolio Management", page: 31, keywords: ["portfolio", "IP assets"] },
      { title: "IP Valuation", page: 33, keywords: ["valuation", "IP value", "asset value"] }
    ],
    keywords: ["IP management", "managing IP", "IP administration"]
  },
  {
    title: "IP Commercialization",
    page: 35,
    keywords: ["commercialization", "licensing", "technology transfer"]
  },
  {
    title: "IP and Innovation",
    page: 38,
    keywords: ["innovation", "R&D", "research and development"]
  },
  {
    title: "Best Practices",
    page: 41,
    keywords: ["best practices", "guidelines", "recommendations"]
  }
];

// Helper function to get ToC based on country
export function getBenchbookToC(country: string): TocSection[] {
  if (country === "philippines") {
    return philippinesToC;
  }
  return introductionToC;
}

// Helper function to search ToC for matching sections
export function searchToC(toc: TocSection[], query: string): TocSection | null {
  const lowerQuery = query.toLowerCase();
  
  // Function to check if a section matches the query
  const matches = (section: TocSection): boolean => {
    // Check title
    if (section.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Check keywords
    if (section.keywords) {
      for (const keyword of section.keywords) {
        if (keyword.toLowerCase().includes(lowerQuery) || lowerQuery.includes(keyword.toLowerCase())) {
          return true;
        }
      }
    }
    
    return false;
  };
  
  // Search through all sections
  for (const section of toc) {
    if (matches(section)) {
      return section;
    }
    
    // Search subsections
    if (section.subsections) {
      for (const subsection of section.subsections) {
        if (matches(subsection)) {
          return subsection;
        }
      }
    }
  }
  
  return null;
}

// Helper function to extract section context for AI
export function getTocContext(toc: TocSection[]): string {
  let context = "Available sections in this benchbook:\n\n";
  
  toc.forEach((section, index) => {
    context += `${index + 1}. ${section.title} (Page ${section.page})\n`;
    if (section.subsections) {
      section.subsections.forEach((sub) => {
        context += `   - ${sub.title} (Page ${sub.page})\n`;
      });
    }
  });
  
  return context;
}
