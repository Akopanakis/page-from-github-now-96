import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Calculator,
  BarChart3,
  Package,
  Users,
  Target,
  Award,
  TrendingUp,
  Factory,
  Lightbulb,
  Video,
  Download,
  Star,
  Clock,
  Zap,
  Shield,
  RefreshCw
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const TutorialPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const tutorialSections = [
    {
      id: 'getting-started',
      title: 'Ξεκινώντας',
      icon: Play,
      description: 'Μάθετε τα βασικά του KostoPro',
      steps: [
        {
          id: 'step-1',
          title: 'Καλώς ήρθατε στο KostoPro',
          content: 'Το KostoPro είναι ένα ολοκληρωμένο σύστημα κοστολόγησης για επιχειρήσεις θαλασσινών. Σας βοηθά να υπολογίσετε με ακρίβεια το κόστος παραγωγής, να παρακολουθήσετε την απόδοση και να βελτιστοποιήσετε την κερδοφορία σας.',
          tip: 'Ξεκινήστε με τη δημιουργία μιας νέας παρτίδας για να εξοικειωθ��ίτε με το σύστημα.',
          action: 'Συνεχίστε στην επόμενη ενότητα'
        },
        {
          id: 'step-2',
          title: 'Περιήγηση στη Διεπαφή',
          content: 'Η κύρια οθόνη περιλαμβάνει 7 βασικές καρτέλες: Στοιχεία Παρτίδας, Εργάτες, Ανάλυση & Benchmark, Τελικά Προϊόντα, Αναφορές, Προχωρημένη Ανάλυση και Ρυθμίσεις.',
          tip: 'Κάθε καρτέλα έχει συγκεκριμένη λειτουργία. Χρησιμοποιήστε τις συντομεύσεις πληκτρολογίου για γρήγορη περιήγηση.',
          action: 'Εξερευνήστε τις καρτέλες'
        }
      ]
    },
    {
      id: 'batch-creation',
      title: 'Δημιουργία Παρτίδας',
      icon: Package,
      description: 'Μάθετε να δημιουργείτε και να διαχειρίζεστε παρτίδες',
      steps: [
        {
          id: 'step-3',
          title: 'Βασικά Στοιχεία Προϊόντος',
          content: 'Ξεκινήστε εισάγοντας το όνομα του προϊόντος (π.χ. "Θράψαλο ΝΖ ολ��κληρο block 2Μ"), τον προμηθευτή (π.χ. "Marine"), την παρτίδα εισερχόμενου (π.χ. "20024"), και τις βασικές πληροφορίες όπως ποσότητα και τιμή αγοράς.',
          tip: 'Οι πληροφορίες του προμηθευτή και η παρτίδα βοηθούν στην ιχνηλασιμότητα.',
          action: 'Συμπληρώστε τα βασικά στοιχεία'
        },
        {
          id: 'step-4',
          title: 'Τελικό Προϊόν και Απόδοση',
          content: 'Καταχωρήστε την παρτίδα του τελικού προϊόντος (π.χ. "20025") και τα βάρη των προϊόντων εξόδου. Το σύστημα υπολογίζει αυτόματα την απόδοση (yield) και τη φύρα.',
          tip: 'Παράδειγμα: 900kg εισερχόμενα → 430kg καθαρό + 461.16kg grill = 891.16kg (99% yield)',
          action: 'Εισάγετε τα τελικά προϊόντα'
        }
      ]
    },
    {
      id: 'processing-phases',
      title: 'Φάσεις Επεξεργασίας',
      icon: Factory,
      description: 'Προαιρετική λεπτομερής παρακολούθηση φ��σεων',
      steps: [
        {
          id: 'step-5',
          title: 'Προσθήκη Φάσεων',
          content: 'Προσθέστε προαιρετικά φάσεις επεξεργασίας όπως καθάρισμα, κοπή, ψήσιμο, κατάψυξη, επίπαγος και πακετάρισμα. Κάθε φάση μπορεί να έχει το δικό της ποσοστό απώλειας ή κέρδους (για επίπαγος).',
          tip: 'Η επίπαγος προσθέτει βάρος (+3%) και μπορεί να καλύψει τις απώλειες καθαρίσματος (-10%).',
          action: 'Προσθέστε φάσεις επεξεργασίας'
        },
        {
          id: 'step-6',
          title: 'Εργάτες ανά Φάση',
          content: 'Μπορείτε να αναθέσετε συγκεκριμένους εργάτες σε κάθε φάση ή να χρησιμοποιήσετε γενικευμένους εργάτες. Το σύστημα υπολογίζει αυτόματα το συνολικό εργατικό κόστος.',
          tip: 'Παράδειγμα: Καθάρισμα & Grill (5 άτομα × 8 ώρες), Στρώσιμο (4 άτομα × 2 ώρες).',
          action: 'Ρυθμίστε τους ��ργάτες'
        }
      ]
    },
    {
      id: 'cost-analysis',
      title: 'Ανάλυση Κόστους',
      icon: Calculator,
      description: 'Κατανοήστε τους υπολογισμούς κόστους',
      steps: [
        {
          id: 'step-7',
          title: 'Υπολογισμός Συσκευασίας',
          content: 'Το σύστημα υπολογίζει αυτόματα το κόστος συσκευασίας. Παράδειγμα: 891.16kg ÷ 5kg/σακούλα = 179 σακούλες. 1kg ζελατίνας = 35 σακούλες. Χρειάζονται 5.11kg ζελατίνας × €3.15 = €16.11.',
          tip: 'Το σύστημα προτείνει τον αριθμό τεμαχίων συσκευασίας βάσει της χωρητικότητας.',
          action: 'Ελέγξτε τους υπολογισμούς'
        },
        {
          id: 'step-8',
          title: 'Συνολικό Κόστος και Κέρδος',
          content: 'Κόστος/kg = (Κόστος Α\' ύλης + Εργατικά + Συσκευασία) ÷ Τελικά κιλά. Παράδειγμα: (€5.130 + €310 + €69.21) ÷ 891.16kg = €6.18/kg. Κέρδος/kg = Τιμή πώλησης - Κόστος/kg.',
          tip: 'Στόχος: Π��ριθώριο κέρδους >30% για εξαιρετική απόδοση, >15% για ικανοποιητική.',
          action: 'Υπολογίστε το κέρδος'
        }
      ]
    },
    {
      id: 'final-products',
      title: 'Τελικά Προϊόντα',
      icon: Award,
      description: 'Διαχείριση stock και πωλήσεων',
      steps: [
        {
          id: 'step-9',
          title: 'Καταχώρηση Τελικού Προϊόντος',
          content: 'Στην καρτέλα "Τελικά Προϊόντα" μπορείτε να δημιουργήσετε νέες παρτίδες τελικών προϊόντων με σύνδεση σε παρτίδες πρώτης ύλης. Το σύστημα υπολογίζει αυτόματα το κόστος/kg και δημιουργεί εγγραφή στο stock.',
          tip: 'Κάθε παρτίδα τελικού προϊόντος συνδέεται άμεσα με την παρτίδα πρώτης ύλης για πλήρη ιχνηλασιμότητα.',
          action: 'Δημιουργήστε τελικό προϊόν'
        },
        {
          id: 'step-10',
          title: 'FIFO Stock Management',
          content: 'Το σύστημα χρησιμοποιεί FIFO (First-In-First-Out) λογική για την κατανομή πωλήσεων. Οι παλαιότερες παρτίδες πωλούνται πρώτες, εξασφαλίζοντας σωστή διαχείριση αποθεμάτων και ακριβή υπολογισμό κόστους πωληθέντων.',
          tip: 'Κατά την πώληση, το σύστημα προτείνει αυτόματα την κατανομή σε διαθέσιμες παρτίδες.',
          action: 'Δοκιμάστε μια πώληση'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Αναφορές & Analytics',
      icon: BarChart3,
      description: 'Παρακολούθηση απόδοσης και κερδοφορίας',
      steps: [
        {
          id: 'step-11',
          title: 'Dashboard Overview',
          content: 'Το dashboard παρέχει άμεση επισκόπηση των βασικών μετρικών: συνολικές παρτίδες, έσοδα, κέρδος και μέση απόδοση. Τα γραφήματα δείχνουν τάσεις παραγωγής και κερδοφορίας.',
          tip: 'Παρακολουθήστε το ποσοστό απόδοσης - στόχος >85% για βέλτιστη απόδοση.',
          action: 'Εξερευνήστε το dashboard'
        },
        {
          id: 'step-12',
          title: 'Benchmark Σύγκριση',
          content: 'Η ανάλυση benchmark συγκρίνει την επίδοσή σας με βιομηχανικά standards: Απόδοση (στόχος 90%), Κόστος Α\' ύλης (στόχος <70%), Εργατικά (στόχος <15%), Συσκευασία (στόχος <10%).',
          tip: 'Πράσινα βέλη δείχνουν καλή απόδοση, κόκκινα δείχνουν περιοχές για βελτίωση.',
          action: 'Αναλύστε τα benchmarks'
        }
      ]
    }
  ];

  const quickTips = [
    {
      icon: Zap,
      title: 'Γρήγορα Tips',
      tips: [
        'Χρησιμοποιήστε Ctrl+K για το command palette',
        'Κάντε κλικ στα "?" για βοήθεια σε κάθε ενότητα',
        'Τα demo δεδομένα δείχνουν πραγματικά παραδείγματα'
      ]
    },
    {
      icon: Target,
      title: 'Βέλτιστες Πρακτικές',
      tips: [
        'Διατηρείτε yield >85% για βέλτιστη απόδοση',
        'Παρακολουθείτε το κόστος Α\' ύλης <70% του συνολικού',
        'Στοχεύετε σε περιθώριο κέρδους >30%'
      ]
    },
    {
      icon: Shield,
      title: 'Ποιότητα Δεδομένων',
      tips: [
        'Καταχωρείτε πάντα τον αριθμό παρτίδας',
        'Ελέγχετε την ιχνηλασιμότητα των πρώτων υλών',
        'Χρησιμοποιείτε ακριβή βάρη για καλύτερους υπολογισμούς'
      ]
    }
  ];

  const demoScenarios = [
    {
      title: 'Γάμπαρη Premium',
      description: '132kg → 160kg με 81% yield και €172 κέρδος',
      highlight: '42.5% margin',
      color: 'green'
    },
    {
      title: 'Χταπόδι Block',
      description: '100kg → 80kg με 80% yield και €54 κέρδος',
      highlight: '20.6% margin',
      color: 'blue'
    },
    {
      title: 'Θράψαλο L',
      description: '200kg → 180kg με 90% yield και €144 κέρδος',
      highlight: '27.7% margin',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header
        isPremium={false}
        setIsPremium={() => {}}
        showFileUpload={false}
        setShowFileUpload={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Section */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-600 rounded-full">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-4">
              Οδηγός Χρήσης KostoPro
            </CardTitle>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Μάθετε να χρησιμοποιείτε το KostoPro για την ακριβή κοστολόγηση θαλασσινών, 
              την παρακολούθηση απόδοσης και τη βελτιστοποίηση κερδοφορίας.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
                Δωρεάν Tutorial
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
                <Clock className="w-4 h-4 mr-2" />
                15 λεπτά
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Πρόοδος Tutorial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Ολοκληρώθηκαν: {completedSteps.length} από {tutorialSections.reduce((acc, section) => acc + section.steps.length, 0)} βήματα
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(completedSteps.length / tutorialSections.reduce((acc, section) => acc + section.steps.length, 0)) * 100}%` 
                  }}
                />
              </div>
              <div className="text-sm font-bold text-green-600">
                {Math.round((completedSteps.length / tutorialSections.reduce((acc, section) => acc + section.steps.length, 0)) * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Tutorial Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
                {tutorialSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <TabsTrigger 
                      key={section.id} 
                      value={section.id}
                      className="flex flex-col items-center p-3 h-auto"
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      <span className="text-xs text-center">{section.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {tutorialSections.map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <section.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-2xl">{section.title}</span>
                          <div className="text-sm text-gray-600 mt-1">{section.description}</div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-4">
                        {section.steps.map((step, index) => {
                          const isCompleted = completedSteps.includes(step.id);
                          return (
                            <AccordionItem key={step.id} value={step.id}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center space-x-3 text-left">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    {isCompleted ? (
                                      <CheckCircle className="w-5 h-5" />
                                    ) : (
                                      <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold">{step.title}</h3>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="ml-11 space-y-4">
                                  <p className="text-gray-700 leading-relaxed">{step.content}</p>
                                  
                                  {step.tip && (
                                    <Alert>
                                      <Lightbulb className="h-4 w-4" />
                                      <AlertDescription>
                                        <strong>💡 Tip:</strong> {step.tip}
                                      </AlertDescription>
                                    </Alert>
                                  )}
                                  
                                  <div className="flex justify-between items-center pt-4">
                                    <Button
                                      onClick={() => markStepComplete(step.id)}
                                      disabled={isCompleted}
                                      className={isCompleted ? 'bg-green-600' : 'bg-blue-600'}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <CheckCircle className="w-4 h-4 mr-2" />
                                          Ολοκληρώθηκε
                                        </>
                                      ) : (
                                        <>
                                          <ArrowRight className="w-4 h-4 mr-2" />
                                          {step.action}
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Tips */}
            {quickTips.map((tipGroup, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <tipGroup.icon className="w-5 h-5 text-blue-600" />
                    <span>{tipGroup.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tipGroup.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Demo Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span>Demo Σενάρια</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoScenarios.map((scenario, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{scenario.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{scenario.description}</div>
                      <Badge 
                        className={`mt-2 text-xs ${
                          scenario.color === 'green' ? 'bg-green-100 text-green-800' :
                          scenario.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {scenario.highlight}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Γρήγορες Ενέργειες</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Guide
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Επαναφορά Progress
                </Button>
                <Button variant="outline" className="w-full">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Bottom Navigation Spacing */}
        <div className="h-20 lg:hidden"></div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorialPage;
