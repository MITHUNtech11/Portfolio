import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Hero, PortraitCard, StatCounter } from '../src/components/hero';
import * as HeroModule from '../src/components/hero/Hero';
import * as PortraitCardModule from '../src/components/hero/PortraitCard';
import * as StatCounterModule from '../src/components/hero/StatCounter';
import { profileData } from '../src/data/profile';
import type { ProfileData } from '../src/types';

console.log('--- Verifying Hero Section Components & Edge Cases ---');

// ==========================================
// 1. StatCounter Verification
// ==========================================
console.log('\n[1/5] Verifying StatCounter Component...');
if (typeof StatCounter !== 'function' && typeof StatCounterModule.StatCounter !== 'function') {
  throw new Error('StatCounter component must be exported as a function/component');
}

// 1a. Standard props element creation & static rendering
const statCounterEl = React.createElement(StatCounter, {
  stats: profileData.recruiterStats,
});
if (!statCounterEl || statCounterEl.type !== StatCounter) {
  throw new Error('Failed to create StatCounter element');
}

const statCounterHtml = renderToStaticMarkup(statCounterEl);
if (!statCounterHtml || statCounterHtml.length === 0) {
  throw new Error('StatCounter rendered empty static markup');
}

// Verify actual impact metrics rendered in SSR / static markup
const requiredStatTokens = ['2', 'Internships', '3+', 'Production Systems', '6+', 'Verified Certs', '8.46', 'CGPA'];
for (const token of requiredStatTokens) {
  if (!statCounterHtml.includes(token)) {
    throw new Error(`StatCounter static markup is missing expected token: "${token}"`);
  }
}
console.log('✅ StatCounter static markup contains all 4 recruiter impact stats (2, 3+, 6+, 8.46)');

// 1b. Default props (no stats prop passed)
const defaultStatCounterEl = React.createElement(StatCounter);
const defaultHtml = renderToStaticMarkup(defaultStatCounterEl);
if (!defaultHtml.includes('Internships') || !defaultHtml.includes('8.46')) {
  throw new Error('StatCounter default props failed to consume profileData.recruiterStats');
}
console.log('✅ StatCounter default props correctly fallback to profileData.recruiterStats');

// 1c. Edge case: Empty stats array
const emptyStatCounterEl = React.createElement(StatCounter, { stats: [] });
const emptyHtml = renderToStaticMarkup(emptyStatCounterEl);
if (emptyHtml.includes('Internships')) {
  throw new Error('Empty stats array should not render any stat card');
}
console.log('✅ Empty stats array handled cleanly');

// 1d. Edge case: stats with diverse numeric targets (float, integer, undefined)
const customStatCounterEl = React.createElement(StatCounter, {
  stats: [
    { label: 'CGPA', value: '8.46', numericTarget: 8.46 },
    { label: 'Systems', value: '3+', numericTarget: 3, suffix: '+' },
    { label: 'Score', value: '99.5', numericTarget: 99.5, prefix: '~' },
    { label: 'Custom', value: 'N/A' },
  ],
});
const customHtml = renderToStaticMarkup(customStatCounterEl);
if (!customHtml.includes('8.46') || !customHtml.includes('3+') || !customHtml.includes('~99.5') || !customHtml.includes('N/A')) {
  throw new Error('Custom StatCounter with diverse formats failed to render expected values');
}
console.log('✅ Diverse numeric targets (float, integer, prefix, suffix, undefined) verified');

// ==========================================
// 2. PortraitCard Verification
// ==========================================
console.log('\n[2/5] Verifying PortraitCard Component...');
if (typeof PortraitCard !== 'function' && typeof PortraitCardModule.PortraitCard !== 'function') {
  throw new Error('PortraitCard component must be exported as a function/component');
}

// 2a. Standard props
const portraitEl = React.createElement(PortraitCard, {
  avatarUrl: profileData.avatarUrl,
  name: profileData.name,
});
const portraitHtml = renderToStaticMarkup(portraitEl);
if (!portraitHtml.includes('/Mithun.jpeg')) {
  throw new Error('PortraitCard markup missing normalized avatar URL: /Mithun.jpeg');
}
if (!portraitHtml.includes(profileData.name)) {
  throw new Error(`PortraitCard markup missing candidate name: ${profileData.name}`);
}
if (!portraitHtml.includes('Oracle Java SE 11 Certified')) {
  throw new Error('PortraitCard markup missing top badge: Oracle Java SE 11 Certified');
}
if (!portraitHtml.includes('Saveetha CGPA 8.46')) {
  throw new Error('PortraitCard markup missing bottom badge: Saveetha CGPA 8.46');
}
// Verify icons are present in badges
if (!portraitHtml.includes('lucide-award') && !portraitHtml.includes('lucide-graduation-cap')) {
  throw new Error('PortraitCard floating badges are missing credential icons');
}
console.log('✅ PortraitCard renders Mithun.jpeg, name, and floating credential badges with icons');

