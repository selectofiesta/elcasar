let lastScrollTop = 0;
let scrollTimeout;
const navbar = document.querySelector(".navbar");

// Detectar el scroll y ocultar/mostrar la barra de navegación
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Dirección del scroll
  if (currentScroll > lastScrollTop) {
    // Bajando: ocultar
    navbar.classList.add("hide");
  } else {
    // Subiendo: mostrar
    navbar.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

  // Si se detiene el scroll por más de 1 segundo → mostrar navbar
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    navbar.classList.remove("hide");
  }, 1000);
});

// Variables para manejar el expandir/contraer de la imagen
let expandContainer = document.getElementById("expandContainer");
let expandBtn = document.querySelector(".expand-btn");

// Función para expandir o contraer la imagen de fondo y el rectángulo negro
expandBtn.addEventListener("click", () => {
  // Alternamos la clase "expanded" que activa la expansión de la imagen y el ocultamiento del overlay
  expandContainer.classList.toggle("expanded");
  
  // También alternamos la clase "hidden" para controlar la visibilidad del rectángulo negro
  expandContainer.classList.toggle("hidden");
});
