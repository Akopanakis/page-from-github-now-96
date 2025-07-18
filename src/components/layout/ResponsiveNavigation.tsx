import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { safeGetJSON, safeSetJSON } from "@/utils/safeStorage";
import {
  Menu,
  Home,
  Calculator,
  BarChart3,
  Target,
  TrendingUp,
  Globe,
  Settings,
  Crown,
  Grid,
  Search,
  X,
  ChevronRight,
  Star,
  Clock,
  Bookmark,
  Fish,
  Building,
  Users,
  Truck,
  Shield,
  DollarSign,
  Activity,
  Brain,
  TestTube,
} from "lucide-react";

interface ResponsiveNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

interface NavigationItem {
  id: string;
  name: string;
  icon: any;
  isPremium?: boolean;
  isNew?: boolean;
  category: string;
  shortName?: string;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [recentItems, setRecentItems] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation items organized by category
  const navigationItems: NavigationItem[] = [
    // Core Features
    {
      id: "comprehensive-dashboard",
      name: language === "el" ? "Κεντρικός Πίνακας" : "Main Dashboard",
      shortName: language === "el" ? "Κεντρικός" : "Main",
      icon: Home,
      category: "core",
    },
    {
      id: "basics",
      name: language === "el" ? "Βασικά Στοιχεία" : "Product Basics",
      shortName: language === "el" ? "Βασικά" : "Basics",
      icon: Fish,
      category: "core",
    },
    {
      id: "costs",
      name: language === "el" ? "Κόστη" : "Costs",
      shortName: language === "el" ? "Κόστη" : "Costs",
      icon: Calculator,
      category: "core",
    },
    {
      id: "analysis",
      name: language === "el" ? "Ανάλυση" : "Analysis",
      shortName: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      category: "core",
    },

    // Premium Features
    {
      id: "market-intelligence",
      name: language === "el" ? "Market Intelligence" : "Market Intelligence",
      shortName: language === "el" ? "Market" : "Market",
      icon: Globe,
      isPremium: true,
      isNew: true,
      category: "premium",
    },
    {
      id: "scenario-analysis",
      name: language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis",
      shortName: language === "el" ? "Σενάρια" : "Scenarios",
      icon: Target,
      isPremium: true,
      isNew: true,
      category: "premium",
    },
    {
      id: "forecast-revenue",
      name: language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecasting",
      shortName: language === "el" ? "Πρόβλεψη" : "Forecast",
      icon: TrendingUp,
      isPremium: true,
      isNew: true,
      category: "premium",
    },

    // Operations
    {
      id: "fleet-management",
      name: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
      shortName: language === "el" ? "Στόλος" : "Fleet",
      icon: Truck,
      isPremium: true,
      category: "operations",
    },
    {
      id: "inventory-management",
      name: language === "el" ? "Διαχείριση Αποθεμάτων" : "Inventory",
      shortName: language === "el" ? "Αποθέματα" : "Inventory",
      icon: Building,
      category: "operations",
    },
    {
      id: "customer-management",
      name: language === "el" ? "Διαχείριση Πελατών" : "Customers",
      shortName: language === "el" ? "Πελάτες" : "Customers",
      icon: Users,
      category: "operations",
    },

    // Compliance
    {
      id: "haccp-module",
      name: language === "el" ? "HACCP" : "HACCP",
      shortName: "HACCP",
      icon: Shield,
      category: "compliance",
    },
    {
      id: "iso-standards",
      name: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
      shortName: "ISO",
      icon: Shield,
      category: "compliance",
    },

    // System
    {
      id: "enhanced-navigation",
      name: language === "el" ? "Πλοήγηση" : "Navigation",
      shortName: language === "el" ? "Πλοήγηση" : "Nav",
      icon: Grid,
      category: "system",
    },
    {
      id: "test",
      name: language === "el" ? "Δοκιμή" : "Test",
      shortName: language === "el" ? "Δοκιμή" : "Test",
      icon: TestTube,
      category: "system",
    },
  ];

  // Quick access items for mobile bottom nav
  const quickAccessItems = navigationItems.filter((item) =>
    [
      "comprehensive-dashboard",
      "costs",
      "analysis",
      "market-intelligence",
      "enhanced-navigation",
    ].includes(item.id),
  );

