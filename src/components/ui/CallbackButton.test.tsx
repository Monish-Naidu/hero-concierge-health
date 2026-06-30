import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CallbackButton } from './CallbackButton';

describe('CallbackButton', () => {
  it('defaults to the "Contact Hero" label', () => {
    render(<CallbackButton />);
    expect(screen.getByRole('button', { name: 'Contact Hero' })).toBeInTheDocument();
  });

  it('accepts a custom label', () => {
    render(<CallbackButton label="Book a Visit" />);
    expect(screen.getByRole('button', { name: 'Book a Visit' })).toBeInTheDocument();
  });

  it('opens the contact modal when clicked (full UX flow)', async () => {
    render(<CallbackButton label="Become a Member" />);
    expect(screen.queryByText("Let's talk")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Become a Member' }));
    expect(await screen.findByText("Let's talk")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });

  it('closes the modal again via the close button', async () => {
    render(<CallbackButton />);
    await userEvent.click(screen.getByRole('button', { name: 'Contact Hero' }));
    await screen.findByText("Let's talk");
    await userEvent.click(screen.getByRole('button', { name: /close/i }));
    await waitFor(() => expect(screen.queryByText("Let's talk")).not.toBeInTheDocument());
  });
});
