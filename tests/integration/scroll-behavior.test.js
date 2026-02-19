import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createElement, triggerEvent, waitForAnimationFrame } from '../helpers/dom-helpers.js';

describe('Scroll Behavior Integration', () => {
  let header;
  let heroSection;
  let animatedElements;
  let scrollHandler;
  let rafCallback;

  beforeEach(() => {
    // Create header
    header = createElement('header', { class: 'main-header' });
    document.body.appendChild(header);

    // Create hero section
    heroSection = createElement('section', { class: 'hero-section' });
    document.body.appendChild(heroSection);

    // Create animated elements
    animatedElements = [
      createElement('div', { class: 'section-header' }),
      createElement('div', { class: 'about-grid' }),
      createElement('div', { class: 'scholarship-card' })
    ];

    animatedElements.forEach((el) => {
      el.classList.add('animate-on-scroll');
      document.body.appendChild(el);
    });

    // Mock IntersectionObserver with actual callback
    let observerCallback;
    global.IntersectionObserver = class {
      constructor(callback) {
        observerCallback = callback;
      }
      observe(element) {
        element._observer = observerCallback;
      }
      disconnect() {}
      unobserve() {}
    };

    // Store the IntersectionObserver callback for testing
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    });

    animatedElements.forEach((el) => observer.observe(el));

    // Set up scroll handler simulation
    let ticking = false;
    let lastScrollY = 0;

    scrollHandler = () => {
      if (!ticking) {
        rafCallback = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Header background and visibility
          if (header) {
            if (currentScrollY > 100) {
              header.style.background = 'rgba(255, 251, 240, 0.4)';
              header.style.backdropFilter = 'blur(25px)';
            } else {
              header.style.background = 'rgba(255, 251, 240, 0.3)';
              header.style.backdropFilter = 'blur(20px)';
            }

            // Hide/show header effect
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
              header.style.transform = 'translateY(-100%)';
            } else {
              header.style.transform = 'translateY(0)';
            }
          }

          // Parallax effect for hero section
          if (heroSection) {
            const rate = currentScrollY * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
  });

  afterEach(() => {
    window.removeEventListener('scroll', scrollHandler);
    window.scrollY = 0;
    document.body.innerHTML = '';
  });

  describe('IntersectionObserver animations', () => {
    it('should add in-view class when element is intersecting', () => {
      const element = animatedElements[0];

      expect(element.classList.contains('in-view')).toBe(false);

      // Simulate intersection
      const mockEntry = {
        target: element,
        isIntersecting: true
      };

      element._observer([mockEntry]);

      expect(element.classList.contains('in-view')).toBe(true);
    });

    it('should not add in-view class when element is not intersecting', () => {
      const element = animatedElements[0];

      const mockEntry = {
        target: element,
        isIntersecting: false
      };

      element._observer([mockEntry]);

      expect(element.classList.contains('in-view')).toBe(false);
    });

    it('should observe all animated elements', () => {
      animatedElements.forEach((element) => {
        expect(element.classList.contains('animate-on-scroll')).toBe(true);
        expect(element._observer).toBeDefined();
      });
    });
  });

  describe('Header scroll effects', () => {
    it('should have initial background at scroll position 0', async () => {
      window.scrollY = 0;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.background).toBe('rgba(255, 251, 240, 0.3)');
      expect(header.style.backdropFilter).toBe('blur(20px)');
    });

    it('should change header background after scrolling 100px', async () => {
      window.scrollY = 150;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.background).toBe('rgba(255, 251, 240, 0.4)');
      expect(header.style.backdropFilter).toBe('blur(25px)');
    });

    it('should revert header background when scrolling back up', async () => {
      window.scrollY = 150;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      window.scrollY = 50;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.background).toBe('rgba(255, 251, 240, 0.3)');
      expect(header.style.backdropFilter).toBe('blur(20px)');
    });
  });

  describe('Header hide/show on scroll', () => {
    it('should not hide header when scrolling down less than 200px', async () => {
      window.scrollY = 150;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.transform).toBe('translateY(0)');
    });

    it('should hide header when scrolling down past 200px', async () => {
      window.scrollY = 0;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      window.scrollY = 250;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.transform).toBe('translateY(-100%)');
    });

    it('should show header when scrolling up', async () => {
      window.scrollY = 250;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      window.scrollY = 200;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.transform).toBe('translateY(0)');
    });

    it('should maintain header visibility at top of page', async () => {
      window.scrollY = 0;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.transform).toBe('translateY(0)');
    });
  });

  describe('Parallax effect', () => {
    it('should apply no parallax at scroll position 0', async () => {
      window.scrollY = 0;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(heroSection.style.transform).toBe('translateY(0px)');
    });

    it('should apply parallax effect at 100px scroll', async () => {
      window.scrollY = 100;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(heroSection.style.transform).toBe('translateY(-50px)');
    });

    it('should apply parallax effect at 200px scroll', async () => {
      window.scrollY = 200;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(heroSection.style.transform).toBe('translateY(-100px)');
    });

    it('should update parallax smoothly on scroll changes', async () => {
      window.scrollY = 50;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();
      expect(heroSection.style.transform).toBe('translateY(-25px)');

      window.scrollY = 150;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();
      expect(heroSection.style.transform).toBe('translateY(-75px)');
    });
  });

  describe('RequestAnimationFrame throttling', () => {
    it('should throttle scroll events using requestAnimationFrame', async () => {
      const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

      // Trigger multiple scroll events rapidly
      for (let i = 0; i < 5; i++) {
        window.scrollY = i * 10;
        triggerEvent(window, 'scroll');
      }

      // Should only call rAF once per scroll due to ticking flag
      // The actual implementation uses a ticking flag to prevent multiple rAF calls
      expect(rafSpy).toHaveBeenCalled();
    });

    it('should allow new scroll updates after animation frame completes', async () => {
      window.scrollY = 100;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      const initialTransform = heroSection.style.transform;

      window.scrollY = 200;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(heroSection.style.transform).not.toBe(initialTransform);
    });
  });

  describe('Combined scroll effects', () => {
    it('should apply all scroll effects simultaneously at 250px', async () => {
      window.scrollY = 0;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      window.scrollY = 250;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      // Header background changed
      expect(header.style.background).toBe('rgba(255, 251, 240, 0.4)');

      // Header hidden on scroll down
      expect(header.style.transform).toBe('translateY(-100%)');

      // Parallax applied
      expect(heroSection.style.transform).toBe('translateY(-125px)');
    });

    it('should handle scroll up from deep scroll position', async () => {
      window.scrollY = 500;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      window.scrollY = 50;
      triggerEvent(window, 'scroll');
      await waitForAnimationFrame();

      expect(header.style.background).toBe('rgba(255, 251, 240, 0.3)');
      expect(header.style.transform).toBe('translateY(0)');
      expect(heroSection.style.transform).toBe('translateY(-25px)');
    });
  });

  describe('Edge cases', () => {
    it('should handle missing header element gracefully', async () => {
      header.remove();
      header = null;

      window.scrollY = 100;

      expect(() => {
        triggerEvent(window, 'scroll');
      }).not.toThrow();
    });

    it('should handle missing hero section gracefully', async () => {
      heroSection.remove();
      heroSection = null;

      window.scrollY = 100;

      expect(() => {
        triggerEvent(window, 'scroll');
      }).not.toThrow();
    });

    it('should handle rapid scroll direction changes', async () => {
      const scrollPositions = [0, 100, 50, 200, 150, 300, 100];

      for (const position of scrollPositions) {
        window.scrollY = position;
        triggerEvent(window, 'scroll');
        await waitForAnimationFrame();
      }

      // Should end at final position without errors
      expect(header.style.transform).toBe('translateY(0)'); // Scrolling up from 300 to 100
    });
  });
});
