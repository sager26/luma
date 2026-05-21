import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ChevronRight, Droplets, Flame, Wind } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "Select your desired vibe.",
    options: [
      { label: "Evening Elegance", value: "elegance", icon: <Sparkles className="w-5 h-5 mb-2" /> },
      { label: "Daytime Refresh", value: "refresh", icon: <Wind className="w-5 h-5 mb-2" /> },
      { label: "Intimate Depth", value: "depth", icon: <Flame className="w-5 h-5 mb-2" /> }
    ]
  },
  {
    id: 2,
    title: "What is your preferred flavor profile?",
    options: [
      { label: "Rich & Sweet", value: "sweet" },
      { label: "Bright & Tart", value: "tart" },
      { label: "Spiced & Earthy", value: "spiced" }
    ]
  }
];

export default function TasteProfileQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSelect = (val: string) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        calculateResult(newAnswers);
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    // Simple logic
    const vibe = finalAnswers[0];
    const flavor = finalAnswers[1];
    
    if (vibe === 'refresh' || flavor === 'tart') {
      setResult({ name: "Crimson Hibiscus", desc: "A bold, tart infusion of wild hibiscus and pomegranate molasses. Perfect for a refreshing lift." });
    } else if (flavor === 'spiced' || vibe === 'depth') {
      setResult({ name: "Jallab Royale", desc: "Our elevated take on the traditional Jallab with smoked authentic incense. Deep, complex, and intimate." });
    } else {
      setResult({ name: "Saffron Elixir", desc: "A luminous blend of saffron-infused nectar. The epitome of evening elegance and sweet luxury." });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <>
      <div className="flex justify-center mt-16">
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex flex-col items-center gap-4 focus:outline-none"
        >
          <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500 shadow-[0_0_30px_rgba(201,162,58,0.1)] group-hover:shadow-[0_0_50px_rgba(201,162,58,0.2)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream/70 group-hover:text-gold transition-colors">
            Find Your Signature Serve
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-ink-dark border border-gold/20 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-cream/40 hover:text-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <span className="label-micro block mb-2 text-gold-warm">Taste Architecture</span>
                  <h3 className="display text-3xl">Curated for You</h3>
                </div>

                <div className="min-h-[220px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                      <motion.div 
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center gap-6"
                      >
                         <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="w-12 h-12 rounded-full border-t-2 border-r-2 border-gold border-b-2 border-l-2 border-b-transparent border-l-transparent"
                         />
                         <div className="text-[11px] uppercase tracking-widest text-gold/60">
                           Crafting your profile...
                         </div>
                      </motion.div>
                    ) : result ? (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="inline-flex p-4 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6">
                           <Sparkles className="w-8 h-8" />
                        </div>
                        <h4 className="display text-3xl text-gold-warm mb-4">{result.name}</h4>
                        <p className="text-sm font-light text-cream/80 leading-relaxed mb-8">
                          {result.desc}
                        </p>
                        <button 
                          onClick={reset}
                          className="text-[10px] uppercase tracking-widest text-cream/40 hover:text-gold transition-colors underline underline-offset-4"
                        >
                          Start Over
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <h4 className="text-lg text-cream/90 mb-6 text-center font-light">
                          {questions[step].title}
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {questions[step].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleSelect(opt.value)}
                              className="w-full text-left p-4 border border-white/10 rounded-lg hover:bg-gold/5 hover:border-gold/30 transition-all flex items-center justify-between group"
                            >
                               <div className="flex items-center gap-4">
                                  {opt.icon && <span className="text-gold/60 group-hover:text-gold transition-colors">{opt.icon}</span>}
                                  <span className="text-sm text-cream/80 group-hover:text-gold transition-colors">{opt.label}</span>
                               </div>
                              <ChevronRight className="w-4 h-4 text-cream/20 group-hover:text-gold transition-colors" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {!isAnalyzing && !result && (
                   <div className="mt-8 flex gap-2 justify-center">
                     {questions.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === step ? 'bg-gold' : 'bg-white/10'}`} />
                     ))}
                   </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
