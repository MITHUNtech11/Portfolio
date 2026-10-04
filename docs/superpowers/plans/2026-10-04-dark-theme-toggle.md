# Dark Theme System & Toggle Micro-Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-contrast Dark Theme system with an interactive Sun/Moon micro-animated toggle button, system preference detection, localStorage persistence, anti-FOUC initialization, dynamic Three.js particle canvas color adaptation, and dark styling across all sections.

**Architecture:** A hybrid architecture combining CSS custom property variables and Tailwind v4 `dark:` variants. A lightweight TypeScript `useTheme` hook manages `'light' | 'dark'` state with custom events for non-React canvas consumers, initialized via an inline anti-FOUC script in `index.html`. A tactile Framer Motion `ThemeToggle` is integrated into the sticky desktop navbar and mobile drawer.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Three.js (`three`), Lucide React icons, Vite.

**Spec:** `docs/superpowers/specs/2026-10-04-dark-theme-toggle-design.md`

## Global Constraints

- **Theme Palette**: Deep Midnight Navy (`#050B20` canvas, `#0B132B` cards, `#111C40` hover), Warm Cream (`#F5EFE1` headings), Crisp Slate (`#C5CEE0` body), Amber (`#F5A663`), Vibrant Crimson (`#C72C48`), Sage (`#A2B784`).
- **No FOUC**: Anti-FOUC inline script in `index.html` must set `.dark` class before React mounts.
- **Persistence**: User theme selection must persist in `localStorage.getItem('theme')`.
- **System Preference**: First-time visitors without stored preference must match `prefers-color-scheme: dark`.
- **Three.js Integration**: The particle canvas must dynamically adjust particle colors upon theme switch without WebGL context destruction.
- **Strict TypeScript & Build**: Zero TypeScript errors on `npm run lint` (`tsc --noEmit`) and successful production build with `npm run build`.

## Review Focus

1. **Anti-FOUC on Dark Reload**: Reloading the page when dark mode is enabled must not flash white/cream.
2. **Synchronized Desktop & Mobile Toggles**: Toggling the theme from the desktop navbar or mobile drawer must keep all toggle instances in sync.
3. **Three.js Canvas Memory & Color Transition**: Switching themes repeatedly must update particle colors without leaking animation frames or crashing the WebGL renderer.
4. **Modal Lightbox Contrast**: Architecture diagram modal and certificate modal must maintain high contrast, readable close buttons, and clear text in dark mode.
5. **Form Field & Button States**: Contact form inputs, submit buttons, and filter tabs must have clear focus rings and legible text in both themes.

---

### Task 1: CSS Theme Tokens & Anti-FOUC Script

**Files:**
- Modify: `index.html:1-30`
- Modify: `src/index.css:1-79`

**Interfaces:**
- Consumes: None
- Produces: CSS custom properties (`--bg-base`, `--bg-surface`, `--text-primary`, `--border-subtle`, etc.) for `:root` and `.dark`, plus root class `.dark` anti-FOUC script.

- [ ] **Step 1: Add inline anti-FOUC theme script to `index.html`**
Add an immediate script in `<head>` before stylesheets that reads `localStorage.getItem('theme')` or `window.matchMedia('(prefers-color-scheme: dark)')`, toggling `document.documentElement.classList.add('dark')` and setting `document.documentElement.style.colorScheme`.

- [ ] **Step 2: Define dark theme variables in `src/index.css`**
Add `@custom-variant dark (&:where(.dark, .dark *));` (or Tailwind v4 variant) and `.dark` CSS custom properties:
`--bg-base: #050B20; --bg-surface: #0B132B; --bg-card: #0B132B; --bg-card-hover: #111C40; --text-primary: #F5EFE1; --text-secondary: #C5CEE0; --text-muted: #8C9BB5; --border-subtle: rgba(229, 211, 175, 0.16); --border-hover: rgba(219, 149, 88, 0.4); --accent-burgundy: #C72C48; --accent-terracotta: #F5A663;`

- [ ] **Step 3: Update scrollbar styles for dark mode in `src/index.css`**
Add dark scrollbar styling so the scrollbar track and thumb match the deep midnight palette.

