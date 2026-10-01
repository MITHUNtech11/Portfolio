import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'kauvery',
    company: 'Kauvery Hospital',
    role: 'AI Intern',
    division: 'Corporate Healthcare',
    period: 'Oct 2025 – Dec 2025',
    location: 'Chennai, India',
    subprojects: [
      {
        title: 'Digital Product Data Vault',
        icon: 'Archive',
        tech: 'Java • Python • PostgreSQL • MySQL • JDBC • REST API • Azure',
        tasks: [
          'Designed and deployed a web application with a well-structured relational schema (entities, relationships, and CRUD operations) in PostgreSQL/MySQL, applying normalization best practices.',
          'Implemented REST-based data endpoints for create, read, update, and delete operations on monthly product datasets, ensuring secure data storage and schema validation.',
          'Used JDBC-style database access patterns to connect the application layer to the database, handling parameterized queries and connection management.',
          'Integrated Azure Blob Storage and Cosmos DB for cloud-backed file management; reduced data entry errors by ~30% through automated input validation.',
        ],
      },
      {
        title: 'AI Recruiter Application',
        icon: 'UserCheck',
        tech: 'Java • Python • REST API • NLP • MySQL • MVC Architecture',
        tasks: [
          'Built an end-to-end recruitment web application following MVC design principles — separating business logic, data access, and presentation layers.',
          'Developed REST API endpoints for resume ingestion, NLP-based skill extraction, keyword matching, and candidate scoring, processing 100+ resumes per run.',
          'Applied data structures (hashmaps, priority queues) and algorithms for candidate ranking and keyword scoring, reducing manual screening effort by ~40%.',
          'Wrote unit test cases for scoring logic and implemented application logging for debugging and traceability.',
        ],
      },
    ],
  },
  {
    id: 'redback',
    company: 'RedBack IT Solutions',
    role: 'Python Intern',
    division: 'IT Consulting',
    period: 'Aug 2025 – Sep 2025',
    location: 'Vellore, India',
    subprojects: [
      {
        title: 'Urban Route Optimizer',
        icon: 'MapPin',
        tech: 'Python • OSMnx • NetworkX • Streamlit • REST • Graph Algorithms',
        tasks: [
          "Developed a route optimization engine applying Dijkstra's algorithm and graph data structures on OpenStreetMap data, demonstrating strong DSA foundations.",
          'Built a responsive interactive UI displaying multi-route options, ETA, and distance for 5+ city profiles; optimized backend response time to under 2 seconds via caching.',
          'Designed REST-compatible service endpoints to decouple the routing engine from the frontend presentation layer.',
        ],
      },
    ],
  },
];
