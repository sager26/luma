import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-32">
      {/* Header */}
      <section className="text-center px-6 mb-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="label-micro block mb-4">About Luma</span>
          <h1 className="display text-5xl md:text-7xl mb-6">
            Our <em className="text-gold-warm italic">Story</em>
          </h1>
          <p className="text-cream/50 text-sm max-w-lg mx-auto leading-relaxed">
            Amman's first premium alcohol-free mobile mocktail bar, redefined for private occasions where elegance is the priority.
          </p>
          <div className="mt-8 inline-block px-6 py-2 border border-gold/30 rounded-full text-gold-warm text-[10px] tracking-widest uppercase bg-gold/5">
            100% Alcohol-Free
          </div>
        </div>
      </section>

      {/* Story Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr,1px,1.2fr] gap-12 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="display text-3xl md:text-5xl leading-tight">
              Every guest deserves a <br />
              <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">drink worth remembering.</em>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block w-px bg-gold/20 self-stretch origin-top"
          />

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-8 text-cream/60 leading-relaxed font-light text-sm"
          >
            <p>
              Luma was born from a simple idea: that non-alcoholic drinks deserve the same craft, care, and presentation as any fine cocktail. In Amman's event market, we saw a gap between expensive, inflexible hotel services and unprofessional budget operators.
            </p>
            <p>
              We built Luma to fill that space. A fully branded, mobile bar experience that brings premium glassware, handcrafted botanical recipes, and elite staff directly to your venue. Whether it's a private estate wedding or an intimate gallery opening, the ritual of the drink is preserved in its most elegant form.
            </p>
            <p>
              The experience is always consistent: elevated, personal, and unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid (Mini) */}
      <section className="bg-ink-dark/40 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="label-micro block mb-4">The Experience</span>
            <h2 className="display text-4xl md:text-6xl">What sets us apart</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "✦", title: "Craft Mocktails", desc: "Signature botanical drinks developed in-house with premium ingredients." },
              { icon: "◆", title: "Premium Glassware", desc: "Served exclusively in proper glass. No plastic counterparts." },
              { icon: "◇", title: "Branded Station", desc: "Our bars act as a sophisticated furniture piece for your event decor." },
              { icon: "☆", title: "Elite Staff", desc: "Trained, uniformed professionals who understand high-end hospitality." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 glass-card text-center hover:-translate-y-2 transition-all"
              >
                <div className="text-gold text-3xl mb-4 group-hover:rotate-180 transition-transform duration-700">{s.icon}</div>
                <h3 className="display text-xl mb-4 text-gold-warm">{s.title}</h3>
                <p className="text-[11px] text-cream/40 leading-relaxed uppercase tracking-wider">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
