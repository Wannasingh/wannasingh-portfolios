import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PortfolioClient from '@/components/portfolio-client';
import { supabase } from '@/app/lib/supabase';

describe('PortfolioClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null })
    });
    
    const { container } = render(<PortfolioClient />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders projects when loaded', async () => {
    const mockProjects = [
      { id: '1', title: 'Test Project 1', tech_stack: ['React'], github_link: '#', demo_link: '#', created_at: '' }
    ];
    
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'projects') {
        return {
          select: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              order: jest.fn().mockResolvedValue({ data: mockProjects, error: null })
            })
          })
        };
      }
      return {
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { avatar_url: '/avatar.png' }, error: null })
      };
    });

    render(<PortfolioClient />);

    await waitFor(() => {
      expect(screen.getByText('Engineering Showcase')).toBeInTheDocument();
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });
  });

  it('renders empty state when no projects', async () => {
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'projects') {
        return {
          select: jest.fn().mockReturnValue({
            order: jest.fn().mockReturnValue({
              order: jest.fn().mockResolvedValue({ data: [], error: null })
            })
          })
        };
      }
      return {
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null })
      };
    });

    render(<PortfolioClient />);

    await waitFor(() => {
      expect(screen.getByText('No projects found.')).toBeInTheDocument();
    });
  });
});
