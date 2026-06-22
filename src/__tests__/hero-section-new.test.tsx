import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeroSectionNew from '@/components/hero-section-new';
import { supabase } from '@/app/lib/supabase';

describe('HeroSectionNew Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null })
    });
    
    render(<HeroSectionNew />);
    // Initial render might show loading or fallback depending on implementation.
    // The implementation shows loader for avatar if not loaded.
    expect(screen.getAllByText(/Wannasingh/i)[0]).toBeInTheDocument();
  });

  it('renders profile data when loaded', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ 
        data: { 
          name: 'Custom Name', 
          role: 'Custom Role', 
          bio_short: 'Custom Bio',
          avatar_url: '/custom-avatar.jpg'
        }, 
        error: null 
      })
    });

    render(<HeroSectionNew />);

    await waitFor(() => {
      expect(screen.getAllByText(/Custom/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Name/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Custom Role/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Custom Bio/)[0]).toBeInTheDocument();
    });
  });

  it('renders fallback data when profile is empty or errors', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: new Error('Failed to load') })
    });

    render(<HeroSectionNew />);

    await waitFor(() => {
      expect(screen.getAllByText(/Wannasingh/i)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Full Stack Developer/i)[0]).toBeInTheDocument();
    });
  });
});
