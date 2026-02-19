# Testing Documentation

Complete testing infrastructure for The Reading Roost Educational Services website.

---

## 📊 Test Coverage Summary

- **105 unit and integration tests** - All passing ✅
- **100% code coverage** for gallery.js
- **4 E2E test suites** covering critical user journeys
- **Comprehensive accessibility tests** using axe-core
- **Build process validation** tests

---

## 🧪 Test Types

### Unit Tests (`tests/unit/`)

**Gallery Module** (`tests/unit/gallery.test.js`) - 19 tests
- Initialization behavior
- Lightbox open/close functionality
- Image navigation (next, previous, wraparound)
- Keyboard controls (Escape, Arrow keys)
- Edge cases (single image, multiple opens)
- **100% code coverage**

**Mobile Navigation** (`tests/unit/navigation.test.js`) - 17 tests
- Hamburger menu toggle
- ARIA attribute updates
- Menu state management
- Nav link interactions
- Click outside to close
- Null safety checks

**Form Enhancements** (`tests/unit/form-enhancements.test.js`) - 19 tests
- Floating label effects
- Input typing animations
- Focus/blur behavior
- Accessibility features
- Multiple form handling

### Integration Tests (`tests/integration/`)

**Scroll Behavior** (`tests/integration/scroll-behavior.test.js`) - 21 tests
- IntersectionObserver animations
- Header scroll effects
- Header hide/show on scroll
- Parallax effects
- RequestAnimationFrame throttling
- Edge cases and combined effects

**Build Process** (`tests/integration/build-process.test.js`) - 29 tests
- Build configuration validation
- Output structure verification
- Asset optimization checks
- SCSS compilation
- JavaScript bundling
- Legacy browser support

### End-to-End Tests (`tests/e2e/`)

**Homepage** (`tests/e2e/homepage.spec.js`)
- Page loading and navigation
- Content visibility
- Scroll animations
- Console error detection

**Services Gallery** (`tests/e2e/services-gallery.spec.js`)
- Gallery display and interaction
- Lightbox functionality
- Keyboard navigation
- Body scroll lock
- Image aspect ratios

**Mobile Navigation** (`tests/e2e/mobile-navigation.spec.js`)
- Mobile menu toggle
- ARIA attributes
- Touch interactions
- Cross-page functionality
- Tablet support

**Contact Form** (`tests/e2e/contact-form.spec.js`)
- Form field validation
- Floating labels
- Email validation
- Keyboard navigation
- Accessibility features

### Accessibility Tests (`tests/a11y/`)

**Comprehensive A11y Suite** (`tests/a11y/accessibility.spec.js`)
- WCAG 2.0 AA/AAA compliance
- Color contrast validation
- Keyboard accessibility
- Screen reader support
- ARIA attributes
- Focus indicators
- Heading hierarchy
- Image alt text
- Form labels
- Reduced motion support

---

## 🚀 Running Tests

### Quick Start

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Run all E2E tests (requires dev server)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run only Chromium tests
npm run test:e2e:chromium

# Run only mobile tests
npm run test:e2e:mobile

