import React from "react";
import { BottomNavigation, QuickActionsFAB } from "./BottomNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Menu, Bell, Search, Fish, User, Settings, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showBottomNav?: boolean;
  showFAB?: boolean;
}

export function MobileLayout({
  children,
  title = "KostoPro",
  showHeader = true,
  showBottomNav = true,
  showFAB = true,
}: MobileLayoutProps) {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [notifications] = React.useState(3); // Mock notifications count

  const menuItems = [
    {
      label: "Dashboard",
      icon: Fish,
      action: () => setLocation("/"),
    },
    {
      label: "Profile",
      icon: User,
      action: () => setLocation("/profile"),
    },
    {
      label: "Settings",
      icon: Settings,
      action: () => setLocation("/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      {showHeader && (
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left Side - Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Fish className="h-6 w-6 text-blue-600" />
                    KostoPro
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 space-y-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={item.action}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-3 py-2">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Center - Title */}
            <h1 className="font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </h1>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Button variant="ghost" size="sm" className="p-2">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="p-2 relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user && (
                    <>
                      <div className="px-2 py-1.5 text-sm font-medium">
                        {user.name || user.email}
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => setLocation("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`
        ${showHeader ? "pt-0" : ""} 
        ${showBottomNav ? "pb-16" : ""} 
        min-h-screen
      `}
      >
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && <BottomNavigation />}

      {/* Floating Action Button */}
      {showFAB && <QuickActionsFAB />}
    </div>
  );
}

// Responsive Container Component
export function ResponsiveContainer({
  children,
  className = "",
  maxWidth = "max-w-7xl",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`}
    >
      {children}
    </div>
  );
}

// Mobile-First Card Grid
export function MobileCardGrid({
  children,
  className = "",
  cols = { sm: 1, md: 2, lg: 3 },
}: {
  children: React.ReactNode;
  className?: string;
  cols?: { sm: number; md: number; lg: number; xl?: number };
}) {
  const gridCols = `grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}${cols.xl ? ` xl:grid-cols-${cols.xl}` : ""}`;

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>{children}</div>
  );
}

// Mobile Optimized Section
export function MobileSection({
  children,
  title,
  subtitle,
  action,
  className = "",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-6 ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {action}
          </div>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
