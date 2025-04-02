
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locales/en.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';
import deTranslation from '../locales/de.json';

// Define the available languages
export type Language = 'en' | 'fr' | 'es' | 'de';

// Define the structure for language data
interface LanguageInfo {
  nativeName: string;
  flag: string;
  isRTL?: boolean;
}

// Available languages with their info
export const languages: Record<Language, LanguageInfo> = {
  en: {
    nativeName: 'English',
    flag: '🇬🇧',
    isRTL: false
  },
  fr: {
    nativeName: 'Français',
    flag: '🇫🇷',
    isRTL: false
  },
  es: {
    nativeName: 'Español',
    flag: '🇪🇸',
    isRTL: false
  },
  de: {
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isRTL: false
  }
};

// Initialize i18n
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
        es: { translation: esTranslation },
        de: { translation: deTranslation }
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['localStorage', 'navigator']
      }
    });
}

// Define the context value type
interface LanguageContextType {
  language: Language;
  isRTL: boolean; // Add the isRTL property
  changeLanguage: (lng: Language) => void;
}

// Create a default context value
const defaultContextValue: LanguageContextType = {
  language: 'en',
  isRTL: false,
  changeLanguage: () => {}
};

// Create the context
const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

// Create the provider component
interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && Object.keys(languages).includes(savedLanguage) ? savedLanguage : 'en';
  });

  // Determine if the current language is RTL
  const isRTL = languages[language]?.isRTL || false;

  // Change language handler
  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  // Initialize i18n with the current language on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, isRTL, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create and export the hook
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
