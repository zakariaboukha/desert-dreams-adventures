
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { getDestinationById } from '@/data/destinations';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ChevronLeft, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState(id ? getDestinationById(id) : null);
  
  useEffect(() => {
    if (id) {
      const destinationData = getDestinationById(id);
      setDestination(destinationData);
      
      // Scroll to top when destination changes
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  if (!destination) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Destination Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The destination you are looking for does not exist or has been removed.
          </p>
          <Link to="/destinations" className="btn-primary">
            View All Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <div 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${destination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container-custom relative z-10">
          <Link to="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-all">
            <ChevronLeft size={18} className="mr-1" />
            Back to All Destinations
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {destination.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center">
              <MapPin size={18} className="mr-1" />
              {destination.location}
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-1" />
              {destination.duration}
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-1" />
              Daily Tours
            </div>
            <div className="py-1 px-3 bg-primary rounded-full text-white">
              ${destination.price}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Tour Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Tour Overview</h2>
                  <p className="text-foreground/90 mb-8">{destination.longDescription}</p>
                  
                  <div className="aspect-w-16 aspect-h-9 mb-8 rounded-lg overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {destination.includes.slice(0, 6).map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="itinerary" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Tour Itinerary</h2>
                  <div className="space-y-8">
                    {destination.itinerary.map((day, index) => (
                      <div key={index} className="relative pl-8 border-l-2 border-primary pb-8 last:pb-0">
                        <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-primary"></div>
                        <h3 className="text-xl font-bold mb-2">Day {day.day}: {day.title}</h3>
                        <p className="text-foreground/90">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Tour Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">What's Included</h3>
                      <ul className="space-y-3">
                        {destination.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-4">What's Not Included</h3>
                      <ul className="space-y-3">
                        {destination.excludes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <XCircle className="text-destructive shrink-0 mr-2 mt-1" size={18} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                  
                  <div className="space-y-6">
                    {destination.reviews.map((review, index) => (
                      <div key={index} className="bg-secondary p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold">{review.author}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < review.rating ? "fill-primary text-primary" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground/90 mb-2">"{review.comment}"</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Booking Form */}
            <div>
              <BookingForm tourName={destination.id} />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
