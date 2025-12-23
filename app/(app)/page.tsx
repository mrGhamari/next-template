import { ModeToggle } from '@/components/theme/toggle-theme';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl bg-card px-8 py-16 shadow-sm">
        <h1 className="text-6xl">New Trend Panel</h1>
        <ModeToggle />
      </div>
    </div>
  );
}
