export const projects = [
  {
    id: 'budget',
    title: 'Personal Budget Platform',
    summary:
      'A personal finance web app for tracking money with a clear split between what comes in, what goes out, and what a household is aiming toward.',
    stack: ['Flask', 'Python', 'SQLite', 'SQLAlchemy'],
    features: [
      'Authentication with user-specific data isolation',
      'Income, bills, transactions, and savings goals',
      'Dashboard calculations for a current financial picture',
      'After-tax versus pre-tax income logic',
      'Responsive front end for desktop and mobile use',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'health-hub',
    title: 'Healthcare Data Pipeline / VCU Health Hub',
    summary:
      'A data pipeline and reporting layer that turns survey intake into monthly snapshots stakeholders can actually read.',
    stack: [
      'Google Forms',
      'Google Sheets',
      'Apps Script',
      'PostgreSQL',
      'Flask',
      'Python',
      'psycopg2',
    ],
    features: [
      'Forms-to-Sheets-to-PostgreSQL collection path',
      'Flask backend for stored snapshots and queries',
      'Stakeholder dashboards for program visibility',
      'Monthly snapshot workflow',
      'Demographic and service trend analysis',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'microservices',
    title: 'Flask Microservices Application',
    summary:
      'A small services architecture that separates product catalog concerns from cart behavior behind REST APIs.',
    stack: ['Flask', 'REST APIs', 'SQLite', 'SQLAlchemy'],
    features: [
      'Product microservice for catalog data',
      'Cart microservice for shopping-session state',
      'SQLAlchemy models persisted in SQLite',
      'Hands-on deployment of the services as a set',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'eesa',
    title: 'Ethiopian Eritrean Student Association Network',
    summary:
      'An alumni networking platform built so students and graduates can stay connected after they leave campus.',
    stack: ['MySQL', 'PHP', 'JavaScript', 'HTML/CSS'],
    features: [
      'Alumni profiles and directory-style browsing',
      'Networking-focused web interface',
      'MySQL-backed persistence',
      'Developed in an Agile workflow',
    ],
    github: null,
    demo: null,
  },
  {
    id: 'chat',
    title: 'Java Chat Application',
    summary:
      'A socket-based chat system that explores client/server design and concurrent conversation among multiple users.',
    stack: ['Java', 'Sockets'],
    features: [
      'Client/server architecture over sockets',
      'Multi-user communication on a shared session',
      'Clear split between connection handling and message flow',
    ],
    github: null,
    demo: null,
  },
]
