
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Info,
  Calculator,
  Percent,
  Activity,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface FinancialRatiosProps {
  results: CalculationResults;
  formData: FormData;
  className?: string;
}

interface FinancialRatio {
  id: string;
  name: string;
  value: number;
  benchmark: number;
  unit: "%" | "€" | "x" | "days";
  category: "profitability" | "efficiency" | "liquidity" | "activity";
  description: string;
  formula: string;
  status: "excellent" | "good" | "average" | "poor";
  trend?: "up" | "down" | "stable";
}

const FinancialRatios: React.FC<FinancialRatiosProps> = ({
  results,
  formData,
  className = "",
}) => {
  const { language } = useLanguage();

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

  const calculateFinancialRatios = useMemo((): FinancialRatio[] => {
    if (!results || !formData) return [];

    const totalRevenue = (results.finalPrice || 0) * (formData.quantity || 1);
    const totalCost = results.totalCost || 0;
    const grossProfit = results.grossProfit || 0;
    const netProfit = grossProfit * 0.85; // Assuming 15% tax rate
    const workingCapital = totalCost * 0.2; // Assume 20% working capital
    const assets = totalCost * 1.5; // Assume asset turnover
    const averageInventory = totalCost * 0.15; // Assume 15% inventory

    return [
      // Profitability Ratios
      {
        id: "gross_margin",
        name: language === "el" ? "Μικτό Περιθώριο" : "Gross Margin",
        value: (grossProfit / totalRevenue) * 100 || 0,
        benchmark: 25,
        unit: "%",
        category: "profitability",
        description:
          language === "el"
            ? "Ποσοστό μικτού κέρδους από τις πωλήσεις"
            : "Percentage of gross profit from sales",
        formula:
          language === "el"
            ? "(Μικτό Κέρδος / Έσοδα) × 100"
            : "(Gross Profit / Revenue) × 100",
        status:
          ((grossProfit / totalRevenue) * 100 || 0) > 30
            ? "excellent"
            : ((grossProfit / totalRevenue) * 100 || 0) > 20
              ? "good"
              : ((grossProfit / totalRevenue) * 100 || 0) > 10
                ? "average"
                : "poor",
        trend: "up",
      },
      {
        id: "net_margin",
        name: language === "el" ? "Καθαρό Περιθώριο" : "Net Margin",
        value: (netProfit / totalRevenue) * 100 || 0,
        benchmark: 15,
        unit: "%",
        category: "profitability",
        description:
          language === "el"
            ? "Ποσοστό καθαρού κέρδους μετά φόρων"
            : "Percentage of net profit after taxes",
        formula:
          language === "el"
            ? "(Καθαρό Κέρδος / Έσοδα) × 100"
            : "(Net Profit / Revenue) × 100",
        status:
          ((netProfit / totalRevenue) * 100 || 0) > 20
            ? "excellent"
            : ((netProfit / totalRevenue) * 100 || 0) > 12
              ? "good"
              : ((netProfit / totalRevenue) * 100 || 0) > 5
                ? "average"
                : "poor",
        trend: "stable",
      },
      {
        id: "roi",
        name: language === "el" ? "Απόδοση Επένδυσης" : "Return on Investment",
        value: (netProfit / totalCost) * 100 || 0,
        benchmark: 20,
        unit: "%",
        category: "profitability",
        description:
          language === "el"
            ? "Απόδοση της επένδυσης σε σχέση με το κόστος"
            : "Return on investment relative to cost",
        formula:
          language === "el"
            ? "(Καθαρό Κέρδος / Συνολικό Κόστος) × 100"
            : "(Net Profit / Total Cost) × 100",
        status:
          ((netProfit / totalCost) * 100 || 0) > 25
            ? "excellent"
            : ((netProfit / totalCost) * 100 || 0) > 15
              ? "good"
              : ((netProfit / totalCost) * 100 || 0) > 8
                ? "average"
                : "poor",
        trend: "up",
      },

      // Efficiency Ratios
      {
        id: "cost_per_kg",
        name: language === "el" ? "Κόστος ανά Κιλό" : "Cost per Kilogram",
        value: results.costPerKg || 0,
        benchmark: 8,
        unit: "€",
        category: "efficiency",
        description:
          language === "el"
            ? "Μέσο κόστος παραγωγής ανά κιλό"
            : "Average production cost per kilogram",
        formula:
          language === "el"
            ? "Συνολικό Κόστος / Καθαρό Βάρος"
            : "Total Cost / Net Weight",
        status:
          (results.costPerKg || 0) < 6
            ? "excellent"
            : (results.costPerKg || 0) < 8
              ? "good"
              : (results.costPerKg || 0) < 12
                ? "average"
                : "poor",
        trend: "down",
      },
      {
        id: "processing_efficiency",
        name:
          language === "el" ? "Απόδοση Επεξεργασίας" : "Processing Efficiency",
        value: (1 - (results.totalWastePercentage || 0) / 100) * 100,
        benchmark: 85,
        unit: "%",
        category: "efficiency",
        description:
          language === "el"
            ? "Ποσοστό διατήρησης υλικού μετά επεξεργασία"
            : "Material retention percentage after processing",
        formula:
          language === "el"
            ? "(1 - Ποσοστό Απωλειών / 100) × 100"
            : "(1 - Loss Percentage / 100) × 100",
        status:
          (1 - (results.totalWastePercentage || 0) / 100) * 100 > 90
            ? "excellent"
            : (1 - (results.totalWastePercentage || 0) / 100) * 100 > 80
              ? "good"
              : (1 - (results.totalWastePercentage || 0) / 100) * 100 > 70
                ? "average"
                : "poor",
        trend: "up",
      },
      {
        id: "asset_turnover",
        name: language === "el" ? "Κυκλοφορία Ενεργητικού" : "Asset Turnover",
        value: totalRevenue / assets || 0,
        benchmark: 1.5,
        unit: "x",
        category: "efficiency",
        description:
          language === "el"
            ? "Αποδοτικότητα χρήσης ενεργητικού"
            : "Efficiency of asset utilization",
        formula:
          language === "el"
            ? "Έσοδα / Συνολικό Ενεργητικό"
            : "Revenue / Total Assets",
        status:
          (totalRevenue / assets || 0) > 2
            ? "excellent"
            : (totalRevenue / assets || 0) > 1.5
              ? "good"
              : (totalRevenue / assets || 0) > 1
                ? "average"
                : "poor",
        trend: "stable",
      },

      // Activity Ratios
      {
        id: "inventory_turnover",
        name:
          language === "el" ? "Κυκλοφορία Αποθέματος" : "Inventory Turnover",
        value: totalCost / averageInventory || 0,
        benchmark: 8,
        unit: "x",
        category: "activity",
        description:
          language === "el"
            ? "Συχνότητα ανανέωσης αποθέματος"
            : "Frequency of inventory renewal",
        formula:
          language === "el"
            ? "Κόστος Πωληθέντων / Μέσο Απόθεμα"
            : "Cost of Goods Sold / Average Inventory",
        status:
          (totalCost / averageInventory || 0) > 10
            ? "excellent"
            : (totalCost / averageInventory || 0) > 6
              ? "good"
              : (totalCost / averageInventory || 0) > 3
                ? "average"
                : "poor",
        trend: "up",
      },
      {
        id: "days_sales_outstanding",
        name:
          language === "el" ? "Ημέρες Εισπράξεων" : "Days Sales Outstanding",
        value: 30, // Assume 30 days collection period
        benchmark: 30,
        unit: "days",
        category: "activity",
        description:
          language === "el"
            ? "Μέσες ημέρες είσπραξης απαιτήσεων"
            : "Average days to collect receivables",
        formula:
          language === "el"
            ? "(Απαιτήσεις / Έσοδα) × 365"
            : "(Receivables / Revenue) × 365",
        status:
          30 < 25
            ? "excellent"
            : 30 < 35
              ? "good"
              : 30 < 45
                ? "average"
                : "poor",
        trend: "stable",
      },
    ];
  }, [results, formData, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "text-green-600 bg-green-100 border-green-300",
      good: "text-blue-600 bg-blue-100 border-blue-300",
      average: "text-yellow-600 bg-yellow-100 border-yellow-300",
      poor: "text-red-600 bg-red-100 border-red-300",
    };
    return colors[status as keyof typeof colors] || colors.average;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "good":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "average":
        return <Info className="w-4 h-4 text-yellow-600" />;
      case "poor":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const categories = [
    {
      id: "profitability",
      name: language === "el" ? "Κερδοφορία" : "Profitability",
      icon: DollarSign,
      color: "green",
    },
    {
      id: "efficiency",
      name: language === "el" ? "Αποδοτικότητα" : "Efficiency",
      icon: Target,
      color: "blue",
    },
    {
      id: "activity",
      name: language === "el" ? "Δραστηριότητα" : "Activity",
      icon: BarChart3,
      color: "purple",
    },
  ];

  const renderRatioCard = (ratio: FinancialRatio) => {
    const progress = Math.min((ratio.value / ratio.benchmark) * 100, 100);
    const progressColor =
      ratio.status === "excellent"
        ? "bg-green-500"
        : ratio.status === "good"
          ? "bg-blue-500"
          : ratio.status === "average"
            ? "bg-yellow-500"
            : "bg-red-500";

    return (
      <Card
        key={ratio.id}
        className="hover:shadow-lg transition-all duration-200"
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
                {ratio.name}
              </h4>
              <p className="text-xs text-gray-600 mb-2">{ratio.description}</p>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              {getStatusIcon(ratio.status)}
              {getTrendIcon(ratio.trend)}
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {ratio.unit === "%"
                  ? formatPercentage(ratio.value)
                  : ratio.unit === "€"
                    ? formatCurrency(ratio.value)
                    : ratio.unit === "x"
                      ? `${ratio.value.toFixed(1)}x`
                      : `${ratio.value.toFixed(0)} ${ratio.unit}`}
              </span>
              <Badge className={`text-xs ${getStatusColor(ratio.status)}`}>
                {language === "el"
                  ? ratio.status === "excellent"
                    ? "Εξαιρετικό"
                    : ratio.status === "good"
                      ? "Καλό"
                      : ratio.status === "average"
                        ? "Μέτριο"
                        : "Χαμηλό"
                  : ratio.status === "excellent"
                    ? "Excellent"
                    : ratio.status === "good"
                      ? "Good"
                      : ratio.status === "average"
                        ? "Average"
                        : "Poor"}
              </Badge>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`${progressColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {language === "el" ? "Στόχος:" : "Target:"} {ratio.benchmark}
                {ratio.unit}
              </span>
              <span>
                {progress.toFixed(0)}%{" "}
                {language === "el" ? "στόχου" : "of target"}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <strong>{language === "el" ? "Τύπος:" : "Formula:"}</strong>{" "}
            {ratio.formula}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!results) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === "el"
              ? "Πραγματ��ποιήστε υπολογισμό για να δείτε τους χρηματοοικονομικούς δείκτες"
              : "Perform calculation to view financial ratios"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Χρηματοοικονομικοί Δείκτες"
                : "Financial Ratios"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {categories.map((category) => {
              const categoryRatios = calculateFinancialRatios.filter(
                (r) => r.category === category.id,
              );
              const avgStatus =
                categoryRatios.length > 0
                  ? categoryRatios.reduce((acc, ratio) => {
                      const scores = {
                        excellent: 4,
                        good: 3,
                        average: 2,
                        poor: 1,
                      };
                      return acc + scores[ratio.status as keyof typeof scores];
                    }, 0) / categoryRatios.length
                  : 0;

              const Icon = category.icon;

              return (
                <Card
                  key={category.id}
                  className="bg-gradient-to-br from-gray-50 to-white"
                >
                  <CardContent className="p-4 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {categoryRatios.length}{" "}
                      {language === "el" ? "δείκτες" : "ratios"}
                    </div>
                    <Progress value={avgStatus * 25} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {language === "el"
                        ? "Μέση Απόδοση"
                        : "Average Performance"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {categories.map((category) => {
            const categoryRatios = calculateFinancialRatios.filter(
              (r) => r.category === category.id,
            );
            if (categoryRatios.length === 0) return null;

            return (
              <div key={category.id} className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <category.icon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryRatios.map(renderRatioCard)}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialRatios;
