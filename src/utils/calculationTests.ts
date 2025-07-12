
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
    sellingPricePerKg: sellingPrice / netWeight,
    costPerKg: totalCost / netWeight,
    breakEvenPrice: totalCost / netWeight,
    totalCostWithVat: totalCost * 1.24,
    finalPrice: sellingPrice,
    breakdown: {
      purchase: purchaseCost,
      transport: transportCost,
      labor: laborCost,
      packaging: packagingCost,
      additional: additionalCosts,
      other: 0
    },
    totalDirectCosts: purchaseCost,
    totalIndirectCosts: 0,
    totalTransportCosts: 0,
    totalProcessingCosts: 0,
    finalPrice: sellingPrice / netWeight,
    competitiveAnalysis: null
  };
}

export const testFormData: FormData = {
  purchasePrice: 10,
  quantity: 100,
  transportCost: 50,
  workerCount: 2,
  laborHours: 4,
  additionalCosts: 20,
  boxCost: 5,
  bagCost: 3,
  profitMargin: 20
};
