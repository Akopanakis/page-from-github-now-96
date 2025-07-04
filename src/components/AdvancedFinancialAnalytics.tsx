import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calculator,
  Target,
  Activity,
  Briefcase,
  CreditCard,
  Banknote,
  Receipt,
  Wallet,
  TrendingUp as TrendingLeftUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Percent,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Filter,
  Download,
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  Award,
  Zap,
  Globe,
  Building,
  Factory,
  Truck,
  Package,
  Users,
  FileText,
  Archive,
  Database,
  Layers,
  BarChart,
  Brain,
  Cpu,
  Mouse,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedFinancialAnalyticsProps {
  className?: string;
}

const AdvancedFinancialAnalytics: React.FC<AdvancedFinancialAnalyticsProps> = ({
  className = "",
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [comparisonMode, setComparisonMode] = useState("period");

  // Comprehensive financial data
  const financialData = {
    // Revenue Analysis
    revenue: {
      current: 2450000,
      previous: 2280000,
      budget: 2600000,
      forecast: 2720000,
      ytd: 9850000,
      breakdown: {
        sales: 2100000,
        services: 280000,
        other: 70000,
      },
      bySegment: {
        restaurants: 1470000,
        retail: 588000,
        wholesale: 392000,
      },
      byProduct: {
        seabream: 980000,
        seabass: 735000,
        mussels: 441000,
        shrimp: 294000,
      },
    },

    // Cost Analysis
    costs: {
      total: 1960000,
      previous: 1824000,
      breakdown: {
        cogs: 1372000, // Cost of Goods Sold
        personnel: 392000,
        operations: 147000,
        marketing: 49000,
      },
      variable: 1470000,
      fixed: 490000,
      perUnit: 0.8,
    },

    // Profitability
    profitability: {
      gross: 1078000,
      operating: 588000,
      net: 490000,
      ebitda: 627000,
      margins: {
        gross: 44.0,
        operating: 24.0,
        net: 20.0,
        ebitda: 25.6,
      },
    },

    // Cash Flow
    cashFlow: {
      operating: 623000,
      investing: -245000,
      financing: -147000,
      net: 231000,
      burnRate: 98000,
      runway: 18, // months
    },

    // Financial Ratios
    ratios: {
      liquidity: {
        current: 2.3,
        quick: 1.8,
        cash: 0.9,
      },
      efficiency: {
        inventoryTurnover: 6.8,
        receivablesTurnover: 12.4,
        assetTurnover: 1.2,
      },
      profitability: {
        roe: 18.5, // Return on Equity
        roa: 12.3, // Return on Assets
        roic: 15.7, // Return on Invested Capital
      },
      leverage: {
        debtToEquity: 0.4,
        debtToAssets: 0.25,
        interestCoverage: 8.5,
      },
    },

    // Working Capital
    workingCapital: {
      total: 850000,
      accounts: {
        receivables: 320000,
        inventory: 450000,
        payables: 180000,
        accruals: 85000,
      },
      daysOutstanding: {
        sales: 47, // DSO
        inventory: 54, // DIO
        payables: 32, // DPO
      },
      cashCycle: 69, // DSO + DIO - DPO
    },

    // Budget vs Actual
    budget: {
      variance: {
        revenue: 5.8, // % over budget
        costs: -3.2, // % under budget
        profit: 12.5, // % over budget
      },
      quarterly: [
        { quarter: "Q1", budgeted: 2200000, actual: 2280000, variance: 3.6 },
        { quarter: "Q2", budgeted: 2400000, actual: 2450000, variance: 2.1 },
        { quarter: "Q3", budgeted: 2600000, actual: 2720000, variance: 4.6 },
        { quarter: "Q4", budgeted: 2800000, actual: 0, variance: 0 },
      ],
    },

    // Forecasting
    forecast: {
      method: "ML Enhanced",
      accuracy: 94.2,
      confidence: 87.5,
      nextQuarter: {
        revenue: 2720000,
        costs: 2040000,
        profit: 680000,
      },
      scenarios: {
        optimistic: { revenue: 2950000, probability: 25 },
        likely: { revenue: 2720000, probability: 50 },
        pessimistic: { revenue: 2480000, probability: 25 },
      },
    },

    // Risk Analysis
    risks: [
      {
        category: "Market",
        risk: "Price volatility",
        impact: "High",
        probability: "Medium",
        mitigation: "Diversification strategy",
        score: 7.2,
      },
      {
        category: "Operational",
        risk: "Supply chain disruption",
        impact: "Medium",
        probability: "Low",
        mitigation: "Multiple suppliers",
        score: 4.1,
      },
      {
        category: "Financial",
        risk: "Currency fluctuation",
        impact: "Medium",
        probability: "High",
        mitigation: "Hedging contracts",
        score: 6.8,
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return `€${amount.toLocaleString("el-GR")}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString("el-GR");
  };

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 2) return "text-green-600";
    if (Math.abs(variance) < 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskColor = (score: number) => {
    if (score < 3) return "text-green-600";
    if (score < 6) return "text-yellow-600";
    return "text-red-600";
  };

  const FinancialKPICard = ({
    title,
    current,
    previous,
    budget,
    unit,
    icon: Icon,
    format = "currency",
  }: any) => {
    const change = previous ? ((current - previous) / previous) * 100 : 0;
    const budgetVariance = budget ? ((current - budget) / budget) * 100 : 0;

    const formatValue = (value: number) => {
      switch (format) {
        case "currency":
          return formatCurrency(value);
        case "percentage":
          return formatPercentage(value);
        case "number":
          return formatNumber(value);
        default:
          return value.toString();
      }
    };

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Icon className="w-8 h-8 text-blue-600" />
            <div className="flex items-center space-x-2">
              {change !== 0 && (
                <div
                  className={`flex items-center text-sm ${
                    change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {change > 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(change).toFixed(1)}%
                </div>
              )}
              {budget && (
                <Badge
                  className={`text-xs ${
                    Math.abs(budgetVariance) < 2
                      ? "bg-green-100 text-green-800"
                      : Math.abs(budgetVariance) < 5
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {budgetVariance > 0 ? "+" : ""}
                  {budgetVariance.toFixed(1)}% vs budget
                </Badge>
              )}
            </div>
          </div>

          <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <div className="text-3xl font-bold text-gray-900">
              {formatValue(current)}
            </div>
          </div>

          {previous && (
            <div className="text-sm text-gray-500">
              {language === "el" ? "Προηγούμενη περίοδος:" : "Previous period:"}{" "}
              {formatValue(previous)}
            </div>
          )}

          {budget && (
            <div className="text-sm text-gray-500">
              {language === "el" ? "Προϋπολογισμός:" : "Budget:"}{" "}
              {formatValue(budget)}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const RatioCard = ({ category, ratios, benchmarks }: any) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{category}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(ratios).map(([key, value]: [string, any]) => {
          const benchmark = benchmarks[key];
          const performance = benchmark
            ? ((value - benchmark) / benchmark) * 100
            : 0;

          return (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{value.toFixed(2)}</span>
                {benchmark && (
                  <Badge
                    className={`text-xs ${
                      Math.abs(performance) < 5
                        ? "bg-green-100 text-green-800"
                        : Math.abs(performance) < 15
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {performance > 0 ? "+" : ""}
                    {performance.toFixed(1)}%
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );

  const CashFlowWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Wallet className="w-4 h-4 mr-2 text-green-600" />
          {language === "el" ? "Ταμειακές Ροές" : "Cash Flow"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {language === "el" ? "Λειτουργικές" : "Operating"}
            </span>
            <span
              className={`font-medium ${financialData.cashFlow.operating > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(financialData.cashFlow.operating)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {language === "el" ? "Επενδυτικές" : "Investing"}
            </span>
            <span
              className={`font-medium ${financialData.cashFlow.investing > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(financialData.cashFlow.investing)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">
              {language === "el" ? "Χρηματοδοτικ��ς" : "Financing"}
            </span>
            <span
              className={`font-medium ${financialData.cashFlow.financing > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(financialData.cashFlow.financing)}
            </span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">
                {language === "el" ? "Καθαρές" : "Net Cash Flow"}
              </span>
              <span
                className={`font-bold text-lg ${financialData.cashFlow.net > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatCurrency(financialData.cashFlow.net)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {language === "el"
                ? "Burn Rate (μηνιαίος):"
                : "Monthly Burn Rate:"}
            </span>
            <span className="font-medium">
              {formatCurrency(financialData.cashFlow.burnRate)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{language === "el" ? "Cash Runway:" : "Cash Runway:"}</span>
            <span className="font-medium">
              {financialData.cashFlow.runway}{" "}
              {language === "el" ? "μήνες" : "months"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ForecastWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <Brain className="w-4 h-4 mr-2 text-purple-600" />
          {language === "el"
            ? "Χρηματοοικονομικές Προβλέψεις"
            : "Financial Forecast"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {language === "el" ? "Μέθοδος:" : "Method:"}
          </span>
          <Badge className="bg-purple-100 text-purple-800">
            {financialData.forecast.method}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center">
            <div className="font-bold text-lg text-purple-600">
              {formatPercentage(financialData.forecast.accuracy)}
            </div>
            <div className="text-gray-600">
              {language === "el" ? "Ακρίβεια" : "Accuracy"}
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-blue-600">
              {formatPercentage(financialData.forecast.confidence)}
            </div>
            <div className="text-gray-600">
              {language === "el" ? "Εμπιστοσύνη" : "Confidence"}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-xs text-gray-600 mb-2">
            {language === "el" ? "Επόμενο Τρίμηνο" : "Next Quarter"}
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>{language === "el" ? "Έσοδα:" : "Revenue:"}</span>
              <span className="font-medium">
                {formatCurrency(financialData.forecast.nextQuarter.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{language === "el" ? "Κέρδος:" : "Profit:"}</span>
              <span className="font-medium">
                {formatCurrency(financialData.forecast.nextQuarter.profit)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-xs text-gray-600 mb-2">
            {language === "el" ? "Σενάρια" : "Scenarios"}
          </div>
          <div className="space-y-1">
            {Object.entries(financialData.forecast.scenarios).map(
              ([scenario, data]: [string, any]) => (
                <div
                  key={scenario}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="capitalize">{scenario}</span>
                  <div className="flex items-center space-x-2">
                    <span>{formatCurrency(data.revenue)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {data.probability}%
                    </Badge>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const RiskAnalysisWidget = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
          {language === "el" ? "Ανάλυση Κινδύνου" : "Risk Analysis"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {financialData.risks.map((risk, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-sm">{risk.risk}</div>
              <div className={`text-sm font-bold ${getRiskColor(risk.score)}`}>
                {risk.score.toFixed(1)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>Impact: {risk.impact}</div>
              <div>Probability: {risk.probability}</div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {language === "el" ? "Μετριασμός:" : "Mitigation:"}{" "}
              {risk.mitigation}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Προχωρημένα Οικονομικά"
              : "Advanced Financial Analytics"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Λεπτομερής χρηματοοικονομική ανάλυση και reporting"
              : "Detailed financial analysis and reporting"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSensitiveData(!showSensitiveData)}
          >
            {showSensitiveData ? (
              <EyeOff className="w-4 h-4 mr-2" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
            {showSensitiveData
              ? language === "el"
                ? "Απόκρυψη"
                : "Hide"
              : language === "el"
                ? "Εμφάνιση"
                : "Show"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            {language === "el" ? "Ρυθμίσεις" : "Settings"}
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {language === "el" ? "Περίοδος:" : "Period:"}
              </span>
              <div className="flex space-x-1">
                {[
                  { id: "month", label: language === "el" ? "Μήνας" : "Month" },
                  {
                    id: "quarter",
                    label: language === "el" ? "Τρίμηνο" : "Quarter",
                  },
                  { id: "year", label: language === "el" ? "Έτος" : "Year" },
                  { id: "ytd", label: "YTD" },
                ].map((range) => (
                  <Button
                    key={range.id}
                    size="sm"
                    variant={timeRange === range.id ? "default" : "outline"}
                    onClick={() => setTimeRange(range.id)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {language === "el" ? "Σύγκριση:" : "Compare:"}
              </span>
              <select
                value={comparisonMode}
                onChange={(e) => setComparisonMode(e.target.value)}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="period">
                  {language === "el" ? "Περίοδος" : "Period"}
                </option>
                <option value="budget">
                  {language === "el" ? "Προϋπολογισμός" : "Budget"}
                </option>
                <option value="forecast">
                  {language === "el" ? "Πρόβλεψη" : "Forecast"}
                </option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="pnl">
            {language === "el" ? "Κ&Ζ" : "P&L"}
          </TabsTrigger>
          <TabsTrigger value="cashflow">
            {language === "el" ? "Ταμειακές" : "Cash Flow"}
          </TabsTrigger>
          <TabsTrigger value="ratios">
            {language === "el" ? "Δείκτες" : "Ratios"}
          </TabsTrigger>
          <TabsTrigger value="forecast">
            {language === "el" ? "Προβλέψεις" : "Forecast"}
          </TabsTrigger>
          <TabsTrigger value="risk">
            {language === "el" ? "Κίνδυνος" : "Risk"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FinancialKPICard
              title={language === "el" ? "Συνολικά Έσοδα" : "Total Revenue"}
              current={financialData.revenue.current}
              previous={financialData.revenue.previous}
              budget={financialData.revenue.budget}
              icon={DollarSign}
              format="currency"
            />
            <FinancialKPICard
              title={language === "el" ? "Μικτό Κέρδος" : "Gross Profit"}
              current={financialData.profitability.gross}
              previous={financialData.profitability.gross * 0.92}
              budget={financialData.profitability.gross * 0.95}
              icon={TrendingUp}
              format="currency"
            />
            <FinancialKPICard
              title={language === "el" ? "Μικτό Περιθώριο" : "Gross Margin"}
              current={financialData.profitability.margins.gross}
              previous={42.1}
              budget={45.0}
              icon={Percent}
              format="percentage"
            />
            <FinancialKPICard
              title={language === "el" ? "Καθαρό Κέρδος" : "Net Profit"}
              current={financialData.profitability.net}
              previous={456000}
              budget={520000}
              icon={Target}
              format="currency"
            />
          </div>

          {/* Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Χρηματοοικονομική Επίδοση"
                      : "Financial Performance"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        {language === "el"
                          ? "Διαδραστικό γράφημα χρηματοοικονομικής επίδοσης"
                          : "Interactive financial performance chart"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-green-600" />
                    {language === "el" ? "Ανάλυση Εσόδων" : "Revenue Analysis"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-3">
                        {language === "el" ? "Ανά Κατηγορία" : "By Category"}
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(financialData.revenue.breakdown).map(
                          ([key, value]: [string, any]) => (
                            <div
                              key={key}
                              className="flex justify-between text-sm"
                            >
                              <span className="capitalize">{key}</span>
                              <span className="font-medium">
                                {formatCurrency(value)}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">
                        {language === "el" ? "Ανά Segment" : "By Segment"}
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(financialData.revenue.bySegment).map(
                          ([key, value]: [string, any]) => (
                            <div
                              key={key}
                              className="flex justify-between text-sm"
                            >
                              <span className="capitalize">{key}</span>
                              <span className="font-medium">
                                {formatCurrency(value)}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <CashFlowWidget />
              <ForecastWidget />
              <RiskAnalysisWidget />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pnl" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Κατάσταση Κερδών & Ζημιών"
                  : "Profit & Loss Statement"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Receipt className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Λεπτομερής κατάσταση Κ&Ζ"
                      : "Detailed P&L statement"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Ανάλυση Ταμειακών Ροών"
                  : "Cash Flow Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Wallet className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Λεπτομερής ανάλυση ταμειακών ροών"
                      : "Detailed cash flow analysis"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RatioCard
              category={language === "el" ? "Ρευστότητα" : "Liquidity"}
              ratios={financialData.ratios.liquidity}
              benchmarks={{ current: 2.0, quick: 1.5, cash: 1.0 }}
            />
            <RatioCard
              category={language === "el" ? "Αποδοτικότητα" : "Efficiency"}
              ratios={financialData.ratios.efficiency}
              benchmarks={{
                inventoryTurnover: 6.0,
                receivablesTurnover: 10.0,
                assetTurnover: 1.0,
              }}
            />
            <RatioCard
              category={language === "el" ? "Κερδοφορία" : "Profitability"}
              ratios={financialData.ratios.profitability}
              benchmarks={{ roe: 15.0, roa: 10.0, roic: 12.0 }}
            />
            <RatioCard
              category={language === "el" ? "Μόχλευση" : "Leverage"}
              ratios={financialData.ratios.leverage}
              benchmarks={{
                debtToEquity: 0.5,
                debtToAssets: 0.3,
                interestCoverage: 6.0,
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el"
                  ? "Προηγμένες Προβλέψεις"
                  : "Advanced Forecasting"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Brain className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "ML-powered χρηματοοικονομικές προβλέψεις"
                      : "ML-powered financial forecasting"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                {language === "el"
                  ? "Χρηματοοικονομική Ανάλυση Κινδύνου"
                  : "Financial Risk Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <AlertTriangle className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Εκτίμηση και διαχείριση χρηματοοικονομικών κινδύνων"
                      : "Financial risk assessment and management"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFinancialAnalytics;
