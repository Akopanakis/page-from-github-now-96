import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, List, Grid, ArrowUp, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PageNavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
}

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  pageNavItems?: PageNavItem[];
  showTOC?: boolean;
  breadcrumbItems?: Array<{ id: string; label: string; isActive?: boolean }>;
  onNavigate?: (href: string) => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  className = "",
  pageNavItems = [],
  showTOC = false,
  breadcrumbItems = [],
  onNavigate,
}) => {
  const { language } = useLanguage();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocItems, setTocItems] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [isPageNavOpen, setIsPageNavOpen] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate TOC from headings
  useEffect(() => {
    if (showTOC) {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const items = Array.from(headings).map((heading, index) => {
        // Generate unique ID using timestamp to avoid duplicates
        const timestamp = Date.now();
        const id = heading.id || `heading-${timestamp}-${index}`;
        if (!heading.id) {
          heading.id = id;
        }

        return {
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        };
      });

      setTocItems(items);
    }
  }, [showTOC, children]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbItems.length > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} onNavigate={onNavigate} />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Page-specific navigation sidebar */}
          {pageNavItems.length > 0 && (
            <>
              {/* Mobile toggle */}
              <div className="lg:hidden fixed top-20 left-4 z-50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPageNavOpen(!isPageNavOpen)}
                  className="bg-white shadow-lg"
                >
                  {isPageNavOpen ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Menu className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Desktop sidebar */}
              <div className="hidden lg:block w-64 sticky top-4 self-start">
                <Card className="h-fit max-h-screen overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <List className="w-4 h-4" />
                      {language === "el" ? "Περιεχόμενα" : "Contents"}
                    </h3>
                    <nav className="space-y-1">
                      {pageNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => onNavigate?.(item.href)}
                            className="w-full flex items-center justify-between p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-left"
                          >
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className="w-4 h-4" />}
                              {item.label}
                            </div>
                            {item.badge && (
                              <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile sidebar overlay */}
              {isPageNavOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
                  <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {language === "el" ? "Περιεχόμενα" : "Contents"}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPageNavOpen(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <ScrollArea className="h-full p-4">
                      <nav className="space-y-1">
                        {pageNavItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                onNavigate?.(item.href);
                                setIsPageNavOpen(false);
                              }}
                              className="w-full flex items-center justify-between p-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-left"
                            >
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className="w-4 h-4" />}
                                {item.label}
                              </div>
                              {item.badge && (
                                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </nav>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="p-6">
              {/* Page header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
              </div>

              {/* Page content */}
              <div className="space-y-6">{children}</div>
            </div>
          </div>

          {/* Table of Contents sidebar */}
          {showTOC && tocItems.length > 0 && (
            <div className="hidden xl:block w-64 sticky top-4 self-start">
              <Card className="h-fit max-h-screen overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Grid className="w-4 h-4" />
                    {language === "el"
                      ? "Πίνακας Περιεχομένων"
                      : "Table of Contents"}
                  </h3>
                  <ScrollArea className="max-h-96">
                    <nav className="space-y-1">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`
                            w-full text-left p-1 text-sm text-gray-600 hover:text-blue-600 transition-colors
                            ${item.level === 1 ? "font-medium" : ""}
                            ${item.level === 2 ? "ml-2" : ""}
                            ${item.level === 3 ? "ml-4" : ""}
                            ${item.level >= 4 ? "ml-6" : ""}
                          `}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-12 h-12 rounded-full shadow-lg z-50 p-0"
          aria-label={
            language === "el" ? "Επιστροφή στην κορυφή" : "Back to top"
          }
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default PageLayout;
