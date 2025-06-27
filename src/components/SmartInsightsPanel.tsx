import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { costThresholds } from '@/config/costThresholds';

interface SmartInsightsPanelProps {
  results: any;
  formData: any;
}

const SmartInsightsPanel: React.FC<SmartInsightsPanelProps> = ({ results, formData }) => {
  const [margin, setMargin] = useState(results.profitMargin);

  const adjusted = useMemo(() => {
    const selling = (results.totalCostWithVat * (1 + margin / 100)) / Math.max(results.netWeight, 0.001);
    const profitPerKg = selling - (results.totalCostWithVat / Math.max(results.netWeight, 0.001));
    return { selling, profitPerKg };
  }, [margin, results]);

  const costItems = useMemo(() => {
    return ['purchaseCost', 'laborCost', 'packagingCost', 'transportCost', 'additionalCosts'].map((key) => ({
      key,
      value: results[key],
      threshold: costThresholds[key]
    }));
  }, [results]);

  const outliers = costItems.filter(item => item.value > item.threshold.maxAllowed);

  const summary = useMemo(() => {
    const alerts = outliers.map(o => o.threshold.label).join(', ');
    const alertText = alerts ? ` Alerts: ${alerts}.` : '';
    return `Avg cost €${(results.totalCostWithVat / results.netWeight).toFixed(2)} per kg, selling at €${adjusted.selling.toFixed(2)} with ${margin.toFixed(1)}% margin for profit of €${adjusted.profitPerKg.toFixed(2)} per kg.` + alertText;
  }, [adjusted, margin, outliers, results]);

  return (
    <div className="space-y-4">
      {outliers.map(item => (
        <Alert key={item.key} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{item.threshold.label} above {item.threshold.maxAllowed}€</AlertTitle>
          {item.threshold.tooltip && (
            <AlertDescription>{item.threshold.tooltip}</AlertDescription>
          )}
        </Alert>
      ))}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>Smart Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50 flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600">Avg Cost/kg</div>
                <div className="text-xl font-bold text-blue-800">€{(results.totalCostWithVat / results.netWeight).toFixed(2)}</div>
              </div>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="p-4 border rounded-lg bg-green-50 flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600">Profit/kg</div>
                <div className="text-xl font-bold text-green-800">€{adjusted.profitPerKg.toFixed(2)}</div>
              </div>
              {adjusted.profitPerKg >= results.profitPerKg ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <div className="p-4 border rounded-lg bg-purple-50 flex items-center justify-between">
              <div>
                <div className="text-sm text-purple-600">Cost per Batch</div>
                <div className="text-xl font-bold text-purple-800">€{results.totalCostWithVat.toFixed(2)}</div>
              </div>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="p-4 border rounded-lg bg-amber-50 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-amber-600">Margin</div>
                  <div className="text-xl font-bold text-amber-800">{margin.toFixed(1)}%</div>
                </div>
                {margin >= results.profitAnalysis.recommendedMargin ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <Progress value={margin} />
              <Slider
                value={[margin]}
                min={0}
                max={100}
                step={0.5}
                onValueChange={(val) => setMargin(val[0])}
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700" data-testid="summary">{summary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartInsightsPanel;
