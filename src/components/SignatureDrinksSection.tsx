import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { GlassWater, Martini, Beer, X, ChevronRight } from 'lucide-react'; // Using icons to represent cup types
import TasteProfileQuiz from './TasteProfileQuiz';

const signatureDrinks = [
  {
    name: "Saffron Elixir",
    tagline: "Warm, luminous, unmistakably luxurious",
    cup: "Martini Glass",
    icon: Martini,
    image: "/IMG_5409.JPG",
    colorClass: "from-amber-900/40 via-ink-card to-transparent",
    borderClass: "border-amber-500/30",
    hoverBorder: "hover:border-amber-500/60",
    textClass: "text-amber-400",
    desc: "A luminous blend of saffron-infused nectar, delicate citrus notes, and a hint of organic honey. Served in a chilled martini glass, this drink is the epitome of golden luxury."
  },
  {
    name: "Hibiscus Tonic",
    tagline: "Sharp, layered — hibiscus meets premium tonic",
    cup: "Rocks Glass",
    icon: GlassWater,
    image: "/IMG_5417.JPG",
    colorClass: "from-rose-900/40 via-ink-card to-transparent",
    borderClass: "border-rose-500/30",
    hoverBorder: "hover:border-rose-500/60",
    textClass: "text-rose-400",
    desc: "Cold-brewed crimson hibiscus flowers paired with a sharp, premium botanical tonic and a twist of fresh orange peel. A layered, visually striking refreshment."
  },
  {
    name: "Mango Velvet",
    tagline: "Rich, smooth, a dessert experience in a coupe",
    cup: "Coupe Glass",
    icon: Martini,
    image: "/IMG_5418.JPG",
    colorClass: "from-yellow-900/40 via-ink-card to-transparent",
    borderClass: "border-yellow-500/30",
    hoverBorder: "hover:border-yellow-500/60",
    textClass: "text-yellow-400",
    desc: "A velvety, rich puree of perfectly ripe Alphonso mangoes, gently shaken with coconut cream and served in an elegant coupe. A luxurious dessert-like experience."
  },
  {
    name: "Crimson Hibiscus",
    tagline: "Bright, tart, deep crimson — impossible to ignore",
    cup: "Martini Glass",
    icon: Martini,
    image: "/IMG_5410.JPG",
    colorClass: "from-red-900/40 via-ink-card to-transparent",
    borderClass: "border-red-500/30",
    hoverBorder: "hover:border-red-500/60",
    textClass: "text-red-500",
    desc: "A bold, tart infusion of wild hibiscus and pomegranate molasses. Served straight-up with a candied ginger garnish that adds a finishing kick."
  },
  {
    name: "Orchard Ginger",
    tagline: "Crisp, juicy, with a clean ginger warmth",
    cup: "Highball Glass",
    icon: Beer, // Highball representation
    image: "/IMG_5416.JPG",
    colorClass: "from-lime-900/40 via-ink-card to-transparent",
    borderClass: "border-lime-500/30",
    hoverBorder: "hover:border-lime-500/60",
    textClass: "text-lime-400",
    desc: "Freshly pressed green apple juice naturally carbonated, layered over a fiery home-made ginger syrup. Tall, crisp, and incredibly refreshing."
  },
  {
    name: "Jallab Royale",
    tagline: "Aromatic, layered, unmistakably Luma",
    cup: "Rocks Glass",
    icon: GlassWater,
    image: "/IMG_5408.JPG",
    colorClass: "from-orange-900/40 via-ink-card to-transparent",
    borderClass: "border-orange-500/30",
    hoverBorder: "hover:border-orange-500/60",
    textClass: "text-orange-400",
    desc: "Our elevated take on the traditional Jallab. Date syrup and rose water are smoked with authentic incense, topped with pine nuts and served over single-block ice."
  },
  {
    name: "Spiced Orchard",
    tagline: "Apple and warm spice — autumn warmth",
    cup: "Rocks Glass",
    icon: GlassWater,
    image: "/IMG_5411.JPG",
    colorClass: "from-emerald-900/40 via-ink-card to-transparent",
    borderClass: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-500/60",
    textClass: "text-emerald-400",
    desc: "A complex, earthy mix of baked apple extraction, cinnamon bark, and star anise. Served over a large rock with a sugar-spiced rim."
  }
];

function SkeletonDrinkCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-cream/5 bg-ink-dark/50 backdrop-blur-sm animate-pulse shadow-sm">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-base/50 border-b border-cream/5" />
      <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20 -mt-12 bg-ink-dark/80 rounded-b-2xl">
        <div className="w-14 h-14 rounded-full bg-ink-base border border-cream/5 mb-6 shadow-xl relative z-20" />
        <div className="h-8 bg-ink-base/80 rounded-md w-3/4 mb-3" />
        <div className="h-3 bg-ink-base/60 rounded w-1/2 mb-5" />
        <hr className="border-t border-cream/5 my-2" />
        <div className="space-y-3 mt-4">
          <div className="h-3 bg-ink-base/50 rounded w-full" />
          <div className="h-3 bg-ink-base/50 rounded w-5/6" />
          <div className="h-3 bg-ink-base/50 rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

