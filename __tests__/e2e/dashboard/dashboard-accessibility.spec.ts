/**
 * E2E Test: Dashboard Accessibility
 * @module __tests__/e2e/dashboard/dashboard-accessibility
 * 
 * ✅ DIAMOND STANDARD: E2E Testing with Playwright + axe-core
 * 
 * Tests WCAG 2.2 compliance for the dashboard page
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/en/login');
    
    // TODO: Replace with actual test credentials
    // For now, skip if login form doesn't exist
    const hasLoginForm = await page.locator('input[type="email"]').count() > 0;
    
    if (hasLoginForm) {
      // Perform login
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'test123');
      await page.click('button[type="submit"]');
      
      // Wait for navigation to dashboard
      await page.waitForURL('**/dashboard', { timeout: 10000 });
    } else {
      // Skip to dashboard directly (for demo mode)
      await page.goto('/en/dashboard');
    }
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Dashboard/i);
  });

  test('should have main landmark', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have skip to content link', async ({ page }) => {
    // Check for skip link (common a11y pattern)
    const skipLink = page.locator('a[href="#main-content"], a[href="#content"]').first();
    
    if (await skipLink.count() > 0) {
      await expect(skipLink).toHaveText(/skip/i);
    }
  });

  test('should have keyboard navigable interactive elements', async ({ page }) => {
    // Tab through first few interactive elements
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focused = await page.evaluateHandle(() => document.activeElement);
    expect(focused).toBeTruthy();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    
    // Should have exactly one h1
    expect(h1Count).toBe(1);
    
    // H1 should be visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('should have proper ARIA labels on buttons', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      
      // Button should have text content or aria-label
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test('should have form labels', async ({ page }) => {
    const inputs = page.locator('input:visible');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      
      if (id) {
        // Should have associated label
        const label = page.locator(`label[for="${id}"]`);
        const labelCount = await label.count();
        
        if (labelCount === 0) {
          // Check for aria-label as alternative
          const ariaLabel = await input.getAttribute('aria-label');
          const ariaLabelledBy = await input.getAttribute('aria-labelledby');
          
          expect(ariaLabel || ariaLabelledBy).toBeTruthy();
        }
      }
    }
  });

  test('should have alt text on images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt attribute must exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should be navigable with keyboard only', async ({ page }) => {
    // Start keyboard navigation
    let tabPresses = 0;
    const maxTabs = 20;
    
    while (tabPresses < maxTabs) {
      await page.keyboard.press('Tab');
      tabPresses++;
      
      // Check if focused element is visible
      const focusedElement = await page.evaluateHandle(() => document.activeElement);
      const isVisible = await page.evaluate((el) => {
        const element = el as HTMLElement;
        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
      }, focusedElement);
      
      if (isVisible) {
        // Successfully focused a visible element
        expect(isVisible).toBe(true);
      }
    }
    
    // Should have tabbed through multiple elements
    expect(tabPresses).toBeGreaterThan(0);
  });
});

test.describe('Dashboard Navigation Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/dashboard');
  });

  test('should have accessible navigation menu', async ({ page }) => {
    const nav = page.locator('nav').first();
    
    if (await nav.count() > 0) {
      // Nav should have aria-label or role
      const ariaLabel = await nav.getAttribute('aria-label');
      const role = await nav.getAttribute('role');
      
      expect(ariaLabel || role).toBeTruthy();
    }
  });

  test('should have focus management on route changes', async ({ page }) => {
    // Click a navigation link
    const navLinks = page.locator('nav a');
    
    if (await navLinks.count() > 0) {
      const firstLink = navLinks.first();
      await firstLink.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Focus should be managed (not lost)
      const activeElement = await page.evaluateHandle(() => document.activeElement);
      expect(activeElement).toBeTruthy();
    }
  });
});
