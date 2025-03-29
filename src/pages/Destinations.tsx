
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/data/destinations';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

const Destinations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [durationFilter, setDurationFilter] = useState('all');
  
  // Filter destinations based on search term and duration
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        destination.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration = durationFilter === 'all' || 
                          (durationFilter === 'short' && parseInt(destination.duration.split(' ')[0]) <= 2) ||
                          (durationFilter === 'medium' && parseInt(destination.duration.split(' ')[0]) > 2 && parseInt(destination.duration.split(' ')[0]) <= 4) ||
                          (durationFilter === 'long' && parseInt(destination.duration.split(' ')[0]) > 4);
    
    return matchesSearch && matchesDuration;
  });
  
  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration-short':
        return parseInt(a.duration.split(' ')[0]) - parseInt(b.duration.split(' ')[0]);
      case 'duration-long':
        return parseInt(b.duration.split(' ')[0]) - parseInt(a.duration.split(' ')[0]);
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <div 
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url(/images/destinations-header.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our Desert Adventures
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover our range of unique desert experiences and find your perfect adventure
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <section className="py-8 bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  id="search"
                  placeholder="Search destinations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Sort By */}
            <div>
              <Label htmlFor="sort" className="mb-2 block">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="duration-short">Duration: Shortest First</SelectItem>
                  <SelectItem value="duration-long">Duration: Longest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Duration Filter */}
            <div>
              <Label htmlFor="duration" className="mb-2 block">Duration</Label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Filter by duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="short">Short (1-2 days)</SelectItem>
                  <SelectItem value="medium">Medium (3-4 days)</SelectItem>
                  <SelectItem value="long">Long (5+ days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container-custom">
          {sortedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedDestinations.map((destination) => (
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
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-2">No destinations found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Destinations;
