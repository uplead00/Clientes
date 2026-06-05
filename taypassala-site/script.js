/* ============================================================
   Taynara Passala — interações e animações
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- WhatsApp links ---------------- */
  var WHATSAPP_NUMBER = "5545999921321";
  function whatsappLink(message, medium) {
    var text = encodeURIComponent(message);
    return (
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      text +
      "&utm_source=site&utm_medium=" +
      (medium || "site")
    );
  }
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var msg = el.getAttribute("data-msg") || "";
    var medium = el.getAttribute("data-medium") || "site";
    el.setAttribute("href", whatsappLink(msg, medium));
  });

  /* ---------------- Navbar: estado ao rolar ---------------- */
  var navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (window.scrollY > 24) navbar.classList.add("is-scrolled");
    else navbar.classList.remove("is-scrolled");
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------------- Drawer mobile ---------------- */
  var drawer = document.getElementById("drawer");
  var openBtn = document.getElementById("openMenu");
  var closeBtn = document.getElementById("closeMenu");
  var overlay = document.getElementById("drawerOverlay");

  function openDrawer() {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }
  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
  var revealEls = document.querySelectorAll(".reveal, .img-reveal");
  revealEls.forEach(function (el) {
    // aplica variante direcional
    var variant = el.getAttribute("data-reveal");
    if (variant === "left") el.classList.add("reveal-left");
    else if (variant === "right") el.classList.add("reveal-right");
    else if (variant === "scale") el.classList.add("reveal-scale");
    // delay
    var delay = el.getAttribute("data-delay");
    if (delay) el.style.transitionDelay = delay + "s";
  });

  if ("IntersectionObserver" in window && !prefersReduced) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- Parallax (hero) ---------------- */
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  if (!prefersReduced && parallaxEls.length) {
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 60;
      var raf = 0;
      function update() {
        var rect = el.getBoundingClientRect();
        var vh = window.innerHeight;
        var progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform =
          "translate3d(0, " + (-progress * speed).toFixed(2) + "px, 0)";
        raf = 0;
      }
      function onScroll() {
        if (!raf) raf = requestAnimationFrame(update);
      }
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    });
  }

  /* ---------------- Contadores (social proof) ---------------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1500;
    var startTime = performance.now();
    function tick(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      var shown = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
      el.textContent = prefix + shown + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var proof = document.getElementById("proof");
  if (proof && "IntersectionObserver" in window) {
    var proofObs = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          counters.forEach(animateCounter);
          proofObs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    proofObs.observe(proof);
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------- Carrossel de depoimentos ---------------- */
  var track = document.getElementById("testiTrack");
  var viewport = document.getElementById("testiViewport");
  var prevBtn = document.getElementById("testiPrev");
  var nextBtn = document.getElementById("testiNext");
  var dotsWrap = document.getElementById("testiDots");

  if (track) {
    var slides = Array.prototype.slice.call(track.children);
    var total = slides.length;
    var index = 0;
    var autoplayTimer = null;

    function perView() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }
    function maxIndex() {
      return Math.max(0, total - perView());
    }

    // dots
    var dots = [];
    function buildDots() {
      dotsWrap.innerHTML = "";
      dots = [];
      for (var i = 0; i < total; i++) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "testi__dot";
        d.setAttribute("aria-label", "Ir para depoimento " + (i + 1));
        (function (i) {
          d.addEventListener("click", function () {
            goTo(i);
            restartAutoplay();
          });
        })(i);
        dotsWrap.appendChild(d);
        dots.push(d);
      }
    }

    function update() {
      var slideW = 100 / perView();
      track.style.transform = "translateX(-" + index * slideW + "%)";
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === index);
      });
    }

    function goTo(i) {
      var max = maxIndex();
      if (i < 0) i = max;
      else if (i > max) i = 0;
      index = i;
      update();
    }
    function next() {
      // loop infinito como o embla
      goTo(index >= maxIndex() ? 0 : index + 1);
    }
    function prev() {
      goTo(index <= 0 ? maxIndex() : index - 1);
    }

    function startAutoplay() {
      if (prefersReduced) return;
      autoplayTimer = setInterval(next, 5000);
    }
    function restartAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAutoplay(); });

    window.addEventListener("resize", function () {
      if (index > maxIndex()) index = maxIndex();
      update();
    });

    // suporte a swipe (toque)
    var startX = 0, deltaX = 0, dragging = false;
    viewport.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      deltaX = 0;
      dragging = true;
    }, { passive: true });
    viewport.addEventListener("touchmove", function (e) {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    viewport.addEventListener("touchend", function () {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) next();
        else prev();
        restartAutoplay();
      }
    });

    buildDots();
    update();
    startAutoplay();
  }

  /* ---------------- FAQ accordion (single collapsible) ---------------- */
  var faqList = document.getElementById("faqList");
  if (faqList) {
    var triggers = faqList.querySelectorAll(".faq__trigger");
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = trigger.parentElement;
        var content = item.querySelector(".faq__content");
        var isOpen = trigger.getAttribute("aria-expanded") === "true";

        // fecha todos
        triggers.forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          t.parentElement.querySelector(".faq__content").style.maxHeight = null;
        });

        // abre o atual se estava fechado
        if (!isOpen) {
          trigger.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });

    // recalcula altura do aberto ao redimensionar
    window.addEventListener("resize", function () {
      triggers.forEach(function (t) {
        if (t.getAttribute("aria-expanded") === "true") {
          var content = t.parentElement.querySelector(".faq__content");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- WhatsApp float (aparece após 3s) ---------------- */
  var waFloat = document.getElementById("waFloat");
  if (waFloat) {
    setTimeout(function () {
      waFloat.classList.add("is-visible");
    }, 3000);
  }
})();
