
import { useState, useCallback } from 'react';

export interface Worker {
  id: string;
  hourlyRate: number;
  hours: number;
}

export interface ProcessingPhase {
  id: string;
  name: string;
  wastePercentage: number;
  addedWeight: number; // can be negative for loss, positive for glazing
  description: string;
}

export interface FormData {
  productName: string;
  productType: 'fish' | 'squid' | 'octopus' | 'other';
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
  // Premium fields
  batchNumber: string;
  supplierName: string;
  processingPhases: ProcessingPhase[];
  targetSellingPrice: number;
  minimumMargin: number;
  storageTemperature: number;
  shelfLife: number;
  certifications: string[];
  customerPrice: number;
  seasonalMultiplier: number;
}

export interface CalculationResults {
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
  // Premium results
  finalProcessedWeight: number;
  totalWastePercentage: number;
  costBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  recommendedSellingPrice: number;
  competitorAnalysis: {
    ourPrice: number;
    competitor1Diff: number;
    competitor2Diff: number;
    marketPosition: 'competitive' | 'expensive' | 'cheap';
  };
  profitAnalysis: {
    breakEvenPrice: number;
    marginAtCurrentPrice: number;
    recommendedMargin: number;
  };
}

export const useCalculation = () => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    productName: '',
    productType: 'fish',
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
    estimatedDuration: '',
    // Premium defaults
    batchNumber: '',
    supplierName: '',
    processingPhases: [
      { id: '1', name: 'Καθάρισμα', wastePercentage: 20, addedWeight: 0, description: 'Αφαίρεση μη εδώδιμων μερών' },
      { id: '2', name: 'Γλασσάρισμα', wastePercentage: 0, addedWeight: 15, description: 'Προσθήκη προστατευτικού πάγου' }
    ],
    targetSellingPrice: 0,
    minimumMargin: 15,
    storageTemperature: -18,
    shelfLife: 365,
    certifications: [],
    customerPrice: 0,
    seasonalMultiplier: 1
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
      // Advanced processing calculation with multiple phases
      let currentWeight = formData.quantity || 0;
      let totalWastePercentage = 0;
      
      // Apply processing phases
      if (formData.processingPhases && formData.processingPhases.length > 0) {
        formData.processingPhases.forEach(phase => {
          if (phase.wastePercentage > 0) {
            const waste = currentWeight * (phase.wastePercentage / 100);
            currentWeight -= waste;
            totalWastePercentage += phase.wastePercentage;
          }
          if (phase.addedWeight !== 0) {
            currentWeight += currentWeight * (phase.addedWeight / 100);
          }
        });
      } else {
        // Fallback to simple calculation
        const netWeight = currentWeight * (1 - (formData.waste || 0) / 100);
        currentWeight = netWeight * (1 + (formData.glazingPercent || 0) / 100);
        totalWastePercentage = formData.waste || 0;
      }

      const finalProcessedWeight = currentWeight;
      
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
      
      // Apply seasonal multiplier
      const seasonalAdjustment = (formData.seasonalMultiplier || 1);
      const adjustedCost = totalCostWithVat * seasonalAdjustment;
      
      const sellingPrice = adjustedCost * (1 + (formData.profitMargin || 0) / 100);
      const sellingPricePerKg = sellingPrice / Math.max(finalProcessedWeight, 0.001);
      
      const profitPerKg = sellingPricePerKg - (adjustedCost / Math.max(finalProcessedWeight, 0.001));

      // Cost breakdown for premium analysis
      const costBreakdown = [
        { category: 'Αγορά', amount: purchaseCost, percentage: (purchaseCost / totalCost) * 100 },
        { category: 'Εργασία', amount: laborCost, percentage: (laborCost / totalCost) * 100 },
        { category: 'Συσκευασία', amount: packagingCost, percentage: (packagingCost / totalCost) * 100 },
        { category: 'Μεταφορά', amount: transportCost, percentage: (transportCost / totalCost) * 100 },
        { category: 'Λοιπά', amount: additionalCosts, percentage: (additionalCosts / totalCost) * 100 }
      ].filter(item => item.amount > 0);

      // Competitor analysis
      const competitor1Diff = (formData.competitor1 || 0) - sellingPricePerKg;
      const competitor2Diff = (formData.competitor2 || 0) - sellingPricePerKg;
      let marketPosition: 'competitive' | 'expensive' | 'cheap' = 'competitive';
      
      if (competitor1Diff > 0.5 || competitor2Diff > 0.5) {
        marketPosition = 'cheap';
      } else if (competitor1Diff < -0.5 || competitor2Diff < -0.5) {
        marketPosition = 'expensive';
      }

      // Profit analysis
      const breakEvenPrice = adjustedCost / Math.max(finalProcessedWeight, 0.001);
      const marginAtCurrentPrice = ((sellingPricePerKg - breakEvenPrice) / sellingPricePerKg) * 100;
      const recommendedMargin = Math.max(formData.minimumMargin || 15, 20);
      
      // Recommended selling price based on market analysis
      const recommendedSellingPrice = breakEvenPrice * (1 + recommendedMargin / 100);

      setResults({
        totalCost,
        totalCostWithVat: adjustedCost,
        sellingPrice: sellingPricePerKg,
        profitPerKg,
        profitMargin: formData.profitMargin || 0,
        netWeight: finalProcessedWeight,
        purchaseCost,
        laborCost,
        packagingCost,
        transportCost,
        additionalCosts,
        vatAmount,
        finalProcessedWeight,
        totalWastePercentage,
        costBreakdown,
        recommendedSellingPrice,
        competitorAnalysis: {
          ourPrice: sellingPricePerKg,
          competitor1Diff,
          competitor2Diff,
          marketPosition
        },
        profitAnalysis: {
          breakEvenPrice,
          marginAtCurrentPrice,
          recommendedMargin
        }
      });
    } catch (error) {
      console.error('Calculation error:', error);
      setResults(null);
    } finally {
      setIsCalculating(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      productName: '',
      productType: 'fish',
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
      estimatedDuration: '',
      batchNumber: '',
      supplierName: '',
      processingPhases: [
        { id: '1', name: 'Καθάρισμα', wastePercentage: 20, addedWeight: 0, description: 'Αφαίρεση μη εδώδιμων μερών' },
        { id: '2', name: 'Γλασσάρισμα', wastePercentage: 0, addedWeight: 15, description: 'Προσθήκη προστατευτικού πάγου' }
      ],
      targetSellingPrice: 0,
      minimumMargin: 15,
      storageTemperature: -18,
      shelfLife: 365,
      certifications: [],
      customerPrice: 0,
      seasonalMultiplier: 1
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
