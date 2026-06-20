import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import SkillsRadar from '@/components/sections/SkillsRadar'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { TECH_AREAS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Section title="About Me" subtitle="Engineer. Architect. Problem Solver.">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-white">The Full Picture</h3>
            <p className="mt-4 leading-relaxed text-gray-300">
              With over 8 years of experience in software engineering, I specialize in designing and
              building distributed systems that handle millions of requests per second. My expertise
              spans the entire backend ecosystem, from core Java to cloud-native architectures.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              I am deeply passionate about event-driven architectures, domain-driven design, and
              building systems that are both scalable and maintainable. I believe in writing clean,
              testable code and fostering engineering excellence.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              When I am not coding, I mentor junior developers, contribute to open-source projects,
              and explore the latest in AI and machine learning.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: 'Years in Tech', value: 8, suffix: '+' },
              { label: 'Projects Delivered', value: 40, suffix: '+' },
              { label: 'Happy Clients', value: 25, suffix: '+' },
              { label: 'Commits This Year', value: 1200, suffix: '+' },
            ].map((stat) => (
              <Card key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section title="Technology Areas" subtitle="Where I focus my expertise">
        <div className="grid gap-6 md:grid-cols-3">
          {TECH_AREAS.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card hoverable className="text-center">
                <h3 className={`font-heading text-lg font-semibold text-${area.color}`}>{area.name}</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Deep expertise in {area.name.toLowerCase()} technologies and best practices.
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <SkillsRadar />
    </div>
  )
}