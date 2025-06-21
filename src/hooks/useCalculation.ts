
import { useState } from 'react';

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
  glazingPercent: number; // Updated from icePercent
  vatPercent: number;
  workers: Worker[];
  boxCost: number;
  bagCost: number;
  distance: number;
  fuelCost: number;
  tolls: number;
  parkingCost: number;
  driverSalary: number; // New field
  profitMargin: number;
  profitTarget: number; // New field for target profit
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
    glazingPercent: 0, // Updated from icePercent
    vatPercent: 24,
    workers: [{ id: '1', hourlyRate: 4.5, hours: 1 }],
    boxCost: 0,
    bagCost: 0,
    distance: 0,
    fuelCost: 0,
    tolls: 0,
    parkingCost: 0,
    driverSalary: 0, // New field
    profitMargin: 20,
    profitTarget: 0, // New field
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

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculate = async (): Promise<void> => {
    setIsCalculating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const netWeight = (formData.quantity || 0) * (1 - (formData.waste || 0) / 100);
      const finalWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100); // Updated
      
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
        (formData.driverSalary || 0); // Include driver salary
      
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
      const sellingPricePerKg = sellingPrice / finalWeight;
      
      const profitPerKg = sellingPricePerKg - (totalCostWithVat / finalWeight);

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
      glazingPercent: 0, // Updated
      vatPercent: 24,
      workers: [{ id: '1', hourlyRate: 4.5, hours: 1 }],
      boxCost: 0,
      bagCost: 0,
      distance: 0,
      fuelCost: 0,
      tolls: 0,
      parkingCost: 0,
      driverSalary: 0, // New field
      profitMargin: 20,
      profitTarget: 0, // New field
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
