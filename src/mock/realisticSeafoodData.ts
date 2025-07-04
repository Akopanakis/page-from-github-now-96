// Comprehensive realistic data for enhanced fisheries management system
export interface RealisticSeafoodData {
  // Core business entities
  vessels: FishingVessel[];
  catches: CatchRecord[];
  customers: Customer[];
  orders: Order[];
  suppliers: EnhancedSupplier[];
  products: EnhancedProduct[];
  inventory: InventoryItem[];

  // Market and economic data
  marketPrices: MarketPrice[];
  weatherData: WeatherData[];
  regulations: Regulation[];
  ports: Port[];

  // Financial and operational metrics
  kpiMetrics: KPIMetric[];
  benchmarks: IndustryBenchmark[];
  competitorData: CompetitorData[];

  // Compliance and sustainability
  certifications: Certification[];
  sustainabilityMetrics: SustainabilityMetric[];
  qualityChecks: QualityCheck[];
}

export interface FishingVessel {
  id: string;
  name: string;
  captain: string;
  type: "trawler" | "longliner" | "purse_seiner" | "aquaculture";
  length: number; // meters
  capacity: number; // tons
  crew: number;
  homePort: string;
  license: string;
  status: "active" | "maintenance" | "docked" | "fishing";
  location: {
    lat: number;
    lng: number;
    timestamp: Date;
  };
  fuelConsumption: number; // liters/hour
  operatingCosts: {
    daily: number;
    fuel: number;
    crew: number;
    maintenance: number;
  };
  equipment: string[];
  certifications: string[];
  lastInspection: Date;
  nextMaintenance: Date;
}

export interface CatchRecord {
  id: string;
  vesselId: string;
  date: Date;
  location: {
    lat: number;
    lng: number;
    fishingZone: string;
  };
  species: string;
  quantity: number; // kg
  quality: "A" | "B" | "C";
  method: string;
  weather: {
    condition: string;
    temperature: number;
    windSpeed: number;
  };
  price: number;
  buyer: string;
  certification: string[];
  processingRequired: boolean;
  storageLocation: string;
  expiryDate: Date;
}

