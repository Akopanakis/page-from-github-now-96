
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fish, Waves, Thermometer, Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SeafoodProcessingFeatures: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: <Fish className="w-6 h-6" />,
      title: language === 'el' ? 'Επεξεργασία Ψαριών' : 'Fish Processing',
      description: language === 'el' ? 'Ολοκληρωμένη διαχείριση επεξεργασίας θαλασσινών' : 'Complete seafood processing management'
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: language === 'el' ? 'Έλεγχος Θερμοκρασίας' : 'Temperature Control',
      description: language === 'el' ? 'Παρακολούθηση ψυκτικής αλυσίδας' : 'Cold chain monitoring'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: language === 'el' ? 'Ζύγιση & Συσκευασία' : 'Weighing & Packaging',
      description: language === 'el' ? 'Ακριβής ζύγιση και συσκευασία προϊόντων' : 'Precise weighing and product packaging'
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: language === 'el' ? 'Ποιοτικός Έλεγχος' : 'Quality Control',
      description: language === 'el' ? 'Έλεγχος φρεσκάδας και ποιότητας' : 'Freshness and quality control'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fish className="w-5 h-5" />
          {language === 'el' ? 'Χαρακτηριστικά Επεξεργασίας Θαλασσινών' : 'Seafood Processing Features'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-blue-600">
                  {feature.icon}
                </div>
                <h4 className="font-medium">{feature.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeafoodProcessingFeatures;
