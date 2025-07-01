export interface EnhancedSeafoodData {
  products: SeafoodProduct[];
  suppliers: Supplier[];
  markets: Market[];
  seasonalFactors: SeasonalFactor[];
  industryBenchmarks: IndustryBenchmark[];
  competitorAnalysis: Competitor[];
  economicIndicators: EconomicIndicator[];
}

export interface SeafoodProduct {
  id: string;
  name: string;
  nameEn: string;
  category: "fish" | "shellfish" | "mollusks" | "processed" | "frozen";
  origin: string;
  seasonPeak: string[];
  priceRange: {
    wholesale: { min: number; max: number; current: number };
    retail: { min: number; max: number; current: number };
  };
  qualityGrades: {
    premium: { percentage: number; priceMultiplier: number };
    standard: { percentage: number; priceMultiplier: number };
    budget: { percentage: number; priceMultiplier: number };
  };
  processingRequirements: {
    cleaning: { time: number; lossPercentage: number; cost: number };
    filleting: { time: number; lossPercentage: number; cost: number };
    packaging: { time: number; cost: number };
  };
  storageRequirements: {
    temperature: number;
    humidity: number;
    maxDays: number;
    costPerDay: number;
  };
  sustainability: {
    msc: boolean;
    localSource: boolean;
    carbonFootprint: number; // kg CO2 per kg
    sustainabilityScore: number; // 0-100
  };
  marketDemand: {
    restaurants: number; // percentage
    retail: number;
    export: number;
    seasonal: boolean;
  };
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  type: "fisherman" | "aquaculture" | "importer" | "processor";
  products: string[];
  reliability: number; // 0-100
  quality: number; // 0-100
  priceCompetitiveness: number; // 0-100
  paymentTerms: number; // days
  minimumOrder: number; // kg
  certifications: string[];
  sustainabilityRating: number;
  deliveryRadius: number; // km
  capacity: {
    daily: number; // kg
    monthly: number; // kg
    seasonal: boolean;
  };
}

export interface Market {
  id: string;
  name: string;
  type: "local" | "regional" | "national" | "export";
  size: number; // €/year
  growth: number; // % annually
  competition: "low" | "medium" | "high";
  priceElasticity: number;
  demographics: {
    avgIncome: number;
    ageGroups: { young: number; middle: number; senior: number };
    urbanRural: { urban: number; rural: number };
  };
  trends: {
    organic: number; // % preference
    sustainable: number;
    convenience: number;
    premium: number;
  };
  barriers: {
    regulatory: string[];
    logistical: string[];
    cultural: string[];
  };
}

export interface SeasonalFactor {
  month: string;
  monthIndex: number;
  fishingActivity: number; // 0-100
  demand: number; // 0-100
  priceIndex: number; // base 100
  weather: {
    temperature: number;
    seaConditions: "calm" | "moderate" | "rough";
    impact: "positive" | "neutral" | "negative";
  };
  tourism: number; // tourist arrivals index
  festivalsEvents: string[];
  restrictions: string[];
}

export interface IndustryBenchmark {
  category: string;
  metric: string;
  value: number;
  unit: string;
  source: string;
  year: number;
  percentiles: {
    p25: number;
    p50: number;
    p75: number;
    p90: number;
  };
}

export interface Competitor {
  id: string;
  name: string;
  marketShare: number; // %
  strengths: string[];
  weaknesses: string[];
  pricing: "premium" | "competitive" | "budget";
  distribution: string[];
  products: string[];
  revenue: number; // estimated
  employees: number;
  locations: string[];
  strategy: string;
}

export interface EconomicIndicator {
  indicator: string;
  current: number;
  previous: number;
  forecast: number;
  unit: string;
  impact: "positive" | "negative" | "neutral";
  relevance: "high" | "medium" | "low";
}

