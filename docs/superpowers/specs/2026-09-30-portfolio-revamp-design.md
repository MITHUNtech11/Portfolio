# Portfolio Revamp: High-Impact Recruiter Redesign & React Architecture Spec

- **Date**: 2026-09-30
- **Author**: Mithun Senthil S
- **Status**: Brainstorming Approved / Ready for Implementation Branching
- **Target Roles**: Dual Hybrid: Backend & Systems Engineer with Applied AI
- **Repository**: `C:\Users\mithu\OneDrive\Desktop\Coding Practice\Portfolio`
- **Domain**: `https://mithun.tech/`

---

## 1. Executive Summary & Goals

### 1.1 Objective
Revamp Mithun Senthil S's portfolio to maximize recruiter impact, visual polish, and engagement within the first 5 seconds of viewing. The new design shifts from a monolithic 4,600+ line `index.html` file to a modular, high-performance React 19 + TypeScript + Tailwind CSS application with smooth micro-interactions.

### 1.2 Core Positioning
* **Primary Identity**: Dual Hybrid — Backend & Systems Engineer with Applied AI.
* **Key Pillars**:
  1. High-throughput distributed backends (Java SE 11 Certified, Spring Boot, Python FastAPI, PostgreSQL).
  2. Applied AI & Data Science (ML pipelines, RAG, NetworkX, computer vision, data analysis, CGPA 8.46 from Saveetha University).
  3. Production-tested execution (Kauvery Hospital internship, real-world workflow architectures, hackathons).

### 1.3 Key User Constraints & Requirements
* **Branch Isolation**: All development must occur on an isolated feature branch (`feat/react-portfolio-revamp`). The `main` branch must remain pristine until the user inspects, tests, and explicitly approves the merge.
* **Hosting Compatibility**: Fully compatible with GitHub Pages hosting via Vite static build (`npm run build` -> `dist/`) mapped to custom domain `mithun.tech` via `CNAME`.

---

## 2. Visual Design System (Evolved Crimson & Warm Gold)

### 2.1 Color Palette
* **Canvas Background (`--bg-base`)**: Deep Obsidian Cocoa (`#0d0604`) with subtle ambient radial warmth.
* **Surface Cards (`--surface-card`)**: Layered Deep Velvet (`#170c08` base, `#23120d` on hover).
* **Borders**: 1px subtle metallic amber border (`rgba(212, 175, 55, 0.15)`) transitioning to warm crimson glow (`rgba(231, 76, 60, 0.45)`) on hover.
* **Warm Gold Accents (`--gold-accent`)**: Metallic Gold (`#d4af37` & `#f5cb78`) for certifications, status dots, and stat callouts.
* **Crimson Energy (`--crimson-accent`)**: Rich Crimson (`#c0392b` & `#e74c3c`) for primary CTAs and active indicators.
* **Typography Palette**:
  * Heading text: Crisp Warm Cream (`#fbf5ee`)
  * Body copy: Soft Sand (`#d8c8b8`)
  * Metadata & labels: Muted Amber Bronze (`#9e8779`)

### 2.2 Typography
* **Headings**: *Plus Jakarta Sans* (Bold, modern geometric executive presence)
* **Body Copy**: *Inter* (Ultra-readable, high-contrast, effortless scanning)
* **Technical Labels & Badges**: *JetBrains Mono* (Code-accurate, monospaced for stack tags and metrics)

---

## 3. Component Hierarchy & Architecture

