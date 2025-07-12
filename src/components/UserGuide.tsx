
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Calculator, FileText, Settings, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserGuide: React.FC<UserGuideProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const guideContent = {
    el: {
      title: "Οδηγός Χρήσης - KostoPro",
      sections: [
        {
          id: "basics",
          title: "Βασικά Βήματα",
          icon: Calculator,
          content: [
            "1. Εισάγετε τα βασικά στοιχεία του προϊόντος (όνομα, τύπος, βάρος)",
            "2. Προσθέστε την τιμή αγοράς και την ποσότητα",
            "3. Ορίστε τις απώλειες επεξεργασίας (αν υπάρχουν)",
            "4. Πατήστε 'Υπολογισμός' για να δείτε τα αποτελέσματα"
          ]
        },
        {
          id: "costs",
          title: "Διαχείριση Κοστών",
          icon: FileText,
          content: [
            "• Προσθέστε άμεσα κόστη (πρώτες ύλες, εργατικά)",
            "• Ορίστε έμμεσα κόστη (γενικά έξοδα, αποσβέσεις)",
            "• Υπολογίστε κόστη μεταφοράς",
            "• Παρακολουθήστε το εργατικό κόστος"
          ]
        },
        {
          id: "reports",
          title: "Αναφορές και Εξαγωγή",
          icon: Settings,
          content: [
            "• Εξάγετε αναφορές σε PDF ή Excel",
            "• Εκτυπώστε τα αποτελέσματα",
            "• Αποστείλετε αναφορές μέσω email",
            "• Αποθηκεύστε τα δεδομένα σας"
          ]
        }
      ]
    },
    en: {
      title: "User Guide - KostoPro",
      sections: [
        {
          id: "basics",
          title: "Basic Steps",
          icon: Calculator,
          content: [
            "1. Enter basic product information (name, type, weight)",
            "2. Add purchase price and quantity",
            "3. Set processing losses (if any)",
            "4. Click 'Calculate' to see results"
          ]
        },
        {
          id: "costs",
          title: "Cost Management",
          icon: FileText,
          content: [
            "• Add direct costs (materials, labor)",
            "• Set indirect costs (overhead, depreciation)",
            "• Calculate transport costs",
            "• Track labor costs"
          ]
        },
        {
          id: "reports",
          title: "Reports and Export",
          icon: Settings,
          content: [
            "• Export reports to PDF or Excel",
            "• Print results",
            "• Send reports via email",
            "• Save your data"
          ]
        }
      ]
    }
  };

  const content = guideContent[language as keyof typeof guideContent];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Book className="w-5 h-5" />
            <span>{content.title}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {content.sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {content.sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.content.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <HelpCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserGuide;
