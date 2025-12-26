// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en/common.json';
import esTranslations from '../locales/es/common.json';
import { store } from '../store/store';
import { getDeviceLanguage } from '../utils/languageDetector';



// Type definitions for translations
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof enTranslations;
    };
  }
}

const resources = {
  en: {
    translation: enTranslations,
  },
  es: {
    translation: esTranslations,
  },
} as const;
// Initialize with default language
const initializeI18n = async () => {
 const deviceLanguage = await getDeviceLanguage();
  
  i18n.use(initReactI18next).init({
    lng: store.getState().language.currentLanguage || deviceLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });
};

initializeI18n();

// Subscribe to Redux store changes
store.subscribe(() => {
  const currentLanguage = store.getState().language.currentLanguage;
  if (currentLanguage !== i18n.language) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;