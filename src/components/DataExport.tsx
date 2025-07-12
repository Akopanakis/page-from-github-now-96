import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  TableProperties,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { libraryLoader } from "@/utils/libraryLoader";
import { toast } from "@/components/ui/sonner";

interface DataExportProps {
  formData: any;
  results: any;
}

const DataExport: React.FC<DataExportProps> = ({ formData, results }) => {
  const { language } = useLanguage();
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const generateCSV = () => {
    if (!results) {
      toast.error(
        language === "el"
          ? "Παρακαλώ εκτελέστε πρώτα τον υπολογισμό"
          : "Please run calculation first",
      );
      return;
    }

    setIsExportingCSV(true);

    try {
      const csvData = [];

      // Headers
      csvData.push([
        language === "el" ? "Κατηγορία" : "Category",
        language === "el" ? "Στοιχείο" : "Item",
        language === "el" ? "Αξία" : "Value",
        language === "el" ? "Μονάδα" : "Unit",
      ]);

      // Product Information
      csvData.push([
        language === "el" ? "Προϊόν" : "Product",
        language === "el" ? "Όνομα" : "Name",
        formData.productName || "",
        "",
      ]);
      csvData.push([
        language === "el" ? "Προϊόν" : "Product",
        language === "el" ? "Τύπος" : "Type",
        formData.productType || "",
        "",
      ]);
      csvData.push([
        language === "el" ? "Προϊόν" : "Product",
        language === "el" ? "Βάρος" : "Weight",
        formData.weight || 0,
        "kg",
      ]);
      csvData.push([
        language === "el" ? "Προϊόν" : "Product",
        language === "el" ? "Ποσότητα" : "Quantity",
        formData.quantity || 1,
        language === "el" ? "τεμάχια" : "pieces",
      ]);

      // Cost Analysis
      csvData.push([
        language === "el" ? "Κόστος" : "Cost",
        language === "el" ? "Τιμή Αγοράς" : "Purchase Price",
        formData.purchasePrice || 0,
        "€/kg",
      ]);
      csvData.push([
        language === "el" ? "Κόστος" : "Cost",
        language === "el" ? "Συνολικό Κόστος" : "Total Cost",
        results.totalCosts || 0,
        "€",
      ]);
      csvData.push([
        language === "el" ? "Κόστος" : "Cost",
        language === "el" ? "Κόστος ανά kg" : "Cost per kg",
        results.costPerKg || 0,
        "€/kg",
      ]);

      // Financial Results
      csvData.push([
        language === "el" ? "Αποτελέσματα" : "Results",
        language === "el" ? "Τιμή Πώλησης" : "Selling Price",
        results.finalPrice || 0,
        "€",
      ]);
      csvData.push([
        language === "el" ? "Αποτελέσματα" : "Results",
        language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
        results.profitMargin || 0,
        "%",
      ]);
      csvData.push([
        language === "el" ? "Αποτελέσματα" : "Results",
        language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
        results.grossProfit || 0,
        "€",
      ]);

      // Processing Information
      if (formData.processingPhases) {
        formData.processingPhases.forEach((phase: any, index: number) => {
          csvData.push([
            language === "el" ? "Επεξεργασία" : "Processing",
            `${language === "el" ? "Φάση" : "Phase"} ${index + 1}: ${phase.name}`,
            phase.lossPercentage || 0,
            "% " + (language === "el" ? "απώλεια" : "loss"),
          ]);
        });
      }

      // Direct Costs
      if (formData.directCosts) {
        formData.directCosts.forEach((cost: any) => {
          csvData.push([
            language === "el" ? "Άμεσα Κόστη" : "Direct Costs",
            cost.name || "",
            cost.value || 0,
            "€",
          ]);
        });
      }

      // Indirect Costs
      if (formData.indirectCosts) {
        formData.indirectCosts.forEach((cost: any) => {
          csvData.push([
            language === "el" ? "Έμμεσα Κόστη" : "Indirect Costs",
            cost.name || "",
            cost.value || 0,
            "€",
          ]);
        });
      }

      // Transport
      if (formData.transportLegs) {
        formData.transportLegs.forEach((leg: any, index: number) => {
          csvData.push([
            language === "el" ? "Μεταφορικά" : "Transport",
            `${language === "el" ? "Διαδρομή" : "Route"} ${index + 1}: ${leg.from} → ${leg.to}`,
            leg.cost || 0,
            "€",
          ]);
        });
      }

      // Convert to CSV string with UTF-8 BOM for Greek characters
      const csvContent =
        "\ufeff" +
        csvData
          .map((row) => row.map((cell) => `"${cell}"`).join(","))
          .join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `kostopro-${formData.productName?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "data"}-${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(
        language === "el"
          ? "Τα δεδομένα εξήχθησαν σε CSV επιτυχώς!"
          : "Data exported to CSV successfully!",
      );
    } catch (error) {
      console.error("CSV export error:", error);
      toast.error(
        language === "el"
          ? "Σφάλμα κατά την εξαγωγή CSV"
          : "Error exporting CSV",
      );
    } finally {
      setIsExportingCSV(false);
    }
  };

  const generateExcel = async () => {
    if (!results) {
      toast.error(
        language === "el"
          ? "Παρακαλώ εκτελέστε πρώτα τον υπολογισμό"
          : "Please run calculation first",
      );
      return;
    }

    setIsExportingExcel(true);

    try {
      // Wait for XLSX library
      await libraryLoader.waitForLibrary("xlsx");

      if (!window.XLSX) {
        throw new Error("XLSX library not available");
      }

      const XLSX = window.XLSX;
      const wb = XLSX.utils.book_new();

      // Summary Sheet
      const summaryData = [
        [
          language === "el"
            ? "KOSTOPRO - ΣΥΝΟΨΗ ΑΠΟΤΕΛΕΣΜΑΤΩΝ"
            : "KOSTOPRO - RESULTS SUMMARY",
          "",
          "",
          "",
        ],
        [
          language === "el" ? "Ημερομηνία:" : "Date:",
          new Date().toLocaleDateString("el-GR"),
          "",
          "",
        ],
        ["", "", "", ""],
        [
          language === "el" ? "ΣΤΟΙΧΕΙΑ ΠΡΟΪΟΝΤΟΣ" : "PRODUCT INFORMATION",
          "",
          "",
          "",
        ],
        [
          language === "el" ? "Όνομα:" : "Name:",
          formData.productName || "",
          "",
          "",
        ],
        [
          language === "el" ? "Τύπος:" : "Type:",
          formData.productType || "",
          "",
          "",
        ],
        [
          language === "el" ? "Βάρος:" : "Weight:",
          formData.weight || 0,
          "kg",
          "",
        ],
        [
          language === "el" ? "Ποσότητα:" : "Quantity:",
          formData.quantity || 1,
          language === "el" ? "τεμάχια" : "pieces",
          "",
        ],
        [
          language === "el" ? "Προέλευση:" : "Origin:",
          formData.origin || "",
          "",
          "",
        ],
        [
          language === "el" ? "Ποιότητα:" : "Quality:",
          formData.quality || "",
          "",
          "",
        ],
        ["", "", "", ""],
        [
          language === "el" ? "ΟΙΚΟΝΟΜΙΚΑ ΑΠΟΤΕΛΕΣΜΑΤΑ" : "FINANCIAL RESULTS",
          "",
          "",
          "",
        ],
        [
          language === "el" ? "Τιμή Αγοράς:" : "Purchase Price:",
          formData.purchasePrice || 0,
          "€/kg",
          "",
        ],
        [
          language === "el" ? "Συνολικό Κόστος:" : "Total Cost:",
          results.totalCosts || 0,
          "€",
          "",
        ],
        [
          language === "el" ? "Κόστος ανά kg:" : "Cost per kg:",
          results.costPerKg || 0,
          "€/kg",
          "",
        ],
        [
          language === "el" ? "Τιμή Πώλησης:" : "Selling Price:",
          results.finalPrice || 0,
          "€",
          "",
        ],
        [
          language === "el" ? "Περιθώριο Κέρδους:" : "Profit Margin:",
          results.profitMargin || 0,
          "%",
          "",
        ],
        [
          language === "el" ? "Καθαρό Κέρδος:" : "Net Profit:",
          results.grossProfit || 0,
          "€",
          "",
        ],
        [
          language === "el" ? "Break-even:" : "Break-even:",
          results.breakEvenPrice || 0,
          "€",
          "",
        ],
        ["", "", "", ""],
        [language === "el" ? "ΕΠΙΔΟΣΗ" : "PERFORMANCE", "", "", ""],
        [
          language === "el" ? "Συνολικές Απώλειες:" : "Total Losses:",
          results.totalLossPercentage || 0,
          "%",
          "",
        ],
        [
          language === "el" ? "Αποδοτικότητα:" : "Efficiency:",
          results.efficiencyScore || 0,
          "%",
          "",
        ],
        [
          language === "el" ? "Ανταγωνιστικότητα:" : "Competitiveness:",
          results.competitivePosition || "",
          "",
          "",
        ],
      ];

      const summaryWS = XLSX.utils.aoa_to_sheet(summaryData);

      // Auto-fit columns
      summaryWS["!cols"] = [{ wch: 25 }, { wch: 15 }, { wch: 10 }, { wch: 10 }];

      XLSX.utils.book_append_sheet(
        wb,
        summaryWS,
        language === "el" ? "Σύνοψη" : "Summary",
      );

      // Processing Phases Sheet
      if (formData.processingPhases && formData.processingPhases.length > 0) {
        const processingData = [
          [
            language === "el" ? "ΦΑΣΕΙΣ ΕΠΕΞΕΡΓΑΣΙΑΣ" : "PROCESSING PHASES",
            "",
            "",
            "",
            "",
            "",
          ],
          [
            language === "el" ? "Φάση" : "Phase",
            language === "el" ? "Όνομα" : "Name",
            language === "el" ? "Απώλειες (%)" : "Loss (%)",
            language === "el" ? "Κόστος (€/kg)" : "Cost (€/kg)",
            language === "el" ? "Διάρκεια (h)" : "Duration (h)",
            language === "el" ? "Περιγραφή" : "Description",
          ],
          ...formData.processingPhases.map((phase: any, index: number) => [
            index + 1,
            phase.name || "",
            phase.lossPercentage || 0,
            phase.costPerKg || 0,
            phase.duration || 0,
            phase.description || "",
          ]),
        ];

        const processingWS = XLSX.utils.aoa_to_sheet(processingData);
        processingWS["!cols"] = [
          { wch: 8 },
          { wch: 20 },
          { wch: 12 },
          { wch: 12 },
          { wch: 12 },
          { wch: 30 },
        ];

        XLSX.utils.book_append_sheet(
          wb,
          processingWS,
          language === "el" ? "Επεξεργασία" : "Processing",
        );
      }

      // Costs Breakdown Sheet
      const costsData = [
        [language === "el" ? "ΑΝΑΛΥΣΗ ΚΟΣΤΟΥΣ" : "COST BREAKDOWN", "", "", ""],
        [
          language === "el" ? "Κατηγορία" : "Category",
          language === "el" ? "Όνομα" : "Name",
          language === "el" ? "Αξία (€)" : "Value (€)",
          language === "el" ? "Ποσοστό (%)" : "Percentage (%)",
        ],
      ];

      // Add direct costs
      if (formData.directCosts) {
        costsData.push([
          language === "el" ? "ΑΜΕΣΑ ΚΟΣΤΗ" : "DIRECT COSTS",
          "",
          "",
          "",
        ]);
        formData.directCosts.forEach((cost: any) => {
          const percentage =
            results.totalCosts > 0
              ? (((cost.value || 0) / results.totalCosts) * 100).toFixed(1)
              : 0;
          costsData.push([
            language === "el" ? "Άμεσο" : "Direct",
            cost.name || "",
            cost.value || 0,
            percentage,
          ]);
        });
      }

      // Add indirect costs
      if (formData.indirectCosts) {
        costsData.push([
          language === "el" ? "ΕΜΜΕΣΑ ΚΟΣΤΗ" : "INDIRECT COSTS",
          "",
          "",
          "",
        ]);
        formData.indirectCosts.forEach((cost: any) => {
          const percentage =
            results.totalCosts > 0
              ? (((cost.value || 0) / results.totalCosts) * 100).toFixed(1)
              : 0;
          costsData.push([
            language === "el" ? "Έμμεσο" : "Indirect",
            cost.name || "",
            cost.value || 0,
            percentage,
          ]);
        });
      }

      // Add transport costs
      if (formData.transportLegs) {
        costsData.push([
          language === "el" ? "ΜΕΤΑΦΟΡΙΚΑ" : "TRANSPORT",
          "",
          "",
          "",
        ]);
        formData.transportLegs.forEach((leg: any, index: number) => {
          const percentage =
            results.totalCosts > 0
              ? (((leg.cost || 0) / results.totalCosts) * 100).toFixed(1)
              : 0;
          costsData.push([
            language === "el" ? "Μεταφορικό" : "Transport",
            `${leg.from} → ${leg.to}`,
            leg.cost || 0,
            percentage,
          ]);
        });
      }

      const costsWS = XLSX.utils.aoa_to_sheet(costsData);
      costsWS["!cols"] = [{ wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 12 }];

      XLSX.utils.book_append_sheet(
        wb,
        costsWS,
        language === "el" ? "Κόστη" : "Costs",
      );

      // Save file
      const fileName = `kostopro-${formData.productName?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "data"}-${new Date().toISOString().split("T")[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success(
        language === "el"
          ? "Τα δεδομένα εξήχθησαν σε Excel επιτυχώς!"
          : "Data exported to Excel successfully!",
      );
    } catch (error) {
      console.error("Excel export error:", error);
      toast.error(
        language === "el"
          ? "Σφάλμα κατά την εξαγωγή Excel"
          : "Error exporting Excel",
      );
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-green-100 rounded-lg">
            <Database className="w-5 h-5 text-green-600" />
          </div>
          <span>{language === "el" ? "Εξαγωγή Δεδομένων" : "Data Export"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          {language === "el"
            ? "Εξάγετε τα δεδομένα κοστολόγησης σε διάφορες μορφές"
            : "Export costing data in various formats"}
        </div>

        {results ? (
          <div className="space-y-3">
            <Button
              onClick={generateCSV}
              variant="outline"
              className="w-full border-green-300 hover:bg-green-50"
              disabled={isExportingCSV}
            >
              {isExportingCSV ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              {isExportingCSV
                ? language === "el"
                  ? "Εξαγωγή..."
                  : "Exporting..."
                : language === "el"
                  ? "Εξαγωγή CSV"
                  : "Export CSV"}
            </Button>

            <Button
              onClick={generateExcel}
              variant="outline"
              className="w-full border-blue-300 hover:bg-blue-50"
              disabled={isExportingExcel}
            >
              {isExportingExcel ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-4 h-4 mr-2" />
              )}
              {isExportingExcel
                ? language === "el"
                  ? "Δημιουργία..."
                  : "Generating..."
                : language === "el"
                  ? "Εξαγωγή Excel"
                  : "Export Excel"}
            </Button>

            <div className="text-xs text-gray-500 space-y-1 mt-3">
              <div>
                ✓{" "}
                {language === "el"
                  ? "Πλήρη δεδομένα προϊόντος"
                  : "Complete product data"}
              </div>
              <div>
                ✓ {language === "el" ? "Ανάλυση κόστους" : "Cost breakdown"}
              </div>
              <div>
                ✓{" "}
                {language === "el"
                  ? "Φάσεις επεξεργασίας"
                  : "Processing phases"}
              </div>
              <div>
                ✓ {language === "el" ? "Μεταφορικά κόστη" : "Transport costs"}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <TableProperties className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">
              {language === "el"
                ? "Εκτελέστε υπολογισμό για να ενεργοποιηθεί η εξαγωγή δεδομένων"
                : "Run calculation to enable data export"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataExport;
