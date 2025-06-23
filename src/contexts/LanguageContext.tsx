
import React, { createContext, useContext, useState } from 'react';

type Language = 'el' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  el: {
    // Navigation
    'nav.calculation': 'Υπολογισμός',
    'nav.batches': 'Παρτίδες',
    'nav.premium': 'Premium',
    'nav.analytics': 'Αναλύσεις',
    
    // Form labels
    'form.initialWeight': 'Αρχικό Βάρος (kg)',
    'form.cleaningLoss': 'Απώλεια Καθαρισμού (%)',
    'form.processingLoss': 'Απώλεια Επεξεργασίας (%)',
    'form.glazingWeight': 'Βάρος Γλασαρίσματος (%)',
    'form.costPerKg': 'Κόστος ανά kg (€)',
    'form.profitMargin': 'Περιθώριο Κέρδους (%)',
    'form.calculate': 'Υπολόγισε',
    'form.reset': 'Επαναφορά',
    
    // Placeholders
    'placeholder.weight': 'Εισάγετε βάρος σε kg',
    'placeholder.percentage': 'Εισάγετε ποσοστό',
    'placeholder.cost': 'Εισάγετε κόστος σε €',
    
    // Results
    'results.title': 'Αποτελέσματα',
    'results.finalWeight': 'Τελικό Βάρος',
    'results.totalCost': 'Συνολικό Κόστος',
    'results.costPerKg': 'Κόστος ανά kg',
    'results.sellingPrice': 'Τιμή Πώλησης',
    'results.profit': 'Κέρδος',
    
    // Common
    'common.save': 'Αποθήκευση',
    'common.export': 'Εξαγωγή',
    'common.delete': 'Διαγραφή',
    'common.edit': 'Επεξεργασία',
    'common.close': 'Κλείσιμο',
    
    // Messages
    'message.calculationSaved': 'Ο υπολογισμός αποθηκεύτηκε επιτυχώς!',
    'message.calculationComplete': 'Ο υπολογισμός ολοκληρώθηκε!',
    'message.invalidInput': 'Παρακαλώ εισάγετε έγκυρες τιμές',
  },
  en: {
    // Navigation
    'nav.calculation': 'Calculation',
    'nav.batches': 'Batches',
    'nav.premium': 'Premium',
    'nav.analytics': 'Analytics',
    
    // Form labels
    'form.initialWeight': 'Initial Weight (kg)',
    'form.cleaningLoss': 'Cleaning Loss (%)',
    'form.processingLoss': 'Processing Loss (%)',
    'form.glazingWeight': 'Glazing Weight (%)',
    'form.costPerKg': 'Cost per kg (€)',
    'form.profitMargin': 'Profit Margin (%)',
    'form.calculate': 'Calculate',
    'form.reset': 'Reset',
    
    // Placeholders
    'placeholder.weight': 'Enter weight in kg',
    'placeholder.percentage': 'Enter percentage',
    'placeholder.cost': 'Enter cost in €',
    
    // Results
    'results.title': 'Results',
    'results.finalWeight': 'Final Weight',
    'results.totalCost': 'Total Cost',
    'results.costPerKg': 'Cost per kg',
    'results.sellingPrice': 'Selling Price',
    'results.profit': 'Profit',
    
    // Common
    'common.save': 'Save',
    'common.export': 'Export',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    
    // Messages
    'message.calculationSaved': 'Calculation saved successfully!',
    'message.calculationComplete': 'Calculation completed!',
    'message.invalidInput': 'Please enter valid values',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('el');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['el']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
