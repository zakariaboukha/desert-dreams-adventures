
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { UsersTable } from "@/components/admin/UsersTable";
import { AddUserDialog } from "@/components/admin/AddUserDialog";
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminSearch } from "@/components/admin/AdminSearch";
import { Toaster } from "@/components/ui/toaster";

const Users = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{t('admin.users')}</h2>
          <AddUserDialog />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <AdminSearch 
            placeholder={t('admin.search_users')}
            onSearch={setSearchQuery}
          />
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>{t('admin.filter')}</span>
            </Button>
            <select className="border rounded-md px-3 py-2 bg-background">
              <option value="">{t('admin.all_roles')}</option>
              <option value="admin">{t('admin.administrators')}</option>
              <option value="customer">{t('admin.customers')}</option>
              <option value="guide">{t('admin.guides')}</option>
            </select>
          </div>
        </div>

        <UsersTable />
      </div>
      <Toaster />
    </AdminLayout>
  );
};

export default Users;
