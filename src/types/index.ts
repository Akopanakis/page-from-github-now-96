
export interface FormData {
  initialWeight: number;
  cleaningLoss: number;
  processingLoss: number;
  glazingWeight: number;
  costPerKg: number;
  profitMargin: number;
}

export interface CalculationResults {
  finalWeight: number;
  totalCost: number;
  costPerKg: number;
  sellingPrice: number;
  profit: number;
}

export interface BatchData {
  id: string;
  date: string;
  formData: FormData;
  results: CalculationResults;
  timestamp: number;
}
