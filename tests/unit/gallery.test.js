import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initGallery } from '../../src/js/gallery.js';
import {
  createLightboxDOM,
  createGalleryItems,
  triggerEvent,
  triggerKeyEvent
} from '../helpers/dom-helpers.js';

describe('Gallery Module', () => {
  describe('initGallery', () => {
    it('should not initialize if lightbox element does not exist', () => {
      // No lightbox in DOM
      createGalleryItems(3);

      expect(() => initGallery()).not.toThrow();
      // Function should return early without errors
    });

    it('should not initialize if no gallery items exist', () => {
      createLightboxDOM();
      // No gallery items

      expect(() => initGallery()).not.toThrow();
    });

    it('should initialize when both lightbox and gallery items exist', () => {
      createLightboxDOM();
      createGalleryItems(3);

      expect(() => initGallery()).not.toThrow();
    });
  });

  describe('Gallery interactions', () => {
    let elements;
    let galleryItems;

    beforeEach(() => {
      elements = createLightboxDOM();
      galleryItems = createGalleryItems(3);
      initGallery();
    });

    it('should open lightbox when gallery item is clicked', () => {
      triggerEvent(galleryItems[0], 'click');

      expect(elements.lightbox.classList.contains('active')).toBe(true);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should display correct image when opened', () => {
      triggerEvent(galleryItems[1], 'click');

      expect(elements.lightboxImage.src).toContain('test-image-1.jpg');
      expect(elements.lightboxCounter.textContent).toBe('2 / 3');
    });

    it('should close lightbox when close button is clicked', () => {
      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(true);

      triggerEvent(elements.lightboxClose, 'click');

      expect(elements.lightbox.classList.contains('active')).toBe(false);
      expect(document.body.style.overflow).toBe('');
    });

    it('should close lightbox when clicking outside image', () => {
      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(true);

      // Simulate click on lightbox background (target is lightbox itself)
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: elements.lightbox, enumerable: true });
      elements.lightbox.dispatchEvent(event);

      expect(elements.lightbox.classList.contains('active')).toBe(false);
    });

    it('should not close lightbox when clicking on image', () => {
      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(true);

      // Click on image itself, not background
      triggerEvent(elements.lightboxImage, 'click');

      // Lightbox should still be active
      expect(elements.lightbox.classList.contains('active')).toBe(true);
    });
  });

  describe('Navigation controls', () => {
    let elements;
    let galleryItems;

    beforeEach(() => {
      elements = createLightboxDOM();
      galleryItems = createGalleryItems(5);
      initGallery();
      // Open at index 2
      triggerEvent(galleryItems[2], 'click');
    });

    it('should show next image when next button is clicked', () => {
      expect(elements.lightboxCounter.textContent).toBe('3 / 5');

      triggerEvent(elements.lightboxNext, 'click');

      expect(elements.lightboxImage.src).toContain('test-image-3.jpg');
      expect(elements.lightboxCounter.textContent).toBe('4 / 5');
    });

    it('should show previous image when prev button is clicked', () => {
      expect(elements.lightboxCounter.textContent).toBe('3 / 5');

      triggerEvent(elements.lightboxPrev, 'click');

      expect(elements.lightboxImage.src).toContain('test-image-1.jpg');
      expect(elements.lightboxCounter.textContent).toBe('2 / 5');
    });

    it('should wrap to first image when next is clicked on last image', () => {
      // Go to last image
      triggerEvent(galleryItems[4], 'click');
      expect(elements.lightboxCounter.textContent).toBe('5 / 5');

      triggerEvent(elements.lightboxNext, 'click');

      expect(elements.lightboxImage.src).toContain('test-image-0.jpg');
      expect(elements.lightboxCounter.textContent).toBe('1 / 5');
    });

    it('should wrap to last image when prev is clicked on first image', () => {
      // Go to first image
      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightboxCounter.textContent).toBe('1 / 5');

      triggerEvent(elements.lightboxPrev, 'click');

      expect(elements.lightboxImage.src).toContain('test-image-4.jpg');
      expect(elements.lightboxCounter.textContent).toBe('5 / 5');
    });
  });

  describe('Keyboard navigation', () => {
    let elements;
    let galleryItems;

    beforeEach(() => {
      elements = createLightboxDOM();
      galleryItems = createGalleryItems(3);
      initGallery();
      triggerEvent(galleryItems[1], 'click');
    });

    it('should close lightbox when Escape key is pressed', () => {
      expect(elements.lightbox.classList.contains('active')).toBe(true);

      triggerKeyEvent('Escape');

      expect(elements.lightbox.classList.contains('active')).toBe(false);
    });

    it('should show next image when ArrowRight is pressed', () => {
      expect(elements.lightboxCounter.textContent).toBe('2 / 3');

      triggerKeyEvent('ArrowRight');

      expect(elements.lightboxImage.src).toContain('test-image-2.jpg');
      expect(elements.lightboxCounter.textContent).toBe('3 / 3');
    });

    it('should show previous image when ArrowLeft is pressed', () => {
      expect(elements.lightboxCounter.textContent).toBe('2 / 3');

      triggerKeyEvent('ArrowLeft');

      expect(elements.lightboxImage.src).toContain('test-image-0.jpg');
      expect(elements.lightboxCounter.textContent).toBe('1 / 3');
    });

    it('should not respond to keyboard when lightbox is closed', () => {
      triggerEvent(elements.lightboxClose, 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(false);

      const initialSrc = elements.lightboxImage.src;
      triggerKeyEvent('ArrowRight');

      // Image should not change
      expect(elements.lightboxImage.src).toBe(initialSrc);
    });
  });

  describe('Image drag prevention', () => {
    it('should prevent default drag behavior on lightbox image', () => {
      const elements = createLightboxDOM();
      createGalleryItems(1);
      initGallery();

      const dragEvent = new Event('dragstart', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(dragEvent, 'preventDefault');

      elements.lightboxImage.dispatchEvent(dragEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle single image gallery', () => {
      const elements = createLightboxDOM();
      const galleryItems = createGalleryItems(1);
      initGallery();

      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightboxCounter.textContent).toBe('1 / 1');

      // Next should stay on same image
      triggerEvent(elements.lightboxNext, 'click');
      expect(elements.lightboxCounter.textContent).toBe('1 / 1');

      // Prev should stay on same image
      triggerEvent(elements.lightboxPrev, 'click');
      expect(elements.lightboxCounter.textContent).toBe('1 / 1');
    });

    it('should handle multiple sequential opens and closes', () => {
      const elements = createLightboxDOM();
      const galleryItems = createGalleryItems(3);
      initGallery();

      // Open first image
      triggerEvent(galleryItems[0], 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(true);

      // Close
      triggerEvent(elements.lightboxClose, 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(false);

      // Open different image
      triggerEvent(galleryItems[2], 'click');
      expect(elements.lightbox.classList.contains('active')).toBe(true);
      expect(elements.lightboxCounter.textContent).toBe('3 / 3');
    });
  });
});
