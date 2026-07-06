/* ============================================================
   Taynara Passala — interações e animações
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
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
    function groupInt(n) {
      return Math.round(n).toLocaleString(
        currentLang === "en" ? "en-US" : "pt-BR",
      );
    }
    if (prefersReduced) {
      var staticShown =
        decimals > 0 ? target.toFixed(decimals) : groupInt(target);
      el.textContent = prefix + staticShown + suffix;
      return;
    }
    var duration = 1500;
    var startTime = performance.now();
    function tick(now) {
      var progress = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      var shown = decimals > 0 ? value.toFixed(decimals) : groupInt(value);
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
      { threshold: 0.4 },
    );
    proofObs.observe(proof);
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------- Carrossel de depoimentos ---------------- */
  var track = document.getElementById("testiTrack");
  var updateTesti = null;

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

    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        next();
        restartAutoplay();
      });
    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        prev();
        restartAutoplay();
      });

    window.addEventListener("resize", function () {
      if (index > maxIndex()) index = maxIndex();
      update();
    });

    // suporte a swipe (toque)
    var startX = 0,
      deltaX = 0,
      dragging = false;
    viewport.addEventListener(
      "touchstart",
      function (e) {
        startX = e.touches[0].clientX;
        deltaX = 0;
        dragging = true;
      },
      { passive: true },
    );
    viewport.addEventListener(
      "touchmove",
      function (e) {
        if (!dragging) return;
        deltaX = e.touches[0].clientX - startX;
      },
      { passive: true },
    );
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

    // Função para o botão de idioma re-sincronizar layout/estado do carrossel.
    updateTesti = function () {
      // Ajusta index caso o número de itens visíveis mudou (resize/perView)
      if (index > maxIndex()) index = maxIndex();
      if (index < 0) index = 0;
      update();
    };
  }

  /* ---------------- Carrossel de resultados ---------------- */
  var resultsTrack = document.getElementById("resultsTrack");
  var resultsViewport = document.getElementById("resultsViewport");
  var resultsPrevBtn = document.getElementById("resultsPrev");
  var resultsNextBtn = document.getElementById("resultsNext");
  var resultsDotsWrap = document.getElementById("resultsDots");

  if (resultsTrack) {
    var rSlides = Array.prototype.slice.call(resultsTrack.children);
    var rTotal = rSlides.length;
    var rIndex = 0;
    var rAutoTimer = null;

    function rPerView() {
      return window.innerWidth >= 768 ? 2 : 1;
    }
    function rMaxIndex() {
      return Math.max(0, rTotal - rPerView());
    }

    var rDots = [];
    function rBuildDots() {
      resultsDotsWrap.innerHTML = "";
      rDots = [];
      for (var i = 0; i < rTotal; i++) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "results__dot";
        d.setAttribute("aria-label", "Ir para resultado " + (i + 1));
        (function (i) {
          d.addEventListener("click", function () {
            rGoTo(i);
            rRestartAuto();
          });
        })(i);
        resultsDotsWrap.appendChild(d);
        rDots.push(d);
      }
    }

    function rUpdate() {
      var slideW = 100 / rPerView();
      resultsTrack.style.transform = "translateX(-" + rIndex * slideW + "%)";
      rDots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === rIndex);
      });
    }

    function rGoTo(i) {
      var max = rMaxIndex();
      if (i < 0) i = max;
      else if (i > max) i = 0;
      rIndex = i;
      rUpdate();
    }
    function rNext() {
      rGoTo(rIndex >= rMaxIndex() ? 0 : rIndex + 1);
    }
    function rPrev() {
      rGoTo(rIndex <= 0 ? rMaxIndex() : rIndex - 1);
    }

    function rStartAuto() {
      if (prefersReduced || rTotal <= rPerView()) return;
      rAutoTimer = setInterval(rNext, 4500);
    }
    function rRestartAuto() {
      if (rAutoTimer) clearInterval(rAutoTimer);
      rStartAuto();
    }

    if (resultsNextBtn)
      resultsNextBtn.addEventListener("click", function () {
        rNext();
        rRestartAuto();
      });
    if (resultsPrevBtn)
      resultsPrevBtn.addEventListener("click", function () {
        rPrev();
        rRestartAuto();
      });

    window.addEventListener("resize", function () {
      if (rIndex > rMaxIndex()) rIndex = rMaxIndex();
      rUpdate();
    });

    /* Swipe em toque */
    var rStartX = 0,
      rDeltaX = 0,
      rDragging = false;
    resultsViewport.addEventListener(
      "touchstart",
      function (e) {
        rStartX = e.touches[0].clientX;
        rDeltaX = 0;
        rDragging = true;
      },
      { passive: true },
    );
    resultsViewport.addEventListener(
      "touchmove",
      function (e) {
        if (!rDragging) return;
        rDeltaX = e.touches[0].clientX - rStartX;
      },
      { passive: true },
    );
    resultsViewport.addEventListener("touchend", function () {
      if (!rDragging) return;
      rDragging = false;
      if (Math.abs(rDeltaX) > 40) {
        if (rDeltaX < 0) rNext();
        else rPrev();
        rRestartAuto();
      }
    });

    rBuildDots();
    rUpdate();
    rStartAuto();
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

  /* ---------------- Tradução PT / EN ---------------- */
  var i18n = {
    pt: {
      /* Navbar */
      "nav.about": "Sobre",
      "nav.method": "Método",
      "nav.plans": "Planos",
      "nav.results": "Resultados",
      "nav.contact": "Contato",
      "nav.cta": "Começar agora",
      /* Hero */
      "hero.eyebrow": "Personal Trainer · Alta Performance",
      "hero.title":
        'Alta performance<br>com <span class="hero__title-em">leveza</span> e<br>sofisticação.',
      "hero.lead":
        "Método individualizado, 100% natural, focado em objetivo e resultado. Para quem decide parar de aceitar resultados medíocres.",
      "hero.cta_main": "Quero meu plano",
      "hero.cta_secondary": "Ver resultados",
      "hero.rating": "+3.000 alunas transformadas · desde 2017",
      /* Proof */
      "proof.students_label": "alunas transformadas",
      "proof.years_label": "anos de experiência",
      "proof.followers_label": "seguidoras",
      "proof.natural_label": "Natural",
      /* Sobre */
      "about.eyebrow": "Sobre a Taynara",
      "about.title": "A coach que entende porque já viveu.",
      "about.p1":
        "Antes de ser coach, Taynara foi atleta. Passou por diferentes modalidades esportivas até encontrar na musculação e no fisiculturismo a sua maior paixão — e a certeza do que funciona de verdade.",
      "about.p2":
        "São mais de 9 anos de experiência e mais de 3.000 vidas transformadas. Com formação em Educação Física e especializações em Musculação Avançada e Bodybuilding Coach, ela une ciência, vivência prática e acompanhamento próximo — em hipertrofia, emagrecimento e alta performance.",
      "about.p3":
        "Sua missão é mostrar que cada corpo precisa de uma estratégia única. Por isso não trabalha com treinos prontos: cada planejamento é personalizado, respeitando a sua rotina, os seus objetivos e a sua individualidade. Ela não só aplica — ela vive o que passa para as alunas. Atendimento online para todo o Brasil e presencial em Curitiba.",
      "about.hl1": "Atleta competidora de fisiculturismo",
      "about.hl2": "Especialista em abordagem 100% natural",
      "about.hl3": "Acompanhamento de longo prazo — alunas que ficam anos",
      "about.cta": "Conhecer o método",
      /* Problema */
      "problem.eyebrow": "Você se identifica?",
      "problem.title": "Treinar muito e ver pouco resultado tem nome.",
      "problem.item1": "Você treina há meses mas o corpo não muda como deveria",
      "problem.item2":
        "Já tentou vários métodos, mas nada durou mais de 2 meses",
      "problem.item3":
        "Sente que está perdendo tempo (e dinheiro) sem orientação certa",
      "problem.item4":
        'Faz tudo "certinho" mas não sabe se está no caminho certo',
      "problem.statement":
        "O problema quase nunca é falta de esforço. É falta de estratégia individualizada.",
      "problem.cta": "Quero a estratégia certa",
      /* Método */
      "method.eyebrow": "Como funciona",
      "method.title": "O Método TP Performance",
      "method.sub":
        "Quatro pilares que transformam o esforço em resultado real.",
      "method.card1.kicker": '<span class="method__num">01</span> · Estratégia',
      "method.card1.text":
        "Treino prescrito com base em dados reais. Sem copiar planilha de internet.",
      "method.card2.kicker":
        '<span class="method__num">02</span> · Individualização',
      "method.card2.text":
        "Nenhuma aluna recebe o mesmo protocolo. Seu corpo, seu ritmo, sua vida.",
      "method.card3.kicker": '<span class="method__num">03</span> · Constância',
      "method.card3.text":
        "Acompanhamento contínuo para você não parar no primeiro obstáculo.",
      "method.card4.kicker": '<span class="method__num">04</span> · Saúde',
      "method.card4.text":
        "100% natural. Performance sem comprometer a sua saúde.",
      /* Planos */
      "plans.eyebrow": "Planos",
      "plans.title": "Escolha como quer evoluir.",
      "plan1.name": "Programa Glúteos",
      "plan1.from": "Pagamento único · 60 dias",
      "plan1.price": "R$ 169,90",
      "plan1.benefit1": "2 treinos com foco total em glúteos",
      "plan1.benefit2": "Metodologias para maximizar resultados",
      "plan1.benefit3": "Progressão estruturada para 60 dias",
      "plan1.benefit4": "Ativações certas e ordem inteligente de exercícios",
      "plan1.cta": "Quero este plano",
      "plan2.badge": "Mais escolhido",
      "plan2.name": "Consultoria Trimestral",
      "plan2.from": "Plano trimestral",
      "plan2.price": 'R$ 699,90<span class="plan__per">/trimestre</span>',
      "plan2.benefit1": "Plano alimentar e treino 100% personalizados",
      "plan2.benefit2": "Ajustes ilimitados conforme sua rotina e objetivo",
      "plan2.benefit3": "Acompanhamento contínuo por 3 meses",
      "plan2.benefit4": "Adaptação para lesões e necessidades",
      "plan2.benefit5": "Melhor custo-benefício da consultoria",
      "plan2.cta": "Quero este plano",
      "plan3.name": "Consultoria Mensal",
      "plan3.from": "Plano mensal",
      "plan3.price": 'R$ 299,90<span class="plan__per">/mês</span>',
      "plan3.benefit1": "Plano alimentar e treino 100% personalizados",
      "plan3.benefit2": "Ajustes ilimitados conforme sua rotina e objetivo",
      "plan3.benefit3": "Acompanhamento contínuo e individualizado",
      "plan3.benefit4": "Adaptação para lesões e necessidades",
      "plan3.cta": "Quero este plano",
      "plan4.name": "Reabilitação e Prevenção de Lesões",
      "plan4.from": "Reabilitação · Prevenção · Retorno seguro",
      "plan4.price": "Sob consulta",
      "plan4.benefit1":
        "Avaliação completa do histórico de lesões e limitações",
      "plan4.benefit2":
        "Treino personalizado para reabilitação funcional e retorno seguro",
      "plan4.benefit3":
        "Protocolos para tendinopatias e dores musculoesqueléticas",
      "plan4.benefit4":
        "Fortalecimento de articulações, músculos e tecidos de suporte",
      "plan4.benefit5":
        "Correção de padrões de movimento e prevenção de novas lesões",
      "plan4.benefit6":
        "Progressão individual com acompanhamento próximo e ajustes contínuos",
      "plan4.for":
        "<strong>Indicado para:</strong> tendinopatias, retorno pós-lesão e quem quer treinar com mais segurança e prevenir lesões.",
      "plan4.cta": "Quero saber mais",
      "plans.note": "Pagamento e checkout seguros via PrimeCoaching.",
      /* Resultados */
      "results.eyebrow": "Resultados reais",
      "results.title": "Transformações que duram.",
      "result1.time": "4 anos de acompanhamento",
      "result1.quote":
        '"Mudei de país e continuei. A Taynara foi o que não mudou."',
      "result1.tag": "Acompanhamento online · 100% natural",
      "result2.time": "8 meses de acompanhamento",
      "result2.quote":
        '"Pela primeira vez vi o corpo mudar de verdade. E sem fórmula mágica."',
      "result2.tag": "Hipertrofia e definição · 100% natural",
      "result3.time": "6 meses de acompanhamento",
      "result3.quote": '"Transformação real com método e constância."',
      "result3.tag": "Hipertrofia e definição · 100% natural",
      "result4.time": "5 meses de acompanhamento",
      "result4.quote":
        '"Voltei a me sentir bem no meu próprio corpo, com leveza."',
      "result4.tag": "Emagrecimento e recomposição · 100% natural",
      "result5.time": "7 meses de acompanhamento",
      "result5.quote":
        '"Conquistei definição e glúteo que eu achava impossível."',
      "result5.tag": "Hipertrofia e definição · 100% natural",
      /* Depoimentos */
      "testi.eyebrow": "Depoimentos",
      "testi.title": "Quem treina com a Tay, fica.",
      "testi1.text":
        '"O acompanhamento com a Tay é excelente! Estou treinando com ela há pouco tempo, mas já consigo perceber muita diferença, principalmente na organização dos treinos e na forma como cada exercício é pensado para o meu objetivo. O que mais gosto é que ela está sempre disponível para tirar dúvidas, corrigir quando preciso e adaptar o treino conforme minha evolução e rotina que é bem corrida. Isso faz toda a diferença e me deixa muito mais motivada. É muito bom ter alguém que realmente acompanha de perto e se preocupa com os resultados dos alunos. Recomendo de olhos fechados!"',
      "testi1.since": "Aluna há 2 anos",
      "testi2.text":
        '"Desde que comecei a treinar na Uplay acompanho o trabalho da Tay. Sempre ficava observando ela atender seus alunos e pensava: \u201cSe eu pudesse escolher uma Personal, com toda certeza seria ela\u201d. Até que com o passar do tempo, e força dos meus pensamentos, rsrs, começamos a treinar juntas. É muito nítido o seu conhecimento e experiência na área, além da sua visível paixão em ensinar e motivar. Desde que comecei a treinar com ela, meu corpo evoluiu muito. Melhorei vários pontos fracos e voltei a fazer exercícios que não fazia mais por medo de sentir dores no joelho que já me acompanhavam há tempos. Enfim, seu profissionalismo é incontestável. Somente agradecer por toda sua dedicação e empenho durante todos esses meses!!"',
      "testi2.since": "Aluna há 1 ano",
      "testi3.text":
        '"O que mais gosto no trabalho da Thay é que ela realmente enxerga o aluno. Em 4 meses de consultoria online já tive mudanças bem perceptíveis no meu corpo, mas o que mais me impressiona é o quanto tudo é individualizado. Ela identifica exatamente o que você precisa melhorar e trabalha em cima disso, cuidadosamente pensando nas deficiências e onde podemos melhorar. E o cuidado com prevenção e tratamento de lesões é algo que nunca encontrei em nenhum outro profissional que já me acompanhou. Faz toda diferença treinar com alguém que olha para resultado, mas também para sua saúde e longevidade!"',
      "testi3.since": "Aluna há 3 anos",
      "testi4.text":
        '"Tay, queria dizer o quanto você faz bem pra mim. Além de ser uma personal incrível, que sempre \u201ctira a minha alma\u201d nos treinos, me ajuda a evoluir e a me sentir cada vez melhor com o meu corpo... Também faz toda a diferença pela pessoa que é. Nossos treinos passam voando porque a gente conversa, dá risada e se diverte muito. Você consegue transformar o que poderia ser apenas um treino em um momento leve e agradável. Obrigada por todo o incentivo, dedicação e carinho. Você faz um bem enorme para o meu corpo e para os meus dias!!!"',
      "testi4.since": "Aluna há 4 anos",
      "testi5.text":
        '"Treino a mais de 8 anos e estava buscando um profissional que me ajudasse a elevar meu nível de treinamento em intensidade e progressão de cargas. A Taynara me entregou o que eu estava buscando e, consequentemente, obtive ótimos resultados físicos. Recomendo o trabalho dela como uma profissional que ama o que faz, tem muito conhecimento e se dedica muito em entregar o melhor para os seus alunos."',
      "testi5.since": "",
      /* Para Quem */
      "forwhom.eyebrow": "Qualificação",
      "forwhom.title": "Este programa foi feito para você?",
      "forwhom.yes.title": "É para você se...",
      "forwhom.yes.item1": "Você quer resultado real, não rápido",
      "forwhom.yes.item2": "Está disposta a seguir um método com constância",
      "forwhom.yes.item3":
        "Quer hipertrofia, definição ou alta performance de forma natural",
      "forwhom.yes.item4":
        "Precisa de acompanhamento personalizado, não planilha genérica",
      "forwhom.yes.item5": "Está pronta para investir em si mesma de verdade",
      "forwhom.no.title": "Não é para você se...",
      "forwhom.no.item1": "Está procurando resultado em 15 dias",
      "forwhom.no.item2": "Quer atalhos ou uso de substâncias",
      "forwhom.no.item3": "Não está disposta a seguir orientações",
      "forwhom.no.item4": "Busca o plano mais barato do mercado",
      /* FAQ */
      "faq.eyebrow": "Dúvidas frequentes",
      "faq.title": "Ainda em dúvida? A gente responde.",
      "faq.q1": "Como funciona o acompanhamento online?",
      "faq.a1":
        "Através do app PrimeCoaching, você recebe seu treino personalizado, acompanha sua evolução, faz check-ins e tem acesso direto à Taynara via chat. Tudo em um único lugar, de qualquer lugar do Brasil.",
      "faq.q2": "Quanto tempo leva para ver resultados?",
      "faq.a2":
        "Depende do seu ponto de partida e do plano escolhido, mas a maioria das alunas começa a notar mudanças nas primeiras 4 a 6 semanas com consistência. Resultados duradouros são construídos em meses, não dias.",
      "faq.q3": "O acompanhamento inclui alimentação?",
      "faq.a3":
        "A orientação alimentar é tratada de forma estratégica dentro do plano. Confirme os detalhes do que está incluído diretamente pelo WhatsApp.",
      "faq.q4": "Funciona para quem mora fora de Curitiba?",
      "faq.a4":
        "Sim. A consultoria online atende alunas em todo o Brasil. Uma das alunas acompanhadas há 4 anos mora em Londres.",
      "faq.q5": "Posso ser atendida presencialmente?",
      "faq.a5":
        "Sim, para quem está na região de Curitiba-PR. Consulte a disponibilidade de agenda pelo WhatsApp.",
      "faq.q6": "O programa é para iniciantes também?",
      "faq.a6":
        "Absoluta e completamente sim. O método se adapta ao seu nível. Algumas das maiores transformações foram de alunas que nunca tinham pisado numa academia.",
      "faq.q7": "O programa usa hormônios ou suplementos obrigatórios?",
      "faq.a7":
        "Não. A abordagem é 100% natural. Suplementação pode ser sugerida como apoio, mas nunca como obrigação ou atalho.",
      /* CTA Final */
      "finalcta.eyebrow": "Próximo passo",
      "finalcta.title": "Seu corpo tem mais potencial do que você imagina.",
      "finalcta.sub": "Eu vou te ajudar a encontrá-lo.",
      "finalcta.cta": "Quero fazer parte do time",
      "finalcta.reassure": "Sem compromisso. Primeira conversa gratuita.",
      "finalcta.secure": "Pagamento seguro via PrimeCoaching",
      /* Footer */
      "footer.about":
        "Coach de Alta Performance · Personal Trainer<br>Online · Presencial · Curitiba-PR",
      "footer.nav.heading": "Navegação",
      "footer.nav.about": "Sobre",
      "footer.nav.method": "Método",
      "footer.nav.plans": "Planos",
      "footer.nav.results": "Resultados",
      "footer.nav.contact": "Contato",
      "footer.social.heading": "Redes e Contato",
      "footer.bottom": "© 2026 Taynara Passala · Todos os direitos reservados",
      "footer.privacy": "Política de Privacidade · LGPD",
      /* WA Float */
      "wa.float": "Falar com a Tay",
    },

    en: {
      /* Navbar */
      "nav.about": "About",
      "nav.method": "Method",
      "nav.plans": "Plans",
      "nav.results": "Results",
      "nav.contact": "Contact",
      "nav.cta": "Start now",
      /* Hero */
      "hero.eyebrow": "Personal Trainer · High Performance",
      "hero.title":
        'High performance<br>with <span class="hero__title-em">elegance</span> and<br>sophistication.',
      "hero.lead":
        "Individualized method, 100% natural, focused on your goal and results. For those who decide to stop accepting mediocre results.",
      "hero.cta_main": "I want my plan",
      "hero.cta_secondary": "See results",
      "hero.rating": "+3,000 students transformed · since 2017",
      /* Proof */
      "proof.students_label": "students transformed",
      "proof.years_label": "years of experience",
      "proof.followers_label": "followers",
      "proof.natural_label": "Natural",
      /* About */
      "about.eyebrow": "About Taynara",
      "about.title": "A coach who understands because she's lived it.",
      "about.p1":
        "Before becoming a coach, Taynara was an athlete. She went through different sports until she found her greatest passion in weight training and bodybuilding — and the certainty of what truly works.",
      "about.p2":
        "That's more than 9 years of experience and over 3,000 lives transformed. With a degree in Physical Education and specializations in Advanced Weight Training and Bodybuilding Coaching, she combines science, hands-on experience, and close support — in hypertrophy, fat loss, and high performance.",
      "about.p3":
        "Her mission is to show that every body needs a unique strategy. That's why she doesn't work with ready-made plans: every program is personalized, respecting your routine, your goals, and your individuality. She doesn't just apply it — she lives what she teaches her students. Online coaching across Brazil and in-person in Curitiba.",
      "about.hl1": "Competitive bodybuilding athlete",
      "about.hl2": "Specialist in 100% natural approach",
      "about.hl3": "Long-term coaching — students who stay for years",
      "about.cta": "Learn the method",
      /* Problem */
      "problem.eyebrow": "Can you relate?",
      "problem.title": "Training hard and seeing little results has a name.",
      "problem.item1":
        "You've been training for months but your body isn't changing the way it should",
      "problem.item2":
        "You've tried various methods, but nothing lasted more than 2 months",
      "problem.item3":
        "You feel you're wasting time (and money) without the right guidance",
      "problem.item4":
        "You do everything \"right\" but don't know if you're on the right track",
      "problem.statement":
        "The problem is almost never lack of effort. It's lack of individualized strategy.",
      "problem.cta": "I want the right strategy",
      /* Method */
      "method.eyebrow": "How it works",
      "method.title": "The TP Performance Method",
      "method.sub": "Four pillars that turn effort into real results.",
      "method.card1.kicker": '<span class="method__num">01</span> · Strategy',
      "method.card1.text":
        "Training prescribed based on real data. No copying internet spreadsheets.",
      "method.card2.kicker":
        '<span class="method__num">02</span> · Individualization',
      "method.card2.text":
        "No two students receive the same protocol. Your body, your pace, your life.",
      "method.card3.kicker":
        '<span class="method__num">03</span> · Consistency',
      "method.card3.text":
        "Continuous support so you don't stop at the first obstacle.",
      "method.card4.kicker": '<span class="method__num">04</span> · Health',
      "method.card4.text":
        "100% natural. Performance without compromising your health.",
      /* Plans */
      "plans.eyebrow": "Plans",
      "plans.title": "Choose how you want to evolve.",
      "plan1.name": "Glutes Program",
      "plan1.from": "One-time payment · 60 days",
      "plan1.price": "$ 34",
      "plan1.benefit1": "2 workouts with total focus on glutes",
      "plan1.benefit2": "Methodologies to maximize results",
      "plan1.benefit3": "Structured progression for 60 days",
      "plan1.benefit4": "Proper activations and smart exercise order",
      "plan1.cta": "I want this plan",
      "plan2.badge": "Most popular",
      "plan2.name": "Quarterly Consultation",
      "plan2.from": "Quarterly plan",
      "plan2.price": '$ 140<span class="plan__per">/quarter</span>',
      "plan2.benefit1": "100% personalized meal plan and training",
      "plan2.benefit2":
        "Unlimited adjustments according to your routine and goal",
      "plan2.benefit3": "Continuous support for 3 months",
      "plan2.benefit4": "Adaptation for injuries and specific needs",
      "plan2.benefit5": "Best value for money in consulting",
      "plan2.cta": "I want this plan",
      "plan3.name": "Monthly Consultation",
      "plan3.from": "Monthly plan",
      "plan3.price": '$ 60<span class="plan__per">/month</span>',
      "plan3.benefit1": "100% personalized meal plan and training",
      "plan3.benefit2":
        "Unlimited adjustments according to your routine and goal",
      "plan3.benefit3": "Continuous and individualized support",
      "plan3.benefit4": "Adaptation for injuries and specific needs",
      "plan3.cta": "I want this plan",
      "plan4.name": "Injury Rehabilitation & Prevention",
      "plan4.from": "Rehab · Prevention · Safe return",
      "plan4.price": "By consultation",
      "plan4.benefit1": "Complete assessment of injury history and limitations",
      "plan4.benefit2":
        "Personalized training for functional rehab and safe return",
      "plan4.benefit3": "Protocols for tendinopathies and musculoskeletal pain",
      "plan4.benefit4":
        "Strengthening of joints, muscles, and supporting tissues",
      "plan4.benefit5":
        "Movement-pattern correction and prevention of new injuries",
      "plan4.benefit6":
        "Individual progression with close follow-up and continuous adjustments",
      "plan4.for":
        "<strong>For:</strong> tendinopathies, post-injury return, and anyone who wants to train more safely and prevent injuries.",
      "plan4.cta": "Learn more",
      "plans.note": "Secure payment and checkout via PrimeCoaching.",
      /* Results */
      "results.eyebrow": "Real results",
      "results.title": "Transformations that last.",
      "result1.time": "4 years of coaching",
      "result1.quote":
        '"I changed countries and continued. Taynara was the one thing that didn\'t change."',
      "result1.tag": "Online coaching · 100% natural",
      "result2.time": "8 months of coaching",
      "result2.quote":
        '"For the first time I saw my body truly change. And without magic formulas."',
      "result2.tag": "Hypertrophy and definition · 100% natural",
      "result3.time": "6 months of coaching",
      "result3.quote": '"Real transformation with method and consistency."',
      "result3.tag": "Hypertrophy and definition · 100% natural",
      "result4.time": "5 months of coaching",
      "result4.quote": '"I feel good in my own body again, with lightness."',
      "result4.tag": "Weight loss and recomposition · 100% natural",
      "result5.time": "7 months of coaching",
      "result5.quote":
        '"I built definition and glutes I thought were impossible."',
      "result5.tag": "Hypertrophy and definition · 100% natural",
      /* Testimonials */
      "testi.eyebrow": "Testimonials",
      "testi.title": "Who trains with Tay, stays.",
      "testi1.text":
        '"Training with Tay is excellent! I haven\'t been training with her for long, but I can already notice a big difference, especially in how the workouts are organized and how each exercise is designed for my goal. What I like most is that she\'s always available to answer questions, make corrections when needed, and adjust my training around my progress and my busy routine. That makes all the difference and keeps me so much more motivated. It\'s great to have someone who really pays close attention and genuinely cares about her students\' results. I recommend her with my eyes closed!"',
      "testi1.since": "Student for 2 years",
      "testi2.text":
        '"I\u2019ve been following Tay\u2019s work since I started training at Uplay. I used to watch her with her students and think: \u2018If I could choose a personal trainer, it would definitely be her.\u2019 Eventually, with time (and the power of my own thoughts, haha), we started training together. Her knowledge and experience are obvious, along with her clear passion for teaching and motivating. Since I started training with her, my body has improved a lot. I\u2019ve strengthened several weak points and gone back to exercises I\u2019d stopped doing out of fear of the knee pain that had bothered me for a long time. Her professionalism is beyond question. I can only thank her for all her dedication and effort over these months!!"',
      "testi2.since": "Student for 1 year",
      "testi3.text":
        '"What I like most about Thay\'s work is that she truly sees the student. In 4 months of online coaching I\'ve already had noticeable changes in my body, but what impresses me most is how individualized everything is. She identifies exactly what you need to improve and works on it, carefully considering your weak points and where you can improve. And her care with injury prevention and treatment is something I\'ve never found in any other professional I\'ve worked with. It makes all the difference to train with someone who looks at results, but also at your health and longevity!"',
      "testi3.since": "Student for 3 years",
      "testi4.text":
        '"Tay, I wanted to tell you how much good you do for me. Besides being an incredible personal trainer who always pushes me to my limit in our workouts, you help me grow and feel better and better in my own body... You also make all the difference just by being who you are. Our sessions fly by because we talk, laugh, and have a lot of fun. You manage to turn what could be just a workout into a light, enjoyable moment. Thank you for all the encouragement, dedication, and care. You do so much good for my body and for my days!!!"',
      "testi4.since": "Student for 4 years",
      "testi5.text":
        '"I\'ve been training for over 8 years and was looking for a professional who could help me raise my training level in terms of intensity and load progression. Taynara delivered exactly what I was looking for, and as a result I got great physical results. I recommend her work as a professional who loves what she does, has a lot of knowledge, and is very dedicated to giving her students the best."',
      "testi5.since": "",
      /* For Whom */
      "forwhom.eyebrow": "Qualification",
      "forwhom.title": "Is this program for you?",
      "forwhom.yes.title": "It's for you if...",
      "forwhom.yes.item1": "You want real results, not quick ones",
      "forwhom.yes.item2": "You're willing to follow a method consistently",
      "forwhom.yes.item3":
        "You want hypertrophy, definition or high performance naturally",
      "forwhom.yes.item4":
        "You need personalized coaching, not a generic spreadsheet",
      "forwhom.yes.item5": "You're ready to truly invest in yourself",
      "forwhom.no.title": "It's NOT for you if...",
      "forwhom.no.item1": "You're looking for results in 15 days",
      "forwhom.no.item2": "You want shortcuts or substance use",
      "forwhom.no.item3": "You're not willing to follow guidance",
      "forwhom.no.item4": "You're looking for the cheapest plan on the market",
      /* FAQ */
      "faq.eyebrow": "Frequently asked questions",
      "faq.title": "Still have doubts? We answer.",
      "faq.q1": "How does online coaching work?",
      "faq.a1":
        "Through the PrimeCoaching app, you receive your personalized training plan, track your progress, do check-ins and have direct access to Taynara via chat. All in one place, from anywhere in the world.",
      "faq.q2": "How long does it take to see results?",
      "faq.a2":
        "It depends on your starting point and the chosen plan, but most students begin to notice changes in the first 4 to 6 weeks with consistency. Lasting results are built over months, not days.",
      "faq.q3": "Does coaching include nutrition guidance?",
      "faq.a3":
        "Nutritional guidance is handled strategically within the plan. Confirm the details of what's included directly via WhatsApp.",
      "faq.q4": "Does it work for people outside Brazil?",
      "faq.a4":
        "Yes. Online coaching is available worldwide. One of the students coached for 4 years lives in London.",
      "faq.q5": "Can I be coached in person?",
      "faq.a5":
        "Yes, for those in the Curitiba-PR area in Brazil. Check schedule availability via WhatsApp.",
      "faq.q6": "Is the program for beginners too?",
      "faq.a6":
        "Absolutely yes. The method adapts to your level. Some of the biggest transformations were from students who had never set foot in a gym.",
      "faq.q7": "Does the program use hormones or mandatory supplements?",
      "faq.a7":
        "No. The approach is 100% natural. Supplementation may be suggested as support, but never as a requirement or shortcut.",
      /* Final CTA */
      "finalcta.eyebrow": "Next step",
      "finalcta.title": "Your body has more potential than you imagine.",
      "finalcta.sub": "I'll help you find it.",
      "finalcta.cta": "I want to join the team",
      "finalcta.reassure": "No commitment. First conversation is free.",
      "finalcta.secure": "Secure payment via PrimeCoaching",
      /* Footer */
      "footer.about":
        "High Performance Coach · Personal Trainer<br>Online · In-person · Curitiba-PR, Brazil",
      "footer.nav.heading": "Navigation",
      "footer.nav.about": "About",
      "footer.nav.method": "Method",
      "footer.nav.plans": "Plans",
      "footer.nav.results": "Results",
      "footer.nav.contact": "Contact",
      "footer.social.heading": "Social & Contact",
      "footer.bottom": "© 2026 Taynara Passala · All rights reserved",
      "footer.privacy": "Privacy Policy · LGPD",
      /* WA Float */
      "wa.float": "Talk to Tay",
    },
  };

  var currentLang = "pt";

  function applyLang(lang) {
    var t = i18n[lang];

    /* Elementos com texto simples */
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
    });

    /* Elementos que precisam de innerHTML (contêm tags HTML) */
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    /* Atualiza links do WhatsApp */
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      var msg =
        lang === "en"
          ? el.getAttribute("data-en-msg") || el.getAttribute("data-msg") || ""
          : el.getAttribute("data-msg") || "";
      var medium = el.getAttribute("data-medium") || "site";
      el.setAttribute("href", whatsappLink(msg, medium));
    });

    /* Atributo lang do documento */
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

    /* Label do botão (mostra o idioma OPOSTO = para onde vai ao clicar) */
    var langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = lang === "pt" ? "EN" : "PT";

    /* Fecha/recalcula FAQ caso esteja aberto */
    if (faqList) {
      var openTrigger = faqList.querySelector(
        '.faq__trigger[aria-expanded="true"]',
      );
      if (openTrigger) {
        var content = openTrigger.parentElement.querySelector(".faq__content");
        if (content) content.style.maxHeight = content.scrollHeight + "px";
      }
    }

    currentLang = lang;
  }

  var langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      /* Animação de rotação do globo */
      langBtn.classList.remove("is-spinning");
      void langBtn.offsetWidth; /* força reflow para reiniciar animação */
      langBtn.classList.add("is-spinning");
      langBtn.addEventListener(
        "animationend",
        function () {
          langBtn.classList.remove("is-spinning");
        },
        { once: true },
      );

      applyLang(currentLang === "pt" ? "en" : "pt");

      // Re-sync do carrossel de depoimentos após troca de idioma.
      // Sem isso, o conteúdo exibido pode ficar desalinhado com o texto traduzido.
      if (typeof updateTesti === "function") updateTesti();
    });
  }

  // Exposto globalmente para o botão de idioma chamar e sincronizar o carrossel.
  // (o script do carrossel define essa função quando existir.)
})();
