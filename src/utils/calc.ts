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
  totalCost: number;
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
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  recommendedSellingPrice: number;
  competitorAnalysis: {
    ourPrice: number;
    competitor1Diff: number;
    competitor2Diff: number;
    marketPosition: 'competitive' | 'expensive' | 'cheap';
  };
  profitAnalysis: {
    breakEvenPrice: number;
    marginAtCurrentPrice: number;
    recommendedMargin: number;
  };
  // Additional properties needed by components
  finalPrice: number;
  costPerKg: number;
  grossProfit: number;
  breakEvenPrice: number;
  recommendedPrice: number;
  rawWeight: number;
  efficiencyScore: number;
  costPerUnit: number;
  breakdown: {
    materials: number;
    labor: number;
    processing: number;
    transport: number;
    overhead: number;
    packaging: number;
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

const calculatePhaseResult = (inputWeight: number, lossPct: number, addPct: number): number => {
  const afterLoss = inputWeight * (1 - lossPct / 100);
  return afterLoss + afterLoss * (addPct / 100);
};

// Helper function to sanitize form data and ensure all values are valid numbers
const sanitizeFormData = (data: Partial<FormData>): FormData => {
  const defaultWorker = { id: '1', hourlyRate: 0, hours: 0 };
  const defaultPhase = { id: '1', name: 'Default', duration: 0, costPerHour: 0, personnelRequired: 1 };
  
  return {
    productName: data.productName || '',
    productType: data.productType || 'fish',
    purchasePrice: Number(data.purchasePrice) || 0,
    quantity: Number(data.quantity) || 0,
    waste: Number(data.waste) || 0,
    glazingPercent: Number(data.glazingPercent) || 0,
    vatPercent: Number(data.vatPercent) || 0,
    workers: Array.isArray(data.workers) && data.workers.length > 0 ? 
      data.workers.map(w => ({
        id: w?.id || '1',
        hourlyRate: Number(w?.hourlyRate) || 0,
        hours: Number(w?.hours) || 0
      })) : [defaultWorker],
    boxCost: Number(data.boxCost) || 0,
    bagCost: Number(data.bagCost) || 0,
    distance: Number(data.distance) || 0,
    fuelCost: Number(data.fuelCost) || 0,
    tolls: Number(data.tolls) || 0,
    parkingCost: Number(data.parkingCost) || 0,
    driverSalary: Number(data.driverSalary) || 0,
    profitMargin: Number(data.profitMargin) || 0,
    profitTarget: Number(data.profitTarget) || 0,
    competitor1: Number(data.competitor1) || 0,
    competitor2: Number(data.competitor2) || 0,
    electricityCost: Number(data.electricityCost) || 0,
    equipmentCost: Number(data.equipmentCost) || 0,
    insuranceCost: Number(data.insuranceCost) || 0,
    rentCost: Number(data.rentCost) || 0,
    communicationCost: Number(data.communicationCost) || 0,
    otherCosts: Number(data.otherCosts) || 0,
    originAddress: data.originAddress || '',
    destinationAddress: data.destinationAddress || '',
    routeCalculated: Boolean(data.routeCalculated),
    estimatedDuration: data.estimatedDuration || '',
    batchNumber: data.batchNumber || '',
    supplierName: data.supplierName || '',
    processingPhases: Array.isArray(data.processingPhases) && data.processingPhases.length > 0 ?
      data.processingPhases.map(p => ({
        id: p?.id || '1',
        name: p?.name || 'Default',
        duration: Number(p?.duration) || 0,
        costPerHour: Number(p?.costPerHour) || 0,
        personnelRequired: Number(p?.personnelRequired) || 1
      })) : [defaultPhase],
    targetSellingPrice: Number(data.targetSellingPrice) || 0,
    minimumMargin: Number(data.minimumMargin) || 15,
    storageTemperature: Number(data.storageTemperature) || -18,
    shelfLife: Number(data.shelfLife) || 365,
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    customerPrice: Number(data.customerPrice) || 0,
    seasonalMultiplier: Number(data.seasonalMultiplier) || 1
  };
};

export const calculateResults = (inputData: Partial<FormData>): CalculationResults => {
  // Sanitize input data to ensure all values are valid
  const formData = sanitizeFormData(inputData);
  let currentWeight = Math.max(formData.quantity, 0.1); // Ensure minimum weight
  let totalWastePercentage = 0;

  if (formData.processingPhases && formData.processingPhases.length > 0) {
    formData.processingPhases.forEach((phase) => {
      // Processing phases affect weight and add costs
      const processingLoss = currentWeight * 0.05; // 5% loss per phase
      currentWeight = Math.max(currentWeight - processingLoss, 0.1);
      totalWastePercentage += 5;
    });
  } else {
    const netWeight = currentWeight * (1 - Math.min(formData.waste || 0, 99) / 100);
    currentWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100);
    currentWeight = Math.max(currentWeight, 0.1);
    totalWastePercentage = formData.waste || 0;
  }

  const finalProcessedWeight = Math.max(currentWeight, 0.1);
  const rawWeight = formData.quantity || 0.1;

  const purchaseCost = (formData.purchasePrice || 0) * (formData.quantity || 0);

  const laborCost = (formData.workers || []).reduce(
    (sum, worker) => sum + worker.hourlyRate * worker.hours,
    0
  );

  const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);
  const transportCost =
    (formData.distance || 0) * (formData.fuelCost || 0) +
    (formData.tolls || 0) +
    (formData.parkingCost || 0) +
    (formData.driverSalary || 0);

  const additionalCosts =
    (formData.electricityCost || 0) +
    (formData.equipmentCost || 0) +
    (formData.insuranceCost || 0) +
    (formData.rentCost || 0) +
    (formData.communicationCost || 0) +
    (formData.otherCosts || 0);

  const totalCost = purchaseCost + laborCost + packagingCost + transportCost + additionalCosts;

  const vatAmount = totalCost * ((formData.vatPercent || 0) / 100);
  const totalCostWithVat = totalCost + vatAmount;

  const seasonalAdjustment = formData.seasonalMultiplier || 1;
  const adjustedCost = totalCostWithVat * seasonalAdjustment;

  const sellingPrice = adjustedCost * (1 + Math.max(formData.profitMargin || 0, 0) / 100);
  const sellingPricePerKg = sellingPrice / finalProcessedWeight;
  const costPerKg = adjustedCost / finalProcessedWeight;

  const profitPerKg = sellingPricePerKg - costPerKg;
  const grossProfit = sellingPrice - adjustedCost;

  const costBreakdown = [
    { category: 'Αγορά', amount: purchaseCost, percentage: (purchaseCost / totalCost) * 100 },
    { category: 'Εργασία', amount: laborCost, percentage: (laborCost / totalCost) * 100 },
    { category: 'Συσκευασία', amount: packagingCost, percentage: (packagingCost / totalCost) * 100 },
    { category: 'Μεταφορά', amount: transportCost, percentage: (transportCost / totalCost) * 100 },
    { category: 'Λοιπά', amount: additionalCosts, percentage: (additionalCosts / totalCost) * 100 },
  ].filter((item) => item.amount > 0);

  const competitor1Diff = (formData.competitor1 || 0) - sellingPricePerKg;
  const competitor2Diff = (formData.competitor2 || 0) - sellingPricePerKg;
  let marketPosition: 'competitive' | 'expensive' | 'cheap' = 'competitive';

  if (competitor1Diff > 0.5 || competitor2Diff > 0.5) {
    marketPosition = 'cheap';
  } else if (competitor1Diff < -0.5 || competitor2Diff < -0.5) {
    marketPosition = 'expensive';
  }

  const breakEvenPrice = adjustedCost / finalProcessedWeight;
  const marginAtCurrentPrice = sellingPricePerKg > 0 ? ((sellingPricePerKg - breakEvenPrice) / sellingPricePerKg) * 100 : 0;
  const recommendedMargin = Math.max(formData.minimumMargin || 15, 20);

  const recommendedSellingPrice = breakEvenPrice * (1 + recommendedMargin / 100);
  
  // Calculate efficiency score
  const efficiencyScore = rawWeight > 0 ? (finalProcessedWeight / rawWeight) * 100 : 0;
  
  // Calculate cost per unit
  const costPerUnit = finalProcessedWeight > 0 ? totalCost / finalProcessedWeight : 0;

  return {
    totalCost,
    totalCostWithVat: adjustedCost,
    sellingPrice: sellingPricePerKg,
    profitPerKg,
    profitMargin: formData.profitMargin || 0,
    netWeight: finalProcessedWeight,
    purchaseCost,
    laborCost,
    packagingCost,
    transportCost,
    additionalCosts,
    vatAmount,
    finalProcessedWeight,
    totalWastePercentage,
    costBreakdown,
    recommendedSellingPrice,
    competitorAnalysis: {
      ourPrice: sellingPricePerKg,
      competitor1Diff,
      competitor2Diff,
      marketPosition,
    },
    profitAnalysis: {
      breakEvenPrice,
      marginAtCurrentPrice,
      recommendedMargin,
    },
    // Additional calculated properties
    finalPrice: sellingPricePerKg,
    costPerKg,
    grossProfit,
    breakEvenPrice,
    recommendedPrice: recommendedSellingPrice,
    rawWeight,
    efficiencyScore,
    costPerUnit,
    breakdown: {
      materials: purchaseCost,
      labor: laborCost,
      processing: 0, // Could be calculated from processing phases if needed
      transport: transportCost,
      overhead: additionalCosts,
      packaging: packagingCost,
    },
  };
};

// Export aliases for compatibility
export const calculateCosts = calculateResults;
export const validateFormData = (data: FormData): string[] => {
  const errors: string[] = [];
  
  if (!data.productName?.trim()) {
    errors.push('Product name is required');
  }
  
  if (!data.purchasePrice || data.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than 0');
  }
  
  if (!data.quantity || data.quantity <= 0) {
    errors.push('Quantity must be greater than 0');
  }
  
  return errors;
};
