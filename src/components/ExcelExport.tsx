import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToXLSX } from '@/utils/exportUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExcelExportProps {
  results: any;
  formData: any;
}

const ExcelExport: React.FC<ExcelExportProps> = ({ results, formData }) => {
  const { language } = useLanguage();

  const handleExport = () => {
    const data = [
      { label: language === 'el' ? 'Κόστος Αγοράς' : 'Purchase Cost', value: results.purchaseCost },
      { label: language === 'el' ? 'Κόστος Εργασίας' : 'Labor Cost', value: results.laborCost },
      { label: language === 'el' ? 'Συσκευασία' : 'Packaging', value: results.packagingCost },
      { label: language === 'el' ? 'Μεταφορικά' : 'Transport', value: results.transportCost },
      { label: language === 'el' ? 'Λοιπά Κόστη' : 'Additional Costs', value: results.additionalCosts },
      { label: language === 'el' ? 'Τελικό Κόστος' : 'Total Cost', value: results.totalCostWithVat }
    ];

    exportToXLSX(data, 'kostopro_results');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή σε Excel' : 'Export to Excel'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleExport} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Λήψη Excel' : 'Download Excel'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExcelExport;
