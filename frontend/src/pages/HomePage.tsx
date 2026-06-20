import { lazy, Suspense } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsRadar from '@/components/sections/SkillsRadar'
import ProjectsShowcase from '@/components/sections/ProjectsShowcase'
import ExperienceTimeline from '@/components/sections/ExperienceTimeline'
import BlogPreview from '@/components/sections/BlogPreview'
import ContactSection from '@/components/sections/ContactSection'
import ParticleField from '@/components/ui/ParticleField'
import { useThemeStore } from '@/stores/theme'

const ParticleBackground = lazy(() => import('@/components/three/ParticleBackground'))

export default function HomePage() {
  const { isMobile } = useThemeStore()

  return (
    <>
      <ParticleField />
      <Suspense fallback={null}>
        <ParticleBackground mobile={isMobile} />
      </Suspense>
      <HeroSection />
      <AboutSection />
      <SkillsRadar />
      <ProjectsShowcase />
      <ExperienceTimeline />
      <BlogPreview />
      <ContactSection />
    </>
  )
}