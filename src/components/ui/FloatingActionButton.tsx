import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Calculator,
  FileText,
  BarChart3,
  Biohazard,
  Command as CommandIcon,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FloatingActionButtonProps {
  onCalculate?: () => void;
  onNewExpense?: () => void;
  onNewReport?: () => void;
  onOpenHACCP?: () => void;
  onOpenCommandPalette?: () => void;
  setActiveTab?: (tab: string) => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onCalculate,
  onNewExpense,
  onNewReport,
  onOpenHACCP,
  onOpenCommandPalette,
  setActiveTab,
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      id: "command-palette",
      label: language === "el" ? "Αναζήτηση" : "Search",
      icon: CommandIcon,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => {
        onOpenCommandPalette?.();
        setIsExpanded(false);
      },
      shortcut: "⌘K",
    },
    {
      id: "calculate",
      label: language === "el" ? "Υπολογισμός" : "Calculate",
      icon: Calculator,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => {
        setActiveTab?.("costs");
        onCalculate?.();
        setIsExpanded(false);
      },
      shortcut: "⌘C",
    },
    {
      id: "haccp",
      label: language === "el" ? "HACCP" : "HACCP",
      icon: Biohazard,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => {
        setActiveTab?.("haccp-module");
        onOpenHACCP?.();
        setIsExpanded(false);
      },
      shortcut: "⌘H",
    },
    {
      id: "analytics",
      label: language === "el" ? "Analytics" : "Analytics",
      icon: BarChart3,
      color: "bg-green-500 hover:bg-green-600",
      action: () => {
        setActiveTab?.("business-intelligence");
        setIsExpanded(false);
      },
      shortcut: "⌘B",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 text-sm font-medium whitespace-nowrap flex items-center gap-2">
                  {action.label}
                  {action.shortcut && (
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1 py-0.5 rounded">
                      {action.shortcut}
                    </span>
                  )}
                </div>
                <Button
                  size="lg"
                  className={`
                    w-12 h-12 rounded-full shadow-lg border-0 text-white
                    ${action.color}
                    transform transition-all duration-200 hover:scale-110
                  `}
                  onClick={action.action}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        size="lg"
        className={`
          w-14 h-14 rounded-full shadow-xl border-0 text-white transform transition-all duration-300
          ${
            isExpanded
              ? "bg-red-500 hover:bg-red-600 rotate-45"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-110"
          }
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>

      {/* Background overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;
