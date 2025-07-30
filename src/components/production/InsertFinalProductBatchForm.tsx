import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Factory, 
  Package, 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Info,
  Truck,
  DollarSign,
  Percent,
  Scale,
  Calendar,
  Hash
} from 'lucide-react';
import { 
  FinalProductBatchFormData, 
  RawMaterialBatch, 
  FinalProduct, 
  PackagingOption,
  FinalProductBatch 
} from '@/types/finalProduct';
import { finalProductDemoData } from '@/data/finalProductDemo';
import { toast } from '@/components/ui/sonner';

interface InsertFinalProductBatchFormProps {
  onSubmit?: (batch: FinalProductBatch) => void;
  onCancel?: () => void;
}

const InsertFinalProductBatchForm: React.FC<InsertFinalProductBatchFormProps> = ({
  onSubmit,
  onCancel
}) => {
  // Form state
  const [formData, setFormData] = useState<FinalProductBatchFormData>({
    productId: '',
    sourceBatchId: '',
    rawUsedKg: 0,
    finalProductKg: 0,
    packagingType: '',
    packagingUnits: 0,
    productionDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Calculation state
  const [calculations, setCalculations] = useState({
    rawMaterialCost: 0,
    packagingCostPerUnit: 0,
    packagingCostTotal: 0,
    totalCost: 0,
    costPerKg: 0,
    yieldPercentage: 0,
    suggestedPackagingUnits: 0
  });

  // Demo data
  const [availableProducts] = useState<FinalProduct[]>(finalProductDemoData.finalProducts);
  const [availableRawMaterials] = useState<RawMaterialBatch[]>(
    finalProductDemoData.rawMaterials.filter(rm => rm.isActive && rm.remainingKg > 0)
  );
  const [availablePackaging] = useState<PackagingOption[]>(finalProductDemoData.packagingOptions);

  // Derived state
  const selectedProduct = availableProducts.find(p => p.id === formData.productId);
  const selectedRawMaterial = availableRawMaterials.find(rm => rm.id === formData.sourceBatchId);
  const selectedPackaging = availablePackaging.find(p => p.name === formData.packagingType);

  // Form validation
  const isValid = formData.productId && 
                 formData.sourceBatchId && 
                 formData.rawUsedKg > 0 && 
                 formData.finalProductKg > 0 && 
                 formData.packagingType && 
                 formData.packagingUnits > 0;

  const completionPercentage = [
    formData.productId,
    formData.sourceBatchId,
    formData.rawUsedKg > 0,
    formData.finalProductKg > 0,
    formData.packagingType,
    formData.packagingUnits > 0
  ].filter(Boolean).length * (100 / 6);

  // Update calculations when form data changes
  useEffect(() => {
    const newCalculations = {
      rawMaterialCost: selectedRawMaterial ? formData.rawUsedKg * selectedRawMaterial.costPerKg : 0,
      packagingCostPerUnit: selectedPackaging?.unitCost || 0,
      packagingCostTotal: (selectedPackaging?.unitCost || 0) * formData.packagingUnits,
      totalCost: 0,
      costPerKg: 0,
      yieldPercentage: formData.rawUsedKg > 0 ? (formData.finalProductKg / formData.rawUsedKg) * 100 : 0,
      suggestedPackagingUnits: selectedPackaging ? Math.ceil(formData.finalProductKg / selectedPackaging.capacity) : 0
    };

    newCalculations.totalCost = newCalculations.rawMaterialCost + newCalculations.packagingCostTotal;
    newCalculations.costPerKg = formData.finalProductKg > 0 ? newCalculations.totalCost / formData.finalProductKg : 0;

    setCalculations(newCalculations);
  }, [formData, selectedRawMaterial, selectedPackaging]);

  // Auto-suggest packaging units when packaging type or final product kg changes
  useEffect(() => {
    if (selectedPackaging && formData.finalProductKg > 0 && formData.packagingUnits === 0) {
      const suggested = Math.ceil(formData.finalProductKg / selectedPackaging.capacity);
      setFormData(prev => ({ ...prev, packagingUnits: suggested }));
    }
  }, [formData.packagingType, formData.finalProductKg, selectedPackaging]);

  const handleInputChange = (field: keyof FinalProductBatchFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.error('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    // Generate batch number
    const batchNumber = `FP${Date.now().toString().slice(-6)}`;

    const newBatch: FinalProductBatch = {
      id: `fpb_${Date.now()}`,
      batchNumber,
      productId: formData.productId,
      productName: selectedProduct?.name || '',
      productCode: selectedProduct?.code || '',
      
      sourceBatchId: formData.sourceBatchId,
      sourceBatchNumber: selectedRawMaterial?.batchNumber || '',
      rawUsedKg: formData.rawUsedKg,
      rawCostPerKg: selectedRawMaterial?.costPerKg || 0,
      
      finalProductKg: formData.finalProductKg,
      productionDate: formData.productionDate,
      yieldPercentage: calculations.yieldPercentage,
      
      packagingType: formData.packagingType,
      packagingUnits: formData.packagingUnits,
      packagingCostPerUnit: calculations.packagingCostPerUnit,
      packagingCostTotal: calculations.packagingCostTotal,
      
      rawMaterialCost: calculations.rawMaterialCost,
      calculatedCostPerKg: calculations.costPerKg,
      totalCost: calculations.totalCost,
      
      status: 'produced',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSubmit?.(newBatch);
    toast.success(`Παρτίδα ${batchNumber} καταχωρήθηκε επιτυχώς!`);
    
    // Reset form
    setFormData({
      productId: '',
      sourceBatchId: '',
      rawUsedKg: 0,
      finalProductKg: 0,
      packagingType: '',
      packagingUnits: 0,
      productionDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const getYieldColor = (yield_: number) => {
    if (yield_ >= 85) return 'text-green-600';
    if (yield_ >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProfitColor = (costPerKg: number, estimatedPrice: number = 5.00) => {
    const margin = ((estimatedPrice - costPerKg) / estimatedPrice) * 100;
    if (margin >= 30) return 'text-green-600';
    if (margin >= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl">Καταχώρηση Παρτίδας Τελικού Προϊόντος</span>
              <div className="text-sm text-muted-foreground mt-1">
                Δημιουργία νέας παρτίδας με υπολογισμό κόστους και συσκευασίας
              </div>
            </div>
            <Badge variant={completionPercentage === 100 ? "default" : "secondary"}>
              {Math.round(completionPercentage)}% Complete
            </Badge>
          </CardTitle>
          <Progress value={completionPercentage} className="h-2" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span>Επιλογή Προϊόντος</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product">Τελικό Προϊόν *</Label>
                <Select value={formData.productId} onValueChange={(value) => handleInputChange('productId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε προϊόν..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{product.code}</Badge>
                          <span>{product.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProduct && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedProduct.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="productionDate">Ημερομηνία Παραγωγής *</Label>
                <Input
                  type="date"
                  value={formData.productionDate}
                  onChange={(e) => handleInputChange('productionDate', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Raw Material Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Πρώτη Ύλη</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sourceBatch">Παρτίδα Α' Ύλης *</Label>
                <Select value={formData.sourceBatchId} onValueChange={(value) => handleInputChange('sourceBatchId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε παρτίδα..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRawMaterials.map(batch => (
                      <SelectItem key={batch.id} value={batch.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <Badge variant="outline">{batch.batchNumber}</Badge>
                            <span className="ml-2">{batch.productName}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {batch.remainingKg}kg @ €{batch.costPerKg}/kg
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedRawMaterial && (
                  <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Προμηθευτής:</span> {selectedRawMaterial.supplierName}
                      </div>
                      <div>
                        <span className="font-medium">Διαθέσιμα:</span> {selectedRawMaterial.remainingKg} kg
                      </div>
                      <div>
                        <span className="font-medium">Κόστος:</span> €{selectedRawMaterial.costPerKg}/kg
                      </div>
                      <div>
                        <span className="font-medium">Ημ. Αγοράς:</span> {new Date(selectedRawMaterial.purchaseDate).toLocaleDateString('el-GR')}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="rawUsedKg">Κιλά Α' Ύλης που Χρησιμοποιήθηκαν *</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.rawUsedKg || ''}
                  onChange={(e) => handleInputChange('rawUsedKg', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                  max={selectedRawMaterial?.remainingKg}
                />
                {selectedRawMaterial && formData.rawUsedKg > selectedRawMaterial.remainingKg && (
                  <Alert className="mt-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Ζητούμενη ποσότητα υπερβαίνει τη διαθέσιμη ({selectedRawMaterial.remainingKg} kg)
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="finalProductKg">Παραχθέντα Κιλά Τελικού Προϊόντος *</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.finalProductKg || ''}
                  onChange={(e) => handleInputChange('finalProductKg', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Packaging */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-purple-600" />
                <span>Συσκευασία</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="packagingType">Τύπος Συσκευασίας *</Label>
                <Select value={formData.packagingType} onValueChange={(value) => handleInputChange('packagingType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Επιλέξτε συσκευασία..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePackaging.map(pkg => (
                      <SelectItem key={pkg.id} value={pkg.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{pkg.name}</span>
                          <span className="text-sm text-muted-foreground ml-4">
                            {pkg.capacity}kg @ €{pkg.unitCost}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedPackaging && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPackaging.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="packagingUnits">Πλήθος Τεμαχίων *</Label>
                  <Input
                    type="number"
                    value={formData.packagingUnits || ''}
                    onChange={(e) => handleInputChange('packagingUnits', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {calculations.suggestedPackagingUnits > 0 && formData.packagingUnits !== calculations.suggestedPackagingUnits && (
                    <p className="text-sm text-blue-600 mt-1">
                      💡 Προτείνεται: {calculations.suggestedPackagingUnits} τεμ.
                    </p>
                  )}
                </div>

                <div>
                  <Label>Συνολικό Κόστος Συσκευασίας</Label>
                  <div className="text-lg font-bold text-purple-600">
                    €{calculations.packagingCostTotal.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.packagingUnits} × €{calculations.packagingCostPerUnit}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-gray-600" />
                <span>Σημειώσεις</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Προαιρετικές σημειώσεις για την παρτίδα..."
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right: Calculations & Summary */}
        <div className="space-y-6">
          
          {/* Live Calculations */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span>Υπολογισμοί</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Απόδοση</span>
                    </div>
                    <div className={`text-lg font-bold ${getYieldColor(calculations.yieldPercentage)}`}>
                      {calculations.yieldPercentage.toFixed(1)}%
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.finalProductKg}kg από {formData.rawUsedKg}kg
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">Κόστος Α' Ύλης</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-700">
                      €{calculations.rawMaterialCost.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.rawUsedKg}kg × €{selectedRawMaterial?.costPerKg || 0}/kg
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Κόστος Συσκευασίας</span>
                    </div>
                    <div className="text-lg font-bold text-purple-700">
                      €{calculations.packagingCostTotal.toFixed(2)}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Συνολικό Κόστος</span>
                    <div className="text-xl font-bold text-gray-800">
                      €{calculations.totalCost.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Κόστος/kg</span>
                    <div className="text-xl font-bold text-green-700">
                      €{calculations.costPerKg.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profit Estimation */}
          {calculations.costPerKg > 0 && (
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span>Εκτίμηση Κέρδους</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[4.50, 5.00, 5.50, 6.00].map(price => {
                    const profit = price - calculations.costPerKg;
                    const margin = (profit / price) * 100;
                    return (
                      <div key={price} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">@ €{price}/kg</span>
                        <div className="text-right">
                          <div className={`font-bold ${getProfitColor(calculations.costPerKg, price)}`}>
                            €{profit.toFixed(2)}/kg
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {margin.toFixed(1)}% margin
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demo Examples */}
          <Card className="border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-indigo-600" />
                <span>Demo Παραδείγματα</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-indigo-50 rounded">
                  <div className="font-medium">Γάμπαρη #21125</div>
                  <div className="text-muted-foreground">132kg → 160kg (81% yield)</div>
                  <div className="text-muted-foreground">€2.59/kg | 42.5% margin</div>
                </div>
                
                <div className="p-2 bg-indigo-50 rounded">
                  <div className="font-medium">Χταπόδι #OCT24001</div>
                  <div className="text-muted-foreground">100kg → 80kg (80% yield)</div>
                  <div className="text-muted-foreground">€5.16/kg | 20.6% margin</div>
                </div>
                
                <div className="p-2 bg-indigo-50 rounded">
                  <div className="font-medium">Θράψαλο #THR24002</div>
                  <div className="text-muted-foreground">200kg → 180kg (90% yield)</div>
                  <div className="text-muted-foreground">€3.76/kg | 27.7% margin</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {isValid ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Έτοιμο για καταχώρηση</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Συμπληρώστε όλα τα υποχρεωτικά πεδία</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onCancel}>
                Ακύρωση
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!isValid}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Factory className="w-4 h-4 mr-2" />
                Καταχώρηση Παρτίδας
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsertFinalProductBatchForm;
