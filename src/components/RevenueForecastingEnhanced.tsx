import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Globe,
  DollarSign,
  BarChart3,
  Users,
  Building,
  MapPin,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Award,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Share2,
  Calculator,
  Brain,
  Zap,
  Layers,
  Database,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Percent,
  Fish,
  Anchor,
  Ship,
  Waves,
} from "lucide-react";

interface RevenueForecastingEnhancedProps {
  formData?: any;
  results?: any;
  className?: string;
}

// Revenue Forecasting Data Structures
interface ForecastModel {
  id: string;
  name: string;
  type: "arima" | "sarima" | "exponential" | "neural" | "ensemble" | "hybrid";
  description: string;
  accuracy: number;
  parameters: any;
  isActive: boolean;
}

interface SeasonalData {
  month: string;
  monthNumber: number;
  seasonalIndex: number;
  historicalAverage: number;
  trend: number;
  demandFactor: number;
  pricePremium: number;
}

interface MarketSegment {
  id: string;
  name: string;
  marketShare: number;
  growthRate: number;
  priceElasticity: number;
  seasonality: number;
  competitionLevel: number;
  profitability: number;
}

interface PredictiveMetric {
  name: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  trend: "up" | "down" | "stable";
  impact: "high" | "medium" | "low";
  unit: string;
}

interface ForecastResult {
  period: string;
  revenue: number;
  confidence: { lower: number; upper: number };
  seasonalAdjusted: number;
  trendComponent: number;
  cyclicalComponent: number;
  irregularComponent: number;
  factors: {
    market: number;
    competition: number;
    seasonality: number;
    innovation: number;
    regulation: number;
  };
}

interface TimeSeriesData {
  period: string;
  actual: number;
  predicted: number;
  trend: number;
  seasonal: number;
  residual: number;
  confidence95Lower: number;
  confidence95Upper: number;
  confidence80Lower: number;
  confidence80Upper: number;
}

