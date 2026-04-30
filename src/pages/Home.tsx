import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Award, GlassWater, Users, MapPin, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const textParallaxX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const textParallaxY = useTransform(springY, [-0.5, 0.5], [20, -20]);
  
  const bgParallaxX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const bgParallaxY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

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
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 text-center overflow-hidden">
        {/* Background Image Parallax */}
        <motion.div 
          className="absolute inset-0 z-0 scale-110"
          style={{ x: bgParallaxX, y: bgParallaxY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1544145945-f904253d0c7e?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Bar Atmosphere" 
            className="w-full h-full object-cover opacity-20 filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
        </motion.div>

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
            className="inline-block px-4 py-1.5 border border-gold/40 rounded-full bg-gold/10 backdrop-blur-sm text-gold-warm text-[9px] tracking-[0.3em] uppercase mb-8"
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

          <motion.p variants={itemVariants} className="text-cream/80 text-sm md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
            Handcrafted botanical recipes served in premium glassware. A branded mobile bar delivered to your venue for moments that command distinction.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/packages" 
              className="btn-luxury bg-gold text-ink font-bold shadow-[0_15px_40px_rgba(184,145,42,0.3)] hover:shadow-[0_20px_50px_rgba(184,145,42,0.5)] scale-110 relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Discover Packages</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" 
                style={{ skewX: -20 }}
              />
            </Link>
            <Link 
              to="/contact" 
              className="btn-luxury border border-gold/50 text-gold hover:bg-gold/10 backdrop-blur-sm transition-all"
            >
              Secure Your Date
            </Link>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="mt-20 text-[9px] uppercase tracking-[0.4em] text-gold/60 flex items-center justify-center gap-4"
          >
            <span className="w-12 h-px bg-gold/20"></span>
            Booking Summer 2026
            <span className="w-12 h-px bg-gold/20"></span>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-white/[0.02] border-y border-white/5 flex items-center justify-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 text-[11px] uppercase tracking-[0.4em] text-gold/30 font-light">
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
                <p className="text-sm text-cream/50 leading-relaxed font-light max-w-sm">{f.desc}</p>
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
                <div className="text-gold/20 mb-4 flex justify-center group-hover:text-gold transition-colors duration-700">
                  {s.icon}
                </div>
                <div className="display text-4xl mb-2 text-gold-warm">{s.val}</div>
                <div className="text-[10px] uppercase tracking-widest text-cream/40">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            Ready to elevate your <br /> <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">next celebration?</em>
          </h2>
          <Link 
            to="/contact" 
            className="btn-luxury bg-gold text-ink font-semibold inline-block"
          >
            Enquire Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
