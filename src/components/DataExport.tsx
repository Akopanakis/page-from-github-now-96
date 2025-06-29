import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DataExportProps {
  formData: any;
  results: any;
}

const DataExport: React.FC<DataExportProps> = ({ formData, results }) => {
  const { language } = useLanguage();

  const handleExportCSV = () => {
    console.log("CSV Export functionality - to be implemented");
  };

  const handleExportExcel = () => {
    console.log("Excel Export functionality - to be implemented");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <span>{language === "el" ? "Εξαγωγή Δεδομένων" : "Data Export"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={handleExportCSV} variant="outline" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          {language === "el" ? "Εξαγωγή CSV" : "Export CSV"}
        </Button>
        <Button
          onClick={handleExportExcel}
          variant="outline"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {language === "el" ? "Εξαγωγή Excel" : "Export Excel"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataExport;
