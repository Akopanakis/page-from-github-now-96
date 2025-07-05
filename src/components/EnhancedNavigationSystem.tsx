import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard,
  Calculator,
  TrendingUp,
  Globe,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Fish,
  Truck,
  LineChart,
  DollarSign,
  AlertTriangle,
  Boxes,
  Briefcase,
  Factory,
  Users,
  Building,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Share2,
  Brain,
  Zap,
  Layers,
  Database,
  Cpu,
  Search,
  Grid,
  List,
  Bookmark,
  Folder,
  ChevronRight,
  Home,
  Crown,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface EnhancedNavigationSystemProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

interface NavigationCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  items: NavigationItem[];
}

interface NavigationItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  isPremium?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  category: string;
  tags: string[];
  lastUsed?: Date;
}

const EnhancedNavigationSystem: React.FC<EnhancedNavigationSystemProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);

  // Navigation Categories and Items
  const navigationCategories: NavigationCategory[] = [
    {
      id: "dashboard",
      name: language === "el" ? "Πίνακες Ελέγχου" : "Dashboards",
      icon: LayoutDashboard,
      color: "blue",
      description:
        language === "el"
          ? "Επιχειρησιακά dashboards και αναφορές"
          : "Business dashboards and reports",
      items: [
        {
          id: "comprehensive-dashboard",
          name: language === "el" ? "Κεντρικός Πίνακας" : "Main Dashboard",
          description:
            language === "el"
              ? "Ολοκληρωμένη επισκόπηση επιχείρησης"
              : "Comprehensive business overview",
          icon: LayoutDashboard,
          category: "dashboard",
          tags: ["overview", "metrics", "kpis"],
          isPopular: true,
        },
        {
          id: "executive-dashboard",
          name:
            language === "el" ? "Διοικητικός Πίνακας" : "Executive Dashboard",
          description:
            language === "el"
              ? "Στρατηγικές μετρήσεις για διοίκηση"
              : "Strategic metrics for executives",
          icon: Crown,
          isPremium: true,
          category: "dashboard",
          tags: ["executive", "strategic", "overview"],
        },
        {
          id: "financial-ratios",
          name:
            language === "el"
              ? "Χρηματοοικονομικοί Δείκτες"
              : "Financial Ratios",
          description:
            language === "el"
              ? "Ανάλυση χρηματοοικονομικής απόδοσης"
              : "Financial performance analysis",
          icon: PieChart,
          category: "dashboard",
          tags: ["finance", "ratios", "performance"],
        },
        {
          id: "business-intelligence",
          name:
            language === "el"
              ? "Business Intelligence"
              : "Business Intelligence",
          description:
            language === "el"
              ? "Προηγμένα analytics και insights"
              : "Advanced analytics and insights",
          icon: Brain,
          isPremium: true,
          isNew: true,
          category: "dashboard",
          tags: ["analytics", "insights", "intelligence"],
        },
      ],
    },
    {
      id: "costing",
      name: language === "el" ? "Κοστολόγηση" : "Costing",
      icon: Calculator,
      color: "green",
      description:
        language === "el"
          ? "Εργαλεία υπολογισμού και ανάλυσης κό��τους"
          : "Cost calculation and analysis tools",
      items: [
        {
          id: "basics",
          name: language === "el" ? "Βασικά Στοιχεία" : "Product Basics",
          description:
            language === "el"
              ? "Βασικές πληροφορίες προϊόντος"
              : "Basic product information",
          icon: Fish,
          category: "costing",
          tags: ["basics", "product", "setup"],
        },
        {
          id: "processing",
          name: language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases",
          description:
            language === "el"
              ? "Στάδια παραγωγικής διαδικασίας"
              : "Production process stages",
          icon: Factory,
          category: "costing",
          tags: ["processing", "production", "phases"],
        },
        {
          id: "costs",
          name: language === "el" ? "Κόστη" : "Costs",
          description:
            language === "el"
              ? "Διαχείριση άμεσων και έμμεσων κοστών"
              : "Direct and indirect cost management",
          icon: DollarSign,
          category: "costing",
          tags: ["costs", "direct", "indirect"],
          isPopular: true,
        },
        {
          id: "transport",
          name: language === "el" ? "Μεταφορά" : "Transport",
          description:
            language === "el"
              ? "Κόστη και διαδρομές μεταφοράς"
              : "Transportation costs and routes",
          icon: Truck,
          category: "costing",
          tags: ["transport", "logistics", "shipping"],
        },
      ],
    },
    {
      id: "analysis",
      name: language === "el" ? "Ανάλυση & Πρόβλεψη" : "Analysis & Forecasting",
      icon: TrendingUp,
      color: "purple",
      description:
        language === "el"
          ? "Προηγμένα εργαλεία ανάλυσης και πρόβλεψης"
          : "Advanced analysis and forecasting tools",
      items: [
        {
          id: "analysis",
          name: language === "el" ? "Βασική Ανάλυση" : "Basic Analysis",
          description:
            language === "el"
              ? "Ανάλυση κόστους και κερδοφορίας"
              : "Cost and profitability analysis",
          icon: BarChart3,
          category: "analysis",
          tags: ["analysis", "profitability", "basic"],
        },
        {
          id: "advanced-analysis",
          name: language === "el" ? "Προηγμένη Ανάλυση" : "Advanced Analysis",
          description:
            language === "el"
              ? "Σύνθετα μοντέλα ανάλυσης"
              : "Complex analysis models",
          icon: Activity,
          isPremium: true,
          category: "analysis",
          tags: ["advanced", "models", "complex"],
        },
        {
          id: "market-intelligence",
          name:
            language === "el" ? "Market Intelligence" : "Market Intelligence",
          description:
            language === "el"
              ? "Ανάλυση αγοράς και ανταγωνισμού"
              : "Market and competitive analysis",
          icon: Globe,
          isPremium: true,
          isNew: true,
          category: "analysis",
          tags: ["market", "intelligence", "competitive"],
        },
        {
          id: "scenario-analysis",
          name: language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis",
          description:
            language === "el"
              ? "Monte Carlo και ανάλυση ευαισθησίας"
              : "Monte Carlo and sensitivity analysis",
          icon: Target,
          isPremium: true,
          isNew: true,
          category: "analysis",
          tags: ["scenarios", "monte-carlo", "simulation"],
        },
        {
          id: "forecast-revenue",
          name: language === "el" ? "Πρόβλεψη Εσό��ων" : "Revenue Forecasting",
          description:
            language === "el"
              ? "Προηγμένη πρόβλεψη εσόδων"
              : "Advanced revenue forecasting",
          icon: TrendingUp,
          isPremium: true,
          isNew: true,
          category: "analysis",
          tags: ["forecasting", "revenue", "prediction"],
        },
        {
          id: "market-trends",
          name: language === "el" ? "Οικονομικές Τάσεις" : "Economic Trends",
          description:
            language === "el"
              ? "Ανάλυση οικονομικών τάσεων"
              : "Economic trends analysis",
          icon: LineChart,
          category: "analysis",
          tags: ["trends", "economic", "market"],
        },
      ],
    },
    {
      id: "operations",
      name: language === "el" ? "Λειτουργίες" : "Operations",
      icon: Settings,
      color: "orange",
      description:
        language === "el"
          ? "Διαχείριση επιχειρησιακών λειτουργιών"
          : "Business operations management",
      items: [
        {
          id: "fleet-management",
          name: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
          description:
            language === "el"
              ? "Διαχείριση σ��όλου και εξοπλισμού"
              : "Fleet and equipment management",
          icon: Truck,
          isPremium: true,
          category: "operations",
          tags: ["fleet", "vehicles", "equipment"],
        },
        {
          id: "inventory-management",
          name:
            language === "el"
              ? "Διαχείριση Αποθεμάτων"
              : "Inventory Management",
          description:
            language === "el"
              ? "Έλεγχος και διαχείριση αποθεμάτων"
              : "Inventory control and management",
          icon: Boxes,
          category: "operations",
          tags: ["inventory", "stock", "warehouse"],
        },
        {
          id: "order-management",
          name:
            language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management",
          description:
            language === "el"
              ? "Επεξεργασία και παρακολούθηση παραγγελιών"
              : "Order processing and tracking",
          icon: Briefcase,
          category: "operations",
          tags: ["orders", "tracking", "processing"],
        },
        {
          id: "customer-management",
          name:
            language === "el" ? "Διαχείριση Πελατών" : "Customer Management",
          description:
            language === "el"
              ? "Διαχείριση σχέσεων πελατών"
              : "Customer relationship management",
          icon: Users,
          category: "operations",
          tags: ["customers", "crm", "relationships"],
        },
        {
          id: "operations-center",
          name: language === "el" ? "Κέντρο Λειτουργιών" : "Operations Center",
          description:
            language === "el"
              ? "Κεντρικός έλεγχος λειτουργιών"
              : "Central operations control",
          icon: Activity,
          isPremium: true,
          category: "operations",
          tags: ["operations", "control", "monitoring"],
        },
      ],
    },
    {
      id: "compliance",
      name: language === "el" ? "Συμμόρφωση" : "Compliance",
      icon: Shield,
      color: "red",
      description:
        language === "el"
          ? "Πρότυπα ποιότητας και συμμόρφωσης"
          : "Quality standards and compliance",
      items: [
        {
          id: "quality-compliance",
          name: language === "el" ? "Κέντρο Ποιότητας" : "Quality Center",
          description:
            language === "el"
              ? "Διαχείριση ποιότητας και συμμόρφωσης"
              : "Quality and compliance management",
          icon: Award,
          category: "compliance",
          tags: ["quality", "compliance", "standards"],
        },
        {
          id: "haccp-module",
          name: language === "el" ? "HACCP" : "HACCP",
          description:
            language === "el"
              ? "Σύστημα HACCP και ασφάλεια τροφίμων"
              : "HACCP system and food safety",
          icon: Shield,
          category: "compliance",
          tags: ["haccp", "food-safety", "hygiene"],
        },
        {
          id: "iso-standards",
          name: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
          description:
            language === "el"
              ? "Διαχείριση προτύπων ISO"
              : "ISO standards management",
          icon: CheckCircle,
          category: "compliance",
          tags: ["iso", "standards", "certification"],
        },
      ],
    },
    {
      id: "financial",
      name: language === "el" ? "Χρηματοοικονομικά" : "Financial",
      icon: DollarSign,
      color: "emerald",
      description:
        language === "el"
          ? "Χρηματοοικονομική ανάλυση και μοντέλα"
          : "Financial analysis and models",
      items: [
        {
          id: "financial-analytics",
          name:
            language === "el"
              ? "Χρηματοοικονομικά Analytics"
              : "Financial Analytics",
          description:
            language === "el"
              ? "Προηγμένα χρηματοοικονομικά analytics"
              : "Advanced financial analytics",
          icon: BarChart3,
          isPremium: true,
          category: "financial",
          tags: ["finance", "analytics", "reporting"],
        },
        {
          id: "financial-models",
          name:
            language === "el"
              ? "Χρηματοοικονομικά Μοντέλα"
              : "Financial Models",
          description:
            language === "el"
              ? "Σύνθετα χρηματοοικονομικά μοντέλα"
              : "Complex financial models",
          icon: Calculator,
          isPremium: true,
          category: "financial",
          tags: ["models", "finance", "complex"],
        },
        {
          id: "cost-optimization",
          name:
            language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization",
          description:
            language === "el"
              ? "Εργαλεία βελτιστοποίησης κόστους"
              : "Cost optimization tools",
          icon: TrendingDown,
          isPremium: true,
          category: "financial",
          tags: ["optimization", "cost", "efficiency"],
        },
      ],
    },
  ];

  // Get all navigation items
  const allItems = navigationCategories.flatMap((category) => category.items);

  // Filter items based on search and category
  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory ||
      (selectedCategory === "premium" && item.isPremium) ||
      (selectedCategory === "favorites" && favoriteItems.includes(item.id)) ||
      (selectedCategory === "recent" && recentItems.includes(item.id));

    return matchesSearch && matchesCategory;
  });

  // Load favorites and recent items from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("navigation-favorites");
    const savedRecents = localStorage.getItem("navigation-recent");

    if (savedFavorites) {
      setFavoriteItems(JSON.parse(savedFavorites));
    }

    if (savedRecents) {
      setRecentItems(JSON.parse(savedRecents));
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("navigation-favorites", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  useEffect(() => {
    localStorage.setItem("navigation-recent", JSON.stringify(recentItems));
  }, [recentItems]);

  const toggleFavorite = (itemId: string) => {
    setFavoriteItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleItemClick = (itemId: string) => {
    // Add to recent items
    setRecentItems((prev) => {
      const updated = [itemId, ...prev.filter((id) => id !== itemId)].slice(
        0,
        10,
      );
      return updated;
    });

    // Navigate to item
    setActiveTab(itemId);
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-green-50 text-green-700 border-green-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
      red: "bg-red-50 text-red-700 border-red-200",
      emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const renderItemCard = (item: NavigationItem) => {
    const isActive = activeTab === item.id;
    const isFavorite = favoriteItems.includes(item.id);
    const isRecent = recentItems.includes(item.id);

    return (
      <Card
        key={item.id}
        className={`cursor-pointer transition-all hover:shadow-md ${
          isActive ? "ring-2 ring-blue-500 bg-blue-50" : ""
        } ${!isPremium && item.isPremium ? "opacity-60" : ""}`}
        onClick={() =>
          (!item.isPremium || isPremium) && handleItemClick(item.id)
        }
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <item.icon className="w-5 h-5 mr-2 text-blue-600" />
              <h4 className="font-semibold text-sm">{item.name}</h4>
            </div>
            <div className="flex items-center space-x-1">
              {item.isPremium && (
                <Badge
                  variant="outline"
                  className="text-xs bg-yellow-50 text-yellow-700"
                >
                  <Crown className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              )}
              {item.isNew && (
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700"
                >
                  New
                </Badge>
              )}
              {item.isPopular && (
                <Badge
                  variant="outline"
                  className="text-xs bg-purple-50 text-purple-700"
                >
                  <Star className="w-3 h-3 mr-1" />
                </Badge>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                className="p-1 h-6 w-6"
              >
                <Bookmark
                  className={`w-3 h-3 ${isFavorite ? "fill-current text-yellow-500" : "text-gray-400"}`}
                />
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-3">{item.description}</p>

          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {isRecent && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {language === "el" ? "Πρόσφατο" : "Recent"}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderItemList = (item: NavigationItem) => {
    const isActive = activeTab === item.id;
    const isFavorite = favoriteItems.includes(item.id);

    return (
      <div
        key={item.id}
        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
          isActive ? "bg-blue-50 border-blue-500" : "border-gray-200"
        } ${!isPremium && item.isPremium ? "opacity-60" : ""}`}
        onClick={() =>
          (!item.isPremium || isPremium) && handleItemClick(item.id)
        }
      >
        <div className="flex items-center flex-1">
          <item.icon className="w-5 h-5 mr-3 text-blue-600" />
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="font-semibold">{item.name}</h4>
              {item.isPremium && (
                <Crown className="w-4 h-4 ml-2 text-yellow-500" />
              )}
              {item.isNew && (
                <Badge
                  variant="outline"
                  className="ml-2 text-xs bg-green-50 text-green-700"
                >
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
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
            className="p-1"
          >
            <Bookmark
              className={`w-4 h-4 ${isFavorite ? "fill-current text-yellow-500" : "text-gray-400"}`}
            />
          </Button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Grid className="w-6 h-6 mr-2 text-blue-600" />
            {language === "el" ? "Σύστημα Πλοήγησης" : "Navigation System"}
          </h2>
          <p className="text-gray-600 mt-1">
            {language === "el"
              ? "Εύκολη πρόσβαση σε όλες τις λειτουργίες"
              : "Easy access to all features"}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder={language === "el" ? "Αναζήτηση..." : "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <div className="flex items-center space-x-1 border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            {language === "el" ? "Γρήγορη Πρόσβαση" : "Quick Access"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recentItems.slice(0, 6).map((itemId) => {
              const item = allItems.find((i) => i.id === itemId);
              if (!item) return null;

              return (
                <Button
                  key={itemId}
                  variant={activeTab === itemId ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleItemClick(itemId)}
                  className="flex items-center"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              );
            })}

            {favoriteItems.slice(0, 3).map((itemId) => {
              if (recentItems.includes(itemId)) return null;
              const item = allItems.find((i) => i.id === itemId);
              if (!item) return null;

              return (
                <Button
                  key={itemId}
                  variant="outline"
                  size="sm"
                  onClick={() => handleItemClick(itemId)}
                  className="flex items-center"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                  <Bookmark className="w-3 h-3 ml-2 fill-current text-yellow-500" />
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          <Home className="w-4 h-4 mr-2" />
          {language === "el" ? "Όλα" : "All"}
        </Button>

        {navigationCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center"
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.name}
          </Button>
        ))}

        <Separator orientation="vertical" className="h-8" />

        <Button
          variant={selectedCategory === "favorites" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("favorites")}
        >
          <Bookmark className="w-4 h-4 mr-2" />
          {language === "el" ? "Αγαπημένα" : "Favorites"}
          {favoriteItems.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {favoriteItems.length}
            </Badge>
          )}
        </Button>

        <Button
          variant={selectedCategory === "recent" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("recent")}
        >
          <Clock className="w-4 h-4 mr-2" />
          {language === "el" ? "Πρόσφατα" : "Recent"}
        </Button>

        <Button
          variant={selectedCategory === "premium" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("premium")}
        >
          <Crown className="w-4 h-4 mr-2" />
          Premium
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="space-y-6">
        {selectedCategory === "all" ? (
          // Show by categories
          navigationCategories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category === category.id,
            );
            if (categoryItems.length === 0) return null;

            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle
                    className={`flex items-center p-3 rounded-lg ${getCategoryColor(category.color)}`}
                  >
                    <category.icon className="w-5 h-5 mr-2" />
                    {category.name}
                    <Badge variant="outline" className="ml-auto">
                      {categoryItems.length}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-2"
                    }
                  >
                    {categoryItems.map((item) =>
                      viewMode === "grid"
                        ? renderItemCard(item)
                        : renderItemList(item),
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          // Show filtered items
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "el" ? "Αποτελέσματα" : "Results"} (
                {filteredItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-2"
                }
              >
                {filteredItems.map((item) =>
                  viewMode === "grid"
                    ? renderItemCard(item)
                    : renderItemList(item),
                )}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "el"
                      ? "Δεν βρέθηκαν αποτελέσματα"
                      : "No results found"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedNavigationSystem;
