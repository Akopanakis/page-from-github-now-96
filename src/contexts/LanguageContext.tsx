import React, { createContext, useContext, useState, useEffect } from "react";
import { safeGetItem, safeSetItem } from "../utils/safeStorage";

interface LanguageContextType {
  language: "el" | "en";
  setLanguage: (lang: "el" | "en") => void;
  currency: "EUR" | "USD";
  setCurrency: (cur: "EUR" | "USD") => void;
  locale: string;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Comprehensive translations without encoding issues
const translations = {
  el: {
    // Basic Product Info
    "product.name": "Όνομα Προϊόντος",
    "product.type": "Τύπος Προϊόντος",
    "product.weight": "Βάρος (kg)",
    "product.quantity": "Ποσότητα",
    "product.origin": "Προέλευση",
    "product.quality": "Ποιότητα",
    "product.notes": "Σημειώσεις",

    // Pricing
    "pricing.purchase": "Τιμή Αγοράς",
    "pricing.selling": "Τιμή Πώλησης",
    "pricing.profit": "Περιθώριο Κέρδους",
    "pricing.vat": "ΦΠΑ",
    "pricing.margin": "Περιθώριο",

    // Processing
    "processing.phases": "Φάσεις Επεξεργασίας",
    "processing.losses": "Απώλειες",
    "processing.glazing": "Γλάσσο",
    "processing.cleaning": "Καθάρισμα",
    "processing.packaging": "Συσκευασία",

    // Costs
    "costs.direct": "Άμεσα Κόστη",
    "costs.indirect": "Έμμεσα Κόστη",
    "costs.transport": "Κόστη Μεταφοράς",
    "costs.labor": "Εργασία",
    "costs.materials": "Υλικά",
    "costs.energy": "Ενέργεια",
    "costs.total": "Συνολικό Κόστος",

    // Analysis
    "analysis.cost": "Ανάλυση Κόστους",
    "analysis.profit": "Ανάλυση Κέρδους",
    "analysis.margin": "Ανάλυση Περιθωρίων",
    "analysis.breakeven": "Σημείο Ισοζυγίας",
    "analysis.roi": "Απόδοση Επένδυσης",

    // Navigation
    "nav.basics": "Βασικά Στοιχεία",
    "nav.processing": "Επεξεργασία",
    "nav.costs": "Κόστη",
    "nav.transport": "Μεταφορά",
    "nav.analysis": "Ανάλυση",
    "nav.dashboard": "Dashboard",
    "nav.reports": "Αναφορές",

    // Actions
    "action.calculate": "Υπολογισμός",
    "action.reset": "Επαναφορά",
    "action.save": "Αποθήκευση",
    "action.load": "Φόρτωση",
    "action.export": "Εξαγωγή",
    "action.print": "Εκτύπωση",
    "action.close": "Κλείσιμο",
    "action.cancel": "Ακύρωση",
    "action.confirm": "Επιβεβαίωση",

    // Results
    "results.total.cost": "Συνολικό Κόστος",
    "results.cost.per.kg": "Κόστος ανά kg",
    "results.profit.margin": "Περιθώριο Κέρδους",
    "results.net.profit": "Καθαρό Κέρδος",
    "results.break.even": "Σημείο Ισοζυγίας",
    "results.recommended.price": "Προτεινόμενη Τιμή",

    // Financial Models
    "financial.ratios": "Χρηματοοικονομικοί Δείκτες",
    "financial.npv": "Καθαρή Παρούσα Αξία",
    "financial.irr": "Εσωτερικός Συντελεστής Απόδ��σης",
    "financial.payback": "Περίοδος Αποπληρωμής",
    "financial.profitability": "Δείκτης Κερδοφορίας",

    // Market Analysis
    "market.trends": "Τάσεις Αγοράς",
    "market.competitors": "Ανταγωνιστές",
    "market.position": "Θέση στην Αγορά",
    "market.share": "Μερίδιο Αγοράς",
    "market.intelligence": "Πληροφορίες Αγοράς",

    // Inventory
    "inventory.management": "Διαχείριση Αποθέματος",
    "inventory.batch": "Παρτίδα",
    "inventory.tracking": "Παρακολούθηση",
    "inventory.quality": "Ποιότητα",
    "inventory.expiry": "Λήξη",

    // Scenarios
    "scenario.analysis": "Ανάλυση Σεναρίων",
    "scenario.best": "Καλύτερο Σενάριο",
    "scenario.worst": "Χειρότερο Σενάριο",
    "scenario.realistic": "Ρεαλιστικό Σενάριο",

    // Forecasting
    "forecast.revenue": "Πρόβλεψη Εσόδων",
    "forecast.demand": "Πρόβλεψη Ζήτησης",
    "forecast.seasonality": "Εποχικότητα",
    "forecast.trends": "Τάσεις",

    // Messages
    "message.success": "Επιτυχία",
    "message.error": "Σφάλμα",
    "message.warning": "Προειδοποίηση",
    "message.info": "Πληροφορία",
    "message.loading": "Φόρτωση...",
    "message.calculating": "Υπολογισμός...",
    "message.saving": "Αποθήκευση...",

    // Common
    "common.yes": "Ναι",
    "common.no": "Όχι",
    "common.ok": "Εντάξει",
    "common.date": "Ημερομηνία",
    "common.time": "Ώρα",
    "common.amount": "Ποσό",
    "common.percentage": "Ποσοστό",
    "common.total": "Σύνολο",
    "common.subtotal": "Υποσύνολο",
    "common.tax": "Φόρος",
    "common.discount": "Έκπτωση",

    // Titles
    "title.welcome": "Καλώς ήρθατε",
    "title.dashboard": "Πίνακας Ελέγχου",
    "title.analysis": "Ανάλυση",
    "title.reports": "Αναφορές",
    "title.settings": "Ρυθμίσεις",
    "title.help": "Βοήθεια",
    "title.guide": "Οδηγός Χρήσης",

    // Examples
    "examples.thrapsalo": "Θράψαλο Block Αργεντίνης",
    "examples.seabream": "Τσιπούρα Ελλάδας",
    "examples.seabass": "Λαβράκι Ελλάδας",
    "examples.salmon": "Σολομός Νορβηγίας",
    "examples.shrimp": "Γαρίδες Μαδαγασκάρης",
    "examples.squid": "Καλαμάρι Αιγαίου",

    // Units
    "unit.kg": "kg",
    "unit.pieces": "τεμάχια",
    "unit.euro": "€",
    "unit.percent": "%",
    "unit.hours": "ώρες",
    "unit.days": "ημέρες",
    "unit.months": "μήνες",
    "unit.years": "έτη",
  },
  en: {
    // Basic Product Info
    "product.name": "Product Name",
    "product.type": "Product Type",
    "product.weight": "Weight (kg)",
    "product.quantity": "Quantity",
    "product.origin": "Origin",
    "product.quality": "Quality",
    "product.notes": "Notes",

    // Pricing
    "pricing.purchase": "Purchase Price",
    "pricing.selling": "Selling Price",
    "pricing.profit": "Profit Margin",
    "pricing.vat": "VAT",
    "pricing.margin": "Margin",

    // Processing
    "processing.phases": "Processing Phases",
    "processing.losses": "Losses",
    "processing.glazing": "Glazing",
    "processing.cleaning": "Cleaning",
    "processing.packaging": "Packaging",

    // Costs
    "costs.direct": "Direct Costs",
    "costs.indirect": "Indirect Costs",
    "costs.transport": "Transport Costs",
    "costs.labor": "Labor",
    "costs.materials": "Materials",
    "costs.energy": "Energy",
    "costs.total": "Total Cost",

    // Analysis
    "analysis.cost": "Cost Analysis",
    "analysis.profit": "Profit Analysis",
    "analysis.margin": "Margin Analysis",
    "analysis.breakeven": "Break-even Analysis",
    "analysis.roi": "Return on Investment",

    // Navigation
    "nav.basics": "Basic Info",
    "nav.processing": "Processing",
    "nav.costs": "Costs",
    "nav.transport": "Transport",
    "nav.analysis": "Analysis",
    "nav.dashboard": "Dashboard",
    "nav.reports": "Reports",

    // Actions
    "action.calculate": "Calculate",
    "action.reset": "Reset",
    "action.save": "Save",
    "action.load": "Load",
    "action.export": "Export",
    "action.print": "Print",
    "action.close": "Close",
    "action.cancel": "Cancel",
    "action.confirm": "Confirm",

    // Results
    "results.total.cost": "Total Cost",
    "results.cost.per.kg": "Cost per kg",
    "results.profit.margin": "Profit Margin",
    "results.net.profit": "Net Profit",
    "results.break.even": "Break-even Point",
    "results.recommended.price": "Recommended Price",

    // Financial Models
    "financial.ratios": "Financial Ratios",
    "financial.npv": "Net Present Value",
    "financial.irr": "Internal Rate of Return",
    "financial.payback": "Payback Period",
    "financial.profitability": "Profitability Index",

    // Market Analysis
    "market.trends": "Market Trends",
    "market.competitors": "Competitors",
    "market.position": "Market Position",
    "market.share": "Market Share",
    "market.intelligence": "Market Intelligence",

    // Inventory
    "inventory.management": "Inventory Management",
    "inventory.batch": "Batch",
    "inventory.tracking": "Tracking",
    "inventory.quality": "Quality",
    "inventory.expiry": "Expiry",

    // Scenarios
    "scenario.analysis": "Scenario Analysis",
    "scenario.best": "Best Case Scenario",
    "scenario.worst": "Worst Case Scenario",
    "scenario.realistic": "Realistic Scenario",

    // Forecasting
    "forecast.revenue": "Revenue Forecast",
    "forecast.demand": "Demand Forecast",
    "forecast.seasonality": "Seasonality",
    "forecast.trends": "Trends",

    // Messages
    "message.success": "Success",
    "message.error": "Error",
    "message.warning": "Warning",
    "message.info": "Information",
    "message.loading": "Loading...",
    "message.calculating": "Calculating...",
    "message.saving": "Saving...",

    // Common
    "common.yes": "Yes",
    "common.no": "No",
    "common.ok": "OK",
    "common.date": "Date",
    "common.time": "Time",
    "common.amount": "Amount",
    "common.percentage": "Percentage",
    "common.total": "Total",
    "common.subtotal": "Subtotal",
    "common.tax": "Tax",
    "common.discount": "Discount",

    // Titles
    "title.welcome": "Welcome",
    "title.dashboard": "Dashboard",
    "title.analysis": "Analysis",
    "title.reports": "Reports",
    "title.settings": "Settings",
    "title.help": "Help",
    "title.guide": "User Guide",

    // Examples
    "examples.thrapsalo": "Thrapsalo Block Argentina",
    "examples.seabream": "Sea Bream Greece",
    "examples.seabass": "Sea Bass Greece",
    "examples.salmon": "Salmon Norway",
    "examples.shrimp": "Shrimp Madagascar",
    "examples.squid": "Squid Aegean",

    // Units
    "unit.kg": "kg",
    "unit.pieces": "pieces",
    "unit.euro": "€",
    "unit.percent": "%",
    "unit.hours": "hours",
    "unit.days": "days",
    "unit.months": "months",
    "unit.years": "years",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"el" | "en">(() => {
    const saved = localStorage.getItem("kostopro-language");
    return (saved as "el" | "en") || "el";
  });

  const [currency, setCurrency] = useState<"EUR" | "USD">(() => {
    const saved = localStorage.getItem("kostopro-currency");
    return (saved as "EUR" | "USD") || "EUR";
  });

  const locale = language === "el" ? "el-GR" : "en-US";

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["el"]] || key
    );
  };

  // Save language preference
  useEffect(() => {
    localStorage.setItem("kostopro-language", language);
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  // Save currency preference
  useEffect(() => {
    localStorage.setItem("kostopro-currency", currency);
  }, [currency]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        locale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
