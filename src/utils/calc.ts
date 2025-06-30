export interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

export interface ProcessingPhase {
  id: string;
  name: string;
  lossPercentage: number;
  costPerKg: number;
  duration: number;
  temperature: number;
  description: string;
}

export interface CostItem {
  id: string;
  name: string;
  value: number;
  category: "direct" | "indirect";
}

export interface TransportLeg {
  id: string;
  from: string;
  to: string;
  distance: number;
  cost: number;
  type: string;
}

export interface FormData {
  // Basic Product Info
  productName: string;
  productType: "fish" | "shellfish" | "cephalopods" | "processed";
  weight: number;
  quantity: number;
  origin: string;
  quality: string;
  notes: string;

  // Pricing
  purchasePrice: number;
  targetSellingPrice: number;
  profitMargin: number;
  vatRate: number; // VAT percentage (0, 6, 13, 24)

  // Processing
  processingPhases: ProcessingPhase[];
  totalLossPercentage: number; // General losses
  glazingPercentage: number;
  glazingType: string;

  // Costs
  directCosts: CostItem[];
  indirectCosts: CostItem[];
  transportLegs: TransportLeg[];

  // Legacy fields for compatibility
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
  minimumMargin: number;
}

export interface CalculationResults {
  // Raw calculations
  rawWeight: number;
  netWeight: number; // After losses and glazing
  totalDirectCosts: number;
  totalIndirectCosts: number;
  totalTransportCosts: number;
  totalProcessingCosts: number;

  // Price calculations
  totalCosts: number;
  costPerKg: number;
  costPerUnit: number;

  // VAT calculations
  netPrice: number; // Price without VAT
  vatAmount: number; // VAT amount
  finalPrice: number; // Price including VAT

  // Profit calculations
  grossProfit: number;
  netProfit: number;
  profitMargin: number;

  // Analysis
  breakEvenPrice: number;
  recommendedPrice: number;
  competitivePosition: string;

  // Efficiency metrics
  totalLossPercentage: number;
  efficiencyScore: number;

  // Detailed breakdown
  breakdown: {
    materials: number;
    labor: number;
    processing: number;
    transport: number;
    overhead: number;
    packaging: number;
  };
}

