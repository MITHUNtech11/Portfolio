import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: React.ReactNode }
> = {
  success: {
    bg: 'bg-[#010736] dark:bg-[#0B132B]',
    border: 'border-[#8B9A6E]/60 dark:border-[#A2B784]/60',
    icon: <CheckCircle className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784] shrink-0" />,
  },
  error: {
    bg: 'bg-[#010736] dark:bg-[#0B132B]',
    border: 'border-[#800020]/70 dark:border-[#C72C48]/70',
    icon: <AlertCircle className="w-4 h-4 text-[#DB9558] dark:text-[#F5A663] shrink-0" />,
  },
  info: {
    bg: 'bg-[#010736] dark:bg-[#0B132B]',
    border: 'border-[#DB9558]/60 dark:border-[#F5A663]/60',
    icon: <Info className="w-4 h-4 text-[#DB9558] dark:text-[#F5A663] shrink-0" />,
  },
};

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const variant = toast.variant ?? 'success';
  const { bg, border, icon } = VARIANT_STYLES[variant];
  const duration = toast.durationMs ?? 3200;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      role="status"
      aria-live="polite"
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-[0_8px_32px_rgba(1,7,54,0.4)] ${bg} ${border} text-[#F5EFE1] text-sm font-sans min-w-[220px] max-w-xs`}
    >
      {icon}
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="p-0.5 rounded text-[#E5D3AF] hover:text-[#F5EFE1] dark:hover:text-[#F5A663] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B9A6E] dark:focus-visible:ring-[#F5A663] cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none"
    >
      <AnimatePresence mode="sync">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

Toast.displayName = 'Toast';

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = React.useCallback(
    (message: string, variant: ToastVariant = 'success', durationMs = 3200) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, variant, durationMs }]);
    },
    []
  );

  return { toasts, show, dismiss };
}
