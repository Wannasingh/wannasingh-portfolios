import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import HireMeClient from '@/components/hire-me-client';
import { supabase } from '@/app/lib/supabase';
import { sendEmail } from '@/lib/email';

jest.mock('@/lib/email', () => ({
  sendEmail: jest.fn()
}));

describe('HireMeClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (supabase.from as jest.Mock).mockImplementation(() => {
      return {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: null, error: null }),
        single: jest.fn().mockResolvedValue({ data: null, error: null })
      };
    });
    
    const { container } = render(<HireMeClient />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('renders profile and availability', async () => {
    const mockProfile = { email: 'test@example.com', bio_short: 'Custom bio', avatar_url: '/avatar.jpg', github_link: 'http://github', linkedin_link: 'http://linkedin' };
    const mockAvailability = [{ id: '1', item_text: 'Available for freelance' }];

    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'profile') {
        return {
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: mockProfile, error: null })
        };
      }
      return {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockAvailability, error: null })
      };
    });

    render(<HireMeClient />);

    await waitFor(() => {
      expect(screen.getByText('Let\'s Build Something Scalable')).toBeInTheDocument();
      expect(screen.getByText('Custom bio')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Available for freelance')).toBeInTheDocument();
    });
  });

  it('handles form submission', async () => {
    (supabase.from as jest.Mock).mockImplementation(() => {
      return {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [], error: null }),
        single: jest.fn().mockResolvedValue({ data: null, error: null })
      };
    });

    render(<HireMeClient />);

    await waitFor(() => {
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } });
    
    // Check checkbox
    const checkbox = screen.getByLabelText('I would like to request a copy of your resume');
    fireEvent.click(checkbox);
    
    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /Request Resume/i }));

    await waitFor(() => {
      expect(sendEmail).toHaveBeenCalledWith(
        { name: 'John Doe', email: 'john@example.com', message: 'Test message', isResumeRequest: true },
        expect.any(Function)
      );
    });
  });
});
