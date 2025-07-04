import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

// Navigation labels mapping
const NAVIGATION_LABELS: Record<string, Record<string, string>> = {
  "comprehensive-dashboard": {
    el: "Κέντρο Ελέγχου",
    en: "Control Center",
  },
  basics: {
    el: "Στοιχεία Προϊόντος",
    en: "Product Information",
  },
  processing: {
    el: "Φάσεις Επεξεργασίας",
    en: "Processing Phases",
  },
  costs: {
    el: "Διαχείριση Κόστων",
    en: "Cost Management",
  },
  transport: {
    el: "Κόστη Μεταφοράς",
    en: "Transport Costs",
  },
  analysis: {
    el: "Αναλυτικά Αποτελέσματα",
    en: "Detailed Analysis",
  },
  "fleet-management": {
    el: "Διαχείριση Στόλου",
    en: "Fleet Management",
  },
  "inventory-management": {
    el: "Διαχείριση Αποθέματος",
    en: "Inventory Management",
  },
  "order-management": {
    el: "Διαχείριση Παραγγελιών",
    en: "Order Management",
  },
  "customer-management": {
    el: "Διαχείριση Πελατών",
    en: "Customer Management",
  },
  "haccp-module": {
    el: "Μονάδα HACCP",
    en: "HACCP Module",
  },
  "iso-standards": {
    el: "Πρότυπα ISO",
    en: "ISO Standards",
  },
  "business-intelligence": {
    el: "Business Intelligence",
    en: "Business Intelligence",
  },
  "operations-center": {
    el: "Κέντρο Λειτουργιών",
    en: "Operations Center",
  },
  "financial-analytics": {
    el: "Χρηματοοικονομικά Analytics",
    en: "Financial Analytics",
  },
  "quality-compliance": {
    el: "Ποιότητα & Συμμόρφωση",
    en: "Quality & Compliance",
  },
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = "",
}) => {
  const { language } = useLanguage();

  const getLabel = (id: string) => {
    if (NAVIGATION_LABELS[id]) {
      return NAVIGATION_LABELS[id][language];
    }
    return id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const enhancedItems = [
    {
      id: "home",
      label: language === "el" ? "Αρχική" : "Home",
      href: "/",
      isActive: false,
    },
    ...items.map((item) => ({
      ...item,
      label: item.label || getLabel(item.id),
    })),
  ];

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {enhancedItems.map((item, index) => (
          <li key={item.id} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}

            {item.isActive ? (
              <span className="text-sm font-medium text-gray-900 flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => onNavigate?.(item.href || `/${item.id}`)}
                className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
