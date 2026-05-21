import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * AmbientBackground provides the luxurious, animated backdrop
 * with slow-spinning orbital rings.
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Dynamic Cursor Halo - handled by separate mouse listener to avoid React re-renders on every frame */}
      <CursorHalo />

      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-radial-gradient from-gold/10 via-gold/5 to-transparent pointer-events-none mix-blend-screen opacity-50" />

      {/* Orbital Rings - 3D Perspective */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <motion.div 
          className="absolute w-[320px] h-[320px] rounded-full border border-gold/20 shadow-[0_0_40px_rgba(201,162,58,0.15)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ perspective: '1000px', rotateX: '45deg' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full border border-gold/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ perspective: '1000px', rotateX: '-30deg', rotateY: '15deg' }}
        />
        <motion.div 
          className="absolute w-[680px] h-[680px] rounded-full border border-gold/10 shadow-[inset_0_0_60px_rgba(201,162,58,0.05)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ perspective: '1000px', rotateX: '10deg' }}
        />
      </div>

      {/* Floating 3D Diamonds (simulated with CSS + Motion) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (Math.random() * 60)}%`,
              perspective: "1000px"
            }}
            animate={{
              y: [0, -30, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 360, 720],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: 15 + (i * 2),
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-16 h-24 border border-gold/50 relative transform rotate-45 rotate-x-45" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(201,162,58,0.2) 0%, transparent 100%)',
                   boxShadow: '0 0 30px rgba(201,162,58,0.2), inset 0 0 20px rgba(201,162,58,0.2)'
                 }} 
            />
          </motion.div>
        ))}
      </div>

      {/* 3D Real-feel Parallax Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Distant Stars - slow, small, many */}
        <motion.div 
          className="absolute inset-0"
          animate={{ y: ['0%', '-5%'], x: ['0%', '-2%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        >
          {[...Array(60)].map((_, i) => (
            <div
              key={`dist-${i}`}
              className="absolute rounded-full bg-cream/80 shadow-[0_0_12px_rgba(255,252,245,0.9)]"
              style={{
                width: '1.5px',
                height: '1.5px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Mid-ground Stars - medium speed, some twinkling */}
        <motion.div 
          className="absolute inset-0"
          animate={{ y: ['0%', '-10%'], x: ['0%', '-4%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          style={{ translateZ: '100px' }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`mid-${i}`}
              className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"
              style={{
                width: '2px',
                height: '2px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Near 'Bright' Stars - fast, larger, intense twinkle */}
        <motion.div 
          className="absolute inset-0"
          animate={{ y: ['0%', '-20%'], x: ['0%', '-8%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          style={{ translateZ: '300px' }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`near-${i}`}
              className="absolute rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1),_0_0_40px_rgba(212,175,92,0.6)]"
              style={{
                width: '3px',
                height: '3px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                scale: [0.5, 2, 0.5],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Decorative Martini Glasses */}
      <motion.div 
        className="absolute top-[15%] left-[10%] text-gold-warm drop-shadow-[0_0_20px_rgba(212,175,92,0.4)] pointer-events-auto cursor-pointer group"
        animate={{ 
          rotateX: [-5, 10, -5, 8, -5],
          rotateY: [-10, 15, -12, 10, -10],
          rotateZ: [-8, 6, -5, 4, -8], 
          x: [0, 15, -10, 5, 0],
          y: [0, -20, 15, -10, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.98, 1.08, 0.95], opacity: [0.15, 0.25, 0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="group-hover:hidden"
        >
          <svg viewBox="0 0 24 24" width="200" height="200" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Glass bowl */}
            <path d="M4 6h16l-8 8-8-8z" fill="url(#liquidGrad)" strokeOpacity="0.8" />
            <path d="M4 6h16l-8 8-8-8z" fill="none" strokeWidth="1" />
            {/* Liquid line */}
            <path d="M7 9h10" strokeWidth="0.5" strokeOpacity="0.8" />
            {/* Stem */}
            <path d="M12 14v7" strokeWidth="1.5" />
            {/* Base */}
            <path d="M9 21h6" strokeWidth="1.5" />
            {/* Olive / Garnish */}
            <circle cx="15" cy="5" r="1.5" strokeWidth="1" />
            <path d="M12 10l4.5-6.5" strokeWidth="0.5" />
            
            <defs>
              <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Hover State: Glowing & Pulsing */}
        <motion.div
          animate={{ 
            scale: [1.1, 1.2, 1.1], 
            opacity: [0.8, 1, 0.8],
            filter: [
              "drop-shadow(0 0 20px rgba(212,175,92,0.8))",
              "drop-shadow(0 0 50px rgba(212,175,92,1))",
              "drop-shadow(0 0 20px rgba(212,175,92,0.8))"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden group-hover:block absolute inset-0"
        >
          <svg viewBox="0 0 24 24" width="200" height="200" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16l-8 8-8-8z" fill="url(#liquidGradHover)" strokeOpacity="1" />
            <path d="M4 6h16l-8 8-8-8z" fill="none" strokeWidth="1.5" />
            <path d="M7 9h10" strokeWidth="0.8" strokeOpacity="1" />
            <path d="M12 14v7" strokeWidth="2" />
            <path d="M9 21h6" strokeWidth="2" />
            <circle cx="15" cy="5" r="1.5" strokeWidth="1.5" />
            <path d="M12 10l4.5-6.5" strokeWidth="0.8" />
            <defs>
              <linearGradient id="liquidGradHover" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-[10%] right-[8%] text-gold-warm drop-shadow-[0_0_20px_rgba(212,175,92,0.4)] pointer-events-auto cursor-pointer group"
        animate={{ 
          rotateX: [8, -5, 10, -8, 8],
          rotateY: [15, -10, 8, -12, 15],
          rotateZ: [6, -8, 5, -5, 6], 
          x: [0, -20, 15, -10, 0],
          y: [0, 25, -15, 10, 0]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.98, 1.08, 0.95], opacity: [0.15, 0.25, 0.15, 0.3, 0.15] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="group-hover:hidden"
        >
          <svg viewBox="0 0 24 24" width="180" height="180" stroke="currentColor" strokeWidth="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Coup or different glass shape */}
            <path d="M3 8c0 4.97 4 9 9 9s9-4.03 9-9" fill="url(#coupGrad)" strokeOpacity="0.8" />
            <path d="M3 8c0 4.97 4 9 9 9s9-4.03 9-9" fill="none" strokeWidth="1" />
            {/* Top rim */}
            <path d="M3 8h18" strokeWidth="1" />
            {/* Liquid line */}
            <path d="M5 10c2.5 1.5 11.5 1.5 14 0" strokeWidth="0.5" fill="none" strokeOpacity="0.8" />
            {/* Stem */}
            <path d="M12 17v4" strokeWidth="1.5" />
            {/* Base */}
            <path d="M8 21h8" strokeWidth="1.5" />
            <defs>
              <linearGradient id="coupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Hover State: Glowing & Pulsing */}
        <motion.div
          animate={{ 
            scale: [1.1, 1.2, 1.1], 
            opacity: [0.8, 1, 0.8],
            filter: [
              "drop-shadow(0 0 20px rgba(212,175,92,0.8))",
              "drop-shadow(0 0 50px rgba(212,175,92,1))",
              "drop-shadow(0 0 20px rgba(212,175,92,0.8))"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden group-hover:block absolute inset-0"
        >
          <svg viewBox="0 0 24 24" width="180" height="180" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8c0 4.97 4 9 9 9s9-4.03 9-9" fill="url(#coupGradHover)" strokeOpacity="1" />
            <path d="M3 8c0 4.97 4 9 9 9s9-4.03 9-9" fill="none" strokeWidth="1.5" />
            <path d="M3 8h18" strokeWidth="1.5" />
            <path d="M5 10c2.5 1.5 11.5 1.5 14 0" strokeWidth="0.8" fill="none" strokeOpacity="1" />
            <path d="M12 17v4" strokeWidth="2" />
            <path d="M8 21h8" strokeWidth="2" />
            <defs>
              <linearGradient id="coupGradHover" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CursorHalo() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (circleRef.current) {
        // Use transform for performance
        circleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        circleRef.current.style.opacity = '1';
      }
    };

    const handleLeave = () => {
      if (circleRef.current) circleRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div 
      ref={circleRef}
      className="fixed top-0 left-0 -ml-[240px] -mt-[240px] w-[480px] h-[480px] pointer-events-none z-10 mix-blend-screen opacity-0 transition-opacity duration-700 ease-out"
      style={{
        background: 'radial-gradient(circle, rgba(212,175,92,0.1) 0%, rgba(184,145,42,0.04) 30%, transparent 60%)'
      }}
    />
  );
}
