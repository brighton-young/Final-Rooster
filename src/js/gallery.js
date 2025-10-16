// Image Gallery Lightbox Functionality

export function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!lightbox || galleryItems.length === 0) return;

  let currentIndex = 0;
  const totalImages = galleryItems.length;

  // Get all image sources
  const imageSources = Array.from(galleryItems).map(
    (item) => item.querySelector('.gallery-image').src
  );

  // Open lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Update lightbox image
  function updateLightboxImage() {
    lightboxImage.src = imageSources[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
  }

  // Show next image
  function showNext() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateLightboxImage();
  }

  // Show previous image
  function showPrev() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateLightboxImage();
  }

  // Event listeners for gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Event listeners for lightbox controls
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  // Close lightbox when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
    }
  });

  // Prevent image dragging
  lightboxImage.addEventListener('dragstart', (e) => e.preventDefault());
}
