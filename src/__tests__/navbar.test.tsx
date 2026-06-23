import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from '@/components/navbar';

// Mock matchMedia for mobile
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByText('wannasingh')).toBeInTheDocument();
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Portfolio')[0]).toBeInTheDocument();
  });

  it('handles scroll events to change background', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    
    expect(header).toHaveClass('bg-transparent');
    
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    expect(header).toHaveClass('bg-background/90');
    
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    
    expect(header).toHaveClass('bg-transparent');
  });

  it('toggles mobile menu', async () => {
    render(<Header />);
    
    // It's hidden initially, but we can find the button
    const buttons = screen.getAllByRole('button');
    // Mode toggle and menu toggle
    const menuButton = buttons[buttons.length - 1]; // usually the last button is the menu toggle
    
    fireEvent.click(menuButton);
    
    // We should see mobile links now
    await waitFor(() => {
      const mobileLinks = screen.getAllByText('Home');
      expect(mobileLinks.length).toBeGreaterThan(1);
    });
    
    // Click a link to close
    const mobileHomeLink = screen.getAllByText('Home')[1];
    fireEvent.click(mobileHomeLink);
    
    // Verify menu closes (AnimatePresence handles the unmounting, so we might need to wait)
  });
});
