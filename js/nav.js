/* ============================================================
   Sweet Gypsy Design — Navigation Logic
   Nav scroll shadow + hamburger menu
   ============================================================ */

/* ─── NAV SCROLL SHADOW ─── */
function initNavScroll() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.style.boxShadow = window.scrollY > 50
      ? '0 2px 20px rgba(61,43,31,.08)'
      : 'none';
  });
}

/* ─── HAMBURGER MENU ─── */
function initHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when a nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}
