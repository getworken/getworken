/**
 * E2E Test: Logout Flow
 * @module __tests__/e2e/auth/logout-flow
 * 
 * ✅ DIAMOND STANDARD: End-to-End Testing
 * 
 * Tests logout functionality from dashboard
 */

import { test, expect } from '@playwright/test';

test.describe('Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login');
    
    await page.getByLabel(/email/i).fill('completed-user@example.com');
    await page.getByLabel(/password/i).fill('Test123!@#');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for dashboard
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  });

  test('should have logout button on dashboard', async ({ page }) => {
    await expect(page.getByRole('button', { name: /log out|sign out/i })).toBeVisible();
  });

  test('should successfully logout and redirect to login', async ({ page }) => {
    await page.getByRole('button', { name: /log out|sign out/i }).click();
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
    
    // Should show login form (confirming logged out)
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should clear user session after logout', async ({ page }) => {
    await page.getByRole('button', { name: /log out|sign out/i }).click();
    
    // Wait for redirect
    await page.waitForURL(/\/login/);
    
    // Try to navigate to dashboard (should redirect back to login)
    await page.goto('/dashboard');
    
    // Should be redirected to login (or stay on login)
    await expect(page).toHaveURL(/\/login/);
  });

  test('should handle logout errors gracefully', async ({ page }) => {
    // Simulate network error during logout
    await page.route('**/*', route => {
      if (route.request().url().includes('signOut')) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.getByRole('button', { name: /log out|sign out/i }).click();
    
    // Should show error message or stay on dashboard
    await page.waitForTimeout(2000);
    
    // Either shows error or handles gracefully
    const hasError = await page.getByText(/error|failed/i).isVisible().catch(() => false);
    const stillOnDashboard = page.url().includes('/dashboard');
    
    expect(hasError || stillOnDashboard).toBeTruthy();
  });
});
