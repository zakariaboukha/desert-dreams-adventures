
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import DestinationCard from '@/components/DestinationCard';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { destinations } from '@/data/destinations';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Featured destinations (show only 3 for the homepage)
  const featuredDestinations = destinations.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <FeatureSection />
      
      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-heading">Featured Adventures</h2>
            <p className="section-subheading mx-auto">
              Discover our most popular desert experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                title={destination.title}
                location={destination.location}
                duration={destination.duration}
                price={destination.price}
                image={destination.image}
                description={destination.description}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/destinations" className="btn-secondary inline-flex items-center">
              View All Destinations
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Desert Image Gallery */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-heading">Explore the Desert</h2>
            <p className="section-subheading mx-auto">
              Breathtaking landscapes and powerful 4x4 adventures await
            </p>
          </div>
          
          <ImageGallery limit={6} />
        </div>
      </section>
      
      {/* Adventure Stats */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">15+</div>
              <p className="text-foreground/80">Desert Tours</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5000+</div>
              <p className="text-foreground/80">Happy Adventurers</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">12+</div>
              <p className="text-foreground/80">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">20+</div>
              <p className="text-foreground/80">Expert Guides</p>
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