export interface Customer {
  id: string;
  name: string;
  type: "restaurant" | "retailer" | "wholesaler" | "processor" | "exporter";
  contact: {
    person: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentTerms: number; // days
  creditLimit: number;
  currentBalance: number;
  preferredProducts: string[];
  qualityRequirements: {
    minGrade: string;
    certifications: string[];
    packaging: string;
  };
  deliverySchedule: string;
  seasonalDemand: { [month: string]: number };
  averageOrderValue: number;
  loyaltyScore: number; // 0-100
  registrationDate: Date;
  lastOrder: Date;
}

export interface Order {
  id: string;
  customerId: string;
  date: Date;
  deliveryDate: Date;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  items: OrderItem[];
  total: number;
  discount: number;
  shipping: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "overdue";
  notes: string;
  priority: "low" | "normal" | "high" | "urgent";
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  specifications: {
    grade: string;
    packaging: string;
    processing: string[];
  };
}

export interface EnhancedSupplier {
  id: string;
  name: string;
  type: "fisherman" | "aquaculture" | "importer" | "processor" | "equipment";
  location: string;
  contact: {
    person: string;
    email: string;
    phone: string;
  };
  products: string[];
  ratings: {
    quality: number;
    reliability: number;
    price: number;
    sustainability: number;
  };
  certifications: string[];
  paymentTerms: number;
  minimumOrder: number;
  deliveryTime: number; // days
  capacity: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  seasonalAvailability: { [month: string]: number };
  contractTerms: {
    price: "fixed" | "market" | "index";
    duration: number; // months
    exclusivity: boolean;
  };
}

export interface EnhancedProduct {
  id: string;
  name: string;
  nameEn: string;
  species: string;
  category: "fresh" | "frozen" | "processed" | "live";
  origin: string;
  seasonality: string[];
  nutritionalInfo: {
    protein: number;
    fat: number;
    omega3: number;
    calories: number;
  };
  pricing: {
    wholesale: number;
    retail: number;
    restaurant: number;
    export: number;
  };
  processingInfo: {
    shelfLife: number; // days
    storageTemp: number; // celsius
    processingTime: number; // minutes
    yieldPercentage: number;
    packagingOptions: string[];
  };
  qualityGrades: {
    premium: { percentage: number; markup: number };
    standard: { percentage: number; markup: number };
    economy: { percentage: number; markup: number };
  };
  sustainability: {
    mscCertified: boolean;
    localSource: boolean;
    carbonFootprint: number;
    sustainabilityScore: number;
    quotaStatus: "within" | "approaching" | "exceeded";
  };
  marketDemand: {
    trend: "rising" | "stable" | "declining";
    elasticity: number;
    substitutes: string[];
    complementary: string[];
  };
  regulations: {
    minSize: number;
    seasonClosure: string[];
    quotaLimits: number;
    traceabilityRequired: boolean;
  };
}

export interface InventoryItem {
  id: string;
  productId: string;
  batchNumber: string;
  quantity: number;
  location: string;
  status: "available" | "reserved" | "quarantine" | "expired";
  receivedDate: Date;
  expiryDate: Date;
  supplier: string;
  costPrice: number;
  qualityGrade: string;
  certifications: string[];
  storageConditions: {
    temperature: number;
    humidity: number;
    location: string;
  };
  traceability: {
    vessel: string;
    catchDate: Date;
    fishingZone: string;
    processingDate?: Date;
  };
}

export interface MarketPrice {
  id: string;
  productId: string;
  market: string;
  date: Date;
  priceType: "wholesale" | "retail" | "auction";
  price: number;
  volume: number;
  quality: string;
  trend: "up" | "down" | "stable";
  factors: string[]; // market influencing factors
}

export interface WeatherData {
  date: Date;
  location: string;
  temperature: number;
  windSpeed: number;
  waveHeight: number;
  visibility: number;
  condition: "calm" | "moderate" | "rough" | "stormy";
  forecast: string;
  fishingConditions: "excellent" | "good" | "fair" | "poor" | "dangerous";
  impact: {
    fishing: string;
    transport: string;
    processing: string;
  };
}

export interface Regulation {
  id: string;
  title: string;
  type: "fishing" | "processing" | "transport" | "trade" | "environmental";
  authority: string;
  effectiveDate: Date;
  expiryDate?: Date;
  summary: string;
  details: string;
  compliance: {
    required: boolean;
    deadline?: Date;
    cost: number;
    responsible: string;
  };
  penalties: {
    warning: string;
    fine: number;
    suspension: string;
  };
  relatedProducts: string[];
  status: "active" | "pending" | "expired";
}

export interface Port {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    country: string;
    region: string;
  };
  type: "fishing" | "commercial" | "marina";
  facilities: {
    fuel: boolean;
    ice: boolean;
    processing: boolean;
    storage: boolean;
    repair: boolean;
    auction: boolean;
  };
  capacity: {
    vessels: number;
    storage: number; // tons
    processing: number; // tons/day
  };
  fees: {
    docking: number;
    storage: number;
    processing: number;
    fuel: number;
  };
  operatingHours: string;
  contact: {
    harbormaster: string;
    phone: string;
    email: string;
  };
  weatherProtection: "excellent" | "good" | "fair" | "poor";
  accessibility: "always" | "tidal" | "seasonal";
}

export interface KPIMetric {
  id: string;
  name: string;
  category:
    | "financial"
    | "operational"
    | "quality"
    | "sustainability"
    | "safety";
  value: number;
  unit: string;
  target: number;
  trend: "improving" | "stable" | "declining";
  period: "daily" | "weekly" | "monthly" | "quarterly" | "annual";
  lastUpdated: Date;
  benchmark: number;
  status: "excellent" | "good" | "warning" | "critical";
  description: string;
  calculation: string;
}

export interface CompetitorData {
  id: string;
  name: string;
  marketShare: number;
  revenue: number;
  employees: number;
  vessels: number;
  products: string[];
  strengths: string[];
  weaknesses: string[];
  strategy: string;
  recentNews: string[];
  pricing: "premium" | "competitive" | "discount";
  distribution: string[];
  certifications: string[];
  sustainabilityRating: number;
}

export interface Certification {
  id: string;
  name: string;
  type: "quality" | "sustainability" | "safety" | "organic" | "fair_trade";
  issuingBody: string;
  validFrom: Date;
  validUntil: Date;
  scope: string[];
  requirements: string[];
  auditSchedule: string;
  cost: number;
  benefits: string[];
  status: "active" | "pending" | "expired" | "suspended";
  relatedProducts: string[];
}

