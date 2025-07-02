import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";
import { Expense } from "@/types/expense";
import { exportToCSV, exportToXLSX, exportToPDF } from "@/utils/exportUtils";

interface ExportButtonsProps {
  expenses: Expense[];
  disabled?: boolean;
}

export default function ExportButtons({
  expenses,
  disabled = false,
}: ExportButtonsProps) {
  const formatExpensesForExport = (expenses: Expense[]) => {
    return expenses.map((expense) => ({
      Περιγραφή: expense.description,
      "Ποσό (€)": expense.amount,
      Ημερομηνία: new Date(expense.date).toLocaleDateString("el-GR"),
      "Ημ/νία Δημιουργίας": new Date(expense.createdAt).toLocaleDateString(
        "el-GR",
      ),
      "Ημ/νία Ενημέρωσης": new Date(expense.updatedAt).toLocaleDateString(
        "el-GR",
      ),
    }));
  };

  const generateExpenseReportHTML = (expenses: Expense[]) => {
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const reportDate = new Date().toLocaleDateString("el-GR");

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Αναφορά Δαπανών - KostoPro</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .summary { background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #1F4E79; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .total-row { font-weight: bold; background-color: #e8f4f8; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>KostoPro Enhanced</h1>
            <h2>Αναφορά Δαπανών</h2>
            <p>Ημερομηνία Αναφοράς: ${reportDate}</p>
          </div>
          
          <div class="summary">
            <h3>Περίληψη</h3>
            <p><strong>Συνολικές Δαπάνες:</strong> ${expenses.length}</p>
            <p><strong>Συνολικό Ποσό:</strong> €${totalAmount.toFixed(2)}</p>
            <p><strong>Μέσος Όρος Δαπάνης:</strong> €${expenses.length > 0 ? (totalAmount / expenses.length).toFixed(2) : "0.00"}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Περιγραφή</th>
                <th>Ποσό (€)</th>
                <th>Ημερομηνία</th>
                <th>Ημ/νία Δημιουργίας</th>
              </tr>
            </thead>
            <tbody>
              ${expenses
                .map(
                  (expense) => `
                <tr>
                  <td>${expense.description}</td>
                  <td>€${expense.amount.toFixed(2)}</td>
                  <td>${new Date(expense.date).toLocaleDateString("el-GR")}</td>
                  <td>${new Date(expense.createdAt).toLocaleDateString("el-GR")}</td>
                </tr>
              `,
                )
                .join("")}
              <tr class="total-row">
                <td colspan="3"><strong>Σύνολο</strong></td>
                <td><strong>€${totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const handleExportPDF = async () => {
    if (expenses.length === 0) {
      toast.error("Δεν υπάρχουν δαπάνες για εξαγωγή");
      return;
    }

    try {
      const html = generateExpenseReportHTML(expenses);
      const filename = `expenses-report-${new Date().toISOString().split("T")[0]}`;

      await exportToPDF(html, filename, {
        sections: {
          charts: false,
          tables: true,
          comments: false,
        },
        theme: "light",
      });

      toast.success("Η αναφορά PDF εξήχθη επιτυχώς!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Σφάλμα κατά την εξαγωγή PDF");
    }
  };

  const handleExportExcel = () => {
    if (expenses.length === 0) {
      toast.error("Δεν υπάρχουν δαπάνες για εξαγωγή");
      return;
    }

    try {
      const data = formatExpensesForExport(expenses);
      const filename = `expenses-${new Date().toISOString().split("T")[0]}`;

      exportToXLSX(data, filename);
      toast.success("Το αρχείο Excel εξήχθη επιτυχώς!");
    } catch (error) {
      console.error("Error exporting Excel:", error);
      toast.error("Σφάλμα κατά την εξαγωγή Excel");
    }
  };

  const handleExportCSV = () => {
    if (expenses.length === 0) {
      toast.error("Δεν υπάρχουν δαπάνες για εξαγωγή");
      return;
    }

    try {
      const data = formatExpensesForExport(expenses);
      const filename = `expenses-${new Date().toISOString().split("T")[0]}`;

      exportToCSV(data, filename);
      toast.success("Το αρχείο CSV εξήχθη επιτυχώς!");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Σφάλμα κατά την εξαγωγή CSV");
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileDown className="w-5 h-5" />
          Εξαγωγή Αναφορών
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={handleExportPDF}
            disabled={disabled || expenses.length === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Εξαγωγή PDF
          </Button>

          <Button
            onClick={handleExportExcel}
            disabled={disabled || expenses.length === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Εξαγωγή Excel
          </Button>

          <Button
            onClick={handleExportCSV}
            disabled={disabled || expenses.length === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Εξαγωγή CSV
          </Button>
        </div>

        {expenses.length === 0 && (
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Προσθέστε δαπάνες για να ενεργοποιηθούν οι επιλογές εξαγωγής
          </p>
        )}
      </CardContent>
    </Card>
  );
}
