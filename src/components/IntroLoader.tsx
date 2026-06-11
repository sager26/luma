import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function IntroLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('luma_intro_shown');
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('luma_intro_shown', '1');
    }, 2400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 500 500" className="w-36 h-36" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gold-g-intro" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E3C471" />
                  <stop offset="50%" stopColor="#F9F0B8" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="gold-t-intro" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A353" />
                  <stop offset="25%" stopColor="#F2DDA5" />
                  <stop offset="50%" stopColor="#D1AC56" />
                  <stop offset="75%" stopColor="#F9ECC7" />
                  <stop offset="100%" stopColor="#C9A353" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="250" r="240" fill="#0A0A0A" />
              <circle cx="250" cy="250" r="236" fill="none" stroke="url(#gold-g-intro)" strokeWidth="2" />
              <circle cx="250" cy="250" r="226" fill="none" stroke="url(#gold-g-intro)" strokeWidth="4" />
              <text x="250" y="275" fontFamily="'Times New Roman', serif" fontSize="130" fontWeight="400"
                fill="url(#gold-t-intro)" textAnchor="middle" letterSpacing="8">LUMA</text>
              <text x="250" y="335" fontFamily="'Arial', sans-serif" fontSize="18" fontWeight="300"
                fill="#C9A353" textAnchor="middle" letterSpacing="10" opacity="0.9">SIGNATURE MOCKTAILS</text>
            </svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm font-serif italic text-gold-warm tracking-widest"
          >
            Amman's Premium Mocktail Bar
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
