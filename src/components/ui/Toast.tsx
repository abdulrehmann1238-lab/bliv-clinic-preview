import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const icons = {
            success: <CheckCircle2 className="w-4 h-4 text-[#366141] shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-[#8e3c35] shrink-0" />,
            warning: <AlertTriangle className="w-4 h-4 text-[#8c672b] shrink-0" />,
            info: <Info className="w-4 h-4 text-[#395c78] shrink-0" />,
          };

          const borders = {
            success: 'border-[#d2e4d6] bg-white',
            error: 'border-[#f2d0cc] bg-white',
            warning: 'border-[#f3e1c2] bg-white',
            info: 'border-[#d2e2ee] bg-white',
          };

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-bliv border shadow-card flex items-start gap-3 ${borders[toast.type]}`}
            >
              <div className="mt-0.5">{icons[toast.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-bliv-dark tracking-tight">{toast.title}</p>
                {toast.message && <p className="text-xs text-bliv-text-secondary mt-0.5 leading-relaxed">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-bliv-text-secondary/60 hover:text-bliv-dark p-0.5 transition-colors -mr-1 -mt-1"
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
