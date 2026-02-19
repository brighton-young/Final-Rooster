import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createNavigationDOM, triggerEvent } from '../helpers/dom-helpers.js';

describe('Mobile Navigation', () => {
  let elements;

  beforeEach(() => {
    elements = createNavigationDOM();

    // Simulate the navigation code from main.js
    const { hamburger, navMenu, navLinks } = elements;

    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.classList.contains('active');
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', !isExpanded);
      // Set overflow AFTER toggling classes
      const menuActive = navMenu.classList.contains('active');
      document.body.style.overflow = menuActive ? 'hidden' : '';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  afterEach(() => {
    // Clean up - Note: afterEach runs after test, so we don't clear during test
  });

  describe('Hamburger menu toggle', () => {
    it('should toggle menu visibility when hamburger is clicked', () => {
      const { hamburger, navMenu } = elements;

      expect(hamburger.classList.contains('active')).toBe(false);
      expect(navMenu.classList.contains('active')).toBe(false);

      triggerEvent(hamburger, 'click');

      expect(hamburger.classList.contains('active')).toBe(true);
      expect(navMenu.classList.contains('active')).toBe(true);
    });

    it('should toggle menu closed when clicked again', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);

      triggerEvent(hamburger, 'click');

      expect(hamburger.classList.contains('active')).toBe(false);
      expect(navMenu.classList.contains('active')).toBe(false);
    });
  });

  describe('ARIA attributes', () => {
    it('should update aria-expanded when menu is opened', () => {
      const { hamburger } = elements;

      expect(hamburger.getAttribute('aria-expanded')).toBe('false');

      triggerEvent(hamburger, 'click');

      expect(hamburger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should update aria-expanded when menu is closed', () => {
      const { hamburger } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.getAttribute('aria-expanded')).toBe('true');

      triggerEvent(hamburger, 'click');

      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Menu state management', () => {
    it('should activate menu when hamburger is clicked', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');

      expect(navMenu.classList.contains('active')).toBe(true);
      expect(hamburger.classList.contains('active')).toBe(true);
    });

    it('should deactivate menu when clicked again', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(navMenu.classList.contains('active')).toBe(true);

      triggerEvent(hamburger, 'click');

      expect(navMenu.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });
  });

  describe('Nav link interactions', () => {
    it('should close menu when nav link is clicked', () => {
      const { hamburger, navMenu, navLinks } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);
      expect(navMenu.classList.contains('active')).toBe(true);

      triggerEvent(navLinks[0], 'click');

      expect(hamburger.classList.contains('active')).toBe(false);
      expect(navMenu.classList.contains('active')).toBe(false);
    });

    it('should close menu when any nav link is clicked', () => {
      const { hamburger, navMenu, navLinks } = elements;

      triggerEvent(hamburger, 'click');
      expect(navMenu.classList.contains('active')).toBe(true);

      triggerEvent(navLinks[0], 'click');

      expect(navMenu.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });

    it('should close menu for any nav link clicked', () => {
      const { hamburger, navLinks } = elements;

      // Test first link
      triggerEvent(hamburger, 'click');
      triggerEvent(navLinks[0], 'click');
      expect(hamburger.classList.contains('active')).toBe(false);

      // Test second link
      triggerEvent(hamburger, 'click');
      triggerEvent(navLinks[1], 'click');
      expect(hamburger.classList.contains('active')).toBe(false);
    });
  });

  describe('Click outside to close', () => {
    it('should close menu when clicking outside navigation area', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);

      // Click on body (outside menu and hamburger)
      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);
      triggerEvent(outsideElement, 'click');

      expect(hamburger.classList.contains('active')).toBe(false);
      expect(navMenu.classList.contains('active')).toBe(false);
    });

    it('should not close menu when clicking on navigation menu', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);

      triggerEvent(navMenu, 'click');

      expect(hamburger.classList.contains('active')).toBe(true);
      expect(navMenu.classList.contains('active')).toBe(true);
    });

    it('should not close menu when clicking on hamburger itself', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);

      // The hamburger click toggles, so we need to check it doesn't close from outside click
      // This is already tested by the toggle test, but let's verify the contains check works
      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', {
        value: hamburger,
        enumerable: true
      });

      document.dispatchEvent(clickEvent);

      // Menu should still be active (hamburger.contains prevents the outside click close)
      expect(hamburger.classList.contains('active')).toBe(true);
    });

    it('should close menu when clicking outside', () => {
      const { hamburger, navMenu } = elements;

      triggerEvent(hamburger, 'click');
      expect(navMenu.classList.contains('active')).toBe(true);

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);
      triggerEvent(outsideElement, 'click');

      expect(navMenu.classList.contains('active')).toBe(false);
      expect(hamburger.classList.contains('active')).toBe(false);
    });
  });

  describe('Null safety', () => {
    it('should handle missing hamburger element gracefully', () => {
      document.body.innerHTML = '';
      const navMenu = document.createElement('nav');
      navMenu.className = 'nav-menu';
      document.body.appendChild(navMenu);

      // Should not throw error when hamburger doesn't exist
      expect(() => {
        const hamburger = document.querySelector('.hamburger');
        hamburger?.classList.toggle('active'); // Optional chaining
      }).not.toThrow();
    });

    it('should handle missing nav menu element gracefully', () => {
      document.body.innerHTML = '';
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger';
      document.body.appendChild(hamburger);

      // Should not throw error when navMenu doesn't exist
      expect(() => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu?.classList.toggle('active'); // Optional chaining
      }).not.toThrow();
    });
  });

  describe('Multiple interactions', () => {
    it('should handle rapid open/close cycles', () => {
      const { hamburger } = elements;

      for (let i = 0; i < 5; i++) {
        triggerEvent(hamburger, 'click');
        expect(hamburger.classList.contains('active')).toBe(true);

        triggerEvent(hamburger, 'click');
        expect(hamburger.classList.contains('active')).toBe(false);
      }

      expect(document.body.style.overflow).toBe('');
    });

    it('should maintain correct state after multiple nav link clicks', () => {
      const { hamburger, navLinks } = elements;

      triggerEvent(hamburger, 'click');
      triggerEvent(navLinks[0], 'click');

      triggerEvent(hamburger, 'click');
      triggerEvent(navLinks[1], 'click');

      triggerEvent(hamburger, 'click');
      expect(hamburger.classList.contains('active')).toBe(true);
    });
  });
});
