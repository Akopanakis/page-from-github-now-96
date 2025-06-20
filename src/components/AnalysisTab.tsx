
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Percent, Shield, TrendingUp, Zap } from 'lucide-react';

interface AnalysisTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ formData, updateFormData }) => {
  const setScenario = (scenario: string) => {
    const margins = {
      conservative: 15,
      balanced: 25,
      aggressive: 40
    };
    updateFormData({ profitMargin: margins[scenario as keyof typeof margins] });
  };

  return (
    <div className="space-y-6">
      {/* Profit Margin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Percent className="w-5 h-5" />
            <span>Περιθώριο Κέρδους</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Επιθυμητό Περιθώριο (%)</span>
            </Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-4">
                <Slider
                  value={[formData.profitMargin || 20]}
                  onValueChange={(value) => updateFormData({ profitMargin: value[0] })}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="w-16 text-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                  {formData.profitMargin || 20}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Σενάρια Τιμολόγησης</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={formData.profitMargin === 15 ? "default" : "outline"}
              onClick={() => setScenario('conservative')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Shield className="w-6 h-6" />
              <span className="font-semibold">Συντηρητικό</span>
              <span className="text-xl font-bold">15%</span>
            </Button>

            <Button
              variant={formData.profitMargin === 25 ? "default" : "outline"}
              onClick={() => setScenario('balanced')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <TrendingUp className="w-6 h-6" />
              <span className="font-semibold">Ισορροπημένο</span>
              <span className="text-xl font-bold">25%</span>
            </Button>

            <Button
              variant={formData.profitMargin === 40 ? "default" : "outline"}
              onClick={() => setScenario('aggressive')}
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <Zap className="w-6 h-6" />
              <span className="font-semibold">Επιθετικό</span>
              <span className="text-xl font-bold">40%</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Σύγκριση με Ανταγωνισμό</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Τιμή Ανταγωνιστή 1 (€/κιλό)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.competitor1 || ''}
                onChange={(e) => updateFormData({ competitor1: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Τιμή Ανταγωνιστή 2 (€/κιλό)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.competitor2 || ''}
                onChange={(e) => updateFormData({ competitor2: parseFloat(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisTab;
