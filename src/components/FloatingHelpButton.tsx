
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Book, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FloatingHelpButtonProps {
  onShowGuide: () => void;
}

const FloatingHelpButton: React.FC<FloatingHelpButtonProps> = ({
  onShowGuide,
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const helpOptions = [
    {
      icon: Book,
      label: language === "el" ? "Οδηγός Χρήσης" : "User Guide",
      description: language === "el" ? "Πλήρης οδηγός εφαρμογής" : "Complete application guide",
      onClick: () => {
        onShowGuide();
        setIsExpanded(false);
      },
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: MessageCircle,
      label: language === "el" ? "Συχνές Ερωτήσεις" : "FAQ",
      description: language === "el" ? "Απαντήσεις σε κοινές ερωτήσεις" : "Answers to common questions",
      onClick: () => {
        const faqContent = language === "el" ? `
🔷 ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ - KostoPro

❓ Πώς υπολογίζω το κόστος ανά κιλό;
✅ Εισάγετε τα βασικά στοιχεία (τιμή αγοράς, ποσότητα, απώλειες) και πατήστε "Υπολογισμός"

❓ Τι είναι οι απώλειες επεξεργασίας;
✅ Είναι το ποσοστό βάρους που χάνεται κατά την επεξεργασία (π.χ. καθάρισμα ψαριού)

❓ Πώς προσθέτω εργατικό κόστος;
✅ Στην καρτέλα "Κόστη" μπορείτε να προσθέσετε εργάτες με ωριαίο μισθό

❓ Τι είναι το glazing;
✅ Είναι το πάγωμα που προστίθεται σε κατεψυγμένα προϊόντα (συνήθως 10-20%)

❓ Πώς εξάγω αναφορά PDF;
✅ Μετά τον υπολογισμό, χρησιμοποιήστε το κουμπί "Εξαγωγή PDF" στα δεξιά

❓ Μπορώ να αποθηκεύσω τα δεδομένα μου;
✅ Ναι, χρησιμοποιήστε "Εξαγωγή Δεδομένων" για αποθήκευση σε Excel

❓ Τι είναι η Premium έκδοση;
✅ Περιλαμβάνει προχωρημένες αναλύσεις, batch management και περισσότερα εργαλεία
        ` : `
🔷 FREQUENTLY ASKED QUESTIONS - KostoPro

❓ How do I calculate cost per kg?
✅ Enter basic data (purchase price, quantity, waste) and click "Calculate"

❓ What are processing losses?
✅ The percentage of weight lost during processing (e.g. fish cleaning)

❓ How do I add labor costs?
✅ In the "Costs" tab you can add workers with hourly rates

❓ What is glazing?
✅ Ice coating added to frozen products (usually 10-20%)

❓ How do I export a PDF report?
✅ After calculation, use the "Export PDF" button on the right

❓ Can I save my data?
✅ Yes, use "Export Data" to save to Excel

❓ What is the Premium version?
✅ Includes advanced analytics, batch management and more tools
        `;
        
        alert(faqContent);
        setIsExpanded(false);
      },
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Phone,
      label: language === "el" ? "Επικοινωνία" : "Contact",
      description: language === "el" ? "Βοήθεια και υποστήριξη" : "Help and support",
      onClick: () => {
        const contactInfo = language === "el" ? 
          "📞 Επικοινωνία - KostoPro\n\n📧 Email: support@kostopro.gr\n📱 Τηλ: +30 210 1234567\n🌐 Web: www.kostopro.gr\n\n⏰ Ώρες Υποστήριξης:\nΔευτέρα - Παρασκευή: 09:00 - 17:00" :
          "📞 Contact - KostoPro\n\n📧 Email: support@kostopro.com\n📱 Phone: +30 210 1234567\n🌐 Web: www.kostopro.com\n\n⏰ Support Hours:\nMonday - Friday: 09:00 - 17:00";
        
        alert(contactInfo);
        setIsExpanded(false);
      },
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Options */}
      {isExpanded && (
        <div className="mb-3 space-y-2 animate-in slide-in-from-bottom duration-300">
          {helpOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="flex items-center gap-3 group">
                <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {option.description}
                  </div>
                </div>
                <Button
                  onClick={option.onClick}
                  size="sm"
                  className={`${option.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 w-12 h-12 rounded-full p-0`}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Help Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="lg"
        className={`w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isExpanded
            ? "bg-red-500 hover:bg-red-600 rotate-180"
            : "bg-indigo-500 hover:bg-indigo-600 hover:scale-110"
        } text-white border-4 border-white dark:border-gray-800`}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <HelpCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Pulse animation when not expanded */}
      {!isExpanded && (
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-indigo-400 animate-ping opacity-20"></div>
      )}
    </div>
  );
};

export default FloatingHelpButton;
