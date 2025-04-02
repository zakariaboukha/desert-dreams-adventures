
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CategoriesTable } from "@/components/admin/CategoriesTable";
import { AddCategoryDialog } from "@/components/admin/AddCategoryDialog";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { Toaster } from "@/components/ui/toaster";

const Categories = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.categories')}</h2>
          <AddCategoryDialog />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <AdminSearch 
            placeholder={t('admin.search_categories')}
            onSearch={setSearchQuery}
          />
        </div>

        <CategoriesTable />
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default Categories;
