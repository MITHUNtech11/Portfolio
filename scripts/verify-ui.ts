import React from 'react';
import { Button, Badge, Modal, ZoomPanViewer, TiltCard } from '../src/components/ui';
import * as ButtonModule from '../src/components/ui/Button';
import * as BadgeModule from '../src/components/ui/Badge';
import * as ModalModule from '../src/components/ui/Modal';
import * as ZoomPanViewerModule from '../src/components/ui/ZoomPanViewer';
import * as TiltCardModule from '../src/components/ui/TiltCard';

console.log('--- Verifying UI Primitives ---');

// 1. Button Verification
if (typeof Button !== 'function' && typeof ButtonModule.Button !== 'function') {
  throw new Error('Button component must be exported as a function/component');
}
const btnEl = React.createElement(Button, { variant: 'primary', size: 'md' }, 'Click');
if (!btnEl || btnEl.type !== Button) {
  throw new Error('Failed to create Button element');
}
console.log('✅ Button primitive verified');

// 2. Badge Verification
if (typeof Badge !== 'function' && typeof BadgeModule.Badge !== 'function') {
  throw new Error('Badge component must be exported as a function/component');
}
const badgeEl = React.createElement(Badge, { variant: 'gold' }, 'Oracle Certified');
if (!badgeEl || badgeEl.type !== Badge) {
  throw new Error('Failed to create Badge element');
}
console.log('✅ Badge primitive verified');

// 3. Modal Verification
if (typeof Modal !== 'function' && typeof ModalModule.Modal !== 'function') {
  throw new Error('Modal component must be exported as a function/component');
}
const modalEl = React.createElement(Modal, { isOpen: false, onClose: () => {} }, 'Modal Content');
if (!modalEl || modalEl.type !== Modal) {
  throw new Error('Failed to create Modal element');
}
console.log('✅ Modal primitive verified');

// 4. ZoomPanViewer Verification
if (typeof ZoomPanViewer !== 'function' && typeof ZoomPanViewerModule.ZoomPanViewer !== 'function') {
  throw new Error('ZoomPanViewer component must be exported as a function/component');
}
const viewerEl = React.createElement(ZoomPanViewer, { src: 'workflows/AI-RECRUITER.png', alt: 'Architecture' });
if (!viewerEl || viewerEl.type !== ZoomPanViewer) {
  throw new Error('Failed to create ZoomPanViewer element');
}
console.log('✅ ZoomPanViewer primitive verified');

// 5. TiltCard Verification
if (typeof TiltCard !== 'function' && typeof TiltCardModule.TiltCard !== 'function') {
  throw new Error('TiltCard component must be exported as a function/component');
}
const tiltEl = React.createElement(TiltCard, {}, React.createElement('div', null, 'Card Content'));
if (!tiltEl || tiltEl.type !== TiltCard) {
  throw new Error('Failed to create TiltCard element');
}
console.log('✅ TiltCard primitive verified');

// 6. Barrel Index Verification
const barrelExports = { Button, Badge, Modal, ZoomPanViewer, TiltCard };
for (const [name, component] of Object.entries(barrelExports)) {
  if (typeof component !== 'function') {
    throw new Error(`Barrel export index.ts is missing or has invalid export: ${name}`);
  }
}
console.log('✅ UI barrel export index.ts verified with all 5 primitives');

console.log('🎉 All UI primitive verifications passed successfully!');
