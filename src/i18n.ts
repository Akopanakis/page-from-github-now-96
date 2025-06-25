
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'premium.title': 'Premium Features',
      'premium.upgrade': 'Upgrade to Premium',
      'premium.description': 'Unlock advanced costing features',
      'navigation.product': 'Product',
      'navigation.costs': 'Costs',
      'navigation.transport': 'Transport',
      'navigation.analysis': 'Analysis',
      'navigation.advanced': 'Advanced',
      'navigation.tools': 'Tools',
      'footer.features': 'Features',
      'footer.support': 'Support',
      'footer.designed_by': 'Designed and Developed by Alexandros Kopanakis'
    }
  },
  el: {
    translation: {
      'premium.title': 'Προχωρημένες Δυνατότητες',
      'premium.upgrade': 'Αναβάθμιση σε Premium',
      'premium.description': 'Ξεκλειδώστε προχωρημένες λειτουργίες κοστολόγησης',
      'navigation.product': 'Προϊόν',
      'navigation.costs': 'Κόστη',
      'navigation.transport': 'Μεταφορά',
      'navigation.analysis': 'Ανάλυση',
      'navigation.advanced': 'Προχωρημένα',
      'navigation.tools': 'Εργαλεία',
      'footer.features': 'Χαρακτηριστικά',
      'footer.support': 'Υποστήριξη',
      'footer.designed_by': 'Σχεδιασμός και Ανάπτυξη από τον Αλέξανδρο Κοπανάκη'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'el',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
