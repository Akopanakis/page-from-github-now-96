import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Users,
  Package,
  Truck,
  Factory,
  Briefcase,
  CreditCard,
  Banknote,
  Percent,
  ArrowUp,
  ArrowDown,
  Equal,
  Minus,
  Plus,
  Scale,
  Clock,
  Calendar,
  FileText,
  Settings,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FinancialIndicatorsProps {
  formData?: any;
  results?: any;
}

const AdvancedFinancialIndicators: React.FC<FinancialIndicatorsProps> = ({
  formData,
  results,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("profitability");
  const [timeframe, setTimeframe] = useState("month");
  const [currency, setCurrency] = useState("EUR");
  const [liveUpdate, setLiveUpdate] = useState(true);

  // Core Financial Metrics
  const [financialMetrics, setFinancialMetrics] = useState({
    // Profitability Ratios
    grossProfitMargin: 32.5,
    netProfitMargin: 18.7,
    operatingMargin: 24.3,
    ebitdaMargin: 28.9,
    returnOnAssets: 15.2,
    returnOnEquity: 22.8,
    returnOnInvestment: 19.4,
    earningsPerShare: 2.45,

    // Liquidity Ratios
    currentRatio: 2.3,
    quickRatio: 1.8,
    cashRatio: 0.9,
    workingCapitalRatio: 1.5,
    operatingCashFlowRatio: 1.2,
    cashConversionCycle: 45.2,
    daysSalesOutstanding: 32.1,
    daysInventoryOutstanding: 28.5,

    // Efficiency Ratios
    assetTurnover: 1.8,
    inventoryTurnover: 12.5,
    receivablesTurnover: 11.2,
    payablesTurnover: 9.8,
    workingCapitalTurnover: 6.7,
    salesPerEmployee: 185000,
    revenuePerSquareMeter: 2850,
    capacityUtilization: 87.5,

    // Leverage Ratios
    debtToEquity: 0.45,
    debtToAssets: 0.28,
    equityMultiplier: 1.8,
    interestCoverageRatio: 8.5,
    debtServiceCoverageRatio: 2.1,
    fixedChargeCoverageRatio: 3.2,
    capitalAdequacyRatio: 12.8,
    longTermDebtToCapitalization: 0.35,

    // Market Performance
    priceToEarningsRatio: 16.5,
    priceToBookRatio: 2.8,
    enterpriseValue: 45000000,
    marketCapitalization: 38500000,
    bookValuePerShare: 18.5,
    dividendYield: 3.2,
    dividendPayoutRatio: 35.5,
    totalShareholderReturn: 12.7,

    // Cost Management
    costOfGoodsSold: 67.5,
    operatingExpenseRatio: 15.2,
    administrativeExpenseRatio: 6.8,
    sellingExpenseRatio: 8.5,
    researchDevelopmentRatio: 4.2,
    marketingCostRatio: 5.8,
    qualityCostRatio: 2.1,
    maintenanceCostRatio: 3.5,

    // Cash Flow Metrics
    operatingCashFlow: 2850000,
    freeCashFlow: 2240000,
    cashFlowFromOperations: 2850000,
    cashFlowFromInvesting: -580000,
    cashFlowFromFinancing: -320000,
    cashFlowCoverageRatio: 1.8,
    cashReturnOnAssets: 16.8,
    cashFlowPerShare: 5.85,

    // Growth Metrics
    revenueGrowthRate: 8.5,
    earningsGrowthRate: 12.2,
    assetGrowthRate: 6.8,
    employeeGrowthRate: 4.5,
    customerGrowthRate: 15.3,
    marketShareGrowth: 2.1,
    organicGrowthRate: 7.8,
    acquisitionGrowthRate: 0.7,
  });

  // Industry Benchmarks
  const [benchmarks, setBenchmarks] = useState({
    grossProfitMargin: { value: 28.0, status: "above" },
    netProfitMargin: { value: 15.5, status: "above" },
    currentRatio: { value: 2.0, status: "above" },
    debtToEquity: { value: 0.6, status: "below" },
    returnOnAssets: { value: 12.0, status: "above" },
    inventoryTurnover: { value: 10.0, status: "above" },
    revenueGrowthRate: { value: 6.0, status: "above" },
  });

  // Trend Data for Charts
  const [trendData, setTrendData] = useState([
    {
      period: "Q1",
      revenue: 12500000,
      profit: 2340000,
      margin: 18.7,
      cash: 1850000,
    },
    {
      period: "Q2",
      revenue: 13200000,
      profit: 2680000,
      margin: 20.3,
      cash: 2100000,
    },
    {
      period: "Q3",
      revenue: 14100000,
      profit: 2850000,
      margin: 20.2,
      cash: 2340000,
    },
    {
      period: "Q4",
      revenue: 15800000,
      profit: 3200000,
      margin: 20.3,
      cash: 2680000,
    },
    {
      period: "Q1Y2",
      revenue: 16200000,
      profit: 3420000,
      margin: 21.1,
      cash: 2850000,
    },
    {
      period: "Q2Y2",
      revenue: 17500000,
      profit: 3750000,
      margin: 21.4,
      cash: 3120000,
    },
  ]);

  // Risk Metrics
  const [riskMetrics, setRiskMetrics] = useState({
    creditRisk: { score: 25, level: "Low" },
    liquidityRisk: { score: 15, level: "Very Low" },
    operationalRisk: { score: 35, level: "Medium" },
    marketRisk: { score: 45, level: "Medium" },
    concentrationRisk: { score: 30, level: "Low" },
    regulatoryRisk: { score: 20, level: "Low" },
    reputationalRisk: { score: 18, level: "Low" },
    cybersecurityRisk: { score: 28, level: "Low" },
  });

  // Key Performance Indicators
  const [kpis, setKpis] = useState([
    {
      name: "Revenue per Customer",
      value: 1850,
      target: 2000,
      unit: "€",
      trend: 8.5,
      category: "Revenue",
    },
    {
      name: "Customer Acquisition Cost",
      value: 125,
      target: 150,
      unit: "€",
      trend: -12.3,
      category: "Marketing",
    },
    {
      name: "Customer Lifetime Value",
      value: 4500,
      target: 5000,
      unit: "€",
      trend: 15.2,
      category: "Revenue",
    },
    {
      name: "Gross Margin per Product",
      value: 32.5,
      target: 35.0,
      unit: "%",
      trend: 3.2,
      category: "Profitability",
    },
    {
      name: "Working Capital Efficiency",
      value: 87.5,
      target: 90.0,
      unit: "%",
      trend: 5.8,
      category: "Efficiency",
    },
    {
      name: "EBITDA per Employee",
      value: 85000,
      target: 90000,
      unit: "€",
      trend: 7.2,
      category: "Productivity",
    },
  ]);

  // Sensitivity Analysis Data
  const [sensitivityData, setSensitivityData] = useState([
    { scenario: "Base Case", revenue: 100, profit: 100, margin: 20.0 },
    { scenario: "Price +10%", revenue: 110, profit: 130, margin: 23.6 },
    { scenario: "Price -10%", revenue: 90, profit: 70, margin: 15.6 },
    { scenario: "Volume +20%", revenue: 120, profit: 140, margin: 23.3 },
    { scenario: "Volume -20%", revenue: 80, profit: 60, margin: 15.0 },
    { scenario: "Cost +15%", revenue: 100, profit: 70, margin: 14.0 },
    { scenario: "Cost -15%", revenue: 100, profit: 130, margin: 26.0 },
  ]);

  // Peer Comparison Data
  const [peerComparison, setPeerComparison] = useState([
    { company: "Company A", margin: 18.5, roe: 20.2, debt: 0.52, growth: 6.8 },
    { company: "Company B", margin: 22.1, roe: 25.1, debt: 0.38, growth: 9.2 },
    {
      company: "Our Company",
      margin: 20.3,
      roe: 22.8,
      debt: 0.45,
      growth: 8.5,
    },
    { company: "Company C", margin: 16.8, roe: 18.9, debt: 0.61, growth: 5.5 },
    { company: "Company D", margin: 19.7, roe: 21.5, debt: 0.49, growth: 7.3 },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals = 1) => {
    return num.toLocaleString(language === "el" ? "el-GR" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatPercentage = (value: number, decimals = 1) => {
    return `${formatNumber(value, decimals)}%`;
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
    if (trend < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
    return <Equal className="w-3 h-3 text-gray-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Very Low":
        return "bg-green-100 text-green-800";
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Very High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
  ];

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              {language === "el"
                ? "Προηγμένοι Χρηματοοικονομικοί Δείκτες"
                : "Advanced Financial Indicators"}
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="live-update">Live Updates</Label>
                <Switch
                  id="live-update"
                  checked={liveUpdate}
                  onCheckedChange={setLiveUpdate}
                />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Financial Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatPercentage(financialMetrics.netProfitMargin)}
              </div>
              <div className="text-sm text-blue-600">Net Margin</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(financialMetrics.returnOnEquity)}
              </div>
              <div className="text-sm text-green-600">ROE</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(financialMetrics.currentRatio, 1)}
              </div>
              <div className="text-sm text-purple-600">Current Ratio</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatPercentage(financialMetrics.revenueGrowthRate)}
              </div>
              <div className="text-sm text-orange-600">Revenue Growth</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="leverage">Leverage</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="profitability" className="space-y-6">
          {/* Profitability Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gross Profit Margin</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatPercentage(financialMetrics.grossProfitMargin)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getTrendIcon(2.3)}
                      <span className="text-xs text-green-600">
                        +2.3% vs last period
                      </span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Profit Margin</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPercentage(financialMetrics.netProfitMargin)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getTrendIcon(1.8)}
                      <span className="text-xs text-blue-600">
                        +1.8% vs last period
                      </span>
                    </div>
                  </div>
                  <Calculator className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">EBITDA Margin</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(financialMetrics.ebitdaMargin)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getTrendIcon(3.1)}
                      <span className="text-xs text-purple-600">
                        +3.1% vs last period
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Return on Equity</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatPercentage(financialMetrics.returnOnEquity)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {getTrendIcon(4.2)}
                      <span className="text-xs text-orange-600">
                        +4.2% vs last period
                      </span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profitability Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Profitability Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="profit"
                    fill="#8884d8"
                    name="Profit (€)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="margin"
                    stroke="#ff7300"
                    name="Margin %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Profitability Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Profitability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Operating Margin
                    </span>
                    <span className="font-semibold">
                      {formatPercentage(financialMetrics.operatingMargin)}
                    </span>
                  </div>
                  <Progress
                    value={financialMetrics.operatingMargin}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Return on Assets
                    </span>
                    <span className="font-semibold">
                      {formatPercentage(financialMetrics.returnOnAssets)}
                    </span>
                  </div>
                  <Progress
                    value={financialMetrics.returnOnAssets}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Return on Investment
                    </span>
                    <span className="font-semibold">
                      {formatPercentage(financialMetrics.returnOnInvestment)}
                    </span>
                  </div>
                  <Progress
                    value={financialMetrics.returnOnInvestment}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Earnings per Share
                    </span>
                    <span className="font-semibold">
                      €{formatNumber(financialMetrics.earningsPerShare)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-6">
          {/* Liquidity Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Ratio</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(financialMetrics.currentRatio, 1)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Target: 2.0+
                    </div>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Quick Ratio</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(financialMetrics.quickRatio, 1)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Target: 1.0+
                    </div>
                  </div>
                  <Zap className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cash Ratio</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatNumber(financialMetrics.cashRatio, 1)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Target: 0.5+
                    </div>
                  </div>
                  <Banknote className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Cash Conversion Cycle
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatNumber(financialMetrics.cashConversionCycle)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">days</div>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Working Capital Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Working Capital Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Days Sales Outstanding</h4>
                  <div className="text-3xl font-bold text-blue-600">
                    {formatNumber(financialMetrics.daysSalesOutstanding)} days
                  </div>
                  <Progress
                    value={(50 - financialMetrics.daysSalesOutstanding) * 2}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600">
                    Lower is better (Target: &lt;30 days)
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Days Inventory Outstanding</h4>
                  <div className="text-3xl font-bold text-green-600">
                    {formatNumber(financialMetrics.daysInventoryOutstanding)}{" "}
                    days
                  </div>
                  <Progress
                    value={
                      (40 - financialMetrics.daysInventoryOutstanding) * 2.5
                    }
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600">
                    Lower is better (Target: &lt;25 days)
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Working Capital Ratio</h4>
                  <div className="text-3xl font-bold text-purple-600">
                    {formatNumber(financialMetrics.workingCapitalRatio, 1)}
                  </div>
                  <Progress
                    value={financialMetrics.workingCapitalRatio * 50}
                    className="h-2"
                  />
                  <p className="text-xs text-gray-600">
                    Higher is better (Target: &gt;1.2)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liquidity Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cash"
                    stroke="#8884d8"
                    name="Cash Position (€000)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Asset Turnover</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(financialMetrics.assetTurnover, 1)}x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Revenue / Total Assets
                    </div>
                  </div>
                  <Package className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Inventory Turnover</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(financialMetrics.inventoryTurnover, 1)}x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      COGS / Avg Inventory
                    </div>
                  </div>
                  <Factory className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sales per Employee</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(financialMetrics.salesPerEmployee)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Annual Revenue / FTE
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Capacity Utilization
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatPercentage(financialMetrics.capacityUtilization)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Actual / Max Capacity
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Turnover Ratios Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Turnover Ratios Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Asset Turnover",
                      value: financialMetrics.assetTurnover,
                      target: 2.0,
                    },
                    {
                      name: "Inventory Turnover",
                      value: financialMetrics.inventoryTurnover,
                      target: 15.0,
                    },
                    {
                      name: "Receivables Turnover",
                      value: financialMetrics.receivablesTurnover,
                      target: 12.0,
                    },
                    {
                      name: "Payables Turnover",
                      value: financialMetrics.payablesTurnover,
                      target: 10.0,
                    },
                    {
                      name: "Working Capital Turnover",
                      value: financialMetrics.workingCapitalTurnover,
                      target: 8.0,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Current" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Efficiency KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis
              .filter(
                (kpi) =>
                  kpi.category === "Efficiency" ||
                  kpi.category === "Productivity",
              )
              .map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">{kpi.name}</h4>
                        <Badge
                          className={
                            kpi.trend > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {kpi.trend > 0 ? "+" : ""}
                          {formatNumber(kpi.trend)}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {kpi.unit === "€"
                            ? formatCurrency(kpi.value)
                            : `${formatNumber(kpi.value)}${kpi.unit}`}
                        </span>
                        <span className="text-sm text-gray-600">
                          Target:{" "}
                          {kpi.unit === "€"
                            ? formatCurrency(kpi.target)
                            : `${formatNumber(kpi.target)}${kpi.unit}`}
                        </span>
                      </div>
                      <Progress
                        value={(kpi.value / kpi.target) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="leverage" className="space-y-6">
          {/* Leverage Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Debt-to-Equity Ratio
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(financialMetrics.debtToEquity, 2)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Lower is better
                    </div>
                  </div>
                  <Scale className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Interest Coverage</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(financialMetrics.interestCoverageRatio, 1)}x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      EBIT / Interest Expense
                    </div>
                  </div>
                  <Percent className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Debt Service Coverage
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatNumber(
                        financialMetrics.debtServiceCoverageRatio,
                        1,
                      )}
                      x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Cash Flow / Debt Service
                    </div>
                  </div>
                  <CreditCard className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Equity Multiplier</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatNumber(financialMetrics.equityMultiplier, 1)}x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Total Assets / Equity
                    </div>
                  </div>
                  <Calculator className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leverage Analysis Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Leverage Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  data={[
                    {
                      subject: "Debt-to-Equity",
                      value: (1 - financialMetrics.debtToEquity) * 100,
                      fullMark: 100,
                    },
                    {
                      subject: "Interest Coverage",
                      value: Math.min(
                        financialMetrics.interestCoverageRatio * 10,
                        100,
                      ),
                      fullMark: 100,
                    },
                    {
                      subject: "Debt Service Coverage",
                      value: Math.min(
                        financialMetrics.debtServiceCoverageRatio * 25,
                        100,
                      ),
                      fullMark: 100,
                    },
                    {
                      subject: "Capital Adequacy",
                      value: financialMetrics.capitalAdequacyRatio * 5,
                      fullMark: 100,
                    },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Leverage Health"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          {/* Market Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">P/E Ratio</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(financialMetrics.priceToEarningsRatio, 1)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Price / Earnings
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Market Cap</p>
                    <p className="text-2xl font-bold text-green-600">
                      €
                      {formatNumber(
                        financialMetrics.marketCapitalization / 1000000,
                      )}
                      M
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Total Market Value
                    </div>
                  </div>
                  <Briefcase className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Dividend Yield</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatPercentage(financialMetrics.dividendYield)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Annual Dividend / Price
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Total Shareholder Return
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatPercentage(
                        financialMetrics.totalShareholderReturn,
                      )}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Price + Dividend Return
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Peer Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Peer Comparison Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart data={peerComparison}>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="margin"
                    name="Net Margin"
                    unit="%"
                    domain={["dataMin - 2", "dataMax + 2"]}
                  />
                  <YAxis
                    type="number"
                    dataKey="roe"
                    name="ROE"
                    unit="%"
                    domain={["dataMin - 2", "dataMax + 2"]}
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Companies" dataKey="roe" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          {/* Cash Flow Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Operating Cash Flow</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(financialMetrics.operatingCashFlow)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      Cash from Operations
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Free Cash Flow</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(financialMetrics.freeCashFlow)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      OCF - Capital Expenditures
                    </div>
                  </div>
                  <Banknote className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cash Flow Coverage</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatNumber(financialMetrics.cashFlowCoverageRatio, 1)}x
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      OCF / Total Debt
                    </div>
                  </div>
                  <Scale className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cash Flow per Share</p>
                    <p className="text-2xl font-bold text-orange-600">
                      €{formatNumber(financialMetrics.cashFlowPerShare)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      OCF / Shares Outstanding
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cash Flow Waterfall */}
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Operating",
                      value: financialMetrics.cashFlowFromOperations / 1000,
                    },
                    {
                      name: "Investing",
                      value: financialMetrics.cashFlowFromInvesting / 1000,
                    },
                    {
                      name: "Financing",
                      value: financialMetrics.cashFlowFromFinancing / 1000,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Cash Flow (€000)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(riskMetrics).map(([key, risk]) => (
                  <Card key={key}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h4>
                          <Badge className={getRiskColor(risk.level)}>
                            {risk.level}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Risk Score
                            </span>
                            <span className="font-semibold">
                              {risk.score}/100
                            </span>
                          </div>
                          <Progress value={risk.score} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sensitivity Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#8884d8"
                    name="Revenue Impact %"
                  />
                  <Bar dataKey="profit" fill="#82ca9d" name="Profit Impact %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          {/* Industry Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmark Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(benchmarks).map(([metric, benchmark]) => (
                  <div key={metric} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">
                        {metric.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Industry: {formatNumber(benchmark.value)}
                          {metric.includes("Ratio") || metric.includes("Margin")
                            ? "%"
                            : ""}
                        </span>
                        <Badge
                          className={
                            benchmark.status === "above"
                              ? "bg-green-100 text-green-800"
                              : benchmark.status === "below"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {benchmark.status === "above"
                            ? "Above Benchmark"
                            : benchmark.status === "below"
                              ? "Below Benchmark"
                              : "At Benchmark"}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress
                        value={Math.min(
                          100,
                          (financialMetrics[
                            metric as keyof typeof financialMetrics
                          ] /
                            benchmark.value) *
                            50,
                        )}
                        className="h-4"
                      />
                      <div
                        className="absolute top-0 h-4 w-1 bg-red-500"
                        style={{ left: "50%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        Current:{" "}
                        {formatNumber(
                          financialMetrics[
                            metric as keyof typeof financialMetrics
                          ],
                        )}
                      </span>
                      <span>Target: {formatNumber(benchmark.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Score */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Financial Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-green-600">85</div>
                <div className="text-lg text-gray-600">
                  Excellent Financial Health
                </div>
                <Progress value={85} className="h-4" />
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92</div>
                    <div className="text-sm text-gray-600">Profitability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">88</div>
                    <div className="text-sm text-gray-600">Liquidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">78</div>
                    <div className="text-sm text-gray-600">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">82</div>
                    <div className="text-sm text-gray-600">Stability</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share Analysis
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedFinancialIndicators;
