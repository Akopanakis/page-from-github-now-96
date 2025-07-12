
import { FormData, CalculationResults } from './calc';

// Mock calculation function for testing
const mockCalculateResults = (data: Partial<FormData>): CalculationResults => {
  const quantity = data.quantity || 0;
  const purchasePrice = data.purchasePrice || 0;
  const waste = data.waste || 0;
  const profitMargin = data.profitMargin || 20;
  
  const purchaseCost = purchasePrice * quantity;
  const netWeight = quantity * (1 - waste / 100);
  const totalCost = purchaseCost;
  const sellingPrice = totalCost * (1 + profitMargin / 100);
  
  return {
    // Core financial metrics
    totalCost,
    totalCostWithVat: totalCost * 1.24,
    sellingPrice: sellingPrice / netWeight,
    profitPerKg: netWeight > 0 ? (sellingPrice - totalCost) / netWeight : 0,
    profitMargin,
    netWeight,
    rawWeight: quantity,
    purchaseCost,
    laborCost: 0,
    packagingCost: 0,
    transportCost: 0,
    additionalCosts: 0,
    vatAmount: totalCost * 0.24,
    finalProcessedWeight: netWeight,
    totalWastePercentage: waste,
    
    // Additional required properties
    totalDirectCosts: purchaseCost,
    totalIndirectCosts: 0,
    totalTransportCosts: 0,
    totalPackagingCosts: 0,
    totalProcessingCosts: 0,
    totalOverheadCosts: 0,
    finalPrice: sellingPrice / netWeight,
    grossProfit: sellingPrice - totalCost,
    costPerKg: totalCost / netWeight,
    costPerUnit: totalCost / quantity,
    netPrice: sellingPrice / netWeight,
    netProfit: sellingPrice - totalCost,
    breakEvenPrice: totalCost / netWeight,
    recommendedSellingPrice: sellingPrice / netWeight,
    competitivePosition: 'competitive',
    efficiencyScore: 100 - waste,
    
    breakdown: {
      materials: purchaseCost,
      labor: 0,
      processing: 0,
      transport: 0,
      overhead: 0,
      packaging: 0
    },
    
    costBreakdown: [
      { category: 'Purchase', amount: purchaseCost, percentage: 100 }
    ],
    competitorAnalysis: {
      ourPrice: sellingPrice / netWeight,
      competitor1Diff: 0,
      competitor2Diff: 0,
      marketPosition: 'competitive' as const
    },
    profitAnalysis: {
      breakEvenPrice: totalCost / netWeight,
      marginAtCurrentPrice: profitMargin,
      recommendedMargin: 20
    }
  };
};

// Test cases
export const runCalculationTests = () => {
  console.log('Running calculation tests...');
  
  try {
    // Test 1: Basic calculation
    const testData1: Partial<FormData> = {
      productName: 'Test Fish',
      quantity: 100,
      purchasePrice: 5,
      waste: 10,
      profitMargin: 20
    };
    
    const result1 = mockCalculateResults(testData1);
    console.log('Test 1 passed:', result1);
    
    // Test 2: Zero values
    const testData2: Partial<FormData> = {
      productName: 'Test Product',
      quantity: 0,
      purchasePrice: 0,
      waste: 0,
      profitMargin: 0
    };
    
    const result2 = mockCalculateResults(testData2);
    console.log('Test 2 passed:', result2);
    
    return true;
  } catch (error) {
    console.error('Calculation test failed:', String(error));
    return false;
  }
};
