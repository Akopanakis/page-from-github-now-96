
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, Info, RotateCcw } from 'lucide-react';

interface ResultsSectionProps {
  results: any;
  formData: any;
  isCalculating: boolean;
  onCalculate: () => Promise<void>;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, formData, isCalculating, onCalculate, onReset }) => {
  const getRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    if (results.profitMargin < 15) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        text: 'Το περιθώριο κέρδους είναι χαμηλό. Εξετάστε μείωση κόστους ή αύξηση τιμής.'
      });
    } else if (results.profitMargin > 40) {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        text: 'Εξαιρετικό περιθώριο κέρδους! Η τιμολόγησή σας είναι ανταγωνιστική.'
      });
    } else {
      recommendations.push({
        type: 'info',
        icon: Info,
        text: 'Καλό περιθώριο κέρδους. Η τιμολόγησή σας είναι ισορροπημένη.'
      });
    }

    if (results.totalCost > results.purchaseCost * 2) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        text: 'Τα λειτουργικά κόστη είναι υψηλά σε σχέση με το κόστος αγοράς.'
      });
    }

    return recommendations;
  };

  if (!results) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
              <Calculator className="w-6 h-6" />
              <span>Κοστολόγηση Προϊόντος</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-6">Συμπληρώστε τα στοιχεία και πατήστε υπολογισμό για να δείτε τα αποτελέσματα</p>
            <Button onClick={onCalculate} disabled={isCalculating} className="w-full max-w-xs">
              {isCalculating ? 'Υπολογισμός...' : 'Υπολογισμός Κόστους'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-2xl">
              <Calculator className="w-6 h-6" />
              <span>Αποτελέσματα Κοστολόγησης</span>
            </div>
            <div className="flex space-x-2">
              <Button onClick={onCalculate} disabled={isCalculating} size="sm">
                {isCalculating ? 'Υπολογισμός...' : 'Επανυπολογισμός'}
              </Button>
              <Button onClick={onReset} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Επαναφορά
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center border-l-4 border-l-blue-600">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                Συνολικό Κόστος
              </div>
              <div className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-2">
                <Calculator className="w-6 h-6" />
                <span>{results.totalCost.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center border-l-4 border-l-green-600">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                Τιμή Πώλησης
              </div>
              <div className="text-3xl font-bold text-slate-900 flex items-center justify-center space-x-2">
                <TrendingUp className="w-6 h-6" />
                <span>{results.sellingPrice.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center border-l-4 border-l-purple-600">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                Κέρδος/Κιλό
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {results.profitPerKg.toFixed(2)}€
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center border-l-4 border-l-orange-600">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
                Περιθώριο %
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {results.profitMargin.toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Ανάλυση Κόστους</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Κόστος Αγοράς</span>
              <span className="font-bold text-slate-900">{results.purchaseCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Κόστος Εργασίας</span>
              <span className="font-bold text-slate-900">{results.laborCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Κόστος Συσκευασίας</span>
              <span className="font-bold text-slate-900">{results.packagingCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Κόστος Μεταφοράς</span>
              <span className="font-bold text-slate-900">{results.transportCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Επιπλέον Κόστη</span>
              <span className="font-bold text-slate-900">{results.additionalCosts.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg border-l-4 border-l-blue-600">
              <span className="font-medium text-slate-600">Καθαρό Βάρος</span>
              <span className="font-bold text-slate-900">{results.netWeight.toFixed(2)} κιλά</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Συστάσεις</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              const bgColor = rec.type === 'success' ? 'bg-green-50 border-green-200 text-green-700 border-l-green-600' :
                             rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 border-l-yellow-600' :
                             'bg-blue-50 border-blue-200 text-blue-700 border-l-blue-600';
              
              return (
                <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg border border-l-4 ${bgColor}`}>
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{rec.text}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Comparison */}
      {(formData.competitor1 || formData.competitor2) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Σύγκριση με Ανταγωνισμό</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h5 className="text-sm font-semibold text-blue-600 mb-2">Η Τιμή Μας</h5>
                <div className="text-2xl font-bold text-slate-900">{results.sellingPrice.toFixed(2)}€</div>
              </div>
              
              {formData.competitor1 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">Ανταγωνιστής 1</h5>
                  <div className="text-2xl font-bold text-slate-900">{formData.competitor1.toFixed(2)}€</div>
                  <div className="text-sm font-semibold mt-1">
                    {formData.competitor1 > results.sellingPrice ? (
                      <span className="text-green-600">-{(formData.competitor1 - results.sellingPrice).toFixed(2)}€</span>
                    ) : (
                      <span className="text-red-600">+{(results.sellingPrice - formData.competitor1).toFixed(2)}€</span>
                    )}
                  </div>
                </div>
              )}
              
              {formData.competitor2 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">Ανταγωνιστής 2</h5>
                  <div className="text-2xl font-bold text-slate-900">{formData.competitor2.toFixed(2)}€</div>
                  <div className="text-sm font-semibold mt-1">
                    {formData.competitor2 > results.sellingPrice ? (
                      <span className="text-green-600">-{(formData.competitor2 - results.sellingPrice).toFixed(2)}€</span>
                    ) : (
                      <span className="text-red-600">+{(results.sellingPrice - formData.competitor2).toFixed(2)}€</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsSection;
