
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';
import deTranslations from '../locales/de.json';

// Define types
export type Language = 'en' | 'es' | 'fr' | 'de';

type LanguageDefinition = {
  nativeName: string;
  flag: string;
};

export const languages: Record<Language, LanguageDefinition> = {
  en: { nativeName: 'English', flag: '🇬🇧' },
  es: { nativeName: 'Español', flag: '🇪🇸' },
  fr: { nativeName: 'Français', flag: '🇫🇷' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪' }
};

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  isRTL: boolean;
}

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Define the context without initializing it with a default value
const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');
  
  // RTL languages would be added here if needed
  const rtlLanguages: Language[] = [];
  const isRTL = rtlLanguages.includes(language);

  useEffect(() => {
    // Initialize from localStorage or browser preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && Object.keys(languages).includes(savedLang)) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    } else {
      setLanguage('en');
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    isRTL
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
