import React, { useState } from 'react';
import {
  Calendar,
  Building2,
  Hash,
  ExternalLink,
  FileDown,
  Copy,
  Check,
  Award,
} from 'lucide-react';
import { CertificateItem } from '../../types';
import { Modal } from '../ui/Modal';
import { ZoomPanViewer } from '../ui/ZoomPanViewer';
import { Button } from '../ui/Button';

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateItem | null;
}

const resolveAssetUrl = (url?: string): string | undefined => {
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
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const imageSrc = resolveAssetUrl(certificate.image) || '';
  const pdfHref = resolveAssetUrl(certificate.pdfUrl);

  const handleCopyId = async () => {
    if (!certificate.credentialId) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(certificate.credentialId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // In non-secure contexts or permission denied, handle gracefully
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E5D3AF]/40 dark:bg-[#111C40] text-[#800020] dark:text-[#F5A663] shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <span className="truncate text-[#010736] dark:text-[#F5EFE1]">{certificate.title}</span>
        </div>
      }
      description={
        <span className="flex items-center gap-2 text-[#2C3352]/75 dark:text-[#C5CEE0]/75">
          <span>{certificate.issuer}</span>
          <span>•</span>
          <span>Issued {certificate.date}</span>
        </span>
      }
      className="max-h-[92vh]"
    >
      <div className="space-y-5">
        {/* Meta & Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F5EFE1]/70 dark:bg-[#050B20]/70 border border-[#E5D3AF] dark:border-[#E5D3AF]/20">
          <div className="flex flex-wrap items-center gap-2.5">
            {certificate.credentialId && (
              <button
                type="button"
                onClick={handleCopyId}
                title="Click to copy credential ID"
                aria-label={`Copy Credential ID ${certificate.credentialId}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/20 text-[#010736] dark:text-[#F5EFE1] transition-colors cursor-pointer shadow-xs hover:border-[#DB9558] dark:hover:border-[#F5A663]"
              >
                <Hash className="w-3 h-3 text-[#DB9558] dark:text-[#F5A663]" />
                <span>ID: {certificate.credentialId}</span>
                {copied ? (
                  <Check className="w-3 h-3 text-[#8B9A6E] dark:text-[#A2B784] ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-[#6B7280] dark:text-[#8E9AA8] ml-1" />
                )}
              </button>
            )}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2">
            {pdfHref ? (
              <Button
                variant="outline"
                size="sm"
                href={pdfHref}
                download
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FileDown className="w-3.5 h-3.5" />}
              >
                Download PDF
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                href={imageSrc}
                download
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FileDown className="w-3.5 h-3.5" />}
              >
                Download Asset
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Direct Link
            </Button>
          </div>
        </div>

        {/* Certificate Zoom/Pan Viewer */}
        <div className="rounded-xl overflow-hidden border border-[#E5D3AF] dark:border-[#E5D3AF]/20 shadow-md bg-[#F5EFE1] dark:bg-[#050B20]">
          <ZoomPanViewer
            src={imageSrc}
            alt={certificate.title}
            caption={`${certificate.issuer} — ${certificate.title}`}
            className="h-[360px] sm:h-[460px] md:h-[520px]"
          />
        </div>

        {/* Competencies Footer */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#F5EFE1]/50 dark:bg-[#050B20]/50 border border-[#E5D3AF] dark:border-[#E5D3AF]/20">
            <span className="block font-mono text-xs font-semibold text-[#8B9A6E] dark:text-[#A2B784] uppercase tracking-wider mb-2">
              Syllabus &amp; Focus Areas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/20 text-[#010736] dark:text-[#F5EFE1]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

CertificateModal.displayName = 'CertificateModal';
export default CertificateModal;
