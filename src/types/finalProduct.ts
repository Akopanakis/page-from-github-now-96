// Final Product Batch Management System Types
// This file contains all type definitions for the new modular functionality

export interface PackagingOption {
  id: string;
  name: string;
  type: 'φελιζόλ' | 'σακούλα' | 'κουτί' | 'κιβώτιο';
  capacity: number; // kg per unit
  unitCost: number; // € per unit
  description: string;
}

export interface RawMaterialBatch {
  id: string;
  productName: string;
  batchNumber: string;
  supplierName: string;
  totalKg: number;
  usedKg: number;
  remainingKg: number;
  costPerKg: number;
  purchaseDate: string;
  isActive: boolean;
}

export interface FinalProduct {
  id: string;
  code: string;
  name: string;
  category: 'fish' | 'seafood' | 'processed';
  description: string;
  defaultPackaging: string[];
  isActive: boolean;
}

export interface FinalProductBatch {
  id: string;
  batchNumber: string;
  productId: string;
  productName: string;
  productCode: string;
  
  // Source material
  sourceBatchId: string;
  sourceBatchNumber: string;
  rawUsedKg: number;
  rawCostPerKg: number;
  
  // Production
  finalProductKg: number;
  productionDate: string;
  yieldPercentage: number;
  
  // Packaging
  packagingType: string;
  packagingUnits: number;
  packagingCostPerUnit: number;
  packagingCostTotal: number;
  
  // Costs
  rawMaterialCost: number;
  calculatedCostPerKg: number;
  totalCost: number;
  
  // Status
  status: 'produced' | 'in_stock' | 'sold' | 'partial_sold';
  createdAt: string;
  updatedAt: string;
}

export interface FinalProductStock {
  id: string;
  batchId: string;
  batchNumber: string;
  productId: string;
  productName: string;
  productCode: string;
  
  // Quantities
  totalKg: number;
  remainingKg: number;
  soldKg: number;
  
  // Packaging
  packagingType: string;
  totalUnits: number;
  remainingUnits: number;
  
  // Costs
  costPerKg: number;
  
  // Dates
  productionDate: string;
  expiryDate?: string;
  
  // Location
  storageLocation?: string;
  
  // Status
  isAvailable: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface SaleTransaction {
  id: string;
  saleDate: string;
  customerName: string;
  
  // Products
  items: SaleItem[];
  
  // Totals
  totalKg: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitMargin: number;
  
  createdAt: string;
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  batchId: string;
  batchNumber: string;
  
  // Quantities
  soldKg: number;
  pricePerKg: number;
  
  // Costs from batch
  costPerKg: number;
  
  // Calculated
  revenue: number;
  cost: number;
  profit: number;
}

export interface ProductionReport {
  period: {
    from: string;
    to: string;
  };
  
  summary: {
    totalBatches: number;
    totalProducedKg: number;
    totalSoldKg: number;
    totalRevenue: number;
    totalCost: number;
    totalProfit: number;
    averageYield: number;
    averageProfitMargin: number;
  };
  
  byProduct: Array<{
    productId: string;
    productName: string;
    batches: number;
    producedKg: number;
    soldKg: number;
    revenue: number;
    cost: number;
    profit: number;
    avgYield: number;
    profitMargin: number;
  }>;
  
  topPerformers: {
    mostProfitable: SaleItem[];
    bestYield: FinalProductBatch[];
    highestVolume: FinalProductBatch[];
  };
}

export interface DashboardStats {
  today: {
    batchesProduced: number;
    kgProduced: number;
    revenue: number;
    profit: number;
  };
  
  thisMonth: {
    batchesProduced: number;
    kgProduced: number;
    revenue: number;
    profit: number;
    profitMargin: number;
  };
  
  stock: {
    totalProducts: number;
    totalKg: number;
    totalValue: number;
    lowStockAlerts: number;
  };
  
  trends: {
    productionTrend: Array<{ date: string; kg: number; revenue: number }>;
    profitTrend: Array<{ date: string; profit: number; margin: number }>;
  };
}

// Demo Data Interface
export interface DemoData {
  rawMaterials: RawMaterialBatch[];
  finalProducts: FinalProduct[];
  packagingOptions: PackagingOption[];
  batches: FinalProductBatch[];
  stock: FinalProductStock[];
  sales: SaleTransaction[];
}

// Form Interfaces
export interface FinalProductBatchFormData {
  productId: string;
  sourceBatchId: string;
  rawUsedKg: number;
  finalProductKg: number;
  packagingType: string;
  packagingUnits: number;
  productionDate: string;
  notes?: string;
}

export interface SaleFormData {
  customerName: string;
  items: Array<{
    productId: string;
    requestedKg: number;
    pricePerKg: number;
  }>;
  saleDate: string;
  notes?: string;
}

// Utility Types
export type SortDirection = 'asc' | 'desc';
export type FilterPeriod = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface TableSortConfig {
  key: string;
  direction: SortDirection;
}

export interface DateRange {
  from: string;
  to: string;
}

export interface FilterConfig {
  period: FilterPeriod;
  dateRange?: DateRange;
  productIds?: string[];
  batchNumbers?: string[];
  customerNames?: string[];
  minProfit?: number;
  maxProfit?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Constants
export const PACKAGING_TYPES = [
  'φελιζόλ_5kg',
  'φελιζόλ_10kg', 
  'σακούλα_1kg',
  'σακούλα_2kg',
  'κουτί_5kg',
  'κιβώτιο_10kg'
] as const;

export const PRODUCT_CATEGORIES = [
  'fish',
  'seafood', 
  'processed'
] as const;

export const BATCH_STATUS_OPTIONS = [
  'produced',
  'in_stock',
  'sold',
  'partial_sold'
] as const;

export type PackagingType = typeof PACKAGING_TYPES[number];
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
export type BatchStatus = typeof BATCH_STATUS_OPTIONS[number];
