import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FEATURED_PROJECTS } from '@/lib/constants'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import GradientText from '@/components/ui/GradientText'

export default function ProjectsShowcase() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Real-world solutions I have architected and built">
      <div className="space-y-24">
        {FEATURED_PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            className="sticky top-24 flex flex-col items-center gap-8 md:flex-row"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className={`flex-1 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-xl" />
            </div>
            <div className={`flex-1 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <span className="font-mono text-xs text-gray-500">0{i + 1}</span>
              <h3 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
                <GradientText as="span">{project.title}</GradientText>
              </h3>
              <p className="mt-4 leading-relaxed text-gray-400">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="primary">{tech}</Badge>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                {project.links.github && (
                  <Link
                    to={project.links.github}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    GitHub &rarr;
                  </Link>
                )}
                {project.links.live && (
                  <Link
                    to={project.links.live}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    Live Demo &rarr;
                  </Link>
                )}
                {project.links.caseStudy && (
                  <Link
                    to={project.links.caseStudy}
                    className="text-sm text-gray-400 transition-colors hover:text-primary"
                  >
                    Case Study &rarr;
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}