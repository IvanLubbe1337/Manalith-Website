import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RequestDemoModal } from '../components/RequestDemoModal';

describe('RequestDemoModal Interactivity & Accessibility', () => {
  it('does not render when isOpen is false', () => {
    render(<RequestDemoModal isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with form inputs when isOpen is true', () => {
    render(<RequestDemoModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Alex Mercer/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/alex@enterprise\.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /INITIALIZE DEMO PROTOCOL/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<RequestDemoModal isOpen={true} onClose={handleClose} />);
    const closeBtn = screen.getByLabelText(/close dialog/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<RequestDemoModal isOpen={true} onClose={handleClose} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