const RevenueForecastingEnhanced: React.FC<RevenueForecastingEnhancedProps> = ({
  formData,
  results,
  className = "",
}) => {
  const { language, currency } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModel, setSelectedModel] = useState("ensemble");
  const [forecastHorizon, setForecastHorizon] = useState(12);
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);
  const [includeExternalFactors, setIncludeExternalFactors] = useState(true);
  const [isForecasting, setIsForecasting] = useState(false);

  // 1. Forecasting Models
  const forecastModels: ForecastModel[] = useMemo(
    () => [
      {
        id: "arima",
        name: "ARIMA",
        type: "arima",
        description:
          language === "el"
            ? "Αυτοπαλίνδρομο Ολοκληρωμένο Μοντέλο Κινητού Μέσου"
            : "Autoregressive Integrated Moving Average",
        accuracy: 82.5,
        parameters: { p: 2, d: 1, q: 2 },
        isActive: true,
      },
      {
        id: "sarima",
        name: "SARIMA",
        type: "sarima",
        description:
          language === "el" ? "Εποχιακό ARIMA Μοντέλο" : "Seasonal ARIMA Model",
        accuracy: 87.3,
        parameters: { p: 2, d: 1, q: 2, P: 1, D: 1, Q: 1, s: 12 },
        isActive: true,
      },
      {
        id: "exponential",
        name: "Holt-Winters",
        type: "exponential",
        description:
          language === "el"
            ? "Εκθετική Εξομάλυνση με Εποχικότητα"
            : "Exponential Smoothing with Seasonality",
        accuracy: 84.7,
        parameters: { alpha: 0.3, beta: 0.1, gamma: 0.2 },
        isActive: true,
      },
      {
        id: "neural",
        name: "LSTM Neural Network",
        type: "neural",
        description:
          language === "el"
            ? "Δίκτυο Μακράς Βραχυπρόθεσμης Μνήμης"
            : "Long Short-Term Memory Network",
        accuracy: 89.1,
        parameters: { layers: 3, neurons: 50, epochs: 100 },
        isActive: true,
      },
      {
        id: "ensemble",
        name: "Ensemble Model",
        type: "ensemble",
        description:
          language === "el"
            ? "Συνδυασμός Πολλαπλών Μοντέλων"
            : "Combination of Multiple Models",
        accuracy: 91.2,
        parameters: { weights: [0.3, 0.35, 0.2, 0.15] },
        isActive: true,
      },
    ],
    [language],
  );

  // 2. Seasonal Data Patterns
  const seasonalData: SeasonalData[] = useMemo(
    () => [
      {
        month: "Jan",
        monthNumber: 1,
        seasonalIndex: 0.85,
        historicalAverage: 150000,
        trend: 1.02,
        demandFactor: 0.9,
        pricePremium: 1.05,
      },
      {
        month: "Feb",
        monthNumber: 2,
        seasonalIndex: 0.88,
        historicalAverage: 145000,
        trend: 1.03,
        demandFactor: 0.92,
        pricePremium: 1.03,
      },
      {
        month: "Mar",
        monthNumber: 3,
        seasonalIndex: 0.95,
        historicalAverage: 165000,
        trend: 1.04,
        demandFactor: 0.98,
        pricePremium: 1.02,
      },
      {
        month: "Apr",
        monthNumber: 4,
        seasonalIndex: 1.08,
        historicalAverage: 185000,
        trend: 1.05,
        demandFactor: 1.05,
        pricePremium: 1.01,
      },
      {
        month: "May",
        monthNumber: 5,
        seasonalIndex: 1.15,
        historicalAverage: 195000,
        trend: 1.06,
        demandFactor: 1.12,
        pricePremium: 1.0,
      },
      {
        month: "Jun",
        monthNumber: 6,
        seasonalIndex: 1.25,
        historicalAverage: 220000,
        trend: 1.07,
        demandFactor: 1.18,
        pricePremium: 0.98,
      },
      {
        month: "Jul",
        monthNumber: 7,
        seasonalIndex: 1.35,
        historicalAverage: 245000,
        trend: 1.08,
        demandFactor: 1.25,
        pricePremium: 0.96,
      },
      {
        month: "Aug",
        monthNumber: 8,
        seasonalIndex: 1.32,
        historicalAverage: 240000,
        trend: 1.09,
        demandFactor: 1.22,
        pricePremium: 0.97,
      },
      {
        month: "Sep",
        monthNumber: 9,
        seasonalIndex: 1.18,
        historicalAverage: 210000,
        trend: 1.1,
        demandFactor: 1.15,
        pricePremium: 0.99,
      },
      {
        month: "Oct",
        monthNumber: 10,
        seasonalIndex: 1.05,
        historicalAverage: 180000,
        trend: 1.11,
        demandFactor: 1.08,
        pricePremium: 1.01,
      },
      {
        month: "Nov",
        monthNumber: 11,
        seasonalIndex: 0.92,
        historicalAverage: 160000,
        trend: 1.12,
        demandFactor: 0.95,
        pricePremium: 1.04,
      },
      {
        month: "Dec",
        monthNumber: 12,
        seasonalIndex: 0.9,
        historicalAverage: 155000,
        trend: 1.13,
        demandFactor: 0.88,
        pricePremium: 1.08,
      },
    ],
    [],
  );

  // 3. Market Segments Analysis
  const marketSegments: MarketSegment[] = useMemo(
    () => [
      {
        id: "premium",
        name: language === "el" ? "Premium Προϊόντα" : "Premium Products",
        marketShare: 25.5,
        growthRate: 8.3,
        priceElasticity: -0.3,
        seasonality: 1.2,
        competitionLevel: 0.4,
        profitability: 0.35,
      },
      {
        id: "standard",
        name: language === "el" ? "Τυπικά Προϊόντα" : "Standard Products",
        marketShare: 45.2,
        growthRate: 4.1,
        priceElasticity: -0.7,
        seasonality: 1.0,
        competitionLevel: 0.7,
        profitability: 0.22,
      },
      {
        id: "value",
        name: language === "el" ? "Οικονομικά Προϊόντα" : "Value Products",
        marketShare: 22.1,
        growthRate: 2.8,
        priceElasticity: -1.2,
        seasonality: 0.9,
        competitionLevel: 0.9,
        profitability: 0.15,
      },
      {
        id: "organic",
        name: language === "el" ? "Βιολογικά Προϊόντα" : "Organic Products",
        marketShare: 7.2,
        growthRate: 15.7,
        priceElasticity: -0.2,
        seasonality: 1.1,
        competitionLevel: 0.3,
        profitability: 0.45,
      },
    ],
    [language],
  );

  // 4. Predictive Metrics
  const predictiveMetrics: PredictiveMetric[] = useMemo(
    () => [
      {
        name:
          language === "el" ? "Μέσο Μέγεθος Παραγγελίας" : "Average Order Size",
        currentValue: 185.5,
        predictedValue: 195.2,
        confidence: 87.3,
        trend: "up",
        impact: "high",
        unit: currency,
      },
      {
        name: language === "el" ? "Συχνότητα Αγορών" : "Purchase Frequency",
        currentValue: 2.3,
        predictedValue: 2.5,
        confidence: 82.1,
        trend: "up",
        impact: "medium",
        unit: "times/month",
      },
      {
        name: language === "el" ? "Διατήρηση Πελατών" : "Customer Retention",
        currentValue: 78.5,
        predictedValue: 81.2,
        confidence: 79.8,
        trend: "up",
        impact: "high",
        unit: "%",
      },
      {
        name: language === "el" ? "Δείκτης Ικανοποίησης" : "Satisfaction Index",
        currentValue: 8.3,
        predictedValue: 8.6,
        confidence: 75.4,
        trend: "up",
        impact: "medium",
        unit: "/10",
      },
      {
        name: language === "el" ? "Μερίδιο Αγοράς" : "Market Share",
        currentValue: 12.8,
        predictedValue: 14.1,
        confidence: 71.9,
        trend: "up",
        impact: "high",
        unit: "%",
      },
      {
        name:
          language === "el"
            ? "Κόστος Απόκτησης Πελάτη"
            : "Customer Acquisition Cost",
        currentValue: 45.3,
        predictedValue: 42.8,
        confidence: 83.7,
        trend: "down",
        impact: "medium",
        unit: currency,
      },
    ],
    [language, currency],
  );

  // 5. Generate Time Series Forecast Data
  const generateForecastData = useCallback((): TimeSeriesData[] => {
    const data: TimeSeriesData[] = [];
    const baseRevenue = 180000;
    let currentDate = new Date();

    // Historical data (12 months)
    for (let i = -12; i < 0; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + i);
      const monthIndex = date.getMonth();
      const seasonal = seasonalData[monthIndex];

      const trend = 1 + (0.05 * Math.abs(i)) / 12; // 5% annual growth
      const noise = 0.9 + Math.random() * 0.2; // ±10% random variation

      const actual = baseRevenue * seasonal.seasonalIndex * trend * noise;
      const predicted = baseRevenue * seasonal.seasonalIndex * trend;

      data.push({
        period: date.toLocaleDateString(language === "el" ? "el-GR" : "en-US", {
          month: "short",
          year: "numeric",
        }),
        actual,
        predicted,
        trend: baseRevenue * trend,
        seasonal: actual - baseRevenue * trend,
        residual: actual - predicted,
        confidence95Lower: predicted * 0.85,
        confidence95Upper: predicted * 1.15,
        confidence80Lower: predicted * 0.9,
        confidence80Upper: predicted * 1.1,
      });
    }

    // Future forecast (forecastHorizon months)
    for (let i = 0; i < forecastHorizon; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() + i);
      const monthIndex = date.getMonth();
      const seasonal = seasonalData[monthIndex];

      const trend = 1 + (0.05 * (12 + i)) / 12; // Continuing growth
      const uncertainty = 1 + i * 0.02; // Increasing uncertainty over time

      const predicted = baseRevenue * seasonal.seasonalIndex * trend;

      data.push({
        period: date.toLocaleDateString(language === "el" ? "el-GR" : "en-US", {
          month: "short",
          year: "numeric",
        }),
        actual: 0, // No actual data for future
        predicted,
        trend: baseRevenue * trend,
        seasonal: predicted - baseRevenue * trend,
        residual: 0,
        confidence95Lower: predicted * (0.85 / uncertainty),
        confidence95Upper: predicted * (1.15 * uncertainty),
        confidence80Lower: predicted * (0.9 / uncertainty),
        confidence80Upper: predicted * (1.1 * uncertainty),
      });
    }

    return data;
  }, [forecastHorizon, seasonalData, language]);

  const forecastData = useMemo(
    () => generateForecastData(),
    [generateForecastData],
  );

  // 6. Revenue Decomposition Analysis
  const decompositionData = useMemo(() => {
    return forecastData.slice(-12).map((item) => ({
      period: item.period,
      trend: item.trend,
      seasonal: Math.abs(item.seasonal),
      cyclical: item.predicted * 0.03 * Math.sin(Math.random() * Math.PI),
      irregular: item.residual || item.predicted * (Math.random() - 0.5) * 0.1,
      observed: item.actual || item.predicted,
    }));
  }, [forecastData]);

  // 7. Growth Rate Analysis
  const growthAnalysis = useMemo(() => {
    const currentYear = forecastData.slice(-12);
    const previousYear = forecastData.slice(-24, -12);

    return currentYear.map((current, index) => {
      const previous = previousYear[index];
      const growthRate = previous
        ? ((current.predicted - previous.predicted) / previous.predicted) * 100
        : 0;

      return {
        period: current.period,
        growthRate,
        yearOverYear: growthRate,
        quarterOverQuarter:
          index > 2
            ? ((current.predicted - currentYear[index - 3].predicted) /
                currentYear[index - 3].predicted) *
              100
            : 0,
        monthOverMonth:
          index > 0
            ? ((current.predicted - currentYear[index - 1].predicted) /
                currentYear[index - 1].predicted) *
              100
            : 0,
      };
    });
  }, [forecastData]);

  // 8. Model Performance Metrics
  const modelPerformance = useMemo(() => {
    const historicalData = forecastData.filter((item) => item.actual > 0);

    if (historicalData.length === 0) return null;

    const mape =
      (historicalData.reduce((sum, item) => {
        return sum + Math.abs((item.actual - item.predicted) / item.actual);
      }, 0) /
        historicalData.length) *
      100;

    const rmse = Math.sqrt(
      historicalData.reduce((sum, item) => {
        return sum + Math.pow(item.actual - item.predicted, 2);
      }, 0) / historicalData.length,
    );

    const mae =
      historicalData.reduce((sum, item) => {
        return sum + Math.abs(item.actual - item.predicted);
      }, 0) / historicalData.length;

    return { mape, rmse, mae, accuracy: 100 - mape };
  }, [forecastData]);

  const runForecast = async () => {
    setIsForecasting(true);
    // Simulate model running time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsForecasting(false);
  };

  const formatCurrency = (value: number) => `${currency}${value.toFixed(0)}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  const formatNumber = (value: number) => value.toLocaleString();

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            {language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecasting"}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === "el"
              ? "Προηγμένα μοντέλα πρόβλεψης με μηχανική μάθηση"
              : "Advanced forecasting models with machine learning"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {forecastModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={forecastHorizon.toString()}
            onValueChange={(value) => setForecastHorizon(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">
                6 {language === "el" ? "μήνες" : "months"}
              </SelectItem>
              <SelectItem value="12">
                12 {language === "el" ? "μήνες" : "months"}
              </SelectItem>
              <SelectItem value="18">
                18 {language === "el" ? "μήνες" : "months"}
              </SelectItem>
              <SelectItem value="24">
                24 {language === "el" ? "μήνες" : "months"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={runForecast}
            disabled={isForecasting}
            className="bg-blue-600 text-white"
          >
            <Brain className="w-4 h-4 mr-2" />
            {isForecasting
              ? language === "el"
                ? "Πρόβλεψη..."
                : "Forecasting..."
              : language === "el"
                ? "Εκτέλεση"
                : "Run"}
          </Button>
        </div>
      </div>

      {/* Model Performance Overview */}
      {modelPerformance && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {language === "el" ? "Ακρίβεια Μοντέλου" : "Model Accuracy"}
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPercent(modelPerformance.accuracy)}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MAPE</p>
                  <p className="text-2xl font-bold">
                    {formatPercent(modelPerformance.mape)}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">RMSE</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(modelPerformance.rmse)}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MAE</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(modelPerformance.mae)}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="forecast">
            {language === "el" ? "Πρόβλεψη" : "Forecast"}
          </TabsTrigger>
          <TabsTrigger value="seasonality">
            {language === "el" ? "Εποχικότητα" : "Seasonality"}
          </TabsTrigger>
          <TabsTrigger value="segments">
            {language === "el" ? "Τμήματα" : "Segments"}
          </TabsTrigger>
          <TabsTrigger value="decomposition">
            {language === "el" ? "Ανάλυση" : "Decomposition"}
          </TabsTrigger>
          <TabsTrigger value="models">
            {language === "el" ? "Μοντέλα" : "Models"}
          </TabsTrigger>
        </TabsList>

        {/* 9. Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChartIcon className="w-5 h-5 mr-2" />
                  {language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecast"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={forecastData.slice(-24)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: any) => [formatCurrency(value), ""]}
                    />
                    <Legend />
                    <Area
                      dataKey="confidence95Upper"
                      stackId="1"
                      stroke="none"
                      fill="#bfdbfe"
                      fillOpacity={0.3}
                      name={
                        language === "el" ? "95% Εμπιστοσύνη" : "95% Confidence"
                      }
                    />
                    <Area
                      dataKey="confidence95Lower"
                      stackId="1"
                      stroke="none"
                      fill="#ffffff"
                      fillOpacity={1}
                    />
                    <Line
                      dataKey="actual"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      name={language === "el" ? "Πραγματικά" : "Actual"}
                    />
                    <Line
                      dataKey="predicted"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      strokeDasharray="5,5"
                      name={language === "el" ? "Πρόβλεψη" : "Forecast"}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Κλειδικές Μετρήσεις Πρόβλεψης"
                    : "Key Forecast Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictiveMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{metric.name}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-bold mr-2">
                          {metric.currentValue.toFixed(1)}
                          {metric.unit}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                        <span className="text-lg font-bold text-blue-600 ml-1">
                          {metric.predictedValue.toFixed(1)}
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {getTrendIcon(metric.trend)}
                        <Badge
                          className={`ml-2 ${getImpactColor(metric.impact)}`}
                        >
                          {metric.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatPercent(metric.confidence)}{" "}
                        {language === "el" ? "εμπιστοσύνη" : "confidence"}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 10. Detailed Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Λεπτομερής Πρόβλεψη"
                  : "Detailed Forecast"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={includeSeasonality}
                    onCheckedChange={setIncludeSeasonality}
                    id="seasonality"
                  />
                  <Label htmlFor="seasonality">
                    {language === "el" ? "Εποχικότητα" : "Seasonality"}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={includeExternalFactors}
                    onCheckedChange={setIncludeExternalFactors}
                    id="external"
                  />
                  <Label htmlFor="external">
                    {language === "el"
                      ? "Εξωτερικοί Παράγοντες"
                      : "External Factors"}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Label>
                    {language === "el" ? "Εμπιστοσύνη" : "Confidence"}:
                  </Label>
                  <Select
                    value={confidenceLevel.toString()}
                    onValueChange={(value) =>
                      setConfidenceLevel(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                      <SelectItem value="99">99%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => [formatCurrency(value), ""]}
                  />
                  <Legend />

                  {/* Confidence intervals */}
                  <Area
                    dataKey="confidence95Upper"
                    stackId="1"
                    stroke="none"
                    fill="#ddd6fe"
                    fillOpacity={0.2}
                    name="95% CI Upper"
                  />
                  <Area
                    dataKey="confidence95Lower"
                    stackId="1"
                    stroke="none"
                    fill="#ffffff"
                    fillOpacity={1}
                    name="95% CI Lower"
                  />
                  <Area
                    dataKey="confidence80Upper"
                    stackId="2"
                    stroke="none"
                    fill="#c7d2fe"
                    fillOpacity={0.3}
                    name="80% CI Upper"
                  />
                  <Area
                    dataKey="confidence80Lower"
                    stackId="2"
                    stroke="none"
                    fill="#ffffff"
                    fillOpacity={1}
                    name="80% CI Lower"
                  />

                  {/* Main lines */}
                  <Line
                    dataKey="actual"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    connectNulls={false}
                    name={
                      language === "el" ? "Πραγματικά Δεδομένα" : "Actual Data"
                    }
                  />
                  <Line
                    dataKey="predicted"
                    stroke="#2563eb"
                    strokeWidth={3}
                    strokeDasharray="8,4"
                    name={language === "el" ? "Πρόβλεψη" : "Forecast"}
                  />
                  <Line
                    dataKey="trend"
                    stroke="#dc2626"
                    strokeWidth={2}
                    strokeDasharray="2,2"
                    name={language === "el" ? "Τάση" : "Trend"}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Ανάλυση Ρυθμού Ανάπτυξης"
                  : "Growth Rate Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={growthAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => [formatPercent(value), ""]}
                  />
                  <Legend />
                  <Bar
                    dataKey="yearOverYear"
                    fill="#3b82f6"
                    name={
                      language === "el" ? "Έτος προς Έτο��" : "Year over Year"
                    }
                  />
                  <Line
                    dataKey="monthOverMonth"
                    stroke="#10b981"
                    strokeWidth={2}
                    name={
                      language === "el" ? "Μήνας προς Μήνα" : "Month over Month"
                    }
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 11. Seasonality Analysis Tab */}
        <TabsContent value="seasonality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {language === "el"
                  ? "Ανάλυση Εποχικότητας"
                  : "Seasonality Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="seasonalIndex"
                    fill="#3b82f6"
                    name={
                      language === "el" ? "Εποχιακός Δείκτης" : "Seasonal Index"
                    }
                  />
                  <Line
                    yAxisId="right"
                    dataKey="demandFactor"
                    stroke="#10b981"
                    strokeWidth={3}
                    name={
                      language === "el"
                        ? "Συντελεστή�� Ζήτησης"
                        : "Demand Factor"
                    }
                  />
                  <Line
                    yAxisId="right"
                    dataKey="pricePremium"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name={
                      language === "el" ? "Προσαύξημα Τιμής" : "Price Premium"
                    }
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Μηνιαίες Μετρήσεις" : "Monthly Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {language === "el" ? "Μήνας" : "Month"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Δείκτης" : "Index"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Μέσος Όρος" : "Average"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Τάση" : "Trend"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seasonalData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.month}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.seasonalIndex > 1 ? "default" : "secondary"
                            }
                          >
                            {item.seasonalIndex.toFixed(2)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatCurrency(item.historicalAverage)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {item.trend > 1 ? (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500" />
                            )}
                            <span className="ml-1">
                              {formatPercent((item.trend - 1) * 100)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Εποχιακά Πρότυπα" : "Seasonal Patterns"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={seasonalData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="month" />
                    <PolarRadiusAxis domain={[0.8, 1.4]} />
                    <Radar
                      name={language === "el" ? "Εποχιακότητα" : "Seasonality"}
                      dataKey="seasonalIndex"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name={language === "el" ? "Ζήτηση" : "Demand"}
                      dataKey="demandFactor"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 12. Market Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2" />
                {language === "el" ? "Τμήματα Αγοράς" : "Market Segments"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketSegments}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="marketShare"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {marketSegments.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][
                              index % 4
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-4">
                  {marketSegments.map((segment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{segment.name}</h4>
                        <Badge variant="outline">
                          {formatPercent(segment.marketShare)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">
                            {language === "el" ? "Ανάπτυξη" : "Growth"}
                          </p>
                          <p className="font-semibold text-green-600">
                            {formatPercent(segment.growthRate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            {language === "el" ? "Κερδοφορία" : "Profitability"}
                          </p>
                          <p className="font-semibold">
                            {formatPercent(segment.profitability * 100)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            {language === "el" ? "Ελαστικότητα" : "Elasticity"}
                          </p>
                          <p className="font-semibold">
                            {segment.priceElasticity.toFixed(1)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">
                            {language === "el" ? "Ανταγωνισμός" : "Competition"}
                          </p>
                          <Progress
                            value={segment.competitionLevel * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el" ? "Ανάλυση Τμημάτων" : "Segment Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="growthRate" name="Growth Rate" unit="%" />
                  <YAxis
                    dataKey="profitability"
                    name="Profitability"
                    unit="%"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Market Segments"
                    data={marketSegments}
                    fill="#3b82f6"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 13. Time Series Decomposition Tab */}
        <TabsContent value="decomposition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                {language === "el"
                  ? "Ανάλυση Χρονοσειρών"
                  : "Time Series Decomposition"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={decompositionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="trend"
                    stackId="stack"
                    fill="#3b82f6"
                    name={language === "el" ? "Τάση" : "Trend"}
                  />
                  <Bar
                    dataKey="seasonal"
                    stackId="stack"
                    fill="#10b981"
                    name={language === "el" ? "Εποχιακότητα" : "Seasonal"}
                  />
                  <Bar
                    dataKey="cyclical"
                    stackId="stack"
                    fill="#f59e0b"
                    name={language === "el" ? "Κυκλικότητα" : "Cyclical"}
                  />
                  <Line
                    dataKey="observed"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name={language === "el" ? "Παρατηρήσεις" : "Observed"}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "el" ? "Στοιχείο Τάσης" : "Trend Component"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={decompositionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="trend" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "el"
                    ? "Εποχιακό Στοιχείο"
                    : "Seasonal Component"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={decompositionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="seasonal" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === "el"
                    ? "Ακανόνιστο Στοιχείο"
                    : "Irregular Component"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={decompositionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      dataKey="irregular"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 14. Models Comparison Tab */}
        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                {language === "el" ? "Σύγκριση Μοντέλων" : "Model Comparison"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecastModels.map((model, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${selectedModel === model.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{model.name}</h4>
                        <p className="text-sm text-gray-600">
                          {model.description}
                        </p>
                      </div>
                      <Badge variant={model.isActive ? "default" : "secondary"}>
                        {formatPercent(model.accuracy)}{" "}
                        {language === "el" ? "ακρίβεια" : "accuracy"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Τύπος" : "Type"}
                        </p>
                        <p className="text-sm">{model.type.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Παράμετροι" : "Parameters"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {JSON.stringify(model.parameters)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Κατάσταση" : "Status"}
                        </p>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${model.isActive ? "bg-green-500" : "bg-gray-400"}`}
                          ></div>
                          <span className="text-sm">
                            {model.isActive
                              ? language === "el"
                                ? "Ενεργό"
                                : "Active"
                              : language === "el"
                                ? "Ανενεργό"
                                : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          {language === "el" ? "Απόδοση" : "Performance"}
                        </span>
                        <span>{formatPercent(model.accuracy)}</span>
                      </div>
                      <Progress value={model.accuracy} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Σύγκριση Απόδοσ��ς"
                  : "Performance Comparison"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={forecastModels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="accuracy"
                    fill="#3b82f6"
                    name={language === "el" ? "Ακρίβεια (%)" : "Accuracy (%)"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RevenueForecastingEnhanced;
