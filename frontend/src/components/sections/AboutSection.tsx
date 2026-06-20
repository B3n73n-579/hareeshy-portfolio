import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { label: 'Years Experience', target: 8, suffix: '+' },
  { label: 'Projects Delivered', target: 40, suffix: '+' },
  { label: 'Open Source Contributions', target: 120, suffix: '+' },
  { label: 'Tech Stack Mastered', target: 15, suffix: '+' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section id="about" title="About Me" subtitle="A passionate engineer building the future of distributed systems">
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-6 leading-relaxed text-gray-300">
            I am a Senior Java Developer with 8+ years of experience architecting and building
            large-scale, distributed systems. My expertise spans the full lifecycle of microservices
            — from event-driven architectures with Kafka to cloud-native deployments on Kubernetes.
          </p>
          <p className="mb-6 leading-relaxed text-gray-300">
            I specialize in designing resilient, scalable backend systems using Java 21, Spring Boot 3,
            and reactive programming patterns. I am passionate about clean architecture, domain-driven
            design, and building systems that stand the test of time.
          </p>
          <p className="leading-relaxed text-gray-300">
            Beyond backend engineering, I explore AI/ML applications and frontend technologies to
            build full-stack solutions that deliver real business value.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-16 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {['Java 21', 'Spring Boot 3', 'Kafka', 'Kubernetes', 'AWS', 'PostgreSQL', 'Redis', 'Docker', 'Terraform', 'React', 'TypeScript'].map(
          (tech) => (
            <Badge key={tech} variant="primary">{tech}</Badge>
          ),
        )}
      </motion.div>
    </Section>
  )
}