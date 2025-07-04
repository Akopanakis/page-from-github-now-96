import { format, subDays, addDays } from "date-fns";

// Generate realistic stub data for all modules

export interface ExpenseRecord {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  supplier?: string;
  status: "pending" | "approved" | "paid";
  batch?: string;
}

export interface ComplianceRecord {
  id: string;
  date: string;
  type: string;
  title: string;
  status: "compliant" | "warning" | "non-compliant";
  score: number;
  inspector?: string;
  notes?: string;
}

export interface ProductBatch {
  id: string;
  productName: string;
  species: string;
  weight: number;
  units: number;
  purchasePrice: number;
  date: string;
  supplier: string;
  qualityGrade: string;
  status: "processing" | "completed" | "shipped";
}

export interface AnalyticsRecord {
  id: string;
  date: string;
  revenue: number;
  costs: number;
  margin: number;
  volume: number;
  customers: number;
}

export interface OperationalRecord {
  id: string;
  date: string;
  operation: string;
  duration: number;
  workers: number;
  efficiency: number;
  costs: number;
  output: number;
}

// Generate expense data
export function generateExpenseData(count: number = 50): ExpenseRecord[] {
  const categories = [
    "Materials",
    "Labor",
    "Transport",
    "Utilities",
    "Packaging",
    "Equipment",
    "Marketing",
  ];
  const suppliers = [
    "Atlantic Seafood",
    "Ocean Fresh",
    "Marine Supply Co",
    "Coastal Logistics",
    "Fresh Catch Ltd",
  ];
  const statuses: ExpenseRecord["status"][] = ["pending", "approved", "paid"];

  return Array.from({ length: count }, (_, i) => {
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 90)),
      "yyyy-MM-dd",
    );
    const category = categories[Math.floor(Math.random() * categories.length)];
    const amount = Math.round((Math.random() * 5000 + 100) * 100) / 100;

    return {
      id: `exp-${String(i + 1).padStart(3, "0")}`,
      date,
      amount,
      category,
      description: `${category} expense for ${format(new Date(date), "MMM yyyy")}`,
      supplier:
        Math.random() > 0.3
          ? suppliers[Math.floor(Math.random() * suppliers.length)]
          : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      batch:
        Math.random() > 0.6
          ? `BATCH-${String(Math.floor(Math.random() * 100) + 1).padStart(3, "0")}`
          : undefined,
    };
  });
}

// Generate compliance data
export function generateComplianceData(count: number = 40): ComplianceRecord[] {
  const types = [
    "HACCP",
    "ISO 22000",
    "MSC",
    "ASC",
    "BRC",
    "IFS",
    "FSSC 22000",
  ];
  const titles = [
    "Temperature Control Audit",
    "Traceability Documentation",
    "Supplier Verification",
    "Product Testing Results",
    "Hygiene Standards Review",
    "Cold Chain Validation",
    "Quality Management System",
    "Allergen Control Procedures",
  ];
  const inspectors = [
    "John Smith",
    "Maria Garcia",
    "Ahmed Hassan",
    "Li Wei",
    "Anna Kowalski",
  ];
  const statuses: ComplianceRecord["status"][] = [
    "compliant",
    "warning",
    "non-compliant",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 120)),
      "yyyy-MM-dd",
    );
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const score =
      status === "compliant"
        ? 85 + Math.random() * 15
        : status === "warning"
          ? 70 + Math.random() * 15
          : 50 + Math.random() * 20;

    return {
      id: `comp-${String(i + 1).padStart(3, "0")}`,
      date,
      type: types[Math.floor(Math.random() * types.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      status,
      score: Math.round(score),
      inspector: inspectors[Math.floor(Math.random() * inspectors.length)],
      notes:
        status !== "compliant"
          ? "Follow-up required within 30 days"
          : undefined,
    };
  });
}

