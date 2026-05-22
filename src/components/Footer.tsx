import { Link } from 'react-router-dom';
import { Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-ink-dark border-t border-gold/10 py-16 px-6 overflow-hidden">
      {/* Ambient static glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-radial-gradient from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <Link to="/" className="group">
            <svg viewBox="0 0 500 500" className="w-[80px] h-auto fill-cream group-hover:scale-105 transition-transform duration-500" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gold-gradient-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E3C471" />
                  <stop offset="50%" stopColor="#F9F0B8" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
                <linearGradient id="gold-text-footer" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A353" />
                  <stop offset="25%" stopColor="#F2DDA5" />
                  <stop offset="50%" stopColor="#D1AC56" />
                  <stop offset="75%" stopColor="#F9ECC7" />
                  <stop offset="100%" stopColor="#C9A353" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="250" r="240" fill="#0A0A0A" />
              <circle cx="250" cy="250" r="236" fill="none" stroke="url(#gold-gradient-footer)" strokeWidth="2" />
              <circle cx="250" cy="250" r="226" fill="none" stroke="url(#gold-gradient-footer)" strokeWidth="4" />
              <text x="250" y="275" fontFamily="'Times New Roman', serif" fontSize="130" fontWeight="400" fill="url(#gold-text-footer)" textAnchor="middle" letterSpacing="8">LUMA</text>
              <text x="250" y="335" fontFamily="'Arial', sans-serif" fontSize="18" fontWeight="300" fill="#C9A353" textAnchor="middle" letterSpacing="10" className="opacity-90">SIGNATURE MOCKTAILS</text>
            </svg>
          </Link>
          <p className="text-base text-cream leading-relaxed max-w-xs">
            100% alcohol-free mobile mocktail bar for weddings and luxury events in Amman, Jordan.
          </p>
        </div>

        <ul className="flex flex-col items-center gap-4">
          {['Home', 'About', 'Packages', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-base text-cream hover:text-gold-warm tracking-[0.3em] uppercase transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 300 }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
          <div className="flex flex-col gap-2">
            <a 
              href="https://wa.me/962792324444" 
              className="text-base text-gold hover:text-gold-warm transition-colors font-medium flex items-center gap-2 justify-end mb-1"
            >
              WhatsApp: +962 79 232 4444
            </a>
            <a 
              href="https://instagram.com/luma.jordan" 
              className="text-base text-cream hover:text-gold-warm transition-colors flex items-center gap-2 justify-end"
            >
              <Instagram className="w-4 h-4" /> @luma.jordan
            </a>
          </div>
          <p className="text-base text-cream uppercase tracking-wider mt-4">
            Amman, Jordan
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gold/5 flex flex-col items-center gap-4 text-center relative z-10">
        <p className="text-base text-cream uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Luma · Crafted for moments worth remembering
        </p>
      </div>
    </footer>
  );
}
