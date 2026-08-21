/**
 * @file navigation.js
 * @description Menu mobile (hambúrguer) e efeito de sombra no header ao scrollar.
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
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Fecha o menu ao clicar em qualquer link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Fecha o menu com Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

/* ── Header: transparente no topo, barra clara ao rolar ──── */

function _initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  /*
    No topo o header fica transparente sobre a foto escura da hero; a partir
    daí vira barra clara. Precisa ser avaliado também no carregamento, senão
    entrar direto por uma âncora (ex.: /#sobre) deixaria texto branco sobre
    fundo claro.
  */
  const sync = () => header.classList.toggle('scrolled', window.scrollY > 50);

  sync();
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('load', sync);
  window.addEventListener('hashchange', sync);
}
