import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
  isPremium: boolean;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({
  formData,
  updateFormData,
  isPremium,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productName">
            {language === "el" ? "Όνομα Προϊόντος" : "Product Name"}
          </Label>
          <Input
            id="productName"
            value={formData.productName || ""}
            onChange={(e) => updateFormData({ productName: e.target.value })}
            placeholder={language === "el" ? "π.χ. Τσιπούρα" : "e.g. Sea Bream"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productType">
            {language === "el" ? "Τύπος Προϊόντος" : "Product Type"}
          </Label>
          <Select
            value={formData.productType || "fish"}
            onValueChange={(value) => updateFormData({ productType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fish">
                {language === "el" ? "Ψάρι" : "Fish"}
              </SelectItem>
              <SelectItem value="squid">
                {language === "el" ? "Καλαμάρι" : "Squid"}
              </SelectItem>
              <SelectItem value="octopus">
                {language === "el" ? "Χταπόδι" : "Octopus"}
              </SelectItem>
              <SelectItem value="other">
                {language === "el" ? "Άλλο" : "Other"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchasePrice">
            {language === "el" ? "Τιμή Αγοράς (€/kg)" : "Purchase Price (€/kg)"}
          </Label>
          <Input
            id="purchasePrice"
            type="number"
            step="0.01"
            value={formData.purchasePrice || ""}
            onChange={(e) =>
              updateFormData({ purchasePrice: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">
            {language === "el" ? "Ποσότητα (kg)" : "Quantity (kg)"}
          </Label>
          <Input
            id="quantity"
            type="number"
            step="0.1"
            value={formData.quantity || ""}
            onChange={(e) =>
              updateFormData({ quantity: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="waste">
            {language === "el" ? "Απώλειες (%)" : "Waste (%)"}
          </Label>
          <Input
            id="waste"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.waste || ""}
            onChange={(e) =>
              updateFormData({ waste: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="glazingPercent">
            {language === "el" ? "Γλασσάρισμα (%)" : "Glazing (%)"}
          </Label>
          <Input
            id="glazingPercent"
            type="number"
            step="0.1"
            min="0"
            value={formData.glazingPercent || ""}
            onChange={(e) =>
              updateFormData({
                glazingPercent: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vatPercent">
            {language === "el" ? "ΦΠΑ (%)" : "VAT (%)"}
          </Label>
          <Input
            id="vatPercent"
            type="number"
            step="0.1"
            min="0"
            value={formData.vatPercent || ""}
            onChange={(e) =>
              updateFormData({ vatPercent: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profitMargin">
            {language === "el" ? "Περιθώριο Κέρδους (%)" : "Profit Margin (%)"}
          </Label>
          <Input
            id="profitMargin"
            type="number"
            step="0.1"
            min="0"
            value={formData.profitMargin || ""}
            onChange={(e) =>
              updateFormData({ profitMargin: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductBasics;