export function calculateCosts(formData: FormData): CalculationResults {
  // Input validation and defaults - prevent NaN
  const weight = parseFloat(String(formData.weight)) || 0;
  const quantity = parseFloat(String(formData.quantity)) || 1;
  const purchasePrice = parseFloat(String(formData.purchasePrice)) || 0;
  const targetSellingPrice =
    parseFloat(String(formData.targetSellingPrice)) || 0;
  const vatRate = parseFloat(String(formData.vatRate)) || 0;

  // Calculate processing losses
  const processingPhases = formData.processingPhases || [];
  const processingLossPercentage = processingPhases.reduce(
    (total, phase) => total + (phase.lossPercentage || 0),
    0,
  );
  const generalLossPercentage = formData.totalLossPercentage || 0;
  const totalLossPercentage = processingLossPercentage + generalLossPercentage;

  // Calculate glazing effect
  const glazingPercentage = formData.glazingPercentage || 0;

  // Weight calculations
  const rawWeight = weight * quantity;
  const weightAfterLosses = rawWeight * (1 - totalLossPercentage / 100);
  const netWeight = weightAfterLosses * (1 - glazingPercentage / 100);

  // Cost calculations
  const directCosts = formData.directCosts || [];
  const indirectCosts = formData.indirectCosts || [];
  const transportLegs = formData.transportLegs || [];

  const totalDirectCosts = directCosts.reduce(
    (sum, cost) => sum + (cost.value || 0),
    0,
  );
  const totalIndirectCosts = indirectCosts.reduce(
    (sum, cost) => sum + (cost.value || 0),
    0,
  );
  const totalTransportCosts = transportLegs.reduce(
    (sum, leg) => sum + (leg.cost || 0),
    0,
  );

  // Processing costs
  const totalProcessingCosts = processingPhases.reduce(
    (sum, phase) => sum + (phase.costPerKg || 0) * rawWeight,
    0,
  );

  // Material costs
  const materialCosts = purchasePrice * rawWeight;

  // Total costs
  const totalCosts =
    materialCosts +
    totalDirectCosts +
    totalIndirectCosts +
    totalTransportCosts +
    totalProcessingCosts;

  // Cost per unit calculations - prevent division by zero
  const costPerKg = netWeight > 0 ? totalCosts / netWeight : 0;
  const costPerUnit = quantity > 0 ? totalCosts / quantity : 0;

  // VAT calculations - proper logic with safety checks
  let netPrice = parseFloat(String(targetSellingPrice)) || 0;
  let vatAmount = 0;
  let finalPrice = parseFloat(String(targetSellingPrice)) || 0;

  if (vatRate > 0 && targetSellingPrice > 0) {
    // If target price includes VAT, calculate net price
    netPrice = targetSellingPrice / (1 + vatRate / 100);
    vatAmount = targetSellingPrice - netPrice;
    finalPrice = targetSellingPrice;
  } else {
    // If no VAT or target price is net, VAT is additional
    netPrice = targetSellingPrice;
    vatAmount = 0;
    finalPrice = targetSellingPrice;
  }

  // Ensure values are finite numbers
  netPrice = isFinite(netPrice) ? netPrice : 0;
  vatAmount = isFinite(vatAmount) ? vatAmount : 0;
  finalPrice = isFinite(finalPrice) ? finalPrice : 0;

  // Profit calculations with safety checks
  const revenueTotal = netPrice * netWeight;
  const grossProfit =
    isFinite(revenueTotal) && isFinite(totalCosts)
      ? revenueTotal - totalCosts
      : 0;
  const netProfit = grossProfit; // Simplified, could include tax calculations
  const profitMargin =
    revenueTotal > 0 && isFinite(grossProfit)
      ? (grossProfit / revenueTotal) * 100
      : 0;

  // Break-even and recommendations
  const breakEvenPrice = netWeight > 0 ? totalCosts / netWeight : 0;
  const recommendedPrice =
    breakEvenPrice * (1 + (formData.profitMargin || 20) / 100);

  // Efficiency score
  const efficiencyScore = Math.max(0, Math.min(100, 100 - totalLossPercentage));

  // Competitive position
  let competitivePosition = "Average";
  if (finalPrice < breakEvenPrice * 1.1) {
    competitivePosition = "Competitive";
  } else if (finalPrice > breakEvenPrice * 1.5) {
    competitivePosition = "Premium";
  }

  // Detailed breakdown
  const breakdown = {
    materials: materialCosts,
    labor: totalDirectCosts * 0.4, // Estimate
    processing: totalProcessingCosts,
    transport: totalTransportCosts,
    overhead: totalIndirectCosts,
    packaging: totalDirectCosts * 0.1, // Estimate
  };

  // Ensure all returned values are finite numbers
  const safeResults = {
    rawWeight: isFinite(rawWeight) ? rawWeight : 0,
    netWeight: isFinite(netWeight) ? netWeight : 0,
    totalDirectCosts: isFinite(totalDirectCosts) ? totalDirectCosts : 0,
    totalIndirectCosts: isFinite(totalIndirectCosts) ? totalIndirectCosts : 0,
    totalTransportCosts: isFinite(totalTransportCosts)
      ? totalTransportCosts
      : 0,
    totalProcessingCosts: isFinite(totalProcessingCosts)
      ? totalProcessingCosts
      : 0,
    totalCosts: isFinite(totalCosts) ? totalCosts : 0,
    costPerKg: isFinite(costPerKg) ? costPerKg : 0,
    costPerUnit: isFinite(costPerUnit) ? costPerUnit : 0,
    netPrice: isFinite(netPrice) ? netPrice : 0,
    vatAmount: isFinite(vatAmount) ? vatAmount : 0,
    finalPrice: isFinite(finalPrice) ? finalPrice : 0,
    grossProfit: isFinite(grossProfit) ? grossProfit : 0,
    netProfit: isFinite(netProfit) ? netProfit : 0,
    profitMargin: isFinite(profitMargin) ? profitMargin : 0,
    breakEvenPrice: isFinite(breakEvenPrice) ? breakEvenPrice : 0,
    recommendedPrice: isFinite(recommendedPrice) ? recommendedPrice : 0,
    competitivePosition,
    totalLossPercentage: isFinite(totalLossPercentage)
      ? totalLossPercentage
      : 0,
    efficiencyScore: isFinite(efficiencyScore) ? efficiencyScore : 0,
    breakdown: {
      materials: isFinite(breakdown.materials) ? breakdown.materials : 0,
      labor: isFinite(breakdown.labor) ? breakdown.labor : 0,
      processing: isFinite(breakdown.processing) ? breakdown.processing : 0,
      transport: isFinite(breakdown.transport) ? breakdown.transport : 0,
      overhead: isFinite(breakdown.overhead) ? breakdown.overhead : 0,
      packaging: isFinite(breakdown.packaging) ? breakdown.packaging : 0,
    },
  };

  return safeResults;
}

// Utility functions with NaN protection
export function formatCurrency(amount: number, currency = "€"): string {
  const safeAmount = isFinite(amount) ? amount : 0;
  return `${currency}${safeAmount.toLocaleString("el-GR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercentage(value: number): string {
  const safeValue = isFinite(value) ? value : 0;
  return `${safeValue.toFixed(1)}%`;
}

export function calculateEfficiency(losses: ProcessingPhase[]): number {
  const totalLoss = losses.reduce(
    (sum, phase) => sum + phase.lossPercentage,
    0,
  );
  return Math.max(0, 100 - totalLoss);
}

export function calculateROI(profit: number, investment: number): number {
  return investment > 0 ? (profit / investment) * 100 : 0;
}

export function validateFormData(formData: FormData): string[] {
  const errors: string[] = [];

  if (!formData.productName || formData.productName.trim() === "") {
    errors.push("Το όνομα προϊόντος είναι υποχρεωτικό");
  }

  if (!formData.weight || formData.weight <= 0) {
    errors.push("Το βάρος πρέπει να είναι μεγαλύτερο από 0");
  }

  if (!formData.purchasePrice || formData.purchasePrice <= 0) {
    errors.push("Η τιμή αγοράς πρέπει να είναι μεγαλύτερη από 0");
  }

  if (formData.vatRate < 0 || formData.vatRate > 30) {
    errors.push("Ο συντελεστής ΦΠΑ πρέπει να είναι μεταξύ 0% και 30%");
  }

  const totalLoss =
    (formData.processingPhases || []).reduce(
      (sum, phase) => sum + (phase.lossPercentage || 0),
      0,
    ) + (formData.totalLossPercentage || 0);

  if (totalLoss >= 100) {
    errors.push(
      "Οι συνολικές απώλειες δεν μπορούν να είναι 100% ή περισσότερο",
    );
  }

  return errors;
}

// Export default for compatibility
export default {
  calculateCosts,
  formatCurrency,
  formatPercentage,
  calculateEfficiency,
  calculateROI,
  validateFormData,
};
