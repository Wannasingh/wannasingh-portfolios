import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AboutMeClient from '@/components/AboutMeClient';
import { db } from '@/app/lib/api-client';

jest.mock('@/app/lib/api-client', () => ({
  db: {
    from: jest.fn()
  }
}));

const mockProfile = {
  name: "Custom Test Name",
  role: "Custom Test Role",
  bio_short: "Custom Bio Short",
  avatar_url: "/custom-avatar.jpg",
  email: "test@example.com",
  github_link: "https://github.com/test",
  linkedin_link: "https://linkedin.com/in/test"
};

const mockExperiences = [
  { id: '1', period: '2020 - 2022', title: 'DBA', description: 'DB stuff', type: 'work', display_order: 1 },
  { id: '2', period: '2022 - 2024', title: 'Frontend Dev', description: 'React stuff', type: 'work', display_order: 2 },
  { id: '3', period: '2020 - 2024', title: 'University Degree', description: 'English stuff', type: 'education', display_order: 3 },
];

describe('AboutMeClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup the mock returns
    const fromSpy = db.from as jest.Mock;
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
      expect(screen.getByText('Custom Test Name')).toBeInTheDocument();
    });

    expect(screen.getByText('Custom Test Role')).toBeInTheDocument();
    expect(screen.getByText('Custom Bio Short')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('github.com/test')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/test')).toBeInTheDocument();
    expect(screen.getAllByText('DBA')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Frontend Dev')[0]).toBeInTheDocument();
    expect(screen.getAllByText('University Degree')[0]).toBeInTheDocument();
  });

  it('handles loading error or empty data cases gracefully', async () => {
    // Setup supabase to return null/error data
    const fromSpy = db.from as jest.Mock;
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
      expect(screen.getByText('wannasingh')).toBeInTheDocument();
    });

    // Verify it uses default static values when profile is null
    expect(screen.getByText('developer & dba')).toBeInTheDocument();
    expect(screen.getByText('I work across databases and full-stack software, translating business logic into fast, secure, and performant web applications. My approach focuses on query efficiency, structural consistency, and clean systems architecture.')).toBeInTheDocument();
    
    // Check fallback education & work details
    expect(screen.getByText('B.A. in International Business English')).toBeInTheDocument();
    expect(screen.getByText('Lead DBA & Architect')).toBeInTheDocument();
  });
});
