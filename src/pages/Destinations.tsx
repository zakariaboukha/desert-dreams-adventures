import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Enhanced trips data with multiple images and activity details
const allTrips = [
  { 
    id: 1,
    slug: "coastal-adventure",
    title: "Coastal Adventure", 
    type: "trip", 
    location: "Mediterranean Coast", 
    duration: "3 days", 
    price: 450, 
    description: "Explore charming coastal towns and pristine beaches along the Mediterranean.",
    images: [
      "/images/desert-dunes-1.jpg",
      "/images/4x4-desert-1.jpg",
      "/images/expedition-1.jpg"
    ],
    category: "Adventure",
    difficulty: "Easy",
    rating: 4.6,
    reviewCount: 89,
    maxPeople: 15,
    highlights: [
      "Beautiful coastal scenery",
      "Traditional fishing villages",
      "Water sports activities",
      "Local seafood cuisine"
    ],
    includes: [
      "Accommodation for 2 nights",
      "All meals included",
      "Professional guide",
      "Transportation"
    ],
    activities: [
      { type: 'nature' as const, name: 'Beach Walking', time: 'Morning' },
      { type: 'culture' as const, name: 'Village Tours', time: 'Afternoon' },
      { type: 'food' as const, name: 'Seafood Tasting', time: 'Evening' }
    ]
  },
  { 
    id: 2,
    slug: "mountain-escape",
    title: "Mountain Escape", 
    type: "trip", 
    location: "Rocky Mountains", 
    duration: "4 days", 
    price: 550, 
    description: "Hiking and nature exploration through breathtaking mountain landscapes.",
    images: [
      "/images/expedition-1.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/4x4-desert-3.jpg"
    ],
    category: "Adventure",
    difficulty: "Moderate",
    rating: 4.8,
    reviewCount: 156,
    maxPeople: 12,
    highlights: [
      "Mountain peak hiking",
      "Wildlife observation",
      "Alpine lakes exploration",
      "Professional mountain guides"
    ],
    includes: [
      "Mountain lodge accommodation",
      "Hiking equipment",
      "Expert guides",
      "All meals"
    ],
    activities: [
      { type: 'hiking' as const, name: 'Summit Hiking', time: 'Morning' },
      { type: 'nature' as const, name: 'Wildlife Watching', time: 'Afternoon' },
      { type: 'adventure' as const, name: 'Rock Climbing', time: 'Evening' }
    ]
  },
  { 
    id: 3,
    slug: "city-highlights",
    title: "City Highlights", 
    type: "trip", 
    location: "Paris", 
    duration: "5 days", 
    price: 750, 
    description: "Discover iconic landmarks and hidden gems in the City of Light.",
    images: [
      "/images/desert-dunes-3.jpg",
      "/images/expedition-2.jpg",
      "/images/4x4-desert-1.jpg"
    ],
    category: "Cultural",
    difficulty: "Easy",
    rating: 4.5,
    reviewCount: 203,
    maxPeople: 20,
    highlights: [
      "Eiffel Tower visit",
      "Louvre Museum tour",
      "Seine River cruise",
      "Montmartre exploration"
    ],
    includes: [
      "4-star hotel accommodation",
      "Museum entrance fees",
      "Professional city guide",
      "Metro passes"
    ],
    activities: [
      { type: 'culture' as const, name: 'Museum Tours', time: 'Morning' },
      { type: 'city' as const, name: 'Architecture Walk', time: 'Afternoon' },
      { type: 'food' as const, name: 'French Cuisine', time: 'Evening' }
    ]
  },
  { 
    id: 4,
    slug: "cultural-journey",
    title: "Cultural Journey", 
    type: "trip", 
    location: "Kyoto", 
    duration: "6 days", 
    price: 850, 
    description: "Experience traditional culture and cuisine in Japan's ancient capital.",
    images: [
      "/images/4x4-desert-3.jpg",
      "/images/desert-dunes-1.jpg",
      "/images/expedition-1.jpg"
    ],
    category: "Cultural",
    difficulty: "Easy",
    rating: 4.9,
    reviewCount: 178,
    maxPeople: 16,
    highlights: [
      "Traditional temples visit",
      "Tea ceremony experience",
      "Bamboo forest walk",
      "Authentic kaiseki dining"
    ],
    includes: [
      "Traditional ryokan stay",
      "Tea ceremony lesson",
      "Temple entrance fees",
      "Cultural guide"
    ],
    activities: [
      { type: 'culture' as const, name: 'Temple Visits', time: 'Morning' },
      { type: 'nature' as const, name: 'Garden Tours', time: 'Afternoon' },
      { type: 'food' as const, name: 'Traditional Dining', time: 'Evening' }
    ]
  },
  { 
    id: 5,
    slug: "sahara-adventure",
    title: "Sahara Adventure", 
    type: "trip", 
    location: "Sahara Desert", 
    duration: "3 days", 
    price: 300, 
    description: "Explore the vast Sahara Desert with camel trekking and desert camping.",
    images: [
      "/images/desert-dunes-1.jpg",
      "/images/4x4-desert-1.jpg",
      "/images/expedition-1.jpg"
    ],
    category: "Adventure",
    difficulty: "Moderate",
    rating: 4.7,
    reviewCount: 245,
    maxPeople: 18,
    highlights: [
      "Camel trekking experience",
      "Desert camping under stars",
      "Traditional Berber culture",
      "Stunning sunrise views"
    ],
    includes: [
      "Desert camp accommodation",
      "Camel trekking",
      "Traditional meals",
      "Bedouin guides"
    ],
    activities: [
      { type: 'adventure' as const, name: 'Camel Trekking', time: 'Morning' },
      { type: 'culture' as const, name: 'Berber Culture', time: 'Afternoon' },
      { type: 'nature' as const, name: 'Stargazing', time: 'Evening' }
    ]
  },
  { 
    id: 6,
    slug: "atlas-mountains-trek",
    title: "Atlas Mountains Trek",
    type: "trip",
    location: "High Atlas",
    duration: "4 days",
    price: 450,
    description: "Multi-day trekking adventure through Morocco's highest peaks.",
    images: [
      "/images/expedition-2.jpg",
      "/images/desert-dunes-2.jpg",
      "/images/4x4-desert-3.jpg"
    ],
    category: "Adventure",
    difficulty: "Challenging",
    rating: 4.4,
    reviewCount: 134,
    maxPeople: 10,
    highlights: [
      "High altitude trekking",
      "Berber village visits",
      "Mountain refuge stays",
      "Toubkal peak attempt"
    ],
    includes: [
      "Mountain refuge accommodation",
      "Trekking equipment",
      "Mountain guides",
      "Porter services"
    ],
    activities: [
      { type: 'hiking' as const, name: 'Mountain Trekking', time: 'Full Day' },
      { type: 'culture' as const, name: 'Village Visits', time: 'Afternoon' },
      { type: 'adventure' as const, name: 'Peak Climbing', time: 'Early Morning' }
    ]
  }
];

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [durationFilter, setDurationFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCardExpansion = (tripId: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tripId)) {
        newSet.delete(tripId);
      } else {
        newSet.add(tripId);
      }
      return newSet;
    });
  };

  // Filter trips based on search and filters
  const filteredTrips = allTrips.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration = durationFilter === 'all' || 
                           (durationFilter === 'short' && parseInt(trip.duration) <= 2) ||
                           (durationFilter === 'medium' && parseInt(trip.duration) >= 3 && parseInt(trip.duration) <= 4) ||
                           (durationFilter === 'long' && parseInt(trip.duration) >= 5);
    
    return matchesSearch && matchesDuration;
  });

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration-short':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'duration-long':
        return parseInt(b.duration) - parseInt(a.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-[url('/images/desert-dunes-11.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Multi-Day Trips</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Embark on unforgettable multi-day adventures through the world's most spectacular landscapes and cultural treasures.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              Multi-Day Adventures
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              Overnight Experiences
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Label htmlFor="search" className="mb-2 block">Search Trips</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="search"
                  placeholder="Search destinations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <Label htmlFor="sort" className="mb-2 block">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration-short">Duration: Shortest First</SelectItem>
                  <SelectItem value="duration-long">Duration: Longest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Filter */}
            <div>
              <Label htmlFor="duration" className="mb-2 block">Duration</Label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Filter by duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Short (1-2 days)</SelectItem>
                  <SelectItem value="medium">Medium (3-4 days)</SelectItem>
                  <SelectItem value="long">Long (5+ days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-16">
        <div className="container-custom">
          {sortedTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id.toString()}
                  title={trip.title}
                  location={trip.location}
                  duration={trip.duration}
                  price={trip.price}
                  images={trip.images}
                  description={trip.description}
                  category={trip.category}
                  difficulty={trip.difficulty}
                  rating={trip.rating}
                  reviewCount={trip.reviewCount}
                  maxPeople={trip.maxPeople}
                  highlights={trip.highlights}
                  includes={trip.includes}
                  activities={trip.activities}
                  isExpanded={expandedCards.has(trip.id)}
                  onToggleExpanded={() => toggleCardExpansion(trip.id)}
                  detailPath={`/trips/${trip.slug}`}
                  slug={trip.slug} // NEW
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No trips found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cross-Navigation */}
      <section className="py-12 bg-secondary/30">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-bold mb-4">Short on Time?</h3>
          <p className="text-muted-foreground mb-6">
            Try our exciting 1-day excursions perfect for travelers with limited time.
          </p>
          <Button asChild size="lg">
            <Link to="/excursions">Try Our 1-Day Excursions</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
