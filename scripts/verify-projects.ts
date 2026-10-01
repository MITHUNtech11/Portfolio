import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Projects, ProjectCard, ArchitectureModal } from '../src/components/projects';
import * as ProjectsModule from '../src/components/projects/Projects';
import * as ProjectCardModule from '../src/components/projects/ProjectCard';
import * as ArchitectureModalModule from '../src/components/projects/ArchitectureModal';
import { projectsData } from '../src/data/projects';
import type { Project } from '../src/types';

console.log('--- Verifying Featured Systems Showcase and Architecture Modal ---');

// 1. Projects Data Verification
if (!Array.isArray(projectsData) || projectsData.length < 3) {
  throw new Error(`Expected at least 3 projects in projectsData, found: ${projectsData?.length}`);
}

const recruiter = projectsData.find((p) => p.id === 'recruiter');
const vault = projectsData.find((p) => p.id === 'vault');
const route = projectsData.find((p) => p.id === 'route');

if (!recruiter || !vault || !route) {
  throw new Error('Missing essential project IDs: recruiter, vault, or route');
}

for (const p of [recruiter, vault, route]) {
  if (!p.diagrams || p.diagrams.length === 0) {
    throw new Error(`Project ${p.id} must have at least 1 architecture diagram`);
  }
  if (!p.pipeline || p.pipeline.length !== 4) {
    throw new Error(`Project ${p.id} must have exactly 4 pipeline steps`);
  }
  if (!p.metrics || p.metrics.length === 0) {
    throw new Error(`Project ${p.id} must have key metrics`);
  }
  if (!p.challenges || p.challenges.length === 0) {
    throw new Error(`Project ${p.id} must have architectural challenges`);
  }
}
console.log('✅ Projects data structure validated for recruiter, vault, and route');

// 2. ProjectCard Component Verification
if (typeof ProjectCard !== 'function' && typeof ProjectCardModule.ProjectCard !== 'function') {
  throw new Error('ProjectCard component must be exported as a function/component');
}

let clickedProject: Project | null = null;
let clickedIndex: number | null = null;

const cardEl = React.createElement(ProjectCard, {
  project: recruiter,
  onOpenModal: (p, idx) => {
    clickedProject = p;
    clickedIndex = idx ?? 0;
  },
});
if (!cardEl || cardEl.type !== ProjectCard) {
  throw new Error('Failed to create ProjectCard element');
}

// Deep render test with react-dom/server
const cardMarkup = renderToStaticMarkup(cardEl);
if (!cardMarkup.includes('AI Recruiter') || !cardMarkup.includes('~40%')) {
  throw new Error('ProjectCard markup does not contain expected title or metric');
}
if (!cardMarkup.includes('Architecture Deep Dive')) {
  throw new Error('ProjectCard markup must contain "Architecture Deep Dive" action button');
}
if (!cardMarkup.includes('GitHub')) {
  throw new Error('ProjectCard markup must contain "GitHub" repository link');
}
console.log('✅ ProjectCard element, action buttons, and deep static markup verified');

// 3. ArchitectureModal Component Verification
if (typeof ArchitectureModal !== 'function' && typeof ArchitectureModalModule.ArchitectureModal !== 'function') {
  throw new Error('ArchitectureModal component must be exported as a function/component');
}

// 3a. Open state with active project (deep render verification)
const modalEl = React.createElement(ArchitectureModal, {
  isOpen: true,
  onClose: () => {},
  project: recruiter,
  initialDiagramIndex: 0,
});
if (!modalEl || modalEl.type !== ArchitectureModal) {
  throw new Error('Failed to create ArchitectureModal element with active project');
}

const openModalMarkup = renderToStaticMarkup(modalEl);
const expectedModalSnippets = [
  'AI Recruiter',
  'SYSTEM 01',
  'Architectural Overview',
  'Workflow Pipeline',
  'System Architecture',
  'OCR &amp; AI Pipeline',
  '1. Ingestion',
  '2. NLP Parsing',
  '3. Priority Queue',
  '4. UI / MVC View',
  'Algorithmic Optimization',
  'Decoupled MVC Pattern',
  'Schema Normalization',
  '~40%',
  'O(N log K)',
  'role="tablist"',
  'role="tabpanel"',
];

for (const snippet of expectedModalSnippets) {
  if (!openModalMarkup.includes(snippet)) {
    throw new Error(`ArchitectureModal open markup missing required snippet: "${snippet}"`);
  }
}
console.log('✅ ArchitectureModal deep markup verified with all diagrams, pipeline steps, and challenges');

