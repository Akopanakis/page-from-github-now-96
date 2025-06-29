import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RevenueForecastingProps {
  formData: any;
  results: any;
}

const RevenueForecasting: React.FC<RevenueForecastingProps> = ({
  formData,
  results,
}) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LineChart className="w-5 h-5" />
          <span>
            {language === "el" ? "Πρόβλεψη Εσόδων" : "Revenue Forecasting"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Προβλέψεις μελλοντικών εσόδων..."
            : "Future revenue predictions..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default RevenueForecasting;
