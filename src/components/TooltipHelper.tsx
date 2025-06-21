
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TooltipHelperProps {
  tooltipKey: string;
  className?: string;
}

const TooltipHelper: React.FC<TooltipHelperProps> = ({ tooltipKey, className = '' }) => {
  const { language } = useLanguage();

  const tooltips = {
    'tooltip.profit.margin': {
      el: 'Το ποσοστό κέρδους που θέλετε να επιτύχετε. Υπολογίζεται ως: (Κέρδος / Κόστος) × 100',
      en: 'The profit percentage you want to achieve. Calculated as: (Profit / Cost) × 100'
    },
    'tooltip.profit.target': {
      el: 'Το συγκεκριμένο ποσό κέρδους που στοχεύετε σε ευρώ. Το σύστημα θα υπολογίσει το αντίστοιχο ποσοστό.',
      en: 'The specific profit amount you target in euros. The system will calculate the corresponding percentage.'
    },
    'tooltip.price.increase': {
      el: 'Ποσοστιαία αύξηση της τιμής πώλησης. Θετικό για αύξηση, αρνητικό για μείωση.',
      en: 'Percentage increase in selling price. Positive for increase, negative for decrease.'
    },
    'tooltip.cost.increase': {
      el: 'Ποσοστιαία αύξηση του κόστους παραγωγής. Επηρεάζει όλα τα κόστη παραγωγής.',
      en: 'Percentage increase in production cost. Affects all production costs.'
    },
    'tooltip.demand.change': {
      el: 'Ποσοστιαία αλλαγή στη ζήτηση του προϊόντος. Επηρεάζει τον όγκο πωλήσεων.',
      en: 'Percentage change in product demand. Affects sales volume.'
    },
    'tooltip.scenario.analysis': {
      el: 'Ανάλυση διαφορετικών σεναρίων για να κατανοήσετε πώς οι αλλαγές επηρεάζουν την κερδοφορία.',
      en: 'Analysis of different scenarios to understand how changes affect profitability.'
    },
    'tooltip.revenue.forecasting': {
      el: 'Πρόβλεψη μελλοντικών εσόδων με βάση ιστορικά δεδομένα και τάσεις αγοράς.',
      en: 'Forecast future revenue based on historical data and market trends.'
    },
    'tooltip.financial.glossary': {
      el: 'Λεξικό οικονομικών όρων για καλύτερη κατανόηση της κοστολόγησης και οικονομικής ανάλυσης.',
      en: 'Dictionary of financial terms for better understanding of costing and financial analysis.'
    },
    'tooltip.statistical.models': {
      el: 'Προηγμένα στατιστικά μοντέλα που παρέχουν εξατομικευμένες συστάσεις βάσει των δεδομένων σας.',
      en: 'Advanced statistical models that provide personalized recommendations based on your data.'
    },
    'tooltip.cost.control': {
      el: 'Σύστημα ελέγχου και παρακολούθησης κόστους για βελτιστοποίηση της κερδοφορίας.',
      en: 'Cost control and monitoring system for profitability optimization.'
    },
    'tooltip.glazing.percentage': {
      el: 'Ποσοστό γλασαρίσματος που προστίθεται στο προϊόν για διατήρηση και παρουσίαση.',
      en: 'Glazing percentage added to the product for preservation and presentation.'
    },
    'tooltip.driver.salary': {
      el: 'Κόστος μισθού οδηγού για τη μεταφορά των προϊόντων. Υπολογίζεται ανά διαδρομή.',
      en: 'Driver salary cost for product transportation. Calculated per route.'
    },
    'tooltip.google.maps': {
      el: 'Αυτόματος υπολογισμός απόστασης και κόστους μεταφοράς μέσω Google Maps.',
      en: 'Automatic distance and transport cost calculation via Google Maps.'
    }
  };

  const tooltipText = tooltips[tooltipKey as keyof typeof tooltips]?.[language] || 
                     'No tooltip available for this field.';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className={`w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipHelper;
