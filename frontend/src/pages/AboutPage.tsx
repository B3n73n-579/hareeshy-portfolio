import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import SkillsRadar from '@/components/sections/SkillsRadar'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { TECH_AREAS, CONTACT } from '@/lib/constants'

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
              Senior Software Engineer with 6+ years of experience building enterprise-grade Open
              Banking microservices, event-driven systems, and cloud-native platforms. Expertise
              in OAuth2.0/OIDC security, Kafka streaming, and financial-grade API compliance
              (FAPI/PSD2).
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              Proven track record at EQ Bank, CIBC, Rogers Communications, and Sobeys designing
              secure, scalable backend systems with Spring Boot, Spring Security, and Spring Cloud.
              I am passionate about event-driven architectures, CI/CD automation, and achieving
              95%+ API test coverage.
            </p>
            <p className="mt-4 leading-relaxed text-gray-300">
              When I am not coding, I explore cloud-native technologies, mentor developers, and
              stay current with emerging security standards in digital banking.
            </p>

            <div className="mt-8 space-y-3">
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-500">Education</h4>
              <Card>
                <p className="font-medium text-white">Masters in Electrical & Computer Engineering</p>
                <p className="text-sm text-gray-400">University of Windsor, Canada — April 2019</p>
              </Card>
              <Card>
                <p className="font-medium text-white">Bachelors in Electronics & Communications Engineering</p>
                <p className="text-sm text-gray-400">B.V. Raju Institute of Technology, Hyderabad — April 2016</p>
              </Card>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: 'Years in Tech', value: 6, suffix: '+' },
              { label: 'Projects Delivered', value: 25, suffix: '+' },
              { label: 'API Test Coverage', value: 95, suffix: '%' },
              { label: 'Java Experience', value: 8, suffix: '+ yrs' },
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