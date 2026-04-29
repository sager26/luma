import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle, Info } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="pt-32 pb-32">
      <section className="text-center px-6 mb-24">
        <span className="label-micro block mb-4">Contact Luma</span>
        <h1 className="display text-5xl md:text-7xl mb-8">
          Get in <em className="text-gold-warm italic underline underline-offset-8 decoration-gold/20">Touch</em>
        </h1>
        <p className="text-cream/50 text-sm max-w-xl mx-auto leading-relaxed font-light">
          Tell us about your event. Date, approximate guests, and occasion. We'll consult on the right architecture and respond within 24 hours.
        </p>
      </section>

      <div className="container px-6 grid grid-cols-1 lg:grid-cols-[1fr,0.8fr] gap-12 lg:gap-24 items-start">
        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 glass-card rounded-lg"
        >
          {submitted ? (
            <div className="py-20 text-center flex flex-col items-center gap-6">
              <div className="text-gold text-5xl">✦</div>
              <h2 className="display text-4xl">Thank <em className="text-gold-warm italic">you</em></h2>
              <p className="text-cream/60 max-w-xs mx-auto text-sm leading-relaxed">
                Your enquiry has been received. We will be in touch shortly to discuss your celebration.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-gold uppercase tracking-[0.2em] text-[10px] hover:text-gold-warm transition-colors"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Your Name</label>
                  <input required type="text" placeholder="Full Name" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Phone / WhatsApp</label>
                  <input required type="tel" placeholder="+962 7X XXX XXXX" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Email</label>
                  <input type="email" placeholder="your@email.com" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Event Type</label>
                  <select required defaultValue="" className="bg-ink border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select occasion</option>
                    <option value="wedding">Wedding</option>
                    <option value="engagement">Engagement</option>
                    <option value="corporate">Corporate</option>
                    <option value="private">Private Gathering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Event Date</label>
                  <input required type="date" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors appearance-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Estimated Guests</label>
                  <input required type="number" placeholder="e.g. 150" min="20" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-micro text-xs">Message (Optional)</label>
                <textarea rows={4} placeholder="Tell us more about your event vision..." className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors resize-none" />
              </div>

              <button type="submit" className="btn-luxury bg-gold text-ink font-bold w-full">
                Send Enquiry
              </button>
            </form>
          )}
        </motion.div>

        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div className="p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-lg flex flex-col gap-4 text-center items-center group">
            <MessageCircle className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
            <h3 className="display text-2xl">WhatsApp</h3>
            <p className="text-xs text-cream/60 leading-relaxed uppercase tracking-widest">The fastest way to secure your date.</p>
            <a 
              href="https://wa.me/962792324444?text=Hi%20Luma%2C%20I%27d%20like%20to%20enquire%20about%20a%20mocktail%20bar%20for%20my%20event." 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 bg-emerald-500 text-ink text-[11px] font-bold rounded uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95"
            >
              Message Us
            </a>
          </div>

          <div className="p-8 glass-card rounded-lg flex flex-col gap-4 text-center items-center">
            <Instagram className="w-8 h-8 text-gold" />
            <h3 className="display text-2xl">Instagram</h3>
            <p className="text-xs text-cream/50 leading-relaxed max-w-[200px]">Follow us for event highlights and new signature reveals.</p>
            <a 
              href="https://instagram.com/luma.jordan" 
              target="_blank" 
              className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gold hover:text-gold-warm transition-colors"
            >
              @luma.jordan
            </a>
          </div>

          <div className="p-10 border border-gold/10 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-4 h-4 text-gold" />
              <span className="label-micro">Quick Info</span>
            </div>
            <ul className="space-y-4 text-xs text-cream/50 uppercase tracking-widest leading-loose">
              <li>◆ Based in Amman, Jordan</li>
              <li>◆ Travel to all provinces</li>
              <li>◆ 50% deposit to hold date</li>
              <li>◆ Peak season bookings 8+ weeks ahead</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
