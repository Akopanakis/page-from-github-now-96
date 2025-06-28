import React, { createContext, useContext, useState } from "react";

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

const translations = {
  el: {
    "product.name": "Όνομα Προϊόντος",
    welcome: "Καλώς ήρθατε",
  },
  en: {
    "product.name": "Product Name",
    welcome: "Welcome",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"el" | "en">("en");
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");

  const locale = language === "el" ? "el-GR" : "en-US";

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

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
