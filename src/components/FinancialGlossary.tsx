import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, TrendingUp, Calculator, Euro } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TooltipHelper from './TooltipHelper';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  icon: React.ReactNode;
}

const FinancialGlossary: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      term: language === 'el' ? 'Περιθώριο Κέρδους' : 'Profit Margin',
      definition: language === 'el' 
        ? 'Το ποσοστό του κέρδους σε σχέση με τα συνολικά έσοδα. Υπολογίζεται ως: (Κέρδος / Έσοδα) × 100'
        : 'The percentage of profit relative to total revenue. Calculated as: (Profit / Revenue) × 100',
      category: language === 'el' ? 'Κερδοφορία' : 'Profitability',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '2',
      term: language === 'el' ? 'Κόστος Πωληθέντων' : 'Cost of Goods Sold',
      definition: language === 'el' 
        ? 'Το άμεσο κόστος παραγωγής των προϊόντων που πουλήθηκαν, συμπεριλαμβανομένων των πρώτων υλών και της εργασίας.'
        : 'The direct cost of producing goods sold, including raw materials and labor.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '3',
      term: language === 'el' ? 'Σημείο Νεκρής Ζώνης' : 'Break-even Point',
      definition: language === 'el' 
        ? 'Το επίπεδο πωλήσεων στο οποίο τα συνολικά έσοδα ισούνται με τα συνολικά κόστη, δηλαδή δεν υπάρχει κέρδος ή ζημία.'
        : 'The sales level where total revenue equals total costs, meaning no profit or loss.',
      category: language === 'el' ? 'Ανάλυση' : 'Analysis',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '4',
      term: language === 'el' ? 'Μεταβλητό Κόστος' : 'Variable Cost',
      definition: language === 'el' 
        ? 'Κόστη που μεταβάλλονται ανάλογα με τον όγκο παραγωγής, όπως πρώτες ύλες και άμεση εργασία.'
        : 'Costs that change proportionally with production volume, such as raw materials and direct labor.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '5',
      term: language === 'el' ? 'Σταθερό Κόστος' : 'Fixed Cost',
      definition: language === 'el' 
        ? 'Κόστη που παραμένουν σταθερά ανεξάρτητα από τον όγκο παραγωγής, όπως ενοίκια και μισθοί διοίκησης.'
        : 'Costs that remain constant regardless of production volume, such as rent and management salaries.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '6',
      term: 'ROI (Return on Investment)',
      definition: language === 'el' 
        ? 'Η απόδοση επένδυσης, που μετράει την αποδοτικότητα μιας επένδυσης. Υπολογίζεται ως: (Κέρδος - Κόστος Επένδυσης) / Κόστος Επένδυσης × 100'
        : 'Return on investment, measuring investment efficiency. Calculated as: (Profit - Investment Cost) / Investment Cost × 100',
      category: language === 'el' ? 'Κερδοφορία' : 'Profitability',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '7',
      term: language === 'el' ? 'Ταμειακή Ροή' : 'Cash Flow',
      definition: language === 'el' 
        ? 'Η κίνηση χρημάτων που εισέρχονται και εξέρχονται από την επιχείρηση σε μια συγκεκριμένη περίοδο.'
        : 'The movement of money in and out of the business during a specific period.',
      category: language === 'el' ? 'Ανάλυση' : 'Analysis',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '8',
      term: 'EBITDA',
      definition: language === 'el' 
        ? 'Κέρδη πριν από τόκους, φόρους, αποσβέσεις και απομειώσεις. Μετράει την λειτουργική απόδοση της επιχείρησης.'
        : 'Earnings before interest, taxes, depreciation and amortization. Measures operational performance.',
      category: language === 'el' ? 'Κερδοφορία' : 'Profitability',
      icon: <TrendingUp className="w-4 h-4 text-green-600" />
    },
    {
      id: '9',
      term: language === 'el' ? 'Ανάλυση Ευαισθησίας' : 'Sensitivity Analysis',
      definition: language === 'el' 
        ? 'Μέθοδος που εξετάζει πώς αλλάζουν τα αποτελέσματα όταν μεταβάλλονται οι βασικές παράμετροι του μοντέλου.'
        : 'Method examining how results change when key model parameters are modified.',
      category: language === 'el' ? 'Ανάλυση' : 'Analysis',
      icon: <Euro className="w-4 h-4 text-orange-600" />
    },
    {
      id: '10',
      term: language === 'el' ? 'Μέσο Κόστος' : 'Average Cost',
      definition: language === 'el' 
        ? 'Το συνολικό κόστος διαιρεμένο με τον αριθμό των μονάδων παραγωγής. Χρησιμοποιείται για τον υπολογισμό τιμών.'
        : 'Total cost divided by the number of production units. Used for pricing calculations.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '11',
      term: language === 'el' ? 'Άμεσο Κόστος' : 'Direct Cost',
      definition: language === 'el' 
        ? 'Κόστη που μπορούν να αποδοθούν άμεσα σε ένα συγκεκριμένο προϊόν ή υπηρεσία, όπως πρώτες ύλες και άμεση εργασία.'
        : 'Costs that can be directly attributed to a specific product or service, such as raw materials and direct labor.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '12',
      term: language === 'el' ? 'Έμμεσο Κόστος' : 'Indirect Cost',
      definition: language === 'el' 
        ? 'Κόστη που δεν μπορούν να αποδοθούν άμεσα σε ένα συγκεκριμένο προϊόν, όπως ενοίκια και γενικά έξοδα διοίκησης.'
        : 'Costs that cannot be directly attributed to a specific product, such as rent and general administrative expenses.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '13',
      term: language === 'el' ? 'Οριακό Κόστος' : 'Marginal Cost',
      definition: language === 'el' 
        ? 'Το επιπλέον κόστος παραγωγής μιας επιπλέον μονάδας προϊόντος. Σημαντικό για αποφάσεις τιμολόγησης.'
        : 'The additional cost of producing one more unit of product. Important for pricing decisions.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '14',
      term: language === 'el' ? 'Πρότυπο Κόστος' : 'Standard Cost',
      definition: language === 'el' 
        ? 'Προκαθορισμένο κόστος που χρησιμοποιείται ως μέτρο σύγκρισης για την αξιολόγηση της απόδοσης.'
        : 'Predetermined cost used as a benchmark for performance evaluation.',
      category: language === 'el' ? 'Κόστος' : 'Cost',
      icon: <Calculator className="w-4 h-4 text-blue-600" />
    },
    {
      id: '15',
      term: 'ABC Costing',
      definition: language === 'el' 
        ? 'Κοστολόγηση βασισμένη σε δραστηριότητες που κατανέμει το κόστος με βάση τις δραστηριότητες που καταναλώνουν πόρους.'
        : 'Activity-based costing that allocates costs based on activities that consume resources.',
      category: language === 'el' ? 'Μέθοδοι' : 'Methods',
      icon: <BookOpen className="w-4 h-4 text-purple-600" />
    }
  ];

  const categories = language === 'el' 
    ? ['all', 'Κόστος', 'Κερδοφορία', 'Ανάλυση', 'Μέθοδοι']
    : ['all', 'Cost', 'Profitability', 'Analysis', 'Methods'];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header with Tooltip */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">
              {language === 'el' ? 'Οικονομικό Λεξικό' : 'Financial Glossary'}
            </h3>
            <TooltipHelper tooltipKey="tooltip.financial.glossary" />
          </div>
          <p className="text-sm text-blue-700 mt-2">
            {language === 'el' 
              ? 'Βιβλιοθήκη οικονομικών όρων και εννοιών για καλύτερη κατανόηση της κοστολόγησης'
              : 'Library of financial terms and concepts for better understanding of costing'
            }
          </p>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>{language === 'el' ? 'Αναζήτηση Όρων' : 'Search Terms'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder={language === 'el' ? 'Αναζητήστε έναν όρο...' : 'Search for a term...'}
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
                  {category === 'all' 
                    ? (language === 'el' ? 'Όλες οι Κατηγορίες' : 'All Categories') 
                    : category
                  }
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
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              {language === 'el' ? 'Δεν βρέθηκαν όροι' : 'No terms found'}
            </h3>
            <p className="text-slate-500">
              {language === 'el' 
                ? 'Δοκιμάστε διαφορετικούς όρους αναζήτησης ή κατηγορίες.'
                : 'Try different search terms or categories.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialGlossary;