```text
src/
├── assets/                       # Profile picture, workflow diagrams, certificate images
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky blur navbar, live radar indicator, resume CTA, mobile drawer
│   │   └── Footer.tsx            # Social profiles, navigation links, copyright
│   ├── hero/
│   │   ├── Hero.tsx              # Executive headline, dynamic typewriter tagline, primary CTAs
│   │   ├── StatCounter.tsx       # Animated recruiter counters (2 Internships, 3+ Projects, 3+ Certs, 8.46 CGPA)
│   │   └── PortraitCard.tsx      # Headshot with 3D tilt, gradient rim-light, and floating badges
│   ├── about/
│   │   └── About.tsx             # Professional narrative, dual hybrid backend + AI callouts
│   ├── skills/
│   │   └── SkillsMatrix.tsx      # Categorized filterable tech stack (Backend, AI/ML, Cloud/DB, Core)
│   ├── projects/
│   │   ├── Projects.tsx          # System showcase grid with metric highlights & tags
│   │   ├── ProjectCard.tsx       # Interactive 3D tilt cards with demo links & architecture triggers
│   │   └── ArchitectureModal.tsx # High-res zoomable modal lightbox for workflow diagrams
│   ├── experience/
│   │   └── ExperienceTimeline.tsx# Milestone timeline (Kauvery Hospital, contributions, tech tags)
│   ├── credentials/
│   │   ├── Credentials.tsx       # Oracle Java SE 11, Oracle SQL/DBMS, Agile, NPTEL, Hackathon
│   │   └── CertificateModal.tsx  # Verified credential inspector lightbox
│   ├── contact/
│   │   └── Contact.tsx           # One-click email copy, social links, contact message form
│   └── ui/                       # Reusable UI primitives (Button, Badge, Modal, TiltCard)
├── data/                         # Centralized typed data files (clean editing without touching JSX)
│   ├── projects.ts               # Project details, descriptions, tags, diagram paths
│   ├── skills.ts                 # Categorized skills list with proficiencies
│   ├── experience.ts             # Professional roles, companies, dates, bullet points
│   └── certificates.ts          # Credential names, issuing organizations, verification assets
├── types/
│   └── index.ts                  # TypeScript data models and interfaces
├── App.tsx                       # Main layout orchestrator & ambient canvas
└── main.tsx                      # Vite React 19 entry point
```

---

## 4. Interactive Features & Animation Specifications

1. **60fps Fluid Micro-Interactions**:
   * Hardware-accelerated transitions via `motion` (Framer Motion).
   * Subtle 3D tilt and cursor-following radial glow on project cards and profile frame.
   * Magnetic pull on primary action buttons ("Selected Work", "Download Resume").
2. **Interactive Workflow Diagram Lightbox**:
   * Instant modal viewer for enterprise architecture diagrams (`workflows/AI-RECRUITER.png`, `workflows/AI-Resume Parser.png`, `workflows/Digital Product Data Vault.png`, `workflows/Resume Analyser.png`).
   * Pan, zoom, and fullscreen capabilities for technical recruiters and hiring managers to inspect system architecture.
3. **Verified Credential Inspector**:
   * Lightbox preview for official certificates in `certificate/` (Oracle Java SE 11, SQL DBMS, Kauvery Hospital, etc.).
4. **Recruiter Fast-Scan UX**:
   * Top reading progress indicator.
   * Prominent resume download button pinned in both navigation and hero.
   * Direct mailto / copy email button with visual confirmation toast.

---

## 5. Implementation Roadmap for Next Session

When resuming:
1. **Branch Checkout**:
   ```bash
   git checkout -b feat/react-portfolio-revamp
   ```
2. **Setup Dependencies & Styling**:
   * Verify React 19, Tailwind CSS v4, Lucide React, and Motion configuration.
   * Import Google Fonts (Plus Jakarta Sans, Inter, JetBrains Mono).
3. **Data Layer Population**:
   * Port all existing content from `index.html` into `src/data/` (`projects.ts`, `skills.ts`, `experience.ts`, `certificates.ts`).
4. **Component Implementation**:
   * Build `Navbar`, `Hero`, `StatCounter`, `About`, `SkillsMatrix`, `Projects`, `ArchitectureModal`, `ExperienceTimeline`, `Credentials`, `CertificateModal`, and `Contact`.
5. **Testing & Build Verification**:
   * Run local dev server (`npm run dev`) and test responsive layouts.
   * Run production build (`npm run build`) to ensure zero errors and valid `dist/` output.
6. **User Review**:
   * User tests and previews the `feat/react-portfolio-revamp` branch.
   * Upon approval, merge to `main`.
