import { motion } from 'motion/react';
import { GlassWater, Sparkles, Award, MapPin, Wind } from 'lucide-react';

function GalleryTile({ icon, className = "" }: any) {
  return (
    <motion.div 
      className={`relative aspect-[4/5] border border-gold/10 rounded-lg overflow-hidden bg-ink-card group hover:border-gold/30 transition-all flex items-center justify-center ${className}`}
      whileHover={{ y: -5 }}
    >
      {/* Visual Slot */}
      <div className="relative z-10 flex flex-col items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
        <div className="p-8 rounded-full border border-gold/10 group-hover:border-gold/30 transition-colors transform group-hover:scale-110 duration-700">
          {icon}
        </div>
        <div className="text-[8px] uppercase tracking-[0.5em] text-gold/40 group-hover:text-gold transition-colors">Luma Ritual</div>
      </div>

      {/* Light Sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Subtle Bottom Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <div className="pt-32 pb-32">
      <section className="text-center px-6 mb-24">
        <span className="label-micro block mb-4">The Visual Library</span>
        <h1 className="display text-5xl md:text-7xl mb-8">
          Atmospheric <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">Concepts</em>
        </h1>
        <p className="text-cream/50 text-sm max-w-xl mx-auto leading-relaxed">
          Each drink is a composition. Each setup, an installation. A glimpse into the Luma aesthetic.
        </p>
      </section>

      <div className="container px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tile 1: Atmospheric */}
        <GalleryTile 
          className="lg:row-span-2 lg:aspect-auto"
          icon={<Wind className="w-16 h-16 text-gold" />}
        />

        {/* Tile 2: The Craft */}
        <GalleryTile
          icon={<Sparkles className="w-12 h-12 text-gold" />}
        />

        {/* Tile 3: Detail */}
        <GalleryTile
          icon={<GlassWater className="w-12 h-12 text-gold" />}
        />

        {/* Tile 4: The Vibe (Wide) */}
        <GalleryTile 
          className="sm:col-span-2 aspect-auto h-full min-h-[300px]"
          icon={<Award className="w-20 h-20 text-gold" />}
        />

        {/* Tile 5: Minimalist */}
        <GalleryTile
          icon={<MapPin className="w-12 h-12 text-gold" />}
        />
      </div>
    </div>
  );
}
