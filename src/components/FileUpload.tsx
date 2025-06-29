import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FileUploadProps {
  onFileUpload: (data: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const { language } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder for file processing
      console.log("File uploaded:", file.name);
      // For now, just call onFileUpload with empty data
      onFileUpload({});
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>{language === "el" ? "Ανέβασμα Αρχείου" : "File Upload"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  {language === "el"
                    ? "Κάντε κλικ για ανέβασμα"
                    : "Click to upload"}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Excel, CSV {language === "el" ? "ή" : "or"} JSON
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv,.json"
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
