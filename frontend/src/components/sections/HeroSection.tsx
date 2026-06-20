import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '@/lib/constants'
import GradientText from '@/components/ui/GradientText'
import Button from '@/components/ui/Button'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <motion.div className="z-10 max-w-4xl text-center" variants={container} initial="hidden" animate="show">
        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm tracking-widest uppercase text-primary"
        >
          {SITE.role}
        </motion.p>
        <motion.h1 variants={item} className="mb-6 font-heading text-6xl font-bold md:text-8xl">
          <GradientText as="span">{SITE.name}</GradientText>
        </motion.h1>
        <motion.p variants={item} className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
          {SITE.tagline}
        </motion.p>
        <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
          <Link to="/projects">
            <Button variant="primary" size="lg">View Projects</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">Contact Me</Button>
          </Link>
          <a href="#" download>
            <Button variant="ghost" size="lg">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </Button>
          </a>
        </motion.div>
        <motion.div variants={item} className="mt-20">
          <ScrollIndicator />
        </motion.div>
      </motion.div>
    </section>
  )
}