import React, { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Command as CommandIcon,
  ArrowRight,
  Hash,
  FileText,
  Calculator,
  BarChart3,
  Settings,
  Users,
  Package,
  Truck,
  Shield,
  Certificate,
  Biohazard,
  Award,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  action: () => void;
  icon?: React.ComponentType<any>;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPremium: boolean;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  isPremium,
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      // Main Operations
      {
        id: "comprehensive-dashboard",
        title: language === "el" ? "Κέντρο Ελέγχου" : "Control Center",
        description:
          language === "el"
            ? "Κεντρικό dashboard με live μετρήσεις"
            : "Main dashboard with live metrics",
        category: language === "el" ? "Κύρια" : "Main",
        keywords: ["dashboard", "control", "main", "κέντρο", "έλεγχος"],
        action: () => {
          setActiveTab("comprehensive-dashboard");
          onClose();
        },
        icon: BarChart3,
        shortcut: "Ctrl+D",
      },
      {
        id: "basics",
        title: language === "el" ? "Στοιχεία Προϊόντος" : "Product Information",
        description:
          language === "el"
            ? "Βασικές πληροφορίες προϊόντος"
            : "Basic product information",
        category: language === "el" ? "Κύρια" : "Main",
        keywords: ["product", "basics", "info", "προϊόν", "στοιχεία"],
        action: () => {
          setActiveTab("basics");
          onClose();
        },
        icon: Package,
      },
      {
        id: "costs",
        title: language === "el" ? "Διαχείριση Κόστων" : "Cost Management",
        description:
          language === "el"
            ? "Υπολογισμός και ανάλυση κόστους"
            : "Cost calculation and analysis",
        category: language === "el" ? "Κύρια" : "Main",
        keywords: ["cost", "calculation", "κόστος", "υπολογισμός"],
        action: () => {
          setActiveTab("costs");
          onClose();
        },
        icon: Calculator,
        shortcut: "Ctrl+C",
      },

      // Fleet & Operations
      {
        id: "fleet-management",
        title: language === "el" ? "Διαχείριση Στόλου" : "Fleet Management",
        description:
          language === "el"
            ? "Παρακολούθηση πλοίων και στόλου"
            : "Ship and fleet tracking",
        category: language === "el" ? "Λειτουργίες" : "Operations",
        keywords: ["fleet", "ships", "vessels", "στόλος", "πλοία"],
        action: () => {
          setActiveTab("fleet-management");
          onClose();
        },
        icon: Truck,
      },
      {
        id: "inventory-management",
        title:
          language === "el" ? "Διαχείριση Αποθέματος" : "Inventory Management",
        description:
          language === "el"
            ? "Διαχείριση αποθέματος και stock"
            : "Stock and inventory management",
        category: language === "el" ? "Λειτουργίες" : "Operations",
        keywords: ["inventory", "stock", "warehouse", "απόθεμα", "αποθήκη"],
        action: () => {
          setActiveTab("inventory-management");
          onClose();
        },
        icon: Package,
      },
      {
        id: "order-management",
        title:
          language === "el" ? "Διαχείριση Παραγγελιών" : "Order Management",
        description:
          language === "el"
            ? "Παραγγελίες και διαχείριση πελατών"
            : "Orders and customer management",
        category: language === "el" ? "Λειτουργίες" : "Operations",
        keywords: ["orders", "customers", "sales", "παραγγελίες", "πελάτες"],
        action: () => {
          setActiveTab("order-management");
          onClose();
        },
        icon: Users,
      },

      // Compliance & Quality
      {
        id: "haccp-module",
        title: language === "el" ? "Μονάδα HACCP" : "HACCP Module",
        description:
          language === "el"
            ? "Διαχείριση HACCP και κρίσιμων σημείων"
            : "HACCP and critical control points",
        category: language === "el" ? "Συμμόρφωση" : "Compliance",
        keywords: ["haccp", "hazard", "safety", "food", "κίνδυνος", "ασφάλεια"],
        action: () => {
          setActiveTab("haccp-module");
          onClose();
        },
        icon: Biohazard,
        shortcut: "Ctrl+H",
      },
      {
        id: "iso-standards",
        title: language === "el" ? "Πρότυπα ISO" : "ISO Standards",
        description:
          language === "el"
            ? "Διαχείριση προτύπων ISO 22000"
            : "ISO 22000 standards management",
        category: language === "el" ? "Συμμόρφωση" : "Compliance",
        keywords: [
          "iso",
          "standards",
          "certification",
          "πρότυπα",
          "πιστοποίηση",
        ],
        action: () => {
          setActiveTab("iso-standards");
          onClose();
        },
        icon: Certificate,
        shortcut: "Ctrl+I",
      },
      {
        id: "quality-compliance",
        title:
          language === "el" ? "Ποιότητα & Συμμόρφωση" : "Quality & Compliance",
        description:
          language === "el"
            ? "Κέντρο ελέγχου ποιότητας"
            : "Quality control center",
        category: language === "el" ? "Συμμόρφωση" : "Compliance",
        keywords: ["quality", "compliance", "audit", "ποιότητα", "έλεγχος"],
        action: () => {
          setActiveTab("quality-compliance");
          onClose();
        },
        icon: Award,
      },

      // Analytics & Intelligence
      {
        id: "business-intelligence",
        title:
          language === "el" ? "Business Intelligence" : "Business Intelligence",
        description:
          language === "el"
            ? "Προχωρημένα analytics και AI"
            : "Advanced analytics and AI",
        category: language === "el" ? "Αναλυτικά" : "Analytics",
        keywords: [
          "business",
          "intelligence",
          "ai",
          "analytics",
          "επιχειρηματική",
          "νοημοσύνη",
        ],
        action: () => {
          setActiveTab("business-intelligence");
          onClose();
        },
        icon: Zap,
        shortcut: "Ctrl+B",
      },
      {
        id: "financial-analytics",
        title:
          language === "el"
            ? "Χρηματοοικονομικά Analytics"
            : "Financial Analytics",
        description:
          language === "el"
            ? "Προχωρημένη χρηματοοικονομική ανάλυση"
            : "Advanced financial analysis",
        category: language === "el" ? "Αναλυτικά" : "Analytics",
        keywords: [
          "financial",
          "analytics",
          "money",
          "χρηματοοικονομικά",
          "χρήματα",
        ],
        action: () => {
          setActiveTab("financial-analytics");
          onClose();
        },
        icon: BarChart3,
      },
      {
        id: "operations-center",
        title: language === "el" ? "Κέντρο Λειτουργιών" : "Operations Center",
        description:
          language === "el"
            ? "Real-time παρακολούθηση λειτουργιών"
            : "Real-time operations monitoring",
        category: language === "el" ? "Αναλυτικά" : "Analytics",
        keywords: [
          "operations",
          "real-time",
          "monitoring",
          "λειτουργίες",
          "παρακολούθηση",
        ],
        action: () => {
          setActiveTab("operations-center");
          onClose();
        },
        icon: Settings,
      },

      // Settings & Configuration
      {
        id: "settings",
        title: language === "el" ? "Ρυθμίσεις" : "Settings",
        description:
          language === "el"
            ? "Ρυθμίσεις εφαρμογής και λογαριασμού"
            : "App and account settings",
        category: language === "el" ? "Ρυθμίσεις" : "Settings",
        keywords: [
          "settings",
          "config",
          "preferences",
          "ρυθμίσεις",
          "προτιμήσεις",
        ],
        action: () => {
          setActiveTab("settings");
          onClose();
        },
        icon: Settings,
        shortcut: "Ctrl+,",
      },
    ],
    [language, setActiveTab, onClose],
  );

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;

    const searchTerms = query.toLowerCase().split(" ");

    return commands.filter((command) => {
      const searchableText = [
        command.title,
        command.description,
        command.category,
        ...command.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [query, commands]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};

    filteredCommands.forEach((command) => {
      if (!groups[command.category]) {
        groups[command.category] = [];
      }
      groups[command.category].push(command);
    });

    return groups;
  }, [filteredCommands]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <CommandIcon className="w-5 h-5 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                language === "el"
                  ? "Αναζήτηση εντολών και σελίδων..."
                  : "Search commands and pages..."
              }
              className="border-0 focus-visible:ring-0 text-base"
              autoFocus
            />
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">⌘</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">K</kbd>
            </div>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {language === "el"
                  ? "Δεν βρέθηκαν αποτελέσματα"
                  : "No results found"}
              </p>
              <p className="text-xs mt-1">
                {language === "el"
                  ? "Δοκιμάστε διαφορετικούς όρους αναζήτησης"
                  : "Try different search terms"}
              </p>
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category} className="p-2">
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {category}
                </div>
                {items.map((command, index) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  const isSelected = globalIndex === selectedIndex;
                  const IconComponent = command.icon || FileText;

                  return (
                    <button
                      key={command.id}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                        ${
                          isSelected
                            ? "bg-blue-50 border border-blue-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }
                      `}
                      onClick={() => command.action()}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      <div
                        className={`
                        p-1.5 rounded-md
                        ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}
                      `}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 truncate">
                            {command.title}
                          </span>
                          {command.id === activeTab && (
                            <Badge variant="secondary" className="text-xs">
                              {language === "el" ? "Ενεργό" : "Active"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {command.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {command.shortcut && (
                          <span className="text-xs text-gray-400 font-mono">
                            {command.shortcut}
                          </span>
                        )}
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 p-3 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">↑↓</kbd>
              {language === "el" ? "πλοήγηση" : "navigate"}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">↵</kbd>
              {language === "el" ? "επιλογή" : "select"}
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-gray-100 rounded">esc</kbd>
              {language === "el" ? "κλείσιμο" : "close"}
            </span>
          </div>
          <div className="text-right">
            {filteredCommands.length}{" "}
            {language === "el" ? "αποτελέσματα" : "results"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;
