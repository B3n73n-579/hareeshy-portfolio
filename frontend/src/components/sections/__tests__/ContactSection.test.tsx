import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import ContactSection from '../ContactSection'

function renderContact() {
  return render(
    <MemoryRouter>
      <ContactSection />
    </MemoryRouter>
  )
}

describe('ContactSection', () => {
  it('renders section title and subtitle', () => {
    renderContact()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText(/have a project or opportunity/i)).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderContact()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderContact()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    renderContact()
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Subject is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
  })

  it('shows success message after valid submission', async () => {
    renderContact()
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Subject'), 'Hello')
    await userEvent.type(screen.getByLabelText('Message'), 'This is a test message')
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(screen.getByText('Message Sent!')).toBeInTheDocument()
    expect(screen.getByText(/will get back to you soon/i)).toBeInTheDocument()
  })

  it('shows invalid email validation', async () => {
    renderContact()
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'bademail' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Hello' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } })
    const form = screen.getByRole('button', { name: /send message/i }).closest('form')!
    fireEvent.submit(form)
    expect(await screen.findByText('Invalid email')).toBeInTheDocument()
  })
})
