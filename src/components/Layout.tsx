import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AmbientBackground from './AmbientBackground';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

/**
 * Layout wraps all pages, providing navigation and global animations.
 */
export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30 selection:text-gold-pale">
      <AmbientBackground />
      <Navbar />
      
      <main className="flex-grow z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
