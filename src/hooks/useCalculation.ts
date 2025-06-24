
import { useState } from 'react';
import { FormData, CalculationResults } from '../types';

const initialFormData: FormData = {
  initialWeight: 0,
  cleaningLoss: 0,
  processingLoss: 0,
  glazingWeight: 0,
  costPerKg: 0,
  profitMargin: 20,
  transportCost: 0,
  laborCost: 0,
  packagingCost: 0,
  additionalCosts: 0
};

export const useCalculation = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateFormData = (field: keyof FormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculate = async (): Promise<void> => {
    setIsCalculating(true);
    
    try {
      // Simulate async calculation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cleanWeight =
        formData.initialWeight *
        (1 - (formData.cleaningLoss + formData.processingLoss) / 100);
      const finalWeight = cleanWeight * (1 + formData.glazingWeight / 100);
      
      const materialCost = formData.initialWeight * formData.costPerKg;
      const totalDirectCosts = materialCost + formData.transportCost + formData.laborCost + formData.packagingCost + formData.additionalCosts;
      const totalCost = totalDirectCosts;
      const costPerKgFinal = totalCost / finalWeight;
      const costPerKg = costPerKgFinal;
      const sellingPrice = totalCost * (1 + formData.profitMargin / 100);
      const profit = sellingPrice - totalCost;
      
      const calculationResults: CalculationResults = {
        cleanWeight,
        finalWeight,
        materialCost,
        totalCost,
        costPerKgFinal,
        costPerKg,
        sellingPrice,
        profit
      };
      
      setResults(calculationResults);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setResults(null);
  };

  return {
    formData,
    results,
    isCalculating,
    updateFormData,
    calculate,
    resetForm
  };
};

export type { FormData, CalculationResults };
// Export Results as alias for compatibility
export type Results = CalculationResults;
