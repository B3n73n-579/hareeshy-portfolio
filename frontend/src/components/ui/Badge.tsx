import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'skill'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'border border-white/10 bg-white/5 text-gray-300',
    primary: 'border-primary/30 bg-primary/10 text-primary',
    skill: 'border-secondary/30 bg-secondary/10 text-secondary',
  }

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}