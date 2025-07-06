import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Download,
  Upload,
  Mail,
  Printer,
  Share2,
  Calendar as CalendarIcon,
  Clock,
  Filter,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Users,
  Package,
  Truck,
  Factory,
  Globe,
  Leaf,
  Shield,
  Award,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Eye,
  Edit,
  Copy,
  Archive,
  RefreshCw,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Zap,
  Star,
  Heart,
  Bookmark,
  Tag,
  MapPin,
  Navigation,
  Anchor,
  Fish,
  Waves,
  Building,
  Home,
  Car,
  Plane,
  Ship,
  Scale,
  Timer,
  Bell,
  Radio,
  Wifi,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserPlus,
  UserMinus,
  Team,
  Crown,
  Gift,
  Coins,
  CreditCard,
  Receipt,
  Calculator,
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  FileBarChart,
  FileLineChart,
  FilePieChart,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileClock,
  FileCheck,
  FileX,
  Plus,
  Minus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Link,
  Unlink,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Crop,
  Scissors,
  PaintBucket,
  Palette,
  Brush,
  Eraser,
  Highlighter,
  Pen,
  PenTool,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Terminal,
  Hash,
  AtSign,
  Percent,
  Recycle,
} from "lucide-react";
import { format } from "date-fns";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category:
    | "financial"
    | "operational"
    | "sustainability"
    | "compliance"
    | "custom";
  icon: React.ReactNode;
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";
  format: "pdf" | "excel" | "powerpoint" | "csv" | "json" | "xml";
  estimatedTime: string;
  complexity: "simple" | "intermediate" | "advanced";
  features: string[];
  parameters: {
    dateRange: boolean;
    filters: string[];
    groupBy: string[];
    metrics: string[];
  };
}

interface ScheduledReport {
  id: string;
  templateId: string;
  name: string;
  schedule: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
    time: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
    timezone: string;
  };
  recipients: string[];
  lastRun: Date;
  nextRun: Date;
  status: "active" | "paused" | "error";
  deliveryMethod: "email" | "download" | "sharepoint" | "sftp" | "api";
}

interface ReportMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
  benchmark?: number;
  target?: number;
  status: "excellent" | "good" | "warning" | "critical";
}

interface ComprehensiveReportingSystemProps {
  className?: string;
}

const ComprehensiveReportingSystem: React.FC<
  ComprehensiveReportingSystemProps
