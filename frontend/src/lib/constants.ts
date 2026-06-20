export const SITE = {
  name: 'Hareesh Y',
  tagline:
    'Building Scalable Microservices, Cloud-Native Platforms, Event-Driven Systems, and AI-Powered Applications.',
  role: 'Senior Java Developer',
} as const

export const CONTACT = {
  email: 'hareeshyeluri595@outlook.com',
  phone: '+91 9704788835',
  location: 'Hyderabad, Telangana, India',
} as const

export const SOCIAL = {
  github: 'https://github.com/B3n73n-579',
  linkedin: 'https://www.linkedin.com/in/hareeshyeluri',
} as const

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/#skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/#experience' },
  { label: 'Blog', path: '/blog' },
  { label: 'AI Lab', path: '/ai-lab' },
  { label: 'Contact', path: '/contact' },
] as const

export const TECH_AREAS = [
  { name: 'Java / Spring', color: 'primary' as const },
  { name: 'Cloud / AWS', color: 'secondary' as const },
  { name: 'Data / Kafka', color: 'accent' as const },
  { name: 'DevOps / K8s', color: 'success' as const },
  { name: 'AI / ML', color: 'primary' as const },
  { name: 'Frontend / React', color: 'secondary' as const },
] as const

export const SKILLS_DATA = [
  { name: 'Java 17/21', category: 'Java/Spring', proficiency: 95 },
  { name: 'Spring Boot 3', category: 'Java/Spring', proficiency: 95 },
  { name: 'Spring Cloud', category: 'Java/Spring', proficiency: 90 },
  { name: 'Hibernate/JPA', category: 'Java/Spring', proficiency: 90 },
  { name: 'Microservices', category: 'Java/Spring', proficiency: 92 },
  { name: 'Reactive Programming', category: 'Java/Spring', proficiency: 85 },
  { name: 'AWS', category: 'Cloud', proficiency: 88 },
  { name: 'Docker', category: 'Cloud', proficiency: 90 },
  { name: 'Kubernetes', category: 'Cloud', proficiency: 82 },
  { name: 'Terraform', category: 'Cloud', proficiency: 75 },
  { name: 'Apache Kafka', category: 'Data', proficiency: 88 },
  { name: 'PostgreSQL', category: 'Data', proficiency: 85 },
  { name: 'Redis', category: 'Data', proficiency: 80 },
  { name: 'MongoDB', category: 'Data', proficiency: 78 },
  { name: 'CI/CD', category: 'DevOps', proficiency: 88 },
  { name: 'GitHub Actions', category: 'DevOps', proficiency: 85 },
  { name: 'Prometheus/Grafana', category: 'DevOps', proficiency: 78 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 70 },
  { name: 'LLM APIs', category: 'AI/ML', proficiency: 75 },
  { name: 'React', category: 'Frontend', proficiency: 75 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 72 },
  { name: 'TailwindCSS', category: 'Frontend', proficiency: 70 },
] as const

export const FEATURED_PROJECTS: import('./types').Project[] = [
  {
    id: '1',
    title: 'Event-Driven Microservices Platform',
    slug: 'event-driven-microservices',
    description:
      'A scalable microservices architecture using Spring Boot, Kafka, and Kubernetes with event sourcing and CQRS patterns.',
    techStack: ['Java 21', 'Spring Boot 3', 'Apache Kafka', 'Kubernetes', 'PostgreSQL', 'Docker'],
    links: { github: '#', live: '#', caseStudy: '#' },
    images: [],
    featured: true,
  },
  {
    id: '2',
    title: 'AI-Powered Code Assistant',
    slug: 'ai-code-assistant',
    description:
      'An intelligent code review and refactoring assistant using LLMs and static analysis for enterprise Java applications.',
    techStack: ['Java 21', 'Spring Boot 3', 'OpenAI API', 'Redis', 'React', 'TypeScript'],
    links: { github: '#', live: '#' },
    images: [],
    featured: true,
  },
  {
    id: '3',
    title: 'Cloud-Native Observability Stack',
    slug: 'cloud-native-observability',
    description:
      'Full observability solution with distributed tracing, metrics aggregation, and real-time alerting for microservices.',
    techStack: ['Java 17', 'Micrometer', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger'],
    links: { github: '#', live: '#' },
    images: [],
    featured: true,
  },
  {
    id: '4',
    title: 'Real-Time Data Pipeline',
    slug: 'real-time-data-pipeline',
    description:
      'High-throughput data pipeline processing millions of events per second using Kafka Streams and Flink.',
    techStack: ['Kafka Streams', 'Apache Flink', 'Java 21', 'Redis', 'Cassandra', 'Docker'],
    links: { github: '#', live: '#' },
    images: [],
    featured: true,
  },
]

export const EXPERIENCE_DATA: import('./types').Experience[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    role: 'Senior Java Developer',
    startDate: '2022-03',
    endDate: null,
    description:
      'Architected and built event-driven microservices platform serving 10M+ users. Led migration from monolith to microservices with Kafka event sourcing.',
    technologies: ['Java 21', 'Spring Boot 3', 'Kafka', 'Kubernetes', 'AWS', 'PostgreSQL'],
  },
  {
    id: '2',
    company: 'DataFlow Systems',
    role: 'Java Developer',
    startDate: '2019-06',
    endDate: '2022-02',
    description:
      'Developed real-time data processing pipelines and RESTful APIs. Implemented CI/CD pipelines and improved test coverage to 90%.',
    technologies: ['Java 11', 'Spring Boot 2', 'Kafka', 'Docker', 'MongoDB', 'Jenkins'],
  },
  {
    id: '3',
    company: 'WebSphere Solutions',
    role: 'Junior Java Developer',
    startDate: '2017-01',
    endDate: '2019-05',
    description:
      'Built enterprise web applications using Spring MVC and Hibernate. Contributed to internal tooling and automated testing frameworks.',
    technologies: ['Java 8', 'Spring MVC', 'Hibernate', 'MySQL', 'JavaScript', 'Maven'],
  },
]

export const BLOG_POSTS: import('./types').BlogPost[] = [
  {
    id: '1',
    title: 'Building Event-Driven Microservices with Spring Boot and Kafka',
    slug: 'event-driven-microservices-spring-boot-kafka',
    excerpt:
      'A deep dive into designing and implementing event-driven architectures using Spring Boot 3 and Apache Kafka.',
    content: '',
    category: 'Microservices',
    tags: ['Spring Boot', 'Kafka', 'Microservices', 'Java'],
    publishedAt: '2024-12-15',
    readingTime: 12,
  },
  {
    id: '2',
    title: 'Mastering Reactive Programming in Java with Project Reactor',
    slug: 'mastering-reactive-programming-project-reactor',
    excerpt:
      'Learn reactive programming patterns in Java using Project Reactor for building resilient, non-blocking applications.',
    content: '',
    category: 'Java',
    tags: ['Java', 'Reactive', 'Project Reactor', 'WebFlux'],
    publishedAt: '2024-11-20',
    readingTime: 10,
  },
  {
    id: '3',
    title: 'Kubernetes for Java Developers: A Practical Guide',
    slug: 'kubernetes-for-java-developers',
    excerpt:
      'Deploy and scale your Spring Boot applications on Kubernetes with best practices for production environments.',
    content: '',
    category: 'DevOps',
    tags: ['Kubernetes', 'Docker', 'Spring Boot', 'DevOps'],
    publishedAt: '2024-10-05',
    readingTime: 15,
  },
]