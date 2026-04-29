import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    { name: 'Gallery', path: '/gallery' },
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
            <svg viewBox="0 0 400 120" className="w-[100px] md:w-[120px] h-auto fill-cream transition-colors group-hover:fill-gold-warm">
              <text x="0" y="80" className="font-serif text-[72px] font-light tracking-[8px]">LUMA</text>
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
            <motion.a 
              href="https://wa.me/962792324444" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-luxury bg-gold text-ink font-medium border border-gold hover:bg-gold-warm hover:border-gold-warm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Book Now
            </motion.a>
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
            <motion.a 
              href="https://wa.me/962792324444" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-luxury bg-gold text-ink font-medium mt-4 w-full max-w-[200px] text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
