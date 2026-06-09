import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Award, GlassWater, Users, MapPin, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import BookingButton from '../components/BookingButton';
import SEO from '../components/SEO';
import SignatureDrinksSection from '../components/SignatureDrinksSection';
import TestimonialCarousel from '../components/TestimonialCarousel';

export default function Home() {
  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const textParallaxX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Luma · Premium Alcohol-Free Mocktail Bar in Amman, Jordan"
        description="Luma is Amman's first premium alcohol-free mobile mocktail bar. We provide bespoke botanical drinks, premium glassware, and elite service for weddings and luxury events in Jordan."
        keywords="best mocktails amman, mocktail bar jordan, luxury mobile bar, non-alcoholic drinks amman, halal bar catering, wedding beverage service jordan, premium events amman"
        image="https://lumajordan.com/IMG_5411.JPG"
      />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 text-center overflow-hidden">
        <motion.div 
          className="relative z-20 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ x: textParallaxX, y: textParallaxY }}
        >
          <motion.div variants={itemVariants} className="label-micro mb-6 block drop-shadow-lg">
            Premium Mocktail Bar · Amman, Jordan
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="inline-block px-4 py-1.5 border border-gold/40 rounded-full bg-gold/10 backdrop-blur-sm text-gold-warm text-base font-semibold tracking-[0.2em] uppercase mb-8"
          >
            100% Alcohol-Free
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="display text-6xl md:text-9xl mb-8 leading-tight tracking-tight relative"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="block"
              >
                Premium Mocktail
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-2">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="block"
              >
                Experience <em className="text-gold-warm italic font-serif">Amman</em>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-cream text-base md:text-xl max-w-xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md">
            Handcrafted botanical recipes served in premium glassware. A branded mobile bar delivered to your venue for moments that command distinction.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mt-8 w-full max-w-sm mx-auto sm:max-w-none">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
              <BookingButton 
                text="Secure Your Date" 
                variant="primary" 
                className="w-full sm:w-auto px-10 py-4 shadow-[0_4px_30px_rgba(201,162,58,0.4)]"
              />
              <Link 
                to="/packages" 
                className="btn-luxury uppercase tracking-[0.25em] text-sm text-center border border-cream/30 text-cream hover:bg-cream/10 backdrop-blur-sm transition-all duration-500 rounded-sm w-full sm:w-auto px-10 py-4"
              >
                Explore Collections
              </Link>
            </div>
            <p className="text-sm font-serif italic text-gold-warm mt-2">Now booking Summer & Autumn 2026</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-20 text-sm font-semibold uppercase tracking-[0.3em] text-gold flex items-center justify-center gap-4 text-center leading-relaxed"
          >
            <span className="hidden md:inline-block w-12 h-px bg-gold/30"></span>
            The Gold Standard in Zero-Proof
            <span className="hidden md:inline-block w-12 h-px bg-gold/30"></span>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-cream/[0.02] border-y border-cream/5 flex items-center justify-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 text-base uppercase tracking-[0.2em] text-gold font-medium">
          {Array(10).fill("◆ Amman's Premier Bar ◆ Alcohol-Free ◆ Premium Glassware ◆").map((text, i) => (
            <motion.span 
              key={i}
              animate={{ x: "-100%" }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {text}
            </motion.span>
          ))}
        </div>
      </section>


      {/* Features Section */}
      <section className="py-40 px-6 bg-ink-dark/50 relative z-10 backdrop-blur-md border-y border-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="label-micro block mb-4 text-gold-warm">The Luma Standards</span>
            <h2 className="display text-5xl md:text-7xl text-cream tracking-tight">Luxury in every detail</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <Sparkles className="w-12 h-12 text-gold mb-8" />,
                title: "Handcrafted Drinks", 
                desc: "Signature botanical drinks made with cold-pressed essences. Prepared live by specialized bartenders who understand the ritual." 
              },
              { 
                icon: <GlassWater className="w-12 h-12 text-gold mb-8" />,
                title: "Premium Glassware", 
                desc: "Every guest is served in genuine premium martinis, highballs, or rocks glasses. Weight, clarity, and precision." 
              },
              { 
                icon: <Award className="w-12 h-12 text-gold mb-8" />,
                title: "Branded Station", 
                desc: "A sophisticated furniture piece that acts as a focal point for your event's architecture. Seamless setup and strike." 
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group p-12 flex flex-col items-center text-center glass-card rounded-2xl hover:border-gold/40 transition-all"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h3 className="display text-3xl mb-5 text-gold-warm">{f.title}</h3>
                <p className="text-base text-cream leading-relaxed font-medium max-w-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-6 h-6" />, val: "100%", label: "Alcohol-Free · Every event" },
              { icon: <GlassWater className="w-6 h-6" />, val: "Real Glass", label: "Martinis & Rocks · No Plastic" },
              { icon: <Users className="w-6 h-6" />, val: "Full Service", label: "Uniformed Staff · Elite Prep" },
              { icon: <MapPin className="w-6 h-6" />, val: "All Jordan", label: "We travel to any venue" }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="text-gold mb-4 flex justify-center group-hover:text-gold transition-colors duration-700">
                  {s.icon}
                </div>
                <div className="display text-4xl mb-2 text-gold-warm">{s.val}</div>
                <div className="text-base uppercase tracking-wider text-cream font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SignatureDrinksSection />

      <TestimonialCarousel />

      {/* Short CTA Section */}
      <section className="py-32 bg-radial-gradient from-gold/10 via-transparent to-transparent text-center border-t border-gold/5 px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="label-micro block mb-6">Start Planning</span>
          <h2 className="display text-4xl md:text-6xl mb-12">
            Ready to elevate your <br /> <em className="text-gold-warm italic font-serif underline underline-offset-8 decoration-gold/20">next celebration?</em>
          </h2>
          <BookingButton text="Reserve Your Experience" variant="primary" className="mx-auto" />
        </motion.div>
      </section>
    </div>
  );
}
