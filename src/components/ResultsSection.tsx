import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, Download, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Results } from '../hooks/useCalculation';
import { toast } from 'sonner';

interface ResultsSectionProps {
  results: Results;
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const { t } = useLanguage();

  const handleSave = () => {
    const batch = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      results,
      timestamp: Date.now(),
    };

    const existingBatches = JSON.parse(localStorage.getItem('batches') || '[]');
    existingBatches.push(batch);
    localStorage.setItem('batches', JSON.stringify(existingBatches));
    
    toast.success(t('message.calculationSaved'));
  };

  const handleExport = () => {
    // Simple CSV export
    const csvContent = `
Final Weight,${results.finalWeight}
Total Cost,${results.totalCost}
Cost per kg,${results.costPerKg}
Selling Price,${results.sellingPrice}
Profit,${results.profit}
    `.trim();

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {t('results.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium">{t('results.finalWeight')}</span>
            <Badge variant="secondary">{results.finalWeight.toFixed(2)} kg</Badge>
          </div>

          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium">{t('results.totalCost')}</span>
            <Badge variant="secondary">€{results.totalCost.toFixed(2)}</Badge>
          </div>

          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium">{t('results.costPerKg')}</span>
            <Badge variant="secondary">€{results.costPerKg.toFixed(2)}/kg</Badge>
          </div>

          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="font-medium">{t('results.sellingPrice')}</span>
            <Badge variant="default" className="bg-green-600">€{results.sellingPrice.toFixed(2)}</Badge>
          </div>

          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="font-medium">{t('results.profit')}</span>
            <Badge variant="default" className="bg-blue-600">€{results.profit.toFixed(2)}</Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSave} variant="outline" className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            {t('common.save')}
          </Button>
          <Button onClick={handleExport} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            {t('common.export')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}