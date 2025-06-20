
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, AlertCircle } from 'lucide-react';

interface IntelligentPricingProps {
  results: any;
  formData: any;
}

const IntelligentPricing: React.FC<IntelligentPricingProps> = ({ results, formData }) => {
  const calculateIntelligentPricing = () => {
    if (!results) return [];

    const costPerKg = results.totalCost / results.netWeight;
    const recommendations = [];

    // Conservative pricing (15-20% margin)
    const conservativeMargin = 17.5;
    const conservativePrice = costPerKg * (1 + conservativeMargin / 100);
    recommendations.push({
      type: 'conservative',
      margin: conservativeMargin,
      price: conservativePrice,
      description: 'Ασφαλής τιμή με χαμηλό ρίσκο',
      icon: '🛡️',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    });

    // Market competitive (22-28% margin)
    const competitiveMargin = 25;
    const competitivePrice = costPerKg * (1 + competitiveMargin / 100);
    recommendations.push({
      type: 'competitive',
      margin: competitiveMargin,
      price: competitivePrice,
      description: 'Ανταγωνιστική τιμή αγοράς',
      icon: '⚖️',
      color: 'bg-green-50 border-green-200 text-green-700'
    });

    // Premium pricing (30-40% margin)
    const premiumMargin = 35;
    const premiumPrice = costPerKg * (1 + premiumMargin / 100);
    recommendations.push({
      type: 'premium',
      margin: premiumMargin,
      price: premiumPrice,
      description: 'Τιμή για premium αγορά',
      icon: '⭐',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    });

    return recommendations;
  };

  const recommendations = calculateIntelligentPricing();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>Έξυπνες Προτάσεις Τιμολόγησης</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg border ${rec.color}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{rec.icon}</span>
                <Badge variant="secondary">{rec.margin}%</Badge>
              </div>
              <div className="text-2xl font-bold mb-2">
                {rec.price.toFixed(2)}€/κιλό
              </div>
              <p className="text-sm font-medium">{rec.description}</p>
              <div className="mt-3 text-xs">
                Κέρδος: {(rec.price - (results?.totalCost / results?.netWeight || 0)).toFixed(2)}€/κιλό
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Προτεινόμενη Τιμή</h4>
              <p className="text-amber-700 text-sm">
                Βάσει των δεδομένων σας, προτείνουμε τιμή <strong>{recommendations[1]?.price.toFixed(2)}€/κιλό</strong> 
                που εξασφαλίζει ανταγωνιστικότητα και κερδοφορία.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentPricing;
