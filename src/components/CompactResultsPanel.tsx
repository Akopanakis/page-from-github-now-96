
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface CompactResultsPanelProps {
  results: CalculationResults;
  formData: FormData;
  className?: string;
}

const CompactResultsPanel: React.FC<CompactResultsPanelProps> = ({
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

  // Key metrics with proper property names
  const keyMetrics = [
    {
      id: "total_cost",
      label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
      value: formatCurrency(results.totalCost || 0),
      icon: DollarSign,
      color: "blue",
      trend: (results.totalCost || 0) > (results.totalCost || 0) * 0.9 ? "up" : "stable",
    },
    {
      id: "profit_margin",
      label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: formatPercentage(results.profitMargin || 0),
      icon: TrendingUp,
      color: "green",
      trend: (results.profitMargin || 0) > 15 ? "up" : "down",
    },
    {
      id: "cost_per_kg",
      label: language === "el" ? "Κόστος/kg" : "Cost per kg",
      value: formatCurrency(results.costPerKg || 0),
      icon: BarChart3,
      color: "purple",
      trend: (results.costPerKg || 0) < 10 ? "up" : "down",
    },
    {
      id: "efficiency",
      label: language === "el" ? "Αποδοτικότητα" : "Efficiency",
      value: formatPercentage(results.efficiencyScore || 0),
      icon: Target,
      color: "orange",
      trend: (results.efficiencyScore || 0) > 80 ? "up" : "down",
    },
  ];

  // Cost breakdown with proper property names
  const costBreakdown = [
    {
      category: language === "el" ? "Πρώτες Ύλες" : "Materials",
      amount: results.breakdown?.materials || 0,
      percentage: results.totalCost > 0 ? ((results.breakdown?.materials || 0) / results.totalCost) * 100 : 0,
      color: "bg-blue-500",
    },
    {
      category: language === "el" ? "Εργατικά" : "Labor", 
      amount: results.breakdown?.labor || 0,
      percentage: results.totalCost > 0 ? ((results.breakdown?.labor || 0) / results.totalCost) * 100 : 0,
      color: "bg-green-500",
    },
    {
      category: language === "el" ? "Μεταφορά" : "Transport",
      amount: results.breakdown?.transport || 0,
      percentage: results.totalCost > 0 ? ((results.breakdown?.transport || 0) / results.totalCost) * 100 : 0,
      color: "bg-purple-500",
    },
    {
      category: language === "el" ? "Λοιπά" : "Other",
      amount: results.breakdown?.overhead || 0,
      percentage: results.totalCost > 0 ? ((results.breakdown?.overhead || 0) / results.totalCost) * 100 : 0,
      color: "bg-orange-500",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getStatusColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "border-green-200 bg-green-50";
      case "down":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className={className}>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>
              {language === "el" ? "Σύνοψη Αποτελεσμάτων" : "Results Summary"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {keyMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.id}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(metric.trend)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-gray-600" />
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              );
            })}
          </div>

          {/* Cost Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown"}
            </h3>
            <div className="space-y-3">
              {costBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-medium text-gray-700">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatCurrency(item.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPercentage(item.percentage)}
                      </div>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">
                {formatCurrency(results.totalCost || 0)}
              </div>
              <div className="text-sm text-blue-600">
                {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">
                {formatCurrency(results.grossProfit || 0)}
              </div>
              <div className="text-sm text-green-600">
                {language === "el" ? "Μικτό Κέρδος" : "Gross Profit"}
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-700">
                {formatCurrency(results.recommendedSellingPrice || 0)}
              </div>
              <div className="text-sm text-purple-600">
                {language === "el" ? "Συνιστώμενη Τιμή" : "Recommended Price"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompactResultsPanel;
