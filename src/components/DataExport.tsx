import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToXLSX, exportToCSV } from '@/utils/exportUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DataExportProps {
  results: any;
  formData: any;
}

const DataExport: React.FC<DataExportProps> = ({ results, formData }) => {
  const { language, t } = useLanguage();

  // Combine available fields from formData and results
  const availableFields = React.useMemo(() => {
    const merged = { ...formData, ...results } as Record<string, any>;
    return Object.entries(merged)
      .filter(([, value]) => typeof value !== 'object')
      .map(([key]) => key);
  }, [formData, results]);

  const [selectedFields, setSelectedFields] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const defaults: Record<string, boolean> = {};
    availableFields.forEach((f) => {
      defaults[f] = true;
    });
    setSelectedFields(defaults);
  }, [availableFields]);

  const buildDataset = () => {
    const merged = { ...formData, ...results } as Record<string, any>;
    const row: Record<string, any> = {};
    Object.entries(merged).forEach(([key, value]) => {
      if (selectedFields[key]) {
        row[t(key) || key] = typeof value === 'number' ? value.toFixed(2) : value;
      }
    });
    return [row];
  };

  const handleExportXLSX = () => {
    exportToXLSX(buildDataset(), 'kostopro_results');
  };

  const handleExportCSV = () => {
    exportToCSV(buildDataset(), 'kostopro_results');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή Δεδομένων' : 'Data Export'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          {availableFields.map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <Checkbox
                id={field}
                checked={selectedFields[field]}
                onCheckedChange={(checked) =>
                  setSelectedFields((prev) => ({ ...prev, [field]: checked as boolean }))
                }
              />
              <Label htmlFor={field} className="text-sm cursor-pointer">
                {t(field) || field}
              </Label>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button onClick={handleExportXLSX} className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Λήψη Excel' : 'Download Excel'}
          </Button>
          <Button onClick={handleExportCSV} className="w-full" size="lg" variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Λήψη CSV' : 'Download CSV'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExport;
