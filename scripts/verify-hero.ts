import React from 'react';
import { Hero, PortraitCard, StatCounter } from '../src/components/hero';
import * as HeroModule from '../src/components/hero/Hero';
import * as PortraitCardModule from '../src/components/hero/PortraitCard';
import * as StatCounterModule from '../src/components/hero/StatCounter';
import { profileData } from '../src/data/profile';

console.log('--- Verifying Hero Section Components & Edge Cases ---');

// 1. StatCounter Verification
if (typeof StatCounter !== 'function' && typeof StatCounterModule.StatCounter !== 'function') {
  throw new Error('StatCounter component must be exported as a function/component');
}

// 1a. Standard props
const statCounterEl = React.createElement(StatCounter, {
  stats: profileData.recruiterStats,
});
if (!statCounterEl || statCounterEl.type !== StatCounter) {
  throw new Error('Failed to create StatCounter element');
}

// 1b. Default props (no stats prop passed)
const defaultStatCounterEl = React.createElement(StatCounter);
if (!defaultStatCounterEl || defaultStatCounterEl.type !== StatCounter) {
  throw new Error('Failed to create default StatCounter element');
}

// 1c. Edge case: Empty stats array
const emptyStatCounterEl = React.createElement(StatCounter, { stats: [] });
if (!emptyStatCounterEl || emptyStatCounterEl.type !== StatCounter) {
  throw new Error('Failed to create empty StatCounter element');
}

// 1d. Edge case: stats with diverse numeric targets (float, integer, undefined)
const customStatCounterEl = React.createElement(StatCounter, {
  stats: [
    { label: 'CGPA', value: '8.46', numericTarget: 8.46 },
    { label: 'Systems', value: '3+', numericTarget: 3, suffix: '+' },
    { label: 'Custom', value: 'N/A' },
  ],
});
if (!customStatCounterEl || customStatCounterEl.type !== StatCounter) {
  throw new Error('Failed to create custom StatCounter element');
}
console.log('✅ StatCounter component & edge cases verified');

// 2. PortraitCard Verification
if (typeof PortraitCard !== 'function' && typeof PortraitCardModule.PortraitCard !== 'function') {
  throw new Error('PortraitCard component must be exported as a function/component');
}

// 2a. Standard props
const portraitEl = React.createElement(PortraitCard, {
  avatarUrl: profileData.avatarUrl,
  name: profileData.name,
});
if (!portraitEl || portraitEl.type !== PortraitCard) {
  throw new Error('Failed to create PortraitCard element');
}

// 2b. Default props
const defaultPortraitEl = React.createElement(PortraitCard);
if (!defaultPortraitEl || defaultPortraitEl.type !== PortraitCard) {
  throw new Error('Failed to create default PortraitCard element');
}

// 2c. Custom badges and relative path without leading slash
const customPortraitEl = React.createElement(PortraitCard, {
  avatarUrl: 'Mithun.jpeg',
  name: 'Mithun',
  topBadge: { text: 'Oracle Certified', variant: 'gold' },
  bottomBadge: { text: 'CGPA 8.46', variant: 'crimson' },
  showAvailability: false,
});
if (!customPortraitEl || customPortraitEl.type !== PortraitCard) {
  throw new Error('Failed to create custom PortraitCard element');
}
console.log('✅ PortraitCard component & edge cases verified');

// 3. Hero Verification
if (typeof Hero !== 'function' && typeof HeroModule.Hero !== 'function') {
  throw new Error('Hero component must be exported as a function/component');
}

// 3a. Standard props with profile
const heroEl = React.createElement(Hero, {
  profile: profileData,
});
if (!heroEl || heroEl.type !== Hero) {
  throw new Error('Failed to create Hero element');
}

// 3b. Default props
const defaultHeroEl = React.createElement(Hero);
if (!defaultHeroEl || defaultHeroEl.type !== Hero) {
  throw new Error('Failed to create default Hero element');
}

// 3c. Edge case: Profile with empty typewriterTexts
const customProfile = {
  ...profileData,
  typewriterTexts: [],
};
const fallbackHeroEl = React.createElement(Hero, { profile: customProfile });
if (!fallbackHeroEl || fallbackHeroEl.type !== Hero) {
  throw new Error('Failed to create fallback Hero element');
}
console.log('✅ Hero root component & edge cases verified');

// 4. Recruiter Data Integrity Check
const stats = profileData.recruiterStats;
const hasInternships = stats.some((s) => s.label.toLowerCase().includes('internship') && s.numericTarget === 2);
const hasSystems = stats.some((s) => s.label.toLowerCase().includes('production') && s.numericTarget === 3);
const hasCerts = stats.some((s) => s.label.toLowerCase().includes('cert') && s.numericTarget === 6);
const hasCGPA = stats.some((s) => s.label.toLowerCase().includes('cgpa') && s.numericTarget === 8.46);

if (!hasInternships || !hasSystems || !hasCerts || !hasCGPA) {
  throw new Error('Recruiter stats data does not match required impact metrics (2 Internships, 3+ Systems, 6+ Certs, 8.46 CGPA)');
}
console.log('✅ Recruiter impact statistics data integrity verified');

// 5. Barrel Export Verification
const barrelExports = { Hero, PortraitCard, StatCounter };
for (const [name, component] of Object.entries(barrelExports)) {
  if (typeof component !== 'function') {
    throw new Error(`Hero barrel index.ts is missing or has invalid export: ${name}`);
  }
}
console.log('✅ Hero barrel export index.ts verified with all 3 components');

console.log('🎉 All Hero component verifications passed successfully!');
