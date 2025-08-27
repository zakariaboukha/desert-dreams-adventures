// Top-level imports in the file
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Clock, MapPin, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripCard from '@/components/TripCard';
import { cn } from '@/lib/utils';

// Utility function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Function to ensure excursion has proper slug and routing data
const ensureExcursionSlug = (excursion: any) => {
  const slug = excursion.slug || generateSlug(excursion.title);
  return {
    ...excursion,
    slug,
    detailPath: `/excursions/${slug}`,
    bookingType: 'excursion'
  };
};

// Enhanced excursion data with proper slugs and routing
const allExcursions = [
  // Single Activities
  { 
    id: 1,
    slug: "jet-ski-adventure",
    title: "Jet Ski Adventure", 
    type: "single-activity", 
    category: "water-sports",
    location: "Agadir Coast", 
    duration: "2 hours", 
    price: 85, 
    description: "Experience the thrill of high-speed jet skiing along Morocco's stunning Atlantic coastline with professional instruction and safety equipment.", 
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop"
    ],
    highlights: ["Professional instruction included", "All safety equipment provided", "Stunning Atlantic coastline views"],
    includes: ["Jet ski rental", "Safety equipment", "Professional guide", "Insurance coverage"]
  },
  { 
    id: 2,
    slug: "skyboarding-experience",
    title: "Skyboarding Experience", 
    type: "single-activity", 
    category: "extreme-sports",
    location: "Essaouira Beach", 
    duration: "3 hours", 
    price: 120, 
    description: "Master the art of skyboarding with certified instructors on the windy beaches of Essaouira, perfect for adrenaline seekers and adventure enthusiasts.", 
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop"
    ],
    highlights: ["Certified instructors", "Perfect wind conditions", "Equipment included"],
    includes: ["Skyboard rental", "Safety gear", "Professional instruction", "Beach access"]
  },
  { 
    id: 3,
    slug: "surfing-session",
    title: "Surfing Session", 
    type: "single-activity", 
    category: "water-sports",
    location: "Taghazout Bay", 
    duration: "4 hours", 
    price: 75, 
    description: "Learn to surf or improve your skills on Morocco's world-famous surf breaks with expert local instructors and quality equipment.", 
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop"
    ],
    highlights: ["World-famous surf breaks", "Expert local instructors", "All skill levels welcome"],
    includes: ["Surfboard rental", "Wetsuit", "Professional instruction", "Beach facilities"]
  },
  { 
    id: 4,
    slug: "atlas-hike",
    title: "Atlas Mountain Hike", 
    type: "single-activity", 
    category: "adventure",
    location: "High Atlas Mountains", 
    duration: "6 hours", 
    price: 95, 
    description: "Discover breathtaking mountain trails and traditional Berber villages on this guided hiking adventure through Morocco's stunning High Atlas.", 
    image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop"
    ],
    highlights: ["Breathtaking mountain views", "Traditional Berber villages", "Expert mountain guide"],
    includes: ["Professional guide", "Hiking equipment", "Traditional lunch", "Transportation"]
  },
  { 
    id: 5,
    slug: "quad-biking",
    title: "Quad Biking Adventure", 
    type: "single-activity",
    category: "adventure",
    location: "Marrakech Palm Grove",
    duration: "3 hours",
    price: 80,
    description: "Navigate through palm groves and desert landscapes on powerful quad bikes with safety equipment provided and expert guidance.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop"
    ],
    highlights: ["Palm grove exploration", "Desert landscapes", "Safety equipment included"],
    includes: ["Quad bike rental", "Safety equipment", "Professional guide", "Refreshments"]
  },
  { 
    id: 6,
    slug: "camel-trekking",
    title: "Camel Trekking Experience",
    type: "single-activity",
    category: "cultural",
    location: "Erg Chebbi Dunes",
    duration: "4 hours",
    price: 65,
    description: "Experience traditional desert travel on camelback through golden sand dunes with sunset viewing and traditional Berber hospitality.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop"
    ],
    highlights: ["Traditional desert travel", "Golden sand dunes", "Sunset viewing"],
    includes: ["Camel rental", "Traditional guide", "Sunset viewing", "Berber tea"]
  },
  { 
    id: 7,
    slug: "rock-climbing",
    title: "Rock Climbing Session",
    type: "single-activity",
    category: "extreme-sports",
    location: "Todra Gorge",
    duration: "5 hours",
    price: 110,
    description: "Challenge yourself on Morocco's famous limestone cliffs with professional climbing guides and top-quality equipment in stunning Todra Gorge.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop"
    ],
    highlights: ["Famous limestone cliffs", "Professional guides", "Top-quality equipment"],
    includes: ["Climbing equipment", "Professional guide", "Safety gear", "Route planning"]
  },
  { 
    id: 8,
    slug: "cooking-class",
    title: "Traditional Cooking Class",
    type: "single-activity",
    category: "cultural",
    location: "Marrakech Medina",
    duration: "4 hours",
    price: 55,
    description: "Learn to prepare authentic Moroccan dishes including tagine and couscous with local chefs in a traditional riad setting.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop"
    ],
    highlights: ["Authentic Moroccan cuisine", "Local chef instruction", "Traditional riad setting"],
    includes: ["All ingredients", "Professional chef", "Recipe booklet", "Traditional meal"]
  },

  // Package Deals - Updated with proper slugs
  {
    id: 101,
    slug: "desert-safari-package",
    title: "Desert Safari Package",
    type: "package",
    category: "multi-activity",
    location: "Sahara Desert",
    duration: "2 days",
    price: 280,
    description: "Complete desert experience: 4x4 safari, camel trekking, traditional dinner, and overnight camping under the stars with Berber guides.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop"
    ],
    includedActivities: ["4x4 Desert Safari", "Camel Trekking", "Traditional Dinner", "Desert Camping"],
    highlights: ["Complete desert experience", "Overnight camping", "Traditional Berber guides"],
    includes: ["4x4 transportation", "Camel trekking", "Traditional meals", "Desert camping", "Professional guide"]
  },
  {
    id: 102,
    slug: "mountain-adventure-package",
    title: "Mountain Adventure Package",
    type: "package",
    category: "adventure",
    location: "Atlas Mountains",
    duration: "3 days",
    price: 350,
    description: "Ultimate mountain experience: hiking, rock climbing, village visits, and traditional accommodation with expert mountain guides.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1464822759844-d150ad6d1c71?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop"
    ],
    includedActivities: ["Mountain Hiking", "Rock Climbing", "Berber Village Tour", "Traditional Lodge Stay"],
    highlights: ["Ultimate mountain experience", "Traditional villages", "Expert guides"],
    includes: ["Mountain guide", "Climbing equipment", "Traditional accommodation", "All meals", "Transportation"]
  },
  {
    id: 103,
    slug: "city-cultural-tour",
    title: "City & Cultural Tour",
    type: "package",
    category: "cultural",
    location: "Marrakech & Fez",
    duration: "4 days",
    price: 420,
    description: "Immersive cultural journey: medina tours, cooking classes, artisan workshops, and historical sites with expert cultural guides.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=300&fit=crop"
    ],
    includedActivities: ["Medina Walking Tours", "Cooking Classes", "Artisan Workshops", "Historical Sites"],
    highlights: ["Immersive cultural experience", "Expert cultural guides", "Authentic workshops"],
    includes: ["Cultural guide", "Cooking classes", "Workshop materials", "Historical site entries", "Traditional accommodation"]
  },
  {
    id: 104,
    slug: "coastal-adventure-package",
    title: "Coastal Adventure Package",
    type: "package",
    category: "water-sports",
    location: "Atlantic Coast",
    duration: "3 days",
    price: 295,
    description: "Ocean adventure combo: surfing lessons, jet ski tours, beach activities, and coastal accommodation with certified water sports instructors.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop"
    ],
    includedActivities: ["Surfing Lessons", "Jet Ski Tours", "Beach Volleyball", "Coastal Accommodation"],
    highlights: ["Ocean adventure combo", "Certified instructors", "Coastal accommodation"],
    includes: ["Water sports equipment", "Professional instruction", "Beach activities", "Coastal accommodation", "All meals"]
  },
  {
    id: 105,
    slug: "extreme-sports-package",
    title: "Extreme Sports Package",
    type: "package",
    category: "extreme-sports",
    location: "Multiple Locations",
    duration: "5 days",
    price: 580,
    description: "Adrenaline-packed adventure: skyboarding, rock climbing, quad biking, and bungee jumping with certified extreme sports instructors.",
    image: "https://images.unsplash.com/photo-1551524164-6cf2ac2d8c9c?w=500&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551524164-6cf2ac2d8c9c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop"
    ],
    includedActivities: ["Skyboarding", "Rock Climbing", "Quad Biking", "Bungee Jumping"],
    highlights: ["Adrenaline-packed adventure", "Multiple extreme sports", "Certified instructors"],
    includes: ["All extreme sports equipment", "Professional instruction", "Safety gear", "Transportation", "Accommodation"]
  }
];

