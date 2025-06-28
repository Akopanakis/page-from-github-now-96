
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Calculator, Info } from 'lucide-react';

interface PackagingCalculatorProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const PackagingCalculator: React.FC<PackagingCalculatorProps> = ({ formData, updateFormData }) => {
  const [packageType, setPackageType] = useState('bag');
  const [packageSize, setPackageSize] = useState(1);
  const [customCost, setCustomCost] = useState(0);

  const predefinedCosts = {
    bag: {
      0.5: 0.03,
      1: 0.05,
      2: 0.08,
      5: 0.15
    },
    box: {
      1: 0.25,
      2.5: 0.35,
      5: 0.45,
      10: 0.70
    },
    container: {
      5: 0.80,
      10: 1.20,
      20: 1.80
    }
  };

  const calculatePackagingCost = () => {
    const totalWeight = formData.quantity || 0;
    const packagesNeeded = Math.ceil(totalWeight / packageSize);
    
    let costPerPackage;
    if (customCost > 0) {
      costPerPackage = customCost;
    } else {
      costPerPackage = predefinedCosts[packageType as keyof typeof predefinedCosts]?.[packageSize as keyof any] || 0;
    }
    
    const totalCost = packagesNeeded * costPerPackage;
    const costPerKg = totalCost / totalWeight;

    return {
      packagesNeeded,
      costPerPackage,
      totalCost,
      costPerKg
    };
  };

  const calculation = calculatePackagingCost();

  const applyToForm = () => {
    if (packageType === 'bag') {
      updateFormData({ bagCost: calculation.totalCost });
    } else {
      updateFormData({ boxCost: calculation.totalCost });
    }
  };

  const getPackageTypeLabel = (type: string) => {
    switch (type) {
      case 'bag': return 'Σακούλα';
      case 'box': return 'Κούτα';
      case 'container': return 'Κοντέινερ';
      default: return type;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Υπολογιστής Συσκευασίας</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Τύπος Συσκευασίας</Label>
            <Select value={packageType} onValueChange={setPackageType}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bag">Σακούλα</SelectItem>
                <SelectItem value="box">Κούτα</SelectItem>
                <SelectItem value="container">Κοντέινερ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Μέγεθος (κιλά)</Label>
            <Select value={packageSize.toString()} onValueChange={(value) => setPackageSize(parseFloat(value))}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(predefinedCosts[packageType as keyof typeof predefinedCosts] || {}).map(size => (
                  <SelectItem key={size} value={size}>
                    {size} κιλά
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Προσαρμοσμένο Κόστος (€/τεμάχιο)</Label>
            <Input
              type="number"
              step="0.01"
              value={customCost}
              onChange={(e) => setCustomCost(parseFloat(e.target.value) || 0)}
              placeholder="Προαιρετικό"
              className="mt-2"
            />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center space-x-2">
            <Calculator className="w-4 h-4" />
            <span>Αποτελέσματα Υπολογισμού</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-slate-600">Απαιτούμενα Τεμάχια</div>
              <div className="text-xl font-bold text-blue-600">{calculation.packagesNeeded}</div>
            </div>
            
            <div className="text-center">
              <div className="font-medium text-slate-600">Κόστος/Τεμάχιο</div>
              <div className="text-xl font-bold text-green-600">{calculation.costPerPackage.toFixed(3)}€</div>
            </div>
            
            <div className="text-center">
              <div className="font-medium text-slate-600">Συνολικό Κόστος</div>
              <div className="text-xl font-bold text-purple-600">{calculation.totalCost.toFixed(2)}€</div>
            </div>
            
            <div className="text-center">
              <div className="font-medium text-slate-600">Κόστος/Κιλό</div>
              <div className="text-xl font-bold text-orange-600">{calculation.costPerKg.toFixed(3)}€</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={applyToForm} className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Εφαρμογή στη Φόρμα</span>
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Σημείωση</h4>
              <p className="text-blue-700 text-sm">
                Οι προκαθορισμένες τιμές είναι ενδεικτικές. Χρησιμοποιήστε το προσαρμοσμένο κόστος για ακριβείς τιμές.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackagingCalculator;
