
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryManagement from '@/components/admin/excursions/CategoryManagement';

const ExcursionCategories: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/admin/excursions">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Excursion Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for organizing your excursions.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Organize your excursions with custom categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryManagement />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcursionCategories;