export default function SignatureDrinksSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState<typeof signatureDrinks[0] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Premium deliberate loading delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="label-micro block mb-4 text-gold-warm">The Menu</span>
          <h2 className="display text-4xl md:text-6xl text-cream tracking-tight">Signature Serves</h2>
          <p className="text-cream mt-6 max-w-2xl mx-auto font-medium">
            Designed to stand alongside the world's finest cocktails. 
            Explore our collection to discover their unique profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <SkeletonDrinkCard key={idx} />
            ))
          ) : (
            signatureDrinks.map((drink, idx) => {
              const Icon = drink.icon;

              return (
                <motion.div
                key={drink.name}
                layoutId={`card-${drink.name}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setSelectedDrink(drink)}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-ink-dark/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] cursor-pointer ${drink.borderClass} ${drink.hoverBorder}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-base border-b border-cream/5">
                  <motion.img 
                    layoutId={`image-${drink.name}`}
                    src={drink.image} 
                    alt={`${drink.name} - Bespoke premium non-alcoholic mocktail catering for luxury corporate events and exclusive weddings in Amman, Jordan`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/10 to-transparent opacity-90`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${drink.colorClass} opacity-20 mix-blend-overlay z-0 transition-opacity duration-500 group-hover:opacity-40`} />
                  <div className="absolute top-4 right-4 text-base uppercase tracking-wider text-cream font-mono px-3 py-1.5 bg-ink-dark/60 backdrop-blur-md rounded-full border border-cream/10 z-10">
                    {drink.cup}
                  </div>
                </div>
                
                <motion.div layoutId={`content-${drink.name}`} className="p-6 md:p-8 flex-1 flex flex-col relative z-20 -mt-12">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-full bg-ink-dark border ${drink.borderClass} ${drink.textClass} mb-6 shadow-2xl relative z-20 backdrop-blur-md transition-transform duration-500 group-hover:scale-110`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <motion.h3 layoutId={`title-${drink.name}`} className="display text-2xl md:text-3xl mb-2 text-cream transition-colors duration-300">
                    {drink.name}
                  </motion.h3>
                  <p className={`text-base md:text-base tracking-wide uppercase font-medium ${drink.textClass} mb-4`}>
                    {drink.tagline}
                  </p>
                  
                  <hr className={`border-t ${drink.borderClass} my-2 opacity-30`} />
                  
                  <p className="text-cream text-base md:text-base leading-relaxed font-medium mt-4 mb-4 flex-1 line-clamp-3">
                    {drink.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })
          )}
        </div>

        <TasteProfileQuiz />
      </div>

      <AnimatePresence>
        {selectedDrink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-ink-dark/95"
            onClick={() => setSelectedDrink(null)}
          >
            <motion.div
              layoutId={`card-${selectedDrink.name}`}
              className={`relative w-full max-w-3xl bg-ink-card rounded-2xl overflow-hidden border shadow-2xl ${selectedDrink.borderClass}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video sm:aspect-[21/9]">
                <motion.img
                  layoutId={`image-${selectedDrink.name}`}
                  src={selectedDrink.image}
                  alt={`${selectedDrink.name} signature drink - Exquisite non-alcoholic beverage catering for events in Amman, Jordan`}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/50 to-transparent`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedDrink.colorClass} opacity-30 mix-blend-overlay`} />
                <button 
                  onClick={() => setSelectedDrink(null)}
                  className="absolute top-4 right-4 bg-ink-dark/50 p-2 rounded-full backdrop-blur-md text-cream hover:text-gold-warm border border-cream/10 hover:border-gold/30 transition-all z-50"
                >
                  <X size={20} />
                </button>
              </div>
              <motion.div layoutId={`content-${selectedDrink.name}`} className="p-8 md:p-12 -mt-16 md:-mt-20 relative z-20">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-ink-dark border ${selectedDrink.borderClass} ${selectedDrink.textClass} shadow-2xl backdrop-blur-md`}>
                    <selectedDrink.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="px-4 py-2 border border-cream/10 bg-ink-dark/50 backdrop-blur-md rounded-full">
                    <span className="text-base md:text-base uppercase tracking-wider text-cream font-mono">
                      Served in {selectedDrink.cup}
                    </span>
                  </div>
                </div>
                
                <motion.h3 layoutId={`title-${selectedDrink.name}`} className="display text-3xl md:text-5xl mb-3 text-cream">
                  {selectedDrink.name}
                </motion.h3>
                <p className={`text-base md:text-base tracking-wider uppercase font-medium ${selectedDrink.textClass} mb-6`}>
                  {selectedDrink.tagline}
                </p>
                
                <hr className={`border-t ${selectedDrink.borderClass} my-6 opacity-30`} />
                
                <p className="text-cream text-lg md:text-xl font-medium leading-relaxed mb-8">
                  {selectedDrink.desc}
                </p>

                <div className="flex justify-between items-center mt-4">
                   <button 
                      onClick={() => setSelectedDrink(null)}
                      className="px-4 py-2 text-cream hover:text-cream transition-colors text-base uppercase tracking-wider"
                   >
                     Close
                   </button>
                   <button 
                      onClick={() => {
                        navigate('/contact', { state: { inquiryDrink: selectedDrink.name } });
                        setSelectedDrink(null);
                      }}
                      className="px-6 py-3 bg-gold/10 text-gold-warm hover:bg-gold/20 border border-gold/30 rounded-full transition-all text-base uppercase tracking-wider flex items-center gap-2"
                   >
                     Quick Add to Inquiry <ChevronRight size={16} />
                   </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
