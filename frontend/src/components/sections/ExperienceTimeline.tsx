import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE_DATA } from '@/lib/constants'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'

function TimelineEntry({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCE_DATA)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col gap-4 pb-16 md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="hidden md:block md:w-1/2" />
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-secondary to-transparent md:left-1/2" />
      <div className="absolute left-2 top-0 z-10 h-4 w-4 rounded-full border-2 border-primary bg-bg md:left-[calc(50%-8px)]" />

      <div className="relative ml-10 md:ml-0 md:w-1/2 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <span className="font-mono text-xs text-gray-500">
            {exp.startDate} — {exp.endDate || 'Present'}
          </span>
          <h3 className="mt-1 font-heading text-lg font-semibold text-white">{exp.role}</h3>
          <p className="font-heading text-sm text-primary">{exp.company}</p>
          <p className="mt-3 leading-relaxed text-gray-400">{exp.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <Badge key={tech} variant="primary">{tech}</Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceTimeline() {
  return (
    <Section id="experience" title="Experience" subtitle="My professional journey">
      <div className="relative">
        {EXPERIENCE_DATA.map((exp, i) => (
          <TimelineEntry key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </Section>
  )
}