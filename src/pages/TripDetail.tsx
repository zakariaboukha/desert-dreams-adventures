import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ChevronLeft, Star, Users, Award, Shield, Utensils, Bed } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { navigateToBooking } from '@/utils/bookingNavigation';

interface Trip {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  images: string[];
  shortDescription: string;
  longDescription: string;
  category: string;
  difficulty: string;
  maxPeople: number;
  rating: number;
  reviewCount: number;
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }[];
  includes: string[];
  excludes: string[];
  meetingPoint: string;
  startTime: string;
  endTime: string;
  requirements: {
    ageRestrictions: string;
    fitnessLevel: string;
    medicalConditions: string;
    equipment: string;
  };
  cancellationPolicy: {
    rules: string;
    refundPolicy: string;
    weatherPolicy: string;
  };
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
  }[];
}

// Mock trip data with proper slugs
const mockTrips: Record<string, Trip> = {
  "coastal-adventure": {
    id: "coastal-adventure",
    title: "Coastal Adventure",
    location: "Mediterranean Coast",
    duration: "3 Days, 2 Nights",
    price: 450,
    images: [
      "/images/desert-dunes-1.jpg",
      "/images/4x4-desert-1.jpg",
      "/images/expedition-1.jpg"
    ],
    shortDescription: "Explore charming coastal towns and pristine beaches along the Mediterranean.",
    longDescription: "Embark on an extraordinary journey along the stunning Mediterranean coastline, where crystal-clear waters meet charming fishing villages and ancient history comes alive in every stone.",
    category: "Adventure",
    difficulty: "Easy",
    maxPeople: 15,
    rating: 4.6,
    reviewCount: 89,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Coastal Discovery",
        description: "Arrive at the Mediterranean coast and begin your coastal adventure.",
        activities: ["Check-in", "Coastal walk", "Welcome dinner"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Village Exploration",
        description: "Explore traditional fishing villages and enjoy water activities.",
        activities: ["Village tour", "Water sports", "Local cuisine tasting"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Farewell Coast",
        description: "Final coastal activities before departure.",
        activities: ["Beach time", "Souvenir shopping", "Departure"],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    includes: [
      "Accommodation for 2 nights",
      "All meals included",
      "Professional guide",
      "Transportation"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses"
    ],
    meetingPoint: "Hotel Marina",
    startTime: "09:00",
    endTime: "17:00",
    requirements: {
      ageRestrictions: "Suitable for all ages.",
      fitnessLevel: "Basic fitness required.",
      medicalConditions: "None specific.",
      equipment: "Comfortable shoes, swimwear, sun protection."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 48 hours before departure.",
      refundPolicy: "Refunds processed within 5-7 business days.",
      weatherPolicy: "Tours may be rescheduled due to weather."
    },
    reviews: [
      {
        id: "1",
        author: "Sarah Johnson",
        rating: 5,
        comment: "Amazing coastal adventure! Beautiful scenery and great guide.",
        date: "2024-01-15",
        verified: true
      }
    ]
  },
  "mountain-escape": {
    id: "mountain-escape",
    title: "Mountain Escape",
    location: "Rocky Mountains",
    duration: "4 Days, 3 Nights",
    price: 550,
    images: [
      "/images/expedition-1.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/4x4-desert-3.jpg"
    ],
    shortDescription: "Hiking and nature exploration through breathtaking mountain landscapes.",
    longDescription: "Discover the majestic Rocky Mountains on this immersive 4-day hiking adventure through pristine wilderness and stunning alpine landscapes.",
    category: "Adventure",
    difficulty: "Moderate",
    maxPeople: 12,
    rating: 4.8,
    reviewCount: 156,
    itinerary: [
      {
        day: 1,
        title: "Mountain Base Camp",
        description: "Arrive and set up at the mountain base camp.",
        activities: ["Check-in", "Equipment briefing", "Evening hike"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Summit Hiking",
        description: "Full day hiking to mountain peaks.",
        activities: ["Summit hike", "Wildlife watching", "Photography"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Alpine Lakes",
        description: "Explore beautiful alpine lakes and valleys.",
        activities: ["Lake exploration", "Rock climbing", "Stargazing"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Farewell Mountains",
        description: "Final mountain activities and departure.",
        activities: ["Morning hike", "Pack up", "Departure"],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    includes: [
      "Mountain lodge accommodation",
      "Hiking equipment",
      "Expert guides",
      "All meals"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal hiking gear"
    ],
    meetingPoint: "Mountain Lodge",
    startTime: "08:00",
    endTime: "16:00",
    requirements: {
      ageRestrictions: "Minimum age 16 years.",
      fitnessLevel: "Good fitness required for hiking.",
      medicalConditions: "Not suitable for heart conditions.",
      equipment: "Hiking boots, warm clothing, personal items."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 72 hours before departure.",
      refundPolicy: "Refunds processed within 5-7 business days.",
      weatherPolicy: "Tours may be cancelled due to severe weather."
    },
    reviews: [
      {
        id: "1",
        author: "Mike Chen",
        rating: 5,
        comment: "Incredible mountain experience! The guides were excellent.",
        date: "2024-01-10",
        verified: true
      }
    ]
  },
  "city-highlights": {
    id: "city-highlights",
    title: "City Highlights",
    location: "Paris, France",
    duration: "5 Days, 4 Nights",
    price: 750,
    images: [
      "/images/desert-dunes-3.jpg",
      "/images/expedition-2.jpg",
      "/images/4x4-desert-1.jpg"
    ],
    shortDescription: "Discover iconic landmarks and hidden gems in the City of Light.",
    longDescription: "Experience the magic of Paris with our comprehensive city tour covering iconic landmarks, world-class museums, and charming neighborhoods.",
    category: "Cultural",
    difficulty: "Easy",
    maxPeople: 20,
    rating: 4.5,
    reviewCount: 203,
    itinerary: [
      {
        day: 1,
        title: "Paris Arrival",
        description: "Arrive in Paris and explore the city center.",
        activities: ["Check-in", "City orientation", "Seine cruise"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Classic Paris",
        description: "Visit iconic landmarks and museums.",
        activities: ["Eiffel Tower", "Louvre Museum", "Champs-Élysées"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Montmartre & Culture",
        description: "Explore artistic Montmartre and cultural sites.",
        activities: ["Sacré-Cœur", "Artist quarters", "Moulin Rouge"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Hidden Paris",
        description: "Discover secret spots and local neighborhoods.",
        activities: ["Local markets", "Hidden gardens", "Café culture"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Au Revoir Paris",
        description: "Final morning in Paris before departure.",
        activities: ["Last-minute shopping", "Farewell lunch", "Departure"],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    includes: [
      "4-star hotel accommodation",
      "Museum entrance fees",
      "Professional city guide",
      "Metro passes"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses"
    ],
    meetingPoint: "Hotel Lobby",
    startTime: "09:00",
    endTime: "18:00",
    requirements: {
      ageRestrictions: "Suitable for all ages.",
      fitnessLevel: "Basic walking required.",
      medicalConditions: "None specific.",
      equipment: "Comfortable walking shoes, camera."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 48 hours before departure.",
      refundPolicy: "Refunds processed within 5-7 business days.",
      weatherPolicy: "Tours continue in most weather conditions."
    },
    reviews: [
      {
        id: "1",
        author: "Emma Rodriguez",
        rating: 4,
        comment: "Great city tour! Saw all the major sights and learned a lot.",
        date: "2024-01-05",
        verified: true
      }
    ]
  },
  "cultural-journey": {
    id: "cultural-journey",
    title: "Cultural Journey",
    location: "Kyoto, Japan",
    duration: "6 Days, 5 Nights",
    price: 850,
    images: [
      "/images/4x4-desert-3.jpg",
      "/images/desert-dunes-1.jpg",
      "/images/expedition-1.jpg"
    ],
    shortDescription: "Experience traditional culture and cuisine in Japan's ancient capital.",
    longDescription: "Immerse yourself in the timeless beauty and rich traditions of Kyoto, where ancient temples, traditional gardens, and authentic cultural experiences await.",
    category: "Cultural",
    difficulty: "Easy",
    maxPeople: 16,
    rating: 4.9,
    reviewCount: 178,
    itinerary: [
      {
        day: 1,
        title: "Welcome to Kyoto",
        description: "Arrive and experience traditional Japanese hospitality.",
        activities: ["Ryokan check-in", "Welcome tea ceremony", "Evening walk"],
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Golden Pavilion",
        description: "Visit the famous golden temple and zen gardens.",
        activities: ["Kinkaku-ji temple", "Zen meditation", "Garden tour"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Bamboo Forest",
        description: "Walk through the mystical bamboo groves.",
        activities: ["Bamboo forest", "Monkey park", "Traditional lunch"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Geisha District",
        description: "Explore traditional Gion district.",
        activities: ["Gion walking tour", "Tea house visit", "Traditional performance"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Temple Complex",
        description: "Visit the famous Fushimi Inari shrine.",
        activities: ["Thousand torii gates", "Sake tasting", "Farewell dinner"],
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Sayonara Kyoto",
        description: "Final morning and departure.",
        activities: ["Final temple visit", "Souvenir shopping", "Departure"],
        meals: ["Breakfast", "Lunch"]
      }
    ],
    includes: [
      "Traditional ryokan stay",
      "Tea ceremony lesson",
      "Temple entrance fees",
      "Cultural guide"
    ],
    excludes: [
      "International flights",
      "Travel insurance",
      "Personal expenses"
    ],
    meetingPoint: "Kyoto Station",
    startTime: "09:00",
    endTime: "17:00",
    requirements: {
      ageRestrictions: "Suitable for all ages.",
      fitnessLevel: "Basic walking required.",
      medicalConditions: "None specific.",
      equipment: "Comfortable shoes, respectful clothing for temples."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 48 hours before departure.",
      refundPolicy: "Refunds processed within 5-7 business days.",
      weatherPolicy: "Tours continue in most weather conditions."
    },
    reviews: [
      {
        id: "1",
        author: "John Smith",
        rating: 5,
        comment: "Absolutely magical! Perfect introduction to Japanese culture.",
        date: "2024-01-08",
        verified: true
      }
    ]
  }
};

function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{name?: string; rating?: string; text?: string}>({});
  
  const minReviewLength = 10;

  // Review form validation
  const validateReview = () => {
    const newErrors: {name?: string; rating?: string; text?: string} = {};
    
    if (!reviewName.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (reviewRating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!reviewText.trim()) {
      newErrors.text = 'Review text is required';
    } else if (reviewText.trim().length < minReviewLength) {
      newErrors.text = `Review must be at least ${minReviewLength} characters long`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Review form submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateReview()) {
      console.log('Review submitted:', {
        name: reviewName,
        rating: reviewRating,
        text: reviewText
      });
      
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setReviewName('');
        setReviewRating(0);
        setHoverRating(0);
        setReviewText('');
        setSubmitted(false);
        setErrors({});
      }, 2000);
    }
  };

  useEffect(() => {
    // Look up trip by slug
    if (id && mockTrips[id]) {
      setTrip(mockTrips[id]);
    } else {
      setTrip(null);
    }
  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Trip Not Found</h2>
          <p className="text-muted-foreground mb-4">The trip you're looking for doesn't exist.</p>
          <Link to="/destinations" className="text-primary hover:text-primary/80">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const getDayIcon = (day: number) => {
    switch (day) {
      case 1: return '🌅';
      case 2: return '🏜️';
      case 3: return '🌴';
      default: return '📅';
    }
  };

  const handleBookNow = () => {
    if (trip) {
      navigateToBooking(navigate, {
        type: 'trip',
        id: trip.id,
        name: trip.title,
        price: trip.price,
        location: trip.location,
        duration: trip.duration,
        image: trip.images?.[0]
      });
    }
  };
  


  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Reduced padding */}
      <div className="relative pt-24 pb-4">
        <div className="container-custom">
          <Link to="/destinations" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-3 transition-all">
            <ChevronLeft size={18} className="mr-1" />
            Back to All Destinations
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                <img 
                  src={trip.images[currentImageIndex]} 
                  alt={trip.title}
                  className="w-full h-80 object-cover"
                />
              </div>
              
              {trip.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {trip.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${trip.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Trip Info - Tightened spacing */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{trip.category}</Badge>
                  <Badge variant="outline">{trip.difficulty}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{trip.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-1" />
                    {trip.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-1" />
                    {trip.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-1" />
                    Max {trip.maxPeople} people
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {renderStars(trip.rating)}
                  </div>
                  <span className="font-medium">{trip.rating}</span>
                  <span className="text-muted-foreground">({trip.reviewCount} reviews)</span>
                </div>
                
                <p className="text-lg text-muted-foreground">{trip.shortDescription}</p>
              </div>
              
              <div className="bg-secondary p-5 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-3xl font-bold">${trip.price}</div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-1" />
                      {trip.startTime} - {trip.endTime}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={16} className="mr-1" />
                      {trip.meetingPoint}
                    </div>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8">
            {/* Trip Details */}
            <div>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>About This Trip</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-foreground/80 leading-relaxed">
                        {trip.longDescription}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Trip Highlights</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <CheckCircle className="text-green-500 shrink-0 mr-3" size={20} />
                            <span>Mountain lodge accommodation</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="text-green-500 shrink-0 mr-3" size={20} />
                            <span>Expert guides</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <CheckCircle className="text-green-500 shrink-0 mr-3" size={20} />
                            <span>Hiking equipment</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="text-green-500 shrink-0 mr-3" size={20} />
                            <span>All meals</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="itinerary" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Day by Day Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {trip.itinerary.map((item, index) => (
                          <div key={index} className="border-l-2 border-green-200 pl-4 pb-6 last:pb-0">
                            <div className="flex items-start">
                              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium -ml-6 mr-4 shrink-0">
                                {item.day}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-muted-foreground mb-3">{item.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <h5 className="font-medium mb-1">Activities</h5>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {item.activities.map((activity, activityIndex) => (
                                        <li key={activityIndex}>• {activity}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h5 className="font-medium mb-1 flex items-center">
                                      <Utensils size={16} className="mr-1" />
                                      Meals
                                    </h5>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                      {item.meals.map((meal, mealIndex) => (
                                        <li key={mealIndex}>• {meal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                {item.accommodation && (
                                  <div className="mt-2">
                                    <h5 className="font-medium mb-1 flex items-center">
                                      <Bed size={16} className="mr-1" />
                                      Accommodation
                                    </h5>
                                    <p className="text-sm text-muted-foreground">{item.accommodation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">What's Included</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {trip.includes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="text-green-500 shrink-0 mr-2 mt-1" size={18} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">What's Not Included</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {trip.excludes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <XCircle className="text-red-500 shrink-0 mr-2 mt-1" size={18} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements & Restrictions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Age Restrictions</h4>
                        <p className="text-sm text-muted-foreground">{trip.requirements.ageRestrictions}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Fitness Level</h4>
                        <p className="text-sm text-muted-foreground">{trip.requirements.fitnessLevel}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Medical Conditions</h4>
                        <p className="text-sm text-muted-foreground">{trip.requirements.medicalConditions}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">What to Bring</h4>
                        <p className="text-sm text-muted-foreground">{trip.requirements.equipment}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  <CardTitle>Customer Reviews</CardTitle>
                  <div className="flex items-center gap-2">
                    {renderStars(trip.rating)}
                    <span className="font-medium">{trip.rating}</span>
                    <span className="text-muted-foreground">({trip.reviewCount} reviews)</span>
                  </div>
                
                  {trip.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author}</span>
                          {review.verified && (
                            <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-foreground/90 mt-2">{review.comment}</p>
                    </div>
                  ))}
                
                  {/* New: Write a Review Form (strictly below existing reviews) */}
                  <div className="pt-6 mt-2 border-t">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                
                    {submitted && (
                      <div className="mb-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Thank you for your review!</p>
                          <p className="text-sm text-green-700/90">Your feedback helps other travelers.</p>
                        </div>
                      </div>
                    )}
                
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="review-name" className="block text-sm font-medium mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="review-name"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Your name"
                          aria-invalid={!!errors.name}
                          className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                
                      {/* Rating */}
                      <div>
                        <span className="block text-sm font-medium mb-1">
                          Rating <span className="text-red-500">*</span>
                        </span>
                        <div className="flex items-center" style={{ display: 'flex', gap: '6px' }}>
                          {[1, 2, 3, 4, 5].map((i) => {
                            const active = (hoverRating ?? reviewRating ?? 0) >= i;
                            return (
                              <button
                                type="button"
                                key={i}
                                onMouseEnter={() => setHoverRating(i)}
                                onMouseLeave={() => setHoverRating(null)}
                                onClick={() => setReviewRating(i)}
                                aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                                className="p-1 inline-flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 rounded"
                                style={{ 
                                  display: 'inline-flex',
                                  minWidth: '32px',
                                  minHeight: '32px'
                                }}
                              >
                                <Star
                                  className={active 
                                    ? "fill-yellow-500 text-yellow-500 hover:fill-orange-400 hover:text-orange-400" 
                                    : "text-gray-300 hover:text-yellow-400"
                                  }
                                  size={24}
                                />
                              </button>
                            );
                          })}
                        </div>
                        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                      </div>
                
                      {/* Written Review */}
                      <div>
                        <label htmlFor="review-text" className="block text-sm font-medium mb-1">
                          Your Review <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="review-text"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience..."
                          rows={5}
                          aria-invalid={!!errors.text}
                          className={errors.text ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{reviewText.trim().length}/{minReviewLength} minimum characters</span>
                        </div>
                        {errors.text && <p className="mt-1 text-sm text-red-600">{errors.text}</p>}
                      </div>
                
                      {/* Submit */}
                      <Button
                        type="submit"
                        className="
                          w-full h-12 rounded-lg
                          bg-[#D4AF37] text-white
                          border-2 border-[#C4902F]
                          hover:bg-[#C4902F]
                          transition-colors transition-shadow duration-200
                          shadow-md hover:shadow-lg
                          focus-visible:outline-none
                          focus-visible:ring-2 focus-visible:ring-ring
                          focus-visible:ring-offset-2 focus-visible:ring-offset-background
                        "
                      >
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TripDetail;


