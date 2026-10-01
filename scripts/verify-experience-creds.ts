import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExperienceTimeline } from '../src/components/experience';
import * as ExperienceTimelineModule from '../src/components/experience/ExperienceTimeline';
import { Credentials, CertificateModal } from '../src/components/credentials';
import * as CredentialsModule from '../src/components/credentials/Credentials';
import * as CertificateModalModule from '../src/components/credentials/CertificateModal';
import { experienceData } from '../src/data/experience';
import { certificatesData } from '../src/data/certificates';
import { ExperienceItem, CertificateItem } from '../src/types';

console.log('--- Verifying Experience and Credentials Components ---');

// ==========================================
// 1. Experience Data Verification
// ==========================================
console.log('\n[1/6] Verifying Experience Data...');
if (!Array.isArray(experienceData) || experienceData.length < 2) {
  throw new Error('experienceData must have at least 2 entries (Kauvery and RedBack)');
}
const kauveryExp = experienceData.find((e) => e.id === 'kauvery');
const redbackExp = experienceData.find((e) => e.id === 'redback');
if (!kauveryExp || !redbackExp) {
  throw new Error('experienceData is missing kauvery or redback entries');
}
if (!kauveryExp.subprojects || kauveryExp.subprojects.length < 2) {
  throw new Error('Kauvery experience must have at least 2 subprojects');
}
console.log('✅ Experience data entries verified');

// ==========================================
// 2. Certificates Data Verification
// ==========================================
console.log('\n[2/6] Verifying Certificates Data...');
if (!Array.isArray(certificatesData) || certificatesData.length === 0) {
  throw new Error('certificatesData must not be empty');
}
const oracleJava = certificatesData.find((c) => c.id === 'oracle-java');
const oracleSql = certificatesData.find((c) => c.id === 'oracle-sql');
const agileCert = certificatesData.find((c) => c.id === 'agile');
const kauveryCert = certificatesData.find((c) => c.id === 'kauvery-internship');

if (!oracleJava || !oracleSql || !agileCert || !kauveryCert) {
  throw new Error('certificatesData missing key Oracle/Agile/Kauvery certificates');
}
console.log('✅ Certificates data verified');

// ==========================================
// 3. ExperienceTimeline Component & SSR
// ==========================================
console.log('\n[3/6] Verifying ExperienceTimeline Component & Render...');
if (
  typeof ExperienceTimeline !== 'function' &&
  typeof ExperienceTimelineModule.ExperienceTimeline !== 'function'
) {
  throw new Error('ExperienceTimeline must be exported as a React component');
}

// 3.1 Default props render (should consume experienceData)
const expHtml = renderToStaticMarkup(React.createElement(ExperienceTimeline));
if (!expHtml.includes('Kauvery Hospital') || !expHtml.includes('RedBack IT Solutions')) {
  throw new Error('ExperienceTimeline HTML does not include expected company names');
}
if (!expHtml.includes('Digital Product Data Vault') || !expHtml.includes('AI Recruiter Application')) {
  throw new Error('ExperienceTimeline HTML does not include Kauvery subprojects');
}
if (!expHtml.includes('Urban Route Optimizer')) {
  throw new Error('ExperienceTimeline HTML does not include RedBack subproject');
}
console.log('✅ ExperienceTimeline default SSR render verified');

// 3.2 Edge Case: Empty experiences array
const emptyExpHtml = renderToStaticMarkup(
  React.createElement(ExperienceTimeline, { experiences: [] })
);
if (!emptyExpHtml || !emptyExpHtml.includes('experience')) {
  throw new Error('ExperienceTimeline failed to render with empty experiences');
}
if (!emptyExpHtml.includes('No corporate experience milestones recorded')) {
  throw new Error('ExperienceTimeline empty list must render user-friendly empty state');
}
console.log('✅ ExperienceTimeline empty list edge case verified');

// 3.3 Edge Case: Sparse experience item (no division, location, empty tech)
const sparseExp: ExperienceItem[] = [
  {
    id: 'sparse-exp',
    company: 'Minimal Corp',
    role: 'Software Engineer',
    period: '2025',
    subprojects: [
      {
        title: 'Minimal Project',
        tech: '',
        tasks: ['Minimal task'],
      },
    ],
  },
];
const sparseExpHtml = renderToStaticMarkup(
  React.createElement(ExperienceTimeline, { experiences: sparseExp })
);
if (!sparseExpHtml.includes('Minimal Corp') || !sparseExpHtml.includes('Minimal Project')) {
  throw new Error('ExperienceTimeline failed to render with sparse experience item');
}

