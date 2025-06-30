import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  id: string;
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = "",
}) => {
  const { language } = useLanguage();

  const getTabLabel = (tabId: string) => {
    const labels: { [key: string]: { el: string; en: string } } = {
      basics: { el: "Βασικά Στοιχεία", en: "Basic Info" },
      processing: { el: "Επεξεργασία", en: "Processing" },
      costs: { el: "Κόστη", en: "Costs" },
      transport: { el: "Μεταφορά", en: "Transport" },
      analysis: { el: "Ανάλυση", en: "Analysis" },
      "advanced-analysis": {
        el: "Προχωρημένη Ανάλυση",
        en: "Advanced Analysis",
      },
      dashboard: { el: "Dashboard", en: "Dashboard" },
      inventory: { el: "Απόθεμα", en: "Inventory" },
      market: { el: "Αγορά", en: "Market" },
      scenario: { el: "Σενάρια", en: "Scenarios" },
      forecast: { el: "Πρόβλεψη", en: "Forecast" },
      financial: { el: "Χρηματοοικονομικά", en: "Financial" },
    };

    return labels[tabId]?.[language as "el" | "en"] || tabId;
  };

  const breadcrumbItems = [
    {
      id: "home",
      label: language === "el" ? "Αρχική" : "Home",
      path: "/",
    },
    ...items.map((item) => ({
      ...item,
      label: item.label || getTabLabel(item.id),
    })),
  ];

  return (
    <nav
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.id} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}

              {isLast ? (
                <span className="font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {item.label}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 h-auto"
                  onClick={() => item.path && onNavigate?.(item.path)}
                >
                  {isFirst && <Home className="w-3 h-3 mr-1" />}
                  {item.label}
                </Button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
