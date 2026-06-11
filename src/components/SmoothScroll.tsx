import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const isTouch = typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches;
const prefersReduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isTouch || prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
