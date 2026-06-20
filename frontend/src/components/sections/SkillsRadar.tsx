import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import { SKILLS_DATA } from '@/lib/constants'

const categoryColors: Record<string, 'primary' | 'skill' | 'default'> = {
  'Java/Spring': 'primary',
  Cloud: 'skill',
  Data: 'default',
  DevOps: 'primary',
  'AI/ML': 'skill',
  Frontend: 'default',
}

const categories = [...new Set(SKILLS_DATA.map((s) => s.category))]

export default function SkillsRadar() {
  return (
    <Section id="skills" title="Skills & Expertise" subtitle="Technologies I work with daily">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, ci) => (
          <motion.div
            key={category}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <h3 className="mb-4 font-heading text-lg font-semibold text-white">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS_DATA.filter((s) => s.category === category).map((skill) => (
                <div key={skill.name} className="group relative">
                  <Badge variant={categoryColors[category] || 'default'}>{skill.name}</Badge>
                  <div className="pointer-events-none absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 translate-y-full opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-lg bg-surface px-3 py-1.5 text-xs text-gray-300 shadow-xl">
                      {skill.proficiency}% proficiency
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF]"
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.round(SKILLS_DATA.filter((s) => s.category === category).reduce((a, s) => a + s.proficiency, 0) / SKILLS_DATA.filter((s) => s.category === category).length)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: ci * 0.15 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}