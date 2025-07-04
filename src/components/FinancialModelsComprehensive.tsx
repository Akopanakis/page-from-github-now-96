import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle,
  Zap,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  Copy,
  FileText,
  Calendar,
  Clock,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Globe,
  Building,
  Factory,
  Ship,
  Package,
  Users,
  CreditCard,
  Briefcase,
  Scale,
  Timer,
  Award,
  Heart,
  Shield,
  Leaf,
  Star,
  Navigation,
  Anchor,
  Fish,
  Waves,
  Fuel,
  ThermometerSun,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FinancialModel {
  id: string;
  name: string;
  type: "dcf" | "ratio" | "budget" | "forecast" | "scenario" | "valuation";
  description: string;
  lastUpdated: Date;
  status: "active" | "draft" | "archived";
  confidence: number;
  timeframe: string;
  currency: string;
  category: "operational" | "investment" | "strategic" | "compliance";
}

interface CashFlowProjection {
  period: string;
  revenue: number;
  operatingExpenses: number;
  capitalExpenditure: number;
  workingCapital: number;
  freeCashFlow: number;
  cumulativeCashFlow: number;
  discountRate: number;
  presentValue: number;
}

interface FinancialRatio {
  category: string;
  name: string;
  value: number;
  benchmark: number;
  interpretation: "excellent" | "good" | "average" | "poor";
  trend: "improving" | "stable" | "declining";
  description: string;
}

interface ScenarioAnalysis {
  scenario: string;
  probability: number;
  revenue: number;
  costs: number;
  netIncome: number;
  roi: number;
  riskLevel: "low" | "medium" | "high";
  description: string;
}

interface FinancialModelsComprehensiveProps {
  className?: string;
}

const FinancialModelsComprehensive: React.FC<
  FinancialModelsComprehensiveProps
> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [refreshRate, setRefreshRate] = useState(60);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [currency, setCurrency] = useState("EUR");

  // Financial Models Data
  const financialModels: FinancialModel[] = [
    {
      id: "dcf_001",
      name:
        language === "el"
          ? "Προεξοφλημένες Ταμειακές Ροές"
          : "Discounted Cash Flow",
      type: "dcf",
      description:
        language === "el"
          ? "5-ετές μοντέλο DCF για ��ξιολόγηση επένδυσης"
          : "5-year DCF model for investment valuation",
      lastUpdated: new Date("2024-11-20"),
      status: "active",
      confidence: 87,
      timeframe: "5 years",
      currency: "EUR",
      category: "investment",
    },
    {
      id: "budget_002",
      name:
        language === "el"
          ? "Ετήσιος Προϋπολογισμός 2025"
          : "Annual Budget 2025",
      type: "budget",
      description:
        language === "el"
          ? "Λεπτομερής προϋπολογισμός για το 2025"
          : "Detailed budget planning for 2025",
      lastUpdated: new Date("2024-11-18"),
      status: "active",
      confidence: 92,
      timeframe: "1 year",
      currency: "EUR",
      category: "operational",
    },
    {
      id: "forecast_003",
      name:
        language === "el" ? "Πρόβλεψη Εσόδων Q1-Q4" : "Revenue Forecast Q1-Q4",
      type: "forecast",
      description:
        language === "el"
          ? "Τριμηνιαίες προβλέψεις εσόδων"
          : "Quarterly revenue projections",
      lastUpdated: new Date("2024-11-19"),
      status: "active",
      confidence: 84,
      timeframe: "12 months",
      currency: "EUR",
      category: "operational",
    },
    {
      id: "ratio_004",
      name:
        language === "el"
          ? "Ανάλυση Χρηματοοικονομικών Δεικτών"
          : "Financial Ratio Analysis",
      type: "ratio",
      description:
        language === "el"
          ? "Συνολική ανάλυση αριθμοδεικτών"
          : "Comprehensive ratio analysis",
      lastUpdated: new Date("2024-11-17"),
      status: "active",
      confidence: 95,
      timeframe: "Current",
      currency: "EUR",
      category: "compliance",
    },
    {
      id: "scenario_005",
      name:
        language === "el"
          ? "Ανάλυση Σεναρίων Αγοράς"
          : "Market Scenario Analysis",
      type: "scenario",
      description:
        language === "el"
          ? "Ανάλυση διαφόρων σεναρίων αγοράς"
          : "Analysis of various market scenarios",
      lastUpdated: new Date("2024-11-16"),
      status: "active",
      confidence: 78,
      timeframe: "3 years",
      currency: "EUR",
      category: "strategic",
    },
  ];

  // Cash Flow Projections
  const cashFlowProjections: CashFlowProjection[] = [
    {
      period: "2025",
      revenue: 2450000,
      operatingExpenses: 1840000,
      capitalExpenditure: 180000,
      workingCapital: 45000,
      freeCashFlow: 385000,
      cumulativeCashFlow: 385000,
      discountRate: 8.5,
      presentValue: 354839,
    },
    {
      period: "2026",
      revenue: 2695000,
      operatingExpenses: 1985000,
      capitalExpenditure: 220000,
      workingCapital: 52000,
      freeCashFlow: 438000,
      cumulativeCashFlow: 823000,
      discountRate: 8.5,
      presentValue: 372157,
    },
    {
      period: "2027",
      revenue: 2964500,
      operatingExpenses: 2143600,
      capitalExpenditure: 195000,
      workingCapital: 58000,
      freeCashFlow: 567900,
      cumulativeCashFlow: 1390900,
      discountRate: 8.5,
      presentValue: 444582,
    },
    {
      period: "2028",
      revenue: 3260950,
      operatingExpenses: 2315760,
      capitalExpenditure: 170000,
      workingCapital: 64000,
      freeCashFlow: 711190,
      cumulativeCashFlow: 2102090,
      discountRate: 8.5,
      presentValue: 518734,
    },
    {
      period: "2029",
      revenue: 3587045,
      operatingExpenses: 2491086,
      capitalExpenditure: 185000,
      workingCapital: 71000,
      freeCashFlow: 839959,
      cumulativeCashFlow: 2942049,
      discountRate: 8.5,
      presentValue: 565847,
    },
  ];

  // Financial Ratios
  const financialRatios: FinancialRatio[] = [
    {
      category: language === "el" ? "Ρευστότητα" : "Liquidity",
      name: language === "el" ? "Γενικός Δείκτης Ρευστότητας" : "Current Ratio",
      value: 2.34,
      benchmark: 2.0,
      interpretation: "good",
      trend: "improving",
      description:
        language === "el"
          ? "Δυνατότητα κάλυψης βραχυπρόθεσμων υποχρεώσεων"
          : "Ability to cover short-term obligations",
    },
    {
      category: language === "el" ? "Ρευστότητα" : "Liquidity",
      name: language === "el" ? "Άμεσος Δείκτης Ρευστότητας" : "Quick Ratio",
      value: 1.87,
      benchmark: 1.5,
      interpretation: "excellent",
      trend: "stable",
      description:
        language === "el"
          ? "Άμεση ρευστότητα χωρίς αποθέματα"
          : "Immediate liquidity without inventory",
    },
    {
      category: language === "el" ? "Κερδοφορία" : "Profitability",
      name:
        language === "el" ? "Περιθώριο Καθαρού Κέρδους" : "Net Profit Margin",
      value: 15.8,
      benchmark: 12.0,
      interpretation: "excellent",
      trend: "improving",
      description:
        language === "el"
          ? "Καθαρό κέρδος ως ποσοστό πωλήσεων"
          : "Net profit as percentage of sales",
    },
    {
      category: language === "el" ? "Κερδοφορία" : "Profitability",
      name:
        language === "el"
          ? "Απόδοση Ιδίων Κεφαλαίων (ROE)"
          : "Return on Equity (ROE)",
      value: 18.4,
      benchmark: 15.0,
      interpretation: "excellent",
      trend: "improving",
      description:
        language === "el"
          ? "Απόδοση επένδυσης μετόχων"
          : "Return on shareholders' investment",
    },
    {
      category: language === "el" ? "Δραστηριότητα" : "Activity",
      name: language === "el" ? "Κύκλος Αποθέματος" : "Inventory Turnover",
      value: 6.8,
      benchmark: 6.0,
      interpretation: "good",
      trend: "stable",
      description:
        language === "el"
          ? "Ταχύτητα κίνησης αποθέματος"
          : "Speed of inventory movement",
    },
    {
      category: language === "el" ? "Μόχλευση" : "Leverage",
      name: language === "el" ? "Δείκτης Συνολικού Χρέους" : "Total Debt Ratio",
      value: 0.42,
      benchmark: 0.5,
      interpretation: "good",
      trend: "improving",
      description:
        language === "el"
          ? "Ποσοστό χρέους στο σύνολο ενεργητικού"
          : "Debt as percentage of total assets",
    },
  ];

  // Scenario Analysis
  const scenarioAnalysis: ScenarioAnalysis[] = [
    {
      scenario: language === "el" ? "Αισιόδοξο" : "Optimistic",
      probability: 25,
      revenue: 2800000,
      costs: 2050000,
      netIncome: 750000,
      roi: 26.8,
      riskLevel: "low",
      description:
        language === "el"
          ? "Βέλτιστες συνθήκες αγοράς και αυξημένη ζήτηση"
          : "Optimal market conditions and increased demand",
    },
    {
      scenario: language === "el" ? "Βασικό" : "Base Case",
      probability: 50,
      revenue: 2450000,
      costs: 1840000,
      netIncome: 610000,
      roi: 24.9,
      riskLevel: "medium",
      description:
        language === "el"
          ? "Αναμενόμενες συνθήκες αγοράς"
          : "Expected market conditions",
    },
    {
      scenario: language === "el" ? "Απαισιόδοξο" : "Pessimistic",
      probability: 25,
      revenue: 2100000,
      costs: 1680000,
      netIncome: 420000,
      roi: 20.0,
      riskLevel: "high",
      description:
        language === "el"
          ? "Δυσμενείς συνθήκες αγοράς και μειωμένη ζήτηση"
          : "Adverse market conditions and reduced demand",
    },
  ];

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, refreshRate * 1000);

    return () => clearInterval(interval);
  }, [refreshRate]);

  const formatCurrency = (amount: number, currencyCode: string = currency) => {
    return new Intl.NumberFormat("el-GR", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInterpretationColor = (interpretation: string) => {
    const colors = {
      excellent: "text-green-600 bg-green-100",
      good: "text-blue-600 bg-blue-100",
      average: "text-yellow-600 bg-yellow-100",
      poor: "text-red-600 bg-red-100",
    };
    return (
      colors[interpretation as keyof typeof colors] ||
      "text-gray-600 bg-gray-100"
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case "declining":
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    const colors = {
      low: "text-green-600 bg-green-100",
      medium: "text-yellow-600 bg-yellow-100",
      high: "text-red-600 bg-red-100",
    };
    return (
      colors[riskLevel as keyof typeof colors] || "text-gray-600 bg-gray-100"
    );
  };

  const getModelTypeIcon = (type: string) => {
    switch (type) {
      case "dcf":
        return <Calculator className="w-4 h-4" />;
      case "budget":
        return <Calendar className="w-4 h-4" />;
      case "forecast":
        return <TrendingUp className="w-4 h-4" />;
      case "ratio":
        return <BarChart3 className="w-4 h-4" />;
      case "scenario":
        return <Globe className="w-4 h-4" />;
      case "valuation":
        return <Target className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const totalPresentValue = cashFlowProjections.reduce(
    (sum, projection) => sum + projection.presentValue,
    0,
  );
  const terminalValue = 5000000; // Terminal value assumption
  const enterpriseValue = totalPresentValue + terminalValue;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Χρη��ατοοικονομικά Μοντέλα"
              : "Financial Models"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Ανάλυση, προβλέψεις και αξιολόγηση χρηματοοικονομικής επίδοσης"
              : "Analysis, forecasting and financial performance evaluation"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            {financialModels.filter((m) => m.status === "active").length}{" "}
            {language === "el" ? "ενεργά" : "active"}
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setLastUpdate(new Date())}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === "el" ? "Ανανέωση" : "Refresh"}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "Εξαγωγή" : "Export"}
          </Button>
          <Button size="sm">
            <Calculator className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέο Μοντέλο" : "New Model"}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Επιχειρηματική Αξία"
                    : "Enterprise Value"}
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(enterpriseValue)}
                </p>
              </div>
              <Calculator className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Ελεύθερες Ταμειακές Ροές"
                    : "Free Cash Flow"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(cashFlowProjections[0]?.freeCashFlow || 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Περιθώριο Κέρδους" : "Profit Margin"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {financialRatios
                    .find(
                      (r) =>
                        r.name.includes("Profit") || r.name.includes("Κέρδους"),
                    )
                    ?.value.toFixed(1)}
                  %
                </p>
              </div>
              <Percent className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Απόδοση Επένδυσης"
                    : "Return on Investment"}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {scenarioAnalysis
                    .find(
                      (s) =>
                        s.scenario.includes("Base") ||
                        s.scenario.includes("Βασικό"),
                    )
                    ?.roi.toFixed(1)}
                  %
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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
          <TabsTrigger value="dcf">
            {language === "el" ? "DCF" : "DCF"}
          </TabsTrigger>
          <TabsTrigger value="ratios">
            {language === "el" ? "Δείκτες" : "Ratios"}
          </TabsTrigger>
          <TabsTrigger value="scenarios">
            {language === "el" ? "Σενάρια" : "Scenarios"}
          </TabsTrigger>
          <TabsTrigger value="budgets">
            {language === "el" ? "Προϋπολογισμοί" : "Budgets"}
          </TabsTrigger>
          <TabsTrigger value="forecasts">
            {language === "el" ? "Προβλέψεις" : "Forecasts"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Models List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Διαθέσιμα Μοντέλα"
                      : "Available Models"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {financialModels.map((model) => (
                      <div
                        key={model.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedModel === model.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded">
                              {getModelTypeIcon(model.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{model.name}</h3>
                              <p className="text-sm text-gray-500">
                                {model.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {model.category}
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {model.timeframe}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {model.lastUpdated.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {model.confidence}%
                              </div>
                              <div className="text-xs text-gray-500">
                                {language === "el"
                                  ? "εμπιστοσύνη"
                                  : "confidence"}
                              </div>
                            </div>
                            <Badge
                              className={
                                model.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : model.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {model.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <BarChart3 className="w-4 h-4 mr-2 text-green-600" />
                    {language === "el" ? "Βασικοί Δείκτες" : "Key Metrics"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Ρευστότητα" : "Liquidity"}
                    </span>
                    <span className="font-bold text-green-600">2.34</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Κερδοφορία" : "Profitability"}
                    </span>
                    <span className="font-bold text-blue-600">15.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Μόχλευση" : "Leverage"}
                    </span>
                    <span className="font-bold text-purple-600">0.42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      {language === "el" ? "Απόδοση" : "Returns"}
                    </span>
                    <span className="font-bold text-orange-600">18.4%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                    {language === "el" ? "Ειδοποιήσεις" : "Alerts"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      {language === "el"
                        ? "Προϋπολογισμός 2025 χρειάζεται ανανέωση"
                        : "Budget 2025 needs update"}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm">
                    <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                    {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    {language === "el" ? "Νέα Ανάλυση DCF" : "New DCF Analysis"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <PieChart className="w-4 h-4 mr-2" />
                    {language === "el" ? "Ανάλυση Δεικτών" : "Ratio Analysis"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === "el"
                      ? "Ανάλυση Σεναρίων"
                      : "Scenario Analysis"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {language === "el" ? "Εξαγωγή Αναφοράς" : "Export Report"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dcf" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* DCF Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                    {language === "el"
                      ? "Προεξοφλημένες Ταμειακές Ροές"
                      : "Discounted Cash Flow Analysis"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {language === "el" ? "Παρούσα Αξία:" : "Present Value:"}{" "}
                      {formatCurrency(totalPresentValue)}
                    </Badge>
                    <Badge variant="outline">
                      {language === "el"
                        ? "Εταιρική Αξία:"
                        : "Enterprise Value:"}{" "}
                      {formatCurrency(enterpriseValue)}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {language === "el" ? "Περίοδος" : "Period"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Έσοδα" : "Revenue"}
                      </TableHead>
                      <TableHead>
                        {language === "el"
                          ? "Λειτουργικά Έξοδα"
                          : "Operating Expenses"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "CAPEX" : "CAPEX"}
                      </TableHead>
                      <TableHead>
                        {language === "el"
                          ? "Ελεύθερες Ταμ. Ροές"
                          : "Free Cash Flow"}
                      </TableHead>
                      <TableHead>
                        {language === "el" ? "Παρούσα Αξία" : "Present Value"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cashFlowProjections.map((projection) => (
                      <TableRow key={projection.period}>
                        <TableCell className="font-medium">
                          {projection.period}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(projection.revenue)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(projection.operatingExpenses)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(projection.capitalExpenditure)}
                        </TableCell>
                        <TableCell className="font-bold text-green-600">
                          {formatCurrency(projection.freeCashFlow)}
                        </TableCell>
                        <TableCell className="font-bold">
                          {formatCurrency(projection.presentValue)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 border-gray-300">
                      <TableCell className="font-bold">
                        {language === "el" ? "Σύνολο" : "Total"}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="font-bold text-green-600">
                        {formatCurrency(
                          cashFlowProjections.reduce(
                            (sum, p) => sum + p.freeCashFlow,
                            0,
                          ),
                        )}
                      </TableCell>
                      <TableCell className="font-bold text-blue-600">
                        {formatCurrency(totalPresentValue)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* DCF Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Settings className="w-4 h-4 mr-2 text-gray-600" />
                  {language === "el"
                    ? "Παραδοχές Μοντέλου"
                    : "Model Assumptions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">
                    {language === "el"
                      ? "Επιτόκιο Προεξόφλησης:"
                      : "Discount Rate:"}
                  </span>
                  <span className="font-medium">8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">
                    {language === "el" ? "Ρυθμός Ανάπτυξης:" : "Growth Rate:"}
                  </span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">
                    {language === "el" ? "Τερματική Αξία:" : "Terminal Value:"}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(terminalValue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">
                    {language === "el"
                      ? "Περίοδος Πρόβλεψης:"
                      : "Forecast Period:"}
                  </span>
                  <span className="font-medium">
                    5 {language === "el" ? "χρόνια" : "years"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">
                    {language === "el"
                      ? "Φορολογικός Συντελεστής:"
                      : "Tax Rate:"}
                  </span>
                  <span className="font-medium">24%</span>
                </div>
              </CardContent>
            </Card>

            {/* Sensitivity Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Target className="w-4 h-4 mr-2 text-purple-600" />
                  {language === "el"
                    ? "Ανάλυση Ευαισθησίας"
                    : "Sensitivity Analysis"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {language === "el"
                        ? "Επιτόκιο +1%:"
                        : "Discount Rate +1%:"}
                    </span>
                    <span className="text-red-600">-€234,567</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {language === "el" ? "Ανάπτυξη +2%:" : "Growth +2%:"}
                    </span>
                    <span className="text-green-600">+€456,789</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {language === "el" ? "CAPEX -10%:" : "CAPEX -10%:"}
                    </span>
                    <span className="text-green-600">+€178,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      {language === "el" ? "Περιθώριο +1%:" : "Margin +1%:"}
                    </span>
                    <span className="text-green-600">+€245,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {financialRatios.map((ratio, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                      {ratio.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(ratio.trend)}
                      <Badge
                        className={getInterpretationColor(ratio.interpretation)}
                      >
                        {ratio.interpretation}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold">
                          {ratio.value.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {language === "el" ? "Benchmark:" : "Benchmark:"}{" "}
                          {ratio.benchmark.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-medium ${
                            ratio.value > ratio.benchmark
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {ratio.value > ratio.benchmark ? "+" : ""}
                          {(
                            ((ratio.value - ratio.benchmark) /
                              ratio.benchmark) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                        <div className="text-xs text-gray-500">
                          vs benchmark
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>
                          {language === "el" ? "Απόδοση:" : "Performance:"}
                        </span>
                        <span>
                          {((ratio.value / ratio.benchmark) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(ratio.value / ratio.benchmark) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="text-xs text-gray-600 pt-2 border-t">
                      {ratio.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                {language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {scenarioAnalysis.map((scenario, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span>{scenario.scenario}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {scenario.probability}%
                          </Badge>
                          <Badge className={getRiskColor(scenario.riskLevel)}>
                            {scenario.riskLevel}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === "el" ? "Έσοδα:" : "Revenue:"}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(scenario.revenue)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === "el" ? "Κόστη:" : "Costs:"}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(scenario.costs)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === "el"
                              ? "Καθαρό Κέρδος:"
                              : "Net Income:"}
                          </span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(scenario.netIncome)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === "el" ? "ROI:" : "ROI:"}
                          </span>
                          <span className="font-bold text-blue-600">
                            {scenario.roi.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-600">
                          {scenario.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {language === "el"
                        ? "Σταθμισμένη Ανάλυση"
                        : "Weighted Analysis"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(
                            scenarioAnalysis.reduce(
                              (sum, s) =>
                                sum + (s.revenue * s.probability) / 100,
                              0,
                            ),
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "el"
                            ? "Σταθμισμένα Έσοδα"
                            : "Weighted Revenue"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(
                            scenarioAnalysis.reduce(
                              (sum, s) =>
                                sum + (s.netIncome * s.probability) / 100,
                              0,
                            ),
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "el"
                            ? "Σταθμισμένο Κέρδος"
                            : "Weighted Net Income"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {scenarioAnalysis
                            .reduce(
                              (sum, s) => sum + (s.roi * s.probability) / 100,
                              0,
                            )
                            .toFixed(1)}
                          %
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "el"
                            ? "Σταθμισμένο ROI"
                            : "Weighted ROI"}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {scenarioAnalysis
                            .reduce((sum, s) => {
                              const weight =
                                s.riskLevel === "high"
                                  ? 3
                                  : s.riskLevel === "medium"
                                    ? 2
                                    : 1;
                              return sum + (weight * s.probability) / 100;
                            }, 0)
                            .toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "el"
                            ? "Δείκτης Κινδύνου"
                            : "Risk Index"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                {language === "el" ? "Προϋπολογισμός 2025" : "Budget 2025"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Λεπτομερής προϋπολογισμός 2025"
                      : "Detailed budget planning for 2025"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                {language === "el" ? "Προβλέψεις Εσόδων" : "Revenue Forecasts"}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Προβλέψεις εσόδων και κερδοφορίας"
                      : "Revenue and profitability forecasts"}
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

export default FinancialModelsComprehensive;
