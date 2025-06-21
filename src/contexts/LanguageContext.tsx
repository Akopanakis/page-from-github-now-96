
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'el' | 'en';
  setLanguage: (lang: 'el' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  el: {
    // Header
    'calculator.title': 'Υπολογιστής Κοστολόγησης',
    'calculator.subtitle': 'Professional Edition',
    'example.thrapsalo': 'Παράδειγμα Θράψαλο',
    'save': 'Αποθήκευση',
    'load': 'Φόρτωση',
    'export.pdf': 'Εξαγωγή PDF',
    
    // Tabs
    'tab.basic': 'Βασικά Στοιχεία',
    'tab.costs': 'Κόστη',
    'tab.transport': 'Μεταφορά',
    'tab.analysis': 'Ανάλυση',
    'tab.advanced': 'Έξυπνη Ανάλυση',
    
    // Basic tab
    'product.name': 'Όνομα Προϊόντος',
    'purchase.price': 'Τιμή Αγοράς (€/κιλό)',
    'quantity': 'Ποσότητα (κιλά)',
    'waste.percent': 'Απώλεια (%)',
    'ice.percent': 'Πάγος (%)',
    'vat.percent': 'ΦΠΑ (%)',
    
    // Workers
    'workers': 'Εργαζόμενοι',
    'worker.hourly.rate': 'Ωριαίος Μισθός (€)',
    'worker.hours': 'Ώρες Εργασίας',
    'add.worker': 'Προσθήκη Εργαζόμενου',
    'remove.worker': 'Αφαίρεση',
    
    // Transport
    'transport.details': 'Στοιχεία Μεταφοράς',
    'distance': 'Απόσταση (km)',
    'fuel.cost': 'Κόστος Καυσίμου (€/km)',
    'tolls.cost': 'Κόστος Διοδίων (€)',
    'parking.cost': 'Κόστος Στάθμευσης (€)',
    'origin.address': 'Διεύθυνση Αποστολής',
    'destination.address': 'Διεύθυνση Παράδοσης',
    'calculate.route': 'Υπολογισμός Διαδρομής',
    
    // Calculate
    'calculate.costing': 'Υπολογισμός Κοστολόγησης',
    'calculating': 'Υπολογισμός...',
    'reset': 'Επαναφορά',
    
    // Results
    'results.title': 'Αποτελέσματα Κοστολόγησης',
    'total.cost': 'Συνολικό Κόστος',
    'selling.price': 'Τιμή Πώλησης',
    'profit.per.kg': 'Κέρδος/Κιλό',
    'profit.margin': 'Περιθώριο %'
  },
  en: {
    // Header
    'calculator.title': 'Costing Calculator',
    'calculator.subtitle': 'Professional Edition',
    'example.thrapsalo': 'Thrapsalo Example',
    'save': 'Save',
    'load': 'Load',
    'export.pdf': 'Export PDF',
    
    // Tabs
    'tab.basic': 'Basic Details',
    'tab.costs': 'Costs',
    'tab.transport': 'Transport',
    'tab.analysis': 'Analysis',
    'tab.advanced': 'Smart Analysis',
    
    // Basic tab
    'product.name': 'Product Name',
    'purchase.price': 'Purchase Price (€/kg)',
    'quantity': 'Quantity (kg)',
    'waste.percent': 'Waste (%)',
    'ice.percent': 'Ice (%)',
    'vat.percent': 'VAT (%)',
    
    // Workers
    'workers': 'Workers',
    'worker.hourly.rate': 'Hourly Rate (€)',
    'worker.hours': 'Working Hours',
    'add.worker': 'Add Worker',
    'remove.worker': 'Remove',
    
    // Transport
    'transport.details': 'Transport Details',
    'distance': 'Distance (km)',
    'fuel.cost': 'Fuel Cost (€/km)',
    'tolls.cost': 'Tolls Cost (€)',
    'parking.cost': 'Parking Cost (€)',
    'origin.address': 'Origin Address',
    'destination.address': 'Destination Address',
    'calculate.route': 'Calculate Route',
    
    // Calculate
    'calculate.costing': 'Calculate Costing',
    'calculating': 'Calculating...',
    'reset': 'Reset',
    
    // Results
    'results.title': 'Costing Results',
    'total.cost': 'Total Cost',
    'selling.price': 'Selling Price',
    'profit.per.kg': 'Profit/Kg',
    'profit.margin': 'Margin %'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'el' | 'en'>('el');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['el']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
