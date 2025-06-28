import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, BarChart3, Zap, Package } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingCalculator from "@/components/demo/PricingCalculator";
import BatchComparisonTable from "@/components/demo/BatchComparisonTable";

const BuilderExamples: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header
        isPremium={true}
        setIsPremium={() => {}}
        showFileUpload={false}
        setShowFileUpload={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {language === "el"
              ? "Παραδείγματα Builder.io"
              : "Builder.io Examples"}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {language === "el"
              ? "Διαδραστικά εργαλεία και συστήματα ανάλυσης για επαγγελματική κοστολόγηση"
              : "Interactive tools and analysis systems for professional costing"}
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Zap className="w-4 h-4 mr-1" />
              {language === "el" ? "Παραγωγή-Έτοιμο" : "Production-Ready"}
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Package className="w-4 h-4 mr-1" />
              {language === "el" ? "Ανταποκρίνεται" : "Responsive"}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              <Calculator className="w-4 h-4 mr-1" />
              {language === "el" ? "Διαδραστικό" : "Interactive"}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="calculator"
              className="flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>
                {language === "el"
                  ? "Υπολογιστής Τιμολόγησης"
                  : "Pricing Calculator"}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>
                {language === "el" ? "Σύγκριση Παρτίδων" : "Batch Comparison"}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>
                    {language === "el"
                      ? "Προηγμένος Υπολογιστής Τιμολόγησης"
                      : "Advanced Pricing Calculator"}
                  </span>
                </CardTitle>
                <p className="text-gray-600">
                  {language === "el"
                    ? "Υπολογίστε τις βέλτιστες τιμές πώλησης με βάση το κόστος, τα περιθώρια κέρδους και τις συνθήκες της αγοράς."
                    : "Calculate optimal selling prices based on costs, profit margins, and market conditions."}
                </p>
              </CardHeader>
              <CardContent>
                <PricingCalculator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>
                    {language === "el"
                      ? "Σύστημα Διαχείρισης και Σύγκρισης Παρτίδων"
                      : "Batch Management and Comparison System"}
                  </span>
                </CardTitle>
                <p className="text-gray-600">
                  {language === "el"
                    ? "Παρακολουθήστε και συγκρίνετε την απόδοση διαφορετικών παρτίδων προϊόντων με προηγμένα φίλτρα και στατιστικά."
                    : "Monitor and compare the performance of different product batches with advanced filtering and statistics."}
                </p>
              </CardHeader>
              <CardContent>
                <BatchComparisonTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">
                {language === "el"
                  ? "Έξυπνοι Υπολογισμοί"
                  : "Smart Calculations"}
              </h3>
              <p className="text-gray-600">
                {language === "el"
                  ? "Αυτοματοποιημένοι υπολογισμοί κόστους με εποχιακούς συντελεστές και παράγοντες ποιότητας"
                  : "Automated cost calculations with seasonal factors and quality parameters"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">
                {language === "el" ? "Ανάλυση Δεδομένων" : "Data Analysis"}
              </h3>
              <p className="text-gray-600">
                {language === "el"
                  ? "Προηγμένα εργαλεία ανάλυσης για παρακολούθηση τάσεων και βελτιστοποίηση κερδοφορίας"
                  : "Advanced analytics tools for tracking trends and optimizing profitability"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Package className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">
                {language === "el" ? "Διαχείριση Παρτίδων" : "Batch Management"}
              </h3>
              <p className="text-gray-600">
                {language === "el"
                  ? "Ολοκληρωμένο σύστημα παρακολούθησης και διαχείρισης παρτίδων προϊόντων"
                  : "Comprehensive system for tracking and managing product batches"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuilderExamples;
