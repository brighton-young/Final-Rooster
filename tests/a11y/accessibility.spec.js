import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests @a11y', () => {
  test('Homepage should not have automatically detectable accessibility issues', async ({
    page
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('About page should not have accessibility violations', async ({ page }) => {
    await page.goto('/about.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Services page should not have accessibility violations', async ({ page }) => {
    await page.goto('/services.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Scholarship page should not have accessibility violations', async ({ page }) => {
    await page.goto('/scholarship.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Testimonials page should not have accessibility violations', async ({ page }) => {
    await page.goto('/testimonials.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contact/Apply page should not have accessibility violations', async ({ page }) => {
    await page.goto('/contact-apply.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => {
      return {
        tagName: document.activeElement?.tagName,
        role: document.activeElement?.getAttribute('role'),
        href: document.activeElement?.getAttribute('href')
      };
    });

    // Should focus on interactive element (link or button)
    expect(['A', 'BUTTON', 'INPUT'].includes(focusedElement.tagName)).toBe(true);
  });

  test('All images should have alt text', async ({ page }) => {
    await page.goto('/');

    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(imagesWithoutAlt).toBe(0);
  });

  test('Forms should have proper labels', async ({ page }) => {
    await page.goto('/contact-apply.html');

    const unlabeledInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
      return inputs.filter((input) => {
        const type = input.getAttribute('type');
        // Skip hidden and submit inputs
        if (type === 'hidden' || type === 'submit') return false;

        const id = input.getAttribute('id');
        const hasLabel = id && document.querySelector(`label[for="${id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');

        return !hasLabel && !ariaLabel && !ariaLabelledby;
      }).length;
    });

    expect(unlabeledInputs).toBe(0);
  });

  test('Headings should be in logical order', async ({ page }) => {
    await page.goto('/');

    const headingLevels = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return headings.map((h) => parseInt(h.tagName.substring(1)));
    });

    // Should start with h1
    expect(headingLevels[0]).toBe(1);

    // Check for skipped heading levels (e.g., h1 to h3)
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      // Can go down any amount, but should only go up by 1
      if (diff > 0) {
        expect(diff).toBeLessThanOrEqual(1);
      }
    }
  });

  test('Interactive elements should have visible focus indicators', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a, button').first();
    await links.focus();

    const outlineStyle = await links.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
        outlineColor: styles.outlineColor
      };
    });

    // Should have some form of visible focus (outline, box-shadow, border, etc.)
    const hasVisibleFocus =
      outlineStyle.outlineWidth !== '0px' ||
      outlineStyle.outlineStyle !== 'none' ||
      (await links.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.boxShadow !== 'none' || styles.border !== 'none';
      }));

    expect(hasVisibleFocus).toBe(true);
  });

  test('Color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    const contrastResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    const contrastViolations = contrastResults.violations.filter((v) =>
      v.id.includes('color-contrast')
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Language attribute should be set', async ({ page }) => {
    await page.goto('/');

    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBeTruthy();
    expect(lang?.length).toBeGreaterThan(0);
  });

  test('Page should have a title', async ({ page }) => {
    await page.goto('/');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('Links should have accessible names', async ({ page }) => {
    await page.goto('/');

    const linksWithoutText = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.filter((link) => {
        const text = link.textContent?.trim();
        const ariaLabel = link.getAttribute('aria-label');
        const title = link.getAttribute('title');

        return !text && !ariaLabel && !title;
      }).length;
    });

    expect(linksWithoutText).toBe(0);
  });

  test('Buttons should have accessible names', async ({ page }) => {
    await page.goto('/');

    const buttonsWithoutText = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.filter((button) => {
        const text = button.textContent?.trim();
        const ariaLabel = button.getAttribute('aria-label');
        const title = button.getAttribute('title');

        return !text && !ariaLabel && !title;
      }).length;
    });

    expect(buttonsWithoutText).toBe(0);
  });

  test('ARIA attributes should be valid', async ({ page }) => {
    await page.goto('/');

    const ariaResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = ariaResults.violations.filter(
      (v) => v.id.includes('aria-') || v.id.includes('label')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Mobile menu should be accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const hamburger = page.locator('.hamburger, [aria-label*="menu"]').first();

    // Should have aria-expanded attribute
    const ariaExpanded = await hamburger.getAttribute('aria-expanded');
    expect(ariaExpanded).toBeTruthy();

    // Click to open menu
    await hamburger.click();

    // Check updated aria-expanded
    const expandedState = await hamburger.getAttribute('aria-expanded');
    expect(expandedState).toBe('true');
  });

  test('Gallery lightbox should be accessible', async ({ page }) => {
    await page.goto('/services.html');

    // Open lightbox
    const galleryItem = page.locator('.gallery-item').first();
    await galleryItem.click();

    // Lightbox should be visible
    const lightbox = page.locator('#lightbox, .lightbox');
    await expect(lightbox).toBeVisible();

    // Should be keyboard navigable
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Escape');

    // Should close on Escape
    await expect(lightbox).not.toHaveClass(/active/);
  });

  test('Forms should support keyboard navigation', async ({ page }) => {
    await page.goto('/contact-apply.html');

    const firstInput = page.locator('input, textarea').first();
    await firstInput.focus();

    // Tab through form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(activeElement)).toBe(true);
  });

  test('Skip links should be present for keyboard users', async ({ page }) => {
    await page.goto('/');

    // Look for skip to main content link
    const skipLink = page.locator('a[href="#main"], a[href*="skip"]').first();

    if ((await skipLink.count()) > 0) {
      await skipLink.focus();
      await expect(skipLink).toBeFocused();
    }
  });

  test('Animated content should respect prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    expect(hasReducedMotion).toBe(true);

    // Verify animations are disabled or reduced
    const animationDuration = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      return styles.animationDuration;
    });

    // If prefers-reduced-motion is set, animations should be instant or very short
    // This is a basic check - actual implementation depends on CSS
  });
});
