import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Calendar,
  Building2,
  Eye,
  FileDown,
  Hash,
  ExternalLink,
  Award,
} from 'lucide-react';
import { CertificateItem } from '../../types';
import { certificatesData } from '../../data/certificates';
import { TiltCard } from '../ui/TiltCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CertificateModal } from './CertificateModal';

export interface CredentialsProps {
  certificates?: CertificateItem[];
  className?: string;
  id?: string;
}

type FilterCategory = 'all' | 'oracle' | 'nptel' | 'experience';

export const Credentials: React.FC<CredentialsProps> = ({
  certificates = certificatesData,
  className = '',
  id = 'credentials',
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'all') return certificates;
    if (activeFilter === 'oracle') {
      return certificates.filter(
        (c) =>
          c.id.includes('oracle') ||
          c.issuer.toLowerCase().includes('oracle') ||
          c.id === 'agile'
      );
    }
    if (activeFilter === 'nptel') {
      return certificates.filter((c) => c.id.includes('nptel'));
    }
    if (activeFilter === 'experience') {
      return certificates.filter(
        (c) => c.id.includes('kauvery') || c.id.includes('hackerrank')
      );
    }
    return certificates;
  }, [certificates, activeFilter]);

  const handleInspect = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <section
      id={id}
      aria-label="Verified Credentials"
      className={`relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 ${className}`.trim()}
    >
      {/* Background ambient radial glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <Badge variant="gold" size="sm" dot pulse>
            VERIFIED CREDENTIALS
          </Badge>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#fbf5ee]"
        >
          Accredited <span className="text-[#f5cb78]">Certifications</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[#9e8779] max-w-2xl mx-auto"
        >
          Official credentials in enterprise Java SE 11, SQL relational systems,
          Agile project methodologies, and specialized computer science domains.
        </motion.p>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {[
            { id: 'all', label: `All (${certificates.length})` },
            { id: 'oracle', label: 'Oracle & Agile (3)' },
            { id: 'nptel', label: 'NPTEL Elite (3)' },
            { id: 'experience', label: 'Experience & Contests (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as FilterCategory)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#d4af37] text-[#0d0604] font-bold shadow-[0_0_16px_rgba(212,175,55,0.4)]'
                  : 'bg-[#170c08] text-[#9e8779] border border-white/10 hover:border-white/20 hover:text-[#fbf5ee]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCertificates.map((cert, index) => {
            const isOracle =
              cert.issuer.toLowerCase().includes('oracle') ||
              (cert.badge && cert.badge.toLowerCase().includes('oracle'));
            const isElite = cert.badge?.toLowerCase().includes('elite');

            const imageSrc = cert.image.startsWith('/')
              ? cert.image
              : `/${cert.image}`;

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <TiltCard
                  maxTilt={6}
                  glareColor="rgba(212, 175, 55, 0.1)"
                  className="h-full rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(212,175,55,0.08)] flex flex-col overflow-hidden transition-colors duration-300"
                >
                  {/* Certificate Preview Banner */}
                  <div
                    onClick={() => handleInspect(cert)}
                    className="relative h-44 w-full bg-[#0d0604] overflow-hidden cursor-pointer group/banner"
                  >
                    <img
                      src={imageSrc}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center opacity-85 group-hover/banner:scale-105 group-hover/banner:opacity-100 transition-all duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#170c08] via-transparent to-black/50" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      {isOracle ? (
                        <Badge
                          variant="gold"
                          size="sm"
                          icon={<ShieldCheck className="w-3.5 h-3.5" />}
                        >
                          {cert.badge || 'Oracle Certified'}
                        </Badge>
                      ) : isElite ? (
                        <Badge
                          variant="emerald"
                          size="sm"
                          icon={<Award className="w-3.5 h-3.5" />}
                        >
                          {cert.badge || 'Elite Certification'}
                        </Badge>
                      ) : (
                        <Badge variant="obsidian" size="sm">
                          {cert.badge || 'Verified'}
                        </Badge>
                      )}
                    </div>

                    {/* Quick Inspect Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0d0604]/60 backdrop-blur-[2px] opacity-0 group-hover/banner:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-[#f5cb78] font-display font-medium text-sm">
                      <Eye className="w-4 h-4" />
                      <span>Inspect Credential</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3
                        onClick={() => handleInspect(cert)}
                        className="font-display font-bold text-lg text-[#fbf5ee] group-hover:text-[#f5cb78] transition-colors leading-snug cursor-pointer"
                      >
                        {cert.title}
                      </h3>

                      {/* Issuer & Date */}
                      <div className="mt-2.5 space-y-1 text-xs text-[#9e8779]">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span className="text-[#d8c8b8] font-medium">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-mono">
                            <Calendar className="w-3.5 h-3.5" />
                            {cert.date}
                          </span>

                          {cert.credentialId && (
                            <span className="flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-[#d8c8b8] border border-white/5">
                              <Hash className="w-3 h-3 text-[#9e8779]" />
                              {cert.credentialId}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Skill tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#23120d] border border-[rgba(212,175,55,0.15)] text-[#f5cb78]"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-[#9e8779]">
                              +{cert.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="mt-5 pt-4 border-t border-[rgba(212,175,55,0.12)] flex items-center justify-between gap-2">
                      <Button
                        variant={isOracle ? 'gold' : 'outline'}
                        size="sm"
                        onClick={() => handleInspect(cert)}
                        leftIcon={<Eye className="w-3.5 h-3.5" />}
                        className="flex-1"
                      >
                        Inspect Credential
                      </Button>

                      {cert.pdfUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          href={
                            cert.pdfUrl.startsWith('/')
                              ? cert.pdfUrl
                              : `/${cert.pdfUrl}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open PDF Document"
                          aria-label={`Open PDF for ${cert.title}`}
                          className="px-2.5 text-[#9e8779] hover:text-[#fbf5ee]"
                        >
                          <FileDown className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox Credential Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        certificate={selectedCert}
      />
    </section>
  );
};
