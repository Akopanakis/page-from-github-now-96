import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, Info, RotateCcw, Crown, Target, Zap, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultsSectionProps {
  results: any;
  formData: any;
  isCalculating: boolean;
  isPremium?: boolean;
  onCalculate: () => Promise<void>;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  formData, 
  isCalculating, 
  isPremium = false,
  onCalculate, 
  onReset 
}) => {
  const { language } = useLanguage();

  const getRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    if (results.profitMargin < 15) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        text: language === 'el' 
          ? 'Το περιθώριο κέρδους είναι χαμηλό. Εξετάστε μείωση κόστους ή αύξηση τιμής.'
          : 'Low profit margin. Consider cost reduction or price increase.'
      });
    } else if (results.profitMargin > 40) {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        text: language === 'el'
          ? 'Εξαιρετικό περιθώριο κέρδους! Η τιμολόγησή σας είναι ανταγωνιστική.'
          : 'Excellent profit margin! Your pricing is competitive.'
      });
    } else {
      recommendations.push({
        type: 'info',
        icon: Info,
        text: language === 'el'
          ? 'Καλό περιθώριο κέρδους. Η τιμολόγησή σας είναι ισορροπημένη.'
          : 'Good profit margin. Your pricing is balanced.'
      });
    }

    if (results.totalCost > results.purchaseCost * 2) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        text: language === 'el'
          ? 'Τα λειτουργικά κόστη είναι υψηλά σε σχέση με το κόστος αγοράς.'
          : 'Operating costs are high relative to purchase cost.'
      });
    }

    // Premium recommendations
    if (isPremium && results.competitorAnalysis) {
      if (results.competitorAnalysis.marketPosition === 'expensive') {
        recommendations.push({
          type: 'warning',
          icon: Target,
          text: language === 'el'
            ? 'Η τιμή σας είναι υψηλότερη από τον ανταγωνισμό. Εξετάστε βελτιστοποίηση κόστους.'
            : 'Your price is higher than competitors. Consider cost optimization.'
        });
      } else if (results.competitorAnalysis.marketPosition === 'cheap') {
        recommendations.push({
          type: 'success',
          icon: Award,
          text: language === 'el'
            ? 'Ανταγωνιστική τιμολόγηση! Υπάρχει χώρος για αύξηση περιθωρίου.'
            : 'Competitive pricing! There\'s room for margin increase.'
        });
      }
    }

    return recommendations;
  };

  if (!results) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center justify-center space-x-2 text-xl">
              <Calculator className="w-6 h-6" />
              <span>{language === 'el' ? 'Κοστολόγηση Προϊόντος' : 'Product Costing'}</span>
              {isPremium && <Crown className="w-5 h-5 ml-2" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Calculator className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {language === 'el' 
                  ? 'Συμπληρώστε τα στοιχεία και πατήστε υπολογισμό για να δείτε τα αποτελέσματα'
                  : 'Fill in the details and click calculate to see the results'
                }
              </p>
              <Button 
                onClick={onCalculate} 
                disabled={isCalculating} 
                className="w-full max-w-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3"
              >
                {isCalculating 
                  ? (language === 'el' ? 'Υπολογισμός...' : 'Calculating...') 
                  : (language === 'el' ? 'Υπολογισμός Κόστους' : 'Calculate Cost')
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>{language === 'el' ? 'Αποτελέσματα Κοστολόγησης' : 'Costing Results'}</span>
              {isPremium && <Crown className="w-4 h-4 ml-2" />}
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={onCalculate} 
                disabled={isCalculating} 
                size="sm" 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10"
              >
                {isCalculating 
                  ? (language === 'el' ? 'Υπολογισμός...' : 'Calculating...') 
                  : (language === 'el' ? 'Επανυπολογισμός' : 'Recalculate')
                }
              </Button>
              <Button 
                onClick={onReset} 
                variant="outline" 
                size="sm" 
                className="text-white border-white/30 hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {language === 'el' ? 'Επαναφορά' : 'Reset'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 text-center">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                {language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}
              </div>
              <div className="text-2xl font-bold text-slate-900 flex items-center justify-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>{results.totalCost.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 text-center">
              <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                {language === 'el' ? 'Τιμή Πώλησης' : 'Selling Price'}
              </div>
              <div className="text-2xl font-bold text-slate-900 flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>{results.sellingPrice.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2">
                {language === 'el' ? 'Κέρδος/Κιλό' : 'Profit/Kg'}
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {results.profitPerKg.toFixed(2)}€
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 text-center">
              <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-2">
                {language === 'el' ? 'Περιθώριο %' : 'Margin %'}
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {results.profitMargin.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Premium Results */}
          {isPremium && results.finalProcessedWeight && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-6">
              <div className="text-center">
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                  {language === 'el' ? 'Τελικό Βάρος' : 'Final Weight'}
                </div>
                <div className="text-lg font-bold text-purple-800">
                  {results.finalProcessedWeight.toFixed(2)} kg
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                  {language === 'el' ? 'Συνολική Απώλεια' : 'Total Waste'}
                </div>
                <div className="text-lg font-bold text-red-600">
                  {results.totalWastePercentage?.toFixed(1) || '0'}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                  {language === 'el' ? 'Προτεινόμενη Τιμή' : 'Recommended Price'}
                </div>
                <div className="text-lg font-bold text-green-600">
                  {results.recommendedSellingPrice?.toFixed(2) || '0.00'}€
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                  {language === 'el' ? 'Θέση Αγοράς' : 'Market Position'}
                </div>
                <div className="text-lg font-bold">
                  <Badge 
                    variant={
                      results.competitorAnalysis?.marketPosition === 'competitive' ? 'default' :
                      results.competitorAnalysis?.marketPosition === 'cheap' ? 'secondary' : 'destructive'
                    }
                  >
                    {results.competitorAnalysis?.marketPosition === 'competitive' 
                      ? (language === 'el' ? 'Ανταγωνιστική' : 'Competitive')
                      : results.competitorAnalysis?.marketPosition === 'cheap'
                      ? (language === 'el' ? 'Φθηνή' : 'Cheap')
                      : (language === 'el' ? 'Ακριβή' : 'Expensive')
                    }
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Κόστος Αγοράς' : 'Purchase Cost'}
              </span>
              <span className="font-bold text-slate-900">{results.purchaseCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Κόστος Εργασίας' : 'Labor Cost'}
              </span>
              <span className="font-bold text-slate-900">{results.laborCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Κόστος Συσκευασίας' : 'Packaging Cost'}
              </span>
              <span className="font-bold text-slate-900">{results.packagingCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Κόστος Μεταφοράς' : 'Transport Cost'}
              </span>
              <span className="font-bold text-slate-900">{results.transportCost.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Επιπλέον Κόστη' : 'Additional Costs'}
              </span>
              <span className="font-bold text-slate-900">{results.additionalCosts.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-medium text-slate-600">
                {language === 'el' ? 'Καθαρό Βάρος' : 'Net Weight'}
              </span>
              <span className="font-bold text-slate-900">{results.netWeight.toFixed(2)} {language === 'el' ? 'κιλά' : 'kg'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{language === 'el' ? 'Συστάσεις & Insights' : 'Recommendations & Insights'}</span>
            {isPremium && <Zap className="w-4 h-4 ml-2" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const IconComponent = rec.icon;
              const bgColor = rec.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
                             rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                             'bg-blue-50 border-blue-200 text-blue-700';
              
              return (
                <div key={index} className={`flex items-center space-x-3 p-4 rounded-lg border ${bgColor}`}>
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
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>{language === 'el' ? 'Σύγκριση με Ανταγωνισμό' : 'Competitor Comparison'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h5 className="text-sm font-semibold text-blue-600 mb-2">
                  {language === 'el' ? 'Η Τιμή Μας' : 'Our Price'}
                </h5>
                <div className="text-2xl font-bold text-slate-900">{results.sellingPrice.toFixed(2)}€</div>
              </div>
              
              {formData.competitor1 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">
                    {language === 'el' ? 'Ανταγωνιστής 1' : 'Competitor 1'}
                  </h5>
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
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">
                    {language === 'el' ? 'Ανταγωνιστής 2' : 'Competitor 2'}
                  </h5>
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
