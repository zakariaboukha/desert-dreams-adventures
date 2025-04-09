import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash } from 'lucide-react';

interface CategoryManagementProps {
  showHeading?: boolean;
  isAddDialogOpen?: boolean;
  setIsAddDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Mock categories data
const initialCategories = [
  {
    id: '1',
    name: 'Safari',
    slug: 'safari',
    description: 'Desert safari excursions with 4x4 vehicles',
    count: 3
  },
  {
    id: '2',
    name: 'Wildlife',
    slug: 'wildlife',
    description: 'Observe local desert wildlife in their natural habitat',
    count: 2
  },
  {
    id: '3',
    name: 'Nature',
    slug: 'nature',
    description: 'Explore natural desert landscapes and formations',
    count: 2
  },
  {
    id: '4',
    name: 'Adventure',
    slug: 'adventure',
    description: 'Thrilling desert activities for adrenaline seekers',
    count: 1
  },
  {
    id: '5',
    name: 'Cultural',
    slug: 'cultural',
    description: 'Experience local traditions and cultural activities',
    count: 2
  },
  {
    id: '6',
    name: 'Special',
    slug: 'special',
    description: 'Unique experiences for special occasions',
    count: 2
  }
];

const CategoryManagement: React.FC<CategoryManagementProps> = ({ 
  showHeading = true,
  isAddDialogOpen: externalIsAddDialogOpen,
  setIsAddDialogOpen: externalSetIsAddDialogOpen
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: ''
  });
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [internalIsAddDialogOpen, setInternalIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const dialogOpen = externalIsAddDialogOpen !== undefined ? externalIsAddDialogOpen : internalIsAddDialogOpen;
  const setDialogOpen = externalSetIsAddDialogOpen || setInternalIsAddDialogOpen;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setNewCategory(prev => ({
      ...prev,
      [id]: value,
      ...(id === 'name' && prev.slug === '' 
        ? { slug: value.toLowerCase().replace(/\s+/g, '-') } 
        : {})
    }));
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!newCategory.slug.trim()) {
      toast.error("Category slug is required");
      return;
    }

    // In a real app, this would be an API call to Supabase
    const newCategoryWithId = {
      ...newCategory,
      id: (categories.length + 1).toString(),
      count: 0
    };

    setCategories([...categories, newCategoryWithId]);
    setNewCategory({ name: '', slug: '', description: '' });
    setDialogOpen(false);
    toast.success("Category added successfully");
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;
    
    // In a real app, this would be an API call to Supabase
    const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete);
    setCategories(updatedCategories);
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
    toast.success("Category deleted successfully");
  };

  const renderAddDialog = () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
        <DialogDescription>
          Create a new category for your excursions.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input 
            id="name" 
            placeholder="Enter category name" 
            value={newCategory.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input 
            id="slug" 
            placeholder="Enter category slug" 
            value={newCategory.slug}
            onChange={handleInputChange}
          />
          <p className="text-xs text-muted-foreground">
            The slug is used in the URL. Use lowercase letters and hyphens only.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input 
            id="description" 
            placeholder="Enter category description" 
            value={newCategory.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleAddCategory}>Add Category</Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <div className="space-y-4">
      {showHeading && (
        <div className="flex flex-row items-center justify-between pb-2">
          <div>
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="text-sm text-muted-foreground">
              Organize your excursions with custom categories.
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            {renderAddDialog()}
          </Dialog>
        </div>
      )}

      {!showHeading && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {renderAddDialog()}
        </Dialog>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Excursions</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map(category => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.count}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;
