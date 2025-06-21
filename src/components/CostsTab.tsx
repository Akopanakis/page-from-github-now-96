
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, Clock, Euro, Archive, Package, Plus, ChevronDown } from 'lucide-react';
import AdditionalCostsModal from '@/components/AdditionalCostsModal';
import WorkersList from '@/components/WorkersList';
import { useLanguage } from '@/contexts/LanguageContext';

interface CostsTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const CostsTab: React.FC<CostsTabProps> = ({ formData, updateFormData }) => {
  const { t } = useLanguage();
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(false);

  const workers = formData.workers || [{ id: '1', hourlyRate: 4.5, hours: 1 }];

  const updateWorkers = (newWorkers: any[]) => {
    updateFormData({ workers: newWorkers });
  };

  return (
    <div className="space-y-6">
      {/* Workers Section */}
      <WorkersList workers={workers} updateWorkers={updateWorkers} />

      {/* Packaging Costs */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <Package className="w-5 h-5 text-emerald-600" />
            <span>Συσκευασία</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="flex items-center space-x-2 text-slate-700 font-medium">
                <Archive className="w-4 h-4 text-amber-600" />
                <span>Κόστος Κούτας (€)</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.boxCost || ''}
                onChange={(e) => updateFormData({ boxCost: parseFloat(e.target.value) || 0 })}
                className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="flex items-center space-x-2 text-slate-700 font-medium">
                <Package className="w-4 h-4 text-indigo-600" />
                <span>Κόστος Σακούλας (€)</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.bagCost || ''}
                onChange={(e) => updateFormData({ bagCost: parseFloat(e.target.value) || 0 })}
                className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Costs Toggle */}
      <Card className="border-slate-200 shadow-lg">
        <CardContent className="p-0">
          <Button
            variant="outline"
            onClick={() => setShowAdditionalCosts(true)}
            className="w-full flex items-center justify-between p-6 h-auto border-0 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-purple-600" />
              <span className="text-lg font-medium text-slate-800">Επιπλέον Κόστη</span>
            </div>
            <ChevronDown className="w-5 h-5 text-slate-500" />
          </Button>
        </CardContent>
      </Card>

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