- [ ] **Step 4: Verify CSS build**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add index.html src/index.css
git commit -m "feat(theme): configure css dark theme tokens and anti-fouc script"
```

---

### Task 2: Theme State Management & Custom Hook

**Files:**
- Create: `src/lib/theme.ts`

**Interfaces:**
- Consumes: `localStorage`, `window.matchMedia`
- Produces: `useTheme() -> { theme: 'light' | 'dark', toggleTheme: () => void, setTheme: (theme: 'light' | 'dark') => void, isDark: boolean }` and dispatches `portfolio-theme-change` CustomEvent.

- [ ] **Step 1: Implement `src/lib/theme.ts`**
Create `useTheme` hook with:
- `theme` state (`'light' | 'dark'`), initialized from `document.documentElement.classList.contains('dark') ? 'dark' : 'light'`.
- `toggleTheme`: flips state, updates `document.documentElement.classList.toggle('dark')`, sets `localStorage.setItem('theme', nextTheme)`, and dispatches `window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme: nextTheme } }))`.
- `useEffect` to listen to system `prefers-color-scheme` changes when no preference is saved in `localStorage`.

- [ ] **Step 2: Verify type definitions**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/lib/theme.ts
git commit -m "feat(theme): add useTheme hook and theme synchronization logic"
```

---

### Task 3: Interactive `ThemeToggle` Component

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Modify: `src/components/ui/index.ts`

**Interfaces:**
- Consumes: `useTheme` from `../../lib/theme`
- Produces: `<ThemeToggle className?: string, variant?: 'icon' | 'labeled' />`

- [ ] **Step 1: Implement `src/components/ui/ThemeToggle.tsx`**
Create tactile button using `motion.button` with:
- Rotating and scaling Sun / Moon icons via `AnimatePresence` and `motion.div`.
- Light mode styling: `border-[#E5D3AF] bg-white/80 text-[#010736] hover:bg-[#E5D3AF]/40`.
- Dark mode styling: `dark:border-[#E5D3AF]/20 dark:bg-[#0B132B]/80 dark:text-[#F5EFE1] hover:dark:bg-[#111C40]`.
- Proper `aria-label`, tooltip / title, and focus ring.
- Support both `'icon'` mode (compact navbar circle/pill) and `'labeled'` mode (for mobile drawer).

- [ ] **Step 2: Export `ThemeToggle` in `src/components/ui/index.ts`**
Add `export * from './ThemeToggle';`

- [ ] **Step 3: Verify build**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit**
```bash
git add src/components/ui/ThemeToggle.tsx src/components/ui/index.ts
git commit -m "feat(ui): create animated ThemeToggle component with spring micro-interactions"
```

---

