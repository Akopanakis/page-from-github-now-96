import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'el');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    el: {
      'calculator.title': 'Υπολογιστής Κόστους',
      'calculator.subtitle': 'Ακριβής Κοστολόγηση για Επιτυχημένες Επιχειρήσεις',
      'tab.basic': 'Βασικά',
      'tab.costs': 'Κόστη',
      'tab.transport': 'Μεταφορά',
      'tab.analysis': 'Ανάλυση',
      'tab.advanced': 'Προηγμένα',
      'product.name': 'Όνομα Προϊόντος',
      'purchase.price': 'Τιμή Αγοράς (€)',
      'quantity': 'Ποσότητα (κιλά)',
      'waste.percent': 'Απώλεια (%)',
      'ice.percent': 'Πάγος (%)',
      'vat.percent': 'ΦΠΑ (%)',
      'workers': 'Εργαζόμενοι',
      'worker.hourly.rate': 'Ωρομίσθιο',
      'worker.hours': 'Ώρες',
      'add.worker': 'Προσθήκη Εργαζόμενου',
      'remove.worker': 'Αφαίρεση',
      'distance': 'Απόσταση (χλμ)',
      'fuel.cost': 'Κόστος Καυσίμου (€/χλμ)',
      'tolls': 'Διόδια (€)',
      'parking.cost': 'Πάρκινγκ (€)',
      'electricity.cost': 'Ρεύμα (€)',
      'equipment.cost': 'Εξοπλισμός (€)',
      'insurance.cost': 'Ασφάλεια (€)',
      'rent.cost': 'Ενοίκιο (€)',
      'communication.cost': 'Επικοινωνία (€)',
      'other.costs': 'Άλλα (€)',
      'profit.margin': 'Περιθώριο Κέρδους (%)',
      'competitor.price': 'Τιμή Ανταγωνιστή (€)',
      'calculate.costing': 'Υπολογισμός Κόστους',
      'reset': 'Επαναφορά',
      'calculating': 'Υπολογισμός...',
      'example.thrapsalo': 'Θράψαλο',
      'save': 'Αποθήκευση',
      'load': 'Φόρτωση',
      'export.pdf': 'Εξαγωγή PDF',
      'origin.address': 'Διεύθυνση Προέλευσης',
      'destination.address': 'Διεύθυνση Προορισμού',
      'calculate.route': 'Υπολογισμός Διαδρομής',
      'route.not.calculated': 'Δεν έχει υπολογιστεί διαδρομή',
      'scenarios': 'Σενάρια',
      'forecasting': 'Πρόβλεψη',
      'glossary': 'Λεξικό',
      'scenario.analysis': 'Ανάλυση Σεναρίων',
      'revenue.forecasting': 'Πρόβλεψη Εσόδων',
      'financial.glossary': 'Οικονομικό Λεξικό'
    },
    en: {
      'calculator.title': 'Cost Calculator',
      'calculator.subtitle': 'Accurate Costing for Successful Businesses',
      'tab.basic': 'Basic',
      'tab.costs': 'Costs',
      'tab.transport': 'Transport',
      'tab.analysis': 'Analysis',
      'tab.advanced': 'Advanced',
      'product.name': 'Product Name',
      'purchase.price': 'Purchase Price (€)',
      'quantity': 'Quantity (kg)',
      'waste.percent': 'Waste (%)',
      'ice.percent': 'Ice (%)',
      'vat.percent': 'VAT (%)',
      'workers': 'Workers',
      'worker.hourly.rate': 'Hourly Rate',
      'worker.hours': 'Hours',
      'add.worker': 'Add Worker',
      'remove.worker': 'Remove',
      'distance': 'Distance (km)',
      'fuel.cost': 'Fuel Cost (€/km)',
      'tolls': 'Tolls (€)',
      'parking.cost': 'Parking (€)',
      'electricity.cost': 'Electricity (€)',
      'equipment.cost': 'Equipment (€)',
      'insurance.cost': 'Insurance (€)',
      'rent.cost': 'Rent (€)',
      'communication.cost': 'Communication (€)',
      'other.costs': 'Other (€)',
      'profit.margin': 'Profit Margin (%)',
      'competitor.price': 'Competitor Price (€)',
      'calculate.costing': 'Calculate Costing',
      'reset': 'Reset',
      'calculating': 'Calculating...',
      'example.thrapsalo': 'Thrapsalo',
      'save': 'Save',
      'load': 'Load',
      'export.pdf': 'Export PDF',
      'origin.address': 'Origin Address',
      'destination.address': 'Destination Address',
      'calculate.route': 'Calculate Route',
      'route.not.calculated': 'Route not calculated',
      'scenarios': 'Scenarios',
      'forecasting': 'Forecasting',
      'glossary': 'Glossary',
      'scenario.analysis': 'Scenario Analysis',
      'revenue.forecasting': 'Revenue Forecasting',
      'financial.glossary': 'Financial Glossary'
    }
  };

  const t = (key: string) => {
    return translations[language as keyof typeof translations][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
