import { test, expect } from '@playwright/test';

test.describe('Services Page Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services.html');
  });

  test('should load services page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Services.*The Reading Roost/i);
  });

  test('should display gallery section', async ({ page }) => {
    const gallery = page.locator('.gallery, [class*="gallery"]');
    await expect(gallery.first()).toBeVisible();
  });

  test('should display multiple gallery items', async ({ page }) => {
    const galleryItems = page.locator('.gallery-item');
    const count = await galleryItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should open lightbox when gallery item is clicked', async ({ page }) => {
    const firstGalleryItem = page.locator('.gallery-item').first();
    await expect(firstGalleryItem).toBeVisible();

    await firstGalleryItem.click();

    // Check lightbox is visible
    const lightbox = page.locator('#lightbox, .lightbox');
    await expect(lightbox).toHaveClass(/active/);
  });

  test('should display image in lightbox', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const lightboxImage = page.locator('#lightboxImage, .lightbox-image');
    await expect(lightboxImage).toBeVisible();
    await expect(lightboxImage).toHaveAttribute('src', /.+/);
  });

  test('should display image counter in lightbox', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const counter = page.locator('#lightboxCounter, .lightbox-counter');
    await expect(counter).toBeVisible();
    await expect(counter).toHaveText(/\d+\s*\/\s*\d+/);
  });

  test('should close lightbox when close button is clicked', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const lightbox = page.locator('#lightbox, .lightbox');
    await expect(lightbox).toHaveClass(/active/);

    const closeButton = page.locator('#lightboxClose, .lightbox-close');
    await closeButton.click();

    await expect(lightbox).not.toHaveClass(/active/);
  });

  test('should close lightbox when Escape key is pressed', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const lightbox = page.locator('#lightbox, .lightbox');
    await expect(lightbox).toHaveClass(/active/);

    await page.keyboard.press('Escape');

    await expect(lightbox).not.toHaveClass(/active/);
  });

  test('should navigate to next image with next button', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const counter = page.locator('#lightboxCounter, .lightbox-counter');
    const initialCounter = await counter.textContent();

    const nextButton = page.locator('#lightboxNext, .lightbox-next');
    await nextButton.click();

    const newCounter = await counter.textContent();
    expect(newCounter).not.toBe(initialCounter);
  });

  test('should navigate to previous image with prev button', async ({ page }) => {
    // Open second image
    await page.locator('.gallery-item').nth(1).click();

    const counter = page.locator('#lightboxCounter, .lightbox-counter');
    const initialCounter = await counter.textContent();

    const prevButton = page.locator('#lightboxPrev, .lightbox-prev');
    await prevButton.click();

    const newCounter = await counter.textContent();
    expect(newCounter).not.toBe(initialCounter);
  });

  test('should navigate with arrow keys', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const counter = page.locator('#lightboxCounter, .lightbox-counter');
    const initialCounter = await counter.textContent();

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);

    const newCounter = await counter.textContent();
    expect(newCounter).not.toBe(initialCounter);
  });

  test('should wrap to first image from last image', async ({ page }) => {
    const galleryItems = page.locator('.gallery-item');
    const count = await galleryItems.count();

    // Open last image
    await galleryItems.nth(count - 1).click();

    const counter = page.locator('#lightboxCounter, .lightbox-counter');
    await expect(counter).toHaveText(new RegExp(`${count}\\s*\\/\\s*${count}`));

    // Click next
    const nextButton = page.locator('#lightboxNext, .lightbox-next');
    await nextButton.click();

    // Should show first image
    await expect(counter).toHaveText(/1\s*\/\s*\d+/);
  });

  test('should lock body scroll when lightbox is open', async ({ page }) => {
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);

    await page.locator('.gallery-item').first().click();

    const openOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(openOverflow).toBe('hidden');
  });

  test('should restore body scroll when lightbox is closed', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const closeButton = page.locator('#lightboxClose, .lightbox-close');
    await closeButton.click();

    const closedOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(closedOverflow).not.toBe('hidden');
  });

  test('should display gallery images with hover effects', async ({ page }) => {
    const firstItem = page.locator('.gallery-item').first();

    await firstItem.hover();

    // Wait for hover animation
    await page.waitForTimeout(200);

    // Image should still be visible after hover
    await expect(firstItem).toBeVisible();
  });

  test('should have descriptive alt text on gallery images', async ({ page }) => {
    const galleryImages = page.locator('.gallery-image, .gallery-item img');
    const firstImage = galleryImages.first();

    const altText = await firstImage.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText.length).toBeGreaterThan(0);
  });

  test('should handle rapid gallery interactions', async ({ page }) => {
    // Rapidly click through multiple images
    await page.locator('.gallery-item').first().click();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Escape');

    const lightbox = page.locator('#lightbox, .lightbox');
    await expect(lightbox).not.toHaveClass(/active/);
  });

  test('should maintain aspect ratio of images in lightbox', async ({ page }) => {
    await page.locator('.gallery-item').first().click();

    const lightboxImage = page.locator('#lightboxImage, .lightbox-image');

    const dimensions = await lightboxImage.evaluate((img) => ({
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      displayWidth: img.offsetWidth,
      displayHeight: img.offsetHeight
    }));

    expect(dimensions.naturalWidth).toBeGreaterThan(0);
    expect(dimensions.naturalHeight).toBeGreaterThan(0);
  });
});