// Generate batch data
export function generateBatchData(count: number = 35): ProductBatch[] {
  const species = [
    "Salmon",
    "Tuna",
    "Cod",
    "Shrimp",
    "Crab",
    "Lobster",
    "Sea Bass",
    "Mackerel",
  ];
  const suppliers = [
    "Nordic Fish",
    "Mediterranean Catch",
    "Atlantic Premium",
    "Ocean Fresh",
    "Coastal Harvest",
  ];
  const grades = ["Premium", "Grade A", "Grade B", "Standard"];
  const statuses: ProductBatch["status"][] = [
    "processing",
    "completed",
    "shipped",
  ];

  return Array.from({ length: count }, (_, i) => {
    const species_name = species[Math.floor(Math.random() * species.length)];
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 60)),
      "yyyy-MM-dd",
    );
    const weight = Math.round((Math.random() * 500 + 50) * 10) / 10;
    const units = Math.floor(Math.random() * 1000 + 100);
    const purchasePrice = Math.round((Math.random() * 20 + 5) * 100) / 100;

    return {
      id: `BATCH-${String(i + 1).padStart(3, "0")}`,
      productName: `Fresh ${species_name}`,
      species: species_name,
      weight,
      units,
      purchasePrice,
      date,
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      qualityGrade: grades[Math.floor(Math.random() * grades.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
}

// Generate analytics data
export function generateAnalyticsData(count: number = 30): AnalyticsRecord[] {
  return Array.from({ length: count }, (_, i) => {
    const date = format(subDays(new Date(), count - i), "yyyy-MM-dd");
    const revenue = Math.round((Math.random() * 50000 + 20000) * 100) / 100;
    const costs = Math.round(revenue * (0.6 + Math.random() * 0.2) * 100) / 100;
    const margin = Math.round((revenue - costs) * 100) / 100;
    const volume = Math.round((Math.random() * 2000 + 500) * 10) / 10;
    const customers = Math.floor(Math.random() * 50 + 20);

    return {
      id: `analytics-${String(i + 1).padStart(3, "0")}`,
      date,
      revenue,
      costs,
      margin,
      volume,
      customers,
    };
  });
}

// Generate operational data
export function generateOperationalData(
  count: number = 45,
): OperationalRecord[] {
  const operations = [
    "Fish Processing",
    "Quality Control",
    "Packaging",
    "Cold Storage",
    "Transportation",
    "Inventory Management",
    "Order Fulfillment",
    "Cleaning & Sanitization",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 30)),
      "yyyy-MM-dd",
    );
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const duration = Math.round((Math.random() * 8 + 1) * 10) / 10;
    const workers = Math.floor(Math.random() * 10 + 2);
    const efficiency = Math.round((75 + Math.random() * 25) * 10) / 10;
    const costs =
      Math.round(duration * workers * (15 + Math.random() * 10) * 100) / 100;
    const output = Math.round((Math.random() * 1000 + 200) * 10) / 10;

    return {
      id: `op-${String(i + 1).padStart(3, "0")}`,
      date,
      operation,
      duration,
      workers,
      efficiency,
      costs,
      output,
    };
  });
}

// Market intelligence data
export interface MarketRecord {
  id: string;
  date: string;
  species: string;
  price: number;
  volume: number;
  market: string;
  trend: "up" | "down" | "stable";
}

export function generateMarketData(count: number = 60): MarketRecord[] {
  const species = ["Salmon", "Tuna", "Cod", "Shrimp", "Crab", "Lobster"];
  const markets = ["EU", "US", "Asia", "Local", "Export"];
  const trends: MarketRecord["trend"][] = ["up", "down", "stable"];

  return Array.from({ length: count }, (_, i) => {
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 90)),
      "yyyy-MM-dd",
    );
    const species_name = species[Math.floor(Math.random() * species.length)];
    const price = Math.round((Math.random() * 25 + 8) * 100) / 100;
    const volume = Math.round((Math.random() * 5000 + 1000) * 10) / 10;

    return {
      id: `market-${String(i + 1).padStart(3, "0")}`,
      date,
      species: species_name,
      price,
      volume,
      market: markets[Math.floor(Math.random() * markets.length)],
      trend: trends[Math.floor(Math.random() * trends.length)],
    };
  });
}

// Sustainability data
export interface SustainabilityRecord {
  id: string;
  date: string;
  metric: string;
  value: number;
  unit: string;
  target: number;
  status: "on-track" | "behind" | "exceeded";
}

export function generateSustainabilityData(
  count: number = 30,
): SustainabilityRecord[] {
  const metrics = [
    { name: "Carbon Footprint", unit: "kg CO2e" },
    { name: "Water Usage", unit: "liters" },
    { name: "Energy Consumption", unit: "kWh" },
    { name: "Waste Reduction", unit: "%" },
    { name: "Renewable Energy", unit: "%" },
    { name: "Recycling Rate", unit: "%" },
  ];
  const statuses: SustainabilityRecord["status"][] = [
    "on-track",
    "behind",
    "exceeded",
  ];

  return Array.from({ length: count }, (_, i) => {
    const date = format(
      subDays(new Date(), Math.floor(Math.random() * 60)),
      "yyyy-MM-dd",
    );
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const value = Math.round((Math.random() * 1000 + 100) * 10) / 10;
    const target = Math.round(value * (0.8 + Math.random() * 0.4) * 10) / 10;
    const status =
      value >= target
        ? "exceeded"
        : value >= target * 0.9
          ? "on-track"
          : "behind";

    return {
      id: `sustain-${String(i + 1).padStart(3, "0")}`,
      date,
      metric: metric.name,
      value,
      unit: metric.unit,
      target,
      status,
    };
  });
}

// Export all generators
export const stubDataGenerators = {
  expenses: generateExpenseData,
  compliance: generateComplianceData,
  batches: generateBatchData,
  analytics: generateAnalyticsData,
  operations: generateOperationalData,
  market: generateMarketData,
  sustainability: generateSustainabilityData,
};

// Combined data generator
export function generateAllStubData() {
  return {
    expenses: generateExpenseData(50),
    compliance: generateComplianceData(40),
    batches: generateBatchData(35),
    analytics: generateAnalyticsData(30),
    operations: generateOperationalData(45),
    market: generateMarketData(60),
    sustainability: generateSustainabilityData(30),
  };
}
