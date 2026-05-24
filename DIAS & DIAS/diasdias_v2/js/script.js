/**
 * DIAS & DIAS IMÓVEIS — script.js
 * Comportamentos interativos do site
 */

/* ─────────────────────────────────────────
   1. HEADER: Scroll + Mobile Menu
───────────────────────────────────────── */
(function initHeader() {
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const nav        = document.getElementById('nav');

  if (!header || !hamburger || !nav) return;

  // Scroll: add .scrolled class
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateScrollTop();
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when link clicked
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

/* ─────────────────────────────────────────
   2. SMOOTH SCROLL
───────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header')
        ? document.getElementById('header').offsetHeight
        : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ─────────────────────────────────────────
   3. PROPERTY SEARCH / FILTER
───────────────────────────────────────── */
(function initSearch() {
  const btn    = document.getElementById('searchBtn');
  const grid   = document.getElementById('propertiesGrid');

  if (!btn || !grid) return;

  btn.addEventListener('click', function () {
    const tipo   = (document.getElementById('tipoImovel')  || {}).value  || '';
    const cidade = (document.getElementById('cidadeInput') || {}).value  || '';
    const preco  = (document.getElementById('precoInput')  || {}).value  || '';

    // If no filters active, just scroll to properties
    if (!tipo && !cidade && !preco) {
      const section = document.getElementById('imoveis');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Animate button
    btn.style.transform = 'scale(0.96)';
    setTimeout(function () { btn.style.transform = ''; }, 200);

    // Scroll to properties section
    const section = document.getElementById('imoveis');
    if (section) {
      const headerH = document.getElementById('header')
        ? document.getElementById('header').offsetHeight
        : 80;
      const top = section.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    // Show feedback notification
    showNotification(
      'Busca aplicada! Mostrando imóveis disponíveis.',
      'success'
    );
  });

  // Filter pills on properties section
  document.querySelectorAll('.filter-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.filter-pill').forEach(function (p) {
        p.classList.remove('filter-pill--active');
      });
      this.classList.add('filter-pill--active');

      const filter = this.dataset.filter;
      const cards  = grid.querySelectorAll('.property-card');

      cards.forEach(function (card) {
        if (filter === 'todos') {
          card.classList.remove('hidden');
          return;
        }
        const types = (card.dataset.type || '').split(' ');
        if (types.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ─────────────────────────────────────────
   4. SAVE / FAVORITE BUTTONS
───────────────────────────────────────── */
(function initSaveButtons() {
  document.querySelectorAll('.property-card__save').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.classList.toggle('saved');
      const isSaved = this.classList.contains('saved');
      if (isSaved) {
        this.style.color = '#e53e3e';
        showNotification('Imóvel salvo nos seus favoritos!', 'success');
      } else {
        this.style.color = '';
        showNotification('Imóvel removido dos favoritos.', 'info');
      }
    });
  });
})();

/* ─────────────────────────────────────────
   5. CONTACT FORM — validação + envio real
   Formsubmit.co → contatohenriquericardo8@gmail.com
   NOTA: na primeira vez, confirme o e-mail que
   o Formsubmit enviará para sua caixa de entrada.
───────────────────────────────────────── */
(function initContactForm() {
  var form      = document.getElementById('contactForm');
  var success   = document.getElementById('formSuccess');
  var submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  /* ── helpers ── */
  function setError(inputId, errorId, msg) {
    var input = document.getElementById(inputId);
    var err   = document.getElementById(errorId);
    if (input) input.classList.toggle('error', !!msg);
    if (err)   err.textContent = msg || '';
  }

  function clearErrors() {
    ['nomeError','emailError','interesseError','mensagemError'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    form.querySelectorAll('.error').forEach(function(el){ el.classList.remove('error'); });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setLoading(on) {
    if (!submitBtn) return;
    submitBtn.disabled = on;
    submitBtn.innerHTML = on
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-4.219-7.615"/></svg> Enviando…'
      : 'Enviar mensagem <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  }

  /* ── submit ── */
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();

    var nome      = (document.getElementById('nomeInput')     || {}).value || '';
    var email     = (document.getElementById('emailInput')    || {}).value || '';
    var interesse = (document.getElementById('interesseInput')|| {}).value || '';
    var mensagem  = (document.getElementById('mensagemInput') || {}).value || '';
    var valid     = true;

    if (nome.trim().length < 3) {
      setError('nomeInput','nomeError','Por favor, informe seu nome completo.');
      valid = false;
    }
    if (!isValidEmail(email.trim())) {
      setError('emailInput','emailError','Informe um e-mail válido.');
      valid = false;
    }
    if (!interesse) {
      setError('interesseInput','interesseError','Selecione seu interesse.');
      valid = false;
    }
    if (mensagem.trim().length < 10) {
      setError('mensagemInput','mensagemError','Escreva uma mensagem com ao menos 10 caracteres.');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);

    /* Envio via AJAX para Formsubmit.co — mantém o usuário na página */
    var data = new FormData(form);

    fetch('https://formsubmit.co/ajax/contatohenriquericardo8@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function(res) { return res.json(); })
    .then(function(json) {
      setLoading(false);
      if (json.success === 'true' || json.success === true) {
        /* Sucesso */
        if (success) {
          success.classList.add('visible');
          setTimeout(function(){ success.classList.remove('visible'); }, 8000);
        }
        form.reset();
        showNotification('✅ Mensagem enviada! Em breve entraremos em contato.', 'success');
      } else {
        /* Falha retornada pelo servidor */
        showNotification('Ops! Algo deu errado. Tente pelo WhatsApp.', 'info');
      }
    })
    .catch(function() {
      setLoading(false);
      showNotification('Sem conexão. Tente falar pelo WhatsApp!', 'info');
    });
  });

  /* ── CSS para o spinner ── */
  var style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
})();

/* ─────────────────────────────────────────
   6. SCROLL TO TOP BUTTON
───────────────────────────────────────── */
function updateScrollTop() {
  var btn = document.getElementById('scrollTop');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

(function initScrollTop() {
  var btn = document.getElementById('scrollTop');
  if (!btn) return;
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────────
   7. NOTIFICATION TOAST
───────────────────────────────────────── */
function showNotification(message, type) {
  var existing = document.getElementById('dd-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'dd-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  var colors = {
    success: { bg: '#071A2D', border: 'rgba(212,175,55,.4)', text: '#FFFFFF', icon: '#D4AF37' },
    info:    { bg: '#0B1F33', border: 'rgba(255,255,255,.2)', text: '#FFFFFF', icon: '#a0aec0' }
  };
  var c = colors[type] || colors.info;

  toast.style.cssText = [
    'position:fixed',
    'bottom:80px',
    'left:50%',
    'transform:translateX(-50%) translateY(20px)',
    'background:' + c.bg,
    'color:' + c.text,
    'border:1px solid ' + c.border,
    'border-radius:50px',
    'padding:12px 24px',
    'font-size:14px',
    'font-weight:600',
    'font-family:Montserrat,sans-serif',
    'box-shadow:0 8px 32px rgba(0,0,0,.3)',
    'z-index:9999',
    'opacity:0',
    'transition:all .3s ease',
    'white-space:nowrap',
    'letter-spacing:.01em'
  ].join(';');

  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(12px)';
    setTimeout(function () { toast.remove(); }, 350);
  }, 3200);
}

/* ─────────────────────────────────────────
   8. INTERSECTION OBSERVER — Animate on scroll
───────────────────────────────────────── */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.property-card, .service-card, .highlight-card, .testimonial-card, .benefit-item'
  );

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = (Array.from(el.parentElement.children).indexOf(el) * 80);
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ─────────────────────────────────────────
   9. ACTIVE NAV LINK on Scroll
───────────────────────────────────────── */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav__link');
  var headerH  = (document.getElementById('header') || {}).offsetHeight || 80;

  function update() {
    var scrollY = window.scrollY;
    sections.forEach(function (section) {
      var top    = section.offsetTop - headerH - 16;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        links.forEach(function (link) {
          link.style.color = '';
          link.style.fontWeight = '';
          if (link.getAttribute('href') === '#' + section.id) {
            link.style.color = 'rgba(212,175,55,0.95)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ═══════════════════════════════════════════
   v2 ADDITIONS
   WhatsApp Float · Instagram Float · Gallery
   Animations · Scroll improvements
═══════════════════════════════════════════ */

/* ── Floating buttons: show after 2.5s ── */
(function initFloatBtns() {
  var wpp = document.getElementById('floatWpp');
  var ig  = document.getElementById('floatIg');
  if (!wpp && !ig) return;

  setTimeout(function () {
    if (wpp) wpp.classList.add('visible');
    if (ig)  ig.classList.add('visible');
  }, 2500);
})();

/* ── Scroll-in animation (data-animate) ── */
(function initScrollAnimate() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('anim-in');
    });
    return;
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var peers = Array.from((el.parentElement || document.body).querySelectorAll('[data-animate]'));
      var idx   = peers.indexOf(el);
      var delay = Math.min(idx * 80, 400);
      setTimeout(function () { el.classList.add('anim-in'); }, delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('[data-animate]').forEach(function (el) { obs.observe(el); });
})();

/* ── Featured property gallery ── */
(function initFeatGallery() {
  var gallery = document.getElementById('featGallery');
  var video   = document.querySelector('.featured-property__video');
  if (!gallery) return;

  gallery.addEventListener('click', function (e) {
    var thumb = e.target.closest('.feat-thumb');
    if (!thumb) return;

    // Update active state
    gallery.querySelectorAll('.feat-thumb').forEach(function (t) {
      t.classList.remove('feat-thumb--active');
    });
    thumb.classList.add('feat-thumb--active');

    // Pause video when switching to photo view
    if (video) video.pause();
  });
})();

/* ── Smooth scroll offset fix for new nav item ── */
(function fixNavScrollOffset() {
  document.querySelectorAll('a[href="#destaque"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.getElementById('destaque');
      if (!target) return;
      e.preventDefault();
      var hh = document.getElementById('header')
        ? document.getElementById('header').offsetHeight
        : 76;
      window.scrollTo({ top: target.offsetTop - hh - 8, behavior: 'smooth' });
    });
  });
})();

/* ── Mobile menu: close on hamburger ── */
(function fixHamburger() {
  var hamburger = document.getElementById('hamburger');
  var nav       = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
})();

/* ── Auto-scroll reveal for scroll-top btn ── */
window.addEventListener('scroll', function () {
  var btn = document.getElementById('scrollTop');
  if (btn) btn.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
