import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import En from '@/locales/En';
import Fa from '@/locales/Fa';

const resources = {
  en: { translation: En },
  fa: { translation: Fa },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'fa',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
