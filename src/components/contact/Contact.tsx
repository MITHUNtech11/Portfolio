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

export interface ContactProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  onToast?: (message: string, variant?: ToastVariant) => void;
}

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
 * Minimalist editorial contact section with one-click email copy,
 * direct contact cards, profiles, and validated email client composer.
 * Completely free of availability status badges or radar pings.
 */
export const Contact: React.FC<ContactProps> = ({ className = '', onToast, ...rest }) => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

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
    onToast?.('Message composed! Your email client is opening.', 'info');

    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputBase =
    'w-full px-4 py-3 bg-[#F5EFE1]/50 dark:bg-[#050B20]/80 border rounded-xl text-[#010736] dark:text-[#F5EFE1] text-sm placeholder-[#6B7280] dark:placeholder-[#8E9AA8] focus:outline-none focus:ring-2 focus:ring-[#800020]/40 dark:focus:ring-[#F5A663]/40 focus:border-[#800020] dark:focus:border-[#F5A663] transition-colors';
  const inputNormal = `${inputBase} border-[#E5D3AF] dark:border-[#E5D3AF]/20`;
  const inputError = `${inputBase} border-red-500/70 dark:border-red-400/80`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`relative py-24 sm:py-32 bg-[#F5EFE1] dark:bg-[#050B20] overflow-hidden text-[#010736] dark:text-[#F5EFE1] ${className}`.trim()}
      {...rest}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-14 sm:mb-18 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
            <span className="font-mono text-xs font-bold text-[#8B9A6E] dark:text-[#A2B784] uppercase tracking-widest">
              07 // Get In Touch
            </span>
            <span className="h-px w-6 bg-[#8B9A6E] dark:bg-[#A2B784]" />
          </div>

          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#010736] dark:text-[#F5EFE1] leading-tight"
          >
            Let's Build{' '}
            <span className="text-[#800020] dark:text-[#F5A663]">Something Great</span>
          </h2>
          <p className="mt-4 text-[#2C3352]/80 dark:text-[#C5CEE0]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Open to engineering conversations, technical roles, distributed systems discussions,
            and research collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left column: contact info & social */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="space-y-3">
              {/* Copy email */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs hover:border-[#DB9558] dark:hover:border-[#F5A663]/40 transition-colors">
                <p className="text-xs font-mono text-[#8B9A6E] dark:text-[#A2B784] mb-1.5 uppercase tracking-wider font-bold">Email</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-sm font-semibold text-[#010736] dark:text-[#F5EFE1] hover:text-[#800020] dark:hover:text-[#F5A663] transition-colors truncate focus:outline-none focus-visible:underline"
                  >
                    {profileData.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    title="Copy email"
                    className="shrink-0 p-2 rounded-lg bg-[#E5D3AF]/40 dark:bg-[#111C40] hover:bg-[#800020] dark:hover:bg-[#F5A663] hover:text-white dark:hover:text-[#050B20] text-[#800020] dark:text-[#F5A663] transition-all cursor-pointer shadow-xs"
                  >
                    {emailCopied ? (
                      <CheckCircle className="w-4 h-4 text-[#8B9A6E] dark:text-[#A2B784]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs">
                <p className="text-xs font-mono text-[#8B9A6E] dark:text-[#A2B784] mb-1.5 uppercase tracking-wider font-bold">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#800020] dark:text-[#F5A663] shrink-0" />
                  <a
                    href={`tel:${profileData.phone}`}
                    className="text-sm font-semibold text-[#010736] dark:text-[#F5EFE1] hover:text-[#800020] dark:hover:text-[#F5A663] transition-colors focus:outline-none focus-visible:underline"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-xs">
                <p className="text-xs font-mono text-[#8B9A6E] dark:text-[#A2B784] mb-1.5 uppercase tracking-wider font-bold">Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#DB9558] dark:text-[#F5A663] shrink-0" />
                  <span className="text-sm font-semibold text-[#010736] dark:text-[#F5EFE1]">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono text-[#6B7280] dark:text-[#8E9AA8] mb-3 uppercase tracking-wider font-semibold">Profiles</p>
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
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 hover:border-[#800020] dark:hover:border-[#F5A663] hover:text-[#800020] dark:hover:text-[#F5A663] text-[#010736] dark:text-[#F5EFE1] text-sm font-medium transition-all shadow-xs"
                      >
                        <IconComponent className="w-4 h-4 text-[#800020] dark:text-[#F5A663]" />
                        <span>{item.label}</span>
                        <ExternalLink className="w-3 h-3 text-[#6B7280] dark:text-[#8E9AA8]" />
                      </motion.a>
                    );
                  })}
              </div>
            </div>
          </motion.div>

          {/* Right column: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="relative p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#0B132B] border border-[#E5D3AF] dark:border-[#E5D3AF]/15 shadow-[0_6px_28px_rgba(1,7,54,0.04)] dark:shadow-[0_6px_28px_rgba(0,0,0,0.3)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8B9A6E]/15 dark:bg-[#A2B784]/15 border border-[#8B9A6E]/40 dark:border-[#A2B784]/40 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#8B9A6E] dark:text-[#A2B784]" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#010736] dark:text-[#F5EFE1]">
                    Email Client Opened
                  </h3>
                  <p className="text-[#2C3352]/75 dark:text-[#C5CEE0]/75 text-sm max-w-xs">
                    Your message has been composed. Complete and send it directly from your email app.
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
                    <h3 className="text-xl font-display font-bold text-[#010736] dark:text-[#F5EFE1] mb-1">
                      Send a Message
                    </h3>
                    <p className="text-xs text-[#2C3352]/70 dark:text-[#C5CEE0]/70">
                      Composes directly into your mail client — completely private without third-party tracking.
                    </p>
                  </div>

                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-[#010736] dark:text-[#F5EFE1] mb-1.5 font-semibold"
                      >
                        Your Name <span className="text-[#800020] dark:text-[#F5A663]">*</span>
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
                        <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-500 font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-[#010736] dark:text-[#F5EFE1] mb-1.5 font-semibold"
                      >
                        Your Email <span className="text-[#800020] dark:text-[#F5A663]">*</span>
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
                        <p id="contact-email-error" role="alert" className="mt-1 text-xs text-red-500 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono text-[#010736] dark:text-[#F5EFE1] mb-1.5 font-semibold"
                    >
                      Subject <span className="text-[#800020] dark:text-[#F5A663]">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Engineering Role / Project Collaboration"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={errors.subject ? inputError : inputNormal}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" role="alert" className="mt-1 text-xs text-red-500 font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-[#010736] dark:text-[#F5EFE1] mb-1.5 font-semibold"
                    >
                      Message <span className="text-[#800020] dark:text-[#F5A663]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your team or project..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`${errors.message ? inputError : inputNormal} resize-y min-h-[120px]`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-500 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#800020] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(128,0,32,0.25)] hover:bg-[#660019] hover:shadow-[0_6px_22px_rgba(128,0,32,0.35)] dark:bg-[#F5A663] dark:text-[#050B20] dark:hover:bg-[#f6b57d] dark:shadow-[0_4px_16px_rgba(245,166,99,0.25)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/50 dark:focus-visible:ring-[#F5A663]/50"
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
