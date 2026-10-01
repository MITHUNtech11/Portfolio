import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Navbar,
  Footer,
  ReadingProgress,
  NAV_LINKS,
} from '../src/components/layout';
import * as NavbarModule from '../src/components/layout/Navbar';
import * as FooterModule from '../src/components/layout/Footer';
import * as ReadingProgressModule from '../src/components/layout/ReadingProgress';

console.log('--- Verifying Layout Components ---');

// ==========================================
// 1. ReadingProgress Verification
// ==========================================
if (typeof ReadingProgress !== 'function' || typeof ReadingProgressModule.ReadingProgress !== 'function') {
  throw new Error('ReadingProgress must be exported as a function/component');
}
const progressEl = React.createElement(ReadingProgress, { className: 'custom-progress', height: 4 });
if (!progressEl || progressEl.type !== ReadingProgress) {
  throw new Error('Failed to create ReadingProgress element');
}
const progressHtml = renderToStaticMarkup(progressEl);
if (!progressHtml.includes('custom-progress') || !progressHtml.includes('fixed')) {
  throw new Error('ReadingProgress failed HTML markup verification');
}

// Edge case: string height support & custom div attributes
const progressStringHeight = renderToStaticMarkup(
  React.createElement(ReadingProgress, { height: '8px', 'data-testid': 'reading-progress' } as any)
);
if (!progressStringHeight.includes('height:8px') || !progressStringHeight.includes('data-testid="reading-progress"')) {
  throw new Error('ReadingProgress failed custom string height or HTML attribute verification');
}

console.log('✅ ReadingProgress component verified (instantiation, SSR render, props, styles, edge cases)');

// ==========================================
// 2. NAV_LINKS Verification
// ==========================================
if (!Array.isArray(NAV_LINKS) || NAV_LINKS.length !== 6) {
  throw new Error(`Expected 6 NAV_LINKS, found ${NAV_LINKS?.length}`);
}
const expectedHrefs = ['#about', '#skills', '#projects', '#experience', '#credentials', '#contact'];
expectedHrefs.forEach((href) => {
  const match = NAV_LINKS.find((item) => item.href === href);
  if (!match) {
    throw new Error(`NAV_LINKS missing required section link: ${href}`);
  }
});
console.log('✅ NAV_LINKS configuration verified (#about, #skills, #projects, #experience, #credentials, #contact)');

// ==========================================
// 3. Navbar Verification
// ==========================================
if (typeof Navbar !== 'function' || typeof NavbarModule.Navbar !== 'function') {
  throw new Error('Navbar must be exported as a function/component');
}
const navbarEl = React.createElement(Navbar, {
  activeSection: '#projects',
  resumeUrl: '/Mithun_Senthil_Resume.docx',
});
if (!navbarEl || navbarEl.type !== Navbar) {
  throw new Error('Failed to create Navbar element');
}
const navbarHtml = renderToStaticMarkup(navbarEl);

// 3a. Check sticky frosted-glass styling
if (!navbarHtml.includes('sticky') || !navbarHtml.includes('backdrop-blur-md')) {
  throw new Error('Navbar missing sticky frosted-glass styling (sticky top-0, backdrop-blur-md)');
}

// 3b. Check live radar status beacon with reduced motion support
if (!navbarHtml.includes('Available for Roles') || !navbarHtml.includes('animate-ping')) {
  throw new Error('Navbar missing live radar status beacon with animate-ping dot and "Available for Roles"');
}
if (!navbarHtml.includes('motion-reduce:animate-none')) {
  throw new Error('Navbar radar beacon missing motion-reduce:animate-none accessibility utility');
}

// 3c. Check navigation links rendered
expectedHrefs.forEach((href) => {
  if (!navbarHtml.includes(`href="${href}"`)) {
    throw new Error(`Navbar HTML markup missing link to ${href}`);
  }
});

// 3d. Check Resume CTA button linking to /Mithun_Senthil_Resume.docx
if (!navbarHtml.includes('href="/Mithun_Senthil_Resume.docx"')) {
  throw new Error('Navbar missing resume CTA button linking to /Mithun_Senthil_Resume.docx');
}
if (!navbarHtml.includes('download="Mithun_Senthil_Resume.docx"')) {
  throw new Error('Navbar resume CTA missing download attribute');
}

