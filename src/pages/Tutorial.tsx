import React from 'react';
import Header from '../components/Header';

const TutorialPage: React.FC = () => {
  return (
    <div>
      <Header
        isPremium={false}
        setIsPremium={() => {}}
        showFileUpload={false}
        setShowFileUpload={() => {}}
      />
      <h1>Tutorial Page</h1>
      <p>This is a tutorial page.</p>
    </div>
  );
};

export default TutorialPage;
