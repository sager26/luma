import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BookingButton from './BookingButton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 transition-all duration-300 border-b border-gold/10 backdrop-blur-md ${
          isScrolled ? 'py-4 bg-ink-dark/95' : 'py-6 bg-ink-dark/80'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <svg viewBox="0 0 500 500" className="w-[80px] md:w-[100px] h-auto transition-transform duration-500 group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E3C471" />
                  <stop offset="50%" stopColor="#F9F0B8" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="gold-text" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A353" />
                  <stop offset="25%" stopColor="#F2DDA5" />
                  <stop offset="50%" stopColor="#D1AC56" />
                  <stop offset="75%" stopColor="#F9ECC7" />
                  <stop offset="100%" stopColor="#C9A353" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="250" r="240" fill="#0A0A0A" />
              <circle cx="250" cy="250" r="236" fill="none" stroke="url(#gold-gradient)" strokeWidth="2" />
              <circle cx="250" cy="250" r="226" fill="none" stroke="url(#gold-gradient)" strokeWidth="4" />
              <text x="250" y="275" fontFamily="'Times New Roman', serif" fontSize="130" fontWeight="400" fill="url(#gold-text)" textAnchor="middle" letterSpacing="8">LUMA</text>
              <text x="250" y="335" fontFamily="'Arial', sans-serif" fontSize="18" fontWeight="300" fill="#C9A353" textAnchor="middle" letterSpacing="10" className="opacity-90">SIGNATURE MOCKTAILS</text>
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.22em] transition-colors hover:text-gold-warm ${
                  location.pathname === link.path ? 'text-gold-warm' : 'text-cream/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <BookingButton 
              text="Book Now"
            />
          </div>

          <button 
            className="md:hidden text-cream p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[110] bg-ink-dark/98 flex flex-col items-center justify-center gap-8"
          >
            <button 
              className="absolute top-6 right-6 text-cream/60 hover:text-cream p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-serif text-3xl font-light tracking-[0.1em] hover:text-gold-warm transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <BookingButton 
              text="Book Now"
              className="mt-4 w-full max-w-[200px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
