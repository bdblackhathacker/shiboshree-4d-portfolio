export const PROFILE = {
  name: 'Shiboshree Roy',
  title: 'Full-Stack Software Engineer | Ruby on Rails Developer',
  tagline: 'Architecting Scalable Backend Systems & Reactive Frontends.',
  location: 'Dhaka, Bangladesh',
  email: 'shiboshreeroycse@gmail.com',
  phone: '+880 1570252680',
  phoneHref: 'tel:+8801570252680',
  links: {
    github: 'https://github.com/ShiboshreeRoy',
    linkedin: 'https://linkedin.com/in/shiboshree-roy',
    portfolio: 'https://shiboshree-roydev.netlify.app'
  },
  summary:
    'Full-Stack Software Engineer experienced in building scalable, production-grade web applications using Ruby on Rails, PostgreSQL, Hotwire, Turbo, Stimulus.js, React, TypeScript, and ASP.NET. Expert in RESTful API design, authentication/authorization, database architecture, performance optimization, and Agile/Git-based workflows.'
}

export type Experience = {
  id: string
  period: string
  role: string
  company: string
  location: string
  highlights: string[]
  stack: string[]
  station: number
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'mfosl',
    period: 'Mar 2026 – Jun 2026',
    role: 'Senior Software Engineer',
    company: 'Multinational Force & Outsourcing Service Ltd. (MFOSL)',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Built full-stack enterprise apps with Ruby on Rails, PostgreSQL, Hotwire, Turbo, Stimulus.js and Tailwind CSS',
      'Designed RESTful APIs with versioning, JWT + Devise auth, Pundit-style authorization',
      'Optimized PostgreSQL queries (indexes, N+1 elimination, pg_stat analysis) cutting p95 latency ~42%',
      'Shipped Render deployments with zero-downtime migrations, Sidekiq background jobs and Redis caching'
    ],
    stack: ['Ruby on Rails', 'PostgreSQL', 'Hotwire', 'Turbo', 'Stimulus.js', 'Tailwind', 'Render', 'Sidekiq'],
    station: 1
  },
  {
    id: 'orgatro',
    period: 'Sep 2024 – Dec 2025',
    role: 'Full-Stack Developer',
    company: 'Orgatro IT',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Built scalable platforms using Rails, React, TypeScript, Hotwire and PostgreSQL',
      'Engineered digital wallets, payment integrations, ledger-safe transactions and reconciliation jobs',
      'Delivered task management + admin dashboards with role-based access, audit logs and CSV exports',
      'Hardened auth, rate-limiting and input validation; set up CI, SonarQube gates and review apps'
    ],
    stack: ['Rails', 'React', 'TypeScript', 'PostgreSQL', 'Hotwire', 'Redis', 'Docker'],
    station: 2
  },
  {
    id: 'weinspect',
    period: 'Aug 2023 – Jan 2024',
    role: 'Junior Software Engineer',
    company: 'Weinspect (Remote)',
    location: 'Remote',
    highlights: [
      'Developed enterprise apps using ASP.NET, AngularJS, PostgreSQL and SCSS',
      'Built responsive HR dashboards with charts, filters and server-side pagination',
      'Created interactive drag-and-drop components with keyboard accessibility',
      'Collaborated in Agile sprints with Git flow, code reviews and QA handoff'
    ],
    stack: ['ASP.NET', 'AngularJS', 'PostgreSQL', 'SCSS', 'Bootstrap'],
    station: 3
  }
]

export type SkillCategory = 'Languages' | 'Backend & Architecture' | 'Frontend' | 'Databases & DevOps'

export const SKILLS: Record<SkillCategory, { name: string; level: number; desc: string }[]> = {
  Languages: [
    { name: 'Ruby', level: 95, desc: 'Idiomatic Ruby, metaprogramming, RSpec' },
    { name: 'JavaScript', level: 92, desc: 'ES2022, async patterns, tooling' },
    { name: 'TypeScript', level: 90, desc: 'Strict types, generics, React Query' },
    { name: 'Python', level: 78, desc: 'Scripting, APIs, automation' },
    { name: 'PHP', level: 65, desc: 'Legacy maintenance, APIs' },
    { name: 'C', level: 70, desc: 'DSA foundations, systems' },
    { name: 'C++', level: 68, desc: 'OOP, problem solving' },
    { name: 'Java', level: 62, desc: 'OOP, Spring basics' },
    { name: 'Go', level: 58, desc: 'Concurrency, microservices' },
    { name: 'Rust', level: 52, desc: 'Ownership, CLI tooling' }
  ],
  'Backend & Architecture': [
    { name: 'Ruby on Rails', level: 96, desc: 'MVC, ActiveRecord, Hotwire, 7.x' },
    { name: 'ASP.NET', level: 74, desc: 'MVC, EF Core, Web API' },
    { name: 'RESTful APIs', level: 94, desc: 'Versioning, OpenAPI, pagination' },
    { name: 'MVC', level: 93, desc: 'Domain modeling, service objects' },
    { name: 'Active Record', level: 92, desc: 'Indexing, query optimization' },
    { name: 'Devise', level: 90, desc: 'Auth, OmniAuth, JWT hybrid' },
    { name: 'JWT', level: 89, desc: 'Access/refresh rotation' },
    { name: 'Microservices', level: 76, desc: 'Boundaries, contracts, queues' },
    { name: 'GraphQL', level: 72, desc: 'Schema design, batch loading' }
  ],
  Frontend: [
    { name: 'Hotwire', level: 93, desc: 'Turbo Drive/Frames/Streams' },
    { name: 'Turbo', level: 93, desc: 'SPA-like Rails UX' },
    { name: 'Stimulus.js', level: 91, desc: 'Modest JS controllers' },
    { name: 'React', level: 90, desc: 'Hooks, R3F, performance' },
    { name: 'AngularJS', level: 72, desc: 'Directives, migration' },
    { name: 'Tailwind CSS', level: 92, desc: 'Design systems, responsive' },
    { name: 'Bootstrap', level: 80, desc: 'Rapid admin UI' },
    { name: 'HAML', level: 85, desc: 'Clean Rails views' },
    { name: 'SCSS', level: 84, desc: 'Architecture, mixins' }
  ],
  'Databases & DevOps': [
    { name: 'PostgreSQL', level: 94, desc: 'Indexing, EXPLAIN, partitions' },
    { name: 'MySQL', level: 80, desc: 'Schema design, tuning' },
    { name: 'SQLite', level: 78, desc: 'Dev/test, embedded' },
    { name: 'Redis', level: 88, desc: 'Caching, Sidekiq backend' },
    { name: 'Sidekiq', level: 90, desc: 'Jobs, retries, cron' },
    { name: 'Docker', level: 86, desc: 'Multi-stage, compose' },
    { name: 'Kubernetes', level: 68, desc: 'Deployments, services' },
    { name: 'AWS', level: 74, desc: 'EC2, RDS, S3' },
    { name: 'Render', level: 88, desc: 'Blueprints, workers' },
    { name: 'Git', level: 94, desc: 'Flow, rebasing, reviews' },
    { name: 'SonarQube', level: 76, desc: 'Quality gates' }
  ]
}

