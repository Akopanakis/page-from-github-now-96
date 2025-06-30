import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calculator,
  FileText,
  Download,
  Save,
  Share2,
  Printer,
  RefreshCw,
  Zap,
  TrendingUp,
  BarChart3,
  Settings,
  Crown,
  Clock,
  PlayCircle,
  Database,
} from "lucide-react";

interface QuickActionsProps {
  onCalculate: () => void;
  onReset: () => void;
  onSave?: () => void;
  onExportPDF?: () => void;
  onExportData?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onLoadExample?: () => void;
  isCalculating: boolean;
  hasResults: boolean;
  isPremium: boolean;
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onCalculate,
  onReset,
  onSave,
  onExportPDF,
  onExportData,
  onShare,
  onPrint,
  onLoadExample,
  isCalculating,
  hasResults,
  isPremium,
  className = "",
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const primaryActions = [
    {
      id: "calculate",
      label: language === "el" ? "Υπολογισμός" : "Calculate",
      icon: Calculator,
      onClick: onCalculate,
      disabled: isCalculating,
      variant: "default" as const,
      className:
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      priority: 1,
    },
    {
      id: "reset",
      label: language === "el" ? "Επαναφορά" : "Reset",
      icon: RefreshCw,
      onClick: onReset,
      disabled: false,
      variant: "outline" as const,
      priority: 2,
    },
  ];

  const secondaryActions = [
    {
      id: "example",
      label: language === "el" ? "Παράδειγμα" : "Example",
      icon: PlayCircle,
      onClick: onLoadExample,
      disabled: false,
      variant: "outline" as const,
      color: "green",
      priority: 3,
    },
    {
      id: "save",
      label: language === "el" ? "Αποθήκευση" : "Save",
      icon: Save,
      onClick: onSave,
      disabled: !hasResults,
      variant: "outline" as const,
      premium: false,
      priority: 4,
    },
    {
      id: "export-pdf",
      label: language === "el" ? "PDF" : "PDF",
      icon: FileText,
      onClick: onExportPDF,
      disabled: !hasResults,
      variant: "outline" as const,
      color: "red",
      priority: 5,
    },
    {
      id: "export-data",
      label: language === "el" ? "Δεδομένα" : "Data",
      icon: Download,
      onClick: onExportData,
      disabled: !hasResults,
      variant: "outline" as const,
      color: "blue",
      priority: 6,
    },
    {
      id: "share",
      label: language === "el" ? "Κοινοποίηση" : "Share",
      icon: Share2,
      onClick: onShare,
      disabled: !hasResults,
      variant: "outline" as const,
      premium: true,
      priority: 7,
    },
    {
      id: "print",
      label: language === "el" ? "Εκτύπωση" : "Print",
      icon: Printer,
      onClick: onPrint,
      disabled: !hasResults,
      variant: "outline" as const,
      priority: 8,
    },
  ];

  const getButtonColor = (color?: string) => {
    const colors = {
      green: "border-green-300 text-green-600 hover:bg-green-50",
      red: "border-red-300 text-red-600 hover:bg-red-50",
      blue: "border-blue-300 text-blue-600 hover:bg-blue-50",
      purple: "border-purple-300 text-purple-600 hover:bg-purple-50",
    };
    return colors[color as keyof typeof colors] || "";
  };

  const isActionDisabled = (action: any) => {
    return action.disabled || (action.premium && !isPremium);
  };

  const renderAction = (action: any, size: "sm" | "default" = "sm") => {
    const Icon = action.icon;
    const isDisabled = isActionDisabled(action);

    return (
      <TooltipProvider key={action.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={action.variant}
              size={size}
              onClick={action.onClick}
              disabled={isDisabled}
              className={`
                ${action.className || ""}
                ${action.color ? getButtonColor(action.color) : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                ${size === "default" ? "h-10 px-4" : "h-8 px-3"}
                transition-all duration-200 hover:shadow-md
              `}
            >
              <Icon
                className={`${size === "default" ? "w-4 h-4" : "w-3 h-3"} ${size === "default" ? "mr-2" : ""}`}
              />
              {size === "default" && (
                <span className="hidden sm:inline">{action.label}</span>
              )}
              {action.premium && !isPremium && (
                <Crown className="w-3 h-3 ml-1 text-yellow-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <div className="font-medium">{action.label}</div>
              {action.premium && !isPremium && (
                <div className="text-xs text-yellow-600 mt-1">
                  {language === "el"
                    ? "Απαιτείται Premium"
                    : "Requires Premium"}
                </div>
              )}
              {isCalculating && action.id === "calculate" && (
                <div className="text-xs text-blue-600 mt-1">
                  {language === "el"
                    ? "Υπολογισμός σε εξέλιξη..."
                    : "Calculating..."}
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className={`shadow-md border-l-4 border-l-blue-500 ${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-700">
              {language === "el" ? "Γρήγορες Ενέργειες" : "Quick Actions"}
            </span>
            {isCalculating && (
              <Badge variant="secondary" className="animate-pulse">
                <Clock className="w-3 h-3 mr-1" />
                {language === "el" ? "Επεξεργασία" : "Processing"}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded
              ? language === "el"
                ? "Λιγότερα"
                : "Less"
              : language === "el"
                ? "Περισσότερα"
                : "More"}
          </Button>
        </div>

        {/* Primary Actions - Always Visible */}
        <div className="flex flex-wrap gap-2 mb-3">
          {primaryActions.map((action) => renderAction(action, "default"))}
        </div>

        {/* Secondary Actions */}
        <div
          className={`grid transition-all duration-300 overflow-hidden ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-60"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2 pb-1">
              {secondaryActions.map((action) => renderAction(action))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {hasResults && (
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-3 h-3 text-green-500" />
                <span>
                  {language === "el" ? "Αποτελέσματα Έτοιμα" : "Results Ready"}
                </span>
              </div>
            )}
            {isPremium ? (
              <div className="flex items-center space-x-1">
                <Crown className="w-3 h-3 text-purple-500" />
                <span>
                  {language === "el" ? "Premium Ενεργό" : "Premium Active"}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Settings className="w-3 h-3 text-gray-400" />
                <span>
                  {language === "el" ? "Βασική Έκδοση" : "Basic Version"}
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-gray-400">
              {language === "el" ? "Τελευταία Ενημέρωση:" : "Last Updated:"}
            </span>
            <span className="ml-1 font-medium">
              {new Date().toLocaleTimeString(
                language === "el" ? "el-GR" : "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
