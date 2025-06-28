
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

interface LaborOptimizationProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const LaborOptimization: React.FC<LaborOptimizationProps> = ({ formData, updateFormData }) => {
  const [targetQuantity, setTargetQuantity] = useState(500);
  const [targetHours, setTargetHours] = useState(1);
  const [showOptimization, setShowOptimization] = useState(false);

  const calculateOptimalLabor = () => {
    // Based on the example: 5 workers, 500kg in 1 hour
    const baseProductivity = 500 / (5 * 1); // 100kg per worker per hour
    
    const optimalWorkers = Math.ceil(targetQuantity / (baseProductivity * targetHours));
    const actualHours = targetQuantity / (optimalWorkers * baseProductivity);
    
    // Labor cost calculation with mixed wages
    const supervisorWage = 5; // 1 supervisor at 5€/hour
    const workerWage = 4.5; // others at 4.5€/hour
    
    const totalLaborCost = supervisorWage + (optimalWorkers - 1) * workerWage;
    const costPerKg = totalLaborCost / (targetQuantity / targetHours);

    return {
      optimalWorkers,
      actualHours,
      totalLaborCost: totalLaborCost * actualHours,
      costPerKg,
      productivity: targetQuantity / (optimalWorkers * actualHours)
    };
  };

  const optimization = showOptimization ? calculateOptimalLabor() : null;

  const applyOptimization = () => {
    if (optimization) {
      updateFormData({
        workerCount: optimization.optimalWorkers,
        laborHours: optimization.actualHours,
        quantity: targetQuantity
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Βελτιστοποίηση Εργατικού Δυναμικού</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>Στόχος Παραγωγής (κιλά)</span>
            </Label>
            <Input
              type="number"
              value={targetQuantity}
              onChange={(e) => setTargetQuantity(parseInt(e.target.value) || 0)}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Διαθέσιμες Ώρες</span>
            </Label>
            <Input
              type="number"
              step="0.5"
              value={targetHours}
              onChange={(e) => setTargetHours(parseFloat(e.target.value) || 0)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={() => setShowOptimization(true)}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Υπολογισμός Βέλτιστου Σχήματος</span>
          </Button>

          {optimization && (
            <Button 
              variant="outline"
              onClick={applyOptimization}
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Εφαρμογή στη Φόρμα</span>
            </Button>
          )}
        </div>

        {optimization && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-blue-600 mb-1">Βέλτιστοι Εργάτες</div>
                <div className="text-2xl font-bold text-blue-900">{optimization.optimalWorkers}</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-green-600 mb-1">Πραγματικές Ώρες</div>
                <div className="text-2xl font-bold text-green-900">{optimization.actualHours.toFixed(1)}</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-purple-600 mb-1">Συνολικό Κόστος</div>
                <div className="text-2xl font-bold text-purple-900">{optimization.totalLaborCost.toFixed(2)}€</div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-orange-600 mb-1">Κόστος/Κιλό</div>
                <div className="text-2xl font-bold text-orange-900">{optimization.costPerKg.toFixed(3)}€</div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-700 mb-3 flex items-center space-x-2">
                <Calculator className="w-4 h-4" />
                <span>Ανάλυση Παραγωγικότητας</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Παραγωγικότητα:</span>
                  <Badge variant="secondary">{optimization.productivity.toFixed(1)} κιλά/εργάτη/ώρα</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Συνολικές Εργατοώρες:</span>
                  <Badge variant="secondary">{(optimization.optimalWorkers * optimization.actualHours).toFixed(1)}</Badge>
                </div>
              </div>
            </div>

            {optimization.optimalWorkers < 3 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Προειδοποίηση</h4>
                    <p className="text-amber-700 text-sm">
                      Ο αριθμός εργατών είναι πολύ μικρός. Εξετάστε την αύξηση του στόχου παραγωγής ή τη μείωση των ωρών.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LaborOptimization;