> = ({ className = "" }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] =
    useState<ReportTemplate | null>(null);
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(
    [],
  );
  const [reportMetrics, setReportMetrics] = useState<ReportMetric[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Comprehensive report templates with 25+ features
  const reportTemplates: ReportTemplate[] = [
    // Financial Reports (8 templates)
    {
      id: "financial-summary",
      name:
        language === "el" ? "Χρηματοοικονομική Σύνοψη" : "Financial Summary",
      description:
        language === "el"
          ? "Συνολική χρηματοοικονομική εικόνα της εταιρείας"
          : "Overall financial picture of the company",
      category: "financial",
      icon: <DollarSign className="w-5 h-5" />,
      frequency: "monthly",
      format: "pdf",
      estimatedTime: "5 min",
      complexity: "simple",
      features: [
        language === "el" ? "Κέρδη & Ζημίες" : "Profit & Loss",
        language === "el" ? "Ταμειακές Ροές" : "Cash Flow",
        language === "el" ? "Ισολογισμός" : "Balance Sheet",
        language === "el" ? "Δείκτες Κερδοφορίας" : "Profitability Ratios",
      ],
      parameters: {
        dateRange: true,
        filters: ["department", "product", "region"],
        groupBy: ["month", "quarter", "year"],
        metrics: ["revenue", "costs", "profit", "margin"],
      },
    },
    {
      id: "cost-analysis",
      name: language === "el" ? "Ανάλυση Κόστους" : "Cost Analysis",
      description:
        language === "el"
          ? "Λεπτομερής ανάλυση κόστους παραγωγής"
          : "Detailed production cost analysis",
      category: "financial",
      icon: <Calculator className="w-5 h-5" />,
      frequency: "weekly",
      format: "excel",
      estimatedTime: "8 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Κόστος ανά Προϊόν" : "Cost per Product",
        language === "el" ? "Κόστος ανά Κατηγορία" : "Cost per Category",
        language === "el" ? "Τάσεις Κόστους" : "Cost Trends",
        language === "el" ? "ABC Analysis" : "ABC Analysis",
        language === "el" ? "Variance Analysis" : "Variance Analysis",
      ],
      parameters: {
        dateRange: true,
        filters: ["product", "supplier", "cost_center"],
        groupBy: ["product", "category", "supplier"],
        metrics: [
          "direct_cost",
          "indirect_cost",
          "total_cost",
          "cost_per_unit",
        ],
      },
    },
    {
      id: "profitability-analysis",
      name:
        language === "el" ? "Ανάλυση Κερδοφορίας" : "Profitability Analysis",
      description:
        language === "el"
          ? "Ανάλυση κερδοφορίας ανά προϊόν και πελάτη"
          : "Profitability analysis per product and customer",
      category: "financial",
      icon: <TrendingUp className="w-5 h-5" />,
      frequency: "monthly",
      format: "pdf",
      estimatedTime: "12 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Gross Margin Analysis" : "Gross Margin Analysis",
        language === "el" ? "Customer Profitability" : "Customer Profitability",
        language === "el" ? "Product Profitability" : "Product Profitability",
        language === "el" ? "Contribution Margin" : "Contribution Margin",
        language === "el" ? "Break-even Analysis" : "Break-even Analysis",
      ],
      parameters: {
        dateRange: true,
        filters: ["customer", "product", "region", "sales_channel"],
        groupBy: ["customer", "product", "region"],
        metrics: ["revenue", "gross_profit", "net_profit", "margin_percentage"],
      },
    },
    {
      id: "budget-variance",
      name: language === "el" ? "Απόκλιση Προϋπολογισμού" : "Budget Variance",
      description:
        language === "el"
          ? "Σύγκριση πραγματικών με προϋπολογισμό"
          : "Comparison of actual vs budget",
      category: "financial",
      icon: <Target className="w-5 h-5" />,
      frequency: "monthly",
      format: "excel",
      estimatedTime: "10 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Variance by Department" : "Variance by Department",
        language === "el" ? "Variance by Category" : "Variance by Category",
        language === "el" ? "YTD Variance" : "YTD Variance",
        language === "el" ? "Forecast vs Actual" : "Forecast vs Actual",
      ],
      parameters: {
        dateRange: true,
        filters: ["department", "category", "account"],
        groupBy: ["department", "category", "month"],
        metrics: ["budget", "actual", "variance", "variance_percentage"],
      },
    },
    {
      id: "cash-flow",
      name: language === "el" ? "Ταμειακές Ροές" : "Cash Flow Statement",
      description:
        language === "el"
          ? "Ανάλυση εισροών και εκροών"
          : "Analysis of cash inflows and outflows",
      category: "financial",
      icon: <CreditCard className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "7 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Operating Cash Flow" : "Operating Cash Flow",
        language === "el" ? "Investing Cash Flow" : "Investing Cash Flow",
        language === "el" ? "Financing Cash Flow" : "Financing Cash Flow",
        language === "el" ? "Free Cash Flow" : "Free Cash Flow",
      ],
      parameters: {
        dateRange: true,
        filters: ["cash_category", "account"],
        groupBy: ["week", "month", "category"],
        metrics: ["cash_in", "cash_out", "net_cash_flow", "cumulative_cash"],
      },
    },
    {
      id: "financial-ratios",
      name:
        language === "el" ? "Χρηματοοικονομικοί Δείκτες" : "Financial Ratios",
      description:
        language === "el"
          ? "Βασικοί χρηματοοικονομικοί δείκτες"
          : "Key financial ratios analysis",
      category: "financial",
      icon: <Percent className="w-5 h-5" />,
      frequency: "quarterly",
      format: "pdf",
      estimatedTime: "15 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Liquidity Ratios" : "Liquidity Ratios",
        language === "el" ? "Profitability Ratios" : "Profitability Ratios",
        language === "el" ? "Leverage Ratios" : "Leverage Ratios",
        language === "el" ? "Efficiency Ratios" : "Efficiency Ratios",
        language === "el" ? "Market Ratios" : "Market Ratios",
      ],
      parameters: {
        dateRange: true,
        filters: ["ratio_category"],
        groupBy: ["quarter", "year"],
        metrics: ["current_ratio", "quick_ratio", "debt_ratio", "roe", "roa"],
      },
    },
    {
      id: "revenue-analysis",
      name: language === "el" ? "Ανάλυση Εσόδων" : "Revenue Analysis",
      description:
        language === "el"
          ? "Λεπτομερής ανάλυση εσόδων"
          : "Detailed revenue breakdown analysis",
      category: "financial",
      icon: <BarChart3 className="w-5 h-5" />,
      frequency: "monthly",
      format: "excel",
      estimatedTime: "9 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Revenue by Product" : "Revenue by Product",
        language === "el" ? "Revenue by Customer" : "Revenue by Customer",
        language === "el" ? "Revenue by Region" : "Revenue by Region",
        language === "el" ? "Recurring Revenue" : "Recurring Revenue",
        language === "el" ? "Revenue Growth" : "Revenue Growth",
      ],
      parameters: {
        dateRange: true,
        filters: ["product", "customer", "region", "channel"],
        groupBy: ["product", "customer", "region", "month"],
        metrics: [
          "gross_revenue",
          "net_revenue",
          "recurring_revenue",
          "growth_rate",
        ],
      },
    },
    {
      id: "expense-tracking",
      name: language === "el" ? "Παρακολούθηση Εξόδων" : "Expense Tracking",
      description:
        language === "el"
          ? "Παρακολούθηση και κατηγοριοποίηση εξόδων"
          : "Track and categorize all expenses",
      category: "financial",
      icon: <Receipt className="w-5 h-5" />,
      frequency: "weekly",
      format: "excel",
      estimatedTime: "6 min",
      complexity: "simple",
      features: [
        language === "el" ? "Expense by Category" : "Expense by Category",
        language === "el" ? "Expense by Department" : "Expense by Department",
        language === "el" ? "Expense Trends" : "Expense Trends",
        language === "el" ? "Top Expenses" : "Top Expenses",
      ],
      parameters: {
        dateRange: true,
        filters: ["category", "department", "vendor"],
        groupBy: ["category", "department", "week"],
        metrics: ["total_expense", "average_expense", "expense_growth"],
      },
    },

    // Operational Reports (6 templates)
    {
      id: "production-summary",
      name: language === "el" ? "Σύνοψη Παραγωγής" : "Production Summary",
      description:
        language === "el"
          ? "Επισκόπηση παραγωγικής διαδικασίας"
          : "Overview of production processes",
      category: "operational",
      icon: <Factory className="w-5 h-5" />,
      frequency: "daily",
      format: "pdf",
      estimatedTime: "4 min",
      complexity: "simple",
      features: [
        language === "el"
          ? "Daily Production Volume"
          : "Daily Production Volume",
        language === "el" ? "Efficiency Metrics" : "Efficiency Metrics",
        language === "el" ? "Quality Indicators" : "Quality Indicators",
        language === "el" ? "Downtime Analysis" : "Downtime Analysis",
      ],
      parameters: {
        dateRange: true,
        filters: ["production_line", "shift", "product_type"],
        groupBy: ["day", "shift", "product"],
        metrics: ["volume_produced", "efficiency", "quality_rate", "downtime"],
      },
    },
    {
      id: "inventory-status",
      name: language === "el" ? "Κατάσταση Αποθέματος" : "Inventory Status",
      description:
        language === "el"
          ? "Τρέχουσα κατάσταση αποθεμάτων"
          : "Current inventory status and levels",
      category: "operational",
      icon: <Package className="w-5 h-5" />,
      frequency: "daily",
      format: "excel",
      estimatedTime: "3 min",
      complexity: "simple",
      features: [
        language === "el" ? "Stock Levels" : "Stock Levels",
        language === "el" ? "Reorder Points" : "Reorder Points",
        language === "el" ? "Stock Turnover" : "Stock Turnover",
        language === "el" ? "Aging Analysis" : "Aging Analysis",
      ],
      parameters: {
        dateRange: false,
        filters: ["warehouse", "category", "supplier"],
        groupBy: ["category", "warehouse", "product"],
        metrics: [
          "current_stock",
          "reorder_level",
          "turnover_rate",
          "days_on_hand",
        ],
      },
    },
    {
      id: "supply-chain",
      name: language === "el" ? "Εφοδιαστική Α��υσίδα" : "Supply Chain Report",
      description:
        language === "el"
          ? "Ανάλυση εφοδιαστικής αλυσίδας"
          : "Supply chain performance analysis",
      category: "operational",
      icon: <Truck className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "11 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Supplier Performance" : "Supplier Performance",
        language === "el" ? "Delivery Times" : "Delivery Times",
        language === "el" ? "Transportation Costs" : "Transportation Costs",
        language === "el" ? "Route Optimization" : "Route Optimization",
      ],
      parameters: {
        dateRange: true,
        filters: ["supplier", "route", "transport_type"],
        groupBy: ["supplier", "route", "week"],
        metrics: [
          "delivery_time",
          "cost_per_km",
          "on_time_delivery",
          "quality_score",
        ],
      },
    },
    {
      id: "quality-control",
      name: language === "el" ? "Έλεγχος Ποιότητας" : "Quality Control",
      description:
        language === "el"
          ? "Μετρήσεις και δείκτες ποιότητας"
          : "Quality metrics and indicators",
      category: "operational",
      icon: <CheckCircle className="w-5 h-5" />,
      frequency: "daily",
      format: "pdf",
      estimatedTime: "7 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Quality Scores" : "Quality Scores",
        language === "el" ? "Defect Rates" : "Defect Rates",
        language === "el" ? "Customer Complaints" : "Customer Complaints",
        language === "el" ? "Corrective Actions" : "Corrective Actions",
      ],
      parameters: {
        dateRange: true,
        filters: ["product", "production_line", "inspector"],
        groupBy: ["product", "day", "shift"],
        metrics: [
          "quality_score",
          "defect_rate",
          "first_pass_yield",
          "customer_satisfaction",
        ],
      },
    },
    {
      id: "maintenance-schedule",
      name: language === "el" ? "Πρόγραμμα Συντήρησης" : "Maintenance Schedule",
      description:
        language === "el"
          ? "Προγραμματισμένη και έκτακτη συντήρηση"
          : "Scheduled and emergency maintenance",
      category: "operational",
      icon: <Settings className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "8 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Preventive Maintenance" : "Preventive Maintenance",
        language === "el" ? "Emergency Repairs" : "Emergency Repairs",
        language === "el" ? "Equipment Uptime" : "Equipment Uptime",
        language === "el" ? "Maintenance Costs" : "Maintenance Costs",
      ],
      parameters: {
        dateRange: true,
        filters: ["equipment", "maintenance_type", "technician"],
        groupBy: ["equipment", "type", "week"],
        metrics: ["uptime", "mttr", "mtbf", "maintenance_cost"],
      },
    },
    {
      id: "workforce-productivity",
      name:
        language === "el"
          ? "Παραγωγικότητα Εργατικού Δυναμικού"
          : "Workforce Productivity",
      description:
        language === "el"
          ? "Ανάλυση παραγωγικότητας εργαζομένων"
          : "Employee productivity analysis",
      category: "operational",
      icon: <Users className="w-5 h-5" />,
      frequency: "weekly",
      format: "excel",
      estimatedTime: "9 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Productivity Metrics" : "Productivity Metrics",
        language === "el" ? "Overtime Analysis" : "Overtime Analysis",
        language === "el" ? "Training Hours" : "Training Hours",
        language === "el" ? "Performance Ratings" : "Performance Ratings",
      ],
      parameters: {
        dateRange: true,
        filters: ["department", "shift", "skill_level"],
        groupBy: ["department", "week", "employee"],
        metrics: [
          "productivity_rate",
          "overtime_hours",
          "training_hours",
          "performance_score",
        ],
      },
    },

    // Sustainability Reports (5 templates)
    {
      id: "environmental-impact",
      name:
        language === "el" ? "Περιβαλλοντική Επίδραση" : "Environmental Impact",
      description:
        language === "el"
          ? "Ανάλυση περιβαλλοντικού αποτυπώματος"
          : "Environmental footprint analysis",
      category: "sustainability",
      icon: <Leaf className="w-5 h-5" />,
      frequency: "monthly",
      format: "pdf",
      estimatedTime: "13 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Carbon Footprint" : "Carbon Footprint",
        language === "el" ? "Water Usage" : "Water Usage",
        language === "el" ? "Waste Management" : "Waste Management",
        language === "el" ? "Energy Consumption" : "Energy Consumption",
        language === "el" ? "Renewable Energy" : "Renewable Energy",
      ],
      parameters: {
        dateRange: true,
        filters: ["facility", "emission_scope", "energy_type"],
        groupBy: ["month", "facility", "scope"],
        metrics: [
          "co2_emissions",
          "water_usage",
          "waste_generated",
          "energy_consumed",
        ],
      },
    },
    {
      id: "sustainability-kpis",
      name: language === "el" ? "KPIs Βιωσιμότητας" : "Sustainability KPIs",
      description:
        language === "el"
          ? "Βασικοί δείκτες βιωσιμότητας"
          : "Key sustainability performance indicators",
      category: "sustainability",
      icon: <Target className="w-5 h-5" />,
      frequency: "quarterly",
      format: "pdf",
      estimatedTime: "16 min",
      complexity: "advanced",
      features: [
        language === "el" ? "ESG Metrics" : "ESG Metrics",
        language === "el" ? "Sustainability Goals" : "Sustainability Goals",
        language === "el" ? "Progress Tracking" : "Progress Tracking",
        language === "el" ? "Benchmark Comparison" : "Benchmark Comparison",
      ],
      parameters: {
        dateRange: true,
        filters: ["esg_category", "goal_type"],
        groupBy: ["quarter", "category", "goal"],
        metrics: ["goal_progress", "target_achievement", "benchmark_score"],
      },
    },
    {
      id: "carbon-emissions",
      name: language === "el" ? "Εκπομπές Άνθρακα" : "Carbon Emissions",
      description:
        language === "el"
          ? "Λεπτομερής ανάλυση εκπομπών CO2"
          : "Detailed CO2 emissions analysis",
      category: "sustainability",
      icon: <Globe className="w-5 h-5" />,
      frequency: "monthly",
      format: "excel",
      estimatedTime: "11 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Scope 1 Emissions" : "Scope 1 Emissions",
        language === "el" ? "Scope 2 Emissions" : "Scope 2 Emissions",
        language === "el" ? "Scope 3 Emissions" : "Scope 3 Emissions",
        language === "el" ? "Reduction Targets" : "Reduction Targets",
      ],
      parameters: {
        dateRange: true,
        filters: ["emission_scope", "source", "facility"],
        groupBy: ["scope", "source", "month"],
        metrics: [
          "total_emissions",
          "emissions_per_unit",
          "reduction_percentage",
        ],
      },
    },
    {
      id: "waste-management",
      name: language === "el" ? "Διαχείριση Αποβλήτων" : "Waste Management",
      description:
        language === "el"
          ? "Παρακολούθηση και ανάλυση αποβλήτων"
          : "Waste tracking and analysis",
      category: "sustainability",
      icon: <Recycle className="w-5 h-5" />,
      frequency: "weekly",
      format: "excel",
      estimatedTime: "6 min",
      complexity: "simple",
      features: [
        language === "el" ? "Waste by Type" : "Waste by Type",
        language === "el" ? "Recycling Rates" : "Recycling Rates",
        language === "el" ? "Disposal Methods" : "Disposal Methods",
        language === "el" ? "Cost Analysis" : "Cost Analysis",
      ],
      parameters: {
        dateRange: true,
        filters: ["waste_type", "disposal_method", "facility"],
        groupBy: ["type", "method", "week"],
        metrics: [
          "total_waste",
          "recycled_waste",
          "disposal_cost",
          "recycling_rate",
        ],
      },
    },
    {
      id: "energy-efficiency",
      name: language === "el" ? "Ενεργειακή Απόδοση" : "Energy Efficiency",
      description:
        language === "el"
          ? "Ανάλυση ενεργειακής κατανάλωσης"
          : "Energy consumption analysis",
      category: "sustainability",
      icon: <Zap className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "8 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Energy Consumption" : "Energy Consumption",
        language === "el" ? "Peak Demand" : "Peak Demand",
        language === "el" ? "Energy Efficiency" : "Energy Efficiency",
        language === "el" ? "Cost Savings" : "Cost Savings",
      ],
      parameters: {
        dateRange: true,
        filters: ["energy_type", "facility", "equipment"],
        groupBy: ["type", "facility", "week"],
        metrics: [
          "total_consumption",
          "peak_demand",
          "efficiency_ratio",
          "cost_per_kwh",
        ],
      },
    },

    // Compliance Reports (3 templates)
    {
      id: "regulatory-compliance",
      name:
        language === "el" ? "Κανονιστική Συμμόρφωση" : "Regulatory Compliance",
      description:
        language === "el"
          ? "Παρακολούθηση συμμόρφωσης με κανονισμούς"
          : "Track compliance with regulations",
      category: "compliance",
      icon: <Shield className="w-5 h-5" />,
      frequency: "monthly",
      format: "pdf",
      estimatedTime: "14 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Compliance Status" : "Compliance Status",
        language === "el" ? "Audit Results" : "Audit Results",
        language === "el" ? "Corrective Actions" : "Corrective Actions",
        language === "el" ? "Risk Assessment" : "Risk Assessment",
      ],
      parameters: {
        dateRange: true,
        filters: ["regulation", "department", "risk_level"],
        groupBy: ["regulation", "department", "month"],
        metrics: [
          "compliance_score",
          "audit_findings",
          "action_items",
          "risk_score",
        ],
      },
    },
    {
      id: "certification-status",
      name:
        language === "el" ? "Κατάσταση Πιστοποιήσεων" : "Certification Status",
      description:
        language === "el"
          ? "Παρακολούθηση πι��τοποιήσεων και ανανεώσεων"
          : "Track certifications and renewals",
      category: "compliance",
      icon: <Award className="w-5 h-5" />,
      frequency: "quarterly",
      format: "pdf",
      estimatedTime: "10 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Active Certifications" : "Active Certifications",
        language === "el" ? "Expiration Dates" : "Expiration Dates",
        language === "el" ? "Renewal Schedule" : "Renewal Schedule",
        language === "el" ? "Audit Schedule" : "Audit Schedule",
      ],
      parameters: {
        dateRange: false,
        filters: ["certification_type", "issuing_body"],
        groupBy: ["type", "body"],
        metrics: ["active_certs", "expiring_soon", "renewal_cost"],
      },
    },
    {
      id: "safety-incidents",
      name: language === "el" ? "Συμβάντα Ασφαλείας" : "Safety Incidents",
      description:
        language === "el"
          ? "Παρακολούθηση συμβάντων ασφαλείας"
          : "Track safety incidents and measures",
      category: "compliance",
      icon: <AlertTriangle className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "7 min",
      complexity: "intermediate",
      features: [
        language === "el" ? "Incident Reports" : "Incident Reports",
        language === "el" ? "Safety Metrics" : "Safety Metrics",
        language === "el" ? "Training Records" : "Training Records",
        language === "el" ? "Prevention Measures" : "Prevention Measures",
      ],
      parameters: {
        dateRange: true,
        filters: ["incident_type", "severity", "department"],
        groupBy: ["type", "department", "week"],
        metrics: [
          "total_incidents",
          "severity_score",
          "lost_time",
          "near_misses",
        ],
      },
    },

    // Custom Reports (3 templates)
    {
      id: "executive-dashboard",
      name: language === "el" ? "Executive Dashboard" : "Executive Dashboard",
      description:
        language === "el"
          ? "Σύνοψη για ανώτερη διοίκηση"
          : "High-level summary for executives",
      category: "custom",
      icon: <Crown className="w-5 h-5" />,
      frequency: "weekly",
      format: "pdf",
      estimatedTime: "12 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Key Metrics Overview" : "Key Metrics Overview",
        language === "el" ? "Performance Summary" : "Performance Summary",
        language === "el" ? "Strategic Initiatives" : "Strategic Initiatives",
        language === "el" ? "Risk Indicators" : "Risk Indicators",
      ],
      parameters: {
        dateRange: true,
        filters: ["business_unit", "kpi_category"],
        groupBy: ["week", "unit"],
        metrics: [
          "revenue",
          "profit",
          "customer_satisfaction",
          "employee_engagement",
        ],
      },
    },
    {
      id: "market-analysis",
      name: language === "el" ? "Ανάλυση Αγοράς" : "Market Analysis",
      description:
        language === "el"
          ? "Ανάλυση τάσεων και ευκαιριών αγοράς"
          : "Market trends and opportunities analysis",
      category: "custom",
      icon: <TrendingUp className="w-5 h-5" />,
      frequency: "monthly",
      format: "powerpoint",
      estimatedTime: "18 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Market Trends" : "Market Trends",
        language === "el" ? "Competitive Analysis" : "Competitive Analysis",
        language === "el" ? "Price Analysis" : "Price Analysis",
        language === "el" ? "Customer Insights" : "Customer Insights",
      ],
      parameters: {
        dateRange: true,
        filters: ["market_segment", "competitor", "product_category"],
        groupBy: ["segment", "month"],
        metrics: [
          "market_share",
          "price_index",
          "customer_sentiment",
          "growth_rate",
        ],
      },
    },
    {
      id: "performance-scorecard",
      name: language === "el" ? "Κάρτα Απόδοσης" : "Performance Scorecard",
      description:
        language === "el"
          ? "Balanced scorecard με όλους τους δείκτες"
          : "Balanced scorecard with all indicators",
      category: "custom",
      icon: <Star className="w-5 h-5" />,
      frequency: "monthly",
      format: "pdf",
      estimatedTime: "15 min",
      complexity: "advanced",
      features: [
        language === "el" ? "Financial Perspective" : "Financial Perspective",
        language === "el" ? "Customer Perspective" : "Customer Perspective",
        language === "el" ? "Internal Processes" : "Internal Processes",
        language === "el" ? "Learning & Growth" : "Learning & Growth",
      ],
      parameters: {
        dateRange: true,
        filters: ["perspective", "strategic_objective"],
        groupBy: ["perspective", "month"],
        metrics: [
          "target_achievement",
          "trend_direction",
          "benchmark_comparison",
        ],
      },
    },
  ];

  // Initialize scheduled reports
  useEffect(() => {
    const sampleScheduledReports: ScheduledReport[] = [
      {
        id: "sr-001",
        templateId: "financial-summary",
        name:
          language === "el"
            ? "Μηνιαία Χρηματοοικονομική Αναφορά"
            : "Monthly Financial Report",
        schedule: {
          frequency: "monthly",
          time: "08:00",
          dayOfMonth: 1,
          timezone: "Europe/Athens",
        },
        recipients: ["cfo@company.com", "finance@company.com"],
        lastRun: new Date("2024-11-01"),
        nextRun: new Date("2024-12-01"),
        status: "active",
        deliveryMethod: "email",
      },
      {
        id: "sr-002",
        templateId: "production-summary",
        name:
          language === "el"
            ? "Ημερήσια Αναφορά Παραγωγής"
            : "Daily Production Report",
        schedule: {
          frequency: "daily",
          time: "18:00",
          timezone: "Europe/Athens",
        },
        recipients: ["production@company.com"],
        lastRun: new Date("2024-11-20"),
        nextRun: new Date("2024-11-21"),
        status: "active",
        deliveryMethod: "email",
      },
    ];

    setScheduledReports(sampleScheduledReports);

    // Initialize sample metrics
    const sampleMetrics: ReportMetric[] = [
      {
        id: "metric-001",
        name: language === "el" ? "Συνολικά Έσοδα" : "Total Revenue",
        value: 2487500,
        unit: "€",
        trend: "up",
        change: 12.5,
        benchmark: 2200000,
        target: 2500000,
        status: "good",
      },
      {
        id: "metric-002",
        name: language === "el" ? "Κόστος Παραγωγής" : "Production Cost",
        value: 1856750,
        unit: "€",
        trend: "up",
        change: 8.3,
        benchmark: 1720000,
        target: 1800000,
        status: "warning",
      },
      {
        id: "metric-003",
        name: language === "el" ? "Κερδοφορία" : "Profit Margin",
        value: 25.4,
        unit: "%",
        trend: "up",
        change: 2.1,
        benchmark: 22.0,
        target: 25.0,
        status: "excellent",
      },
    ];

    setReportMetrics(sampleMetrics);
  }, [language]);

  const generateReport = async (template: ReportTemplate) => {
    setIsGenerating(true);
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would implement actual report generation logic
      console.log(`Generating report: ${template.name}`);

      // Show success message
      alert(
        language === "el"
          ? `Η αναφορά "${template.name}" δημιουργήθηκε επιτυχώς!`
          : `Report "${template.name}" generated successfully!`,
      );
    } catch (error) {
      console.error("Report generation failed:", error);
      alert(
        language === "el"
          ? "Σφάλμα κατά τη δημιουργία της αναφοράς"
          : "Error generating report",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case "operational":
        return <Factory className="w-5 h-5 text-blue-600" />;
      case "sustainability":
        return <Leaf className="w-5 h-5 text-green-600" />;
      case "compliance":
        return <Shield className="w-5 h-5 text-purple-600" />;
      case "custom":
        return <Star className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            <span>
              {language === "el"
                ? "Κέντρο Αναφορών & Analytics"
                : "Reports & Analytics Center"}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            {language === "el"
              ? "Δημιουργία, προγρ��μματισμός και διαχείριση αναφορών"
              : "Create, schedule and manage comprehensive reports"}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
            {reportTemplates.length}{" "}
            {language === "el" ? "Templates" : "Templates"}
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {language === "el" ? "Νέα Αναφορά" : "New Report"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {metric.name}
                </h3>
                {getTrendIcon(metric.trend)}
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value.toLocaleString()} {metric.unit}
                </div>

                {metric.change !== 0 && (
                  <div className="flex items-center text-sm">
                    <span
                      className={
                        metric.change > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </span>
                    <span className="text-gray-500 ml-1">
                      {language === "el"
                        ? "vs προηγούμενη περίοδο"
                        : "vs previous period"}
                    </span>
                  </div>
                )}

                {metric.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {language === "el" ? "Στόχος" : "Target"}:{" "}
                        {metric.target.toLocaleString()} {metric.unit}
                      </span>
                      <Badge
                        className={`text-xs ${getStatusColor(metric.status)}`}
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <Progress
                      value={Math.min(
                        100,
                        (metric.value / metric.target) * 100,
                      )}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">
            {language === "el" ? "Templates" : "Templates"}
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            {language === "el" ? "Προγραμματισμένα" : "Scheduled"}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === "el" ? "Analytics" : "Analytics"}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {language === "el" ? "Ρυθμίσεις" : "Settings"}
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTemplate(null)}
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>{language === "el" ? "Όλα" : "All"}</span>
              <Badge variant="secondary">{reportTemplates.length}</Badge>
            </Button>

            {[
              "financial",
              "operational",
              "sustainability",
              "compliance",
              "custom",
            ].map((category) => {
              const count = reportTemplates.filter(
                (t) => t.category === category,
              ).length;
              return (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  {getCategoryIcon(category)}
                  <span className="capitalize">{category}</span>
                  <Badge variant="secondary">{count}</Badge>
                </Button>
              );
            })}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {template.icon}
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                    <Badge className={getComplexityColor(template.complexity)}>
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Template Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 text-gray-500" />
                        <span className="capitalize">{template.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="uppercase">{template.format}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(template.category)}
                        <span className="capitalize">{template.category}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        {language === "el" ? "Χαρακτηριστικά" : "Features"}:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => generateReport(template)}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            {language === "el"
                              ? "Δημιουργία..."
                              : "Generating..."}
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            {language === "el" ? "Δημιουργία" : "Generate"}
                          </>
                        )}
                      </Button>

                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>

                      <Button size="sm" variant="outline">
                        <CalendarIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Scheduled Reports Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {language === "el"
                ? "Προγραμματισμένες Αναφορές"
                : "Scheduled Reports"}
            </h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {language === "el" ? "Νέος Προγραμματισμός" : "New Schedule"}
            </Button>
          </div>

          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{report.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <RefreshCw className="w-4 h-4" />
                          <span className="capitalize">
                            {report.schedule.frequency}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{report.schedule.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span>{report.recipients.length} recipients</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === "el" ? "Τελευταία εκτέλεση" : "Last run"}:{" "}
                        {report.lastRun.toLocaleDateString()}
                        {" | "}
                        {language === "el"
                          ? "Επόμενη εκτέλεση"
                          : "Next run"}: {report.nextRun.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          report.status === "active"
                            ? "bg-green-100 text-green-800"
                            : report.status === "paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {report.status}
                      </Badge>

                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Usage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Χρήση Αναφορών" : "Report Usage"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Financial", usage: 45, generated: 230 },
                      { name: "Operational", usage: 35, generated: 180 },
                      { name: "Sustainability", usage: 20, generated: 95 },
                      { name: "Compliance", usage: 15, generated: 67 },
                      { name: "Custom", usage: 25, generated: 120 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="generated"
                      fill="#3b82f6"
                      name={language === "el" ? "Αναφορές" : "Reports"}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el"
                    ? "Μετρήσεις Απόδοσης"
                    : "Performance Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === "el"
                        ? "Μέσος χρόνος δημιουργίας"
                        : "Average generation time"}
                    </span>
                    <span className="font-semibold">2.3 min</span>
                  </div>
                  <Progress value={76} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === "el"
                        ? "Επιτυχία παράδοσης"
                        : "Delivery success rate"}
                    </span>
                    <span className="font-semibold">98.5%</span>
                  </div>
                  <Progress value={98.5} />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ικανοποίηση χρηστών"
                        : "User satisfaction"}
                    </span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                  <Progress value={96} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el" ? "Στατιστικά Χρήσης" : "Usage Statistics"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">
                    {language === "el"
                      ? "Αναφορές αυτόν το μήνα"
                      : "Reports this month"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Αυτοματοποιημένες" : "Automated"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">156</div>
                  <div className="text-sm text-gray-600">
                    {language === "el" ? "Ενεργοί χρήστες" : "Active users"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4.2</div>
                  <div className="text-sm text-gray-600">
                    {language === "el"
                      ? "Μέσες αναφορές/χρήστη"
                      : "Avg reports/user"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Γενικές Ρυθμίσεις" : "General Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>
                    {language === "el"
                      ? "Προεπιλεγμένη μορφή"
                      : "Default format"}
                  </Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{language === "el" ? "Ζώνη ώρας" : "Timezone"}</Label>
                  <Select defaultValue="europe/athens">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/athens">
                        Europe/Athens
                      </SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="america/new_york">
                        America/New_York
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>
                    {language === "el"
                      ? "Αυτόματη αποθήκευση"
                      : "Auto-save reports"}
                  </Label>
                  <Button variant="outline" size="sm">
                    {language === "el" ? "Ενεργό" : "Enabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "el" ? "Ειδοποιήσεις" : "Notifications"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {language === "el"
                        ? "Email ειδο��οιήσεις"
                        : "Email notifications"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el"
                        ? "Λήψη email όταν οι αναφορές είναι έτοιμες"
                        : "Receive emails when reports are ready"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "el" ? "Ενεργό" : "On"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {language === "el"
                        ? "Ειδοποιήσεις σφαλμάτων"
                        : "Error notifications"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el"
                        ? "Ειδοποίηση όταν αποτυγχάνει η δημιουργία"
                        : "Notify when report generation fails"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "el" ? "Ενεργό" : "On"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {language === "el"
                        ? "Εβδομαδιαία σύνοψη"
                        : "Weekly summary"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {language === "el"
                        ? "Εβδομαδιαία σύνοψη όλων των αναφορών"
                        : "Weekly summary of all reports"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "el" ? "Ανενεργό" : "Off"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el"
                  ? "Προηγμένες Ρυθμίσεις"
                  : "Advanced Settings"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>
                    {language === "el"
                      ? "Μέγεθος cache (MB)"
                      : "Cache size (MB)"}
                  </Label>
                  <Input type="number" defaultValue="512" />
                </div>

                <div>
                  <Label>
                    {language === "el"
                      ? "Ταυτόχρονες αναφορές"
                      : "Concurrent reports"}
                  </Label>
                  <Input type="number" defaultValue="5" />
                </div>

                <div>
                  <Label>
                    {language === "el"
                      ? "Retention period (days)"
                      : "Retention period (days)"}
                  </Label>
                  <Input type="number" defaultValue="90" />
                </div>

                <div>
                  <Label>
                    {language === "el"
                      ? "Max file size (MB)"
                      : "Max file size (MB)"}
                  </Label>
                  <Input type="number" defaultValue="50" />
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Button>
                  {language === "el" ? "Αποθήκευση" : "Save Changes"}
                </Button>
                <Button variant="outline">
                  {language === "el" ? "Επαναφορά" : "Reset"}
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {language === "el" ? "Καθαρισμός Cache" : "Clear Cache"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveReportingSystem;
