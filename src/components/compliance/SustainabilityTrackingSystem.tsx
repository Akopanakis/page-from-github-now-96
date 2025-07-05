import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Leaf,
  Waves,
  Fish,
  Recycle,
  Zap,
  Thermometer,
  Factory,
  Truck,
  Globe,
  Shield,
  Award,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  MapPin,
  Users,
  Building,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Upload,
  Settings,
  Bell,
  Eye,
  Plus,
  Edit,
  RefreshCw,
  Calculator,
  FileText,
  Database,
  Monitor,
  Smartphone,
  Anchor,
  Navigation,
  Heart,
  TreePine,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Snowflake,
  Flame,
  Battery,
  Car,
  Plane,
  Home,
  Lightbulb,
} from "lucide-react";

interface SustainabilityMetric {
  id: string;
  name: string;
  category: "environmental" | "social" | "governance" | "economic";
  value: number;
  unit: string;
  target: number;
  benchmark: number;
  trend: "up" | "down" | "stable";
  change: number;
  lastUpdated: Date;
  status: "excellent" | "good" | "warning" | "critical";
  description: string;
  methodology: string;
  dataSource: string;
  certification?: string;
}

interface CarbonFootprint {
  id: string;
  source: string;
  category: "scope1" | "scope2" | "scope3";
  emissions: number; // tons CO2e
  percentage: number;
  trend: "up" | "down" | "stable";
  reduction: number;
  target: number;
  actions: string[];
}

interface OceanHealthIndicator {
  id: string;
  indicator: string;
  region: string;
  value: number;
  unit: string;
  status: "healthy" | "concerning" | "critical";
  trend: "improving" | "stable" | "declining";
  lastAssessment: Date;
  threats: string[];
  conservationActions: string[];
}

interface SustainabilityGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  priority: "high" | "medium" | "low";
  status: "on-track" | "at-risk" | "behind" | "completed";
  progress: number;
  milestones: {
    title: string;
    date: Date;
    completed: boolean;
    description: string;
  }[];
  actions: string[];
  impact: string;
  investment: number;
}

interface SustainabilityTrackingSystemProps {
  className?: string;
}

const SustainabilityTrackingSystem: React.FC<
  SustainabilityTrackingSystemProps
> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([]);
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprint[]>([]);
  const [oceanHealth, setOceanHealth] = useState<OceanHealthIndicator[]>([]);
  const [sustainabilityGoals, setSustainabilityGoals] = useState<
    SustainabilityGoal[]
  >([]);
  const [selectedMetric, setSelectedMetric] =
    useState<SustainabilityMetric | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize comprehensive sustainability data with 20+ features
  useEffect(() => {
    const sampleMetrics: SustainabilityMetric[] = [
      // Environmental Metrics (Enhanced)
      {
        id: "env-001",
        name: language === "el" ? "Αποτύπωμα Άνθρακα" : "Carbon Footprint",
        category: "environmental",
        value: 2.84,
        unit: "tCO2e/ton",
        target: 2.5,
        benchmark: 3.2,
        trend: "down",
        change: -8.5,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Συνολικές εκπομπές CO2 ανά τόνο παραγό��ενου ψαριού"
            : "Total CO2 emissions per ton of fish produced",
        methodology: "GHG Protocol Standards",
        dataSource: "IoT Sensors + Energy Bills",
        certification: "ISO 14064",
      },
      {
        id: "env-002",
        name: language === "el" ? "Κατανάλωση Νερού" : "Water Usage",
        category: "environmental",
        value: 8.2,
        unit: "m³/ton",
        target: 7.5,
        benchmark: 12.0,
        trend: "down",
        change: -12.3,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Κατανάλωση νερού ανά τόνο παραγωγής"
            : "Water consumption per ton of production",
        methodology: "Water Footprint Assessment",
        dataSource: "Smart Water Meters",
        certification: "ISO 14046",
      },
      {
        id: "env-003",
        name: language === "el" ? "Ανανεώσιμη Ενέργεια" : "Renewable Energy",
        category: "environmental",
        value: 67.3,
        unit: "%",
        target: 80.0,
        benchmark: 45.0,
        trend: "up",
        change: 15.8,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Ποσοστό ενέργειας από ανανεώσιμες πηγές"
            : "Percentage of energy from renewable sources",
        methodology: "Energy Tracking System",
        dataSource: "Energy Provider Reports",
        certification: "RE100",
      },
      {
        id: "env-004",
        name: language === "el" ? "Διαχείριση Αποβλήτων" : "Waste Management",
        category: "environmental",
        value: 2.3,
        unit: "kg/ton",
        target: 2.0,
        benchmark: 4.5,
        trend: "down",
        change: -18.2,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Παραγωγή αποβλήτων ανά τόνο παραγωγής"
            : "Waste generation per ton of production",
        methodology: "Waste Audit Protocol",
        dataSource: "Waste Management Records",
      },
      {
        id: "env-005",
        name: language === "el" ? "Βιοποικιλότητα Index" : "Biodiversity Index",
        category: "environmental",
        value: 78.5,
        unit: "score",
        target: 85.0,
        benchmark: 65.0,
        trend: "up",
        change: 5.2,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης επίδρασης στη βιοποικιλότητα"
            : "Biodiversity impact index",
        methodology: "Marine Biodiversity Assessment",
        dataSource: "Environmental Monitoring",
        certification: "MSC Chain of Custody",
      },
      {
        id: "soc-001",
        name: language === "el" ? "Ασφάλεια Εργασίας" : "Workplace Safety",
        category: "social",
        value: 0.8,
        unit: "incidents/1000h",
        target: 0.5,
        benchmark: 2.1,
        trend: "down",
        change: -35.5,
        lastUpdated: new Date("2024-11-20"),
        status: "warning",
        description:
          language === "el"
            ? "Ατυχήματα εργασίας ανά 1000 ώρες"
            : "Workplace accidents per 1000 hours",
        methodology: "OSHA Guidelines",
        dataSource: "Safety Management System",
        certification: "ISO 45001",
      },
      {
        id: "soc-002",
        name: language === "el" ? "Εκπαίδευση Προσωπικού" : "Employee Training",
        category: "social",
        value: 42.5,
        unit: "hours/employee/year",
        target: 40.0,
        benchmark: 28.0,
        trend: "up",
        change: 8.7,
        lastUpdated: new Date("2024-11-20"),
        status: "excellent",
        description:
          language === "el"
            ? "Ώρες εκπαίδευσης ανά υπάλληλο ετησίως"
            : "Training hours per employee annually",
        methodology: "Learning Management System",
        dataSource: "HR Training Records",
      },
      {
        id: "soc-003",
        name:
          language === "el" ? "Κοινωνική Συνεισφορά" : "Community Investment",
        category: "social",
        value: 2.1,
        unit: "% revenue",
        target: 2.5,
        benchmark: 1.2,
        trend: "up",
        change: 12.5,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Επενδύσεις στην τοπική κοινωνία"
            : "Investment in local community",
        methodology: "Community Impact Assessment",
        dataSource: "CSR Reports",
      },
      {
        id: "gov-001",
        name:
          language === "el" ? "Διαφάνεια Αναφορών" : "Reporting Transparency",
        category: "governance",
        value: 89.2,
        unit: "score",
        target: 90.0,
        benchmark: 72.0,
        trend: "up",
        change: 3.1,
        lastUpdated: new Date("2024-11-20"),
        status: "excellent",
        description:
          language === "el"
            ? "Δείκτης διαφάνειας αναφορών"
            : "Transparency reporting index",
        methodology: "GRI Standards",
        dataSource: "Sustainability Report",
        certification: "GRI Certified",
      },
      {
        id: "gov-002",
        name:
          language === "el" ? "Συμμόρφωση Κανονισμών" : "Regulatory Compliance",
        category: "governance",
        value: 98.5,
        unit: "%",
        target: 100.0,
        benchmark: 85.0,
        trend: "stable",
        change: 0.8,
        lastUpdated: new Date("2024-11-20"),
        status: "excellent",
        description:
          language === "el"
            ? "Ποσοστό συμμόρφωσης με κανονισμούς"
            : "Regulatory compliance percentage",
        methodology: "Compliance Audit",
        dataSource: "Legal & Compliance Department",
      },
      {
        id: "eco-001",
        name:
          language === "el"
            ? "Circular Economy Score"
            : "Circular Economy Score",
        category: "economic",
        value: 72.8,
        unit: "score",
        target: 80.0,
        benchmark: 60.0,
        trend: "up",
        change: 9.2,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης κυκλικής οικονομίας"
            : "Circular economy implementation index",
        methodology: "Ellen MacArthur Foundation Framework",
        dataSource: "Resource Flow Analysis",
      },
    ];

    const sampleCarbonFootprint: CarbonFootprint[] = [
      {
        id: "cf-001",
        source:
          language === "el" ? "Ενέργεια Εγκαταστάσεων" : "Facility Energy",
        category: "scope2",
        emissions: 485.2,
        percentage: 34.5,
        trend: "down",
        reduction: 12.3,
        target: 400.0,
        actions: [
          "LED lighting upgrade",
          "Solar panel installation",
          "Energy management system",
        ],
      },
      {
        id: "cf-002",
        source: language === "el" ? "Καύσιμα Σκαφών" : "Fleet Fuel",
        category: "scope1",
        emissions: 298.7,
        percentage: 21.2,
        trend: "down",
        reduction: 8.9,
        target: 250.0,
        actions: [
          "Fuel-efficient engines",
          "Route optimization",
          "Biofuel trials",
        ],
      },
      {
        id: "cf-003",
        source: language === "el" ? "Μεταφορές Προμηθειών" : "Supply Transport",
        category: "scope3",
        emissions: 267.4,
        percentage: 19.0,
        trend: "stable",
        reduction: 2.1,
        target: 220.0,
        actions: [
          "Local supplier preference",
          "Consolidated shipments",
          "Electric vehicle fleet",
        ],
      },
      {
        id: "cf-004",
        source:
          language === "el" ? "Ψύξη & Συντήρηση" : "Cooling & Preservation",
        category: "scope1",
        emissions: 189.3,
        percentage: 13.5,
        trend: "down",
        reduction: 15.2,
        target: 150.0,
        actions: [
          "Natural refrigerants",
          "Improved insulation",
          "Smart temperature control",
        ],
      },
      {
        id: "cf-005",
        source: language === "el" ? "Συσκευασία" : "Packaging",
        category: "scope3",
        emissions: 167.8,
        percentage: 11.9,
        trend: "down",
        reduction: 22.4,
        target: 120.0,
        actions: [
          "Biodegradable materials",
          "Reduced packaging",
          "Recyclable designs",
        ],
      },
    ];

    const sampleOceanHealth: OceanHealthIndicator[] = [
      {
        id: "oh-001",
        indicator: language === "el" ? "Ποιότητα Νερού" : "Water Quality",
        region: "Αιγαίο Πέλαγος",
        value: 7.8,
        unit: "pH",
        status: "healthy",
        trend: "stable",
        lastAssessment: new Date("2024-11-15"),
        threats: ["Πλαστικά απόβλητα", "Χημικές εκροές"],
        conservationActions: [
          "Beach cleanup campaigns",
          "Pollution monitoring",
          "Partnership with marine parks",
        ],
      },
      {
        id: "oh-002",
        indicator: language === "el" ? "Στοκ Ψαριών" : "Fish Stock",
        region: "Μεσόγειος",
        value: 68.5,
        unit: "% MSY",
        status: "concerning",
        trend: "improving",
        lastAssessment: new Date("2024-11-10"),
        threats: ["Υπεραλίευση", "Κλιματική αλλαγή"],
        conservationActions: [
          "Sustainable fishing quotas",
          "Seasonal fishing bans",
          "Fish aggregating devices",
        ],
      },
      {
        id: "oh-003",
        indicator: language === "el" ? "Βιοποικιλότητα" : "Marine Biodiversity",
        region: "Ιόνιο",
        value: 82.3,
        unit: "index",
        status: "healthy",
        trend: "improving",
        lastAssessment: new Date("2024-11-12"),
        threats: ["Θαλάσσια ρύπανση", "Habitat destruction"],
        conservationActions: [
          "Marine protected areas",
          "Habitat restoration",
          "Species monitoring",
        ],
      },
      {
        id: "oh-004",
        indicator:
          language === "el" ? "Θερμοκρασία Θάλασσας" : "Sea Temperature",
        region: "Κρητικό Πέλαγος",
        value: 18.9,
        unit: "°C",
        status: "concerning",
        trend: "declining",
        lastAssessment: new Date("2024-11-18"),
        threats: ["Κλιματική αλλαγή", "El Niño effects"],
        conservationActions: [
          "Carbon reduction initiatives",
          "Ocean cooling research",
          "Climate adaptation strategies",
        ],
      },
      {
        id: "oh-005",
        indicator:
          language === "el" ? "Οξίνιση Ωκεανών" : "Ocean Acidification",
        region: "Βόρειο Αιγαίο",
        value: 8.05,
        unit: "pH",
        status: "healthy",
        trend: "stable",
        lastAssessment: new Date("2024-11-16"),
        threats: ["CO2 absorption", "Industrial runoff"],
        conservationActions: [
          "Carbon capture initiatives",
          "Alkalinity enhancement research",
          "Coastal vegetation restoration",
        ],
      },
    ];

    const sampleGoals: SustainabilityGoal[] = [
      {
        id: "goal-001",
        title:
          language === "el"
            ? "Μηδενικές Εκπομπές 2030"
            : "Net Zero Emissions 2030",
        description:
          language === "el"
            ? "Επίτευξη μηδενικών καθαρών εκπομπών άνθρακα έως το 2030"
            : "Achieve net zero carbon emissions by 2030",
        category: "Environmental",
        targetValue: 0,
        currentValue: 1407.4,
        unit: "tCO2e",
        deadline: new Date("2030-12-31"),
        priority: "high",
        status: "on-track",
        progress: 35.2,
        milestones: [
          {
            title: "50% Renewable Energy",
            date: new Date("2025-06-30"),
            completed: false,
            description: "Achieve 50% renewable energy usage",
          },
          {
            title: "Carbon Offset Program",
            date: new Date("2026-12-31"),
            completed: false,
            description: "Launch comprehensive carbon offset program",
          },
          {
            title: "Zero Waste to Landfill",
            date: new Date("2028-12-31"),
            completed: false,
            description: "Eliminate all waste to landfill",
          },
        ],
        actions: [
          "Solar panel installation",
          "Energy efficiency upgrades",
          "Carbon offset partnerships",
          "Waste reduction initiatives",
        ],
        impact: "Eliminate 2,170 tons CO2e annually",
        investment: 1250000,
      },
      {
        id: "goal-002",
        title:
          language === "el"
            ? "100% Βιώσιμη Αλιεία"
            : "100% Sustainable Fishing",
        description:
          language === "el"
            ? "Πιστοποίηση όλων των αλιευτικών δραστηριοτήτων ως βιώσιμες"
            : "Certify all fishing operations as sustainable",
        category: "Environmental",
        targetValue: 100,
        currentValue: 78.5,
        unit: "%",
        deadline: new Date("2026-12-31"),
        priority: "high",
        status: "on-track",
        progress: 78.5,
        milestones: [
          {
            title: "MSC Certification",
            date: new Date("2025-03-31"),
            completed: true,
            description: "Obtain MSC certification for main species",
          },
          {
            title: "Traceability System",
            date: new Date("2025-09-30"),
            completed: false,
            description: "Implement full supply chain traceability",
          },
        ],
        actions: [
          "MSC certification process",
          "Fishing quota compliance",
          "Selective fishing gear",
          "Stock assessment programs",
        ],
        impact: "Protect marine ecosystems and fish stocks",
        investment: 450000,
      },
      {
        id: "goal-003",
        title:
          language === "el" ? "Μείωση Πλαστικών 80%" : "80% Plastic Reduction",
        description:
          language === "el"
            ? "Μείωση χρήσης πλαστικών κατά 80% έως το 2027"
            : "Reduce plastic usage by 80% by 2027",
        category: "Environmental",
        targetValue: 20,
        currentValue: 45.8,
        unit: "% of baseline",
        deadline: new Date("2027-12-31"),
        priority: "medium",
        status: "on-track",
        progress: 54.2,
        milestones: [
          {
            title: "Biodegradable Packaging",
            date: new Date("2025-06-30"),
            completed: false,
            description: "Switch to biodegradable packaging materials",
          },
          {
            title: "Reusable Container Program",
            date: new Date("2026-12-31"),
            completed: false,
            description: "Launch customer reusable container program",
          },
        ],
        actions: [
          "Alternative packaging research",
          "Supplier collaboration",
          "Customer education programs",
          "Plastic-free operations",
        ],
        impact: "Eliminate 15 tons of plastic waste annually",
        investment: 320000,
      },
      {
        id: "goal-004",
        title:
          language === "el"
            ? "Εργασιακή Ασφάλεια Zero Harm"
            : "Zero Harm Workplace Safety",
        description:
          language === "el"
            ? "Μηδενικά σοβαρά ατυχήματα εργασίας"
            : "Zero serious workplace accidents",
        category: "Social",
        targetValue: 0,
        currentValue: 0.8,
        unit: "serious incidents/1000h",
        deadline: new Date("2025-12-31"),
        priority: "high",
        status: "at-risk",
        progress: 62.0,
        milestones: [
          {
            title: "Safety Training Certification",
            date: new Date("2024-12-31"),
            completed: false,
            description: "100% employee safety certification",
          },
          {
            title: "Safety Equipment Upgrade",
            date: new Date("2025-06-30"),
            completed: false,
            description: "Complete safety equipment modernization",
          },
        ],
        actions: [
          "Enhanced safety training",
          "Modern safety equipment",
          "Safety culture development",
          "Regular safety audits",
        ],
        impact: "Protect all 200+ employees from workplace injuries",
        investment: 180000,
      },
      {
        id: "goal-005",
        title:
          language === "el" ? "Τοπική Κοινότητα 5%" : "5% Community Investment",
        description:
          language === "el"
            ? "Επένδυση 5% των εσόδων στην τοπική κοινότητα"
            : "Invest 5% of revenue in local community",
        category: "Social",
        targetValue: 5.0,
        currentValue: 2.1,
        unit: "% revenue",
        deadline: new Date("2028-12-31"),
        priority: "medium",
        status: "behind",
        progress: 42.0,
        milestones: [
          {
            title: "Education Fund",
            date: new Date("2025-12-31"),
            completed: false,
            description: "Establish local maritime education fund",
          },
          {
            title: "Infrastructure Support",
            date: new Date("2027-12-31"),
            completed: false,
            description: "Support local port infrastructure improvements",
          },
        ],
        actions: [
          "Community partnership agreements",
          "Local supplier preference",
          "Education sponsorship programs",
          "Infrastructure investments",
        ],
        impact: "Support 500+ local families and businesses",
        investment: 2500000,
      },
    ];

    setMetrics(sampleMetrics);
    setCarbonFootprint(sampleCarbonFootprint);
    setOceanHealth(sampleOceanHealth);
    setSustainabilityGoals(sampleGoals);
  }, [language]);

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value.toFixed(1)}%`;
    } else if (unit === "tCO2e") {
      return `${value.toLocaleString("el-GR", { maximumFractionDigits: 1 })} ${unit}`;
    } else if (unit === "°C") {
      return `${value.toFixed(1)}°C`;
    } else if (unit === "pH") {
      return `${value.toFixed(2)} pH`;
    } else if (unit === "m³/ton" || unit === "kg/ton") {
      return `${value.toFixed(1)} ${unit}`;
    }
    return `${value.toFixed(1)} ${unit}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      critical: "bg-red-100 text-red-800",
      healthy: "bg-green-100 text-green-800",
      concerning: "bg-yellow-100 text-yellow-800",
      "on-track": "bg-green-100 text-green-800",
      "at-risk": "bg-yellow-100 text-yellow-800",
      behind: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up" || trend === "improving") {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (trend === "down" || trend === "declining") {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    } else {
      return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "environmental":
        return <Leaf className="w-5 h-5 text-green-600" />;
      case "social":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "governance":
        return <Shield className="w-5 h-5 text-purple-600" />;
      case "economic":
        return <Target className="w-5 h-5 text-orange-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  // Calculate overall sustainability score
  const overallScore =
    metrics.length > 0
      ? Math.round(
          metrics.reduce((sum, metric) => {
            const score = (metric.value / metric.target) * 100;
            return sum + Math.min(score, 100);
          }, 0) / metrics.length,
        )
      : 0;

  // Carbon footprint data for pie chart
  const carbonChartData = carbonFootprint.map((item) => ({
    name: item.source,
    value: item.emissions,
    percentage: item.percentage,
  }));

  // ESG radar chart data
  const esgRadarData = [
    {
      category: "Environmental",
      score:
        metrics
          .filter((m) => m.category === "environmental")
          .reduce(
            (sum, m) => sum + Math.min((m.value / m.target) * 100, 100),
            0,
          ) / metrics.filter((m) => m.category === "environmental").length || 0,
    },
    {
      category: "Social",
      score:
        metrics
          .filter((m) => m.category === "social")
          .reduce(
            (sum, m) => sum + Math.min((m.value / m.target) * 100, 100),
            0,
          ) / metrics.filter((m) => m.category === "social").length || 0,
    },
    {
      category: "Governance",
      score:
        metrics
          .filter((m) => m.category === "governance")
          .reduce(
            (sum, m) => sum + Math.min((m.value / m.target) * 100, 100),
            0,
          ) / metrics.filter((m) => m.category === "governance").length || 0,
    },
    {
      category: "Economic",
      score:
        metrics
          .filter((m) => m.category === "economic")
          .reduce(
            (sum, m) => sum + Math.min((m.value / m.target) * 100, 100),
            0,
          ) / metrics.filter((m) => m.category === "economic").length || 0,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el"
              ? "Sustainability Tracking Center"
              : "Sustainability Tracking Center"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Παρακολούθηση ESG δεικτών και περιβαλλοντικής επίδρασης"
              : "ESG metrics tracking and environmental impact monitoring"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Activity className="w-3 h-3 mr-1" />
            Score: {overallScore}/100
          </Badge>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {language === "el" ? "ESG Report" : "ESG Report"}
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέος Στόχος" : "New Goal"}
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Συνολικό Score" : "Overall Score"}
                </p>
                <p className="text-2xl font-bold">{overallScore}/100</p>
                <p className="text-xs text-green-600">
                  +5.2 {language === "el" ? "vs προηγ. μήνα" : "vs last month"}
                </p>
              </div>
              <Award className="w-8 h-8 text-gold-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Carbon Footprint" : "Carbon Footprint"}
                </p>
                <p className="text-2xl font-bold">2.84</p>
                <p className="text-xs text-green-600">
                  -8.5% {language === "el" ? "μείωση" : "reduction"}
                </p>
              </div>
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Ανανεώσιμη Ενέργεια"
                    : "Renewable Energy"}
                </p>
                <p className="text-2xl font-bold text-blue-600">67.3%</p>
                <p className="text-xs text-blue-600">Target: 80%</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ωκεάνια Υγεία" : "Ocean Health"}
                </p>
                <p className="text-2xl font-bold text-cyan-600">75.8</p>
                <p className="text-xs text-cyan-600">
                  4 {language === "el" ? "περιοχές" : "regions"}
                </p>
              </div>
              <Waves className="w-8 h-8 text-cyan-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "el" ? "Ενεργοί Στόχοι" : "Active Goals"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {sustainabilityGoals.length}
                </p>
                <p className="text-xs text-purple-600">
                  {
                    sustainabilityGoals.filter((g) => g.status === "on-track")
                      .length
                  }{" "}
                  on track
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
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
          <TabsTrigger value="environmental">
            {language === "el" ? "Περιβάλλον" : "Environmental"}
          </TabsTrigger>
          <TabsTrigger value="social">
            {language === "el" ? "Κοινωνικό" : "Social"}
          </TabsTrigger>
          <TabsTrigger value="carbon">
            {language === "el" ? "Άνθρακας" : "Carbon"}
          </TabsTrigger>
          <TabsTrigger value="ocean">
            {language === "el" ? "Ωκεανοί" : "Oceans"}
          </TabsTrigger>
          <TabsTrigger value="goals">
            {language === "el" ? "Στόχοι" : "Goals"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ESG Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  {language === "el"
                    ? "ESG Performance Radar"
                    : "ESG Performance Radar"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={esgRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="ESG Score"
                      dataKey="score"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Carbon Footprint Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Κατανομή Εκπομπών"
                    : "Carbon Footprint Breakdown"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={carbonChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) =>
                        `${name}: ${percentage}%`
                      }
                    >
                      {carbonChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} tCO2e`, "Emissions"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Βασικοί Δείκτες Βιωσιμότητας"
                  : "Key Sustainability Metrics"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.slice(0, 6).map((metric) => (
                  <div
                    key={metric.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedMetric(metric)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(metric.category)}
                        <span className="font-medium text-sm">
                          {metric.name}
                        </span>
                      </div>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">
                          {formatValue(metric.value, metric.unit)}
                        </span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-sm font-medium ${
                              metric.change > 0
                                ? "text-green-600"
                                : metric.change < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {metric.change > 0 ? "+" : ""}
                            {metric.change.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>
                            Target: {formatValue(metric.target, metric.unit)}
                          </span>
                          <span>
                            {((metric.value / metric.target) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={(metric.value / metric.target) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="text-xs text-gray-500">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sustainability Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                {language === "el"
                  ? "Ειδοποιήσεις Βιωσιμότητας"
                  : "Sustainability Alerts"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    <strong>
                      {language === "el" ? "Προσοχή:" : "Warning:"}
                    </strong>
                    {language === "el"
                      ? " Η κατανάλωση νερού ξεπέρασε τον στόχο κατά 9.3% αυτόν τον μήνα."
                      : " Water consumption exceeded target by 9.3% this month."}
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <strong>
                      {language === "el" ? "Επιτυχία:" : "Success:"}
                    </strong>
                    {language === "el"
                      ? " Επιτεύχθηκε 15% μείωση στις εκπομπές CO2 αυτό το τρίμηνο."
                      : " Achieved 15% reduction in CO2 emissions this quarter."}
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <strong>
                      {language === "el" ? "Ενημέρωση:" : "Update:"}
                    </strong>
                    {language === "el"
                      ? " Νέες πιστοποιήσεις ASC διαθέσιμες για τα προϊόντα μας."
                      : " New ASC certifications available for our products."}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          {/* Environmental Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics
              .filter((m) => m.category === "environmental")
              .map((metric) => (
                <Card
                  key={metric.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        {getCategoryIcon(metric.category)}
                        <span className="ml-2">{metric.name}</span>
                      </CardTitle>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {formatValue(metric.value, metric.unit)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Target: {formatValue(metric.target, metric.unit)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span>
                            {((metric.value / metric.target) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={(metric.value / metric.target) * 100}
                          className="h-3"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-sm font-medium ${
                              metric.change > 0
                                ? "text-green-600"
                                : metric.change < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {metric.change > 0 ? "+" : ""}
                            {metric.change.toFixed(1)}%
                          </span>
                        </div>
                        <Badge variant="outline">
                          {metric.certification || "Internal"}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-600 border-t pt-2">
                        <div className="mb-1">
                          <strong>Method:</strong> {metric.methodology}
                        </div>
                        <div>
                          <strong>Source:</strong> {metric.dataSource}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Environmental Impact Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TreePine className="w-5 h-5 mr-2 text-green-600" />
                {language === "el"
                  ? "Περιβαλλοντική Επίδραση - Χρονοσειρά"
                  : "Environmental Impact Timeline"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  data={metrics
                    .filter((m) => m.category === "environmental")
                    .map((m) => ({
                      name: m.name,
                      current: (m.value / m.target) * 100,
                      benchmark: (m.benchmark / m.target) * 100,
                      target: 100,
                    }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="current"
                    fill="#82ca9d"
                    name="Current Performance %"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#ff7300"
                    strokeWidth={3}
                    name="Target %"
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Industry Benchmark %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Social Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics
              .filter((m) => m.category === "social")
              .map((metric) => (
                <Card
                  key={metric.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        {getCategoryIcon(metric.category)}
                        <span className="ml-2">{metric.name}</span>
                      </CardTitle>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {formatValue(metric.value, metric.unit)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Target: {formatValue(metric.target, metric.unit)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress:</span>
                          <span>
                            {((metric.value / metric.target) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={(metric.value / metric.target) * 100}
                          className="h-3"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-sm font-medium ${
                              metric.change > 0
                                ? "text-green-600"
                                : metric.change < 0
                                  ? "text-red-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {metric.change > 0 ? "+" : ""}
                            {metric.change.toFixed(1)}%
                          </span>
                        </div>
                        <Badge variant="outline">
                          {metric.certification || "Internal"}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-600 border-t pt-2">
                        <div className="mb-1">
                          <strong>Method:</strong> {metric.methodology}
                        </div>
                        <div>
                          <strong>Source:</strong> {metric.dataSource}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Social Impact Initiatives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                {language === "el"
                  ? "Κοινωνικές Πρωτοβουλίες"
                  : "Social Impact Initiatives"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">
                    {language === "el"
                      ? "Ενεργές Πρωτοβουλίες"
                      : "Active Initiatives"}
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">
                        {language === "el"
                          ? "Πρόγραμμα Εκπαίδευσης Νέων"
                          : "Youth Education Program"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === "el"
                          ? "Εκπαίδευση 150 νέων σε θαλάσσια επαγγέλματα"
                          : "Training 150 youth in marine professions"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Progress value={75} className="w-3/4 h-2" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">
                        {language === "el"
                          ? "Στήριξη Τοπικών Αλιέων"
                          : "Local Fishermen Support"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === "el"
                          ? "Οικονομική και τεχνική υποστήριξη 50 οικογενειών"
                          : "Financial and technical support for 50 families"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Progress value={92} className="w-3/4 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">
                        {language === "el"
                          ? "Πρόγραμμα Ασφάλειας"
                          : "Safety Program"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === "el"
                          ? "Zero Harm - Μηδενικά ατυχήματα εργασίας"
                          : "Zero Harm - Zero workplace accidents"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Progress value={62} className="w-3/4 h-2" />
                        <span className="text-sm font-medium">62%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">
                    {language === "el"
                      ? "Κοινωνικός Αντίκτυπος"
                      : "Social Impact"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        500+
                      </div>
                      <div className="text-sm text-blue-800">
                        {language === "el" ? "Οικογένειες" : "Families"}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        €1.2M
                      </div>
                      <div className="text-sm text-green-800">
                        {language === "el" ? "Επένδυση" : "Investment"}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        25
                      </div>
                      <div className="text-sm text-purple-800">
                        {language === "el" ? "Προγράμματα" : "Programs"}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        8
                      </div>
                      <div className="text-sm text-orange-800">
                        {language === "el" ? "Κοινότητες" : "Communities"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon" className="space-y-6">
          {/* Carbon Footprint Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  {language === "el"
                    ? "Ανάλυση Αποτυπώματος Άνθρακα"
                    : "Carbon Footprint Analysis"}
                </span>
                <Badge variant="outline">
                  {carbonFootprint
                    .reduce((sum, item) => sum + item.emissions, 0)
                    .toFixed(1)}{" "}
                  tCO2e total
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carbonFootprint.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-2">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{item.source}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {item.emissions.toFixed(1)} tCO2e
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.percentage}% of total emissions
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold">
                            Target: {item.target.toFixed(1)} tCO2e
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              item.trend === "down"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.trend === "down" ? "-" : "+"}
                            {item.reduction.toFixed(1)}%
                          </div>
                          <Progress
                            value={(item.target / item.emissions) * 100}
                            className="mt-2 h-2"
                          />
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 text-sm">
                            {language === "el"
                              ? "Δράσεις Μείωσης"
                              : "Reduction Actions"}
                          </h4>
                          <div className="space-y-1">
                            {item.actions.map((action, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs mr-1 mb-1"
                              >
                                {action}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carbon Reduction Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Χάρτης Πορείας Μείωσης Εκπομπών"
                  : "Carbon Reduction Roadmap"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  data={carbonFootprint.map((item) => ({
                    name: item.source,
                    current: item.emissions,
                    target: item.target,
                    reduction: item.reduction,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="current"
                    fill="#ff7300"
                    name="Current Emissions (tCO2e)"
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="target"
                    fill="#82ca9d"
                    name="Target Emissions (tCO2e)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="reduction"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Reduction Achieved (%)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ocean" className="space-y-6">
          {/* Ocean Health Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Waves className="w-5 h-5 mr-2 text-cyan-600" />
                  {language === "el"
                    ? "Dashboard Υγείας Ωκεανών"
                    : "Ocean Health Dashboard"}
                </span>
                <Badge variant="outline">
                  {oceanHealth.length}{" "}
                  {language === "el"
                    ? "��εριοχές παρακολούθησης"
                    : "monitoring regions"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {oceanHealth.map((indicator) => (
                  <Card
                    key={indicator.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {indicator.indicator}
                        </CardTitle>
                        <Badge className={getStatusColor(indicator.status)}>
                          {indicator.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {indicator.region}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-cyan-600">
                            {formatValue(indicator.value, indicator.unit)}
                          </div>
                          <div className="flex items-center justify-center space-x-2 mt-1">
                            {getTrendIcon(indicator.trend)}
                            <span className="text-sm text-gray-500">
                              {indicator.trend}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {language === "el" ? "Απειλές" : "Threats"}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {indicator.threats.map((threat, idx) => (
                              <Badge
                                key={idx}
                                variant="destructive"
                                className="text-xs"
                              >
                                {threat}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">
                            {language === "el"
                              ? "Δράσεις Προστασίας"
                              : "Conservation Actions"}
                          </h4>
                          <div className="space-y-1">
                            {indicator.conservationActions
                              .slice(0, 2)
                              .map((action, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs text-gray-600"
                                >
                                  • {action}
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 border-t pt-2">
                          Last Assessment:{" "}
                          {indicator.lastAssessment.toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ocean Conservation Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                {language === "el"
                  ? "Χάρτης Προστασίας Ωκεανών"
                  : "Ocean Conservation Map"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Waves className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">
                    {language === "el"
                      ? "Διαδραστικός χάρτης περιοχών παρακολούθησης"
                      : "Interactive monitoring regions map"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {language === "el"
                      ? "Θα ενσωματωθεί σύστημα χαρτογράφησης GIS"
                      : "GIS mapping system to be integrated"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Sustainability Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  {language === "el"
                    ? "Στόχοι Βιωσιμότητας"
                    : "Sustainability Goals"}
                </span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {language === "el" ? "Νέος Στόχος" : "New Goal"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sustainabilityGoals.map((goal) => (
                  <Card
                    key={goal.id}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">
                                {goal.title}
                              </h3>
                              <p className="text-gray-600 mt-1">
                                {goal.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                              <Badge className={getStatusColor(goal.status)}>
                                {goal.status}
                              </Badge>
                              <Badge
                                className={
                                  goal.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : goal.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {goal.priority} priority
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {formatValue(goal.currentValue, goal.unit)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Current
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {formatValue(goal.targetValue, goal.unit)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Target
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {goal.progress.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">
                                Progress
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                €{(goal.investment / 1000).toFixed(0)}K
                              </div>
                              <div className="text-xs text-gray-500">
                                Investment
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Overall Progress:</span>
                              <span>{goal.progress.toFixed(1)}%</span>
                            </div>
                            <Progress value={goal.progress} className="h-3" />
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium mb-2">
                              {language === "el" ? "Ενέργειες" : "Actions"}
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {goal.actions.map((action, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {action}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium mb-1">
                              {language === "el"
                                ? "Αναμενόμενος Αντίκτυπος"
                                : "Expected Impact"}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {goal.impact}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">
                            {language === "el" ? "Ορόσημα" : "Milestones"}
                          </h4>
                          <div className="space-y-3">
                            {goal.milestones.map((milestone, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-3"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full mt-1 ${
                                    milestone.completed
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-sm font-medium ${
                                        milestone.completed
                                          ? "text-green-800"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {milestone.title}
                                    </span>
                                    {milestone.completed && (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {milestone.date.toLocaleDateString()}
                                  </div>
                                  <div className="text-xs text-gray-600 mt-1">
                                    {milestone.description}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              <div className="flex justify-between mb-1">
                                <span>Deadline:</span>
                                <span className="font-medium">
                                  {goal.deadline.toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Days Remaining:</span>
                                <span className="font-medium">
                                  {Math.ceil(
                                    (goal.deadline.getTime() -
                                      new Date().getTime()) /
                                      (1000 * 60 * 60 * 24),
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilityTrackingSystem;
