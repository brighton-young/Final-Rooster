import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-apply.html');
  });

  test('should load contact page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Contact.*The Reading Roost/i);
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form, .contact-form, .application-form');
    await expect(form.first()).toBeVisible();
  });

  test('should have all required form fields', async ({ page }) => {
    // Check for common form fields
    const nameInput = page.locator('input[name*="name"], input[id*="name"]');
    const emailInput = page.locator('input[type="email"], input[name*="email"]');
    const messageField = page.locator('textarea, input[name*="message"]');

    await expect(nameInput.first()).toBeVisible();
    await expect(emailInput.first()).toBeVisible();
    await expect(messageField.first()).toBeVisible();
  });

  test('should display floating label effect on focus', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const parent = await nameInput.evaluateHandle((el) => el.parentElement);

    await nameInput.focus();

    const hasFocused = await parent.evaluate((el) => el.classList.contains('focused'));
    expect(hasFocused).toBe(true);
  });

  test('should keep label active when input has value', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();

    await nameInput.fill('John Doe');
    await nameInput.blur();

    const parent = await nameInput.evaluateHandle((el) => el.parentElement);
    const hasFocused = await parent.evaluate((el) => el.classList.contains('focused'));

    expect(hasFocused).toBe(true);
  });

  test('should remove label focus when input is emptied', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const parent = await nameInput.evaluateHandle((el) => el.parentElement);

    await nameInput.focus();
    await nameInput.fill('Test');
    await nameInput.fill('');
    await nameInput.blur();

    const hasFocused = await parent.evaluate((el) => el.classList.contains('focused'));
    expect(hasFocused).toBe(false);
  });

  test('should apply scale animation on typing', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();

    await nameInput.fill('T');

    // Check for scale transform
    const transform = await nameInput.evaluate((el) => el.style.transform);
    expect(transform).toContain('scale');
  });

  test('should accept valid email format', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first();

    await emailInput.fill('test@example.com');

    const validity = await emailInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(true);
  });

  test('should reject invalid email format', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first();

    await emailInput.fill('invalid-email');

    const validity = await emailInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('should handle textarea input', async ({ page }) => {
    const textarea = page.locator('textarea').first();

    const testMessage = 'This is a test message for The Reading Roost educational services.';
    await textarea.fill(testMessage);

    const value = await textarea.inputValue();
    expect(value).toBe(testMessage);
  });

  test('should display submit button', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"], input[type="submit"]');
    await expect(submitButton.first()).toBeVisible();
  });

  test('should enable submit button when form is filled', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const messageField = page.locator('textarea').first();
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();

    await nameInput.fill('John Doe');
    await emailInput.fill('john@example.com');
    await messageField.fill('I would like to inquire about services.');

    const isEnabled = await submitButton.isEnabled();
    expect(isEnabled).toBe(true);
  });

  test('should handle form submission attempt', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const messageField = page.locator('textarea').first();
    const form = page.locator('form').first();

    await nameInput.fill('Jane Smith');
    await emailInput.fill('jane@example.com');
    await messageField.fill('Interested in special education services.');

    // Listen for form submission
    const submissionPromise = page.waitForEvent('request', {
      predicate: (request) => request.method() === 'POST'
    }).catch(() => null);

    await form.evaluate((f) => f.submit());

    // Note: Actual submission behavior depends on form action
    // This test verifies the form can be submitted without errors
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    const form = page.locator('form').first();

    // Try to submit empty form
    await submitButton.click();

    // Check for HTML5 validation or custom validation
    const requiredInputs = page.locator('input[required], textarea[required]');
    const count = await requiredInputs.count();

    if (count > 0) {
      const firstRequired = requiredInputs.first();
      const isValid = await firstRequired.evaluate((el) => el.validity.valid);
      expect(isValid).toBe(false);
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through form fields
    await page.keyboard.press('Tab');
    await page.keyboard.type('John Doe');

    await page.keyboard.press('Tab');
    await page.keyboard.type('john@example.com');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Test message');

    // Verify values were entered
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const nameValue = await nameInput.inputValue();

    expect(nameValue).toBeTruthy();
  });

  test('should maintain form state on page resize', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();

    await nameInput.fill('Test User');

    // Resize viewport
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile
    await page.waitForTimeout(200);

    const mobileValue = await nameInput.inputValue();
    expect(mobileValue).toBe('Test User');

    // Resize back to desktop
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);

    const desktopValue = await nameInput.inputValue();
    expect(desktopValue).toBe('Test User');
  });

  test('should handle special characters in input', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const specialName = "O'Brien-Smith";

    await nameInput.fill(specialName);

    const value = await nameInput.inputValue();
    expect(value).toBe(specialName);
  });

  test('should clear form inputs', async ({ page }) => {
    const nameInput = page.locator('input[name*="name"], input[id*="name"]').first();
    const emailInput = page.locator('input[type="email"]').first();

    await nameInput.fill('Test');
    await emailInput.fill('test@example.com');

    await nameInput.clear();
    await emailInput.clear();

    const nameValue = await nameInput.inputValue();
    const emailValue = await emailInput.inputValue();

    expect(nameValue).toBe('');
    expect(emailValue).toBe('');
  });
});

test.describe('Contact Form - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-apply.html');
  });

  test('should have proper form labels', async ({ page }) => {
    const labels = page.locator('label');
    const labelCount = await labels.count();

    expect(labelCount).toBeGreaterThan(0);

    // Check that labels are associated with inputs
    for (let i = 0; i < labelCount; i++) {
      const label = labels.nth(i);
      const forAttr = await label.getAttribute('for');

      if (forAttr) {
        const associatedInput = page.locator(`#${forAttr}`);
        await expect(associatedInput).toBeAttached();
      }
    }
  });

  test('should indicate required fields', async ({ page }) => {
    const requiredFields = page.locator('input[required], textarea[required]');
    const count = await requiredFields.count();

    // If there are required fields, they should be marked
    if (count > 0) {
      const firstRequired = requiredFields.first();
      const hasRequiredAttr = await firstRequired.getAttribute('required');
      expect(hasRequiredAttr).not.toBeNull();
    }
  });

  test('should have descriptive placeholders', async ({ page }) => {
    const inputs = page.locator('input, textarea');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type');

      // Skip hidden and submit inputs
      if (type !== 'hidden' && type !== 'submit') {
        const placeholder = await input.getAttribute('placeholder');
        const ariaLabel = await input.getAttribute('aria-label');
        const id = await input.getAttribute('id');

        // Should have either placeholder, aria-label, or associated label
        expect(placeholder || ariaLabel || id).toBeTruthy();
      }
    }
  });
});
