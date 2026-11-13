import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'recruiter',
    number: '01',
    title: 'AI Recruiter — NLP Screening Pipeline',
    label: 'PYTHON & AI • NLP SCREENING PIPELINE',
    category: 'python',
    featured: true,
    description:
      'End-to-end recruitment web application designed with MVC architectural separation between presentation, business logic, and database access. Engineered Python & Java-backed REST services for resume ingestion, NLP skill extraction, and keyword scoring. Implemented priority queues and hashmap data structures to calculate weighted scores and rank candidates across 100+ resumes per batch, cutting manual screening effort by ~40%. Includes JUnit test cases and SLF4J audit logging.',
    overview:
      'The AI Recruiter platform decouples automated applicant ingestion from algorithmic screening using a strict Spring MVC pattern. Resume documents are ingested via multipart REST endpoints, parsed with NLP keyword extractors, and evaluated using an in-memory priority queue heap structure to eliminate database bottlenecking during batch recruitment cycles.',
    diagrams: [
      {
        title: 'Workflow Pipeline',
        src: 'workflows/AI-RECRUITER.png',
        caption:
          'End-to-end recruitment screening workflow: resume ingestion, NLP parsing, score ranking, & status reporting',
      },
      {
        title: 'System Architecture',
        src: 'workflows/AI-Resume Parser.png',
        caption:
          'Technical Architecture: Presentation UI, Orchestrator API, Azure OpenAI parsing & MySQL backend',
      },
      {
        title: 'OCR & AI Pipeline',
        src: 'workflows/Resume Analyser.png',
        caption:
          'Deep parsing pipeline: PDF extraction, OCR normalization, and structured entity extraction',
      },
    ],
    pipeline: [
      {
        icon: 'FileUp',
        title: '1. Ingestion',
        sub: 'REST multipart file upload (PDF/DOCX)',
      },
      {
        icon: 'Brain',
        title: '2. NLP Parsing',
        sub: 'Skill extraction & tokenization',
      },
      {
        icon: 'Layers',
        title: '3. Priority Queue',
        sub: 'O(N log K) composite ranking heap',
      },
      {
        icon: 'LayoutDashboard',
        title: '4. UI / MVC View',
        sub: 'Bootstrap dashboard & candidate logs',
      },
    ],
    metrics: [
      {
        num: '~40%',
        label: 'Screening Time Saved',
        icon: 'Zap',
      },
      {
        num: '100+',
        label: 'Resumes Processed / Batch',
        icon: 'FileText',
      },
      {
        num: 'O(N log K)',
        label: 'Heap Algorithmic Complexity',
        icon: 'Boxes',
      },
      {
        num: 'JUnit 5',
        label: 'Unit Test & Audit Logging',
        icon: 'ShieldCheck',
      },
    ],
    challenges: [
      {
        title: 'Algorithmic Optimization',
        desc: 'Rather than running costly SQL ORDER BY operations on large datasets, candidate scores are pushed into a Java PriorityQueue bounded by target applicant limits, cutting latency by ~60%.',
      },
      {
        title: 'Decoupled MVC Pattern',
        desc: 'Separated business logic from presentation using Spring Boot service layer patterns and SLF4J structured event logging for transparent auditing.',
      },
      {
        title: 'Schema Normalization',
        desc: 'Engineered normalized MySQL relational tables with foreign keys linking candidates, parsed skills, and job requisition targets.',
      },
    ],
    tags: [
      'Python',
      'FastAPI',
      'Java SE 11',
      'Spring Boot',
      'NLP',
      'MySQL',
      'JDBC',
      'JUnit 5',
      'SLF4J',
      'Bootstrap',
    ],
    github: 'https://github.com/mithuntech11',
  },
  {
    id: 'vault',
    number: '02',
    title: 'Digital Product Data Vault',
    label: 'JAVA & HEALTHCARE CLOUD SYSTEM',
    category: 'java',
    featured: false,
    description:
      'Cloud-integrated product data management system engineered for corporate healthcare operations. Designed normalized relational schemas with full CRUD capabilities in MySQL and PostgreSQL. Built secure RESTful endpoints for monthly product records using JDBC-style access patterns with parameterized queries and connection handling. Integrated Azure Blob Storage and Cosmos DB for cloud file management, cutting data entry errors by ~30% via schema validation.',
    overview:
      'Developed during an AI Internship at Kauvery Hospital (Corporate Healthcare), the Digital Product Data Vault guarantees strict schema compliance for monthly corporate healthcare datasets. The architecture unifies normalized relational databases (MySQL/PostgreSQL) with cloud blob archiving and automated validation pipelines.',
    diagrams: [
      {
        title: 'Cloud & DB Architecture',
        src: 'workflows/Digital Product Data Vault.png',
        caption:
          'Production architecture: PostgreSQL/MySQL 3NF schemas, Azure Blob Storage, and Cosmos DB cloud indexing',
      },
      {
        title: 'User & Admin Flow',
        src: 'workflows/1.png',
        caption:
          'Healthcare system workflow: Role-based authentication, audit verification, and product dataset commit pipeline',
      },
    ],
    pipeline: [
      {
        icon: 'ShieldCheck',
        title: '1. Validation',
        sub: 'Schema boundary & constraint checks',
      },
      {
        icon: 'Database',
        title: '2. Relational Layer',
        sub: 'PostgreSQL / MySQL 3NF normalized schema',
      },
      {
        icon: 'CloudUpload',
        title: '3. Azure Cloud',
        sub: 'Azure Blob & Cosmos DB archiving',
      },
      {
        icon: 'GitBranch',
        title: '4. JDBC Access',
        sub: 'Parameterized SQL queries',
      },
    ],
    metrics: [
      {
        num: '~30%',
        label: 'Error Reduction',
        icon: 'ShieldCheck',
      },
      {
        num: '100%',
        label: 'ACID Transaction Compliance',
        icon: 'Database',
      },
      {
        num: 'Sub-15ms',
        label: 'Indexed Query Latency',
        icon: 'Zap',
      },
      {
        num: 'Zero',
        label: 'Data Loss Across Batches',
        icon: 'Cloud',
      },
    ],
    challenges: [
      {
        title: 'Healthcare Schema Integrity',
        desc: 'Designed 3NF normalized tables with entity relationships and foreign keys in PostgreSQL and MySQL, preventing orphan records.',
      },
      {
        title: 'Secure Parameterized Queries',
        desc: 'Implemented JDBC-style database access with parameterized queries, eliminating SQL injection vulnerabilities and optimizing connection pooling.',
      },
      {
        title: 'Hybrid Cloud Architecture',
        desc: 'Integrated Azure Blob Storage for encrypted binary product documents alongside Cosmos DB for metadata indexing, reducing corporate data entry discrepancies by ~30%.',
      },
    ],
    tags: [
      'Java SE 11',
      'Spring Boot',
      'PostgreSQL',
      'MySQL',
      'JDBC',
      'REST API',
      'Azure Blob',
      'Cosmos DB',
      'Agile',
    ],
    github: 'https://github.com/mithuntech11',
  },
  {
    id: 'route',
    number: '03',
    title: 'Urban Route Optimizer',
    label: 'PYTHON DSA & GRAPH ENGINE',
    category: 'dsa',
    featured: false,
    description:
      "High-performance city routing engine implementing Dijkstra's algorithm and graph data structures over real-world OpenStreetMap road networks. Built a responsive interactive user interface providing multi-modal route options (car, bike, pedestrian) with live ETA calculations across 5+ city profiles. Decoupled engine using REST-compatible endpoints and optimized backend query response times to under 2 seconds via graph caching.",
    overview:
      "The Urban Route Optimizer implements Dijkstra's shortest-path algorithm and graph data structures over OpenStreetMap road networks. Built during an IT consulting internship at RedBack IT Solutions, it decouples the heavy graph mathematical engine from the UI presentation layer via REST endpoints.",
    diagrams: [
      {
        title: 'Graph Routing Architecture',
        src: 'workflows/2.png',
        caption:
          'Urban route graph computation pipeline: OSMnx street topology, NetworkX edge weights, and real-time Streamlit visualization',
      },
    ],
    pipeline: [
      {
        icon: 'MapPin',
        title: '1. Spatial Graph',
        sub: 'OSMnx road bounding box extraction',
      },
      {
        icon: 'Network',
        title: '2. Network Model',
        sub: 'NetworkX directed graph with edge weights',
      },
      {
        icon: 'Route',
        title: '3. Dijkstra Solver',
        sub: 'Multi-modal traversal computation',
      },
      {
        icon: 'Gauge',
        title: '4. Streamlit / Web',
        sub: 'Sub-2s cached interactive route display',
      },
    ],
    metrics: [
      {
        num: '< 2.0s',
        label: 'Query Performance',
        icon: 'Gauge',
      },
      {
        num: '5+',
        label: 'City Profiles Modeled',
        icon: 'Building',
      },
      {
        num: '~75%',
        label: 'Repeat Latency Reduction (Cache)',
        icon: 'Zap',
      },
      {
        num: '3 Modes',
        label: 'Car, Pedestrian, Bicycle',
        icon: 'Route',
      },
    ],
    challenges: [
      {
        title: 'Graph Computational Scale',
        desc: 'Real-world city road networks contain tens of thousands of nodes. Implemented spatial sub-graph extraction and bounding box caching to keep Dijkstra calculations sub-second.',
      },
      {
        title: 'Service Decoupling',
        desc: 'Designed clean REST-compatible endpoints separating the backend routing engine from the interactive Streamlit and Bootstrap frontend.',
      },
      {
        title: 'Multi-Modal Weight Adjustments',
        desc: 'Engineered dynamic edge weighting calculating travel times according to vehicle restrictions, pedestrian paths, and elevation.',
      },
    ],
    tags: [
      'Python 3.x',
      'OSMnx',
      'NetworkX',
      'Dijkstra Algorithm',
      'Graph DSA',
      'Streamlit',
      'REST API',
      'HTML/Bootstrap',
    ],
    github: 'https://github.com/mithuntech11',
  },
  {
    id: 'colive',
    number: '04',
    title: 'Co-Live — Shared Living & Expense Management Platform',
    label: 'REACT & FIREBASE • REAL-TIME CLOUD ECOSYSTEM',
    category: 'cloud',
    featured: true,
    description:
      'Real-time multi-tenant shared living management web platform built on React 18 and Firebase Cloud Firestore. Streamlines roommate finances through peer-to-peer expense splitting, instant UPI payment deep-linking, automated chore rotation schedules, shared grocery lists, and downloadable PDF monthly balance reports with dual tenant/landlord dashboard views.',
    overview:
      'Co-Live decouples real-time roommate financial coordination from landlord property management into a unified responsive cloud platform. Engineered with Google Firebase (Auth, Firestore, Storage) and React, it features reactive ledger synchronization, instant UPI deep-linking across Indian payment apps (GPay, PhonePe, Paytm), and automated financial statement generation.',
    diagrams: [
      {
        title: 'Platform Architecture & Workflow',
        src: 'workflows/colive-workflow.svg',
        caption:
          'End-to-end cloud architecture: Firebase Auth, reactive Cloud Firestore expense streams, UPI settlement intents, & PDF audit exports',
      },
    ],
    pipeline: [
      {
        icon: 'Users',
        title: '1. Multi-Role Auth',
        sub: 'Firebase Auth & house onboarding',
      },
      {
        icon: 'CloudUpload',
        title: '2. Cloud Firestore',
        sub: 'Reactive expense & chore sync',
      },
      {
        icon: 'CreditCard',
        title: '3. UPI Settlement',
        sub: '1-click deep-linked app payments',
      },
      {
        icon: 'FileText',
        title: '4. PDF Statement',
        sub: 'Client-side financial audit export',
      },
    ],
    metrics: [
      {
        num: 'Real-Time',
        label: 'Reactive Firestore Sync',
        icon: 'Zap',
      },
      {
        num: 'Dual-Role',
        label: 'Tenant & Landlord Portals',
        icon: 'Users',
      },
      {
        num: '1-Click',
        label: 'Instant UPI Deep Linking',
        icon: 'CreditCard',
      },
      {
        num: 'PDF Export',
        label: 'Client-Side Financial Auditing',
        icon: 'FileText',
      },
    ],
    challenges: [
      {
        title: 'Reactive Concurrent State Sync',
        desc: 'Implemented real-time snapshot listeners with Firestore optimistic UI updates to prevent split-expense desynchronization among concurrent roommates.',
      },
      {
        title: 'UPI Deep Linking Architecture',
        desc: 'Constructed custom URI payment intent schemes compatible with NPCI UPI standards, allowing roommates to settle debts in 1 click across GPay, PhonePe, and Paytm.',
      },
      {
        title: 'Role-Based Access Partitioning',
        desc: 'Enforced security rules partitioning tenant views (chores, groceries, personal debts) from landlord administrative views (house notices, lease status, property rent).',
      },
    ],
    tags: [
      'React 18',
      'TypeScript',
      'Firebase Auth',
      'Cloud Firestore',
      'UPI Integration',
      'Tailwind CSS',
      'Framer Motion',
      'Client PDF Engine',
    ],
    github: 'https://github.com/mithuntech11',
    demoUrl: 'https://co-living-expense-tracker.web.app',
  },
  {
    id: 'jewel-of-nallu',
    number: '05',
    title: 'Jewel of Nallu — E-Commerce & WhatsApp Store',
    label: 'REACT & SUPABASE • DIRECT WHATSAPP COMMERCE',
    category: 'cloud',
    featured: true,
    description:
      'High-conversion direct-to-consumer sterling silver jewellery commerce web application and Progressive Web App (PWA). Features live daily market silver rate calculations for transparent weight-based pricing, Instagram reels product showcase, mobile-first responsive catalog, and automated 1-click WhatsApp checkout pre-filling order specs and pricing.',
    overview:
      'Jewel of Nallu bridges traditional handcrafted silver jewellery retail with modern headless e-commerce. Built with React and Supabase (PostgreSQL), the storefront features real-time dynamic market rate weight pricing, video-first Instagram reel shopping, and direct WhatsApp Business API ordering without cart friction.',
    diagrams: [
      {
        title: 'Storefront & WhatsApp Order Pipeline',
        src: 'workflows/jewelofnallu.jpg',
        caption:
          'Jewel of Nallu live storefront: Handcrafted sterling silver showcase with dynamic market pricing and WhatsApp checkout',
      },
    ],
    pipeline: [
      {
        icon: 'Gauge',
        title: '1. Live Rate Engine',
        sub: 'Dynamic silver weight calculations',
      },
      {
        icon: 'ShoppingBag',
        title: '2. Product Showcase',
        sub: 'Reels video & high-res catalog',
      },
      {
        icon: 'Database',
        title: '3. Supabase Cloud',
        sub: 'PostgreSQL inventory & order storage',
      },
      {
        icon: 'Smartphone',
        title: '4. WhatsApp API',
        sub: '1-click checkout with pre-filled specs',
      },
    ],
    metrics: [
      {
        num: 'Live Rate',
        label: 'Dynamic Silver Weight Pricing',
        icon: 'Gauge',
      },
      {
        num: '100% PWA',
        label: 'Offline-Ready Mobile Experience',
        icon: 'Smartphone',
      },
      {
        num: '1-Click',
        label: 'WhatsApp Checkout Automation',
        icon: 'ShoppingBag',
      },
      {
        num: '< 1.2s',
        label: 'Core Web Vitals LCP',
        icon: 'Zap',
      },
    ],
    challenges: [
      {
        title: 'Dynamic Weight-Based Price Computation',
        desc: 'Engineered dynamic pricing algorithms computing live handcrafted piece rates based on daily certified per-gram silver spot rates + making charges.',
      },
      {
        title: 'Zero-Friction WhatsApp Checkout',
        desc: 'Architected automated URL encoding pipelines generating rich WhatsApp pre-filled order payloads including SKU, custom ring sizing, current silver rate, and final price.',
      },
      {
        title: 'Mobile-First PWA Architecture',
        desc: 'Configured progressive web app service workers, web manifests, and edge image optimization delivering sub-1.2s LCP on mobile networks.',
      },
    ],
    tags: [
      'React 18',
      'Supabase',
      'PostgreSQL',
      'TypeScript',
      'PWA',
      'Tailwind CSS',
      'WhatsApp API',
      'Vite',
    ],
    github: 'https://github.com/mithuntech11',
    demoUrl: 'https://www.jewelofnallu.app/',
  },
];
