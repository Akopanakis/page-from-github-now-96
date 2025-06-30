import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { libraryLoader } from "@/utils/libraryLoader";
import { toast } from "@/components/ui/sonner";

interface PDFExportProps {
  formData: any;
  results: any;
  companyInfo: any;
}

const PDFExport: React.FC<PDFExportProps> = ({
  formData,
  results,
  companyInfo,
}) => {
  const { language } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  const generatePDF = async () => {
    if (!results) {
      toast.error(
        language === "el"
          ? "Παρακαλώ εκτελέστε πρώτα τον υπολογισμό"
          : "Please run calculation first",
      );
      return;
    }

    setIsExporting(true);

    try {
      // Wait for jsPDF library
      await libraryLoader.waitForLibrary("jspdf");

      if (!window.jsPDF) {
        throw new Error("jsPDF library not available");
      }

      const { jsPDF } = window;
      const pdf = new jsPDF("p", "mm", "a4");

      // Add Greek font support
      pdf.setFont("Helvetica");

      let yPosition = 20;
      const leftMargin = 20;
      const rightMargin = 190;
      const lineHeight = 7;

      // Header with company info
      if (companyInfo.logoUrl) {
        // Add logo if available (simplified)
        pdf.setFontSize(16);
        pdf.text(companyInfo.name || "KostoPro", leftMargin, yPosition);
        yPosition += 10;
      } else {
        pdf.setFontSize(20);
        pdf.setTextColor(59, 130, 246);
        pdf.text("KostoPro", leftMargin, yPosition);
        yPosition += 10;
      }

      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        language === "el" ? "Αναφορά Κοστολόγησης" : "Costing Report",
        leftMargin,
        yPosition,
      );
      yPosition += 15;

      // Date and product info
      pdf.setFontSize(10);
      pdf.text(
        `${language === "el" ? "Ημερομηνία:" : "Date:"} ${new Date().toLocaleDateString("el-GR")}`,
        leftMargin,
        yPosition,
      );
      pdf.text(
        `${language === "el" ? "Σελίδα:" : "Page:"} 1`,
        rightMargin - 30,
        yPosition,
      );
      yPosition += 15;

      // Product Information Section
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.text(
        language === "el" ? "ΣΤΟΙΧΕΙΑ ΠΡΟΪΟΝΤΟΣ" : "PRODUCT INFORMATION",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const productInfo = [
        [
          `${language === "el" ? "Όνομα:" : "Name:"}`,
          formData.productName || "",
        ],
        [
          `${language === "el" ? "Τύπος:" : "Type:"}`,
          formData.productType || "",
        ],
        [
          `${language === "el" ? "Βάρος:" : "Weight:"}`,
          `${formData.weight || 0} kg`,
        ],
        [
          `${language === "el" ? "Ποσότητα:" : "Quantity:"}`,
          `${formData.quantity || 1} ${language === "el" ? "τεμάχια" : "pieces"}`,
        ],
        [
          `${language === "el" ? "Προέλευση:" : "Origin:"}`,
          formData.origin || "",
        ],
        [
          `${language === "el" ? "Ποιότητα:" : "Quality:"}`,
          formData.quality || "",
        ],
        [
          `${language === "el" ? "Προμηθευτής:" : "Supplier:"}`,
          formData.supplierName || "",
        ],
      ];

      productInfo.forEach(([label, value]) => {
        pdf.text(label, leftMargin, yPosition);
        pdf.text(value, leftMargin + 40, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 10;

      // Cost Analysis Section
      pdf.setFontSize(14);
      pdf.setTextColor(59, 130, 246);
      pdf.text(
        language === "el" ? "ΑΝΑΛΥΣΗ ΚΟΣΤΟΥΣ" : "COST ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const costInfo = [
        [
          `${language === "el" ? "Τιμή Αγοράς:" : "Purchase Price:"}`,
          `€${formData.purchasePrice?.toFixed(2) || "0.00"}/kg`,
        ],
        [
          `${language === "el" ? "Συνολικό Κόστος:" : "Total Cost:"}`,
          `€${results.totalCosts?.toLocaleString("el-GR") || "0"}`,
        ],
        [
          `${language === "el" ? "Κόστος/kg:" : "Cost per kg:"}`,
          `€${results.costPerKg?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Τιμή Πώλησης:" : "Selling Price:"}`,
          `€${results.finalPrice?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Περιθώριο ��έρδους:" : "Profit Margin:"}`,
          `${results.profitMargin?.toFixed(1) || "0"}%`,
        ],
        [
          `${language === "el" ? "Καθαρό Κέρδος:" : "Net Profit:"}`,
          `€${results.grossProfit?.toLocaleString("el-GR") || "0"}`,
        ],
      ];

      costInfo.forEach(([label, value]) => {
        pdf.text(label, leftMargin, yPosition);
        pdf.text(value, leftMargin + 50, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 10;

      // Processing Information
      if (formData.processingPhases && formData.processingPhases.length > 0) {
        pdf.setFontSize(14);
        pdf.setTextColor(59, 130, 246);
        pdf.text(
          language === "el" ? "ΦΑΣΕΙΣ ΕΠΕΞΕΡΓΑΣΙΑΣ" : "PROCESSING PHASES",
          leftMargin,
          yPosition,
        );
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        formData.processingPhases.forEach((phase: any, index: number) => {
          pdf.text(`${index + 1}. ${phase.name}`, leftMargin, yPosition);
          yPosition += lineHeight;
          pdf.text(
            `   ${language === "el" ? "Απώλειες:" : "Loss:"} ${phase.lossPercentage}%`,
            leftMargin,
            yPosition,
          );
          yPosition += lineHeight;
          pdf.text(
            `   ${language === "el" ? "Κόστος:" : "Cost:"} €${phase.costPerKg}/kg`,
            leftMargin,
            yPosition,
          );
          yPosition += lineHeight;
          if (phase.description) {
            pdf.text(`   ${phase.description}`, leftMargin, yPosition);
            yPosition += lineHeight;
          }
          yPosition += 3;
        });
      }

      // Add new page if needed
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }

      // Check if we need a new page
      if (yPosition > 220) {
        pdf.addPage();
        yPosition = 20;
      }

      // Financial Analysis Section
      pdf.setFontSize(16);
      pdf.setTextColor(16, 185, 129);
      pdf.text(
        language === "el" ? "ΧΡΗΜΑΤΟΟΙΚΟΝΟΜΙΚΗ ΑΝΑΛΥΣΗ" : "FINANCIAL ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text(
        language === "el" ? "Κόστη και Τιμολόγηση" : "Costs and Pricing",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const costAnalysis = [
        [
          `${language === "el" ? "Τιμή Αγοράς:" : "Purchase Price:"}`,
          `€${formData.purchasePrice?.toFixed(2) || "0.00"}/kg`,
        ],
        [
          `${language === "el" ? "Στοχευμένη Τιμή:" : "Target Price:"}`,
          `€${formData.targetSellingPrice?.toFixed(2) || "0.00"}/kg`,
        ],
        [
          `${language === "el" ? "Συνολικό Κόστος:" : "Total Cost:"}`,
          `€${results.totalCosts?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Κόστος ανά kg:" : "Cost per kg:"}`,
          `€${results.costPerKg?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Κόστος ανά τεμάχιο:" : "Cost per unit:"}`,
          `€${results.costPerUnit?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Break-even Τιμή:" : "Break-even Price:"}`,
          `€${results.breakEvenPrice?.toFixed(2) || "0.00"}/kg`,
        ],
        [
          `${language === "el" ? "Συνιστώμενη Τιμή:" : "Recommended Price:"}`,
          `€${results.recommendedPrice?.toFixed(2) || "0.00"}/kg`,
        ],
      ];

      costAnalysis.forEach(([label, value]) => {
        pdf.text(label, leftMargin, yPosition);
        pdf.text(String(value), leftMargin + 70, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 10;

      // Profitability Analysis
      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text(
        language === "el" ? "Ανάλυση Κερδοφορίας" : "Profitability Analysis",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const profitabilityData = [
        [
          `${language === "el" ? "Καθαρή Τιμή:" : "Net Price:"}`,
          `€${results.netPrice?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "ΦΠΑ:" : "VAT Amount:"}`,
          `€${results.vatAmount?.toFixed(2) || "0.00"} (${formData.vatRate || 0}%)`,
        ],
        [
          `${language === "el" ? "Τελική Τιμή:" : "Final Price:"}`,
          `€${results.finalPrice?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Μικτό Κέρδος:" : "Gross Profit:"}`,
          `€${results.grossProfit?.toFixed(2) || "0.00"}`,
        ],
        [
          `${language === "el" ? "Περιθώριο Κέρδους:" : "Profit Margin:"}`,
          `${results.profitMargin?.toFixed(1) || "0.0"}%`,
        ],
        [
          `${language === "el" ? "Ανταγωνιστική Θέση:" : "Competitive Position:"}`,
          results.competitivePosition || "Average",
        ],
        [
          `${language === "el" ? "Βαθμός Απόδοσης:" : "Efficiency Score:"}`,
          `${results.efficiencyScore?.toFixed(1) || "0.0"}%`,
        ],
      ];

      profitabilityData.forEach(([label, value]) => {
        pdf.text(label, leftMargin, yPosition);
        pdf.text(String(value), leftMargin + 70, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 15;

      // Cost Breakdown Section
      if (results.breakdown) {
        pdf.setFontSize(12);
        pdf.setTextColor(59, 130, 246);
        pdf.text(
          language === "el"
            ? "Ανάλυση Κόστους κατά Κατηγορία"
            : "Cost Breakdown by Category",
          leftMargin,
          yPosition,
        );
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        const costBreakdown = [
          [
            `${language === "el" ? "Πρώτες Ύλες:" : "Materials:"}`,
            `€${results.breakdown.materials?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.materials / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
          [
            `${language === "el" ? "Εργατικά:" : "Labor:"}`,
            `€${results.breakdown.labor?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.labor / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
          [
            `${language === "el" ? "Επεξεργασία:" : "Processing:"}`,
            `€${results.breakdown.processing?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.processing / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
          [
            `${language === "el" ? "Μεταφορά:" : "Transport:"}`,
            `€${results.breakdown.transport?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.transport / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
          [
            `${language === "el" ? "Γενικά Έξοδα:" : "Overhead:"}`,
            `€${results.breakdown.overhead?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.overhead / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
          [
            `${language === "el" ? "Συσκευασία:" : "Packaging:"}`,
            `€${results.breakdown.packaging?.toFixed(2) || "0.00"}`,
            `${results.totalCosts > 0 ? ((results.breakdown.packaging / results.totalCosts) * 100).toFixed(1) : "0.0"}%`,
          ],
        ];

        costBreakdown.forEach(([label, amount, percentage]) => {
          pdf.text(label, leftMargin, yPosition);
          pdf.text(String(amount), leftMargin + 50, yPosition);
          pdf.text(String(percentage), leftMargin + 80, yPosition);
          yPosition += lineHeight;
        });

        yPosition += 15;
      }

      // Process Analysis Section
      pdf.setFontSize(12);
      pdf.setTextColor(59, 130, 246);
      pdf.text(
        language === "el" ? "Ανάλυση Επεξεργασίας" : "Processing Analysis",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const processAnalysis = [
        [
          `${language === "el" ? "Συνολικές Απώλειες:" : "Total Losses:"}`,
          `${results.totalLossPercentage?.toFixed(1) || "0.0"}%`,
        ],
        [
          `${language === "el" ? "Glazing:" : "Glazing:"}`,
          `${formData.glazingPercentage || 0}%`,
        ],
        [
          `${language === "el" ? "Τύπος Glazing:" : "Glazing Type:"}`,
          formData.glazingType || "none",
        ],
        [
          `${language === "el" ? "Αρχικό Βάρος:" : "Initial Weight:"}`,
          `${results.rawWeight?.toFixed(1) || "0.0"} kg`,
        ],
        [
          `${language === "el" ? "Καθαρό Βάρος:" : "Net Weight:"}`,
          `${results.netWeight?.toFixed(1) || "0.0"} kg`,
        ],
        [
          `${language === "el" ? "Απόδοση:" : "Yield:"}`,
          `${results.rawWeight > 0 ? ((results.netWeight / results.rawWeight) * 100).toFixed(1) : "0.0"}%`,
        ],
      ];

      processAnalysis.forEach(([label, value]) => {
        pdf.text(label, leftMargin, yPosition);
        pdf.text(String(value), leftMargin + 60, yPosition);
        yPosition += lineHeight;
      });

      yPosition += 15;

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        `${language === "el" ? "Δημιουργήθηκε από" : "Generated by"} KostoPro - Alexandros Kopanakis`,
        leftMargin,
        280,
      );
      pdf.text(`${new Date().toLocaleString("el-GR")}`, rightMargin - 40, 280);

      // Save PDF
      const fileName = `kostopro-${formData.productName?.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "report"}-${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);

      toast.success(
        language === "el"
          ? "Η αναφορά PDF δημιουργήθηκε επιτυχώς!"
          : "PDF report generated successfully!",
      );
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error(
        language === "el"
          ? "Σφάλμα κατά τη δημιουργία PDF"
          : "Error generating PDF",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <FileText className="w-5 h-5 text-red-600" />
          </div>
          <span>{language === "el" ? "Εξαγωγή PDF" : "PDF Export"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          {language === "el"
            ? "Δημιουργήστε μια πλήρη αναφορά κοστολόγησης σε μορφή PDF"
            : "Generate a comprehensive costing report in PDF format"}
        </div>

        {results ? (
          <div className="space-y-3">
            <div className="text-xs text-gray-500 space-y-1">
              <div>
                ✓{" "}
                {language === "el"
                  ? "Στοιχεία προϊόντος"
                  : "Product information"}
              </div>
              <div>
                ✓ {language === "el" ? "Ανάλυση κόστους" : "Cost analysis"}
              </div>
              <div>
                ✓{" "}
                {language === "el"
                  ? "Φάσεις επεξεργασίας"
                  : "Processing phases"}
              </div>
              <div>
                ✓{" "}
                {language === "el"
                  ? "Οικονομικά αποτελέσματα"
                  : "Financial results"}
              </div>
            </div>

            <Button
              onClick={generatePDF}
              className="w-full bg-red-600 hover:bg-red-700"
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isExporting
                ? language === "el"
                  ? "Δημιουργία..."
                  : "Generating..."
                : language === "el"
                  ? "Κατέβασμα PDF"
                  : "Download PDF"}
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <FileCheck className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">
              {language === "el"
                ? "Εκτελέστε υπολογισμό για να ενεργοποιηθεί η εξαγωγή PDF"
                : "Run calculation to enable PDF export"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFExport;
