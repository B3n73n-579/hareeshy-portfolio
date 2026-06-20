import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import GradientText from '@/components/ui/GradientText'

const aiProjects = [
  {
    title: 'AI Code Review Assistant',
    description: 'LLM-powered code review tool for enterprise Java applications that provides intelligent suggestions.',
    tech: ['OpenAI', 'Java 21', 'Spring AI', 'React'],
    color: 'from-primary/20 to-secondary/20',
  },
  {
    title: 'Predictive Analytics Engine',
    description: 'ML-based predictive analytics for real-time system health monitoring and anomaly detection.',
    tech: ['TensorFlow', 'Python', 'Kafka', 'Grafana'],
    color: 'from-secondary/20 to-accent/20',
  },
  {
    title: 'Intelligent Document Parser',
    description: 'NLP-powered document extraction system that processes and structures unstructured data.',
    tech: ['NLP', 'Python', 'Spring Boot', 'PostgreSQL'],
    color: 'from-accent/20 to-primary/20',
  },
  {
    title: 'ChatOps Bot Platform',
    description: 'Slack-integrated DevOps bot using LLMs for incident response, deployments, and monitoring.',
    tech: ['LLM', 'Java 21', 'WebSocket', 'Redis'],
    color: 'from-primary/20 to-accent/20',
  },
]

export default function AILabShowcase() {
  return (
    <Section id="ai-lab" title="AI Lab" subtitle="Exploring the intersection of AI and software engineering">
      <div className="grid gap-6 md:grid-cols-2">
        {aiProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card hoverable className="group relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <h3 className="font-heading text-xl font-semibold text-white">
                  <GradientText as="span">{project.title}</GradientText>
                </h3>
                <p className="mt-3 leading-relaxed text-gray-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="primary">{t}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}