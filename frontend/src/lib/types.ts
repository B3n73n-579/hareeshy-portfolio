export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  coverImage?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  techStack: string[]
  links: { github?: string; live?: string; caseStudy?: string }
  images: string[]
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
}

export interface Skill {
  name: string
  category: string
  proficiency: number
  icon?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}