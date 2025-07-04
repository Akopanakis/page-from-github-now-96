import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
  
  Treemap,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Target,
  Zap,
  Calculator,
  BarChart3,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Package,
  Truck,
  Factory,
  Leaf,
  Lightbulb,
  Settings,
  Bot as Robot,
  Scale,
  Database,
  Activity,
  Layers,
  Briefcase,
  FileText,
  Download,
  Share2,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Eye,
  EyeOff,
  Filter,
  Search,
  Plus,
  Minus,
  Equal,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CostOptimizationProps {
  formData?: any;
  results?: any;
}

const ComprehensiveCostOptimization: React.FC<CostOptimizationProps> = ({
  formData,
  results,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [optimizationMode, setOptimizationMode] = useState("automatic");
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");

  // Cost Optimization Strategies
  const [optimizationStrategies, setOptimizationStrategies] = useState([
    {
      id: 1,
      name: "Automated Procurement Optimization",
      category: "Procurement",
      description: "AI-driven supplier selection and contract negotiation",
      impact: "High",
      savings: 125000,
      implementation: "Medium",
      timeframe: "3 months",
      status: "Active",
      roi: 340,
      riskLevel: "Low",
      technologies: ["AI", "Machine Learning", "Data Analytics"],
    },
    {
      id: 2,
      name: "Energy Efficiency Program",
      category: "Operations",
      description: "Smart energy management and renewable sources",
      impact: "High",
      savings: 95000,
      implementation: "High",
      timeframe: "6 months",
      status: "In Progress",
      roi: 280,
      riskLevel: "Low",
      technologies: ["IoT", "Smart Grid", "Renewable Energy"],
    },
    {
      id: 3,
      name: "Lean Manufacturing Implementation",
      category: "Production",
      description: "Eliminate waste and optimize production processes",
      impact: "Very High",
      savings: 185000,
      implementation: "High",
      timeframe: "9 months",
      status: "Planning",
      roi: 450,
      riskLevel: "Medium",
      technologies: ["Lean", "Six Sigma", "Kaizen"],
    },
    {
      id: 4,
      name: "Predictive Maintenance System",
      category: "Maintenance",
      description: "Prevent equipment failures and optimize maintenance",
      impact: "High",
      savings: 78000,
      implementation: "Medium",
      timeframe: "4 months",
      status: "Active",
      roi: 320,
      riskLevel: "Low",
      technologies: ["Predictive Analytics", "IoT Sensors", "Machine Learning"],
    },
    {
      id: 5,
      name: "Supply Chain Optimization",
      category: "Logistics",
      description: "Route optimization and inventory management",
      impact: "High",
      savings: 142000,
      implementation: "Medium",
      timeframe: "5 months",
      status: "Active",
      roi: 380,
      riskLevel: "Low",
      technologies: [
        "Route Optimization",
        "Inventory Management",
        "Blockchain",
      ],
    },
    {
      id: 6,
      name: "Workforce Optimization",
      category: "Human Resources",
      description: "Optimize staffing levels and skill allocation",
      impact: "Medium",
      savings: 89000,
      implementation: "Low",
      timeframe: "2 months",
      status: "Completed",
      roi: 290,
      riskLevel: "Low",
      technologies: ["Workforce Analytics", "Skills Matrix", "Automation"],
    },
    {
      id: 7,
      name: "Digital Process Automation",
      category: "Technology",
      description: "Automate repetitive tasks and workflows",
      impact: "High",
      savings: 156000,
      implementation: "High",
      timeframe: "8 months",
      status: "In Progress",
      roi: 420,
      riskLevel: "Medium",
      technologies: ["RPA", "Workflow Automation", "AI"],
    },
    {
      id: 8,
      name: "Quality Cost Reduction",
      category: "Quality",
      description: "Reduce defects and improve first-pass yield",
      impact: "Medium",
      savings: 67000,
      implementation: "Medium",
      timeframe: "4 months",
      status: "Planning",
      roi: 250,
      riskLevel: "Low",
      technologies: ["Statistical Process Control", "Quality Analytics"],
    },
  ]);

  // Cost Breakdown Analysis
  const [costBreakdown, setCostBreakdown] = useState({
    directMaterials: {
      current: 2450000,
      optimized: 2205000,
      savings: 245000,
      percentage: 35.2,
      breakdown: {
        rawMaterials: 1680000,
        packaging: 420000,
        chemicals: 350000,
      },
    },
    labor: {
      current: 1850000,
      optimized: 1665000,
      savings: 185000,
      percentage: 26.6,
      breakdown: {
        directLabor: 1200000,
        supervisory: 350000,
        benefits: 300000,
      },
    },
    overhead: {
      current: 1250000,
      optimized: 1125000,
      savings: 125000,
      percentage: 17.9,
      breakdown: {
        utilities: 450000,
        maintenance: 380000,
        administration: 420000,
      },
    },
    logistics: {
      current: 950000,
      optimized: 808000,
      savings: 142000,
      percentage: 13.6,
      breakdown: {
        transportation: 520000,
        warehousing: 280000,
        distribution: 150000,
      },
    },
    technology: {
      current: 480000,
      optimized: 432000,
      savings: 48000,
      percentage: 6.9,
      breakdown: {
        software: 180000,
        hardware: 150000,
        services: 150000,
      },
    },
  });

  // Optimization Metrics
  const [optimizationMetrics, setOptimizationMetrics] = useState({
    totalCostReduction: 745000,
    percentageReduction: 12.5,
    annualSavings: 1490000,
    implementationCost: 435000,
    paybackPeriod: 3.5,
    netPresentValue: 2850000,
    internalRateOfReturn: 28.5,
    costOfCapital: 8.0,
    riskAdjustedReturn: 24.2,

    // Efficiency Metrics
    productivityGain: 18.5,
    qualityImprovement: 15.2,
    timeToMarketReduction: 22.0,
    customerSatisfactionGain: 8.5,
    employeeEfficiencyGain: 14.8,
    energyEfficiencyGain: 25.3,
    wasteReduction: 35.7,
    inventoryTurnoverImprovement: 28.9,

    // Performance Indicators
    overallEquipmentEffectiveness: 87.5,
    firstPassYield: 94.2,
    onTimeDelivery: 96.8,
    costPerUnit: 12.35,
    marginImprovement: 8.7,
    returnOnInvestment: 185.5,
    totalCostOfOwnership: 0.85,
    operationalEfficiency: 92.3,
  });

  // Benchmark Comparisons
  const [benchmarkData, setBenchmarkData] = useState([
    {
      metric: "Cost Efficiency",
      current: 78,
      industry: 72,
      best: 85,
      target: 82,
    },
    {
      metric: "Process Automation",
      current: 65,
      industry: 58,
      best: 78,
      target: 75,
    },
    {
      metric: "Energy Efficiency",
      current: 82,
      industry: 74,
      best: 88,
      target: 86,
    },
    {
      metric: "Waste Reduction",
      current: 71,
      industry: 65,
      best: 82,
      target: 78,
    },
    {
      metric: "Supply Chain Efficiency",
      current: 84,
      industry: 76,
      best: 89,
      target: 87,
    },
    {
      metric: "Quality Performance",
      current: 89,
      industry: 82,
      best: 94,
      target: 92,
    },
    {
      metric: "Technology Adoption",
      current: 73,
      industry: 67,
      best: 81,
      target: 79,
    },
    {
      metric: "Workforce Productivity",
      current: 86,
      industry: 79,
      best: 91,
      target: 89,
    },
  ]);

  // Advanced Analytics Models
  const [analyticsModels, setAnalyticsModels] = useState([
    {
      name: "ABC Cost Analysis",
      description: "Categorize costs by impact and frequency",
      accuracy: 94.5,
      savings: 185000,
      status: "Active",
    },
    {
      name: "Monte Carlo Simulation",
      description: "Risk assessment for cost optimization strategies",
      accuracy: 87.2,
      savings: 95000,
      status: "Active",
    },
    {
      name: "Machine Learning Predictor",
      description: "Predict cost trends and optimization opportunities",
      accuracy: 91.8,
      savings: 225000,
      status: "Training",
    },
    {
      name: "Scenario Planning Model",
      description: "What-if analysis for different optimization scenarios",
      accuracy: 89.3,
      savings: 156000,
      status: "Active",
    },
    {
      name: "Value Stream Mapping",
      description: "Identify waste and non-value-adding activities",
      accuracy: 92.7,
      savings: 178000,
      status: "Active",
    },
  ]);

  // Real-time Cost Monitoring
  const [costTrends, setCostTrends] = useState([
    {
      date: "Jan",
      baseline: 650000,
      optimized: 650000,
      savings: 0,
      target: 585000,
    },
    {
      date: "Feb",
      baseline: 658000,
      optimized: 621000,
      savings: 37000,
      target: 585000,
    },
    {
      date: "Mar",
      baseline: 665000,
      optimized: 608000,
      savings: 57000,
      target: 585000,
    },
    {
      date: "Apr",
      baseline: 672000,
      optimized: 595000,
      savings: 77000,
      target: 585000,
    },
    {
      date: "May",
      baseline: 679000,
      optimized: 582000,
      savings: 97000,
      target: 585000,
    },
    {
      date: "Jun",
      baseline: 686000,
      optimized: 569000,
      savings: 117000,
      target: 585000,
    },
    {
      date: "Jul",
      baseline: 693000,
      optimized: 556000,
      savings: 137000,
      target: 585000,
    },
    {
      date: "Aug",
      baseline: 700000,
      optimized: 543000,
      savings: 157000,
      target: 585000,
    },
  ]);

  // Cost Driver Analysis
  const [costDrivers, setCostDrivers] = useState([
    {
      driver: "Material Prices",
      impact: 35,
      volatility: "High",
      trend: "Rising",
      optimization: 85,
    },
    {
      driver: "Labor Costs",
      impact: 28,
      volatility: "Medium",
      trend: "Stable",
      optimization: 72,
    },
    {
      driver: "Energy Costs",
      impact: 15,
      volatility: "High",
      trend: "Rising",
      optimization: 78,
    },
    {
      driver: "Transportation",
      impact: 12,
      volatility: "Medium",
      trend: "Rising",
      optimization: 80,
    },
    {
      driver: "Technology",
      impact: 6,
      volatility: "Low",
      trend: "Declining",
      optimization: 92,
    },
    {
      driver: "Regulatory",
      impact: 4,
      volatility: "Low",
      trend: "Stable",
      optimization: 65,
    },
  ]);

  // Quick Wins Opportunities
  const [quickWins, setQuickWins] = useState([
    {
      opportunity: "Renegotiate Top 5 Supplier Contracts",
      impact: "High",
      effort: "Low",
      savings: 125000,
      timeframe: "30 days",
      probability: 85,
    },
    {
      opportunity: "Implement Energy Management System",
      impact: "Medium",
      effort: "Medium",
      savings: 45000,
      timeframe: "60 days",
      probability: 90,
    },
    {
      opportunity: "Optimize Delivery Routes",
      impact: "Medium",
      effort: "Low",
      savings: 35000,
      timeframe: "15 days",
      probability: 95,
    },
    {
      opportunity: "Reduce Packaging Waste",
      impact: "Low",
      effort: "Low",
      savings: 18000,
      timeframe: "45 days",
      probability: 88,
    },
    {
      opportunity: "Automate Invoice Processing",
      impact: "Medium",
      effort: "Medium",
      savings: 28000,
      timeframe: "90 days",
      probability: 82,
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: "EUR",
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Very High":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      case "Paused":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
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
              <TrendingDown className="w-6 h-6 text-blue-600" />
              {language === "el"
                ? "Σύστημα Βελτιστοποίησης Κόστους"
                : "Comprehensive Cost Optimization System"}
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="optimization-mode">Auto Mode</Label>
                <Switch
                  id="optimization-mode"
                  checked={optimizationMode === "automatic"}
                  onCheckedChange={(checked) =>
                    setOptimizationMode(checked ? "automatic" : "manual")
                  }
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnalysisRunning(!analysisRunning)}
              >
                {analysisRunning ? (
                  <PauseCircle className="w-4 h-4 mr-2" />
                ) : (
                  <PlayCircle className="w-4 h-4 mr-2" />
                )}
                {analysisRunning ? "Pause" : "Run"} Analysis
              </Button>
            </div>
          </div>

          {/* Key Optimization Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(optimizationMetrics.totalCostReduction)}
              </div>
              <div className="text-sm text-green-600">Total Savings</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatPercentage(optimizationMetrics.percentageReduction)}
              </div>
              <div className="text-sm text-blue-600">Cost Reduction</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(optimizationMetrics.paybackPeriod)} months
              </div>
              <div className="text-sm text-purple-600">Payback Period</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatPercentage(optimizationMetrics.returnOnInvestment)}
              </div>
              <div className="text-sm text-orange-600">ROI</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Analysis</TabsTrigger>
          <TabsTrigger value="drivers">Cost Drivers</TabsTrigger>
          <TabsTrigger value="opportunities">Quick Wins</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="monitoring">Real-time Monitor</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cost Savings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  Cost Reduction Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={costTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="#ff7300"
                      name="Baseline"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="optimized"
                      stroke="#8884d8"
                      name="Optimized"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#00C49F"
                      name="Target"
                      strokeDasharray="10 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Savings by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={Object.entries(costBreakdown).map(
                        ([key, value]) => ({
                          name: key.charAt(0).toUpperCase() + key.slice(1),
                          value: value.savings,
                        }),
                      )}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {Object.entries(costBreakdown).map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Performance Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      Overall Equipment Effectiveness
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPercentage(
                      optimizationMetrics.overallEquipmentEffectiveness,
                    )}
                  </div>
                  <Progress
                    value={optimizationMetrics.overallEquipmentEffectiveness}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      First Pass Yield
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPercentage(optimizationMetrics.firstPassYield)}
                  </div>
                  <Progress
                    value={optimizationMetrics.firstPassYield}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">
                      On-Time Delivery
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {formatPercentage(optimizationMetrics.onTimeDelivery)}
                  </div>
                  <Progress
                    value={optimizationMetrics.onTimeDelivery}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">
                      Operational Efficiency
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {formatPercentage(
                      optimizationMetrics.operationalEfficiency,
                    )}
                  </div>
                  <Progress
                    value={optimizationMetrics.operationalEfficiency}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {formatCurrency(optimizationMetrics.netPresentValue)}
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Net Present Value
                    </div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPercentage(
                        optimizationMetrics.internalRateOfReturn,
                      )}
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      Internal Rate of Return
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">
                      {formatCurrency(optimizationMetrics.annualSavings)}
                    </div>
                    <div className="text-sm text-purple-600 mt-1">
                      Annual Savings
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600">
                      {formatPercentage(optimizationMetrics.riskAdjustedReturn)}
                    </div>
                    <div className="text-sm text-orange-600 mt-1">
                      Risk-Adjusted Return
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600">
                      {formatCurrency(optimizationMetrics.implementationCost)}
                    </div>
                    <div className="text-sm text-yellow-600 mt-1">
                      Implementation Cost
                    </div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-3xl font-bold text-red-600">
                      {formatPercentage(optimizationMetrics.costOfCapital)}
                    </div>
                    <div className="text-sm text-red-600 mt-1">
                      Cost of Capital
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          {/* Optimization Strategies */}
          <div className="space-y-4">
            {optimizationStrategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {strategy.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {strategy.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(strategy.status)}>
                          {strategy.status}
                        </Badge>
                        <Badge className={getImpactColor(strategy.impact)}>
                          {strategy.impact} Impact
                        </Badge>
                        <Badge className={getRiskColor(strategy.riskLevel)}>
                          {strategy.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          Annual Savings
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(strategy.savings)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">ROI</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatPercentage(strategy.roi)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Timeframe</div>
                        <div className="text-xl font-bold text-purple-600">
                          {strategy.timeframe}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Category</div>
                        <div className="text-xl font-bold text-orange-600">
                          {strategy.category}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Technologies:</div>
                      <div className="flex flex-wrap gap-2">
                        {strategy.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Implementation Complexity: {strategy.implementation}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Detailed Cost Breakdown */}
          <div className="space-y-6">
            {Object.entries(costBreakdown).map(([category, data]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="capitalize">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(data.savings)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPercentage(data.percentage)} of total costs
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-xl font-bold text-red-600">
                          {formatCurrency(data.current)}
                        </div>
                        <div className="text-sm text-red-600">Current Cost</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(data.optimized)}
                        </div>
                        <div className="text-sm text-blue-600">
                          Optimized Cost
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(data.savings)}
                        </div>
                        <div className="text-sm text-green-600">
                          Total Savings
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Cost Breakdown:</h4>
                      {Object.entries(data.breakdown).map(
                        ([subcat, amount]) => (
                          <div
                            key={subcat}
                            className="flex justify-between items-center"
                          >
                            <span className="capitalize">
                              {subcat.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="font-semibold">
                              {formatCurrency(amount)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>

                    <Progress
                      value={(data.savings / data.current) * 100}
                      className="h-3"
                    />
                    <div className="text-center text-sm text-gray-600">
                      {formatPercentage((data.savings / data.current) * 100)}{" "}
                      reduction achieved
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          {/* Cost Drivers Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Drivers Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costDrivers.map((driver, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{driver.driver}</h4>
                      <div className="flex gap-2">
                        <Badge
                          className={
                            driver.volatility === "High"
                              ? "bg-red-100 text-red-800"
                              : driver.volatility === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {driver.volatility} Volatility
                        </Badge>
                        <Badge
                          className={
                            driver.trend === "Rising"
                              ? "bg-orange-100 text-orange-800"
                              : driver.trend === "Declining"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {driver.trend}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Cost Impact</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {driver.impact}%
                        </div>
                        <Progress value={driver.impact} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Optimization Level
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          {driver.optimization}%
                        </div>
                        <Progress
                          value={driver.optimization}
                          className="h-2 mt-1"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Potential Savings
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(
                            (driver.impact / 100) *
                              50000 *
                              (1 - driver.optimization / 100),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Driver Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Driver Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  data={costDrivers.map((driver) => ({
                    subject: driver.driver,
                    impact: driver.impact,
                    optimization: driver.optimization,
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name="Impact"
                    dataKey="impact"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Optimization"
                    dataKey="optimization"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Quick Wins */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Quick Win Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickWins.map((opportunity, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">
                            {opportunity.opportunity}
                          </h4>
                          <div className="flex gap-2">
                            <Badge
                              className={getImpactColor(opportunity.impact)}
                            >
                              {opportunity.impact} Impact
                            </Badge>
                            <Badge
                              className={
                                opportunity.effort === "Low"
                                  ? "bg-green-100 text-green-800"
                                  : opportunity.effort === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {opportunity.effort} Effort
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">
                              Potential Savings
                            </div>
                            <div className="text-xl font-bold text-green-600">
                              {formatCurrency(opportunity.savings)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Timeframe
                            </div>
                            <div className="text-xl font-bold text-blue-600">
                              {opportunity.timeframe}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Success Probability
                            </div>
                            <div className="text-xl font-bold text-purple-600">
                              {opportunity.probability}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Expected Value
                            </div>
                            <div className="text-xl font-bold text-orange-600">
                              {formatCurrency(
                                (opportunity.savings *
                                  opportunity.probability) /
                                  100,
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Progress
                            value={opportunity.probability}
                            className="flex-1 mr-4"
                          />
                          <Button size="sm">Implement</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Impact vs Effort Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart
                  data={quickWins.map((opportunity) => ({
                    x:
                      opportunity.effort === "Low"
                        ? 1
                        : opportunity.effort === "Medium"
                          ? 2
                          : 3,
                    y:
                      opportunity.impact === "Low"
                        ? 1
                        : opportunity.impact === "Medium"
                          ? 2
                          : 3,
                    savings: opportunity.savings,
                    name: opportunity.opportunity,
                  }))}
                >
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Effort"
                    domain={[0.5, 3.5]}
                    tickFormatter={(value) =>
                      value === 1 ? "Low" : value === 2 ? "Medium" : "High"
                    }
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Impact"
                    domain={[0.5, 3.5]}
                    tickFormatter={(value) =>
                      value === 1 ? "Low" : value === 2 ? "Medium" : "High"
                    }
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Opportunities" dataKey="y" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Advanced Analytics Models */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsModels.map((model, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{model.name}</h4>
                      <Badge className={getStatusColor(model.status)}>
                        {model.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{model.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatPercentage(model.accuracy)}
                        </div>
                        <Progress value={model.accuracy} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Potential Savings
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(model.savings)}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Model
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Optimization Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsModels}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="accuracy"
                    fill="#8884d8"
                    name="Accuracy %"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="savings"
                    fill="#82ca9d"
                    name="Savings (€)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Cost Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Real-time Cost Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={costTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="savings"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Savings"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="baseline"
                    stroke="#ff7300"
                    name="Baseline"
                    strokeDasharray="5 5"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="target"
                    stroke="#00C49F"
                    name="Target"
                    strokeDasharray="10 5"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Live Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingDown className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {formatPercentage(optimizationMetrics.productivityGain)}
                </div>
                <div className="text-sm text-gray-600">Productivity Gain</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatPercentage(optimizationMetrics.qualityImprovement)}
                </div>
                <div className="text-sm text-gray-600">Quality Improvement</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Leaf className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatPercentage(optimizationMetrics.energyEfficiencyGain)}
                </div>
                <div className="text-sm text-gray-600">Energy Efficiency</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatPercentage(optimizationMetrics.wasteReduction)}
                </div>
                <div className="text-sm text-gray-600">Waste Reduction</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          {/* Industry Benchmarks */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmark Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benchmarkData.map((benchmark, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{benchmark.metric}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          Industry: {benchmark.industry}%
                        </span>
                        <span className="text-sm text-gray-600">
                          Best: {benchmark.best}%
                        </span>
                        <Badge
                          className={
                            benchmark.current >= benchmark.target
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {benchmark.current >= benchmark.target
                            ? "On Target"
                            : "Below Target"}
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={benchmark.current} className="h-4" />
                      <div
                        className="absolute top-0 h-4 w-1 bg-blue-500"
                        style={{ left: `${benchmark.industry}%` }}
                      />
                      <div
                        className="absolute top-0 h-4 w-1 bg-green-500"
                        style={{ left: `${benchmark.best}%` }}
                      />
                      <div
                        className="absolute top-0 h-4 w-1 bg-red-500"
                        style={{ left: `${benchmark.target}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Current: {benchmark.current}%</span>
                      <span>Target: {benchmark.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benchmark Performance Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Performance vs Benchmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={benchmarkData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Industry Average"
                    dataKey="industry"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Best in Class"
                    dataKey="best"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Panel */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Last Analysis: {new Date().toLocaleString()}
              </div>
              <Badge
                className={
                  analysisRunning
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {analysisRunning ? "Running" : "Stopped"}
              </Badge>
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
              <Button>
                <Robot className="w-4 h-4 mr-2" />
                Auto-Optimize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveCostOptimization;