export interface SustainabilityMetric {
  id: string;
  metric: string;
  value: number;
  unit: string;
  target: number;
  category: "environmental" | "social" | "economic";
  reportingPeriod: string;
  dataSource: string;
  verificationStatus: "verified" | "self_reported" | "estimated";
  trend: "improving" | "stable" | "worsening";
  actions: string[];
}

export interface QualityCheck {
  id: string;
  productId: string;
  batchNumber: string;
  checkDate: Date;
  inspector: string;
  checkType: "incoming" | "processing" | "outgoing" | "storage";
  parameters: {
    freshness: number;
    temperature: number;
    appearance: string;
    smell: string;
    texture: string;
    contamination: boolean;
  };
  result: "pass" | "conditional" | "fail";
  actions: string[];
  certificationBody?: string;
  notes: string;
}

// Realistic data implementation
export const realisticSeafoodData: RealisticSeafoodData = {
  vessels: [
    {
      id: "vessel-001",
      name: "Αγιος Νικόλαος",
      captain: "Γιάννης Κωνσταντόπουλος",
      type: "trawler",
      length: 24,
      capacity: 15,
      crew: 6,
      homePort: "Καλαμάτα",
      license: "KAL-2024-001",
      status: "fishing",
      location: {
        lat: 36.9065,
        lng: 22.1123,
        timestamp: new Date("2024-01-15T08:30:00Z"),
      },
      fuelConsumption: 45,
      operatingCosts: {
        daily: 850,
        fuel: 320,
        crew: 400,
        maintenance: 130,
      },
      equipment: ["GPS", "Sonar", "Net Sounder", "Fish Finder", "VHF Radio"],
      certifications: ["EU Fishing License", "HACCP", "Safety Certificate"],
      lastInspection: new Date("2024-01-01"),
      nextMaintenance: new Date("2024-02-15"),
    },
    {
      id: "vessel-002",
      name: "Θαλάσσιος Αετός",
      captain: "Μιχάλης Παπαδόπουλος",
      type: "longliner",
      length: 18,
      capacity: 8,
      crew: 4,
      homePort: "Βόλος",
      license: "VOL-2024-002",
      status: "docked",
      location: {
        lat: 39.3636,
        lng: 22.9464,
        timestamp: new Date("2024-01-15T06:00:00Z"),
      },
      fuelConsumption: 28,
      operatingCosts: {
        daily: 620,
        fuel: 220,
        crew: 300,
        maintenance: 100,
      },
      equipment: ["GPS", "VHF Radio", "Long Line System", "Ice Machine"],
      certifications: ["EU Fishing License", "MSC Chain of Custody"],
      lastInspection: new Date("2023-12-15"),
      nextMaintenance: new Date("2024-01-20"),
    },
  ],

  catches: [
    {
      id: "catch-001",
      vesselId: "vessel-001",
      date: new Date("2024-01-15T06:00:00Z"),
      location: {
        lat: 36.85,
        lng: 21.95,
        fishingZone: "FAO 37.2.1",
      },
      species: "Τσιπούρα (Sparus aurata)",
      quantity: 450,
      quality: "A",
      method: "Τράτα βυθού",
      weather: {
        condition: "Καλός καιρός",
        temperature: 12,
        windSpeed: 15,
      },
      price: 8.5,
      buyer: "Ιχθυόσκαλα Καλαμάτας",
      certification: ["Fresh", "Wild Caught"],
      processingRequired: true,
      storageLocation: "Cold Storage A",
      expiryDate: new Date("2024-01-22T23:59:59Z"),
    },
    {
      id: "catch-002",
      vesselId: "vessel-001",
      date: new Date("2024-01-15T10:30:00Z"),
      location: {
        lat: 36.82,
        lng: 21.98,
        fishingZone: "FAO 37.2.1",
      },
      species: "Λαβράκι (Dicentrarchus labrax)",
      quantity: 380,
      quality: "A",
      method: "Τράτα βυθού",
      weather: {
        condition: "Καλός καιρός",
        temperature: 14,
        windSpeed: 12,
      },
      price: 9.2,
      buyer: "Φρέσκα Ψάρια Μεσσηνίας",
      certification: ["Fresh", "Wild Caught", "Local"],
      processingRequired: false,
      storageLocation: "Cold Storage B",
      expiryDate: new Date("2024-01-21T23:59:59Z"),
    },
  ],

  customers: [
    {
      id: "customer-001",
      name: "Εστιατόριο Θαλασσινά Γεύσεις",
      type: "restaurant",
      contact: {
        person: "Νίκος Αθανασόπουλος",
        email: "info@thalassina-gefsis.gr",
        phone: "+30 210 5551234",
        address: "Κολωνάκι 15, Αθήνα 10673",
      },
      paymentTerms: 30,
      creditLimit: 25000,
      currentBalance: 4500,
      preferredProducts: ["seabream-fresh", "seabass-fresh", "red-mullet"],
      qualityRequirements: {
        minGrade: "A",
        certifications: ["Fresh", "MSC"],
        packaging: "Ice packed",
      },
      deliverySchedule: "Δευτέρα, Τετάρτη, Παρασκευή",
      seasonalDemand: {
        Ιανουάριος: 85,
        Φεβρουάριος: 70,
        Μάρτιος: 90,
        Απρίλιος: 100,
        Μάιος: 120,
        Ιούνιος: 150,
        Ιούλιος: 180,
        Αύγουστος: 185,
        Σεπτέμβριος: 140,
        Οκτώβριος: 110,
        Νοέμβριος: 95,
        Δεκέμβριος: 125,
      },
      averageOrderValue: 1250,
      loyaltyScore: 92,
      registrationDate: new Date("2020-03-15"),
      lastOrder: new Date("2024-01-12"),
    },
    {
      id: "customer-002",
      name: "Σούπερ Μάρκετ Φρέσκο",
      type: "retailer",
      contact: {
        person: "Μαρία Γεωργίου",
        email: "procurement@fresko.gr",
        phone: "+30 210 8881234",
        address: "Λεωφ. Κηφισίας 123, Μαρούσι 15124",
      },
      paymentTerms: 45,
      creditLimit: 75000,
      currentBalance: 12300,
      preferredProducts: [
        "seabream-fresh",
        "seabass-fresh",
        "sardines",
        "anchovies",
      ],
      qualityRequirements: {
        minGrade: "B",
        certifications: ["Fresh"],
        packaging: "Consumer ready",
      },
      deliverySchedule: "Καθημερινά",
      seasonalDemand: {
        Ιανουάριος: 90,
        Φεβρουάριος: 85,
        Μάρτιος: 95,
        Απρίλιος: 105,
        Μάιος: 110,
        Ιούνιος: 120,
        Ιούλιος: 125,
        Αύγουστος: 115,
        Σεπτέμβριος: 110,
        Οκτώβριος: 100,
        Νοέμβριος: 95,
        Δεκέμβριος: 130,
      },
      averageOrderValue: 3200,
      loyaltyScore: 78,
      registrationDate: new Date("2018-07-22"),
      lastOrder: new Date("2024-01-14"),
    },
  ],

  orders: [
    {
      id: "order-001",
      customerId: "customer-001",
      date: new Date("2024-01-12T09:00:00Z"),
      deliveryDate: new Date("2024-01-15T08:00:00Z"),
      status: "processing",
      items: [
        {
          productId: "seabream-fresh",
          quantity: 15,
          unitPrice: 12.5,
          discount: 0,
          specifications: {
            grade: "A",
            packaging: "Ice packed",
            processing: ["Scaled", "Gutted"],
          },
        },
        {
          productId: "seabass-fresh",
          quantity: 10,
          unitPrice: 14.8,
          discount: 5,
          specifications: {
            grade: "A",
            packaging: "Ice packed",
            processing: ["Whole"],
          },
        },
      ],
      total: 335.1,
      discount: 7.4,
      shipping: 15.0,
      paymentMethod: "Bank Transfer",
      paymentStatus: "pending",
      notes: "Παράδοση στο πίσω μέρος του εστιατορίου",
      priority: "normal",
    },
  ],

  suppliers: [
    {
      id: "supplier-001",
      name: "Ιχθυοκαλλιέργειες Κρήτης Α.Ε.",
      type: "aquaculture",
      location: "Χανιά, Κρήτη",
      contact: {
        person: "Αντώνης Μαρκάκης",
        email: "sales@crete-aqua.gr",
        phone: "+30 28210 55123",
      },
      products: ["seabream-fresh", "seabass-fresh"],
      ratings: {
        quality: 92,
        reliability: 88,
        price: 75,
        sustainability: 95,
      },
      certifications: ["ASC", "MSC", "HACCP", "ISO 22000"],
      paymentTerms: 30,
      minimumOrder: 500,
      deliveryTime: 2,
      capacity: {
        daily: 2000,
        weekly: 12000,
        monthly: 45000,
      },
      seasonalAvailability: {
        Ιανουάριος: 80,
        Φεβρουάριος: 85,
        Μάρτιος: 90,
        Απρίλιος: 95,
        Μάιος: 100,
        Ιούνιος: 100,
        Ιούλιος: 95,
        Αύγουστος: 90,
        Σεπτέμβριος: 95,
        Οκτώβριος: 100,
        Νοέμβριος: 90,
        Δεκέμβριος: 85,
      },
      contractTerms: {
        price: "index",
        duration: 12,
        exclusivity: false,
      },
    },
  ],

  products: [
    {
      id: "seabream-fresh",
      name: "Τσιπούρα Φρέσκια",
      nameEn: "Fresh Sea Bream",
      species: "Sparus aurata",
      category: "fresh",
      origin: "Ελληνικά Νερά",
      seasonality: ["Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", "Ιανουάριος"],
      nutritionalInfo: {
        protein: 20.1,
        fat: 3.8,
        omega3: 0.8,
        calories: 109,
      },
      pricing: {
        wholesale: 8.5,
        retail: 13.5,
        restaurant: 12.0,
        export: 9.2,
      },
      processingInfo: {
        shelfLife: 7,
        storageTemp: 2,
        processingTime: 15,
        yieldPercentage: 65,
        packagingOptions: ["Whole", "Gutted", "Filleted", "Portioned"],
      },
      qualityGrades: {
        premium: { percentage: 25, markup: 1.3 },
        standard: { percentage: 65, markup: 1.0 },
        economy: { percentage: 10, markup: 0.8 },
      },
      sustainability: {
        mscCertified: true,
        localSource: true,
        carbonFootprint: 2.1,
        sustainabilityScore: 87,
        quotaStatus: "within",
      },
      marketDemand: {
        trend: "stable",
        elasticity: -1.2,
        substitutes: ["seabass-fresh", "red-mullet"],
        complementary: ["lemon", "olive-oil", "herbs"],
      },
      regulations: {
        minSize: 20,
        seasonClosure: [],
        quotaLimits: 5000,
        traceabilityRequired: true,
      },
    },
    {
      id: "seabass-fresh",
      name: "Λαβράκι Φρέσκο",
      nameEn: "Fresh Sea Bass",
      species: "Dicentrarchus labrax",
      category: "fresh",
      origin: "Ελληνικά Νερά",
      seasonality: ["Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Φεβρουάριος"],
      nutritionalInfo: {
        protein: 18.8,
        fat: 2.9,
        omega3: 0.6,
        calories: 97,
      },
      pricing: {
        wholesale: 9.2,
        retail: 15.0,
        restaurant: 13.5,
        export: 10.8,
      },
      processingInfo: {
        shelfLife: 6,
        storageTemp: 1,
        processingTime: 18,
        yieldPercentage: 62,
        packagingOptions: ["Whole", "Gutted", "Filleted", "Portioned"],
      },
      qualityGrades: {
        premium: { percentage: 30, markup: 1.35 },
        standard: { percentage: 60, markup: 1.0 },
        economy: { percentage: 10, markup: 0.85 },
      },
      sustainability: {
        mscCertified: true,
        localSource: true,
        carbonFootprint: 2.3,
        sustainabilityScore: 85,
        quotaStatus: "within",
      },
      marketDemand: {
        trend: "rising",
        elasticity: -1.1,
        substitutes: ["seabream-fresh", "red-snapper"],
        complementary: ["capers", "white-wine", "butter"],
      },
      regulations: {
        minSize: 25,
        seasonClosure: ["Μάρτιος", "Απρίλιος"],
        quotaLimits: 4500,
        traceabilityRequired: true,
      },
    },
  ],

  inventory: [
    {
      id: "inv-001",
      productId: "seabream-fresh",
      batchNumber: "SB-2024-001",
      quantity: 450,
      location: "Cold Storage A",
      status: "available",
      receivedDate: new Date("2024-01-15T08:00:00Z"),
      expiryDate: new Date("2024-01-22T23:59:59Z"),
      supplier: "supplier-001",
      costPrice: 8.5,
      qualityGrade: "A",
      certifications: ["Fresh", "MSC", "Local"],
      storageConditions: {
        temperature: 2,
        humidity: 85,
        location: "Zone A-1",
      },
      traceability: {
        vessel: "vessel-001",
        catchDate: new Date("2024-01-15T06:00:00Z"),
        fishingZone: "FAO 37.2.1",
        processingDate: new Date("2024-01-15T14:00:00Z"),
      },
    },
  ],

  marketPrices: [
    {
      id: "price-001",
      productId: "seabream-fresh",
      market: "Ιχθυόσκαλα Πειραιά",
      date: new Date("2024-01-15"),
      priceType: "wholesale",
      price: 8.5,
      volume: 2500,
      quality: "A",
      trend: "stable",
      factors: ["Καλές καιρικές συνθήκες", "Σταθερή ζήτηση"],
    },
  ],

  weatherData: [
    {
      date: new Date("2024-01-15"),
      location: "Ιόνιο Πέλαγος",
      temperature: 12,
      windSpeed: 15,
      waveHeight: 1.2,
      visibility: 8,
      condition: "moderate",
      forecast: "Βελτίωση συνθηκών",
      fishingConditions: "good",
      impact: {
        fishing: "Ευνοϊκές συνθή��ες",
        transport: "Κανονικές συνθήκες",
        processing: "Κανονικές συνθήκες",
      },
    },
  ],

  regulations: [
    {
      id: "reg-001",
      title: "Ελάχιστα μεγέθη αλιείας",
      type: "fishing",
      authority: "Υπουργείο Αγροτικής Ανάπτυξης",
      effectiveDate: new Date("2024-01-01"),
      summary: "Καθορισμός ελάχιστων μεγεθών για εμπορικά είδη",
      details: "Τσιπούρα: 20cm, Λαβράκι: 25cm",
      compliance: {
        required: true,
        cost: 0,
        responsible: "Πλοίαρχος",
      },
      penalties: {
        warning: "Πρώτη παράβαση",
        fine: 500,
        suspension: "Επαναλαμβανόμενες παραβάσεις",
      },
      relatedProducts: ["seabream-fresh", "seabass-fresh"],
      status: "active",
    },
  ],

  ports: [
    {
      id: "port-001",
      name: "Λιμάνι Καλαμάτας",
      location: {
        lat: 37.0353,
        lng: 22.1095,
        country: "Ελλάδα",
        region: "Πελοπόννησος",
      },
      type: "fishing",
      facilities: {
        fuel: true,
        ice: true,
        processing: true,
        storage: true,
        repair: true,
        auction: true,
      },
      capacity: {
        vessels: 120,
        storage: 500,
        processing: 50,
      },
      fees: {
        docking: 25,
        storage: 2.5,
        processing: 0.8,
        fuel: 1.25,
      },
      operatingHours: "24/7",
      contact: {
        harbormaster: "Κώστας Παπαδόπουλος",
        phone: "+30 27210 22345",
        email: "port@kalamata.gr",
      },
      weatherProtection: "good",
      accessibility: "always",
    },
  ],

  kpiMetrics: [
    {
      id: "kpi-001",
      name: "Συνολικά Έσοδα",
      category: "financial",
      value: 125000,
      unit: "€",
      target: 150000,
      trend: "improving",
      period: "monthly",
      lastUpdated: new Date("2024-01-15"),
      benchmark: 130000,
      status: "good",
      description: "Μηνιαία έσοδα από πωλήσεις",
      calculation: "Σύνολο τιμολογίων πωλήσεων",
    },
    {
      id: "kpi-002",
      name: "Περιθώριο Κέρδους",
      category: "financial",
      value: 24.5,
      unit: "%",
      target: 28.0,
      trend: "stable",
      period: "monthly",
      lastUpdated: new Date("2024-01-15"),
      benchmark: 26.2,
      status: "warning",
      description: "Μικτό περιθώριο κέρδους",
      calculation: "(Έσοδα - Κόστος) / Έσοδα × 100",
    },
  ],

  benchmarks: [
    {
      id: "bench-001",
      category: "Κερδοφορία",
      metric: "Μικτό Περιθώριο",
      value: 26.2,
      unit: "%",
      source: "Ελληνική Ένωση Ιχθυοκαλλιεργητών",
      year: 2024,
      percentiles: { p25: 22, p50: 26.2, p75: 31, p90: 38 },
    },
  ],

  competitorData: [
    {
      id: "comp-001",
      name: "Nireus Aquaculture",
      marketShare: 18.5,
      revenue: 145000000,
      employees: 850,
      vessels: 45,
      products: ["seabream-fresh", "seabass-fresh"],
      strengths: ["Μεγάλη κλίμακα", "Εξαγωγές", "Τεχνολογία"],
      weaknesses: ["Υψηλά κόστη", "Χρέη"],
      strategy: "Κάθετη ολοκλήρωση και εξαγωγές",
      recentNews: ["Νέα εργοστάσια επεξεργασίας", "Συμφωνία εξαγωγών"],
      pricing: "competitive",
      distribution: ["Χονδρική", "Εξαγωγές", "Private Label"],
      certifications: ["MSC", "ASC", "ISO 22000"],
      sustainabilityRating: 75,
    },
  ],

  certifications: [
    {
      id: "cert-001",
      name: "MSC Chain of Custody",
      type: "sustainability",
      issuingBody: "Marine Stewardship Council",
      validFrom: new Date("2023-06-01"),
      validUntil: new Date("2026-05-31"),
      scope: ["Αλιεία", "Επεξεργασία", "Διανομή"],
      requirements: ["Ανιχνευσιμότητα", "Διαχωρισμός προϊόντων"],
      auditSchedule: "Ετήσια",
      cost: 8500,
      benefits: ["Premium τιμολόγηση", "Πρόσβαση σε αγορές"],
      status: "active",
      relatedProducts: ["seabream-fresh", "seabass-fresh"],
    },
  ],

  sustainabilityMetrics: [
    {
      id: "sust-001",
      metric: "Αποτύπωμα Άνθρακα",
      value: 2.1,
      unit: "kg CO2/kg προϊόντος",
      target: 1.8,
      category: "environmental",
      reportingPeriod: "Ετήσια",
      dataSource: "Εσωτερική μέτρηση",
      verificationStatus: "verified",
      trend: "improving",
      actions: ["Βελτίωση καυσίμων", "Ανανεώσιμη ενέργεια"],
    },
  ],

  qualityChecks: [
    {
      id: "qc-001",
      productId: "seabream-fresh",
      batchNumber: "SB-2024-001",
      checkDate: new Date("2024-01-15T14:00:00Z"),
      inspector: "Μαρία Αντωνίου",
      checkType: "incoming",
      parameters: {
        freshness: 9.2,
        temperature: 2.1,
        appearance: "Excellent",
        smell: "Fresh sea",
        texture: "Firm",
        contamination: false,
      },
      result: "pass",
      actions: ["Αποδοχή παρτίδας"],
      certificationBody: "TÜV HELLAS",
      notes: "Εξαιρετική ποιότητα",
    },
  ],
};

// Helper functions for data access
export const getVesselsByStatus = (status: string) => {
  return realisticSeafoodData.vessels.filter((v) => v.status === status);
};

export const getCatchesByVessel = (vesselId: string) => {
  return realisticSeafoodData.catches.filter((c) => c.vesselId === vesselId);
};

export const getActiveOrders = () => {
  return realisticSeafoodData.orders.filter((o) =>
    ["pending", "confirmed", "processing"].includes(o.status),
  );
};

export const getInventoryByStatus = (status: string) => {
  return realisticSeafoodData.inventory.filter((i) => i.status === status);
};

export const getKPIsByCategory = (category: string) => {
  return realisticSeafoodData.kpiMetrics.filter((k) => k.category === category);
};

export const getActiveRegulations = () => {
  return realisticSeafoodData.regulations.filter((r) => r.status === "active");
};

export const getCurrentMarketPrices = () => {
  const today = new Date();
  return realisticSeafoodData.marketPrices.filter(
    (p) => p.date.toDateString() === today.toDateString(),
  );
};
