export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD format
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseData {
  description: string;
  amount: number;
  date: string;
}

export interface UpdateExpenseData {
  description?: string;
  amount?: number;
  date?: string;
}

export interface CostCalculation {
  fuelCost: number;
  laborCost: number;
  totalCost: number;
}
