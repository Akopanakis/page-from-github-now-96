import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PremiumInfoCardProps {
  onUpgrade: () => void;
}

const PremiumInfoCard: React.FC<PremiumInfoCardProps> = ({ onUpgrade }) => {
  const { language } = useLanguage();

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <Crown className="w-5 h-5" />
          <span>
            {language === "el" ? "Premium Δυνατότητες" : "Premium Features"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {[
            language === "el" ? "Φάσεις Επεξεργασίας" : "Processing Phases",
            language === "el" ? "Διαχείριση Παρτίδων" : "Batch Management",
            language === "el" ? "Προχωρημένη Ανάλυση" : "Advanced Analysis",
            language === "el" ? "AI Προβλέψεις" : "AI Predictions",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm text-purple-700"
            >
              <Sparkles className="w-3 h-3" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Crown className="w-4 h-4 mr-2" />
          {language === "el" ? "Αναβάθμιση" : "Upgrade"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumInfoCard;
