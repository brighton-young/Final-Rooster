import { beforeEach, afterEach, vi } from 'vitest';

// Setup DOM environment
beforeEach(() => {
  // Reset document body
  document.body.innerHTML = '';

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });

  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      return null;
    }
    disconnect() {
      return null;
    }
    unobserve() {
      return null;
    }
  };

  // Mock requestAnimationFrame
  global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0);
  };

  // Mock cancelAnimationFrame
  global.cancelAnimationFrame = (id) => {
    clearTimeout(id);
  };

  // Reset window.scrollY
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: 0
  });
});

afterEach(() => {
  // Clean up any event listeners
  document.body.innerHTML = '';
  document.body.style.overflow = '';
  vi.clearAllMocks();
  vi.clearAllTimers();
});
