import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SmartInsightsPanelProps {
  results: any;
  formData: any;
}

const SmartInsightsPanel: React.FC<SmartInsightsPanelProps> = ({
  results,
  formData,
}) => {
  const { language } = useLanguage();

  const insights = [
    {
      type: "info",
      icon: TrendingUp,
      title: language === "el" ? "Ανάλυση Αγοράς" : "Market Analysis",
      content:
        language === "el"
          ? "Η τιμή σας είναι ανταγωνιστική στην αγορά"
          : "Your price is competitive in the market",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: language === "el" ? "Προσοχή" : "Warning",
      content:
        language === "el"
          ? "Υψηλό κόστος μεταφοράς - εξετάστε εναλλακτικές"
          : "High transport cost - consider alternatives",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5" />
          <span>
            {language === "el" ? "Έξυπνες Συμβουλές" : "Smart Insights"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
            >
              <insight.icon
                className={`w-5 h-5 mt-0.5 ${
                  insight.type === "warning"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              />
              <div>
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{insight.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartInsightsPanel;
