import { Worker } from "@/types/worker";

export interface ProcessingPhase {
  id: string;
  name: string;
  duration: number;
  costPerHour: number;
  personnelRequired: number;
}

export interface CostBreakdownItem {
  name: string;
  cost: number;
}

export interface FormData {
  productName: string;
  productType: "fish" | "shellfish" | "cephalopods" | "processed";
  purchasePrice: number;
  quantity: number;
  waste: number;
  glazingPercent: number;
  vatPercent: number;
  workers: Worker[];
  boxCost: number;
  bagCost: number;
  distance: number;
  fuelCost: number;
  tolls: number;
  parkingCost: number;
  driverSalary: number;
  profitMargin: number;
  profitTarget: number;
  competitor1: number;
  competitor2: number;
  electricityCost: number;
  equipmentCost: number;
  insuranceCost: number;
  rentCost: number;
  communicationCost: number;
  otherCosts: number;
  originAddress: string;
  destinationAddress: string;
  routeCalculated: boolean;
  estimatedDuration: string;
  batchNumber: string;
  supplierName: string;
  processingPhases: ProcessingPhase[];
  targetSellingPrice: number;
  minimumMargin: number;
  certifications: string[];
  seasonalMultiplier: number;
  storageTemperature: number;
  shelfLife: number;
  customerPrice: number;
}

export interface CalculationResults {
  totalCosts: number;
  totalCostWithVat: number;
  sellingPrice: number;
  profitPerKg: number;
  profitMargin: number;
  netWeight: number;
  purchaseCost: number;
  laborCost: number;
  packagingCost: number;
  transportCost: number;
  additionalCosts: number;
  vatAmount: number;
  finalProcessedWeight: number;
  totalWastePercentage: number;
  costBreakdown: CostBreakdownItem[];
  recommendedSellingPrice: number;
  competitorAnalysis: {
    ourPrice: number;
    competitor1Diff: number;
    competitor2Diff: number;
    marketPosition: 'competitive' | 'premium' | 'budget';
  };
  profitAnalysis: {
    breakEvenPrice: number;
    marginAtCurrentPrice: number;
    recommendedMargin: number;
  };
}

export const calculateTotalCost = (formData: FormData): number => {
  const purchaseCost = formData.purchasePrice * formData.quantity;
  const laborCost = formData.workers.reduce((sum, worker) => sum + worker.hourlyRate * worker.hours, 0);
  const packagingCost = formData.boxCost + formData.bagCost;
  const transportCost = formData.distance * formData.fuelCost + formData.tolls + formData.parkingCost + formData.driverSalary;
  const additionalCosts = formData.electricityCost + formData.equipmentCost + formData.insuranceCost + formData.rentCost + formData.communicationCost + formData.otherCosts;

  return purchaseCost + laborCost + packagingCost + transportCost + additionalCosts;
};

export const calculateSellingPrice = (totalCost: number, profitMargin: number): number => {
  return totalCost * (1 + profitMargin / 100);
};
