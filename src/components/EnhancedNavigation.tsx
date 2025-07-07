import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  ChevronRight,
  ArrowUp,
  Search,
  Menu,
  X,
  Star,
  Plus,
  Settings,
  Bell,
  User,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import CommandPaletteSystem from "./CommandPaletteSystem";
import MegaMenu from "./layout/MegaMenu";
import MobileBottomNav from "./layout/MobileBottomNav";

interface EnhancedNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
  children: React.ReactNode;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  activeTab,
  setActiveTab,
  isPremium,
  children,
}) => {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [notifications] = useState(3);
  const [favorites] = useState([
    { id: "dashboard", title: language === "el" ? "Dashboard" : "Dashboard" },
    { id: "costs", title: language === "el" ? "Κόστη" : "Costs" },
    { id: "haccp", title: "HACCP" },
  ]);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (path: string) => {
    setLocation(path);
  };

  // Generate breadcrumbs from current location
  const getBreadcrumbs = () => {
    const pathSegments = location.split("/").filter(Boolean);
    const breadcrumbs = [
      { href: "/", label: language === "el" ? "Αρχική" : "Home" },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      // Convert segment to readable label
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === "analytics")
        label = language === "el" ? "Αναλυτικά" : "Analytics";
      if (segment === "compliance")
        label = language === "el" ? "Συμμόρφωση" : "Compliance";
      if (segment === "business-intelligence") label = "Business Intelligence";
      if (segment === "financial")
        label = language === "el" ? "Χρηματοοικονομικά" : "Financial";
      if (segment === "haccp") label = "HACCP";
      if (segment === "iso") label = "ISO Standards";

      breadcrumbs.push({
        href: currentPath,
        label,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">KostoPro</h1>
              </div>

              {/* Desktop Mega Menu */}
              <MegaMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isPremium={isPremium}
              />
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <CommandPaletteSystem onNavigate={handleNavigate} />

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Favorites Bar */}
      {favorites.length > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 mr-3">
                {language === "el" ? "Αγαπημένα" : "Favorites"}:
              </span>
              <div className="flex items-center gap-2">
                {favorites.map((fav) => (
                  <Button
                    key={fav.id}
                    variant={activeTab === fav.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(fav.id)}
                    className="h-7"
                  >
                    {fav.title}
                  </Button>
                ))}
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={crumb.href}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handleNavigate(crumb.href);
                          }}
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPremium={isPremium}
      />

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          className="fixed bottom-24 right-6 z-50 rounded-full shadow-lg lg:bottom-6"
          size="sm"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}

      {/* Global Keyboard Shortcuts Help */}
      <div className="hidden lg:block fixed bottom-6 left-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border p-3 max-w-xs opacity-75 hover:opacity-100 transition-opacity">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">
            {language === "el" ? "Συντομεύσεις" : "Shortcuts"}
          </h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Search</span>
              <kbd className="px-1 bg-gray-100 rounded">⌘K</kbd>
            </div>
            <div className="flex justify-between">
              <span>Dashboard</span>
              <kbd className="px-1 bg-gray-100 rounded">⌘D</kbd>
            </div>
            <div className="flex justify-between">
              <span>Costs</span>
              <kbd className="px-1 bg-gray-100 rounded">⌘C</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNavigation;
