import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import BookingSummaryCard, { BookingSummaryData } from '@/components/BookingSummaryCard';
import { CheckCircle, Phone, Mail, Clock, Shield, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scrollToBookingForm } from '@/utils/bookingNavigation';

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const [summaryData, setSummaryData] = useState<BookingSummaryData | null>(null);

  // Extract booking context from URL parameters
  const bookingContext = {
    type: searchParams.get('type') as 'trip' | 'excursion' | null,
    id: searchParams.get('id'),
    name: searchParams.get('name'),
    price: searchParams.get('price') ? Number(searchParams.get('price')) : undefined,
    location: searchParams.get('location'),
    duration: searchParams.get('duration'),
    image: searchParams.get('image')
  };

  // Auto-scroll to booking form when page loads with parameters
  useEffect(() => {
    if (searchParams.toString()) {
      scrollToBookingForm();
    }
  }, [searchParams]);

  const bookingProcess = [
    {
      title: "Submit Request",
      description: "Fill out the booking form with your preferred tour, dates, and details.",
      icon: Users
    },
    {
      title: "Quick Confirmation",
      description: "Our team reviews your request and confirms availability within 24 hours.",
      icon: Clock
    },
    {
      title: "Secure Payment",
      description: "Complete your booking with a secure deposit payment via credit card or bank transfer.",
      icon: Shield
    },
    {
      title: "Prepare for Adventure",
      description: "Receive detailed information about your tour and what to pack and expect.",
      icon: Star
    }
  ];

  const policies = [
    {
      title: "Flexible Cancellation",
      description: "Full refund if cancelled 7+ days before the tour. 50% refund if cancelled 3-6 days before."
    },
    {
      title: "Secure Deposit",
      description: "30% deposit to secure your booking, with the balance due 14 days before your tour."
    },
    {
      title: "Weather Guarantee",
      description: "In case of extreme weather conditions, we offer rebooking or full refund options."
    },
    {
      title: "Group Discounts",
      description: "Special rates available for groups of 6 or more people booking together."
    }
  ];

  const features = [
    "Expert local guides",
    "All equipment included",
    "Traditional meals",
    "Transportation provided",
    "Photography assistance",
    "24/7 support"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(/images/expedition-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
            ✨ Book with Confidence
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Book Your Desert
            <span className="block text-primary">Adventure</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Ready to experience the magic of the desert? Start your journey by booking your perfect tour with our secure and easy booking system.
          </p>
        </div>
      </div>
      
      {/* Top Section - Horizontal Info Cards */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">How Booking Works</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Booking your desert adventure with us is simple and secure. Follow these steps to begin your journey:
          </p>
          
          {/* Desktop: Horizontal Scroll, Mobile: Vertical Stack */}
          <div className="md:overflow-x-auto md:pb-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 md:min-w-max">
              {bookingProcess.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card 
                    key={index} 
                    className="flex-shrink-0 md:w-80 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-l-4 border-l-primary hover:shadow-md transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="text-primary" size={20} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs font-bold">
                              Step {index + 1}
                            </Badge>
                            <h3 className="font-bold text-lg">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section - Booking Form + Summary Card */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Booking Form */}
            <div className="lg:pr-6">
              <div className="sticky top-8" ref={bookingFormRef} id="booking-form">
                <BookingForm 
                  initialContext={bookingContext}
                  onSummaryDataChange={setSummaryData}
                />
              </div>
            </div>
            
            {/* Summary Card */}
            <div className="lg:pl-6 mt-8 lg:mt-0">
              <div className="sticky top-8">
                <BookingSummaryCard 
                  data={summaryData}
                  className="animate-in slide-in-from-right-5 duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border-2 border-muted/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - Additional Info Cards */}
      <section className="py-12 md:py-16 mt-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* What's Included */}
            <div>
              <h2 className="text-3xl font-bold mb-6">What's Included</h2>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="text-primary flex-shrink-0" size={18} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Policies */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Booking Policies</h2>
              <div className="space-y-4">
                {policies.map((policy, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                        <div>
                          <h4 className="font-bold mb-2">{policy.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{policy.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Support */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-secondary to-secondary/50 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Phone size={20} className="text-primary" />
                  Need Help with Booking?
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our expert team is here to assist you with any questions or special requests. We're available 24/7 to help make your desert adventure perfect.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+12345678900" 
                    className="flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
                  >
                    <Phone size={16} />
                    +1 234 567 8900
                  </a>
                  <a 
                    href="mailto:bookings@desertdreams.com" 
                    className="flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
                  >
                    <Mail size={16} />
                    bookings@desertdreams.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Book With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied adventurers who have trusted us with their desert experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3">Secure & Safe</h3>
                <p className="text-muted-foreground">
                  SSL encrypted booking process with secure payment options and full insurance coverage.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3">5-Star Rated</h3>
                <p className="text-muted-foreground">
                  Over 2,000 five-star reviews from happy customers who experienced unforgettable adventures.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow duration-300 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-primary" size={32} />
                </div>
                <h3 className="font-bold text-xl mb-3">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Round-the-clock customer support before, during, and after your desert adventure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;