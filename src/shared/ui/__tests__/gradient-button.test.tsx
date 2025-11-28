/**
 * @fileoverview Unit tests for GradientButton component
 * @module shared/ui/gradient-button
 *
 * ✅ DIAMOND STANDARD: Testing Layer
 *
 * Tests the GradientButton component for:
 * - Rendering with different variants
 * - Accessibility compliance (WCAG 2.2)
 * - Keyboard navigation
 * - Disabled states
 * - Polymorphic rendering (asChild)
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GradientButton } from '../gradient-button';

describe('GradientButton', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<GradientButton>Click Me</GradientButton>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with teal-blue gradient by default', () => {
      render(<GradientButton>Default</GradientButton>);
      const button = screen.getByRole('button', { name: /default/i });
      expect(button).toHaveClass('from-teal-600', 'to-blue-600');
    });

    it('renders with teal-cyan gradient variant', () => {
      render(<GradientButton gradient="teal-cyan">Cyan</GradientButton>);
      const button = screen.getByRole('button', { name: /cyan/i });
      expect(button).toHaveClass('from-teal-500', 'to-cyan-600');
    });

    it('renders with emerald-green gradient variant', () => {
      render(<GradientButton gradient="emerald-green">Green</GradientButton>);
      const button = screen.getByRole('button', { name: /green/i });
      expect(button).toHaveClass('from-emerald-500', 'to-green-600');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <GradientButton size="sm">Small</GradientButton>
      );
      let button = screen.getByRole('button', { name: /small/i });
      expect(button).toHaveClass('h-9');

      rerender(<GradientButton size="lg">Large</GradientButton>);
      button = screen.getByRole('button', { name: /large/i });
      expect(button).toHaveClass('h-11');

      rerender(<GradientButton size="xl">XLarge</GradientButton>);
      button = screen.getByRole('button', { name: /xlarge/i });
      expect(button).toHaveClass('h-14');
    });

    it('applies custom className', () => {
      render(<GradientButton className="custom-class">Custom</GradientButton>);
      const button = screen.getByRole('button', { name: /custom/i });
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<GradientButton>Accessible</GradientButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<GradientButton onClick={handleClick}>Keyboard</GradientButton>);

      const button = screen.getByRole('button', { name: /keyboard/i });
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has visible focus indicator', () => {
      render(<GradientButton>Focus</GradientButton>);
      const button = screen.getByRole('button', { name: /focus/i });
      expect(button).toHaveClass(
        'focus-visible:ring-2',
        'focus-visible:ring-teal-400'
      );
    });

    it('respects disabled state', () => {
      const handleClick = jest.fn();
      render(
        <GradientButton disabled onClick={handleClick}>
          Disabled
        </GradientButton>
      );
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        'disabled:opacity-50',
        'disabled:pointer-events-none'
      );
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<GradientButton onClick={handleClick}>Click</GradientButton>);

      const button = screen.getByRole('button', { name: /click/i });
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <GradientButton disabled onClick={handleClick}>
          Disabled
        </GradientButton>
      );

      const button = screen.getByRole('button', { name: /disabled/i });
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Polymorphic Rendering (asChild)', () => {
    it('renders as a child component when asChild is true', () => {
      render(
        <GradientButton asChild>
          <a href="/test">Link Button</a>
        </GradientButton>
      );
      const link = screen.getByRole('link', { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('from-teal-600', 'to-blue-600'); // Should have gradient classes
    });
  });

  describe('Shadow and Hover Effects', () => {
    it('has shadow classes', () => {
      render(<GradientButton>Shadow</GradientButton>);
      const button = screen.getByRole('button', { name: /shadow/i });
      expect(button).toHaveClass('shadow-md', 'hover:shadow-lg');
    });

    it('has hover gradient classes', () => {
      render(<GradientButton>Hover</GradientButton>);
      const button = screen.getByRole('button', { name: /hover/i });
      expect(button).toHaveClass('hover:from-teal-700', 'hover:to-blue-700');
    });
  });

  describe('Theme Integration', () => {
    it('uses theme-compatible gradient classes', () => {
      render(<GradientButton>Theme</GradientButton>);
      const button = screen.getByRole('button', { name: /theme/i });
      // Verify it uses Tailwind gradient classes that work with theme
      expect(button).toHaveClass('bg-gradient-to-r');
    });
  });
});
