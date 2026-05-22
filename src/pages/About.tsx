import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "B2B Luxury Event & Wedding Beverage Catering in Amman | Luma Mocktail Bar",
    "description": "Partner with Luma Mocktail Bar, Jordan's premier alcohol-free catering service. We elevate high-end corporate events, brand activations, and luxury weddings with bespoke botanical mocktails and VIP service.",
    "publisher": {
      "@type": "Organization",
      "name": "Luma Mocktail Bar",
      "url": "https://lumajordan.com"
    }
  };

  return (
    <div className="pt-32 pb-32">
      <SEO 
        title="B2B Luxury Event & Wedding Beverage Catering in Amman | Luma Mocktail Bar" 
        description="Partner with Luma Mocktail Bar, Jordan's premier alcohol-free catering service. We elevate high-end corporate events, brand activations, and luxury weddings with bespoke botanical mocktails and VIP service."
        keywords="B2B event planners Amman, corporate event catering Jordan, luxury brand activations Amman, VIP beverage catering Jordan, premium mobile bar hire for events, non-alcoholic B2B catering Amman, bespoke mocktail bar partners"
        schema={aboutSchema}
        image="https://lumajordan.com/IMG_5417.JPG"
      />
      {/* Header */}
      <section className="text-center px-6 mb-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="label-micro block mb-4">About Luma</span>
          <h1 className="display text-5xl md:text-7xl mb-6">
            Our <em className="text-gold-warm italic">Story</em>
          </h1>
          <p className="text-cream text-base max-w-lg mx-auto leading-relaxed">
            Amman's first premium alcohol-free mobile mocktail bar, redefined for private occasions where elegance is the priority.
          </p>
          <div className="mt-8 inline-block px-6 py-2 border border-gold/30 rounded-full text-gold-warm text-base tracking-wider uppercase bg-gold/5">
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
            className="flex flex-col gap-8 text-cream leading-relaxed font-medium text-base"
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

      {/* Core Values Section */}
      <section className="px-6 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-micro block mb-4">Our Ethos</span>
            <h2 className="display text-4xl md:text-5xl">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Craftsmanship',
                desc: 'We treat mocktail creation as an art form. Every recipe is meticulously developed using house-made syrups, fresh botanicals, and premium non-alcoholic spirits.'
              },
              {
                title: 'Exclusivity',
                desc: 'Our bar setups and drink menus are tailored to your specific event, ensuring a one-of-a-kind experience that reflects your style and sophistication.'
              },
              {
                title: 'Passion for Service',
                desc: 'True luxury lies in the details. Our elegantly uniformed staff anticipate needs, providing impeccable and discreet hospitality to every guest.'
              }
            ].map((value, i) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="flex flex-col gap-4 text-center items-center"
              >
                <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold mb-2">
                  <span className="text-base">0{i + 1}</span>
                </div>
                <h3 className="display text-2xl text-gold-warm">{value.title}</h3>
                <p className="text-cream text-base leading-relaxed font-medium">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
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
                <p className="text-base text-cream leading-relaxed uppercase tracking-wider">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="mt-32 mb-16 text-center px-6">
        <div className="max-w-4xl mx-auto p-12 md:p-24 border border-gold/10 bg-ink-dark/30 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,58,0.1)_0,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <span className="label-micro block mb-6 text-gold relative z-10">Commission Our Services</span>
          <h2 className="display text-4xl md:text-5xl mb-8 relative z-10">
            Secure Your <em className="text-gold-warm italic">Date</em>
          </h2>
          <div className="flex justify-center relative z-10">
            <a 
              href="/contact" 
              className="btn-luxury bg-gradient-to-r from-gold to-gold-warm text-ink font-semibold transition-all duration-500 text-center px-12 py-4 rounded-sm shadow-[0_4px_20px_rgba(201,162,58,0.2)] hover:shadow-[0_4px_30px_rgba(201,162,58,0.5)] transform hover:-translate-y-0.5"
            >
              Consult with our Architects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
