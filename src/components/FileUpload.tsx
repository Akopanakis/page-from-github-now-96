
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface FileUploadProps {
  onDataExtracted: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataExtracted }) => {
  const { t, language } = useLanguage();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted data based on file type
      const mockData = {
        productName: language === 'el' ? 'Προϊόν από αρχείο' : 'Product from file',
        purchasePrice: 5.2,
        quantity: 300,
        waste: 20,
        workers: [
          { id: '1', hourlyRate: 5, hours: 2 },
          { id: '2', hourlyRate: 4.5, hours: 1.5 }
        ]
      };
      
      onDataExtracted(mockData);
      
      toast.success(
        language === 'el' 
          ? 'Το αρχείο αναλύθηκε επιτυχώς!' 
          : 'File analyzed successfully!'
      );
    } catch (error) {
      toast.error(
        language === 'el' 
          ? 'Σφάλμα κατά την ανάλυση του αρχείου' 
          : 'Error analyzing file'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-slate-200">
        <CardTitle className="flex items-center space-x-2 text-slate-800">
          <Upload className="w-5 h-5 text-purple-600" />
          <span>{t('upload.files')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 mb-4">
            {language === 'el' 
              ? 'Ανεβάστε αρχεία Excel, Word, PDF ή εικόνες' 
              : 'Upload Excel, Word, PDF or image files'
            }
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <FileSpreadsheet className="w-6 h-6 text-green-600" />
            <FileText className="w-6 h-6 text-blue-600" />
            <Image className="w-6 h-6 text-purple-600" />
          </div>
          <input
            type="file"
            accept=".xlsx,.xls,.docx,.doc,.pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Button 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={uploading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {uploading 
              ? (language === 'el' ? 'Ανάλυση...' : 'Analyzing...') 
              : (language === 'el' ? 'Επιλογή Αρχείου' : 'Choose File')
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
