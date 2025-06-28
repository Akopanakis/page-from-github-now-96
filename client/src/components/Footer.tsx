
import React from 'react';
import { Fish } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">KostoPro</h3>
                <p className="text-sm text-gray-600">
                  {language === 'el' ? 'Επαγγελματική Κοστολόγηση' : 'Professional Costing'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === 'el' 
                ? 'Η πλήρης λύση για την κοστολόγηση και τιμολόγηση προϊόντων θαλασσινών. Από την αρχική επεξεργασία μέχρι την τελική πώληση.'
                : 'The complete solution for seafood product costing and pricing. From initial processing to final sale.'
              }
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              {language === 'el' ? 'Χαρακτηριστικά' : 'Features'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{language === 'el' ? 'Υπολογισμός κόστους' : 'Cost calculation'}</li>
              <li>{language === 'el' ? 'Ανάλυση κερδοφορίας' : 'Profitability analysis'}</li>
              <li>{language === 'el' ? 'Διαχείριση παρτίδων' : 'Batch management'}</li>
              <li>{language === 'el' ? 'Εξαγωγή αναφορών' : 'Report export'}</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              {language === 'el' ? 'Υποστήριξη' : 'Support'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{language === 'el' ? 'Οδηγός χρήσης' : 'User guide'}</li>
              <li>{language === 'el' ? 'Βίντεο tutorials' : 'Video tutorials'}</li>
              <li>{language === 'el' ? 'Email υποστήριξη' : 'Email support'}</li>
              <li>{language === 'el' ? 'FAQ' : 'FAQ'}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              {language === 'el' 
                ? 'Σχεδιασμός και Ανάπτυξη από τον Αλέξανδρο Κοπανάκη' 
                : 'Designed and Developed by Alexandros Kopanakis'
              }
            </p>
            <p className="text-xs text-gray-400 mt-2 md:mt-0">
              © 2024 KostoPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
