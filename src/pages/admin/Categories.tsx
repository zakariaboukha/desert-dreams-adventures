
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog";

const Categories = () => {
  const { t } = useTranslation();
  
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.categories')}</h2>
          <AddCategoryDialog />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('admin.search_categories')} 
              className="pl-10 w-full" 
            />
          </div>
        </div>

        <CategoriesTable />
      </div>
    </AdminLayout>
  );
};

export default Categories;
