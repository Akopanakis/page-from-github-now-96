import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Menu,
  X,
  Home,
  Calculator,
  BarChart3,
  Settings,
  Search,
  Star,
  Clock,
  Bookmark,
  Grid,
  List,
  Filter,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Phone,
  Tablet,
  Monitor,
  Smartphone,
} from "lucide-react";

interface MobileEnhancementsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  children?: React.ReactNode;
  className?: string;
}

const MobileEnhancements: React.FC<MobileEnhancementsProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  children,
  className = "",
}) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  // Detect device type and orientation
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(height > width ? "portrait" : "landscape");
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Quick navigation items for mobile
  const quickNavItems = [
    {
      id: "comprehensive-dashboard",
      name: language === "el" ? "Κεντρικός" : "Dashboard",
      icon: Home,
      isPremium: false,
    },
    {
      id: "costs",
      name: language === "el" ? "Κόστη" : "Costs",
      icon: Calculator,
      isPremium: false,
    },
    {
      id: "analysis",
      name: language === "el" ? "Ανάλυση" : "Analysis",
      icon: BarChart3,
      isPremium: false,
    },
    {
      id: "market-intelligence",
      name: language === "el" ? "Market" : "Market",
      icon: BarChart3,
      isPremium: true,
    },
    {
      id: "settings",
      name: language === "el" ? "Ρυθμίσεις" : "Settings",
      icon: Settings,
      isPremium: false,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderMobileHeader = () => (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                {language === "el" ? "Πλοήγηση" : "Navigation"}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {quickNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(item.id);
                    setShowMobileMenu(false);
                  }}
                  disabled={item.isPremium && !isPremium}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                  {item.isPremium && !isPremium && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      Pro
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="ml-3 text-lg font-semibold truncate">KostoPro</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderMobileBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around">
        {quickNavItems.slice(0, 4).map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            size="sm"
            className="flex-col h-12 px-2"
            onClick={() => setActiveTab(item.id)}
            disabled={item.isPremium && !isPremium}
          >
            <item.icon className="w-4 h-4 mb-1" />
            <span className="text-xs truncate">{item.name}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="flex-col h-12 px-2"
          onClick={() => setShowMobileMenu(true)}
        >
          <Grid className="w-4 h-4 mb-1" />
          <span className="text-xs">{language === "el" ? "Όλα" : "More"}</span>
        </Button>
      </div>
    </div>
  );

  const renderTabletView = () => (
    <div className="flex h-screen">
      {/* Sidebar for tablet */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">KostoPro</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {quickNavItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
              disabled={item.isPremium && !isPremium}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
              {item.isPremium && !isPremium && (
                <Badge variant="outline" className="ml-auto text-xs">
                  Pro
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Main content for tablet */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );

  const renderDesktopView = () => (
    <div className="min-h-screen bg-gray-50">{children}</div>
  );

  const renderMobileOptimizedContent = () => (
    <div className="pb-16">
      {" "}
      {/* Add padding for bottom nav */}
      <div className="px-4 py-4 space-y-4">
        {/* Mobile-optimized cards */}
        <div className="space-y-4">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Back to top button
  const backToTopButton = showBackToTop && (
    <Button
      className="fixed bottom-20 right-4 z-40 rounded-full w-12 h-12 shadow-lg"
      onClick={scrollToTop}
      size="sm"
    >
      <ArrowUp className="w-4 h-4" />
    </Button>
  );

  // Device-specific rendering
  if (isMobile) {
    return (
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        {renderMobileHeader()}
        {renderMobileOptimizedContent()}
        {renderMobileBottomNav()}
        {backToTopButton}
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className={className}>
        {renderTabletView()}
        {backToTopButton}
      </div>
    );
  }

  return (
    <div className={className}>
      {renderDesktopView()}
      {backToTopButton}
    </div>
  );
};

// Hook for mobile detection
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile, isTablet, isDesktop: !isMobile && !isTablet };
};

// Mobile-optimized card component
export const MobileCard: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
}> = ({ title, children, className = "", collapsible = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isMobile } = useMobile();

  if (!isMobile && !collapsible) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader
        className={collapsible ? "cursor-pointer" : ""}
        onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
      >
        <CardTitle className="flex items-center justify-between">
          {title}
          {collapsible && (
            <Button variant="ghost" size="sm">
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      {(!collapsible || !isCollapsed) && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default MobileEnhancements;
