
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(/images/about-header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About Desert Dreams
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our story, mission, and passion for desert adventures
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-foreground/80 mb-4">
                Desert Dreams Adventures began with a passionate group of desert enthusiasts who wanted to share the magic and beauty of desert landscapes with the world. Founded in 2010, our journey started with just two 4x4 vehicles and a deep love for the golden dunes of the Sahara.
              </p>
              <p className="text-foreground/80 mb-4">
                Over the years, we've grown into a premier desert tour company, but our core mission remains unchanged: to provide authentic, sustainable, and unforgettable desert experiences while respecting the delicate ecosystems and cultures of these magnificent environments.
              </p>
              <p className="text-foreground/80">
                Today, Desert Dreams operates across multiple desert regions, offering a variety of tours from adrenaline-pumping adventures to cultural experiences and peaceful retreats. What sets us apart is our commitment to small group sizes, expert local guides, and responsible tourism practices.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/images/about-story.jpg" 
                alt="Desert Dreams team" 
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute bottom-0 right-0 transform translate-x-1/3 translate-y-1/3">
                <div className="bg-card shadow-xl rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">12+</div>
                  <div className="text-foreground/80">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/mission-1.jpg" 
                  alt="Desert conservation" 
                  className="rounded-lg w-full h-auto"
                />
                <img 
                  src="/images/mission-2.jpg" 
                  alt="Local communities" 
                  className="rounded-lg w-full h-auto mt-8"
                />
                <img 
                  src="/images/mission-3.jpg" 
                  alt="Desert adventure" 
                  className="rounded-lg w-full h-auto"
                />
                <img 
                  src="/images/mission-4.jpg" 
                  alt="Cultural experiences" 
                  className="rounded-lg w-full h-auto mt-8"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-foreground/80 mb-6">
                At Desert Dreams, we're committed to sharing the wonder of desert landscapes while preserving their natural beauty and cultural heritage for future generations.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-primary mr-2 mt-1" size={20} />
                  <p><strong>Sustainable Tourism:</strong> We minimize our environmental footprint through responsible practices and support local conservation efforts.</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 mt-1" size={20} />
                  <p><strong>Cultural Respect:</strong> We engage meaningfully with local communities and ensure our tours benefit the people who call the desert home.</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 mt-1" size={20} />
                  <p><strong>Safety First:</strong> The desert can be challenging, which is why we prioritize the safety and comfort of our guests through rigorous standards.</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 mt-1" size={20} />
                  <p><strong>Authentic Experiences:</strong> We go beyond tourist trails to provide genuine connections with desert landscapes and cultures.</p>
                </div>
              </div>
              
              <Link to="/destinations" className="btn-primary inline-flex items-center">
                Explore Our Tours
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-heading">Meet Our Team</h2>
            <p className="section-subheading mx-auto">
              Our experienced guides and passionate team members make your adventure unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative mb-4 rounded-lg overflow-hidden aspect-square">
                <img 
                  src="/images/team-1.jpg" 
                  alt="Ahmed Hassan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Ahmed Hassan</h3>
              <p className="text-primary mb-2">Founder & Lead Guide</p>
              <p className="text-foreground/80">
                Born in the desert, Ahmed has 15+ years of experience leading expeditions across the Sahara.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative mb-4 rounded-lg overflow-hidden aspect-square">
                <img 
                  src="/images/team-2.jpg" 
                  alt="Sophia Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Sophia Rodriguez</h3>
              <p className="text-primary mb-2">Operations Director</p>
              <p className="text-foreground/80">
                With a background in sustainable tourism, Sophia ensures our adventures are both amazing and responsible.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative mb-4 rounded-lg overflow-hidden aspect-square">
                <img 
                  src="/images/team-3.jpg" 
                  alt="Malik Ibrahim" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Malik Ibrahim</h3>
              <p className="text-primary mb-2">Senior Desert Guide</p>
              <p className="text-foreground/80">
                An expert in desert navigation and survival, Malik brings passion and safety to every journey.
              </p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="relative mb-4 rounded-lg overflow-hidden aspect-square">
                <img 
                  src="/images/team-4.jpg" 
                  alt="Emma Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Emma Chen</h3>
              <p className="text-primary mb-2">Customer Experience</p>
              <p className="text-foreground/80">
                Dedicated to creating perfect journeys, Emma ensures every detail of your adventure exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Banner */}
      <section 
        className="py-20 relative" 
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/testimonial-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <div className="text-5xl font-serif text-white mb-6">"</div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-heading italic">
            Desert Dreams delivered an experience that was truly life-changing. The guides' knowledge of the desert and passion for sharing its beauty made this journey unforgettable. I've traveled extensively, but this adventure stands out as one of my all-time favorites.
          </p>
          <div className="text-white font-bold">Michael Stevens, Adventure Photographer</div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
