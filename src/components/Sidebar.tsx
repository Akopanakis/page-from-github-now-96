import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
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
    const saved = localStorage.getItem("kostopro-sidebar-collapsed");
    return saved === "true";
  });

  // Save collapse state
  useEffect(() => {
    localStorage.setItem("kostopro-sidebar-collapsed", isCollapsed.toString());
  }, [isCollapsed]);

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
        language === "el" ? "Διαχείριση αποθέματος" : "Inventory management",
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
        language === "el" ? "Αξιολόγηση κινδύνων" : "Risk assessment",
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
        language === "el" ? "Αρχειοθέτηση εγγράφων" : "Document archiving",
    },
  ];

  const categories = [
    {
      id: "main",
      label: language === "el" ? "Κύρια" : "Main",
      icon: Home,
    },
    {
      id: "analysis",
      label: t("nav.analysis"),
      icon: BarChart3,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LineChart,
    },
    {
      id: "premium",
      label: "Premium",
      icon: Crown,
    },
  ];

  const isItemDisabled = (item: any) => {
    return item.isPremium && !isPremium;
  };

  const renderNavigationItem = (item: any) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    const isDisabled = isItemDisabled(item);

    return (
      <Button
        key={item.id}
        variant={isActive ? "default" : "ghost"}
        className={`
          w-full transition-all duration-200 mb-1
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
    );
  };

  const renderCategoryHeader = (category: any) => {
    const Icon = category.icon;

    if (isCollapsed) {
      return (
        <div className="flex justify-center py-2 mb-2" key={category.id}>
          <Icon className="w-4 h-4 text-gray-400" title={category.label} />
        </div>
      );
    }

    return (
      <div key={category.id} className="px-3 py-2 mb-2">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider flex items-center">
          <Icon className="w-4 h-4 mr-2" />
          {category.label}
        </h4>
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

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          {categories.map((category) => {
            const categoryItems = navigationItems.filter(
              (item) => item.category === category.id,
            );

            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id} className="mb-4">
                {renderCategoryHeader(category)}
                <div className="space-y-1">
                  {categoryItems.map(renderNavigationItem)}
                </div>
                {!isCollapsed &&
                  categories.indexOf(category) < categories.length - 1 && (
                    <Separator className="my-4" />
                  )}
              </div>
            );
          })}
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
