# Portfolio React 19 Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the monolithic 4,600+ line `index.html` portfolio into a high-performance, modular React 19 + TypeScript + Tailwind CSS application featuring the "Evolved Crimson & Warm Gold" design system, interactive architecture workflow modals, verified credential inspectors, and smooth 60fps micro-interactions.

**Architecture:** A modern single-page React 19 architecture decoupled into a typed data layer (`src/data/`), reusable UI primitives (`src/components/ui/`), domain feature sections (`hero`, `about`, `skills`, `projects`, `experience`, `credentials`, `contact`), and interactive lightboxes for system architecture diagrams and certificates. Built and bundled via Vite for GitHub Pages hosting at `https://mithun.tech/`.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Motion (Framer Motion v12), Lucide React, JetBrains Mono, Plus Jakarta Sans, Inter.

**Spec:** [docs/superpowers/specs/2026-09-30-portfolio-revamp-design.md](file:///C:/Users/mithu/OneDrive/Desktop/Coding%20Practice/Portfolio/docs/superpowers/specs/2026-09-30-portfolio-revamp-design.md)

---

## Global Constraints

- **Branch Isolation**: All development must strictly take place on `feat/react-portfolio-revamp`. The `main` branch must remain pristine.
- **Hosting Target**: GitHub Pages static build (`dist/`) with CNAME `mithun.tech` and base path `./`.
- **Palette**: Deep Obsidian Cocoa canvas (`#0d0604`), Deep Velvet surface cards (`#170c08` to `#23120d`), Warm Gold accents (`#d4af37`), and Rich Crimson (`#c0392b` / `#e74c3c`).
- **Typography**: Plus Jakarta Sans for headings, Inter for body copy, JetBrains Mono for badges and code tags.
- **Zero Monolithic Bloat**: All copy and datasets reside in `src/data/` as typed objects, keeping JSX components lean and maintainable.
- **Type Safety**: Zero TypeScript errors (`tsc --noEmit` must pass cleanly).

---

## Review Focus

1. **Workflow & Certificate Asset Resolution**: Ensure all paths to `workflows/` and `certificate/` load reliably in Vite build and dev server.
2. **Modal Backdrop & Scroll Lock**: Opening architecture or certificate lightboxes must freeze body scroll, trap focus, and close smoothly on ESC or backdrop click.
3. **Touch & Mobile Viewport**: Zoom & Pan viewer on mobile devices must support pinch-to-zoom and drag gestures without breaking page scrolling.
4. **Copy-to-Clipboard Fallback**: Email copy in the Contact section must gracefully handle browsers where `navigator.clipboard` is restricted.
5. **Fast First Contentful Paint**: Ensure Google Fonts and primary hero headshot (`Mithun.jpeg`) preload and render without layout shifts.

---

### Task 1: Core Styling, Google Fonts, and React Entry Point

**Files:**
- Create: `src/index.css`
- Create: `src/main.tsx`
- Modify: `index.html:1-80`
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: Tailwind CSS v4 `@import "tailwindcss";`, Google Fonts links (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`)
- Produces: Global styles, CSS theme variables (`--bg-base`, `--surface-card`, `--gold-accent`, `--crimson-accent`), and mounts `#root`

- [ ] **Step 1: Write test script to verify font imports and CSS theme variables**
Create a test node script `scripts/verify-theme.js` to ensure `src/index.css` defines the required color variables and imports Tailwind.
```javascript
import fs from 'fs';
const css = fs.readFileSync('src/index.css', 'utf-8');
if (!css.includes('--bg-base') || !css.includes('--gold-accent')) {
  throw new Error('Theme variables missing in index.css');
}
console.log('Theme check passed');
```

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `node scripts/verify-theme.js`
Expected: FAIL (file or variables not yet created)

- [ ] **Step 3: Implement `src/index.css`, `src/main.tsx`, and update `index.html`**
- In `src/index.css`: Import Tailwind v4, define `:root` variables (`--bg-base: #0d0604`, `--surface-card: #170c08`, `--surface-card-hover: #23120d`, `--gold-accent: #d4af37`, `--crimson-accent: #c0392b`, `--text-cream: #fbf5ee`, `--text-sand: #d8c8b8`), and custom scrollbar styling.
- In `index.html`: Update head to load Google Fonts (`Plus Jakarta Sans:wght@400;600;700;800`, `Inter:wght@300;400;500;600`, `JetBrains+Mono:wght@400;500;600`), retain SEO/OpenGraph tags, replace body with `<div id="root"></div><script type="module" src="/src/main.tsx"></script>`.
- In `src/main.tsx`: Render `<StrictMode><App /></StrictMode>`.

- [ ] **Step 4: Run verification script and typecheck**
Run: `node scripts/verify-theme.js` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/index.css src/main.tsx index.html scripts/verify-theme.js
git commit -m "feat(core): setup tailwind v4, obsidian theme variables, and react 19 entry point"
```

---

### Task 2: Data Models and Centralized Typed Content Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/profile.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/education.ts`
- Create: `src/data/certificates.ts`

**Interfaces:**
- Consumes: Raw copy and metrics from `index.html`
- Produces: Strongly typed data exports (`profileData`, `projectsData`, `skillsData`, `experienceData`, `educationData`, `certificatesData`)

- [ ] **Step 1: Write typecheck test for all data modules**
Create `scripts/verify-data.ts` checking required fields on all exported data items (e.g. projects must have title, diagrams, metrics; certificates must have title, issuer, image).
```typescript
import { projectsData } from '../src/data/projects';
import { certificatesData } from '../src/data/certificates';
if (projectsData.length === 0 || certificatesData.length === 0) {
  throw new Error('Data collections cannot be empty');
}
console.log(`Verified ${projectsData.length} projects and ${certificatesData.length} certificates`);
```

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-data.ts`
Expected: FAIL (modules not found)

- [ ] **Step 3: Implement data structures in `src/types/index.ts` and `src/data/*.ts`**
- `src/types/index.ts`: Interfaces for `Project`, `ArchitectureDiagram`, `PipelineStep`, `ProjectMetric`, `SkillCategory`, `Experience`, `Education`, `Certificate`.
- `src/data/projects.ts`: Full data for `AI Recruiter`, `Digital Product Data Vault`, and `Urban Route Optimizer` with metrics, flows, and challenges.
- `src/data/skills.ts`: Categorized skills (Backend Systems, AI & Data Science, Cloud & Databases, Core Engineering & Methodologies).
- `src/data/experience.ts`: Kauvery Hospital (AI Intern) and RedBack IT Solutions (Python Intern).
- `src/data/education.ts`: Saveetha University (B.Tech AI & DS, CGPA 8.46), Sunbeam, Balsam.
- `src/data/certificates.ts`: Oracle Java SE 11, Oracle SQL/DBMS, Kauvery Internship, Agile, NPTEL, Hackathon with paths to `certificate/`.
- `src/data/profile.ts`: Name, headline, summary, contact info, resume path (`Mithun_Senthil_Resume.docx`), recruiter stat counters.

- [ ] **Step 4: Run typecheck and data verification**
Run: `npx tsx scripts/verify-data.ts` and `npm run lint`
Expected: PASS with 3 projects and 7+ certificates reported

- [ ] **Step 5: Commit**
```bash
git add src/types/ src/data/ scripts/verify-data.ts
git commit -m "feat(data): define typescript interfaces and port all structured portfolio data"
```

---

### Task 3: Reusable UI Primitives (Button, Badge, Modal, ZoomPanViewer, TiltCard)

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Modal.tsx`
- Create: `src/components/ui/ZoomPanViewer.tsx`
- Create: `src/components/ui/TiltCard.tsx`

**Interfaces:**
- Consumes: `motion` (Framer Motion v12), `lucide-react`
- Produces: Interactive accessible UI primitives for lightboxes, 3D cards, and buttons

- [ ] **Step 1: Write verification script to validate UI components exports**
Create `scripts/verify-ui.ts` that imports all UI primitives and tests runtime exports.
```typescript
import * as UI from '../src/components/ui/Modal';
if (typeof UI.Modal !== 'function') throw new Error('Modal must export a component');
console.log('UI exports verified');
```

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-ui.ts`
Expected: FAIL

- [ ] **Step 3: Implement UI primitives**
- `Button.tsx`: Supports variants (`primary` crimson, `gold` amber, `outline`, `ghost`), magnetic hover effect, and icon slots.
- `Badge.tsx`: JetBrains Mono tag with accent colors (`gold`, `crimson`, `obsidian`, `emerald`).
- `Modal.tsx`: Framer Motion backdrop & content spring animations, `aria-modal="true"`, ESC key capture, body overflow lock, and header with close button.
- `ZoomPanViewer.tsx`: Interactive canvas/image viewer supporting zoom (+/- buttons, mouse wheel, double tap), pan (drag, touch drag), reset, and fullscreen toggle.
- `TiltCard.tsx`: Lightweight 3D perspective tilt on mouse move with subtle radial light reflection.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-ui.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/ui/ scripts/verify-ui.ts
git commit -m "feat(ui): implement reusable primitives (Modal, ZoomPanViewer, TiltCard, Button, Badge)"
```

---

### Task 4: Layout Components (Navbar, Footer, ReadingProgress)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/ReadingProgress.tsx`

**Interfaces:**
- Consumes: `src/data/profile.ts`, `lucide-react`
- Produces: Navigation header with active section tracking, mobile drawer, resume download CTA, top progress indicator, and footer

- [ ] **Step 1: Write test script for layout components**
Create `scripts/verify-layout.ts` importing Navbar, Footer, and ReadingProgress.

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-layout.ts`
Expected: FAIL

- [ ] **Step 3: Implement Layout components**
- `ReadingProgress.tsx`: Framer Motion scaleX scroll progress bar anchored to the top of the viewport in warm gold gradient.
- `Navbar.tsx`: Sticky header with blur backdrop (`bg-[#0d0604]/80 backdrop-blur-md`), live status badge ("Available for Roles"), navigation links (`#about`, `#skills`, `#projects`, `#experience`, `#credentials`, `#contact`), mobile slide-out menu, and direct "Resume" download button.
- `Footer.tsx`: Obsidian dark footer with copyright, quick links, social icon buttons (GitHub, LinkedIn, Email), and smooth "Back to top" button.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-layout.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/layout/ scripts/verify-layout.ts
git commit -m "feat(layout): implement sticky navbar, mobile drawer, reading progress bar, and footer"
```

---

### Task 5: Hero Section and Recruiter Fast-Scan Header

**Files:**
- Create: `src/components/hero/Hero.tsx`
- Create: `src/components/hero/StatCounter.tsx`
- Create: `src/components/hero/PortraitCard.tsx`

**Interfaces:**
- Consumes: `src/data/profile.ts`, `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/TiltCard.tsx`
- Produces: Fast-scanning hero with 5-second recruiter hook, animated counters, and interactive portrait

- [ ] **Step 1: Write test script for Hero components**
Create `scripts/verify-hero.ts` testing Hero exports and data consumption.

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-hero.ts`
Expected: FAIL

- [ ] **Step 3: Implement Hero components**
- `Hero.tsx`: High-impact headline ("Dual Hybrid: Backend & Systems Engineer with Applied AI"), rotating/typewriter role pill, brief elevator pitch, primary CTAs ("Explore Systems", "Download Resume", "Get in Touch"), ambient glowing background mesh.
- `PortraitCard.tsx`: Headshot using `Mithun.jpeg` with glowing amber/crimson rim light, 3D tilt, and floating badges ("Oracle Java SE 11 Certified", "Saveetha CGPA 8.46").
- `StatCounter.tsx`: Animated recruiter impact counters (2 Internships, 3+ Production Systems, 6+ Verified Certifications, 8.46 CGPA).

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-hero.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/hero/ scripts/verify-hero.ts
git commit -m "feat(hero): build high-impact recruiter hero with portrait tilt card and stat counters"
```

---

### Task 6: About Narrative & Filterable Skills Matrix

**Files:**
- Create: `src/components/about/About.tsx`
- Create: `src/components/skills/SkillsMatrix.tsx`

**Interfaces:**
- Consumes: `src/data/profile.ts`, `src/data/skills.ts`, `src/data/education.ts`
- Produces: Deep narrative section and interactive filterable skills grid

- [ ] **Step 1: Write test script for About and SkillsMatrix**
Create `scripts/verify-about-skills.ts`.

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-about-skills.ts`
Expected: FAIL

- [ ] **Step 3: Implement About and SkillsMatrix components**
- `About.tsx`: Executive summary articulating Mithun's engineering philosophy, dual hybrid strengths (distributed backends + machine learning pipelines), academic foundation at Saveetha University, and education cards.
- `SkillsMatrix.tsx`: Filter tabs (`All`, `Backend Systems`, `AI & Machine Learning`, `Cloud & Databases`, `Core Engineering & Tools`), category cards with visual proficiency levels, and tech tags in JetBrains Mono.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-about-skills.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/about/ src/components/skills/ scripts/verify-about-skills.ts
git commit -m "feat(about-skills): implement about narrative, education highlights, and filterable skills matrix"
```

---

### Task 7: Featured Systems Showcase and Interactive Architecture Modal Lightbox

**Files:**
- Create: `src/components/projects/Projects.tsx`
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/projects/ArchitectureModal.tsx`

**Interfaces:**
- Consumes: `src/data/projects.ts`, `src/components/ui/Modal.tsx`, `src/components/ui/ZoomPanViewer.tsx`, `src/components/ui/TiltCard.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`
- Produces: Project showcase grid with interactive diagram lightbox

- [ ] **Step 1: Write test script for Projects and ArchitectureModal**
Create `scripts/verify-projects.ts`.

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-projects.ts`
Expected: FAIL

- [ ] **Step 3: Implement Projects and ArchitectureModal components**
- `ProjectCard.tsx`: Velvet card with thumbnail preview of workflow diagram, badge, title, overview snippet, key metrics callouts (`~40% Screening Time Saved`, `Sub-15ms Latency`, etc.), tech stack chips, and action buttons (`Architecture Deep Dive` modal trigger and `GitHub`).
- `ArchitectureModal.tsx`: Comprehensive deep dive lightbox featuring:
  - Tabbed diagram viewer with `ZoomPanViewer` (+, -, reset, pinch, drag) for `AI-RECRUITER.png`, `Digital Product Data Vault.png`, and `Urban Route Optimizer` flows.
  - Step-by-step visual pipeline flow (Ingestion -> NLP Parsing -> Priority Queue Heap -> MVC Dashboard).
  - Engineering challenges & architectural solutions (e.g. `O(N log K)` heap optimization, 3NF healthcare schema integrity).
  - Key performance metrics grid.
- `Projects.tsx`: Section container orchestrating cards and modal state.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-projects.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/projects/ scripts/verify-projects.ts
git commit -m "feat(projects): build featured systems showcase and interactive architecture lightbox"
```

---

### Task 8: Experience Timeline & Verified Credentials Inspector

**Files:**
- Create: `src/components/experience/ExperienceTimeline.tsx`
- Create: `src/components/credentials/Credentials.tsx`
- Create: `src/components/credentials/CertificateModal.tsx`

**Interfaces:**
- Consumes: `src/data/experience.ts`, `src/data/certificates.ts`, `src/components/ui/Modal.tsx`, `src/components/ui/ZoomPanViewer.tsx`
- Produces: Visual corporate experience timeline and verified credential modal inspector

- [ ] **Step 1: Write test script for Experience and Credentials**
Create `scripts/verify-experience-creds.ts`.

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-experience-creds.ts`
Expected: FAIL

- [ ] **Step 3: Implement Experience and Credentials components**
- `ExperienceTimeline.tsx`: Glowing timeline entries for Kauvery Hospital and RedBack IT Solutions, displaying company, role, date badge, subprojects with bullet points, and technology pills.
- `CertificateModal.tsx`: Modal dialog showcasing the high-res certificate image (`JAVA_ORACLE_CERTIFICATE.png`, `SQL_DBMS_ORACLE_CERTIFICATE.png`, `Kauvery-Certificate.jpg`, etc.) with `ZoomPanViewer`, issuer, issue date, credential ID, and download link.
- `Credentials.tsx`: Grid of certification cards featuring Oracle verification badges, Agile certifications, and "Inspect Credential" buttons.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-experience-creds.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/experience/ src/components/credentials/ scripts/verify-experience-creds.ts
git commit -m "feat(experience-creds): implement experience timeline and verified credential inspector"
```

---

### Task 9: Contact Section, Toast Notification, and App Assembly

**Files:**
- Create: `src/components/contact/Contact.tsx`
- Create: `src/components/ui/Toast.tsx`
- Create: `src/App.tsx`

**Interfaces:**
- Consumes: All layout and section components, `src/data/profile.ts`
- Produces: Main application component with ambient canvas, smooth scrolling, copy-to-clipboard toast, and contact form

- [ ] **Step 1: Write test script for App and Contact**
Create `scripts/verify-app.ts` verifying `App` renders without throwing and contains all section anchors (`#about`, `#skills`, `#projects`, `#experience`, `#credentials`, `#contact`).

- [ ] **Step 2: Run verification script to confirm initial failure**
Run: `npx tsx scripts/verify-app.ts`
Expected: FAIL

- [ ] **Step 3: Implement Toast, Contact, and App components**
- `Toast.tsx`: Smooth slide-up feedback notification when user copies email or submits form.
- `Contact.tsx`: One-click copy email button with instant toast notification, direct mailto button, LinkedIn/GitHub links, and interactive contact message form with client-side validation.
- `App.tsx`: Layout container combining `ReadingProgress`, `Navbar`, `Hero`, `About`, `SkillsMatrix`, `Projects`, `ExperienceTimeline`, `Credentials`, `Contact`, `Footer`, and `Toast`. Includes radial gradient background glow and scroll spy.

- [ ] **Step 4: Run verification script and typecheck**
Run: `npx tsx scripts/verify-app.ts` and `npm run lint`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/components/contact/ src/components/ui/Toast.tsx src/App.tsx scripts/verify-app.ts
git commit -m "feat(app): assemble portfolio application, contact section, and toast notifications"
```

---

### Task 10: Build Verification, Responsive Quality Audit, and Clean Up

**Files:**
- Modify: `CNAME`
- Verify: `npm run build` output in `dist/`
- Verify: Clean build output with zero errors or warnings

**Interfaces:**
- Consumes: Entire codebase
- Produces: Production bundle in `dist/` ready for GitHub Pages hosting

- [ ] **Step 1: Run full lint and typecheck**
Run: `npm run lint` (`tsc --noEmit`)
Expected: PASS with 0 errors

- [ ] **Step 2: Run production build**
Run: `npm run build`
Expected: Successful build into `dist/` with valid chunks, CSS, and asset hashes

- [ ] **Step 3: Verify dist assets and CNAME**
Check that `dist/index.html`, `dist/assets/`, `dist/CNAME`, and image assets are properly formed and accessible.

- [ ] **Step 4: Clean up temporary verification scripts**
Remove temporary scripts in `scripts/verify-*.ts` (or retain them in a test suite if desired) and verify git status is clean.

- [ ] **Step 5: Commit**
```bash
git add -A
git commit -m "chore: verify production build and finalize react portfolio revamp"
```

---

## Execution Handoff

Please review this implementation plan. Which execution approach would you prefer?

- **Subagent-driven** (Recommended) — A fresh subagent implements each task and a reviewer checks it before the next task begins, followed by a full-branch review at the end.
- **Native** — I implement each task sequentially in this session, with continuous typechecking and verification, followed by a comprehensive review.

For this plan, I recommend **Native** or **Subagent-driven**. Given that the tasks are tightly coupled around shared interfaces and typed data files, **Native** will be exceptionally fast and cohesive in this session, while maintaining strict verification at each step. Which approach should we use?
