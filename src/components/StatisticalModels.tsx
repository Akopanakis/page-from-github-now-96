import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatisticalModelsProps {
  formData: any;
  results: any;
}

const StatisticalModels: React.FC<StatisticalModelsProps> = ({
  formData,
  results,
}) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart className="w-5 h-5" />
          <span>
            {language === "el" ? "Στατιστικά Μοντέλα" : "Statistical Models"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Στατιστικά μοντέλα και αναλύσεις..."
            : "Statistical models and analysis..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatisticalModels;
