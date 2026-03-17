import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import auraLogo from "@/assets/aura-logo.png";

const barberTips = [
  "Preparando las navajas...",
  "Afilando las cuchillas...",
  "Calentando la toalla...",
  "Preparando la espuma...",
  "Ajustando la máquina...",
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 30;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % barberTips.length);
    }, 700);
    return () => clearInterval(tipTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Scissors decoration - top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-12 text-primary"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mb-12"
      >
        <img src={auraLogo} alt="AURA Barbershop" className="w-48 md:w-64 h-auto" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-muted-foreground font-body text-sm tracking-[0.3em] uppercase mb-10 relative z-10"
      >
        Premium Barbershop
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "280px" }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="relative z-10 mb-6"
      >
        <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        {/* Percentage */}
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-muted-foreground font-body tracking-wider">CARGANDO</span>
          <span className="text-[10px] text-primary font-body tabular-nums">{Math.round(progress)}%</span>
        </div>
      </motion.div>

      {/* Barber tips */}
      <AnimatePresence mode="wait">
        <motion.p
          key={tipIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted-foreground font-body italic relative z-10"
        >
          {barberTips[tipIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute bottom-16 w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </motion.div>
  );
};

export default SplashScreen;
