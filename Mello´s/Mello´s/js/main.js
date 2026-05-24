// MELLO'S DESIGN SYSTEM v3.0 JS

function initHeader() {
  const header = document.getElementById('site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let lastScrollY = 0;
  let ticking = false;

  // ── Scroll behavior ──
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollingDown = y > lastScrollY;

        // Glass quando scrollado > 60px
        if (header) header.classList.toggle('is-glass', y > 60);

        // Hide/show
        if (header) {
          if (y < 80) {
            header.classList.remove('is-hidden');
          } else if (scrollingDown && y > 120) {
            header.classList.add('is-hidden');
          } else {
            header.classList.remove('is-hidden');
          }
        }

        // Active nav link
        updateActiveNavLink();

        lastScrollY = y;
        ticking = false;
      });
      ticking = true;
    }
  });

  // ── Mobile nav toggle ──
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('is-open', !expanded);
      mobileNav.setAttribute('aria-hidden', String(expanded));
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    // Fechar ao clicar em link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Fechar com Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  // ── Active nav links via IntersectionObserver ──
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('is-active');
      }
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
        }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function init3DTilt(selector, intensity = 12) {
  document.querySelectorAll(selector).forEach(el => {
    const inner = el.querySelector('[data-tilt-inner]') || el;
    inner.style.transition = 'transform 100ms ease';

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = `perspective(600px) rotateX(${-y*intensity}deg) rotateY(${x*intensity}deg) translateZ(4px)`;
    });
    el.addEventListener('mouseleave', () => {
      inner.style.transition = 'transform 400ms var(--ease-spring)';
      inner.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.innerHTML = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      form.innerHTML = `
        <div class="form-success" role="alert">
          <p class="form-success-icon">✓</p>
          <p class="form-success-title">Mensagem recebida!</p>
          <p class="form-success-sub">Retornaremos em até 2 horas.</p>
        </div>`;
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSmoothScroll();
  initScrollReveal();
  init3DTilt('.service-card', 10);
  init3DTilt('.rating-badge', 8);
  initContactForm();
  
  // Update year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});