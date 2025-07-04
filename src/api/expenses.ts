import { Expense, CreateExpenseData, UpdateExpenseData } from "@/types/expense";
import { generateExpenseData } from "@/utils/stubData";

const STORAGE_KEY = "expenses";

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get current timestamp
const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};

// Get expenses from localStorage with stub data fallback
const getExpensesFromStorage = (): Expense[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with stub data if no data exists
      const stubData = generateExpenseData(50);
      const expenseData = stubData.map((item) => ({
        id: item.id,
        description: item.description,
        amount: item.amount,
        date: item.date,
        createdAt: item.date,
        updatedAt: item.date,
        category: item.category,
        supplier: item.supplier,
        status: item.status,
        batch: item.batch,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenseData));
      return expenseData;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading expenses from localStorage:", error);
    return [];
  }
};

// Save expenses to localStorage
const saveExpensesToStorage = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error("Error saving expenses to localStorage:", error);
    throw new Error("Failed to save expenses");
  }
};

export const expenseAPI = {
  // Get all expenses
  getAll(): Expense[] {
    return getExpensesFromStorage();
  },

  // Get expense by ID
  getById(id: string): Expense | undefined {
    const expenses = getExpensesFromStorage();
    return expenses.find((expense) => expense.id === id);
  },

  // Create new expense
  create(data: CreateExpenseData): Expense {
    const expenses = getExpensesFromStorage();
    const timestamp = getCurrentTimestamp();

    const newExpense: Expense = {
      id: generateId(),
      description: data.description,
      amount: data.amount,
      date: data.date,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    expenses.push(newExpense);
    saveExpensesToStorage(expenses);

    return newExpense;
  },

  // Update expense
  update(id: string, data: UpdateExpenseData): Expense {
    const expenses = getExpensesFromStorage();
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      throw new Error("Expense not found");
    }

    const updatedExpense: Expense = {
      ...expenses[index],
      ...data,
      updatedAt: getCurrentTimestamp(),
    };

    expenses[index] = updatedExpense;
    saveExpensesToStorage(expenses);

    return updatedExpense;
  },

  // Delete expense
  remove(id: string): void {
    const expenses = getExpensesFromStorage();
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    if (filteredExpenses.length === expenses.length) {
      throw new Error("Expense not found");
    }

    saveExpensesToStorage(filteredExpenses);
  },

  // Search expenses by description
  search(query: string): Expense[] {
    const expenses = getExpensesFromStorage();
    const lowercaseQuery = query.toLowerCase();

    return expenses.filter((expense) =>
      expense.description.toLowerCase().includes(lowercaseQuery),
    );
  },

  // Get expenses by date range
  getByDateRange(startDate: string, endDate: string): Expense[] {
    const expenses = getExpensesFromStorage();

    return expenses.filter((expense) => {
      const expenseDate = expense.date;
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  },

  // Get total amount of all expenses
  getTotalAmount(): number {
    const expenses = getExpensesFromStorage();
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  },
};
