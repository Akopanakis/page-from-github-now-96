import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Crown, Zap, TrendingUp, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function PremiumPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: language === 'gr' ? 'What-if Προσομοίωση' : 'What-if Simulation',
      description: language === 'gr' 
        ? 'Δοκιμάστε διαφορετικά σενάρια με sliders για τιμή, απώλεια και γλάσο'
        : 'Test different scenarios with sliders for price, loss, and glazing',
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: language === 'gr' ? 'ML Πρόβλεψη Κόστους' : 'ML Cost Prediction',
      description: language === 'gr'
        ? 'Χρήση τεχνητής νοημοσύνης για πρόβλεψη μελλοντικών κοστών'
        : 'Use artificial intelligence to predict future costs',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: language === 'gr' ? 'Προχωρημένη Ανάλυση' : 'Advanced Analytics',
      description: language === 'gr'
        ? 'Λεπτομερής ανάλυση κόστους και τάσεων αγοράς'
        : 'Detailed cost analysis and market trends',
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'gr' ? 'Πίσω' : 'Back'}
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          Premium {language === 'gr' ? 'Χαρακτηριστικά' : 'Features'}
        </h1>
      </div>

      <div className="text-center py-8">
        <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
          {language === 'gr' ? 'Σύντομα Διαθέσιμο' : 'Coming Soon'}
        </Badge>
        <p className="text-muted-foreground text-lg">
          {language === 'gr'
            ? 'Ξεκλειδώστε προχωρημένες δυνατότητες για επαγγελματική χρήση'
            : 'Unlock advanced features for professional use'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-2 text-primary">
                {feature.icon}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'gr' ? 'Ενδιαφέρεστε;' : 'Interested?'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {language === 'gr'
              ? 'Εγγραφείτε για να ενημερωθείτε όταν τα premium χαρακτηριστικά γίνουν διαθέσιμα'
              : 'Sign up to be notified when premium features become available'}
          </p>
          <Button size="lg" disabled>
            {language === 'gr' ? 'Ενημερώστε με' : 'Notify Me'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}