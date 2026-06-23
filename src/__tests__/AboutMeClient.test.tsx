import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AboutMeClient from '@/components/AboutMeClient';
import { supabase } from '@/app/lib/api-client';

jest.mock('@/app/lib/api-client', () => ({
  supabase: {
    from: jest.fn()
  }
}));
// Mock values
const mockProfile = {
  tagline: "Custom Test Tagline",
  bio_short: "Custom Bio Short",
  avatar_url: "/custom-avatar.jpg",
  about_philosophy_title: "Heavy Lifting Philosophy",
  about_philosophy_content: "Logic content details",
  about_evolution_title: "Evolution Title",
  about_evolution_subtitle: "Evolution Subtitle",
  about_analogy_center_title: "Center Analogy Title",
  about_analogy_title_left: "Left Analogy Title",
  about_analogy_desc_left: "Left Analogy Desc",
  about_analogy_title_right: "Right Analogy Title",
  about_analogy_desc_right: "Right Analogy Desc",
  about_analogy_label_left: "Left Slogan",
  about_analogy_label_right: "Right Slogan",
  about_analogy_label_center: "Center Slogan",
};

const mockExperiences = [
  { id: '1', period: '2020 - 2022', title: 'DBA', description: 'DB stuff', display_order: 1 },
  { id: '', period: '2022 - 2024', title: 'Frontend Dev', description: 'React stuff', display_order: 2 }, // Empty string id covers fallback key branch
  { id: '3', period: '2024 - Present', title: 'Fullstack Dev', description: 'Everything stuff', display_order: 3 },
];

describe('AboutMeClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup the mock returns
    const fromSpy = supabase.from as jest.Mock;
    fromSpy.mockImplementation((table: string) => {
      if (table === 'experiences') {
        return {
          select: jest.fn().mockReturnThis(),
          order: jest.fn().mockResolvedValue({ data: mockExperiences, error: null }),
        };
      }
      if (table === 'profile') {
        return {
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }),
        };
      }
      return {
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      };
    });
  });

  it('renders profile and experiences successfully', async () => {
    render(<AboutMeClient />);
    
    // Wait for the data loading to finish
    await waitFor(() => {
      expect(screen.getByText('Custom Test Tagline')).toBeInTheDocument();
    });

    expect(screen.getByText('Custom Bio Short')).toBeInTheDocument();
    expect(screen.getAllByText('DBA')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Frontend Dev')[0]).toBeInTheDocument();
  });

  it('handles mouse hover events on Data and UI cards', async () => {
    render(<AboutMeClient />);
    await waitFor(() => {
      expect(screen.getByText('Custom Test Tagline')).toBeInTheDocument();
    });

    const leftCard = screen.getByLabelText('View Solid Data details');
    const rightCard = screen.getByLabelText('View Fluid UI details');

    // Default slogan
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Hover Left (Data) card
    fireEvent.mouseEnter(leftCard);
    expect(screen.getByText('Left Slogan')).toBeInTheDocument();

    // Leave Left card
    fireEvent.mouseLeave(leftCard);
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Hover Right (UI) card
    fireEvent.mouseEnter(rightCard);
    expect(screen.getByText('Right Slogan')).toBeInTheDocument();

    // Leave Right card
    fireEvent.mouseLeave(rightCard);
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();
  });

  it('handles focus/blur and keyboard Enter/Space on Data and UI cards', async () => {
    render(<AboutMeClient />);
    await waitFor(() => {
      expect(screen.getByText('Custom Test Tagline')).toBeInTheDocument();
    });

    const leftCard = screen.getByLabelText('View Solid Data details');
    const rightCard = screen.getByLabelText('View Fluid UI details');

    // Focus Left Card
    fireEvent.focus(leftCard);
    expect(screen.getByText('Left Slogan')).toBeInTheDocument();

    // Blur Left Card
    fireEvent.blur(leftCard);
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Press Enter to toggle
    fireEvent.keyDown(leftCard, { key: 'Enter' });
    expect(screen.getByText('Left Slogan')).toBeInTheDocument();

    // Press Space to toggle off
    fireEvent.keyDown(leftCard, { key: ' ' });
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Press Escape on left card to cover false key condition
    fireEvent.keyDown(leftCard, { key: 'Escape' });
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Focus Right Card
    fireEvent.focus(rightCard);
    expect(screen.getByText('Right Slogan')).toBeInTheDocument();

    // Blur Right Card
    fireEvent.blur(rightCard);
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Press Enter to toggle
    fireEvent.keyDown(rightCard, { key: 'Enter' });
    expect(screen.getByText('Right Slogan')).toBeInTheDocument();

    // Press Space to toggle off
    fireEvent.keyDown(rightCard, { key: ' ' });
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();

    // Press random key to ensure no state change
    fireEvent.keyDown(rightCard, { key: 'Escape' });
    expect(screen.getByText('Center Slogan')).toBeInTheDocument();
  });

  it('handles loading error or empty data cases gracefully', async () => {
    // Setup supabase to return null/error data
    const fromSpy = supabase.from as jest.Mock;
    fromSpy.mockImplementation(() => {
      return {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: new Error('exp error') }),
        single: jest.fn().mockResolvedValue({ data: null, error: new Error('profile error') }),
      };
    });

    render(<AboutMeClient />);
    
    // Wait for the loading to finish
    await waitFor(() => {
      expect(screen.getByText('From The Engine Room To The Controls')).toBeInTheDocument();
    });

    // Verify it uses default static values when profile is null
    expect(screen.getByText('The Perfect Balance')).toBeInTheDocument();
    expect(screen.getByText('Most developers learn frameworks first. I learned data first. This foundation shapes everything I build today.')).toBeInTheDocument();

    // Hover cards when profile is null to trigger slogan fallback branch coverage
    const leftCard = screen.getByLabelText('View Solid Data details');
    const rightCard = screen.getByLabelText('View Fluid UI details');

    fireEvent.mouseEnter(leftCard);
    expect(screen.getByText('Robust Infrastructure')).toBeInTheDocument();

    fireEvent.mouseEnter(rightCard);
    expect(screen.getByText('Stunning Experience')).toBeInTheDocument();
  });
});
