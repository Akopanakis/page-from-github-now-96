import { useState, useCallback } from 'react';

interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

interface FormData {
  productName: string;
  purchasePrice: number;
  quantity: number;
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
  profitMargin: number;
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
}

interface CalculationResults {
  totalCost: number;
  totalCostWithVat: number;
  sellingPrice: number;
  profitPerKg: number;
  profitMargin: number;
  netWeight: number;
  purchaseCost: number;
  laborCost: number;
  packagingCost: number;
  transportCost: number;
  additionalCosts: number;
  vatAmount: number;
}

export const useCalculation = () => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    productName: '',
    purchasePrice: 0,
    quantity: 1,
    waste: 0,
    glazingPercent: 0,
    vatPercent: 24,
    workers: [{ id: '1', hourlyRate: 4.5, hours: 1 }],
    boxCost: 0,
    bagCost: 0,
    distance: 0,
    fuelCost: 0,
    tolls: 0,
    parkingCost: 0,
    driverSalary: 0,
    profitMargin: 20,
    profitTarget: 0,
    competitor1: 0,
    competitor2: 0,
    electricityCost: 0,
    equipmentCost: 0,
    insuranceCost: 0,
    rentCost: 0,
    communicationCost: 0,
    otherCosts: 0,
    originAddress: '',
    destinationAddress: '',
    routeCalculated: false,
    estimatedDuration: ''
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const calculate = useCallback(async (): Promise<void> => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const netWeight = (formData.quantity || 0) * (1 - (formData.waste || 0) / 100);
      const finalWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100);
      
      const purchaseCost = (formData.purchasePrice || 0) * (formData.quantity || 0);
      
      // Calculate total labor cost from all workers
      const laborCost = (formData.workers || []).reduce((sum, worker) => 
        sum + (worker.hourlyRate * worker.hours), 0
      );
      
      const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);
      const transportCost = 
        (formData.distance || 0) * (formData.fuelCost || 0) + 
        (formData.tolls || 0) + 
        (formData.parkingCost || 0) +
        (formData.driverSalary || 0);
      
      const additionalCosts = 
        (formData.electricityCost || 0) + 
        (formData.equipmentCost || 0) + 
        (formData.insuranceCost || 0) + 
        (formData.rentCost || 0) + 
        (formData.communicationCost || 0) + 
        (formData.otherCosts || 0);

      const totalCost = purchaseCost + laborCost + packagingCost + transportCost + additionalCosts;
      
      // Calculate VAT
      const vatAmount = totalCost * ((formData.vatPercent || 0) / 100);
      const totalCostWithVat = totalCost + vatAmount;
      
      const sellingPrice = totalCostWithVat * (1 + (formData.profitMargin || 0) / 100);
      const sellingPricePerKg = sellingPrice / Math.max(finalWeight, 0.001); // Prevent division by zero
      
      const profitPerKg = sellingPricePerKg - (totalCostWithVat / Math.max(finalWeight, 0.001));

      setResults({
        totalCost,
        totalCostWithVat,
        sellingPrice: sellingPricePerKg,
        profitPerKg,
        profitMargin: formData.profitMargin || 0,
        netWeight: finalWeight,
        purchaseCost,
        laborCost,
        packagingCost,
        transportCost,
        additionalCosts,
        vatAmount
      });
    } catch (error) {
      console.error('Calculation error:', error);
      // Reset results on error
      setResults(null);
    } finally {
      setIsCalculating(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      productName: '',
      purchasePrice: 0,
      quantity: 1,
      waste: 0,
      glazingPercent: 0,
      vatPercent: 24,
      workers: [{ id: '1', hourlyRate: 4.5, hours: 1 }],
      boxCost: 0,
      bagCost: 0,
      distance: 0,
      fuelCost: 0,
      tolls: 0,
      parkingCost: 0,
      driverSalary: 0,
      profitMargin: 20,
      profitTarget: 0,
      competitor1: 0,
      competitor2: 0,
      electricityCost: 0,
      equipmentCost: 0,
      insuranceCost: 0,
      rentCost: 0,
      communicationCost: 0,
      otherCosts: 0,
      originAddress: '',
      destinationAddress: '',
      routeCalculated: false,
      estimatedDuration: ''
    });
    setResults(null);
  }, []);

  return {
    formData,
    updateFormData,
    calculate,
    resetForm,
    results,
    isCalculating
  };
};