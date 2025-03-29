
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { CheckCircle } from 'lucide-react';

const Booking: React.FC = () => {
  const bookingProcess = [
    {
      title: "Submit Request",
      description: "Fill out the booking form with your preferred tour, dates, and details."
    },
    {
      title: "Quick Confirmation",
      description: "Our team reviews your request and confirms availability within 24 hours."
    },
    {
      title: "Secure Payment",
      description: "Complete your booking with a secure deposit payment via credit card or bank transfer."
    },
    {
      title: "Prepare for Adventure",
      description: "Receive detailed information about your tour and what to pack and expect."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Book Your Desert Adventure
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Ready to experience the magic of the desert? Start your journey by booking your perfect tour.
          </p>
        </div>
      </div>
      
      {/* Booking Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Process */}
            <div>
              <h2 className="text-2xl font-bold mb-6">How Booking Works</h2>
              <div className="mb-8">
                <p className="text-foreground/80 mb-6">
                  Booking your desert adventure with us is simple and secure. Follow these steps to begin your journey:
                </p>
                
                <div className="space-y-6">
                  {bookingProcess.map((step, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                        <p className="text-foreground/80">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Booking Policies</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Flexible Cancellation</h4>
                    <p className="text-foreground/80">Full refund if cancelled 7+ days before the tour. 50% refund if cancelled 3-6 days before.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Secure Deposit</h4>
                    <p className="text-foreground/80">30% deposit to secure your booking, with the balance due 14 days before your tour.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Weather Guarantee</h4>
                    <p className="text-foreground/80">In case of extreme weather conditions, we offer rebooking or full refund options.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-primary shrink-0 mr-2 mt-1" size={18} />
                  <div>
                    <h4 className="font-bold">Group Discounts</h4>
                    <p className="text-foreground/80">Special rates available for groups of 6 or more people booking together.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Need Help with Booking?</h3>
                <p className="text-foreground/80 mb-4">
                  Our team is here to assist you with any questions or special requests.
                </p>
                <div className="flex items-center gap-4">
                  <a href="tel:+12345678900" className="text-primary font-medium hover:underline">
                    +1 234 567 8900
                  </a>
                  <a href="mailto:bookings@desertdreams.com" className="text-primary font-medium hover:underline">
                    bookings@desertdreams.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Booking;
