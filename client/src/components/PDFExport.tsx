import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import ExportPreview from './ExportPreview';
import { exportToPDF, generatePDFBlob } from '@/utils/exportUtils';

import { CompanyInfo } from '@/types/company';

interface PDFExportProps {
  results: any;
  formData: any;
  companyInfo?: CompanyInfo;
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

const PDFExport: React.FC<PDFExportProps> = ({ results, formData, companyInfo }) => {
  const { language } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    profitAnalysis: true,
    competitorComparison: false
  });
  const [template, setTemplate] = useState<Template>('classic');
  const [includeTables, setIncludeTables] = useState(true);
  const [includeComments, setIncludeComments] = useState(true);
  const [includeQr, setIncludeQr] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pdfUrl, setPdfUrl] = useState<string>();

  // HTML content builder (themes + options)
  const buildHtmlContent = () => {
    const t = templates[template];
    const title = language === 'el' ? 'Αναφορά Κοστολόγησης' : 'Costing Report';
    const productLabel = language === 'el' ? 'Προϊόν:' : 'Product:';
    const dateLabel = language === 'el' ? 'Ημερομηνία:' : 'Date:';
    const resultsLabel = language === 'el' ? 'Αποτελέσματα' : 'Results';
    const costAnalysisLabel = language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis';
    const summaryLabel = language === 'el' ? 'Περίληψη' : 'Summary';

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
    if (selectedCharts.competitorComparison) {
      chartSections.push(`
        <div class="section">
          <h2>${language === 'el' ? 'Σύγκριση Ανταγωνισμού' : 'Competitor Comparison'}</h2>
        </div>
      `);
    }

    const themeCSS = `
      body { font-family: ${t.font}; background: ${theme === 'dark' ? '#1f2937' : t.background}; color: ${theme === 'dark' ? '#fff' : t.text}; margin:20px; }
      .header { background: ${t.headerBg}; color:${t.headerColor}; text-align:center; padding:20px; }
      .logo { max-height:60px; margin-bottom:10px; }
      .section{margin-bottom:20px}
    `;

    const logo = companyInfo?.logoUrl ? `<img src="${companyInfo.logoUrl}" class="logo" />` : `<div>${t.logo}</div>`;
    const name = companyInfo?.name ? `<h2>${companyInfo.name}</h2>` : '';
    const address = companyInfo?.address ? `<p>${companyInfo.address}</p>` : '';

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title><style>${themeCSS}</style></head><body>
      <div class="header">${logo}${name}<h1>${title}</h1>${address}
        <p><strong>${productLabel}</strong> ${formData.productName || ''}</p>
        <p><strong>${dateLabel}</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      ${includeTables ? `<div class="section"><h2>${resultsLabel}</h2>
        <p>${language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}: ${results?.totalCost?.toFixed(2) || 0}€</p>
        <p>${language === 'el' ? 'Τιμή Πώλησης' : 'Selling Price'}: ${results?.sellingPrice?.toFixed(2) || 0}€</p>
      </div>` : ''}
      <div class="section"><h2>${costAnalysisLabel}</h2></div>
      ${chartSections.join('')}
      ${includeComments ? `<div class="section"><h2>${summaryLabel}</h2><p>${language === 'el' ? 'Ευχαριστούμε που χρησιμοποιήσατε την εφαρμογή.' : 'Thank you for using the app.'}</p></div>` : ''}
      ${includeQr ? `<div class="section"><img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.href)}" alt="QR Code" /></div>` : ''}
    </body></html>`;
  };

  const previewHtml = useMemo(buildHtmlContent, [results, formData, template, selectedCharts, language, includeTables, includeComments, includeQr, theme, companyInfo]);

  useEffect(() => {
    const generate = async () => {
      const blob = await generatePDFBlob(previewHtml, {
        sections: {
          charts: true,
          tables: includeTables,
          comments: includeComments,
        },
        theme,
        qrUrl: includeQr ? window.location.href : undefined,
      });
      const url = URL.createObjectURL(blob);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    };
    generate();
    return () => {
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return undefined;
      });
    };
  }, [previewHtml, includeTables, includeComments, includeQr, theme]);

  const exportToPDFHandler = async () => {
    try {
      const htmlContent = buildHtmlContent();
      await exportToPDF(
        htmlContent,
        `${language === 'el' ? 'κοστολογηση' : 'costing'}_${formData.productName || 'product'}_${new Date().toISOString().split('T')[0]}.pdf`,
        {
          sections: {
            charts: true,
            tables: includeTables,
            comments: includeComments,
          },
          theme,
          qrUrl: includeQr ? window.location.href : undefined,
        }
      );
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
        <ExportPreview
          preview={previewHtml}
          pdfSrc={pdfUrl}
          theme={template}
          onThemeChange={setTemplate}
        >
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
              <span className="ml-2">{language === 'el' ? 'Template:' : 'Template:'}</span>
              <select value={template} onChange={(e) => setTemplate(e.target.value as Template)} className="border rounded p-1 text-sm ml-2">
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
          </div>

          <Button onClick={exportToPDFHandler} className="w-full mt-4" size="lg">
            <Download className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
          </Button>
        </ExportPreview>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
