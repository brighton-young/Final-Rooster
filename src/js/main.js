// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Modern JavaScript for The Reading Roost
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu?.contains(e.target) && !hamburger?.contains(e.target)) {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .section-header, .about-grid, .scholarship-card, .testimonial-card, .application-form, .contact-grid'
  );
  animatedElements.forEach((el) => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Smooth header background change on scroll
  const header = document.querySelector('.main-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (header) {
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 251, 240, 0.98)';
        header.style.backdropFilter = 'blur(25px)';
      } else {
        header.style.background = 'rgba(255, 251, 240, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
      }

      // Add hide/show header effect
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }

    lastScrollY = currentScrollY;
  });

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Form enhancements
  const formInputs = document.querySelectorAll('input, textarea');
  formInputs.forEach((input) => {
    // Add floating labels effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });

    // Add typing animation
    input.addEventListener('input', () => {
      input.style.transform = 'scale(1.02)';
      setTimeout(() => {
        input.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // Add hover sound effect simulation through subtle animations
  const interactiveElements = document.querySelectorAll(
    '.btn, .nav-link, .scholarship-card, .testimonial-card'
  );
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.style.willChange = 'transform';
    });

    element.addEventListener('mouseleave', () => {
      element.style.willChange = 'auto';
    });
  });

  // Stagger animation for service options
  const serviceOptions = document.querySelectorAll('.service-options span');
  serviceOptions.forEach((option, index) => {
    option.style.animationDelay = `${index * 0.1}s`;
    option.classList.add('stagger-fade-in');
  });
});
