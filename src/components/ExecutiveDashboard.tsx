
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Calculator,
  Percent,
  Activity,
  Package,
  Users,
  Factory,
  Truck,
} from "lucide-react";
import type { CalculationResults, FormData } from "@/utils/calc";

interface ExecutiveDashboardProps {
  results: CalculationResults;
  formData: FormData;
}

const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
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

  const dashboardItems = [
    {
      id: "revenue",
      label: language === "el" ? "Συνολικά Έσοδα" : "Total Revenue",
      value: formatCurrency((results.finalPrice || 0) * (formData.quantity || 1)),
      icon: DollarSign,
      color: "green",
    },
    {
      id: "cost",
      label: language === "el" ? "Συνολικό Κόστος" : "Total Cost",
      value: formatCurrency(results.totalCost || 0),
      icon: Package,
      color: "red",
    },
    {
      id: "profit",
      label: language === "el" ? "Καθαρό Κέρδος" : "Net Profit",
      value: formatCurrency(results.grossProfit || 0),
      icon: TrendingUp,
      color: "blue",
    },
    {
      id: "margin",
      label: language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin",
      value: formatPercentage(results.profitMargin || 0),
      icon: Percent,
      color: "purple",
    },
    {
      id: "labor",
      label: language === "el" ? "Κόστος Εργασίας" : "Labor Cost",
      value: formatCurrency(results.laborCost || 0),
      icon: Users,
      color: "orange",
    },
    {
      id: "materials",
      label: language === "el" ? "Κόστος Υλικών" : "Materials Cost",
      value: formatCurrency(results.purchaseCost || 0),
      icon: Factory,
      color: "yellow",
    },
    {
      id: "transport",
      label: language === "el" ? "Κόστος Μεταφοράς" : "Transport Cost",
      value: formatCurrency(results.transportCost || 0),
      icon: Truck,
      color: "gray",
    },
    {
      id: "efficiency",
      label: language === "el" ? "Απόδοση" : "Efficiency",
      value: formatPercentage(
        results.totalWastePercentage > 0 ? 
          ((results.netWeight - (results.netWeight * results.totalWastePercentage / 100)) / results.netWeight) * 100 : 
          100
      ),
      icon: Activity,
      color: "teal",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardItems.map((item) => (
        <Card key={item.id} className="bg-white shadow-md rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
            <item.icon className={`w-4 h-4 text-${item.color}-500`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            {item.id === "efficiency" && (
              <p className="text-xs text-muted-foreground mt-1">
                {language === "el"
                  ? "Ποσοστό διατήρησης υλικού"
                  : "Material retention rate"}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExecutiveDashboard;
