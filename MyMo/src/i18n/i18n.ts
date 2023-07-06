import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import koTranslation from './locales/ko.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ko: {
    translation: koTranslation,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ko',
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
