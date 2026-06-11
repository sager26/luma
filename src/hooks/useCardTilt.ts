import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

const isTouch = typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches;

interface CardTilt {
  cardRef: React.RefObject<HTMLElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

export function useCardTilt(maxDeg = 4): CardTilt {
  const cardRef = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 });

  const rotateX = useTransform(springY, [-100, 100], [maxDeg, -maxDeg]);
  const rotateY = useTransform(springX, [-100, 100], [-maxDeg, maxDeg]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouch || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;

    x.set((cx / r.width - 0.5) * 200);
    y.set((cy / r.height - 0.5) * 200);

    const px = ((cx / r.width) - 0.5) * -15;
    const py = ((cy / r.height) - 0.5) * -15;
    cardRef.current.style.setProperty('--mx', `${cx}px`);
    cardRef.current.style.setProperty('--my', `${cy}px`);
    cardRef.current.style.setProperty('--px', `${px}px`);
    cardRef.current.style.setProperty('--py', `${py}px`);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--mx', '-200px');
      cardRef.current.style.setProperty('--my', '-200px');
      cardRef.current.style.setProperty('--px', '0px');
      cardRef.current.style.setProperty('--py', '0px');
    }
  };

  return { cardRef, rotateX, rotateY, onMouseMove, onMouseLeave };
}
