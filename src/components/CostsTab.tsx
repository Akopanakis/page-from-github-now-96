import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Euro, Package, Zap, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CostsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const CostsTab: React.FC<CostsTabProps> = ({ formData, updateFormData }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Packaging Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>
              {language === "el" ? "Κόστη Συσκευασίας" : "Packaging Costs"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="boxCost">
                {language === "el" ? "Κόστος Κουτιού (€)" : "Box Cost (€)"}
              </Label>
              <Input
                id="boxCost"
                type="number"
                step="0.01"
                value={formData.boxCost || ""}
                onChange={(e) =>
                  updateFormData({ boxCost: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bagCost">
                {language === "el" ? "Κόστος Σακούλας (€)" : "Bag Cost (€)"}
              </Label>
              <Input
                id="bagCost"
                type="number"
                step="0.01"
                value={formData.bagCost || ""}
                onChange={(e) =>
                  updateFormData({ bagCost: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>
              {language === "el" ? "Λειτουργικά Κόστη" : "Operational Costs"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="electricityCost">
                {language === "el"
                  ? "Κόστος Ρεύματος (€)"
                  : "Electricity Cost (€)"}
              </Label>
              <Input
                id="electricityCost"
                type="number"
                step="0.01"
                value={formData.electricityCost || ""}
                onChange={(e) =>
                  updateFormData({
                    electricityCost: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equipmentCost">
                {language === "el"
                  ? "Κόστος Εξοπλισμού (€)"
                  : "Equipment Cost (€)"}
              </Label>
              <Input
                id="equipmentCost"
                type="number"
                step="0.01"
                value={formData.equipmentCost || ""}
                onChange={(e) =>
                  updateFormData({
                    equipmentCost: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rentCost">
                {language === "el" ? "Κόστος Ενοικίου (€)" : "Rent Cost (€)"}
              </Label>
              <Input
                id="rentCost"
                type="number"
                step="0.01"
                value={formData.rentCost || ""}
                onChange={(e) =>
                  updateFormData({ rentCost: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherCosts">
                {language === "el" ? "Άλλα Κόστη (€)" : "Other Costs (€)"}
              </Label>
              <Input
                id="otherCosts"
                type="number"
                step="0.01"
                value={formData.otherCosts || ""}
                onChange={(e) =>
                  updateFormData({
                    otherCosts: parseFloat(e.target.value) || 0,
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

export default CostsTab;
