
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Fish, Truck, Factory, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExampleDataProps {
  isVisible: boolean;
  onLoadExample: (data: any) => void;
  onClose: () => void;
}

const ExampleData: React.FC<ExampleDataProps> = ({
  isVisible,
  onLoadExample,
  onClose,
}) => {
  const { language } = useLanguage();
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const examples = [
    {
      id: "tuna-argentina",
      name: language === 'el' ? "Τόνος Αργεντίνης" : "Argentine Tuna",
      icon: <Fish className="w-5 h-5" />,
      category: language === 'el' ? "Ψάρι" : "Fish",
      description: language === 'el' 
        ? "Εισαγωγή τόνου από Αργεντίνη, επεξεργασία και διανομή"
        : "Import tuna from Argentina, processing and distribution",
      data: {
        productName: "Τόνος Yellowfin Block",
        productType: "fish",
        purchasePrice: 6.2,
        quantity: 500,
        waste: 18,
        glazingPercent: 12,
        vatPercent: 0,
        workers: [
          { id: "1", name: "Γιάννης Παπαδόπουλος", hourlyRate: 12, hoursWorked: 8 },
          { id: "2", name: "Μαρία Κοντού", hourlyRate: 10, hoursWorked: 6 }
        ],
        boxCost: 0.8,
        bagCost: 0.15,
        distance: 12500,
        fuelCost: 1.45,
        tolls: 0,
        parkingCost: 0,
        driverSalary: 150,
        profitMargin: 28,
        electricityCost: 85,
        equipmentCost: 120,
        insuranceCost: 75,
        rentCost: 300,
        communicationCost: 25,
        otherCosts: 45,
        supplierName: "Pesquera del Sur S.A.",
        batchNumber: "TUN-ARG-2024-008",
        competitor1: 14.5,
        competitor2: 15.2,
        targetSellingPrice: 16.8
      }
    },
    {
      id: "salmon-norway",
      name: language === 'el' ? "Σολομός Νορβηγίας" : "Norwegian Salmon",
      icon: <Fish className="w-5 h-5" />,
      category: language === 'el' ? "Ψάρι" : "Fish", 
      description: language === 'el'
        ? "Premium σολομός εκτροφής από Νορβηγία"
        : "Premium farmed salmon from Norway",
      data: {
        productName: "Σολομός Ατλαντικός Φιλέτο",
        productType: "fish",
        purchasePrice: 8.5,
        quantity: 200,
        waste: 12,
        glazingPercent: 8,
        vatPercent: 0,
        workers: [
          { id: "1", name: "Κώστας Μαρίνος", hourlyRate: 14, hoursWorked: 6 },
          { id: "2", name: "Ελένη Στεφάνου", hourlyRate: 11, hoursWorked: 5 }
        ],
        boxCost: 1.2,
        bagCost: 0.25,
        distance: 2800,
        fuelCost: 1.45,
        tolls: 45,
        parkingCost: 15,
        driverSalary: 220,
        profitMargin: 35,
        electricityCost: 65,
        equipmentCost: 95,
        insuranceCost: 60,
        rentCost: 250,
        communicationCost: 20,
        otherCosts: 35,
        supplierName: "Nordic Fish AS",
        batchNumber: "SAL-NOR-2024-012",
        competitor1: 18.5,
        competitor2: 19.8,
        targetSellingPrice: 21.5
      }
    },
    {
      id: "shrimp-ecuador",
      name: language === 'el' ? "Γαρίδες Εκουαδόρ" : "Ecuador Shrimp",
      icon: <Fish className="w-5 h-5" />,
      category: language === 'el' ? "Θαλασσινά" : "Seafood",
      description: language === 'el'
        ? "Γαρίδες εκτροφής από Εκουαδόρ, κατεψυγμένες"
        : "Farmed shrimp from Ecuador, frozen",
      data: {
        productName: "Γαρίδες Vannamei 16/20",
        productType: "fish",
        purchasePrice: 12.8,
        quantity: 300,
        waste: 5,
        glazingPercent: 20,
        vatPercent: 0,
        workers: [
          { id: "1", name: "Θάνος Καλλάς", hourlyRate: 13, hoursWorked: 4 },
          { id: "2", name: "Άννα Βασιλείου", hourlyRate: 12, hoursWorked: 4 }
        ],
        boxCost: 1.5,
        bagCost: 0.35,
        distance: 11200,
        fuelCost: 1.45,
        tolls: 0,
        parkingCost: 0,
        driverSalary: 180,
        profitMargin: 40,
        electricityCost: 95,
        equipmentCost: 140,
        insuranceCost: 85,
        rentCost: 280,
        communicationCost: 30,
        otherCosts: 55,
        supplierName: "Camarones del Pacifico",
        batchNumber: "SHR-ECU-2024-005",
        competitor1: 26.5,
        competitor2: 28.2,
        targetSellingPrice: 32.0
      }
    },
    {
      id: "seabass-greece",
      name: language === 'el' ? "Λαβράκι Ελλάδας" : "Greek Sea Bass",
      icon: <Fish className="w-5 h-5" />,
      category: language === 'el' ? "Εγχώριο" : "Domestic",
      description: language === 'el'
        ? "Λαβράκι εκτροφής από ελληνικές μονάδες"
        : "Farmed sea bass from Greek farms",
      data: {
        productName: "Λαβράκι Εκτροφής Μεσογείου",
        productType: "fish",
        purchasePrice: 7.2,
        quantity: 150,
        waste: 8,
        glazingPercent: 5,
        vatPercent: 0,
        workers: [
          { id: "1", name: "Νίκος Παπαγιάννης", hourlyRate: 11, hoursWorked: 5 }
        ],
        boxCost: 0.6,
        bagCost: 0.1,
        distance: 180,
        fuelCost: 1.45,
        tolls: 12,
        parkingCost: 5,
        driverSalary: 80,
        profitMargin: 25,
        electricityCost: 45,
        equipmentCost: 65,
        insuranceCost: 40,
        rentCost: 180,
        communicationCost: 15,
        otherCosts: 25,
        supplierName: "Ιχθυοκαλλιέργειες Αιγαίου ΑΕ",
        batchNumber: "SBS-GR-2024-018",
        competitor1: 12.8,
        competitor2: 13.5,
        targetSellingPrice: 14.2
      }
    }
  ];

  const handleLoadExample = (example: any) => {
    onLoadExample(example.data);
    setSelectedExample(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span>{language === 'el' ? 'Παραδείγματα Κοστολόγησης' : 'Costing Examples'}</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              {language === 'el' 
                ? "Επιλέξτε ένα παράδειγμα για να δείτε πως λειτουργεί η εφαρμογή με πραγματικά δεδομένα:"
                : "Choose an example to see how the application works with real data:"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((example) => (
              <div key={example.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {example.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{example.name}</h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {example.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {example.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                    <div>
                      <span className="font-medium">{language === 'el' ? 'Ποσότητα:' : 'Quantity:'}</span> {example.data.quantity} kg
                    </div>
                    <div>
                      <span className="font-medium">{language === 'el' ? 'Τιμή Αγοράς:' : 'Purchase Price:'}</span> €{example.data.purchasePrice}/kg
                    </div>
                    <div>
                      <span className="font-medium">{language === 'el' ? 'Απώλειες:' : 'Waste:'}</span> {example.data.waste}%
                    </div>
                    <div>
                      <span className="font-medium">{language === 'el' ? 'Κέρδος:' : 'Margin:'}</span> {example.data.profitMargin}%
                    </div>
                  </div>

                  <Button
                    onClick={() => handleLoadExample(example)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {language === 'el' ? 'Φόρτωση Παραδείγματος' : 'Load Example'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <h4 className="font-semibold text-yellow-800">
                {language === 'el' ? 'Σημείωση' : 'Note'}
              </h4>
            </div>
            <p className="text-sm text-yellow-700">
              {language === 'el' 
                ? "Τα παραδείγματα περιέχουν ρεαλιστικά δεδομένα και θα υπολογίσουν αυτόματα τα αποτελέσματα. Μπορείτε να τα τροποποιήσετε μετά τη φόρτωση."
                : "Examples contain realistic data and will automatically calculate results. You can modify them after loading."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExampleData;