### Task 4: Navbar & Mobile Drawer Integration

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` from `../ui`
- Produces: Integrated theme toggle in desktop header and mobile menu drawer with dark mode navbar background blur.

- [ ] **Step 1: Add `ThemeToggle` to Desktop Navbar**
Place `<ThemeToggle variant="icon" />` adjacent to the Resume CTA button in `Navbar.tsx`.

- [ ] **Step 2: Add `ThemeToggle` to Mobile Navigation Drawer**
Place `<ThemeToggle variant="labeled" />` inside the mobile drawer below the navigation links.

- [ ] **Step 3: Add dark classes to Navbar and Mobile Drawer**
Update header sticky blur: `dark:bg-[#050B20]/90 dark:border-[#E5D3AF]/15 dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]`.
Update mobile drawer: `dark:bg-[#050B20] dark:border-[#E5D3AF]/15`.
Update nav links: `dark:text-[#F5EFE1]/80 dark:hover:text-[#F5EFE1] dark:hover:bg-[#0B132B]`.

- [ ] **Step 4: Verify build**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 5: Commit**
```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(layout): integrate ThemeToggle in desktop navbar and mobile drawer"
```

---

### Task 5: Dynamic Three.js Particle Canvas Adaptation

**Files:**
- Modify: `src/lib/three-particles.ts`

**Interfaces:**
- Consumes: `window.addEventListener('portfolio-theme-change')`
- Produces: Real-time particle color shifting between light palette (`#DB9558` terracotta, `#010736` navy) and dark palette (`#F5A663` glowing amber, `#64B5F6` starlight cyan, `#F5EFE1` warm cream).

- [ ] **Step 1: Update `src/lib/three-particles.ts` to listen for theme changes**
Add event listener for `portfolio-theme-change` (and check initial `document.documentElement.classList.contains('dark')`).
When theme changes, smoothly update the particle color buffer attributes without recreating the entire scene or canvas.

- [ ] **Step 2: Verify build**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 3: Commit**
```bash
git add src/lib/three-particles.ts
git commit -m "feat(graphics): dynamically adapt Three.js particle colors on theme switch"
```

---

### Task 6: Comprehensive Dark Mode Theming Across All Sections & Modals

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/layout/ReadingProgress.tsx`
- Modify: `src/components/hero/Hero.tsx`
- Modify: `src/components/hero/PortraitCard.tsx`
- Modify: `src/components/hero/StatCounter.tsx`
- Modify: `src/components/about/About.tsx`
- Modify: `src/components/skills/SkillsMatrix.tsx`
- Modify: `src/components/projects/Projects.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/components/projects/ArchitectureModal.tsx`
- Modify: `src/components/experience/ExperienceTimeline.tsx`
- Modify: `src/components/credentials/Credentials.tsx`
- Modify: `src/components/credentials/CertificateModal.tsx`
- Modify: `src/components/contact/Contact.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/ui/Badge.tsx`
- Modify: `src/components/ui/Modal.tsx`

**Interfaces:**
- Consumes: CSS tokens and Tailwind `dark:` variants
- Produces: Polished high-contrast dark theme surfaces across all cards, modals, timeline nodes, and buttons.

- [ ] **Step 1: Update App container & ReadingProgress**
In `App.tsx`: `dark:bg-[#050B20] dark:text-[#F5EFE1]`.
In `ReadingProgress.tsx`: `dark:bg-[#C72C48]`.

- [ ] **Step 2: Update Hero section & cards**
Hero background: `dark:bg-[#050B20] dark:text-[#F5EFE1]`.
Terminal typewriter bar: `dark:bg-[#0B132B]/90 dark:border-[#E5D3AF]/15 dark:text-[#C5CEE0]`.
PortraitCard & StatCounter: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:text-[#F5EFE1]`.

- [ ] **Step 3: Update About & SkillsMatrix**
About cards and education timeline: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:text-[#F5EFE1]`.
SkillsMatrix filter pill container: `dark:bg-[#0B132B]/90 dark:border-[#E5D3AF]/15`.
Category cards and skill chips: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:hover:border-[#F5A663]/40`.

- [ ] **Step 4: Update Projects, Experience & Credentials**
Project cards: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:text-[#F5EFE1]`.
Experience cards and timeline spine: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15`.
Credentials cards: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15`.

- [ ] **Step 5: Update Modals (ArchitectureModal, CertificateModal) & UI Primitives**
ArchitectureModal & CertificateModal: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/20 dark:text-[#F5EFE1]`.
UI Primitives (Button, Badge, Modal shell): high contrast dark states.

- [ ] **Step 6: Update Contact & Footer**
Contact inputs: `dark:bg-[#050B20] dark:border-[#E5D3AF]/20 dark:text-[#F5EFE1] dark:focus:border-[#F5A663]`.
Footer: `dark:bg-[#020510] dark:border-t dark:border-[#E5D3AF]/10`.

- [ ] **Step 7: Verify build**
Run: `npm run lint`
Expected: PASS with 0 errors.

- [ ] **Step 8: Commit**
```bash
git add src/App.tsx src/components/
git commit -m "feat(theme): apply dark theme styling across all sections and modals"
```

---

### Task 7: Full Production Build & Behavioral Verification

**Files:** None (verification task)

- [ ] **Step 1: Run TypeScript typecheck**
Run: `npm run lint`
Expected: Exit code 0, 0 errors.

- [ ] **Step 2: Run production Vite build**
Run: `npm run build`
Expected: Vite builds successfully into `dist/`.

- [ ] **Step 3: Verify preview server**
Launch `npm run preview` briefly or test dist assets to confirm static generation and bundle integrity.
