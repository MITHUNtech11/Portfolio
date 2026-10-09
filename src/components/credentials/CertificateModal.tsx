import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CertificateItem } from '../../types';

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateItem | null;
}

export const resolveAssetUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('/')
  ) {
    return url;
  }
  return `/${url}`;
};

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  const [mounted, setMounted] = useState(false);
  const lastCertRef = useRef<CertificateItem | null>(certificate);

  if (certificate) {
    lastCertRef.current = certificate;
  }

  const displayCert = certificate || lastCertRef.current;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture ESC key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, handleKeyDown]);

  if (!displayCert) return null;

  const imageSrc = resolveAssetUrl(displayCert.image) || '';

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={displayCert.title || 'Certificate View'}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
        >
          {/* Backdrop with Fade In and Fade Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Minimal Floating Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Certificate Container with Slide In + Fade In, and Slide Out + Fade Out */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-w-[95vw] max-h-[92vh] flex items-center justify-center p-2 sm:p-4 pointer-events-auto"
          >
            <img
              src={imageSrc}
              alt={displayCert.title}
              className="max-h-[88vh] max-w-[94vw] sm:max-w-[88vw] md:max-w-[84vw] object-contain rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 select-none"
              loading="eager"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (mounted && typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

CertificateModal.displayName = 'CertificateModal';
export default CertificateModal;
