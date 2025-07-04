import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Settings,
  BarChart3,
  Crown,
  Zap,
  Shield,
  FileText,
  Fish,
  Calculator,
  Truck,
  Package,
  Users,
  ShoppingCart,
  Globe,
  Boxes,
  Activity,
  PieChart,
  TrendingUp,
  DollarSign,
  Award,
  Leaf,
  Factory,
  BadgeCheck,
  Biohazard,
  Target,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const megaMenuData = {
    main: {
      title: language === "el" ? "Κύρια" : "Main",
      icon: Home,
      color: "text-blue-600",
      items: [
        {
          id: "comprehensive-dashboard",
          title: language === "el" ? "Κέντρο Ελέγχου" : "Control Center",
          description:
            language === "el"
              ? "Κεντρικό dashboard με live μετρήσεις"
              : "Main dashboard with live metrics",
          icon: Home,
          isPremium: false,
        },
        {
          id: "basics",
          title:
            language === "el" ? "Στοιχεία Προϊόντος" : "Product Information",
          description:
            language === "el"
              ? "Βασικές πληροφορίες προϊόντος"
              : "Basic product information",
          icon: Fish,
          isPremium: false,
        },
        {
          id: "processing",
          title:
            language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases",
          description:
            language === "el"
              ? "Διαχείριση φάσεων επεξεργασίας"
              : "Processing phase management",
          icon: Settings,
          isPremium: false,
        },
        {
          id: "costs",
          title: language === "el" ? "Διαχείριση Κόστων" : "Cost Management",
          description:
            language === "el"
              ? "Υπολογισμός και ανάλυση κόστους"
              : "Cost calculation and analysis",
          icon: Calculator,
          isPremium: false,
        },
        {
          id: "transport",
          title: language === "el" ? "Κόστη Μεταφοράς" : "Transport Costs",
          description:
            language === "el"
              ? "Διαχείριση κόστων μεταφοράς"
              : "Transport cost management",
          icon: Truck,
          isPremium: false,
        },
      ],
    },
    operations: {
      title: language === "el" ? "Λειτουργίες" : "Operations",
      icon: Settings,
      color: "text-green-600",
      items: [
        {
          id: "fleet-management",
          title: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
          description:
            language === "el"
              ? "Παρακολούθηση και διαχείριση στόλου"
              : "Fleet tracking and management",
          icon: Globe,
          isPremium: true,
        },
        {
          id: "inventory-management",
          title:
            language === "el"
              ? "Διαχείριση Αποθέματος"
              : "Inventory Management",
          description:
            language === "el"
              ? "Έλεγχος αποθέματος και stock"
              : "Stock and inventory control",
          icon: Boxes,
          isPremium: true,
        },
        {
          id: "order-management",
          title:
            language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management",
          description:
            language === "el"
              ? "Επεξεργασία παραγγελιών πελατών"
              : "Customer order processing",
          icon: ShoppingCart,
          isPremium: true,
        },
        {
          id: "customer-management",
          title:
            language === "el" ? "Διαχείριση Πελατών" : "Customer Management",
          description:
            language === "el"
              ? "CRM και διαχείριση πελατών"
              : "CRM and customer management",
          icon: Users,
          isPremium: true,
        },
        {
          id: "supplier-management",
          title:
            language === "el"
              ? "Διαχείριση Προμηθευτών"
              : "Supplier Management",
          description:
            language === "el"
              ? "Διαχείριση προμηθευτών και συμβολαίων"
              : "Supplier and contract management",
          icon: Factory,
          isPremium: true,
        },
      ],
    },
    analytics: {
      title: language === "el" ? "Αναλυτικά" : "Analytics",
      icon: BarChart3,
      color: "text-purple-600",
      items: [
        {
          id: "analysis",
          title:
            language === "el" ? "Αναλυτικά Αποτελέσματα" : "Detailed Analysis",
          description:
            language === "el"
              ? "Εις βάθος ανάλυση δεδομένων"
              : "In-depth data analysis",
          icon: BarChart3,
          isPremium: false,
        },
        {
          id: "advanced-analysis",
          title:
            language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
          description:
            language === "el"
              ? "Εξειδικευμένα analytics και reports"
              : "Specialized analytics and reports",
          icon: PieChart,
          isPremium: true,
        },
        {
          id: "financial-ratios",
          title:
            language === "el"
              ? "Χρηματοοικονομικοί Δείκτες"
              : "Financial Ratios",
          description:
            language === "el"
              ? "Ανάλυση χρηματοοικονομικών δεικτών"
              : "Financial ratio analysis",
          icon: Activity,
          isPremium: true,
        },
        {
          id: "market-trends",
          title: language === "el" ? "Τάσεις Αγοράς" : "Market Trends",
          description:
            language === "el"
              ? "Ανάλυση τάσεων και προβλέψεις"
              : "Trend analysis and forecasting",
          icon: TrendingUp,
          isPremium: true,
        },
        {
          id: "financial-analytics",
          title:
            language === "el"
              ? "Χρηματοοικονομικά Analytics"
              : "Financial Analytics",
          description:
            language === "el"
              ? "Προχωρημένα χρηματοοικονομικά analytics"
              : "Advanced financial analytics",
          icon: DollarSign,
          isPremium: true,
        },
      ],
    },
    advanced: {
      title: language === "el" ? "Προχωρημένα" : "Advanced",
      icon: Zap,
      color: "text-orange-600",
      items: [
        {
          id: "business-intelligence",
          title: "Business Intelligence",
          description:
            language === "el"
              ? "AI-powered επιχειρηματική νοημοσύνη"
              : "AI-powered business intelligence",
          icon: Zap,
          isPremium: true,
        },
        {
          id: "operations-center",
          title: language === "el" ? "Κέντρο Λειτουργιών" : "Operations Center",
          description:
            language === "el"
              ? "Real-time παρακολούθηση λειτουργιών"
              : "Real-time operations monitoring",
          icon: Activity,
          isPremium: true,
        },
        {
          id: "scenario-analysis",
          title: language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis",
          description:
            language === "el"
              ? "Προσομοίωση και ανάλυση σεναρίων"
              : "Simulation and scenario analysis",
          icon: Target,
          isPremium: true,
        },
        {
          id: "forecast-revenue",
          title: language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecast",
          description:
            language === "el"
              ? "ML-powered προβλέψεις εσόδων"
              : "ML-powered revenue forecasting",
          icon: TrendingUp,
          isPremium: true,
        },
      ],
    },
    compliance: {
      title: language === "el" ? "Συμμόρφωση" : "Compliance",
      icon: Shield,
      color: "text-red-600",
      items: [
        {
          id: "haccp-module",
          title: language === "el" ? "Μονάδα HACCP" : "HACCP Module",
          description:
            language === "el"
              ? "Διαχείριση HACCP και κρίσιμων σημείων"
              : "HACCP and critical control points",
          icon: Biohazard,
          isPremium: false,
        },
        {
          id: "iso-standards",
          title: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
          description:
            language === "el"
              ? "Διαχείριση προτύπων ISO 22000"
              : "ISO 22000 standards management",
          icon: BadgeCheck,
          isPremium: false,
        },
        {
          id: "quality-compliance",
          title:
            language === "el"
              ? "Ποιότητα & Συμμόρφωση"
              : "Quality & Compliance",
          description:
            language === "el"
              ? "Κέντρο ελέγχου ποιότητας"
              : "Quality control center",
          icon: Award,
          isPremium: true,
        },
        {
          id: "sustainability-tracking",
          title: language === "el" ? "Βιωσιμότητα" : "Sustainability",
          description:
            language === "el"
              ? "Παρακολούθηση βιωσιμότητας"
              : "Sustainability tracking",
          icon: Leaf,
          isPremium: true,
        },
      ],
    },
    reports: {
      title: language === "el" ? "Αναφορές" : "Reports",
      icon: FileText,
      color: "text-indigo-600",
      items: [
        {
          id: "reports-center",
          title: language === "el" ? "Κέντρο Αναφορών" : "Reports Center",
          description:
            language === "el"
              ? "Δημιουργία και διαχείριση αναφορών"
              : "Report generation and management",
          icon: FileText,
          isPremium: true,
        },
        {
          id: "document-management",
          title:
            language === "el" ? "Διαχείριση Εγγράφων" : "Document Management",
          description:
            language === "el"
              ? "Αρχειοθέτηση και διαχείριση εγγράφων"
              : "Document archiving and management",
          icon: BookOpen,
          isPremium: true,
        },
      ],
    },
  };

  const isItemDisabled = (item: any) => {
    return item.isPremium && !isPremium;
  };

  const handleItemClick = (itemId: string) => {
    setActiveTab(itemId);
    setHoveredCategory(null);
  };

  return (
    <div className={cn("hidden lg:block", className)}>
      <div className="flex items-center gap-1">
        {Object.entries(megaMenuData).map(([categoryKey, category]) => {
          const Icon = category.icon;

          return (
            <div
              key={categoryKey}
              className="relative"
              onMouseEnter={() => setHoveredCategory(categoryKey)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Button
                variant="ghost"
                className="h-12 px-4 text-sm font-medium hover:bg-gray-50"
              >
                <Icon className={cn("w-4 h-4 mr-2", category.color)} />
                {category.title}
              </Button>

              {hoveredCategory === categoryKey && (
                <div
                  className="absolute top-full left-0 z-50 mt-1"
                  style={{ minWidth: "600px" }}
                >
                  <Card className="shadow-xl border border-gray-200 bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3
                          className={cn(
                            "text-lg font-semibold flex items-center gap-2",
                            category.color,
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === "el"
                            ? `Εργαλεία και λειτουργίες για ${category.title.toLowerCase()}`
                            : `Tools and features for ${category.title.toLowerCase()}`}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {category.items.map((item) => {
                          const ItemIcon = item.icon;
                          const isActive = activeTab === item.id;
                          const isDisabled = isItemDisabled(item);

                          return (
                            <Button
                              key={item.id}
                              variant="ghost"
                              className={cn(
                                "h-auto p-4 justify-start text-left relative hover:bg-gray-50",
                                isActive && "bg-blue-50 border border-blue-200",
                                isDisabled && "opacity-50 cursor-not-allowed",
                              )}
                              onClick={() =>
                                !isDisabled && handleItemClick(item.id)
                              }
                              disabled={isDisabled}
                            >
                              <div className="flex items-start gap-3 w-full">
                                <div
                                  className={cn(
                                    "p-2 rounded-lg",
                                    isActive ? "bg-blue-100" : "bg-gray-100",
                                  )}
                                >
                                  <ItemIcon
                                    className={cn(
                                      "w-4 h-4",
                                      isActive
                                        ? "text-blue-600"
                                        : "text-gray-600",
                                    )}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900 text-sm">
                                      {item.title}
                                    </h4>
                                    {item.isPremium && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        <Crown className="w-3 h-3 mr-1" />
                                        Pro
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>

                      {/* Premium upgrade section for non-premium users */}
                      {!isPremium &&
                        category.items.some((item) => item.isPremium) && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-blue-900">
                                  {language === "el"
                                    ? "Αναβάθμιση σε Premium"
                                    : "Upgrade to Premium"}
                                </h5>
                                <p className="text-xs text-blue-700">
                                  {language === "el"
                                    ? "Ξεκλειδώστε όλες τις προχωρημένες λειτουργίες"
                                    : "Unlock all advanced features"}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                {language === "el" ? "Αναβάθμιση" : "Upgrade"}
                              </Button>
                            </div>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MegaMenu;