// 3e. Check Mobile hamburger toggle button exists
if (!navbarHtml.includes('aria-label="Open navigation menu"') && !navbarHtml.includes('Open navigation menu')) {
  throw new Error('Navbar missing accessible mobile menu toggle button');
}

// 3f. Edge Case: Active section switching, custom resume URL, and custom HTML attributes
const navbarCustomEl = React.createElement(Navbar, {
  activeSection: '#contact',
  resumeUrl: '/custom-resume.pdf',
  'data-testid': 'custom-navbar',
} as any);
const navbarCustomHtml = renderToStaticMarkup(navbarCustomEl);
if (!navbarCustomHtml.includes('href="/custom-resume.pdf"')) {
  throw new Error('Navbar failed custom resumeUrl override');
}
if (!navbarCustomHtml.includes('href="#contact" aria-current="page"')) {
  throw new Error('Navbar failed activeSection aria-current="page" reflection');
}
if (!navbarCustomHtml.includes('data-testid="custom-navbar"')) {
  throw new Error('Navbar failed custom HTML attribute forwarding');
}

console.log('✅ Navbar component verified (sticky glass, radar beacon, section links, resume CTA, mobile toggle, edge cases)');

// ==========================================
// 4. Footer Verification
// ==========================================
if (typeof Footer !== 'function' || typeof FooterModule.Footer !== 'function') {
  throw new Error('Footer must be exported as a function/component');
}
const footerEl = React.createElement(Footer, { showBackToTop: true });
if (!footerEl || footerEl.type !== Footer) {
  throw new Error('Failed to create Footer element');
}
const footerHtml = renderToStaticMarkup(footerEl);

// 4a. Check obsidian dark styling
if (!footerHtml.includes('bg-[#090403]') || !footerHtml.includes('border-t')) {
  throw new Error('Footer missing obsidian dark styling class');
}

// 4b. Check social links (GitHub, LinkedIn, Email)
if (!footerHtml.includes('github.com/mithuntech11')) {
  throw new Error('Footer missing GitHub social link');
}
if (!footerHtml.includes('linkedin.com/in/mithunsenthil')) {
  throw new Error('Footer missing LinkedIn social link');
}
if (!footerHtml.includes('mailto:mithuntech111@gmail.com')) {
  throw new Error('Footer missing Email social link');
}

// 4c. Verify target="_blank" safety: web URLs should open in new tab, mailto/tel should not
if (!footerHtml.includes('href="https://github.com/mithuntech11" target="_blank"')) {
  throw new Error('Footer web links must have target="_blank"');
}
if (footerHtml.includes('href="mailto:mithuntech111@gmail.com" target="_blank"')) {
  throw new Error('Footer mailto link must NOT have target="_blank" (prevents empty orphaned browser tabs)');
}

// 4d. Verify pulse dot reduced-motion accessibility
if (!footerHtml.includes('motion-reduce:animate-none')) {
  throw new Error('Footer pulse status indicator missing motion-reduce:animate-none accessibility utility');
}

// 4e. Check copyright
const currentYearStr = String(new Date().getFullYear());
if (!footerHtml.includes(currentYearStr) || !footerHtml.includes('Mithun Senthil S')) {
  throw new Error(`Footer missing copyright notice for year ${currentYearStr}`);
}

// 4f. Check Back to top button
if (!footerHtml.includes('Back to top')) {
  throw new Error('Footer missing Back to top button');
}

// 4g. Edge case: showBackToTop = false
const footerNoTop = renderToStaticMarkup(React.createElement(Footer, { showBackToTop: false }));
if (footerNoTop.includes('Back to top')) {
  throw new Error('Footer showBackToTop=false should not render Back to top button');
}

console.log('✅ Footer component verified (obsidian theme, social links, safe target/rel, copyright, back-to-top, edge cases)');

// ==========================================
// 5. Barrel Index Verification
// ==========================================
const barrelExports = { Navbar, Footer, ReadingProgress, NAV_LINKS };
for (const [name, comp] of Object.entries(barrelExports)) {
  if (comp === undefined || comp === null) {
    throw new Error(`Barrel export index.ts is missing: ${name}`);
  }
}
console.log('✅ Layout barrel export index.ts verified with Navbar, Footer, ReadingProgress, and NAV_LINKS');

console.log('🎉 All Layout component verifications passed successfully!');
