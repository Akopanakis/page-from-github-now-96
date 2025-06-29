import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProcessingPhasesProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProcessingPhases: React.FC<ProcessingPhasesProps> = ({
  formData,
  updateFormData,
}) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>
            {language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Διαμόρφωση φάσεων επεξεργασίας προϊόντος..."
            : "Configure product processing phases..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProcessingPhases;
