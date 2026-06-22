import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import FeaturedProjectsSection from '@/components/featured-projects-section';
import { supabase } from '@/app/lib/supabase';

describe('FeaturedProjectsSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue(new Promise(() => {})) // pending promise
    });
    
    const { container } = render(<FeaturedProjectsSection />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders projects from supabase', async () => {
    const mockProjects = [
      { id: '1', title: 'Test Project 1', category: 'Backend', problem: 'P1', solution: 'S1', impact: 'I1', tech_stack: ['React'], github_link: 'http://gh', demo_link: 'http://demo', created_at: '' }
    ];

    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: mockProjects, error: null })
    });

    render(<FeaturedProjectsSection />);

    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('P1')).toBeInTheDocument();
      expect(screen.getByText('S1')).toBeInTheDocument();
      expect(screen.getByText('I1')).toBeInTheDocument();
    });
  });

  it('renders fallback data after timeout or if data is empty', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({ data: [], error: null }) // empty data
    });

    render(<FeaturedProjectsSection />);

    await waitFor(() => {
      expect(screen.getByText('Enterprise HR System Migration')).toBeInTheDocument();
    });
  });

  it('uses fallback if API request takes longer than 5 seconds', () => {
    jest.useFakeTimers();
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnValue(new Promise(() => {}))
    });

    render(<FeaturedProjectsSection />);
    
    // Fast forward 5.1 seconds
    act(() => {
      jest.advanceTimersByTime(5100);
    });

    expect(screen.getByText('Enterprise HR System Migration')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
