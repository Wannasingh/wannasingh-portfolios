import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import TechStackSection from '@/components/tech-stack-section';
import { supabase } from '@/app/lib/supabase';

describe('TechStackSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue(new Promise(() => {}))
    });
    
    const { container } = render(<TechStackSection />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders categories from supabase', async () => {
    const mockCategories = [
      {
        id: '1', name: 'Custom Category', icon_name: 'Database', display_order: 1,
        skills: [{ id: '1', name: 'Custom Skill', icon_key: 'SiOracle', display_order: 1 }]
      }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockCategories, error: null })
    });

    render(<TechStackSection />);

    await waitFor(() => {
      expect(screen.getByText('Custom Category')).toBeInTheDocument();
      expect(screen.getByText('Custom Skill')).toBeInTheDocument();
    });
  });

  it('renders fallback data after timeout or empty data', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null })
    });

    render(<TechStackSection />);

    await waitFor(() => {
      expect(screen.getByText('Database & Oracle')).toBeInTheDocument();
      expect(screen.getByText('Oracle 21c')).toBeInTheDocument();
    });
  });

  it('uses fallback if API request takes longer than 5 seconds', () => {
    jest.useFakeTimers();
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnValue(new Promise(() => {}))
    });

    render(<TechStackSection />);
    
    act(() => {
      jest.advanceTimersByTime(5100);
    });

    expect(screen.getByText('Database & Oracle')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
