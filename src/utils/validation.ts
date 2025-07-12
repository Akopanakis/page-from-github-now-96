

import { FormData } from './calc'

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

const numericFields: (keyof FormData)[] = [
  'purchasePrice',
  'quantity',
  'waste',
  'glazingPercent',
  'vatPercent',
  'boxCost',
  'bagCost',
  'distance',
  'fuelCost',
  'tolls',
  'parkingCost',
  'driverSalary',
  'profitMargin',
  'profitTarget',
  'competitor1',
  'competitor2',
  'electricityCost',
  'equipmentCost',
  'insuranceCost',
  'rentCost',
  'communicationCost',
  'otherCosts',
  'targetSellingPrice',
  'minimumMargin',
  'storageTemperature',
  'shelfLife',
  'customerPrice',
  'seasonalMultiplier'
]

const textFields: (keyof FormData)[] = [
  'productName',
  'productType',
  'originAddress',
  'destinationAddress',
  'estimatedDuration',
  'batchNumber',
  'supplierName'
]

export const validateFormData = (data: Partial<FormData>): ValidationResult => {
  const errors: string[] = []

  // Only validate critical text fields - allow empty optional fields
  const criticalTextFields = ['productName'] // Only require product name
  criticalTextFields.forEach(field => {
    const value = (data as any)[field]
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(String(field))
    }
  })

  // For numeric fields, only check for invalid types, allow 0 and undefined
  numericFields.forEach((field) => {
    const value = (data as any)[field]
    if (value !== undefined && value !== null && (typeof value !== 'number' || Number.isNaN(value))) {
      errors.push(String(field))
    }
  })

  // Workers validation - ensure we have at least one valid worker
  if (!Array.isArray(data.workers) || data.workers.length === 0) {
    // Don't block calculation, just warn
    console.debug('No workers provided, using default')
  } else {
    data.workers.forEach((w, idx) => {
      if (
        w == null ||
        (w.hourlyRate !== undefined && (typeof w.hourlyRate !== 'number' || Number.isNaN(w.hourlyRate))) ||
        (w.hours !== undefined && (typeof w.hours !== 'number' || Number.isNaN(w.hours)))
      ) {
        console.debug(`Worker ${idx} has invalid data, will use defaults`)
      }
    })
  }

  // Processing phases validation - allow missing or invalid phases
  if (data.processingPhases && Array.isArray(data.processingPhases)) {
    data.processingPhases.forEach((p, idx) => {
      if (p != null) {
        // Check if phase has waste or weight properties (different naming conventions)
        const wasteValue = (p as any).wastePercentage || (p as any).waste || (p as any).lossPercentage;
        const weightValue = (p as any).addedWeight || (p as any).weight || (p as any).additionalWeight;
        
        if (wasteValue !== undefined && (typeof wasteValue !== 'number' || Number.isNaN(wasteValue))) {
          console.debug(`Processing phase ${idx} has invalid waste data, will use defaults`)
        }
        
        if (weightValue !== undefined && (typeof weightValue !== 'number' || Number.isNaN(weightValue))) {
          console.debug(`Processing phase ${idx} has invalid weight data, will use defaults`)
        }
      }
    })
  }

  return { valid: errors.length === 0, errors }
}

