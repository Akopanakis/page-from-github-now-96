
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Clock, Euro, Archive, Package, Plus, ChevronDown } from 'lucide-react';
import AdditionalCostsModal from '@/components/AdditionalCostsModal';

interface CostsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const CostsTab: React.FC<CostsTabProps> = ({ formData, updateFormData }) => {
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(false);

  const totalLaborHours = (formData.workerCount || 0) * (formData.laborHours || 0);
  const totalLaborCost = totalLaborHours * (formData.laborCost || 0);

  return (
    <div className="space-y-6">
      {/* Labor Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Εργασία</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Αριθμός Εργαζομένων</span>
              </Label>
              <Input
                type="number"
                min="1"
                step="1"
                value={formData.workerCount || 1}
                onChange={(e) => updateFormData({ workerCount: parseInt(e.target.value) || 1 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Ώρες Εργασίας (ανά άτομο)</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.laborHours || ''}
                onChange={(e) => updateFormData({ laborHours: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Euro className="w-4 h-4" />
              <span>Κόστος/Ώρα (€)</span>
            </Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.laborCost || ''}
              onChange={(e) => updateFormData({ laborCost: parseFloat(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Συνολικές Εργατοώρες:</span>
              <span className="text-sm font-bold text-blue-600">{totalLaborHours}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Συνολικό Κόστος Εργασίας:</span>
              <span className="text-sm font-bold text-blue-600">{totalLaborCost.toFixed(2)}€</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Packaging Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Συσκευασία</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="flex items-center space-x-2">
                <Archive className="w-4 h-4" />
                <span>Κόστος Κούτας (€)</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.boxCost || ''}
                onChange={(e) => updateFormData({ boxCost: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Κόστος Σακούλας (€)</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.bagCost || ''}
                onChange={(e) => updateFormData({ bagCost: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Costs Toggle */}
      <div>
        <Button
          variant="outline"
          onClick={() => setShowAdditionalCosts(true)}
          className="w-full flex items-center justify-between p-4 h-auto"
        >
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Επιπλέον Κόστη</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <AdditionalCostsModal 
        isOpen={showAdditionalCosts}
        onClose={() => setShowAdditionalCosts(false)}
        formData={formData}
        updateFormData={updateFormData}
      />
    </div>
  );
};

export default CostsTab;
