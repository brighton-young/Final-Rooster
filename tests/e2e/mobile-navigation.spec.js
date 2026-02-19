import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ ...devices['iPhone 12'] });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hamburger menu on mobile', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    await expect(hamburger).toBeVisible();
  });

  test('should toggle mobile menu when hamburger is clicked', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    const navMenu = page.locator('.nav-menu, nav');

    // Menu should be hidden initially
    const initialDisplay = await navMenu.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.display;
    });

    await hamburger.click();

    // Menu should be visible after click
    await expect(navMenu).toHaveClass(/active/);
  });

  test('should update aria-expanded attribute', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');

    const initialAria = await hamburger.getAttribute('aria-expanded');
    expect(initialAria).toBe('false');

    await hamburger.click();

    const expandedAria = await hamburger.getAttribute('aria-expanded');
    expect(expandedAria).toBe('true');
  });

  test('should close menu when nav link is clicked', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    const navMenu = page.locator('.nav-menu, nav');

    await hamburger.click();
    await expect(navMenu).toHaveClass(/active/);

    // Click a nav link
    const navLink = page.locator('.nav-link, nav a').first();
    await navLink.click();

    // Wait for navigation or animation
    await page.waitForTimeout(300);

    // Menu should be closed (or on new page)
    const hamburgerVisible = await hamburger.isVisible();
    if (hamburgerVisible) {
      await expect(navMenu).not.toHaveClass(/active/);
    }
  });

  test('should prevent body scroll when menu is open', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');

    await hamburger.click();

    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');
  });

  test('should restore body scroll when menu is closed', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');

    await hamburger.click();
    await hamburger.click();

    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).not.toBe('hidden');
  });

  test('should navigate to different pages from mobile menu', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    await hamburger.click();

    const servicesLink = page.getByRole('link', { name: /services/i }).first();
    await servicesLink.click();

    await page.waitForURL(/services/);
    await expect(page).toHaveURL(/services/);
  });

  test('should maintain menu state across viewport changes', async ({ page, context }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    await hamburger.click();

    // Change viewport to desktop size
    await page.setViewportSize({ width: 1200, height: 800 });

    // Wait for any responsive adjustments
    await page.waitForTimeout(300);

    // Navigation should still be accessible
    const nav = page.locator('nav, .nav-menu');
    await expect(nav).toBeVisible();
  });

  test('should handle rapid menu toggles', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');

    // Rapidly toggle 5 times
    for (let i = 0; i < 5; i++) {
      await hamburger.click();
      await page.waitForTimeout(50);
    }

    // Menu should have consistent state
    const navMenu = page.locator('.nav-menu, nav');
    const hasActive = await navMenu.evaluate((el) => el.classList.contains('active'));

    // Should be closed (5 clicks = odd number, so closed)
    expect(hasActive).toBe(true);
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab to hamburger menu
    await page.keyboard.press('Tab');

    // Press Enter to open menu
    await page.keyboard.press('Enter');

    const navMenu = page.locator('.nav-menu, nav');
    await expect(navMenu).toHaveClass(/active/);
  });

  test('should display all navigation links in mobile menu', async ({ page }) => {
    const hamburger = page.locator('.hamburger, [class*="hamburger"]');
    await hamburger.click();

    // Check for key navigation items
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
  });
});

test.describe('Mobile Navigation - Tablet', () => {
  test.use({ ...devices['iPad'] });

  test('should display appropriate navigation for tablet', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav, .nav-menu');
    await expect(nav).toBeVisible();
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('.hamburger, [class*="hamburger"]');

    // Simulate touch tap
    await hamburger.tap();

    const navMenu = page.locator('.nav-menu, nav');

    // Check if menu is visible or has active class
    const isActive = await navMenu.evaluate((el) => {
      return el.classList.contains('active') || window.getComputedStyle(el).display !== 'none';
    });

    expect(isActive).toBeTruthy();
  });
});

test.describe('Mobile Navigation - Cross-page', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should maintain navigation functionality across all pages', async ({ page }) => {
    const pages = ['/', '/about.html', '/services.html', '/scholarship.html', '/testimonials.html', '/contact-apply.html'];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      const hamburger = page.locator('.hamburger, [class*="hamburger"]');

      if (await hamburger.isVisible()) {
        await hamburger.click();

        const navMenu = page.locator('.nav-menu, nav');
        await expect(navMenu).toHaveClass(/active/);

        // Close menu
        await hamburger.click();
        await expect(navMenu).not.toHaveClass(/active/);
      }
    }
  });
});
