import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScenarioAnalysisProps {
  baseResults: any;
  formData: any;
}

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({
  baseResults,
  formData,
}) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>
            {language === "el" ? "Ανάλυση Σεναρίων" : "Scenario Analysis"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Ανάλυση διαφορετικών σεναρίων κοστολόγησης..."
            : "Analysis of different costing scenarios..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default ScenarioAnalysis;
