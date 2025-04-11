
import React, { useState, FormEvent } from 'react';
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
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUploader, { UploadedImage } from '@/components/admin/ImageUploader';
import CreationSuccessModal from '@/components/admin/CreationSuccessModal';
import { toast } from '@/hooks/use-toast';

interface ExcursionFormData {
  name: string;
  category: string;
  price: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  maxPeople: string;
  status: string;
  meetingPoint: string;
  startTime: string;
  endTime: string;
  included: string;
  notIncluded: string;
}

const initialFormData: ExcursionFormData = {
  name: '',
  category: '',
  price: '',
  duration: '',
  shortDescription: '',
  fullDescription: '',
  maxPeople: '',
  status: 'active',
  meetingPoint: '',
  startTime: '',
  endTime: '',
  included: '',
  notIncluded: '',
};

const ExcursionCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ExcursionFormData>(initialFormData);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createdExcursionId, setCreatedExcursionId] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key: keyof ExcursionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImagesChange = (images: UploadedImage[]) => {
    setUploadedImages(images);
    console.log("Images updated:", images.length);
  };

  const isFormValid = () => {
    // Basic validation - require name, category, price
    return formData.name.trim() !== '' && 
           formData.category !== '' && 
           formData.price.trim() !== '';
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setUploadedImages([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful creation
      const mockExcursionId = `exc-${Date.now().toString().slice(-6)}`;
      setCreatedExcursionId(mockExcursionId);
      
      console.log("Excursion created (mock):", {
        ...formData,
        id: mockExcursionId,
        images: uploadedImages.map(img => ({
          name: img.file.name,
          size: img.file.size,
          type: img.file.type
        }))
      });

      // Show success modal
      setSuccessModalOpen(true);
      
      toast({
        title: "Success",
        description: "Excursion created successfully",
      });
    } catch (error) {
      console.error("Error creating excursion:", error);
      toast({
        title: "Error",
        description: "Failed to create excursion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAnother = () => {
    resetForm();
  };

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
      
      <form onSubmit={handleSubmit}>
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
                <Input 
                  id="name" 
                  placeholder="Enter excursion name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
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
                  <Input 
                    id="price" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min="0.5" 
                    step="0.5" 
                    placeholder="2" 
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea 
                  id="shortDescription" 
                  placeholder="Brief description (150 characters)" 
                  className="resize-none" 
                  rows={2}
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea 
                  id="fullDescription" 
                  placeholder="Detailed excursion description" 
                  className="resize-none" 
                  rows={6}
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPeople">Max People</Label>
                <Input 
                  id="maxPeople" 
                  type="number" 
                  min="1" 
                  placeholder="10" 
                  value={formData.maxPeople}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Status</Label>
                  <div className="text-xs text-muted-foreground">Is this excursion active?</div>
                </div>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
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
              <ImageUploader 
                maxFiles={5} 
                maxSize={2 * 1024 * 1024} 
                onImagesChange={handleImagesChange} 
              />
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
                <Label htmlFor="meetingPoint">Meeting Point</Label>
                <Input 
                  id="meetingPoint" 
                  placeholder="Where should customers meet?" 
                  value={formData.meetingPoint}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="included">What's Included</Label>
                <Textarea 
                  id="included" 
                  placeholder="Enter items included in the excursion" 
                  className="resize-none" 
                  rows={3}
                  value={formData.included}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notIncluded">What's Not Included</Label>
                <Textarea 
                  id="notIncluded" 
                  placeholder="Enter items not included in the excursion" 
                  className="resize-none" 
                  rows={3}
                  value={formData.notIncluded}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/excursions')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Excursion'
            )}
          </Button>
        </div>
      </form>

      <CreationSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        onCreateAnother={handleCreateAnother}
        entityId={createdExcursionId}
        entityName={formData.name}
        entityType="Excursion"
        viewPath="/admin/excursions"
      />
    </div>
  );
};

export default ExcursionCreate;
