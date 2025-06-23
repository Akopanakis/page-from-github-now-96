import React from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">
          {language === 'gr' ? 'Η σελίδα δεν βρέθηκε' : 'Page Not Found'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'gr' 
            ? 'Η σελίδα που ψάχνετε δεν υπάρχει.'
            : 'The page you are looking for does not exist.'}
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === 'gr' ? 'Επιστροφή στην Αρχική' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
}