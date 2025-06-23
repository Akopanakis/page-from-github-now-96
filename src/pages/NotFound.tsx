
import React from 'react';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const title = language === 'el' 
    ? 'Η σελίδα δεν βρέθηκε' 
    : 'Page Not Found';
    
  const description = language === 'el'
    ? 'Η σελίδα που ψάχνετε δεν υπάρχει.'
    : 'The page you are looking for does not exist.';
    
  const buttonText = language === 'el'
    ? 'Επιστροφή στην Αρχική'
    : 'Back to Home';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-9xl font-bold text-muted-foreground">404</div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
        <Button onClick={() => navigate('/')} className="inline-flex items-center gap-2">
          <Home className="h-4 w-4" />
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
