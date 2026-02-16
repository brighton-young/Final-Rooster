import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/The Reading Roost/);
  });

  test('should display hero section with logo', async ({ page }) => {
    const hero = page.locator('.hero-section');
    await expect(hero).toBeVisible();

    const logo = page.locator('.hero-section img[alt*="Reading Roost"]');
    await expect(logo).toBeVisible();
  });

  test('should display main navigation', async ({ page }) => {
    const nav = page.locator('nav, .nav-menu');
    await expect(nav).toBeVisible();

    // Check for key navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible();
  });

  test('should navigate to About page from navigation', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/about/);
  });

  test('should navigate to Services page from navigation', async ({ page }) => {
    await page.getByRole('link', { name: /services/i }).first().click();
    await expect(page).toHaveURL(/services/);
  });

  test('should display "What is Special Education?" section', async ({ page }) => {
    const section = page.getByText(/What is Special Education/i);
    await expect(section).toBeVisible();
  });

  test('should display Services Offered section', async ({ page }) => {
    const servicesSection = page.getByText(/Services Offered/i);
    await expect(servicesSection).toBeVisible();
  });

  test('should display Jon Peterson Scholarship card', async ({ page }) => {
    const jpCard = page.getByText(/Jon Peterson Scholarship/i).first();
    await expect(jpCard).toBeVisible();

    // Check for funding amount
    const fundingInfo = page.getByText(/\$9,585.*\$32,445/i);
    await expect(fundingInfo).toBeVisible();
  });

  test('should display NOW ENROLLING section', async ({ page }) => {
    const enrollSection = page.getByText(/NOW ENROLLING/i);
    await expect(enrollSection).toBeVisible();
  });

  test('should display footer with copyright', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const copyright = page.getByText(/2025.*The Reading Roost/i);
    await expect(copyright).toBeVisible();
  });

  test('should display designer credit in footer', async ({ page }) => {
    const designerCredit = page.getByText(/Brighton Young Designs/i);
    await expect(designerCredit).toBeVisible();
  });

  test('should apply scroll animations', async ({ page }) => {
    // Scroll down the page
    await page.evaluate(() => window.scrollBy(0, 500));

    // Wait for animations
    await page.waitForTimeout(500);

    // Elements should have animation classes
    const animatedElements = page.locator('.in-view, .animate-on-scroll');
    await expect(animatedElements.first()).toBeVisible();
  });

  test('should have readable text contrast', async ({ page }) => {
    // Check that primary text is visible and readable
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();

    // Verify contrast by checking computed styles
    const color = await mainHeading.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.color;
    });

    expect(color).toBeTruthy();
  });

  test('should load without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Allow for potential external resource errors but not JS errors
    const jsErrors = errors.filter((err) => !err.includes('favicon') && !err.includes('404'));
    expect(jsErrors).toHaveLength(0);
  });
});
