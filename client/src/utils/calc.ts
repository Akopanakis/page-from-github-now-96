export interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

export interface ProcessingPhase {
  id: string;
  name: string;
  wastePercentage: number;
  addedWeight: number; // can be negative for loss, positive for glazing
  description: string;
}

export interface FormData {
  productName: string;
  productType: 'fish' | 'squid' | 'octopus' | 'other';
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
  storageTemperature: number;
  shelfLife: number;
  certifications: string[];
  customerPrice: number;
  seasonalMultiplier: number;
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
}

const calculatePhaseResult = (inputWeight: number, lossPct: number, addPct: number): number => {
  const afterLoss = inputWeight * (1 - lossPct / 100);
  return afterLoss + afterLoss * (addPct / 100);
};

// Helper function to sanitize form data and ensure all values are valid numbers
const sanitizeFormData = (data: Partial<FormData>): FormData => {
  const defaultWorker = { id: '1', hourlyRate: 0, hours: 0 };
  const defaultPhase = { id: '1', name: 'Default', wastePercentage: 0, addedWeight: 0, description: '' };
  
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
        wastePercentage: Number(p?.wastePercentage) || 0,
        addedWeight: Number(p?.addedWeight) || 0,
        description: p?.description || ''
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
      if (phase.wastePercentage > 0 || phase.addedWeight !== 0) {
        currentWeight = calculatePhaseResult(currentWeight, phase.wastePercentage, phase.addedWeight);
        currentWeight = Math.max(currentWeight, 0.1); // Ensure minimum weight after each phase
        if (phase.wastePercentage > 0) {
          totalWastePercentage += phase.wastePercentage;
        }
      }
    });
  } else {
    const netWeight = currentWeight * (1 - Math.min(formData.waste || 0, 99) / 100);
    currentWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100);
    currentWeight = Math.max(currentWeight, 0.1); // Ensure minimum weight
    totalWastePercentage = formData.waste || 0;
  }

  const finalProcessedWeight = Math.max(currentWeight, 0.1);

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

  const profitPerKg = sellingPricePerKg - (adjustedCost / finalProcessedWeight);

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
  };
};
