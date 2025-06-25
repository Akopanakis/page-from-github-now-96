
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PremiumInfoCardProps {
  onUpgrade: () => void;
}

const PremiumInfoCard: React.FC<PremiumInfoCardProps> = ({ onUpgrade }) => {
  const { language } = useLanguage();

  const features = [
    language === 'el' ? '✓ Πολλαπλές φάσεις επεξεργασίας' : '✓ Multiple processing phases',
    language === 'el' ? '✓ Διαχείριση παρτίδων & ιχνηλασιμότητα' : '✓ Batch management & traceability',
    language === 'el' ? '✓ AI προβλέψεις τιμολόγησης' : '✓ AI pricing predictions',
    language === 'el' ? '✓ Προχωρημένες αναφορές' : '✓ Advanced reports',
    language === 'el' ? '✓ Εξαγωγή ετικετών & barcode' : '✓ Label & barcode export',
    language === 'el' ? '✓ Cloud backup & sync' : '✓ Cloud backup & sync'
  ];

  return (
    <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2 text-purple-800">
          <Crown className="w-6 h-6" />
          <span>{language === 'el' ? 'KostoPro Premium' : 'KostoPro Premium'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-purple-800 mb-1">€9.90</div>
          <div className="text-sm text-purple-600">{language === 'el' ? 'ανά μήνα' : 'per month'}</div>
        </div>
        
        <div className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-purple-700">
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
        >
          <Crown className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Δοκιμή Premium (Δωρεάν)' : 'Try Premium (Free)'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumInfoCard;
