import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FinancialGlossary: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>
            {language === "el"
              ? "Χρηματοοικονομικό Λεξικό"
              : "Financial Glossary"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          {language === "el"
            ? "Λεξικό χρηματοοικονομικών όρων..."
            : "Dictionary of financial terms..."}
        </p>
      </CardContent>
    </Card>
  );
};

export default FinancialGlossary;
