
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/images/desert-hero.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40 dark:from-background/90 dark:to-background/30"></div>
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover the Magic of the <span className="text-primary">Desert</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-foreground/90 max-w-2xl">
            Experience unforgettable adventures through golden dunes and breathtaking landscapes. 
            Our 4x4 excursions bring you the best of Sahara's beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/destinations" className="btn-primary group">
              Explore Destinations
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce-subtle">
        <div className="w-8 h-12 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
