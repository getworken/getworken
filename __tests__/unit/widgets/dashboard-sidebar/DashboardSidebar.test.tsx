/**
 * Unit Tests: DashboardSidebar
 * @module __tests__/unit/widgets/dashboard-sidebar/DashboardSidebar
 * 
 * ✅ DIAMOND STANDARD: Jest Unit Testing
 * 
 * Tests the DashboardSidebar widget component per Diamond Standard requirements.
 * Covers display logic, navigation, active states, account menu, and accessibility.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardSidebar } from '@/widgets/dashboard-sidebar/DashboardSidebar';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => {
    const translations: Record<string, Record<string, string>> = {
      common: {
        appName: 'GetWorken',
      },
      dashboard: {
        clientDashboard: 'Client Dashboard',
        overview: 'Overview',
        profile: 'Profile',
        directory: 'Directory',
        team: 'Team',
        chat: 'Chat',
        accountSettings: 'Account Settings',
      },
      auth: {
        signOut: 'Sign Out',
      },
    };
    return (key: string) => translations[namespace]?.[key] || key;
  },
}));

// Mock @/i18n/routing
jest.mock('@/i18n/routing', () => ({
  usePathname: jest.fn(() => '/dashboard'),
  Link: ({ children, href, className, ...props }: any) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

// Mock AuthProvider
jest.mock('@/app/_providers/AuthProvider', () => ({
  useAuth: jest.fn(() => ({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    },
    userData: {
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: null,
    },
    loading: false,
  })),
}));

// Mock UserAvatar component
jest.mock('@/entities/user', () => ({
  UserAvatar: ({ displayName, email, size }: any) => (
    <div data-testid="user-avatar" data-size={size} data-displayname={displayName} data-email={email} />
  ),
}));

// Mock LogoutButton component
jest.mock('@/features/auth/logout-button', () => ({
  LogoutButton: ({ children, variant }: any) => (
    <button data-testid="logout-button" data-variant={variant}>
      {children}
    </button>
  ),
}));

describe('DashboardSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Display Logic', () => {
    it('should render sidebar with app branding', () => {
      render(<DashboardSidebar />);
      
      expect(screen.getByText('GetWorken')).toBeInTheDocument();
      expect(screen.getByText('Client Dashboard')).toBeInTheDocument();
    });

    it('should render all navigation items', () => {
      render(<DashboardSidebar />);
      
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Directory')).toBeInTheDocument();
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByText('Chat')).toBeInTheDocument();
    });

    it('should render user avatar in account menu', () => {
      render(<DashboardSidebar />);
      
      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-size', 'md');
    });

    it('should render logout button in account menu', () => {
      render(<DashboardSidebar />);
      
      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton).toBeInTheDocument();
      expect(logoutButton).toHaveAttribute('data-variant', 'danger');
      expect(logoutButton).toHaveTextContent('Sign Out');
    });

    it('should apply custom className', () => {
      const { container } = render(<DashboardSidebar className="custom-class" />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('custom-class');
    });
  });

  describe('Navigation Links', () => {
    it('should render correct href for each navigation item', () => {
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink).toHaveAttribute('href', '/dashboard');
      
      const profileLink = screen.getByText('Profile').closest('a');
      expect(profileLink).toHaveAttribute('href', '/dashboard/profile');
      
      const directoryLink = screen.getByText('Directory').closest('a');
      expect(directoryLink).toHaveAttribute('href', '/dashboard/directory');
      
      const teamLink = screen.getByText('Team').closest('a');
      expect(teamLink).toHaveAttribute('href', '/dashboard/team');
      
      const chatLink = screen.getByText('Chat').closest('a');
      expect(chatLink).toHaveAttribute('href', '/dashboard/chat');
    });

    it('should render icons for each navigation item', () => {
      render(<DashboardSidebar />);
      
      const links = screen.getAllByRole('link');
      const navLinks = links.filter(link => 
        link.textContent?.match(/Overview|Profile|Directory|Team|Chat/)
      );
      
      navLinks.forEach(link => {
        const svg = link.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have proper focus styles', () => {
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink?.className).toMatch(/focus-visible:outline-none/);
      expect(overviewLink?.className).toMatch(/focus-visible:ring-2/);
    });
  });

  describe('Active State Logic', () => {
    it('should highlight dashboard overview as active when on /dashboard', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard');
      
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink).toHaveClass('bg-teal-600');
      expect(overviewLink).toHaveClass('text-white');
      expect(overviewLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight profile as active when on /dashboard/profile', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard/profile');
      
      render(<DashboardSidebar />);
      
      const profileLink = screen.getByText('Profile').closest('a');
      expect(profileLink).toHaveClass('bg-teal-600');
      expect(profileLink).toHaveAttribute('aria-current', 'page');
    });

    it('should highlight directory as active when on /dashboard/directory', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard/directory');
      
      render(<DashboardSidebar />);
      
      const directoryLink = screen.getByText('Directory').closest('a');
      expect(directoryLink).toHaveClass('bg-teal-600');
    });

    it('should not highlight any link as active when on different route', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/other-page');
      
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink).not.toHaveClass('bg-teal-600');
      expect(overviewLink).toHaveClass('text-slate-300');
    });

    it('should highlight overview when on /en/dashboard (locale prefix)', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/en/dashboard');
      
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink).toHaveClass('bg-teal-600');
    });
  });

  describe('Account Menu', () => {
    it('should display user name in account section', () => {
      render(<DashboardSidebar />);
      
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('should use email username when displayName is missing', () => {
      const { useAuth } = require('@/app/_providers/AuthProvider');
      useAuth.mockReturnValue({
        user: {
          uid: 'test-user-id',
          email: 'john@example.com',
          displayName: null,
          photoURL: null,
        },
        userData: null,
        loading: false,
      });
      
      render(<DashboardSidebar />);
      
      expect(screen.getByText('john')).toBeInTheDocument();
    });

    it('should show "User" as fallback when no user data', () => {
      const { useAuth } = require('@/app/_providers/AuthProvider');
      useAuth.mockReturnValue({
        user: null,
        userData: null,
        loading: false,
      });
      
      render(<DashboardSidebar />);
      
      expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('should toggle account menu on click', () => {
      render(<DashboardSidebar />);
      
      // Find the summary element by the details container
      const container = screen.getByRole('complementary');
      const summary = container.querySelector('summary');
      expect(summary).toBeInTheDocument();
      
      // Click to open
      fireEvent.click(summary!);
      
      // Menu items should be visible
      const settingsLink = screen.getByText('Account Settings');
      expect(settingsLink).toBeVisible();
    });

    it('should call onAccountMenuOpen when menu opens', () => {
      const onOpen = jest.fn();
      render(<DashboardSidebar onAccountMenuOpen={onOpen} />);
      
      const container = screen.getByRole('complementary');
      const details = container.querySelector('details')!;
      
      // Open the details element and trigger toggle event
      details.open = true;
      const toggleEvent = new Event('toggle', { bubbles: true });
      details.dispatchEvent(toggleEvent);
      
      expect(onOpen).toHaveBeenCalled();
    });

    it('should call onAccountMenuClose when menu closes', () => {
      const onClose = jest.fn();
      render(<DashboardSidebar onAccountMenuClose={onClose} />);
      
      const container = screen.getByRole('complementary');
      const details = container.querySelector('details')!;
      
      // Open first
      details.open = true;
      details.dispatchEvent(new Event('toggle', { bubbles: true }));
      
      // Then close
      details.open = false;
      details.dispatchEvent(new Event('toggle', { bubbles: true }));
      
      expect(onClose).toHaveBeenCalled();
    });

    it('should render settings link in account menu', () => {
      render(<DashboardSidebar />);
      
      const settingsLink = screen.getByText('Account Settings').closest('a');
      expect(settingsLink).toHaveAttribute('href', '/dashboard/settings');
    });

    it('should render settings icon', () => {
      render(<DashboardSidebar />);
      
      const settingsLink = screen.getByText('Account Settings').closest('a');
      const svg = settingsLink?.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA label on sidebar', () => {
      render(<DashboardSidebar />);
      
      const aside = screen.getByRole('complementary');
      expect(aside).toHaveAttribute('aria-label', 'Dashboard navigation');
    });

    it('should have proper ARIA label on navigation', () => {
      render(<DashboardSidebar />);
      
      const nav = screen.getByRole('navigation', { name: 'Dashboard sections' });
      expect(nav).toBeInTheDocument();
    });

    it('should use aria-current="page" for active link', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard');
      
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      expect(overviewLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not use aria-current for inactive links', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard');
      
      render(<DashboardSidebar />);
      
      const profileLink = screen.getByText('Profile').closest('a');
      expect(profileLink).not.toHaveAttribute('aria-current');
    });

    it('should hide decorative icons from screen readers', () => {
      render(<DashboardSidebar />);
      
      // SVG elements don't have an implicit role, so we query by element type
      const container = screen.getByRole('complementary');
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should be keyboard navigable', () => {
      render(<DashboardSidebar />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        // All links should be focusable
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<DashboardSidebar />);
      
      // Sidebar is an aside element
      const aside = container.querySelector('aside');
      expect(aside).toBeInTheDocument();
      
      // Contains a nav element
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      
      // Logo is in h1
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('GetWorken');
    });
  });

  describe('Styling and Layout', () => {
    it('should have fixed positioning', () => {
      const { container } = render(<DashboardSidebar />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('fixed');
      expect(aside).toHaveClass('left-0');
      expect(aside).toHaveClass('top-0');
    });

    it('should have full height', () => {
      const { container } = render(<DashboardSidebar />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('h-screen');
    });

    it('should have proper width', () => {
      const { container } = render(<DashboardSidebar />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('w-64');
    });

    it('should have dark theme styling', () => {
      const { container } = render(<DashboardSidebar />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('bg-slate-900');
    });

    it('should have proper z-index', () => {
      const { container } = render(<DashboardSidebar />);
      
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('z-40');
    });

    it('should style active links differently', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard');
      
      render(<DashboardSidebar />);
      
      const overviewLink = screen.getByText('Overview').closest('a');
      const profileLink = screen.getByText('Profile').closest('a');
      
      // Active link
      expect(overviewLink).toHaveClass('bg-teal-600', 'text-white');
      
      // Inactive link
      expect(profileLink).toHaveClass('text-slate-300');
      expect(profileLink).not.toHaveClass('bg-teal-600');
    });

    it('should have hover styles on inactive links', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue('/dashboard');
      
      render(<DashboardSidebar />);
      
      const profileLink = screen.getByText('Profile').closest('a');
      expect(profileLink?.className).toMatch(/hover:bg-slate-800/);
      expect(profileLink?.className).toMatch(/hover:text-white/);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null pathname gracefully', () => {
      const { usePathname } = require('@/i18n/routing');
      usePathname.mockReturnValue(null);
      
      render(<DashboardSidebar />);
      
      // Should render without errors
      expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    it('should handle missing user data gracefully', () => {
      const { useAuth } = require('@/app/_providers/AuthProvider');
      useAuth.mockReturnValue({
        user: null,
        userData: null,
        loading: false,
      });
      
      render(<DashboardSidebar />);
      
      // Should render with fallback
      expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('should handle missing callbacks gracefully', () => {
      render(<DashboardSidebar />);
      
      // Find the details element by role or test id
      const container = screen.getByRole('complementary');
      const details = container.querySelector('details');
      
      // Should not throw when toggling without callbacks
      expect(() => {
        if (details) fireEvent.click(details);
      }).not.toThrow();
    });

    it('should handle long display names with truncation', () => {
      const { useAuth } = require('@/app/_providers/AuthProvider');
      useAuth.mockReturnValue({
        user: {
          uid: 'test-user-id',
          email: 'test@example.com',
          displayName: 'Very Long Display Name That Should Be Truncated',
          photoURL: null,
        },
        userData: {
          displayName: 'Very Long Display Name That Should Be Truncated',
        },
        loading: false,
      });
      
      render(<DashboardSidebar />);
      
      // Find the specific paragraph element with truncation (not the avatar)
      const nameElements = screen.getAllByText('Very Long Display Name That Should Be Truncated');
      const paragraphElement = nameElements.find(el => el.tagName === 'P');
      expect(paragraphElement).toHaveClass('truncate');
    });
  });
});
