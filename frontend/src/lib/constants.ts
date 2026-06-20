export const SITE = {
  name: 'Hareesh Yeluri',
  tagline:
    'Senior Software Engineer specializing in Open Banking Microservices, Kafka Event-Driven Systems, Cloud-Native Platforms, and API Security.',
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
  { name: 'Cloud / AWS / Azure', color: 'secondary' as const },
  { name: 'Kafka / Streaming', color: 'accent' as const },
  { name: 'DevOps / K8s', color: 'success' as const },
  { name: 'Security / OAuth2', color: 'primary' as const },
  { name: 'Databases / SQL', color: 'secondary' as const },
] as const

export const SKILLS_DATA = [
  { name: 'Java 8/11/21', category: 'Java/Spring', proficiency: 95 },
  { name: 'Spring Boot 3', category: 'Java/Spring', proficiency: 95 },
  { name: 'Spring Cloud', category: 'Java/Spring', proficiency: 90 },
  { name: 'Spring Security', category: 'Java/Spring', proficiency: 90 },
  { name: 'Microservices', category: 'Java/Spring', proficiency: 92 },
  { name: 'OAuth2 / OIDC', category: 'Security', proficiency: 90 },
  { name: 'Okta / PingFederate', category: 'Security', proficiency: 88 },
  { name: '2-Way TLS / mTLS', category: 'Security', proficiency: 85 },
  { name: 'Kafka / Kafka Streams', category: 'Data/Streaming', proficiency: 90 },
  { name: 'Kubernetes / OpenShift', category: 'Cloud', proficiency: 85 },
  { name: 'Docker', category: 'Cloud', proficiency: 90 },
  { name: 'AWS', category: 'Cloud', proficiency: 85 },
  { name: 'Azure', category: 'Cloud', proficiency: 82 },
  { name: 'Oracle DB', category: 'Databases', proficiency: 80 },
  { name: 'MongoDB', category: 'Databases', proficiency: 82 },
  { name: 'PostgreSQL', category: 'Databases', proficiency: 80 },
  { name: 'Cassandra', category: 'Databases', proficiency: 75 },
  { name: 'Redis', category: 'Databases', proficiency: 78 },
  { name: 'CI/CD (Jenkins)', category: 'DevOps', proficiency: 88 },
  { name: 'Mule API Gateway', category: 'DevOps', proficiency: 80 },
  { name: 'HAProxy', category: 'DevOps', proficiency: 78 },
  { name: 'JBoss / Tomcat', category: 'DevOps', proficiency: 85 },
  { name: 'JUnit / Mockito', category: 'Testing', proficiency: 92 },
  { name: 'Angular', category: 'Frontend', proficiency: 72 },
] as const

export const FEATURED_PROJECTS: import('./types').Project[] = [
  {
    id: '1',
    title: 'Open Banking Microservices Platform',
    slug: 'open-banking-microservices',
    description:
      'Enterprise-grade Digital and Open Banking microservices with OAuth2.0, OpenID Connect, and Okta JWT management. Integrated APIs with financial back-end systems exposing customer account information per Open Banking protocols.',
    techStack: ['Java 11', 'Spring Boot', 'Spring Security', 'OAuth2', 'OIDC', 'Okta', 'Kafka', 'Mule API Gateway'],
    links: { github: '#', live: '#', caseStudy: '#' },
    images: [],
    featured: true,
  },
  {
    id: '2',
    title: 'Kafka Event Pipeline for Consent Lifecycle',
    slug: 'kafka-consent-lifecycle-pipeline',
    description:
      'Kafka-based event publishing pipeline for Consent LifeCycle changes and API invocations. Implemented RBAC controls and 2-Way TLS security, supporting downstream analytics systems at EQ Bank.',
    techStack: ['Java 11', 'Spring Boot', 'Apache Kafka', 'RBAC', '2-Way TLS', 'Azure Kubernetes', 'Helm'],
    links: { github: '#', live: '#', caseStudy: '#' },
    images: [],
    featured: true,
  },
  {
    id: '3',
    title: 'Legacy Application Modernization',
    slug: 'legacy-modernization-jboss',
    description:
      'Modernized legacy housing application by migrating from Oracle WebLogic to Red Hat JBoss EAP. Established HAProxy-based load balancing, refactored core components into standalone Spring Boot modules.',
    techStack: ['Java 8', 'Spring Boot', 'JBoss EAP', 'HAProxy', 'Maven', 'Jenkins', 'Oracle DB'],
    links: { github: '#', live: '#', caseStudy: '#' },
    images: [],
    featured: true,
  },
  {
    id: '4',
    title: 'CDC Data Pipeline with Kafka & Cassandra',
    slug: 'cdc-data-pipeline-kafka-cassandra',
    description:
      'High-throughput data pipeline utilizing Change Data Capture (CDC) on Oracle DB to publish data to Kafka. Processed events using Spring-Kafka and stored in Cassandra microservice data stores. Deployed on AWS with CodePipeline CI/CD.',
    techStack: ['Java 8', 'Spring Boot', 'Spring Kafka', 'CDC', 'Oracle DB', 'Cassandra', 'AWS EFS', 'Docker'],
    links: { github: '#', live: '#', caseStudy: '#' },
    images: [],
    featured: true,
  },
]

