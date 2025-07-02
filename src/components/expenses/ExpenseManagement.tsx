import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Receipt, Calculator, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { expenseAPI } from "@/api/expenses";
import { Expense } from "@/types/expense";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";
import CostCalculator from "./CostCalculator";
import ExportButtons from "./ExportButtons";

export default function ExpenseManagement() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [activeTab, setActiveTab] = useState("list");

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = () => {
    const loadedExpenses = expenseAPI.getAll();
    setExpenses(loadedExpenses);
  };

  const handleExpenseSuccess = (expense: Expense) => {
    loadExpenses(); // Reload to get fresh data
    setIsFormOpen(false);
    setEditingExpense(undefined);
  };

  const handleExpenseEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleExpenseDeleted = () => {
    loadExpenses(); // Reload to get fresh data
  };

  const handleNewExpense = () => {
    setEditingExpense(undefined);
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingExpense(undefined);
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Διαχείριση Δαπανών
          </h1>
          <p className="text-muted-foreground">
            Παρακολουθήστε και διαχειριστείτε τις δαπάνες σας
          </p>
        </div>
        <Button
          onClick={handleNewExpense}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Νέα Δαπάνη
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl shadow-sm bg-card border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Receipt className="w-4 h-4" />
            Συνολικές Δαπάνες
          </div>
          <div className="text-2xl font-bold">{expenses.length}</div>
        </div>

        <div className="p-4 rounded-2xl shadow-sm bg-card border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Calculator className="w-4 h-4" />
            Συνολικό Ποσό
          </div>
          <div className="text-2xl font-bold text-primary">
            €{totalExpenses.toFixed(2)}
          </div>
        </div>

        <div className="p-4 rounded-2xl shadow-sm bg-card border">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Download className="w-4 h-4" />
            Μέσος Όρος
          </div>
          <div className="text-2xl font-bold">
            €
            {expenses.length > 0
              ? (totalExpenses / expenses.length).toFixed(2)
              : "0.00"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Λίστα Δαπανών</TabsTrigger>
          <TabsTrigger value="calculator">Υπολογιστής</TabsTrigger>
          <TabsTrigger value="reports">Αναφορές</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <ExpensesList
            expenses={expenses}
            onExpenseEdit={handleExpenseEdit}
            onExpenseDeleted={handleExpenseDeleted}
          />
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <CostCalculator />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ExportButtons expenses={expenses} />
        </TabsContent>
      </Tabs>

      {/* Add/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingExpense ? "Επεξεργασία Δαπάνης" : "Νέα Δαπάνη"}
            </DialogTitle>
          </DialogHeader>
          <ExpenseForm
            expense={editingExpense}
            onSuccess={handleExpenseSuccess}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