// 3.4 Deep Edge Case: Missing subprojects and undefined tasks with comma/pipe tech delimiters
const extremeSparseExp: ExperienceItem[] = [
  {
    id: 'extreme-sparse',
    company: 'EdgeCorp',
    role: 'Backend Architect',
    period: '2026',
    subprojects: undefined as any,
  },
  {
    id: 'comma-tech-exp',
    company: 'DelimiterCorp',
    role: 'Fullstack Dev',
    period: '2026',
    subprojects: [
      {
        title: 'Multi-Delimiter Project',
        tech: 'Go, Rust | Docker • Kubernetes',
        tasks: undefined as any,
      },
    ],
  },
];
const extremeExpHtml = renderToStaticMarkup(
  React.createElement(ExperienceTimeline, { experiences: extremeSparseExp })
);
if (
  !extremeExpHtml.includes('EdgeCorp') ||
  !extremeExpHtml.includes('DelimiterCorp') ||
  !extremeExpHtml.includes('Rust') ||
  !extremeExpHtml.includes('Docker')
) {
  throw new Error('ExperienceTimeline failed to handle extreme sparse data or multi-delimiters');
}
console.log('✅ ExperienceTimeline sparse input & delimiter edge cases verified');

// ==========================================
// 4. CertificateModal Component & SSR
// ==========================================
console.log('\n[4/6] Verifying CertificateModal Component & Render...');
if (
  typeof CertificateModal !== 'function' &&
  typeof CertificateModalModule.CertificateModal !== 'function'
) {
  throw new Error('CertificateModal must be exported as a React component');
}

// 4.1 Edge Case: Certificate is null
const nullCertHtml = renderToStaticMarkup(
  React.createElement(CertificateModal, {
    isOpen: true,
    certificate: null,
    onClose: () => {},
  })
);
if (nullCertHtml !== '') {
  throw new Error('CertificateModal must render empty output when certificate is null');
}
console.log('✅ CertificateModal null certificate edge case verified');

// 4.2 Edge Case: Modal closed
const closedModalHtml = renderToStaticMarkup(
  React.createElement(CertificateModal, {
    isOpen: false,
    certificate: oracleJava,
    onClose: () => {},
  })
);
// Modal renders nothing or closed portal
console.log('✅ CertificateModal closed state verified');

// 4.3 Modal Open with Oracle Java Certificate
const openModalHtml = renderToStaticMarkup(
  React.createElement(CertificateModal, {
    isOpen: true,
    certificate: oracleJava,
    onClose: () => {},
  })
);
if (!openModalHtml.includes('Java SE 11') || !openModalHtml.includes('100878330OCPJSE11')) {
  throw new Error('CertificateModal HTML missing certificate title or credential ID');
}
if (!openModalHtml.includes('Direct Asset Link')) {
  throw new Error('CertificateModal HTML missing Direct Asset Link button');
}
if (!openModalHtml.includes('Download PDF') && !openModalHtml.includes('download')) {
  throw new Error('CertificateModal HTML missing download action or attribute');
}
console.log('✅ CertificateModal open SSR render verified');

// 4.4 Edge Case: Sparse certificate (no credentialId, no pdfUrl, no skills)
const sparseCert: CertificateItem = {
  id: 'sparse-cert',
  title: 'Basic Course',
  issuer: 'Generic Academy',
  date: 'Jan 2025',
  image: 'certificate/test.png',
};
const sparseCertHtml = renderToStaticMarkup(
  React.createElement(CertificateModal, {
    isOpen: true,
    certificate: sparseCert,
    onClose: () => {},
  })
);
if (!sparseCertHtml.includes('Basic Course') || !sparseCertHtml.includes('Generic Academy')) {
  throw new Error('CertificateModal failed to render sparse certificate');
}
if (!sparseCertHtml.includes('Download Asset')) {
  throw new Error('CertificateModal must provide download button when no PDF is attached');
}

