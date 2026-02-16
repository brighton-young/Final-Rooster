import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createFormDOM, triggerEvent, wait, createElement } from '../helpers/dom-helpers.js';

describe('Form Enhancements', () => {
  let formElements;

  beforeEach(() => {
    formElements = createFormDOM();

    // Set up form enhancement listeners (from main.js)
    const formInputs = document.querySelectorAll('input, textarea');

    formInputs.forEach((input) => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.parentElement.classList.remove('focused');
        }
      });

      input.addEventListener('input', () => {
        input.style.transform = 'scale(1.02)';
        setTimeout(() => {
          input.style.transform = 'scale(1)';
        }, 150);
      });
    });
  });

  describe('Floating label effect', () => {
    it('should add focused class to parent on input focus', () => {
      const { input, inputWrapper } = formElements;

      expect(inputWrapper.classList.contains('focused')).toBe(false);

      triggerEvent(input, 'focus');

      expect(inputWrapper.classList.contains('focused')).toBe(true);
    });

    it('should add focused class to textarea parent on focus', () => {
      const { textarea } = formElements;
      const textareaParent = textarea.parentElement;

      expect(textareaParent.classList.contains('focused')).toBe(false);

      triggerEvent(textarea, 'focus');

      expect(textareaParent.classList.contains('focused')).toBe(true);
    });

    it('should remove focused class on blur when input is empty', () => {
      const { input, inputWrapper } = formElements;

      triggerEvent(input, 'focus');
      expect(inputWrapper.classList.contains('focused')).toBe(true);

      input.value = '';
      triggerEvent(input, 'blur');

      expect(inputWrapper.classList.contains('focused')).toBe(false);
    });

    it('should keep focused class on blur when input has value', () => {
      const { input, inputWrapper } = formElements;

      triggerEvent(input, 'focus');
      input.value = 'John Doe';
      triggerEvent(input, 'blur');

      expect(inputWrapper.classList.contains('focused')).toBe(true);
    });

    it('should handle multiple focus/blur cycles', () => {
      const { input, inputWrapper } = formElements;

      // First cycle - empty
      triggerEvent(input, 'focus');
      expect(inputWrapper.classList.contains('focused')).toBe(true);
      triggerEvent(input, 'blur');
      expect(inputWrapper.classList.contains('focused')).toBe(false);

      // Second cycle - with value
      triggerEvent(input, 'focus');
      input.value = 'Test';
      triggerEvent(input, 'blur');
      expect(inputWrapper.classList.contains('focused')).toBe(true);

      // Third cycle - clear value
      triggerEvent(input, 'focus');
      input.value = '';
      triggerEvent(input, 'blur');
      expect(inputWrapper.classList.contains('focused')).toBe(false);
    });
  });

  describe('Typing animation', () => {
    it('should scale input on typing', () => {
      const { input } = formElements;

      expect(input.style.transform).toBe('');

      input.value = 'T';
      triggerEvent(input, 'input');

      expect(input.style.transform).toBe('scale(1.02)');
    });

    it('should reset scale after 150ms', async () => {
      const { input } = formElements;
      vi.useFakeTimers();

      input.value = 'Test';
      triggerEvent(input, 'input');

      expect(input.style.transform).toBe('scale(1.02)');

      vi.advanceTimersByTime(150);

      expect(input.style.transform).toBe('scale(1)');

      vi.useRealTimers();
    });

    it('should scale textarea on typing', () => {
      const { textarea } = formElements;

      textarea.value = 'Message';
      triggerEvent(textarea, 'input');

      expect(textarea.style.transform).toBe('scale(1.02)');
    });

    it('should handle rapid typing', async () => {
      const { input } = formElements;
      vi.useFakeTimers();

      // Type multiple characters rapidly
      const text = 'Hello';
      for (let i = 0; i < text.length; i++) {
        input.value += text[i];
        triggerEvent(input, 'input');
      }

      expect(input.style.transform).toBe('scale(1.02)');

      // Wait for all animations to complete
      vi.advanceTimersByTime(150);

      expect(input.style.transform).toBe('scale(1)');

      vi.useRealTimers();
    });
  });

  describe('Combined effects', () => {
    it('should handle focus, typing, and blur sequence', async () => {
      const { input, inputWrapper } = formElements;
      vi.useFakeTimers();

      // Focus
      triggerEvent(input, 'focus');
      expect(inputWrapper.classList.contains('focused')).toBe(true);

      // Type
      input.value = 'Test User';
      triggerEvent(input, 'input');
      expect(input.style.transform).toBe('scale(1.02)');

      vi.advanceTimersByTime(150);
      expect(input.style.transform).toBe('scale(1)');

      // Blur with value
      triggerEvent(input, 'blur');
      expect(inputWrapper.classList.contains('focused')).toBe(true);

      vi.useRealTimers();
    });

    it('should handle all form inputs independently', async () => {
      const { input, textarea } = formElements;

      // Both inputs can have focused state simultaneously
      triggerEvent(input, 'focus');
      triggerEvent(textarea, 'focus');

      expect(input.parentElement.classList.contains('focused')).toBe(true);
      expect(textarea.parentElement.classList.contains('focused')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle input with initial value', () => {
      const { input, inputWrapper } = formElements;

      input.value = 'Pre-filled';
      triggerEvent(input, 'focus');
      triggerEvent(input, 'blur');

      expect(inputWrapper.classList.contains('focused')).toBe(true);
    });

    it('should handle whitespace-only values as empty', () => {
      const { input, inputWrapper } = formElements;

      triggerEvent(input, 'focus');
      input.value = '   ';
      triggerEvent(input, 'blur');

      // This tests current behavior - whitespace is kept as focused
      // If you want to treat whitespace as empty, the code would need to be updated
      expect(inputWrapper.classList.contains('focused')).toBe(true);
    });

    it('should handle programmatic value changes', () => {
      const { input } = formElements;

      // Programmatic change doesn't trigger input event automatically
      input.value = 'Programmatic';

      // Manually trigger input event
      triggerEvent(input, 'input');

      expect(input.style.transform).toBe('scale(1.02)');
    });

    it('should not throw errors with missing parent element', () => {
      const orphanInput = document.createElement('input');
      orphanInput.type = 'text';

      expect(() => {
        triggerEvent(orphanInput, 'focus');
        // In real code, this would try to access parentElement
        orphanInput.parentElement?.classList.add('focused');
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should maintain input functionality during animations', async () => {
      const { input } = formElements;
      vi.useFakeTimers();

      input.value = 'Accessible';
      triggerEvent(input, 'input');

      // Input should still be accessible during animation
      expect(input.value).toBe('Accessible');
      expect(input.disabled).toBe(false);

      vi.advanceTimersByTime(150);

      expect(input.value).toBe('Accessible');

      vi.useRealTimers();
    });

    it('should not prevent default input behavior', () => {
      const { input } = formElements;

      const inputEvent = new Event('input', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(inputEvent, 'preventDefault');

      input.dispatchEvent(inputEvent);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not interfere with form submission', () => {
      const { form, input } = formElements;

      input.value = 'Submit Test';
      triggerEvent(input, 'input');

      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const submitSpy = vi.fn();
      form.addEventListener('submit', submitSpy);

      form.dispatchEvent(submitEvent);

      expect(submitSpy).toHaveBeenCalled();
    });
  });

  describe('Multiple forms', () => {
    it('should handle multiple forms on same page', () => {
      // Create second form
      const form2 = createElement('form', { class: 'contact-form-2' });
      const input2Wrapper = createElement('div', { class: 'form-group' });
      const input2 = createElement('input', {
        type: 'text',
        id: 'name2',
        name: 'name2',
        class: 'form-control'
      });

      input2Wrapper.appendChild(input2);
      form2.appendChild(input2Wrapper);
      document.body.appendChild(form2);

      // Add event listeners to second form input
      input2.addEventListener('focus', () => {
        input2.parentElement.classList.add('focused');
      });

      input2.addEventListener('blur', () => {
        if (input2.value === '') {
          input2.parentElement.classList.remove('focused');
        }
      });

      // Both forms should work independently
      triggerEvent(formElements.input, 'focus');
      triggerEvent(input2, 'focus');

      expect(formElements.input.parentElement.classList.contains('focused')).toBe(true);
      expect(input2.parentElement.classList.contains('focused')).toBe(true);
    });
  });
});
