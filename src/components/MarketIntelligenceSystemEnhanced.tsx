import React, { useState, useEffect, useMemo } from "react";
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
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Layers,
  Database,
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Calculator,
  Zap,
  Brain,
  Fish,
  Anchor,
  Ship,
  Waves,
} from "lucide-react";

interface MarketIntelligenceSystemEnhancedProps {
  className?: string;
}

// Market Intelligence Data Structures
interface CompetitorData {
  name: string;
  marketShare: number;
  priceRange: { min: number; max: number };
  quality: number;
  sustainability: number;
  region: string;
  strengths: string[];
  weaknesses: string[];
  trend: "up" | "down" | "stable";
}

interface PriceMonitoringData {
  product: string;
  currentPrice: number;
  prevPrice: number;
  change: number;
  changePercent: number;
  region: string;
  supplier: string;
  quality: "premium" | "standard" | "basic";
  timestamp: string;
}

interface MarketTrendData {
  period: string;
  demand: number;
  supply: number;
  price: number;
  sustainability: number;
  innovation: number;
  regulation: number;
}

interface SupplierQualityData {
  supplier: string;
  qualityIndex: number;
  onTimeDelivery: number;
  defectRate: number;
  compliance: number;
  sustainability: number;
  relationship: number;
  cost: number;
  risk: "low" | "medium" | "high";
}

interface KPIData {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
  status: "good" | "warning" | "critical";
  description: string;
}

const MarketIntelligenceSystemEnhanced: React.FC<
  MarketIntelligenceSystemEnhancedProps
