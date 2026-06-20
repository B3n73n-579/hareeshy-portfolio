import { lazy, Suspense } from 'react'
import Section from '@/components/ui/Section'
import AILabShowcase from '@/components/sections/AILabShowcase'

const SkillSphere3D = lazy(() => import('@/components/three/SkillSphere3D'))

export default function AILabPage() {
  return (
    <div className="pt-20">
      <div className="relative">
        <Suspense fallback={null}>
          <div className="pointer-events-none absolute inset-0 -z-10 h-[400px]">
            <SkillSphere3D />
          </div>
        </Suspense>
        <Section
          title="AI Lab"
          subtitle="Exploring the frontier of artificial intelligence and software engineering"
        >
          <div />
        </Section>
      </div>
      <AILabShowcase />
    </div>
  )
}