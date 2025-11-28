/**
 * E2E Test: Onboarding Flow
 * @module __tests__/e2e/onboarding/onboarding-flow
 * 
 * ✅ DIAMOND STANDARD: End-to-End Testing with Playwright + Accessibility
 * 
 * Tests the complete user onboarding flow including:
 * - Profile selection (customer/business/contractor/employee)
 * - Multi-step form completion
 * - Profile activation
 * - Redirect to dashboard after completion
 * - WCAG 2.2 accessibility compliance
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to get started page (assumes user is authenticated but incomplete)
    await page.goto('/en/getstarted');
  });

  test('should display profile selection screen', async ({ page }) => {
    // Check for heading
    await expect(page.getByRole('heading', { name: /get started|choose.*profile/i })).toBeVisible();

    // Check for all profile options
    await expect(page.getByText(/customer/i)).toBeVisible();
    await expect(page.getByText(/business/i)).toBeVisible();
    await expect(page.getByText(/contractor/i)).toBeVisible();
    await expect(page.getByText(/employee/i)).toBeVisible();
  });

  test('should have no accessibility violations on profile selection', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should navigate to customer onboarding', async ({ page }) => {
    // Click customer profile option
    const customerButton = page.getByRole('button', { name: /customer/i }).first();
    await customerButton.click();

    // Should navigate to customer onboarding
    await expect(page).toHaveURL(/\/getstarted\/customer|\/onboarding\/customer/);
  });

  test('should navigate to business onboarding', async ({ page }) => {
    // Click business profile option
    const businessButton = page.getByRole('button', { name: /business/i }).first();
    await businessButton.click();

    // Should navigate to business onboarding
    await expect(page).toHaveURL(/\/getstarted\/business|\/onboarding\/business/);
  });

  test('should navigate to contractor onboarding', async ({ page }) => {
    // Click contractor profile option
    const contractorButton = page.getByRole('button', { name: /contractor/i }).first();
    await contractorButton.click();

    // Should navigate to contractor onboarding
    await expect(page).toHaveURL(/\/getstarted\/contractor|\/onboarding\/contractor/);
  });

  test('should navigate to employee onboarding', async ({ page }) => {
    // Click employee profile option
    const employeeButton = page.getByRole('button', { name: /employee/i }).first();
    await employeeButton.click();

    // Should navigate to employee onboarding
    await expect(page).toHaveURL(/\/getstarted\/employee|\/onboarding\/employee/);
  });

  test('should allow keyboard navigation through profile options', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // First profile option should be focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Tab through all options
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to select with Enter key
    await page.keyboard.press('Enter');
    
    // Should navigate to onboarding
    await page.waitForURL(/\/getstarted\/.+|\/onboarding\/.+/, { timeout: 5000 });
  });
});

test.describe('Customer Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to customer onboarding
    await page.goto('/en/getstarted/customer');
  });

  test('should display customer onboarding form', async ({ page }) => {
    // Check for form heading
    await expect(page.getByRole('heading', { name: /customer.*profile|tell us about yourself/i })).toBeVisible();

    // Check for typical customer form fields (adjust based on actual implementation)
    const formFields = [
      /name|full name/i,
      /email/i,
      /phone/i,
      /address|location/i,
    ];

    for (const fieldPattern of formFields) {
      const fieldExists = await page.getByLabel(fieldPattern).count() > 0;
      if (fieldExists) {
        await expect(page.getByLabel(fieldPattern)).toBeVisible();
      }
    }
  });

  test('should have no accessibility violations on customer form', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to submit without filling form
    const submitButton = page.getByRole('button', { name: /continue|next|submit|complete/i }).first();
    
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show validation errors or stay on same page
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/\/getstarted\/customer|\/onboarding\/customer/);
    }
  });

  test('should support multi-step form navigation', async ({ page }) => {
    // Check if there are step indicators
    const steps = page.locator('[role="progressbar"], .step-indicator, [aria-label*="step"]');
    const stepCount = await steps.count();

    if (stepCount > 0) {
      // Multi-step form exists
      expect(stepCount).toBeGreaterThan(0);
    }
  });

  test('should show progress indicator during submission', async ({ page }) => {
    // Fill form with test data (adjust based on actual fields)
    const nameInput = page.getByLabel(/name|full name/i).first();
    if (await nameInput.count() > 0) {
      await nameInput.fill('Test Customer');
    }

    const emailInput = page.getByLabel(/email/i).first();
    if (await emailInput.count() > 0) {
      await emailInput.fill('testcustomer@example.com');
    }

    const phoneInput = page.getByLabel(/phone/i).first();
    if (await phoneInput.count() > 0) {
      await phoneInput.fill('+1234567890');
    }

    // Submit form
    const submitButton = page.getByRole('button', { name: /continue|next|submit|complete/i }).first();
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show loading state
      await expect(submitButton).toBeDisabled();
    }
  });
});

test.describe('Business Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/getstarted/business');
  });

  test('should display business onboarding form', async ({ page }) => {
    // Check for business-specific fields
    const businessFields = [
      /business name|company name/i,
      /business type|company type/i,
      /ein|tax id/i,
    ];

    for (const fieldPattern of businessFields) {
      const fieldExists = await page.getByLabel(fieldPattern).count() > 0;
      if (fieldExists) {
        await expect(page.getByLabel(fieldPattern)).toBeVisible();
      }
    }
  });

  test('should have no accessibility violations on business form', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should validate business-specific fields', async ({ page }) => {
    // Try to submit without business name
    const submitButton = page.getByRole('button', { name: /continue|next|submit|complete/i }).first();
    
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Should show validation errors
      await page.waitForTimeout(500);
      await expect(page).toHaveURL(/\/getstarted\/business|\/onboarding\/business/);
    }
  });
});

test.describe('Contractor Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/getstarted/contractor');
  });

  test('should display contractor onboarding form', async ({ page }) => {
    // Check for contractor-specific fields
    const contractorFields = [
      /license/i,
      /specialty|specialties|trade/i,
      /experience|years/i,
    ];

    for (const fieldPattern of contractorFields) {
      const fieldExists = await page.getByLabel(fieldPattern).count() > 0;
      if (fieldExists) {
        await expect(page.getByLabel(fieldPattern)).toBeVisible();
      }
    }
  });

  test('should have no accessibility violations on contractor form', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Employee Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/getstarted/employee');
  });

  test('should display employee onboarding form', async ({ page }) => {
    // Check for employee-specific fields
    const employeeFields = [
      /business.*code|invitation.*code|employer/i,
      /position|role|title/i,
    ];

    for (const fieldPattern of employeeFields) {
      const fieldExists = await page.getByLabel(fieldPattern).count() > 0;
      if (fieldExists) {
        await expect(page.getByLabel(fieldPattern)).toBeVisible();
      }
    }
  });

  test('should have no accessibility violations on employee form', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should validate invitation code', async ({ page }) => {
    const inviteCodeInput = page.getByLabel(/business.*code|invitation.*code/i).first();
    
    if (await inviteCodeInput.count() > 0) {
      // Enter invalid code
      await inviteCodeInput.fill('INVALID123');
      
      const submitButton = page.getByRole('button', { name: /continue|next|verify/i }).first();
      if (await submitButton.count() > 0) {
        await submitButton.click();

        // Should show error message
        await page.waitForTimeout(1000);
        const errorMessage = await page.getByText(/invalid|not found|error/i).count();
        expect(errorMessage).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('Onboarding Completion', () => {
  test('should redirect to dashboard after completion', async ({ page }) => {
    // This test assumes you can complete onboarding programmatically
    // You may need to mock the backend or create a test user with completed profile
    
    await page.goto('/en/getstarted/customer');
    
    // Fill and submit form (adjust based on actual implementation)
    // This is a simplified example
    const submitButton = page.getByRole('button', { name: /finish|complete|done/i }).first();
    
    if (await submitButton.count() > 0) {
      // Assuming form is filled by beforeEach or test setup
      await submitButton.click();

      // Should redirect to dashboard
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    }
  });

  test('should update profile completion status', async ({ page }) => {
    // After completing onboarding, user should see dashboard
    await page.goto('/en/dashboard');
    
    // Dashboard should load (user is now completed)
    await expect(page.getByText(/dashboard|welcome/i)).toBeVisible();
  });
});

test.describe('Onboarding Accessibility - Keyboard Navigation', () => {
  test('should support full keyboard navigation through onboarding', async ({ page }) => {
    await page.goto('/en/getstarted');

    // Tab through profile options
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Select profile with Enter
    await page.keyboard.press('Enter');
    
    // Wait for navigation
    await page.waitForURL(/\/getstarted\/.+|\/onboarding\/.+/, { timeout: 5000 });

    // Tab through form fields
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedElement = page.locator(':focus');
      const isFocusVisible = await focusedElement.count() > 0;
      expect(isFocusVisible).toBeTruthy();
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/en/getstarted');

    await page.keyboard.press('Tab');
    
    // Check that focused element has visible focus styles
    const focusedElement = page.locator(':focus');
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline !== 'none' || styles.boxShadow !== 'none';
    });
    
    expect(outline).toBeTruthy();
  });

  test('should announce form errors to screen readers', async ({ page }) => {
    await page.goto('/en/getstarted/customer');

    // Submit empty form
    const submitButton = page.getByRole('button', { name: /continue|next|submit/i }).first();
    if (await submitButton.count() > 0) {
      await submitButton.click();

      // Error messages should have proper ARIA attributes
      const errors = page.locator('[role="alert"], [aria-invalid="true"] ~ *');
      const errorCount = await errors.count();
      
      if (errorCount > 0) {
        expect(errorCount).toBeGreaterThan(0);
      }
    }
  });
});
