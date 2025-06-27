
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface CompanyInfo {
  logoUrl: string;
  companyName: string;
  contact: string;
}

interface PDFExportProps {
  results: any;
  formData: any;
  theme: 'classic' | 'modern' | 'minimal';
  companyInfo: CompanyInfo;
  previewEnabled?: boolean;
}

const PDFExport: React.FC<PDFExportProps> = ({
  results,
  formData,
  theme,
  companyInfo,
  previewEnabled = false
}) => {
  const { language } = useLanguage();
  const [selectedCharts, setSelectedCharts] = useState({
    costBreakdown: true,
    profitAnalysis: true,
    competitorComparison: false,
    financialForecast: false
  });
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');

  const getThemeStyle = (current: 'classic' | 'modern' | 'minimal') => {
    switch (current) {
      case 'modern':
        return `
          body { background: #f8fafc; color: #0f172a; }
          .header h1 { color: #0e7490; }
          .section { background: #ffffff; border-left-color: #0ea5e9; }
          .highlight { background: linear-gradient(135deg, #06b6d4, #3b82f6); }
        `;
      case 'minimal':
        return `
          body { background: #ffffff; color: #000000; }
          .header { border-bottom: none; }
          .section { background: none; border-left-color: #9ca3af; }
          .highlight { background: #f3f4f6; color: #000; }
        `;
      default:
        return '';
    }
  };

  const buildHtml = () => {
    const title = language === 'el' ? 'Αναφορά Κοστολόγησης' : 'Costing Report';
    const productLabel = language === 'el' ? 'Προϊόν:' : 'Product:';
    const dateLabel = language === 'el' ? 'Ημερομηνία:' : 'Date:';
    const basicDataLabel = language === 'el' ? 'Βασικά Στοιχεία' : 'Basic Data';
    const resultsLabel = language === 'el' ? 'Αποτελέσματα' : 'Results';
    const costAnalysisLabel = language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis';
    const summaryLabel = language === 'el' ? 'Περίληψη με Βασικά Σημεία' : 'Summary with Key Points';
    const keyPointsLabel = language === 'el' ? 'Βασικά Σημεία:' : 'Key Points:';

    const chartSections = [] as string[];

    if (selectedCharts.costBreakdown) {
      chartSections.push(`
          <div class="section">
            <h2>${language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown'}</h2>
            <div class="chart-explanation">
              <p>${language === 'el'
                ? 'Το γράφημα δείχνει την κατανομή των κοστών ανά κατηγορία. Το μεγαλύτερο κόστος προέρχεται από την αγορά πρώτων υλών.'
                : 'The chart shows cost distribution by category. The largest cost comes from raw material purchase.'
              }</p>
            </div>
          </div>
        `);
    }

    if (selectedCharts.profitAnalysis) {
      chartSections.push(`
          <div class="section">
            <h2>${language === 'el' ? 'Ανάλυση Κερδοφορίας' : 'Profitability Analysis'}</h2>
            <div class="chart-explanation">
              <p>${language === 'el'
                ? 'Η ανάλυση δείχνει το περιθώριο κέρδους και τη σχέση κόστους-εσόδων. Υψηλότερο περιθώριο σημαίνει καλύτερη κερδοφορία.'
                : 'The analysis shows profit margin and cost-revenue relationship. Higher margin means better profitability.'
              }</p>
            </div>
          </div>
        `);
    }

    const themeStyle = getThemeStyle(theme);

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #1e40af;
              margin-bottom: 10px;
            }
            .company-info { text-align:center; margin-bottom:10px; }
            .company-info img { max-height:60px; margin:0 auto 10px; }
            .company-info h2 { margin:0; font-size:1.1em; }
            .company-info p { margin:0; font-size:0.9em; }
            .section {
              margin-bottom: 30px;
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
            }
            .section h2 {
              color: #1e40af;
              margin-bottom: 15px;
              font-size: 1.2em;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 20px;
            }
            .cost-item {
              display: flex;
              justify-content: space-between;
              margin: 8px 0;
              padding: 8px;
              background: white;
              border-radius: 4px;
            }
            .cost-item strong {
              color: #1e40af;
            }
            .result-box {
              background: #f0f9ff;
              padding: 20px;
              margin: 15px 0;
              border-radius: 8px;
              border: 1px solid #bae6fd;
            }
            .result-box h3 {
              color: #0c4a6e;
              margin-bottom: 10px;
            }
            .highlight {
              background: linear-gradient(135deg, #3b82f6, #1d4ed8);
              color: white;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              margin: 10px 0;
            }
            .summary {
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .summary h3 {
              color: #15803d;
              margin-bottom: 15px;
            }
            .summary ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .summary li {
              margin: 8px 0;
              line-height: 1.5;
            }
            .chart-explanation {
              background: #fef3c7;
              border: 1px solid #fcd34d;
              padding: 15px;
              border-radius: 6px;
              margin-top: 15px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #64748b;
              font-size: 0.9em;
              border-top: 1px solid #e2e8f0;
              padding-top: 20px;
            }
            .key-points {
              background: #eff6ff;
              border: 1px solid #bfdbfe;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .key-points h4 {
              color: #1e40af;
              margin-bottom: 10px;
            }
            ${themeStyle}
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-info">
              <img src="${companyInfo.logoUrl}" alt="${companyInfo.companyName} logo" />
              <h2>${companyInfo.companyName}</h2>
              <p>${companyInfo.contact}</p>
            </div>
            <h1>${title}</h1>
            <p><strong>${productLabel}</strong> ${formData.productName || (language === 'el' ? 'Μη καθορισμένο' : 'Not specified')}</p>
            <p><strong>${dateLabel}</strong> ${new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US')}</p>
          </div>

          <div class="summary">
            <h3>${summaryLabel}</h3>
            <div class="key-points">
              <h4>${keyPointsLabel}</h4>
              <ul>
                <li><strong>${language === 'el' ? 'Υπολογισμός ρυθμού ανάπτυξης:' : 'Growth rate calculation:'}</strong> ${language === 'el'
                  ? 'Ο υπολογισμός γίνεται με τον τύπο: (Τελική Αξία / Αρχική Αξία) - 1. Απαιτούνται η τελική και η αρχική τιμή για τον υπολογισμό του ποσοστού ανάπτυξης.'
                  : 'Calculated using: (Final Value / Initial Value) - 1. Requires final and initial values to calculate growth percentage.'
                }</li>
                <li><strong>${language === 'el' ? 'Επενδυτική στρατηγική:' : 'Investment strategy:'}</strong> ${language === 'el'
                  ? 'Λήψη επενδυτικών αποφάσεων με βάση τον υπολογισμό του ποσοστού ανάπτυξης και την ανάλυση κινδύνου.'
                  : 'Making investment decisions based on growth rate calculation and risk analysis.'
                }</li>
                <li><strong>${language === 'el' ? 'Παρούσα Αξία (PV):' : 'Present Value (PV):'}</strong> ${language === 'el'
                  ? 'Διερευνάται η έννοια της παρούσας αξίας για την αξιολόγηση επενδυτικών επιλογών.'
                  : 'Exploring the concept of present value to evaluate investment options.'
                }</li>
                <li><strong>${language === 'el' ? 'Κόστος Ευκαιρίας:' : 'Opportunity Cost:'}</strong> ${language === 'el'
                  ? 'Η απόδοση που χάνετε επιλέγοντας μια επένδυση αντί για την καλύτερη εναλλακτική.'
                  : 'The return you give up by choosing one investment over the best alternative.'
                }</li>
                <li><strong>${language === 'el' ? 'Ανάλυση Νεκρού Σημείου:' : 'Break-even Analysis:'}</strong> ${language === 'el'
                  ? 'Δείχνει εύκολα την ποσότητα που απαιτείται για να καλύψει το σταθερό κόστος.'
                  : 'Easily shows the quantity required to cover fixed costs.'
                }</li>
              </ul>
            </div>
          </div>

          <div class="section">
            <h2>${basicDataLabel}</h2>
            <div class="grid">
              <div class="cost-item">
                <span>${language === 'el' ? 'Τιμή Αγοράς:' : 'Purchase Price:'}</span>
                <strong>${formData.purchasePrice || 0}€/${language === 'el' ? 'κιλό' : 'kg'}</strong>
              </div>
              <div class="cost-item">
                <span>${language === 'el' ? 'Ποσότητα:' : 'Quantity:'}</span>
                <strong>${formData.quantity || 0} ${language === 'el' ? 'κιλά' : 'kg'}</strong>
              </div>
              <div class="cost-item">
                <span>${language === 'el' ? 'Απώλεια:' : 'Waste:'}</span>
                <strong>${formData.waste || 0}%</strong>
              </div>
              <div class="cost-item">
                <span>${language === 'el' ? 'Ποσοστό Γλασσαρίσματος:' : 'Glazing Percentage:'}</span>
                <strong>${formData.glazingPercent || 0}%</strong>
              </div>
              <div class="cost-item">
                <span>${language === 'el' ? 'ΦΠΑ:' : 'VAT:'}</span>
                <strong>${formData.vatPercent || 0}%</strong>
              </div>
              <div class="cost-item">
                <span>${language === 'el' ? 'Περιθώριο Κέρδους:' : 'Profit Margin:'}</span>
                <strong>${formData.profitMargin || 0}%</strong>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>${resultsLabel}</h2>
            <div class="grid">
              <div class="result-box">
                <h3>${language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}</h3>
                <div class="highlight">
                  <span style="font-size: 24px; font-weight: bold;">${results?.totalCost?.toFixed(2) || 0}€</span>
                </div>
              </div>
              <div class="result-box">
                <h3>${language === 'el' ? 'Τιμή Πώλησης' : 'Selling Price'}</h3>
                <div class="highlight">
                  <span style="font-size: 24px; font-weight: bold;">${results?.sellingPrice?.toFixed(2) || 0}€/${language === 'el' ? 'κιλό' : 'kg'}</span>
                </div>
              </div>
              <div class="result-box">
                <h3>${language === 'el' ? 'Κέρδος ανά Κιλό' : 'Profit per Kg'}</h3>
                <div class="highlight">
                  <span style="font-size: 24px; font-weight: bold;">${results?.profitPerKg?.toFixed(2) || 0}€</span>
                </div>
              </div>
              <div class="result-box">
                <h3>${language === 'el' ? 'Καθαρό Βάρος' : 'Net Weight'}</h3>
                <div class="highlight">
                  <span style="font-size: 24px; font-weight: bold;">${results?.netWeight?.toFixed(2) || 0} ${language === 'el' ? 'κιλά' : 'kg'}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>${costAnalysisLabel}</h2>
            <div class="cost-item">
              <span>${language === 'el' ? 'Κόστος Αγοράς:' : 'Purchase Cost:'}</span>
              <strong>${results?.purchaseCost?.toFixed(2) || 0}€</strong>
            </div>
            <div class="cost-item">
              <span>${language === 'el' ? 'Κόστος Εργασίας:' : 'Labor Cost:'}</span>
              <strong>${results?.laborCost?.toFixed(2) || 0}€</strong>
            </div>
            <div class="cost-item">
              <span>${language === 'el' ? 'Κόστος Συσκευασίας:' : 'Packaging Cost:'}</span>
              <strong>${results?.packagingCost?.toFixed(2) || 0}€</strong>
            </div>
            <div class="cost-item">
              <span>${language === 'el' ? 'Κόστος Μεταφοράς:' : 'Transport Cost:'}</span>
              <strong>${results?.transportCost?.toFixed(2) || 0}€</strong>
            </div>
            <div class="cost-item">
              <span>${language === 'el' ? 'Επιπλέον Κόστη:' : 'Additional Costs:'}</span>
              <strong>${results?.additionalCosts?.toFixed(2) || 0}€</strong>
            </div>
            <div class="cost-item">
              <span>${language === 'el' ? 'ΦΠΑ:' : 'VAT:'}</span>
              <strong>${results?.vatAmount?.toFixed(2) || 0}€</strong>
            </div>
          </div>

          ${chartSections.join('')}

          <div class="footer">
            <p>${language === 'el' ? 'Αναφορά παραχθείσα από τον Υπολογιστή Κόστους Pro' : 'Report generated by Cost Calculator Pro'}</p>
            <p>Design by Alexandros Kopanakis</p>
          </div>
        </body>
        </html>
      `;

    return htmlContent;
  };

  const exportToPDF = async () => {
    try {
      const htmlContent = buildHtml();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${language === 'el' ? 'κοστολογηση' : 'costing'}_${formData.productName || 'product'}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

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

  const handlePreview = () => {
    setPreviewHtml(buildHtml());
    setIsPreviewOpen(true);
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

        {previewEnabled && (
          <Button onClick={handlePreview} variant="secondary" className="w-full" size="lg">
            <FileText className="w-4 h-4 mr-2" />
            {language === 'el' ? 'Προεπισκόπηση' : 'Preview'}
          </Button>
        )}

        <Button onClick={exportToPDF} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Εξαγωγή Αναφοράς' : 'Export Report'}
        </Button>
      </CardContent>
    </Card>

    {previewEnabled && (
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'el' ? 'Προεπισκόπηση Αναφοράς' : 'Report Preview'}
            </DialogTitle>
          </DialogHeader>
          <iframe className="w-full h-[70vh]" srcDoc={previewHtml} title="preview" />
          <div className="flex justify-end pt-4">
            <Button onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              {language === 'el' ? 'Λήψη' : 'Download'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )}
  );
};

export default PDFExport;
