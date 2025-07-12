
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Fish, 
  Truck, 
  Factory, 
  Calculator,
  TrendingUp,
  MapPin,
  Clock,
  Euro,
  Package,
  Users
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExampleData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  category: 'fish' | 'seafood' | 'frozen' | 'fresh';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  data: {
    // Basic info
    productName: string;
    productType: string;
    weight: number;
    quantity: number;
    origin: string;
    quality: string;
    
    // Pricing
    purchasePrice: number;
    targetSellingPrice: number;
    profitMargin: number;
    vatRate: number;
    
    // Processing
    totalLossPercentage: number;
    glazingPercentage: number;
    
    // Costs
    directCosts: Array<{id: string, name: string, value: number, category: string}>;
    indirectCosts: Array<{id: string, name: string, value: number, category: string}>;
    
    // Transport
    transportLegs: Array<{id: string, from: string, to: string, distance: number, cost: number, type: string}>;
    
    // Workers
    workers: Array<{id: string, hourlyRate: number, hours: number}>;
    
    // Additional costs
    boxCost: number;
    bagCost: number;
    electricityCost: number;
    equipmentCost: number;
    insuranceCost: number;
    rentCost: number;
  };
  expectedResults: {
    totalCost: number;
    costPerKg: number;
    profitMargin: number;
    breakEvenPrice: number;
  };
}

