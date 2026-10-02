import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Copy,
  Send,
  Github,
  Linkedin,
  Phone,
  MapPin,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { profileData } from '../../data/profile';
import type { ToastVariant } from '../ui/Toast';

// =============================================
// Contact Props
// =============================================

export interface ContactProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  onToast?: (message: string, variant?: ToastVariant) => void;
}

// =============================================
// Contact form state
// =============================================

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// =============================================
// Helpers
// =============================================

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!validateEmail(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  else if (values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// =============================================
// Contact Section
// =============================================

const INITIAL_FORM: FormState = { name: '', email: '', subject: '', message: '' };

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
};

/**
 * Contact
 *
 * Full-width contact section with one-click email copy, direct mailto button,
 * social links, and a client-side validated contact message form that composes
 * a mailto: link on submit (no backend required).
 */
export const Contact: React.FC<ContactProps> = ({ className = '', onToast, ...rest }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // ---- Copy email to clipboard ----
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setEmailCopied(true);
      onToast?.('Email copied to clipboard!', 'success');
      setTimeout(() => setEmailCopied(false), 2400);
    } catch {
      onToast?.('Failed to copy. Please copy manually.', 'error');
    }
  };

  // ---- Form field change ----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // ---- Form submit (mailto: fallback – no server needed) ----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = encodeURIComponent(form.subject);
    const body = encodeURIComponent(
      `Hi Mithun,\n\nMy name is ${form.name} (${form.email}).\n\n${form.message}\n\nBest regards,\n${form.name}`
    );
    window.open(`mailto:${profileData.email}?subject=${subject}&body=${body}`, '_blank');

    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});
    onToast?.('Message composed! Your mail client is opening.', 'info');

    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBase =
    'w-full px-4 py-3 bg-[#170c08] border rounded-xl text-[#fbf5ee] text-sm placeholder-[#9e8779] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]/60 transition-colors';
  const inputNormal = `${inputBase} border-[rgba(212,175,55,0.2)]`;
  const inputError = `${inputBase} border-red-500/60`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative py-20 sm:py-28 bg-[#0d0604] overflow-hidden ${className}`.trim()}
      {...rest}
    >
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-[1px] w-8 bg-[#d4af37]/40" />
            <span className="text-xs font-mono text-[#d4af37] uppercase tracking-widest">
              06 / Contact
            </span>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#fbf5ee] leading-tight"
          >
            Let's Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5cb78]">
              Something Great
            </span>
          </h2>
          <p className="mt-4 text-[#9e8779] text-base sm:text-lg max-w-2xl leading-relaxed">
            Available for internships, research collaborations, and full-time roles starting 2027.
            Open to remote and Chennai-based opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left column: contact info + social */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Quick contact cards */}
            <div className="space-y-3">
              {/* Copy email */}
              <div className="p-4 rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.3)] transition-colors">
                <p className="text-xs font-mono text-[#9e8779] mb-1.5 uppercase tracking-wider">Email</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-sm text-[#fbf5ee] hover:text-[#f5cb78] transition-colors truncate focus:outline-none focus-visible:underline"
                  >
                    {profileData.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    title="Copy email"
                    className="shrink-0 p-2 rounded-lg bg-[rgba(212,175,55,0.08)] hover:bg-[rgba(212,175,55,0.18)] border border-[rgba(212,175,55,0.2)] hover:border-[#d4af37]/60 text-[#d4af37] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  >
                    {emailCopied ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.15)]">
                <p className="text-xs font-mono text-[#9e8779] mb-1.5 uppercase tracking-wider">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <a
                    href={`tel:${profileData.phone}`}
                    className="text-sm text-[#fbf5ee] hover:text-[#f5cb78] transition-colors focus:outline-none focus-visible:underline"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-[#170c08] border border-[rgba(212,175,55,0.15)]">
                <p className="text-xs font-mono text-[#9e8779] mb-1.5 uppercase tracking-wider">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span className="text-sm text-[#fbf5ee]">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono text-[#9e8779] mb-3 uppercase tracking-wider">Profiles</p>
              <div className="flex flex-wrap gap-2.5">
                {profileData.socialLinks
                  .filter((s) => s.platform === 'github' || s.platform === 'linkedin')
                  .map((item) => {
                    const IconComponent = SOCIAL_ICON_MAP[item.platform] || ExternalLink;
                    return (
                      <motion.a
                        key={item.platform}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.label}`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#170c08] border border-[rgba(212,175,55,0.18)] hover:border-[#d4af37]/60 hover:text-[#f5cb78] text-[#d8c8b8] text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ExternalLink className="w-3 h-3 text-[#9e8779]" />
                      </motion.a>
                    );
                  })}
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <p className="text-sm text-emerald-300 font-medium">{profileData.status}</p>
              </div>
              <p className="mt-2 text-xs text-emerald-400/70 leading-relaxed">
                Graduating {profileData.graduationYear} from {profileData.university} · Open to internships now.
              </p>
            </div>
          </motion.div>

          {/* Right column: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#140a07] border border-[rgba(212,175,55,0.15)] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(ellipse at top right, rgba(212,175,55,0.08) 0%, transparent 70%)',
                }}
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#fbf5ee]">
                    Mail Client Opened!
                  </h3>
                  <p className="text-[#9e8779] text-sm max-w-xs">
                    Your message has been composed. Finish sending it from your mail app.
                  </p>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#fbf5ee] mb-1">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#9e8779]">
                      Composes a message in your default mail client — no data is sent to any server.
                    </p>
                  </div>

                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-[#d8c8b8] mb-1.5"
                      >
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={errors.name ? inputError : inputNormal}
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-[#d8c8b8] mb-1.5"
                      >
                        Your Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={errors.email ? inputError : inputNormal}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono text-[#d8c8b8] mb-1.5"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Internship Opportunity / Collaboration"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={errors.subject ? inputError : inputNormal}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" role="alert" className="mt-1 text-xs text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-[#d8c8b8] mb-1.5"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity or project..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${errors.message ? inputError : inputNormal} resize-y min-h-[120px]`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c0392b] to-[#d4af37] text-white font-semibold text-sm shadow-[0_4px_20px_rgba(192,57,43,0.4)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.35)] transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Contact.displayName = 'Contact';
