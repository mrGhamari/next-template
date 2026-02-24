'use client';

import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  return <h1 className="text-2xl font-semibold">{t('login_page')}</h1>;
}
