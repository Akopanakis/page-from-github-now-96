import { CalculationResults } from "../utils/calc";
import type { FormData } from "../utils/calc";

self.onmessage = function(e) {
  const formData: FormData = e.data;
  
  try {
    // Perform calculations
    const purchaseCost = formData.purchasePrice * formData.quantity;
    const transportCost = formData.transportCost || 0;
    const laborCost = (formData.workerCount || 0) * (formData.laborHours || 0) * 4.5;
    const additionalCosts = formData.additionalCosts || 0;
    const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);
    
    const totalCost = purchaseCost + transportCost + laborCost + additionalCosts + packagingCost;
    const netWeight = formData.quantity * 0.9; // 90% yield
    const rawWeight = formData.quantity;
    const sellingPrice = totalCost * 1.2; // 20% markup
    
    const results: CalculationResults = {
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
    
    self.postMessage(results);
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
