import En from '@/locales/En';
import Fa from '@/locales/Fa';
import type { Resource } from 'i18next';
import i18next from 'i18next';

const resources: Resource = {
  en: { translation: { ...En } },
  fa: { translation: { ...Fa } },
};

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'fa',
    resources,
    debug: false,
    fallbackLng: 'en',
  });
}

export const t = (key: string) => i18next.t(key);
export const changeLanguage = (lng: 'en' | 'fa') => i18next.changeLanguage(lng);

export default i18next;
