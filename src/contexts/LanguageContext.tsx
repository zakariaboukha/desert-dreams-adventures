
import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';
import deTranslations from '../locales/de.json';
import arTranslations from '../locales/ar.json';

// Define types
export type Language = 'en' | 'es' | 'fr' | 'de' | 'ar';

export const languages = {
  en: { nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  es: { nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  fr: { nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  de: { nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ar: { nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' }
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
      de: { translation: deTranslations },
      ar: { translation: arTranslations }
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

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

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

  useEffect(() => {
    // Check if language is RTL
    const isRightToLeft = language === 'ar';
    setIsRTL(isRightToLeft);
    
    // Apply RTL or LTR to HTML
    document.documentElement.dir = isRightToLeft ? 'rtl' : 'ltr';
    
    // Add or remove RTL class from body
    if (isRightToLeft) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
