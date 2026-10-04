# Dark Theme System & Toggle Micro-Interactions Design Spec

- **Date**: 2026-10-04
- **Author**: Mithun Senthil S
- **Status**: Ready for User Review
- **Repository**: `C:\Users\mithu\OneDrive\Desktop\Coding Practice\Portfolio`
- **Target URL**: `https://mithun.tech/`

---

## 1. Executive Summary & Goals

### 1.1 Objective
Introduce a seamless, high-contrast Dark Theme system with an interactive animated toggle button across the entire portfolio. The dark theme inverts the current warm editorial palette into an immersive **Deep Midnight Navy & Amber/Burgundy** aesthetic, preserving brand personality while providing optimal readability in low-light environments.

### 1.2 Core Requirements
1. **Single-Click Animated Sun/Moon Toggle**: Positioned in the sticky Navbar (desktop, next to the Resume CTA) and inside the mobile navigation drawer. Uses Framer Motion spring physics with rotating/scaling iconography.
2. **Persistence & System Detection**: Automatically detects system `prefers-color-scheme: dark` on first visit, stores user preference in `localStorage`, and prevents Flash of Unstyled Content (FOUC) via an inline script in `index.html`.
3. **Dynamic 3D Canvas Adaptation**: The Three.js WebGL particle field dynamically shifts particle colors from terracotta/navy in light mode to luminous glowing amber/starlight particles in dark mode.
4. **Comprehensive Section Styling**: High-contrast dark surfaces for all components: Hero, About, Skills Matrix, Projects, Architecture Diagram Modal, Experience Timeline, Credentials, Certificate Modal, Contact Form, Toast, and Footer.

---

## 2. Visual Design System: Deep Midnight Navy & Amber

### 2.1 Theme Color Tokens

| Token | Light Theme Value | Dark Theme Value (Midnight Navy) | Usage |
| :--- | :--- | :--- | :--- |
| `--bg-base` | `#F5EFE1` (Warm Cream) | `#050B20` (Deep Midnight Obsidian) | Main body canvas |
| `--bg-surface` | `#FFFFFF` (Pure White) | `#0B132B` (Layered Navy Slate) | Cards, Modals, Menus |
| `--bg-surface-elevated` | `#F5EFE1` | `#111C40` (Elevated Card Hover) | Card hover states, pill containers |
| `--text-primary` | `#010736` (Midnight Navy) | `#F5EFE1` (Crisp Warm Cream) | Headings, primary titles |
| `--text-secondary` | `#2C3352` (Deep Slate) | `#C5CEE0` (Soft Crisp Slate) | Subtitles, body copy, descriptions |
| `--text-muted` | `#6B7280` (Muted Gray) | `#8C9BB5` (Muted Slate Bronze) | Timestamps, tags, meta text |
| `--border-subtle` | `rgba(229, 211, 175, 0.7)` | `rgba(229, 211, 175, 0.16)` | Card borders, dividers, inputs |
| `--border-hover` | `#DB9558` | `rgba(219, 149, 88, 0.4)` | Hover highlight borders |
| `--accent-burgundy` | `#800020` | `#C72C48` (Vibrant Crimson) | Active indicators, CTAs, tags |
| `--accent-terracotta`| `#DB9558` | `#F5A663` (Luminous Amber) | Code prompt dots, secondary badges |
| `--accent-sage` | `#8B9A6E` | `#A2B784` (Soft Sage Green) | Terminal prompts, status indicators |

---

## 3. Theme State Architecture

### 3.1 Anti-FOUC Inline Script (`index.html`)
To prevent visual flashing when a user reloads in dark mode, an inline script executes in `<head>` before CSS and React render:
```html
<script>
  (function() {
    try {
      const stored = localStorage.getItem('theme');
      const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();
</script>
```

### 3.2 Theme Hook & Service (`src/lib/theme.ts`)
- Manages `'light' | 'dark'` theme state in React.
- Provides `useTheme()` returning `{ theme, toggleTheme, setTheme }`.
- Synchronizes with `document.documentElement.classList.toggle('dark', isDark)` and `localStorage.setItem('theme', theme)`.
- Dispatches a custom window event `portfolio-theme-change` with detail `{ theme }` so that non-React scripts (e.g., Three.js particle canvas) can react instantly.
- Listens to system theme changes via `window.matchMedia('(prefers-color-scheme: dark)')` when no manual override is saved.

---

## 4. UI Components & Micro-Interactions

