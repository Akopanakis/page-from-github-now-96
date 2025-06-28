import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchProducts, Product } from "@/mock/product";

interface CalculationResult {
  totalCost: number;
  suggestedPrice: number;
  profit: number;
  margin: number;
  netWeight: number;
}

const PricingCalculator: React.FC = () => {
  const { language, currency } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    quantity: 100,
    wastePercent: 10,
    laborCost: 2.5,
    transportCost: 1.2,
    packagingCost: 0.8,
    targetMargin: 35,
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const calculatePricing = () => {
    if (!selectedProduct) return;

    setIsCalculating(true);

    setTimeout(() => {
      const netWeight = formData.quantity * (1 - formData.wastePercent / 100);
      const materialCost = selectedProduct.unitCost * formData.quantity;
      const laborCost = formData.laborCost * formData.quantity;
      const totalCost =
        materialCost +
        laborCost +
        formData.transportCost +
        formData.packagingCost;

      const suggestedPrice = totalCost * (1 + formData.targetMargin / 100);
      const profit = suggestedPrice - totalCost;
      const margin = (profit / suggestedPrice) * 100;

      setResult({
        totalCost,
        suggestedPrice,
        profit,
        margin,
        netWeight,
      });
      setIsCalculating(false);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "el" ? "el-GR" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>
              {language === "el"
                ? "Υπολογιστής Τιμολόγησης"
                : "Pricing Calculator"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>
              {language === "el" ? "Επιλογή Προϊόντος" : "Select Product"}
            </Label>
            <Select
              onValueChange={(value) => {
                const product = products.find((p) => p.id === value);
                setSelectedProduct(product || null);
              }}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === "el"
                      ? "Επιλέξτε προϊόν..."
                      : "Select product..."
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{product.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {formatCurrency(product.unitCost)}/kg
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProduct && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{selectedProduct.name}</span>
                <Badge variant="secondary">{selectedProduct.category}</Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {language === "el" ? "Προμηθευτής" : "Supplier"}:{" "}
                  {selectedProduct.supplier}
                </p>
                <p>
                  {language === "el" ? "Προέλευση" : "Origin"}:{" "}
                  {selectedProduct.origin}
                </p>
                <p>
                  {language === "el" ? "Ποιότητα" : "Quality"}:{" "}
                  {selectedProduct.qualityGrade}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                {language === "el" ? "Ποσότητα (kg)" : "Quantity (kg)"}
              </Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <Label>{language === "el" ? "Φύρα (%)" : "Waste (%)"}</Label>
              <Input
                type="number"
                value={formData.wastePercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wastePercent: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                {language === "el" ? "Εργατικά (€/kg)" : "Labor (€/kg)"}
              </Label>
              <Input
                type="number"
                step="0.1"
                value={formData.laborCost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    laborCost: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>
                {language === "el" ? "Μεταφορά (€)" : "Transport (€)"}
              </Label>
              <Input
                type="number"
                step="0.1"
                value={formData.transportCost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transportCost: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>
                {language === "el" ? "Συσκευασία (€)" : "Packaging (€)"}
              </Label>
              <Input
                type="number"
                step="0.1"
                value={formData.packagingCost}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    packagingCost: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>
                {language === "el"
                  ? "Στόχος Περιθωρίου (%)"
                  : "Target Margin (%)"}
              </Label>
              <Input
                type="number"
                value={formData.targetMargin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetMargin: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <Button
            onClick={calculatePricing}
            disabled={!selectedProduct || isCalculating}
            className="w-full"
          >
            {isCalculating ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                <span>
                  {language === "el" ? "Υπολογισμός..." : "Calculating..."}
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>
                  {language === "el" ? "Υπολογισμός Τιμής" : "Calculate Price"}
                </span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{language === "el" ? "Αποτελέσματα" : "Results"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">
                    {language === "el" ? "Συνολικό Κόστος" : "Total Cost"}
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatCurrency(result.totalCost)}
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">
                    {language === "el"
                      ? "Προτεινόμενη Τιμή"
                      : "Suggested Price"}
                  </div>
                  <div className="text-2xl font-bold text-green-800">
                    {formatCurrency(result.suggestedPrice)}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">
                    {language === "el" ? "Κέρδος" : "Profit"}
                  </div>
                  <div className="text-2xl font-bold text-purple-800">
                    {formatCurrency(result.profit)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Περιθώριο" : "Margin"}
                    </div>
                    <div className="font-bold text-gray-800">
                      {result.margin.toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-sm text-gray-600">
                      {language === "el" ? "Καθαρό Βάρος" : "Net Weight"}
                    </div>
                    <div className="font-bold text-gray-800">
                      {result.netWeight.toFixed(1)} kg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>
                {language === "el"
                  ? "Συμπληρώστε τα στοιχεία για υπολογισμό"
                  : "Fill in the details to calculate pricing"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCalculator;
