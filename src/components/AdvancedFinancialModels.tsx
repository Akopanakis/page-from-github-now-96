import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdvancedFinancialModels: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Προχωρημένα Χρηματοοικονομικά Μοντέλα"
              : "Advanced Financial Models"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Προχωρημένα χρηματοοικονομικά μοντέλα..."
            : "Advanced financial modeling tools..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialModels;