interface ExamplesSelectorProps {
  onLoadExample: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ExamplesSelector: React.FC<ExamplesSelectorProps> = ({
  onLoadExample,
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const examples: ExampleData[] = [
    {
      id: 'salmon-fresh',
      name: 'Φρέσκος Σολομός - Νορβηγίας',
      nameEn: 'Fresh Norwegian Salmon',
      description: 'Επεξεργασία και διανομή φρέσκου σολομού από Νορβηγία σε ελληνική αγορά',
      descriptionEn: 'Processing and distribution of fresh Norwegian salmon to Greek market',
      category: 'fish',
      difficulty: 'beginner',
      estimatedTime: '5-10 λεπτά',
      data: {
        productName: 'Φρέσκος Σολομός Νορβηγίας',
        productType: 'fish',
        weight: 1000,
        quantity: 500,
        origin: 'Νορβηγία',
        quality: 'A+',
        purchasePrice: 8.5,
        targetSellingPrice: 14.2,
        profitMargin: 25,
        vatRate: 13,
        totalLossPercentage: 8,
        glazingPercentage: 0,
        directCosts: [
          { id: '1', name: 'Πρώτες Ύλες', value: 4250, category: 'direct' },
          { id: '2', name: 'Εργατικά', value: 580, category: 'direct' },
          { id: '3', name: 'Ενέργεια/Ψύξη', value: 320, category: 'direct' },
          { id: '4', name: 'Συσκευασία', value: 125, category: 'direct' }
        ],
        indirectCosts: [
          { id: '1', name: 'Γενικά Έξοδα', value: 380, category: 'indirect' },
          { id: '2', name: 'Ασφάλιστρα', value: 95, category: 'indirect' },
          { id: '3', name: 'Αποσβέσεις', value: 180, category: 'indirect' }
        ],
        transportLegs: [
          { id: '1', from: 'Όσλο', to: 'Πειραιάς', distance: 2150, cost: 850, type: 'Ψυκτική Μεταφορά' },
          { id: '2', from: 'Πειραιάς', to: 'Θεσσαλονίκη', distance: 520, cost: 180, type: 'Οδικό' }
        ],
        workers: [
          { id: '1', hourlyRate: 6.5, hours: 8 },
          { id: '2', hourlyRate: 8.2, hours: 6 },
          { id: '3', hourlyRate: 4.8, hours: 4 }
        ],
        boxCost: 2.5,
        bagCost: 0.8,
        electricityCost: 145,
        equipmentCost: 280,
        insuranceCost: 120,
        rentCost: 450
      },
      expectedResults: {
        totalCost: 7850,
        costPerKg: 17.05,
        profitMargin: 23.5,
        breakEvenPrice: 15.70
      }
    },
    {
      id: 'shrimp-frozen',
      name: 'Κατεψυγμένες Γαρίδες - Εισαγωγή',
      nameEn: 'Frozen Shrimp Import',
      description: 'Εισαγωγή και επεξεργασία κατεψυγμένων γαρίδων από Ασία',
      descriptionEn: 'Import and processing of frozen shrimp from Asia',
      category: 'seafood',
      difficulty: 'intermediate',
      estimatedTime: '10-15 λεπτά',
      data: {
        productName: 'Κατεψυγμένες Γαρίδες Ασίας',
        productType: 'shellfish',
        weight: 1000,
        quantity: 200,
        origin: 'Βιετνάμ',
        quality: 'A',
        purchasePrice: 12.8,
        targetSellingPrice: 22.5,
        profitMargin: 30,
        vatRate: 13,
        totalLossPercentage: 15,
        glazingPercentage: 18,
        directCosts: [
          { id: '1', name: 'Πρώτες Ύλες', value: 2560, category: 'direct' },
          { id: '2', name: 'Εργατικά', value: 450, category: 'direct' },
          { id: '3', name: 'Κατάψυξη', value: 180, category: 'direct' },
          { id: '4', name: 'Glazing', value: 95, category: 'direct' },
          { id: '5', name: 'Συσκευασία', value: 85, category: 'direct' }
        ],
        indirectCosts: [
          { id: '1', name: 'Τελωνεία', value: 320, category: 'indirect' },
          { id: '2', name: 'Αποθήκευση', value: 180, category: 'indirect' },
          { id: '3', name: 'Ασφάλιστρα', value: 145, category: 'indirect' },
          { id: '4', name: 'Διοικητικά', value: 95, category: 'indirect' }
        ],
        transportLegs: [
          { id: '1', from: 'Χο Τσι Μιν', to: 'Πειραιάς', distance: 8950, cost: 1250, type: 'Θαλάσσιο Container' },
          { id: '2', from: 'Πειραιάς', to: 'Αθήνα', distance: 12, cost: 45, type: 'Τοπική Διανομή' }
        ],
        workers: [
          { id: '1', hourlyRate: 5.5, hours: 6 },
          { id: '2', hourlyRate: 7.8, hours: 4 },
          { id: '3', hourlyRate: 4.2, hours: 8 }
        ],
        boxCost: 1.8,
        bagCost: 0.6,
        electricityCost: 280,
        equipmentCost: 450,
        insuranceCost: 180,
        rentCost: 380
      },
      expectedResults: {
        totalCost: 6125,
        costPerKg: 36.03,
        profitMargin: 28.2,
        breakEvenPrice: 30.62
      }
    },
    {
      id: 'tuna-processing',
      name: 'Επεξεργασία Τόνου - Κονσέρβα',
      nameEn: 'Tuna Processing - Canning',
      description: 'Πλήρης επεξεργασία τόνου από φρέσκο σε κονσέρβα',
      descriptionEn: 'Complete tuna processing from fresh to canned',
      category: 'fish',
      difficulty: 'advanced',
      estimatedTime: '15-20 λεπτά',
      data: {
        productName: 'Κονσέρβα Τόνου Premium',
        productType: 'fish',
        weight: 1000,
        quantity: 2400, // 2400 κονσέρβες των 160g
        origin: 'Μεσόγειος',
        quality: 'Premium',
        purchasePrice: 6.2,
        targetSellingPrice: 3.8, // ανά κονσέρβα
        profitMargin: 35,
        vatRate: 13,
        totalLossPercentage: 45, // υψηλή απώλεια λόγω επεξεργασίας
        glazingPercentage: 0,
        directCosts: [
          { id: '1', name: 'Φρέσκος Τόνος', value: 6820, category: 'direct' },
          { id: '2', name: 'Εργατικά Επεξεργασίας', value: 1200, category: 'direct' },
          { id: '3', name: 'Ελαιόλαδο/Άλμη', value: 340, category: 'direct' },
          { id: '4', name: 'Κονσέρβες (μέταλλο)', value: 720, category: 'direct' },
          { id: '5', name: 'Ετικέτες/Συσκευασία', value: 180, category: 'direct' },
          { id: '6', name: 'Ενέργεια/Μαγείρεμα', value: 450, category: 'direct' }
        ],
        indirectCosts: [
          { id: '1', name: 'Ποιοτικός Έλεγχος', value: 280, category: 'indirect' },
          { id: '2', name: 'Πιστοποιήσεις', value: 150, category: 'indirect' },
          { id: '3', name: 'Αποσβέσεις Μηχανημάτων', value: 380, category: 'indirect' },
          { id: '4', name: 'Ασφάλιστρα', value: 95, category: 'indirect' },
          { id: '5', name: 'Γενικά Έξοδα', value: 250, category: 'indirect' }
        ],
        transportLegs: [
          { id: '1', from: 'Καλαμάτα', to: 'Βόλος', distance: 280, cost: 85, type: 'Ψυκτικό' },
          { id: '2', from: 'Βόλος', to: 'Αθήνα', distance: 320, cost: 65, type: 'Τελικό Προϊόν' },
          { id: '3', from: 'Αθήνα', to: 'Θεσσαλονίκη', distance: 520, cost: 95, type: 'Διανομή' }
        ],
        workers: [
          { id: '1', hourlyRate: 8.5, hours: 10 }, // Εργοστασιάρχης
          { id: '2', hourlyRate: 6.8, hours: 8 },  // Εργάτες παραγωγής
          { id: '3', hourlyRate: 6.8, hours: 8 },
          { id: '4', hourlyRate: 6.8, hours: 8 },
          { id: '5', hourlyRate: 5.2, hours: 6 },  // Βοηθοί
          { id: '6', hourlyRate: 7.5, hours: 4 }   // Ποιοτικός έλεγχος
        ],
        boxCost: 4.2,
        bagCost: 0,
        electricityCost: 680,
        equipmentCost: 850,
        insuranceCost: 220,
        rentCost: 580
      },
      expectedResults: {
        totalCost: 14280,
        costPerKg: 2.45,
        profitMargin: 32.8,
        breakEvenPrice: 5.94
      }
    },
    {
      id: 'local-fish',
      name: 'Τοπικό Ψάρι - Λαβράκι',
      nameEn: 'Local Fish - Sea Bass',
      description: 'Επεξεργασία τοπικού λαβρακιού από ιχθυοτροφεία',
      descriptionEn: 'Processing local sea bass from fish farms',
      category: 'fish',
      difficulty: 'beginner',
      estimatedTime: '5-8 λεπτά',
      data: {
        productName: 'Φρέσκο Λαβράκι Ελλάδας',
        productType: 'fish',
        weight: 1000,
        quantity: 180,
        origin: 'Κεφαλονιά',
        quality: 'A',
        purchasePrice: 5.8,
        targetSellingPrice: 9.5,
        profitMargin: 22,
        vatRate: 13,
        totalLossPercentage: 12,
        glazingPercentage: 0,
        directCosts: [
          { id: '1', name: 'Φρέσκο Ψάρι', value: 1044, category: 'direct' },
          { id: '2', name: 'Καθάρισμα/Φιλέτο', value: 180, category: 'direct' },
          { id: '3', name: 'Πάγος', value: 25, category: 'direct' },
          { id: '4', name: 'Συσκευασία', value: 45, category: 'direct' }
        ],
        indirectCosts: [
          { id: '1', name: 'Ψυκτική Συντήρηση', value: 85, category: 'indirect' },
          { id: '2', name: 'Γενικά Έξοδα', value: 65, category: 'indirect' }
        ],
        transportLegs: [
          { id: '1', from: 'Κεφαλονιά', to: 'Πάτρα', distance: 85, cost: 35, type: 'Ψυκτικό' },
          { id: '2', from: 'Πάτρα', to: 'Αθήνα', distance: 220, cost: 55, type: 'Ψυκτικό' }
        ],
        workers: [
          { id: '1', hourlyRate: 6.2, hours: 4 },
          { id: '2', hourlyRate: 5.8, hours: 3 }
        ],
        boxCost: 1.2,
        bagCost: 0.3,
        electricityCost: 45,
        equipmentCost: 85,
        insuranceCost: 35,
        rentCost: 120
      },
      expectedResults: {
        totalCost: 1620,
        costPerKg: 10.12,
        profitMargin: 20.5,
        breakEvenPrice: 9.0
      }
    }
  ];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fish': return <Fish className="w-4 h-4" />;
      case 'seafood': return <Package className="w-4 h-4" />;
      case 'frozen': return <Package className="w-4 h-4" />;
      case 'fresh': return <Fish className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleLoadExample = (example: ExampleData) => {
    onLoadExample(example.data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Calculator className="w-6 h-6 mr-3 text-blue-600" />
            {language === 'el' ? 'Παραδείγματα Κοστολόγησης' : 'Costing Examples'}
          </DialogTitle>
          <p className="text-gray-600">
            {language === 'el' 
              ? 'Επιλέξτε ένα παράδειγμα για να φορτώσετε ρεαλιστικά δεδομένα και να δείτε πώς λειτουργεί το σύστημα.'
              : 'Select an example to load realistic data and see how the system works.'
            }
          </p>
        </DialogHeader>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            {language === 'el' ? 'Όλα' : 'All'}
          </Button>
          <Button
            variant={selectedCategory === 'fish' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('fish')}
            className="flex items-center space-x-1"
          >
            <Fish className="w-4 h-4" />
            <span>{language === 'el' ? 'Ψάρια' : 'Fish'}</span>
          </Button>
          <Button
            variant={selectedCategory === 'seafood' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('seafood')}
            className="flex items-center space-x-1"
          >
            <Package className="w-4 h-4" />
            <span>{language === 'el' ? 'Θαλασσινά' : 'Seafood'}</span>
          </Button>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExamples.map((example) => (
            <Card key={example.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getCategoryIcon(example.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {language === 'el' ? example.name : example.nameEn}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === 'el' ? example.description : example.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(example.difficulty)}>
                    {language === 'el' 
                      ? example.difficulty === 'beginner' ? 'Αρχάριος' 
                        : example.difficulty === 'intermediate' ? 'Μέτριος' : 'Προχωρημένος'
                      : example.difficulty
                    }
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{example.data.origin}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{example.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-gray-500" />
                      <span>{example.expectedResults.costPerKg.toFixed(2)} €/kg</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span>{example.expectedResults.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Quick Overview */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="font-medium">{language === 'el' ? 'Ποσότητα' : 'Quantity'}</p>
                        <p>{example.data.quantity} {language === 'el' ? 'τεμ.' : 'pcs'}</p>
                      </div>
                      <div>
                        <p className="font-medium">{language === 'el' ? 'Συν. Κόστος' : 'Total Cost'}</p>
                        <p>€{example.expectedResults.totalCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">{language === 'el' ? 'Εργάτες' : 'Workers'}</p>
                        <p>{example.data.workers.length}</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleLoadExample(example)}
                    className="w-full"
                  >
                    {language === 'el' ? 'Φόρτωση Παραδείγματος' : 'Load Example'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExamples.length === 0 && (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {language === 'el' 
                ? 'Δεν βρέθηκαν παραδείγματα για αυτή την κατηγορία.'
                : 'No examples found for this category.'
              }
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamplesSelector;
