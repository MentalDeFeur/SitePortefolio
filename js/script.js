document.addEventListener('DOMContentLoaded', () => {
  // Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const hudNav = document.getElementById('hudNav');

  if (menuToggle && hudNav) {
    menuToggle.addEventListener('click', () => {
      hudNav.classList.toggle('active');
    });

    hudNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hudNav.classList.remove('active');
      });
    });
  }

  // Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artCards = document.querySelectorAll('.art-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      artCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  const openLightbox = (card) => {
    const imgSrc = card.getAttribute('data-img');
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');

    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  artCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});
