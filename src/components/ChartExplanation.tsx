import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChartExplanationProps {
  type: string;
  data?: any;
}

const ChartExplanation: React.FC<ChartExplanationProps> = ({ type, data }) => {
  const { language } = useLanguage();

  const getExplanation = () => {
    switch (type) {
      case "cost":
        return {
          title: language === "el" ? "Ανάλυση Κόστους" : "Cost Analysis",
          content:
            language === "el"
              ? "Αυτό το γράφημα δείχνει την κατανομή του συνολικού κόστους ανά κατηγορία, βοηθώντας σας να εντοπίσετε περιοχές εξοικονόμησης."
              : "This chart shows the distribution of total cost by category, helping you identify areas for cost savings.",
        };
      case "margin":
        return {
          title: language === "el" ? "Ανάλυση Περιθωρίων" : "Margin Analysis",
          content:
            language === "el"
              ? "Απεικονίζει τη σχέση μεταξύ κόστους και κέρδους για την κατανόηση της κερδοφορίας."
              : "Illustrates the relationship between cost and profit for profitability understanding.",
        };
      case "profitability":
        return {
          title:
            language === "el"
              ? "Ανάλυση Κερδοφορίας"
              : "Profitability Analysis",
          content:
            language === "el"
              ? "Δείχνει πώς αλλάζει η κερδοφορία με το χρόνο και τις εποχιακές διακυμάνσεις."
              : "Shows how profitability changes over time and seasonal fluctuations.",
        };
      default:
        return {
          title: language === "el" ? "Εξήγηση Γραφήματος" : "Chart Explanation",
          content:
            language === "el"
              ? "Αυτό το γράφημα παρέχει χρήσιμες πληροφορίες για την ανάλυση των δεδομένων σας."
              : "This chart provides useful insights for analyzing your data.",
        };
    }
  };

  const explanation = getExplanation();

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">
              {explanation.title}
            </h4>
            <p className="text-sm text-blue-700">{explanation.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartExplanation;
