import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  Area,
  AreaChart,
  PieChart,
  Pie,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  Eye,
  PieChart as PieChartIcon,
  Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CostAnalysisChart from "@/components/charts/CostAnalysisChart";

interface AnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  formData,
  updateFormData,
}) => {
  const { language, currency } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    marginAnalysis: true,
    profitabilityChart: true,
    competitorAnalysis: false,
  });

  const [useProfitTarget, setUseProfitTarget] = useState(false);

  // Calculate profit margin from target profit if enabled
  const calculateMarginFromTarget = () => {
    if (
      useProfitTarget &&
      formData.profitTarget &&
      formData.purchasePrice &&
      formData.quantity
    ) {
      const totalCost =
        (formData.purchasePrice || 0) * (formData.quantity || 0);
      const targetMargin = ((formData.profitTarget || 0) / totalCost) * 100;
      updateFormData({ profitMargin: targetMargin });
    }
  };

  // Memoized cost data calculation
  const costData = useMemo(() => {
    const purchaseCost =
      (formData.purchasePrice || 0) * (formData.quantity || 0);
    const laborCost = (formData.workers || []).reduce(
      (sum: number, w: any) => sum + w.hourlyRate * w.hours,
      0,
    );
    const transportCost =
      (formData.distance || 0) * (formData.fuelCost || 0) +
      (formData.tolls || 0) +
      (formData.parkingCost || 0) +
      (formData.driverSalary || 0);
    const otherCost =
      (formData.electricityCost || 0) +
      (formData.equipmentCost || 0) +
      (formData.insuranceCost || 0) +
      (formData.rentCost || 0) +
      (formData.communicationCost || 0) +
      (formData.otherCosts || 0);
    const packagingCost = (formData.boxCost || 0) + (formData.bagCost || 0);

    return [
      {
        name: language === "el" ? "Κόστος Αγοράς" : "Purchase Cost",
        value: purchaseCost,
        color: "#3b82f6",
        percentage: 0,
      },
      {
        name: language === "el" ? "Εργασία" : "Labor",
        value: laborCost,
        color: "#10b981",
        percentage: 0,
      },
      {
        name: language === "el" ? "Συσκευασία" : "Packaging",
        value: packagingCost,
        color: "#f59e0b",
        percentage: 0,
      },
      {
        name: language === "el" ? "Μεταφορά" : "Transport",
        value: transportCost,
        color: "#ef4444",
        percentage: 0,
      },
      {
        name: language === "el" ? "Λοιπά" : "Other",
        value: otherCost,
        color: "#8b5cf6",
        percentage: 0,
      },
    ]
      .filter((item) => item.value > 0)
      .map((item) => {
        const total =
          purchaseCost + laborCost + transportCost + otherCost + packagingCost;
        return {
          ...item,
          percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : "0",
        };
      });
  }, [formData, language]);

  // Memoized margin data calculation
  const marginData = useMemo(() => {
    const totalCost = costData.reduce((sum, item) => sum + item.value, 0);
    const profit = (totalCost * (formData.profitMargin || 0)) / 100;

    return [
      {
        category: language === "el" ? "Κόστος" : "Cost",
        value: totalCost,
        color: "#ef4444",
      },
      {
        category: language === "el" ? "Κέρδος" : "Profit",
        value: profit,
        color: "#10b981",
      },
    ];
  }, [costData, formData.profitMargin, language]);

  // Memoized profitability data calculation
  const profitabilityData = useMemo(() => {
    const totalCost = costData.reduce((sum, item) => sum + item.value, 0);
    const profitMargin = formData.profitMargin || 0;

    return Array.from({ length: 12 }, (_, i) => {
      const seasonalFactor = 1 + Math.sin(i / 2) * 0.15; // Seasonal variation
      const baseCost = totalCost * (1 + Math.random() * 0.05 - 0.025); // Small cost variation
      const baseRevenue = totalCost * (1 + profitMargin / 100) * seasonalFactor;
      const profit = baseRevenue - baseCost;

      return {
        month:
          language === "el"
            ? [
                "Ιαν",
                "Φεβ",
                "Μαρ",
                "Απρ",
                "Μαϊ",
                "Ιουν",
                "Ιουλ",
                "Αυγ",
                "Σεπ",
                "Οκτ",
                "Νοε",
                "Δεκ",
              ][i]
            : [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][i],
        revenue: Math.round(baseRevenue),
        cost: Math.round(baseCost),
        profit: Math.round(profit),
      };
    });
  }, [costData, formData.profitMargin, language]);

  // Competitor Analysis Data
  const competitorData = useMemo(() => {
    const ourPrice =
      costData.reduce((sum, item) => sum + item.value, 0) *
      (1 + (formData.profitMargin || 0) / 100);

    return [
      {
        name: language === "el" ? "Εμείς" : "Us",
        price: ourPrice,
        color: "#3b82f6",
      },
      {
        name: language === "el" ? "Ανταγωνιστής 1" : "Competitor 1",
        price: formData.competitor1 || 0,
        color: "#ef4444",
      },
      {
        name: language === "el" ? "Ανταγωνιστής 2" : "Competitor 2",
        price: formData.competitor2 || 0,
        color: "#f59e0b",
      },
    ].filter((item) => item.price > 0);
  }, [
    costData,
    formData.profitMargin,
    formData.competitor1,
    formData.competitor2,
    language,
  ]);

  const handleChartToggle = (chartKey: keyof typeof selectedCharts) => {
    setSelectedCharts((prev) => ({ ...prev, [chartKey]: !prev[chartKey] }));
  };

  const handleProfitTargetChange = (checked: boolean | "indeterminate") => {
    setUseProfitTarget(checked === true);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.value.toFixed(2)
                : entry.value}
              €
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Ανάλυση Ανταγωνισμού"
                : "Competitor Analysis"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="competitor1">
                {language === "el"
                  ? "Τιμή Ανταγωνιστή 1 (€/kg)"
                  : "Competitor 1 Price (€/kg)"}
              </Label>
              <Input
                id="competitor1"
                type="number"
                step="0.01"
                value={formData.competitor1 || ""}
                onChange={(e) =>
                  updateFormData({
                    competitor1: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitor2">
                {language === "el"
                  ? "Τιμή Ανταγωνιστή 2 (€/kg)"
                  : "Competitor 2 Price (€/kg)"}
              </Label>
              <Input
                id="competitor2"
                type="number"
                step="0.01"
                value={formData.competitor2 || ""}
                onChange={(e) =>
                  updateFormData({
                    competitor2: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Configuration */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span>
              {language === "el"
                ? "Ρύθμιση Κερδοφορίας"
                : "Profitability Settings"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="use-profit-target"
                checked={useProfitTarget}
                onCheckedChange={handleProfitTargetChange}
              />
              <Label htmlFor="use-profit-target" className="text-slate-700">
                <span>
                  {language === "el"
                    ? "Χρήση στόχου κέρδους αντί ποσοστού"
                    : "Use profit target instead of percentage"}
                </span>
              </Label>
            </div>

            {useProfitTarget ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>
                    {language === "el"
                      ? "Στόχος Κέρδους (€)"
                      : "Profit Target (€)"}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.profitTarget || ""}
                    onChange={(e) =>
                      updateFormData({
                        profitTarget: parseFloat(e.target.value) || 0,
                      })
                    }
                    onBlur={calculateMarginFromTarget}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>
                    {language === "el"
                      ? "Υπολογισμένο Ποσοστό (%)"
                      : "Calculated Percentage (%)"}
                  </Label>
                  <Input
                    type="number"
                    value={formData.profitMargin?.toFixed(2) || "0.00"}
                    disabled
                    className="mt-2 bg-gray-50"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label>
                  {language === "el"
                    ? "Περιθώριο Κέρδους (%)"
                    : "Profit Margin (%)"}
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="20.0"
                  value={formData.profitMargin || ""}
                  onChange={(e) =>
                    updateFormData({
                      profitMargin: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-2"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chart Selection */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Eye className="w-5 h-5 text-blue-600" />
            <span>
              {language === "el" ? "Επιλογή Γραφημάτων" : "Chart Selection"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(selectedCharts).map(([key, selected]) => {
              const labels = {
                costBreakdown:
                  language === "el" ? "Ανάλυση Κόστους" : "Cost Breakdown",
                marginAnalysis:
                  language === "el" ? "Ανάλυση Περιθωρίων" : "Margin Analysis",
                profitabilityChart:
                  language === "el"
                    ? "Γράφημα Κερδοφορίας"
                    : "Profitability Chart",
                competitorAnalysis:
                  language === "el"
                    ? "Ανάλυση Ανταγωνισμού"
                    : "Competitor Analysis",
              };

              return (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={selected}
                    onCheckedChange={(checked) => handleChartToggle(key as keyof typeof selectedCharts)}
                  />
                  <Label htmlFor={key} className="text-slate-700">
                    {labels[key as keyof typeof labels]}
                  </Label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown Chart - Pie Chart */}
      {selectedCharts.costBreakdown && costData.length > 0 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <PieChartIcon className="w-5 h-5 text-blue-600" />
              <span>
                {language === "el" ? "Ανάλυση Κόστους" : "Cost Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-96 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Explanation */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === "el"
                  ? "Τι δείχνει αυτό το γράφημα:"
                  : "What this chart shows:"}
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  •{" "}
                  {language === "el"
                    ? "Την κατανομή του συνολικού κόστους ανά κατηγορία"
                    : "The distribution of total cost by category"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Ποιες κατηγορίες κόστους επηρεάζουν περισσότερο το τελικό κόστος"
                    : "Which cost categories most affect the final cost"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Περιοχές όπου μπορείτε να εστιάσετε για εξοικονόμηση κόστους"
                    : "Areas where you can focus for cost savings"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Margin Analysis Chart */}
      {selectedCharts.marginAnalysis && marginData.length > 0 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span>
                {language === "el" ? "Ανάλυση Περιθωρίων" : "Margin Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-96 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marginData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {marginData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profitability Chart */}
      {selectedCharts.profitabilityChart && profitabilityData.length > 0 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <LineChartIcon className="w-5 h-5 text-purple-600" />
              <span>
                {language === "el"
                  ? "Ανάλυση Κερδοφορίας"
                  : "Profitability Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-96 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={profitabilityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="profitGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#revenueGradient)"
                    name={language === "el" ? "Έσοδα" : "Revenue"}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="2"
                    stroke="#10b981"
                    fill="url(#profitGradient)"
                    name={language === "el" ? "Κέρδος" : "Profit"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitor Analysis Chart */}
      {selectedCharts.competitorAnalysis && competitorData.length > 0 && (
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-slate-200">
            <CardTitle className="flex items-center space-x-2 text-slate-800">
              <Target className="w-5 h-5 text-orange-600" />
              <span>
                {language === "el"
                  ? "Σύγκριση με Ανταγωνισμό"
                  : "Competitor Comparison"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-96 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={competitorData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      language === "el" ? "Τιμή" : "Price",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                    {competitorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Include CostAnalysisChart for additional insights */}
      <CostAnalysisChart />
    </div>
  );
};

export default AnalysisTab;
