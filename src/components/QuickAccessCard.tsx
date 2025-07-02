import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, Calculator, FileText, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function QuickAccessCard() {
  const [, setLocation] = useLocation();

  const quickActions = [
    {
      title: "Διαχείριση Δαπανών",
      description: "Προσθήκη, επεξεργασία και παρακολούθηση δαπανών",
      icon: Receipt,
      action: () => setLocation("/expenses"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Υπολογιστής Κόστους",
      description: "Γρήγορος υπολογισμός κόστους καυσίμων και εργασίας",
      icon: Calculator,
      action: () => setLocation("/expenses"),
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Αναφορές & Εξαγωγή",
      description: "Εξαγωγή αναφορών σε PDF, Excel και CSV",
      icon: FileText,
      action: () => setLocation("/expenses"),
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <Card className="rounded-2xl shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Γρήγορη Πρόσβαση στις Δαπάνες
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border hover:shadow-md transition-shadow cursor-pointer"
              onClick={action.action}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {action.description}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-between"
                  >
                    Άνοιγμα
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
