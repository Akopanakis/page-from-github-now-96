import React from "react";
import {
  Home,
  Calculator,
  BarChart3,
  Settings,
  User,
  Plus,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface BottomNavigationProps {
  className?: string;
}

const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    path: "/",
    badge: null,
  },
  {
    id: "calculate",
    label: "Calculate",
    icon: Calculator,
    path: "/calculate",
    badge: null,
  },
  {
    id: "add",
    label: "Add",
    icon: Plus,
    path: "/add",
    badge: null,
    isSpecial: true,
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/reports",
    badge: "New",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/profile",
    badge: null,
  },
];

export function BottomNavigation({ className = "" }: BottomNavigationProps) {
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/" || location === "/dashboard";
    }
    return location.startsWith(path);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden ${className}`}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setLocation(item.path)}
              className={`
                relative flex flex-col items-center gap-1 p-2 h-auto min-w-0 flex-1
                ${
                  active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }
                ${
                  item.isSpecial
                    ? "bg-blue-600 text-white hover:bg-blue-700 rounded-full mx-2 scale-110"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                }
              `}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 ${item.isSpecial ? "h-6 w-6" : ""}`}
                />
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge.length > 3 ? "!" : item.badge}
                  </Badge>
                )}
              </div>

              <span
                className={`text-xs font-medium truncate ${item.isSpecial ? "hidden" : ""}`}
              >
                {item.label}
              </span>

              {active && !item.isSpecial && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// Quick Actions FAB for mobile
export function QuickActionsFAB() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [, setLocation] = useLocation();

  const quickActions = [
    {
      label: "New Expense",
      icon: Plus,
      action: () => setLocation("/expenses/new"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      label: "Calculate Cost",
      icon: Calculator,
      action: () => setLocation("/calculate"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "View Report",
      icon: FileText,
      action: () => setLocation("/reports"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "Trends",
      icon: TrendingUp,
      action: () => setLocation("/trends"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40 md:hidden">
      {/* Quick Action Buttons */}
      <div
        className={`
        flex flex-col gap-3 mb-3 transition-all duration-300 transform
        ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}
      `}
      >
        {quickActions.map((action, index) => (
          <Button
            key={index}
            size="sm"
            className={`
              ${action.color} text-white shadow-lg hover:shadow-xl
              transform transition-all duration-200 hover:scale-105
              flex items-center gap-2 min-w-0 px-3 py-2
            `}
            onClick={() => {
              action.action();
              setIsOpen(false);
            }}
          >
            <action.icon className="h-4 w-4" />
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className={`
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
          text-white shadow-lg hover:shadow-xl transform transition-all duration-200
          rounded-full w-14 h-14 p-0
          ${isOpen ? "rotate-45 scale-110" : "hover:scale-105"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
