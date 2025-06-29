import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AdvancedAnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
  results: any;
}

const AdvancedAnalysisTab: React.FC<AdvancedAnalysisTabProps> = ({
  formData,
  updateFormData,
  results,
}) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5" />
          <span>
            {language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Προχωρημένες αναλύσεις και προβλέψεις..."
            : "Advanced analytics and predictions..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalysisTab;
