import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

// =============================================
// Toast Types
// =============================================

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

// =============================================
// Internal single toast item
// =============================================

const VARIANT_STYLES: Record<
  ToastVariant,
  { bg: string; border: string; icon: React.ReactNode }
> = {
  success: {
    bg: 'bg-[#0f2414]',
    border: 'border-emerald-500/40',
    icon: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />,
  },
  error: {
    bg: 'bg-[#1e0c0c]',
    border: 'border-red-500/40',
    icon: <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />,
  },
  info: {
    bg: 'bg-[#170c08]',
    border: 'border-[rgba(212,175,55,0.35)]',
    icon: <Info className="w-4 h-4 text-[#f5cb78] shrink-0" />,
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

  // Auto-dismiss after duration
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
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${bg} ${border} text-[#fbf5ee] text-sm font-sans min-w-[220px] max-w-xs`}
    >
      {icon}
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="p-0.5 rounded text-[#9e8779] hover:text-[#fbf5ee] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37] cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

// =============================================
// Toast Portal / Container
// =============================================

/**
 * Toast
 *
 * Fixed bottom-right notification container. Renders a stack of animated toast
 * messages that auto-dismiss after their configured duration.
 */
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

// =============================================
// useToast hook — manages toast queue
// =============================================

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
