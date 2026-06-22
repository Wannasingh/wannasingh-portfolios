import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Footer from '@/components/footer';
import { supabase } from '@/app/lib/supabase';

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default links', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: new Error('not found') })
    });

    render(<Footer />);
    
    expect(screen.getByText('wannasingh')).toBeInTheDocument();
    expect(screen.getByText('Built with Next.js · Deployed on Vercel')).toBeInTheDocument();
  });

  it('fetches and sets social links from supabase', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: {
          github_link: 'https://github.com/custom',
          linkedin_link: 'https://linkedin.com/custom',
          twitter_link: 'https://twitter.com/custom'
        },
        error: null
      })
    });

    render(<Footer />);

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      const githubLink = links.find(l => l.getAttribute('href') === 'https://github.com/custom');
      expect(githubLink).toBeInTheDocument();
    });
  });
});
