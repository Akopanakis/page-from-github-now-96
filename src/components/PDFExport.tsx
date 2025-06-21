
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
  const { t } = useLanguage();

  const exportToPDF = async () => {
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Αναφορά Κοστολόγησης</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            .result-box { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; }
            .cost-item { display: flex; justify-content: space-between; margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Αναφορά Κοστολόγησης</h1>
            <p>Προϊόν: ${formData.productName || 'Μη καθορισμένο'}</p>
            <p>Ημερομηνία: ${new Date().toLocaleDateString('el-GR')}</p>
          </div>
          
          <div class="section">
            <h2>Βασικά Στοιχεία</h2>
            <div class="grid">
              <div class="cost-item"><span>Τιμή Αγοράς:</span><span>${formData.purchasePrice || 0}€/κιλό</span></div>
              <div class="cost-item"><span>Ποσότητα:</span><span>${formData.quantity || 0} κιλά</span></div>
              <div class="cost-item"><span>Απώλεια:</span><span>${formData.waste || 0}%</span></div>
              <div class="cost-item"><span>Πάγος:</span><span>${formData.icePercent || 0}%</span></div>
            </div>
          </div>

          <div class="section">
            <h2>Αποτελέσματα</h2>
            <div class="grid">
              <div class="result-box">
                <h3>Συνολικό Κόστος</h3>
                <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${results?.totalCost?.toFixed(2) || 0}€</p>
              </div>
              <div class="result-box">
                <h3>Τιμή Πώλησης</h3>
                <p style="font-size: 24px; font-weight: bold; color: #16a34a;">${results?.sellingPrice?.toFixed(2) || 0}€/κιλό</p>
              </div>
              <div class="result-box">
                <h3>Κέρδος ανά Κιλό</h3>
                <p style="font-size: 24px; font-weight: bold; color: #7c3aed;">${results?.profitPerKg?.toFixed(2) || 0}€</p>
              </div>
              <div class="result-box">
                <h3>Περιθώριο Κέρδους</h3>
                <p style="font-size: 24px; font-weight: bold; color: #ea580c;">${results?.profitMargin?.toFixed(1) || 0}%</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Ανάλυση Κόστους</h2>
            <div class="card">
              <div class="cost-item"><span>Κόστος Αγοράς:</span><span>${results?.purchaseCost?.toFixed(2) || 0}€</span></div>
              <div class="cost-item"><span>Κόστος Εργασίας:</span><span>${results?.laborCost?.toFixed(2) || 0}€</span></div>
              <div class="cost-item"><span>Κόστος Συσκευασίας:</span><span>${results?.packagingCost?.toFixed(2) || 0}€</span></div>
              <div class="cost-item"><span>Κόστος Μεταφοράς:</span><span>${results?.transportCost?.toFixed(2) || 0}€</span></div>
              <div class="cost-item"><span>Επιπλέον Κόστη:</span><span>${results?.additionalCosts?.toFixed(2) || 0}€</span></div>
              <div class="cost-item"><span>ΦΠΑ:</span><span>${results?.vatAmount?.toFixed(2) || 0}€</span></div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `κοστολογηση_${formData.productName || 'προιον'}_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Η αναφορά εξήχθη επιτυχώς!');
    } catch (error) {
      toast.error('Σφάλμα κατά την εξαγωγή του PDF');
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
