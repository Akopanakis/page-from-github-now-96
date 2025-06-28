// Quick test to verify calculation is working
import { calculateResults } from "./client/src/utils/calc.js";

const testData = {
  productName: "Test Fish",
  productType: "fish",
  purchasePrice: 5,
  quantity: 10,
  waste: 20,
  glazingPercent: 15,
  vatPercent: 24,
  workers: [{ id: "1", hourlyRate: 4.5, hours: 1 }],
  profitMargin: 20,
  boxCost: 0,
  bagCost: 0,
  distance: 0,
  fuelCost: 0,
  tolls: 0,
  parkingCost: 0,
  driverSalary: 0,
  electricityCost: 0,
  equipmentCost: 0,
  insuranceCost: 0,
  rentCost: 0,
  communicationCost: 0,
  otherCosts: 0,
};

try {
  const result = calculateResults(testData);
  console.log("Calculation successful:", result);
} catch (error) {
  console.error("Calculation failed:", error);
}
