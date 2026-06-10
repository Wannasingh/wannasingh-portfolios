import React from 'react';
import { render, screen } from '@testing-library/react';
import TestimonialsSection from '@/components/testimonials-section';

describe('TestimonialsSection Component', () => {
  it('renders correctly', () => {
    render(<TestimonialsSection />);

    // Check header
    expect(screen.getByText(/Project Highlights/i)).toBeInTheDocument();

    // Check project/testimonial cards
    expect(screen.getByText('E-commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Task Management App')).toBeInTheDocument();
    expect(screen.getByText('Personal Blog')).toBeInTheDocument();

    // Check specific technologies and descriptions
    expect(screen.getByText('React, Node.js, MongoDB, Stripe')).toBeInTheDocument();
    expect(screen.getByText(/Built a responsive e-commerce site/i)).toBeInTheDocument();

    // Check bottom bio message
    expect(screen.getByText(/As a new full stack developer, I'm passionate about creating/i)).toBeInTheDocument();
  });
});