> = ({ className = "" }) => {
  const { language, currency } = useLanguage();
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("3months");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("salmon");
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  // 1. Real-time Competitor Analysis
  const competitorData: CompetitorData[] = useMemo(
    () => [
      {
        name: "AquaFresh Ltd",
        marketShare: 24.5,
        priceRange: { min: 12.5, max: 18.75 },
        quality: 8.7,
        sustainability: 9.2,
        region: "Northern Europe",
        strengths: ["Sustainable sourcing", "Premium quality", "Strong brand"],
        weaknesses: ["Higher pricing", "Limited regions"],
        trend: "up",
      },
      {
        name: "Ocean Harvest Co",
        marketShare: 18.3,
        priceRange: { min: 10.25, max: 15.5 },
        quality: 7.9,
        sustainability: 7.5,
        region: "Atlantic",
        strengths: ["Cost efficiency", "Wide distribution", "Technology"],
        weaknesses: ["Quality consistency", "Environmental concerns"],
        trend: "stable",
      },
      {
        name: "Nordic Seafood",
        marketShare: 15.7,
        priceRange: { min: 14.0, max: 22.0 },
        quality: 9.1,
        sustainability: 8.8,
        region: "Scandinavia",
        strengths: ["Premium positioning", "Innovation", "Sustainability"],
        weaknesses: ["Limited scale", "High costs"],
        trend: "up",
      },
      {
        name: "Global Fish Corp",
        marketShare: 12.8,
        priceRange: { min: 8.75, max: 13.25 },
        quality: 6.5,
        sustainability: 5.9,
        region: "Global",
        strengths: ["Low cost", "High volume", "Global reach"],
        weaknesses: ["Quality issues", "Sustainability concerns"],
        trend: "down",
      },
    ],
    [],
  );

  // 2. Real-time Price Monitoring
  const priceMonitoringData: PriceMonitoringData[] = useMemo(
    () => [
      {
        product: "Atlantic Salmon",
        currentPrice: 15.75,
        prevPrice: 15.2,
        change: 0.55,
        changePercent: 3.6,
        region: "Norway",
        supplier: "Nordic Farms",
        quality: "premium",
        timestamp: "2024-01-15 09:30",
      },
      {
        product: "Mediterranean Sea Bass",
        currentPrice: 18.9,
        prevPrice: 19.45,
        change: -0.55,
        changePercent: -2.8,
        region: "Greece",
        supplier: "Hellenic Aqua",
        quality: "premium",
        timestamp: "2024-01-15 09:25",
      },
      {
        product: "Atlantic Cod",
        currentPrice: 12.3,
        prevPrice: 11.85,
        change: 0.45,
        changePercent: 3.8,
        region: "Iceland",
        supplier: "Arctic Fresh",
        quality: "standard",
        timestamp: "2024-01-15 09:20",
      },
      {
        product: "Farm Raised Tuna",
        currentPrice: 24.5,
        prevPrice: 23.75,
        change: 0.75,
        changePercent: 3.2,
        region: "Spain",
        supplier: "Iberian Seas",
        quality: "premium",
        timestamp: "2024-01-15 09:15",
      },
    ],
    [],
  );

  // 3. Market Trends Analysis
  const marketTrendsData: MarketTrendData[] = useMemo(
    () => [
      {
        period: "Jan",
        demand: 85,
        supply: 78,
        price: 15.2,
        sustainability: 72,
        innovation: 68,
        regulation: 75,
      },
      {
        period: "Feb",
        demand: 88,
        supply: 82,
        price: 15.8,
        sustainability: 74,
        innovation: 71,
        regulation: 77,
      },
      {
        period: "Mar",
        demand: 92,
        supply: 85,
        price: 16.4,
        sustainability: 76,
        innovation: 73,
        regulation: 79,
      },
      {
        period: "Apr",
        demand: 89,
        supply: 88,
        price: 15.9,
        sustainability: 78,
        innovation: 75,
        regulation: 81,
      },
      {
        period: "May",
        demand: 95,
        supply: 90,
        price: 16.8,
        sustainability: 80,
        innovation: 78,
        regulation: 83,
      },
      {
        period: "Jun",
        demand: 98,
        supply: 93,
        price: 17.2,
        sustainability: 82,
        innovation: 80,
        regulation: 85,
      },
    ],
    [],
  );

  // 4. Supplier Quality Index
  const supplierQualityData: SupplierQualityData[] = useMemo(
    () => [
      {
        supplier: "Nordic Premium",
        qualityIndex: 94.5,
        onTimeDelivery: 98.2,
        defectRate: 0.8,
        compliance: 96.7,
        sustainability: 92.3,
        relationship: 95.1,
        cost: 15.75,
        risk: "low",
      },
      {
        supplier: "Atlantic Fresh",
        qualityIndex: 87.3,
        onTimeDelivery: 92.1,
        defectRate: 2.1,
        compliance: 89.4,
        sustainability: 85.7,
        relationship: 88.9,
        cost: 13.2,
        risk: "low",
      },
      {
        supplier: "Ocean Catch",
        qualityIndex: 78.9,
        onTimeDelivery: 85.6,
        defectRate: 4.2,
        compliance: 82.3,
        sustainability: 76.8,
        relationship: 79.5,
        cost: 11.85,
        risk: "medium",
      },
      {
        supplier: "Budget Seafood",
        qualityIndex: 65.4,
        onTimeDelivery: 73.2,
        defectRate: 8.7,
        compliance: 68.9,
        sustainability: 58.3,
        relationship: 64.1,
        cost: 9.5,
        risk: "high",
      },
    ],
    [],
  );

  // 5. Key Performance Indicators
  const kpiData: KPIData[] = useMemo(
    () => [
      {
        name: "Supplier Quality Index",
        value: 87.5,
        target: 90.0,
        unit: "%",
        trend: "up",
        change: 2.3,
        status: "warning",
        description: "Overall supplier quality performance",
      },
      {
        name: "Inventory Turnover Rate",
        value: 12.4,
        target: 15.0,
        unit: "times/year",
        trend: "up",
        change: 0.8,
        status: "warning",
        description: "How quickly inventory is sold",
      },
      {
        name: "Sustainable Sourcing %",
        value: 78.6,
        target: 85.0,
        unit: "%",
        trend: "up",
        change: 4.2,
        status: "good",
        description: "Percentage of sustainably sourced products",
      },
      {
        name: "Customer Satisfaction",
        value: 84.2,
        target: 80.0,
        unit: "%",
        trend: "up",
        change: 1.8,
        status: "good",
        description: "Customer satisfaction score",
      },
      {
        name: "Food Safety Compliance",
        value: 96.8,
        target: 95.0,
        unit: "%",
        trend: "stable",
        change: 0.2,
        status: "good",
        description: "Food safety standards compliance",
      },
      {
        name: "Market Share",
        value: 8.7,
        target: 10.0,
        unit: "%",
        trend: "up",
        change: 0.5,
        status: "warning",
        description: "Company's market share",
      },
      {
        name: "Price Competitiveness",
        value: 75.3,
        target: 80.0,
        unit: "index",
        trend: "down",
        change: -1.2,
        status: "warning",
        description: "Price position vs competitors",
      },
      {
        name: "Innovation Index",
        value: 72.1,
        target: 75.0,
        unit: "score",
        trend: "up",
        change: 3.5,
        status: "good",
        description: "Innovation and R&D performance",
      },
    ],
    [],
  );

  // 6. Market Intelligence Overview Metrics
  const overviewMetrics = useMemo(
    () => ({
      totalMarketSize: 2.4,
      marketGrowthRate: 5.8,
      competitorCount: 127,
      avgPriceChange: 3.2,
      sustainabilityTrend: 8.7,
      innovationScore: 74.5,
      riskLevel: "medium",
      opportunityScore: 82.3,
    }),
    [],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const formatCurrency = (value: number) => `${currency}${value.toFixed(2)}`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-blue-600" />
            {language === "el"
              ? "Σύστημα Market Intelligence"
              : "Market Intelligence System"}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === "el"
              ? "Ολοκληρωμένη ανάλυση αγοράς και ανταγωνισμού"
              : "Comprehensive market and competitive analysis"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={selectedTimeFrame}
            onValueChange={setSelectedTimeFrame}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">
                {language === "el" ? "1 Μήνας" : "1 Month"}
              </SelectItem>
              <SelectItem value="3months">
                {language === "el" ? "3 Μήνες" : "3 Months"}
              </SelectItem>
              <SelectItem value="6months">
                {language === "el" ? "6 Μήνες" : "6 Months"}
              </SelectItem>
              <SelectItem value="1year">
                {language === "el" ? "1 Έτος" : "1 Year"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "el" ? "Όλες Περιοχές" : "All Regions"}
              </SelectItem>
              <SelectItem value="europe">
                {language === "el" ? "Ευρώπη" : "Europe"}
              </SelectItem>
              <SelectItem value="atlantic">
                {language === "el" ? "Ατλαντικός" : "Atlantic"}
              </SelectItem>
              <SelectItem value="mediterranean">
                {language === "el" ? "Μεσόγειος" : "Mediterranean"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {language === "el" ? "Ανανέωση" : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Μέγεθος Αγοράς" : "Market Size"}
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(overviewMetrics.totalMarketSize)}B
                </p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ρυθμός Ανάπτυξης" : "Growth Rate"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercent(overviewMetrics.marketGrowthRate)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ανταγωνιστές" : "Competitors"}
                </p>
                <p className="text-2xl font-bold">
                  {overviewMetrics.competitorCount}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ευκαιρίες" : "Opportunities"}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {overviewMetrics.opportunityScore}/100
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="competitors">
            {language === "el" ? "Ανταγωνιστές" : "Competitors"}
          </TabsTrigger>
          <TabsTrigger value="pricing">
            {language === "el" ? "Τιμολόγηση" : "Pricing"}
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            {language === "el" ? "Προμηθευτές" : "Suppliers"}
          </TabsTrigger>
          <TabsTrigger value="kpis">
            {language === "el" ? "KPIs" : "KPIs"}
          </TabsTrigger>
        </TabsList>

        {/* 7. Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {language === "el" ? "Τάσεις Αγοράς" : "Market Trends"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="demand"
                      fill="#3b82f6"
                      name={language === "el" ? "Ζήτηση" : "Demand"}
                    />
                    <Bar
                      dataKey="supply"
                      fill="#10b981"
                      name={language === "el" ? "Προσφορά" : "Supply"}
                    />
                    <Line
                      dataKey="price"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name={language === "el" ? "Τιμή" : "Price"}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" />
                  {language === "el" ? "Μερίδιο Αγοράς" : "Market Share"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={competitorData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="marketShare"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {competitorData.map((entry, index) => (
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
              </CardContent>
            </Card>
          </div>

          {/* 8. Sustainability & Innovation Radar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                {language === "el"
                  ? "Ανάλυση Βιωσιμότητας & Καινοτομίας"
                  : "Sustainability & Innovation Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={marketTrendsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="period" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    name={language === "el" ? "Βιωσιμότητα" : "Sustainability"}
                    dataKey="sustainability"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name={language === "el" ? "Καινοτομία" : "Innovation"}
                    dataKey="innovation"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name={language === "el" ? "Κανονισμοί" : "Regulation"}
                    dataKey="regulation"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 9. Competitors Analysis Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Ανάλυση Ανταγωνιστών"
                  : "Competitive Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitorData.map((competitor, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg flex items-center">
                          {competitor.name}
                          {getTrendIcon(competitor.trend)}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {competitor.region}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {formatPercent(competitor.marketShare)}{" "}
                        {language === "el" ? "μερίδιο" : "share"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Εύρος Τιμών" : "Price Range"}
                        </p>
                        <p className="text-lg">
                          {formatCurrency(competitor.priceRange.min)} -{" "}
                          {formatCurrency(competitor.priceRange.max)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Ποιότητα" : "Quality"}
                        </p>
                        <div className="flex items-center">
                          <Progress
                            value={competitor.quality * 10}
                            className="flex-1 mr-2"
                          />
                          <span className="text-sm">
                            {competitor.quality}/10
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {language === "el" ? "Βιωσιμότητα" : "Sustainability"}
                        </p>
                        <div className="flex items-center">
                          <Progress
                            value={competitor.sustainability * 10}
                            className="flex-1 mr-2"
                          />
                          <span className="text-sm">
                            {competitor.sustainability}/10
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {language === "el" ? "Δυνατά Σημεία" : "Strengths"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {competitor.strengths.map((strength, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700"
                            >
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {language === "el" ? "Αδυναμίες" : "Weaknesses"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {competitor.weaknesses.map((weakness, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-red-50 text-red-700"
                            >
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 10. Real-time Price Monitoring Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                {language === "el"
                  ? "Παρακολούθηση Τιμών Πραγματικού Χρόνου"
                  : "Real-time Price Monitoring"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {language === "el" ? "Προϊόν" : "Product"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Τρέχουσα Τιμή" : "Current Price"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Αλλαγή" : "Change"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Περιοχή" : "Region"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Προμηθευτής" : "Supplier"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ποιότητα" : "Quality"}
                    </TableHead>
                    <TableHead>
                      {language === "el" ? "Ενημέρωση" : "Updated"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceMonitoringData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.product}
                      </TableCell>
                      <TableCell>{formatCurrency(item.currentPrice)}</TableCell>
                      <TableCell>
                        <div
                          className={`flex items-center ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.change >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          {formatCurrency(Math.abs(item.change))} (
                          {formatPercent(Math.abs(item.changePercent))})
                        </div>
                      </TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.quality === "premium"
                              ? "bg-blue-50 text-blue-700"
                              : item.quality === "standard"
                                ? "bg-gray-50 text-gray-700"
                                : "bg-orange-50 text-orange-700"
                          }
                        >
                          {item.quality}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {item.timestamp}
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
                {language === "el"
                  ? "Ιστορικές Τάσεις Τιμών"
                  : "Price Trend History"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name={language === "el" ? "Μέση Τιμή" : "Average Price"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 11. Supplier Quality Analysis Tab */}
        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                {language === "el"
                  ? "Δείκτης Ποιότητας Προμηθευτών"
                  : "Supplier Quality Index"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierQualityData.map((supplier, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {supplier.supplier}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-2xl font-bold text-blue-600">
                            {supplier.qualityIndex}%
                          </span>
                          <Badge
                            className={`ml-2 ${getRiskColor(supplier.risk)}`}
                          >
                            {supplier.risk} risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {language === "el" ? "Κόστος" : "Cost"}
                        </p>
                        <p className="text-lg font-semibold">
                          {formatCurrency(supplier.cost)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {[
                        {
                          label:
                            language === "el"
                              ? "Έγκαιρη Παράδοση"
                              : "On-time Delivery",
                          value: supplier.onTimeDelivery,
                        },
                        {
                          label:
                            language === "el"
                              ? "Ποσοστό Ελαττωμάτων"
                              : "Defect Rate",
                          value: 100 - supplier.defectRate,
                        },
                        {
                          label:
                            language === "el" ? "Συμμόρφωση" : "Compliance",
                          value: supplier.compliance,
                        },
                        {
                          label:
                            language === "el"
                              ? "Βιωσιμότητα"
                              : "Sustainability",
                          value: supplier.sustainability,
                        },
                        {
                          label: language === "el" ? "Σχέσεις" : "Relationship",
                          value: supplier.relationship,
                        },
                      ].map((metric, i) => (
                        <div key={i} className="text-center">
                          <p className="text-xs text-gray-600 mb-1">
                            {metric.label}
                          </p>
                          <div className="relative w-16 h-16 mx-auto">
                            <svg
                              className="w-16 h-16 transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                                strokeDasharray={`${metric.value}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-semibold">
                                {metric.value.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 12. KPIs Dashboard Tab */}
        <TabsContent value="kpis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getTrendIcon(kpi.trend)}
                      <span
                        className={`ml-1 text-sm ${kpi.change >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {kpi.change >= 0 ? "+" : ""}
                        {kpi.change.toFixed(1)}%
                      </span>
                    </div>
                    <Badge className={getStatusColor(kpi.status)}>
                      {kpi.status}
                    </Badge>
                  </div>

                  <h4 className="font-medium text-sm text-gray-700 mb-1">
                    {kpi.name}
                  </h4>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {kpi.value.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      {kpi.unit}
                    </span>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>
                        {language === "el" ? "Στόχος" : "Target"}: {kpi.target}
                        {kpi.unit}
                      </span>
                      <span>
                        {((kpi.value / kpi.target) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress
                      value={(kpi.value / kpi.target) * 100}
                      className="h-2"
                    />
                  </div>

                  <p className="text-xs text-gray-600 mt-2">
                    {kpi.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* KPIs Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el" ? "Τάσεις KPIs" : "KPIs Trends"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    dataKey="demand"
                    stroke="#3b82f6"
                    name={language === "el" ? "Ζήτηση" : "Demand"}
                  />
                  <Line
                    dataKey="supply"
                    stroke="#10b981"
                    name={language === "el" ? "Προσφορά" : "Supply"}
                  />
                  <Line
                    dataKey="sustainability"
                    stroke="#f59e0b"
                    name={language === "el" ? "Βιωσιμότητα" : "Sustainability"}
                  />
                  <Line
                    dataKey="innovation"
                    stroke="#ef4444"
                    name={language === "el" ? "Καινοτομία" : "Innovation"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketIntelligenceSystemEnhanced;
