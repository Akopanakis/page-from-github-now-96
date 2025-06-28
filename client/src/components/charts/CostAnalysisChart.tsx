import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart as PieChartIcon, BarChart3, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CostAnalysisChartProps {
  data?: {
    costBreakdown: Array<{
      category: string;
      value: number;
      percentage: number;
      color: string;
    }>;
    profitabilityTrends: Array<{
      date: string;
      profit: number;
      margin: number;
      volume: number;
    }>;
  };
}

const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({ data }) => {
  const { language, currency, t } = useLanguage();

  const defaultData = {
    costBreakdown: [
      {
        category: language === "el" ? "Πρώτες Ύλες" : "Raw Materials",
        value: 5200,
        percentage: 52,
        color: "#3b82f6",
      },
      {
        category: language === "el" ? "Εργατικά" : "Labor",
        value: 1800,
        percentage: 18,
        color: "#10b981",
      },
      {
        category: language === "el" ? "Μεταφορά" : "Transport",
        value: 1200,
        percentage: 12,
        color: "#f59e0b",
      },
      {
        category: language === "el" ? "Συσκευασία" : "Packaging",
        value: 900,
        percentage: 9,
        color: "#ef4444",
      },
      {
        category: language === "el" ? "Ενέργεια" : "Energy",
        value: 600,
        percentage: 6,
        color: "#8b5cf6",
      },
      {
        category: language === "el" ? "Άλλα" : "Other",
        value: 300,
        percentage: 3,
        color: "#6b7280",
      },
    ],
    profitabilityTrends: [
      { date: "01/01", profit: 1250, margin: 28.5, volume: 180 },
      { date: "01/08", profit: 1380, margin: 31.2, volume: 195 },
      { date: "01/15", profit: 1420, margin: 32.8, volume: 210 },
      { date: "01/22", profit: 1350, margin: 30.1, volume: 185 },
      { date: "01/29", profit: 1480, margin: 34.2, volume: 220 },
    ],
  };

  const chartData = data || defaultData;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const renderCustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{data.category}</p>
          <p className="text-blue-600">{formatCurrency(data.value)}</p>
          <p className="text-gray-500">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChartIcon className="w-5 h-5" />
          <span>{language === "el" ? "Ανάλυση Κόστους" : "Cost Analysis"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakdown" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="breakdown"
              className="flex items-center space-x-2"
            >
              <PieChartIcon className="w-4 h-4" />
              <span>{language === "el" ? "Κατανομή" : "Breakdown"}</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{language === "el" ? "Τάσεις" : "Trends"}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breakdown" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ percentage }) => `${percentage}%`}
                    >
                      {chartData.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={renderCustomTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {chartData.costBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {formatCurrency(item.value)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.profitabilityTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "profit"
                        ? formatCurrency(Number(value))
                        : `${value}%`,
                      name === "profit"
                        ? language === "el"
                          ? "Κέρδος"
                          : "Profit"
                        : language === "el"
                          ? "Περιθώριο"
                          : "Margin",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="profit"
                    fill="#3b82f6"
                    name={language === "el" ? "Κέρδος" : "Profit"}
                  />
                  <Bar
                    dataKey="margin"
                    fill="#10b981"
                    name={language === "el" ? "Περιθώριο %" : "Margin %"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CostAnalysisChart;
