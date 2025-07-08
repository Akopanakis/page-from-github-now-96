
import { calculateResults } from './calc';

interface TestCase {
  name: string;
  input: any;
  expectedOutput: Partial<any>;
  tolerance?: number;
}

export const runCalculationTests = (): { passed: number; failed: number; results: any[] } => {
  const testCases: TestCase[] = [
    {
      name: 'Basic Fish Costing',
      input: {
        species: 'Τσιπούρα',
        initialWeight: 100,
        finalWeight: 85,
        purchasePrice: 8.5,
        processingCosts: {
          labor: 2.5,
          energy: 0.8,
          packaging: 1.2,
          other: 0.5
        },
        transport: {
          distance: 50,
          fuelCost: 1.5,
          refrigeration: 0.3
        }
      },
      expectedOutput: {
        totalCost: 545.5, // Approximate expected total
        costPerKg: 6.42, // Approximate expected cost per kg
        profit: 170 // Approximate expected profit
      },
      tolerance: 0.1
    },
    {
      name: 'Premium Seafood Processing',
      input: {
        species: 'Λαβράκι',
        initialWeight: 200,
        finalWeight: 180,
        purchasePrice: 12.0,
        processingCosts: {
          labor: 3.5,
          energy: 1.2,
          packaging: 2.0,
          other: 0.8
        },
        transport: {
          distance: 100,
          fuelCost: 1.5,
          refrigeration: 0.5
        },
        premium: true
      },
      expectedOutput: {
        totalCost: 3159.0, // Approximate expected total
        costPerKg: 17.55, // Approximate expected cost per kg
        profit: 441 // Approximate expected profit
      },
      tolerance: 0.1
    },
    {
      name: 'Bulk Processing',
      input: {
        species: 'Σαρδέλα',
        initialWeight: 1000,
        finalWeight: 900,
        purchasePrice: 3.5,
        processingCosts: {
          labor: 1.5,
          energy: 0.5,
          packaging: 0.8,
          other: 0.3
        },
        transport: {
          distance: 200,
          fuelCost: 1.5,
          refrigeration: 0.4
        },
        bulk: true
      },
      expectedOutput: {
        totalCost: 6089.0, // Approximate expected total
        costPerKg: 6.77, // Approximate expected cost per kg
        profit: 1261 // Approximate expected profit
      },
      tolerance: 0.1
    }
  ];

  const results = [];
  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      const result = calculateResults(testCase.input);
      const testResult = {
        name: testCase.name,
        passed: true,
        details: {} as any
      };

      // Check each expected output
      for (const [key, expectedValue] of Object.entries(testCase.expectedOutput)) {
        const actualValue = result[key];
        const tolerance = testCase.tolerance || 0.01;
        
        if (typeof expectedValue === 'number' && typeof actualValue === 'number') {
          const withinTolerance = Math.abs(actualValue - expectedValue) <= Math.abs(expectedValue * tolerance);
          testResult.details[key] = {
            expected: expectedValue,
            actual: actualValue,
            passed: withinTolerance,
            difference: Math.abs(actualValue - expectedValue)
          };
          
          if (!withinTolerance) {
            testResult.passed = false;
          }
        } else {
          testResult.details[key] = {
            expected: expectedValue,
            actual: actualValue,
            passed: actualValue === expectedValue
          };
          
          if (actualValue !== expectedValue) {
            testResult.passed = false;
          }
        }
      }

      if (testResult.passed) {
        passed++;
      } else {
        failed++;
      }

      results.push(testResult);
    } catch (error) {
      failed++;
      results.push({
        name: testCase.name,
        passed: false,
        error: error.message,
        details: {}
      });
    }
  }

  return { passed, failed, results };
};

// Seafood-specific calculation validation
export const validateSeafoodCalculations = (formData: any): string[] => {
  const warnings = [];

  // Check for realistic weight loss
  if (formData.initialWeight && formData.finalWeight) {
    const weightLoss = ((formData.initialWeight - formData.finalWeight) / formData.initialWeight) * 100;
    if (weightLoss > 30) {
      warnings.push('Απώλεια βάρους > 30% - Ελέγξτε τις τιμές');
    }
    if (weightLoss < 5) {
      warnings.push('Απώλεια βάρους < 5% - Ασυνήθιστα χαμηλή για επεξεργασία');
    }
  }

  // Check for realistic pricing
  if (formData.purchasePrice) {
    if (formData.purchasePrice > 50) {
      warnings.push('Τιμή αγοράς > €50/kg - Ελέγξτε για premium προϊόντα');
    }
    if (formData.purchasePrice < 1) {
      warnings.push('Τιμή αγοράς < €1/kg - Ασυνήθιστα χαμηλή');
    }
  }

  // Check transport costs
  if (formData.transport?.distance > 500) {
    warnings.push('Απόσταση μεταφοράς > 500km - Ελέγξτε κόστη ψύξης');
  }

  // Check processing ratios
  if (formData.processingCosts) {
    const totalProcessing = Object.values(formData.processingCosts).reduce((sum: number, cost: any) => sum + (cost || 0), 0);
    if (totalProcessing > formData.purchasePrice * 2) {
      warnings.push('Κόστος επεξεργασίας > 200% τιμής αγοράς - Ελέγξτε αποδοτικότητα');
    }
  }

  return warnings;
};

// Performance benchmark
export const benchmarkCalculations = (iterations: number = 1000): any => {
  const testData = {
    species: 'Test Fish',
    initialWeight: 100,
    finalWeight: 85,
    purchasePrice: 10,
    processingCosts: {
      labor: 2,
      energy: 1,
      packaging: 1.5,
      other: 0.5
    },
    transport: {
      distance: 100,
      fuelCost: 1.5,
      refrigeration: 0.5
    }
  };

  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    calculateResults(testData);
  }
  
  const endTime = performance.now();
  
  return {
    iterations,
    totalTime: endTime - startTime,
    averageTime: (endTime - startTime) / iterations,
    calculationsPerSecond: iterations / ((endTime - startTime) / 1000)
  };
};
