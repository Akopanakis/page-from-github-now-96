import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Brain,
  TrendingUp,
  Users,
  Package,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Target,
  Eye,
  EyeOff,
  Crown,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedAnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const AdvancedAnalysisTab: React.FC<AdvancedAnalysisTabProps> = ({
  formData,
  updateFormData,
  results,
}) => {
  const { language, currency } = useLanguage();
  const [activeAnalysis, setActiveAnalysis] = useState("pricing");
  const [visibleSections, setVisibleSections] = useState({
    pricing: true,
    labor: true,
    packaging: true,
    charts: true,
  });

  // Enhanced chart configurations
  const chartConfig = {
    cost: {
      label: "Κόστος",
      color: "#ef4444",
    },
    revenue: {
      label: "Έσοδα",
      color: "#10b981",
    },
    profit: {
      label: "Κέρδος",
      color: "#f59e0b",
    },
    margin: {
      label: "Περιθώριο",
      color: "#8b5cf6",
    },
  };

  const toggleSection = (section: string) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const createCostBreakdownData = () => {
    if (!results) return [];

    return [
      {
        name: "Αγορά Πρώτης Ύλης",
        value: results.purchaseCost,
        color: "#3b82f6",
        percentage: 0,
      },
      {
        name: "Κόστος Εργασίας",
        value: results.laborCost,
        color: "#ef4444",
        percentage: 0,
      },
      {
        name: "Συσκευασία",
        value: results.packagingCost,
        color: "#f59e0b",
        percentage: 0,
      },
      {
        name: "Μεταφορικά",
        value: results.transportCost,
        color: "#8b5cf6",
        percentage: 0,
      },
      {
        name: "Επιπλέον Κόστη",
        value: results.additionalCosts,
        color: "#06b6d4",
        percentage: 0,
      },
    ]
      .filter((item) => item.value > 0)
      .map((item) => {
        const total = results.totalCost;
        return {
          ...item,
          percentage: ((item.value / total) * 100).toFixed(1),
        };
      });
  };

  const createMarginAnalysisData = () => {
    if (
      !results ||
      !results.totalCost ||
      !results.netWeight ||
      results.netWeight <= 0
    )
      return [];

    const basePrice = Number(results.totalCost) / Number(results.netWeight);
    if (!isFinite(basePrice) || basePrice <= 0) return [];

    const margins = [10, 15, 20, 25, 30, 35, 40, 45, 50];

    return margins.map((margin) => {
      const price = basePrice * (1 + margin / 100);
      const profit = price - basePrice;

      return {
        margin: margin,
        marginLabel: `${margin}%`,
        price: Number(price.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        competitiveness:
          margin <= 25 ? "Υψηλή" : margin <= 35 ? "Μέτρια" : "Χαμηλή",
      };
    });
  };

  const createProfitabilityData = () => {
    if (!results) return [];

    const quantities = [100, 250, 500, 750, 1000, 1500, 2000];
    const baseUnitCost = results.totalCost / (formData.quantity || 1);

    return quantities.map((qty) => {
      const totalCost = baseUnitCost * qty;
      const revenue = results.sellingPrice * qty;
      const profit = revenue - totalCost;
      const margin = ((profit / revenue) * 100).toFixed(1);

      return {
        quantity: qty,
        cost: totalCost,
        revenue: revenue,
        profit: profit,
        margin: parseFloat(margin),
      };
    });
  };

  const createSeasonalAnalysisData = () => {
    const months =
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
          ]
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
          ];

    return months.map((month, index) => {
      const seasonalFactor = 1 + Math.sin((index * Math.PI) / 6) * 0.3;
      const baseDemand = 100;
      const demand = baseDemand * seasonalFactor;
      const priceMultiplier = 1 + (1 - seasonalFactor) * 0.2;

      return {
        month,
        demand: Math.round(demand),
        priceMultiplier: priceMultiplier.toFixed(2),
        revenue: Math.round(
          demand * priceMultiplier * (results?.sellingPrice || 10),
        ),
      };
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? formatCurrency(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const costBreakdownData = createCostBreakdownData();
  const marginAnalysisData = createMarginAnalysisData();
  const profitabilityData = createProfitabilityData();
  const seasonalData = createSeasonalAnalysisData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-lg rounded-lg flex items-center space-x-2">
          <Crown className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Προχωρημένες Δυνατότητες"
              : "Advanced Features"}
          </span>
        </div>
      </div>

      {/* Section Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>
              {language === "el" ? "Εμφάνιση Αναλύσεων" : "Display Analysis"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(visibleSections).map(([key, visible]) => {
              const labels = {
                pricing:
                  language === "el"
                    ? "Ανάλυση Τιμολόγησης"
                    : "Pricing Analysis",
                labor:
                  language === "el"
                    ? "Βελτιστοποίηση Εργασίας"
                    : "Labor Optimization",
                packaging:
                  language === "el"
                    ? "Ανάλυση Συσκευασίας"
                    : "Packaging Analysis",
                charts:
                  language === "el"
                    ? "Προχωρημένα Γραφήματα"
                    : "Advanced Charts",
              };

              return (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={visible}
                    onCheckedChange={(checked) => toggleSection(key)}
                  />
                  <Label htmlFor={key} className="text-sm">
                    {labels[key as keyof typeof labels]}
                  </Label>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Intelligent Pricing Analysis */}
      {visibleSections.pricing && (
        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>
                {language === "el"
                  ? "Έξυπνη Ανάλυση Τιμολόγησης"
                  : "Intelligent Pricing Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {marginAnalysisData.length > 0 && (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marginAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="marginLabel" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name={
                        language === "el" ? "Τιμή Πώλησης" : "Selling Price"
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#10b981"
                      strokeWidth={3}
                      name={language === "el" ? "Κέρδος" : "Profit"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === "el"
                  ? "Συστάσεις Τιμολόγησης:"
                  : "Pricing Recommendations:"}
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  •{" "}
                  {language === "el"
                    ? "Βέλτιστο περιθώριο: 20-30% για ανταγωνιστικότητα"
                    : "Optimal margin: 20-30% for competitiveness"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Περιθώριο >35% μπορεί να μειώσει τη ζήτηση"
                    : "Margin >35% may reduce demand"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Περιθώριο <15% μπορεί να είναι μη βιώσιμο"
                    : "Margin <15% may be unsustainable"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Labor Optimization */}
      {visibleSections.labor && (
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Users className="w-5 h-5 text-green-600" />
              <span>
                {language === "el"
                  ? "Βελτιστοποίηση Εργατικού Κόστους"
                  : "Labor Cost Optimization"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {profitabilityData.length > 0 && (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quantity" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="cost"
                      fill="#ef4444"
                      name={language === "el" ? "Κόστος" : "Cost"}
                    />
                    <Bar
                      dataKey="profit"
                      fill="#10b981"
                      name={language === "el" ? "Κέρδος" : "Profit"}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                {language === "el"
                  ? "Συστάσεις Εργασίας:"
                  : "Labor Recommendations:"}
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>
                  •{" "}
                  {language === "el"
                    ? "Αυξήστε την ποσότητα για καλύτερη κλιμάκωση κόστους"
                    : "Increase quantity for better cost scaling"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Εξετάστε αυτοματοποίηση για μεγάλες ποσότητες"
                    : "Consider automation for large quantities"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Βελτιστοποιήστε τις ώρες εργασίας ανά kg προϊόντος"
                    : "Optimize labor hours per kg of product"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Packaging Analysis */}
      {visibleSections.packaging && (
        <Card className="border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <Package className="w-5 h-5 text-orange-600" />
              <span>
                {language === "el"
                  ? "Ανάλυση Συσκευασίας"
                  : "Packaging Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {costBreakdownData.length > 0 && (
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Advanced Charts */}
      {visibleSections.charts && (
        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
            <CardTitle className="flex items-center space-x-2 text-purple-800">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>
                {language === "el" ? "Εποχιακή Ανάλυση" : "Seasonal Analysis"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seasonalData}>
                  <defs>
                    <linearGradient
                      id="demandGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stroke="#8b5cf6"
                    fill="url(#demandGradient)"
                    name={language === "el" ? "Ζήτηση" : "Demand"}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name={language === "el" ? "Έσοδα" : "Revenue"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">
                {language === "el"
                  ? "Εποχιακές Παρατηρήσεις:"
                  : "Seasonal Observations:"}
              </h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>
                  •{" "}
                  {language === "el"
                    ? "Υψηλή ζήτηση το καλοκαίρι - αυξήστε την παραγωγή"
                    : "High demand in summer - increase production"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Χαμηλή ζήτηση το χειμώνα - εστιάστε στην ποιότητα"
                    : "Low demand in winter - focus on quality"}
                </li>
                <li>
                  •{" "}
                  {language === "el"
                    ? "Προσαρμόστε τις τιμές ανάλογα με την εποχή"
                    : "Adjust prices according to season"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedAnalysisTab;
