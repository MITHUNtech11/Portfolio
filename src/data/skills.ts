import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'python',
    title: 'Python & AI Engineering (Primary)',
    badge: 'Core Expertise',
    skills: [
      {
        name: 'Python 3.x',
        sub: 'FastAPI • Async IO • Scripting',
        icon: 'Terminal',
        level: 95,
        highlight: true,
      },
      {
        name: 'NLP & AI Pipelines',
        sub: 'Tokenization • Skill Extraction',
        icon: 'Brain',
        level: 90,
        highlight: true,
      },
      {
        name: 'Graph DSA & Dijkstra',
        sub: 'NetworkX • OSMnx Graphs',
        icon: 'Route',
        level: 90,
        highlight: true,
      },
      {
        name: 'Data Structures',
        sub: 'Hashmaps • Priority Queues',
        icon: 'Boxes',
        level: 92,
      },
      {
        name: 'Streamlit',
        sub: 'Interactive AI & Data Apps',
        icon: 'Sliders',
        level: 88,
      },
      {
        name: 'Data Processing',
        sub: 'Pandas • Ingestion Pipelines',
        icon: 'Database',
        level: 85,
      },
    ],
  },
  {
    id: 'java',
    title: 'Java & Enterprise Technologies (Secondary)',
    badge: 'Certified Professional',
    skills: [
      {
        name: 'Java SE 11',
        sub: 'Oracle Certified • OOP & Streams',
        icon: 'Coffee',
        level: 92,
        highlight: true,
      },
      {
        name: 'Spring Boot',
        sub: 'Service Layers • MVC REST APIs',
        icon: 'Layers',
        level: 85,
      },
      {
        name: 'JDBC',
        sub: 'Connection Pooling • Parameterized Queries',
        icon: 'Cpu',
        level: 88,
      },
      {
        name: 'RESTful APIs',
        sub: 'Web Services • JSON Design',
        icon: 'Globe',
        level: 92,
      },
      {
        name: 'JUnit & Mockito',
        sub: 'Unit Testing • Test Isolation',
        icon: 'ShieldCheck',
        level: 85,
      },
      {
        name: 'SLF4J / Logging',
        sub: 'Audit Trails & Traceability',
        icon: 'FileText',
        level: 85,
      },
    ],
  },
  {
    id: 'database',
    title: 'Databases & Cloud Infrastructure',
    badge: 'Certified SQL',
    skills: [
      {
        name: 'SQL',
        sub: 'Oracle Certified • Joins & DDL',
        icon: 'Database',
        level: 92,
        highlight: true,
      },
      {
        name: 'PostgreSQL',
        sub: 'Relational Schemas • Constraints',
        icon: 'Server',
        level: 88,
      },
      {
        name: 'MySQL',
        sub: 'Normalization • CRUD Systems',
        icon: 'HardDrive',
        level: 90,
      },
      {
        name: 'Azure Blob',
        sub: 'Cloud Object Storage',
        icon: 'Cloud',
        level: 82,
      },
      {
        name: 'Cosmos DB',
        sub: 'NoSQL Cloud Database',
        icon: 'Layers',
        level: 80,
      },
      {
        name: 'Supabase',
        sub: 'PostgreSQL Cloud Backend',
        icon: 'Zap',
        level: 80,
      },
    ],
  },
  {
    id: 'web',
    title: 'Web & Frontend Technologies',
    badge: 'Responsive UI',
    skills: [
      {
        name: 'JavaScript',
        sub: 'ES6+ • DOM & Async APIs',
        icon: 'Code2',
        level: 86,
      },
      {
        name: 'HTML5',
        sub: 'Semantic Web Markup',
        icon: 'Layout',
        level: 90,
      },
      {
        name: 'CSS3',
        sub: 'Responsive • Animations',
        icon: 'Palette',
        level: 88,
      },
      {
        name: 'Bootstrap',
        sub: 'Responsive Component Systems',
        icon: 'Box',
        level: 85,
      },
      {
        name: 'JSON',
        sub: 'API Data Serialization',
        icon: 'FileCode',
        level: 92,
      },
      {
        name: 'UI Engineering',
        sub: 'Glassmorphism • UX Polish',
        icon: 'Sparkles',
        level: 85,
      },
    ],
  },
  {
    id: 'devops',
    title: 'Quality, DevOps & CS Fundamentals',
    badge: 'Certified Agile',
    skills: [
      {
        name: 'Git & GitHub',
        sub: 'Version Control • Branches',
        icon: 'GitBranch',
        level: 90,
      },
      {
        name: 'Agile / Scrum',
        sub: 'Certified 2026 • Sprints',
        icon: 'RefreshCw',
        level: 88,
      },
      {
        name: 'MVC Architecture',
        sub: 'Separation of Concerns',
        icon: 'Boxes',
        level: 92,
      },
      {
        name: 'OOP Principles',
        sub: 'Inheritance • Encapsulation',
        icon: 'Shield',
        level: 92,
      },
      {
        name: 'Priority Queues',
        sub: 'O(N log K) In-Memory Heaps',
        icon: 'ListFilter',
        level: 90,
      },
    ],
  },
];
