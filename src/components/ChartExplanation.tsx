
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChartExplanationProps {
  type: 'cost' | 'margin' | 'profitability' | 'scenario' | 'forecast';
  data?: any;
}

const ChartExplanation: React.FC<ChartExplanationProps> = ({ type, data }) => {
  const { t, language } = useLanguage();

  const getExplanation = () => {
    switch (type) {
      case 'cost':
        return language === 'el' 
          ? `Αυτό το γράφημα αναλύει τη σύνθεση του κόστους. Το άμεσο κόστος (${data?.directCost?.toFixed(2) || 0}€) περιλαμβάνει πρώτες ύλες και εργασία, ενώ το έμμεσο κόστος (${data?.indirectCost?.toFixed(2) || 0}€) περιλαμβάνει γενικά έξοδα λειτουργίας.`
          : `This chart analyzes cost composition. Direct cost (€${data?.directCost?.toFixed(2) || 0}) includes raw materials and labor, while indirect cost (€${data?.indirectCost?.toFixed(2) || 0}) includes general operating expenses.`;
      
      case 'margin':
        return language === 'el'
          ? `Ανάλυση περιθωρίων κέρδους: Εμφανίζει τη σχέση μεταξύ κόστους, τιμής πώλησης και κέρδους. Το τρέχον περιθώριο είναι ${data?.margin?.toFixed(1) || 0}%.`
          : `Margin analysis: Shows the relationship between cost, selling price and profit. Current margin is ${data?.margin?.toFixed(1) || 0}%.`;
      
      case 'profitability':
        return language === 'el'
          ? `Ανάλυση κερδοφορίας: Συγκρίνει έσοδα, κόστη και κέρδη. Το νεκρό σημείο επιτυγχάνεται όταν τα έσοδα ισούνται με το συνολικό κόστος.`
          : `Profitability analysis: Compares revenue, costs and profits. Break-even point is achieved when revenue equals total cost.`;
      
      case 'scenario':
        return language === 'el'
          ? `Ανάλυση σεναρίων: Εξετάζει διαφορετικές υποθέσεις για αλλαγές στις τιμές, κόστη ή ζήτηση. Βοηθά στη λήψη στρατηγικών αποφάσεων.`
          : `Scenario analysis: Examines different assumptions for changes in prices, costs or demand. Helps in strategic decision making.`;
      
      case 'forecast':
        return language === 'el'
          ? `Πρόβλεψη εσόδων: Εκτιμά μελλοντικά έσοδα βασισμένη σε ιστορικά δεδομένα, εποχικότητα και τάσεις αγοράς. Χρήσιμη για σχεδιασμό.`
          : `Revenue forecast: Estimates future revenue based on historical data, seasonality and market trends. Useful for planning.`;
      
      default:
        return '';
    }
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">{t('chart.explanation')}</h4>
            <p className="text-sm text-blue-700 leading-relaxed">{getExplanation()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartExplanation;
