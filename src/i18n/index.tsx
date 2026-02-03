import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';

// Locale types
export type Locale = 'en' | 'ja';

// Import all locale files statically for Vite bundling
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enGettingStarted from './locales/en/getting-started.json';
import enDemo from './locales/en/demo.json';

import jaCommon from './locales/ja/common.json';
import jaHome from './locales/ja/home.json';
import jaGettingStarted from './locales/ja/getting-started.json';
import jaDemo from './locales/ja/demo.json';

type TranslationData = Record<string, unknown>;

const locales: Record<Locale, Record<string, TranslationData>> = {
  en: {
    common: enCommon,
    home: enHome,
    'getting-started': enGettingStarted,
    demo: enDemo,
  },
  ja: {
    common: jaCommon,
    home: jaHome,
    'getting-started': jaGettingStarted,
    demo: jaDemo,
  },
};

// Context
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

// Storage key
const LOCALE_STORAGE_KEY = 'qamposer-locale';

// Detect browser language
function detectBrowserLocale(): Locale {
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'ja' ? 'ja' : 'en';
}

// Provider
interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === 'en' || stored === 'ja') {
      return stored;
    }
    // Fall back to browser detection
    return detectBrowserLocale();
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook
export function useTranslation(namespace: string = 'common') {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }

  const { locale, setLocale } = context;

  const translations = useMemo(() => {
    const common = locales[locale].common || {};
    const page = locales[locale][namespace] || {};
    return { ...common, ...page };
  }, [locale, namespace]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // For arrays (like tips.items)
  const tArray = (key: string): string[] => {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return [];
      }
    }

    return Array.isArray(value) ? value : [];
  };

  return { t, tArray, locale, setLocale };
}
