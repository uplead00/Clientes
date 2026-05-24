/**
 * @file animations.js
 * @description Animações de scroll (reveal) e accordion do FAQ.
 * ATUALIZADO: aria-expanded atualizado no FAQ para acessibilidade.
 */

export function initAnimations() {
  _initReveal();
  _initFaq();
}

/* ── Reveal de elementos ao entrar na viewport ────────────── */
function _initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── FAQ Accordion ────────────────────────────────────────── */
function _initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos e reseta aria-expanded
      faqItems.forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado e atualiza aria-expanded
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
