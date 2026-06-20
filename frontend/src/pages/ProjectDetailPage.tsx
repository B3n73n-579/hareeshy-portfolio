import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FEATURED_PROJECTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <h1 className="font-heading text-4xl font-bold text-white">Project not found</h1>
        <Link to="/projects" className="mt-4 text-primary hover:underline">
          &larr; Back to projects
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <Section>
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/projects" className="mb-8 block text-sm text-gray-400 transition-colors hover:text-primary">
            &larr; Back to projects
          </Link>

          <div className="mb-8 aspect-video rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />

          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            <GradientText as="span">{project.title}</GradientText>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">{project.description}</p>

          <div className="mt-8">
            <h3 className="mb-3 font-heading text-lg font-semibold text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="primary">{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 font-heading text-lg font-semibold text-white">Links</h3>
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">View on GitHub</Button>
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">Live Demo</Button>
                </a>
              )}
              {project.links.caseStudy && (
                <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm">Case Study</Button>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}