# Run accessibility tests only
npm run test:a11y
```

### All Tests

```bash
# Run both unit/integration AND E2E tests
npm run test:all
```

---

## 📁 Test Structure

```
tests/
├── unit/                     # Unit tests
│   ├── gallery.test.js       # Gallery module tests
│   ├── navigation.test.js    # Navigation tests
│   └── form-enhancements.test.js # Form tests
│
├── integration/              # Integration tests
│   ├── scroll-behavior.test.js   # Scroll tests
│   └── build-process.test.js     # Build validation
│
├── e2e/                      # End-to-end tests (Playwright)
│   ├── homepage.spec.js      # Homepage tests
│   ├── services-gallery.spec.js  # Gallery E2E
│   ├── mobile-navigation.spec.js # Mobile nav
│   └── contact-form.spec.js      # Form E2E
│
├── a11y/                     # Accessibility tests
│   └── accessibility.spec.js # Axe-core tests
│
├── helpers/                  # Test utilities
│   └── dom-helpers.js        # DOM manipulation helpers
│
└── setup.js                  # Global test setup
```

---

## 🛠️ Configuration Files

### Vitest Config (`vitest.config.js`)
- Environment: jsdom
- Coverage: v8 provider
- Thresholds: 80% for all metrics
- Excludes: E2E and accessibility tests

### Playwright Config (`playwright.config.js`)
- Projects: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Base URL: http://localhost:3000
- Retries: 2 in CI, 0 locally
- Screenshots and videos on failure
- Automatic dev server startup

---

## 📈 Code Coverage

Current coverage for tested files:

| File       | Statements | Branches | Functions | Lines |
|------------|-----------|----------|-----------|-------|
| gallery.js | 100%      | 100%     | 100%      | 100%  |

**Coverage Goals:**
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

View detailed coverage:
```bash
npm run test:coverage
# Open coverage/index.html in browser
```

---

## ✅ Testing Best Practices

### Unit Tests
- Test one thing at a time
- Use descriptive test names
- Mock external dependencies
- Clean up after each test
- Use helper functions for repetitive setup

### Integration Tests
- Test component interactions
- Verify async behavior
- Check state management
- Test error handling

### E2E Tests
- Test critical user journeys
- Verify cross-browser compatibility
- Test mobile responsiveness
- Check for console errors
- Validate accessibility

### Accessibility Tests
- Run on all pages
- Check WCAG compliance
- Verify keyboard navigation
- Test with screen readers
- Validate ARIA attributes

---

## 🐛 Debugging Tests

### Vitest
```bash
# Run specific test file
npm test tests/unit/gallery.test.js

# Run tests matching pattern
npm test -- -t "should open lightbox"

# Run with UI (visual debugging)
npm run test:ui
```

### Playwright
```bash
# Run in headed mode (see browser)
npx playwright test --headed

# Run specific file
npx playwright test tests/e2e/homepage.spec.js

# Debug mode (step through)
npx playwright test --debug

# Run with UI
npm run test:e2e:ui
```

---

## 🔧 Test Utilities

### DOM Helpers (`tests/helpers/dom-helpers.js`)

```javascript
// Create elements
const button = createElement('button', { class: 'btn' }, 'Click me');

// Trigger events
triggerEvent(button, 'click');
triggerKeyEvent('Escape');

// Create test fixtures
const { lightbox, lightboxImage } = createLightboxDOM();
const galleryItems = createGalleryItems(5);
const { form, input, textarea } = createFormDOM();

// Timing utilities
await waitForAnimationFrame();
await wait(100);
```

---

## 📊 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run build
      - run: npm run test:e2e
```

---

## 🎯 Test Priorities

### Critical (Must Pass)
1. Gallery functionality
2. Mobile navigation
3. Form validation
4. Accessibility compliance
5. Build process

### High Priority
1. Scroll behavior
2. Page transitions
3. Responsive design
4. SEO elements

### Medium Priority
1. Animation effects
2. Performance metrics
3. Visual regression

---

## 📝 Adding New Tests

### 1. Unit Test Template

```javascript
import { describe, it, expect, beforeEach } from 'vitest';

describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something specific', () => {
    // Arrange
    const input = 'test';

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe('expected');
  });
});
```

### 2. E2E Test Template

```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    const element = page.locator('.selector');
    await element.click();
    await expect(element).toBeVisible();
  });
});
```

---

## 🔍 Troubleshooting

### Tests Failing Locally
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear test cache: `npx vitest --clearCache`
3. Check Node version: `node --version` (should be 16+)

### E2E Tests Timing Out
1. Increase timeout in playwright.config.js
2. Check dev server is running on port 3000
3. Clear Playwright cache: `npx playwright install`

### Coverage Not Generated
1. Ensure @vitest/coverage-v8 is installed
2. Check coverage thresholds in vitest.config.js
3. Verify files aren't excluded in coverage config

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎉 Test Results

**Current Status: ✅ All Tests Passing**

- Unit Tests: 105/105 passing
- Integration Tests: Included in 105 total
- E2E Tests: Ready to run
- Accessibility Tests: Ready to run
- Code Coverage: 100% for gallery.js

**Last Updated:** 2025-01-15
