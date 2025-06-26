
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, AlertTriangle, CheckCircle, Info, RotateCcw, Crown, Target, Zap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { costThresholds } from '@/config/costThresholds';
import { toast } from '@/components/ui/sonner';

interface ResultsSectionProps {
  results: any;
  formData: any;
  isCalculating: boolean;
  isPremium?: boolean;
  onCalculate: () => Promise<void>;
  onReset: () => void;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  results, 
  formData, 
  isCalculating, 
  isPremium = false,
  onCalculate, 
  onReset 
}) => {
  const { language } = useLanguage();
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);
  const [isInsightsOpen, setIsInsightsOpen] = useState(true);

  useEffect(() => {
    if (!results) return;
    Object.entries(costThresholds).forEach(([key, threshold]) => {
      const value = (results as any)[key];
      if (typeof value === 'number' && value > threshold.maxAllowed) {
        toast.warning(
          `${threshold.label} ${language === 'el' ? 'υπερβαίνει το όριο' : 'exceeds limit'} (${threshold.maxAllowed}€)`
        );
      }
    });
  }, [results, language]);

  const getRecommendations = () => {
    if (!results) return [];
    
    const recommendations = [];
    
    if (results.profitMargin < 15) {
      recommendations.push({
        type: 'critical',
        icon: AlertTriangle,
        title: language === 'el' ? 'Χαμηλό Περιθώριο' : 'Low Margin',
        text: language === 'el' 
          ? 'Το περιθώριο κέρδους είναι χαμηλό. Εξετάστε μείωση κόστους ή αύξηση τιμής.'
          : 'Low profit margin. Consider cost reduction or price increase.'
      });
    } else if (results.profitMargin > 40) {
      recommendations.push({
        type: 'success',
        icon: CheckCircle,
        title: language === 'el' ? 'Εξαιρετικό Περιθώριο' : 'Excellent Margin',
        text: language === 'el'
          ? 'Εξαιρετικό περιθώριο κέρδους! Η τιμολόγησή σας είναι ανταγωνιστική.'
          : 'Excellent profit margin! Your pricing is competitive.'
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: Info,
        title: language === 'el' ? 'Καλό Περιθώριο' : 'Good Margin',
        text: language === 'el'
          ? 'Καλό περιθώριο κέρδους. Η τιμολόγησή σας είναι ισορροπημένη.'
          : 'Good profit margin. Your pricing is balanced.'
      });
    }

    if (results.totalCost > results.purchaseCost * 2) {
      recommendations.push({
        type: 'warning',
        icon: AlertTriangle,
        title: language === 'el' ? 'Υψηλά Λειτουργικά Κόστη' : 'High Operating Costs',
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
          title: language === 'el' ? 'Ακριβή Τιμολόγηση' : 'Expensive Pricing',
          text: language === 'el'
            ? 'Η τιμή σας είναι υψηλότερη από τον ανταγωνισμό. Εξετάστε βελτιστοποίηση κόστους.'
            : 'Your price is higher than competitors. Consider cost optimization.'
        });
      } else if (results.competitorAnalysis.marketPosition === 'cheap') {
        recommendations.push({
          type: 'success',
          icon: Award,
          title: language === 'el' ? 'Ανταγωνιστική Τιμολόγηση' : 'Competitive Pricing',
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

  // Prepare chart data
  const costBreakdownData = [
    { name: language === 'el' ? 'Αγορά' : 'Purchase', value: results.purchaseCost, color: COLORS[0] },
    { name: language === 'el' ? 'Εργασία' : 'Labor', value: results.laborCost, color: COLORS[1] },
    { name: language === 'el' ? 'Συσκευασία' : 'Packaging', value: results.packagingCost, color: COLORS[2] },
    { name: language === 'el' ? 'Μεταφορά' : 'Transport', value: results.transportCost, color: COLORS[3] },
    { name: language === 'el' ? 'Λοιπά' : 'Other', value: results.additionalCosts, color: COLORS[4] }
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Main Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Cost Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg" style={{ borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-800 mb-1" style={{ fontWeight: 700 }}>
              €{results.totalCost.toFixed(2)}
            </div>
            <div className="text-sm text-blue-600" style={{ fontWeight: 400 }}>
              {language === 'el' ? 'Συνολικό Κόστος' : 'Total Cost'}
            </div>
          </CardContent>
        </Card>

        {/* Selling Price Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg" style={{ borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-800 mb-1" style={{ fontWeight: 700 }}>
              €{results.sellingPrice.toFixed(2)}
            </div>
            <div className="text-sm text-green-600" style={{ fontWeight: 400 }}>
              {language === 'el' ? 'Τιμή Πώλησης' : 'Selling Price'}
            </div>
          </CardContent>
        </Card>

        {/* Profit Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg" style={{ borderRadius: '8px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-800 mb-1" style={{ fontWeight: 700 }}>
              {results.profitMargin.toFixed(1)}%
            </div>
            <div className="text-sm text-purple-600" style={{ fontWeight: 400 }}>
              {language === 'el' ? 'Περιθώριο Κέρδους' : 'Profit Margin'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 justify-center mb-6">
        <Button 
          onClick={onCalculate} 
          disabled={isCalculating} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          {isCalculating 
            ? (language === 'el' ? 'Υπολογισμός...' : 'Calculating...') 
            : (language === 'el' ? 'Επανυπολογισμός' : 'Recalculate')
          }
        </Button>
        <Button 
          onClick={onReset} 
          variant="outline"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {language === 'el' ? 'Επαναφορά' : 'Reset'}
        </Button>
      </div>

      {/* Premium Results */}
      {isPremium && results.finalProcessedWeight && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-6" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
              €{results.recommendedSellingPrice?.toFixed(2) || '0.00'}
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

      {/* Collapsible Cost Analysis */}
      <Collapsible open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
        <Card className="shadow-lg border-0" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white cursor-pointer hover:from-slate-700 hover:to-slate-800 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>{language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Analysis'}</span>
                </div>
                {isAnalysisOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6">
              <Tabs defaultValue="breakdown" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="breakdown">{language === 'el' ? 'Κατανομή' : 'Breakdown'}</TabsTrigger>
                  <TabsTrigger value="chart">{language === 'el' ? 'Γράφημα' : 'Chart'}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="breakdown" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Κόστος Αγοράς' : 'Purchase Cost'}
                      </span>
                      <span className="font-bold text-slate-900">€{results.purchaseCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Κόστος Εργασίας' : 'Labor Cost'}
                      </span>
                      <span className="font-bold text-slate-900">€{results.laborCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Κόστος Συσκευασίας' : 'Packaging Cost'}
                      </span>
                      <span className="font-bold text-slate-900">€{results.packagingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Κόστος Μεταφοράς' : 'Transport Cost'}
                      </span>
                      <span className="font-bold text-slate-900">€{results.transportCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Επιπλέον Κόστη' : 'Additional Costs'}
                      </span>
                      <span className="font-bold text-slate-900">€{results.additionalCosts.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="font-medium text-slate-600">
                        {language === 'el' ? 'Καθαρό Βάρος' : 'Net Weight'}
                      </span>
                      <span className="font-bold text-slate-900">{results.netWeight.toFixed(2)} {language === 'el' ? 'κιλά' : 'kg'}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="chart" className="mt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costBreakdownData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {costBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Collapsible Insights Section */}
      <Collapsible open={isInsightsOpen} onOpenChange={setIsInsightsOpen}>
        <Card className="shadow-lg border-0" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer hover:from-emerald-700 hover:to-teal-700 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{language === 'el' ? 'Συστάσεις & Insights' : 'Recommendations & Insights'}</span>
                  {isPremium && <Zap className="w-4 h-4 ml-2" />}
                </div>
                {isInsightsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => {
                  const IconComponent = rec.icon;
                  const cardClass = rec.type === 'success' ? 'bg-green-50 border-green-200' :
                                   rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                                   rec.type === 'critical' ? 'bg-red-50 border-red-200' :
                                   'bg-blue-50 border-blue-200';
                  const iconClass = rec.type === 'success' ? 'text-green-600' :
                                   rec.type === 'warning' ? 'text-yellow-600' :
                                   rec.type === 'critical' ? 'text-red-600' :
                                   'text-blue-600';
                  
                  return (
                    <Card key={index} className={`${cardClass} border`} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                            <p className="text-sm text-gray-700">{rec.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Competitor Comparison */}
      {(formData.competitor1 || formData.competitor2) && (
        <Card className="shadow-lg border-0" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
                <div className="text-2xl font-bold text-slate-900">€{results.sellingPrice.toFixed(2)}</div>
              </div>
              
              {formData.competitor1 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">
                    {language === 'el' ? 'Ανταγωνιστής 1' : 'Competitor 1'}
                  </h5>
                  <div className="text-2xl font-bold text-slate-900">€{formData.competitor1.toFixed(2)}</div>
                  <div className="text-sm font-semibold mt-1">
                    {formData.competitor1 > results.sellingPrice ? (
                      <span className="text-green-600">-€{(formData.competitor1 - results.sellingPrice).toFixed(2)}</span>
                    ) : (
                      <span className="text-red-600">+€{(results.sellingPrice - formData.competitor1).toFixed(2)}</span>
                    )}
                  </div>
                </div>
              )}
              
              {formData.competitor2 && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">
                    {language === 'el' ? 'Ανταγωνιστής 2' : 'Competitor 2'}
                  </h5>
                  <div className="text-2xl font-bold text-slate-900">€{formData.competitor2.toFixed(2)}</div>
                  <div className="text-sm font-semibold mt-1">
                    {formData.competitor2 > results.sellingPrice ? (
                      <span className="text-green-600">-€{(formData.competitor2 - results.sellingPrice).toFixed(2)}</span>
                    ) : (
                      <span className="text-red-600">+€{(results.sellingPrice - formData.competitor2).toFixed(2)}</span>
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
