import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayCircle,
  X,
  Fish,
  Calculator,
  TrendingUp,
  Package,
  Truck,
  DollarSign,
  Info,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExampleDataProps {
  onLoadExample: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const ExampleData: React.FC<ExampleDataProps> = ({
  onLoadExample,
  onClose,
  isVisible,
}) => {
  const { language } = useLanguage();

  if (!isVisible) return null;

  const exampleData = {
    productName: "Θράψαλο Block Αργεντίνης",
    productType: "fish",
    weight: 10, // kg per piece
    quantity: 200, // pieces (2 tons total)
    purchasePrice: 4.5, // €/kg
    origin: "Αργεντίνη",
    quality: "A",
    supplierName: "Κοπανάκης",
    processingPhases: [
      {
        id: "1",
        name: "Καθάρισμα",
        lossPercentage: 20, // από 10kg -> 8kg
        costPerKg: 0.3,
        duration: 0.5,
        temperature: 4,
        description: "Αφαίρεση κεφαλιού, εντόσθιων και πτερυγίων",
      },
    ],
    glazingPercentage: 15, // από 8kg -> 9.2kg (15% επιπλέον)
    glazingType: "ice",
    vatRate: 0,
    profitMargin: 25,
  };

  const calculations = {
    totalWeight: exampleData.weight * exampleData.quantity, // 2000kg
    totalPurchaseCost:
      exampleData.weight * exampleData.quantity * exampleData.purchasePrice, // 9000€
    weightAfterCleaning:
      exampleData.weight *
      (1 - exampleData.processingPhases[0].lossPercentage / 100), // 8kg
    weightAfterGlazing:
      exampleData.weight *
      (1 - exampleData.processingPhases[0].lossPercentage / 100) *
      (1 + exampleData.glazingPercentage / 100), // 9.2kg
    finalTotalWeight:
      exampleData.weight *
      exampleData.quantity *
      (1 - exampleData.processingPhases[0].lossPercentage / 100) *
      (1 + exampleData.glazingPercentage / 100), // 1840kg
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Fish className="w-6 h-6" />
              </div>
              {language === "el"
                ? "Παράδειγμα Κοστολόγησης"
                : "Costing Example"}
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Example Description */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">
                    {language === "el"
                      ? "Περιγραφή Παραδείγματος"
                      : "Example Description"}
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    {language === "el"
                      ? "Αγορά θράψαλου block από την Αργεντίνη. Συνολική αγορά 2 τόνοι, τιμή 4,5€/κιλό. Μετά το καθάρισμα χάνεται 20% του βάρους, και με το glazing προστίθεται 15% επιπλέον βάρος."
                      : "Purchase of Thrapsalo block from Argentina. Total purchase 2 tons, price €4.5/kg. After cleaning, 20% of weight is lost, and with glazing 15% additional weight is added."}
                  </p>
                </div>
              </div>
            </div>

            {/* Example Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Product Info */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Fish className="w-5 h-5 text-green-600" />
                  <h5 className="font-medium text-green-800">Προϊόν</h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-green-700">Όνομα:</span>{" "}
                    <span className="font-medium">
                      {exampleData.productName}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Προέλευση:</span>{" "}
                    <span className="font-medium">{exampleData.origin}</span>
                  </div>
                  <div>
                    <span className="text-green-700">Προμηθευτής:</span>{" "}
                    <span className="font-medium">
                      {exampleData.supplierName}
                    </span>
                  </div>
                  <div>
                    <span className="text-green-700">Ποιότητα:</span>{" "}
                    <Badge variant="outline" className="text-xs">
                      {exampleData.quality}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Purchase Details */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h5 className="font-medium text-blue-800">Αγορά</h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-blue-700">Τιμή:</span>{" "}
                    <span className="font-medium">
                      €{exampleData.purchasePrice}/kg
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Βάρος/Τεμάχιο:</span>{" "}
                    <span className="font-medium">{exampleData.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Τεμάχια:</span>{" "}
                    <span className="font-medium">{exampleData.quantity}</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Συνολικό Κόστος:</span>{" "}
                    <span className="font-bold text-blue-900">
                      €{calculations.totalPurchaseCost.toLocaleString("el-GR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Processing */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-orange-600" />
                  <h5 className="font-medium text-orange-800">Επεξεργασία</h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-orange-700">Καθάρισμα:</span>{" "}
                    <span className="font-medium">
                      -{exampleData.processingPhases[0].lossPercentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-700">Glazing:</span>{" "}
                    <span className="font-medium">
                      +{exampleData.glazingPercentage}%
                    </span>
                  </div>
                  <div>
                    <span className="text-orange-700">Αρχικό βάρος:</span>{" "}
                    <span className="font-medium">{exampleData.weight} kg</span>
                  </div>
                  <div>
                    <span className="text-orange-700">Τελικό βάρος:</span>{" "}
                    <span className="font-bold text-orange-900">
                      {calculations.weightAfterGlazing.toFixed(1)} kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Flow */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                {language === "el" ? "Ροή Υπολογισμών" : "Calculation Flow"}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculations.totalWeight} kg
                  </div>
                  <div className="text-xs text-gray-600">Αρχικό Βάρος</div>
                </div>
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-gray-400" />
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-orange-600">
                    {(calculations.totalWeight * 0.8).toLocaleString("el-GR")}{" "}
                    kg
                  </div>
                  <div className="text-xs text-gray-600">Μετά Καθάρισμα</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {calculations.finalTotalWeight.toLocaleString("el-GR")} kg
                  </div>
                  <div className="text-xs text-gray-600">Τελικό Βάρος</div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-medium text-purple-800 mb-3">
                {language === "el" ? "Βασικά Συμπεράσματα" : "Key Insights"}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-700">
                      Απώλεια από καθάρισμα:
                    </span>
                    <span className="font-medium">
                      {(calculations.totalWeight * 0.2).toLocaleString("el-GR")}{" "}
                      kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Κέρδος από glazing:</span>
                    <span className="font-medium">
                      {(
                        calculations.finalTotalWeight -
                        calculations.totalWeight * 0.8
                      ).toLocaleString("el-GR")}{" "}
                      kg
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Καθαρή απώλεια:</span>
                    <span className="font-medium">
                      {(
                        calculations.totalWeight - calculations.finalTotalWeight
                      ).toLocaleString("el-GR")}{" "}
                      kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Ποσοστό απόδοσης:</span>
                    <span className="font-medium">
                      {(
                        (calculations.finalTotalWeight /
                          calculations.totalWeight) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={onLoadExample}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {language === "el" ? "Φόρτωση Παραδείγματος" : "Load Example"}
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="border-gray-300"
              >
                {language === "el" ? "Ακύρωση" : "Cancel"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleData;
