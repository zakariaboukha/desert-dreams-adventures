
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-primary">Desert</span>Dreams
            </h3>
            <p className="text-muted-foreground">
              Discover the magic of desert adventures with our premium tours and excursions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-primary transition-all">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tours */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Popular Tours</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/sahara-expedition" className="text-muted-foreground hover:text-primary transition-all">
                  Sahara Expedition
                </Link>
              </li>
              <li>
                <Link to="/destinations/desert-oasis" className="text-muted-foreground hover:text-primary transition-all">
                  Desert Oasis Tour
                </Link>
              </li>
              <li>
                <Link to="/destinations/canyon-adventure" className="text-muted-foreground hover:text-primary transition-all">
                  Canyon Adventure
                </Link>
              </li>
              <li>
                <Link to="/destinations/sunset-safari" className="text-muted-foreground hover:text-primary transition-all">
                  Sunset Safari
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-primary" size={18} />
                <span className="text-muted-foreground">
                  123 Desert Road, Oasis City, Sahara
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-primary" size={18} />
                <span className="text-muted-foreground">+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-primary" size={18} />
                <span className="text-muted-foreground">info@desertdreams.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Desert Dreams Adventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