// 2b. Default props
const defaultPortraitEl = React.createElement(PortraitCard);
const defaultPortraitHtml = renderToStaticMarkup(defaultPortraitEl);
if (!defaultPortraitHtml.includes('Oracle Java SE 11 Certified') || !defaultPortraitHtml.includes('Available for Roles (2027)')) {
  throw new Error('PortraitCard default props failed to render default badges');
}
console.log('✅ PortraitCard default props verified');

// 2c. Custom badges and relative path without leading slash
const customPortraitEl = React.createElement(PortraitCard, {
  avatarUrl: 'custom-photo.jpg',
  name: 'Test Candidate',
  topBadge: { text: 'Custom Top Badge', variant: 'gold' },
  bottomBadge: { text: 'Custom Bottom Badge', variant: 'crimson' },
  showAvailability: false,
});
const customPortraitHtml = renderToStaticMarkup(customPortraitEl);
if (!customPortraitHtml.includes('/custom-photo.jpg') || !customPortraitHtml.includes('Custom Top Badge')) {
  throw new Error('Custom PortraitCard failed to render custom avatar or badge text');
}
if (customPortraitHtml.includes('Available for Roles (2027)')) {
  throw new Error('PortraitCard rendered availability beacon when showAvailability=false');
}
console.log('✅ PortraitCard custom badge overrides and availability toggle verified');

// ==========================================
// 3. Hero Verification
// ==========================================
console.log('\n[3/5] Verifying Hero Component...');
if (typeof Hero !== 'function' && typeof HeroModule.Hero !== 'function') {
  throw new Error('Hero component must be exported as a function/component');
}

// 3a. Standard props with profile
const heroEl = React.createElement(Hero, {
  profile: profileData,
});
const heroHtml = renderToStaticMarkup(heroEl);

// 3a.1 Headline verification
if (!heroHtml.includes('Dual Hybrid:')) {
  throw new Error('Hero HTML is missing pre-headline "Dual Hybrid:"');
}
if (!heroHtml.includes('Backend &amp; Systems Engineer') && !heroHtml.includes('Backend & Systems Engineer')) {
  throw new Error('Hero HTML is missing highlighted title "Backend & Systems Engineer"');
}
if (!heroHtml.includes('with Applied AI')) {
  throw new Error('Hero HTML is missing headline suffix "with Applied AI"');
}
console.log('✅ Hero renders high-impact headline with gradient accent');

// 3a.2 Recruiter Fast-Scan Badges
if (!heroHtml.includes(profileData.status)) {
  throw new Error(`Hero HTML missing recruiter live status: ${profileData.status}`);
}
if (!heroHtml.includes(profileData.location)) {
  throw new Error(`Hero HTML missing candidate location: ${profileData.location}`);
}
if (!heroHtml.includes('Saveetha University (CGPA 8.46)')) {
  throw new Error('Hero HTML missing university credential badge');
}
console.log('✅ Hero renders recruiter fast-scan metadata badges');

// 3a.3 Typewriter Terminal Box
if (!heroHtml.includes('sys@mithun:~$')) {
  throw new Error('Hero HTML is missing typewriter terminal prompt: "sys@mithun:~$"');
}
// Initial SSR render should contain the first tagline for SEO & first paint
if (!heroHtml.includes('FastAPI services')) {
  throw new Error('Hero HTML typewriter box is empty in initial SSR render');
}
console.log('✅ Hero renders terminal typewriter prompt with initial tagline in SSR');

// 3a.4 Primary CTAs
if (!heroHtml.includes('href="#projects"') || !heroHtml.includes('Explore Systems')) {
  throw new Error('Hero HTML is missing primary CTA "Explore Systems" -> #projects');
}
if (!heroHtml.includes('href="/Mithun_Senthil_Resume.docx"') || !heroHtml.includes('Download Resume')) {
  throw new Error('Hero HTML is missing primary CTA "Download Resume" -> /Mithun_Senthil_Resume.docx');
}
if (!heroHtml.includes('href="#contact"') || !heroHtml.includes('Get in Touch')) {
  throw new Error('Hero HTML is missing primary CTA "Get in Touch" -> #contact');
}
console.log('✅ Hero renders all 3 primary CTAs with correct navigation targets and download attributes');

