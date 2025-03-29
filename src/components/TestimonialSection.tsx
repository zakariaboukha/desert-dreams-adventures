
import React from 'react';

const testimonials = [
  {
    quote: "The Sahara expedition exceeded all my expectations. The guides were knowledgeable and the scenery was breathtaking. Will definitely book again!",
    author: "Sarah Johnson",
    location: "New York, USA",
    avatar: "/images/avatar-1.jpg"
  },
  {
    quote: "Our family had an amazing time on the 4x4 desert adventure. The kids loved the dune bashing and the sunset views were spectacular.",
    author: "David Miller",
    location: "London, UK",
    avatar: "/images/avatar-2.jpg"
  },
  {
    quote: "As a photographer, I was blown away by the landscapes. Desert Dreams provided the perfect tour to capture the beauty of the dunes.",
    author: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "/images/avatar-3.jpg"
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading">What Our Adventurers Say</h2>
          <p className="section-subheading mx-auto">
            Don't just take our word for it - hear from those who've experienced our journeys
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-8 shadow-md glass"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <blockquote className="text-foreground/90 italic">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
