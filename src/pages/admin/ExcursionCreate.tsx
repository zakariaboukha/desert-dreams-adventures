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
import { ChevronLeft, Loader2, Star, Plus, Minus, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUploader, { UploadedImage } from '@/components/admin/ImageUploader';
import CreationSuccessModal from '@/components/admin/CreationSuccessModal';
import { toast } from '@/hooks/use-toast';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Enhanced interface with new fields
interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
}

interface ExcursionFormData {
  name: string;
  tagline: string;
  category: string;
  price: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  maxPeople: string;
  status: string;
  featured: boolean;
  meetingPoint: string;
  startTime: string;
  endTime: string;
  included: string[]; // Changed from string to string[]
  notIncluded: string[]; // Changed from string to string[]
  highlights: string[];
  itinerary: ItineraryItem[];
  ageRestrictions: string;
  fitnessLevel: string;
  medicalConditions: string;
  whatToBring: string[];
  heroImage: File | null;
}

const initialFormData: ExcursionFormData = {
  name: '',
  tagline: '',
  category: '',
  price: '',
  duration: '',
  shortDescription: '',
  fullDescription: '',
  maxPeople: '',
  status: 'active',
  featured: false,
  meetingPoint: '',
  startTime: '',
  endTime: '',
  included: [], // Changed from empty string to empty array
  notIncluded: [], // Changed from empty string to empty array
  highlights: [''],
  itinerary: [{ id: '1', time: '', title: '', description: '' }],
  ageRestrictions: '',
  fitnessLevel: '',
  medicalConditions: '',
  whatToBring: [''],
  heroImage: null,
};

