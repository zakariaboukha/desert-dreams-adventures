
import React from 'react';
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { UsersTable } from "@/components/admin/UsersTable";
import { AddUserDialog } from "@/components/admin/AddUserDialog";

const Users = () => {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <AddUserDialog />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-10 w-full" 
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <select className="border rounded-md px-3 py-2 bg-background">
              <option value="">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="customer">Customers</option>
              <option value="guide">Guides</option>
            </select>
          </div>
        </div>

        <UsersTable />
      </div>
    </AdminLayout>
  );
};

export default Users;
