import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Fish, 
  Truck, 
  Factory, 
  Package, 
  Calculator,
  Users,
  Euro,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProcessingPhases from '@/components/ProcessingPhases';

interface ComprehensiveBatchFormProps {
  formData: any;
  updateFormData: (data: any) => void;
  isPremium?: boolean;
}

const ComprehensiveBatchForm: React.FC<ComprehensiveBatchFormProps> = ({ 
  formData, 
  updateFormData, 
  isPremium 
}) => {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({
    rawMaterial: true,
    finalProduct: false,
    processing: false,
    labor: false,
    packaging: false,
    financial: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    const requiredFields = [
      'productName', 'weight', 'purchasePrice', 'supplierName', 'batchNumber'
    ];
    const completed = requiredFields.filter(field => formData[field]).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  const completion = calculateCompletion();

  // Calculate totals for preview
  const rawMaterialCost = (formData.weight || 0) * (formData.purchasePrice || 0);
  const finalWeight = formData.finalCleanWeight + formData.finalGrillWeight || 0;
  const totalLoss = (formData.weight || 0) - finalWeight;
  const lossPercentage = formData.weight > 0 ? (totalLoss / formData.weight) * 100 : 0;
  const yield_ = formData.weight > 0 ? (finalWeight / formData.weight) * 100 : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Progress Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Fish className="w-6 h-6 text-blue-600" />
              <span className="text-xl">Αναφορά Παρτίδας</span>
            </CardTitle>
            <Badge variant={completion === 100 ? "default" : "secondary"}>
              {completion}% Complete
            </Badge>
          </div>
          <Progress value={completion} className="h-2 mt-2" />
          {formData.productName && (
            <p className="text-sm text-muted-foreground mt-2">
              📋 {formData.productName} {formData.batchNumber && `- Παρτίδα ${formData.batchNumber}`}
            </p>
          )}
        </CardHeader>
      </Card>

      {/* 1. Raw Material Information */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('rawMaterial')}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Fish className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <span>🐙 Πρώτη Ύλη</span>
                <div className="text-sm font-normal text-muted-foreground">
                  Στοιχεία εισερχόμενου προϊόντος
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {formData.productName && formData.weight && formData.purchasePrice && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {expandedSections.rawMaterial ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {expandedSections.rawMaterial && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="productName" className="flex items-center space-x-2">
                  <span>Προϊόν *</span>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </Label>
                <Input
                  id="productName"
                  value={formData.productName || ''}
                  onChange={(e) => handleChange('productName', e.target.value)}
                  placeholder="π.χ. Θράψαλο ΝΖ ολόκληρο block 2Μ"
                  className={!formData.productName ? "border-red-300" : ""}
                />
              </div>

              <div>
                <Label htmlFor="supplierName">Προμηθευτής *</Label>
                <Input
                  id="supplierName"
                  value={formData.supplierName || ''}
                  onChange={(e) => handleChange('supplierName', e.target.value)}
                  placeholder="π.χ. Marine"
                  className={!formData.supplierName ? "border-red-300" : ""}
                />
              </div>

              <div>
                <Label htmlFor="batchNumber">Παρτίδα Εισερχόμενου *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber || ''}
                  onChange={(e) => handleChange('batchNumber', e.target.value)}
                  placeholder="π.χ. 20024"
                  className={!formData.batchNumber ? "border-red-300" : ""}
                />
              </div>

              <div>
                <Label htmlFor="weight">Ποσότητα Εισερχόμενου (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
                  placeholder="900"
                  className={!formData.weight ? "border-red-300" : ""}
                />
              </div>

              <div>
                <Label htmlFor="purchasePrice">Τιμή Αγοράς (€/kg) *</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="0.01"
                  value={formData.purchasePrice || ''}
                  onChange={(e) => handleChange('purchasePrice', parseFloat(e.target.value) || 0)}
                  placeholder="5.70"
                  className={!formData.purchasePrice ? "border-red-300" : ""}
                />
              </div>
            </div>

            {/* Cost Preview */}
            {formData.weight && formData.purchasePrice && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Συνολικό Κόστος Αγοράς:</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-700">
                      €{rawMaterialCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formData.weight} kg × €{formData.purchasePrice}/kg
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* 2. Final Product Information */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('finalProduct')}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <span>📦 Τελικό Προϊόν</span>
                <div className="text-sm font-normal text-muted-foreground">
                  Παρτίδα και προϊόντα εξόδου
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {(formData.finalBatchNumber || formData.finalCleanWeight || formData.finalGrillWeight) && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {expandedSections.finalProduct ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {expandedSections.finalProduct && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="finalBatchNumber">Παρτίδα Τελικού Προϊόντος</Label>
                <Input
                  id="finalBatchNumber"
                  value={formData.finalBatchNumber || ''}
                  onChange={(e) => handleChange('finalBatchNumber', e.target.value)}
                  placeholder="π.χ. 20025"
                />
              </div>

              <div>
                <Label htmlFor="finalCleanWeight">Καθ. Θράψαλο 2Μ (kg)</Label>
                <Input
                  id="finalCleanWeight"
                  type="number"
                  step="0.01"
                  value={formData.finalCleanWeight || ''}
                  onChange={(e) => handleChange('finalCleanWeight', parseFloat(e.target.value) || 0)}
                  placeholder="430"
                />
              </div>

              <div>
                <Label htmlFor="finalGrillWeight">Θράψαλο Grill 2Μ (kg)</Label>
                <Input
                  id="finalGrillWeight"
                  type="number"
                  step="0.01"
                  value={formData.finalGrillWeight || ''}
                  onChange={(e) => handleChange('finalGrillWeight', parseFloat(e.target.value) || 0)}
                  placeholder="461.16"
                />
              </div>

              <div>
                <Label htmlFor="targetSellingPrice">Τιμή Πώλησης (€/kg)</Label>
                <Input
                  id="targetSellingPrice"
                  type="number"
                  step="0.01"
                  value={formData.targetSellingPrice || ''}
                  onChange={(e) => handleChange('targetSellingPrice', parseFloat(e.target.value) || 0)}
                  placeholder="8.00"
                />
              </div>
            </div>

            {/* Yield Calculation Preview */}
            {formData.weight && finalWeight > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-600 font-medium">Συνολικό Τελικό Προϊόν</div>
                  <div className="text-2xl font-bold text-green-700">{finalWeight.toFixed(2)} kg</div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-sm text-red-600 font-medium">Φύρα</div>
                  <div className="text-2xl font-bold text-red-700">{totalLoss.toFixed(2)} kg</div>
                  <div className="text-xs text-red-500">{lossPercentage.toFixed(1)}% απώλεια</div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium">Απόδοση (Yield)</div>
                  <div className="text-2xl font-bold text-blue-700">{yield_.toFixed(1)}%</div>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* 3. Processing Phases */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('processing')}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Factory className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span>⚙️ Επεξεργασία</span>
                <div className="text-sm font-normal text-muted-foreground">
                  Παραγωγική διαδικασία (προαιρετικό)
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Προαιρετικό</Badge>
              {expandedSections.processing ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {expandedSections.processing && (
          <CardContent>
            <ProcessingPhases
              formData={formData}
              updateFormData={updateFormData}
              isPremium={isPremium}
            />
          </CardContent>
        )}
      </Card>

      {/* 4. Labor Costs */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('labor')}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span>🧑‍🔧 Ανθρώπινο Δυναμικό</span>
                <div className="text-sm font-normal text-muted-foreground">
                  Εργατικά κόστη
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {expandedSections.labor ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {expandedSections.labor && (
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Παράδειγμα από την αναφορά σας:
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium">Καθάρισμα & Grill</div>
                  <div className="text-muted-foreground">5 άτομα × 8 ώρες = 200€</div>
                </div>
                <div>
                  <div className="font-medium">Στρώσιμο</div>
                  <div className="text-muted-foreground">4 άτομα × 2 ώρες = 40€</div>
                </div>
                <div>
                  <div className="font-medium">Γλασσάρισμα</div>
                  <div className="text-muted-foreground">7 άτομα × 2 ώρες = 70€</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-300">
                <div className="flex justify-between">
                  <span className="font-medium">Σύνολο: 62 ώρες</span>
                  <span className="font-bold">310€</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => toggleSection('processing')}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <Layers className="w-4 h-4 mr-2" />
                Χρησιμοποιήστε Φάσεις Επεξεργασίας για λεπτομερή ανάλυση
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* 5. Packaging Costs */}
      <Card className="border-l-4 border-l-pink-500">
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('packaging')}>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Package className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <span>📦 Συσκευασία</span>
                <div className="text-sm font-normal text-muted-foreground">
                  Σακούλες, ζελατίνα, κούτες
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {expandedSections.packaging ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
          </CardTitle>
        </CardHeader>
        
        {expandedSections.packaging && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bagWeight">Περιεχόμενο σακούλας (kg)</Label>
                <Input
                  id="bagWeight"
                  type="number"
                  value={formData.bagWeight || 5}
                  onChange={(e) => handleChange('bagWeight', parseFloat(e.target.value) || 5)}
                  placeholder="5"
                />
              </div>

              <div>
                <Label htmlFor="gelatinCostPerKg">Κόστος ζελατίνας (€/kg)</Label>
                <Input
                  id="gelatinCostPerKg"
                  type="number"
                  step="0.01"
                  value={formData.gelatinCostPerKg || 3.15}
                  onChange={(e) => handleChange('gelatinCostPerKg', parseFloat(e.target.value) || 3.15)}
                  placeholder="3.15"
                />
              </div>

              <div>
                <Label htmlFor="bagsPerKgGelatin">Σακούλες ανά kg ζελατίνας</Label>
                <Input
                  id="bagsPerKgGelatin"
                  type="number"
                  value={formData.bagsPerKgGelatin || 35}
                  onChange={(e) => handleChange('bagsPerKgGelatin', parseInt(e.target.value) || 35)}
                  placeholder="35"
                />
              </div>

              <div>
                <Label htmlFor="boxCostPerUnit">Κόστος κούτας (€/τεμ)</Label>
                <Input
                  id="boxCostPerUnit"
                  type="number"
                  step="0.01"
                  value={formData.boxCostPerUnit || 0.59}
                  onChange={(e) => handleChange('boxCostPerUnit', parseFloat(e.target.value) || 0.59)}
                  placeholder="0.59"
                />
              </div>

              <div>
                <Label htmlFor="bagsPerBox">Σακούλες ανά κούτα</Label>
                <Input
                  id="bagsPerBox"
                  type="number"
                  value={formData.bagsPerBox || 2}
                  onChange={(e) => handleChange('bagsPerBox', parseInt(e.target.value) || 2)}
                  placeholder="2"
                />
              </div>
            </div>

            {/* Packaging Calculation Preview */}
            {finalWeight > 0 && formData.bagWeight && (
              <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-medium mb-3">Υπολογισμός Συσκευασίας:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex justify-between">
                      <span>Σακούλες:</span>
                      <span>{Math.ceil(finalWeight / (formData.bagWeight || 5))} τεμ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ζελατίνα:</span>
                      <span>{(Math.ceil(finalWeight / (formData.bagWeight || 5)) / (formData.bagsPerKgGelatin || 35)).toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Κούτες:</span>
                      <span>{Math.ceil(Math.ceil(finalWeight / (formData.bagWeight || 5)) / (formData.bagsPerBox || 2))} τεμ</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-medium">
                      <span>Συνολικό κόστος:</span>
                      <span>€{(
                        (Math.ceil(finalWeight / (formData.bagWeight || 5)) / (formData.bagsPerKgGelatin || 35)) * (formData.gelatinCostPerKg || 3.15) +
                        Math.ceil(Math.ceil(finalWeight / (formData.bagWeight || 5)) / (formData.bagsPerBox || 2)) * (formData.boxCostPerUnit || 0.59)
                      ).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Quick Action Buttons */}
      <div className="flex justify-center space-x-4 pt-6">
        <Button 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={completion < 50}
        >
          <Calculator className="w-5 h-5 mr-2" />
          Υπολογισμός Παρτίδας
        </Button>
        
        <Button 
          variant="outline"
          size="lg"
          onClick={() => {
            // Expand all sections for review
            setExpandedSections({
              rawMaterial: true,
              finalProduct: true,
              processing: true,
              labor: true,
              packaging: true,
              financial: true
            });
          }}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Επισκόπηση Όλων
        </Button>
      </div>
    </div>
  );
};

export default ComprehensiveBatchForm;
