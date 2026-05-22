import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function FloatingActionWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <motion.a
            href="https://wa.me/962792324444"
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(201, 162, 58, 0.4)",
                "0 0 0 15px rgba(201, 162, 58, 0.1)",
                "0 0 0 30px rgba(201, 162, 58, 0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold-warm to-gold/80 text-ink-dark rounded-full shadow-[0_10px_30px_rgba(201,162,58,0.3)] hover:scale-110 transition-transform relative group"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-ink-dark/20" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink-dark/90 border border-gold/20 text-cream text-base uppercase tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
              Personal Concierge
            </div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
