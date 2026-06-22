import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynamicHeading } from '@/components/DynamicHeading';

describe('DynamicHeading Component', () => {
  it('renders default title when no props are provided', () => {
    render(<DynamicHeading />);
    expect(screen.getByText('Wannasingh Khansophon')).toBeInTheDocument();
  });

  it('renders customTitle when provided', () => {
    render(<DynamicHeading customTitle="My Custom Title" />);
    expect(screen.getByText('My Custom Title')).toBeInTheDocument();
  });

  it('renders correct title for about pageType', () => {
    render(<DynamicHeading pageType="about" />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders correct title for hire-me pageType', () => {
    render(<DynamicHeading pageType="hire-me" />);
    expect(screen.getByText('Work With Me')).toBeInTheDocument();
  });

  it('renders correct title for portfolio pageType', () => {
    render(<DynamicHeading pageType="portfolio" />);
    expect(screen.getByText('My Portfolio')).toBeInTheDocument();
  });
  
  it('renders default title for unknown pageType', () => {
    render(<DynamicHeading pageType={"unknown" as any} />);
    expect(screen.getByText('Wannasingh Khansophon')).toBeInTheDocument();
  });
});
