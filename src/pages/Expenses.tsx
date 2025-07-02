import React from "react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import ExpenseManagement from "@/components/expenses/ExpenseManagement";

export default function Expenses() {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      <main className="container mx-auto px-4 py-8">
        <ExpenseManagement />
      </main>
      <Footer />
    </div>
  );
}
