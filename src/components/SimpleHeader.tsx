import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Fish, Home, Receipt, BarChart3, Globe2, User } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function SimpleHeader() {
  const { language, setLanguage, currency, setCurrency } = useLanguage();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-2 rounded-lg">
              <Fish className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">KostoPro Enhanced</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Αρχική
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/expenses")}
              className="flex items-center gap-2"
            >
              <Receipt className="w-4 h-4" />
              Δαπάνες
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/classic")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Υπολογισμός
            </Button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={language === "el" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("el")}
                className="h-8 px-2 text-xs"
              >
                ΕΛ
              </Button>
              <Button
                variant={language === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="h-8 px-2 text-xs"
              >
                EN
              </Button>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={currency === "EUR" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("EUR")}
                className="h-8 px-2 text-xs"
              >
                EUR
              </Button>
              <Button
                variant={currency === "USD" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrency("USD")}
                className="h-8 px-2 text-xs"
              >
                USD
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-toggle" className="text-sm sr-only">
                {language === "el" ? "Σκοτεινό θέμα" : "Dark theme"}
              </Label>
              <Switch
                id="theme-toggle"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
            </div>

            {/* User Menu */}
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/profile")}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile
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
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
