'use client';

import { ModeToggle } from '@/components/theme/toggle-theme';
import { LanguageToggle } from '@/components/language/toggle-language';

export function Header() {
  return (
    <header className="bg-background/60 border-border/40 supports-backdrop-filter:bg-background/40 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="from-primary to-primary/60 flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br shadow-sm">
            <span className="text-primary-foreground text-sm font-bold">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              Next Template
            </span>
            <span className="text-muted-foreground text-xs">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
