export interface Batch {
  id: string;
  productId: string;
  productName: string;
  costPerKg: number;
  pricePerKg: number;
  profit: number;
  profitMargin: number;
  quantity: number;
  totalCost: number;
  totalRevenue: number;
  totalProfit: number;
  date: string;
  status: "processing" | "completed" | "sold";
  qualityScore: number;
  wastagePercent: number;
}

export const mockBatches: Batch[] = [
  {
    id: "batch_001",
    productId: "1",
    productName: "Τσιπούρα Ελλάδας",
    costPerKg: 8.5,
    pricePerKg: 12.75,
    profit: 4.25,
    profitMargin: 33.3,
    quantity: 150,
    totalCost: 1275,
    totalRevenue: 1912.5,
    totalProfit: 637.5,
    date: "2024-01-15",
    status: "completed",
    qualityScore: 92,
    wastagePercent: 8,
  },
  {
    id: "batch_002",
    productId: "2",
    productName: "Λαβράκι Ελλάδας",
    costPerKg: 9.2,
    pricePerKg: 14.5,
    profit: 5.3,
    profitMargin: 36.6,
    quantity: 120,
    totalCost: 1104,
    totalRevenue: 1740,
    totalProfit: 636,
    date: "2024-01-16",
    status: "processing",
    qualityScore: 89,
    wastagePercent: 6,
  },
  {
    id: "batch_003",
    productId: "3",
    productName: "Γαρίδες Τίγρης",
    costPerKg: 15.8,
    pricePerKg: 24.2,
    profit: 8.4,
    profitMargin: 34.7,
    quantity: 80,
    totalCost: 1264,
    totalRevenue: 1936,
    totalProfit: 672,
    date: "2024-01-17",
    status: "sold",
    qualityScore: 95,
    wastagePercent: 4,
  },
  {
    id: "batch_004",
    productId: "4",
    productName: "Μύδια Θερμαϊκού",
    costPerKg: 3.2,
    pricePerKg: 5.8,
    profit: 2.6,
    profitMargin: 44.8,
    quantity: 200,
    totalCost: 640,
    totalRevenue: 1160,
    totalProfit: 520,
    date: "2024-01-18",
    status: "completed",
    qualityScore: 87,
    wastagePercent: 12,
  },
  {
    id: "batch_005",
    productId: "5",
    productName: "Φιλέτο Σολομού",
    costPerKg: 22.5,
    pricePerKg: 32.8,
    profit: 10.3,
    profitMargin: 31.4,
    quantity: 60,
    totalCost: 1350,
    totalRevenue: 1968,
    totalProfit: 618,
    date: "2024-01-19",
    status: "processing",
    qualityScore: 93,
    wastagePercent: 3,
  },
];

export const fetchBatches = (): Promise<Batch[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBatches), 400);
  });
};

export const fetchBatchById = (id: string): Promise<Batch | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const batch = mockBatches.find((b) => b.id === id);
      resolve(batch || null);
    }, 200);
  });
};
