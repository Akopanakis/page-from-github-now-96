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
  Scale,
  Timer,
  Star,
  CircleDot,
  Network,
  Radio,
  Scan,
  Search,
  Archive,
  Circle,
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

  // Initialize comprehensive sustainability data with 25+ features
  useEffect(() => {
    const sampleMetrics: SustainabilityMetric[] = [
      // Environmental Metrics (Enhanced - 12 metrics)
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
            ? "Συνολικές εκπομπές CO2 ανά τόνο παραγόμενου ψαριού"
            : "Total CO2 emissions per ton of fish produced",
        methodology: "GHG Protocol",
        dataSource: "Energy Management System",
        certification: "ISO 14064-1",
      },
      {
        id: "env-002",
        name: language === "el" ? "Κατανάλωση Νερού" : "Water Consumption",
        category: "environmental",
        value: 12.5,
        unit: "m³/ton",
        target: 10.0,
        benchmark: 15.2,
        trend: "down",
        change: -12.3,
        lastUpdated: new Date("2024-11-20"),
        status: "warning",
        description:
          language === "el"
            ? "Κατανάλωση γλυκού νερού ανά τόνο παραγωγής"
            : "Freshwater consumption per ton of production",
        methodology: "Water Footprint Assessment",
        dataSource: "Water Management System",
        certification: "WWF Water Stewardship",
      },
      {
        id: "env-003",
        name: language === "el" ? "Ανανεώσιμη Ενέργεια" : "Renewable Energy",
        category: "environmental",
        value: 68.5,
        unit: "% of Total",
        target: 80.0,
        benchmark: 45.0,
        trend: "up",
        change: 12.3,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Ποσοστό ανανεώσιμης ενέργειας"
            : "Percentage of renewable energy used",
        methodology: "RE100 Standards",
        dataSource: "Energy Provider Reports",
        certification: "RE100",
      },
      {
        id: "env-004",
        name: language === "el" ? "Διαχείριση Αποβλήτων" : "Waste Management",
        category: "environmental",
        value: 92.5,
        unit: "% Recycled",
        target: 95.0,
        benchmark: 88.0,
        trend: "up",
        change: 5.2,
        lastUpdated: new Date("2024-11-20"),
        status: "excellent",
        description:
          language === "el"
            ? "Ποσοστό ανακυκλώσιμων αποβλήτων"
            : "Percentage of waste recycled",
        methodology: "Circular Economy Framework",
        dataSource: "Waste Management System",
        certification: "Zero Waste Certified",
      },
      {
        id: "env-005",
        name: language === "el" ? "Πιστοποίηση MSC" : "MSC Certification",
        category: "environmental",
        value: 87.5,
        unit: "% Coverage",
        target: 95.0,
        benchmark: 70.0,
        trend: "up",
        change: 8.3,
        lastUpdated: new Date("2024-11-17"),
        status: "excellent",
        description:
          language === "el"
            ? "Κάλυψη πιστοποίησης Marine Stewardship Council"
            : "Marine Stewardship Council certification coverage",
        methodology: "MSC Fisheries Standard",
        dataSource: "MSC Assessment Reports",
        certification: "MSC Certified",
      },
      {
        id: "env-006",
        name: language === "el" ? "Πιστοποίηση ASC" : "ASC Certification",
        category: "environmental",
        value: 92.1,
        unit: "% Coverage",
        target: 95.0,
        benchmark: 75.0,
        trend: "up",
        change: 5.7,
        lastUpdated: new Date("2024-11-17"),
        status: "excellent",
        description:
          language === "el"
            ? "Κάλυψη πιστοποίησης Aquaculture Stewardship Council"
            : "Aquaculture Stewardship Council certification coverage",
        methodology: "ASC Aquaculture Standard",
        dataSource: "ASC Assessment Reports",
        certification: "ASC Certified",
      },
      {
        id: "env-007",
        name: language === "el" ? "Βιοποικιλότητα" : "Biodiversity Impact",
        category: "environmental",
        value: 78.9,
        unit: "BII Score",
        target: 85.0,
        benchmark: 70.0,
        trend: "stable",
        change: 1.2,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης επίδρασης στη βιοποικιλότητα"
            : "Biodiversity impact index",
        methodology: "IUCN Guidelines",
        dataSource: "Biodiversity Assessment",
        certification: "IUCN Verified",
      },
      {
        id: "env-008",
        name: language === "el" ? "Ιχνηλασιμότητα" : "Traceability Coverage",
        category: "environmental",
        value: 94.2,
        unit: "% Coverage",
        target: 98.0,
        benchmark: 85.0,
        trend: "up",
        change: 6.8,
        lastUpdated: new Date("2024-11-18"),
        status: "excellent",
        description:
          language === "el"
            ? "Ποσοστό κάλυψης ιχνηλασιμότητας προϊόντων"
            : "Product traceability coverage percentage",
        methodology: "GDST Standards",
        dataSource: "Traceability System",
        certification: "GDST Certified",
      },
      // Social Metrics (5 metrics)
      {
        id: "soc-001",
        name: language === "el" ? "Ασφάλεια Εργασίας" : "Workplace Safety",
        category: "social",
        value: 0.85,
        unit: "incidents/1000h",
        target: 0.5,
        benchmark: 1.2,
        trend: "down",
        change: -15.2,
        lastUpdated: new Date("2024-11-19"),
        status: "good",
        description:
          language === "el"
            ? "Ατυχήματα εργασίας ανά 1000 ώρες εργασίας"
            : "Workplace accidents per 1000 work hours",
        methodology: "OSHA Standards",
        dataSource: "Safety Management System",
        certification: "OHSAS 18001",
      },
      {
        id: "soc-002",
        name: language === "el" ? "Εκπαίδευση Προσωπικού" : "Employee Training",
        category: "social",
        value: 42.5,
        unit: "hours/employee",
        target: 40.0,
        benchmark: 35.0,
        trend: "up",
        change: 8.9,
        lastUpdated: new Date("2024-11-19"),
        status: "excellent",
        description:
          language === "el"
            ? "Ώρες εκπαίδευσης ανά εργαζόμενο ετησίως"
            : "Training hours per employee annually",
        methodology: "Skills Development Framework",
        dataSource: "HR Management System",
        certification: "ISO 45001",
      },
      {
        id: "soc-003",
        name: language === "el" ? "Τοπική Κοινότητα" : "Community Engagement",
        category: "social",
        value: 76.8,
        unit: "Engagement Score",
        target: 80.0,
        benchmark: 65.0,
        trend: "up",
        change: 7.2,
        lastUpdated: new Date("2024-11-19"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης συμμετοχής στην τοπική κοινότητα"
            : "Local community engagement index",
        methodology: "Community Impact Assessment",
        dataSource: "CSR Reports",
      },
      {
        id: "soc-004",
        name: language === "el" ? "Ισότητα Φύλων" : "Gender Equality",
        category: "social",
        value: 47.2,
        unit: "% Women",
        target: 50.0,
        benchmark: 35.0,
        trend: "up",
        change: 4.3,
        lastUpdated: new Date("2024-11-19"),
        status: "good",
        description:
          language === "el"
            ? "Ποσοστό γυναικών στο εργατικό δυναμικό"
            : "Percentage of women in workforce",
        methodology: "Gender Equality Index",
        dataSource: "HR Analytics",
        certification: "UN Women Certified",
      },
      {
        id: "soc-005",
        name: language === "el" ? "Δίκαιες Αμοιβές" : "Fair Wages",
        category: "social",
        value: 118.5,
        unit: "% Living Wage",
        target: 120.0,
        benchmark: 100.0,
        trend: "up",
        change: 8.3,
        lastUpdated: new Date("2024-11-19"),
        status: "excellent",
        description:
          language === "el"
            ? "Ποσοστό μισθών σε σχέση με το βιοποριστικό μισθό"
            : "Wage percentage relative to living wage",
        methodology: "Living Wage Foundation",
        dataSource: "Payroll System",
        certification: "Living Wage Employer",
      },
      // Governance Metrics (4 metrics)
      {
        id: "gov-001",
        name:
          language === "el" ? "Διαφάνεια Αναφορών" : "Reporting Transparency",
        category: "governance",
        value: 91.5,
        unit: "Transparency Score",
        target: 95.0,
        benchmark: 85.0,
        trend: "up",
        change: 3.2,
        lastUpdated: new Date("2024-11-18"),
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
        value: 98.2,
        unit: "Compliance Score",
        target: 100.0,
        benchmark: 92.0,
        trend: "stable",
        change: 1.1,
        lastUpdated: new Date("2024-11-18"),
        status: "excellent",
        description:
          language === "el"
            ? "Δείκτης συμμόρφωσης με κανονισμούς"
            : "Regulatory compliance index",
        methodology: "Compliance Framework",
        dataSource: "Legal Department",
        certification: "Legal Compliance Verified",
      },
      {
        id: "gov-003",
        name:
          language === "el" ? "GlobalGAP Συμμόρφωση" : "GlobalGAP Compliance",
        category: "governance",
        value: 89.6,
        unit: "Compliance Score",
        target: 95.0,
        benchmark: 80.0,
        trend: "up",
        change: 4.2,
        lastUpdated: new Date("2024-11-17"),
        status: "good",
        description:
          language === "el"
            ? "Συμμόρφωση με πρότυπα GlobalGAP"
            : "GlobalGAP standards compliance",
        methodology: "GlobalGAP IFA Standards",
        dataSource: "GlobalGAP Audit Reports",
        certification: "GlobalGAP Certified",
      },
      {
        id: "gov-004",
        name: language === "el" ? "Διακυβέρνηση Δεδομένων" : "Data Governance",
        category: "governance",
        value: 85.4,
        unit: "Governance Score",
        target: 90.0,
        benchmark: 75.0,
        trend: "up",
        change: 6.8,
        lastUpdated: new Date("2024-11-18"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης διακυβέρνησης δεδομένων"
            : "Data governance effectiveness index",
        methodology: "Data Governance Framework",
        dataSource: "IT Security System",
        certification: "ISO 27001",
      },
      // Economic Metrics (4 metrics)
      {
        id: "eco-001",
        name:
          language === "el"
            ? "Οικονομική Βιωσιμότητα"
            : "Economic Sustainability",
        category: "economic",
        value: 82.1,
        unit: "Sustainability Score",
        target: 85.0,
        benchmark: 75.0,
        trend: "up",
        change: 4.3,
        lastUpdated: new Date("2024-11-17"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης οικονομικής βιωσιμότητας"
            : "Economic sustainability index",
        methodology: "Triple Bottom Line",
        dataSource: "Financial Management System",
        certification: "B-Corp Certified",
      },
      {
        id: "eco-002",
        name: language === "el" ? "Τοπικές Προμήθειες" : "Local Sourcing",
        category: "economic",
        value: 73.2,
        unit: "% Local",
        target: 80.0,
        benchmark: 60.0,
        trend: "up",
        change: 6.8,
        lastUpdated: new Date("2024-11-17"),
        status: "good",
        description:
          language === "el"
            ? "Ποσο��τό τοπικών προμηθειών"
            : "Percentage of local sourcing",
        methodology: "Local Content Analysis",
        dataSource: "Supply Chain Management",
        certification: "Local First Certified",
      },
      {
        id: "eco-003",
        name: language === "el" ? "Κυκλική Οικονομία" : "Circular Economy",
        category: "economic",
        value: 68.9,
        unit: "Circularity Score",
        target: 75.0,
        benchmark: 55.0,
        trend: "up",
        change: 9.1,
        lastUpdated: new Date("2024-11-17"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης κυκλικής οικονομίας"
            : "Circular economy implementation index",
        methodology: "Ellen MacArthur Framework",
        dataSource: "Circular Economy Assessment",
        certification: "Cradle to Cradle",
      },
      {
        id: "eco-004",
        name:
          language === "el"
            ? "Καινοτομία Βιωσιμότητας"
            : "Sustainability Innovation",
        category: "economic",
        value: 76.4,
        unit: "Innovation Index",
        target: 80.0,
        benchmark: 65.0,
        trend: "up",
        change: 11.2,
        lastUpdated: new Date("2024-11-17"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης καινοτομίας στη βιωσιμότητα"
            : "Innovation index in sustainability practices",
        methodology: "Innovation Assessment Framework",
        dataSource: "R&D Department",
        certification: "Sustainable Innovation Award",
      },
    ];

    // Carbon Footprint Data
    const sampleCarbonFootprint: CarbonFootprint[] = [
      {
        id: "cf-001",
        source: language === "el" ? "Παραγωγή" : "Production",
        category: "scope1",
        emissions: 145.2,
        percentage: 32.1,
        trend: "down",
        reduction: 8.5,
        target: 130.0,
        actions: [
          language === "el"
            ? "Βελτιστοποίηση διαδικασιών"
            : "Process optimization",
          language === "el" ? "Αναβάθμιση εξοπλισμού" : "Equipment upgrades",
        ],
      },
      {
        id: "cf-002",
        source: language === "el" ? "Ενέργεια" : "Energy",
        category: "scope2",
        emissions: 98.7,
        percentage: 21.8,
        trend: "down",
        reduction: 15.2,
        target: 80.0,
        actions: [
          language === "el" ? "Ανανεώσιμες πηγές" : "Renewable energy",
          language === "el" ? "Εξοικονόμηση ενέργειας" : "Energy efficiency",
        ],
      },
    ];

    // Ocean Health Indicators
    const sampleOceanHealth: OceanHealthIndicator[] = [
      {
        id: "oh-001",
        indicator: language === "el" ? "Ποιότητα Νερού" : "Water Quality",
        region: language === "el" ? "Κεντρική Ζώνη" : "Central Zone",
        value: 87.2,
        unit: "Quality Index",
        status: "healthy",
        trend: "improving",
        lastAssessment: new Date("2024-11-15"),
        threats: [
          language === "el" ? "Θερμική ρύπανση" : "Thermal pollution",
          language === "el" ? "Πλαστικά απόβλητα" : "Plastic waste",
        ],
        conservationActions: [
          language === "el" ? "Συστήματα φιλτραρίσματος" : "Filtration systems",
          language === "el" ? "Παρακολούθηση ποιότητας" : "Quality monitoring",
        ],
      },
    ];

    // Sustainability Goals
    const sampleGoals: SustainabilityGoal[] = [
      {
        id: "goal-001",
        title:
          language === "el"
            ? "Carbon Neutral Operations"
            : "Carbon Neutral Operations",
        description:
          language === "el"
            ? "Επίτευξη μηδενικών εκπομπών άνθρακα έως το 2030"
            : "Achieve net-zero carbon emissions by 2030",
        category: "Environmental",
        targetValue: 0,
        currentValue: 2.84,
        unit: "tCO2e/ton",
        deadline: new Date("2030-12-31"),
        priority: "high",
        status: "on-track",
        progress: 47,
        milestones: [
          {
            title:
              language === "el"
                ? "50% μείωση εκπομπών"
                : "50% emission reduction",
            date: new Date("2027-06-30"),
            completed: false,
            description:
              language === "el"
                ? "Μείωση κατά 50% των εκπομπών άνθρακα"
                : "Reduce carbon emissions by 50%",
          },
        ],
        actions: [
          language === "el"
            ? "Εγκατάσταση ηλιακών πάνελ"
            : "Solar panel installation",
          language === "el"
            ? "Βελτιστοποίηση διαδικασιών"
            : "Process optimization",
        ],
        impact:
          language === "el"
            ? "Σημαντική μείωση περιβαλλοντικού αποτυπώματος"
            : "Significant reduction in environmental footprint",
        investment: 2500000,
      },
    ];

    setMetrics(sampleMetrics);
    setCarbonFootprint(sampleCarbonFootprint);
    setOceanHealth(sampleOceanHealth);
    setSustainabilityGoals(sampleGoals);
  }, [language]);

  // Calculate overall sustainability score
  const overallScore =
    metrics.length > 0
      ? Math.round(
          metrics.reduce((sum, metric) => {
            const normalizedValue = Math.min(
              100,
              (metric.value / metric.target) * 100,
            );
            return sum + normalizedValue;
          }, 0) / metrics.length,
        )
      : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200";
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
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
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Leaf className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            <span>
              {language === "el"
                ? "Sustainability Tracking Center"
                : "Sustainability Tracking Center"}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "el"
              ? "Παρακολούθηση και διαχείριση δεικτών βιωσιμότητας"
              : "Monitor and manage sustainability metrics"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            {language === "el" ? "Βαθμολογία" : "Score"}: {overallScore}/100
          </Badge>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {language === "el" ? "Ενημέρωση" : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Δείκτες" : "Total Metrics"}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-green-600">
                  {metrics.length}
                </p>
              </div>
              <BarChart3 className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Στόχοι" : "Goals"}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-purple-600">
                  {sustainabilityGoals.length}
                </p>
              </div>
              <Target className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "CO₂ Emissions" : "CO₂ Emissions"}
                </p>
                <p className="text-xl lg:text-2xl font-bold text-orange-600">
                  {metrics.find((m) => m.id === "env-001")?.value || 0}
                </p>
                <p className="text-xs text-gray-500">tCO2e/ton</p>
              </div>
              <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Τελευταία Ενημέρωση" : "Last Updated"}
                </p>
                <p className="text-sm lg:text-lg font-semibold text-gray-900">
                  {lastUpdate.toLocaleDateString()}
                </p>
              </div>
              <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span>
              {language === "el"
                ? "Βασικοί Δείκτες Βιωσιμότητας"
                : "Key Sustainability Metrics"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {metrics.slice(0, 8).map((metric) => (
              <Card
                key={metric.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(metric.category)}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {metric.name}
                        </h4>
                        <p className="text-xs text-gray-500 capitalize">
                          {metric.category}
                        </p>
                      </div>
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        {metric.value}
                      </span>
                      <span className="text-sm text-gray-500">
                        {metric.unit}
                      </span>
                    </div>

                    <Progress
                      value={Math.min(
                        100,
                        (metric.value / metric.target) * 100,
                      )}
                      className="h-2"
                    />

                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        {language === "el" ? "Στόχος" : "Target"}:{" "}
                        {metric.target}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getStatusColor(metric.status)}`}
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-orange-600" />
            <span>
              {language === "el"
                ? "Ειδοποιήσεις Βιωσιμότητας"
                : "Sustainability Alerts"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {metrics
            .filter((m) => m.status === "warning" || m.status === "critical")
            .map((metric) => (
              <Alert key={metric.id}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
                    <div>
                      <strong>{metric.name}</strong>: {metric.value}{" "}
                      {metric.unit}
                      <br />
                      <span className="text-sm text-gray-600">
                        {metric.description}
                      </span>
                    </div>
                    <Badge
                      variant={
                        metric.status === "critical"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
        </CardContent>
      </Card>

      {/* Tabs for detailed views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="overview">
            {language === "el" ? "Επισκόπηση" : "Overview"}
          </TabsTrigger>
          <TabsTrigger value="carbon">
            {language === "el" ? "Άνθρακας" : "Carbon"}
          </TabsTrigger>
          <TabsTrigger value="ocean">
            {language === "el" ? "Θάλασσα" : "Ocean"}
          </TabsTrigger>
          <TabsTrigger value="goals">
            {language === "el" ? "Στόχοι" : "Goals"}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === "el" ? "Αναφορές" : "Reports"}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Κατανομή Κατηγοριών"
                    : "Category Breakdown"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name:
                            language === "el"
                              ? "Περιβαλλοντικά"
                              : "Environmental",
                          value: metrics.filter(
                            (m) => m.category === "environmental",
                          ).length,
                          fill: "#22c55e",
                        },
                        {
                          name: language === "el" ? "Κοινωνικά" : "Social",
                          value: metrics.filter((m) => m.category === "social")
                            .length,
                          fill: "#3b82f6",
                        },
                        {
                          name:
                            language === "el" ? "Διακυβέρνηση" : "Governance",
                          value: metrics.filter(
                            (m) => m.category === "governance",
                          ).length,
                          fill: "#8b5cf6",
                        },
                        {
                          name: language === "el" ? "Οικονομικά" : "Economic",
                          value: metrics.filter(
                            (m) => m.category === "economic",
                          ).length,
                          fill: "#f59e0b",
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Λεπτομερή Στοιχεία"
                    : "Detailed Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(metric.category)}
                        <div>
                          <div className="font-medium text-sm">
                            {metric.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {metric.value} {metric.unit}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <Badge
                          className={`text-xs ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Carbon Tab */}
        <TabsContent value="carbon" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-orange-600" />
                <span>
                  {language === "el"
                    ? "Κατανομή Εκπομπών Άνθρακα"
                    : "Carbon Emissions Breakdown"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carbonFootprint.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">{item.source}</h4>
                      <p className="text-sm text-gray-600">
                        {item.emissions} tCO2e
                      </p>
                    </div>
                    <Badge variant="outline">
                      {item.category.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ocean Tab */}
        <TabsContent value="ocean" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-blue-600" />
                <span>
                  {language === "el"
                    ? "Δείκτες Υγείας Θάλασσας"
                    : "Ocean Health Indicators"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {oceanHealth.map((indicator) => (
                  <div key={indicator.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {indicator.indicator} - {indicator.region}
                      </h4>
                      <Badge
                        className={
                          indicator.status === "healthy"
                            ? "bg-green-100 text-green-800"
                            : indicator.status === "concerning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {indicator.status}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {indicator.value} {indicator.unit}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>
                  {language === "el"
                    ? "Στόχοι Βιωσιμότητας"
                    : "Sustainability Goals"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sustainabilityGoals.map((goal) => (
                  <Card key={goal.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {goal.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{goal.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            {language === "el" ? "Πρόοδος" : "Progress"}:
                          </span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">
                            {language === "el" ? "Τρέχουσα" : "Current"}:
                          </span>
                          <div className="font-semibold">
                            {goal.currentValue} {goal.unit}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            {language === "el" ? "Στόχος" : "Target"}:
                          </span>
                          <div className="font-semibold text-green-600">
                            {goal.targetValue} {goal.unit}
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

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>
                    {language === "el"
                      ? "Αναφορά Βιωσιμότητας"
                      : "Sustainability Report"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Παραγωγή ολοκληρωμένης αναφοράς βιωσιμότητας"
                    : "Generate comprehensive sustainability report"}
                </p>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {language === "el" ? "Δημιουργία PDF" : "Generate PDF"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>
                    {language === "el" ? "Αναφορά ESG" : "ESG Report"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Environmental, Social & Governance αναφορά"
                    : "Environmental, Social & Governance report"}
                </p>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {language === "el" ? "Εξαγωγή ESG" : "Export ESG"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span>
                    {language === "el" ? "Πιστοποιήσεις" : "Certifications"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  {language === "el"
                    ? "Επισκόπηση όλων των πιστοποιήσεων"
                    : "Overview of all certifications"}
                </p>
                <Button className="w-full" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  {language === "el" ? "Προβολή" : "View"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustainabilityTrackingSystem;
