import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { label: 'Years Experience', target: 6, suffix: '+' },
  { label: 'Projects Delivered', target: 25, suffix: '+' },
  { label: 'API Test Coverage', target: 95, suffix: '%' },
  { label: 'Tech Stack Mastered', target: 20, suffix: '+' },
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
            I am a Senior Software Engineer with 6+ years of experience designing and building
            enterprise-grade Open Banking and financial microservices. My expertise spans
            OAuth2.0/OIDC security, Kafka event-driven architectures, and cloud-native deployments
            on Azure Kubernetes and AWS.
          </p>
          <p className="mb-6 leading-relaxed text-gray-300">
            I specialize in building secure, scalable backend systems using Java 11/21, Spring Boot,
            Spring Security, and Spring Cloud. I have deep experience implementing OAuth2 grants,
            OpenID Connect flows, and 2-Way TLS security for financial-grade APIs compliant with
            FAPI and PSD2 standards.
          </p>
          <p className="leading-relaxed text-gray-300">
            I am passionate about event-driven systems, CI/CD automation, and quality assurance
            with 95%+ API test coverage using JUnit, Mockito, Cucumber, and Postman.
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
        {['Java 11/21', 'Spring Boot', 'Spring Security', 'Kafka', 'Kubernetes', 'AWS', 'Azure', 'OAuth2', 'OIDC', 'MongoDB', 'Oracle', 'Cassandra', 'Jenkins', 'Docker'].map(
          (tech) => (
            <Badge key={tech} variant="primary">{tech}</Badge>
          ),
        )}
      </motion.div>
    </Section>
  )
}