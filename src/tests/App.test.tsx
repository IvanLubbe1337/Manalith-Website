import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('MANALITH Landing Page Rendering & Integrity', () => {
  it('renders the MANALITH brand logo in navbar and footer', () => {
    render(<App />);
    const brandElements = screen.getAllByText('MANALITH');
    expect(brandElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the hero headline and subtitle accurately matching screenshot', () => {
    render(<App />);
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.textContent).toContain('ENGINEERING');
    expect(mainHeading.textContent).toContain('INNOVATION');

    expect(
      screen.getByText(
        /MANALITH delivers bespoke AI integrations, autonomous agent hosting, second-brain knowledge systems, and modern software development/i
      )
    ).toBeInTheDocument();
  });

  it('renders the primary and secondary CTA buttons in the hero', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /DISCOVER SOLUTIONS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /EXPLORE OUR PLATFORM/i })).toBeInTheDocument();
  });

  it('renders all three core solution cards matching the screenshot', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /AI Integrations & Workflows/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Autonomous Agent Hosting/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Second Brain & Dev Projects/i })).toBeInTheDocument();
  });

  it('renders all 4 pipeline steps in the HOW WE BUILD section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /HOW WE BUILD/i })).toBeInTheDocument();
    expect(screen.getAllByText('Workflow Audit').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Second Brain').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Agent Hosting').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Software Dev').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the TRUSTED BY section and enterprise partners', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /TRUSTED BY/i })).toBeInTheDocument();
  });

  it('renders the JOIN US section and Career CTA', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /JOIN US/i })).toBeInTheDocument();
    const careerLinks = screen.getAllByRole('link', { name: /Career/i });
    expect(careerLinks.length).toBeGreaterThanOrEqual(1);
  });
});
