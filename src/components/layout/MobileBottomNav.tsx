import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Calculator,
  BarChart3,
  FileText,
  Menu,
  Home,
  Package,
  Users,
  Settings,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  className?: string;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [showDrawer, setShowDrawer] = useState(false);

  const mainNavItems = [
    {
      id: "comprehensive-dashboard",
      label: language === "el" ? "Αρχική" : "Home",
      icon: Home,
      color: "text-blue-600",
    },
    {
      id: "costs",
      label: language === "el" ? "Κόστος" : "Costs",
      icon: Calculator,
      color: "text-green-600",
    },
    {
      id: "analysis",
      label: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      id: "menu",
      label: language === "el" ? "Μενού" : "Menu",
      icon: Menu,
      color: "text-gray-600",
      action: () => setShowDrawer(true),
    },
  ];

  const drawerNavItems = [
    {
      category: language === "el" ? "Κύρια" : "Main",
      items: [
        {
          id: "basics",
          label: language === "el" ? "Στοιχεία" : "Basics",
          icon: Package,
        },
        {
          id: "processing",
          label: language === "el" ? "Επεξεργασία" : "Processing",
          icon: Settings,
        },
        {
          id: "transport",
          label: language === "el" ? "Μεταφορά" : "Transport",
          icon: FileText,
        },
      ],
    },
    {
      category: language === "el" ? "Λειτουργίες" : "Operations",
      items: [
        {
          id: "fleet-management",
          label: language === "el" ? "Στόλος" : "Fleet",
          icon: Package,
          isPremium: true,
        },
        {
          id: "inventory-management",
          label: language === "el" ? "Απόθεμα" : "Inventory",
          icon: Package,
          isPremium: true,
        },
        {
          id: "order-management",
          label: language === "el" ? "Παραγγελίες" : "Orders",
          icon: FileText,
          isPremium: true,
        },
        {
          id: "customer-management",
          label: language === "el" ? "Πελάτες" : "Customers",
          icon: Users,
          isPremium: true,
        },
      ],
    },
    {
      category: language === "el" ? "Συμμόρφωση" : "Compliance",
      items: [
        { id: "haccp-module", label: "HACCP", icon: FileText },
        { id: "iso-standards", label: "ISO", icon: FileText },
        {
          id: "quality-compliance",
          label: language === "el" ? "Ποιότητα" : "Quality",
          icon: FileText,
          isPremium: true,
        },
      ],
    },
    {
      category: language === "el" ? "Αναλυτικά" : "Analytics",
      items: [
        {
          id: "business-intelligence",
          label: "BI",
          icon: BarChart3,
          isPremium: true,
        },
        {
          id: "financial-analytics",
          label: language === "el" ? "Χρηματοοικονομικά" : "Financial",
          icon: BarChart3,
          isPremium: true,
        },
        {
          id: "operations-center",
          label: language === "el" ? "Λειτουργίες" : "Operations",
          icon: BarChart3,
          isPremium: true,
        },
      ],
    },
  ];

  const handleNavClick = (itemId: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      setActiveTab(itemId);
      setShowDrawer(false);
    }
  };

  const isItemDisabled = (item: any) => {
    return item.isPremium && !isPremium;
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <Card
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm lg:hidden",
          className,
        )}
      >
        <div className="grid grid-cols-4 gap-1 p-2">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "flex flex-col gap-1 h-auto py-2 px-1",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-600",
                )}
                onClick={() => handleNavClick(item.id, item.action)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 z-60 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowDrawer(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg text-gray-900">
                {language === "el" ? "Μενού Πλοήγησης" : "Navigation Menu"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDrawer(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-5rem)] p-4">
              <div className="space-y-6">
                {drawerNavItems.map((section) => (
                  <div key={section.category}>
                    <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wider">
                      {section.category}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        const isDisabled = isItemDisabled(item);

                        return (
                          <Button
                            key={item.id}
                            variant={isActive ? "default" : "outline"}
                            className={cn(
                              "flex flex-col gap-2 h-auto py-3 px-2 relative",
                              isDisabled && "opacity-50 cursor-not-allowed",
                            )}
                            onClick={() =>
                              !isDisabled && handleNavClick(item.id)
                            }
                            disabled={isDisabled}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium text-center leading-tight">
                              {item.label}
                            </span>
                            {item.isPremium && (
                              <Badge
                                variant="secondary"
                                className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4"
                              >
                                Pro
                              </Badge>
                            )}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Premium upgrade prompt */}
              {!isPremium && (
                <Card className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <div className="text-center">
                    <h5 className="font-semibold text-blue-900 mb-2">
                      {language === "el"
                        ? "Αναβάθμιση σε Premium"
                        : "Upgrade to Premium"}
                    </h5>
                    <p className="text-sm text-blue-700 mb-3">
                      {language === "el"
                        ? "Ξεκλειδώστε όλες τις προχωρημένες λειτουργίες"
                        : "Unlock all advanced features"}
                    </p>
                    <Button size="sm" className="w-full">
                      {language === "el" ? "Αναβάθμιση" : "Upgrade Now"}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom navigation */}
      <div className="h-20 lg:hidden" />
    </>
  );
};

export default MobileBottomNav;
