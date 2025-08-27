import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ChevronLeft, Star, Users, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { navigateToBooking } from '@/utils/bookingNavigation';

interface Excursion {
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
    time: string;
    period: 'Morning' | 'Late Morning' | 'Afternoon' | 'Evening';
    activity: string;
    description: string;
    icon: string;
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

// Mock excursion data with proper slugs
const mockExcursions: Record<string, Excursion> = {
  "atlas-hike": {
    id: "atlas-hike",
    title: "Atlas Hike",
    location: "Atlas Mountains, Morocco",
    duration: "1 Day (8 hours)",
    price: 100,
    images: [
      "/images/expedition-1.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/4x4-desert-3.jpg"
    ],
    shortDescription: "Hike through the stunning Atlas Mountains and discover breathtaking views.",
    longDescription: "Experience the magnificent Atlas Mountains on this full-day hiking adventure through Morocco's highest peaks, traditional Berber villages, and stunning mountain landscapes.",
    category: "Adventure",
    difficulty: "Moderate",
    maxPeople: 12,
    rating: 4.6,
    reviewCount: 78,
    itinerary: [
      {
        time: "08:00",
        period: "Morning",
        activity: "Mountain Base Departure",
        description: "Meet at base camp and begin ascent through mountain trails.",
        icon: "🏔️"
      },
      {
        time: "12:00",
        period: "Afternoon",
        activity: "Summit Views & Lunch",
        description: "Reach scenic viewpoints and enjoy traditional Berber lunch.",
        icon: "🍽️"
      },
      {
        time: "15:00",
        period: "Afternoon",
        activity: "Village Visit",
        description: "Visit authentic Berber village and learn about mountain culture.",
        icon: "🏘️"
      },
      {
        time: "17:00",
        period: "Evening",
        activity: "Return Journey",
        description: "Descend mountain trails and return to base camp.",
        icon: "🚶"
      }
    ],
    includes: [
      "Professional mountain guide",
      "Hiking equipment",
      "Traditional lunch",
      "Transportation to/from base"
    ],
    excludes: [
      "Personal hiking gear",
      "Travel insurance",
      "Tips for guides"
    ],
    meetingPoint: "Atlas Mountain Base Camp",
    startTime: "08:00",
    endTime: "18:00",
    requirements: {
      ageRestrictions: "Minimum age 14 years. Under 18 must be accompanied.",
      fitnessLevel: "Good fitness required for mountain hiking.",
      medicalConditions: "Not suitable for heart conditions or severe asthma.",
      equipment: "Hiking boots, warm clothing, personal water bottle."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 24 hours before departure.",
      refundPolicy: "Full refund for cancellations made 24+ hours in advance.",
      weatherPolicy: "Tours may be cancelled due to severe mountain weather."
    },
    reviews: [
      {
        id: "1",
        author: "Lisa Thompson",
        rating: 5,
        comment: "Amazing mountain hike! Great views and excellent guide.",
        date: "2024-01-20",
        verified: true
      }
    ]
  },
  "oasis-visit": {
    id: "oasis-visit",
    title: "Oasis Visit",
    location: "Sahara Desert, Morocco",
    duration: "1 Day (10 hours)",
    price: 150,
    images: [
      "/images/desert-dunes-1.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/camel-ride.jpg"
    ],
    shortDescription: "Discover hidden oases in the desert and experience traditional Berber culture.",
    longDescription: "Journey into the heart of the Sahara to discover hidden oases where life flourishes in the desert, and experience the authentic culture of the Berber people.",
    category: "Adventure",
    difficulty: "Easy",
    maxPeople: 15,
    rating: 4.7,
    reviewCount: 92,
    itinerary: [
      {
        time: "08:00",
        period: "Morning",
        activity: "Desert Journey Begins",
        description: "Start journey into the Sahara Desert towards hidden oasis.",
        icon: "🚗"
      },
      {
        time: "11:00",
        period: "Late Morning",
        activity: "Oasis Discovery",
        description: "Arrive at oasis and explore palm groves and natural springs.",
        icon: "🌴"
      },
      {
        time: "13:00",
        period: "Afternoon",
        activity: "Berber Culture & Lunch",
        description: "Experience Berber hospitality with traditional lunch and culture.",
        icon: "🍽️"
      },
      {
        time: "16:00",
        period: "Evening",
        activity: "Return Journey",
        description: "Journey back through desert landscapes with sunset views.",
        icon: "🌅"
      }
    ],
    includes: [
      "4x4 desert transportation",
      "Professional guide",
      "Traditional lunch",
      "Oasis exploration",
      "Cultural experience"
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Tips for guides"
    ],
    meetingPoint: "Desert Gateway Center",
    startTime: "08:00",
    endTime: "18:00",
    requirements: {
      ageRestrictions: "Suitable for all ages. Children under 12 with adult.",
      fitnessLevel: "Basic fitness required for walking on sand.",
      medicalConditions: "Not recommended for pregnant women.",
      equipment: "Sun hat, sunscreen, comfortable shoes, camera."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 24 hours before departure.",
      refundPolicy: "Full refund for cancellations made 24+ hours in advance.",
      weatherPolicy: "Tours may be cancelled due to extreme weather."
    },
    reviews: [
      {
        id: "1",
        author: "Ahmed Hassan",
        rating: 5,
        comment: "Incredible oasis experience! Very authentic and well organized.",
        date: "2024-01-18",
        verified: true
      }
    ]
  },
  "desert-safari": {
    id: "desert-safari",
    title: "Desert Safari",
    location: "Sahara Desert, Morocco",
    duration: "1 Day (10 hours)",
    price: 120,
    images: [
      "/images/4x4-desert-1.jpg",
      "/images/desert-dunes-1.jpg",
      "/images/4x4-desert-3.jpg"
    ],
    shortDescription: "Experience thrilling 4x4 desert activities and stunning dune landscapes.",
    longDescription: "Get your adrenaline pumping with this action-packed desert safari featuring thrilling 4x4 dune bashing, sandboarding, and spectacular desert landscapes.",
    category: "Adventure",
    difficulty: "Moderate",
    maxPeople: 12,
    rating: 4.8,
    reviewCount: 156,
    itinerary: [
      {
        time: "08:00",
        period: "Morning",
        activity: "4x4 Adventure Begins",
        description: "Start thrilling 4x4 journey into the desert dunes.",
        icon: "🚙"
      },
      {
        time: "11:00",
        period: "Late Morning",
        activity: "Dune Bashing",
        description: "Experience exciting dune bashing across massive sand dunes.",
        icon: "🏔️"
      },
      {
        time: "13:00",
        period: "Afternoon",
        activity: "Desert Lunch & Sandboarding",
        description: "Enjoy lunch and try sandboarding on the dunes.",
        icon: "🏄"
      },
      {
        time: "16:00",
        period: "Evening",
        activity: "Sunset Safari",
        description: "Final desert drive with stunning sunset views.",
        icon: "🌅"
      }
    ],
    includes: [
      "4x4 vehicle and driver",
      "Professional guide",
      "Sandboarding equipment",
      "Traditional lunch",
      "All safety equipment"
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Tips for guides"
    ],
    meetingPoint: "Safari Base Camp",
    startTime: "08:00",
    endTime: "18:00",
    requirements: {
      ageRestrictions: "Minimum age 16 years for dune bashing.",
      fitnessLevel: "Good fitness required for active adventures.",
      medicalConditions: "Not suitable for pregnant women or back problems.",
      equipment: "Comfortable clothes, closed shoes, sunglasses."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 24 hours before departure.",
      refundPolicy: "Full refund for cancellations made 24+ hours in advance.",
      weatherPolicy: "Tours may be cancelled due to extreme weather."
    },
    reviews: [
      {
        id: "1",
        author: "Mike Johnson",
        rating: 5,
        comment: "Incredible adrenaline rush! Best desert safari experience ever.",
        date: "2024-01-15",
        verified: true
      }
    ]
  },
  "berber-village-tour": {
    id: "berber-village-tour",
    title: "Berber Village Tour",
    location: "High Atlas, Morocco",
    duration: "1 Day (8 hours)",
    price: 80,
    images: [
      "/images/expedition-2.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/expedition-1.jpg"
    ],
    shortDescription: "Visit authentic Berber villages and learn about traditional mountain life.",
    longDescription: "Immerse yourself in the authentic culture of the Berber people with visits to traditional mountain villages, experiencing their hospitality, crafts, and way of life.",
    category: "Cultural",
    difficulty: "Easy",
    maxPeople: 16,
    rating: 4.5,
    reviewCount: 134,
    itinerary: [
      {
        time: "09:00",
        period: "Morning",
        activity: "Village Journey",
        description: "Travel to traditional Berber villages in the High Atlas.",
        icon: "🚗"
      },
      {
        time: "11:00",
        period: "Late Morning",
        activity: "Village Walking Tour",
        description: "Guided walk through village and meet local families.",
        icon: "🚶"
      },
      {
        time: "13:00",
        period: "Afternoon",
        activity: "Traditional Lunch & Crafts",
        description: "Enjoy traditional meal and watch local craft demonstrations.",
        icon: "🍽️"
      },
      {
        time: "15:30",
        period: "Afternoon",
        activity: "Cultural Exchange",
        description: "Cultural exchange and traditional tea ceremony.",
        icon: "🫖"
      }
    ],
    includes: [
      "Transportation to villages",
      "Cultural guide",
      "Traditional lunch",
      "Tea ceremony",
      "Craft demonstrations"
    ],
    excludes: [
      "Personal expenses",
      "Travel insurance",
      "Tips for guides"
    ],
    meetingPoint: "Mountain Village Access",
    startTime: "09:00",
    endTime: "17:00",
    requirements: {
      ageRestrictions: "Suitable for all ages.",
      fitnessLevel: "Basic fitness for village walking.",
      medicalConditions: "None specific.",
      equipment: "Comfortable walking shoes, respectful clothing."
    },
    cancellationPolicy: {
      rules: "Free cancellation up to 24 hours before departure.",
      refundPolicy: "Full refund for cancellations made 24+ hours in advance.",
      weatherPolicy: "Tours continue in most weather conditions."
    },
    reviews: [
      {
        id: "1",
        author: "Sarah Wilson",
        rating: 4,
        comment: "Wonderful cultural experience! Very authentic and educational.",
        date: "2024-01-12",
        verified: true
      }
    ]
  }
};

function ExcursionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; rating?: string; text?: string }>({});
  const minReviewLength = 20;

  const validateReview = () => {
    const newErrors: { name?: string; rating?: string; text?: string } = {};
    
    if (!reviewName.trim()) newErrors.name = "Name is required";
    if (!reviewRating) newErrors.rating = "Rating is required";
    if (!reviewText.trim()) newErrors.text = "Review text is required";
    else if (reviewText.trim().length < minReviewLength) {
      newErrors.text = `Review must be at least ${minReviewLength} characters long`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateReview()) {
      console.log('Review submitted:', { reviewName, reviewRating, reviewText });
      setSubmitted(true);
      // Reset form
      setReviewName("");
      setReviewRating(null);
      setReviewText("");
      setErrors({});
    }
  };

  useEffect(() => {
    // Look up excursion by slug
    if (id && mockExcursions[id]) {
      setExcursion(mockExcursions[id]);
    } else {
      setExcursion(null);
    }
  }, [id]);

  if (!excursion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Excursion Not Found</h2>
          <p className="text-muted-foreground mb-4">The excursion you're looking for doesn't exist.</p>
          <Link to="/excursions" className="text-primary hover:text-primary/80">
            Back to Excursions
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

  const getPeriodIcon = (period: string) => {
    switch (period) {
      case 'Morning': return '🌅';
      case 'Late Morning': return '☀️';
      case 'Afternoon': return '🌞';
      case 'Evening': return '🌇';
      default: return '⏰';
    }
  };

  const handleBookNow = () => {
    if (excursion) {
      navigateToBooking(navigate, {
        type: 'excursion',
        id: excursion.id,
        name: excursion.title,
        price: excursion.price,
        location: excursion.location,
        duration: excursion.duration,
        image: excursion.images?.[0]
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-8">
        <div className="container-custom">
          <Link to="/excursions" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-all">
            <ChevronLeft size={18} className="mr-1" />
            Back to All Excursions
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                <img 
                  src={excursion.images[currentImageIndex]} 
                  alt={excursion.title}
                  className="w-full h-80 object-cover"
                />
              </div>
              
              {excursion.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {excursion.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${excursion.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Excursion Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{excursion.category}</Badge>
                  <Badge variant="outline">{excursion.difficulty}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{excursion.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-1" />
                    {excursion.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-1" />
                    {excursion.duration}
                  </div>
                  <div className="flex items-center">
                    <Users size={18} className="mr-1" />
                    Max {excursion.maxPeople} people
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(excursion.rating)}
                  </div>
                  <span className="font-medium">{excursion.rating}</span>
                  <span className="text-muted-foreground">({excursion.reviewCount} reviews)</span>
                </div>
                
                <p className="text-lg text-muted-foreground">{excursion.shortDescription}</p>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold">${excursion.price}</div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={16} className="mr-1" />
                      {excursion.startTime} - {excursion.endTime}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={16} className="mr-1" />
                      {excursion.meetingPoint}
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
            {/* Excursion Details */}
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
                    <CardHeader>
                      <CardTitle>About This Excursion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/90 leading-relaxed">{excursion.longDescription}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Excursion Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {excursion.includes.slice(0, 6).map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="itinerary" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Day Trip Plan</CardTitle>
                      <p className="text-muted-foreground">Timeline-based single-day adventure</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {excursion.itinerary.map((item, index) => (
                          <div key={index} className="relative pl-16 border-l-2 border-primary pb-6 last:pb-0">
                            <div className="absolute left-[-25px] top-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-lg">
                              {item.icon}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{getPeriodIcon(item.period)}</span>
                                <div>
                                  <h3 className="text-lg font-bold">{item.time} - {item.period}</h3>
                                  <h4 className="text-md font-semibold text-primary">{item.activity}</h4>
                                </div>
                              </div>
                              <p className="text-foreground/90">{item.description}</p>
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
                          {excursion.includes.map((item, index) => (
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
                          {excursion.excludes.map((item, index) => (
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
                        <p className="text-sm text-muted-foreground">{excursion.requirements.ageRestrictions}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Fitness Level</h4>
                        <p className="text-sm text-muted-foreground">{excursion.requirements.fitnessLevel}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Medical Conditions</h4>
                        <p className="text-sm text-muted-foreground">{excursion.requirements.medicalConditions}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">What to Bring</h4>
                        <p className="text-sm text-muted-foreground">{excursion.requirements.equipment}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  <CardTitle>Customer Reviews</CardTitle>
                  <div className="flex items-center gap-2">
                    {renderStars(excursion.rating)}
                    <span className="font-medium">{excursion.rating}</span>
                    <span className="text-muted-foreground">({excursion.reviewCount} reviews)</span>
                  </div>
                
                  {excursion.reviews.map((review) => (
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
                        <div className="flex items-center gap-1">
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
                                className="p-1"
                              >
                                <Star
                                  className={active ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                                  size={22}
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
            
            {/* Right Column - Booking Form */}
            {/* BookingForm component removed - ready for new redesigned booking form */}
          </div>
        </div>
      </section>

      {/* Cross-Navigation */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for Multi-Day Adventures?</h3>
          <p className="text-muted-foreground mb-6">
            Explore our comprehensive desert tours and multi-day expeditions for the ultimate Moroccan experience.
          </p>
          <Button asChild size="lg">
            <Link to="/destinations">See Our Full Desert Tours</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExcursionDetail;