import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ImageUploader from '@/components/admin/ImageUploader';
import CreationSuccessModal from '@/components/admin/CreationSuccessModal';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// Enhanced interface to match TripDetail structure
interface TripFormData {
  name: string;
  tagline: string;
  category: string;
  price: string;
  duration: string;
  overview: string;
  highlights: string;
  maxPeople: string;
  status: 'active' | 'inactive';
  featured: boolean;
  meetingPoint: string;
  startTime: string;
  endTime: string;
  included: string[]; // Changed from string to string[]
  notIncluded: string[]; // Changed from string to string[]
  heroImage: File | null;
  requirements: {
    ageRestrictions: string;
    fitnessLevel: 'Easy' | 'Moderate' | 'Hard' | '';
    medicalConditions: string;
    equipment: string;
  };
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[]; // Enhanced: structured activities list
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  }; // New: meal checkboxes
  accommodation?: string;
}

// RepeatableInputList Component (copied from ExcursionCreate)
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
      onChange(items.filter((_, i) => i !== index));
    }
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
            placeholder={placeholder}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1"
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

const TripCreate: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  
  // Enhanced form data state
  const [formData, setFormData] = useState<TripFormData>({
    name: '',
    tagline: '',
    category: '',
    price: '',
    duration: '',
    overview: '',
    highlights: '',
    maxPeople: '',
    status: 'active',
    featured: false,
    meetingPoint: '',
    startTime: '',
    endTime: '',
    included: [''], // Changed from empty string to array with one empty string
    notIncluded: [''], // Changed from empty string to array with one empty string
    heroImage: null,
    requirements: {
      ageRestrictions: '',
      fitnessLevel: '',
      medicalConditions: '',
      equipment: ''
    }
  });

  // Enhanced itinerary state with activities and meals
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    {
      day: 1,
      title: '',
      description: '',
      activities: [],
      meals: { breakfast: false, lunch: false, dinner: false }
    }
  ]);

  const [newActivity, setNewActivity] = useState<{ [key: number]: string }>({});

  // Form validation
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.category !== '' &&
      formData.price.trim() !== '' &&
      formData.duration.trim() !== '' &&
      formData.overview.trim() !== '' &&
      formData.maxPeople.trim() !== '' &&
      formData.meetingPoint.trim() !== '' &&
      formData.startTime.trim() !== '' &&
      formData.endTime.trim() !== '' &&
      itinerary.every(day => day.title.trim() !== '' && day.description.trim() !== '')
      // Note: tagline is optional, so no validation required
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    try {
      const tripData = {
        ...formData,
        itinerary,
        images: uploadedImages,
        heroImage: formData.heroImage
      };
      
      console.log('Creating trip with data:', tripData);
      // API call would go here
      
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccessModal(true);
      }, 2000);
    } catch (error) {
      console.error('Error creating trip:', error);
      setIsLoading(false);
    }
  };

  // Itinerary management functions
  const addItineraryDay = () => {
    setItinerary([...itinerary, {
      day: itinerary.length + 1,
      title: '',
      description: '',
      activities: [],
      meals: { breakfast: false, lunch: false, dinner: false }
    }]);
  };

  const removeItineraryDay = (index: number) => {
    if (itinerary.length > 1) {
      const newItinerary = itinerary.filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 }));
      setItinerary(newItinerary);
    }
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: any) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setItinerary(newItinerary);
  };

  // Activity management functions
  const addActivity = (dayIndex: number) => {
    const activity = newActivity[dayIndex]?.trim();
    if (activity) {
      const newItinerary = [...itinerary];
      newItinerary[dayIndex].activities.push(activity);
      setItinerary(newItinerary);
      setNewActivity({ ...newActivity, [dayIndex]: '' });
    }
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(newItinerary);
  };

  // Meal management functions
  const updateMeal = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', checked: boolean) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].meals[mealType] = checked;
    setItinerary(newItinerary);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create New Trip</h1>
        <p className="text-muted-foreground">Add a new multi-day adventure to your catalog</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Trip Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter trip name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* New: Trip Tagline Field */}
            <div>
              <Label htmlFor="tagline">Trip Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Enter a short tagline for this trip"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 5 days"
                />
              </div>
              <div>
                <Label htmlFor="maxPeople">Max People *</Label>
                <Input
                  id="maxPeople"
                  type="number"
                  value={formData.maxPeople}
                  onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="overview">Tour Overview *</Label>
              <Textarea
                id="overview"
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                placeholder="Describe the tour overview"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="highlights">Highlights *</Label>
              <Textarea
                id="highlights"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                placeholder="List the key highlights"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                      <Label htmlFor="featured">Featured Trip</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Featured trips appear prominently on the homepage</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        {/* Hero/Feature Image Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero/Feature Image</CardTitle>
            <p className="text-sm text-muted-foreground">Upload the main hero image that will be displayed prominently at the top of the trip page</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Hero Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData({ ...formData, heroImage: file });
                  }}
                  className="hidden"
                  id="hero-image-upload"
                />
                <label htmlFor="hero-image-upload" className="cursor-pointer">
                  {formData.heroImage ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(formData.heroImage)}
                        alt="Hero preview"
                        className="mx-auto h-32 w-48 object-cover rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground">{formData.heroImage.name}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData({ ...formData, heroImage: null });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <Plus className="h-full w-full" />
                      </div>
                      <p className="text-sm text-muted-foreground">Click to upload hero image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Images */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <p className="text-sm text-muted-foreground">Upload additional images for the trip gallery (max 5 files)</p>
          </CardHeader>
          <CardContent>
            <ImageUploader
              onImagesChange={setUploadedImages}
              maxFiles={5}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
            />
          </CardContent>
        </Card>

        {/* Tour Itinerary with Enhanced Features */}
        <Card>
          <CardHeader>
            <CardTitle>Tour Itinerary</CardTitle>
            <p className="text-sm text-muted-foreground">Plan each day of the trip with activities and meals</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {itinerary.map((day, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Day {day.day}</h4>
                  {itinerary.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItineraryDay(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Day Title *</Label>
                    <Input
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                      placeholder="e.g., Arrival in Marrakech"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description *</Label>
                  <Textarea
                    value={day.description}
                    onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                    placeholder="Describe what happens on this day"
                    rows={3}
                  />
                </div>

                {/* Daily Activities Section */}
                <div>
                  <Label className="text-base font-medium">Daily Activities</Label>
                  <div className="space-y-3 mt-2">
                    <div className="flex gap-2">
                      <Input
                        value={newActivity[index] || ''}
                        onChange={(e) => setNewActivity({ ...newActivity, [index]: e.target.value })}
                        placeholder="Add an activity for this day"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addActivity(index);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addActivity(index)}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {day.activities.length > 0 && (
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{activity}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeActivity(index, activityIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Daily Meals Section */}
                <div>
                  <Label className="text-base font-medium">Meals Included</Label>
                  <div className="flex gap-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`breakfast-${index}`}
                        checked={day.meals.breakfast}
                        onCheckedChange={(checked) => updateMeal(index, 'breakfast', checked as boolean)}
                      />
                      <Label htmlFor={`breakfast-${index}`}>Breakfast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`lunch-${index}`}
                        checked={day.meals.lunch}
                        onCheckedChange={(checked) => updateMeal(index, 'lunch', checked as boolean)}
                      />
                      <Label htmlFor={`lunch-${index}`}>Lunch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`dinner-${index}`}
                        checked={day.meals.dinner}
                        onCheckedChange={(checked) => updateMeal(index, 'dinner', checked as boolean)}
                      />
                      <Label htmlFor={`dinner-${index}`}>Dinner</Label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button type="button" onClick={addItineraryDay} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Day
            </Button>
          </CardContent>
        </Card>

        {/* Requirements & Restrictions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Restrictions</CardTitle>
            <p className="text-sm text-muted-foreground">Specify trip requirements and what participants need to know</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ageRestrictions">Age Restrictions</Label>
                <Input
                  id="ageRestrictions"
                  value={formData.requirements.ageRestrictions}
                  onChange={(e) => setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, ageRestrictions: e.target.value }
                  })}
                  placeholder="e.g., 18+ years, Family-friendly"
                />
              </div>
              <div>
                <Label htmlFor="fitnessLevel">Fitness Level Required</Label>
                <Select
                  value={formData.requirements.fitnessLevel}
                  onValueChange={(value: 'Easy' | 'Moderate' | 'Hard') => setFormData({
                    ...formData,
                    requirements: { ...formData.requirements, fitnessLevel: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitness level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="medicalConditions">Medical Conditions & Health Requirements</Label>
              <Textarea
                id="medicalConditions"
                value={formData.requirements.medicalConditions}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, medicalConditions: e.target.value }
                })}
                placeholder="Specify any medical conditions that may prevent participation or require special attention"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="equipment">What to Bring</Label>
              <Textarea
                id="equipment"
                value={formData.requirements.equipment}
                onChange={(e) => setFormData({
                  ...formData,
                  requirements: { ...formData.requirements, equipment: e.target.value }
                })}
                placeholder="List essential items participants should bring (clothing, equipment, documents, etc.)"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="meetingPoint">Meeting Point *</Label>
              <Input
                id="meetingPoint"
                value={formData.meetingPoint}
                onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                placeholder="Where participants should meet"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>What's Included</Label>
              <RepeatableInputList
                items={formData.included}
                onChange={(items: string[]) => setFormData(prev => ({ ...prev, included: items }))}
                placeholder="e.g., Local guide, Traditional lunch, Transportation"
                maxItems={15}
              />
            </div>
            
            <div className="space-y-2">
              <Label>What's Not Included</Label>
              <RepeatableInputList
                items={formData.notIncluded}
                onChange={(items: string[]) => setFormData(prev => ({ ...prev, notIncluded: items }))}
                placeholder="e.g., Personal expenses, Travel insurance, Tips"
                maxItems={15}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/trips')}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Trip...
              </>
            ) : (
              'Create Trip'
            )}
          </Button>
        </div>
      </div>

      <CreationSuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        entityType="Trip"
        entityName={formData.name || "New Trip"}
        viewPath="/admin/trips"
        onCreateAnother={() => {
          setShowSuccessModal(false);
          // Reset form or navigate to create another trip
          window.location.reload(); // Simple reset, or implement proper form reset
        }}
      />
    </div>
  );
};

export default TripCreate;