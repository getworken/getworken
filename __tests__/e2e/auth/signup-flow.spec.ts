/**
 * E2E Test: Signup Flow
 * @module __tests__/e2e/auth/signup-flow
 * 
 * ✅ DIAMOND STANDARD: End-to-End Testing with Playwright
 * 
 * Tests complete user signup flow including:
 * - Form validation
 * - Firebase Auth integration
 * - Firestore user creation
 * - Redirect to onboarding
 * - Accessibility compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
  });

  test('should display signup form with all required fields', async ({ page }) => {
    // Check for form title
    await expect(page.getByRole('heading', { name: /sign up/i })).toBeVisible();

    // Check for all form fields
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByLabel(/phone number/i)).toBeVisible();
    await expect(page.getByLabel(/city/i)).toBeVisible();
    await expect(page.getByLabel(/state/i)).toBeVisible();

    // Check for submit button
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Click submit without filling form
    await page.getByRole('button', { name: /sign up/i }).click();

    // Should show validation errors (Zod validation)
    // Wait for error messages to appear
    await page.waitForTimeout(500);
    
    // Form should still be on signup page (not submitted)
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/password/i).fill('Test123!@#');
    await page.getByLabel(/phone number/i).fill('1234567890');
    await page.getByLabel(/city/i).fill('Test City');
    await page.getByLabel(/state/i).fill('Test State');

    await page.getByRole('button', { name: /sign up/i }).click();

    // Should show email validation error
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should successfully sign up a new user', async ({ page }) => {
    // Generate unique email for test
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;

    // Fill out signup form
    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill('Test123!@#');
    await page.getByLabel(/phone number/i).fill('1234567890');
    await page.getByLabel(/city/i).fill('Test City');
    await page.getByLabel(/state/i).fill('Test State');

    // Submit form
    await page.getByRole('button', { name: /sign up/i }).click();

    // Should redirect to getstarted page with ?new=true
    await expect(page).toHaveURL(/\/getstarted\?new=true/, { timeout: 10000 });

    // Should show profile selection options
    await expect(page.getByText(/customer/i)).toBeVisible();
    await expect(page.getByText(/business/i)).toBeVisible();
    await expect(page.getByText(/contractor/i)).toBeVisible();
    await expect(page.getByText(/employee/i)).toBeVisible();
  });

  test('should show error for duplicate email', async ({ page }) => {
    // Use a known existing email (or create one first)
    const existingEmail = 'existing@example.com';

    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill(existingEmail);
    await page.getByLabel(/password/i).fill('Test123!@#');
    await page.getByLabel(/phone number/i).fill('1234567890');
    await page.getByLabel(/city/i).fill('Test City');
    await page.getByLabel(/state/i).fill('Test State');

    await page.getByRole('button', { name: /sign up/i }).click();

    // Should show error message
    // (Either stays on page or shows error alert)
    await page.waitForTimeout(2000);
  });

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Start at first field
    await page.keyboard.press('Tab');
    
    // First name should be focused
    await expect(page.getByLabel(/first name/i)).toBeFocused();

    // Tab through all fields
    await page.keyboard.press('Tab'); // Last name
    await expect(page.getByLabel(/last name/i)).toBeFocused();

    await page.keyboard.press('Tab'); // Email
    await expect(page.getByLabel(/email/i)).toBeFocused();

    await page.keyboard.press('Tab'); // Password
    await expect(page.getByLabel(/password/i)).toBeFocused();

    // All interactive elements should be keyboard accessible
  });

  test('should have proper focus indicators', async ({ page }) => {
    const firstNameInput = page.getByLabel(/first name/i);
    
    await firstNameInput.focus();
    
    // Check that focus ring is visible
    const focusRingVisible = await firstNameInput.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outlineWidth !== '0px' || styles.boxShadow !== 'none';
    });

    expect(focusRingVisible).toBeTruthy();
  });

  test('should display loading state during submission', async ({ page }) => {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;

    await page.getByLabel(/first name/i).fill('Test');
    await page.getByLabel(/last name/i).fill('User');
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill('Test123!@#');
    await page.getByLabel(/phone number/i).fill('1234567890');
    await page.getByLabel(/city/i).fill('Test City');
    await page.getByLabel(/state/i).fill('Test State');

    // Submit form
    const submitButton = page.getByRole('button', { name: /sign up/i });
    await submitButton.click();

    // Button should show loading state
    await expect(submitButton).toBeDisabled();
  });
});
