/**
 * Unit Test: UserAvatar Component
 * @module __tests__/unit/entities/user/UserAvatar
 * 
 * ✅ DIAMOND STANDARD: Unit Testing with Jest + RTL
 * 
 * Tests the UserAvatar entity component
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserAvatar } from '@/entities/user/ui/UserAvatar';

describe('UserAvatar Component', () => {
  describe('Display Logic', () => {
    it('should display user photo when photoURL is provided', () => {
      render(
        <UserAvatar
          displayName="John Doe"
          photoURL="https://example.com/photo.jpg"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('should display initials when no photoURL is provided', () => {
      render(<UserAvatar displayName="John Doe" />);
      
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should use email for initials when displayName is not provided', () => {
      render(<UserAvatar email="jane@example.com" />);
      
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should display fallback initial "U" when no name or email provided', () => {
      render(<UserAvatar />);
      
      expect(screen.getByText('U')).toBeInTheDocument();
    });

    it('should extract first character from displayName', () => {
      render(<UserAvatar displayName="Alice Smith" />);
      
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('should prioritize displayName over email for initials', () => {
      render(
        <UserAvatar
          displayName="Bob Johnson"
          email="alice@example.com"
        />
      );
      
      expect(screen.getByText('B')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size classes', () => {
      const { container } = render(
        <UserAvatar displayName="John" size="sm" />
      );
      
      const avatar = container.firstChild;
      expect(avatar).toHaveClass('w-8', 'h-8', 'text-sm');
    });

    it('should apply medium size classes by default', () => {
      const { container } = render(
        <UserAvatar displayName="John" />
      );
      
      const avatar = container.firstChild;
      expect(avatar).toHaveClass('w-10', 'h-10', 'text-base');
    });

    it('should apply large size classes', () => {
      const { container } = render(
        <UserAvatar displayName="John" size="lg" />
      );
      
      const avatar = container.firstChild;
      expect(avatar).toHaveClass('w-12', 'h-12', 'text-lg');
    });
  });

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      render(
        <UserAvatar
          displayName="John Doe"
          photoURL="https://example.com/photo.jpg"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'John Doe');
    });

    it('should use email as alt text when displayName not provided', () => {
      render(
        <UserAvatar
          email="john@example.com"
          photoURL="https://example.com/photo.jpg"
        />
      );
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'john@example.com');
    });

    it('should have default alt text when no user data provided', () => {
      render(<UserAvatar photoURL="https://example.com/photo.jpg" />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'User');
    });

    it('should have accessible text for screen readers with initials', () => {
      const { container } = render(<UserAvatar displayName="John Doe" />);
      
      // Avatar should be in the document
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('J')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should accept and apply custom className', () => {
      const { container } = render(
        <UserAvatar
          displayName="John"
          className="custom-avatar-class"
        />
      );
      
      expect(container.firstChild).toHaveClass('custom-avatar-class');
    });

    it('should merge custom className with size classes', () => {
      const { container } = render(
        <UserAvatar
          displayName="John"
          size="lg"
          className="border-4"
        />
      );
      
      const avatar = container.firstChild;
      expect(avatar).toHaveClass('w-12', 'h-12', 'border-4');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string displayName', () => {
      render(<UserAvatar displayName="" email="test@example.com" />);
      
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('should handle empty string email', () => {
      render(<UserAvatar displayName="" email="" />);
      
      expect(screen.getByText('U')).toBeInTheDocument();
    });

    it('should handle special characters in displayName', () => {
      render(<UserAvatar displayName="!@#$%^&*()" />);
      
      expect(screen.getByText('!')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      render(<UserAvatar displayName="日本語" />);
      
      expect(screen.getByText('日')).toBeInTheDocument();
    });
  });
});