export const enhancedSeafoodData: EnhancedSeafoodData = {
  products: [
    {
      id: "seabream-greece",
      name: "Τσιπούρα Ελλάδας",
      nameEn: "Greek Sea Bream",
      category: "fish",
      origin: "Ελλάδα - Ιόνιο Πέλαγος",
      seasonPeak: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος"],
      priceRange: {
        wholesale: { min: 6.8, max: 9.5, current: 8.2 },
        retail: { min: 11.5, max: 16.0, current: 13.8 },
      },
      qualityGrades: {
        premium: { percentage: 25, priceMultiplier: 1.25 },
        standard: { percentage: 65, priceMultiplier: 1.0 },
        budget: { percentage: 10, priceMultiplier: 0.8 },
      },
      processingRequirements: {
        cleaning: { time: 8, lossPercentage: 15, cost: 0.45 },
        filleting: { time: 12, lossPercentage: 35, cost: 0.8 },
        packaging: { time: 3, cost: 0.25 },
      },
      storageRequirements: {
        temperature: 2,
        humidity: 85,
        maxDays: 7,
        costPerDay: 0.15,
      },
      sustainability: {
        msc: true,
        localSource: true,
        carbonFootprint: 2.1,
        sustainabilityScore: 87,
      },
      marketDemand: {
        restaurants: 45,
        retail: 40,
        export: 15,
        seasonal: true,
      },
    },
    {
      id: "seabass-greece",
      name: "Λαβράκι Ελλάδας",
      nameEn: "Greek Sea Bass",
      category: "fish",
      origin: "Ελλάδα - Αιγαίο Πέλαγος",
      seasonPeak: ["Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Φεβρουάριος"],
      priceRange: {
        wholesale: { min: 7.2, max: 10.8, current: 9.1 },
        retail: { min: 12.5, max: 18.0, current: 15.2 },
      },
      qualityGrades: {
        premium: { percentage: 30, priceMultiplier: 1.3 },
        standard: { percentage: 60, priceMultiplier: 1.0 },
        budget: { percentage: 10, priceMultiplier: 0.85 },
      },
      processingRequirements: {
        cleaning: { time: 10, lossPercentage: 18, cost: 0.5 },
        filleting: { time: 15, lossPercentage: 38, cost: 0.9 },
        packaging: { time: 3, cost: 0.25 },
      },
      storageRequirements: {
        temperature: 1,
        humidity: 85,
        maxDays: 6,
        costPerDay: 0.18,
      },
      sustainability: {
        msc: true,
        localSource: true,
        carbonFootprint: 2.3,
        sustainabilityScore: 85,
      },
      marketDemand: {
        restaurants: 50,
        retail: 35,
        export: 15,
        seasonal: true,
      },
    },
    {
      id: "mussels-thermaikos",
      name: "Μύδια Θερμαϊκού",
      nameEn: "Thermaikos Mussels",
      category: "mollusks",
      origin: "Ελλάδα - Θερμαϊκός Κόλπος",
      seasonPeak: [
        "Οκτώβριος",
        "Νοέμβριος",
        "Δεκέμβριος",
        "Ιανουάριος",
        "Φεβρουάριος",
      ],
      priceRange: {
        wholesale: { min: 2.8, max: 4.2, current: 3.5 },
        retail: { min: 5.5, max: 8.0, current: 6.8 },
      },
      qualityGrades: {
        premium: { percentage: 20, priceMultiplier: 1.2 },
        standard: { percentage: 70, priceMultiplier: 1.0 },
        budget: { percentage: 10, priceMultiplier: 0.75 },
      },
      processingRequirements: {
        cleaning: { time: 15, lossPercentage: 25, cost: 0.3 },
        filleting: { time: 0, lossPercentage: 0, cost: 0 },
        packaging: { time: 5, cost: 0.2 },
      },
      storageRequirements: {
        temperature: 4,
        humidity: 95,
        maxDays: 3,
        costPerDay: 0.1,
      },
      sustainability: {
        msc: false,
        localSource: true,
        carbonFootprint: 0.8,
        sustainabilityScore: 95,
      },
      marketDemand: {
        restaurants: 60,
        retail: 30,
        export: 10,
        seasonal: true,
      },
    },
    {
      id: "shrimp-imported",
      name: "Γαρίδες Εισαγωγής",
      nameEn: "Imported Shrimp",
      category: "shellfish",
      origin: "Εκουαδόρ",
      seasonPeak: ["Όλο το έτος"],
      priceRange: {
        wholesale: { min: 12.5, max: 18.0, current: 15.2 },
        retail: { min: 22.0, max: 32.0, current: 27.5 },
      },
      qualityGrades: {
        premium: { percentage: 40, priceMultiplier: 1.35 },
        standard: { percentage: 50, priceMultiplier: 1.0 },
        budget: { percentage: 10, priceMultiplier: 0.7 },
      },
      processingRequirements: {
        cleaning: { time: 20, lossPercentage: 12, cost: 0.8 },
        filleting: { time: 0, lossPercentage: 0, cost: 0 },
        packaging: { time: 8, cost: 0.4 },
      },
      storageRequirements: {
        temperature: -18,
        humidity: 90,
        maxDays: 180,
        costPerDay: 0.05,
      },
      sustainability: {
        msc: false,
        localSource: false,
        carbonFootprint: 8.5,
        sustainabilityScore: 45,
      },
      marketDemand: {
        restaurants: 70,
        retail: 25,
        export: 5,
        seasonal: false,
      },
    },
  ],

  suppliers: [
    {
      id: "aquatica-holdings",
      name: "Aquatica Holdings",
      location: "Εύβοια, Ελλάδα",
      type: "aquaculture",
      products: ["seabream-greece", "seabass-greece"],
      reliability: 92,
      quality: 88,
      priceCompetitiveness: 75,
      paymentTerms: 30,
      minimumOrder: 500,
      certifications: ["MSC", "ISO 22000", "BRC"],
      sustainabilityRating: 85,
      deliveryRadius: 300,
      capacity: {
        daily: 2000,
        monthly: 45000,
        seasonal: true,
      },
    },
    {
      id: "cretan-fisheries",
      name: "Κρητικές Ιχθυοκαλλιέργειες",
      location: "Κρήτη, Ελλάδα",
      type: "aquaculture",
      products: ["seabream-greece"],
      reliability: 88,
      quality: 90,
      priceCompetitiveness: 70,
      paymentTerms: 15,
      minimumOrder: 300,
      certifications: ["ASC", "ISO 14001", "HACCP"],
      sustainabilityRating: 92,
      deliveryRadius: 400,
      capacity: {
        daily: 1200,
        monthly: 28000,
        seasonal: true,
      },
    },
    {
      id: "thermaikos-mussels",
      name: "Θαλάσσια Προϊόντα Θερμαϊκού",
      location: "Θεσσαλονίκη, Ελλάδα",
      type: "fisherman",
      products: ["mussels-thermaikos"],
      reliability: 85,
      quality: 95,
      priceCompetitiveness: 85,
      paymentTerms: 7,
      minimumOrder: 200,
      certifications: ["HACCP", "ISO 22000"],
      sustainabilityRating: 95,
      deliveryRadius: 200,
      capacity: {
        daily: 800,
        monthly: 18000,
        seasonal: true,
      },
    },
  ],

  markets: [
    {
      id: "athens-metro",
      name: "Μητροπολιτική Αθήνα",
      type: "regional",
      size: 450000000,
      growth: 3.2,
      competition: "high",
      priceElasticity: -1.2,
      demographics: {
        avgIncome: 18500,
        ageGroups: { young: 28, middle: 45, senior: 27 },
        urbanRural: { urban: 95, rural: 5 },
      },
      trends: {
        organic: 25,
        sustainable: 35,
        convenience: 60,
        premium: 30,
      },
      barriers: {
        regulatory: ["Άδειες λιανικής", "Υγειονομικές"],
        logistical: ["Κίνηση", "Χώροι στάθμευσης"],
        cultural: ["Προτίμηση φρέσκου"],
      },
    },
    {
      id: "thessaloniki-metro",
      name: "Μητροπολιτική Θεσσαλονίκη",
      type: "regional",
      size: 180000000,
      growth: 2.8,
      competition: "medium",
      priceElasticity: -1.4,
      demographics: {
        avgIncome: 16200,
        ageGroups: { young: 32, middle: 42, senior: 26 },
        urbanRural: { urban: 85, rural: 15 },
      },
      trends: {
        organic: 20,
        sustainable: 40,
        convenience: 45,
        premium: 22,
      },
      barriers: {
        regulatory: ["Άδειες", "Φόροι"],
        logistical: ["Διανομή"],
        cultural: ["Τοπικές προτιμήσεις"],
      },
    },
  ],

  seasonalFactors: [
    {
      month: "Ιανουάριος",
      monthIndex: 1,
      fishingActivity: 65,
      demand: 90,
      priceIndex: 115,
      weather: { temperature: 8, seaConditions: "rough", impact: "negative" },
      tourism: 20,
      festivalsEvents: ["Φανερώνια", "Αγίου Αντωνίου"],
      restrictions: ["Κακοκαιρία"],
    },
    {
      month: "Φεβρουάριος",
      monthIndex: 2,
      fishingActivity: 70,
      demand: 85,
      priceIndex: 110,
      weather: {
        temperature: 10,
        seaConditions: "moderate",
        impact: "neutral",
      },
      tourism: 25,
      festivalsEvents: ["Απόκριες"],
      restrictions: [],
    },
    // ... Continue for all months
  ],

  industryBenchmarks: [
    {
      category: "Κερδοφορία",
      metric: "Μικτό Περιθώριο",
      value: 32.5,
      unit: "%",
      source: "ICAP Group",
      year: 2024,
      percentiles: { p25: 28, p50: 32.5, p75: 38, p90: 45 },
    },
    {
      category: "Αποδοτικότητα",
      metric: "Κύκλωση Αποθεμάτων",
      value: 6.8,
      unit: "φορές/έτος",
      source: "Ελληνική Στατιστική Αρχή",
      year: 2024,
      percentiles: { p25: 4.2, p50: 6.8, p75: 8.5, p90: 12.0 },
    },
    {
      category: "Ρευστότητα",
      metric: "Τρέχων Δείκτης",
      value: 2.1,
      unit: "αναλογία",
      source: "Τράπεζα Ελλάδος",
      year: 2024,
      percentiles: { p25: 1.5, p50: 2.1, p75: 2.8, p90: 3.5 },
    },
  ],

  competitorAnalysis: [
    {
      id: "nireus",
      name: "Nireus Aquaculture",
      marketShare: 18.5,
      strengths: ["Μεγάλη κλίμακα", "Εξαγωγές", "Τεχνολογία"],
      weaknesses: ["Υψηλά κόστη", "Χρέη"],
      pricing: "competitive",
      distribution: ["Χονδρική", "Εξαγωγές", "Private Label"],
      products: ["Τσιπού��α", "Λαβράκι", "Φαγγρί"],
      revenue: 145000000,
      employees: 850,
      locations: ["Κεφαλονιά", "Κρήτη", "Λακωνία"],
      strategy: "Κάθετη ολοκλήρωση και εξαγωγές",
    },
    {
      id: "selonda",
      name: "Selonda Aquaculture",
      marketShare: 12.3,
      strengths: ["Ποιότητα", "Βιωσιμότητα", "Innovation"],
      weaknesses: ["Μικρότερη κλίμακα", "Υψηλές τιμές"],
      pricing: "premium",
      distribution: ["Εστιατόρια", "Gourmet retail"],
      products: ["Premium Τσιπούρα", "Οργανικό Λαβράκι"],
      revenue: 89000000,
      employees: 520,
      locations: ["Κεφαλονιά", "Ιθάκη"],
      strategy: "Premium positioning και βιωσιμότητα",
    },
  ],

  economicIndicators: [
    {
      indicator: "Πληθωρισμός Τροφίμων",
      current: 4.2,
      previous: 3.8,
      forecast: 3.5,
      unit: "%",
      impact: "negative",
      relevance: "high",
    },
    {
      indicator: "Τουριστικές Αφίξεις",
      current: 110,
      previous: 95,
      forecast: 115,
      unit: "δείκτης (βάση 100)",
      impact: "positive",
      relevance: "high",
    },
    {
      indicator: "Τιμές Καυσίμων",
      current: 1.65,
      previous: 1.58,
      forecast: 1.7,
      unit: "€/λίτρο",
      impact: "negative",
      relevance: "medium",
    },
  ],
};

export const getProductByCategory = (category: string) => {
  return enhancedSeafoodData.products.filter((p) => p.category === category);
};

export const getSuppliersByProduct = (productId: string) => {
  return enhancedSeafoodData.suppliers.filter((s) =>
    s.products.includes(productId),
  );
};

export const getSeasonalFactorByMonth = (month: number) => {
  return enhancedSeafoodData.seasonalFactors.find(
    (f) => f.monthIndex === month,
  );
};

export const getBenchmarkByMetric = (metric: string) => {
  return enhancedSeafoodData.industryBenchmarks.find(
    (b) => b.metric === metric,
  );
};
