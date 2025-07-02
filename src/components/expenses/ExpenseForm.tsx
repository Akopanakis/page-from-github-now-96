import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { expenseAPI } from "@/api/expenses";
import { CreateExpenseData, Expense } from "@/types/expense";

const expenseSchema = z.object({
  description: z
    .string()
    .min(1, "Η περιγραφή είναι υποχρεωτική")
    .max(100, "Η περιγραφή δεν μπορεί να υπερβαίνει τους 100 χαρακτήρες"),
  amount: z.number().min(0.01, "Το ποσό πρέπει να είναι μεγαλύτερο από 0"),
  date: z
    .string()
    .min(1, "Η ημερομηνία είναι υποχρεωτική")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Η ημερομηνία πρέπει να είναι σε μορφή YYYY-MM-DD",
    ),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: (expense: Expense) => void;
  onCancel?: () => void;
}

export default function ExpenseForm({
  expense,
  onSuccess,
  onCancel,
}: ExpenseFormProps) {
  const isEditing = !!expense;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expense
      ? {
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
        }
      : {
          description: "",
          amount: 0,
          date: new Date().toISOString().split("T")[0], // Today's date
        },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      let savedExpense: Expense;

      if (isEditing) {
        savedExpense = expenseAPI.update(expense.id, data);
        toast.success("Η δαπάνη ενημερώθηκε επιτυχώς!");
      } else {
        savedExpense = expenseAPI.create(data);
        toast.success("Η δαπάνη αποθηκεύτηκε επιτυχώς!");
      }

      if (onSuccess) {
        onSuccess(savedExpense);
      }

      if (!isEditing) {
        reset();
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      toast.error("Σφάλμα κατά την αποθήκευση της δαπάνης");
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>
          {isEditing ? "Επεξεργασία Δαπάνης" : "Νέα Δαπάνη"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Περιγραφή</Label>
            <Input
              id="description"
              type="text"
              placeholder="Εισάγετε περιγραφή δαπάνης..."
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Ποσό (€)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount", { valueAsNumber: true })}
              className={errors.amount ? "border-red-500" : ""}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Ημερομηνία</Label>
            <Input
              id="date"
              type="date"
              {...register("date")}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Αποθήκευση..." : "Αποθήκευση"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Ακύρωση
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
