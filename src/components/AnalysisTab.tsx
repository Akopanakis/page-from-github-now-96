import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Target, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({
  formData,
  updateFormData,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Ανάλυση Ανταγωνισμού"
                : "Competitor Analysis"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="competitor1">
                {language === "el"
                  ? "Τιμή Ανταγωνιστή 1 (€/kg)"
                  : "Competitor 1 Price (€/kg)"}
              </Label>
              <Input
                id="competitor1"
                type="number"
                step="0.01"
                value={formData.competitor1 || ""}
                onChange={(e) =>
                  updateFormData({
                    competitor1: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitor2">
                {language === "el"
                  ? "Τιμή Ανταγωνιστή 2 (€/kg)"
                  : "Competitor 2 Price (€/kg)"}
              </Label>
              <Input
                id="competitor2"
                type="number"
                step="0.01"
                value={formData.competitor2 || ""}
                onChange={(e) =>
                  updateFormData({
                    competitor2: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>
              {language === "el" ? "Στόχοι Κέρδους" : "Profit Targets"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profitTarget">
                {language === "el" ? "Στόχος Κέρδους (€)" : "Profit Target (€)"}
              </Label>
              <Input
                id="profitTarget"
                type="number"
                step="0.01"
                value={formData.profitTarget || ""}
                onChange={(e) =>
                  updateFormData({
                    profitTarget: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumMargin">
                {language === "el"
                  ? "Ελάχιστο Περιθώριο (%)"
                  : "Minimum Margin (%)"}
              </Label>
              <Input
                id="minimumMargin"
                type="number"
                step="0.1"
                min="0"
                value={formData.minimumMargin || ""}
                onChange={(e) =>
                  updateFormData({
                    minimumMargin: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTab;
