import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Book, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FloatingHelpButtonProps {
  onShowGuide: () => void;
}

const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  onShowGuide,
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const helpOptions = [
    {
      icon: Book,
      label: language === "el" ? "Οδηγός Χρήσης" : "User Guide",
      description: language === "el" ? "Πλήρης οδηγός" : "Complete guide",
      onClick: onShowGuide,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: MessageCircle,
      label: language === "el" ? "Γρήγορη Βοήθεια" : "Quick Help",
      description: language === "el" ? "Συχνές ερωτήσεις" : "FAQ",
      onClick: () =>
        alert(language === "el" ? "Σύντομα διαθέσιμο!" : "Coming soon!"),
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Options */}
      {isExpanded && (
        <div className="mb-3 space-y-2 animate-in slide-in-from-bottom duration-300">
          {helpOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="flex items-center gap-3 group">
                <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {option.description}
                  </div>
                </div>
                <Button
                  onClick={option.onClick}
                  size="sm"
                  className={`${option.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 w-12 h-12 rounded-full p-0`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Help Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="lg"
        className={`w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isExpanded
            ? "bg-red-500 hover:bg-red-600 rotate-180"
            : "bg-indigo-500 hover:bg-indigo-600 hover:scale-110"
        } text-white border-4 border-white dark:border-gray-800`}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <HelpCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Pulse animation when not expanded */}
      {!isExpanded && (
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-indigo-400 animate-ping opacity-20"></div>
      )}
    </div>
  );
};

export default FloatingHelpButton;
