import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  Star,
  Clock,
  TrendingUp,
  Zap,
  Crown,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Settings,
  Ship,
  Globe,
  FileText,
  Shield,
  Leaf,
  Award,
  Calculator,
  Fish,
  Truck,
  Factory,
  Target,
  Activity,
  PieChart,
  TrendingDown,
  LineChart,
  Briefcase,
  AlertTriangle,
  Home,
  ChevronRight,
  Plus,
  Heart,
  Bookmark,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  isPremium: boolean;
  isNew: boolean;
  tags: string[];
  complexity: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  popularity: number;
}

interface NavigationSystemProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

const NavigationSystem: React.FC<NavigationSystemProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  // Comprehensive navigation items with all features
  const navigationItems: NavigationItem[] = [
    // Main Dashboard & Overview
    {
      id: "comprehensive-dashboard",
      title: language === "el" ? "Κέντρο Ελέγχου" : "Control Center",
      description:
        language === "el"
          ? "Κεντρικό dashboard με όλες τις μετρήσεις"
          : "Main dashboard with all metrics",
      icon: Home,
      category: "dashboard",
      isPremium: false,
      isNew: true,
      tags: ["dashboard", "overview", "kpi", "metrics"],
      complexity: "beginner",
      estimatedTime: "2 min",
      popularity: 95,
    },
    {
      id: "executive-dashboard",
      title: language === "el" ? "Executive Dashboard" : "Executive Dashboard",
      description:
        language === "el"
          ? "Διοικητικό dashboard για ανώτερη διοίκηση"
          : "Executive dashboard for senior management",
      icon: Crown,
      category: "dashboard",
      isPremium: true,
      isNew: false,
      tags: ["executive", "management", "strategy"],
      complexity: "advanced",
      estimatedTime: "5 min",
      popularity: 85,
    },
    {
      id: "performance-dashboard",
      title:
        language === "el" ? "Dashboard Επιδόσεων" : "Performance Dashboard",
      description:
        language === "el"
          ? "Παρακολούθηση επιδόσεων και στόχων"
          : "Track performance and goals",
      icon: Target,
      category: "dashboard",
      isPremium: true,
      isNew: true,
      tags: ["performance", "goals", "tracking"],
      complexity: "intermediate",
      estimatedTime: "3 min",
      popularity: 78,
    },

    // Core Business Operations
    {
      id: "basics",
      title: language === "el" ? "Βασικά Στοιχεία" : "Product Basics",
      description:
        language === "el"
          ? "Πληροφορίες και χαρακτηριστικά προϊόντος"
          : "Product information and characteristics",
      icon: Fish,
      category: "operations",
      isPremium: false,
      isNew: false,
      tags: ["product", "basics", "information"],
      complexity: "beginner",
      estimatedTime: "3 min",
      popularity: 92,
    },
    {
      id: "processing",
      title: language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases",
      description:
        language === "el"
          ? "Διαχείριση φάσεων επεξεργασίας προϊόντος"
          : "Manage product processing phases",
      icon: Settings,
      category: "operations",
      isPremium: true,
      isNew: false,
      tags: ["processing", "phases", "production"],
      complexity: "intermediate",
      estimatedTime: "5 min",
      popularity: 73,
    },
    {
      id: "costs",
      title: language === "el" ? "Διαχείριση Κόστων" : "Cost Management",
      description:
        language === "el"
          ? "Παρακολούθηση και ανάλυση κόστων"
          : "Track and analyze costs",
      icon: Calculator,
      category: "operations",
      isPremium: false,
      isNew: false,
      tags: ["costs", "expenses", "calculation"],
      complexity: "intermediate",
      estimatedTime: "4 min",
      popularity: 89,
    },
    {
      id: "transport",
      title: language === "el" ? "Κόστη Μεταφοράς" : "Transport Costs",
      description:
        language === "el"
          ? "Υπολογισμός κόστων μεταφοράς και logistics"
          : "Calculate transport and logistics costs",
      icon: Truck,
      category: "operations",
      isPremium: false,
      isNew: false,
      tags: ["transport", "logistics", "shipping"],
      complexity: "intermediate",
      estimatedTime: "3 min",
      popularity: 67,
    },

    // Business Management
    {
      id: "fleet-management",
      title: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
      description:
        language === "el"
          ? "Παρακολούθηση και διαχείριση αλιευτικού στόλου"
          : "Track and manage fishing fleet",
      icon: Ship,
      category: "management",
      isPremium: true,
      isNew: true,
      tags: ["fleet", "vessels", "tracking", "maritime"],
      complexity: "advanced",
      estimatedTime: "6 min",
      popularity: 82,
    },
    {
      id: "inventory-management",
      title:
        language === "el" ? "Διαχείριση Αποθέματος" : "Inventory Management",
      description:
        language === "el"
          ? "Έλεγχος αποθέματος και παρακολούθηση προϊόντων"
          : "Stock control and product tracking",
      icon: Package,
      category: "management",
      isPremium: true,
      isNew: true,
      tags: ["inventory", "stock", "warehouse", "tracking"],
      complexity: "intermediate",
      estimatedTime: "4 min",
      popularity: 91,
    },
    {
      id: "order-management",
      title: language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management",
      description:
        language === "el"
          ? "Διαχείριση παραγγελιών πελατών και πωλήσεων"
          : "Manage customer orders and sales",
      icon: ShoppingCart,
      category: "management",
      isPremium: true,
      isNew: true,
      tags: ["orders", "sales", "customers", "crm"],
      complexity: "intermediate",
      estimatedTime: "4 min",
      popularity: 88,
    },
    {
      id: "customer-management",
      title: language === "el" ? "Διαχείριση Πελατών" : "Customer Management",
      description:
        language === "el"
          ? "CRM σύστημα για διαχείριση πελατών"
          : "CRM system for customer management",
      icon: Users,
      category: "management",
      isPremium: true,
      isNew: true,
      tags: ["crm", "customers", "relationships", "sales"],
      complexity: "intermediate",
      estimatedTime: "5 min",
      popularity: 86,
    },
    {
      id: "supplier-management",
      title:
        language === "el" ? "Διαχείριση Προμηθευτών" : "Supplier Management",
      description:
        language === "el"
          ? "Διαχείριση προμηθευτών και συμβολαίων"
          : "Manage suppliers and contracts",
      icon: Factory,
      category: "management",
      isPremium: true,
      isNew: true,
      tags: ["suppliers", "vendors", "contracts", "procurement"],
      complexity: "intermediate",
      estimatedTime: "4 min",
      popularity: 74,
    },

    // Analytics & Reporting
    {
      id: "analysis",
      title: language === "el" ? "Βασική Ανάλυση" : "Basic Analysis",
      description:
        language === "el"
          ? "Αναλυτικά αποτελέσματα κοστολόγησης"
          : "Detailed costing analysis results",
      icon: BarChart3,
      category: "analytics",
      isPremium: false,
      isNew: false,
      tags: ["analysis", "reports", "results"],
      complexity: "beginner",
      estimatedTime: "3 min",
      popularity: 84,
    },
    {
      id: "advanced-analysis",
      title: language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
      description:
        language === "el"
          ? "Εξειδικευμένη ανάλυση με AI και ML"
          : "Specialized analysis with AI and ML",
      icon: PieChart,
      category: "analytics",
      isPremium: true,
      isNew: true,
      tags: ["advanced", "ai", "machine-learning", "prediction"],
      complexity: "advanced",
      estimatedTime: "8 min",
      popularity: 79,
    },
    {
      id: "financial-ratios",
      title:
        language === "el" ? "Χρηματοοικονομικοί Δείκτες" : "Financial Ratios",
      description:
        language === "el"
          ? "Ανάλυση χρηματοοικονομικών δεικτών"
          : "Financial ratio analysis",
      icon: Activity,
      category: "analytics",
      isPremium: true,
      isNew: false,
      tags: ["financial", "ratios", "metrics", "kpi"],
      complexity: "advanced",
      estimatedTime: "6 min",
      popularity: 71,
    },
    {
      id: "market-trends",
      title: language === "el" ? "Τάσεις Αγοράς" : "Market Trends",
      description:
        language === "el"
          ? "Ανάλυση οικονομικών τάσεων αγοράς"
          : "Economic market trend analysis",
      icon: TrendingUp,
      category: "analytics",
      isPremium: true,
      isNew: false,
      tags: ["market", "trends", "economics", "forecasting"],
      complexity: "intermediate",
      estimatedTime: "5 min",
      popularity: 77,
    },
    {
      id: "cost-optimization",
      title: language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization",
      description:
        language === "el"
          ? "Αυτόματη βελτιστοποίηση κόστων με AI"
          : "Automated cost optimization with AI",
      icon: TrendingDown,
      category: "analytics",
      isPremium: true,
      isNew: true,
      tags: ["optimization", "ai", "cost-reduction", "efficiency"],
      complexity: "advanced",
      estimatedTime: "7 min",
      popularity: 83,
    },

    // Advanced Features
    {
      id: "market-intelligence",
      title: language === "el" ? "Market Intelligence" : "Market Intelligence",
      description:
        language === "el"
          ? "Στρατηγική ανάλυση αγοράς"
          : "Strategic market analysis",
      icon: Globe,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["intelligence", "strategy", "competitive", "analysis"],
      complexity: "advanced",
      estimatedTime: "10 min",
      popularity: 68,
    },
    {
      id: "scenario-analysis",
      title: language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis",
      description:
        language === "el"
          ? "Προσομοίωση διαφορετικών σεναρίων"
          : "Simulate different scenarios",
      icon: Target,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["scenarios", "simulation", "modeling", "planning"],
      complexity: "advanced",
      estimatedTime: "8 min",
      popularity: 72,
    },
    {
      id: "forecast-revenue",
      title: language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecast",
      description:
        language === "el"
          ? "AI προβλέψεις εσόδων και κερδών"
          : "AI-powered revenue and profit forecasting",
      icon: LineChart,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["forecasting", "ai", "revenue", "prediction"],
      complexity: "advanced",
      estimatedTime: "6 min",
      popularity: 81,
    },
    {
      id: "pricing-models",
      title: language === "el" ? "Μοντέλα Τιμολόγησης" : "Pricing Models",
      description:
        language === "el"
          ? "Δυναμικά μοντέλα τιμολόγησης"
          : "Dynamic pricing models",
      icon: DollarSign,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["pricing", "dynamic", "strategy", "optimization"],
      complexity: "advanced",
      estimatedTime: "9 min",
      popularity: 75,
    },
    {
      id: "risk-analysis",
      title: language === "el" ? "Ανάλυση Κινδύνου" : "Risk Analysis",
      description:
        language === "el"
          ? "Αξιολόγηση επιχειρηματικών κινδύνων"
          : "Business risk assessment",
      icon: AlertTriangle,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["risk", "assessment", "security", "compliance"],
      complexity: "advanced",
      estimatedTime: "7 min",
      popularity: 69,
    },
    {
      id: "financial-models",
      title:
        language === "el" ? "Χρηματοοικονομικά Μοντέλα" : "Financial Models",
      description:
        language === "el"
          ? "Προχωρημένα χρηματοοικονομικά μοντέλα"
          : "Advanced financial modeling",
      icon: Briefcase,
      category: "advanced",
      isPremium: true,
      isNew: true,
      tags: ["financial", "modeling", "valuation", "investment"],
      complexity: "advanced",
      estimatedTime: "12 min",
      popularity: 66,
    },

    // Compliance & Quality
    {
      id: "quality-control",
      title: language === "el" ? "Έλεγχος Ποιότητας" : "Quality Control",
      description:
        language === "el"
          ? "Διασφ��λιση ποιότητας προϊόντων"
          : "Product quality assurance",
      icon: Award,
      category: "compliance",
      isPremium: true,
      isNew: true,
      tags: ["quality", "control", "standards", "certification"],
      complexity: "intermediate",
      estimatedTime: "5 min",
      popularity: 87,
    },
    {
      id: "regulatory-compliance",
      title:
        language === "el" ? "Κανονιστική Συμμόρφωση" : "Regulatory Compliance",
      description:
        language === "el"
          ? "Συμμόρφωση με κανονισμούς"
          : "Regulatory compliance management",
      icon: Shield,
      category: "compliance",
      isPremium: true,
      isNew: true,
      tags: ["compliance", "regulations", "legal", "standards"],
      complexity: "advanced",
      estimatedTime: "6 min",
      popularity: 73,
    },
    {
      id: "sustainability-tracking",
      title:
        language === "el"
          ? "Παρακολούθηση Βιωσιμότητας"
          : "Sustainability Tracking",
      description:
        language === "el"
          ? "Μετρήσεις βιωσιμότητας και ESG"
          : "Sustainability and ESG metrics",
      icon: Leaf,
      category: "compliance",
      isPremium: true,
      isNew: true,
      tags: ["sustainability", "esg", "environment", "carbon"],
      complexity: "intermediate",
      estimatedTime: "4 min",
      popularity: 78,
    },

    // Reports & Documentation
    {
      id: "reports-center",
      title: language === "el" ? "Κέντρο Αναφορών" : "Reports Center",
      description:
        language === "el"
          ? "Δημιουργία και διαχείριση αναφορών"
          : "Create and manage reports",
      icon: FileText,
      category: "reports",
      isPremium: true,
      isNew: true,
      tags: ["reports", "documents", "export", "pdf"],
      complexity: "intermediate",
      estimatedTime: "3 min",
      popularity: 85,
    },
    {
      id: "document-management",
      title: language === "el" ? "Διαχείριση Εγγράφων" : "Document Management",
      description:
        language === "el"
          ? "Αρχειοθέτηση και οργάνωση εγγράφων"
          : "Document archiving and organization",
      icon: BookOpen,
      category: "reports",
      isPremium: true,
      isNew: true,
      tags: ["documents", "archiving", "organization", "search"],
      complexity: "beginner",
      estimatedTime: "2 min",
      popularity: 64,
    },

    // Expense Management (existing feature)
    {
      id: "expenses",
      title: language === "el" ? "Διαχείριση Εξόδων" : "Expense Management",
      description:
        language === "el"
          ? "Παρ��κολούθηση και διαχείριση εξόδων"
          : "Track and manage expenses",
      icon: Calculator,
      category: "operations",
      isPremium: false,
      isNew: false,
      tags: ["expenses", "costs", "tracking", "budget"],
      complexity: "beginner",
      estimatedTime: "3 min",
      popularity: 90,
    },
  ];

  const categories = [
    { id: "all", label: language === "el" ? "Όλα" : "All", icon: Grid },
    {
      id: "dashboard",
      label: language === "el" ? "Dashboard" : "Dashboard",
      icon: Home,
    },
    {
      id: "operations",
      label: language === "el" ? "Λειτουργίες" : "Operations",
      icon: Settings,
    },
    {
      id: "management",
      label: language === "el" ? "Διαχείριση" : "Management",
      icon: Users,
    },
    {
      id: "analytics",
      label: language === "el" ? "Αναλυτικά" : "Analytics",
      icon: BarChart3,
    },
    {
      id: "advanced",
      label: language === "el" ? "Προχωρημένα" : "Advanced",
      icon: Zap,
    },
    {
      id: "compliance",
      label: language === "el" ? "Συμμόρφωση" : "Compliance",
      icon: Shield,
    },
    {
      id: "reports",
      label: language === "el" ? "Αναφορές" : "Reports",
      icon: FileText,
    },
  ];

  // Filter items based on search and category
  const filteredItems = navigationItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesFavorites = !showFavorites || favorites.includes(item.id);
    const isPremiumAllowed = !item.isPremium || isPremium;

    return (
      matchesSearch && matchesCategory && matchesFavorites && isPremiumAllowed
    );
  });

  // Sort by popularity and recent usage
  const sortedItems = filteredItems.sort((a, b) => {
    if (recentlyUsed.includes(a.id) && !recentlyUsed.includes(b.id)) return -1;
    if (!recentlyUsed.includes(a.id) && recentlyUsed.includes(b.id)) return 1;
    return b.popularity - a.popularity;
  });

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleItemClick = (itemId: string) => {
    setActiveTab(itemId);
    setRecentlyUsed((prev) => [
      itemId,
      ...prev.filter((id) => id !== itemId).slice(0, 9),
    ]);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const isFavorite = favorites.includes(item.id);
    const isRecent = recentlyUsed.includes(item.id);
    const isActive = activeTab === item.id;

    if (viewMode === "list") {
      return (
        <div
          key={item.id}
          className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
            isActive
              ? "bg-blue-50 border-blue-200"
              : "bg-white hover:bg-gray-50"
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          <div className="flex items-center space-x-4 flex-1">
            <div
              className={`p-3 rounded-lg ${isActive ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                {item.isNew && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {language === "el" ? "Νέο" : "New"}
                  </Badge>
                )}
                {item.isPremium && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
                {isRecent && <Clock className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <Badge className={getComplexityColor(item.complexity)}>
                  {item.complexity}
                </Badge>
                <span>⏱ {item.estimatedTime}</span>
                <span>👥 {item.popularity}% popularity</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </Button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      );
    }

    return (
      <Card
        key={item.id}
        className={`cursor-pointer transition-all hover:shadow-lg group ${
          isActive ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
        }`}
        onClick={() => handleItemClick(item.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div
              className={`p-3 rounded-lg ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 group-hover:bg-gray-200"}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex space-x-1">
              {item.isNew && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {language === "el" ? "Νέο" : "New"}
                </Badge>
              )}
              {item.isPremium && <Crown className="w-4 h-4 text-yellow-500" />}
              {isRecent && <Clock className="w-4 h-4 text-blue-500" />}
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
              >
                <Heart
                  className={`w-3 h-3 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </Button>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs">
            <Badge className={getComplexityColor(item.complexity)}>
              {item.complexity}
            </Badge>
            <div className="flex items-center space-x-2 text-gray-500">
              <span>⏱ {item.estimatedTime}</span>
              <span>👥 {item.popularity}%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {language === "el" ? "Σύστημα Πλοήγησης" : "Navigation System"}
          </h1>
          <p className="text-gray-600">
            {language === "el"
              ? "Εξερευνήστε όλες τις λειτουργίες και δυνατότητες"
              : "Explore all features and capabilities"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            {filteredItems.length}{" "}
            {language === "el" ? "λειτουργίες" : "features"}
          </Badge>
          <Button
            size="sm"
            variant={showFavorites ? "default" : "outline"}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <Heart className="w-4 h-4 mr-2" />
            {language === "el" ? "Αγαπημένα" : "Favorites"}
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={
                    language === "el"
                      ? "Αναζήτηση λειτουργιών..."
                      : "Search features..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    size="sm"
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "ghost"}
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {navigationItems.length}
            </div>
            <div className="text-sm text-gray-600">
              {language === "el" ? "Συνολικές Λειτουργίες" : "Total Features"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {navigationItems.filter((i) => !i.isPremium).length}
            </div>
            <div className="text-sm text-gray-600">
              {language === "el" ? "Δωρεάν" : "Free"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {navigationItems.filter((i) => i.isPremium).length}
            </div>
            <div className="text-sm text-gray-600">
              {language === "el" ? "Premium" : "Premium"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {navigationItems.filter((i) => i.isNew).length}
            </div>
            <div className="text-sm text-gray-600">
              {language === "el" ? "Νέες" : "New"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Used */}
      {recentlyUsed.length > 0 && !showFavorites && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              {language === "el" ? "Πρόσφατα Χρησιμοποιημένα" : "Recently Used"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {recentlyUsed.slice(0, 6).map((itemId) => {
                const item = navigationItems.find((i) => i.id === itemId);
                if (!item) return null;
                const Icon = item.icon;

                return (
                  <div
                    key={itemId}
                    className="flex-shrink-0 w-32 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 text-center"
                    onClick={() => handleItemClick(itemId)}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-xs font-medium truncate">
                      {item.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {sortedItems.map(renderItem)}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {language === "el"
                ? "Δεν βρέθηκαν αποτελέσματα"
                : "No results found"}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === "el"
                ? "Δοκιμάστε διαφορετικούς όρους αναζήτησης ή φίλτρα"
                : "Try different search terms or filters"}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setShowFavorites(false);
              }}
            >
              {language === "el" ? "Εκκαθάριση Φίλτρων" : "Clear Filters"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">
                {language === "el" ? "Χρειάζεστε βοήθεια;" : "Need Help?"}
              </h3>
              <p className="text-blue-800 text-sm mb-3">
                {language === "el"
                  ? "Εξερευνήστε τον οδηγό χρήσης ή επικοινωνήστε με την υποστήριξη"
                  : "Explore the user guide or contact support"}
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  {language === "el" ? "Οδηγός Χρήσης" : "User Guide"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700"
                >
                  {language === "el" ? "Υποστήριξη" : "Support"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationSystem;