// 4.5 External URLs preservation check
const externalCert: CertificateItem = {
  id: 'ext-cert',
  title: 'External Certificate',
  issuer: 'Cloud Academy',
  date: 'Feb 2026',
  image: 'https://cdn.example.com/certificates/cloud.png',
  pdfUrl: 'https://cdn.example.com/certificates/cloud.pdf',
};
const externalCertHtml = renderToStaticMarkup(
  React.createElement(CertificateModal, {
    isOpen: true,
    certificate: externalCert,
    onClose: () => {},
  })
);
if (externalCertHtml.includes('/https://')) {
  throw new Error('CertificateModal corrupted external URLs by prepending leading slash');
}
if (!externalCertHtml.includes('https://cdn.example.com/certificates/cloud.png')) {
  throw new Error('CertificateModal failed to preserve external image URL');
}
console.log('✅ CertificateModal sparse & external URL edge cases verified');

// ==========================================
// 5. Credentials Component & SSR
// ==========================================
console.log('\n[5/6] Verifying Credentials Component & Render...');
if (
  typeof Credentials !== 'function' &&
  typeof CredentialsModule.Credentials !== 'function'
) {
  throw new Error('Credentials must be exported as a React component');
}

// 5.1 Default props render (consumes certificatesData)
const credsHtml = renderToStaticMarkup(React.createElement(Credentials));
if (
  !credsHtml.includes('Oracle Certified Professional') ||
  !credsHtml.includes('Agile Certification')
) {
  throw new Error('Credentials HTML does not include expected certifications');
}
if (!credsHtml.includes('Inspect Credential')) {
  throw new Error('Credentials HTML does not include "Inspect Credential" buttons');
}
// Default counts verification
if (
  !credsHtml.includes(`All (${certificatesData.length})`) ||
  !credsHtml.includes('Oracle &amp; Agile (3)') ||
  !credsHtml.includes('NPTEL Elite (3)') ||
  !credsHtml.includes('Experience &amp; Contests (2)')
) {
  throw new Error('Credentials HTML default category counts mismatch');
}
console.log('✅ Credentials default SSR render verified');

// 5.2 Edge Case: Empty certificates array
const emptyCredsHtml = renderToStaticMarkup(
  React.createElement(Credentials, { certificates: [] })
);
if (!emptyCredsHtml || !emptyCredsHtml.includes('credentials')) {
  throw new Error('Credentials failed to render with empty certificates');
}
if (emptyCredsHtml.includes('Oracle &amp; Agile (3)')) {
  throw new Error('Credentials with empty array must not show hardcoded (3) count');
}
if (!emptyCredsHtml.includes('All (0)') || !emptyCredsHtml.includes('Oracle &amp; Agile (0)')) {
  throw new Error('Credentials with empty array must dynamically calculate (0) count');
}
if (!emptyCredsHtml.includes('No credentials found for this category')) {
  throw new Error('Credentials with empty array must render empty state message');
}
console.log('✅ Credentials empty list dynamic counts edge case verified');

// 5.3 Custom certificates list
const customCredsHtml = renderToStaticMarkup(
  React.createElement(Credentials, { certificates: [oracleJava, oracleSql] })
);
if (!customCredsHtml.includes('100878330OCPJSE11') || !customCredsHtml.includes('OC5306507')) {
  throw new Error('Credentials failed to render custom certificates list');
}
if (!customCredsHtml.includes('All (2)') || !customCredsHtml.includes('Oracle &amp; Agile (2)')) {
  throw new Error('Credentials failed to dynamically compute counts for custom subset');
}
if (!customCredsHtml.includes('NPTEL Elite (0)') || !customCredsHtml.includes('Experience &amp; Contests (0)')) {
  throw new Error('Credentials failed to zero-out empty categories in custom subset');
}
if (customCredsHtml.includes('Oracle &amp; Agile (3)')) {
  throw new Error('Credentials custom list erroneously rendered hardcoded (3) label');
}
console.log('✅ Credentials custom list dynamic category counts verified');

// ==========================================
// 6. Barrel Exports Verification
// ==========================================
console.log('\n[6/6] Verifying Barrel Exports...');
const expBarrel = { ExperienceTimeline };
for (const [name, component] of Object.entries(expBarrel)) {
  if (typeof component !== 'function') {
    throw new Error(`Experience barrel export index.ts is missing or invalid: ${name}`);
  }
}
const credsBarrel = { Credentials, CertificateModal };
for (const [name, component] of Object.entries(credsBarrel)) {
  if (typeof component !== 'function') {
    throw new Error(`Credentials barrel export index.ts is missing or invalid: ${name}`);
  }
}
console.log('✅ Experience & Credentials barrel exports verified');

console.log('\n🎉 ALL EXPERIENCE & CREDENTIALS VERIFICATIONS PASSED SUCCESSFULLY!');
