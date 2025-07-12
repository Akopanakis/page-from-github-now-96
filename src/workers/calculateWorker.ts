
import { CalculationResults } from "../utils/calc";
import type { FormData } from "../utils/calc";

// Simple calculation function for the worker
const calculateResults = (inputData: Partial<FormData>): CalculationResults => {
  const purchasePrice = Number(inputData.purchasePrice) || 0;
  const quantity = Number(inputData.quantity) || 0;
  const waste = Number(inputData.waste) || 0;
  const profitMargin = Number(inputData.profitMargin) || 20;
  
  const purchaseCost = purchasePrice * quantity;
  const netWeight = quantity * (1 - waste / 100);
  const totalCost = purchaseCost;
  const sellingPrice = totalCost * (1 + profitMargin / 100);
  const profitPerKg = netWeight > 0 ? (sellingPrice - totalCost) / netWeight : 0;
  
  return {
    totalCost,
    totalCostWithVat: totalCost * 1.24,
    sellingPrice: sellingPrice / netWeight,
    profitPerKg,
    profitMargin,
    netWeight,
    purchaseCost,
    laborCost: 0,
    packagingCost: 0,
    transportCost: 0,
    additionalCosts: 0,
    vatAmount: totalCost * 0.24,
    finalProcessedWeight: netWeight,
    totalWastePercentage: waste,
    costBreakdown: [],
    recommendedSellingPrice: sellingPrice / netWeight,
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

self.onmessage = function (e: MessageEvent<Partial<FormData>>) {
  try {
    const result = calculateResults(e.data);
    self.postMessage(result);
  } catch (error) {
    console.error("Worker calculation error:", error);
    self.postMessage(null);
  }
};
