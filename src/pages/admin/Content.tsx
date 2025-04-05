
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UploadCloud, Image, Layout, Type, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for content pages
const contentPages = [
  { id: 1, title: 'Home Page', status: 'published', lastUpdated: '2024-04-01', author: 'Admin' },
  { id: 2, title: 'About Us', status: 'published', lastUpdated: '2024-03-28', author: 'Admin' },
  { id: 3, title: 'Contact', status: 'published', lastUpdated: '2024-03-25', author: 'Admin' },
  { id: 4, title: 'Terms & Conditions', status: 'draft', lastUpdated: '2024-04-02', author: 'Admin' },
  { id: 5, title: 'Privacy Policy', status: 'draft', lastUpdated: '2024-04-03', author: 'Admin' },
];

// Mock data for categories
const categories = [
  { id: 1, name: 'Pages', count: 5 },
  { id: 2, name: 'Blog Posts', count: 12 },
  { id: 3, name: 'Media', count: 36 },
];

const Content: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("pages");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast.success(`File selected: ${files[0].name}`);
    }
  };

  const handleAddCategory = () => {
    if (categoryName.trim() === '') {
      toast.error("Category name cannot be empty");
      return;
    }
    
    // This would connect to Supabase in a real implementation
    // For now, just show success message
    toast.success(`Category "${categoryName}" added successfully`);
    setCategoryName("");
  };

  const handleDeleteCategory = (id: number) => {
    setCategoryToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDeleteCategory = () => {
    // This would connect to Supabase in a real implementation
    toast.success(`Category deleted successfully`);
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Content Management</h1>
        <p className="text-muted-foreground">
          Manage website content, pages, and media.
        </p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>
        
        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Content Pages</CardTitle>
                <CardDescription>
                  Manage website pages and content.
                </CardDescription>
              </div>
              <Button>
                <Layout className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentPages.map(page => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>
                        <Badge variant={page.status === 'published' ? 'default' : 'outline'}>
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{page.lastUpdated}</TableCell>
                      <TableCell>{page.author}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>
                  Manage categories for organizing your content.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Add New Category</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input 
                          id="categoryName" 
                          placeholder="Enter category name"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)} 
                        />
                      </div>
                      <Button onClick={handleAddCategory}>Add Category</Button>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Existing Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categories.map(category => (
                            <TableRow key={category.id}>
                              <TableCell className="font-medium">{category.name}</TableCell>
                              <TableCell>{category.count}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-destructive h-8 w-8 p-0"
                                  onClick={() => handleDeleteCategory(category.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Upload and manage images and files.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
                  <div className="mb-4 p-4 rounded-full bg-primary/10">
                    <UploadCloud className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Upload Media</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Drag and drop files here, or click to select files. 
                    Supports images, videos, documents, and more.
                  </p>
                  <div className="mt-4">
                    <Input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="fileUpload" className="cursor-pointer">
                      <Button as="span">
                        <UploadCloud className="h-4 w-4 mr-2" />
                        Select Files
                      </Button>
                    </Label>
                  </div>
                  {selectedFile && (
                    <div className="mt-4 p-3 border rounded-md bg-background flex items-center gap-3">
                      <Image className="h-4 w-4 text-primary" />
                      <span className="text-sm">{selectedFile.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {Math.round(selectedFile.size / 1024)} KB
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="relative group aspect-square rounded-md overflow-hidden border bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-medium truncate">File-{item}.jpg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Content;
