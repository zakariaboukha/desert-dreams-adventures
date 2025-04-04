
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
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
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Organize your excursions with custom categories.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
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
                  <Input id="name" placeholder="Enter category name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="Enter category slug" />
                  <p className="text-xs text-muted-foreground">
                    The slug is used in the URL. Use lowercase letters and hyphens only.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter category description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Category</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
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
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExcursionCategories;
