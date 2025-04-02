
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { debounce } from 'lodash';

interface AdminSearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function AdminSearch({ placeholder, onSearch, className }: AdminSearchProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    
    // Cancel debounce on cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={`relative flex-1 ${className || ''}`}>
      <Search 
        className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} 
      />
      <Input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder} 
        className={`${isRTL ? 'pr-10' : 'pl-10'} ${searchQuery ? (isRTL ? 'pl-10' : 'pr-10') : ''} w-full`}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 h-6 w-6`}
          onClick={handleClearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
