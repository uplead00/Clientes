/**
 * @file navigation.js
 * @description Menu mobile (hambúrguer) e efeito de sombra no header ao scrollar.
 * ATUALIZADO: aria-expanded no botão hamburger para acessibilidade.
 */

export function initNavigation() {
  _initMobileMenu();
  _initHeaderScroll();
}

/* ── Menu Mobile ───────────────────────────────────────────── */
function _initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    // Atualiza aria-expanded para leitores de tela
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fecha o menu ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu com Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Header — sombra ao scrollar ──────────────────────────── */
function _initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}
