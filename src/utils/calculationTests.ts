import { FormData, CalculationResults } from './calc';

// Mock calculation function for testing
export function mockCalculateResults(formData: FormData): CalculationResults {
  // Mock implementation for testing
  const purchaseCost = formData.purchasePrice * formData.quantity;
  const transportCost = formData.transportCost || 0;
  const laborCost = (formData.workerCount || 0) * (formData.laborHours || 0) * 4.5;
  const additionalCosts = formData.additionalCosts || 0;
  const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);
  
  const totalCost = purchaseCost + transportCost + laborCost + additionalCosts + packagingCost;
  const netWeight = formData.quantity * 0.9; // 90% yield
  const rawWeight = formData.quantity;
  const sellingPrice = totalCost * 1.2; // 20% markup
  
  return {
    purchaseCost,
    transportCost,
    laborCost,
    additionalCosts,
    packagingCost,
    totalCost,
    netWeight,
    rawWeight,
    sellingPrice,
    profitMargin: 20,
    grossProfit: sellingPrice - totalCost,
    sellingPrice: sellingPrice / netWeight,
    costPerKg: totalCost / netWeight,
    breakEvenPrice: totalCost / netWeight,
    totalCostWithVat: totalCost * 1.24,
    finalPrice: sellingPrice,
    breakdown: {
      materials: purchaseCost,
      transport: transportCost,
      labor: laborCost,
      packaging: packagingCost,
      processing: 0,
      overhead: additionalCosts
    },
    totalDirectCosts: purchaseCost,
    totalIndirectCosts: 0,
    totalTransportCosts: 0,
    totalProcessingCosts: 0,

    competitiveAnalysis: null
  };
}

export const testFormData: FormData = {
  productName: "Test Product",
  productType: "fish",
  weight: 100,
  quantity: 1,
  origin: "Test Origin",
  quality: "Premium",
  notes: "",
  certifications: [],
  purchasePrice: 10,
  targetSellingPrice: 15,
  profitMargin: 20,
  vatRate: 24,
  processingPhases: [],
  totalLossPercentage: 5,
  glazingPercentage: 0,
  glazingType: "",
  directCosts: [],
  indirectCosts: [],
  transportLegs: [],
  waste: 5,
  glazingPercent: 0,
  vatPercent: 24,
  workers: [],
  boxCost: 5,
  bagCost: 3,
  distance: 0,
  fuelCost: 0,
  tolls: 0,
  parkingCost: 0,
  driverSalary: 0,
  profitTarget: 20,
  competitor1: 0,
  competitor2: 0,
  electricityCost: 0,
  equipmentCost: 0,
  insuranceCost: 0,
  rentCost: 0,
  communicationCost: 0,
  otherCosts: 0,
  originAddress: "",
  destinationAddress: "",
  routeCalculated: false,
  estimatedDuration: "",
  batchNumber: "",
  supplierName: "",
  minimumMargin: 15,
  storageTemperature: 0,
  shelfLife: 0,
  customerPrice: 0,
  seasonalMultiplier: 1,
  transportCost: 50,
  workerCount: 2,
  laborHours: 4,
  additionalCosts: 20
};
