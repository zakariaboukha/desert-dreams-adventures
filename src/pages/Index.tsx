import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DestinationCard from '@/components/DestinationCard';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { excursions } from '@/data/excursions';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TripCard from '@/components/TripCard';

// Import the same trip data from Destinations page
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
  }
];

const Index: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Featured trips from the destinations page (first 3)
  const featuredTrips = allTrips.slice(0, 3);
  const featuredExcursions = excursions.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Trips */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-heading">Featured Trips</h2>
            <p className="section-subheading mx-auto">
              Explore our most popular trips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map((trip) => (
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
                detailPath={`/trips/${trip.slug}`}
                slug={trip.slug} // NEW
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-secondary inline-flex items-center">
              View All Trips
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Excursions */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-heading">Featured Excursions</h2>
            <p className="section-subheading mx-auto">
              Discover our exclusive excursions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExcursions.map((excursion) => (
              <TripCard
                key={excursion.id}
                id={excursion.slug}
                title={excursion.title}
                location={excursion.location}
                duration={excursion.duration}
                price={excursion.price}
                image={excursion.image}
                description={excursion.description}
                detailPath={`/excursions/${excursion.slug}`}
                bookingType="excursion"
                slug={excursion.slug}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/excursions')}
              className="btn-secondary inline-flex items-center"
            >
              View All Excursions
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>
      </section>
      
      {/* Desert Image Gallery */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">{t('explore.title')}</h2>
            <p className="section-subheading mx-auto">
              {t('explore.subtitle')}
            </p>
          </div>
          
          <ImageGallery limit={6} />
        </div>
      </section>
      
      {/* Features Section - Moved below Desert Image Gallery */}
      <FeatureSection />
      
      {/* Adventure Stats */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <p className="text-foreground/80">{t('stats.tours')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5000+</div>
              <p className="text-foreground/80">{t('stats.adventurers')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">12+</div>
              <p className="text-foreground/80">{t('stats.experience')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">20+</div>
              <p className="text-foreground/80">{t('stats.guides')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Call to Action */}
      <CallToAction />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
