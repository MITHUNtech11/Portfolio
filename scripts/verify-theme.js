import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('src/index.css');
if (!fs.existsSync(cssPath)) {
  throw new Error('src/index.css does not exist');
}

const css = fs.readFileSync(cssPath, 'utf-8');
const requiredVariables = [
  '--bg-base',
  '--surface-card',
  '--surface-card-hover',
  '--gold-accent',
  '--crimson-accent',
  '--text-cream',
  '--text-sand',
];

for (const variable of requiredVariables) {
  if (!css.includes(variable)) {
    throw new Error(`Theme variable ${variable} missing in src/index.css`);
  }
}

if (!css.includes('@import "tailwindcss"') && !css.includes("@import 'tailwindcss'")) {
  throw new Error('Tailwind v4 import missing in src/index.css');
}

const htmlPath = path.resolve('index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

if (!html.includes('Plus+Jakarta+Sans') && !html.includes('Plus Jakarta Sans')) {
  throw new Error('Google Font Plus Jakarta Sans missing in index.html');
}
if (!html.includes('Inter')) {
  throw new Error('Google Font Inter missing in index.html');
}
if (!html.includes('JetBrains+Mono') && !html.includes('JetBrains Mono')) {
  throw new Error('Google Font JetBrains Mono missing in index.html');
}
if (!html.includes('id="root"')) {
  throw new Error('Root mount point #root missing in index.html');
}
if (!html.includes('/src/main.tsx')) {
  throw new Error('React entry point /src/main.tsx script missing in index.html');
}

console.log('Theme check passed: index.css variables, tailwind import, fonts, and root mount verified.');
