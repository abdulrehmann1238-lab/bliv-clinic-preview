import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bliv-surface/95 backdrop-blur-md border-b border-bliv-border shadow-subtle py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-bliv-dark flex items-center justify-center transition-transform group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h5m4 0h5M12 5v5m0 4v5" stroke="#DDE8DF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-bliv-dark">
              BLIV
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-bliv-text-secondary">
            <button
              onClick={() => scrollToSection('platform')}
              className="hover:text-bliv-dark transition-colors"
            >
              Platform
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-bliv-dark transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('workflow')}
              className="hover:text-bliv-dark transition-colors"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('security')}
              className="hover:text-bliv-dark transition-colors"
            >
              Security
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-bliv-dark transition-colors"
            >
              About
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-bliv-text-primary hover:text-bliv-dark px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/app')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Explore workspace
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-bliv text-bliv-text-secondary hover:text-bliv-dark hover:bg-bliv-surface-secondary"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bliv-surface border-b border-bliv-border px-4 pt-3 pb-6 space-y-3 shadow-card animate-fadeIn">
          <button
            onClick={() => scrollToSection('platform')}
            className="block w-full text-left py-2 text-sm font-medium text-bliv-text-secondary hover:text-bliv-dark"
          >
            Platform
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 text-sm font-medium text-bliv-text-secondary hover:text-bliv-dark"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="block w-full text-left py-2 text-sm font-medium text-bliv-text-secondary hover:text-bliv-dark"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollToSection('security')}
            className="block w-full text-left py-2 text-sm font-medium text-bliv-text-secondary hover:text-bliv-dark"
          >
            Security
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-sm font-medium text-bliv-text-secondary hover:text-bliv-dark"
          >
            About
          </button>

          <div className="pt-3 border-t border-bliv-border flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full text-center py-2 text-sm font-medium text-bliv-text-primary"
            >
              Sign in
            </Link>
            <Button
              className="w-full"
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/app');
              }}
            >
              Explore workspace
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