### 4.1 `ThemeToggle` Component (`src/components/ui/ThemeToggle.tsx`)
- **Visual Design**: Sleek rounded-xl button with 1px border.
  - Light mode: `border-[#E5D3AF] bg-white/80 text-[#010736] hover:bg-[#E5D3AF]/40`.
  - Dark mode: `border-[#E5D3AF]/20 bg-[#0B132B]/80 text-[#F5EFE1] hover:bg-[#111C40]`.
- **Framer Motion Micro-Animation**:
  - Displays `Moon` icon when currently in light mode (inviting dark mode).
  - Displays `Sun` icon when currently in dark mode (inviting light mode).
  - Smooth 90-degree spring rotation and scale animation on transition (`initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }}`).
  - Tactile press effect with `whileTap={{ scale: 0.92 }}`.
- **Accessibility**:
  - `aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}`.
  - Keyboard operable with `Space` and `Enter`, and visible focus rings.

### 4.2 Navbar & Mobile Integration
- **Desktop Navbar (`src/components/layout/Navbar.tsx`)**:
  - Sits directly to the left of the `Resume` download button.
  - Sticky header blur changes from `bg-[#F5EFE1]/90` to `dark:bg-[#050B20]/90 dark:border-[#E5D3AF]/15`.
- **Mobile Drawer**:
  - Renders a full-width theme switcher button in the drawer alongside the `Download Resume` CTA.

---

## 5. Detailed Component Theming Specifications

1. **Root & Body (`src/App.tsx` & `src/index.css`)**:
   - `dark:bg-[#050B20] dark:text-[#F5EFE1]`.
   - Global selection styling: `dark:selection:bg-[#C72C48] dark:selection:text-white`.
   - Reading progress bar: `dark:bg-[#C72C48]`.

2. **Hero Section (`src/components/hero/`)**:
   - Background: `dark:bg-[#050B20]`.
   - Heading name letters: `dark:text-[#F5EFE1]`.
   - Terminal bar: `dark:bg-[#0B132B]/90 dark:border-[#E5D3AF]/15 dark:text-[#C5CEE0]`.
   - Portrait card: Dark velvet frame with glowing amber rim-light.
   - StatCounter: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 dark:text-[#F5EFE1]`.

3. **Three.js Particle Canvas (`src/lib/three-particles.ts`)**:
   - Dynamically subscribes to `portfolio-theme-change`.
   - In Dark mode: shifts particle color array to luminous amber (`#F5A663`), warm cream (`#F5EFE1`), and starlight cyan (`#64B5F6`) with increased emissive brightness.

4. **Skills Matrix (`src/components/skills/SkillsMatrix.tsx`)**:
   - Filter bar: `dark:bg-[#0B132B]/90 dark:border-[#E5D3AF]/15`.
   - Category cards: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 hover:dark:border-[#F5A663]/40`.
   - Skill chips: `dark:bg-[#050B20]/60 dark:border-[#E5D3AF]/10 dark:text-[#F5EFE1]`.

5. **Projects (`src/components/projects/`)**:
   - Cards: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15 hover:dark:border-[#F5A663]/40`.
   - Architecture modal: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/20` with dark header and high-contrast diagram viewer container.

6. **Experience & Credentials (`src/components/experience/`, `src/components/credentials/`)**:
   - Timeline cards and certificate cards: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/15`.
   - Verification badges and links: Crisp amber and crimson accents.
   - Certificate modal: `dark:bg-[#0B132B] dark:border-[#E5D3AF]/20`.

7. **Contact & Footer (`src/components/contact/`, `src/components/layout/Footer.tsx`)**:
   - Contact form inputs: `dark:bg-[#050B20] dark:border-[#E5D3AF]/20 dark:text-[#F5EFE1] dark:focus:border-[#F5A663]`.
   - Footer: `dark:bg-[#020510] dark:border-t dark:border-[#E5D3AF]/10`.

8. **UI Primitives (`src/components/ui/`)**:
   - Button (`secondary`, `outline`, `ghost`): updated with `dark:` variants for high contrast.
   - Badge: dark mode background and border adaptations.
   - Modal: dark backdrop and card shell.
   - Toast: crisp dark styling.

---

## 6. Verification & Testing Strategy

1. **Unit & Build Validation**:
   - Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
   - Run `npm run build` to confirm Vite production bundle builds successfully without issues.
2. **Behavioral Testing**:
   - Verify initial page load reflects system preference.
   - Toggle theme via desktop Navbar button and verify instant switch with smooth rotating icon animation.
   - Toggle theme via mobile menu drawer and confirm synchronized state.
   - Refresh page and verify `localStorage` persistence with zero FOUC flash.
   - Verify 3D particle canvas updates colors seamlessly when toggled.
   - Inspect all modals (Architecture modal, Certificate modal), ensuring diagram zooming and certificate images render with crisp contrast.
