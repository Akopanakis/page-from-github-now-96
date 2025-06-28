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

export const calculateResults = (formData: FormData): CalculationResults => {
  let currentWeight = formData.quantity || 0;
  let totalWastePercentage = 0;

  if (formData.processingPhases && formData.processingPhases.length > 0) {
    formData.processingPhases.forEach((phase) => {
      if (phase.wastePercentage > 0 || phase.addedWeight !== 0) {
        currentWeight = calculatePhaseResult(currentWeight, phase.wastePercentage, phase.addedWeight);
        if (phase.wastePercentage > 0) {
          totalWastePercentage += phase.wastePercentage;
        }
      }
    });
  } else {
    const netWeight = currentWeight * (1 - (formData.waste || 0) / 100);
    currentWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100);
    totalWastePercentage = formData.waste || 0;
  }

  const finalProcessedWeight = currentWeight;

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

  const sellingPrice = adjustedCost * (1 + (formData.profitMargin || 0) / 100);
  const sellingPricePerKg = sellingPrice / Math.max(finalProcessedWeight, 0.001);

  const profitPerKg = sellingPricePerKg - adjustedCost / Math.max(finalProcessedWeight, 0.001);

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

  const breakEvenPrice = adjustedCost / Math.max(finalProcessedWeight, 0.001);
  const marginAtCurrentPrice = ((sellingPricePerKg - breakEvenPrice) / sellingPricePerKg) * 100;
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
