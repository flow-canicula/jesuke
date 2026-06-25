import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Faq } from '@/components/sections/Faq';

describe('Faq', () => {
  it('renders the FAQ section heading', () => {
    render(<Faq />);
    // heading text is split across spans; query by id instead
    expect(document.getElementById('faq-heading')).toBeInTheDocument();
  });

  it('renders all FAQ questions as buttons', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('FAQ answers are not visible initially', () => {
    render(<Faq />);
    // First FAQ answer text should be present in DOM but collapsed (maxHeight:0)
    const firstButton = screen.getAllByRole('button')[0]!;
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands a FAQ item when clicked', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses FAQ item when clicked again', () => {
    render(<Faq />);
    const btn = screen.getAllByRole('button')[0]!;
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('only one item can be open at a time', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]!);
    fireEvent.click(buttons[1]!);
    const expandedButtons = buttons.filter((b) => b.getAttribute('aria-expanded') === 'true');
    expect(expandedButtons).toHaveLength(1);
  });

  it('each button has aria-controls pointing to its answer', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    for (const btn of buttons) {
      const controls = btn.getAttribute('aria-controls');
      expect(controls).toBeTruthy();
      expect(document.getElementById(controls!)).toBeInTheDocument();
    }
  });
});
