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

export const validateFormData = (data: Partial<FormData>): ValidationResult => {
  const errors: string[] = []

  if (!data.productName) errors.push('productName')

  numericFields.forEach((field) => {
    const value = (data as any)[field]
    if (value === undefined || value === null || Number.isNaN(Number(value))) {
      errors.push(String(field))
    }
  })

  if (!Array.isArray(data.workers) || data.workers.length === 0) {
    errors.push('workers')
  } else {
    data.workers.forEach((w, idx) => {
      if (
        w == null ||
        Number.isNaN(Number(w.hourlyRate)) ||
        Number.isNaN(Number(w.hours))
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
          Number.isNaN(Number(p.wastePercentage)) ||
          Number.isNaN(Number(p.addedWeight))
      ))
  ) {
    errors.push('processingPhases')
  }

  return { valid: errors.length === 0, errors }
}
