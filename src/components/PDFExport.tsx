
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface PDFExportProps {
  results: any;
  formData: any;
}

const PDFExport: React.FC<PDFExportProps> = ({ results, formData }) => {
  const { t, language } = useLanguage();

  const exportToPDF = async () => {
    try {
      const title = language === 'el' ? 'Αναφορά Κοστολόγησης' : 'Costing Report';
      const productLabel = language === 'el' ? 'Προϊόν:' : 'Product:';
      const dateLabel = language === 'el' ? 'Ημερομηνία:' : 'Date:';
      const basicDataLabel = language === 'el' ? 'Βασικά Στοιχεία' : 'Basic Data';
      const resultsLabel = language === 'el' ? 'Αποτελέσματα' : 'Results';
      const costAnalysisLabel = language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis';
      const explanationLabel = language === 'el' ? 'Επεξήγηση Αποτελεσμάτων' : 'Results Explanation';
      
      // Create comprehensive HTML content for PDF
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
            .explanation {
              background: #f0fdf4;
              border: 1px solid #bbf7d0;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
            }
            .explanation h3 {
              color: #15803d;
              margin-bottom: 15px;
            }
            .explanation ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .explanation li {
              margin: 5px 0;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #64748b;
              font-size: 0.9em;
              border-top: 1px solid #e2e8f0;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
            <p><strong>${productLabel}</strong> ${formData.productName || (language === 'el' ? 'Μη καθορισμένο' : 'Not specified')}</p>
            <p><strong>${dateLabel}</strong> ${new Date().toLocaleDateString(language === 'el' ? 'el-GR' : 'en-US')}</p>
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
                <span>${language === 'el' ? 'Πάγος:' : 'Ice:'}</span>
                <strong>${formData.icePercent || 0}%</strong>
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

          <div class="explanation">
            <h3>${explanationLabel}</h3>
            <p><strong>${language === 'el' ? 'Ανάλυση Κοστολόγησης:' : 'Costing Analysis:'}</strong></p>
            <ul>
              <li>${language === 'el' 
                ? `Το άμεσο κόστος (${((results?.purchaseCost || 0) + (results?.laborCost || 0)).toFixed(2)}€) περιλαμβάνει πρώτες ύλες και εργασία`
                : `Direct cost (€${((results?.purchaseCost || 0) + (results?.laborCost || 0)).toFixed(2)}) includes raw materials and labor`
              }</li>
              <li>${language === 'el' 
                ? `Το έμμεσο κόστος (${((results?.transportCost || 0) + (results?.additionalCosts || 0)).toFixed(2)}€) περιλαμβάνει μεταφορά και γενικά έξοδα`
                : `Indirect cost (€${((results?.transportCost || 0) + (results?.additionalCosts || 0)).toFixed(2)}) includes transport and general expenses`
              }</li>
              <li>${language === 'el' 
                ? `Το περιθώριο κέρδους ${formData.profitMargin || 0}% αντιστοιχεί σε κέρδος ${results?.profitPerKg?.toFixed(2) || 0}€ ανά κιλό`
                : `Profit margin of ${formData.profitMargin || 0}% equals €${results?.profitPerKg?.toFixed(2) || 0} profit per kg`
              }</li>
              <li>${language === 'el' 
                ? `Η τελική τιμή πώλησης διασφαλίζει κερδοφορία και κάλυψη όλων των κοστών`
                : `Final selling price ensures profitability and covers all costs`
              }</li>
            </ul>
            
            <p><strong>${language === 'el' ? 'Συστάσεις:' : 'Recommendations:'}</strong></p>
            <ul>
              <li>${language === 'el' 
                ? 'Παρακολουθήστε τακτικά τις αλλαγές στο κόστος πρώτων υλών'
                : 'Monitor changes in raw material costs regularly'
              }</li>
              <li>${language === 'el' 
                ? 'Εξετάστε βελτιστοποίηση των μεταφορικών κοστών'
                : 'Consider optimizing transport costs'
              }</li>
              <li>${language === 'el' 
                ? 'Αναλύστε την ανταγωνιστικότητα της τιμής στην αγορά'
                : 'Analyze price competitiveness in the market'
              }</li>
            </ul>
          </div>

          <div class="footer">
            <p>${language === 'el' ? 'Αναφορά παραχθείσα από τον Υπολογιστή Κόστους Pro' : 'Report generated by Cost Calculator Pro'}</p>
            <p>Design by Alexandros Kopanakis</p>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
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

  return (
    <Button variant="outline" size="sm" onClick={exportToPDF}>
      <FileText className="w-4 h-4 mr-2" />
      {t('export.pdf')}
    </Button>
  );
};

export default PDFExport;
