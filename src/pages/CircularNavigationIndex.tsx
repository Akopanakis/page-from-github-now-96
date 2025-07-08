
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import CircularNavigation from './CircularNavigation';
import MainTabs from '@/components/MainTabs';
import { useCalculation } from '@/hooks/useCalculation';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';

const CircularNavigationIndex = () => {
  const [location, setLocation] = useLocation();
  const [activeComponent, setActiveComponent] = useState<string>('circular-nav');
  const [isPremium, setIsPremium] = useState(false);
  
  const { 
    formData, 
    updateFormData, 
    calculate, 
    resetForm, 
    results, 
    isCalculating 
  } = useCalculation();

  // Load premium status
  useEffect(() => {
    const savedPremium = localStorage.getItem('isPremium');
    if (savedPremium === 'true') {
      setIsPremium(true);
    }
  }, []);

  const handleNavigation = (route: string, component?: string) => {
    if (route !== '/') {
      setLocation(route);
    } else if (component) {
      setActiveComponent(component);
    }
  };

  const handleBackToCircular = () => {
    setActiveComponent('circular-nav');
  };

  // Show circular navigation by default
  if (activeComponent === 'circular-nav') {
    return (
      <AuthProvider>
        <LanguageProvider>
          <ErrorBoundary>
            <CircularNavigation 
              onNavigate={handleNavigation}
              isPremium={isPremium}
            />
          </ErrorBoundary>
        </LanguageProvider>
      </AuthProvider>
    );
  }

  // Show specific component content
  return (
    <AuthProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header with back button */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <button
                  onClick={handleBackToCircular}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Επιστροφή στην Κυκλική Πλοήγηση
                </button>
                
                <div className="text-sm text-gray-500">
                  KostoPro - Circular Navigation
                </div>
              </div>
            </div>

            {/* Component content */}
            <div className="max-w-7xl mx-auto p-6">
              <MainTabs
                activeTab={activeComponent}
                setActiveTab={setActiveComponent}
                isPremium={isPremium}
                setIsPremium={setIsPremium}
                formData={formData}
                updateFormData={updateFormData}
                results={results}
              />
            </div>
          </div>
        </ErrorBoundary>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default CircularNavigationIndex;
