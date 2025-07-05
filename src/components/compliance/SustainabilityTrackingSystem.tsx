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
  Anchor as Boat,
  Scale,
  Timer,
  Star,
  CircleDot,
  Network,
  Radio,
  Scan,
  Search,
  Archive,
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
        name: language === "el" ? "Ποιότητα Νερού" : "Water Quality Index",
        category: "environmental",
        value: 87.2,
        unit: "WQI Score",
        target: 90.0,
        benchmark: 85.0,
        trend: "up",
        change: 3.4,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης ποιότητας νερού στις εγκαταστάσεις"
            : "Water quality index at facilities",
        methodology: "Multi-parameter analysis",
        dataSource: "Environmental Laboratory",
        certification: "ISO 17025",
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
        name: language === "el" ? "Κατανάλωση Ενέργειας" : "Energy Consumption",
        category: "environmental",
        value: 245.8,
        unit: "kWh/ton",
        target: 220.0,
        benchmark: 280.0,
        trend: "down",
        change: -8.7,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Κατανάλωση ενέργειας ανά τόνο παραγωγής"
            : "Energy consumption per ton of production",
        methodology: "Energy Audit Standards",
        dataSource: "Energy Monitoring System",
        certification: "ISO 50001",
      },
      {
        id: "env-006",
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
        name: language === "el" ? "Εκπομπές Μεθανίου" : "Methane Emissions",
        category: "environmental",
        value: 0.45,
        unit: "tCH4/ton",
        target: 0.35,
        benchmark: 0.62,
        trend: "down",
        change: -18.2,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Εκπομπές μεθανίου από τις διαδικασίες παραγωγής"
            : "Methane emissions from production processes",
        methodology: "IPCC Guidelines",
        dataSource: "Gas Monitoring Systems",
        certification: "GMP+ Certified",
      },
      {
        id: "env-009",
        name: language === "el" ? "Οικοσυστήματα Θάλασσας" : "Marine Ecosystems",
        category: "environmental",
        value: 82.1,
        unit: "Health Score",
        target: 90.0,
        benchmark: 75.0,
        trend: "up",
        change: 6.3,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Υγεία θαλάσσιων οικοσυστημάτων"
            : "Marine ecosystem health status",
        methodology: "Marine Conservation Assessment",
        dataSource: "Marine Biology Institute",
        certification: "Blue Marine Foundation",
      },
      {
        id: "env-010",
        name: language === "el" ? "Πλαστικά Απόβλητα" : "Plastic Waste",
        category: "environmental",
        value: 1.2,
        unit: "kg/ton",
        target: 0.8,
        benchmark: 2.5,
        trend: "down",
        change: -25.0,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Πλαστικά απόβλητα ανά τόνο παραγωγής"
            : "Plastic waste per ton of production",
        methodology: "Plastic Footprint Assessment",
        dataSource: "Waste Tracking System",
        certification: "Plastic Neutral Certified",
      },
      {
        id: "env-011",
        name: language === "el" ? "Οξίνιση Θάλασσας" : "Ocean Acidification",
        category: "environmental",
        value: 7.9,
        unit: "pH Level",
        target: 8.1,
        benchmark: 7.8,
        trend: "stable",
        change: 0.2,
        lastUpdated: new Date("2024-11-20"),
        status: "warning",
        description:
          language === "el"
            ? "Επίπεδα pH στα περιβάλλοντα νερά"
            : "pH levels in surrounding waters",
        methodology: "Ocean Chemistry Analysis",
        dataSource: "Marine Monitoring Buoys",
        certification: "Ocean Health Index",
      },
      {
        id: "env-012",
        name: language === "el" ? "Θερμοκρασία Νερού" : "Water Temperature",
        category: "environmental",
        value: 18.7,
        unit: "°C Average",
        target: 18.0,
        benchmark: 19.5,
        trend: "stable",
        change: -0.3,
        lastUpdated: new Date("2024-11-20"),
        status: "good",
        description:
          language === "el"
            ? "Μέση θερμοκρασία νερού στις εγκαταστάσεις"
            : "Average water temperature at facilities",
        methodology: "Thermal Monitoring",
        dataSource: "Temperature Sensors",
        certification: "Thermal Standards Compliant",
      },

      // Social Metrics (7 metrics)
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
        id: "soc-004",
        name: language === "el" ? "Υγεία και Ευεξία" : "Health & Wellbeing",
        category: "social",
        value: 88.7,
        unit: "Wellness Score",
        target: 90.0,
        benchmark: 80.0,
        trend: "up",
        change: 5.4,
        lastUpdated: new Date("2024-11-19"),
        status: "excellent",
        description:
          language === "el"
            ? "Δείκτης υγείας και ευεξίας εργαζομένων"
            : "Employee health and wellbeing index",
        methodology: "WHO Workplace Health Framework",
        dataSource: "Health Monitoring System",
        certification: "WHO Healthy Workplace",
      },
      {
        id: "soc-005",
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
        id: "soc-006",
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
      {
        id: "soc-007",
        name: language === "el" ? "Ικανοποίηση Εργαζομένων" : "Employee Satisfaction",
        category: "social",
        value: 84.2,
        unit: "Satisfaction Score",
        target: 85.0,
        benchmark: 75.0,
        trend: "up",
        change: 6.1,
        lastUpdated: new Date("2024-11-19"),
        status: "good",
        description:
          language === "el"
            ? "Δείκτης ικανοποίησης εργαζομένων"
            : "Employee satisfaction index",
        methodology: "Annual Employee Survey",
        dataSource: "HR Analytics Platform",
        certification: "Great Place to Work",
      },

      // Governance Metrics (4 metrics)
      {
        id: "gov-001",
        name: language === "el" ? "Διαφάνεια Αναφορών" : "Reporting Transparency",
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
        name: language === "el" ? "Συμμόρφωση Κανονισμών" : "Regulatory Compliance",
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
      {
        id: "gov-004",
        name: language === "el" ? "Ιχνηλασιμότητα" : "Traceability Coverage",
        category: "governance",
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

      // Economic Metrics (7 metrics)
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
        name: language === "el" ? "Πιστοποίηση MSC" : "MSC Certification",
        category: "economic",
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
        id: "eco-003",
        name: language === "el" ? "Πιστοποίηση ASC" : "ASC Certification",
        category: "economic",
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
        id: "eco-004",
        name: language === "el" ? "GlobalGAP Συμμόρφωση" : "GlobalGAP Compliance",
        category: "economic",
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
        id: "eco-005",
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
            ? "Ποσοστό τοπικών προμηθειών"
            : "Percentage of local sourcing",
        methodology: "Local Content Analysis",
        dataSource: "Supply Chain Management",
        certification: "Local First Certified",
      },
      {
        id: "eco-006",
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
        id: "eco-007",
        name: language === "el" ? "Καινοτομία Βιωσιμότητας" : "Sustainability Innovation",
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
          language === "el"
            ? "Αναβάθμιση εξοπλισμού"
            : "Equipment upgrades",
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
          language === "el"
            ? "Ανανεώσιμες πηγές"
            : "Renewable energy",
          language === "el"
            ? "Εξοικονόμηση ενέργειας"
            : "Energy efficiency",
        ],
      },
      {
        id: "cf-003",
        source: language === "el" ? "Μεταφορές" : "Transportation",
        category: "scope3",
        emissions: 87.3,
        percentage: 19.3,
        trend: "stable",
        reduction: 2.1,
        target: 75.0,
        actions: [
          language === "el"
            ? "Βελτιστοποίηση διαδρομών"
            : "Route optimization",
          language === "el"
            ? "Εναλλακτικά καύσιμα"
            : "Alternative fuels",
        ],
      },
      {
        id: "cf-004",
        source: language === "el" ? "Συσκευασία" : "Packaging",
        category: "scope3",
        emissions: 43.8,
        percentage: 9.7,
        trend: "down",
        reduction: 22.4,
        target: 35.0,
        actions: [
          language === "el"
            ? "Βιοδιασπώμενα υλικά"
            : "Biodegradable materials",
          language === "el"
            ? "Μείωση συσκευασίας"
            : "Packaging reduction",
        ],
      },
      {
        id: "cf-005",
        source: language === "el" ? "Τροφές" : "Feed",
        category: "scope3",
        emissions: 76.9,
        percentage: 17.0,
        trend: "down",
        reduction: 6.8,
        target: 70.0,
        actions: [
          language === "el"
            ? "Βιώσιμες τροφές"
            : "Sustainable feed",
          language === "el"
            ? "Τοπικές προμήθειες"
            : "Local sourcing",
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
          language === "el"
            ? "Συστήματα φιλτραρίσματος"
            : "Filtration systems",
          language === "el"
            ? "Παρακολούθηση ποιότητας"
            : "Quality monitoring",
        ],
      },
      {
        id: "oh-002",
        indicator: language === "el" ? "Βιοποικιλότητα" : "Biodiversity",
        region: language === "el" ? "Παράκτια Ζώνη" : "Coastal Zone",
        value: 78.5,
        unit: "Diversity Index",
        status: "concerning",
        trend: "stable",
        lastAssessment: new Date("2024-11-10"),
        threats: [
          language === "el" ? "Υπεραλίευση" : "Overfishing",
          language === "el" ? "Καταστροφή ενδιαιτημάτων" : "Habitat destruction",
        ],
        conservationActions: [
          language === "el"
            ? "Προστατευόμενες περιοχές"
            : "Protected areas",
          language === "el"
            ? "Αποκατάσταση ενδιαιτημάτων"
            : "Habitat restoration",
        ],
      },
      {
        id: "oh-003",
        indicator: language === "el" ? "Οξίνιση" : "Acidification",
        region: language === "el" ? "Βαθιά Νερά" : "Deep Waters",
        value: 7.9,
        unit: "pH Level",
        status: "concerning",
        trend: "declining",
        lastAssessment: new Date("2024-11-12"),
        threats: [
          language === "el" ? "Εκπομπές CO2" : "CO2 emissions",
          language === "el" ? "Βιομηχανικά απόβλητα" : "Industrial waste",
        ],
        conservationActions: [
          language === "el"
            ? "Μείωση εκπομπών"
            : "Emission reduction",
          language === "el"
            ? "Παρακολούθηση pH"
            : "pH monitoring",
        ],
      },
      {
        id: "oh-004",
        indicator: language === "el" ? "Θερμοκρασία" : "Temperature",
        region: language === "el" ? "Επιφανειακά Νερά" : "Surface Waters",
        value: 18.7,
        unit: "°C",
        status: "healthy",
        trend: "stable",
        lastAssessment: new Date("2024-11-18"),
        threats: [
          language === "el" ? "Κλιματική αλλαγή" : "Climate change",
          language === "el" ? "Αστική ανάπτυξη" : "Urban development",
        ],
        conservationActions: [
          language === "el"
            ? "Θερμικό monitoring"
            : "Thermal monitoring",
          language === "el"
            ? "Πράσινη υποδομή"
            : "Green infrastructure",
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
          {
            title:
              language === "el"
                ? "100% ανανεώσιμη ενέργεια"
                : "100% renewable energy",
            date: new Date("2028-12-31"),
            completed: false,
            description:
              language === "el"
                ? "Μετάβαση σε πλήρως ανα��εώσιμη ενέργεια"
                : "Transition to fully renewable energy",
          },
        ],
        actions: [
          language === "el"
            ? "Εγκατάσταση ηλιακών πάνελ"
            : "Solar panel installation",
          language === "el"
            ? "Βελτιστοποίηση διαδικασιών"
            : "Process optimization",
          language === "el"
            ? "Εξοικονόμηση ενέργειας"
            : "Energy efficiency measures",
        ],
        impact:
          language === "el"
            ? "Σημαντική μείωση περιβαλλοντικού αποτυπώματος"
            : "Significant reduction in environmental footprint",
        investment: 2500000,
      },
      {
        id: "goal-002",
        title:
          language === "el"
            ? "100% Sustainable Sourcing"
            : "100% Sustainable Sourcing",
        description:
          language === "el"
            ? "Πλήρως βιώσιμες προμήθειες έως το 2026"
            : "Achieve 100% sustainable sourcing by 2026",
        category: "Supply Chain",
        targetValue: 100,
        currentValue: 73.2,
        unit: "%",
        deadline: new Date("2026-12-31"),
        priority: "high",
        status: "on-track",
        progress: 73,
        milestones: [
          {
            title:
              language === "el"
                ? "80% βιώσιμες προμήθειες"
                : "80% sustainable sourcing",
            date: new Date("2025-06-30"),
            completed: false,
            description:
              language === "el"
                ? "Επίτευξη 80% βιώσιμων προμηθειών"
                : "Achieve 80% sustainable sourcing",
          },
        ],
        actions: [
          language === "el"
            ? "Πιστοποιήσεις προμηθευτών"
            : "Supplier certifications",
          language === "el"
            ? "Τοπικές συνεργασίες"
            : "Local partnerships",
        ],
        impact:
          language === "el"
            ? "Υποστήριξη τοπικής οικονομίας"
            : "Support local economy",
        investment: 750000,
      },
      {
        id: "goal-003",
        title:
          language === "el"
            ? "Zero Waste to Landfill"
            : "Zero Waste to Landfill",
        description:
          language === "el"
            ? "Μηδενικά απόβλητα προς υγειονομική ταφή"
            : "Eliminate all waste going to landfill",
        category: "Waste Management",
        targetValue: 100,
        currentValue: 92.5,
        unit: "% Diverted",
        deadline: new Date("2025-12-31"),
        priority: "medium",
        status: "on-track",
        progress: 93,
        milestones: [
          {
            title:
              language === "el"
                ? "95% ανακύκλωση"
                : "95% recycling rate",
            date: new Date("2025-03-31"),
            completed: false,
            description:
              language === "el"
                ? "Επίτευξη 95% ανακύκλωσης"
                : "Achieve 95% recycling rate",
          },
        ],
        actions: [
          language === "el"
            ? "Πρόγραμμα κομποστοποίησης"
            : "Composting program",
          language === "el"
            ? "Αναβάθμιση εγκαταστάσεων"
            : "Facility upgrades",
        ],
        impact:
          language === "el"
            ? "Μείωση περιβαλλοντικής επιβάρυνσης"
            : "Reduced environmental impact",
        investment: 425000,
      },
      {
        id: "goal-004",
        title:
          language === "el"
            ? "Employee Wellbeing Excellence"
            : "Employee Wellbeing Excellence",
        description:
          language === "el"
            ? "Επίτευξη αριστείας στην ευεξία εργαζομένων"
            : "Achieve excellence in employee wellbeing",
        category: "Social",
        targetValue: 95,
        currentValue: 88.7,
        unit: "Wellness Score",
        deadline: new Date("2025-12-31"),
        priority: "high",
        status: "on-track",
        progress: 93,
        milestones: [
          {
            title:
              language === "el"
                ? "Κέντρο υγείας"
                : "Health center establishment",
            date: new Date("2024-12-31"),
            completed: true,
            description:
              language === "el"
                ? "Εγκατάσταση κέντρου υγείας στο χώρο εργασίας"
                : "Establish on-site health center",
          },
        ],
        actions: [
          language === "el"
            ? "Προγράμματα wellness"
            : "Wellness programs",
          language === "el"
            ? "Ψυχική υγεία"
            : "Mental health support",
        ],
        impact:
          language === "el"
            ? "Αυξημένη παραγωγικότητα και ικανοποίηση"
            : "Increased productivity and satisfaction",
        investment: 320000,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Leaf className="w-8 h-8 text-green-600" />
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Δείκτες" : "Total Metrics"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Στόχοι" : "Goals"}
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {sustainabilityGoals.length}
                </p>
                <p className="text-xs text-gray-500">
                  {
                    sustainabilityGoals.filter((g) => g.status === "on-track")
                      .length
                  }{" "}
                  {language === "el" ? "εντός στόχου" : "on track"}
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "CO₂ Emissions" : "CO₂ Emissions"}
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {metrics.find((m) => m.id === "env-001")?.value || 0}
                </p>
                <p className="text-xs text-gray-500">tCO2e/ton</p>
              </div>
              <Globe className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === "el" ? "Τελευταία Ενημέρωση" : "Last Updated"}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {lastUpdate.toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-gray-600" />
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.slice(0, 9).map((metric) => (
                <Card key={metric.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(metric.category)}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            {metric.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {metric.category}
                          </p>
                        </div>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </span>
                        <span className="text-sm text-gray-500">
                          {metric.unit}
                        </span>
                      </div>
                      
                      <Progress 
                        value={Math.min(100, (metric.value / metric.target) * 100)} 
                        className="h-2"
                      />
                      
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">
                          {language === "el" ? "Στόχος" : "Target"}: {metric.target}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      
                      {metric.change !== 0 && (
                        <div className="flex items-center text-xs">
                          {metric.change > 0 ? (
                            <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                          )}
                          <span className={metric.change > 0 ? "text-green-600" : "text-red-600"}>
                            {Math.abs(metric.change)}%
                          </span>
                          <span className="text-gray-500 ml-1">
                            {language === "el" ? "από προηγούμενο" : "from previous"}
                          </span>
                        </div>
                      )}
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
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics
                .filter((m) => m.status === "warning" || m.status === "critical")
                .map((metric) => (
                  <Alert key={metric.id}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <strong>{metric.name}</strong>: {metric.value} {metric.unit}
                          <br />
                          <span className="text-sm text-gray-600">
                            {metric.description}
                          </span>
                        </div>
                        <Badge variant={metric.status === "critical" ? "destructive" : "secondary"}>
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
          <TabsList className="grid w-full grid-cols-5">
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
                            name: language === "el" ? "Περιβαλλοντικά" : "Environmental",
                            value: metrics.filter((m) => m.category === "environmental").length,
                            fill: "#22c55e"
                          },
                          {
                            name: language === "el" ? "Κοινωνικά" : "Social",
                            value: metrics.filter((m) => m.category === "social").length,
                            fill: "#3b82f6"
                          },
                          {
                            name: language === "el" ? "Διακυβέρνηση" : "Governance",
                            value: metrics.filter((m) => m.category === "governance").length,
                            fill: "#8b5cf6"
                          },
                          {
                            name: language === "el" ? "Οικονομικά" : "Economic",
                            value: metrics.filter((m) => m.category === "economic").length,
                            fill: "#f59e0b"
                          }
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

              {/* Performance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "el"
                      ? "Τάσεις Απόδοσης"
                      : "Performance Trends"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={metrics.slice(0, 8).map((metric, index) => ({
                        name: metric.name.slice(0, 15),
                        current: metric.value,
                        target: metric.target,
                        benchmark: metric.benchmark,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={10}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="current" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name={language === "el" ? "Τρέχουσα" : "Current"}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#ef4444" 
                        strokeDasharray="5 5"
                        name={language === "el" ? "Στόχος" : "Target"}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#64748b" 
                        strokeDasharray="2 2"
                        name={language === "el" ? "Benchmark" : "Benchmark"}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Λεπτομερή Στοιχεία Δεικτών"
                    : "Detailed Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {language === "el" ? "Δείκτης" : "Metric"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Κατηγορία" : "Category"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Τιμή" : "Value"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Στόχος" : "Target"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Τάση" : "Trend"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Κατάσταση" : "Status"}
                        </TableHead>
                        <TableHead>
                          {language === "el" ? "Πιστοποίηση" : "Certification"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {metrics.map((metric) => (
                        <TableRow key={metric.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{metric.name}</div>
                              <div className="text-sm text-gray-500">
                                {metric.description.slice(0, 50)}...
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(metric.category)}
                              <span className="capitalize">{metric.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <span className="font-semibold">{metric.value}</span>
                              <span className="text-sm text-gray-500 ml-1">
                                {metric.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span>{metric.target} {metric.unit}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTrendIcon(metric.trend)}
                              {metric.change !== 0 && (
                                <span className={`text-sm ${
                                  metric.change > 0 ? "text-green-600" : "text-red-600"
                                }`}>
                                  {metric.change > 0 ? "+" : ""}{metric.change}%
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(metric.status)}>
                              {metric.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {metric.certification && (
                              <Badge variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {metric.certification}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carbon Tab */}
          <TabsContent value="carbon" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={carbonFootprint}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="emissions"
                        nameKey="source"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {carbonFootprint.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} tCO2e`, name]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "el"
                      ? "Στόχοι Μείωσης Εκπομπών"
                      : "Emission Reduction Targets"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={carbonFootprint}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="emissions" 
                        fill="#ef4444" 
                        name={language === "el" ? "Τρέχουσες" : "Current"}
                      />
                      <Bar 
                        dataKey="target" 
                        fill="#22c55e" 
                        name={language === "el" ? "Στόχος" : "Target"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Carbon Actions */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Δράσεις Μείωσης Εκπομπών"
                    : "Carbon Reduction Actions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {carbonFootprint.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{item.source}</h4>
                          <Badge variant="outline">
                            {item.category.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              {language === "el" ? "Εκπομπές" : "Emissions"}:
                            </span>
                            <span className="font-semibold">{item.emissions} tCO2e</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              {language === "el" ? "Στόχος" : "Target"}:
                            </span>
                            <span className="text-green-600 font-semibold">{item.target} tCO2e</span>
                          </div>
                          <Progress 
                            value={(item.target / item.emissions) * 100} 
                            className="h-2"
                          />
                        </div>

                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            {language === "el" ? "Δράσεις" : "Actions"}:
                          </h5>
                          <ul className="space-y-1">
                            {item.actions.map((action, index) => (
                              <li key={index} className="text-xs text-gray-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ocean Tab */}
          <TabsContent value="ocean" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={oceanHealth}>
                      <PolarGrid />
                      <PolarAngleAxis 
                        dataKey="indicator" 
                        tick={{ fontSize: 10 }}
                      />
                      <PolarRadiusAxis />
                      <Radar
                        name={language === "el" ? "Αξία" : "Value"}
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "el"
                      ? "Κατάσταση Περιοχών"
                      : "Regional Status"}
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
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-blue-600">
                            {indicator.value} {indicator.unit}
                          </span>
                          <div className="flex items-center space-x-1">
                            {indicator.trend === "improving" && (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            )}
                            {indicator.trend === "declining" && (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            {indicator.trend === "stable" && (
                              <Activity className="w-4 h-4 text-gray-600" />
                            )}
                            <span className="text-sm text-gray-600">
                              {indicator.trend}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">
                              {language === "el" ? "Απειλές" : "Threats"}:
                            </h5>
                            <ul className="space-y-1">
                              {indicator.threats.map((threat, index) => (
                                <li key={index} className="text-red-600 flex items-center">
                                  <AlertTriangle className="w-3 h-3 mr-2" />
                                  {threat}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-700 mb-1">
                              {language === "el" ? "Δράσεις Προστασίας" : "Conservation Actions"}:
                            </h5>
                            <ul className="space-y-1">
                              {indicator.conservationActions.map((action, index) => (
                                <li key={index} className="text-green-600 flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-2" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            {/* Sustainability Goals */}
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
                    <Card
                      key={goal.id}
                      className={`border-l-4 ${
                        goal.status === "completed"
                          ? "border-l-green-500"
                          : goal.status === "on-track"
                          ? "border-l-blue-500"
                          : goal.status === "at-risk"
                          ? "border-l-yellow-500"
                          : "border-l-red-500"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {goal.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{goal.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div>
                                <span className="text-sm text-gray-500">
                                  {language === "el" ? "Πρόοδος" : "Progress"}:
                                </span>
                                <div className="flex items-center space-x-2">
                                  <Progress value={goal.progress} className="flex-1" />
                                  <span className="text-sm font-semibold">
                                    {goal.progress}%
                                  </span>
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-sm text-gray-500">
                                  {language === "el" ? "Τρέχουσα Τιμή" : "Current Value"}:
                                </span>
                                <div className="text-lg font-semibold text-blue-600">
                                  {goal.currentValue} {goal.unit}
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-sm text-gray-500">
                                  {language === "el" ? "Στόχος" : "Target"}:
                                </span>
                                <div className="text-lg font-semibold text-green-600">
                                  {goal.targetValue} {goal.unit}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <Badge
                              className={
                                goal.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : goal.status === "on-track"
                                  ? "bg-blue-100 text-blue-800"
                                  : goal.status === "at-risk"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {goal.status}
                            </Badge>
                            
                            <Badge
                              variant="outline"
                              className={
                                goal.priority === "high"
                                  ? "border-red-300 text-red-700"
                                  : goal.priority === "medium"
                                  ? "border-yellow-300 text-yellow-700"
                                  : "border-green-300 text-green-700"
                              }
                            >
                              {goal.priority} priority
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {language === "el" ? "Ορόσημα" : "Milestones"}:
                            </h4>
                            <div className="space-y-2">
                              {goal.milestones.map((milestone, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  {milestone.completed ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <div className="flex-1">
                                    <div className={`text-sm ${
                                      milestone.completed ? "text-green-700" : "text-gray-700"
                                    }`}>
                                      {milestone.title}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {milestone.date.toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {language === "el" ? "Δράσεις" : "Actions"}:
                            </h4>
                            <ul className="space-y-1">
                              {goal.actions.map((action, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <CircleDot className="w-3 h-3 mr-2 text-blue-500" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                  {language === "el" ? "Επένδυση" : "Investment"}:
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  €{goal.investment.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-500">
                                  {language === "el" ? "Προθεσμία" : "Deadline"}:
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {goal.deadline.toLocaleDateString()}
                                </span>
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

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sustainability Report Generation */}
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

              {/* ESG Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span>
                      {language === "el"
                        ? "Αναφορά ESG"
                        : "ESG Report"}
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

              {/* Carbon Footprint Report */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    <span>
                      {language === "el"
                        ? "Αναφορά CO₂"
                        : "Carbon Report"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === "el"
                      ? "Λεπτομερής αναφορά αποτυπώματος άνθρακα"
                      : "Detailed carbon footprint analysis"}
                  </p>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    {language === "el" ? "Αναφορά CO₂" : "Carbon Report"}
                  </Button>
                </CardContent>
              </Card>

              {/* Certification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>
                      {language === "el"
                        ? "Κατάσταση Πιστοποιήσεων"
                        : "Certification Status"}
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
                    {language === "el" ? "Προβολή Πιστοποιήσεων" : "View Certifications"}
                  </Button>
                </CardContent>
              </Card>

              {/* Compliance Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5 text-indigo-600" />
                    <span>
                      {language === "el"
                        ? "Παρακολούθηση Συμμόρφωσης"
                        : "Compliance Monitoring"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === "el"
                      ? "Real-time παρακολούθηση συμμόρφωσης"
                      : "Real-time compliance monitoring"}
                  </p>
                  <Button className="w-full" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    {language === "el" ? "Άνοιγμα Dashboard" : "Open Dashboard"}
                  </Button>
                </CardContent>
              </Card>

              {/* Data Export */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-gray-600" />
                    <span>
                      {language === "el"
                        ? "Εξαγωγή Δεδομένων"
                        : "Data Export"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {language === "el"
                      ? "Εξαγωγή raw δεδομένων για ανάλυση"
                      : "Export raw data for analysis"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      Excel
                    </Button>
                    <Button size="sm" variant="outline">
                      CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Προγραμματισμός Αναφορών"
                    : "Report Scheduling"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>{language === "el" ? "Συχνότητα" : "Frequency"}</Label>
                    <select className="w-full p-2 border rounded">
                      <option>{language === "el" ? "Μηνιαία" : "Monthly"}</option>
                      <option>{language === "el" ? "Τριμηνιαία" : "Quarterly"}</option>
                      <option>{language === "el" ? "Ετήσια" : "Annually"}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{language === "el" ? "Τύπος Αναφοράς" : "Report Type"}</Label>
                    <select className="w-full p-2 border rounded">
                      <option>{language === "el" ? "Πλήρης" : "Complete"}</option>
                      <option>{language === "el" ? "Περιβαλλοντική" : "Environmental"}</option>
                      <option>{language === "el" ? "Κοινωνική" : "Social"}</option>
                      <option>ESG</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{language === "el" ? "Μορφή" : "Format"}</Label>
                    <select className="w-full p-2 border rounded">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>PowerPoint</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{language === "el" ? "Αποστολή" : "Delivery"}</Label>
                    <select className="w-full p-2 border rounded">
                      <option>Email</option>
                      <option>{language === "el" ? "Λήψη" : "Download"}</option>
                      <option>SharePoint</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {language === "el" ? "Προγραμματισμός" : "Schedule Report"}
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    {language === "el" ? "Ρυθμίσεις" : "Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SustainabilityTrackingSystem;