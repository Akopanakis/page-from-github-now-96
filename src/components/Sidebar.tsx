import React, { useState } from "react";
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
  const { language } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: "basics",
      label: language === "el" ? "Βασικά Στοιχεία" : "Basic Info",
      icon: Fish,
      category: "main",
      description:
        language === "el" ? "Πληροφορίες προϊόντος" : "Product information",
    },
    {
      id: "processing",
      label: language === "el" ? "Επεξεργασία" : "Processing",
      icon: Settings,
      category: "main",
      description:
        language === "el" ? "��άσεις επεξεργασίας" : "Processing phases",
    },
    {
      id: "costs",
      label: language === "el" ? "Κόστη" : "Costs",
      icon: Calculator,
      category: "main",
      description: language === "el" ? "Διαχείριση κόστων" : "Cost management",
    },
    {
      id: "transport",
      label: language === "el" ? "Μεταφορά" : "Transport",
      icon: Truck,
      category: "main",
      description: language === "el" ? "Κόστη μεταφοράς" : "Transport costs",
    },
    {
      id: "analysis",
      label: language === "el" ? "Ανάλυση" : "Analysis",
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
      id: "dashboard",
      label: language === "el" ? "Dashboard" : "Dashboard",
      icon: LineChart,
      category: "dashboard",
      isPremium: true,
      description: language === "el" ? "Επισκ��πηση KPI" : "KPI overview",
    },
    {
      id: "executive-dashboard",
      label: language === "el" ? "Executive Dashboard" : "Executive Dashboard",
      icon: Crown,
      category: "dashboard",
      isPremium: true,
      description:
        language === "el" ? "Διοικητική επισκόπηση" : "Executive overview",
    },
    {
      id: "financial-ratios",
      label:
        language === "el" ? "Χρηματοοικονομικοί Δείκτες" : "Financial Ratios",
      icon: BarChart3,
      category: "analysis",
      isPremium: true,
      description:
        language === "el" ? "Αναλυτικοί δείκτες" : "Financial analytics",
    },
    {
      id: "market-trends",
      label: language === "el" ? "Τάσεις Αγοράς" : "Market Trends",
      icon: TrendingUp,
      category: "analysis",
      isPremium: true,
      description:
        language === "el" ? "Οικονομική ανάλυση" : "Economic analysis",
    },
    {
      id: "inventory",
      label: language === "el" ? "Απόθεμα" : "Inventory",
      icon: Boxes,
      category: "premium",
      isPremium: true,
      description:
        language === "el" ? "Διαχείριση αποθέματος" : "Inventory management",
    },
    {
      id: "market",
      label: language === "el" ? "Αγορά" : "Market",
      icon: Globe,
      category: "premium",
      isPremium: true,
      description: language === "el" ? "Ανάλυση αγοράς" : "Market analysis",
    },
    {
      id: "scenario",
      label: language === "el" ? "Σενάρια" : "Scenarios",
      icon: Target,
      category: "premium",
      isPremium: true,
      description: language === "el" ? "Ανάλυση σεναρίων" : "Scenario analysis",
    },
    {
      id: "forecast",
      label: language === "el" ? "Πρόβλεψη" : "Forecast",
      icon: TrendingUp,
      category: "premium",
      isPremium: true,
      description: language === "el" ? "Πρόβλεψη εσόδων" : "Revenue forecast",
    },
    {
      id: "financial",
      label: language === "el" ? "Χρηματοοικονομικά" : "Financial",
      icon: DollarSign,
      category: "premium",
      isPremium: true,
      description:
        language === "el" ? "Χρηματοοικονομικά μοντέλα" : "Financial models",
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
      label: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
    },
    {
      id: "dashboard",
      label: language === "el" ? "Dashboard" : "Dashboard",
      icon: LineChart,
    },
    {
      id: "premium",
      label: language === "el" ? "Premium" : "Premium",
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
          w-full justify-start h-auto p-3 mb-1 transition-all duration-200
          ${isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : ""}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 hover:shadow-md"}
          ${isCollapsed ? "px-2" : "px-3"}
        `}
        onClick={() => !isDisabled && setActiveTab(item.id)}
        disabled={isDisabled}
      >
        <div className="flex items-center w-full">
          <Icon
            className={`${isCollapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} flex-shrink-0`}
          />
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.label}</span>
                {item.isPremium && (
                  <Crown className="w-3 h-3 text-yellow-500 ml-2" />
                )}
              </div>
              <div className="text-xs opacity-70 mt-0.5">
                {item.description}
              </div>
            </div>
          )}
        </div>
      </Button>
    );
  };

  return (
    <Card
      className={`${className} h-full overflow-hidden shadow-xl border-r-2 border-gray-200`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <Fish className="w-6 h-6" />
                <div>
                  <h2 className="font-bold text-lg">KostoPro</h2>
                  <p className="text-xs opacity-80">
                    {language === "el" ? "Πλοήγηση" : "Navigation"}
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-white/20 p-1"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
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
                {!isCollapsed && (
                  <div className="flex items-center space-x-2 px-2 py-2 text-sm font-semibold text-gray-600">
                    <category.icon className="w-4 h-4" />
                    <span>{category.label}</span>
                    {category.id === "premium" && !isPremium && (
                      <Badge
                        variant="outline"
                        className="text-xs border-yellow-500 text-yellow-600"
                      >
                        {language === "el" ? "Απαιτείται" : "Required"}
                      </Badge>
                    )}
                  </div>
                )}

                {isCollapsed && (
                  <div className="flex justify-center py-1 mb-2">
                    <category.icon className="w-4 h-4 text-gray-600" />
                  </div>
                )}

                <div className="space-y-1">
                  {categoryItems.map(renderNavigationItem)}
                </div>

                {!isCollapsed && <Separator className="mt-3" />}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          {!isCollapsed ? (
            <div className="space-y-2">
              {!isPremium && (
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">
                      {language === "el"
                        ? "Αναβάθμιση Premium"
                        : "Upgrade Premium"}
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 mb-2">
                    {language === "el"
                      ? "Ξεκλειδώστε όλες τις δυνατότητες"
                      : "Unlock all features"}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {language === "el" ? "Αναβάθμιση" : "Upgrade"}
                  </Button>
                </div>
              )}

              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  {language === "el" ? "Βοήθεια" : "Help"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Crown className="w-4 h-4 text-purple-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <HelpCircle className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
