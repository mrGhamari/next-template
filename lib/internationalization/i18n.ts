import Fa from '@/locales/Fa';
import i18next, { Resource } from 'i18next';

const resources: Resource = { fa: { translation: { ...Fa } } };

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'fa',
    resources,
    debug: false,
    fallbackLng: 'fa',
  });
}

export const t = (key: string) => i18next.t(key);

export default i18next;
