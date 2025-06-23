
import { useState } from 'react';
import { toast } from 'sonner';
import { FormData, CalculationResults, BatchData } from '@/types';

export type { FormData, CalculationResults };
export type Results = CalculationResults;

export function useCalculation() {
  const [formData, setFormData] = useState<FormData>({
    initialWeight: 0,
    cleaningLoss: 0,
    processingLoss: 0,
    glazingWeight: 0,
    costPerKg: 0,
    profitMargin: 0,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateFormData = (field: keyof FormData, value: number) => {
    // Validation logic
    let validatedValue = value;
    
    // Prevent negative values
    if (validatedValue < 0) validatedValue = 0;
    
    // Prevent unrealistic loss percentages
    if ((field === 'cleaningLoss' || field === 'processingLoss') && validatedValue > 100) {
      validatedValue = 100;
    }
    
    // Prevent unrealistic glazing percentages
    if (field === 'glazingWeight' && validatedValue > 200) {
      validatedValue = 200;
    }
    
    setFormData(prev => ({ ...prev, [field]: validatedValue }));
  };

  const calculate = async () => {
    // Validate all required fields
    const requiredFields: (keyof FormData)[] = ['initialWeight', 'costPerKg'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field] <= 0);
    
    if (missingFields.length > 0) {
      toast.error('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    setIsCalculating(true);
    
    try {
      // Add small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 1: Calculate weight after cleaning
      const weightAfterCleaning = formData.initialWeight * (1 - formData.cleaningLoss / 100);
      
      // Step 2: Calculate weight after processing
      const weightAfterProcessing = weightAfterCleaning * (1 - formData.processingLoss / 100);
      
      // Step 3: Calculate final weight with glazing
      const finalWeight = weightAfterProcessing * (1 + formData.glazingWeight / 100);
      
      // Step 4: Calculate total cost
      const totalCost = formData.initialWeight * formData.costPerKg;
      
      // Step 5: Calculate cost per kg of final product
      const costPerKg = totalCost / finalWeight;
      
      // Step 6: Calculate selling price with profit margin
      const sellingPrice = costPerKg * (1 + formData.profitMargin / 100);
      
      // Step 7: Calculate total profit
      const profit = (sellingPrice - costPerKg) * finalWeight;

      const calculationResults: CalculationResults = {
        finalWeight,
        totalCost,
        costPerKg,
        sellingPrice,
        profit,
      };

      setResults(calculationResults);
      
      // Save to localStorage automatically
      saveBatch(calculationResults);
      
      toast.success('Υπολογισμός ολοκληρώθηκε επιτυχώς!');
    } catch (error) {
      toast.error('Σφάλμα κατά τον υπολογισμό. Παρακαλώ ελέγξτε τα δεδομένα σας.');
    } finally {
      setIsCalculating(false);
    }
  };

  const saveBatch = (calculationResults: CalculationResults) => {
    const batch: BatchData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      formData: { ...formData },
      results: calculationResults,
      timestamp: Date.now(),
    };

    const existingBatches = JSON.parse(localStorage.getItem('batches') || '[]');
    existingBatches.push(batch);
    localStorage.setItem('batches', JSON.stringify(existingBatches));
  };

  const resetForm = () => {
    setFormData({
      initialWeight: 0,
      cleaningLoss: 0,
      processingLoss: 0,
      glazingWeight: 0,
      costPerKg: 0,
      profitMargin: 0,
    });
    setResults(null);
    toast.info('Η φόρμα επαναφέρθηκε');
  };

  return {
    formData,
    results,
    isCalculating,
    updateFormData,
    calculate,
    resetForm,
  };
}
