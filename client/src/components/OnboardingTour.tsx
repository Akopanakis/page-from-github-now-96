import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

const steps = [
  {
    target: '[data-tour="form"]',
    content: 'Ξεκινήστε συμπληρώνοντας τα στοιχεία του προϊόντος εδώ.'
  },
  {
    target: '[data-tour="results"]',
    content: 'Εδώ εμφανίζονται τα αποτελέσματα κόστους και κέρδους.'
  },
  {
    target: '[data-tour="export"]',
    content: 'Χρησιμοποιήστε αυτές τις επιλογές για να κάνετε εξαγωγή.'
  },
  {
    target: '[data-tour="batch"]',
    content: 'Διαχειριστείτε τις παρτίδες σας εδώ.'
  }
];

const OnboardingTour: React.FC = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('tourCompleted');
    if (!completed) {
      setRun(true);
    }
  }, []);

  const handleCallback = (data: CallBackProps) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRun(false);
      localStorage.setItem('tourCompleted', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showSkipButton
      showProgress
      callback={handleCallback}
      styles={{ options: { zIndex: 10000 } }}
    />
  );
};

export default OnboardingTour;
