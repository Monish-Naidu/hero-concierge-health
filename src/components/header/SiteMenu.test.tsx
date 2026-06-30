import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteMenu } from './SiteMenu';
import type { ServiceCardType } from '@/api/types';

const services = [
  { name: 'Hormone Optimization', link: '/services/hormone-optimization' },
  { name: 'Weight Optimization', link: '/services/weight-optimization' },
  { name: 'Aesthetics & Botox', link: '/services/aesthetics' },
] as unknown as ServiceCardType[];

function renderMenu() {
  return render(<SiteMenu services={services} />);
}

describe('SiteMenu', () => {
  it('is closed by default', () => {
    renderMenu();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    expect(screen.queryByText('Explore')).not.toBeInTheDocument();
  });

  it('opens the panel through a portal to document.body', async () => {
    const { container } = renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const explore = await screen.findByText('Explore');
    expect(document.body).toContainElement(explore);
    // the overlay is portaled, not rendered inside the component's own node
    expect(container.querySelector('.fixed')).toBeNull();
  });

  it('renders the primary nav links with correct hrefs (Home → "/")', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(await screen.findByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'How It Works' })).toHaveAttribute(
      'href',
      '/how-it-works'
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Membership' })).toHaveAttribute(
      'href',
      '/membership'
    );
    expect(screen.getByRole('link', { name: 'The Clinic' })).toHaveAttribute('href', '/clinic');
  });

  it('lists the services passed in', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(await screen.findByRole('link', { name: 'Hormone Optimization' })).toHaveAttribute(
      'href',
      '/services/hormone-optimization'
    );
    expect(screen.getByRole('link', { name: 'Aesthetics & Botox' })).toBeInTheDocument();
  });

  it('closes when the close button is clicked', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    await screen.findByText('Explore');
    await userEvent.click(screen.getByRole('button', { name: /close menu/i }));
    await waitFor(() => expect(screen.queryByText('Explore')).not.toBeInTheDocument());
  });

  it('closes when Escape is pressed', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    await screen.findByText('Explore');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Explore')).not.toBeInTheDocument());
  });

  it('closes when a nav link is tapped', async () => {
    renderMenu();
    await userEvent.click(screen.getByRole('button', { name: /open menu/i }));
    await userEvent.click(await screen.findByRole('link', { name: 'About' }));
    await waitFor(() => expect(screen.queryByText('Explore')).not.toBeInTheDocument());
  });
});
