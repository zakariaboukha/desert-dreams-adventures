import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryManagement from '@/components/admin/excursions/CategoryManagement';

const ExcursionCategories: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link to="/admin/excursions">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Excursion Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for organizing your excursions.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Category List</CardTitle>
          <CardDescription>
            View and manage all your excursion categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryManagement showHeading={false} isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcursionCategories;
