
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReportsTabProps {
  formData: any;
  updateFormData: (data: any) => void;
  results?: any;
}

const ReportsTab: React.FC<ReportsTabProps> = ({ formData, results }) => {
  const { language } = useLanguage();

  const generatePDFReport = () => {
    // PDF generation logic would go here
    console.log('Generating PDF report...');
  };

  const generateExcelReport = () => {
    // Excel generation logic would go here
    console.log('Generating Excel report...');
  };

  const printReport = () => {
    window.print();
  };

  const emailReport = () => {
    // Email functionality would go here
    console.log('Sending email report...');
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>{language === 'el' ? 'Αναφορές και Εξαγωγή' : 'Reports and Export'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={generatePDFReport} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{language === 'el' ? 'Εξαγωγή PDF' : 'Export PDF'}</span>
            </Button>

            <Button onClick={generateExcelReport} variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>{language === 'el' ? 'Εξαγωγή Excel' : 'Export Excel'}</span>
            </Button>

            <Button onClick={printReport} variant="outline" className="flex items-center space-x-2">
              <Printer className="w-4 h-4" />
              <span>{language === 'el' ? 'Εκτύπωση' : 'Print'}</span>
            </Button>

            <Button onClick={emailReport} variant="outline" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{language === 'el' ? 'Αποστολή Email' : 'Send Email'}</span>
            </Button>
          </div>

          {results && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'el' ? 'Περίληψη Αποτελεσμάτων' : 'Results Summary'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{language === 'el' ? 'Συνολικό Κόστος:' : 'Total Cost:'}</span>
                  <span>€{results.totalCost?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'el' ? 'Κόστος ανά Κιλό:' : 'Cost per Kg:'}</span>
                  <span>€{results.costPerKg?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'el' ? 'Περιθώριο Κέρδους:' : 'Profit Margin:'}</span>
                  <span>{results.profitMargin?.toFixed(1) || '0.0'}%</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
