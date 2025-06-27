import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import ExportPreview from './ExportPreview';

interface PDFExportProps {
  results: any;
  formData: any;
}

type Template = 'classic' | 'modern' | 'minimal';

const templates = {
  classic: {
    font: "'Times New Roman', serif",
    background: '#ffffff',
    text: '#333333',
    headerBg: '#003366',
    headerColor: '#ffffff',
    logo: 'KostoPro'
  },
  modern: {
    font: 'Arial, sans-serif',
    background: '#f9fafb',
    text: '#1f2937',
    headerBg: '#4f46e5',
    headerColor: '#ffffff',
    logo: 'KostoPro'
  },
  minimal: {
    font: 'Helvetica, sans-serif',
    background: '#ffffff',
    text: '#374151',
    headerBg: '#ffffff',
    headerColor: '#111827',
    logo: 'KostoPro'
  }
} as const;

const PDFExport: React.FC<PDFExportProps> = ({ results, formData }) => {
  const { language } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    profitAnalysis: true,
    competitorComparison: false
  });
  const [template, setTemplate] = useState<Template>('classic');

  const buildHtmlContent = () => {
    const t = templates[template];
    const title = language === 'el' ? 'Αναφορά Κοστολόγησης' : 'Costing Report';
    const productLabel = language === 'el' ? 'Προϊόν:' : 'Product:';
    const dateLabel = language === 'el' ? 'Ημερομηνία:' : 'Date:';
    const resultsLabel = language === 'el' ? 'Αποτελέσματα' : 'Results';
    const costAnalysisLabel = language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis';

    const chartSections: string[] = [];
    if (selectedCharts.costBreakdown) {
      chartSections.push(`
        <div class="section">
          <h2>${language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown'}</h2>
        </div>
      `);
    }
    if (selectedCharts.profitAnalysis) {
      chartSections.push(`
        <div class="section">
          <h2>${language === 'el' ? 'Ανάλυση Κερδοφορίας' : 'Profitability Analysis'}</h2>
        </div>
      `);
    }

    const themeCSS = `
      body { font-family: ${t.font}; background: ${t.background}; color: ${t.text}; margin:20px; }
      .header { background: ${t.headerBg}; color:${t.headerColor}; text-align:center; padding:20px; }
    `;

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>${themeCSS}
      .section{margin-bottom:20px}
    </style></head><body>
      <div class="header"><div>${t.logo}</div><h1>${title}</h1>
        <p><strong>${productLabel}</strong> ${formData.productName || ''}</p>
        <p><strong>${dateLabel}</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      <div class="section"><h2>${resultsLabel}</h2>
        <p>${language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}: ${results?.totalCost?.toFixed(2) || 0}€</p>
        <p>${language === 'el' ? 'Τιμή Πώλησης' : 'Selling Price'}: ${results?.sellingPrice?.toFixed(2) || 0}€</p>
      </div>
      <div class="section"><h2>${costAnalysisLabel}</h2></div>
      ${chartSections.join('')}
    </body></html>`;
  };

  const previewHtml = useMemo(buildHtmlContent, [results, formData, template, selectedCharts, language]);

  const exportToPDF = async () => {
    try {
      const htmlContent = buildHtmlContent();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${language === 'el' ? 'κοστολογηση' : 'costing'}_${formData.productName || 'product'}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(language === 'el' ? 'Η αναφορά εξήχθη επιτυχώς!' : 'Report exported successfully!');
    } catch (err) {
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
        <ExportPreview preview={previewHtml} theme={template} onThemeChange={setTemplate}>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">
              {language === 'el' ? 'Επιλέξτε γραφήματα για εξαγωγή:' : 'Select charts to export:'}
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="costBreakdown"
                  checked={selectedCharts.costBreakdown}
                  onCheckedChange={(checked) => setSelectedCharts(prev => ({ ...prev, costBreakdown: checked as boolean }))}
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
                  onCheckedChange={(checked) => setSelectedCharts(prev => ({ ...prev, profitAnalysis: checked as boolean }))}
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
                  onCheckedChange={(checked) => setSelectedCharts(prev => ({ ...prev, competitorComparison: checked as boolean }))}
                />
                <label htmlFor="competitorComparison" className="text-sm flex items-center space-x-2">
                  <PieChart className="w-4 h-4" />
                  <span>{language === 'el' ? 'Σύγκριση Ανταγωνισμού' : 'Competitor Comparison'}</span>
                </label>
              </div>
            </div>
            <Button onClick={exportToPDF} className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
            </Button>
          </div>
        </ExportPreview>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
