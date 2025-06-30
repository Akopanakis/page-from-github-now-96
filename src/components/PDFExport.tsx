import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { libraryLoader } from "@/utils/libraryLoader";
import { toast } from "@/components/ui/sonner";
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
  const { language } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  // Helper functions for calculations
  const formatCurrency = (amount: number) => {
    const safeAmount = isFinite(amount) ? amount : 0;
    return `€${safeAmount.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercentage = (value: number, decimals = 1) => {
    const safeValue = isFinite(value) ? value : 0;
    return `${safeValue.toFixed(decimals)}%`;
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
        results.finalPrice > 8 ? ((results.finalPrice - 8) / 8) * 100 : 0, // Assuming €8 as baseline
      freshnessFactor: 100 - (results.totalLossPercentage || 0), // Inverse of losses

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
      costStructureIndex:
        results.totalCosts > 0
          ? {
              materialIntensity:
                ((results.breakdown?.materials || 0) / results.totalCosts) *
                100,
              laborIntensity:
                ((results.breakdown?.labor || 0) / results.totalCosts) * 100,
              overheadRatio:
                ((results.breakdown?.overhead || 0) / results.totalCosts) * 100,
            }
          : { materialIntensity: 0, laborIntensity: 0, overheadRatio: 0 },
    };

    return metrics;
  };

  // Industry benchmarks for comparison
  const getIndustryBenchmarks = () => {
    const productType = formData.productType || "fish";
    const benchmarks = {
      fish: {
        avgProcessingYield: 75,
        avgProfitMargin: 15,
        avgCostPerKg: 12,
        avgLossPercentage: 15,
        qualityStandards: { A: 90, B: 75, C: 60 },
      },
      shellfish: {
        avgProcessingYield: 65,
        avgProfitMargin: 25,
        avgCostPerKg: 18,
        avgLossPercentage: 20,
        qualityStandards: { A: 85, B: 70, C: 55 },
      },
      cephalopods: {
        avgProcessingYield: 70,
        avgProfitMargin: 20,
        avgCostPerKg: 15,
        avgLossPercentage: 18,
        qualityStandards: { A: 88, B: 72, C: 58 },
      },
      processed: {
        avgProcessingYield: 85,
        avgProfitMargin: 30,
        avgCostPerKg: 22,
        avgLossPercentage: 10,
        qualityStandards: { A: 95, B: 80, C: 65 },
      },
    };

    return (
      benchmarks[productType as keyof typeof benchmarks] || benchmarks.fish
    );
  };

  // Risk assessment based on calculations
  const performRiskAssessment = () => {
    const risks = [];
    const metrics = calculateAdvancedMetrics();
    const benchmarks = getIndustryBenchmarks();

    if (metrics.processingYield < benchmarks.avgProcessingYield - 10) {
      risks.push({
        level: "high",
        category: "Operational",
        description:
          language === "el"
            ? "Χαμηλή απόδοση επεξεργασίας - κίνδυνος αυξημένων απωλειών"
            : "Low processing yield - risk of increased losses",
      });
    }

    if (results.profitMargin < 10) {
      risks.push({
        level: "high",
        category: "Financial",
        description:
          language === "el"
            ? "Χαμηλό περιθώριο κέρδους - κίνδυνος ζημιών"
            : "Low profit margin - risk of losses",
      });
    }

    if (metrics.marginOfSafety < 20) {
      risks.push({
        level: "medium",
        category: "Market",
        description:
          language === "el"
            ? "Χαμηλό περιθώριο ασφαλείας - ευαισθησία στις αλλαγές τιμών"
            : "Low safety margin - sensitive to price changes",
      });
    }

    if ((results.breakdown?.transport || 0) > results.totalCosts * 0.15) {
      risks.push({
        level: "medium",
        category: "Logistics",
        description:
          language === "el"
            ? "Υψηλό κόστος μεταφοράς - εξάρτηση από τιμές καυσίμων"
            : "High transport costs - dependency on fuel prices",
      });
    }

    return risks;
  };

  // Generate seasonal adjustment recommendations
  const generateSeasonalRecommendations = () => {
    const currentMonth = new Date().getMonth() + 1;
    const seasonalFactors = {
      winter: { months: [12, 1, 2], factor: 1.15, demand: "high" },
      spring: { months: [3, 4, 5], factor: 0.95, demand: "medium" },
      summer: { months: [6, 7, 8], factor: 0.85, demand: "low" },
      autumn: { months: [9, 10, 11], factor: 1.05, demand: "medium" },
    };

    let currentSeason = "spring";
    for (const [season, data] of Object.entries(seasonalFactors)) {
      if (data.months.includes(currentMonth)) {
        currentSeason = season;
        break;
      }
    }

    return {
      season: currentSeason,
      factor:
        seasonalFactors[currentSeason as keyof typeof seasonalFactors].factor,
      demand:
        seasonalFactors[currentSeason as keyof typeof seasonalFactors].demand,
      adjustedPrice:
        results.finalPrice *
        seasonalFactors[currentSeason as keyof typeof seasonalFactors].factor,
    };
  };

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
      console.log("Initializing comprehensive PDF generation...");

      let pdf;
      try {
        pdf = new jsPDF("p", "mm", "a4");
        console.log("jsPDF initialized successfully");
      } catch (directImportError) {
        await libraryLoader.waitForLibrary("jspdf", 5000);
        if (!window.jsPDF) {
          throw new Error("jsPDF library could not be loaded");
        }
        pdf = new window.jsPDF("p", "mm", "a4");
      }

      // Set up document properties
      pdf.setFont("helvetica");
      pdf.setProperties({
        title: `KostoPro Professional Analysis - ${formData.productName || "Seafood Costing"}`,
        subject: "Comprehensive Seafood Costing & Profitability Analysis",
        author: "KostoPro by Alexandros Kopanakis",
        creator: "KostoPro Enhanced Professional Edition",
        producer: "jsPDF",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const leftMargin = 20;
      const rightMargin = pageWidth - 20;
      const centerX = pageWidth / 2;
      const lineHeight = 6;
      let yPosition = 20;

      // Advanced metrics and benchmarks
      const metrics = calculateAdvancedMetrics();
      const benchmarks = getIndustryBenchmarks();
      const risks = performRiskAssessment();
      const seasonalData = generateSeasonalRecommendations();

      // ==================== PAGE 1: EXECUTIVE SUMMARY ====================

      // Professional Header with Gradient Effect (simulated)
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, pageWidth, 40, "F");

      // White overlay for gradient effect
      pdf.setFillColor(255, 255, 255);
      pdf.setGState(new pdf.GState({ opacity: 0.1 }));
      pdf.rect(0, 20, pageWidth, 20, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Company Logo Area
      if (companyInfo?.logoUrl) {
        try {
          // Simplified logo placeholder
          pdf.setFillColor(255, 255, 255);
          pdf.circle(leftMargin + 10, 20, 8, "F");
          pdf.setTextColor(59, 130, 246);
          pdf.setFontSize(10);
          pdf.text("LOGO", leftMargin + 6, 22);
        } catch (error) {
          console.warn("Logo not added");
        }
      }

      // Main Title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text("KOSTOPRO", centerX, 18, { align: "center" });

      pdf.setFontSize(16);
      pdf.text(
        language === "el"
          ? "ΕΠΑΓΓΕΛΜΑΤΙΚΗ ΑΝΑΛΥΣΗ ΚΟΣΤΟΛΟΓΗΣΗΣ"
          : "PROFESSIONAL COSTING ANALYSIS",
        centerX,
        28,
        { align: "center" },
      );

      pdf.setFontSize(12);
      pdf.text(
        language === "el"
          ? "Αλιευτικά Προϊόντα & Θαλασσινά"
          : "Seafood & Marine Products",
        centerX,
        35,
        { align: "center" },
      );

      yPosition = 55;

      // Document Info Box
      pdf.setFillColor(248, 250, 252);
      pdf.rect(leftMargin, yPosition - 5, rightMargin - leftMargin, 25, "F");
      pdf.setDrawColor(226, 232, 240);
      pdf.rect(leftMargin, yPosition - 5, rightMargin - leftMargin, 25, "S");

      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(11);

      // Two column layout for document info
      const colWidth = (rightMargin - leftMargin) / 2;

      // Left column
      pdf.text(
        `${language === "el" ? "Προϊόν:" : "Product:"} ${formData.productName || "N/A"}`,
        leftMargin + 5,
        yPosition + 3,
      );
      pdf.text(
        `${language === "el" ? "Τύπος:" : "Type:"} ${formData.productType || "N/A"}`,
        leftMargin + 5,
        yPosition + 9,
      );
      pdf.text(
        `${language === "el" ? "Ημερομηνία:" : "Date:"} ${new Date().toLocaleDateString("el-GR")}`,
        leftMargin + 5,
        yPosition + 15,
      );

      // Right column
      pdf.text(
        `${language === "el" ? "Αναφορά #:" : "Report #:"} KP-${Date.now().toString().slice(-6)}`,
        leftMargin + colWidth + 5,
        yPosition + 3,
      );
      pdf.text(
        `${language === "el" ? "Σελίδες:" : "Pages:"} 4`,
        leftMargin + colWidth + 5,
        yPosition + 9,
      );
      pdf.text(
        `${language === "el" ? "Έκδοση:" : "Version:"} 2.1 Pro`,
        leftMargin + colWidth + 5,
        yPosition + 15,
      );

      yPosition += 35;

      // Executive Summary Section
      pdf.setTextColor(16, 185, 129);
      pdf.setFontSize(16);
      pdf.text(
        language === "el" ? "ΕΚΤΕΛΕΣΤΙΚΗ ΣΥΝΟΨΗ" : "EXECUTIVE SUMMARY",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);

      const executiveSummary =
        language === "el"
          ? `Η παρούσα αναφορά παρέχει ολοκληρωμένη ανάλυση κοστολόγησης για το προϊόν "${formData.productName || "N/A"}".
Βάσει των υπολογισμών, το συνολικό κόστος παραγωγής ανέρχεται σε ${formatCurrency(results.totalCosts || 0)},
με περιθώριο κέρδους ${formatPercentage(results.profitMargin || 0)} και ανταγωνιστική θέση "${results.competitivePosition || "Μέτρια"}".

Κύρια Ευρήματα:
• Απόδοση επεξεργασίας: ${formatPercentage(metrics.processingYield)}
• Κόστος ανά κιλό: ${formatCurrency(results.costPerKg || 0)}
• Περιθώριο ασφαλείας: ${formatPercentage(metrics.marginOfSafety)}
• Βαθμολογία κινδύνου: ${risks.length > 2 ? "Υψηλός" : risks.length > 0 ? "Μέτριος" : "Χαμηλός"}`
          : `This report provides comprehensive costing analysis for "${formData.productName || "N/A"}".
Based on calculations, total production cost amounts to ${formatCurrency(results.totalCosts || 0)},
with profit margin ${formatPercentage(results.profitMargin || 0)} and competitive position "${results.competitivePosition || "Average"}".

Key Findings:
• Processing yield: ${formatPercentage(metrics.processingYield)}
• Cost per kg: ${formatCurrency(results.costPerKg || 0)}
• Safety margin: ${formatPercentage(metrics.marginOfSafety)}
• Risk score: ${risks.length > 2 ? "High" : risks.length > 0 ? "Medium" : "Low"}`;

      const summaryLines = pdf.splitTextToSize(
        executiveSummary,
        rightMargin - leftMargin,
      );
      pdf.text(summaryLines, leftMargin, yPosition);
      yPosition += summaryLines.length * 4 + 10;

      // Key Performance Indicators Grid
      pdf.setTextColor(168, 85, 247);
      pdf.setFontSize(14);
      pdf.text(
        language === "el"
          ? "ΒΑΣΙΚΟΙ ΔΕΙΚΤΕΣ ΑΠΟΔΟΣΗΣ (KPIs)"
          : "KEY PERFORMANCE INDICATORS (KPIs)",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      // Create KPI boxes
      const kpis = [
        {
          label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
          value: formatCurrency(results.totalCosts || 0),
          status: "neutral",
        },
        {
          label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
          value: formatPercentage(results.profitMargin || 0),
          status:
            (results.profitMargin || 0) > 20
              ? "good"
              : (results.profitMargin || 0) > 10
                ? "warning"
                : "bad",
        },
        {
          label:
            language === "el" ? "Απόδοση Επεξεργασίας" : "Processing Yield",
          value: formatPercentage(metrics.processingYield),
          status:
            metrics.processingYield > benchmarks.avgProcessingYield
              ? "good"
              : "warning",
        },
        {
          label: language === "el" ? "Ανταγωνιστικότητα" : "Competitiveness",
          value: results.competitivePosition || "N/A",
          status: "neutral",
        },
      ];

      const boxWidth = (rightMargin - leftMargin) / 2 - 5;
      const boxHeight = 20;

      kpis.forEach((kpi, index) => {
        const x = leftMargin + (index % 2) * (boxWidth + 10);
        const y = yPosition + Math.floor(index / 2) * (boxHeight + 5);

        // Status color
        const colors = {
          good: [34, 197, 94],
          warning: [251, 146, 60],
          bad: [239, 68, 68],
          neutral: [107, 114, 128],
        };
        const color = colors[kpi.status as keyof typeof colors];

        // Box background
        pdf.setFillColor(248, 250, 252);
        pdf.rect(x, y, boxWidth, boxHeight, "F");

        // Status indicator
        pdf.setFillColor(...color);
        pdf.rect(x, y, 3, boxHeight, "F");

        // Text
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(8);
        pdf.text(kpi.label, x + 5, y + 6);

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(kpi.value, x + 5, y + 15);
      });

      yPosition += 50;

      // Industry Comparison Chart (text-based)
      pdf.setTextColor(59, 130, 246);
      pdf.setFontSize(14);
      pdf.text(
        language === "el"
          ? "ΣΥΓΚΡΙΣΗ ΜΕ ΚΛΑΔΙΚΑ STANDARDS"
          : "INDUSTRY BENCHMARKING",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      const comparisons = [
        {
          metric:
            language === "el" ? "Απόδοση Επεξεργασίας" : "Processing Yield",
          our: metrics.processingYield,
          industry: benchmarks.avgProcessingYield,
          unit: "%",
        },
        {
          metric: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
          our: results.profitMargin || 0,
          industry: benchmarks.avgProfitMargin,
          unit: "%",
        },
        {
          metric: language === "el" ? "Κόστος/kg" : "Cost per kg",
          our: results.costPerKg || 0,
          industry: benchmarks.avgCostPerKg,
          unit: "€",
        },
      ];

      comparisons.forEach((comp, index) => {
        const barY = yPosition + index * 15;
        const barWidth = 100;
        const maxValue = Math.max(comp.our, comp.industry) * 1.2;

        // Metric label
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(9);
        pdf.text(comp.metric, leftMargin, barY + 4);

        // Our value bar
        pdf.setFillColor(59, 130, 246);
        const ourBarWidth = (comp.our / maxValue) * barWidth;
        pdf.rect(leftMargin + 80, barY, ourBarWidth, 8, "F");

        // Industry average line
        pdf.setDrawColor(239, 68, 68);
        const industryX =
          leftMargin + 80 + (comp.industry / maxValue) * barWidth;
        pdf.line(industryX, barY, industryX, barY + 8);

        // Values
        pdf.setTextColor(59, 130, 246);
        pdf.setFontSize(8);
        pdf.text(
          `${language === "el" ? "Εμείς:" : "Us:"} ${comp.our.toFixed(1)}${comp.unit}`,
          leftMargin + 185,
          barY + 4,
        );

        pdf.setTextColor(239, 68, 68);
        pdf.text(
          `${language === "el" ? "Κλάδος:" : "Industry:"} ${comp.industry.toFixed(1)}${comp.unit}`,
          leftMargin + 185,
          barY + 9,
        );
      });

      yPosition += 60;

      // Risk Assessment Preview
      pdf.setTextColor(220, 38, 127);
      pdf.setFontSize(14);
      pdf.text(
        language === "el" ? "ΑΞΙΟΛΟΓΗΣΗ ΚΙΝΔΥΝΩΝ" : "RISK ASSESSMENT",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      if (risks.length > 0) {
        risks.slice(0, 3).forEach((risk, index) => {
          const riskColor =
            risk.level === "high" ? [239, 68, 68] : [251, 146, 60];
          pdf.setFillColor(...riskColor);
          pdf.circle(leftMargin + 3, yPosition + index * 8, 2, "F");

          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(9);
          pdf.text(
            `${risk.category}: ${risk.description}`,
            leftMargin + 8,
            yPosition + index * 8 + 1,
          );
        });
        yPosition += risks.length * 8 + 5;
      } else {
        pdf.setTextColor(34, 197, 94);
        pdf.setFontSize(10);
        pdf.text(
          language === "el"
            ? "✓ Δεν εντοπίστηκαν σημαντικοί κίνδυνοι"
            : "✓ No significant risks identified",
          leftMargin,
          yPosition,
        );
        yPosition += 15;
      }

      // ==================== PAGE 2: DETAILED COST ANALYSIS ====================
      pdf.addPage();
      yPosition = 20;

      // Page header
      pdf.setFillColor(245, 245, 245);
      pdf.rect(0, 0, pageWidth, 15, "F");
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(10);
      pdf.text("KostoPro Professional Analysis", leftMargin, 10);
      pdf.text("Page 2 of 4", rightMargin - 30, 10);

      yPosition = 25;

      // Detailed Cost Breakdown
      pdf.setTextColor(16, 185, 129);
      pdf.setFontSize(18);
      pdf.text(
        language === "el"
          ? "ΛΕΠΤΟΜΕΡΗΣ ΑΝΑΛΥΣΗ ΚΟΣΤΟΥΣ"
          : "DETAILED COST ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 15;

      // Cost Structure Pie Chart (text representation)
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(12);
      pdf.text(
        language === "el" ? "Διάρθρωση Κόστους" : "Cost Structure",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      if (results.breakdown) {
        const totalCost = results.totalCosts || 1;
        const costItems = [
          {
            name: language === "el" ? "Πρώτες Ύλες" : "Materials",
            amount: results.breakdown.materials || 0,
          },
          {
            name: language === "el" ? "Εργατικά" : "Labor",
            amount: results.breakdown.labor || 0,
          },
          {
            name: language === "el" ? "Επεξεργασία" : "Processing",
            amount: results.breakdown.processing || 0,
          },
          {
            name: language === "el" ? "Μεταφορά" : "Transport",
            amount: results.breakdown.transport || 0,
          },
          {
            name: language === "el" ? "Γενικά Έξοδα" : "Overhead",
            amount: results.breakdown.overhead || 0,
          },
          {
            name: language === "el" ? "Συσκευασία" : "Packaging",
            amount: results.breakdown.packaging || 0,
          },
        ].filter((item) => item.amount > 0);

        costItems.forEach((item, index) => {
          const percentage = (item.amount / totalCost) * 100;
          const barWidth = (percentage / 100) * 120;

          // Item name and value
          pdf.setFontSize(9);
          pdf.setTextColor(0, 0, 0);
          pdf.text(item.name, leftMargin, yPosition);
          pdf.text(formatCurrency(item.amount), leftMargin + 150, yPosition);
          pdf.text(formatPercentage(percentage), leftMargin + 180, yPosition);

          // Visual bar
          pdf.setFillColor(59 + index * 30, 130, 246 - index * 20);
          pdf.rect(leftMargin + 50, yPosition - 3, barWidth, 6, "F");

          yPosition += 10;
        });
      }

      yPosition += 15;

      // Cost Efficiency Analysis
      pdf.setTextColor(168, 85, 247);
      pdf.setFontSize(14);
      pdf.text(
        language === "el"
          ? "ΑΝΑΛΥΣΗ ΑΠΟΔΟΤΙΚΟΤΗΤΑΣ ΚΟΣΤΟΥΣ"
          : "COST EFFICIENCY ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      const efficiencyMetrics = [
        {
          label:
            language === "el"
              ? "Αποδοτικότητα Κόστους"
              : "Cost Efficiency Ratio",
          value: metrics.costEfficiencyRatio,
          unit: "€/kg",
          benchmark: benchmarks.avgCostPerKg,
          description:
            language === "el"
              ? "Χαμηλότερη τιμή = καλύτερη αποδοτικότητα"
              : "Lower value = better efficiency",
        },
        {
          label: language === "el" ? "Κέρδος ανά Κιλό" : "Profit per Kg",
          value: metrics.profitPerKg,
          unit: "€/kg",
          benchmark: benchmarks.avgCostPerKg * 0.2,
          description:
            language === "el"
              ? "Κέρδος που παράγεται ανά κιλό προϊόντος"
              : "Profit generated per kg of product",
        },
        {
          label:
            language === "el"
              ? "Δείκτης Προστιθέμενης Αξίας"
              : "Value Added Ratio",
          value: metrics.valueAddedRatio,
          unit: "%",
          benchmark: 50,
          description:
            language === "el"
              ? "Ποσοστό αύξησης αξίας από επεξεργασία"
              : "Percentage value increase from processing",
        },
        {
          label:
            language === "el"
              ? "Δείκτης Ανταγωνιστικότητας"
              : "Competitive Index",
          value: metrics.competitiveIndex,
          unit: "x",
          benchmark: 1.2,
          description:
            language === "el"
              ? "1.0 = break-even, >1.2 = ανταγωνιστικό"
              : "1.0 = break-even, >1.2 = competitive",
        },
      ];

      efficiencyMetrics.forEach((metric, index) => {
        const boxY = yPosition + Math.floor(index / 2) * 35;
        const boxX = leftMargin + (index % 2) * (pageWidth / 2 - 20);
        const boxWidth = pageWidth / 2 - 30;

        // Box background
        pdf.setFillColor(248, 250, 252);
        pdf.rect(boxX, boxY, boxWidth, 30, "F");
        pdf.setDrawColor(226, 232, 240);
        pdf.rect(boxX, boxY, boxWidth, 30, "S");

        // Title
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(9);
        pdf.text(metric.label, boxX + 3, boxY + 6);

        // Value
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(14);
        pdf.text(
          `${metric.value.toFixed(2)}${metric.unit}`,
          boxX + 3,
          boxY + 16,
        );

        // Benchmark comparison
        const comparison = metric.value > metric.benchmark ? "↑" : "↓";
        const compColor =
          metric.value > metric.benchmark ? [34, 197, 94] : [239, 68, 68];
        pdf.setTextColor(...compColor);
        pdf.setFontSize(12);
        pdf.text(comparison, boxX + boxWidth - 15, boxY + 16);

        // Description
        pdf.setTextColor(107, 114, 128);
        pdf.setFontSize(7);
        const descLines = pdf.splitTextToSize(metric.description, boxWidth - 6);
        pdf.text(descLines, boxX + 3, boxY + 24);
      });

      yPosition += 80;

      // Break-even Analysis
      pdf.setTextColor(220, 38, 127);
      pdf.setFontSize(14);
      pdf.text(
        language === "el"
          ? "ΑΝΑΛΥΣΗ ΝΕΚΡΟΥ ΣΗΜΕΙΟΥ (BREAK-EVEN)"
          : "BREAK-EVEN ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      const breakEvenData = [
        {
          label: language === "el" ? "Break-even Τιμή" : "Break-even Price",
          value: formatCurrency(results.breakEvenPrice || 0),
        },
        {
          label: language === "el" ? "Break-even Όγκος" : "Break-even Volume",
          value: `${metrics.breakEvenVolume.toFixed(0)} kg`,
        },
        {
          label: language === "el" ? "Περιθώριο Ασφαλείας" : "Safety Margin",
          value: formatPercentage(metrics.marginOfSafety),
        },
        {
          label: language === "el" ? "Ευελιξία Τιμής" : "Price Flexibility",
          value: formatPercentage(metrics.priceFlexibility),
        },
      ];

      const tableStartY = yPosition;

      // Table header
      pdf.setFillColor(71, 85, 105);
      pdf.rect(leftMargin, tableStartY, rightMargin - leftMargin, 8, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.text(
        language === "el" ? "Μέτρηση" : "Metric",
        leftMargin + 2,
        tableStartY + 5,
      );
      pdf.text(
        language === "el" ? "Αξία" : "Value",
        leftMargin + 100,
        tableStartY + 5,
      );

      yPosition = tableStartY + 8;

      breakEvenData.forEach((item, index) => {
        const bgColor = index % 2 === 0 ? [248, 250, 252] : [255, 255, 255];
        pdf.setFillColor(...bgColor);
        pdf.rect(leftMargin, yPosition, rightMargin - leftMargin, 8, "F");

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(9);
        pdf.text(item.label, leftMargin + 2, yPosition + 5);
        pdf.text(item.value, leftMargin + 100, yPosition + 5);

        yPosition += 8;
      });

      // ==================== PAGE 3: RISK & QUALITY ANALYSIS ====================
      pdf.addPage();
      yPosition = 20;

      // Page header
      pdf.setFillColor(245, 245, 245);
      pdf.rect(0, 0, pageWidth, 15, "F");
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(10);
      pdf.text("KostoPro Professional Analysis", leftMargin, 10);
      pdf.text("Page 3 of 4", rightMargin - 30, 10);

      yPosition = 25;

      // Risk Analysis Section
      pdf.setTextColor(239, 68, 68);
      pdf.setFontSize(18);
      pdf.text(
        language === "el"
          ? "ΑΝΑΛΥΣΗ ΚΙΝΔΥΝΩΝ & ΠΟΙΟΤΗΤΑΣ"
          : "RISK & QUALITY ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 15;

      // Detailed Risk Assessment
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(12);
      pdf.text(
        language === "el"
          ? "Λεπτομερής Αξιολόγηση Κινδύνων"
          : "Detailed Risk Assessment",
        leftMargin,
        yPosition,
      );
      yPosition += 10;

      if (risks.length > 0) {
        risks.forEach((risk, index) => {
          // Risk level indicator
          const riskColors = {
            high: [239, 68, 68],
            medium: [251, 146, 60],
            low: [34, 197, 94],
          };
          const color = riskColors[risk.level as keyof typeof riskColors];

          pdf.setFillColor(...color);
          pdf.rect(leftMargin, yPosition, 5, 15, "F");

          // Risk details box
          pdf.setFillColor(248, 250, 252);
          pdf.rect(
            leftMargin + 5,
            yPosition,
            rightMargin - leftMargin - 5,
            15,
            "F",
          );
          pdf.setDrawColor(226, 232, 240);
          pdf.rect(
            leftMargin + 5,
            yPosition,
            rightMargin - leftMargin - 5,
            15,
            "S",
          );

          // Risk text
          pdf.setTextColor(0, 0, 0);
          pdf.setFontSize(10);
          pdf.text(
            `${risk.level.toUpperCase()} RISK - ${risk.category}`,
            leftMargin + 8,
            yPosition + 6,
          );

          pdf.setFontSize(9);
          pdf.setTextColor(71, 85, 105);
          const riskLines = pdf.splitTextToSize(
            risk.description,
            rightMargin - leftMargin - 15,
          );
          pdf.text(riskLines, leftMargin + 8, yPosition + 11);

          yPosition += 20;
        });
      } else {
        pdf.setFillColor(220, 252, 231);
        pdf.rect(leftMargin, yPosition, rightMargin - leftMargin, 15, "F");
        pdf.setTextColor(34, 197, 94);
        pdf.setFontSize(12);
        pdf.text(
          language === "el"
            ? "✓ Χαμηλός κίνδυνος - Δεν εντοπίστηκαν σημαντικά θέματα"
            : "✓ Low Risk - No significant issues identified",
          leftMargin + 5,
          yPosition + 8,
        );
        yPosition += 20;
      }

      yPosition += 10;

      // Quality Analysis
      pdf.setTextColor(34, 197, 94);
      pdf.setFontSize(14);
      pdf.text(
        language === "el" ? "ΑΝΑΛΥΣΗ ΠΟΙΟΤΗΤΑΣ" : "QUALITY ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      const qualityMetrics = [
        {
          name: language === "el" ? "Φρεσκάδα" : "Freshness",
          score: metrics.freshnessFactor,
          benchmark: 85,
          description:
            language === "el"
              ? "Βάσει απωλειών επεξεργασίας"
              : "Based on processing losses",
        },
        {
          name: language === "el" ? "Premium Δυναμικό" : "Premium Potential",
          score: Math.min(100, metrics.qualityPremium + 50),
          benchmark: 75,
          description:
            language === "el"
              ? "Δυναμικό premium τιμολόγησης"
              : "Premium pricing potential",
        },
        {
          name:
            language === "el"
              ? "Αποδοτικότητα Μεταφοράς"
              : "Transport Efficiency",
          score: Math.min(100, metrics.transportEfficiency / 10),
          benchmark: 70,
          description:
            language === "el"
              ? "Αποδοτικότητα logistics"
              : "Logistics efficiency",
        },
      ];

      qualityMetrics.forEach((quality, index) => {
        const barY = yPosition + index * 20;

        // Quality name
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.text(quality.name, leftMargin, barY);

        // Progress bar background
        pdf.setFillColor(229, 231, 235);
        pdf.rect(leftMargin + 60, barY - 3, 100, 8, "F");

        // Progress bar fill
        const fillWidth = (quality.score / 100) * 100;
        const barColor =
          quality.score >= quality.benchmark ? [34, 197, 94] : [251, 146, 60];
        pdf.setFillColor(...barColor);
        pdf.rect(leftMargin + 60, barY - 3, fillWidth, 8, "F");

        // Score text
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(9);
        pdf.text(`${quality.score.toFixed(1)}%`, leftMargin + 165, barY + 1);

        // Description
        pdf.setTextColor(107, 114, 128);
        pdf.setFontSize(8);
        pdf.text(quality.description, leftMargin, barY + 8);
      });

      yPosition += 70;

      // Seasonal Analysis
      pdf.setTextColor(168, 85, 247);
      pdf.setFontSize(14);
      pdf.text(
        language === "el" ? "ΕΠΟΧΙΑΚΗ ΑΝΑΛΥΣΗ" : "SEASONAL ANALYSIS",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      // Current season info
      pdf.setFillColor(243, 244, 246);
      pdf.rect(leftMargin, yPosition, rightMargin - leftMargin, 25, "F");
      pdf.setDrawColor(209, 213, 219);
      pdf.rect(leftMargin, yPosition, rightMargin - leftMargin, 25, "S");

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.text(
        `${language === "el" ? "Τρέχουσα Εποχή:" : "Current Season:"} ${seasonalData.season} (${language === "el" ? "Ζήτηση" : "Demand"}: ${seasonalData.demand})`,
        leftMargin + 5,
        yPosition + 8,
      );
      pdf.text(
        `${language === "el" ? "Εποχιακός Συντελεστής:" : "Seasonal Factor:"} ${seasonalData.factor}x`,
        leftMargin + 5,
        yPosition + 15,
      );
      pdf.text(
        `${language === "el" ? "Προτεινόμενη Τιμή:" : "Recommended Price:"} ${formatCurrency(seasonalData.adjustedPrice)}`,
        leftMargin + 5,
        yPosition + 22,
      );

      yPosition += 35;

      // Sustainability Metrics
      pdf.setTextColor(34, 197, 94);
      pdf.setFontSize(14);
      pdf.text(
        language === "el" ? "ΔΕΙΚΤΕΣ ΒΙΩΣΙΜΟΤΗΤΑΣ" : "SUSTAINABILITY METRICS",
        leftMargin,
        yPosition,
      );
      yPosition += 12;

      const sustainabilityData = [
        {
          metric: language === "el" ? "Ενεργειακή Ένταση" : "Energy Intensity",
          value: `${metrics.energyIntensity.toFixed(2)} €/kg`,
          status: metrics.energyIntensity < 2 ? "good" : "warning",
        },
        {
          metric:
            language === "el"
              ? "Αποδοτικότητα Μεταφοράς"
              : "Transport Efficiency",
          value: `${metrics.transportEfficiency.toFixed(1)} kg/€`,
          status: metrics.transportEfficiency > 50 ? "good" : "warning",
        },
        {
          metric: language === "el" ? "Ποσοστό Απωλειών" : "Waste Ratio",
          value: formatPercentage(results.totalLossPercentage || 0),
          status: (results.totalLossPercentage || 0) < 15 ? "good" : "warning",
        },
      ];

      sustainabilityData.forEach((item, index) => {
        const iconColor =
          item.status === "good" ? [34, 197, 94] : [251, 146, 60];

        pdf.setFillColor(...iconColor);
        pdf.circle(leftMargin + 5, yPosition + index * 10, 2, "F");

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(9);
        pdf.text(
          `${item.metric}: ${item.value}`,
          leftMargin + 12,
          yPosition + index * 10 + 1,
        );
      });

      // ==================== PAGE 4: RECOMMENDATIONS & CONCLUSIONS ====================
      pdf.addPage();
      yPosition = 20;

      // Page header
      pdf.setFillColor(245, 245, 245);
      pdf.rect(0, 0, pageWidth, 15, "F");
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(10);
      pdf.text("KostoPro Professional Analysis", leftMargin, 10);
      pdf.text("Page 4 of 4", rightMargin - 30, 10);

      yPosition = 25;

      // Recommendations Section
      pdf.setTextColor(16, 185, 129);
      pdf.setFontSize(18);
      pdf.text(
        language === "el"
          ? "ΣΥΣΤΑΣΕΙΣ & ΣΥΜΠΕΡΑΣΜΑΤΑ"
          : "RECOMMENDATIONS & CONCLUSIONS",
        leftMargin,
        yPosition,
      );
      yPosition += 15;

      // Generate smart recommendations based on analysis
      const recommendations = [];

      if (metrics.processingYield < benchmarks.avgProcessingYield) {
        recommendations.push({
          priority: "high",
          category: language === "el" ? "Επεξεργασία" : "Processing",
          title:
            language === "el"
              ? "Βελτίωση Απόδοσης Επεξεργασίας"
              : "Improve Processing Yield",
          description:
            language === "el"
              ? `Η απόδοση ${formatPercentage(metrics.processingYield)} είναι κάτω από τον κλαδικό μέσο όρο (${formatPercentage(benchmarks.avgProcessingYield)}). Προτείνεται επανεξέταση των διαδικασιών επεξεργασίας.`
              : `Yield of ${formatPercentage(metrics.processingYield)} is below industry average (${formatPercentage(benchmarks.avgProcessingYield)}). Review processing procedures recommended.`,
          impact:
            language === "el"
              ? "Πιθανή αύξηση κέρδους 15-25%"
              : "Potential profit increase 15-25%",
        });
      }

      if ((results.profitMargin || 0) < 15) {
        recommendations.push({
          priority: "high",
          category: language === "el" ? "Τιμολόγηση" : "Pricing",
          title:
            language === "el"
              ? "Βελτιστοποίηση Τιμολογιακής Στρατηγικής"
              : "Optimize Pricing Strategy",
          description:
            language === "el"
              ? `Το περιθώριο κέρδους ${formatPercentage(results.profitMargin || 0)} χρειάζεται βελτίωση. Εξετάστε αύξηση τιμής ή μείωση κόστους.`
              : `Profit margin of ${formatPercentage(results.profitMargin || 0)} needs improvement. Consider price increase or cost reduction.`,
          impact:
            language === "el"
              ? "Άμεση βελτίωση κερδοφορίας"
              : "Immediate profitability improvement",
        });
      }

      if (metrics.transportEfficiency < 50) {
        recommendations.push({
          priority: "medium",
          category: language === "el" ? "Logistics" : "Logistics",
          title:
            language === "el"
              ? "Βελτιστοποίηση Εφοδιαστικής Αλυσίδας"
              : "Optimize Supply Chain",
          description:
            language === "el"
              ? "Τα κόστη μεταφοράς είναι υψηλά. Εξετάστε εναλλακτικές διαδρομές ή προμηθευτές."
              : "Transport costs are high. Consider alternative routes or suppliers.",
          impact:
            language === "el" ? "Μείωση κόστους 5-10%" : "Cost reduction 5-10%",
        });
      }

      if (seasonalData.factor > 1.1) {
        recommendations.push({
          priority: "medium",
          category: language === "el" ? "Εποχιακότητα" : "Seasonality",
          title:
            language === "el"
              ? "Εκμετάλλευση Εποχιακών Παραγόντων"
              : "Leverage Seasonal Factors",
          description:
            language === "el"
              ? `Η τρέχουσα εποχή επιτρέπει premium τιμολόγηση (+${formatPercentage((seasonalData.factor - 1) * 100)}). Προσαρμόστε αναλόγως.`
              : `Current season allows premium pricing (+${formatPercentage((seasonalData.factor - 1) * 100)}). Adjust accordingly.`,
          impact:
            language === "el"
              ? "Εποχιακή αύξηση εσόδων"
              : "Seasonal revenue increase",
        });
      }

      // Quality improvement recommendation
      if (metrics.qualityPremium < 30) {
        recommendations.push({
          priority: "medium",
          category: language === "el" ? "Ποιότητα" : "Quality",
          title:
            language === "el"
              ? "Αναβάθμιση Ποιότητας Προϊόντος"
              : "Product Quality Upgrade",
          description:
            language === "el"
              ? "Η βελτίωση της ποιότητας μπορεί να δικαιολογήσει premium τιμολόγηση και αυξημένη κερδοφορία."
              : "Quality improvement can justify premium pricing and increased profitability.",
          impact:
            language === "el"
              ? "Δυναμικό premium 20-40%"
              : "Premium potential 20-40%",
        });
      }

      // Market positioning recommendation
      recommendations.push({
        priority: "low",
        category: language === "el" ? "Στρατηγική" : "Strategy",
        title:
          language === "el"
            ? "Παρακολούθηση Ανταγωνισμού"
            : "Competitive Monitoring",
        description:
          language === "el"
            ? "Τακτική παρακολούθηση των τιμών ανταγωνιστών και προσαρμογή της στρατηγικής τιμολόγησης."
            : "Regular monitoring of competitor prices and pricing strategy adjustment.",
        impact:
          language === "el"
            ? "Διατήρηση ανταγωνιστικότητας"
            : "Maintain competitiveness",
      });

      // Display recommendations
      recommendations.forEach((rec, index) => {
        const priorityColors = {
          high: [239, 68, 68],
          medium: [251, 146, 60],
          low: [34, 197, 94],
        };
        const color =
          priorityColors[rec.priority as keyof typeof priorityColors];

        // Priority indicator
        pdf.setFillColor(...color);
        pdf.rect(leftMargin, yPosition, 5, 35, "F");

        // Recommendation box
        pdf.setFillColor(248, 250, 252);
        pdf.rect(
          leftMargin + 5,
          yPosition,
          rightMargin - leftMargin - 5,
          35,
          "F",
        );
        pdf.setDrawColor(226, 232, 240);
        pdf.rect(
          leftMargin + 5,
          yPosition,
          rightMargin - leftMargin - 5,
          35,
          "S",
        );

        // Category and priority
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(8);
        pdf.text(
          `${rec.category.toUpperCase()} - ${rec.priority.toUpperCase()} PRIORITY`,
          leftMargin + 8,
          yPosition + 5,
        );

        // Title
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.text(rec.title, leftMargin + 8, yPosition + 12);

        // Description
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(8);
        const descLines = pdf.splitTextToSize(
          rec.description,
          rightMargin - leftMargin - 15,
        );
        pdf.text(descLines, leftMargin + 8, yPosition + 18);

        // Impact
        pdf.setTextColor(...color);
        pdf.setFontSize(8);
        pdf.text(`💡 ${rec.impact}`, leftMargin + 8, yPosition + 30);

        yPosition += 40;

        // Check if we need to add more space or new page
        if (yPosition > pageHeight - 60 && index < recommendations.length - 1) {
          // Add space for footer if near end
          return;
        }
      });

      // Final Conclusions
      if (yPosition < pageHeight - 80) {
        yPosition = Math.max(yPosition + 10, pageHeight - 80);

        pdf.setTextColor(59, 130, 246);
        pdf.setFontSize(14);
        pdf.text(
          language === "el" ? "ΤΕΛΙΚΑ ΣΥΜΠΕΡΑΣΜΑΤΑ" : "FINAL CONCLUSIONS",
          leftMargin,
          yPosition,
        );
        yPosition += 10;

        const overallScore =
          ((metrics.processingYield / benchmarks.avgProcessingYield) * 0.3 +
            ((results.profitMargin || 0) / benchmarks.avgProfitMargin) * 0.4 +
            (metrics.marginOfSafety / 30) * 0.3) *
          100;

        const conclusion =
          language === "el"
            ? `Συνολική βαθμολογία: ${overallScore.toFixed(1)}/100. ${
                overallScore > 80
                  ? "Εξαιρετική απόδοση - συνεχίστε τη στρατηγική."
                  : overallScore > 60
                    ? "Καλή απόδοση - υπάρχει περιθώριο βελτίωσης."
                    : "Χρειάζεται βελτίωση - εφαρμόστε τις προτάσεις άμεσα."
              }`
            : `Overall score: ${overallScore.toFixed(1)}/100. ${
                overallScore > 80
                  ? "Excellent performance - continue strategy."
                  : overallScore > 60
                    ? "Good performance - room for improvement."
                    : "Needs improvement - implement recommendations immediately."
              }`;

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        const conclusionLines = pdf.splitTextToSize(
          conclusion,
          rightMargin - leftMargin,
        );
        pdf.text(conclusionLines, leftMargin, yPosition);
      }

      // Professional Footer
      const footerY = pageHeight - 40;

      // Footer background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, footerY, pageWidth, 40, "F");

      // Footer separator
      pdf.setDrawColor(203, 213, 225);
      pdf.line(0, footerY, pageWidth, footerY);

      // Signature section
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(10);
      pdf.text(
        language === "el" ? "Προετοιμάσθηκε από:" : "Prepared by:",
        leftMargin,
        footerY + 10,
      );
      pdf.line(leftMargin + 50, footerY + 10, leftMargin + 120, footerY + 10);

      pdf.text(
        language === "el" ? "Ελέγχθηκε από:" : "Reviewed by:",
        leftMargin,
        footerY + 20,
      );
      pdf.line(leftMargin + 50, footerY + 20, leftMargin + 120, footerY + 20);

      pdf.text(
        language === "el" ? "Εγκρίθηκε από:" : "Approved by:",
        leftMargin,
        footerY + 30,
      );
      pdf.line(leftMargin + 50, footerY + 30, leftMargin + 120, footerY + 30);

      // Company branding
      pdf.setFontSize(8);
      pdf.setTextColor(71, 85, 105);
      pdf.text(
        `${language === "el" ? "Δημιουργήθηκε από" : "Generated by"} KostoPro Professional v2.1`,
        leftMargin + 140,
        footerY + 10,
      );

      pdf.text(
        `${language === "el" ? "Alexandros Kopanakis - Ειδικός Κοστολόγησης Αλιευτικών" : "Alexandros Kopanakis - Seafood Costing Specialist"}`,
        leftMargin + 140,
        footerY + 18,
      );

      pdf.text(
        `${language === "el" ? "Ημερομηνία:" : "Generated:"} ${new Date().toLocaleString("el-GR")}`,
        leftMargin + 140,
        footerY + 26,
      );

      pdf.text(
        "🇬🇷 Made in Greece | www.kostopro.gr",
        leftMargin + 140,
        footerY + 34,
      );

      // Save PDF with improved filename
      const productNameSafe = formData.productName
        ? formData.productName
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9]/g, "_")
            .toLowerCase() || "product"
        : "report";

      const fileName = `kostopro-professional-${productNameSafe}-${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);

      toast.success(
        language === "el"
          ? "Επαγγελματική αναφορά PDF δημιουργήθηκε επιτυχώς!"
          : "Professional PDF report generated successfully!",
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
      <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <span>
            {language === "el"
              ? "Επαγγελματική Εξαγωγή PDF"
              : "Professional PDF Export"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="text-sm text-gray-600">
          {language === "el"
            ? "Δημιουργήστε μια πλήρη επαγγελματική αναφορά 4 σελίδων με λεπτομερή ανάλυση κοστολόγησης"
            : "Generate a complete 4-page professional report with detailed costing analysis"}
        </div>

        {results ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                {language === "el" ? "Περιεχόμενα Αναφοράς" : "Report Contents"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-800">
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Εκτελεστική σύνοψη"
                    : "Executive summary"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Βασικοί δείκτες απόδοσης (KPIs)"
                    : "Key performance indicators"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Σύγκριση με κλαδικά standards"
                    : "Industry benchmarking"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Λεπτομερής ανάλυση κόστους"
                    : "Detailed cost analysis"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Ανάλυση αποδοτικότητας"
                    : "Efficiency analysis"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Break-even ανάλυση"
                    : "Break-even analysis"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Αξιολόγηση κινδύνων"
                    : "Risk assessment"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el" ? "Ανάλυση ποιότητας" : "Quality analysis"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el" ? "Εποχιακή ανάλυση" : "Seasonal analysis"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Δείκτες βιωσιμότητας"
                    : "Sustainability metrics"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Έξυπνες συστάσεις"
                    : "Smart recommendations"}
                </div>
                <div>
                  ✓{" "}
                  {language === "el"
                    ? "Υπογραφές & εγκρίσεις"
                    : "Signatures & approvals"}
                </div>
              </div>
            </div>

            <Button
              onClick={generatePDF}
              disabled={isExporting}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === "el"
                    ? "Δημιουργία PDF..."
                    : "Generating PDF..."}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  {language === "el"
                    ? "Λήψη Επαγγελματικής Αναφοράς PDF"
                    : "Download Professional PDF Report"}
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">
              {language === "el"
                ? "Εκτελέστε υπολογισμό γι�� να ενεργοποιήσετε την εξαγωγή PDF"
                : "Run calculation to enable PDF export"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFExport;
