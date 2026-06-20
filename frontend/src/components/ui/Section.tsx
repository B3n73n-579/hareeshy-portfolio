import { type ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  id?: string
  action?: ReactNode
}

export default function Section({ title, subtitle, children, className = '', id }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id={id} className={`py-24 ${className}`} ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {(title || subtitle) && (
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {title && <h2 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl">{title}</h2>}
            {subtitle && <p className="mx-auto max-w-2xl text-lg text-gray-400">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}