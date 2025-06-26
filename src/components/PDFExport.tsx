
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { exportToPDF as saveElementAsPDF } from '@/utils/exportUtils';

interface PDFExportProps {
  results: any;
  formData: any;
}

const PDFExport: React.FC<PDFExportProps> = ({ results, formData }) => {
  const { language } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    profitAnalysis: true,
    competitorComparison: false,
    financialForecast: false
  });

  const exportToPDF = async () => {
    try {
      await saveElementAsPDF('root', language === 'el' ? 'αναφορά' : 'report');
      toast.success(
        language === 'el'
          ? 'Η αναφορά εξήχθη επιτυχώς!'
          : 'Report exported successfully!'
      );
    } catch (error) {
      toast.error(
        language === 'el'
          ? 'Σφάλμα κατά την εξαγωγή του PDF'
          : 'Error exporting PDF'
      );
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>{language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">
            {language === 'el' ? 'Επιλέξτε γραφήματα για εξαγωγή:' : 'Select charts to export:'}
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="costBreakdown"
                checked={selectedCharts.costBreakdown}
                onCheckedChange={(checked) => 
                  setSelectedCharts(prev => ({ ...prev, costBreakdown: checked as boolean }))
                }
              />
              <label htmlFor="costBreakdown" className="text-sm flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>{language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown'}</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="profitAnalysis"
                checked={selectedCharts.profitAnalysis}
                onCheckedChange={(checked) => 
                  setSelectedCharts(prev => ({ ...prev, profitAnalysis: checked as boolean }))
                }
              />
              <label htmlFor="profitAnalysis" className="text-sm flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>{language === 'el' ? 'Ανάλυση Κερδοφορίας' : 'Profitability Analysis'}</span>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="competitorComparison"
                checked={selectedCharts.competitorComparison}
                onCheckedChange={(checked) => 
                  setSelectedCharts(prev => ({ ...prev, competitorComparison: checked as boolean }))
                }
              />
              <label htmlFor="competitorComparison" className="text-sm flex items-center space-x-2">
                <PieChart className="w-4 h-4" />
                <span>{language === 'el' ? 'Σύγκριση Ανταγωνισμού' : 'Competitor Comparison'}</span>
              </label>
            </div>
          </div>
        </div>

        <Button onClick={exportToPDF} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
