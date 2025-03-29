
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Sun size={20} />;
    if (theme === 'light') return <Moon size={20} />;
    return <Laptop size={20} />;
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'glass py-3' : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-primary">Desert</span>Dreams
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-all">
            Home
          </Link>
          <Link to="/destinations" className="text-foreground hover:text-primary transition-all">
            Destinations
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-all">
            About Us
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-all">
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/50 transition-all"
            aria-label="Toggle theme"
            title={`Current theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>
          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-secondary/50 transition-all"
            aria-label="Toggle theme"
          >
            {getThemeIcon()}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-foreground hover:bg-secondary/50 transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass py-4 md:hidden animate-fade-in">
            <div className="container-custom flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary px-4 py-2 hover:bg-secondary/50 rounded-md transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/destinations"
                className="text-foreground hover:text-primary px-4 py-2 hover:bg-secondary/50 rounded-md transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary px-4 py-2 hover:bg-secondary/50 rounded-md transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary px-4 py-2 hover:bg-secondary/50 rounded-md transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/booking"
                className="btn-primary mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
