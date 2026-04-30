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
            <svg viewBox="0 0 400 120" className="w-[100px] h-auto fill-cream group-hover:fill-gold-warm transition-colors">
              <text x="0" y="80" className="font-serif text-[72px] font-light tracking-[8px]">LUMA</text>
            </svg>
          </Link>
          <p className="text-xs text-cream/50 leading-relaxed max-w-xs">
            100% alcohol-free mobile mocktail bar for weddings and luxury events in Amman, Jordan.
          </p>
        </div>

        <ul className="flex flex-col items-center gap-4">
          {['Home', 'About', 'Packages', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-sm text-cream/60 hover:text-gold-warm tracking-widest uppercase transition-colors"
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
              className="text-sm text-gold hover:text-gold-warm transition-colors font-medium flex items-center gap-2 justify-end mb-1"
            >
              WhatsApp: +962 79 232 4444
            </a>
            <a 
              href="https://instagram.com/luma.jordan" 
              className="text-sm text-cream/60 hover:text-gold-warm transition-colors flex items-center gap-2 justify-end"
            >
              <Instagram className="w-4 h-4" /> @luma.jordan
            </a>
          </div>
          <p className="text-xs text-cream/40 uppercase tracking-widest mt-4">
            Amman, Jordan
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gold/5 flex flex-col items-center gap-4 text-center relative z-10">
        <p className="text-[10px] text-cream/30 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Luma · Crafted for moments worth remembering
        </p>
      </div>
    </footer>
  );
}
