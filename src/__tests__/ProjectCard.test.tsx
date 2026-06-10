import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/app/lib/supabase';

const mockProject: Project = {
  id: '1',
  title: 'My Project Title',
  overview: 'This is the project overview description.',
  image_path: '/images/test-project.jpg',
  tech_stack: ['React', 'TypeScript', 'Tailwind', 'Next.js'],
  key_features: ['Feature 1', 'Feature 2'],
  github_link: 'https://github.com/test/project',
  demo_link: 'https://demo.com/project',
  is_featured: false,
  created_at: '',
};

describe('ProjectCard Component', () => {
  it('renders project details correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('My Project Title')).toBeInTheDocument();
    expect(screen.getByText('This is the project overview description.')).toBeInTheDocument();
    
    // Tech stack tags
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // Key features
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();

    // Links
    const sourceLink = screen.getByText('View Source');
    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink.closest('a')).toHaveAttribute('href', 'https://github.com/test/project');

    const demoLink = screen.getByText('Live Demo');
    expect(demoLink).toBeInTheDocument();
    expect(demoLink.closest('a')).toHaveAttribute('href', 'https://demo.com/project');
  });

  it('hides inactive links', () => {
    const inactiveProject: Project = {
      ...mockProject,
      github_link: '#',
      demo_link: '',
    };
    render(<ProjectCard project={inactiveProject} />);

    expect(screen.queryByText('View Source')).not.toBeInTheDocument();
    expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  });

  it('renders click to expand overlay', () => {
    render(<ProjectCard project={mockProject} />);
    
    const expandTrigger = screen.getByText('Click to Expand');
    expect(expandTrigger).toBeInTheDocument();
  });
});
