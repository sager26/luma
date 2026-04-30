import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * PackageCard with subtle 3D tilt effect on mouse hover.
 */
function PackageCard({ 
  tier, name, tagline, guests, hours, staff, features, menuTease, note, featured = false, delay = 0 
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Calculate rotation (-3 to 3 degrees)
    const rx = ((y / r.height) - 0.5) * -4;
    const ry = ((x / r.width) - 0.5) * 4;
    
    // Parallax values for inner elements
    const px = ((x / r.width) - 0.5) * -15;
    const py = ((y / r.height) - 0.5) * -15;
    
    cardRef.current.style.setProperty('--rx', `${rx}deg`);
    cardRef.current.style.setProperty('--ry', `${ry}deg`);
    cardRef.current.style.setProperty('--px', `${px}px`);
    cardRef.current.style.setProperty('--py', `${py}px`);
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
    cardRef.current.style.setProperty('--px', '0px');
    cardRef.current.style.setProperty('--py', '0px');
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1 }}
      className={`relative group bg-ink-card/50 border border-gold/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(184,145,42,0.1)] ${
        featured ? 'ring-1 ring-gold/20' : ''
      }`}
      style={{
        transform: 'perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Mouse Halo */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: 'radial-gradient(circle 350px at var(--mx, -200px) var(--my, -200px), rgba(184,145,42,0.12) 0%, transparent 60%)'
        }}
      />

      {featured && (
        <div className="absolute top-6 -right-10 rotate-[35deg] bg-gradient-to-r from-gold to-gold-warm text-ink text-[10px] font-bold tracking-[0.2em] uppercase py-1 px-12 z-20 shadow-lg">
          Most Booked
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 border-b border-gold/10 flex flex-col md:flex-row md:items-end justify-between gap-8 bg-ink-card/40">
        <div className="max-w-md">
          <div className="label-micro mb-4">{tier}</div>
          <h2 className="display text-4xl mb-4">The <em className="text-gold-warm italic">{name}</em></h2>
          <p className="text-sm text-cream/50 leading-relaxed font-light">{tagline}</p>
        </div>
        <div className="flex gap-8 border-t border-gold/10 md:border-none pt-6 md:pt-0">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-warm mb-2 border-b border-gold/20 pb-1">Guests</div>
            <div className="display text-3xl text-cream drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{guests}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-warm mb-2 border-b border-gold/20 pb-1">Hours</div>
            <div className="display text-3xl text-cream drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{hours}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-warm mb-2 border-b border-gold/20 pb-1">Staff</div>
            <div className="display text-3xl text-cream drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{staff}</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div 
          className="transition-transform duration-200 ease-out will-change-transform"
          style={{ transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)' }}
        >
          <div className="label-micro text-gold/60 mb-6 block">What's Included</div>
          <ul className="space-y-4">
            {features.map((f: string, i: number) => (
              <motion.li 
                key={i} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.5 + (i * 0.1), duration: 0.5 }}
                className="text-sm text-cream/70 flex items-start gap-3 leading-relaxed"
              >
                <span className="text-gold text-[10px] mt-1.5">✦</span>
                <span className="font-light">{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative">
          {/* Subtle decorative background glyph for the tease box */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gold/5 text-8xl font-serif select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">✦</div>
          <div className="p-8 border border-gold/5 rounded bg-gold/5 relative overflow-hidden group/menu">
            <div className="label-micro text-gold-warm mb-3">Service Focus</div>
            <p className="font-serif italic text-lg text-cream/80 leading-relaxed">{menuTease}</p>
          </div>
          <div className="mt-8 text-xs text-cream/30 italic font-serif leading-relaxed px-1">
            "{note}"
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-12 py-6 bg-ink-dark/30 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gold/10 backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
          Enquire for flat-rate inclusive pricing
        </p>
        <a 
          href={`https://wa.me/962792324444?text=Hi, I'm interested in The ${name} package.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury bg-gold text-ink font-bold w-full sm:w-auto text-center"
        >
          Enquire Now
        </a>
      </div>
    </motion.article>
  );
}

export default function Packages() {
  return (
    <div className="pt-32 pb-32">
      <section className="text-center px-6 mb-24">
        <div className="header-line mx-auto w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mb-8 opacity-40" />
        <span className="label-micro block mb-4">Our Packages</span>
        <h1 className="display text-5xl md:text-7xl mb-8">
          One signature <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">tier each.</em>
        </h1>
        <p className="text-cream/50 text-sm max-w-xl mx-auto leading-relaxed">
          Flat-rate, fully inclusive. No per-person surprises. Tell us your date and guest count, and we'll match you with the right architecture.
        </p>
      </section>

      <div className="container px-6">
        <div className="flex flex-col gap-12">
          <PackageCard 
            tier="Tier I · Classic"
            name="Gathering"
            tagline="Intimate ceremonies, morning receptions, or private gallery events. Precise service, no compromise on character."
            guests="Up to 80"
            hours="3"
            staff="1 to 2"
            features={[
              "Focused service from the Classic botanical menu",
              "Premium glassware: Rocks and Highballs",
              "Single Luma branded bar station",
              "Standard drink display plating",
              "Full setup, glassware logistic & teardown"
            ]}
            menuTease="Four signature drinks, anchored by a Luma signature creation. Minimalist and refined."
            note="Perfectly shaped for gatherings that command quiet elegance."
            delay={0.1}
          />

          <PackageCard 
            tier="Tier II · Premium"
            name="Soirée"
            tagline="The defining package for weddings and luxury evening events. A full suite of glassware and a larger team to manage the ritual."
            guests="80 to 200"
            hours="4 to 5"
            staff="2 to 3"
            features={[
              "Complete service from the Premium Signature menu",
              "Full crystal suite: Martinis, Highballs, and Rocks",
              "2 to 3 specialized bartenders for high-tempo service",
              "Custom printed table menus for your event",
              "Pre-event planning consultation with our team"
            ]}
            menuTease="Five elevated recipes including our most iconic signature pour. Complex and visually striking."
            note="Our most-booked tier, scaling effortlessly to Amman's finest venues."
            featured={true}
            delay={0.2}
          />

          <PackageCard 
            tier="Tier III · Grand"
            name="Estate"
            tagline="For grand estate celebrations and high-count weddings. Double station service, arrival greeting, and exclusive recipes."
            guests="200 to 400"
            hours="5 to 6+"
            staff="3 to 5"
            features={[
              "The most expansive Luma menu including exclusive Tier III recipes",
              "Tray-service greeting on guest arrival with welcome pours",
              "Double-station bar setup to eliminate wait times",
              "Complimentary private pre-event tasting session",
              "Elite staffing ratio for a high-touch experience"
            ]}
            menuTease="Six curated drinks, including a single recipe revealed only for your specific event date."
            note="The pinnacle of mobile bar service in the kingdom."
            delay={0.3}
          />
        </div>

        {/* Enhancements */}
        <section className="mt-32">
          <div className="text-center mb-16 px-6">
            <span className="label-micro block mb-4 text-gold">Enhancements</span>
            <h2 className="display text-4xl md:text-6xl mb-6">Fine Details</h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto font-light leading-relaxed">
              Available across all tiers. Mention what catches your eye when you enquire, and we'll recommend what suits your event architecture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-8">
            {[
              { title: "Custom Printed Menus", desc: "Per-table cards with event branding and drink descriptions." },
              { title: "Personalised Drink Cards", desc: "A printed card per guest with their name and selected drink." },
              { title: "Pre-Event Tasting", desc: "A 30-minute private session to finalise your signature flavours." },
              { title: "Welcome Drink Upgrade", desc: "Arrival tray service with initial pours for all arriving guests." },
              { title: "Extra Service Hour", desc: "Extend your bar service by one full hour (subject to scheduling)." },
              { title: "Experience Station", desc: "An interactive bar where guests customise their botanical profiles." },
              { title: "Recipe Booklet", desc: "A personalised printed booklet of drinks served at your event." }
            ].map((a, i) => (
              <a 
                key={i} 
                href={`https://wa.me/962792324444?text=${encodeURIComponent(`Hi, I'm interested in adding the "${a.title}" enhancement to my event.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 border border-gold/10 bg-ink-card/30 rounded backdrop-blur hover:border-gold/30 transition-all group flex flex-col justify-between cursor-pointer relative z-20"
              >
                <div>
                  <h3 className="display text-xl mb-3 text-gold-warm group-hover:tracking-wider transition-all duration-500">{a.title}</h3>
                  <p className="text-[10px] text-cream/40 leading-relaxed uppercase tracking-widest font-light">{a.desc}</p>
                </div>
                <div className="mt-6 text-[9px] uppercase tracking-widest text-gold/40 border-t border-gold/5 pt-4 group-hover:text-gold transition-colors">Ask Us &rsaquo;</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
