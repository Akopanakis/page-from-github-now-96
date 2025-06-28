import { useState, useCallback, useEffect, useRef } from 'react';
import type { FormData, CalculationResults } from '@/utils/calc';
import { calculateResults } from '@/utils/calc';
import { validateFormData } from '@/utils/validation';
import { toast } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';


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
  const { language } = useLanguage();

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const workerRef = useRef<Worker>();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
      try {
        workerRef.current = new Worker(
          new URL('../workers/calculateWorker.ts', import.meta.url),
          { type: 'module' }
        );
      } catch (err) {
        console.error('Worker initialization failed:', err);
      }
    }
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const calculate = useCallback(async (): Promise<void> => {
    try {
      // Always proceed with calculation, validation is now permissive
      const validation = validateFormData(formData as FormData)
      if (!validation.valid) {
        // Only show warnings for critical errors, don't block calculation
        const criticalErrors = validation.errors.filter(e => e === 'productName')
        if (criticalErrors.length > 0) {
          toast.warning(
            language === 'el'
              ? 'Συνίσταται να συμπληρώσετε το όνομα προϊόντος'
              : 'Product name is recommended'
          )
        }
        console.debug('Validation errors:', validation.errors)
        // Continue with calculation despite validation warnings
      }

      setIsCalculating(true)

      const run = () => {
        return new Promise<CalculationResults>((resolve) => {
          if (workerRef.current) {
            workerRef.current.onmessage = (
              e: MessageEvent<CalculationResults>
            ) => {
              resolve(e.data)
            }
            workerRef.current.onerror = (e) => {
              console.error('Worker error:', e)
              resolve(calculateResults(formData as FormData))
            }
            workerRef.current.postMessage(formData)
          } else {
            resolve(calculateResults(formData as FormData))
          }
        })
      }

      const result = await run()
      setResults(result)
    } catch (error) {
      console.error('Calculation error:', error)
      toast.error(
        language === 'el'
          ? 'Παρουσιάστηκε σφάλμα στον υπολογισμό'
          : 'An error occurred during calculation'
      )
      setResults(null)
    } finally {
      setIsCalculating(false)
    }
  }, [formData, language])

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
