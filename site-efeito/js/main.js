document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // Small delay for effect
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu close on click
  const navLinks = document.querySelectorAll('.nav-link');
  const menuToggle = document.getElementById('navbarNav');
  if (menuToggle) {
    // using bootstrap's collapse instance
    navLinks.forEach((l) => {
      l.addEventListener('click', () => {
        if (menuToggle.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(menuToggle);
          bsCollapse.hide();
        }
      });
    });
  }
});
