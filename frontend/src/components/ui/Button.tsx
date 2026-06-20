import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-bg hover:brightness-110 shadow-lg shadow-primary/25',
  secondary: 'bg-secondary text-white hover:brightness-110 shadow-lg shadow-secondary/25',
  outline: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'text-gray-300 hover:text-primary hover:bg-white/5',
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  to?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', to, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-heading font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`

    if (to) {
      return (
        <Link to={to} className={classes}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${classes} transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]`}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export default Button