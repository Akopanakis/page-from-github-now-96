
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Sparkles, Brain, Users, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PremiumPage: React.FC = () => {
  const { language } = useLanguage();
  const [simulationData, setSimulationData] = useState({
    price: [50],
    waste: [20],
    glazing: [15]
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [teamEmails, setTeamEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');

  // Mock ML prediction
  const getPricePrediction = () => {
    const basePrice = simulationData.price[0];
    const variation = (Math.random() - 0.5) * 10;
    return basePrice + variation;
  };

  // Cost breakdown data
  const costBreakdownData = [
    { name: language === 'el' ? 'Πρώτη Ύλη' : 'Raw Material', value: 40, color: '#3b82f6' },
    { name: language === 'el' ? 'Εργασία' : 'Labor', value: 25, color: '#10b981' },
    { name: language === 'el' ? 'Συσκευασία' : 'Packaging', value: 15, color: '#f59e0b' },
    { name: language === 'el' ? 'Μεταφορά' : 'Transport', value: 10, color: '#ef4444' },
    { name: language === 'el' ? 'Λοιπά' : 'Other', value: 10, color: '#8b5cf6' }
  ];

  const addTeamMember = () => {
    if (newEmail && !teamEmails.includes(newEmail)) {
      setTeamEmails([...teamEmails, newEmail]);
      setNewEmail('');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">
                {language === 'el' ? 'KostoPro Premium' : 'KostoPro Premium'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'el' ? 'Προηγμένες δυνατότητες κοστολόγησης' : 'Advanced costing features'}
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsDarkMode(!isDarkMode)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </Button>
        </div>

        <Tabs defaultValue="simulation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="simulation">
              {language === 'el' ? 'Προσομοίωση' : 'Simulation'}
            </TabsTrigger>
            <TabsTrigger value="ml">
              {language === 'el' ? 'AI Πρόβλεψη' : 'AI Prediction'}
            </TabsTrigger>
            <TabsTrigger value="breakdown">
              {language === 'el' ? 'Ανάλυση' : 'Breakdown'}
            </TabsTrigger>
            <TabsTrigger value="team">
              {language === 'el' ? 'Ομάδα' : 'Team'}
            </TabsTrigger>
          </TabsList>

          {/* What-if Simulation */}
          <TabsContent value="simulation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>{language === 'el' ? 'What-if Προσομοίωση' : 'What-if Simulation'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'el' ? 'Τιμή Αγοράς: €' : 'Purchase Price: €'}{simulationData.price[0]}
                    </label>
                    <Slider
                      value={simulationData.price}
                      onValueChange={(value) => setSimulationData(prev => ({ ...prev, price: value }))}
                      max={100}
                      min={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'el' ? 'Απώλεια: ' : 'Waste: '}{simulationData.waste[0]}%
                    </label>
                    <Slider
                      value={simulationData.waste}
                      onValueChange={(value) => setSimulationData(prev => ({ ...prev, waste: value }))}
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {language === 'el' ? 'Γλάσο: ' : 'Glazing: '}{simulationData.glazing[0]}%
                    </label>
                    <Slider
                      value={simulationData.glazing}
                      onValueChange={(value) => setSimulationData(prev => ({ ...prev, glazing: value }))}
                      max={30}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    {language === 'el' ? 'Προβλεπόμενα Αποτελέσματα' : 'Predicted Results'}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'el' ? 'Τελικό Κόστος' : 'Final Cost'}
                      </span>
                      <p className="text-xl font-bold text-blue-600">
                        €{(simulationData.price[0] * 1.2).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'el' ? 'Προτεινόμενη Τιμή' : 'Suggested Price'}
                      </span>
                      <p className="text-xl font-bold text-green-600">
                        €{(simulationData.price[0] * 1.5).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ML Prediction */}
          <TabsContent value="ml" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span>{language === 'el' ? 'AI Πρόβλεψη Τιμών' : 'AI Price Prediction'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">
                    {language === 'el' ? 'Μοντέλο Μηχανικής Μάθησης' : 'Machine Learning Model'}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {language === 'el' 
                      ? 'Βασισμένο σε ιστορικά δεδομένα και τάσεις αγοράς'
                      : 'Based on historical data and market trends'
                    }
                  </p>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      €{getPricePrediction().toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {language === 'el' ? 'Προβλεπόμενη τιμή για την επόμενη εβδομάδα' : 'Predicted price for next week'}
                    </p>
                  </div>
                  
                  <Badge className="mt-4" variant="secondary">
                    {language === 'el' ? 'Ακρίβεια: 87%' : 'Accuracy: 87%'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cost Breakdown */}
          <TabsContent value="breakdown" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'el' ? 'Ανάλυση Κόστους' : 'Cost Breakdown'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Collaboration */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>{language === 'el' ? 'Συνεργασία Ομάδας' : 'Team Collaboration'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder={language === 'el' ? 'Email μέλους ομάδας' : 'Team member email'}
                    className="flex-1 px-3 py-2 border rounded-md"
                  />
                  <Button onClick={addTeamMember}>
                    {language === 'el' ? 'Προσθήκη' : 'Add'}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">
                    {language === 'el' ? 'Μέλη Ομάδας' : 'Team Members'}
                  </h4>
                  {teamEmails.map((email, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <span>{email}</span>
                      <Badge variant="outline">
                        {language === 'el' ? 'Ενεργός' : 'Active'}
                      </Badge>
                    </div>
                  ))}
                  {teamEmails.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      {language === 'el' ? 'Δεν έχουν προστεθεί μέλη ομάδας' : 'No team members added'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PremiumPage;
