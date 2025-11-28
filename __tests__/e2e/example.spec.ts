import { test, expect } from '@playwright/test';

/**
 * Example E2E Test
 * @module __tests__/e2e/example.spec
 * 
 * ✅ DIAMOND STANDARD: All critical user flows must be E2E tested
 */

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page title contains "GetWorken"
  await expect(page).toHaveTitle(/GetWorken/i);
  
  // Check for welcome message
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toContainText('Welcome');
});

test('login page is accessible', async ({ page }) => {
  await page.goto('/en/login');
  
  // Check for email input
  const emailInput = page.getByLabel(/email/i);
  await expect(emailInput).toBeVisible();
  
  // Check for password input
  const passwordInput = page.getByLabel(/password/i);
  await expect(passwordInput).toBeVisible();
});
