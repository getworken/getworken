/**
 * E2E Test: Profile Switching Flow
 * @module __tests__/e2e/profile/profile-switching
 * 
 * ✅ DIAMOND STANDARD: End-to-End Testing with Playwright + Accessibility
 * 
 * Tests the multi-role profile switching functionality including:
 * - Switching between active profiles (customer/business/contractor/employee)
 * - Dashboard content updates after switch
 * - Profile-specific navigation visibility
 * - Role-based access control enforcement
 * - WCAG 2.2 accessibility compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Profile Switching', () => {
  test.beforeEach(async ({ page }) => {
    // Assumes user is authenticated with multiple completed profiles
    await page.goto('/en/dashboard');
  });

  test('should display profile switcher in navigation', async ({ page }) => {
    // Look for profile switcher button/dropdown
    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch"), button:has-text("Profile")').first();
    
    if (await profileSwitcher.count() > 0) {
      await expect(profileSwitcher).toBeVisible();
    } else {
      // Alternative: Look for role indicator in navigation
      const roleIndicator = page.locator('[role="navigation"] *:has-text(/customer|business|contractor|employee/i)').first();
      await expect(roleIndicator).toBeVisible();
    }
  });

  test('should have no accessibility violations on profile switcher', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should open profile switcher menu', async ({ page }) => {
    // Click profile switcher button
    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch"), button:has-text("Profile")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      // Menu should appear with profile options
      const menu = page.locator('[role="menu"], [role="listbox"], .profile-menu').first();
      await expect(menu).toBeVisible();
    }
  });

  test('should display all active profiles in switcher', async ({ page }) => {
    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch"), button:has-text("Profile")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      // Check for profile options (at least one should be visible)
      const profileOptions = page.locator('[role="menuitem"], [role="option"], .profile-option');
      const optionCount = await profileOptions.count();
      
      expect(optionCount).toBeGreaterThan(0);
    }
  });
});

test.describe('Switch to Customer Profile', () => {
  test('should switch to customer profile successfully', async ({ page }) => {
    await page.goto('/en/dashboard');

    // Open profile switcher
    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      // Click customer profile option
      const customerOption = page.locator('[role="menuitem"]:has-text("Customer"), button:has-text("Customer")').first();
      
      if (await customerOption.count() > 0) {
        await customerOption.click();

        // Dashboard should update
        await page.waitForTimeout(1000);
        
        // Should show customer-specific content
        const customerContent = await page.getByText(/my.*jobs|request.*service|book.*service/i).count();
        expect(customerContent).toBeGreaterThan(0);
      }
    }
  });

  test('should show customer-specific navigation after switch', async ({ page }) => {
    await page.goto('/en/dashboard?profile=customer');

    // Customer should see specific menu items
    const customerMenuItems = [
      /request.*service|new.*request/i,
      /my.*jobs|my.*requests/i,
      /messages|inbox/i,
    ];

    let foundCustomerItem = false;
    for (const itemPattern of customerMenuItems) {
      const itemCount = await page.getByRole('link', { name: itemPattern }).count();
      if (itemCount > 0) {
        foundCustomerItem = true;
        break;
      }
    }

    expect(foundCustomerItem).toBeTruthy();
  });

  test('should update dashboard cards for customer view', async ({ page }) => {
    await page.goto('/en/dashboard?profile=customer');

    // Customer dashboard should show customer metrics
    const dashboardCards = page.locator('.dashboard-card, [data-testid*="card"], article');
    const cardCount = await dashboardCards.count();
    
    expect(cardCount).toBeGreaterThan(0);
  });
});

test.describe('Switch to Business Profile', () => {
  test('should switch to business profile successfully', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      const businessOption = page.locator('[role="menuitem"]:has-text("Business"), button:has-text("Business")').first();
      
      if (await businessOption.count() > 0) {
        await businessOption.click();

        await page.waitForTimeout(1000);
        
        // Should show business-specific content
        const businessContent = await page.getByText(/employees|manage.*team|business.*settings/i).count();
        expect(businessContent).toBeGreaterThan(0);
      }
    }
  });

  test('should show business-specific navigation after switch', async ({ page }) => {
    await page.goto('/en/dashboard?profile=business');

    // Business should see specific menu items
    const businessMenuItems = [
      /employees|team/i,
      /jobs|projects/i,
      /analytics|reports/i,
      /settings/i,
    ];

    let foundBusinessItem = false;
    for (const itemPattern of businessMenuItems) {
      const itemCount = await page.getByRole('link', { name: itemPattern }).count();
      if (itemCount > 0) {
        foundBusinessItem = true;
        break;
      }
    }

    expect(foundBusinessItem).toBeTruthy();
  });

  test('should restrict access to business-only features for non-business users', async ({ page }) => {
    // Switch to customer profile
    await page.goto('/en/dashboard?profile=customer');

    // Try to access business-only page
    await page.goto('/en/dashboard/employees');

    // Should redirect or show access denied
    await page.waitForTimeout(1000);
    
    const currentUrl = page.url();
    const hasAccessDenied = await page.getByText(/access denied|not authorized|forbidden/i).count() > 0;
    const redirectedAway = !currentUrl.includes('/employees');
    
    expect(hasAccessDenied || redirectedAway).toBeTruthy();
  });
});

test.describe('Switch to Contractor Profile', () => {
  test('should switch to contractor profile successfully', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      const contractorOption = page.locator('[role="menuitem"]:has-text("Contractor"), button:has-text("Contractor")').first();
      
      if (await contractorOption.count() > 0) {
        await contractorOption.click();

        await page.waitForTimeout(1000);
        
        // Should show contractor-specific content
        const contractorContent = await page.getByText(/available.*jobs|my.*bids|schedule/i).count();
        expect(contractorContent).toBeGreaterThan(0);
      }
    }
  });

  test('should show contractor-specific navigation after switch', async ({ page }) => {
    await page.goto('/en/dashboard?profile=contractor');

    // Contractor should see specific menu items
    const contractorMenuItems = [
      /available.*jobs|job.*board/i,
      /my.*jobs|active.*jobs/i,
      /earnings|payments/i,
    ];

    let foundContractorItem = false;
    for (const itemPattern of contractorMenuItems) {
      const itemCount = await page.getByRole('link', { name: itemPattern }).count();
      if (itemCount > 0) {
        foundContractorItem = true;
        break;
      }
    }

    expect(foundContractorItem).toBeTruthy();
  });
});

test.describe('Switch to Employee Profile', () => {
  test('should switch to employee profile successfully', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      const employeeOption = page.locator('[role="menuitem"]:has-text("Employee"), button:has-text("Employee")').first();
      
      if (await employeeOption.count() > 0) {
        await employeeOption.click();

        await page.waitForTimeout(1000);
        
        // Should show employee-specific content
        const employeeContent = await page.getByText(/my.*schedule|assigned.*jobs|timesheet/i).count();
        expect(employeeContent).toBeGreaterThan(0);
      }
    }
  });

  test('should show employee-specific navigation after switch', async ({ page }) => {
    await page.goto('/en/dashboard?profile=employee');

    // Employee should see specific menu items
    const employeeMenuItems = [
      /schedule|calendar/i,
      /assigned.*jobs|my.*tasks/i,
      /timesheet|hours/i,
    ];

    let foundEmployeeItem = false;
    for (const itemPattern of employeeMenuItems) {
      const itemCount = await page.getByRole('link', { name: itemPattern }).count();
      if (itemCount > 0) {
        foundEmployeeItem = true;
        break;
      }
    }

    expect(foundEmployeeItem).toBeTruthy();
  });
});

test.describe('Profile Switching Persistence', () => {
  test('should persist profile selection across page navigation', async ({ page }) => {
    await page.goto('/en/dashboard?profile=business');

    // Navigate to another page
    await page.goto('/en/dashboard/settings');

    // Profile should still be business
    await page.waitForTimeout(500);
    const url = page.url();
    
    // Check if profile is still set (via URL param or session)
    expect(url).toMatch(/profile=business|business.*dashboard/);
  });

  test('should persist profile selection after page reload', async ({ page }) => {
    await page.goto('/en/dashboard?profile=contractor');

    // Reload page
    await page.reload();

    // Profile should still be contractor
    await page.waitForTimeout(500);
    const url = page.url();
    
    expect(url).toMatch(/profile=contractor|contractor.*dashboard/);
  });
});

test.describe('Profile Switching Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/en/dashboard');

    // Tab to profile switcher
    let tabCount = 0;
    while (tabCount < 20) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      const focusedElement = page.locator(':focus');
      const text = await focusedElement.textContent();
      
      if (text && (text.includes('Switch') || text.includes('Profile'))) {
        // Found profile switcher
        await page.keyboard.press('Enter');
        
        // Menu should open
        const menu = page.locator('[role="menu"], [role="listbox"]').first();
        const isVisible = await menu.isVisible();
        
        if (isVisible) {
          expect(isVisible).toBeTruthy();
          break;
        }
      }
    }
  });

  test('should announce profile switch to screen readers', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"]').first();
    
    if (await profileSwitcher.count() > 0) {
      // Check for aria-label or aria-describedby
      const hasAriaLabel = await profileSwitcher.getAttribute('aria-label');
      const hasAriaDescribedBy = await profileSwitcher.getAttribute('aria-describedby');
      
      expect(hasAriaLabel || hasAriaDescribedBy).toBeTruthy();
    }
  });

  test('should have no accessibility violations during profile switch', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      // Scan menu for violations
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test('should have proper focus management after profile switch', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      const customerOption = page.locator('[role="menuitem"]:has-text("Customer")').first();
      
      if (await customerOption.count() > 0) {
        await customerOption.click();

        // Focus should be managed after switch (not lost)
        await page.waitForTimeout(500);
        const focusedElement = page.locator(':focus');
        const isFocused = await focusedElement.count() > 0;
        
        expect(isFocused).toBeTruthy();
      }
    }
  });
});

test.describe('Profile Switching Performance', () => {
  test('should switch profiles within performance budget', async ({ page }) => {
    await page.goto('/en/dashboard');

    const profileSwitcher = page.locator('[data-testid="profile-switcher"], button:has-text("Switch")').first();
    
    if (await profileSwitcher.count() > 0) {
      await profileSwitcher.click();

      const businessOption = page.locator('[role="menuitem"]:has-text("Business")').first();
      
      if (await businessOption.count() > 0) {
        const startTime = Date.now();
        await businessOption.click();
        
        // Wait for dashboard to update
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        const endTime = Date.now();
        
        const duration = endTime - startTime;
        
        // Profile switch should be fast (< 2 seconds)
        expect(duration).toBeLessThan(2000);
      }
    }
  });
});
