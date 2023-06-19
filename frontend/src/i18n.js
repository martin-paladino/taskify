import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import translationEN from './locales/en.json';
import translationES from './locales/es.json';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationEN, // English translations
      },
      es: {
        translation: translationES, // Spanish translations
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;