
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Fish, 
  Target, 
  Database, 
  BarChart3, 
  Crown, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabsListProps {
  isPremium: boolean;
}

const MainTabsList: React.FC<TabsListProps> = ({ isPremium }) => {
  const { language } = useLanguage();

  return (
    <TabsList className="grid w-full grid-cols-8 bg-gray-50 border-b">
      <TabsTrigger value="basics" className="text-xs sm:text-sm flex items-center space-x-1">
        <Fish className="w-3 h-3" />
        <span>{language === 'el' ? 'Προϊόν' : 'Product'}</span>
      </TabsTrigger>
      {isPremium && (
        <>
          <TabsTrigger value="processing" className="text-xs sm:text-sm flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>{language === 'el' ? 'Επεξεργασία' : 'Processing'}</span>
          </TabsTrigger>
          <TabsTrigger value="batches" className="text-xs sm:text-sm flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>{language === 'el' ? 'Παρτίδες' : 'Batches'}</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm flex items-center space-x-1">
            <BarChart3 className="w-3 h-3" />
            <span>{language === 'el' ? 'Dashboard' : 'Dashboard'}</span>
          </TabsTrigger>
        </>
      )}
      <TabsTrigger value="costs" className="text-xs sm:text-sm">
        {language === 'el' ? 'Κόστη' : 'Costs'}
      </TabsTrigger>
      <TabsTrigger value="transport" className="text-xs sm:text-sm">
        {language === 'el' ? 'Μεταφορά' : 'Transport'}
      </TabsTrigger>
      <TabsTrigger value="analysis" className="text-xs sm:text-sm">
        {language === 'el' ? 'Ανάλυση' : 'Analysis'}
      </TabsTrigger>
      <TabsTrigger value="advanced" className="text-xs sm:text-sm flex items-center space-x-1">
        <Crown className="w-3 h-3" />
        <span>{language === 'el' ? 'Προχωρημένα' : 'Advanced'}</span>
      </TabsTrigger>
      <TabsTrigger value="tools" className="text-xs sm:text-sm flex items-center space-x-1">
        <Sparkles className="w-3 h-3" />
        <span>{language === 'el' ? 'Εργαλεία' : 'Tools'}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default MainTabsList;
