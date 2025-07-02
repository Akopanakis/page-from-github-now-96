import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { CostCalculation } from "@/types/expense";

interface CostCalculatorProps {
  onCalculate?: (calculation: CostCalculation) => void;
}

export default function CostCalculator({ onCalculate }: CostCalculatorProps) {
  const [fuelCost, setFuelCost] = useState<number>(0);
  const [laborCost, setLaborCost] = useState<number>(0);
  const [result, setResult] = useState<CostCalculation | null>(null);

  const handleCalculate = () => {
    const totalCost = fuelCost + laborCost;
    const calculation: CostCalculation = {
      fuelCost,
      laborCost,
      totalCost,
    };

    setResult(calculation);

    if (onCalculate) {
      onCalculate(calculation);
    }
  };

  const handleReset = () => {
    setFuelCost(0);
    setLaborCost(0);
    setResult(null);
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Υπολογιστής Κόστους
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fuelCost">Κόστος Καυσίμων (€)</Label>
            <Input
              id="fuelCost"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={fuelCost || ""}
              onChange={(e) => setFuelCost(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="laborCost">Κόστος Εργασίας (€)</Label>
            <Input
              id="laborCost"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={laborCost || ""}
              onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleCalculate}
            className="bg-primary hover:bg-primary/90"
          >
            Υπολόγισε
          </Button>
          <Button onClick={handleReset} variant="outline">
            Επαναφορά
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Αποτελέσματα Υπολογισμού</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Κόστος Καυσίμων:</span>
                <span className="font-medium">
                  €{result.fuelCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Κόστος Εργασίας:</span>
                <span className="font-medium">
                  €{result.laborCost.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Συνολικό Κόστος:</span>
                  <span className="text-primary">
                    €{result.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
