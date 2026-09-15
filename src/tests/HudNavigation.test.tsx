import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HudNavigation } from '../components/HudNavigation';
import { soundFx } from '../utils/AudioEffects';

describe('Cybernetic HUD Navigation & Matrix', () => {
  it('renders non-standard HUD top bar elements matching inspiration', () => {
    render(<HudNavigation onRequestDemo={() => {}} />);
    
    // Check PROTOTYPE yellow pill badge
    expect(screen.getByText('PROTOTYPE')).toBeInTheDocument();

    // Check Counter Box [ 03 • 09 ]
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('09')).toBeInTheDocument();

    // Check brand and bio-tech subtitle
    expect(screen.getByText(/AGENTS & DEV WORKFLOWS/i)).toBeInTheDocument();

    // Check binary stream & ENDLESS CELLS telemetry
    expect(screen.getByText(/01010011/i)).toBeInTheDocument();
    expect(screen.getByText(/ENDLESS CELLS/i)).toBeInTheDocument();

    // Check Nav Matrix launcher button
    expect(screen.getByRole('button', { name: /Open Cybernetic Navigation Matrix/i })).toBeInTheDocument();
  });

  it('toggles audio synthesizer mute state when audio button is clicked', () => {
    render(<HudNavigation onRequestDemo={() => {}} />);
    const audioBtn = screen.getByRole('button', { name: /Sound/i });
    expect(audioBtn).toBeInTheDocument();

    const initialMuted = soundFx.getMuted();
    fireEvent.click(audioBtn);
    expect(soundFx.getMuted()).toBe(!initialMuted);

    // Restore state
    fireEvent.click(audioBtn);
    expect(soundFx.getMuted()).toBe(initialMuted);
  });

  it('opens fullscreen mecha nav matrix on button click and closes with close button', async () => {
    const mockRequestDemo = vi.fn();
    render(<HudNavigation onRequestDemo={mockRequestDemo} />);

    const navBtn = screen.getByRole('button', { name: /Open Cybernetic Navigation Matrix/i });
    fireEvent.click(navBtn);

    // Navigation Matrix modal should be open
    expect(screen.getByRole('dialog', { name: /Navigation Matrix/i })).toBeInTheDocument();
    expect(screen.getByText('SOLUTIONS')).toBeInTheDocument();
    expect(screen.getByText('ARCHITECTURE')).toBeInTheDocument();
    expect(screen.getByText('PARTNERS')).toBeInTheDocument();
    expect(screen.getByText('SYSTEM DIAGNOSTICS')).toBeInTheDocument();

    // Close button should close the modal
    const closeBtn = screen.getByRole('button', { name: /Close Navigation Matrix/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Navigation Matrix/i })).not.toBeInTheDocument();
    });
  });

  it('triggers onRequestDemo from within the nav matrix', async () => {
    const mockRequestDemo = vi.fn();
    render(<HudNavigation onRequestDemo={mockRequestDemo} />);

    // Open matrix
    fireEvent.click(screen.getByRole('button', { name: /Open Cybernetic Navigation Matrix/i }));

    // Click demo button in matrix
    const demoBtn = screen.getByRole('button', { name: /LAUNCH REQUEST DEMO/i });
    fireEvent.click(demoBtn);

    expect(mockRequestDemo).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Navigation Matrix/i })).not.toBeInTheDocument();
    });
  });
});
