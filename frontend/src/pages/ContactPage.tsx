import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import ContactSection from '@/components/sections/ContactSection'
import Card from '@/components/ui/Card'
import { SOCIAL, CONTACT } from '@/lib/constants'

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Section title="Contact Me" subtitle="Let us discuss your next project">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold text-white">Let us Build Something Great</h3>
            <p className="mt-4 leading-relaxed text-gray-400">
              I am always open to discussing new projects, creative ideas, or opportunities to be part
              of your vision. Feel free to reach out!
            </p>

            <div className="mt-8 space-y-4">
              <Card>
                <h4 className="font-heading text-sm font-semibold text-primary">Email</h4>
                <p className="mt-1 text-gray-400">{CONTACT.email}</p>
              </Card>
              <Card>
                <h4 className="font-heading text-sm font-semibold text-primary">Phone</h4>
                <p className="mt-1 text-gray-400">{CONTACT.phone}</p>
              </Card>
              <Card>
                <h4 className="font-heading text-sm font-semibold text-primary">Location</h4>
                <p className="mt-1 text-gray-400">{CONTACT.location}</p>
              </Card>
              <Card>
                <h4 className="font-heading text-sm font-semibold text-primary">Social</h4>
                <div className="mt-2 flex gap-4">
                  <a
                    href={SOCIAL.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactSection />
          </motion.div>
        </div>
      </Section>
    </div>
  )
}