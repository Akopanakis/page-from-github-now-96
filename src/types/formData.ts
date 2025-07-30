// Extended FormData interface for KostoPro calculations
export interface ExtendedFormData {
  // Basic form fields
  productName?: string;
  supplier?: string;
  weight?: number;
  price?: number;
  
  // Final product weights
  finalCleanWeight?: number;
  finalGrillWeight?: number;
  
  // Packaging properties
  bagWeight?: number;
  bagsPerKgGelatin?: number;
  gelatinCostPerKg?: number;
  boxCostPerUnit?: number;
  bagsPerBox?: number;
  
  // Labor and costs
  transportCost?: number;
  workerCount?: number;
  laborHours?: number;
  additionalCosts?: number;
  
  // Allow any other string key with any value
  [key: string]: any;
}

// Type guard to ensure FormData has extended properties
export function isExtendedFormData(data: any): data is ExtendedFormData {
  return typeof data === 'object' && data !== null;
}
