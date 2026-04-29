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

      {/* Orbital Rings - 3D Perspective */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <motion.div 
          className="absolute w-[320px] h-[320px] rounded-full border border-gold/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ perspective: '1000px', rotateX: '45deg' }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full border border-gold/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          style={{ perspective: '1000px', rotateX: '-30deg', rotateY: '15deg' }}
        />
        <motion.div 
          className="absolute w-[680px] h-[680px] rounded-full border border-gold/5"
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
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{
              duration: 15 + (i * 2),
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-16 h-24 border border-gold/40 relative transform rotate-45 rotate-x-45" 
                 style={{ 
                   background: 'linear-gradient(135deg, rgba(184,145,42,0.1) 0%, transparent 100%)',
                   boxShadow: 'inset 0 0 20px rgba(184,145,42,0.1)'
                 }} 
            />
          </motion.div>
        ))}
      </div>

      {/* High-intensity Shiny Stars (3D felt points) */}
      <div className="absolute inset-0 z-0">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() > 0.8 ? '3px' : '1.5px',
              height: Math.random() > 0.8 ? '3px' : '1.5px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Decorative Glyphs */}
      <motion.div 
        className="absolute top-[15%] left-[10%] text-gold-warm text-[clamp(120px,15vw,200px)] font-serif drop-shadow-[0_0_40px_rgba(212,175,92,0.6)]"
        animate={{ 
          rotateX: [-25, 25],
          rotateY: [-25, 25],
          rotateZ: [-15, 15], 
          scale: [1, 1.1, 1],
          y: [0, 20, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: "1000px" }}
      >
        ✦
      </motion.div>
      <motion.div 
        className="absolute bottom-[10%] right-[8%] text-gold-warm text-[clamp(120px,15vw,200px)] font-serif drop-shadow-[0_0_40px_rgba(212,175,92,0.6)]"
        animate={{ 
          rotateX: [25, -25],
          rotateY: [25, -25],
          rotateZ: [15, -15], 
          scale: [1, 1.1, 1],
          y: [0, -30, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ perspective: "1000px" }}
      >
        ✦
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
