import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight, Star, Users, Clock, Mountain, Utensils, Camera, Building, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { navigateToBooking } from '@/utils/bookingNavigation';

export interface TripCardProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  images?: string[];
  image?: string;
  description: string;
  category?: string;
  difficulty?: string;
  rating?: number;
  reviewCount?: number;
  maxPeople?: number;
  highlights?: string[];
  startTime?: string;
  endTime?: string;
  includes?: string[];
  activities?: Array<{
    type: 'hiking' | 'food' | 'city' | 'adventure' | 'culture' | 'nature';
    name: string;
    time?: string;
  }>;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
  detailPath?: string;
  // Add new prop for booking type
  bookingType?: 'trip' | 'excursion';
  // NEW: slug for trip deep-linking
  slug?: string;
}

const TripCard: React.FC<TripCardProps> = ({
  id,
  title,
  location,
  duration,
  price,
  images,
  image,
  description,
  category = "Adventure",
  difficulty = "Moderate",
  rating = 4.5,
  reviewCount = 50,
  maxPeople = 12,
  highlights = [],
  startTime,
  endTime,
  includes = [],
  activities = [],
  isExpanded = false,
  onToggleExpanded,
  detailPath,
  bookingType = 'trip', // Default to trip for backward compatibility
  slug, // NEW
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
  // Update the handleBookNow function to pass complete data
  const handleBookNow = () => {
    const primaryImage = images?.[0] || image || "/images/desert-dunes-1.jpg";
    
    // NEW: If it's a trip and we have a slug, deep-link using ?trip=slug
    if (bookingType === 'trip' && slug) {
      navigate(`/booking?trip=${encodeURIComponent(slug)}`);
      return;
    }
    // NEW: If it's an excursion and we have a slug, deep-link using ?excursion=slug
    if (bookingType === 'excursion' && slug) {
      navigate(`/booking?excursion=${encodeURIComponent(slug)}`);
      return;
    }

    navigateToBooking(navigate, {
      type: bookingType,
      id: id,
      name: title,
      price: price,
      location: location,
      duration: duration,
      image: primaryImage
    });
  };

  // Create default images array if not provided
  const cardImages = images || (image ? [image] : [
    "/images/desert-dunes-1.jpg",
    "/images/4x4-desert-1.jpg",
    "/images/expedition-1.jpg"
  ]);

  // Default activities based on trip type
  const defaultActivities = activities.length > 0 ? activities : [
    { type: 'hiking' as const, name: 'Mountain Hiking', time: 'Morning' },
    { type: 'food' as const, name: 'Local Cuisine', time: 'Afternoon' },
    { type: 'culture' as const, name: 'Cultural Sites', time: 'Evening' },
    { type: 'adventure' as const, name: 'Adventure Activities', time: 'Full Day' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
      />
    ));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hiking': return <Mountain size={16} className="text-green-600" />;
      case 'food': return <Utensils size={16} className="text-orange-600" />;
      case 'city': return <Building size={16} className="text-blue-600" />;
      case 'adventure': return <Camera size={16} className="text-purple-600" />;
      case 'culture': return <Building size={16} className="text-indigo-600" />;
      case 'nature': return <Mountain size={16} className="text-green-600" />;
      default: return <MapPin size={16} className="text-gray-600" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'challenging': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cardImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cardImages.length) % cardImages.length);
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-card">
      {/* Image Carousel Container */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={cardImages[currentImageIndex]} 
          alt={`${title} - Image ${currentImageIndex + 1}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Image Navigation */}
        {cardImages.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {cardImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">{category}</Badge>
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(difficulty)} border`}
          >
            {difficulty}
          </Badge>
        </div>
        
        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-primary py-2 px-4 rounded-full text-primary-foreground font-bold text-lg shadow-lg">
          ${price}
          <span className="text-xs font-normal block">per person</span>
        </div>
        
        {/* Image Count */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs flex items-center">
          <Eye size={12} className="mr-1" />
          {cardImages.length}
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Location and Duration */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground">
            <MapPin size={16} className="mr-2 shrink-0 text-primary" />
            <span className="text-sm font-medium">{location}</span>
          </div>
          
          <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 shrink-0 text-primary" />
              <span className="text-sm font-medium">{duration}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1 shrink-0 text-primary" />
              <span className="text-sm font-medium">Max {maxPeople}</span>
            </div>
          </div>
          
          {/* Time Information */}
          {startTime && endTime && (
            <div className="flex items-center text-muted-foreground">
              <Clock size={16} className="mr-2 shrink-0 text-primary" />
              <span className="text-sm font-medium">{startTime} - {endTime}</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-foreground/80 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Activity Icons */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {defaultActivities.slice(0, 4).map((activity, index) => (
              <div key={index} className="flex items-center bg-secondary/20 rounded-full px-3 py-1 text-xs">
                {getActivityIcon(activity.type)}
                <span className="ml-1 font-medium">{activity.name}</span>
                {activity.time && (
                  <span className="ml-1 text-muted-foreground">({activity.time})</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Expandable Tabs Section */}
        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <div className="space-y-3">
                  {highlights.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Highlights:</h5>
                      <ul className="text-xs space-y-1">
                        {highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="mt-4">
                <div className="space-y-2">
                  {defaultActivities.map((activity, index) => (
                    <div key={index} className="flex items-center text-xs border-l-2 border-primary/30 pl-3 py-1">
                      {getActivityIcon(activity.type)}
                      <span className="ml-2 font-medium">{activity.name}</span>
                      {activity.time && (
                        <span className="ml-auto text-muted-foreground">{activity.time}</span>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                <div className="space-y-2">
                  {includes.length > 0 ? (
                    <div>
                      <h5 className="font-semibold text-sm mb-2">What's Included:</h5>
                      <ul className="text-xs space-y-1">
                        {includes.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-600 mr-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Detailed information available on trip page.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{rating}/5.0</span>
                    <span className="text-xs text-muted-foreground">{reviewCount} reviews</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Amazing experience! Highly recommend this trip for anyone looking for adventure."
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        <Separator className="my-4" />
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Link 
            to={detailPath || `/trips/${id}`} 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            View Details
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="flex gap-2">
            {/* Removed the 'More Info' toggle button */}
            <Button size="sm" className="px-6 font-semibold" onClick={handleBookNow}>
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;