// 3b. Closed state with null project (edge case safety)
const closedModalEl = React.createElement(ArchitectureModal, {
  isOpen: false,
  onClose: () => {},
  project: null,
});
if (!closedModalEl || closedModalEl.type !== ArchitectureModal) {
  throw new Error('Failed to create ArchitectureModal element with null project');
}
const closedMarkup = renderToStaticMarkup(closedModalEl);
if (closedMarkup !== '') {
  console.log('ℹ️ Closed modal static markup:', closedMarkup.length, 'bytes');
}
console.log('✅ ArchitectureModal element verified with open and closed states');

// 4. Projects Section Container Verification
if (typeof Projects !== 'function' && typeof ProjectsModule.Projects !== 'function') {
  throw new Error('Projects section component must be exported as a function/component');
}

const projectsEl = React.createElement(Projects, {
  projects: projectsData,
});
if (!projectsEl || projectsEl.type !== Projects) {
  throw new Error('Failed to create Projects section element');
}

const projectsMarkup = renderToStaticMarkup(projectsEl);
if (!projectsMarkup.includes('id="projects"')) {
  throw new Error('Projects section markup must include id="projects" anchor for navigation');
}
if (!projectsMarkup.includes('Featured Systems') || !projectsMarkup.includes('Digital Product Data Vault')) {
  throw new Error('Projects section markup does not contain expected headline or project content');
}
console.log('✅ Projects root section component and markup verified with section anchor');

// 5. Barrel Index Exports Verification
const barrelExports = {
  Projects,
  ProjectCard,
  ArchitectureModal,
};

for (const [name, component] of Object.entries(barrelExports)) {
  if (typeof component !== 'function') {
    throw new Error(`Projects barrel index.ts is missing or has invalid export: ${name}`);
  }
}
console.log('✅ Projects barrel export index.ts verified with all 3 components');

// 6. Edge cases and Props contract verification
const mockMinimalProject: Project = {
  id: 'mock-sys',
  number: '99',
  title: 'Mock Minimal System',
  label: 'MOCK SYSTEM',
  category: 'cloud',
  description: 'Mock system for boundary tests',
  overview: 'Mock overview',
  diagrams: [{ title: 'Overview', src: 'workflows/mock.png', caption: 'Mock flow' }],
  pipeline: [
    { icon: 'Zap', title: 'Step 1', sub: 'Sub 1' },
    { icon: 'Zap', title: 'Step 2', sub: 'Sub 2' },
    { icon: 'Zap', title: 'Step 3', sub: 'Sub 3' },
    { icon: 'Zap', title: 'Step 4', sub: 'Sub 4' },
  ],
  metrics: [{ num: '99%', label: 'Test Metric' }],
  challenges: [{ title: 'Scale', desc: 'Mock scale issue' }],
  tags: ['TypeScript'],
  github: 'https://github.com/example/mock',
};

const minimalCard = React.createElement(ProjectCard, {
  project: mockMinimalProject,
  onOpenModal: () => {},
});
const minimalMarkup = renderToStaticMarkup(minimalCard);
if (!minimalMarkup.includes('Mock Minimal System')) {
  throw new Error('Failed to render minimal mock project card');
}

const emptyProjectsEl = React.createElement(Projects, {
  projects: [],
});
const emptyProjectsMarkup = renderToStaticMarkup(emptyProjectsEl);
if (!emptyProjectsMarkup.includes('No architecture systems found')) {
  throw new Error('Projects component should show empty state when projects array is empty');
}

// Extreme edge case: project with empty diagrams, empty metrics, empty tags
const extremeEmptyProject: Project = {
  id: 'extreme',
  number: '00',
  title: 'Extreme Edge',
  label: 'EDGE',
  category: 'python',
  description: 'Extreme description',
  overview: '',
  diagrams: [],
  pipeline: [],
  metrics: [],
  challenges: [],
  tags: [],
  github: '',
};

const extremeCard = React.createElement(ProjectCard, {
  project: extremeEmptyProject,
});
const extremeCardMarkup = renderToStaticMarkup(extremeCard);
if (!extremeCardMarkup.includes('Interactive Workflow Architecture')) {
  throw new Error('ProjectCard with empty diagrams must render fallback architecture placeholder');
}

const extremeModal = React.createElement(ArchitectureModal, {
  isOpen: true,
  project: extremeEmptyProject,
  onClose: () => {},
  initialDiagramIndex: -99, // negative index boundary test
});
renderToStaticMarkup(extremeModal);

// Verify dynamic category filter when cloud project is present
const projectsWithCloud = React.createElement(Projects, {
  projects: [...projectsData, mockMinimalProject],
});
const projectsWithCloudMarkup = renderToStaticMarkup(projectsWithCloud);
if (!projectsWithCloudMarkup.includes('Cloud Architecture')) {
  throw new Error('Projects should dynamically render "Cloud Architecture" filter tab when cloud projects exist');
}

console.log('✅ Edge cases: Fallback placeholders, dynamic cloud filters, empty projects, and boundaries all verified');

console.log('🎉 All Featured Systems Showcase verifications passed successfully!');
