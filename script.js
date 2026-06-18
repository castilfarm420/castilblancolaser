const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').toLowerCase();
      const match = filter === 'todos' || categories.includes(filter.toLowerCase());
      card.classList.toggle('hide', !match);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Galería ampliada de proyectos
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMaterial = document.getElementById('modalMaterial');
const modalTechnique = document.getElementById('modalTechnique');
const modalCounter = document.getElementById('modalCounter');
const modalThumbs = document.getElementById('modalThumbs');
const modalWhatsapp = document.getElementById('modalWhatsapp');
const prevButton = document.querySelector('.modal-arrow.prev');
const nextButton = document.querySelector('.modal-arrow.next');
let currentImages = [];
let currentIndex = 0;
let currentTitle = '';

function isImageFile(value) {
  return /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(value.trim());
}

function renderModalImage() {
  const item = currentImages[currentIndex] || 'Imagen';
  modalImage.classList.remove('has-photo');
  modalImage.style.removeProperty('--photo');

  if (isImageFile(item)) {
    modalImage.textContent = '';
    modalImage.classList.add('has-photo');
    modalImage.style.setProperty('--photo', `url("${item}")`);
  } else {
    modalImage.textContent = item;
  }

  modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  [...modalThumbs.children].forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentIndex);
  });
}

function openProject(card) {
  currentTitle = card.dataset.title || card.querySelector('h3')?.textContent || 'Proyecto';
  currentImages = (card.dataset.gallery || 'Imagen principal').split('|').map(item => item.trim()).filter(Boolean);
  currentIndex = 0;

  modalTitle.textContent = currentTitle;
  modalDescription.textContent = card.dataset.description || '';
  modalMaterial.textContent = card.dataset.material || 'Consultar';
  modalTechnique.textContent = card.dataset.technique || 'Láser';
  modalWhatsapp.href = `https://wa.me/34642823258?text=${encodeURIComponent('Hola, quiero pedir presupuesto para un trabajo parecido a: ' + currentTitle)}`;

  modalThumbs.innerHTML = '';
  currentImages.forEach((item, index) => {
    const thumb = document.createElement('button');
    thumb.className = 'modal-thumb';
    thumb.type = 'button';
    if (isImageFile(item)) {
      thumb.classList.add('has-photo');
      thumb.style.backgroundImage = `url("${item}")`;
      thumb.textContent = `Foto ${index + 1}`;
    } else {
      thumb.textContent = item;
    }
    thumb.addEventListener('click', () => {
      currentIndex = index;
      renderModalImage();
    });
    modalThumbs.appendChild(thumb);
  });

  renderModalImage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-is-open');
}

function closeProject() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-is-open');
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderModalImage();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderModalImage();
}

document.querySelectorAll('.project-card').forEach(card => {
  card.querySelector('.project-open')?.addEventListener('click', () => openProject(card));
});

document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeProject);
});

nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);

document.addEventListener('keydown', event => {
  if (!modal.classList.contains('open')) return;
  if (event.key === 'Escape') closeProject();
  if (event.key === 'ArrowRight') showNextImage();
  if (event.key === 'ArrowLeft') showPrevImage();
});


// Formulario MiniTú: prepara el mensaje de WhatsApp y recuerda adjuntar la foto manualmente
const funkoForm = document.getElementById('funkoForm');
const funkoNombre = document.getElementById('funkoNombre');
const funkoProfesion = document.getElementById('funkoProfesion');
const funkoCurso = document.getElementById('funkoCurso');
const previewNombre = document.getElementById('previewNombre');
const previewTextoSuperior = document.getElementById('previewTextoSuperior');
const previewCurso = document.getElementById('previewCurso');

function updateFunkoPreview() {
  if (!funkoForm || !previewNombre || !previewTextoSuperior || !previewCurso) return;
  const nombre = (funkoNombre?.value || 'TU NOMBRE').trim();
  const textoSuperior = (funkoProfesion?.value || 'TU TEXTO AQUÍ').trim();
  const curso = (funkoCurso?.value || 'CURSO / AÑO').trim();
  previewNombre.textContent = nombre.slice(0, 18).toUpperCase();
  previewTextoSuperior.textContent = textoSuperior.slice(0, 18).toUpperCase();
  previewCurso.textContent = curso.slice(0, 10).toUpperCase();
}

[funkoNombre, funkoProfesion, funkoCurso].forEach(input => {
  if (!input) return;
  input.classList.add('preview-active');
  input.addEventListener('input', updateFunkoPreview);
});
updateFunkoPreview();

if (funkoForm) {
  funkoForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(funkoForm);
    const notaCliente = `

📸 NOTA IMPORTANTE:

Para poder diseñar tu MiniTú personalizado, responde a este mensaje adjuntando la fotografía que deseas convertir en figura.

Sin la fotografía no podremos comenzar el diseño.

¡Gracias!`;

    const mensaje = `Hola Castilblanco Laser.\n\nQuiero pedir presupuesto para un MiniTú personalizado.\n\nNombre del personaje: ${data.get('nombre') || ''}\nProfesión, afición, temática o texto a elegir: ${data.get('profesion') || ''}\nCurso / año / detalle circular: ${data.get('cursoAno') || ''}\nNombre para la base: ${data.get('peana') || ''}\nNúmero de personajes: ${data.get('personajes') || '1 personaje'}${notaCliente}\nComentarios: ${data.get('comentarios') || ''}\n\nGracias.`;

    window.open(`https://wa.me/34642823258?text=${encodeURIComponent(mensaje)}`, '_blank');
  });
}

