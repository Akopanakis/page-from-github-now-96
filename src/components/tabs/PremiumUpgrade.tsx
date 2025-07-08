
import React from 'react';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PremiumUpgradeProps {
  setIsPremium: (value: boolean) => void;
}

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ setIsPremium }) => {
  const { language } = useLanguage();

  return (
    <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <Crown className="w-16 h-16 mx-auto text-purple-400 mb-4" />
      <h3 className="text-xl font-bold text-purple-800 mb-2">
        {language === 'el' ? 'Αναβάθμιση σε Premium' : 'Upgrade to Premium'}
      </h3>
      <p className="text-purple-600 mb-4">
        {language === 'el' 
          ? 'Ξεκλειδώστε προχωρημένες λειτουργίες κοστολόγησης'
          : 'Unlock advanced costing features'
        }
      </p>
      <Button 
        onClick={() => setIsPremium(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Crown className="w-4 h-4 mr-2" />
        {language === 'el' ? 'Ενεργοποίηση Premium' : 'Enable Premium'}
      </Button>
    </div>
  );
};

export default PremiumUpgrade;
