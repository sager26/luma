import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    author: "Zaina A.",
    role: "Private Event Host",
    text: "We had Luma for our anniversary party and it completely stole the show. The drinks were genuinely delicious—not just sweet juices—and the bar setup looked stunning. People literally wouldn't stop asking about the matcha yuzu drink."
  },
  {
    id: 2,
    author: "Yousef K.",
    role: "Corporate Planner",
    text: "Honestly, the easiest vendor we worked with for the firm's retreat. The team showed up early, handled the entire bar setup beautifully, and the mocktails were phenomenal. Real adult drinks, just without the alcohol."
  },
  {
    id: 3,
    author: "Mona R.",
    role: "Wedding Client",
    text: "I was worried about not having alcohol at the wedding, but Luma made it feel so high-end that no one even noticed. The personalized menu matching our wedding colors was such a beautiful touch. Highly recommend!"
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-dark/50 border-y border-cream/5" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-12">
          <Quote className="w-12 h-12 text-gold" />
        </div>
        
        <div className="min-h-[250px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-xl md:text-3xl lg:text-4xl font-serif text-cream italic drop-shadow-sm leading-relaxed max-w-3xl mb-10">
                "{testimonials[index].text}"
              </p>
              <div className="flex flex-col items-center gap-2">
                <span className="text-gold-warm font-medium tracking-wider uppercase text-base">
                  {testimonials[index].author}
                </span>
                <span className="text-cream text-base uppercase tracking-wider">
                  {testimonials[index].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                i === index ? 'bg-gold w-8' : 'bg-cream/10 hover:bg-cream/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
