import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fish, Package, Euro, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductBasicsProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const ProductBasics: React.FC<ProductBasicsProps> = ({
  formData,
  updateFormData,
}) => {
  const { language } = useLanguage();

  // Set default VAT to 0% if not set
  React.useEffect(() => {
    if (typeof formData.vatRate === "undefined") {
      updateFormData({ vatRate: 0 });
    }
  }, [formData.vatRate, updateFormData]);

  return (
    <div className="space-y-6">
      {/* Basic Product Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Fish className="w-5 h-5 text-blue-600" />
            </div>
            {language === "el"
              ? "Βασικά Στοιχεία Προϊόντος"
              : "Basic Product Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="productName"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Όνομα Προϊόντος" : "Product Name"} *
              </Label>
              <Input
                id="productName"
                value={formData.productName || ""}
                onChange={(e) =>
                  updateFormData({ productName: e.target.value })
                }
                placeholder={
                  language === "el"
                    ? "π.χ. Τσιπούρα Φρέσκια"
                    : "e.g. Fresh Sea Bream"
                }
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="productType"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Τύπος Προϊόντος" : "Product Type"}
              </Label>
              <Select
                value={formData.productType || "fish"}
                onValueChange={(value) =>
                  updateFormData({ productType: value })
                }
              >
                <SelectTrigger className="h-11 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fish">
                    {language === "el" ? "Ψάρι" : "Fish"}
                  </SelectItem>
                  <SelectItem value="shellfish">
                    {language === "el" ? "Οστρακοειδή" : "Shellfish"}
                  </SelectItem>
                  <SelectItem value="cephalopods">
                    {language === "el" ? "Κεφαλόποδα" : "Cephalopods"}
                  </SelectItem>
                  <SelectItem value="processed">
                    {language === "el" ? "Επεξεργασμένα" : "Processed"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="weight"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Βάρος (kg)" : "Weight (kg)"} *
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                min="0"
                value={formData.weight || ""}
                onChange={(e) =>
                  updateFormData({ weight: parseFloat(e.target.value) || 0 })
                }
                placeholder="0.00"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="quantity"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Ποσότητα (τεμάχια)" : "Quantity (pieces)"}
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity || "1"}
                onChange={(e) =>
                  updateFormData({ quantity: parseInt(e.target.value) || 1 })
                }
                placeholder="1"
                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Euro className="w-5 h-5 text-green-600" />
            </div>
            {language === "el" ? "Στοιχεία Τιμολόγησης" : "Pricing Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="purchasePrice"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el"
                  ? "Τιμή Αγοράς (€/kg)"
                  : "Purchase Price (€/kg)"}{" "}
                *
              </Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="purchasePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.purchasePrice || ""}
                  onChange={(e) =>
                    updateFormData({
                      purchasePrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                  className="h-11 pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="targetSellingPrice"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el"
                  ? "Τιμή Πώλησης (€/kg)"
                  : "Target Selling Price (€/kg)"}
              </Label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="targetSellingPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.targetSellingPrice || ""}
                  onChange={(e) =>
                    updateFormData({
                      targetSellingPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                  className="h-11 pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="profitMargin"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el"
                  ? "Περιθώριο Κέρδους (%)"
                  : "Profit Margin (%)"}
              </Label>
              <div className="relative">
                <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="profitMargin"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.profitMargin || ""}
                  onChange={(e) =>
                    updateFormData({
                      profitMargin: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="20.0"
                  className="h-11 pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="vatRate"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Συντελεστής ΦΠΑ (%)" : "VAT Rate (%)"}
              </Label>
              <Select
                value={formData.vatRate?.toString() || "0"}
                onValueChange={(value) =>
                  updateFormData({ vatRate: parseFloat(value) })
                }
              >
                <SelectTrigger className="h-11 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    0% {language === "el" ? "(Απαλλαγή)" : "(Exempt)"}
                  </SelectItem>
                  <SelectItem value="6">
                    6% {language === "el" ? "(Μειωμένος)" : "(Reduced)"}
                  </SelectItem>
                  <SelectItem value="13">
                    13% {language === "el" ? "(Μειωμένος)" : "(Reduced)"}
                  </SelectItem>
                  <SelectItem value="24">
                    24% {language === "el" ? "(Κανονικός)" : "(Standard)"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* VAT Calculation Display */}
          {formData.targetSellingPrice > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-3">
                {language === "el" ? "Ανάλυση Τιμής" : "Price Breakdown"}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">
                    {language === "el" ? "Καθαρή αξία:" : "Net value:"}
                  </span>
                  <div className="font-semibold text-blue-900">
                    €
                    {(
                      formData.targetSellingPrice /
                      (1 + (formData.vatRate || 0) / 100)
                    ).toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">
                    {language === "el" ? "ΦΠΑ:" : "VAT:"}
                  </span>
                  <div className="font-semibold text-blue-900">
                    €
                    {(
                      formData.targetSellingPrice -
                      formData.targetSellingPrice /
                        (1 + (formData.vatRate || 0) / 100)
                    ).toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">
                    {language === "el" ? "Τελική τιμή:" : "Final price:"}
                  </span>
                  <div className="font-semibold text-blue-900">
                    €{formData.targetSellingPrice.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">
                    {language === "el" ? "Συνολικό βάρος:" : "Total weight:"}
                  </span>
                  <div className="font-semibold text-blue-900">
                    {(formData.weight * (formData.quantity || 1)).toFixed(2)} kg
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quality & Origin */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            {language === "el" ? "Ποιότητα & Προέλευση" : "Quality & Origin"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="origin"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Προέλευση" : "Origin"}
              </Label>
              <Input
                id="origin"
                value={formData.origin || ""}
                onChange={(e) => updateFormData({ origin: e.target.value })}
                placeholder={
                  language === "el" ? "π.χ. Μεσόγειος" : "e.g. Mediterranean"
                }
                className="h-11 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="quality"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Κατηγορία Ποιότητας" : "Quality Grade"}
              </Label>
              <Select
                value={formData.quality || "A"}
                onValueChange={(value) => updateFormData({ quality: value })}
              >
                <SelectTrigger className="h-11 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">
                    A - {language === "el" ? "Εξαιρετική" : "Excellent"}
                  </SelectItem>
                  <SelectItem value="B">
                    B - {language === "el" ? "Καλή" : "Good"}
                  </SelectItem>
                  <SelectItem value="C">
                    C - {language === "el" ? "Μέτρια" : "Average"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="notes"
                className="text-sm font-medium text-gray-700"
              >
                {language === "el" ? "Επιπλέον Σημειώσεις" : "Additional Notes"}
              </Label>
              <textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => updateFormData({ notes: e.target.value })}
                placeholder={
                  language === "el"
                    ? "Οποιεσδήποτε επιπλέον πληροφορίες..."
                    : "Any additional information..."
                }
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductBasics;