// Hero Image Upload Component
const HeroImageUploader: React.FC<{
  heroImage: File | null;
  onImageChange: (file: File | null) => void;
}> = ({ heroImage, onImageChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      onImageChange(file);
    }
  };

  const removeImage = () => {
    onImageChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
        {heroImage ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(heroImage)}
              alt="Hero preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Upload hero image for banner</p>
            <p className="text-xs text-muted-foreground mb-4">PNG, JPG up to 5MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="hero-upload"
            />
            <Button type="button" variant="outline" asChild>
              <label htmlFor="hero-upload" className="cursor-pointer">
                Select Image
              </label>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Highlights List Component
const HighlightsList: React.FC<{
  highlights: string[];
  onChange: (highlights: string[]) => void;
}> = ({ highlights, onChange }) => {
  const addHighlight = () => {
    onChange([...highlights, '']);
  };

  const removeHighlight = (index: number) => {
    onChange(highlights.filter((_, i) => i !== index));
  };

  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder={`Highlight ${index + 1}`}
            value={highlight}
            onChange={(e) => updateHighlight(index, e.target.value)}
          />
          {highlights.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeHighlight(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
        <Plus className="h-4 w-4 mr-2" />
        Add Highlight
      </Button>
    </div>
  );
};

// Day Itinerary Component
const DayItinerary: React.FC<{
  itinerary: ItineraryItem[];
  onChange: (itinerary: ItineraryItem[]) => void;
}> = ({ itinerary, onChange }) => {
  const addItineraryItem = () => {
    const newItem: ItineraryItem = {
      id: Date.now().toString(),
      time: '',
      title: '',
      description: ''
    };
    onChange([...itinerary, newItem]);
  };

  const removeItineraryItem = (id: string) => {
    onChange(itinerary.filter(item => item.id !== id));
  };

  const updateItineraryItem = (id: string, field: keyof ItineraryItem, value: string) => {
    const updated = itinerary.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {itinerary.map((item, index) => (
        <Card key={item.id} className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Timeline Item {index + 1}</h4>
            {itinerary.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeItineraryItem(item.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={item.time}
                  onChange={(e) => updateItineraryItem(item.id, 'time', e.target.value)}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  placeholder="Activity title"
                  value={item.title}
                  onChange={(e) => updateItineraryItem(item.id, 'title', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe this activity"
                rows={2}
                value={item.description}
                onChange={(e) => updateItineraryItem(item.id, 'description', e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={addItineraryItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Timeline Item
      </Button>
    </div>
  );
};

// What to Bring List Component
const WhatToBringList: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
}> = ({ items, onChange }) => {
  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            placeholder={`Item ${index + 1}`}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          {items.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

// RepeatableInputList Component
const RepeatableInputList: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  maxItems?: number;
}> = ({ items, onChange, placeholder, maxItems = 15 }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, '']);
    } else {
      toast({
        title: "Maximum items reached",
        description: `You can only add up to ${maxItems} items.`,
        variant: "destructive"
      });
    }
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      onChange(newItems);
    }
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addItem();
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault();
      removeItem(index);
    }
  };

  // Ensure at least one empty item exists
  const displayItems = items.length === 0 ? [''] : items;

  return (
    <div className="space-y-3">
      {displayItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder={placeholder}
            className="flex-1"
          />
          {displayItems.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
              className="px-2 py-1 h-9 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        disabled={items.length >= maxItems}
        className="w-full mt-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
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
  };

  const handleSwitchChange = (key: keyof ExcursionFormData) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [key]: checked }));
  };

  // New handlers for repeatable lists
  const handleIncludedChange = (items: string[]) => {
    setFormData(prev => ({ ...prev, included: items }));
  };

  const handleNotIncludedChange = (items: string[]) => {
    setFormData(prev => ({ ...prev, notIncluded: items }));
  };

  const handleHeroImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, heroImage: file }));
  };

  const handleHighlightsChange = (highlights: string[]) => {
    setFormData(prev => ({ ...prev, highlights }));
  };

  const handleItineraryChange = (itinerary: ItineraryItem[]) => {
    setFormData(prev => ({ ...prev, itinerary }));
  };

  const handleWhatToBringChange = (whatToBring: string[]) => {
    setFormData(prev => ({ ...prev, whatToBring }));
  };

  const isFormValid = () => {
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockExcursionId = `exc-${Date.now().toString().slice(-6)}`;
      setCreatedExcursionId(mockExcursionId);
      
      console.log("Enhanced Excursion created (mock):", {
        ...formData,
        id: mockExcursionId,
        images: uploadedImages.map(img => ({
          name: img.file.name,
          size: img.file.size,
          type: img.file.type
        })),
        heroImage: formData.heroImage ? {
          name: formData.heroImage.name,
          size: formData.heroImage.size,
          type: formData.heroImage.type
        } : null
      });

      setSuccessModalOpen(true);
      
      toast({
        title: "Success",
        description: "Excursion created successfully with all enhancements",
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
            Add a new excursion with comprehensive details to your catalog.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Basic Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the essential details for this excursion.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Excursion Name *</Label>
                <Input 
                  id="name" 
                  placeholder="Enter excursion name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input 
                  id="tagline" 
                  placeholder="Short descriptive phrase" 
                  value={formData.tagline}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
            </CardContent>
          </Card>

          {/* Hero Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Image</CardTitle>
              <CardDescription>
                Upload a banner image for this excursion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HeroImageUploader
                heroImage={formData.heroImage}
                onImageChange={handleHeroImageChange}
              />
            </CardContent>
          </Card>

          {/* Excursion Highlights */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Excursion Highlights</CardTitle>
              <CardDescription>
                Add key highlights and features of this excursion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HighlightsList
                highlights={formData.highlights}
                onChange={handleHighlightsChange}
              />
            </CardContent>
          </Card>

          {/* Gallery Images */}
          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>
                Upload additional images for the gallery.
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

          {/* Day Itinerary */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Day Itinerary (Timeline)</CardTitle>
              <CardDescription>
                Create a detailed timeline for the excursion activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DayItinerary
                itinerary={formData.itinerary}
                onChange={handleItineraryChange}
              />
            </CardContent>
          </Card>

          {/* Requirements & Restrictions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Requirements & Restrictions</CardTitle>
              <CardDescription>
                Specify requirements and restrictions for participants.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ageRestrictions">Age Restrictions</Label>
                <Input 
                  id="ageRestrictions" 
                  placeholder="e.g., Minimum age 12 years" 
                  value={formData.ageRestrictions}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fitnessLevel">Fitness Level Required</Label>
                <Select 
                  value={formData.fitnessLevel} 
                  onValueChange={(value) => handleSelectChange('fitnessLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Suitable for all</SelectItem>
                    <SelectItem value="moderate">Moderate - Some walking required</SelectItem>
                    <SelectItem value="high">High - Good fitness required</SelectItem>
                    <SelectItem value="extreme">Extreme - Excellent fitness required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">Medical Conditions & Warnings</Label>
                <Textarea 
                  id="medicalConditions" 
                  placeholder="Any medical conditions or health warnings" 
                  className="resize-none" 
                  rows={3}
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* What to Bring */}
          <Card>
            <CardHeader>
              <CardTitle>What to Bring</CardTitle>
              <CardDescription>
                List items participants should bring.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhatToBringList
                items={formData.whatToBring}
                onChange={handleWhatToBringChange}
              />
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>
                Logistics and additional information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <Label>What's Included</Label>
                <RepeatableInputList
                  items={formData.included}
                  onChange={handleIncludedChange}
                  placeholder="e.g., Local guide, Traditional lunch, Transportation"
                  maxItems={15}
                />
              </div>
              
              <div className="space-y-2">
                <Label>What's Not Included</Label>
                <RepeatableInputList
                  items={formData.notIncluded}
                  onChange={handleNotIncludedChange}
                  placeholder="e.g., Personal expenses, Travel insurance, Tips"
                  maxItems={15}
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure excursion settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
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
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor="featured" className="cursor-pointer">Feature this excursion</Label>
                    <Star className="h-4 w-4 text-amber-400" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-xs text-muted-foreground cursor-help">What does this do?</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Featured excursions appear on the homepage</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={handleSwitchChange('featured')}
                    className="data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="featured" className="ml-2 text-sm text-muted-foreground">
                    {formData.featured ? 'This excursion will be featured on the homepage' : 'This excursion will not be featured'}
                  </Label>
                </div>
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