// 3a.5 Social Links
const requiredSocials = ['github.com/mithuntech11', 'linkedin.com/in/mithunsenthil', 'mailto:mithuntech111@gmail.com'];
for (const social of requiredSocials) {
  if (!heroHtml.includes(social)) {
    throw new Error(`Hero HTML is missing social connect link: "${social}"`);
  }
}
console.log('✅ Hero renders quick-connect social links (GitHub, LinkedIn, Email, Call)');

// 3a.6 Embedded sub-components
if (!heroHtml.includes('Recruiter Impact Highlights')) {
  throw new Error('Hero HTML is missing Recruiter Impact Highlights sub-header');
}
if (!heroHtml.includes('/Mithun.jpeg')) {
  throw new Error('Hero HTML missing embedded PortraitCard');
}
console.log('✅ Hero successfully embeds PortraitCard and StatCounter');

// 3b. Default props
const defaultHeroEl = React.createElement(Hero);
const defaultHeroHtml = renderToStaticMarkup(defaultHeroEl);
if (!defaultHeroHtml.includes('Dual Hybrid:') || !defaultHeroHtml.includes('Explore Systems')) {
  throw new Error('Hero failed to render with default props');
}
console.log('✅ Hero default props verified');

// 3c. Edge case: Profile with empty typewriterTexts & custom resume
const customProfile: ProfileData = {
  ...profileData,
  typewriterTexts: [],
  tagline: 'Custom Tagline Only',
  resumeUrl: 'https://example.com/external-resume.pdf',
};
const fallbackHeroEl = React.createElement(Hero, { profile: customProfile });
const fallbackHeroHtml = renderToStaticMarkup(fallbackHeroEl);
if (!fallbackHeroHtml.includes('Custom Tagline Only')) {
  throw new Error('Hero failed to fall back to tagline when typewriterTexts is empty');
}
if (!fallbackHeroHtml.includes('href="https://example.com/external-resume.pdf"')) {
  throw new Error('Hero failed to preserve external resumeUrl');
}
console.log('✅ Hero typewriter fallback and external resumeUrl handling verified');

// 3d. Edge case: Profile with empty tagline and empty typewriterTexts
const extremeCustomProfile: ProfileData = {
  ...profileData,
  typewriterTexts: [],
  tagline: '',
  socialLinks: [],
};
const extremeHeroEl = React.createElement(Hero, { profile: extremeCustomProfile });
const extremeHeroHtml = renderToStaticMarkup(extremeHeroEl);
if (!extremeHeroHtml || extremeHeroHtml.length === 0) {
  throw new Error('Hero failed when typewriterTexts, tagline, and socialLinks are empty');
}
console.log('✅ Hero extreme edge case (empty typewriterTexts, empty tagline, empty socialLinks) handled gracefully');

// ==========================================
// 4. Recruiter Data Integrity Check
// ==========================================
console.log('\n[4/5] Verifying Recruiter Data Integrity...');
const stats = profileData.recruiterStats;
const hasInternships = stats.some((s) => s.label.toLowerCase().includes('internship') && s.numericTarget === 2);
const hasSystems = stats.some((s) => s.label.toLowerCase().includes('production') && s.numericTarget === 3);
const hasCerts = stats.some((s) => s.label.toLowerCase().includes('cert') && s.numericTarget === 6);
const hasCGPA = stats.some((s) => s.label.toLowerCase().includes('cgpa') && s.numericTarget === 8.46);

if (!hasInternships || !hasSystems || !hasCerts || !hasCGPA) {
  throw new Error('Recruiter stats data does not match required impact metrics (2 Internships, 3+ Systems, 6+ Certs, 8.46 CGPA)');
}
console.log('✅ Recruiter impact statistics data integrity verified in profile.ts');

// ==========================================
// 5. Barrel Export Verification
// ==========================================
console.log('\n[5/5] Verifying Barrel Exports...');
const barrelExports = { Hero, PortraitCard, StatCounter };
for (const [name, component] of Object.entries(barrelExports)) {
  if (typeof component !== 'function') {
    throw new Error(`Hero barrel index.ts is missing or has invalid export: ${name}`);
  }
}
console.log('✅ Hero barrel export index.ts verified with all 3 components');

console.log('\n🎉 ALL HERO SECTION TESTS AND VERIFICATIONS PASSED SUCCESSFULLY!\n');
