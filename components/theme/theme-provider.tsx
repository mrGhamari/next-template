'use client';
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = { children: React.ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      enableSystem
      defaultTheme="system"
      attribute="class"
      value={{ light: 'light', dark: 'dark' }}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
