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

  textFields.forEach(field => {
    const value = (data as any)[field]
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(String(field))
    }
  })

  numericFields.forEach((field) => {
    const value = (data as any)[field]
    if (typeof value !== 'number' || Number.isNaN(value)) {
      errors.push(String(field))
    }
  })

  if (!Array.isArray(data.workers) || data.workers.length === 0) {
    errors.push('workers')
  } else {
    data.workers.forEach((w, idx) => {
      if (
        w == null ||
        typeof w.hourlyRate !== 'number' ||
        Number.isNaN(w.hourlyRate) ||
        typeof w.hours !== 'number' ||
        Number.isNaN(w.hours)
      ) {
        errors.push(`worker_${idx}`)
      }
    })
  }

  if (
    data.processingPhases &&
    (!Array.isArray(data.processingPhases) ||
      data.processingPhases.some(
        (p) =>
          p == null ||
          typeof p.wastePercentage !== 'number' ||
          Number.isNaN(p.wastePercentage) ||
          typeof p.addedWeight !== 'number' ||
          Number.isNaN(p.addedWeight)
      ))
  ) {
    errors.push('processingPhases')
  }

  return { valid: errors.length === 0, errors }
}
