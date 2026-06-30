import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturedServices } from './featured-services';
import type { ServiceCardType } from '@/api/types';

const services = [
  {
    name: 'Hormone Optimization',
    description: 'Restore balance for men and women.',
    pointsTitle: 'Benefits',
    points: ['Increased energy', 'Better mood', 'Personalized monitoring', 'Hidden fourth'],
    ctaText: 'Explore Hormone Solutions',
    image: '/image/services/hormone-optimization/increased-energy-and-stamina.webp',
    link: '/services/hormone-optimization',
  },
  {
    name: 'Aesthetics & Botox',
    description: 'Refreshed, natural look for everyone.',
    pointsTitle: 'Benefits',
    points: ['Natural results', 'Confidence', 'Discreet care'],
    ctaText: 'Discover Aesthetics & Botox',
    image: '/image/services/aesthetics/natural-results.webp',
    link: '/services/aesthetics',
  },
] as unknown as ServiceCardType[];

describe('FeaturedServices card grid', () => {
  it('renders the section heading', () => {
    render(<FeaturedServices title="Featured Services" content={services} />);
    expect(screen.getByRole('heading', { name: /featured services/i })).toBeInTheDocument();
  });

  it('renders one card per service with name, description, image and CTA', () => {
    render(<FeaturedServices title="Featured Services" content={services} />);

    for (const s of services) {
      const heading = screen.getByRole('heading', { name: s.name });
      expect(heading).toBeInTheDocument();
      expect(screen.getByText(s.description as string)).toBeInTheDocument();
      // CTA link points at the service page
      const cta = screen.getByRole('link', { name: new RegExp(s.ctaText as string, 'i') });
      expect(cta).toHaveAttribute('href', s.link);
      // image is rendered with the curated src + descriptive alt
      const img = screen.getByAltText(s.name) as HTMLImageElement;
      expect(img.getAttribute('src')).toBe(s.image);
    }
  });

  it('shows at most 3 benefit bullets per card', () => {
    render(<FeaturedServices title="Featured Services" content={services} />);
    // The first service has 4 points but the card caps at 3.
    expect(screen.getByText('Increased energy')).toBeInTheDocument();
    expect(screen.getByText('Personalized monitoring')).toBeInTheDocument();
    expect(screen.queryByText('Hidden fourth')).not.toBeInTheDocument();
  });

  it('renders no cards when given an empty list (no crash)', () => {
    render(<FeaturedServices title="Featured Services" content={[]} />);
    expect(screen.getByRole('heading', { name: /featured services/i })).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
