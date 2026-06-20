import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { FEATURED_PROJECTS } from '@/lib/constants'

const allTech = [...new Set(FEATURED_PROJECTS.flatMap((p) => p.techStack))]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string | null>(null)

  const filtered = filter
    ? FEATURED_PROJECTS.filter((p) => p.techStack.includes(filter))
    : FEATURED_PROJECTS

  return (
    <div className="pt-20">
      <Section title="Projects" subtitle="Real-world solutions I have built">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Button
            variant={filter === null ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          {allTech.map((tech) => (
            <Button
              key={tech}
              variant={filter === tech ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(tech)}
            >
              {tech}
            </Button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/projects/${project.slug}`}>
                <Card hoverable className="h-full">
                  <div className="mb-4 aspect-video rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
                  <h3 className="font-heading text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="primary">{tech}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4 text-sm">
                    {project.links.github && (
                      <span className="text-gray-400 transition-colors hover:text-primary">GitHub &rarr;</span>
                    )}
                    {project.links.live && (
                      <span className="text-gray-400 transition-colors hover:text-primary">Live Demo &rarr;</span>
                    )}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  )
}