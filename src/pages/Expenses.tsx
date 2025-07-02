import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExpenseManagement from "@/components/expenses/ExpenseManagement";

export default function Expenses() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ExpenseManagement />
      </main>
      <Footer />
    </div>
  );
}