export type Project = {
  id: string
  title: string
  subtitle: string
  stack: string[]
  metrics: { label: string; value: string }[]
  uiBullets: string[]
  archNodes: { id: string; label: string; sub: string }[]
  archFlow: string
  accent: string
}

export const PROJECTS: Project[] = [
  {
    id: 'erp',
    title: 'Enterprise Operations Platform',
    subtitle: 'MFOSL · Rails 7 + Hotwire + PostgreSQL',
    stack: ['Rails 7', 'PostgreSQL', 'Turbo', 'Stimulus', 'Sidekiq', 'Redis', 'Render'],
    metrics: [
      { label: 'p95 latency', value: '-42%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Users', value: '2k+' }
    ],
    uiBullets: [
      'Role-based dashboards with Turbo Frames + Streams live updates',
      'Command-palette search, bulk actions, CSV export',
      'Tailwind design system, dark mode, fully responsive'
    ],
    archNodes: [
      { id: 'c', label: 'Client', sub: 'Turbo + Stimulus' },
      { id: 'api', label: 'Rails API', sub: 'REST + Devise/JWT' },
      { id: 'q', label: 'Sidekiq / Redis', sub: 'Async jobs' },
      { id: 'db', label: 'PostgreSQL', sub: 'Indexed + cached' }
    ],
    archFlow: 'Client → Rails API → Sidekiq/Redis → PostgreSQL, with Turbo Streams pushing updates back to Client over WebSocket.',
    accent: '#CC0000'
  },
  {
    id: 'wallet',
    title: 'Digital Wallet + Payments Suite',
    subtitle: 'Orgatro IT · Rails + React + TypeScript',
    stack: ['Rails API', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: [
      { label: 'Txn success', value: '99.95%' },
      { label: 'Reconciliation', value: 'Auto' },
      { label: 'API p95', value: '180ms' }
    ],
    uiBullets: [
      'React wallet UI with ledger views, KYC flow, 2FA',
      'Admin dashboard: disputes, limits, audit trail',
      'Optimistic UI with idempotency keys'
    ],
    archNodes: [
      { id: 'c', label: 'React App', sub: 'TS + Query' },
      { id: 'api', label: 'Rails API', sub: 'Ledger-safe txns' },
      { id: 'q', label: 'Workers', sub: 'Settlement + webhooks' },
      { id: 'db', label: 'Postgres', sub: 'ACID ledger' }
    ],
    archFlow: 'React → Rails API (idempotent) → Sidekiq settlement workers → PostgreSQL ledger; webhooks fan-out via Redis queue.',
    accent: '#00F0FF'
  },
  {
    id: 'hr',
    title: 'HR Analytics Dashboard',
    subtitle: 'Weinspect · ASP.NET + AngularJS',
    stack: ['ASP.NET', 'AngularJS', 'PostgreSQL', 'SCSS', 'Bootstrap'],
    metrics: [
      { label: 'Pages', value: '12+' },
      { label: 'Mobile score', value: '96' },
      { label: 'Components', value: '40+' }
    ],
    uiBullets: [
      'Responsive HR dashboards with charts + server pagination',
      'Drag-and-drop org chart with keyboard support',
      'SCSS theming, print-friendly reports'
    ],
    archNodes: [
      { id: 'c', label: 'AngularJS', sub: 'SPA views' },
      { id: 'api', label: 'ASP.NET API', sub: 'EF Core' },
      { id: 'q', label: 'Jobs', sub: 'Reports + mail' },
      { id: 'db', label: 'PostgreSQL', sub: 'HR schema' }
    ],
    archFlow: 'AngularJS → ASP.NET Web API → background report jobs → PostgreSQL; cached reads for dashboard tiles.',
    accent: '#7C3AED'
  }
]

export const EDUCATION = {
  degree: 'Diploma in Computer Science & Engineering (CSE)',
  school: 'Aptouch Polytechnic Institute',
  gpa: '3.73 / 4.00'
}

export const CERTS = ['Expert Ruby on Rails', 'Ruby on Rails Building Projects', 'Python Programming']
