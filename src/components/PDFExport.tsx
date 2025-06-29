import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PDFExportProps {
  formData: any;
  results: any;
  companyInfo: any;
}

const PDFExport: React.FC<PDFExportProps> = ({
  formData,
  results,
  companyInfo,
}) => {
  const { language } = useLanguage();

  const handleExport = () => {
    console.log("PDF Export functionality - to be implemented");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>{language === "el" ? "Εξαγωγή PDF" : "PDF Export"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleExport} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          {language === "el" ? "Κατέβασμα PDF" : "Download PDF"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFExport;
