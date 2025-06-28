export interface CostThreshold {
  label: string;
  minAllowed: number;
  maxAllowed: number;
  tooltip: string;
}

export const costThresholds: Record<string, CostThreshold> = {
  purchaseCost: {
    label: 'Purchase Cost',
    minAllowed: 0,
    maxAllowed: 50,
    tooltip: 'Expected cost of buying raw materials.'
  },
  laborCost: {
    label: 'Labor Cost',
    minAllowed: 0,
    maxAllowed: 20,
    tooltip: 'Wages and related expenses.'
  },
  packagingCost: {
    label: 'Packaging Cost',
    minAllowed: 0,
    maxAllowed: 10,
    tooltip: 'Packaging materials and supplies.'
  },
  transportCost: {
    label: 'Transport Cost',
    minAllowed: 0,
    maxAllowed: 8,
    tooltip: 'Delivery and logistics costs.'
  },
  additionalCosts: {
    label: 'Other Costs',
    minAllowed: 0,
    maxAllowed: 12,
    tooltip: 'Additional overhead expenses.'
  }
};
