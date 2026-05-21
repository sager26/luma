import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const packageFaqs = [
  {
    q: "Are all your drinks completely alcohol-free?",
    a: "Yes. Every single ingredient we use is 100% alcohol-free and strictly halal. We source premium non-alcoholic botanicals and craft our own syrups from scratch."
  },
  {
    q: "Do you provide the glassware?",
    a: "Absolutely. We believe the vessel is just as important as the drink. We provide premium glass for all our services. Our Bespoke package includes our full crystal suite."
  },
  {
    q: "How early do you arrive to set up?",
    a: "We typically arrive 2 to 3 hours prior to the start of the service to ensure the bar is fully assembled, polished, and ready before your first guest arrives."
  },
  {
    q: "Do you travel outside of Amman?",
    a: "Yes, we can travel outside of Amman. Please let us know your location when you enquire so we can factor travel and logistics into your personalized quote."
  },
  {
    q: "Do we need to provide anything for the bar?",
    a: "We are fully self-sufficient. We supply the bar structure, glassware, ingredients, ice, and staff. We only require access to the venue for load-in and a nearby power outlet for select setups."
  }
];

/**
 * PackageCard with subtle 3D tilt effect on mouse hover.
 */
function PackageCard({ 
  tier, name, tagline, features, note, featured = false, delay = 0, ctaText 
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
          Standard
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-10 p-8 md:p-12 border-b border-gold/10 flex flex-col gap-4 bg-ink-card/40">
        <div className="max-w-2xl">
          <div className="label-micro mb-4">{tier}</div>
          <h2 className="display text-4xl md:text-5xl mb-4 italic text-gold-warm">{name}</h2>
          <p className="text-sm text-cream/70 leading-relaxed font-light">{tagline}</p>
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
                className="text-sm text-cream/80 flex items-start gap-3 leading-relaxed"
              >
                <span className="text-gold text-[10px] mt-1.5">✦</span>
                <span className="font-light">{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col justify-center">
          {/* Subtle decorative background glyph */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gold/5 text-8xl font-serif select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">✦</div>
          <div className="p-8 border border-gold/5 rounded bg-gold/5 relative overflow-hidden group/menu">
            <div className="label-micro text-gold-warm mb-3">Please Note</div>
            <p className="font-serif italic text-lg text-cream/80 leading-relaxed">{note}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-12 py-6 bg-ink-dark/30 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gold/10 backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">
          Personalised experiences
        </p>
        <a 
          href={`https://wa.me/962792324444?text=Hi, I'm interested in the ${name}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxury bg-gold text-ink font-bold w-full sm:w-auto text-center"
        >
          {ctaText}
        </a>
      </div>
    </motion.article>
  );
}

function SkeletonPackageCard() {
  return (
    <div className="relative bg-ink-card/30 border border-white/5 rounded-lg overflow-hidden animate-pulse">
      <div className="relative z-10 p-8 md:p-12 border-b border-white/5 flex flex-col gap-4">
        <div className="w-20 h-4 bg-ink-base/80 rounded mb-4" />
        <div className="w-2/3 h-12 md:h-14 bg-ink-base/80 rounded mb-4" />
        <div className="w-full h-4 bg-ink-base/60 rounded" />
        <div className="w-5/6 h-4 bg-ink-base/60 rounded mt-2" />
      </div>

      <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="w-32 h-4 bg-ink-base/80 rounded mb-6 block" />
          <ul className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-3 h-3 bg-ink-base/80 rounded mt-1 shrink-0" />
                <div className="w-full h-4 bg-ink-base/60 rounded" />
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex flex-col justify-center">
          <div className="p-8 border border-white/5 rounded bg-ink-base/30 relative overflow-hidden">
            <div className="w-24 h-4 bg-ink-base/80 rounded mb-4" />
            <div className="w-full h-4 bg-ink-base/60 rounded mb-3" />
            <div className="w-4/5 h-4 bg-ink-base/60 rounded" />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 md:px-12 py-6 bg-ink-base/20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-40 h-3 bg-ink-base/80 rounded" />
        <div className="w-full sm:w-48 h-12 bg-ink-base border border-white/5 rounded" />
      </div>
    </div>
  );
}

export default function Packages() {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": packageFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "Signature Mocktail Package",
          "description": "An elevated standard. A sophisticated mocktail bar experience designed to integrate seamlessly into your event in Amman, Jordan.",
          "provider": {
            "@type": "Organization",
            "name": "Luma Mocktail Bar"
          },
          "areaServed": "Amman, Jordan",
          "category": "Catering"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Bespoke Bar Package",
          "description": "For events requiring a fully custom experience: extended service, exclusive ingredient sourcing, branded bar activations, and corporate programmes in Jordan.",
          "provider": {
            "@type": "Organization",
            "name": "Luma Mocktail Bar"
          },
          "areaServed": "Amman, Jordan",
          "category": "High-End Corporate Catering"
        }
      }
    ]
  };

  return (
    <div className="pt-32 pb-32">
      <SEO 
        title="Mocktail Bar Packages for Weddings & Events | Luma Amman" 
        description="Choose from our signature mocktail packages: Signature Mocktail Bar or Bespoke Botanical Bar for your luxury wedding, corporate event, or VIP private gathering in Amman, Jordan."
        keywords="mocktail bar packages amman, luxury wedding bar jordan, bespoke beverage catering, non-alcoholic event service, premium botanical mocktails, mobile bar hire amman, custom drink packages"
        image="https://lumajordan.com/IMG_5416.JPG"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      <section className="text-center px-6 mb-24">
        <div className="header-line mx-auto w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent mb-8 opacity-40" />
        <span className="label-micro block mb-4">Our Services</span>
        <h1 className="display text-5xl md:text-7xl mb-8">
          Personalised <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">experiences.</em>
        </h1>
        <p className="text-cream/50 text-sm max-w-xl mx-auto leading-relaxed">
          Every event is unique. Choose from our standard offering or let us design a fully bespoke bar experience perfectly matched to your occasion.
        </p>
      </section>

      <div className="container px-6">
        <div className="flex flex-col gap-12">
          {isLoading ? (
            <>
              <SkeletonPackageCard />
              <SkeletonPackageCard />
            </>
          ) : (
            <>
              <PackageCard 
                tier="Main Package"
                name="Signature Package"
                tagline="An elevated standard. A sophisticated mocktail bar experience designed to integrate seamlessly into your event."
                features={[
                  "4 signature mocktails crafted for your event",
                  "Elegant barware, botanicals & garnishes (note: crystal glassware is Bespoke only)",
                  "Full bar setup & breakdown within Amman",
                  "Pre-event consultation & menu approval",
                  "Complimentary tasting session",
                  "100% alcohol-free & halal, every ingredient, always"
                ]}
                note="Pricing is personalised to each event. Please reach out to us with your details for a tailored quote."
                featured={true}
                ctaText="Inquire & Get a Quote"
                delay={0.1}
              />

              <PackageCard 
                tier="Bespoke Package"
                name="Bespoke Bar"
                tagline="For events requiring a fully custom experience: extended service, exclusive ingredient sourcing, branded bar activations, and corporate programmes."
                features={[
                  "Full crystal glassware selection",
                  "Fully bespoke mocktail menu design",
                  "Branded bar & custom interactive activations",
                  "Extended and multi-session service capability"
                ]}
                note="Our most exclusive offering for demanding events. We work closely with you or your planners to craft an unmatched beverage experience."
                featured={false}
                ctaText="Start the Conversation"
                delay={0.2}
              />
            </>
          )}
        </div>

        {/* Enhancements */}
        <section className="mt-32">
          <div className="text-center mb-16 px-6">
            <span className="label-micro block mb-4 text-gold">Enhancements</span>
            <h2 className="display text-4xl md:text-6xl mb-6">Add-Ons</h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto font-light leading-relaxed">
              Available across our packages. Mention what catches your eye when you enquire, and we'll integrate it into your bespoke quote.
            </p>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-6 mb-8"
          >
            {[
              { title: "Extra Hour", desc: "Extend bar service beyond the included time. Rate scales with event size." },
              { title: "Welcome Shots", desc: "Mocktail shots passed to every guest on arrival." },
              { title: "Dry Ice Effect", desc: "Theatrical dry ice smoke in every pour." },
              { title: "Sparkling Arrival Pour", desc: "A chilled sparkling glass waiting at every guest's seat on entry." },
              { title: "Custom Bar Branding", desc: "Event name, monogram, or branding dressed on the bar stand." },
              { title: "Signature Drink Name", desc: "A mocktail named for the occasion with custom menu cards per table." },
              { title: "Menu Cards", desc: "Printed mocktail menu cards placed at every table." }
            ].map((a, i) => (
              <motion.a 
                key={i} 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
                }}
                href={`https://wa.me/962792324444?text=${encodeURIComponent(`Hi, I'm interested in adding the "${a.title}" add-on to my event.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 border border-gold/10 bg-ink-card/30 rounded backdrop-blur hover:border-gold/30 transition-all group flex flex-col justify-between cursor-pointer relative z-20 h-full hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(184,145,42,0.1)]"
              >
                <div>
                  <h3 className="display text-xl mb-3 text-gold-warm group-hover:tracking-wider transition-all duration-500">{a.title}</h3>
                  <p className="text-[10px] text-cream/60 leading-relaxed uppercase tracking-widest font-light">{a.desc}</p>
                </div>
                <div className="mt-6 text-[9px] uppercase tracking-widest text-gold/40 border-t border-gold/5 pt-4 group-hover:text-gold transition-colors block shrink-0">Ask Us &rsaquo;</div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* FAQs */}
        <section className="mt-32 max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="label-micro block mb-4 text-gold">FAQ</span>
            <h2 className="display text-4xl md:text-5xl mb-6">Common Inquiries</h2>
          </div>
          <div className="flex flex-col gap-4">
            {packageFaqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <section className="mt-32 text-center px-6">
          <div className="p-12 md:p-24 border border-gold/10 bg-ink-dark/30 rounded-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-gradient from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <span className="label-micro block mb-6 text-gold relative z-10">Still have questions?</span>
            <h2 className="display text-4xl md:text-5xl mb-8 relative z-10">
              Let's Discuss Your <em className="text-gold-warm italic">Event</em>
            </h2>
            <div className="flex justify-center relative z-10">
              <a 
                href="/contact" 
                className="btn-luxury border border-gold/50 text-gold hover:bg-gold/10 backdrop-blur-sm transition-all text-center px-12 py-4"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gold/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <span className="font-serif text-lg text-cream/90 group-hover:text-gold-warm transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gold/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-gold-warm' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p className="pb-6 text-sm text-cream/60 font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
