
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'el' | 'en';
  setLanguage: (lang: 'el' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  el: {
    // Basic fields
    'product.name': 'Όνομα Προϊόντος',
    'purchase.price': 'Τιμή Αγοράς (€/κιλό)',
    'quantity': 'Ποσότητα (κιλά)',
    'waste': 'Φύρα (%)',
    'glazing.percent': 'Ποσοστό Γλασαρίσματος (%)', // Updated from ice
    'vat.percent': 'ΦΠΑ (%)',
    'profit.margin': 'Περιθώριο Κέρδους (%)',
    'profit.target': 'Στόχος Κέρδους (€)',
    
    // Transport
    'origin.address': 'Διεύθυνση Αναχώρησης',
    'destination.address': 'Διεύθυνση Προορισμού',
    'distance': 'Απόσταση (χλμ)',
    'fuel.cost': 'Κόστος Καυσίμου (€)',
    'parking.cost': 'Κόστος Στάθμευσης (€)',
    'calculate.route': 'Υπολογισμός Διαδρομής',
    
    // Workers
    'workers': 'Εργαζόμενοι',
    'hourly.rate': 'Ωριαία Αμοιβή (€)',
    'hours': 'Ώρες Εργασίας',
    
    // Costs
    'packaging.cost': 'Κόστος Συσκευασίας (€)',
    'electricity.cost': 'Κόστος Ηλεκτρικού (€)',
    'equipment.cost': 'Κόστος Εξοπλισμού (€)',
    'insurance.cost': 'Κόστος Ασφάλισης (€)',
    'rent.cost': 'Κόστος Ενοικίου (€)',
    'communication.cost': 'Κόστος Επικοινωνίας (€)',
    'other.costs': 'Άλλα Κόστη (€)',
    
    // Analysis
    'cost.analysis': 'Ανάλυση Κόστους',
    'margin.analysis': 'Ανάλυση Περιθωρίων',
    'profitability.analysis': 'Ανάλυση Κερδοφορίας',
    'chart.explanation': 'Εξήγηση Γραφήματος',
    
    // Results
    'total.cost': 'Συνολικό Κόστος',
    'selling.price': 'Τιμή Πώλησης',
    'profit.per.kg': 'Κέρδος ανά Κιλό',
    'net.weight': 'Καθαρό Βάρος',
    
    // Actions
    'calculate': 'Υπολογισμός',
    'reset': 'Επαναφορά',
    'export.pdf': 'Εξαγωγή PDF',
    'add.worker': 'Προσθήκη Εργαζομένου',
    'remove.worker': 'Αφαίρεση Εργαζομένου'
  },
  en: {
    // Basic fields
    'product.name': 'Product Name',
    'purchase.price': 'Purchase Price (€/kg)',
    'quantity': 'Quantity (kg)',
    'waste': 'Waste (%)',
    'glazing.percent': 'Glazing Percentage (%)', // Updated from ice
    'vat.percent': 'VAT (%)',
    'profit.margin': 'Profit Margin (%)',
    'profit.target': 'Profit Target (€)',
    
    // Transport
    'origin.address': 'Origin Address',
    'destination.address': 'Destination Address',
    'distance': 'Distance (km)',
    'fuel.cost': 'Fuel Cost (€)',
    'parking.cost': 'Parking Cost (€)',
    'calculate.route': 'Calculate Route',
    
    // Workers
    'workers': 'Workers',
    'hourly.rate': 'Hourly Rate (€)',
    'hours': 'Working Hours',
    
    // Costs
    'packaging.cost': 'Packaging Cost (€)',
    'electricity.cost': 'Electricity Cost (€)',
    'equipment.cost': 'Equipment Cost (€)',
    'insurance.cost': 'Insurance Cost (€)',
    'rent.cost': 'Rent Cost (€)',
    'communication.cost': 'Communication Cost (€)',
    'other.costs': 'Other Costs (€)',
    
    // Analysis
    'cost.analysis': 'Cost Analysis',
    'margin.analysis': 'Margin Analysis',
    'profitability.analysis': 'Profitability Analysis',
    'chart.explanation': 'Chart Explanation',
    
    // Results
    'total.cost': 'Total Cost',
    'selling.price': 'Selling Price',
    'profit.per.kg': 'Profit per Kg',
    'net.weight': 'Net Weight',
    
    // Actions
    'calculate': 'Calculate',
    'reset': 'Reset',
    'export.pdf': 'Export PDF',
    'add.worker': 'Add Worker',
    'remove.worker': 'Remove Worker'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'el' | 'en'>('el');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
