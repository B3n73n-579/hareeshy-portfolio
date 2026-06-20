import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-xs text-gray-500">Scroll</span>
      <div className="flex h-8 w-5 items-start justify-center rounded-full border border-gray-500 p-1">
        <motion.div
          className="h-2 w-1 rounded-full bg-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}