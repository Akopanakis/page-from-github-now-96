
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  PieChart,
  BarChart3,
  DollarSign,
  Target,
  Calculator,
  Percent,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface EnhancedCostAnalysisProps {
  results: CalculationResults;
  formData: FormData;
}

const EnhancedCostAnalysis: React.FC<EnhancedCostAnalysisProps> = ({
  results,
  formData,
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

  // Cost distribution analysis
  const costCategories = [
    {
      name: language === "el" ? "Πρώτες Ύλες" : "Materials",
      amount: results.breakdown?.materials || 0,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      name: language === "el" ? "Εργατικά" : "Labor",
      amount: results.breakdown?.labor || 0,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      name: language === "el" ? "Επεξεργασία" : "Processing",
      amount: results.breakdown?.processing || 0,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      name: language === "el" ? "Μεταφορά" : "Transport",
      amount: results.breakdown?.transport || 0,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      name: language === "el" ? "Γενικά Έξοδα" : "Overhead",
      amount: results.breakdown?.overhead || 0,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      name: language === "el" ? "Συσκευασία" : "Packaging",
      amount: results.breakdown?.packaging || 0,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
  ];

  const totalCosts = results.totalCost || 0;

  // Key performance indicators
  const kpis = [
    {
      label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
      value: formatCurrency(totalCosts),
      icon: Calculator,
      trend: totalCosts > 5000 ? "high" : totalCosts > 1000 ? "medium" : "low",
    },
    {
      label: language === "el" ? "Κόστος/kg" : "Cost per kg",
      value: formatCurrency(results.costPerKg || 0),
      icon: DollarSign,
      trend:
        (results.costPerKg || 0) > 10
          ? "high"
          : (results.costPerKg || 0) > 5
            ? "medium"
            : "low",
    },
    {
      label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: formatPercentage(results.profitMargin || 0),
      icon: Percent,
      trend:
        (results.profitMargin || 0) > 20
          ? "high"
          : (results.profitMargin || 0) > 10
            ? "medium"
            : "low",
    },
    {
      label: language === "el" ? "Απόδοση" : "Efficiency",
      value: formatPercentage(results.efficiencyScore || 0),
      icon: Target,
      trend:
        (results.efficiencyScore || 0) > 80
          ? "high"
          : (results.efficiencyScore || 0) > 60
            ? "medium"
            : "low",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "high":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "low":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "high":
        return "border-green-200 bg-green-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            {language === "el"
              ? "Βασικοί Δείκτες Απόδοσης"
              : "Key Performance Indicators"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getTrendColor(kpi.trend)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-gray-600" />
                    {getTrendIcon(kpi.trend)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-sm text-gray-600">{kpi.label}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-600" />
            {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costCategories.map((category, index) => {
              const percentage =
                totalCosts > 0 ? (category.amount / totalCosts) * 100 : 0;
              const isSignificant = percentage > 5;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${category.color}`}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {category.name}
                      </span>
                      {isSignificant && (
                        <Badge variant="secondary" className="text-xs">
                          {language === "el" ? "Σημαντικό" : "Significant"}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatCurrency(category.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPercentage(percentage)}
                      </div>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>

          {/* Cost Analysis Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-700">
                  {formatCurrency(
                    costCategories
                      .slice(0, 3)
                      .reduce((sum, cat) => sum + cat.amount, 0),
                  )}
                </div>
                <div className="text-sm text-blue-600">
                  {language === "el" ? "Άμεσα Κόστη" : "Direct Costs"}
                </div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-700">
                  {formatCurrency(
                    costCategories
                      .slice(3)
                      .reduce((sum, cat) => sum + cat.amount, 0),
                  )}
                </div>
                <div className="text-sm text-orange-600">
                  {language === "el" ? "Έμμεσα Κόστη" : "Indirect Costs"}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-700">
                  {formatPercentage(
                    totalCosts > 0
                      ? ((results.grossProfit || 0) / totalCosts) * 100
                      : 0,
                  )}
                </div>
                <div className="text-sm text-green-600">
                  {language === "el" ? "ROI Κόστους" : "Cost ROI"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Metrics */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            {language === "el" ? "Προχωρημένες Μετρήσεις" : "Advanced Metrics"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">
                {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el"
                      ? "Απώλειες Επεξεργασίας"
                      : "Processing Losses"}
                  </span>
                  <span className="font-medium">
                    {formatPercentage(results.totalWastePercentage || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el"
                      ? "Αποδοτικότητα Μετατροπής"
                      : "Conversion Efficiency"}
                  </span>
                  <span className="font-medium">
                    {formatPercentage(
                      results.rawWeight > 0
                        ? ((results.netWeight || 0) / results.rawWeight) * 100
                        : 0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el"
                      ? "Κόστος ανά Μονάδα Παραγωγής"
                      : "Cost per Production Unit"}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(results.costPerUnit || 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">
                {language === "el" ? "Κερδοφορία" : "Profitability"}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el" ? "Break-even Τιμή" : "Break-even Price"}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(results.breakEvenPrice || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el"
                      ? "Συνιστώμενη Τιμή"
                      : "Recommended Price"}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(results.recommendedSellingPrice || 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {language === "el"
                      ? "Πολλαπλασιαστής Κόστους"
                      : "Cost Multiplier"}
                  </span>
                  <span className="font-medium">
                    {results.costPerKg > 0
                      ? (
                          (results.recommendedSellingPrice || 0) / results.costPerKg
                        ).toFixed(2)
                      : "0.00"}
                    x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCostAnalysis;
