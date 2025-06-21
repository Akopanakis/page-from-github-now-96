
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { language } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const acceptedFormats = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.ms-excel': '.xls',
    'text/csv': '.csv',
    'application/pdf': '.pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'image/jpeg': '.jpg',
    'image/png': '.png'
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!Object.keys(acceptedFormats).includes(file.type)) {
      toast.error(
        language === 'el' 
          ? 'Μη υποστηριζόμενος τύπος αρχείου' 
          : 'Unsupported file type'
      );
      return;
    }

    setUploadedFile(file);
    
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data extraction based on file type
      const mockData = {
        productName: language === 'el' ? 'Προϊόν από αρχείο' : 'Product from file',
        purchasePrice: 5.50,
        quantity: 100,
        waste: 5,
        profitMargin: 25
      };
      
      onFileUpload(mockData);
      
      toast.success(
        language === 'el' 
          ? 'Το αρχείο επεξεργάστηκε επιτυχώς!' 
          : 'File processed successfully!'
      );
    } catch (error) {
      toast.error(
        language === 'el' 
          ? 'Σφάλμα κατά την επεξεργασία του αρχείου' 
          : 'Error processing file'
      );
      setUploadedFile(null);
    }
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes('image')) return <Image className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <Card className="border-dashed border-2 border-slate-300 hover:border-blue-400 transition-colors">
      <CardContent className="p-6">
        <div
          className={`relative rounded-lg border-2 border-dashed transition-colors ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : uploadedFile 
                ? 'border-green-500 bg-green-50' 
                : 'border-slate-300 hover:border-blue-400'
          } p-6 text-center`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={Object.keys(acceptedFormats).join(',')}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />
          
          <div className="space-y-4">
            {uploadedFile ? (
              <>
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    {language === 'el' ? 'Αρχείο ανέβηκε επιτυχώς!' : 'File uploaded successfully!'}
                  </h3>
                  <p className="text-sm text-green-600 flex items-center justify-center space-x-2 mt-2">
                    {getFileTypeIcon(uploadedFile.type)}
                    <span>{uploadedFile.name}</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className={`w-12 h-12 mx-auto ${isDragging ? 'text-blue-600' : 'text-slate-400'}`} />
                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">
                    {language === 'el' 
                      ? 'Ανεβάστε το αρχείο σας' 
                      : 'Upload your file'
                    }
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {language === 'el' 
                      ? 'Σύρετε και αφήστε ή κάντε κλικ για επιλογή'
                      : 'Drag and drop or click to select'
                    }
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {language === 'el' ? 'Επιλογή Αρχείου' : 'Choose File'}
                    </label>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* File Format Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === 'el' ? 'Οδηγίες Αρχείου' : 'File Instructions'}
              </h4>
              <div className="text-sm text-blue-700 space-y-2">
                <p>
                  <strong>{language === 'el' ? 'Υποστηριζόμενοι τύποι:' : 'Supported types:'}</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Excel (.xlsx, .xls), CSV - {language === 'el' ? 'για δεδομένα προϊόντων' : 'for product data'}</li>
                  <li>PDF, Word (.docx) - {language === 'el' ? 'για εξαγωγή κειμένου' : 'for text extraction'}</li>
                  <li>JPG, PNG - {language === 'el' ? 'για OCR και ανάλυση εικόνας' : 'for OCR and image analysis'}</li>
                </ul>
                <p className="mt-3">
                  <strong>{language === 'el' ? 'Απαιτούμενες στήλες για Excel/CSV:' : 'Required columns for Excel/CSV:'}</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{language === 'el' ? 'Όνομα Προϊόντος' : 'Product Name'}</li>
                  <li>{language === 'el' ? 'Τιμή Αγοράς' : 'Purchase Price'}</li>
                  <li>{language === 'el' ? 'Ποσότητα' : 'Quantity'}</li>
                  <li>{language === 'el' ? 'Φύρα % (προαιρετικό)' : 'Waste % (optional)'}</li>
                  <li>{language === 'el' ? 'Περιθώριο Κέρδους % (προαιρετικό)' : 'Profit Margin % (optional)'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Supported formats */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(acceptedFormats).map((format) => (
            <span
              key={format}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
            >
              {format}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
