import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, MessageCircle, Info, Loader2 } from 'lucide-react';
import BookingButton from '../components/BookingButton';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string || '';
    const phone = formData.get('phone') as string || '';
    const type = formData.get('type') as string || '';
    const guests = formData.get('guests') as string || '';
    const message = formData.get('message') as string || '';

    const subject = encodeURIComponent(`New Event Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone/WhatsApp: ${phone}\nEvent Type: ${type}\nEstimated Guests: ${guests}\n\nMessage:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:info@lumajordan.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setIsSubmitting(false);
    }, 600);
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

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Direct Booking Path */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 border border-gold/40 bg-gold/5 rounded-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <div className="text-[120px] leading-none font-serif text-gold">1</div>
          </div>
          <span className="label-micro text-gold-warm relative z-10">Ready to proceed</span>
          <h2 className="display text-4xl relative z-10">Direct Consultation</h2>
          <p className="text-cream/70 text-sm leading-relaxed max-w-sm mx-auto relative z-10">
            For clients ready to secure our services. Book a direct consultation call with our event architects to discuss the details, menu options, and finalize your date.
          </p>
          <div className="mt-4 relative z-10">
            <BookingButton 
              className="py-4 px-8 text-sm"
              text="Book Your Consultation"
            />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-gold/60 mt-4 relative z-10">Priority Scheduling</p>
        </motion.div>

        {/* Form Card (General Inquiry) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-12 glass-card rounded-2xl relative"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <span className="label-micro text-cream/50">Exploring options</span>
            <h2 className="display text-3xl mt-2 mb-4">General Enquiry</h2>
            <p className="text-cream/50 text-xs leading-relaxed max-w-sm mx-auto">
              Not ready to commit yet? Send us your early-stage event details and we'll reply with a preliminary proposal.
            </p>
          </div>

          {submitted ? (
            <div className="py-20 text-center flex flex-col items-center gap-6">
              <div className="text-gold text-5xl">✦</div>
              <h2 className="display text-4xl">Message <em className="text-gold-warm italic">Prepared</em></h2>
              <p className="text-cream/60 max-w-xs mx-auto text-sm leading-relaxed">
                Your email client has been opened to send your enquiry directly to us. We'll consult on the right architecture and respond promptly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-gold uppercase tracking-[0.2em] text-[10px] hover:text-gold-warm transition-colors"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="label-micro text-xs">Your Name</label>
                <input required name="name" type="text" placeholder="Full Name" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label-micro text-xs">Phone / WhatsApp</label>
                <input required name="phone" type="tel" placeholder="+962 7X XXX XXXX" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex flex-col gap-2">
                   <label className="label-micro text-xs">Event Type</label>
                   <select required name="type" defaultValue="" className="bg-ink border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                     <option value="" disabled>Select occasion</option>
                     <option value="wedding">Wedding</option>
                     <option value="engagement">Engagement</option>
                     <option value="corporate">Corporate</option>
                     <option value="private">Private Gathering</option>
                   </select>
                 </div>
                 <div className="flex flex-col gap-2">
                  <label className="label-micro text-xs">Estimated Guests</label>
                  <input required name="guests" type="number" placeholder="e.g. 150" min="20" className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-micro text-xs">Message</label>
                <textarea rows={3} name="message" placeholder="Tell us more about your event vision..." className="bg-white/5 border-b border-gold/20 p-3 text-sm focus:border-gold outline-none transition-colors resize-none" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`btn-luxury border border-gold/50 text-gold hover:bg-gold/10 w-full flex items-center justify-center gap-2 transition-colors ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      className="flex items-center"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Alternative Contacts below */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-emerald-500/20 bg-emerald-500/5 rounded-lg flex flex-col gap-4 text-center items-center group">
          <MessageCircle className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
          <h3 className="display text-2xl">WhatsApp</h3>
          <p className="text-xs text-cream/60 leading-relaxed uppercase tracking-widest">For quick questions.</p>
          <a 
            href="https://wa.me/962792324444?text=Hi%20Luma%2C%20I%27d%20like%20to%20enquire%20about%20a%20mocktail%20bar%20for%20my%20event." 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 px-6 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 text-[11px] font-bold rounded uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-ink transition-all"
          >
            Message Us
          </a>
        </div>

        <div className="p-8 glass-card rounded-lg flex flex-col gap-4 text-center items-center">
          <Instagram className="w-8 h-8 text-gold" />
          <h3 className="display text-2xl">Instagram</h3>
          <p className="text-xs text-cream/50 leading-relaxed">View our recent setups.</p>
          <a 
            href="https://instagram.com/luma.jordan" 
            target="_blank" 
            className="mt-4 text-[10px] uppercase tracking-[0.3em] text-gold hover:text-gold-warm transition-colors"
          >
            @luma.jordan
          </a>
        </div>

        <div className="p-8 border border-gold/10 rounded-lg flex flex-col">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Info className="w-4 h-4 text-gold" />
            <span className="label-micro">Quick Info</span>
          </div>
          <ul className="space-y-4 text-xs text-cream/50 uppercase tracking-widest leading-loose text-center">
            <li>◆ Based in Amman</li>
            <li>◆ Travel to all provinces</li>
            <li>◆ 50% deposit to secure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
