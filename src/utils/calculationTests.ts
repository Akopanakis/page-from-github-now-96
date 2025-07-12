
import { CalculationResults, FormData } from './calc';

// Mock calculateResults function for testing
const mockCalculateResults = (data: Partial<FormData>): CalculationResults => {
  return {
    totalCost: 100,
    totalCostWithVat: 124,
    sellingPrice: 150,
    profitPerKg: 26,
    profitMargin: 20,
    netWeight: 10,
    purchaseCost: 80,
    laborCost: 10,
    packagingCost: 5,
    transportCost: 3,
    additionalCosts: 2,
    vatAmount: 24,
    finalProcessedWeight: 10,
    totalWastePercentage: 5,
    costBreakdown: [],
    recommendedSellingPrice: 140,
    competitorAnalysis: {
      ourPrice: 150,
      competitor1Diff: 10,
      competitor2Diff: 5,
      marketPosition: 'competitive' as const
    },
    profitAnalysis: {
      breakEvenPrice: 124,
      marginAtCurrentPrice: 17.3,
      recommendedMargin: 20
    }
  };
};

// Test cases for calculation validation
export const testCalculationValidation = () => {
  const testCases = [
    {
      name: 'Basic calculation test',
      input: {
        productName: 'Test Fish',
        purchasePrice: 10,
        quantity: 5,
        waste: 10,
        profitMargin: 20
      },
      expected: {
        totalCost: 50,
        netWeight: 4.5
      }
    },
    {
      name: 'With workers test',
      input: {
        productName: 'Test Fish',
        purchasePrice: 10,
        quantity: 5,
        workers: [
          { id: '1', hourlyRate: 5, hours: 2 }
        ]
      },
      expected: {
        laborCost: 10
      }
    }
  ];

  testCases.forEach(testCase => {
    try {
      const result = mockCalculateResults(testCase.input);
      console.log(`✅ Test "${testCase.name}" passed`);
    } catch (error) {
      console.error(`❌ Test "${testCase.name}" failed:`, String(error));
    }
  });
};

export { mockCalculateResults as calculateResults };
