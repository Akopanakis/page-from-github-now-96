
export interface FormData {
  initialWeight: number;
  cleaningLoss: number;
  processingLoss: number;
  glazingWeight: number;
  costPerKg: number;
  profitMargin: number;
  cleaningYield: number;
  glazingPercentage: number;
  markupPercentage: number;
  transportCost: number;
  laborCost: number;
  packagingCost: number;
  additionalCosts: number;
}

export interface CalculationResults {
  finalWeight: number;
  totalCost: number;
  costPerKg: number;
  sellingPrice: number;
  profit: number;
  cleanWeight: number;
  materialCost: number;
  costPerKgFinal: number;
}

export interface BatchData {
  id: string;
  date: string;
  formData: FormData;
  results: CalculationResults;
  timestamp: number;
}
