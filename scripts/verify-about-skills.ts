import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { About } from '../src/components/about';
import * as AboutModule from '../src/components/about/About';
import { SkillsMatrix, SKILL_FILTER_TABS } from '../src/components/skills';
import * as SkillsMatrixModule from '../src/components/skills/SkillsMatrix';
import { educationData } from '../src/data/education';
import { skillsData } from '../src/data/skills';
import { profileData } from '../src/data/profile';

console.log('--- Verifying About & Skills Matrix Components ---');

// ==========================================
// 1. About Component Verification
// ==========================================
console.log('\n[1/4] Verifying About Component...');

if (typeof About !== 'function' || typeof AboutModule.About !== 'function') {
  throw new Error('About component must be exported as a valid React component function');
}

// 1.1 Element creation with default props
const defaultAboutEl = React.createElement(About, {});
if (!defaultAboutEl || defaultAboutEl.type !== About) {
  throw new Error('Failed to create About element with default props');
}

// 1.2 Element creation with custom props
const customAboutEl = React.createElement(About, {
  profile: profileData,
  education: educationData,
});
if (!customAboutEl || customAboutEl.type !== About) {
  throw new Error('Failed to create About element with explicit props');
}

// 1.3 Static HTML rendering check
const aboutHtml = renderToStaticMarkup(customAboutEl);
if (!aboutHtml || aboutHtml.length === 0) {
  throw new Error('About component rendered empty static markup');
}

// Check key narrative phrases
const requiredAboutPhrases = [
  'Dual Hybrid',
  'Saveetha',
  '8.46',
  'Sunbeam International School',
  'Balsam Academy',
];

for (const phrase of requiredAboutPhrases) {
  if (!aboutHtml.includes(phrase)) {
    throw new Error(`About HTML is missing expected narrative phrase: "${phrase}"`);
  }
}
console.log('✅ About component renders narrative, Saveetha CGPA 8.46, and education cards');

// ==========================================
// 2. SkillsMatrix Component Verification
// ==========================================
console.log('\n[2/4] Verifying SkillsMatrix Component...');

if (typeof SkillsMatrix !== 'function' || typeof SkillsMatrixModule.SkillsMatrix !== 'function') {
  throw new Error('SkillsMatrix component must be exported as a valid React component function');
}

// 2.1 Filter tabs verification
const expectedTabs = [
  'All',
  'Backend Systems',
  'AI & Machine Learning',
  'Cloud & Databases',
  'Core Engineering & Tools',
];

if (!Array.isArray(SKILL_FILTER_TABS)) {
  throw new Error('SKILL_FILTER_TABS must be exported as an array');
}

for (const tab of expectedTabs) {
  if (!SKILL_FILTER_TABS.includes(tab as any)) {
    throw new Error(`SKILL_FILTER_TABS is missing expected filter tab: "${tab}"`);
  }
}

// 2.2 Element creation with default props
const defaultSkillsEl = React.createElement(SkillsMatrix, {});
if (!defaultSkillsEl || defaultSkillsEl.type !== SkillsMatrix) {
  throw new Error('Failed to create SkillsMatrix element with default props');
}

// 2.3 Element creation with custom props
const customSkillsEl = React.createElement(SkillsMatrix, {
  categories: skillsData,
  activeFilter: 'Backend Systems',
});
if (!customSkillsEl || customSkillsEl.type !== SkillsMatrix) {
  throw new Error('Failed to create SkillsMatrix element with explicit filter props');
}

// 2.4 Static HTML rendering check
const skillsHtml = renderToStaticMarkup(defaultSkillsEl);
if (!skillsHtml || skillsHtml.length === 0) {
  throw new Error('SkillsMatrix component rendered empty static markup');
}

// Check filter tabs rendered (handling HTML encoding of '&' as '&amp;')
for (const tab of expectedTabs) {
  const htmlEncodedTab = tab.replace(/&/g, '&amp;');
  if (!skillsHtml.includes(tab) && !skillsHtml.includes(htmlEncodedTab)) {
    throw new Error(`SkillsMatrix HTML does not contain filter tab: "${tab}"`);
  }
}

// Check key skill tokens rendered
const requiredSkillTokens = [
  'Python 3.x',
  'Java SE 11',
  'SQL',
  'FastAPI',
  'Spring Boot',
  'PostgreSQL',
];

for (const token of requiredSkillTokens) {
  if (!skillsHtml.includes(token)) {
    throw new Error(`SkillsMatrix HTML is missing expected skill token: "${token}"`);
  }
}
console.log('✅ SkillsMatrix component renders all 5 filter tabs and skill chips with proficiency');

// ==========================================
// 3. Edge Cases & Robustness
// ==========================================
console.log('\n[3/4] Verifying Edge Cases & Robustness...');

// Empty education edge case
const emptyAboutHtml = renderToStaticMarkup(
  React.createElement(About, {
    education: [],
  })
);
if (!emptyAboutHtml || !emptyAboutHtml.includes('Saveetha')) {
  throw new Error('About component broke when education array was empty');
}

// Empty categories edge case
const emptySkillsHtml = renderToStaticMarkup(
  React.createElement(SkillsMatrix, {
    categories: [],
  })
);
if (!emptySkillsHtml) {
  throw new Error('SkillsMatrix component broke when categories array was empty');
}
console.log('✅ Edge cases (empty arrays, boundary props) handled gracefully');

// ==========================================
// 4. Barrel Exports Verification
// ==========================================
console.log('\n[4/4] Verifying Barrel Exports...');

const aboutBarrel = await import('../src/components/about');
if (!aboutBarrel.About) {
  throw new Error('src/components/about/index.ts must export About');
}

const skillsBarrel = await import('../src/components/skills');
if (!skillsBarrel.SkillsMatrix) {
  throw new Error('src/components/skills/index.ts must export SkillsMatrix');
}
if (!skillsBarrel.SKILL_FILTER_TABS) {
  throw new Error('src/components/skills/index.ts must export SKILL_FILTER_TABS');
}

console.log('✅ Barrel index files properly export About and SkillsMatrix');
console.log('\n🎉 ALL ABOUT & SKILLS MATRIX VERIFICATIONS PASSED SUCCESSFULLY!');
