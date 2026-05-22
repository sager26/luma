import { PopupModal } from "react-calendly";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Loader2 } from "lucide-react";

interface BookingButtonProps {
  className?: string;
  variant?: 'primary' | 'outline';
  text?: string;
}

export default function BookingButton({ 
  className = "", 
  variant = 'primary',
  text = "Book Consultation" 
}: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.getElementById("root"));
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    // Add a slight delay for the visual loading effect before the modal opens
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(true);
    }, 600);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        className={`btn-luxury flex items-center justify-center gap-2 transition-all duration-500 rounded-sm ${
          variant === 'primary' 
            ? 'bg-gradient-to-r from-gold to-gold-warm text-ink font-semibold shadow-[0_4px_20px_rgba(201,162,58,0.2)] hover:shadow-[0_4px_30px_rgba(201,162,58,0.5)] transform hover:-translate-y-0.5' 
            : 'border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold shadow-sm hover:shadow-[0_0_15px_rgba(201,162,58,0.2)]'
        } ${isLoading ? 'opacity-80 cursor-wait' : ''} ${className}`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="flex items-center"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center"
            >
              <Calendar className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        <span>{text}</span>
      </motion.button>

      {rootElement && (
        <PopupModal
          url="https://calendly.com/lumajordan-info/30min"
          rootElement={rootElement}
          open={isOpen}
          onModalClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