type FilterType = 'all' | 'single-activities' | 'packages' | 'customize';

const Excursions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);

  // Filter excursions based on search and filter type
  const filteredExcursions = allExcursions.filter(excursion => {
    const matchesSearch = excursion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excursion.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excursion.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = false;
    switch (filterType) {
      case 'all':
        matchesFilter = true;
        break;
      case 'single-activities':
      case 'customize':
        matchesFilter = excursion.type === 'single-activity';
        break;
      case 'packages':
        matchesFilter = excursion.type === 'package';
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Sort excursions
  const sortedExcursions = [...filteredExcursions].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleActivitySelection = (activityId: number) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const isCustomizeMode = filterType === 'customize';

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-[url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=600&fit=crop')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Day Excursions</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover Morocco's wonders in a single day. Perfect for travelers with limited time who want to experience authentic adventures.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              Single Day Adventures
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              Multiple Locations
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Label htmlFor="search" className="mb-2 block text-sm font-medium text-foreground">Search Excursions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="search"
                  placeholder="Search excursions..."
                  className="pl-10 border-border focus:border-primary focus:ring-primary/20 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <Label htmlFor="sort" className="mb-2 block text-sm font-medium text-foreground">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="border-border focus:border-primary focus:ring-primary/20 transition-colors">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="border-border bg-background">
                  <SelectItem value="default" className="hover:bg-accent focus:bg-accent">Featured</SelectItem>
                  <SelectItem value="price-low" className="hover:bg-accent focus:bg-accent">Price: Low to High</SelectItem>
                  <SelectItem value="price-high" className="hover:bg-accent focus:bg-accent">Price: High to Low</SelectItem>
                  <SelectItem value="name" className="hover:bg-accent focus:bg-accent">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Type Buttons */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-foreground">Activity Type</Label>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setFilterType('all');
                    setSelectedActivities([]);
                  }}
                  className={cn(
                    "text-xs transition-colors px-4 py-2 min-w-[80px] flex-shrink-0",
                    filterType === 'all' 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-accent"
                  )}
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'single-activities' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setFilterType('single-activities');
                    setSelectedActivities([]);
                  }}
                  className={cn(
                    "text-xs transition-colors px-4 py-2 min-w-[120px] flex-shrink-0",
                    filterType === 'single-activities' 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-accent"
                  )}
                >
                  Single Activities
                </Button>
                <Button
                  variant={filterType === 'packages' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setFilterType('packages');
                    setSelectedActivities([]);
                  }}
                  className={cn(
                    "text-xs transition-colors px-4 py-2 min-w-[90px] flex-shrink-0",
                    filterType === 'packages' 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-accent"
                  )}
                >
                  Packages
                </Button>
                <Button
                  variant={filterType === 'customize' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setFilterType('customize');
                    setSelectedActivities([]);
                  }}
                  className={cn(
                    "text-xs transition-colors px-4 py-2 min-w-[140px] flex-shrink-0",
                    filterType === 'customize' 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-accent"
                  )}
                >
                  Customize Package
                </Button>
              </div>
            </div>
          </div>

          {/* Customize Package Selection Info */}
          {isCustomizeMode && (
            <div className="mt-6 p-4 bg-accent/50 rounded-lg border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-medium text-foreground flex items-center gap-2">
                    <Plus size={18} className="text-primary" />
                    Customize Your Package
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select multiple activities to create your custom package. Click on activities to add them to your selection.
                  </p>
                </div>
                {selectedActivities.length > 0 && (
                  <div className="text-right">
                    <p className="text-sm font-medium">{selectedActivities.length} activities selected</p>
                    <p className="text-xs text-muted-foreground">
                      Total: ${sortedExcursions
                        .filter(exc => selectedActivities.includes(exc.id))
                        .reduce((sum, exc) => sum + exc.price, 0)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Excursions Grid */}
      <section className="py-16">
        <div className="container-custom">
          {sortedExcursions.length > 0 ? (
            <>
              {/* Category Header */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">
                  {filterType === 'single-activities' && 'Single Activities'}
                  {filterType === 'packages' && 'Adventure Packages'}
                  {filterType === 'customize' && 'Build Your Custom Package'}
                </h2>
                <p className="text-muted-foreground">
                  {filterType === 'single-activities' && `Choose from ${sortedExcursions.length} individual activities`}
                  {filterType === 'packages' && `${sortedExcursions.length} curated packages available`}
                  {filterType === 'customize' && 'Select multiple activities to create your perfect adventure'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedExcursions.map((excursion) => {
                  // Ensure every excursion has proper routing data
                  const enhancedExcursion = ensureExcursionSlug(excursion);
                  
                  return (
                    <div key={excursion.id} className="relative group">
                      {/* Selection Overlay for Customize Mode */}
                      {isCustomizeMode && (
                        <div 
                          className={cn(
                            "absolute top-4 right-4 z-10 w-10 h-10 rounded-full border-2 cursor-pointer transition-all shadow-lg",
                            "flex items-center justify-center",
                            selectedActivities.includes(excursion.id)
                              ? "bg-primary border-primary text-primary-foreground scale-110"
                              : "bg-background/90 border-border hover:border-primary hover:bg-primary/10 backdrop-blur-sm"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivitySelection(excursion.id);
                          }}
                        >
                          {selectedActivities.includes(excursion.id) ? (
                            <Check size={20} className="font-bold" />
                          ) : (
                            <Plus size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>
                      )}
                      
                      <div 
                        className={cn(
                          "transition-all duration-300 h-full",
                          isCustomizeMode && selectedActivities.includes(excursion.id) 
                            ? "ring-2 ring-primary ring-offset-4 shadow-lg transform scale-[1.02]" 
                            : "",
                          isCustomizeMode ? "cursor-pointer hover:shadow-md" : ""
                        )}
                        onClick={isCustomizeMode ? () => handleActivitySelection(excursion.id) : undefined}
                      >
                        <TripCard
                          key={excursion.id}
                          id={enhancedExcursion.slug}
                          slug={enhancedExcursion.slug}
                          title={excursion.title}
                          location={excursion.location}
                          duration={excursion.duration}
                          price={excursion.price}
                          images={excursion.images}
                          image={excursion.image}
                          description={excursion.description}
                          category={excursion.category}
                          highlights={excursion.highlights}
                          includes={excursion.includes}
                          detailPath={enhancedExcursion.detailPath}
                          bookingType="excursion"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No excursions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('single-activities');
                  setSelectedActivities([]);
                }}
                size="lg"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Customize Package Action Bar */}
      {isCustomizeMode && selectedActivities.length > 0 && (
        <section className="sticky bottom-0 py-4 bg-background/95 backdrop-blur-sm border-t shadow-lg z-20">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {selectedActivities.slice(0, 3).map((activityId) => {
                    const activity = sortedExcursions.find(exc => exc.id === activityId);
                    return activity ? (
                      <div key={activityId} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                      </div>
                    ) : null;
                  })}
                  {selectedActivities.length > 3 && (
                    <div className="w-10 h-10 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                      +{selectedActivities.length - 3}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Your Custom Package</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedActivities.length} activities • Total: $
                    {sortedExcursions
                      .filter(exc => selectedActivities.includes(exc.id))
                      .reduce((sum, exc) => sum + exc.price, 0)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedActivities([])}
                >
                  Clear Selection
                </Button>
                <Button size="lg" className="px-8">
                  Book Custom Package
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

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

export default Excursions;