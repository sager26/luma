import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  category: 'Mocktail' | 'Package';
  description: string;
  path: string;
}

const SEARCH_DATA: SearchResult[] = [
  { title: "Botanical Bliss", category: "Mocktail", description: "Lavender, wild mint, elderflower, sparkling water.", path: "/" },
  { title: "Desert Rose", category: "Mocktail", description: "Damascus rose, hibiscus, cardamom dust, citrus.", path: "/" },
  { title: "Golden Hour", category: "Mocktail", description: "Saffron infused peach, ginger beer, dehydrated orange.", path: "/" },
  { title: "Smoked Ruby", category: "Mocktail", description: "Pomegranate, smoked rosemary, black pepper rim.", path: "/" },
  { title: "Amman Nights", category: "Mocktail", description: "Arabica espresso cold brew, vanilla bean, dates.", path: "/" },
  { title: "Citrus Mirage", category: "Mocktail", description: "Yuzu, charred grapefruit, thyme, sea salt.", path: "/" },
  { title: "The Essential Luma", category: "Package", description: "Perfect for intimate gatherings. 2 signature drinks.", path: "/packages" },
  { title: "The Grand Reception", category: "Package", description: "For weddings and large celebrations. 4 signature drinks.", path: "/packages" },
  { title: "The Bespoke Botanical", category: "Package", description: "Custom menu designed exclusively for your event.", path: "/packages" },
  { title: "Corporate & Brand Events", category: "Package", description: "Branded bar setups and custom colored drinks.", path: "/packages" }
];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filteredResults = query.trim() === '' 
    ? [] 
    : SEARCH_DATA.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectMenu = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-dark/95 z-[150] backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 400) {
                onClose();
              }
            }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-[160]"
          >
            <div className="bg-ink-base border border-gold/20 rounded-xl shadow-2xl overflow-hidden flex flex-col">
              
              {/* Mobile Swipe-to-Dismiss Handle */}
              <div className="md:hidden flex justify-center pt-3 pb-1 w-full cursor-grab">
                <div className="w-12 h-1 rounded-full bg-white/20" />
              </div>

              {/* Search Header */}
              <div className="flex items-center gap-4 p-4 border-b border-white/5">
                <Search className="w-6 h-6 text-gold" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search mocktails, packages..."
                  className="flex-1 bg-transparent border-none outline-none text-cream text-lg font-light placeholder:text-cream/30"
                />
                <button 
                  onClick={onClose}
                  className="p-2 text-cream/50 hover:text-cream transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div 
                className="max-h-[60vh] overflow-y-auto custom-scrollbar"
                onPointerDownCapture={(e) => e.stopPropagation()}
              >
                {query.trim() !== '' && filteredResults.length === 0 && (
                  <div className="p-8 text-center text-cream/50 font-light">
                    No results found for "{query}".
                  </div>
                )}

                {filteredResults.length > 0 && (
                  <div className="p-2">
                    {filteredResults.map((result, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelectMenu(result.path)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="w-full text-left flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-serif text-lg text-cream group-hover:text-gold-warm transition-colors">{result.title}</span>
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/5">
                              {result.category}
                            </span>
                          </div>
                          <p className="text-sm font-light text-cream/50 line-clamp-1">{result.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-cream/20 group-hover:text-gold transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                )}
                
                {query.trim() === '' && (
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-cream/30 mb-4 px-2">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {["Botanical Bliss", "Wedding Packages", "Smoked Ruby"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 rounded-full border border-white/10 text-cream/70 text-sm hover:border-gold/30 hover:text-gold-warm transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
