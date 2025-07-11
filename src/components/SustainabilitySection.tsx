
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Recycle, 
  Droplets, 
  Zap, 
  Truck, 
  Factory, 
  TreePine,
  Fish,
  Award,
  Globe,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  Users,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SustainabilitySectionProps {
  formData?: any;
  results?: any;
}

const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({
  formData = {},
  results = {}
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("carbon");

  // Calculate sustainability metrics
  const calculateCarbonFootprint = () => {
    const transportDistance = formData.distance || 0;
    const quantity = formData.quantity || 1;
    const energyCost = formData.electricityCost || 0;
    
    // Carbon emissions calculations (kg CO2)
    const transportEmissions = (transportDistance * 0.12) / 100; // 0.12 kg CO2 per km per 100kg
    const energyEmissions = energyCost * 0.5; // 0.5 kg CO2 per € of energy
    const processingEmissions = quantity * 0.8; // 0.8 kg CO2 per kg processed
    const packagingEmissions = ((formData.boxCost || 0) + (formData.bagCost || 0)) * quantity * 2;
    
    const totalEmissions = transportEmissions + energyEmissions + processingEmissions + packagingEmissions;
    const emissionsPerKg = quantity > 0 ? totalEmissions / quantity : 0;
    
    return {
      total: totalEmissions,
      perKg: emissionsPerKg,
      transport: transportEmissions,
      energy: energyEmissions,
      processing: processingEmissions,
      packaging: packagingEmissions
    };
  };

  const calculateWaterUsage = () => {
    const quantity = formData.quantity || 1;
    const processingWater = quantity * 15; // 15L per kg for seafood processing
    const cleaningWater = quantity * 8; // 8L per kg for cleaning
    const coolingWater = quantity * 12; // 12L per kg for cooling
    
    return {
      total: processingWater + cleaningWater + coolingWater,
      processing: processingWater,
      cleaning: cleaningWater,
      cooling: coolingWater,
      perKg: (processingWater + cleaningWater + coolingWater) / quantity
    };
  };

  const getWasteReductionTips = () => {
    return [
      {
        title: language === 'el' ? "Βελτιστοποίηση Επεξεργασίας" : "Processing Optimization",
        description: language === 'el' 
          ? "Χρησιμοποιήστε προχωρημένες τεχνικές κοπής για μείωση απωλειών κατά 15-20%"
          : "Use advanced cutting techniques to reduce losses by 15-20%",
        impact: "20%",
        difficulty: language === 'el' ? "Μέτρια" : "Medium"
      },
      {
        title: language === 'el' ? "Αξιοποίηση Υποπροϊόντων" : "By-product Utilization",
        description: language === 'el'
          ? "Μετατρέψτε κεφάλια και οστά σε ζωμό ή λίπασμα"
          : "Convert heads and bones into broth or fertilizer",
        impact: "30%",
        difficulty: language === 'el' ? "Εύκολη" : "Easy"
      },
      {
        title: language === 'el' ? "Ψυκτική Αλυσίδα" : "Cold Chain Management",
        description: language === 'el'
          ? "Διατηρήστε σταθερή θερμοκρασία για μείωση φθοράς"
          : "Maintain consistent temperature to reduce spoilage",
        impact: "25%",
        difficulty: language === 'el' ? "Μέτρια" : "Medium"
      }
    ];
  };

  const getSustainablePractices = () => {
    return [
      {
        category: language === 'el' ? "Αλιεία & Προμήθειες" : "Fishing & Sourcing",
        practices: [
          language === 'el' ? "Επιλογή πιστοποιημένων προμηθευτών (MSC, ASC)" : "Choose certified suppliers (MSC, ASC)",
          language === 'el' ? "Προτίμηση τοπικών αλιευμάτων όταν είναι εφικτό" : "Prefer local catches when feasible",
          language === 'el' ? "Αποφυγή υπεραλιευμένων αποθεμάτων" : "Avoid overfished stocks",
          language === 'el' ? "Υποστήριξη μικρής κλίμακας αλιέων" : "Support small-scale fishermen"
        ]
      },
      {
        category: language === 'el' ? "Επεξεργασία & Παραγωγή" : "Processing & Production",
        practices: [
          language === 'el' ? "Χρήση ανανεώσιμων πηγών ενέργειας" : "Use renewable energy sources",
          language === 'el' ? "Ανακύκλωση νερού στην παραγωγή" : "Water recycling in production",
          language === 'el' ? "Μείωση χρήσης χημικών" : "Reduce chemical usage",
          language === 'el' ? "Βιοδιασπώμενες συσκευασίες" : "Biodegradable packaging"
        ]
      },
      {
        category: language === 'el' ? "Διανομή & Logistics" : "Distribution & Logistics",
        practices: [
          language === 'el' ? "Βελτιστοποίηση διαδρομών μεταφοράς" : "Optimize transport routes",
          language === 'el' ? "Χρήση ηλεκτρικών οχημάτων όπου εφικτό" : "Use electric vehicles where feasible",
          language === 'el' ? "Συμπλήρωση φορτίων για μείωση εκπομπών" : "Load consolidation to reduce emissions",
          language === 'el' ? "Τοπικά κέντρα διανομής" : "Local distribution centers"
        ]
      }
    ];
  };

  const carbonFootprint = calculateCarbonFootprint();
  const waterUsage = calculateWaterUsage();
  const wasteReductionTips = getWasteReductionTips();
  const sustainablePractices = getSustainablePractices();

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <CardTitle className="flex items-center space-x-2 text-slate-800">
          <Leaf className="w-5 h-5 text-green-600" />
          <span>
            {language === 'el' ? 'Βιωσιμότητα & Περιβαλλοντική Επίδραση' : 'Sustainability & Environmental Impact'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="carbon" className="flex items-center space-x-1 text-xs">
              <Globe className="w-3 h-3" />
              <span>{language === 'el' ? 'Άνθρακας' : 'Carbon'}</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="flex items-center space-x-1 text-xs">
              <Droplets className="w-3 h-3" />
              <span>{language === 'el' ? 'Νερό' : 'Water'}</span>
            </TabsTrigger>
            <TabsTrigger value="waste" className="flex items-center space-x-1 text-xs">
              <Recycle className="w-3 h-3" />
              <span>{language === 'el' ? 'Απόβλητα' : 'Waste'}</span>
            </TabsTrigger>
            <TabsTrigger value="practices" className="flex items-center space-x-1 text-xs">
              <Award className="w-3 h-3" />
              <span>{language === 'el' ? 'Πρακτικές' : 'Practices'}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="carbon" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-4 h-4 text-red-600" />
                    <h4 className="font-semibold text-red-800">
                      {language === 'el' ? 'Συνολικές Εκπομπές CO₂' : 'Total CO₂ Emissions'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{carbonFootprint.total.toFixed(1)} kg</p>
                  <p className="text-sm text-red-600">
                    {carbonFootprint.perKg.toFixed(2)} kg CO₂ {language === 'el' ? 'ανά κιλό' : 'per kg'}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      {language === 'el' ? 'Κατανομή Εκπομπών' : 'Emissions Breakdown'}
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'el' ? 'Μεταφορά:' : 'Transport:'}</span>
                      <span>{carbonFootprint.transport.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{language === 'el' ? 'Επεξεργασία:' : 'Processing:'}</span>
                      <span>{carbonFootprint.processing.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>{language === 'el' ? 'Ενέργεια:' : 'Energy:'}</span>
                      <span>{carbonFootprint.energy.toFixed(1)} kg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Στόχοι Βιωσιμότητας' : 'Sustainability Targets'}
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language === 'el' ? 'Μείωση εκπομπών CO₂' : 'CO₂ emission reduction'}</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language === 'el' ? 'Χρήση ανανεώσιμων' : 'Renewable energy use'}</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{language === 'el' ? 'Μείωση συσκευασίας' : 'Packaging reduction'}</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="water" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      {language === 'el' ? 'Συνολική Χρήση' : 'Total Usage'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{waterUsage.total.toFixed(0)} L</p>
                  <p className="text-sm text-blue-600">
                    {waterUsage.perKg.toFixed(1)} L {language === 'el' ? 'ανά κιλό' : 'per kg'}
                  </p>
                </div>

                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Factory className="w-4 h-4 text-cyan-600" />
                    <h4 className="font-semibold text-cyan-800">
                      {language === 'el' ? 'Επεξεργασία' : 'Processing'}
                    </h4>
                  </div>
                  <p className="text-xl font-bold text-cyan-600">{waterUsage.processing.toFixed(0)} L</p>
                  <p className="text-sm text-cyan-600">
                    {((waterUsage.processing / waterUsage.total) * 100).toFixed(0)}% {language === 'el' ? 'του συνόλου' : 'of total'}
                  </p>
                </div>

                <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Recycle className="w-4 h-4 text-teal-600" />
                    <h4 className="font-semibold text-teal-800">
                      {language === 'el' ? 'Δυνατότητα Ανακύκλωσης' : 'Recyclable Potential'}
                    </h4>
                  </div>
                  <p className="text-xl font-bold text-teal-600">70%</p>
                  <p className="text-sm text-teal-600">
                    {(waterUsage.total * 0.7).toFixed(0)} L {language === 'el' ? 'εξοικονόμηση' : 'savings'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Droplets className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Στρατηγικές Εξοικονόμησης Νερού' : 'Water Conservation Strategies'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-2 p-3 bg-white rounded border">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        {language === 'el' ? 'Κλειστό Κύκλωμα Ψύξης' : 'Closed-Loop Cooling'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'el' ? 'Εξοικονόμηση 40% νερού' : '40% water savings'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 bg-white rounded border">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        {language === 'el' ? 'Επαναχρησιμοποίηση Νερού Πλύσης' : 'Wash Water Reuse'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'el' ? 'Εξοικονόμηση 25% νερού' : '25% water savings'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 bg-white rounded border">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        {language === 'el' ? 'Αισθητήρες Ροής' : 'Flow Sensors'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'el' ? 'Εξοικονόμηση 15% νερού' : '15% water savings'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 bg-white rounded border">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">
                        {language === 'el' ? 'Συλλογή Βρόχινου Νερού' : 'Rainwater Collection'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'el' ? 'Δωρεάν πηγή νερού' : 'Free water source'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="waste" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <h4 className="font-semibold text-orange-800">
                      {language === 'el' ? 'Τρέχουσες Απώλειες' : 'Current Waste'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{formData.waste || 0}%</p>
                  <p className="text-sm text-orange-600">
                    {((formData.quantity || 0) * (formData.waste || 0) / 100).toFixed(1)} kg {language === 'el' ? 'απώλειες' : 'waste'}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-800">
                      {language === 'el' ? 'Στόχος Μείωσης' : 'Reduction Target'}
                    </h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{Math.max(0, (formData.waste || 0) - 5)}%</p>
                  <p className="text-sm text-green-600">
                    -5% {language === 'el' ? 'μείωση στόχος' : 'reduction target'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Τρόποι Μείωσης Απωλειών' : 'Waste Reduction Methods'}
                </h4>
                
                {wasteReductionTips.map((tip, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-gray-800">{tip.title}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant={tip.difficulty === 'Easy' || tip.difficulty === 'Εύκολη' ? 'default' : 'secondary'}>
                          {tip.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          -{tip.impact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <Recycle className="w-4 h-4 mr-2" />
                  {language === 'el' ? 'Κυκλική Οικονομία' : 'Circular Economy'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white rounded">
                    <Fish className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                    <p className="text-sm font-medium">{language === 'el' ? 'Αξιοποίηση Υπολειμμάτων' : 'Waste Utilization'}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'el' ? 'Ζωμοί, λιπάσματα, τροφές ζώων' : 'Broths, fertilizers, animal feed'}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <Droplets className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                    <p className="text-sm font-medium">{language === 'el' ? 'Ανακύκλωση Νερού' : 'Water Recycling'}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'el' ? 'Φιλτράρισμα και επαναχρήση' : 'Filtering and reuse'}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white rounded">
                    <TreePine className="w-8 h-8 mx-auto text-green-600 mb-2" />
                    <p className="text-sm font-medium">{language === 'el' ? 'Βιο-αποσύνθεση' : 'Bio-decomposition'}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {language === 'el' ? 'Κομποστοποίηση οργανικών' : 'Organic composting'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practices" className="mt-6">
            <div className="space-y-6">
              {sustainablePractices.map((section, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    {section.category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {section.practices.map((practice, practiceIndex) => (
                      <div key={practiceIndex} className="flex items-start space-x-2 p-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{practice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-4 h-4 text-green-600" />
                    <h4 className="font-semibold text-green-800">
                      {language === 'el' ? 'Κοινωνική Ευθύνη' : 'Social Responsibility'}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• {language === 'el' ? 'Δίκαιες συνθήκες εργασίας' : 'Fair working conditions'}</li>
                    <li>• {language === 'el' ? 'Υποστήριξη τοπικών κοινοτήτων' : 'Support local communities'}</li>
                    <li>• {language === 'el' ? 'Εκπαίδευση εργαζομένων' : 'Employee training'}</li>
                    <li>• {language === 'el' ? 'Διαφάνεια στην εφοδιαστική αλυσίδα' : 'Supply chain transparency'}</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      {language === 'el' ? 'Πιστοποιήσεις' : 'Certifications'}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• MSC (Marine Stewardship Council)</li>
                    <li>• ASC (Aquaculture Stewardship Council)</li>
                    <li>• ISO 14001 (Environmental Management)</li>
                    <li>• HACCP (Food Safety)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-4 h-4 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-800">
                    {language === 'el' ? 'Οικονομικά Οφέλη Βιωσιμότητας' : 'Economic Benefits of Sustainability'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-700">15-25%</p>
                    <p className="text-sm text-yellow-600">
                      {language === 'el' ? 'Μείωση κόστους' : 'Cost reduction'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-700">30%</p>
                    <p className="text-sm text-yellow-600">
                      {language === 'el' ? 'Αύξηση πωλήσεων' : 'Sales increase'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-700">20%</p>
                    <p className="text-sm text-yellow-600">
                      {language === 'el' ? 'Premium τιμή' : 'Premium pricing'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SustainabilitySection;