  const handleNavigation = (itemId: string) => {
    setActiveTab(itemId);
    setShowSidebar(false);

    // Add to recent items
    setRecentItems((prev) => {
      const updated = [itemId, ...prev.filter((id) => id !== itemId)].slice(
        0,
        5,
      );
      safeSetJSON("recent-navigation", updated);
      return updated;
    });
  };

  // Load recent items
  useEffect(() => {
    const saved = safeGetJSON("recent-navigation", []);
    setRecentItems(saved);
  }, []);

  // Mobile Bottom Navigation
  const renderMobileBottomNav = () => {
    if (!isMobile) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1 z-50 safe-area-pb">
        <div className="flex justify-around">
          {quickAccessItems.map((item) => {
            const isActive = activeTab === item.id;
            const canAccess = !item.isPremium || isPremium;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className="flex-col h-12 px-2 min-w-0 flex-1"
                onClick={() => canAccess && handleNavigation(item.id)}
                disabled={!canAccess}
              >
                <item.icon className="w-4 h-4 mb-1" />
                <span className="text-xs truncate max-w-full">
                  {item.shortName || item.name}
                </span>
                {item.isPremium && !isPremium && (
                  <Crown className="w-2 h-2 absolute top-1 right-1 text-yellow-500" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  // Mobile Sidebar
  const renderMobileSidebar = () => (
    <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Grid className="w-5 h-5 mr-2" />
            KostoPro
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Recent Items */}
          {recentItems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {language === "el" ? "Πρόσφατα" : "Recent"}
              </h4>
              <div className="space-y-1">
                {recentItems.slice(0, 3).map((itemId) => {
                  const item = navigationItems.find((i) => i.id === itemId);
                  if (!item) return null;

                  return (
                    <Button
                      key={itemId}
                      variant={activeTab === itemId ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleNavigation(itemId)}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation by Category */}
          {[
            { key: "core", name: language === "el" ? "Βασικά" : "Core" },
            { key: "premium", name: language === "el" ? "Premium" : "Premium" },
            {
              key: "operations",
              name: language === "el" ? "Λειτουργίες" : "Operations",
            },
            {
              key: "compliance",
              name: language === "el" ? "Συμμόρφωση" : "Compliance",
            },
            { key: "system", name: language === "el" ? "Σύστημα" : "System" },
          ].map((category) => {
            const categoryItems = navigationItems.filter(
              (item) => item.category === category.key,
            );
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.key}>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {category.name}
                </h4>
                <div className="space-y-1">
                  {categoryItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const canAccess = !item.isPremium || isPremium;

                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => canAccess && handleNavigation(item.id)}
                        disabled={!canAccess}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.name}
                        <div className="ml-auto flex items-center space-x-1">
                          {item.isNew && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-green-50 text-green-700"
                            >
                              New
                            </Badge>
                          )}
                          {item.isPremium && (
                            <Crown className="w-3 h-3 text-yellow-500" />
                          )}
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop Top Navigation
  const renderDesktopNav = () => {
    if (isMobile) return null;

    return (
      <div className="hidden md:flex items-center space-x-1">
        {quickAccessItems.map((item) => {
          const isActive = activeTab === item.id;
          const canAccess = !item.isPremium || isPremium;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className="flex items-center"
              onClick={() => canAccess && handleNavigation(item.id)}
              disabled={!canAccess}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.shortName || item.name}
              {item.isPremium && (
                <Crown className="w-3 h-3 ml-2 text-yellow-500" />
              )}
              {item.isNew && (
                <Badge
                  variant="outline"
                  className="ml-2 text-xs bg-green-50 text-green-700"
                >
                  New
                </Badge>
              )}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleNavigation("enhanced-navigation")}
          className="flex items-center"
        >
          <Grid className="w-4 h-4 mr-2" />
          {language === "el" ? "Όλα" : "All"}
        </Button>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Mobile Sidebar Trigger & Desktop Navigation */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {renderMobileSidebar()}
          <h1 className="text-xl font-bold text-gray-900">KostoPro</h1>
        </div>

        {renderDesktopNav()}

        <div className="flex items-center space-x-2">
          {isPremium && (
            <Badge
              variant="outline"
              className="bg-yellow-50 text-yellow-700 border-yellow-200"
            >
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation("test")}
            className="hidden lg:flex"
          >
            <TestTube className="w-4 h-4 mr-2" />
            Test
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {renderMobileBottomNav()}
    </div>
  );
};

export default ResponsiveNavigation;
