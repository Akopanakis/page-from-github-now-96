import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  Leaf,
  Recycle,
  Droplets,
  Zap,
  Truck,
  Factory,
  Users,
  Award,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe,
  Wind,
  Sun,
  Waves,
  Fish,
  TreePine,
  Shield,
  Heart,
  Thermometer,
  Scale,
  Clock,
  MapPin,
  Camera,
  FileText,
  Settings,
  Download,
  Upload,
  Share2,
  Calendar,
  BarChart3,
  Activity,
  Layers,
  Database,
  Monitor,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SustainabilityTrackingSystem: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [targetYear, setTargetYear] = useState(2030);
  const [refreshInterval, setRefreshInterval] = useState(5);

  // Comprehensive sustainability metrics
  const [sustainabilityMetrics, setSustainabilityMetrics] = useState({
    // Environmental Metrics
    carbonFootprint: {
      current: 2.8,
      target: 1.5,
      trend: -12.5,
      unit: "tCO2e",
      breakdown: {
        energy: 45,
        transport: 30,
        packaging: 15,
        waste: 10,
      },
    },
    waterUsage: {
      current: 1250,
      target: 900,
      trend: -8.3,
      unit: "L/kg",
      efficiency: 72,
    },
    energyConsumption: {
      current: 3.2,
      target: 2.1,
      trend: -15.7,
      unit: "kWh/kg",
      renewable: 68,
    },
    wasteGeneration: {
      current: 0.8,
      target: 0.4,
      trend: -22.1,
      unit: "kg/kg",
      recycled: 85,
    },

    // Social Metrics
    employeeWellbeing: {
      satisfaction: 8.2,
      safetyIncidents: 0.3,
      training: 96,
      diversity: 47,
    },
    communityImpact: {
      localJobs: 156,
      localSuppliers: 73,
      communityInvestment: 125000,
      educationPrograms: 12,
    },

    // Governance Metrics
    compliance: {
      certifications: 8,
      auditScore: 94,
      transparencyIndex: 87,
      ethicsScore: 92,
    },
    supplyChain: {
      traceability: 89,
      sustainableSuppliers: 76,
      fairTrade: 82,
      localSourcing: 64,
    },

    // Marine Ecosystem Metrics
    marineHealth: {
      biodiversityIndex: 78,
      fishStockHealth: 82,
      oceanCleanupEfforts: 15,
      marineProtectedAreas: 23,
    },
    fishingPractices: {
      sustainableFishing: 91,
      byccatchReduction: 67,
      habitatProtection: 84,
      quotaCompliance: 97,
    },

    // Product Lifecycle Metrics
    productSustainability: {
      ecoDesign: 79,
      recyclability: 88,
      biodegradability: 72,
      sustainablePackaging: 85,
    },
    circularEconomy: {
      materialRecovery: 78,
      wasteToEnergy: 45,
      bioeconomyIntegration: 62,
      closedLoopSystems: 56,
    },
  });

  // SDG (Sustainable Development Goals) alignment
  const [sdgAlignment, setSdgAlignment] = useState([
    { id: 3, name: "Good Health and Well-being", score: 85, target: 90 },
    { id: 6, name: "Clean Water and Sanitation", score: 78, target: 85 },
    { id: 7, name: "Affordable and Clean Energy", score: 72, target: 80 },
    { id: 8, name: "Decent Work and Economic Growth", score: 88, target: 92 },
    {
      id: 9,
      name: "Industry, Innovation and Infrastructure",
      score: 81,
      target: 87,
    },
    {
      id: 12,
      name: "Responsible Consumption and Production",
      score: 83,
      target: 90,
    },
    { id: 13, name: "Climate Action", score: 76, target: 85 },
    { id: 14, name: "Life Below Water", score: 89, target: 95 },
    { id: 15, name: "Life on Land", score: 74, target: 82 },
    { id: 17, name: "Partnerships for the Goals", score: 87, target: 92 },
  ]);

  // ESG Scoring Matrix
  const [esgScores, setEsgScores] = useState({
    environmental: {
      score: 82,
      subcategories: {
        climateChange: 78,
        naturalResources: 85,
        pollution: 80,
        environmentalOpportunities: 84,
      },
    },
    social: {
      score: 86,
      subcategories: {
        humanCapital: 88,
        productLiability: 82,
        stakeholderOpposition: 89,
        socialOpportunities: 85,
      },
    },
    governance: {
      score: 91,
      subcategories: {
        corporateGovernance: 93,
        corporateBehavior: 89,
        transparency: 92,
        riskManagement: 90,
      },
    },
  });

  // Certification and compliance tracking
  const [certifications, setCertifications] = useState([
    {
      name: "MSC - Marine Stewardship Council",
      status: "Certified",
      expiryDate: "2025-08-15",
      score: 95,
      category: "Marine",
    },
    {
      name: "ASC - Aquaculture Stewardship Council",
      status: "Certified",
      expiryDate: "2024-11-22",
      score: 88,
      category: "Aquaculture",
    },
    {
      name: "ISO 14001 - Environmental Management",
      status: "Certified",
      expiryDate: "2025-03-10",
      score: 92,
      category: "Environmental",
    },
    {
      name: "BRCGS Food Safety",
      status: "Certified",
      expiryDate: "2024-12-05",
      score: 96,
      category: "Food Safety",
    },
    {
      name: "Fair Trade Certified",
      status: "In Progress",
      expiryDate: "2024-09-30",
      score: 78,
      category: "Social",
    },
    {
      name: "Rainforest Alliance",
      status: "Certified",
      expiryDate: "2025-06-18",
      score: 89,
      category: "Environmental",
    },
    {
      name: "Global GAP",
      status: "Certified",
      expiryDate: "2024-10-12",
      score: 91,
      category: "Agricultural",
    },
    {
      name: "RSPO - Sustainable Palm Oil",
      status: "Certified",
      expiryDate: "2025-01-28",
      score: 87,
      category: "Sustainable Sourcing",
    },
  ]);

  // Sustainability initiatives and projects
  const [initiatives, setInitiatives] = useState([
    {
      id: 1,
      name: "Zero Waste to Landfill",
      description: "Achieve 100% waste diversion from landfills",
      status: "In Progress",
      progress: 78,
      targetDate: "2024-12-31",
      impact: "High",
      category: "Waste Management",
    },
    {
      id: 2,
      name: "Renewable Energy Transition",
      description: "Convert 90% of energy consumption to renewable sources",
      status: "In Progress",
      progress: 65,
      targetDate: "2025-06-30",
      impact: "High",
      category: "Energy",
    },
    {
      id: 3,
      name: "Sustainable Packaging Initiative",
      description: "100% recyclable or biodegradable packaging",
      status: "Planning",
      progress: 35,
      targetDate: "2025-12-31",
      impact: "Medium",
      category: "Packaging",
    },
    {
      id: 4,
      name: "Water Conservation Program",
      description: "Reduce water usage by 40% through efficiency measures",
      status: "In Progress",
      progress: 58,
      targetDate: "2024-08-31",
      impact: "High",
      category: "Water",
    },
    {
      id: 5,
      name: "Biodiversity Conservation",
      description: "Protect and restore marine habitats",
      status: "In Progress",
      progress: 42,
      targetDate: "2025-03-31",
      impact: "High",
      category: "Biodiversity",
    },
  ]);

  // Real-time monitoring data
  const [monitoringData, setMonitoringData] = useState([
    { time: "00:00", energy: 2.8, water: 1180, waste: 0.75, co2: 2.6 },
    { time: "04:00", energy: 3.1, water: 1240, waste: 0.82, co2: 2.8 },
    { time: "08:00", energy: 4.2, water: 1380, waste: 0.89, co2: 3.2 },
    { time: "12:00", energy: 3.8, water: 1320, waste: 0.85, co2: 3.0 },
    { time: "16:00", energy: 3.5, water: 1280, waste: 0.78, co2: 2.9 },
    { time: "20:00", energy: 3.0, water: 1200, waste: 0.72, co2: 2.7 },
  ]);

  // Supplier sustainability scoring
  const [supplierScores, setSupplierScores] = useState([
    {
      name: "Supplier A",
      environmental: 88,
      social: 92,
      governance: 85,
      overall: 88,
    },
    {
      name: "Supplier B",
      environmental: 75,
      social: 82,
      governance: 78,
      overall: 78,
    },
    {
      name: "Supplier C",
      environmental: 92,
      social: 89,
      governance: 94,
      overall: 92,
    },
    {
      name: "Supplier D",
      environmental: 81,
      social: 76,
      governance: 83,
      overall: 80,
    },
    {
      name: "Supplier E",
      environmental: 87,
      social: 91,
      governance: 88,
      overall: 89,
    },
  ]);

  // Carbon offsetting and credits
  const [carbonOffsets, setCarbonOffsets] = useState({
    totalOffsets: 1250,
    offsetTypes: [
      { type: "Reforestation", amount: 450, cost: 15600 },
      { type: "Renewable Energy", amount: 380, cost: 12800 },
      { type: "Ocean Conservation", amount: 280, cost: 18200 },
      { type: "Methane Capture", amount: 140, cost: 8400 },
    ],
    netCarbon: -420, // Negative indicates carbon positive
  });

  // Lifecycle assessments
  const [lifecycleData, setLifecycleData] = useState([
    { stage: "Raw Material", impact: 25, energy: 450, water: 280, waste: 12 },
    { stage: "Processing", impact: 35, energy: 680, water: 420, waste: 28 },
    { stage: "Packaging", impact: 15, energy: 180, water: 95, waste: 45 },
    { stage: "Distribution", impact: 20, energy: 320, water: 45, waste: 8 },
    { stage: "End of Life", impact: 5, energy: 50, water: 15, waste: 85 },
  ]);

  const formatNumber = (num: number, decimals = 1) => {
    return num.toLocaleString(language === "el" ? "el-GR" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Certified":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Planning":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            {language === "el"
              ? "Σύστημα Παρακολούθησης Βιωσιμότητας"
              : "Sustainability Tracking System"}
          </CardTitle>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-green-600">
                {formatNumber(
                  (esgScores.environmental.score +
                    esgScores.social.score +
                    esgScores.governance.score) /
                    3,
                )}
              </span>
              <span className="text-sm text-gray-600">ESG Score</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">
                {formatNumber(
                  sdgAlignment.reduce((acc, sdg) => acc + sdg.score, 0) /
                    sdgAlignment.length,
                )}
              </span>
              <span className="text-sm text-gray-600">SDG Alignment</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">
                {certifications.filter((c) => c.status === "Certified").length}
              </span>
              <span className="text-sm text-gray-600">
                Active Certifications
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="environmental">
            {language === "el" ? "Περιβάλλον" : "Environmental"}
          </TabsTrigger>
          <TabsTrigger value="social">
            {language === "el" ? "Κοινωνικά" : "Social"}
          </TabsTrigger>
          <TabsTrigger value="governance">
            {language === "el" ? "Διακυβέρνηση" : "Governance"}
          </TabsTrigger>
          <TabsTrigger value="certifications">
            {language === "el" ? "Πιστοποιήσεις" : "Certifications"}
          </TabsTrigger>
          <TabsTrigger value="initiatives">
            {language === "el" ? "Πρωτοβουλίες" : "Initiatives"}
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            {language === "el" ? "Παρακολούθηση" : "Monitoring"}
          </TabsTrigger>
          <TabsTrigger value="reporting">
            {language === "el" ? "Αναφορές" : "Reporting"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Carbon Footprint</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(
                        sustainabilityMetrics.carbonFootprint.current,
                      )}
                      <span className="text-sm font-normal ml-1">
                        {sustainabilityMetrics.carbonFootprint.unit}
                      </span>
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingDown className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">
                        {formatNumber(
                          Math.abs(sustainabilityMetrics.carbonFootprint.trend),
                        )}
                        % reduction
                      </span>
                    </div>
                  </div>
                  <Leaf className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Water Efficiency</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(
                        sustainabilityMetrics.waterUsage.efficiency,
                      )}
                      %
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">
                        Target:{" "}
                        {formatNumber(sustainabilityMetrics.waterUsage.target)}{" "}
                        L/kg
                      </span>
                    </div>
                  </div>
                  <Droplets className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Renewable Energy</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {formatNumber(
                        sustainabilityMetrics.energyConsumption.renewable,
                      )}
                      %
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Sun className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600">
                        {formatNumber(
                          sustainabilityMetrics.energyConsumption.current,
                        )}{" "}
                        kWh/kg
                      </span>
                    </div>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Waste Recycling</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatNumber(
                        sustainabilityMetrics.wasteGeneration.recycled,
                      )}
                      %
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Recycle className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-purple-600">
                        {formatNumber(
                          sustainabilityMetrics.wasteGeneration.current,
                        )}{" "}
                        kg/kg
                      </span>
                    </div>
                  </div>
                  <Recycle className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ESG Score Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>ESG Performance Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  data={[
                    {
                      subject: "Environmental",
                      score: esgScores.environmental.score,
                      target: 90,
                    },
                    {
                      subject: "Social",
                      score: esgScores.social.score,
                      target: 90,
                    },
                    {
                      subject: "Governance",
                      score: esgScores.governance.score,
                      target: 90,
                    },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} />
                  <Radar
                    name="Current Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* SDG Alignment */}
          <Card>
            <CardHeader>
              <CardTitle>UN Sustainable Development Goals Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sdgAlignment.map((sdg) => (
                  <div key={sdg.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        SDG {sdg.id}: {sdg.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {sdg.score}% / {sdg.target}%
                      </span>
                    </div>
                    <Progress value={sdg.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          {/* Environmental Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Carbon Footprint Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={Object.entries(
                        sustainabilityMetrics.carbonFootprint.breakdown,
                      ).map(([key, value]) => ({
                        name: key.charAt(0).toUpperCase() + key.slice(1),
                        value,
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {Object.entries(
                        sustainabilityMetrics.carbonFootprint.breakdown,
                      ).map((_, index) => (
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  Water Usage Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monitoringData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Marine Ecosystem Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fish className="w-5 h-5 text-blue-600" />
                Marine Ecosystem Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      Biodiversity Index
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {sustainabilityMetrics.marineHealth.biodiversityIndex}%
                  </div>
                  <Progress
                    value={sustainabilityMetrics.marineHealth.biodiversityIndex}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Fish className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">
                      Fish Stock Health
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {sustainabilityMetrics.marineHealth.fishStockHealth}%
                  </div>
                  <Progress
                    value={sustainabilityMetrics.marineHealth.fishStockHealth}
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Protected Areas</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {sustainabilityMetrics.marineHealth.marineProtectedAreas}
                  </div>
                  <p className="text-xs text-gray-600">
                    Marine Protected Areas
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Recycle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Cleanup Efforts</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {sustainabilityMetrics.marineHealth.oceanCleanupEfforts}
                  </div>
                  <p className="text-xs text-gray-600">Active Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lifecycle Assessment */}
          <Card>
            <CardHeader>
              <CardTitle>Product Lifecycle Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={lifecycleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="impact"
                    fill="#8884d8"
                    name="Environmental Impact %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="energy"
                    stroke="#ff7300"
                    name="Energy (kWh)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="water"
                    stroke="#00ff00"
                    name="Water (L)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Carbon Offsetting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-600" />
                Carbon Offsetting & Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Offsets</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatNumber(carbonOffsets.totalOffsets)} tCO2e
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">
                      Net Carbon Impact
                    </span>
                    <span
                      className={`text-2xl font-bold ${carbonOffsets.netCarbon < 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {carbonOffsets.netCarbon > 0 ? "+" : ""}
                      {formatNumber(carbonOffsets.netCarbon)} tCO2e
                    </span>
                  </div>
                  {carbonOffsets.netCarbon < 0 && (
                    <Badge className="bg-green-100 text-green-800">
                      Carbon Positive
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  {carbonOffsets.offsetTypes.map((offset, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm font-medium">{offset.type}</span>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          {formatNumber(offset.amount)} tCO2e
                        </div>
                        <div className="text-xs text-gray-600">
                          €{formatNumber(offset.cost)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Employee Wellbeing Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Employee Satisfaction
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(
                        sustainabilityMetrics.employeeWellbeing.satisfaction,
                      )}
                      /10
                    </p>
                    <Progress
                      value={
                        sustainabilityMetrics.employeeWellbeing.satisfaction *
                        10
                      }
                      className="h-2 mt-2"
                    />
                  </div>
                  <Heart className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Safety Incidents</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(
                        sustainabilityMetrics.employeeWellbeing.safetyIncidents,
                        1,
                      )}
                    </p>
                    <p className="text-xs text-gray-500">per 1000 hours</p>
                  </div>
                  <Shield className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Training Completion</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatNumber(
                        sustainabilityMetrics.employeeWellbeing.training,
                      )}
                      %
                    </p>
                    <Progress
                      value={sustainabilityMetrics.employeeWellbeing.training}
                      className="h-2 mt-2"
                    />
                  </div>
                  <Users className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Diversity Index</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatNumber(
                        sustainabilityMetrics.employeeWellbeing.diversity,
                      )}
                      %
                    </p>
                    <Progress
                      value={sustainabilityMetrics.employeeWellbeing.diversity}
                      className="h-2 mt-2"
                    />
                  </div>
                  <Users className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Community Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Community Impact Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {sustainabilityMetrics.communityImpact.localJobs}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">
                    Local Jobs Created
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {sustainabilityMetrics.communityImpact.localSuppliers}%
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Local Suppliers
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    €
                    {formatNumber(
                      sustainabilityMetrics.communityImpact
                        .communityInvestment / 1000,
                    )}
                    K
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    Community Investment
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {sustainabilityMetrics.communityImpact.educationPrograms}
                  </div>
                  <div className="text-sm text-orange-600 mt-1">
                    Education Programs
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Sustainability Scoring */}
          <Card>
            <CardHeader>
              <CardTitle>Supplier Sustainability Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierScores.map((supplier, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{supplier.name}</h4>
                      <Badge
                        className={`${supplier.overall >= 85 ? "bg-green-100 text-green-800" : supplier.overall >= 70 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                      >
                        Overall: {supplier.overall}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Environmental
                        </div>
                        <Progress
                          value={supplier.environmental}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {supplier.environmental}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Social</div>
                        <Progress
                          value={supplier.social}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {supplier.social}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Governance</div>
                        <Progress
                          value={supplier.governance}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {supplier.governance}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          {/* Governance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Audit Score</p>
                    <p className="text-2xl font-bold text-green-600">
                      {sustainabilityMetrics.compliance.auditScore}%
                    </p>
                    <Progress
                      value={sustainabilityMetrics.compliance.auditScore}
                      className="h-2 mt-2"
                    />
                  </div>
                  <FileText className="w-8 h-8 text-green-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transparency Index</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {sustainabilityMetrics.compliance.transparencyIndex}%
                    </p>
                    <Progress
                      value={sustainabilityMetrics.compliance.transparencyIndex}
                      className="h-2 mt-2"
                    />
                  </div>
                  <Monitor className="w-8 h-8 text-blue-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ethics Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {sustainabilityMetrics.compliance.ethicsScore}%
                    </p>
                    <Progress
                      value={sustainabilityMetrics.compliance.ethicsScore}
                      className="h-2 mt-2"
                    />
                  </div>
                  <Scale className="w-8 h-8 text-purple-500 opacity-70" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Supply Chain Traceability
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {sustainabilityMetrics.supplyChain.traceability}%
                    </p>
                    <Progress
                      value={sustainabilityMetrics.supplyChain.traceability}
                      className="h-2 mt-2"
                    />
                  </div>
                  <Database className="w-8 h-8 text-orange-500 opacity-70" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ESG Subcategory Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>ESG Detailed Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(esgScores).map(([category, data]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="text-lg font-semibold capitalize">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(data.subcategories).map(
                        ([subcat, score]) => (
                          <div key={subcat} className="space-y-2">
                            <div className="text-sm font-medium capitalize">
                              {subcat.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <Progress value={score} className="h-2" />
                            <div className="text-xs text-gray-600">
                              {score}%
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm">{cert.name}</h4>
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Score:</span>
                        <span className="font-semibold">{cert.score}%</span>
                      </div>
                      <Progress value={cert.score} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Category: {cert.category}</span>
                        <span>
                          Expires:{" "}
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="initiatives" className="space-y-6">
          <div className="space-y-4">
            {initiatives.map((initiative) => (
              <Card key={initiative.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold">{initiative.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {initiative.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(initiative.status)}>
                          {initiative.status}
                        </Badge>
                        <Badge className={getImpactColor(initiative.impact)}>
                          {initiative.impact} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-semibold">
                          {initiative.progress}%
                        </span>
                      </div>
                      <Progress value={initiative.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Category: {initiative.category}</span>
                        <span>
                          Target:{" "}
                          {new Date(initiative.targetDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Environmental Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Real-time Environmental Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monitoringData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="energy"
                    stroke="#8884d8"
                    name="Energy (kWh/kg)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="water"
                    stroke="#82ca9d"
                    name="Water (L/kg)"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="co2"
                    stroke="#ff7300"
                    name="CO2 (kg/kg)"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="waste"
                    fill="#ffc658"
                    name="Waste (kg/kg)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monitoring Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">
                    Refresh Interval (minutes)
                  </Label>
                  <Slider
                    id="refresh-interval"
                    min={1}
                    max={60}
                    step={1}
                    value={[refreshInterval]}
                    onValueChange={([value]) => setRefreshInterval(value)}
                  />
                  <div className="text-sm text-gray-600">
                    {refreshInterval} minutes
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-year">Target Year</Label>
                  <Input
                    id="target-year"
                    type="number"
                    value={targetYear}
                    onChange={(e) => setTargetYear(parseInt(e.target.value))}
                    min={2024}
                    max={2050}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-alerts">Auto Alerts</Label>
                    <Switch id="auto-alerts" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="real-time-sync">Real-time Sync</Label>
                    <Switch id="real-time-sync" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          {/* Reporting Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Sustainability Reporting Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Download className="w-6 h-6 mb-2" />
                  <span>ESG Report</span>
                  <span className="text-xs text-gray-500">Annual Summary</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <FileText className="w-6 h-6 mb-2" />
                  <span>GRI Standards</span>
                  <span className="text-xs text-gray-500">
                    Compliance Report
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Globe className="w-6 h-6 mb-2" />
                  <span>CDP Report</span>
                  <span className="text-xs text-gray-500">
                    Carbon Disclosure
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Award className="w-6 h-6 mb-2" />
                  <span>B Corp Assessment</span>
                  <span className="text-xs text-gray-500">Impact Report</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Target className="w-6 h-6 mb-2" />
                  <span>SDG Mapping</span>
                  <span className="text-xs text-gray-500">Goals Alignment</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <Share2 className="w-6 h-6 mb-2" />
                  <span>Stakeholder Report</span>
                  <span className="text-xs text-gray-500">
                    External Sharing
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Generation */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <select className="w-full p-2 border rounded">
                      <option>ESG Summary</option>
                      <option>Environmental Impact</option>
                      <option>Social Performance</option>
                      <option>Governance Metrics</option>
                      <option>Full Sustainability Report</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Last Month</option>
                      <option>Last Quarter</option>
                      <option>Last Year</option>
                      <option>Custom Range</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilityTrackingSystem;
