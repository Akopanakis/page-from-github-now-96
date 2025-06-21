
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, TrendingUp, Calculator, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  icon: React.ReactNode;
}

const FinancialGlossary: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      term: 'Περιθώριο Κέρδους',
      definition: 'Το ποσοστό του κέρδους σε σχέση με τα συνολικά έσοδα. Υπολογίζεται ως: (Κέρδος / Έσοδα) × 100',
      category: 'Κερδοφορία',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '2',
      term: 'Κόστος Πωληθέντων',
      definition: 'Το άμεσο κόστος παραγωγής των προϊόντων που πουλήθηκαν, συμπεριλαμβανομένων των πρώτων υλών και της εργασίας.',
      category: 'Κόστος',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '3',
      term: 'Σημείο Νεκρής Ζώνης',
      definition: 'Το επίπεδο πωλήσεων στο οποίο τα συνολικά έσοδα ισούνται με τα συνολικά κόστη, δηλαδή δεν υπάρχει κέρδος ή ζημία.',
      category: 'Ανάλυση',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '4',
      term: 'Μεταβλητό Κόστος',
      definition: 'Κόστη που μεταβάλλονται ανάλογα με τον όγκο παραγωγής, όπως πρώτες ύλες και άμεση εργασία.',
      category: 'Κόστος',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '5',
      term: 'Σταθερό Κόστος',
      definition: 'Κόστη που παραμένουν σταθερά ανεξάρτητα από τον όγκο παραγωγής, όπως ενοίκια και μισθοί διοίκησης.',
      category: 'Κόστος',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '6',
      term: 'ROI (Return on Investment)',
      definition: 'Η απόδοση επένδυσης, που μετράει την αποδοτικότητα μιας επένδυσης. Υπολογίζεται ως: (Κέρδος - Κόστος Επένδυσης) / Κόστος Επένδυσης × 100',
      category: 'Κερδοφορία',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '7',
      term: 'Ταμειακή Ροή',
      definition: 'Η κίνηση χρημάτων που εισέρχονται και εξέρχονται από την επιχείρηση σε μια συγκεκριμένη περίοδο.',
      category: 'Ανάλυση',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '8',
      term: 'EBITDA',
      definition: 'Κέρδη πριν από τόκους, φόρους, αποσβέσεις και απομειώσεις. Μετράει την λειτουργική απόδοση της επιχείρησης.',
      category: 'Κερδοφορία',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '9',
      term: 'Ανάλυση Ευαισθησίας',
      definition: 'Μέθοδος που εξετάζει πώς αλλάζουν τα αποτελέσματα όταν μεταβάλλονται οι βασικές παράμετροι του μοντέλου.',
      category: 'Ανάλυση',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '10',
      term: 'Μέσο Κόστος',
      definition: 'Το συνολικό κόστος διαιρεμένο με τον αριθμό των μονάδων παραγωγής. Χρησιμοποιείται για τον υπολογισμό τιμών.',
      category: 'Κόστος',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    }
  ];

  const categories = ['all', 'Κόστος', 'Κερδοφορία', 'Ανάλυση'];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Λεξικό Οικονομικών Όρων</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Αναζητήστε έναν όρο..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Όλες οι Κατηγορίες' : category}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map(term => (
          <Card key={term.id} className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {term.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-800">{term.term}</h3>
                    <Badge variant="outline" className="text-xs">
                      {term.category}
                    </Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{term.definition}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <Card className="border-slate-200 shadow-lg">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">Δεν βρέθηκαν όροι</h3>
            <p className="text-slate-500">Δοκιμάστε διαφορετικούς όρους αναζήτησης ή κατηγορίες.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialGlossary;
