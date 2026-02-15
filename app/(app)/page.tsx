import { ModeToggle } from '@/components/theme/toggle-theme';
import { t } from '@/lib/internationalization/i18n';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="bg-card flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl px-8 py-16 shadow-sm">
        <h1 className="text-6xl">New next template</h1>
        <ModeToggle />
        <p className="text-2xl">{t('hello')}</p>
      </div>
    </div>
  );
}
