import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Smooth progress animation over ~1200ms
    const start = performance.now();
    const duration = 1100;

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 350); // smooth exit transition
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="bliv-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-[#F7F8F5] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle warm radial highlight */}
          <div className="absolute inset-0 bg-radial-subtle pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center relative z-10"
          >
            {/* Custom Wordmark */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-bliv-dark flex items-center justify-center shadow-subtle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h5m4 0h5M12 5v5m0 4v5" stroke="#DDE8DF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-heading text-3xl font-extrabold tracking-tight text-bliv-dark">
                BLIV
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm font-medium text-bliv-text-secondary tracking-tight mb-8">
              Making space for better care.
            </p>

            {/* Sage Progress Line */}
            <div className="w-48 h-1 bg-bliv-border rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-bliv-green rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Micro subtle indicator */}
            <span className="text-[11px] font-mono text-bliv-text-secondary/60 mt-2.5">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
