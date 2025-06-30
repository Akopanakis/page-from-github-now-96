import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MapPin,
  Clock,
  Scale,
  Award,
  Star,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExampleDataProps {
  onLoadExample: (exampleData: any) => void;
  onClose: () => void;
  isVisible: boolean;
}

const ExampleData: React.FC<ExampleDataProps> = ({
  onLoadExample,
  onClose,
  isVisible,
}) => {
  const { language, t } = useLanguage();
  const [selectedExample, setSelectedExample] = useState(0);

  if (!isVisible) return null;

  const examples = [
    {
      id: "thrapsalo",
      name: t("examples.thrapsalo"),
      icon: Fish,
      color: "blue",
      flag: "🇦🇷",
      data: {
        productName: "Θράψαλο Block Αργεντίνης",
        productType: "fish",
        weight: 10,
        quantity: 200,
        purchasePrice: 4.5,
        origin: "Αργεντίνη",
        quality: "A",
        supplierName: "Κοπανάκης",
        targetSellingPrice: 7.2,
        profitMargin: 25,
        vatRate: 0,
        processingPhases: [
          {
            id: "1",
            name: "Καθάρισμα",
            lossPercentage: 20,
            costPerKg: 0.3,
            duration: 0.5,
            temperature: 4,
            description: "Αφαίρεση κεφαλιού, εντόσθιων και πτερυγίων",
          },
        ],
        glazingPercentage: 15,
        glazingType: "ice",
        directCosts: [
          { id: "1", name: "Πρώτες Ύλες", value: 150, category: "direct" },
          { id: "2", name: "Εργατικά", value: 200, category: "direct" },
          { id: "3", name: "Ενέργεια", value: 80, category: "direct" },
        ],
        indirectCosts: [
          { id: "4", name: "Γενικά Έξοδα", value: 100, category: "indirect" },
          { id: "5", name: "Αποσβέσεις", value: 50, category: "indirect" },
          { id: "6", name: "Ασφάλιστρα", value: 30, category: "indirect" },
        ],
        transportLegs: [
          {
            id: "1",
            from: "Πειραιάς",
            to: "Θεσσαλονίκη",
            distance: 500,
            cost: 180,
            type: "Οδικό",
          },
        ],
      },
      description:
        language === "el"
          ? "Εισαγωγή κατεψυγμένου θράψαλου από Αργεντίνη για επεξεργασία σε fillets"
          : "Import of frozen thrapsalo from Argentina for fillet processing",
      highlights: [
        language === "el" ? "Χαμηλό κόστος αγοράς" : "Low purchase cost",
        language === "el" ? "Υψηλή απόδοση" : "High yield",
        language === "el" ? "Παγκόσμια ζήτηση" : "Global demand",
      ],
    },
    {
      id: "seabream",
      name: t("examples.seabream"),
      icon: Fish,
      color: "green",
      flag: "🇬🇷",
      data: {
        productName: "Τσιπούρα Ελλάδας Premium",
        productType: "fish",
        weight: 0.4,
        quantity: 2500,
        purchasePrice: 8.5,
        origin: "Κρήτη, Ελλάδα",
        quality: "A+",
        supplierName: "Ιχθυοκαλλιέργειες Κρήτης",
        targetSellingPrice: 12.8,
        profitMargin: 30,
        vatRate: 13,
        processingPhases: [
          {
            id: "1",
            name: "Επιλογή & Διαβάθμιση",
            lossPercentage: 5,
            costPerKg: 0.8,
            duration: 0.3,
            temperature: 2,
            description: "Διαλογή κατά μέγεθος και ποιότητα",
          },
          {
            id: "2",
            name: "Συσκευασία Premium",
            lossPercentage: 2,
            costPerKg: 1.2,
            duration: 0.4,
            temperature: 2,
            description: "Συσκευασία σε premium packaging με εταιρικό brand",
          },
        ],
        glazingPercentage: 0,
        glazingType: "none",
        directCosts: [
          { id: "1", name: "Αγορά Ψαριών", value: 8500, category: "direct" },
          { id: "2", name: "Εργατικά", value: 600, category: "direct" },
          { id: "3", name: "Συσκευασία", value: 400, category: "direct" },
        ],
        indirectCosts: [
          { id: "4", name: "Ψύξη", value: 200, category: "indirect" },
          {
            id: "5",
            name: "Ποιοτικός Έλεγχος",
            value: 150,
            category: "indirect",
          },
          { id: "6", name: "Πιστοποιήσεις", value: 100, category: "indirect" },
        ],
        transportLegs: [
          {
            id: "1",
            from: "Χανιά",
            to: "Αθήνα",
            distance: 300,
            cost: 120,
            type: "Ψυκτικό",
          },
        ],
      },
      description:
        language === "el"
          ? "Φρέσκια τσιπούρα από ελληνικές ιχθυοκαλλιέργειες για premium αγορά"
          : "Fresh sea bream from Greek fish farms for premium market",
      highlights: [
        language === "el" ? "Τοπικό προϊόν" : "Local product",
        language === "el" ? "Premium ποιότητα" : "Premium quality",
        language === "el" ? "Υψηλό περιθώριο" : "High margin",
      ],
    },
    {
      id: "salmon",
      name: t("examples.salmon"),
      icon: Fish,
      color: "orange",
      flag: "🇳🇴",
      data: {
        productName: "Σολομός Νορβηγίας Φιλέτο",
        productType: "fish",
        weight: 2.5,
        quantity: 400,
        purchasePrice: 16.8,
        origin: "Νορβηγία",
        quality: "Superior",
        supplierName: "Nordic Fish Premium",
        targetSellingPrice: 24.5,
        profitMargin: 28,
        vatRate: 13,
        processingPhases: [
          {
            id: "1",
            name: "Φιλετάρισμα",
            lossPercentage: 35,
            costPerKg: 2.5,
            duration: 1.2,
            temperature: 1,
            description: "Ειδικό φιλετάρισμα για άψογη παρουσίαση",
          },
          {
            id: "2",
            name: "Αφαίρεση Δερμάτων",
            lossPercentage: 8,
            costPerKg: 1.8,
            duration: 0.8,
            temperature: 1,
            description: "Ακριβής αφαίρεση δέρματος με ειδικά εργαλεία",
          },
        ],
        glazingPercentage: 0,
        glazingType: "none",
        directCosts: [
          { id: "1", name: "Αγορά Σολομού", value: 16800, category: "direct" },
          {
            id: "2",
            name: "Ει��ικευμένη Εργασία",
            value: 1200,
            category: "direct",
          },
          { id: "3", name: "Vacuum Packaging", value: 800, category: "direct" },
        ],
        indirectCosts: [
          { id: "4", name: "Ελεγχος HACCP", value: 300, category: "indirect" },
          { id: "5", name: "Logistics", value: 250, category: "indirect" },
          {
            id: "6",
            name: "Ασφάλεια Προϊόντος",
            value: 150,
            category: "indirect",
          },
        ],
        transportLegs: [
          {
            id: "1",
            from: "Πατραικός",
            to: "Αθήνα",
            distance: 220,
            cost: 150,
            type: "Ψυκτικό Ειδικό",
          },
        ],
      },
      description:
        language === "el"
          ? "Εισαγωγή premium σολομού από Νορβηγία για φιλετάρισμα και διανομή"
          : "Import of premium salmon from Norway for filleting and distribution",
      highlights: [
        language === "el" ? "Premium προϊόν" : "Premium product",
        language === "el" ? "Υψηλή προστιθέμενη αξία" : "High added value",
        language === "el" ? "Ειδικό φιλετάρισμα" : "Special filleting",
      ],
    },
    {
      id: "shrimp",
      name: t("examples.shrimp"),
      icon: Package,
      color: "pink",
      flag: "🇲🇬",
      data: {
        productName: "Γαρίδες Τίγρης Μαδαγασκάρης",
        productType: "shellfish",
        weight: 0.025,
        quantity: 40000,
        purchasePrice: 18.5,
        origin: "Μαδαγασκάρη",
        quality: "Premium",
        supplierName: "Madagascar Seafood Export",
        targetSellingPrice: 26.8,
        profitMargin: 32,
        vatRate: 13,
        processingPhases: [
          {
            id: "1",
            name: "Ξεφλούδισμα",
            lossPercentage: 25,
            costPerKg: 4.2,
            duration: 2.0,
            temperature: 0,
            description: "Χειροκίνητο ξεφλούδισμα με διατήρηση ουράς",
          },
          {
            id: "2",
            name: "Deveining",
            lossPercentage: 5,
            costPerKg: 2.8,
            duration: 1.5,
            temperature: 0,
            description: "Αφαίρεση μαύρης φλέβας και τελικός καθαρισμός",
          },
        ],
        glazingPercentage: 10,
        glazingType: "protective_glaze",
        directCosts: [
          { id: "1", name: "Αγ��ρά Γαρίδων", value: 18500, category: "direct" },
          {
            id: "2",
            name: "Ειδικευμένη Εργασία",
            value: 2500,
            category: "direct",
          },
          { id: "3", name: "IQF Κατάψυξη", value: 600, category: "direct" },
        ],
        indirectCosts: [
          { id: "4", name: "Τελωνειακά", value: 400, category: "indirect" },
          {
            id: "5",
            name: "Πιστοποίηση BRC",
            value: 200,
            category: "indirect",
          },
          {
            id: "6",
            name: "Ασφάλιση Εμπορεύματος",
            value: 300,
            category: "indirect",
          },
        ],
        transportLegs: [
          {
            id: "1",
            from: "Πειραιάς",
            to: "Αθήνα",
            distance: 50,
            cost: 80,
            type: "Ψυκτικό IQF",
          },
        ],
      },
      description:
        language === "el"
          ? "Εισαγωγή premium γαρίδων τίγρης για καθαρισμό και επανασυσκευασία"
          : "Import of premium tiger shrimp for cleaning and repackaging",
      highlights: [
        language === "el" ? "Εξωτικό προϊόν" : "Exotic product",
        language === "el" ? "Χειροκίνητη επεξεργασία" : "Manual processing",
        language === "el" ? "Υψηλή ζήτηση" : "High demand",
      ],
    },
    {
      id: "squid",
      name: t("examples.squid"),
      icon: Fish,
      color: "purple",
      flag: "🇬🇷",
      data: {
        productName: "Καλαμάρι Αιγαίου Καθαρισμένο",
        productType: "mollusks",
        weight: 0.8,
        quantity: 1250,
        purchasePrice: 12.3,
        origin: "Αιγαίο Πέλαγος",
        quality: "A",
        supplierName: "Mediterranean Catch",
        targetSellingPrice: 18.9,
        profitMargin: 35,
        vatRate: 13,
        processingPhases: [
          {
            id: "1",
            name: "Καθαρισμός",
            lossPercentage: 30,
            costPerKg: 3.5,
            duration: 1.8,
            temperature: 2,
            description: "Αφαίρεση εσωτερικών οργάνων και καθαρισμός",
          },
          {
            id: "2",
            name: "Κοπή σε Κρίκους",
            lossPercentage: 10,
            costPerKg: 2.2,
            duration: 1.0,
            temperature: 2,
            description: "Κοπή σε κρίκους για άμεση χρήση στη μαγειρική",
          },
        ],
        glazingPercentage: 5,
        glazingType: "minimal_glaze",
        directCosts: [
          {
            id: "1",
            name: "Αγορά Καλαμαριών",
            value: 12300,
            category: "direct",
          },
          {
            id: "2",
            name: "Εργατικά Καθαρισμού",
            value: 800,
            category: "direct",
          },
          { id: "3", name: "Συσκευασία Tray", value: 300, category: "direct" },
        ],
        indirectCosts: [
          { id: "4", name: "Ψύξη", value: 150, category: "indirect" },
          {
            id: "5",
            name: "Ποιοτικός Έλεγχος",
            value: 100,
            category: "indirect",
          },
          { id: "6", name: "Μεταφορικά", value: 120, category: "indirect" },
        ],
        transportLegs: [
          {
            id: "1",
            from: "Μυτιλήνη",
            to: "Αθήνα",
            distance: 350,
            cost: 140,
            type: "Ψυκτικό",
          },
        ],
      },
      description:
        language === "el"
          ? "Φρέσκο καλαμάρι από το Αιγαίο για καθαρισμό και προετοιμασία"
          : "Fresh squid from Aegean Sea for cleaning and preparation",
      highlights: [
        language === "el" ? "Τοπικό ψαράκι" : "Local catch",
        language === "el" ? "Γευστικό προϊόν" : "Tasty product",
        language === "el" ? "Υψηλή προστιθέμενη αξία" : "High added value",
      ],
    },
  ];

  const selectedExampleData = examples[selectedExample];

  const getIconBgColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600",
      purple: "bg-purple-100 text-purple-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBorderColor = (color: string) => {
    const colors = {
      blue: "border-blue-200",
      green: "border-green-200",
      orange: "border-orange-200",
      pink: "border-pink-200",
      purple: "border-purple-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const calculateTotals = (data: any) => {
    const totalWeight = data.weight * data.quantity;
    const totalPurchaseCost = totalWeight * data.purchasePrice;

    let weightAfterProcessing = totalWeight;
    data.processingPhases?.forEach((phase: any) => {
      weightAfterProcessing *= 1 - (phase.lossPercentage || 0) / 100;
    });

    const finalWeight =
      weightAfterProcessing * (1 + (data.glazingPercentage || 0) / 100);
    const efficiency = (finalWeight / totalWeight) * 100;

    return {
      totalWeight,
      totalPurchaseCost,
      finalWeight,
      efficiency,
    };
  };

  const totals = calculateTotals(selectedExampleData.data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-7xl w-full max-h-[95vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Fish className="w-6 h-6" />
              </div>
              {language === "el"
                ? "Παραδείγματα Κοστολόγησης"
                : "Costing Examples"}
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
            {/* Example Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {language === "el" ? "Επιλέξτε Παράδειγμα" : "Select Example"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {examples.map((example, index) => {
                  const Icon = example.icon;
                  const isSelected = selectedExample === index;
                  return (
                    <Button
                      key={example.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : `hover:shadow-md ${getBorderColor(example.color)}`
                      }`}
                      onClick={() => setSelectedExample(index)}
                    >
                      <div
                        className={`p-2 rounded-lg ${isSelected ? "bg-white/20" : getIconBgColor(example.color)}`}
                      >
                        <Icon
                          className={`w-6 h-6 ${isSelected ? "text-white" : ""}`}
                        />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-sm">
                          {example.flag} {example.name}
                        </div>
                        <div
                          className={`text-xs ${isSelected ? "text-white/80" : "text-gray-600"}`}
                        >
                          {example.data.origin}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Selected Example Details */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">
                  {language === "el" ? "Επισκόπηση" : "Overview"}
                </TabsTrigger>
                <TabsTrigger value="processing">
                  {language === "el" ? "Επεξεργασία" : "Processing"}
                </TabsTrigger>
                <TabsTrigger value="costs">
                  {language === "el" ? "Κόστη" : "Costs"}
                </TabsTrigger>
                <TabsTrigger value="calculations">
                  {language === "el" ? "Υπολογισμοί" : "Calculations"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Product Info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                        {selectedExampleData.flag}{" "}
                        {selectedExampleData.data.productName}
                      </h3>
                      <p className="text-blue-700 mb-4">
                        {selectedExampleData.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedExampleData.highlights.map(
                          (highlight, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-white/50"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              {highlight}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${getIconBgColor(selectedExampleData.color)}`}
                    >
                      <selectedExampleData.icon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {language === "el" ? "Προέλευση" : "Origin"}
                        </span>
                      </div>
                      <div className="text-blue-900">
                        {selectedExampleData.data.origin}
                      </div>
                      <div className="text-sm text-blue-700">
                        {selectedExampleData.data.supplierName}
                      </div>
                    </div>

                    <div className="bg-white/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {language === "el" ? "Ποσότητα" : "Quantity"}
                        </span>
                      </div>
                      <div className="text-blue-900">
                        {selectedExampleData.data.quantity.toLocaleString()}{" "}
                        {t("unit.pieces")}
                      </div>
                      <div className="text-sm text-blue-700">
                        {totals.totalWeight.toLocaleString(
                          language === "el" ? "el-GR" : "en-US",
                        )}{" "}
                        {t("unit.kg")}
                      </div>
                    </div>

                    <div className="bg-white/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {language === "el" ? "Ποιότητα" : "Quality"}
                        </span>
                      </div>
                      <div className="text-blue-900">
                        {selectedExampleData.data.quality}
                      </div>
                      <div className="text-sm text-blue-700">
                        {t("pricing.profit")}:{" "}
                        {selectedExampleData.data.profitMargin}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {language === "el" ? "Τιμή Αγοράς" : "Purchase Price"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      €{selectedExampleData.data.purchasePrice}/kg
                    </div>
                    <div className="text-sm text-green-700">
                      {language === "el" ? "Σύνολο" : "Total"}: €
                      {totals.totalPurchaseCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        {language === "el" ? "Τιμή Στόχος" : "Target Price"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-orange-900">
                      €{selectedExampleData.data.targetSellingPrice}/kg
                    </div>
                    <div className="text-sm text-orange-700">
                      {language === "el" ? "Περιθώριο" : "Margin"}:{" "}
                      {selectedExampleData.data.profitMargin}%
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">
                        {language === "el" ? "Αποδοτικότητα" : "Efficiency"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {totals.efficiency.toFixed(1)}%
                    </div>
                    <div className="text-sm text-purple-700">
                      {language === "el" ? "Τελικό" : "Final"}:{" "}
                      {totals.finalWeight.toFixed(0)} kg
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-800">
                        {language === "el"
                          ? "Εκτίμηση Κέρδους"
                          : "Estimated Profit"}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-900">
                      €
                      {(
                        (selectedExampleData.data.targetSellingPrice -
                          selectedExampleData.data.purchasePrice) *
                        totals.finalWeight
                      ).toLocaleString()}
                    </div>
                    <div className="text-sm text-indigo-700">
                      {language === "el" ? "Προ κοστών" : "Before costs"}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-4">
                    {language === "el"
                      ? "Φάσεις Επεξεργασίας"
                      : "Processing Phases"}
                  </h4>
                  <div className="space-y-4">
                    {selectedExampleData.data.processingPhases?.map(
                      (phase: any, index: number) => (
                        <div
                          key={phase.id}
                          className="bg-white p-4 rounded-lg border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{phase.name}</h5>
                            <Badge variant="outline">
                              {language === "el" ? "Φάση" : "Phase"} {index + 1}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {phase.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">
                                {language === "el" ? "Απώλεια" : "Loss"}:
                              </span>
                              <span className="font-medium ml-1">
                                {phase.lossPercentage}%
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {language === "el" ? "Κόστος" : "Cost"}:
                              </span>
                              <span className="font-medium ml-1">
                                €{phase.costPerKg}/kg
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {language === "el" ? "Διάρκεια" : "Duration"}:
                              </span>
                              <span className="font-medium ml-1">
                                {phase.duration}h
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {language === "el"
                                  ? "Θερμοκρασία"
                                  : "Temperature"}
                                :
                              </span>
                              <span className="font-medium ml-1">
                                {phase.temperature}°C
                              </span>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="costs" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-4">
                      {t("costs.direct")}
                    </h4>
                    <div className="space-y-3">
                      {selectedExampleData.data.directCosts?.map(
                        (cost: any) => (
                          <div
                            key={cost.id}
                            className="flex justify-between items-center"
                          >
                            <span className="text-green-700">{cost.name}</span>
                            <span className="font-medium text-green-900">
                              €{cost.value.toLocaleString()}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-4">
                      {t("costs.indirect")}
                    </h4>
                    <div className="space-y-3">
                      {selectedExampleData.data.indirectCosts?.map(
                        (cost: any) => (
                          <div
                            key={cost.id}
                            className="flex justify-between items-center"
                          >
                            <span className="text-orange-700">{cost.name}</span>
                            <span className="font-medium text-orange-900">
                              €{cost.value.toLocaleString()}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="calculations" className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    {language === "el" ? "Ροή Υπολογισμών" : "Calculation Flow"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {totals.totalWeight.toLocaleString()} kg
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Αρχικό Βάρος" : "Initial Weight"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        €{totals.totalPurchaseCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Κόστος Αγοράς" : "Purchase Cost"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {totals.finalWeight.toFixed(0)} kg
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Τελικό Βάρος" : "Final Weight"}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {totals.efficiency.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === "el" ? "Αποδοτικό��ητα" : "Efficiency"}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                onClick={() => onLoadExample(selectedExampleData.data)}
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
                {t("action.close")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleData;
