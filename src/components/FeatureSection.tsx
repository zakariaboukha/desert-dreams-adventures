
import React from 'react';
import { MapPin, Compass, Sun, Shield } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: 'Exotic Locations',
    description: 'Explore unique and breathtaking destinations across the Sahara desert and beyond.'
  },
  {
    icon: <Compass className="h-10 w-10 text-primary" />,
    title: 'Expert Guides',
    description: 'Our experienced local guides provide insider knowledge and ensure your safety throughout the journey.'
  },
  {
    icon: <Sun className="h-10 w-10 text-primary" />,
    title: 'Unforgettable Experiences',
    description: 'Create lasting memories with our carefully crafted experiences, from sunset dune bashing to stargazing nights.'
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Safety First',
    description: 'All our adventures prioritize your safety with top-quality equipment and comprehensive planning.'
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading">Why Choose Us</h2>
          <p className="section-subheading mx-auto">
            Experience the best of desert adventures with our premium services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
