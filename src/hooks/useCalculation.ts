
import { useState } from 'react';

interface FormData {
  productName: string;
  purchasePrice: number;
  quantity: number;
  waste: number;
  icePercent: number;
  workerCount: number;
  laborHours: number;
  laborCost: number;
  boxCost: number;
  bagCost: number;
  distance: number;
  fuelCost: number;
  tolls: number;
  parkingCost: number;
  profitMargin: number;
  competitor1: number;
  competitor2: number;
  electricityCost: number;
  equipmentCost: number;
  insuranceCost: number;
  rentCost: number;
  communicationCost: number;
  otherCosts: number;
}

interface CalculationResults {
  totalCost: number;
  sellingPrice: number;
  profitPerKg: number;
  profitMargin: number;
  netWeight: number;
  purchaseCost: number;
  laborCost: number;
  packagingCost: number;
  transportCost: number;
  additionalCosts: number;
}

export const useCalculation = () => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    productName: '',
    purchasePrice: 0,
    quantity: 1,
    waste: 0,
    icePercent: 0,
    workerCount: 1,
    laborHours: 0,
    laborCost: 0,
    boxCost: 0,
    bagCost: 0,
    distance: 0,
    fuelCost: 0,
    tolls: 0,
    parkingCost: 0,
    profitMargin: 20,
    competitor1: 0,
    competitor2: 0,
    electricityCost: 0,
    equipmentCost: 0,
    insuranceCost: 0,
    rentCost: 0,
    communicationCost: 0,
    otherCosts: 0
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculate = async (): Promise<void> => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Calculate net weight after waste
      const netWeight = (formData.quantity || 0) * (1 - (formData.waste || 0) / 100);
      
      // Calculate final weight with ice
      const finalWeight = netWeight * (1 + (formData.icePercent || 0) / 100);
      
      // Calculate costs
      const purchaseCost = (formData.purchasePrice || 0) * (formData.quantity || 0);
      const laborCost = (formData.workerCount || 0) * (formData.laborHours || 0) * (formData.laborCost || 0);
      const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);
      const transportCost = 
        (formData.distance || 0) * (formData.fuelCost || 0) + 
        (formData.tolls || 0) + 
        (formData.parkingCost || 0);
      
      const additionalCosts = 
        (formData.electricityCost || 0) + 
        (formData.equipmentCost || 0) + 
        (formData.insuranceCost || 0) + 
        (formData.rentCost || 0) + 
        (formData.communicationCost || 0) + 
        (formData.otherCosts || 0);

      const totalCost = purchaseCost + laborCost + packagingCost + transportCost + additionalCosts;
      
      // Calculate selling price with profit margin
      const sellingPrice = totalCost * (1 + (formData.profitMargin || 0) / 100);
      const sellingPricePerKg = sellingPrice / finalWeight;
      
      const profitPerKg = sellingPricePerKg - (totalCost / finalWeight);

      setResults({
        totalCost,
        sellingPrice: sellingPricePerKg,
        profitPerKg,
        profitMargin: formData.profitMargin || 0,
        netWeight: finalWeight,
        purchaseCost,
        laborCost,
        packagingCost,
        transportCost,
        additionalCosts
      });
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      purchasePrice: 0,
      quantity: 1,
      waste: 0,
      icePercent: 0,
      workerCount: 1,
      laborHours: 0,
      laborCost: 0,
      boxCost: 0,
      bagCost: 0,
      distance: 0,
      fuelCost: 0,
      tolls: 0,
      parkingCost: 0,
      profitMargin: 20,
      competitor1: 0,
      competitor2: 0,
      electricityCost: 0,
      equipmentCost: 0,
      insuranceCost: 0,
      rentCost: 0,
      communicationCost: 0,
      otherCosts: 0
    });
    setResults(null);
  };

  return {
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating
  };
};
