import React, { useMemo } from "react";
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
  PieChart,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface ProfitabilityAnalysisProps {
  results: CalculationResults;
  formData: FormData;
  className?: string;
}

const ProfitabilityAnalysis: React.FC<ProfitabilityAnalysisProps> = ({
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

  const profitabilityMetrics = useMemo(() => {
    if (!results || !formData) return [];

    const totalRevenue = (results.finalPrice || 0) * (formData.quantity || 1);
    const totalCost = results.totalCost || 0;
    const grossProfit = results.grossProfit || 0;
    const netProfit = grossProfit * 0.85; // Assuming tax rate

    return [
      {
        id: "gross_profit",
        label: language === "el" ? "Μικτό Κέρδος" : "Gross Profit",
        value: formatCurrency(grossProfit),
        percentage: totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0,
        color: "green",
        icon: TrendingUp,
        status: grossProfit > totalCost * 0.3 ? "excellent" : grossProfit > totalCost * 0.2 ? "good" : "average",
      },
      {
        id: "net_profit",
        label: language === "el" ? "Καθαρό Κέρδος" : "Net Profit", 
        value: formatCurrency(netProfit),
        percentage: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
        color: "blue",
        icon: DollarSign,
        status: netProfit > totalCost * 0.25 ? "excellent" : netProfit > totalCost * 0.15 ? "good" : "average",
      },
      {
        id: "profit_margin",
        label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
        value: formatPercentage(results.profitMargin || 0),
        percentage: results.profitMargin || 0,
        color: "purple",
        icon: Target,
        status: (results.profitMargin || 0) > 25 ? "excellent" : (results.profitMargin || 0) > 15 ? "good" : "average",
      },
      {
        id: "roi",
        label: language === "el" ? "Απόδοση Επένδυσης" : "Return on Investment",
        value: formatPercentage(totalCost > 0 ? (grossProfit / totalCost) * 100 : 0),
        percentage: totalCost > 0 ? (grossProfit / totalCost) * 100 : 0,
        color: "orange",
        icon: BarChart3,
        status: (totalCost > 0 ? (grossProfit / totalCost) * 100 : 0) > 30 ? "excellent" : (totalCost > 0 ? (grossProfit / totalCost) * 100 : 0) > 20 ? "good" : "average",
      },
    ];
  }, [results, formData, language]);

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-800 border-green-300",
      good: "bg-blue-100 text-blue-800 border-blue-300", 
      average: "bg-yellow-100 text-yellow-800 border-yellow-300",
      poor: "bg-red-100 text-red-800 border-red-300",
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
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "poor":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className={className}>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Ανάλυση Κερδοφορίας"
                : "Profitability Analysis"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profitabilityMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.id} className="border-2 hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-800">
                          {metric.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(metric.status)}
                        <Badge className={`text-xs ${getStatusColor(metric.status)}`}>
                          {language === "el"
                            ? metric.status === "excellent"
                              ? "Εξαιρετικό"
                              : metric.status === "good"
                                ? "Καλό" 
                                : metric.status === "average"
                                  ? "Μέτριο"
                                  : "Χαμηλό"
                            : metric.status === "excellent"
                              ? "Excellent"
                              : metric.status === "good"
                                ? "Good"
                                : metric.status === "average"
                                  ? "Average"
                                  : "Poor"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </div>
                    <Progress value={Math.min(metric.percentage, 100)} className="h-2" />
                    <div className="text-sm text-gray-500 mt-1">
                      {formatPercentage(metric.percentage)} {language === "el" ? "απόδοση" : "performance"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {language === "el" ? "Σύνοψη Κερδοφορίας" : "Profitability Summary"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(results.recommendedSellingPrice || 0)}
                </div>
                <div className="text-sm text-green-600">
                  {language === "el" ? "Συνιστώμενη Τιμή" : "Recommended Price"}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(results.breakEvenPrice || 0)}
                </div>
                <div className="text-sm text-blue-600">
                  {language === "el" ? "Break-even Τιμή" : "Break-even Price"}
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {formatPercentage((results.profitMargin || 0))}
                </div>
                <div className="text-sm text-purple-600">
                  {language === "el" ? "Τρέχον Περιθώριο" : "Current Margin"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfitabilityAnalysis;
