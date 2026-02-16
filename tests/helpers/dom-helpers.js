/**
 * DOM testing helper utilities
 */

/**
 * Create a mock DOM element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string} innerHTML - Inner HTML content
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, innerHTML = '') {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  });

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

/**
 * Create a mock lightbox DOM structure for gallery tests
 * @returns {Object} Object containing lightbox elements
 */
export function createLightboxDOM() {
  const lightbox = createElement('div', { id: 'lightbox' });
  const lightboxImage = createElement('img', { id: 'lightboxImage' });
  const lightboxCounter = createElement('div', { id: 'lightboxCounter' });
  const lightboxClose = createElement('button', { id: 'lightboxClose' });
  const lightboxPrev = createElement('button', { id: 'lightboxPrev' });
  const lightboxNext = createElement('button', { id: 'lightboxNext' });

  lightbox.appendChild(lightboxImage);
  lightbox.appendChild(lightboxCounter);
  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxPrev);
  lightbox.appendChild(lightboxNext);

  document.body.appendChild(lightbox);

  return {
    lightbox,
    lightboxImage,
    lightboxCounter,
    lightboxClose,
    lightboxPrev,
    lightboxNext
  };
}

/**
 * Create mock gallery items
 * @param {number} count - Number of gallery items to create
 * @returns {Array<HTMLElement>}
 */
export function createGalleryItems(count = 3) {
  const items = [];

  for (let i = 0; i < count; i++) {
    const item = createElement('div', { class: 'gallery-item' });
    const img = createElement('img', {
      class: 'gallery-image',
      src: `/test-image-${i}.jpg`,
      alt: `Test image ${i}`
    });

    item.appendChild(img);
    document.body.appendChild(item);
    items.push(item);
  }

  return items;
}

/**
 * Create mock navigation DOM
 * @returns {Object} Object containing navigation elements
 */
export function createNavigationDOM() {
  const hamburger = createElement('button', {
    class: 'hamburger',
    'aria-expanded': 'false'
  });
  const navMenu = createElement('nav', { class: 'nav-menu' });
  const navLink1 = createElement('a', { class: 'nav-link', href: '#home' }, 'Home');
  const navLink2 = createElement('a', { class: 'nav-link', href: '#about' }, 'About');

  navMenu.appendChild(navLink1);
  navMenu.appendChild(navLink2);
  document.body.appendChild(hamburger);
  document.body.appendChild(navMenu);

  return {
    hamburger,
    navMenu,
    navLinks: [navLink1, navLink2]
  };
}

/**
 * Create mock form elements
 * @returns {Object} Object containing form elements
 */
export function createFormDOM() {
  const form = createElement('form', { class: 'contact-form' });
  const inputWrapper = createElement('div', { class: 'form-group' });
  const input = createElement('input', {
    type: 'text',
    id: 'name',
    name: 'name',
    class: 'form-control'
  });
  const textarea = createElement('textarea', {
    id: 'message',
    name: 'message',
    class: 'form-control'
  });

  inputWrapper.appendChild(input);
  form.appendChild(inputWrapper);
  form.appendChild(textarea);
  document.body.appendChild(form);

  return {
    form,
    input,
    textarea,
    inputWrapper
  };
}

/**
 * Trigger a DOM event
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type (e.g., 'click', 'scroll')
 * @param {Object} eventInit - Event initialization options
 */
export function triggerEvent(element, eventType, eventInit = {}) {
  const event = new Event(eventType, { bubbles: true, ...eventInit });
  element.dispatchEvent(event);
}

/**
 * Trigger a keyboard event
 * @param {string} key - Key name (e.g., 'Escape', 'ArrowRight')
 * @param {Object} eventInit - Event initialization options
 */
export function triggerKeyEvent(key, eventInit = {}) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, ...eventInit });
  document.dispatchEvent(event);
}

/**
 * Wait for next animation frame
 * @returns {Promise}
 */
export function waitForAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise}
 */
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
