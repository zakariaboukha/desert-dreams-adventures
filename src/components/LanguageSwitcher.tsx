
import React from 'react';
import { useLanguage, Language, languages } from '@/contexts/LanguageContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center p-2 rounded-full hover:bg-secondary/50 transition-all">
        <Globe className="h-5 w-5" />
        <span className="ml-1 md:ml-2 text-sm hidden md:inline-block">{languages[language].flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, { nativeName, flag }]) => (
          <DropdownMenuItem 
            key={code}
            onClick={() => changeLanguage(code as Language)}
            className={`flex items-center gap-2 ${language === code ? 'bg-secondary/50' : ''} cursor-pointer`}
          >
            <span>{flag}</span>
            <span>{nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
