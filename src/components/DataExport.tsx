import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Image } from 'lucide-react';
import { exportToXLSX, exportToCSV, exportElementToPNG } from '@/utils/exportUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface DataExportProps {
  results: any;
  formData: any;
}

const DataExport: React.FC<DataExportProps> = ({ results, formData }) => {
  const { language } = useLanguage();

  const buildDataset = () => [{ ...formData, ...results }];

  const handleExportXLSX = () => {
    exportToXLSX(buildDataset(), 'kostopro_results');
  };

  const handleExportCSV = () => {
    exportToCSV(buildDataset(), 'kostopro_results');
  };

  const handleExportPNG = () => {
    exportElementToPNG('report-preview', 'kostopro_snapshot');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή Δεδομένων' : 'Data Export'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Button onClick={handleExportXLSX} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Λήψη Excel' : 'Download Excel'}
          </Button>
          <Button onClick={handleExportCSV} className="w-full" size="lg" variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Λήψη CSV' : 'Download CSV'}
          </Button>
          <Button onClick={handleExportPNG} className="w-full" size="lg" variant="outline">
            <Image className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Στιγμιότυπο' : 'Snapshot Export'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExport;
