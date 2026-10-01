import React, { useState } from 'react';
import {
  ShieldCheck,
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
import { Badge } from '../ui/Badge';
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

  const isOracle =
    certificate.issuer.toLowerCase().includes('oracle') ||
    (certificate.badge && certificate.badge.toLowerCase().includes('oracle'));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f5cb78] shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <span className="truncate">{certificate.title}</span>
        </div>
      }
      description={
        <span className="flex items-center gap-2">
          <span>{certificate.issuer}</span>
          <span>•</span>
          <span>Issued {certificate.date}</span>
        </span>
      }
      className="max-h-[92vh]"
    >
      <div className="space-y-5">
        {/* Verification & Meta Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#120906] border border-[rgba(212,175,55,0.18)]">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Verification Badge */}
            {isOracle ? (
              <Badge variant="gold" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                Oracle Verified Credential
              </Badge>
            ) : (
              <Badge variant="obsidian" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}>
                {certificate.badge || 'Verified Credential'}
              </Badge>
            )}

            {/* Credential ID with Copy Action */}
            {certificate.credentialId && (
              <button
                type="button"
                onClick={handleCopyId}
                title="Click to copy credential ID"
                aria-label={`Copy Credential ID ${certificate.credentialId}`}
                className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[#d8c8b8] transition-colors cursor-pointer"
              >
                <Hash className="w-3 h-3 text-[#9e8779]" />
                <span>ID: {certificate.credentialId}</span>
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400 ml-1" />
                ) : (
                  <Copy className="w-3 h-3 text-[#9e8779] ml-1" />
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
              variant="gold"
              size="sm"
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
            >
              Direct Asset Link
            </Button>
          </div>
        </div>

        {/* High-Res Certificate Interactive Lightbox Viewer */}
        <div className="rounded-xl overflow-hidden border border-[rgba(212,175,55,0.22)] shadow-2xl bg-[#090403]">
          <ZoomPanViewer
            src={imageSrc}
            alt={certificate.title}
            caption={`${certificate.issuer} — ${certificate.title} (Use controls or scroll to inspect resolution)`}
            className="h-[360px] sm:h-[460px] md:h-[520px]"
          />
        </div>

        {/* Skills & Competencies Footer */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="p-3.5 rounded-xl bg-[#120906] border border-[rgba(212,175,55,0.12)]">
            <span className="block font-mono text-xs font-semibold text-[#9e8779] uppercase tracking-wider mb-2">
              Verified Competencies & Syllabus
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#170c08] border border-[rgba(212,175,55,0.18)] text-[#f5cb78]"
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
