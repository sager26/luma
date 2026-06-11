import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollProgress from './ScrollProgress';
import FloatingActionWidget from './FloatingActionWidget';
import IntroLoader from './IntroLoader';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

const ThreeBackground = lazy(() => import('./ThreeBackground'));

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30 selection:text-gold-pale transition-colors duration-1000 ease-in-out">
      <IntroLoader />
      <ScrollProgress />
      <Suspense fallback={
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-950 via-gray-950 to-black" />
      }>
        <ThreeBackground />
      </Suspense>
      <Navbar />

      <main className="flex-grow z-10">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingActionWidget />
    </div>
  );
}
