/* ============================================================
   SELECTO — script.js
   Módulos: Navbar · Carrusel · Scroll Reveal · Contadores
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR ──────────────────────────────────────────────── */
  const initNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.navbar__toggle');
    const links  = document.querySelector('.navbar__links');
    if (!navbar) return;

    // Scroll: hide on down, show on up
    let lastY = 0;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      navbar.classList.toggle('is-scrolled', y > 50);
      navbar.classList.toggle('is-hidden',   y > lastY && y > 120);
      lastY = y < 0 ? 0 : y;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // Hamburger
    if (!toggle || !links) return;

    const openMenu  = () => { links.classList.add('is-open');  toggle.classList.add('is-open');  toggle.setAttribute('aria-expanded', 'true'); };
    const closeMenu = () => { links.classList.remove('is-open'); toggle.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
    const isOpen    = () => links.classList.contains('is-open');

    toggle.addEventListener('click', () => isOpen() ? closeMenu() : openMenu());

    // Close on link click
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen() && !navbar.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen()) { closeMenu(); toggle.focus(); }
    });
  };


  /* ── CARRUSEL ────────────────────────────────────────────── */
  const initCarousel = () => {
    const wrap    = document.querySelector('.carousel-wrap');
    const track   = document.querySelector('.carousel-track');
    const imgs    = document.querySelectorAll('.carousel-img');
    const prevBtn = document.querySelector('.carousel-btn--prev');
    const nextBtn = document.querySelector('.carousel-btn--next');
    const counter = document.querySelector('.carousel-counter');
    const dotsEl  = document.querySelector('.carousel-dots');

    if (!track || imgs.length === 0) return;

    const TOTAL = imgs.length;
    let current = 0;
    let autoId;

    // Build dots (max 20 to avoid clutter)
    const MAX_DOTS = 20;
    const dots = [];
    if (dotsEl && TOTAL <= MAX_DOTS) {
      imgs.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
        d.setAttribute('aria-label', `Imagen ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
        dots.push(d);
      });
    }

    const goTo = (idx) => {
      current = ((idx % TOTAL) + TOTAL) % TOTAL;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (counter) counter.textContent = `${current + 1} / ${TOTAL}`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

    // Touch / swipe
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend',   e => {
      const dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 45) { dx > 0 ? next() : prev(); resetAuto(); }
    }, { passive: true });

    // Keyboard navigation when focused
    if (wrap) {
      wrap.setAttribute('tabindex', '0');
      wrap.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') { next(); resetAuto(); }
        if (e.key === 'ArrowLeft')  { prev(); resetAuto(); }
      });
    }

    // Resize: recalculate position
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => goTo(current), 150);
    }, { passive: true });

    // Autoplay
    const startAuto = () => { autoId = setInterval(next, 7000); };
    const stopAuto  = () => clearInterval(autoId);
    const resetAuto = () => { stopAuto(); startAuto(); };

    if (wrap) {
      wrap.addEventListener('mouseenter', stopAuto);
      wrap.addEventListener('mouseleave', startAuto);
      wrap.addEventListener('focusin',    stopAuto);
      wrap.addEventListener('focusout',   startAuto);
    }

    // Pause when tab is not visible
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopAuto() : startAuto();
    });

    goTo(0);
    startAuto();
  };


  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  const initReveal = () => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
  };


  /* ── CONTADORES ─────────────────────────────────────────── */
  const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseFloat(counter.dataset.target);
        let current = 0;
        const increment = target / 200;

        const update = () => {
          current += increment;

          if (current >= target) {
            counter.innerHTML = target;
          } else {
            if (target % 1 !== 0) {
              counter.innerHTML = current.toFixed(1);
            } else {
              counter.innerHTML = Math.floor(current);
            }
            requestAnimationFrame(update);
          }
        };

        update();
        observer.unobserve(counter);
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  };


  /* ── INIT ────────────────────────────────────────────────── */
  initNavbar();
  initCarousel();
  initReveal();
  initCounters();

});