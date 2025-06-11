let lastScrollTop = 0;
let scrollTimeout;
const navbar = document.querySelector(".navbar");

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
