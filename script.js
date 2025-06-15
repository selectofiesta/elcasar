document.addEventListener('DOMContentLoaded', function () {
  // Scroll para ocultar/mostrar la navbar
  let lastScrollTop = 0;
  let scrollTimeout;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      navbar.classList.remove("hide");
    }, 1000);
  });

  // Expandir imagen
  const expandContainer = document.getElementById("expandContainer");
  const expandBtn = document.querySelector(".expand-btn");

  if (expandBtn && expandContainer) {
    expandBtn.addEventListener("click", () => {
      expandContainer.classList.toggle("expanded");
      expandContainer.classList.toggle("hidden");
    });
  } else {
    console.warn("No se encontró '.expand-btn' o '#expandContainer'");
  }

  // Menú hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    console.log("Script cargado correctamente. Esperando clic en el menú...");

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');

      if (navLinks.classList.contains('show')) {
        console.log("Menú hamburguesa desplegado");
      } else {
        console.log("Menú hamburguesa ocultado");
      }
    });
  } else {
    console.warn("Elemento '.menu-toggle' o '.nav-links' no encontrado.");
  }
});

// Carrusel de imágenes
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-button.left');
const nextBtn = document.querySelector('.carousel-button.right');
const images = document.querySelectorAll('.carousel-img');
const counter = document.querySelector('.carousel-counter');
let currentIndex = 0;

function updateCarousel() {
  const width = images[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;

  // Actualizar el contador (índice base 1)
  counter.textContent = `${currentIndex + 1} de ${images.length}`;
}

// Botones manuales
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = images.length - 1; // ir al final si estamos al inicio
    }
    updateCarousel();
    resetAutoSlide();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // volver al inicio si estamos al final
    }
    updateCarousel();
    resetAutoSlide();
  });
}

window.addEventListener('resize', updateCarousel);
updateCarousel();

// Función para avance automático
let autoSlideInterval = setInterval(() => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
}, 3000);

// Reiniciar el intervalo automático si el usuario usa botones
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  }, 3000);
}

