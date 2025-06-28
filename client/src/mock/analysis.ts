export interface AnalysisData {
  costBreakdown: {
    category: string;
    value: number;
    percentage: number;
    color: string;
  }[];
  profitabilityTrends: {
    date: string;
    profit: number;
    margin: number;
    volume: number;
  }[];
  categoryPerformance: {
    category: string;
    totalRevenue: number;
    totalCost: number;
    profit: number;
    margin: number;
    volume: number;
  }[];
  seasonalFactors: {
    month: string;
    factor: number;
    demand: number;
    priceMultiplier: number;
  }[];
}

export const mockAnalysisData: AnalysisData = {
  costBreakdown: [
    {
      category: "Πρώτες Ύλες",
      value: 6240,
      percentage: 52.8,
      color: "#3b82f6",
    },
    {
      category: "Εργατικά",
      value: 2100,
      percentage: 17.8,
      color: "#10b981",
    },
    {
      category: "Μεταφορά",
      value: 1450,
      percentage: 12.3,
      color: "#f59e0b",
    },
    {
      category: "Συσκευασία",
      value: 980,
      percentage: 8.3,
      color: "#ef4444",
    },
    {
      category: "Ενέργεια",
      value: 650,
      percentage: 5.5,
      color: "#8b5cf6",
    },
    {
      category: "Άλλα",
      value: 400,
      percentage: 3.4,
      color: "#6b7280",
    },
  ],
  profitabilityTrends: [
    { date: "2024-01-01", profit: 1250, margin: 28.5, volume: 180 },
    { date: "2024-01-08", profit: 1380, margin: 31.2, volume: 195 },
    { date: "2024-01-15", profit: 1420, margin: 32.8, volume: 210 },
    { date: "2024-01-22", profit: 1350, margin: 30.1, volume: 185 },
    { date: "2024-01-29", profit: 1480, margin: 34.2, volume: 220 },
    { date: "2024-02-05", profit: 1520, margin: 35.8, volume: 235 },
    { date: "2024-02-12", profit: 1390, margin: 29.9, volume: 200 },
  ],
  categoryPerformance: [
    {
      category: "Ψάρια",
      totalRevenue: 3652.5,
      totalCost: 2379,
      profit: 1273.5,
      margin: 34.9,
      volume: 270,
    },
    {
      category: "Μαλάκια",
      totalRevenue: 3096,
      totalCost: 1904,
      profit: 1192,
      margin: 38.5,
      volume: 290,
    },
    {
      category: "Οστρακόδερμα",
      totalRevenue: 1936,
      totalCost: 1264,
      profit: 672,
      margin: 34.7,
      volume: 80,
    },
    {
      category: "Επεξεργασμένα",
      totalRevenue: 1968,
      totalCost: 1350,
      profit: 618,
      margin: 31.4,
      volume: 60,
    },
  ],
  seasonalFactors: [
    { month: "Ιαν", factor: 1.2, demand: 85, priceMultiplier: 1.1 },
    { month: "Φεβ", factor: 1.1, demand: 80, priceMultiplier: 1.05 },
    { month: "Μαρ", factor: 0.9, demand: 95, priceMultiplier: 0.95 },
    { month: "Απρ", factor: 0.8, demand: 110, priceMultiplier: 0.9 },
    { month: "Μάι", factor: 0.7, demand: 120, priceMultiplier: 0.85 },
    { month: "Ιουν", factor: 0.6, demand: 140, priceMultiplier: 0.8 },
    { month: "Ιουλ", factor: 0.5, demand: 160, priceMultiplier: 0.75 },
    { month: "Αυγ", factor: 0.6, demand: 150, priceMultiplier: 0.8 },
    { month: "Σεπ", factor: 0.8, demand: 130, priceMultiplier: 0.9 },
    { month: "Οκτ", factor: 1.0, demand: 115, priceMultiplier: 1.0 },
    { month: "Νοε", factor: 1.1, demand: 90, priceMultiplier: 1.05 },
    { month: "Δεκ", factor: 1.3, demand: 75, priceMultiplier: 1.15 },
  ],
};

export const fetchAnalysisData = (): Promise<AnalysisData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAnalysisData), 600);
  });
};
