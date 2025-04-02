
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';

// Define the available languages
export type Language = 'en' | 'fr';

// Define the structure for language data
interface LanguageInfo {
  nativeName: string;
  flag: string;
}

// Available languages with their info
export const languages: Record<Language, LanguageInfo> = {
  en: {
    nativeName: 'English',
    flag: '🇬🇧'
  },
  fr: {
    nativeName: 'Français',
    flag: '🇫🇷'
  }
};

// Define the context value type
interface LanguageContextType {
  language: Language;
  changeLanguage: (lng: Language) => void;
}

// Create a default context value to avoid circular type definition
const defaultContextValue: LanguageContextType = {
  language: 'en',
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

  // Change language handler
  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  // Initialize i18n with the current language
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
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
