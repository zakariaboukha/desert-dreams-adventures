
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

// Define explicit interface for navigation links
interface NavLink {
  to: string;
  text: string;
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

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

  const getThemeIcon = () => {
    return theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />;
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'glass py-3' : 'bg-transparent py-6'
  }`;

  // Define navLinks with explicit type to avoid deep instantiation
  const navLinks: NavLink[] = [
    { to: "/", text: t('navbar.home') },
    { to: "/destinations", text: t('navbar.destinations') },
    { to: "/about", text: t('navbar.about') },
    { to: "/contact", text: t('navbar.contact') },
  ];

  return (
    <nav className={navClasses}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-primary">Desert</span>Dreams
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className="text-foreground hover:text-primary transition-all">
              {link.text}
            </Link>
          ))}
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary/50 transition-all"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {getThemeIcon()}
          </button>
          <Link to="/booking" className="btn-primary">
            {t('common.book_now')}
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
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

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass py-4 md:hidden animate-fade-in">
            <div className="container-custom flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground hover:text-primary px-4 py-2 hover:bg-secondary/50 rounded-md transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
              <Link
                to="/booking"
                className="btn-primary mx-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.book_now')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
