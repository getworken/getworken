/**
 * E2E Test: Login Flow
 * @module __tests__/e2e/auth/login-flow
 * 
 * ✅ DIAMOND STANDARD: End-to-End Testing with Playwright
 * 
 * Tests complete user login flow including:
 * - Email/password authentication
 * - Google OAuth (mock)
 * - Redirect logic (completed vs incomplete users)
 * - Server-side onboarding check
 * - Accessibility compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    // Check for form title
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();

    // Check for form fields
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();

    // Check for submit button
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();

    // Check for Google OAuth button
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();

    // Check for signup link
    await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // Click submit without filling form
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show validation errors
    await page.waitForTimeout(500);
    
    // Should stay on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/password/i).fill('password123');
    
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show validation error
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel(/email/i).fill('nonexistent@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show error message
    await page.waitForTimeout(2000);
    await expect(page.getByText(/invalid|error|wrong/i)).toBeVisible();
  });

  test('should redirect completed user to dashboard', async ({ page }) => {
    // Use credentials of a user with completed=true
    // (You'll need to create this user in your test setup)
    const completedUserEmail = 'completed-user@example.com';
    const completedUserPassword = 'Test123!@#';

    await page.getByLabel(/email/i).fill(completedUserEmail);
    await page.getByLabel(/password/i).fill(completedUserPassword);
    
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should redirect to dashboard (completed user)
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    
    // Should show dashboard content
    await expect(page.getByText(/dashboard|welcome/i)).toBeVisible();
  });

  test('should redirect incomplete user to getstarted', async ({ page }) => {
    // Use credentials of a user with completed=false
    const incompleteUserEmail = 'incomplete-user@example.com';
    const incompleteUserPassword = 'Test123!@#';

    await page.getByLabel(/email/i).fill(incompleteUserEmail);
    await page.getByLabel(/password/i).fill(incompleteUserPassword);
    
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should redirect to getstarted (incomplete user)
    await expect(page).toHaveURL(/\/getstarted/, { timeout: 10000 });
    
    // Should show profile selection
    await expect(page.getByText(/customer|business|contractor|employee/i)).toBeVisible();
  });

  test('should use server-side API for fast onboarding check', async ({ page }) => {
    // Monitor network requests
    let apiCalled = false;
    page.on('request', request => {
      if (request.url().includes('/api/auth/check-onboarding')) {
        apiCalled = true;
      }
    });

    const testEmail = 'test-user@example.com';
    const testPassword = 'Test123!@#';

    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(testPassword);
    
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for redirect
    await page.waitForTimeout(3000);

    // Verify API was called (server-side check)
    expect(apiCalled).toBeTruthy();
  });

  test('should display loading state during login', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Test123!@#');
    
    const submitButton = page.getByRole('button', { name: /sign in/i });
    await submitButton.click();

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();
  });

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // Email should be focused
    await expect(page.getByLabel(/email/i)).toBeFocused();

    await page.keyboard.press('Tab');
    
    // Password should be focused
    await expect(page.getByLabel(/password/i)).toBeFocused();

    await page.keyboard.press('Tab');
    
    // Sign in button should be focused
    await expect(page.getByRole('button', { name: /sign in/i })).toBeFocused();
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: /sign up/i }).click();
    
    await expect(page).toHaveURL(/\/signup/);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check that form inputs have proper labels
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);

    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should show/hide password toggle (if implemented)', async ({ page }) => {
    const passwordInput = page.getByLabel(/password/i);
    
    await passwordInput.fill('TestPassword123');
    
    // Check if toggle button exists
    const toggleButton = page.getByRole('button', { name: /show|hide password/i });
    
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      
      await toggleButton.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
    }
  });

  test('should prevent multiple simultaneous submissions', async ({ page }) => {
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('Test123!@#');
    
    const submitButton = page.getByRole('button', { name: /sign in/i });
    
    // Click multiple times rapidly
    await submitButton.click();
    await submitButton.click();
    await submitButton.click();

    // Button should remain disabled after first click
    await expect(submitButton).toBeDisabled();
  });
});

test.describe('Login Flow - Performance', () => {
  test('should complete login within performance budget', async ({ page }) => {
    await page.goto('/login');

    const testEmail = 'test-user@example.com';
    const testPassword = 'Test123!@#';

    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill(testPassword);
    
    const startTime = Date.now();
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for redirect (either dashboard or getstarted)
    await page.waitForURL(/\/(dashboard|getstarted)/, { timeout: 10000 });
    
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Login + redirect should be < 3 seconds (was 10s before optimization)
    expect(duration).toBeLessThan(3000);
  });
});
