import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Building2,
  Eye,
  FileDown,
  Hash,
} from 'lucide-react';
import { CertificateItem } from '../../types';
import { certificatesData } from '../../data/certificates';
import { TiltCard } from '../ui/TiltCard';
import { Button } from '../ui/Button';
import { CertificateModal } from './CertificateModal';

export interface CredentialsProps {
  certificates?: CertificateItem[];
  className?: string;
  id?: string;
}

type FilterCategory = 'all' | 'oracle' | 'nptel' | 'experience';

const isOracleOrAgile = (c: CertificateItem): boolean =>
  c.id.toLowerCase().includes('oracle') ||
  c.issuer.toLowerCase().includes('oracle') ||
  c.id.toLowerCase().includes('agile') ||
  c.title.toLowerCase().includes('agile') ||
  Boolean(c.badge && c.badge.toLowerCase().includes('oracle'));

const isNptel = (c: CertificateItem): boolean =>
  c.id.toLowerCase().includes('nptel') ||
  c.issuer.toLowerCase().includes('nptel') ||
  Boolean(c.badge && c.badge.toLowerCase().includes('elite'));

const isExperienceOrContest = (c: CertificateItem): boolean =>
  !isOracleOrAgile(c) && !isNptel(c);

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

export const Credentials: React.FC<CredentialsProps> = ({
  certificates = certificatesData,
  className = '',
  id = 'credentials',
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const categories = useMemo(() => {
    const oracleCount = certificates.filter(isOracleOrAgile).length;
    const nptelCount = certificates.filter(isNptel).length;
    const expCount = certificates.filter(isExperienceOrContest).length;

    return [
      { id: 'all' as FilterCategory, label: `All (${certificates.length})` },
      { id: 'oracle' as FilterCategory, label: `Oracle & Agile (${oracleCount})` },
      { id: 'nptel' as FilterCategory, label: `NPTEL Elite (${nptelCount})` },
      { id: 'experience' as FilterCategory, label: `Experience & Contests (${expCount})` },
    ];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    if (activeFilter === 'oracle') return certificates.filter(isOracleOrAgile);
    if (activeFilter === 'nptel') return certificates.filter(isNptel);
    if (activeFilter === 'experience') return certificates.filter(isExperienceOrContest);
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
      aria-label="Accredited Certifications"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 text-[#010736] dark:text-[#F5EFE1] ${className}`.trim()}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
          <span className="font-mono text-xs font-bold text-[#8B9A6E] dark:text-[#A2B784] uppercase tracking-widest">
            06 // Accredited Credentials
          </span>
          <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#010736] dark:text-[#F5EFE1]">
          Professional <span className="text-[#800020] dark:text-[#F5A663]">Certifications</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#2C3352]/80 dark:text-[#C5CEE0]/80 max-w-2xl mx-auto leading-relaxed">
          Official credentials in enterprise Java SE 11, SQL relational systems,
          Agile project methodologies, and specialized computer science domains.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as FilterCategory)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#800020] text-white font-bold shadow-xs dark:bg-[#F5A663] dark:text-[#050B20]'
                  : 'bg-white text-[#2C3352] border border-[#E5D3AF] hover:border-[#DB9558] dark:bg-[#0B132B] dark:text-[#C5CEE0] dark:border-[#E5D3AF]/15 dark:hover:border-[#F5A663]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCertificates.length === 0 ? (
            <div className="col-span-full py-12 text-center text-[#6B7280] dark:text-[#8E9AA8] font-mono text-sm border border-dashed border-[#E5D3AF] dark:border-[#E5D3AF]/20 rounded-2xl p-8 bg-white dark:bg-[#0B132B]">
              No credentials found for this category.
            </div>
          ) : (
            filteredCertificates.map((cert, index) => {
              const imageSrc = resolveAssetUrl(cert.image) || '';
              const pdfHref = resolveAssetUrl(cert.pdfUrl);

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
                    maxTilt={5}
                    glareColor="rgba(229, 211, 175, 0.2)"
                    className="group h-full rounded-2xl bg-white border border-[#E5D3AF] hover:border-[#DB9558] hover:shadow-[0_8px_30px_rgba(219,149,88,0.1)] dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:hover:border-[#F5A663]/40 dark:hover:shadow-[0_8px_30px_rgba(245,166,99,0.1)] flex flex-col overflow-hidden transition-colors duration-300"
                  >
                    {/* Certificate Preview Banner */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => handleInspect(cert)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleInspect(cert);
                        }
                      }}
                      aria-label={`Inspect ${cert.title}`}
                      className="relative h-44 w-full bg-[#F5EFE1] dark:bg-[#050B20] overflow-hidden cursor-pointer group/banner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/40 dark:focus-visible:ring-[#F5A663]/40"
                    >
                      <img
                        src={imageSrc}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover/banner:scale-105 transition-all duration-500"
                      />

                      {/* Quick Inspect Hover Overlay */}
                      <div className="absolute inset-0 bg-[#010736]/40 dark:bg-[#010736]/60 backdrop-blur-[2px] opacity-0 group-hover/banner:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white font-display font-semibold text-sm">
                        <Eye className="w-4 h-4 text-white" />
                        <span>Inspect Credential</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3
                          role="button"
                          tabIndex={0}
                          onClick={() => handleInspect(cert)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleInspect(cert);
                            }
                          }}
                          className="font-display font-bold text-lg text-[#010736] group-hover:text-[#800020] dark:text-[#F5EFE1] dark:group-hover:text-[#F5A663] transition-colors leading-snug cursor-pointer focus:outline-none focus-visible:underline"
                        >
                          {cert.title}
                        </h3>

                        {/* Issuer & Date */}
                        <div className="mt-2.5 space-y-1 text-xs text-[#2C3352]/75 dark:text-[#C5CEE0]/75">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#800020] dark:text-[#F5A663]" />
                            <span className="text-[#010736] font-semibold dark:text-[#F5EFE1]">{cert.issuer}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="flex items-center gap-1.5 font-mono text-[#6B7280] dark:text-[#8E9AA8]">
                              <Calendar className="w-3.5 h-3.5 text-[#8B9A6E] dark:text-[#A2B784]" />
                              {cert.date}
                            </span>

                            {cert.credentialId && (
                              <span className="flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-[#F5EFE1] text-[#2C3352] border border-[#E5D3AF] dark:bg-[#050B20] dark:text-[#C5CEE0] dark:border-[#E5D3AF]/20">
                                <Hash className="w-3 h-3 text-[#DB9558] dark:text-[#F5A663]" />
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
                                className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#E5D3AF]/40 border border-[#E5D3AF] text-[#010736] dark:bg-[#111C40] dark:border-[#E5D3AF]/15 dark:text-[#F5EFE1]"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 3 && (
                              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F5EFE1] text-[#6B7280] border border-[#E5D3AF] dark:bg-[#050B20] dark:text-[#8E9AA8] dark:border-[#E5D3AF]/20">
                                +{cert.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="mt-5 pt-4 border-t border-[#E5D3AF] dark:border-[#E5D3AF]/15 flex items-center justify-between gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleInspect(cert)}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                          className="flex-1 font-mono text-xs"
                        >
                          Inspect
                        </Button>

                        {pdfHref && (
                          <Button
                            variant="ghost"
                            size="sm"
                            href={pdfHref}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download PDF Document"
                            aria-label={`Download PDF for ${cert.title}`}
                            className="px-2.5 text-[#2C3352] hover:text-[#800020] dark:text-[#C5CEE0] dark:hover:text-[#F5A663]"
                          >
                            <FileDown className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })
          )}
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

Credentials.displayName = 'Credentials';
export default Credentials;
