
import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface DestinationProps {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image: string;
  description: string;
}

const DestinationCard: React.FC<DestinationProps> = ({
  id,
  title,
  location,
  duration,
  price,
  image,
  description,
}) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl card-hover">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 bg-primary py-1 px-4 rounded-tr-lg text-primary-foreground font-medium">
          ${price}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        
        <div className="flex items-center mb-2 text-muted-foreground">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center mb-4 text-muted-foreground">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">{duration}</span>
        </div>
        
        <p className="text-foreground/80 mb-4 line-clamp-2">
          {description}
        </p>
        
        <Link 
          to={`/destinations/${id}`} 
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          View Details
          <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
