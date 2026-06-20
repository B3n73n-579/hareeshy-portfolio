import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, beforeEach } from 'vitest'
import Header from '../Header'
import { NAV_ITEMS } from '@/lib/constants'

function renderHeader(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
    </MemoryRouter>
  )
}

describe('Header', () => {
  beforeEach(() => {
    window.scrollTo = () => {}
  })

  it('renders logo', () => {
    renderHeader()
    const logoLink = screen.getByRole('link', { name: /hareesh y/i })
    expect(logoLink).toBeInTheDocument()
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders all navigation links', () => {
    renderHeader()
    const navLinks = screen.getAllByRole('link')
    const linkTexts = navLinks.map((l) => l.textContent).filter(Boolean)
    for (const item of NAV_ITEMS) {
      expect(linkTexts).toContain(item.label)
    }
  })

  it('navigation links have correct hrefs', () => {
    renderHeader()
    for (const item of NAV_ITEMS) {
      const link = screen.getByText(item.label).closest('a')
      expect(link).toHaveAttribute('href', item.path)
    }
  })

  it('shows mobile menu toggle button on small viewport', () => {
    renderHeader()
    const toggleButton = screen.getByLabelText('Toggle menu')
    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton.className).toContain('md:hidden')
  })
})
