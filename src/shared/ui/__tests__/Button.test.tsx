/**
 * Unit Test: Button Component
 * @module shared/ui/__tests__/Button
 * 
 * ✅ DIAMOND STANDARD: Unit Testing with Jest + RTL
 * 
 * Tests the shared Button component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../Button';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click Me</Button>);
    
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should accept custom className', () => {
    const { container } = render(<Button className="custom-class">Button</Button>);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support different types', () => {
    const { rerender } = render(<Button type="button">Button</Button>);
    
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    
    rerender(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should be keyboard accessible', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Button</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    expect(button).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('should have proper ARIA attributes when loading', () => {
    // If your Button supports a loading state
    render(<Button aria-busy="true" disabled>Loading...</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });
});
