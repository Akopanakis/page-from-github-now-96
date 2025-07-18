import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  safeGetItem,
  safeSetItem,
  safeGetJSON,
  safeSetJSON,
} from "@/utils/safeStorage";
import {
  Fish,
  Calculator,
  BarChart3,
  PieChart,
  TrendingUp,
  Settings,
  FileText,
  Database,
  Target,
  Crown,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  Boxes,
  LineChart,
  DollarSign,
  ShoppingCart,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Bookmark,
  HelpCircle,
  Package,
  Activity,
  Briefcase,
  TrendingDown,
  Factory,
  Award,
  Shield,
  Leaf,
  BookOpen,
  Zap,
  Search,
  Star,
  BadgeCheck,
  Biohazard,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language, t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = safeGetItem("kostopro-sidebar-collapsed");
    return saved === "true";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    return safeGetJSON("kostopro-sidebar-favorites", []);
  });
  const [collapsedSections, setCollapsedSections] = useState<string[]>(() => {
    return safeGetJSON("kostopro-sidebar-collapsed-sections", []);
  });

  // Save states
  useEffect(() => {
    safeSetItem("kostopro-sidebar-collapsed", isCollapsed.toString());
  }, [isCollapsed]);

  useEffect(() => {
    safeSetJSON("kostopro-sidebar-favorites", favorites);
  }, [favorites]);

  useEffect(() => {
    safeSetJSON("kostopro-sidebar-collapsed-sections", collapsedSections);
  }, [collapsedSections]);

  const navigationItems = [
    // Main Operations
    {
      id: "comprehensive-dashboard",
      label: language === "el" ? "Κέντρο Ελέγχου" : "Control Center",
      icon: Home,
      category: "main",
      description: language === "el" ? "Κεντρικό dashboard" : "Main dashboard",
    },
    {
      id: "basics",
      label: t("nav.basics"),
      icon: Fish,
      category: "main",
      description:
        language === "el" ? "Πληροφορίες προϊόντος" : "Product information",
    },
    {
      id: "processing",
      label: t("processing.phases"),
      icon: Settings,
      category: "main",
      description:
        language === "el" ? "Φάσεις επεξεργασίας" : "Processing phases",
    },
    {
      id: "costs",
      label: t("nav.costs"),
      icon: Calculator,
      category: "main",
      description: language === "el" ? "Διαχείριση κόστων" : "Cost management",
    },
    {
      id: "transport",
      label: t("nav.transport"),
      icon: Truck,
      category: "main",
      description: language === "el" ? "Κόστη μεταφοράς" : "Transport costs",
    },

    // Business Operations
    {
      id: "fleet-management",
      label: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
      icon: Globe,
      category: "operations",
      isPremium: true,
      description:
        language === "el" ? "Παρακολούθηση στόλου" : "Fleet tracking",
    },
    {
      id: "inventory-management",
      label:
        language === "el" ? "Διαχείριση Αποθέματος" : "Inventory Management",
      icon: Boxes,
      category: "operations",
      isPremium: true,
      description:
        language === "el" ? "Διαχείριση αποθέματο��" : "Inventory management",
    },
    {
      id: "order-management",
      label: language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management",
      icon: ShoppingCart,
      category: "operations",
      isPremium: true,
      description:
        language === "el" ? "Παραγγελίες πελατών" : "Customer orders",
    },
    {
      id: "customer-management",
      label: language === "el" ? "Διαχείριση Πελατών" : "Customer Management",
      icon: Users,
      category: "operations",
      isPremium: true,
      description: language === "el" ? "CRM σύστημα" : "CRM system",
    },
    {
      id: "supplier-management",
      label:
        language === "el" ? "Διαχείριση Προμηθευτών" : "Supplier Management",
      icon: Factory,
      category: "operations",
      isPremium: true,
      description:
        language === "el" ? "Διαχείριση προμηθευτών" : "Supplier management",
    },

    // Analytics & Reporting
    {
      id: "analysis",
      label: t("nav.analysis"),
      icon: BarChart3,
      category: "analysis",
      description:
        language === "el" ? "Αναλυτικά αποτελέσματα" : "Detailed analysis",
    },
    {
      id: "advanced-analysis",
      label: language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
      icon: PieChart,
      category: "analysis",
      isPremium: true,
      description:
        language === "el" ? "Εξειδικευμένη ανάλυση" : "Specialized analysis",
    },
    {
      id: "financial-ratios",
      label: t("financial.ratios"),
      icon: Activity,
      category: "analysis",
      isPremium: true,
      description:
        language === "el" ? "Αναλυτικοί δείκτες" : "Financial analytics",
    },
    {
      id: "market-trends",
      label: t("market.trends"),
      icon: TrendingUp,
      category: "analysis",
      isPremium: true,
      description:
        language === "el" ? "Οικονομική ανάλυση" : "Economic analysis",
    },
    {
      id: "cost-optimization",
      label: language === "el" ? "Βελτιστοποίηση Κόστους" : "Cost Optimization",
      icon: TrendingDown,
      category: "analysis",
      isPremium: true,
      description:
        language === "el"
          ? "Αυτόματη βελτιστοποίηση"
          : "Automated optimization",
    },

    // Executive Dashboards
    {
      id: "executive-dashboard",
      label: language === "el" ? "Executive Dashboard" : "Executive Dashboard",
      icon: Crown,
      category: "executive",
      isPremium: true,
      description:
        language === "el" ? "Διοικητική επισκόπηση" : "Executive overview",
    },
    {
      id: "performance-dashboard",
      label:
        language === "el" ? "Dashboard Επιδόσεων" : "Performance Dashboard",
      icon: LineChart,
      category: "executive",
      isPremium: true,
      description: language === "el" ? "Επισκόπηση KPI" : "KPI overview",
    },
    {
      id: "financial-dashboard",
      label: language === "el" ? "Οικονομικό Dashboard" : "Financial Dashboard",
      icon: DollarSign,
      category: "executive",
      isPremium: true,
      description:
        language === "el" ? "Οικονομικά στοιχεία" : "Financial metrics",
    },

    // Advanced Features
    {
      id: "market-intelligence",
      label: language === "el" ? "Market Intelligence" : "Market Intelligence",
      icon: Globe,
      category: "advanced",
      isPremium: true,
      description: language === "el" ? "Ανάλυση αγοράς" : "Market analysis",
    },
    {
      id: "scenario-analysis",
      label: language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis",
      icon: Target,
      category: "advanced",
      isPremium: true,
      description: language === "el" ? "Ανάλυση σεναρίων" : "Scenario analysis",
    },
    {
      id: "forecast-revenue",
      label: language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecast",
      icon: TrendingUp,
      category: "advanced",
      isPremium: true,
      description: language === "el" ? "Πρόβλεψη εσόδων" : "Revenue forecast",
    },
    {
      id: "pricing-models",
      label: language === "el" ? "Μοντέλα Τιμολόγησης" : "Pricing Models",
      icon: DollarSign,
      category: "advanced",
      isPremium: true,
      description:
        language === "el" ? "Στρατηγικές τιμολόγησης" : "Pricing strategies",
    },
    {
      id: "risk-analysis",
      label: language === "el" ? "Ανάλυση Κινδύνου" : "Risk Analysis",
      icon: AlertTriangle,
      category: "advanced",
      isPremium: true,
      description:
        language === "el" ? "Αξιολό��ηση κινδύνων" : "Risk assessment",
    },
    {
      id: "financial-models",
      label:
        language === "el" ? "Χρηματοοικονομικά Μοντέλα" : "Financial Models",
      icon: Briefcase,
      category: "advanced",
      isPremium: true,
      description:
        language === "el" ? "Χρηματοοικονομικά μοντέλα" : "Financial models",
    },

    // Compliance & Quality
    {
      id: "haccp-module",
      label: language === "el" ? "Μονάδα HACCP" : "HACCP Module",
      icon: Biohazard,
      category: "compliance",
      isPremium: false,
      description:
        language === "el"
          ? "Σύστημα HACCP και κρίσιμα σημεία ελέγχου"
          : "HACCP system and critical control points",
    },
    {
      id: "iso-standards",
      label: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
      icon: BadgeCheck,
      category: "compliance",
      isPremium: false,
      description:
        language === "el"
          ? "Διαχείριση προτύπων ISO"
          : "ISO standards management",
    },
    {
      id: "quality-control",
      label: language === "el" ? "Έλεγχος Ποιότητας" : "Quality Control",
      icon: Award,
      category: "compliance",
      isPremium: true,
      description:
        language === "el" ? "Διασφάλιση ποιότητας" : "Quality assurance",
    },
    {
      id: "regulatory-compliance",
      label: language === "el" ? "Συμμόρφωση" : "Regulatory Compliance",
      icon: Shield,
      category: "compliance",
      isPremium: true,
      description:
        language === "el" ? "Κανονιστική συμμόρφωση" : "Regulatory compliance",
    },
    {
      id: "sustainability-tracking",
      label: language === "el" ? "Βιωσιμότητα" : "Sustainability",
      icon: Leaf,
      category: "compliance",
      isPremium: true,
      description:
        language === "el"
          ? "Παρακολούθηση βιωσιμότητας"
          : "Sustainability tracking",
    },

    // New Advanced Features
    {
      id: "navigation-system",
      label: language === "el" ? "Σύστημα Πλοήγησης" : "Navigation System",
      icon: Globe,
      category: "advanced",
      isPremium: false,
      description:
        language === "el"
          ? "Κεντρικό σύστημα πλοήγησης"
          : "Central navigation system",
    },
    {
      id: "business-intelligence",
      label:
        language === "el" ? "Business Intelligence" : "Business Intelligence",
      icon: Zap,
      category: "advanced",
      isPremium: true,
      description:
        language === "el"
          ? "Επιχειρηματική νοημοσύνη"
          : "Business intelligence",
    },
    {
      id: "operations-center",
      label: language === "el" ? "Κέντρο Λειτουργιών" : "Operations Center",
      icon: Activity,
      category: "advanced",
      isPremium: true,
      description:
        language === "el"
          ? "Κέντρο ελέγχου λειτουργιών"
          : "Operations control center",
    },
    {
      id: "financial-analytics",
      label:
        language === "el"
          ? "Χρηματοοικονομικά Analytics"
          : "Financial Analytics",
      icon: BarChart3,
      category: "advanced",
      isPremium: true,
      description:
        language === "el"
          ? "Προχωρημένα χρηματοοικονομικά"
          : "Advanced financial analytics",
    },
    {
      id: "quality-compliance",
      label:
        language === "el" ? "Ποιότητα & Συμμόρφωση" : "Quality & Compliance",
      icon: Award,
      category: "compliance",
      isPremium: true,
      description:
        language === "el" ? "Διαχείριση ποιότητας" : "Quality management",
    },

    // Reports & Documentation
    {
      id: "reports-center",
      label: language === "el" ? "Κέντρο Αναφορών" : "Reports Center",
      icon: FileText,
      category: "reports",
      isPremium: true,
      description:
        language === "el" ? "Αναφορές και εκθέσεις" : "Reports and statements",
    },
    {
      id: "document-management",
      label: language === "el" ? "Διαχείριση Εγγράφων" : "Document Management",
      icon: BookOpen,
      category: "reports",
      isPremium: true,
      description:
        language === "el" ? "Αρ��ειοθέτηση εγγράφων" : "Document archiving",
    },
  ];

  const categories = [
    {
      id: "main",
      label: language === "el" ? "Κύρια" : "Main",
      icon: Home,
    },
    {
      id: "operations",
      label: language === "el" ? "Λειτουργίες" : "Operations",
      icon: Settings,
    },
    {
      id: "analysis",
      label: language === "el" ? "Αναλυτικά" : "Analytics",
      icon: BarChart3,
    },
    {
      id: "executive",
      label: language === "el" ? "Διοίκηση" : "Executive",
      icon: Crown,
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

  const isItemDisabled = (item: any) => {
    return item.isPremium && !isPremium;
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const toggleSection = (categoryId: string) => {
    setCollapsedSections((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const filteredNavigationItems = navigationItems.filter((item) => {
    if (!searchTerm) return true;
    return (
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const favoriteItems = navigationItems.filter((item) =>
    favorites.includes(item.id),
  );

  const renderNavigationItem = (item: any, showFavorite = true) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    const isDisabled = isItemDisabled(item);
    const isFavorite = favorites.includes(item.id);

    return (
      <div key={item.id} className="relative group">
        <Button
          variant={isActive ? "default" : "ghost"}
          className={`
            w-full transition-all duration-200 mb-1 pr-8
            ${isCollapsed ? "h-12 p-2 justify-center" : "h-auto p-3 justify-start"}
            ${isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : ""}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:shadow-md"}
          `}
          onClick={() => !isDisabled && setActiveTab(item.id)}
          disabled={isDisabled}
          title={isCollapsed ? item.label : undefined}
        >
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "w-full"}`}
          >
            <Icon
              className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} flex-shrink-0`}
            />
            {!isCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{item.label}</span>
                  {item.isPremium && (
                    <Crown className="w-3 h-3 text-yellow-500 ml-2 flex-shrink-0" />
                  )}
                </div>
                <div className="text-xs opacity-70 mt-0.5 truncate">
                  {item.description}
                </div>
              </div>
            )}
          </div>
        </Button>

        {showFavorite && !isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            className={`
              absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6
              opacity-0 group-hover:opacity-100 transition-opacity
              ${isFavorite ? "opacity-100 text-yellow-500" : "text-gray-400 hover:text-yellow-500"}
            `}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            title={
              isFavorite
                ? language === "el"
                  ? "Αφαίρεση από αγαπημένα"
                  : "Remove from favorites"
                : language === "el"
                  ? "Προσθήκη στα αγαπημένα"
                  : "Add to favorites"
            }
          >
            <Star
              className="w-3 h-3"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </Button>
        )}
      </div>
    );
  };

  const renderCategoryHeader = (category: any) => {
    const Icon = category.icon;
    const isSectionCollapsed = collapsedSections.includes(category.id);

    if (isCollapsed) {
      return (
        <div className="flex justify-center py-2 mb-2" key={category.id}>
          <Icon className="w-4 h-4 text-gray-400" title={category.label} />
        </div>
      );
    }

    return (
      <div key={category.id} className="px-3 py-2 mb-2">
        <Button
          variant="ghost"
          className="w-full p-0 h-auto justify-start hover:bg-gray-50"
          onClick={() => toggleSection(category.id)}
        >
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider flex items-center justify-between w-full">
            <div className="flex items-center">
              <Icon className="w-4 h-4 mr-2" />
              {category.label}
            </div>
            {isSectionCollapsed ? (
              <ChevronRight className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </h4>
        </Button>
      </div>
    );
  };

  return (
    <Card
      className={`${className} h-full overflow-hidden shadow-xl border-r-2 border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header with collapse toggle */}
        <div
          className={`flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <Fish className="w-6 h-6 mr-2" />
              <span className="font-bold text-lg">KostoPro</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/20 p-1.5"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={language === "el" ? "Αναζήτηση..." : "Search..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Favorites Section */}
          {!isCollapsed && favoriteItems.length > 0 && !searchTerm && (
            <div className="mb-4">
              <div className="px-3 py-2 mb-2">
                <h4 className="text-sm font-semibold text-yellow-600 uppercase tracking-wider flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  {language === "el" ? "Αγαπημένα" : "Favorites"}
                </h4>
              </div>
              <div className="space-y-1">
                {favoriteItems.map((item) => renderNavigationItem(item, false))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* Regular Categories */}
          {categories.map((category) => {
            const categoryItems = filteredNavigationItems.filter(
              (item) => item.category === category.id,
            );

            if (categoryItems.length === 0) return null;

            const isSectionCollapsed = collapsedSections.includes(category.id);

            return (
              <div key={category.id} className="mb-4">
                {renderCategoryHeader(category)}
                {(!isSectionCollapsed || isCollapsed) && (
                  <div className="space-y-1">
                    {categoryItems.map((item) => renderNavigationItem(item))}
                  </div>
                )}
                {!isCollapsed &&
                  categories.indexOf(category) < categories.length - 1 && (
                    <Separator className="my-4" />
                  )}
              </div>
            );
          })}

          {/* No results message */}
          {searchTerm &&
            filteredNavigationItems.length === 0 &&
            !isCollapsed && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {language === "el"
                    ? "Δεν βρέθηκαν αποτελέσματα"
                    : "No results found"}
                </p>
              </div>
            )}
        </div>

        {/* Premium indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t">
            <div
              className={`text-center p-3 rounded-lg ${
                isPremium
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
                  : "bg-gray-100 border-2 border-dashed border-gray-300"
              }`}
            >
              <Crown className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">
                {isPremium
                  ? language === "el"
                    ? "Premium Ενεργό"
                    : "Premium Active"
                  : language === "el"
                    ? "Αναβάθμιση σε Premium"
                    : "Upgrade to Premium"}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Sidebar;
