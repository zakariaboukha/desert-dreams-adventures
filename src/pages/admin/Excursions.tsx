
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { ExcursionsTable } from "@/components/admin/ExcursionsTable";
import { AddExcursionDialog } from "@/components/admin/AddExcursionDialog";
import { useLanguage } from '@/contexts/LanguageContext';
import { Toaster } from "@/components/ui/toaster";

const Excursions = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.excursions')}</h2>
          <AddExcursionDialog />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
            <Input 
              placeholder={t('admin.search_excursions')} 
              className={`${isRTL ? 'pr-10' : 'pl-10'} w-full`}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>{t('admin.filter')}</span>
            </Button>
            <select className="border rounded-md px-3 py-2 bg-background">
              <option value="">{t('admin.all_categories')}</option>
              <option value="desert">{t('admin.desert_tours')}</option>
              <option value="mountain">{t('admin.mountain_expeditions')}</option>
              <option value="cultural">{t('admin.cultural_tours')}</option>
            </select>
          </div>
        </div>

        <ExcursionsTable />
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default Excursions;