export const EXPERIENCE_DATA: import('./types').Experience[] = [
  {
    id: '1',
    company: 'EQ Bank',
    role: 'Senior Software Engineer',
    startDate: '2022-06',
    endDate: '2025-07',
    description:
      'Led design and development of enterprise-grade Digital and Open Banking microservices ensuring FAPI and PSD2 compliance. Built OAuth2.0/OIDC Consent & Authorization flows with Okta. Developed Kafka event pipeline for Consent LifeCycle. Achieved 95% API test coverage with Postman, Cucumber, JUnit, Mockito. Deployed to Azure Kubernetes with Helm.',
    technologies: ['Java 11', 'Spring Boot', 'Spring Security', 'OAuth2', 'OIDC', 'Okta', 'Kafka', 'Azure Kubernetes', 'Helm', 'Jenkins', 'JUnit', 'Mockito'],
  },
  {
    id: '2',
    company: 'CIBC Bank',
    role: 'Software Developer',
    startDate: '2022-01',
    endDate: '2022-06',
    description:
      'Designed and developed RESTful microservices for Open Banking platforms. Implemented Consent & Authorization flows. Conducted API conformance testing achieving high coverage. Contributed to CI/CD automation with Jenkins and containerized deployments.',
    technologies: ['Java 11', 'Spring Boot', 'OAuth2', 'REST APIs', 'Kafka', 'Docker', 'Jenkins', 'JUnit'],
  },
  {
    id: '3',
    company: 'Rogers Communications',
    role: 'Software Developer',
    startDate: '2020-10',
    endDate: '2021-12',
    description:
      'Developed data pipeline using CDC on Oracle DB to publish to Kafka. Used Spring-Kafka to consume from partitioned topics and store processed data in Cassandra. Configured AWS Code Pipelines with GitHub for CI/CD. Mounted AWS EFS with Beanstalk for persistent storage.',
    technologies: ['Java 8', 'Spring Boot', 'Spring Kafka', 'CDC', 'Oracle DB', 'Cassandra', 'AWS', 'Docker'],
  },
  {
    id: '4',
    company: 'Sobeys',
    role: 'Software Developer',
    startDate: '2019-09',
    endDate: '2020-09',
    description:
      'Designed RESTful microservices with Spring Boot 2.x and MongoDB. Engineered data ingestion app with Spring Kafka to consume data from Loblaw and Shoppers systems. Created AngularJS web app for store profile monitoring. Implemented Dynatrace APM monitoring and Swagger/JMeter testing.',
    technologies: ['Java 8', 'Spring Boot 2', 'Spring Kafka', 'MongoDB', 'AngularJS', 'SQL Server', 'Elasticsearch', 'Dynatrace'],
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
    title: 'Mastering OAuth2 and OpenID Connect for Open Banking',
    slug: 'mastering-oauth2-openid-connect-open-banking',
    excerpt:
      'Implement secure OAuth2.0 and OIDC flows for financial-grade APIs with Okta, JWT management, and FAPI/PSD2 compliance.',
    content: '',
    category: 'Security',
    tags: ['OAuth2', 'OpenID Connect', 'Okta', 'JWT', 'Security'],
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