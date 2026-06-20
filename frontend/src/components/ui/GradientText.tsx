import type { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
  className?: string
}

export default function GradientText({ children, as: Tag = 'span', className = '' }: GradientTextProps) {
  return (
    <Tag className={`bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] bg-clip-text text-transparent ${className}`}>
      {children}
    </Tag>
  )
}