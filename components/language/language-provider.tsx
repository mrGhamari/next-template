'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import '@/lib/internationalization/i18n';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'fa';
    i18next.changeLanguage(storedLang);
    document.documentElement.lang = storedLang;
    document.documentElement.dir = storedLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.className = storedLang === 'fa' ? 'rtl' : 'ltr';

    queueMicrotask(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
