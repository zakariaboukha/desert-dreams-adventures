
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExcursionCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/admin/excursions')}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Create New Excursion</h1>
          <p className="text-muted-foreground">
            Add a new excursion to your catalog.
          </p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1 md:row-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the essential details for this excursion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Excursion Name</Label>
              <Input id="name" placeholder="Enter excursion name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="safari">Safari</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" type="number" min="0.5" step="0.5" placeholder="2" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Textarea 
                id="short-description" 
                placeholder="Brief description (150 characters)" 
                className="resize-none" 
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full-description">Full Description</Label>
              <Textarea 
                id="full-description" 
                placeholder="Detailed excursion description" 
                className="resize-none" 
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-people">Max People</Label>
              <Input id="max-people" type="number" min="1" placeholder="10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Status</Label>
                <div className="text-xs text-muted-foreground">Is this excursion active?</div>
              </div>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>
              Upload images for this excursion.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-center text-muted-foreground mb-2">
                Drag and drop images here or click to upload
              </p>
              <Button variant="secondary" size="sm">
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Max 5 images, JPEG or PNG, max 2MB each
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>
              More information about this excursion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meeting-point">Meeting Point</Label>
              <Input id="meeting-point" placeholder="Where should customers meet?" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="included">What's Included</Label>
              <Textarea 
                id="included" 
                placeholder="Enter items included in the excursion" 
                className="resize-none" 
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="not-included">What's Not Included</Label>
              <Textarea 
                id="not-included" 
                placeholder="Enter items not included in the excursion" 
                className="resize-none" 
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/excursions')}>Cancel</Button>
        <Button>Create Excursion</Button>
      </div>
    </div>
  );
};

export default ExcursionCreate;
