import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import HomePage from '../HomePage'

vi.mock('@/components/three/ParticleBackground', () => ({
  default: () => null,
}))

vi.mock('@/components/ui/ParticleField', () => ({
  default: () => null,
}))

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { container } = renderHome()
    expect(container).toBeTruthy()
  })

  it('contains hero section with name', () => {
    renderHome()
    expect(screen.getByText('Hareesh Y')).toBeInTheDocument()
  })

  it('renders senior java developer role', () => {
    renderHome()
    expect(screen.getAllByText('Senior Java Developer').length).toBeGreaterThan(0)
  })

  it('renders section titles', () => {
    renderHome()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })
})
