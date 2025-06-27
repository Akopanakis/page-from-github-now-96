
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/exportUtils';

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
  const [includeTables, setIncludeTables] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [includeQr, setIncludeQr] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const exportToPDFHandler = async () => {
    try {
      const title = language === 'el' ? 'Αναφορά Κοστολόγησης' : 'Costing Report';
      const productLabel = language === 'el' ? 'Προϊόν:' : 'Product:';
      const dateLabel = language === 'el' ? 'Ημερομηνία:' : 'Date:';
      const basicDataLabel = language === 'el' ? 'Βασικά Στοιχεία' : 'Basic Data';
      const resultsLabel = language === 'el' ? 'Αποτελέσματα' : 'Results';
      const summaryLabel = language === 'el' ? 'Περίληψη' : 'Summary';

      const chartSections: string[] = [];
      if (selectedCharts.costBreakdown) {
        chartSections.push(`<div class="section chart-section" id="chart-1"><h2>${language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown'}</h2></div>`);
      }
      if (selectedCharts.profitAnalysis) {
        chartSections.push(`<div class="section chart-section" id="chart-2"><h2>${language === 'el' ? 'Ανάλυση Κερδοφορίας' : 'Profitability Analysis'}</h2></div>`);
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; margin:20px; line-height:1.6; color:${theme === 'dark' ? '#fff' : '#333'}; background:${theme === 'dark' ? '#1f2937' : '#fff'}; }
            .section{ margin-bottom:20px; }
            .toc ul{ list-style:none; padding-left:0; }
            .toc li{ margin:4px 0; }
          </style>
        </head>
        <body>
          <div class="toc">
            <h1>${title}</h1>
            <ul>
              <li><a href="#basic">${basicDataLabel}</a></li>
              ${includeTables ? `<li><a href="#results">${resultsLabel}</a></li>` : ''}
              ${chartSections.length ? `<li><a href="#charts">${language === 'el' ? 'Γραφήματα' : 'Charts'}</a></li>` : ''}
              ${includeComments ? `<li><a href="#comments">${language === 'el' ? 'Σχόλια' : 'Comments'}</a></li>` : ''}
            </ul>
          </div>

          <div id="basic" class="section table-section">
            <h2>${basicDataLabel}</h2>
            <p><strong>${productLabel}</strong> ${formData.productName || '-'}</p>
            <p><strong>${dateLabel}</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          ${includeTables ? `<div id="results" class="section table-section"><h2>${resultsLabel}</h2><p>${language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}: ${results?.totalCost?.toFixed(2) || 0}€</p></div>` : ''}
          ${chartSections.length ? `<div id="charts" class="section chart-section">${chartSections.join('')}</div>` : ''}
          ${includeComments ? `<div id="comments" class="section comments-section"><h2>${summaryLabel}</h2><p>${language === 'el' ? 'Ευχαριστούμε που χρησιμοποιήσατε την εφαρμογή.' : 'Thank you for using the app.'}</p></div>` : ''}
        </body>
        </html>`;

      await exportToPDF(htmlContent, 'report', {
        sections: { charts: chartSections.length > 0, tables: includeTables, comments: includeComments },
        theme,
        qrUrl: includeQr ? window.location.href : undefined,
      });

      toast.success(language === 'el' ? 'Η αναφορά εξήχθη επιτυχώς!' : 'Report exported successfully!');
    } catch {
      toast.error(language === 'el' ? 'Σφάλμα κατά την εξαγωγή του PDF' : 'Error exporting PDF');
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

        <div className="space-y-2 pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="includeTables" checked={includeTables} onCheckedChange={(c) => setIncludeTables(c as boolean)} />
            <label htmlFor="includeTables" className="text-sm">{language === 'el' ? 'Πίνακες' : 'Tables'}</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="includeComments" checked={includeComments} onCheckedChange={(c) => setIncludeComments(c as boolean)} />
            <label htmlFor="includeComments" className="text-sm">{language === 'el' ? 'Σχόλια' : 'Comments'}</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="includeQr" checked={includeQr} onCheckedChange={(c) => setIncludeQr(c as boolean)} />
            <label htmlFor="includeQr" className="text-sm">QR Code</label>
          </div>
          <div>
            <label className="text-sm mr-2" htmlFor="themeSelect">{language === 'el' ? 'Θέμα' : 'Theme'}</label>
            <select id="themeSelect" value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')} className="border rounded p-1 text-sm">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        <Button onClick={exportToPDFHandler} className="w-full mt-4" size="lg">
          <Download className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
