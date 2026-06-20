import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Button from '../Button'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Button', () => {
  it('renders with default variant classes', () => {
    renderWithRouter(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
    expect(btn.className).toContain('bg-primary')
    expect(btn.className).toContain('text-bg')
  })

  it('renders with secondary variant classes', () => {
    renderWithRouter(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button', { name: /secondary/i })
    expect(btn.className).toContain('bg-secondary')
    expect(btn.className).toContain('text-white')
  })

  it('renders with outline variant classes', () => {
    renderWithRouter(<Button variant="outline">Outline</Button>)
    const btn = screen.getByRole('button', { name: /outline/i })
    expect(btn.className).toContain('border')
    expect(btn.className).toContain('border-primary')
  })

  it('renders with ghost variant classes', () => {
    renderWithRouter(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button', { name: /ghost/i })
    expect(btn.className).toContain('text-gray-300')
  })

  it('renders as link when to prop is provided', () => {
    renderWithRouter(<Button to="/test">Link Button</Button>)
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn()
    renderWithRouter(<Button onClick={handleClick}>Clickable</Button>)
    const btn = screen.getByRole('button', { name: /clickable/i })
    await userEvent.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    renderWithRouter(<Button className="custom-class">Styled</Button>)
    const btn = screen.getByRole('button', { name: /styled/i })
    expect(btn.className).toContain('custom-class')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<MemoryRouter><Button size="sm">Small</Button></MemoryRouter>)
    let btn = screen.getByRole('button', { name: /small/i })
    expect(btn.className).toContain('px-4')
    expect(btn.className).toContain('py-2')
    expect(btn.className).toContain('text-sm')

    rerender(<MemoryRouter><Button size="lg">Large</Button></MemoryRouter>)
    btn = screen.getByRole('button', { name: /large/i })
    expect(btn.className).toContain('px-8')
    expect(btn.className).toContain('py-4')
    expect(btn.className).toContain('text-lg')
  })
})