// Carrusel de ejemplos de MiniTú
const funkoSlides = document.querySelectorAll('.funko-slide');
const funkoDots = document.querySelectorAll('.funko-carousel-dots button');
const funkoPrev = document.querySelector('.funko-prev');
const funkoNext = document.querySelector('.funko-next');
let funkoSlideIndex = 0;

function showFunkoSlide(index) {
  if (!funkoSlides.length) return;
  funkoSlideIndex = (index + funkoSlides.length) % funkoSlides.length;
  funkoSlides.forEach((slide, i) => slide.classList.toggle('active', i === funkoSlideIndex));
  funkoDots.forEach((dot, i) => dot.classList.toggle('active', i === funkoSlideIndex));
}

if (funkoPrev && funkoNext) {
  funkoPrev.addEventListener('click', () => showFunkoSlide(funkoSlideIndex - 1));
  funkoNext.addEventListener('click', () => showFunkoSlide(funkoSlideIndex + 1));
  funkoDots.forEach((dot, i) => dot.addEventListener('click', () => showFunkoSlide(i)));
}


// Ampliar imágenes del carrusel de Funkos al hacer clic
funkoSlides.forEach((slide, i) => {
  slide.style.cursor = 'zoom-in';
  slide.addEventListener('click', () => {
    currentTitle = 'MiniTú personalizados';
    currentImages = Array.from(funkoSlides).map(img => img.getAttribute('src')).filter(Boolean);
    currentIndex = i;
    modalTitle.textContent = currentTitle;
    modalDescription.textContent = 'Galería de ejemplos reales de MiniTú y maqueta explicativa de zonas personalizables.';
    modalMaterial.textContent = 'Madera';
    modalTechnique.textContent = 'Corte y grabado láser';
    modalWhatsapp.href = `https://wa.me/34642823258?text=${encodeURIComponent('Hola, quiero pedir presupuesto para un MiniTú personalizado.')}`;
    modalThumbs.innerHTML = '';
    currentImages.forEach((item, index) => {
      const thumb = document.createElement('button');
      thumb.className = 'modal-thumb has-photo';
      thumb.type = 'button';
      thumb.style.backgroundImage = `url("${item}")`;
      thumb.textContent = `Foto ${index + 1}`;
      thumb.addEventListener('click', () => {
        currentIndex = index;
        renderModalImage();
      });
      modalThumbs.appendChild(thumb);
    });
    renderModalImage();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-is-open');
  });
});

// Galería MiniTú: navegación con flechas y ampliación suave sin abrir otra ventana
const minituGallery = document.querySelector('.minitu-horizontal-gallery');
const minituItems = document.querySelectorAll('.minitu-gallery-item');
const minituPrev = document.querySelector('.minitu-gallery-prev');
const minituNext = document.querySelector('.minitu-gallery-next');
let minituIndex = 0;

function scrollMiniTuTo(index) {
  if (!minituGallery || !minituItems.length) return;
  minituIndex = (index + minituItems.length) % minituItems.length;
  minituItems[minituIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

if (minituGallery && minituItems.length) {
  minituPrev?.addEventListener('click', () => scrollMiniTuTo(minituIndex - 1));
  minituNext?.addEventListener('click', () => scrollMiniTuTo(minituIndex + 1));

  minituItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const wasExpanded = item.classList.contains('is-expanded');
      minituItems.forEach(other => other.classList.remove('is-expanded'));
      if (!wasExpanded) item.classList.add('is-expanded');
      scrollMiniTuTo(index);
    });
  });
}


// Botón volver arriba
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const toggleBackToTop = () => {
    backToTop.classList.toggle('show', window.scrollY > 420);
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggleBackToTop();
}

// Botón para no mostrar una pared de trabajos de golpe
const worksGallery = document.getElementById('workGallery');
const worksMoreBtn = document.getElementById('worksMoreBtn');
if (worksGallery && worksMoreBtn) {
  worksMoreBtn.addEventListener('click', () => {
    const isCollapsed = worksGallery.classList.toggle('gallery-collapsed');
    worksMoreBtn.textContent = isCollapsed ? 'Ver más trabajos' : 'Ver menos trabajos';
    worksMoreBtn.setAttribute('aria-expanded', String(!isCollapsed));
  });
}


// Flechas de navegación para la galería de portadas
const featuredGallery = document.querySelector('#trabajos .featured-category-gallery');
const featuredPrev = document.querySelector('#trabajos .featured-gallery-prev');
const featuredNext = document.querySelector('#trabajos .featured-gallery-next');
if (featuredGallery && featuredPrev && featuredNext) {
  const moveFeaturedGallery = (direction) => {
    const card = featuredGallery.querySelector('.project-card');
    const gap = 22;
    const amount = card ? card.getBoundingClientRect().width + gap : 320;
    featuredGallery.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };
  featuredPrev.addEventListener('click', () => moveFeaturedGallery(-1));
  featuredNext.addEventListener('click', () => moveFeaturedGallery(1));
}
