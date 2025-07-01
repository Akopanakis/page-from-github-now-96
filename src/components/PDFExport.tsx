import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Loader2,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { libraryLoader } from "@/utils/libraryLoader";
import { toast } from "@/components/ui/sonner";
// Import jsPDF for type checking, but use dynamic loading
import { jsPDF } from "jspdf";

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
  const { language, t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  // Helper functions for calculations
  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return `€${safeAmount.toLocaleString(
      language === "el" ? "el-GR" : "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    const safeValue = isFinite(value) ? value : 0;
    return `${safeValue.toFixed(decimals)}%`;
  };

  const formatWeight = (weight: number) => {
    const safeWeight = isFinite(weight) ? weight : 0;
    return `${safeWeight.toLocaleString(language === "el" ? "el-GR" : "en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })} kg`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "el" ? "el-GR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Advanced calculations for seafood industry
  const calculateAdvancedMetrics = () => {
    const metrics = {
      // Yield calculations
      processingYield:
        results.rawWeight > 0
          ? (results.netWeight / results.rawWeight) * 100
          : 0,
      valueAddedRatio:
        results.finalPrice > 0 && formData.purchasePrice > 0
          ? ((results.finalPrice - formData.purchasePrice) /
              formData.purchasePrice) *
            100
          : 0,

      // Efficiency metrics
      costEfficiencyRatio:
        results.netWeight > 0 ? results.totalCosts / results.netWeight : 0,
      profitPerKg:
        results.netWeight > 0 ? results.grossProfit / results.netWeight : 0,

      // Market positioning
      competitiveIndex:
        results.breakEvenPrice > 0
          ? results.finalPrice / results.breakEvenPrice
          : 1,
      priceFlexibility:
        results.recommendedPrice > 0 && results.breakEvenPrice > 0
          ? ((results.recommendedPrice - results.breakEvenPrice) /
              results.breakEvenPrice) *
            100
          : 0,

      // Risk analysis
      breakEvenVolume:
        results.costPerKg > 0 ? results.totalCosts / results.costPerKg : 0,
      marginOfSafety:
        results.finalPrice > 0 && results.breakEvenPrice > 0
          ? ((results.finalPrice - results.breakEvenPrice) /
              results.finalPrice) *
            100
          : 0,

      // Quality metrics
      qualityPremium:
        results.finalPrice > 8 ? ((results.finalPrice - 8) / 8) * 100 : 0,
      freshnessFactor: 100 - (results.totalLossPercentage || 0),

      // Sustainability metrics
      transportEfficiency:
        results.breakdown?.transport > 0
          ? results.netWeight / (results.breakdown.transport / 100)
          : 0,
      energyIntensity:
        results.breakdown?.processing > 0
          ? results.breakdown.processing / results.netWeight
          : 0,

      // Financial ratios
      returnOnMaterials:
        results.breakdown?.materials > 0
          ? (results.grossProfit / results.breakdown.materials) * 100
          : 0,
      assetTurnover:
        results.totalCosts > 0 ? results.finalPrice / results.totalCosts : 0,
    };

    return metrics;
  };

  // Generate comprehensive recommendations
  const generateRecommendations = () => {
    const metrics = calculateAdvancedMetrics();
    const recommendations = [];

    // Profit margin analysis
    if ((results.profitMargin || 0) < 10) {
      recommendations.push({
        type: "critical",
        title:
          language === "el"
            ? "Κρίσιμο Χαμηλό Περιθώριο"
            : "Critical Low Margin",
        description:
          language === "el"
            ? `Το περιθώριο κέρδους ${formatPercentage(results.profitMargin)} είναι κάτω από το ελάχιστο όριο 10%. Άμεση δράση ��παιτείται.`
            : `Profit margin ${formatPercentage(results.profitMargin)} is below minimum threshold of 10%. Immediate action required.`,
        actions: [
          language === "el"
            ? "Αναθεώρηση τιμολογιακής στρατηγικής"
            : "Review pricing strategy",
          language === "el"
            ? "Μείωση κόστους παραγωγής"
            : "Reduce production costs",
          language === "el"
            ? "Εξεύρεση φθηνότερων προμηθευτών"
            : "Find cheaper suppliers",
        ],
      });
    } else if ((results.profitMargin || 0) < 15) {
      recommendations.push({
        type: "warning",
        title:
          language === "el" ? "Χαμηλό Περιθ��ριο Κέρδους" : "Low Profit Margin",
        description:
          language === "el"
            ? `Το περιθώριο ��έρδους ${formatPercentage(results.profitMargin)} είναι κάτω από το συνιστώμενο 15%.`
            : `Profit margin ${formatPercentage(results.profitMargin)} is below recommended 15%.`,
        actions: [
          language === "el"
            ? "Αύξηση τιμής κατά 5-8%"
            : "Increase price by 5-8%",
          language === "el"
            ? "Βελτιστοποίηση διαδικασιών"
            : "Optimize processes",
          language === "el" ? "Μείωση απωλειών" : "Reduce waste",
        ],
      });
    } else if ((results.profitMargin || 0) > 30) {
      recommendations.push({
        type: "success",
        title:
          language === "el"
            ? "Εξαιρετική Κερδοφορία"
            : "Excellent Profitability",
        description:
          language === "el"
            ? `Το περιθώριο κέρδους ${formatPercentage(results.profitMargin)} είναι εξαιρετικό. Διατηρήστε την στρατηγική.`
            : `Profit margin ${formatPercentage(results.profitMargin)} is excellent. Maintain strategy.`,
        actions: [
          language === "el" ? "Επέκταση παραγωγής" : "Scale production",
          language === "el" ? "Επένδυση σε ποιότητα" : "Invest in quality",
          language === "el"
            ? "Ανάπτυξη νέων προϊόντων"
            : "Develop new products",
        ],
      });
    }

    // Processing efficiency analysis
    if (metrics.processingYield < 70) {
      recommendations.push({
        type: "warning",
        title:
          language === "el"
            ? "Χαμηλή Απόδοση Επεξε��γασίας"
            : "Low Processing Yield",
        description:
          language === "el"
            ? `Η απόδοση επεξεργασίας ${formatPercentage(metrics.processingYield)} είναι χαμηλή. Υπάρχει περιθώριο βελτίωσης.`
            : `Processing yield ${formatPercentage(metrics.processingYield)} is low. There's room for improvement.`,
        actions: [
          language === "el" ? "Εκπαίδευση προσωπικού" : "Train staff",
          language === "el" ? "Βελτίωση εξοπλισμού" : "Upgrade equipment",
          language === "el"
            ? "Βελτιστοποίηση διαδικασιώ��"
            : "Optimize processes",
        ],
      });
    }

    // Cost analysis
    if (
      results.breakdown?.transport &&
      results.breakdown.transport / results.totalCosts > 0.15
    ) {
      recommendations.push({
        type: "info",
        title:
          language === "el" ? "Υψηλά Κόστη Μεταφοράς" : "High Transport Costs",
        description:
          language === "el"
            ? `Τα κόστη μεταφοράς αντιπροσωπεύουν ${formatPercentage((results.breakdown.transport / results.totalCosts) * 100)} του συνολικού κόστους.`
            : `Transport costs represent ${formatPercentage((results.breakdown.transport / results.totalCosts) * 100)} of total costs.`,
        actions: [
          language === "el"
            ? "Εύρεση τοπικών προμηθευτών"
            : "Find local suppliers",
          language === "el" ? "Βελτιστοποίηση διαδρομών" : "Optimize routes",
          language === "el" ? "Ομαδοποίηση παραγγελιών" : "Consolidate orders",
        ],
      });
    }

    // Market positioning
    if (metrics.competitiveIndex > 1.5) {
      recommendations.push({
        type: "success",
        title:
          language === "el"
            ? "Ισχυρή Θέση στην Αγορά"
            : "Strong Market Position",
        description:
          language === "el"
            ? `Η τιμή σας είναι ανταγωνιστική με δείκτη ${metrics.competitiveIndex.toFixed(2)}.`
            : `Your price is competitive with index ${metrics.competitiveIndex.toFixed(2)}.`,
        actions: [
          language === "el" ? "Διατήρηση ποιότητας" : "Maintain quality",
          language === "el" ? "Ενίσχυση marketing" : "Strengthen marketing",
          language === "el" ? "Επέκταση αγοράς" : "Expand market",
        ],
      });
    }

    // Quality and freshness
    if (metrics.freshnessFactor < 85) {
      recommendations.push({
        type: "warning",
        title: language === "el" ? "Βελτίωση Ποιότητας" : "Quality Improvement",
        description:
          language === "el"
            ? `Ο δείκτης φρεσκάδας ${formatPercentage(metrics.freshnessFactor)} χρειάζεται βελτίωση.`
            : `Freshness factor ${formatPercentage(metrics.freshnessFactor)} needs improvement.`,
        actions: [
          language === "el"
            ? "Βελτίωση ψυκτικής αλυσίδας"
            : "Improve cold chain",
          language === "el" ? "Ταχύτερη επεξεργασία" : "Faster processing",
          language === "el" ? "Καλύτερη αποθήκευση" : "Better storage",
        ],
      });
    }

    // Financial performance
    if (metrics.returnOnMaterials > 50) {
      recommendations.push({
        type: "success",
        title:
          language === "el" ? "Υψηλή Απόδοση Υλικών" : "High Material Return",
        description:
          language === "el"
            ? `Η απόδοση επί των υλικών ${formatPercentage(metrics.returnOnMaterials)} είναι εξαιρετική.`
            : `Return on materials ${formatPercentage(metrics.returnOnMaterials)} is excellent.`,
        actions: [
          language === "el" ? "Αύξηση παραγωγής" : "Increase production",
          language === "el" ? "Επένδυση σε ποσότητα" : "Invest in volume",
          language === "el" ? "Διαπραγμάτευση τιμών" : "Negotiate prices",
        ],
      });
    }

    return recommendations;
  };

  const generateComprehensivePDF = async () => {
    setIsExporting(true);

    try {
      // Load jsPDF library
      await libraryLoader.load("jspdf");

      // Get jsPDF constructor - handle different global variable formats
      const jsPDFConstructor = window.jsPDF || window.jspdf?.jsPDF || jsPDF;
      if (!jsPDFConstructor) {
        throw new Error("jsPDF library not available");
      }

      const pdf = new jsPDFConstructor({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Use default font with proper encoding for Greek
      pdf.setFont("helvetica");
      pdf.setLanguage("el");

      let currentY = 20;
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Helper function to add new page if needed
      const checkPageBreak = (neededHeight: number) => {
        if (currentY + neededHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = 20;
          return true;
        }
        return false;
      };

      // Helper function to add text with proper encoding for Greek
      const addText = (
        text: string,
        x: number,
        y: number,
        options: any = {},
      ) => {
        const {
          fontSize = 10,
          fontStyle = "normal",
          align = "left",
          maxWidth = contentWidth,
          color = [0, 0, 0],
        } = options;

        pdf.setFontSize(fontSize);
        pdf.setFont("helvetica", fontStyle);
        pdf.setTextColor(color[0], color[1], color[2]);

        // Handle Greek text properly - convert to UTF-8 and escape special characters
        let processedText = text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove diacritics if causing issues
          .replace(/[^\x00-\x7F]/g, function (char) {
            // Convert Greek characters to closest Latin equivalent if needed
            const greekToLatin: { [key: string]: string } = {
              α: "a",
              β: "b",
              γ: "g",
              δ: "d",
              ε: "e",
              ζ: "z",
              η: "h",
              θ: "th",
              ι: "i",
              κ: "k",
              λ: "l",
              μ: "m",
              ν: "n",
              ξ: "x",
              ο: "o",
              π: "p",
              ρ: "r",
              σ: "s",
              ς: "s",
              τ: "t",
              υ: "y",
              φ: "f",
              χ: "ch",
              ψ: "ps",
              ω: "w",
              Α: "A",
              Β: "B",
              Γ: "G",
              Δ: "D",
              Ε: "E",
              Ζ: "Z",
              Η: "H",
              Θ: "TH",
              Ι: "I",
              Κ: "K",
              Λ: "L",
              Μ: "M",
              Ν: "N",
              Ξ: "X",
              Ο: "O",
              Π: "P",
              Ρ: "R",
              Σ: "S",
              Τ: "T",
              Υ: "Y",
              Φ: "F",
              Χ: "CH",
              Ψ: "PS",
              Ω: "W",
            };
            return greekToLatin[char] || char;
          });

        // For critical text, keep original Greek but try PDF's internal encoding
        try {
          if (align === "center") {
            pdf.text(text, x, y, { align: "center", maxWidth });
          } else if (align === "right") {
            pdf.text(text, x, y, { align: "right", maxWidth });
          } else {
            pdf.text(text, x, y, { maxWidth });
          }
        } catch (encodingError) {
          // Fallback to processed text if Greek fails
          if (align === "center") {
            pdf.text(processedText, x, y, { align: "center", maxWidth });
          } else if (align === "right") {
            pdf.text(processedText, x, y, { align: "right", maxWidth });
          } else {
            pdf.text(processedText, x, y, { maxWidth });
          }
        }
      };

      // Header with company info
      if (companyInfo?.logoUrl) {
        try {
          pdf.addImage(companyInfo.logoUrl, "PNG", margin, currentY, 30, 15);
        } catch (e) {
          console.warn("Logo could not be added");
        }
      }

      addText(
        companyInfo?.name || "KostoPro Enhanced",
        margin + 35,
        currentY + 8,
        { fontSize: 16, fontStyle: "bold" },
      );

      addText(
        language === "el"
          ? "ΑΝΑΦ��ΡΑ ΚΟΣΤΟΛΟΓΗΣΗΣ ΑΛΙΕΥΤΙΚΩΝ ΠΡΟΪΟΝΤΩΝ"
          : "SEAFOOD COSTING ANALYSIS REPORT",
        pageWidth / 2,
        currentY + 25,
        {
          fontSize: 14,
          fontStyle: "bold",
          align: "center",
          color: [0, 100, 200],
        },
      );

      currentY += 40;

      // Report info
      addText(
        `${language === "el" ? "Ημερομηνία:" : "Date:"} ${formatDate(new Date())}`,
        margin,
        currentY,
        { fontSize: 9 },
      );
      addText(
        `${language === "el" ? "Αναφορά #:" : "Report #:"} ${Date.now().toString().slice(-6)}`,
        pageWidth - margin,
        currentY,
        { fontSize: 9, align: "right" },
      );

      currentY += 15;

      // Product Information Section
      checkPageBreak(60);

      // Section header
      pdf.setFillColor(240, 248, 255);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el" ? "1. ΣΤΟΙΧΕΙΑ ΠΡΟΪΟΝΤΟΣ" : "1. PRODUCT INFORMATION",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [0, 100, 200] },
      );

      currentY += 20;

      // Product details in two columns
      const col1X = margin;
      const col2X = margin + contentWidth / 2;

      addText(
        `${language === "el" ? "Όνομα:" : "Name:"} ${formData.productName || "N/A"}`,
        col1X,
        currentY,
        { fontSize: 10, fontStyle: "bold" },
      );
      addText(
        `${language === "el" ? "Τύπος:" : "Type:"} ${formData.productType || "N/A"}`,
        col2X,
        currentY,
      );

      currentY += 8;

      addText(
        `${language === "el" ? "Προέλευση:" : "Origin:"} ${formData.origin || "N/A"}`,
        col1X,
        currentY,
      );
      addText(
        `${language === "el" ? "Ποιότητα:" : "Quality:"} ${formData.quality || "N/A"}`,
        col2X,
        currentY,
      );

      currentY += 8;

      addText(
        `${language === "el" ? "Βάρος μονάδας:" : "Unit weight:"} ${formatWeight(formData.weight || 0)}`,
        col1X,
        currentY,
      );
      addText(
        `${language === "el" ? "Ποσότητα:" : "Quantity:"} ${(formData.quantity || 0).toLocaleString()}`,
        col2X,
        currentY,
      );

      currentY += 8;

      addText(
        `${language === "el" ? "Συνολικό βάρος:" : "Total weight:"} ${formatWeight(results.rawWeight || 0)}`,
        col1X,
        currentY,
        { fontStyle: "bold" },
      );
      addText(
        `${language === "el" ? "Τιμή ��γοράς:" : "Purchase price:"} ${formatCurrency(formData.purchasePrice || 0)}/kg`,
        col2X,
        currentY,
        { fontStyle: "bold" },
      );

      currentY += 20;

      // Financial Summary Section
      checkPageBreak(80);

      pdf.setFillColor(240, 255, 240);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el" ? "2. ΟΙΚΟΝΟΜΙΚΗ ΣΥΝΟΨΗ" : "2. FINANCIAL SUMMARY",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [0, 150, 0] },
      );

      currentY += 20;

      // Key metrics in a grid
      const metrics = [
        {
          label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
          value: formatCurrency(results.totalCosts || 0),
          important: true,
        },
        {
          label: language === "el" ? "Κόστος ανά kg" : "Cost per kg",
          value: formatCurrency(results.costPerKg || 0),
          important: true,
        },
        {
          label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
          value: formatPercentage(results.profitMargin || 0),
          important: true,
        },
        {
          label: language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
          value: formatCurrency(results.grossProfit || 0),
          important: true,
        },
        {
          label: language === "el" ? "Σημείο Ισοζυγίας" : "Break-even Price",
          value: formatCurrency(results.breakEvenPrice || 0),
          important: false,
        },
        {
          label: language === "el" ? "Προτεινόμενη Τιμή" : "Recommended Price",
          value: formatCurrency(results.recommendedPrice || 0),
          important: false,
        },
      ];

      // Draw metrics in 2x3 grid
      for (let i = 0; i < metrics.length; i++) {
        const row = Math.floor(i / 2);
        const col = i % 2;
        const x = margin + col * (contentWidth / 2);
        const y = currentY + row * 15;

        if (metrics[i].important) {
          pdf.setFillColor(255, 255, 240);
          pdf.rect(x, y - 3, contentWidth / 2 - 5, 10, "F");
        }

        addText(`${metrics[i].label}:`, x + 2, y + 3, { fontSize: 9 });
        addText(metrics[i].value, x + contentWidth / 2 - 7, y + 3, {
          fontSize: 9,
          fontStyle: "bold",
          align: "right",
        });
      }

      currentY += 60;

      // Cost Breakdown Section
      checkPageBreak(100);

      pdf.setFillColor(255, 248, 240);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el" ? "3. ΑΝΑΛΥΣΗ ΚΟΣΤΟΥΣ" : "3. COST BREAKDOWN",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [200, 100, 0] },
      );

      currentY += 20;

      // Cost breakdown
      const costItems = [
        {
          category: language === "el" ? "Αγορά Προϊόντος" : "Product Purchase",
          value: results.breakdown?.purchase || 0,
          percentage:
            results.totalCosts > 0
              ? ((results.breakdown?.purchase || 0) / results.totalCosts) * 100
              : 0,
        },
        {
          category: language === "el" ? "Επεξεργασία" : "Processing",
          value: results.breakdown?.processing || 0,
          percentage:
            results.totalCosts > 0
              ? ((results.breakdown?.processing || 0) / results.totalCosts) *
                100
              : 0,
        },
        {
          category: language === "el" ? "Μεταφορά" : "Transport",
          value: results.breakdown?.transport || 0,
          percentage:
            results.totalCosts > 0
              ? ((results.breakdown?.transport || 0) / results.totalCosts) * 100
              : 0,
        },
        {
          category: language === "el" ? "Λοιπά" : "Other",
          value: results.breakdown?.other || 0,
          percentage:
            results.totalCosts > 0
              ? ((results.breakdown?.other || 0) / results.totalCosts) * 100
              : 0,
        },
      ];

      costItems.forEach((item, index) => {
        const y = currentY + index * 10;

        addText(item.category, margin, y, { fontSize: 9 });
        addText(formatCurrency(item.value), margin + 80, y, {
          fontSize: 9,
          align: "right",
        });
        addText(formatPercentage(item.percentage), margin + 120, y, {
          fontSize: 9,
          align: "right",
        });

        // Progress bar
        const barWidth = 50;
        const barHeight = 3;
        const barX = margin + 130;
        const fillWidth = (item.percentage / 100) * barWidth;

        pdf.setFillColor(240, 240, 240);
        pdf.rect(barX, y - 2, barWidth, barHeight, "F");
        pdf.setFillColor(100, 150, 200);
        pdf.rect(barX, y - 2, fillWidth, barHeight, "F");
      });

      currentY += 50;

      // Processing Analysis
      checkPageBreak(80);

      pdf.setFillColor(248, 240, 255);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el"
          ? "4. ΑΝΑΛΥΣΗ ΕΠΕΞΕΡΓΑΣΙΑΣ"
          : "4. PROCESSING ANALYSIS",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [150, 0, 150] },
      );

      currentY += 20;

      const advancedMetrics = calculateAdvancedMetrics();

      addText(
        `${language === "el" ? "Απόδοση Επεξεργασίας:" : "Processing Yield:"} ${formatPercentage(advancedMetrics.processingYield)}`,
        margin,
        currentY,
        { fontSize: 10, fontStyle: "bold" },
      );
      addText(
        `${language === "el" ? "Δείκτης Προστιθέμενης Αξίας:" : "Value Added Ratio:"} ${formatPercentage(advancedMetrics.valueAddedRatio)}`,
        col2X,
        currentY,
        { fontSize: 10, fontStyle: "bold" },
      );

      currentY += 12;

      addText(
        `${language === "el" ? "Αρχικό Βάρος:" : "Initial Weight:"} ${formatWeight(results.rawWeight || 0)}`,
        margin,
        currentY,
      );
      addText(
        `${language === "el" ? "Τελικό Βάρος:" : "Final Weight:"} ${formatWeight(results.netWeight || 0)}`,
        col2X,
        currentY,
      );

      currentY += 10;

      addText(
        `${language === "el" ? "Συνολικές Απώλειες:" : "Total Losses:"} ${formatPercentage(((results.rawWeight - results.netWeight) / results.rawWeight) * 100)}`,
        margin,
        currentY,
      );
      addText(
        `${language === "el" ? "Περιθώριο Ασφαλείας:" : "Safety Margin:"} ${formatPercentage(advancedMetrics.marginOfSafety)}`,
        col2X,
        currentY,
      );

      currentY += 25;

      // Start new page for recommendations
      pdf.addPage();
      currentY = 20;

      // Smart Recommendations Section - Enhanced
      pdf.setFillColor(255, 240, 240);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el"
          ? "5. ΕΞΥΠΝΕΣ ΣΥΣΤΑΣΕΙΣ & ΣΤΡΑΤΗΓΙΚΗ"
          : "5. SMART RECOMMENDATIONS & STRATEGY",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [200, 0, 0] },
      );

      currentY += 25;

      const recommendations = generateRecommendations();

      if (recommendations.length === 0) {
        addText(
          language === "el"
            ? "Όλοι οι δείκτες είναι εντός των προτύπων. Συνεχίστε την τρέχουσα στρατηγική."
            : "All indicators are within standards. Continue current strategy.",
          margin,
          currentY,
          { fontSize: 10, color: [0, 150, 0] },
        );
        currentY += 15;
      } else {
        recommendations.forEach((rec, index) => {
          checkPageBreak(40);

          // Recommendation header with icon
          let iconColor = [100, 100, 100];
          let bgColor = [240, 240, 240];

          switch (rec.type) {
            case "critical":
              iconColor = [200, 0, 0];
              bgColor = [255, 240, 240];
              break;
            case "warning":
              iconColor = [200, 150, 0];
              bgColor = [255, 250, 240];
              break;
            case "success":
              iconColor = [0, 150, 0];
              bgColor = [240, 255, 240];
              break;
            case "info":
              iconColor = [0, 100, 200];
              bgColor = [240, 248, 255];
              break;
          }

          // Background
          pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
          pdf.rect(margin, currentY - 3, contentWidth, 30, "F");

          // Title
          addText(`${index + 1}. ${rec.title}`, margin + 5, currentY + 5, {
            fontSize: 11,
            fontStyle: "bold",
            color: iconColor,
          });

          // Description
          currentY += 12;
          const descriptionLines = pdf.splitTextToSize(
            rec.description,
            contentWidth - 10,
          );
          descriptionLines.forEach((line: string, lineIndex: number) => {
            addText(line, margin + 5, currentY + lineIndex * 6, {
              fontSize: 9,
            });
          });

          currentY += descriptionLines.length * 6 + 5;

          // Actions
          addText(
            language === "el"
              ? "Προτεινόμενες Ενέργειες:"
              : "Recommended Actions:",
            margin + 5,
            currentY,
            { fontSize: 9, fontStyle: "bold" },
          );

          currentY += 8;

          rec.actions.forEach((action: string, actionIndex: number) => {
            addText(`• ${action}`, margin + 10, currentY + actionIndex * 6, {
              fontSize: 8,
            });
          });

          currentY += rec.actions.length * 6 + 10;
        });
      }

      // Market Analysis Section
      checkPageBreak(60);

      pdf.setFillColor(240, 255, 255);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el"
          ? "6. ΑΝΑΛΥΣΗ ΑΓΟΡΑΣ & ΑΝΤΑΓΩΝΙΣΜΟΥ"
          : "6. MARKET & COMPETITIVE ANALYSIS",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [0, 150, 150] },
      );

      currentY += 20;

      // Market metrics
      addText(
        `${language === "el" ? "Ανταγωνιστικός Δείκτης:" : "Competitive Index:"} ${advancedMetrics.competitiveIndex.toFixed(2)}`,
        margin,
        currentY,
        { fontSize: 10, fontStyle: "bold" },
      );

      currentY += 10;

      addText(
        `${language === "el" ? "Ευελιξία Τι��ολόγησης:" : "Price Flexibility:"} ${formatPercentage(advancedMetrics.priceFlexibility)}`,
        margin,
        currentY,
      );

      currentY += 10;

      addText(
        `${language === "el" ? "Δείκτης Ποιότητας:" : "Quality Index:"} ${formatPercentage(advancedMetrics.qualityPremium)}`,
        margin,
        currentY,
      );

      currentY += 25;

      // Risk Assessment
      pdf.setFillColor(255, 245, 240);
      pdf.rect(margin, currentY - 5, contentWidth, 12, "F");
      addText(
        language === "el" ? "7. ΑΞΙΟΛΟΓΗΣΗ ΚΙΝΔΥΝΟΥ" : "7. RISK ASSESSMENT",
        margin + 5,
        currentY + 3,
        { fontSize: 12, fontStyle: "bold", color: [200, 100, 0] },
      );

      currentY += 20;

      const riskLevel =
        (results.profitMargin || 0) < 10
          ? "high"
          : (results.profitMargin || 0) < 15
            ? "medium"
            : "low";

      const riskText =
        language === "el"
          ? {
              high: "Υψηλός Κίνδυνος",
              medium: "Μέτριος Κίνδυνος",
              low: "Χαμηλός Κίνδυνος",
            }
          : {
              high: "High Risk",
              medium: "Medium Risk",
              low: "Low Risk",
            };

      const riskColor =
        riskLevel === "high"
          ? [200, 0, 0]
          : riskLevel === "medium"
            ? [200, 150, 0]
            : [0, 150, 0];

      addText(
        `${language === "el" ? "Επίπεδο Κινδύνου:" : "Risk Level:"} ${riskText[riskLevel as keyof typeof riskText]}`,
        margin,
        currentY,
        { fontSize: 11, fontStyle: "bold", color: riskColor },
      );

      currentY += 12;

      addText(
        `${language === "el" ? "Όγκος Ισοζυγίας:" : "Break-even Volume:"} ${formatWeight(advancedMetrics.breakEvenVolume)}`,
        margin,
        currentY,
      );

      currentY += 25;

      // Footer with signature area
      const footerY = pageHeight - 40;
      pdf.setDrawColor(150, 150, 150);
      pdf.line(margin, footerY, pageWidth - margin, footerY);

      addText(
        language === "el"
          ? "Αναφορά παραχθείσα από KostoPro Enhanced"
          : "Report generated by KostoPro Enhanced",
        margin,
        footerY + 8,
        { fontSize: 8, color: [100, 100, 100] },
      );

      addText(formatDate(new Date()), pageWidth - margin, footerY + 8, {
        fontSize: 8,
        align: "right",
        color: [100, 100, 100],
      });

      // Signature lines
      addText(
        language === "el" ? "Υπογραφή Αναλυτή:" : "Analyst Signature:",
        margin,
        footerY + 20,
        { fontSize: 8 },
      );
      pdf.line(margin + 40, footerY + 22, margin + 120, footerY + 22);

      addText(
        language === "el" ? "Ημερομηνία:" : "Date:",
        pageWidth - margin - 80,
        footerY + 20,
        { fontSize: 8 },
      );
      pdf.line(
        pageWidth - margin - 50,
        footerY + 22,
        pageWidth - margin,
        footerY + 22,
      );

      // Save the PDF
      const fileName = `KostoPro_${language === "el" ? "Αναφορα" : "Report"}_${formData.productName || "Προϊον"}_${new Date().toISOString().slice(0, 10)}.pdf`;
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
      <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
        <CardTitle className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-red-600" />
          {language === "el" ? "Εξαγωγή PDF Αναφοράς" : "PDF Report Export"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              {language === "el" ? "Περιεχόμενα Αναφοράς" : "Report Contents"}
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                •{" "}
                {language === "el"
                  ? "Στοιχεία προϊόντος και προμηθευτή"
                  : "Product and supplier information"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Πλήρη οικονομική ανάλυση"
                  : "Complete financial analysis"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Ανάλυση κόστους και κερδοφορίας"
                  : "Cost and profitability breakdown"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Προχωρημένους δείκτες απόδοσης"
                  : "Advanced performance metrics"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Έξυπνες συστάσεις βελτιστοποίησης"
                  : "Smart optimization recommendations"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Ανάλυση αγοράς και αν��αγωνισμού"
                  : "Market and competitive analysis"}
              </li>
              <li>
                •{" "}
                {language === "el" ? "Αξιολόγηση κινδύνου" : "Risk assessment"}
              </li>
              <li>
                •{" "}
                {language === "el"
                  ? "Στρατηγικές προτάσεις"
                  : "Strategic recommendations"}
              </li>
            </ul>
          </div>

          {results && Object.keys(results).length > 0 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">
                      {language === "el" ? "Δεδομένα" : "Data"}
                    </span>
                  </div>
                  <div className="text-green-600">
                    {language === "el" ? "Έτοιμα" : "Ready"}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">
                      {language === "el" ? "Υπολογισμοί" : "Calculations"}
                    </span>
                  </div>
                  <div className="text-green-600">
                    {language === "el" ? "Ολοκληρωμένοι" : "Complete"}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">
                      {language === "el" ? "Συστάσεις" : "Recommendations"}
                    </span>
                  </div>
                  <div className="text-green-600">
                    {language === "el" ? "Διαθέσιμες" : "Available"}
                  </div>
                </div>
              </div>

              <Button
                onClick={generateComprehensivePDF}
                disabled={isExporting}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {language === "el"
                      ? "Δημιουργία PDF..."
                      : "Generating PDF..."}
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    {language === "el"
                      ? "Λήψη Πλήρους Αναφοράς PDF"
                      : "Download Complete PDF Report"}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">
                  {language === "el"
                    ? "Απαιτούνται Υπολογισμοί"
                    : "Calculations Required"}
                </span>
              </div>
              <p className="text-yellow-700 text-sm">
                {language === "el"
                  ? "Παρακαλώ συμπληρώστε τα στοιχεία και εκτελέστε υπολογισμό πριν τη δημιουργία αναφοράς."
                  : "Please fill in the data and perform calculations before generating the report."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
