
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Fish,
  Crown,
  Globe2,
  FileText,
  Zap,
  User,
  HelpCircle,
  Search,
  Command as CommandIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import MegaMenu from "@/components/layout/MegaMenu";

interface HeaderProps {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  showFileUpload: boolean;
  setShowFileUpload: (value: boolean) => void;
  showExamples?: boolean;
  setShowExamples?: (value: boolean) => void;
  onShowGuide?: () => void;
  onOpenCommandPalette?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isPremium,
  setIsPremium,
  showFileUpload,
  setShowFileUpload,
  onShowGuide,
  onOpenCommandPalette,
  activeTab = "",
  setActiveTab,
}) => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const premiumFeatures = [
    language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases",
    language === "el" ? "Διαχείριση Παρτίδων" : "Batch Management",
    language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
    language === "el" ? "Εποχιακοί Συντελεστές" : "Seasonal Factors",
    language === "el" ? "AI Προβλέψεις" : "AI Predictions",
  ];

  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Fish className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                KostoPro
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                {language === "el"
                  ? "Επαγγελματική Κοστολόγηση Θαλασσινών"
                  : "Professional Seafood Costing"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Premium Toggle */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-xl border border-purple-200">
              <Label
                htmlFor="premium-mode"
                className="text-sm font-medium text-purple-700"
              >
                {language === "el" ? "Λειτουργία Premium" : "Premium Mode"}
              </Label>
              <Switch
                id="premium-mode"
                checked={isPremium}
                onCheckedChange={setIsPremium}
              />
              {isPremium && <Crown className="w-4 h-4 text-purple-600" />}
            </div>

            {/* Command Palette */}
            {onOpenCommandPalette && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenCommandPalette}
                className="flex items-center space-x-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <CommandIcon className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "el" ? "Αναζήτηση" : "Search"}
                </span>
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-gray-100 rounded">
                  ⌘K
                </kbd>
              </Button>
            )}

            {/* File Upload Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFileUpload(!showFileUpload)}
              className="flex items-center space-x-2 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <FileText className="w-4 h-4" />
              <span>{language === "el" ? "Αρχεία" : "Files"}</span>
            </Button>

            {/* User Guide Button */}
            {onShowGuide && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowGuide}
                className="flex items-center space-x-2 border-green-200 text-green-600 hover:bg-green-50"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{language === "el" ? "Οδηγός" : "Guide"}</span>
              </Button>
            )}

            {/* User Authentication */}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/profile")}
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/login")}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setLocation("/signup")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Language Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={language === "el" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("el")}
                className="h-8 px-3"
              >
                ΕΛ
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="h-8 px-3"
              >
                EN
              </Button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant={currency === "EUR" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("EUR")}
                className="h-8 px-3"
              >
                EUR
              </Button>
              <Button
                variant={currency === "USD" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("USD")}
                className="h-8 px-3"
              >
                USD
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-toggle" className="text-sm">
                {language === "el" ? "Σκοτεινό" : "Dark"}
              </Label>
              <Switch
                id="theme-toggle"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
            </div>

            <Globe2 className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* MegaMenu Navigation */}
        {setActiveTab && (
          <div className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MegaMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isPremium={isPremium}
                className="py-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Premium Features Banner */}
      {isPremium && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="w-5 h-5" />
                <span className="font-medium">
                  {language === "el"
                    ? "Λειτουργία Premium Ενεργή"
                    : "Premium Mode Active"}
                </span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                {premiumFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 opacity-90"
                  >
                    <Zap className="w-3 h-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);
