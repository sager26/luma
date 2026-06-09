import { motion } from 'motion/react';
import { Star, MessageCircle } from 'lucide-react';

export default function TestimonialCarousel() {
  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-dark/50 border-y border-cream/5" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <h2 className="display text-3xl md:text-5xl text-cream leading-tight max-w-2xl">
            Be among our <em className="text-gold-warm italic">founding clients.</em>
          </h2>
          <p className="text-cream text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Luma is launching exclusively in Amman. We're accepting a select number of founding events for Summer & Autumn 2026 — events that will shape our story.
          </p>
          <a
            href="https://wa.me/962792324444?text=Hi%20Luma%2C%20I%27d%20like%20to%20enquire%20about%20a%20mocktail%20bar%20for%20my%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 text-base font-bold rounded uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-ink transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Enquire on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
