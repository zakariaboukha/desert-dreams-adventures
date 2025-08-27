import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, MapPin, DollarSign } from 'lucide-react';

export interface BookingSummaryData {
  type: 'trip' | 'excursion';
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  image?: string;
  images?: string[];
  groupSize: string;
  rating: number;
  reviewCount: number;
  tagline: string;
  schedule: string;
  meetingPoint: string;
}

interface BookingSummaryCardProps {
  data: BookingSummaryData | null;
  className?: string;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({ data, className = '' }) => {
  if (!data) {
    return (
      <Card className={`${className} opacity-50`}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8" />
            </div>
            <p className="text-sm">Select a trip or excursion to see details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const primaryImage = data.images?.[0] || data.image || '/images/desert-dunes-1.jpg';

  return (
    <Card className={`${className} overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg`}>
      {/* Trip Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={primaryImage} 
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 text-primary-foreground">
            {data.type === 'trip' ? 'Multi-day Trip' : 'Day Excursion'}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-4">
        {/* Trip Title */}
        <h3 className="text-2xl font-bold text-foreground mb-2">{data.title}</h3>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{data.location}</span>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{data.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">– {data.reviewCount} reviews</span>
        </div>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {data.tagline}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Duration & Group Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">{data.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Group Size</p>
                <p className="text-sm font-medium">{data.groupSize}</p>
              </div>
            </div>
          </div>

          {/* Time Schedule */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Time Schedule</p>
              <p className="text-sm font-medium">{data.schedule}</p>
            </div>
          </div>

          {/* Meeting Point */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Meeting Point</p>
              <p className="text-sm font-medium">{data.meetingPoint}</p>
            </div>
          </div>

          {/* Price */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Price per Person</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${data.price}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummaryCard;