# MELLO'S — DESIGN SYSTEM FINAL
## Versão 3.0 — Documento Definitivo para Produção

> **Status:** ✅ FINAL — pronto para uso como input do Claude Code  
> **Versão:** 3.0  
> **Data:** Maio de 2026  
> **Uso:** Enviar junto com o vídeo `f15e34bdccb0c0ce14a493fe36564fec.mp4` e o prompt de build  
> **Stack:** HTML5 semântico + CSS3 Custom Properties + Vanilla JS ES6+ (zero frameworks)

---

## INSTRUÇÕES DE USO DESTE DOCUMENTO

Este arquivo é o **único fonte de verdade** para construção do site da Mello's. O Claude Code deve:

1. Ler este documento **integralmente** antes de escrever qualquer linha de código
2. Usar o vídeo anexado como **fundo do hero** (full-viewport, autoplay, muted, loop)
3. Replicar **exatamente** a estética do vídeo: header transparente flutuando sobre o vídeo, título thin com tracking extremo na parte inferior
4. Entregar **um único arquivo `index.html`** com todo CSS e JS embutido
5. Não usar frameworks, não usar CDN de ícones externos, não usar bibliotecas JS

---

## SUMÁRIO

1. [Análise do Vídeo de Referência](#1-análise-do-vídeo-de-referência)
2. [Filosofia Visual](#2-filosofia-visual)
3. [Sistema de Cores — Tokens Finais](#3-sistema-de-cores--tokens-finais)
4. [Sistema Tipográfico Completo](#4-sistema-tipográfico-completo)
5. [Espaçamento & Grid](#5-espaçamento--grid)
6. [Elevação & Sombras](#6-elevação--sombras)
7. [Superfícies & Texturas CSS](#7-superfícies--texturas-css)
8. [Hero com Vídeo — Especificação Completa](#8-hero-com-vídeo--especificação-completa)
9. [Header — Especificação Completa](#9-header--especificação-completa)
10. [Seções do Site](#10-seções-do-site)
11. [Componentes UI](#11-componentes-ui)
12. [Sistema de Animação & Motion](#12-sistema-de-animação--motion)
13. [Ícones](#13-ícones)
14. [SEO — Schema & Meta](#14-seo--schema--meta)
15. [CSS Variables — Arquivo Completo](#15-css-variables--arquivo-completo)
16. [Checklist de Aceitação](#16-checklist-de-aceitação)

---

## 1. Análise do Vídeo de Referência

**Arquivo:** `f15e34bdccb0c0ce14a493fe36564fec.mp4`  
**Fonte:** XIK3D / Zeno (xix3d.com) — 3D car configurator  
**Resolução:** 1600×1200px | **Duração:** 6s | **FPS:** 30

Este vídeo define a **linguagem visual do hero** do site. Todos os detalhes de tipografia, layout e comportamento do header foram extraídos por análise frame-a-frame.

---

### 1.1 Estrutura de Layout do Vídeo

```
┌─────────────────────────────────────────────────────────────────────┐
│  [LOGO XIK]    [Zeno]  [Enterprise]  [Studios]    [Contact us] [Sign in] │  ← HEADER transparente, sem fundo
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│           VIDEO BACKGROUND: carros top-down + neon glow            │
│           BMW  ◄─────── McLaren ─────────► Range Rover             │
│                                                                     │
│                                                                     │
│                   Z    E    N    O                                  │  ← Título thin, bottom-center
│           3D car configurator for business                          │  ← Subtitle tracked
│                                                              2 / 4  │  ← Counter, bottom-right
│                                                         SCROLL DOWN │  ← Indicator mono
└─────────────────────────────────────────────────────────────────────┘
```

---

### 1.2 Tipografia Extraída do Vídeo — Especificação Pixel-Precisa

#### TÍTULO PRINCIPAL — "ZENO" (adaptar para "MELLO'S")

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Fonte | Raleway ExtraLight | Raleway 200 |
| Peso | 100–200 (extra-light) | 200 |
| Tamanho | ~90–100px (relativo) | `clamp(4rem, 10vw, 8rem)` |
| Letter-spacing | ~0.45em (extremo) | `0.45em` |
| Color | `#FFFFFF` | `#F2F2F0` (--metal-white) |
| Posição | Bottom-center do hero | Bottom-center, `padding-bottom: 120px` |
| Transform | Nenhum | Nenhum |
| Line-height | 1.0 | 1.0 |
| Text-transform | UPPERCASE | UPPERCASE |

> **Nota crítica:** O letter-spacing `0.45em` é a característica visual MAIS importante desta tipografia. Os espaços entre as letras definem toda a atmosfera. Não reduzir.

#### SUBTÍTULO — "3D car configurator for business" (adaptar)

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Fonte | Raleway Light/ExtraLight | Raleway 300 |
| Peso | 200–300 | 300 |
| Tamanho | ~14–16px | `1rem` (16px) |
| Letter-spacing | ~5px | `5px` |
| Color | `rgba(255,255,255,0.80)` | `rgba(242,242,240,0.75)` |
| Posição | Abaixo do título, centralizado | Centralizado |

**Texto adaptado para Mello's:**
```
Especialistas em veículos importados e nacionais · Curitiba / PR
```

#### CONTADOR — "2 / 4"

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Fonte | Raleway ExtraLight | Raleway 200 |
| Tamanho | ~18–20px | `1.1rem` |
| Posição | Bottom-right | `bottom: 48px; right: var(--container-pad)` |
| Color | `rgba(255,255,255,0.70)` | `rgba(242,242,240,0.60)` |
| Letter-spacing | `2px` | `2px` |

**Adaptação:** Substituir por indicador de seção estático: `"01 — HERO"` ou remover e manter apenas o scroll indicator.

#### "SCROLL DOWN"

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Fonte | Raleway / Mono thin | JetBrains Mono 500 |
| Tamanho | ~10px | `0.6rem` |
| Posição | Abaixo do contador, bottom-right | `bottom: 32px; right: var(--container-pad)` |
| Color | `rgba(255,255,255,0.50)` | `rgba(180,180,178,0.55)` |
| Letter-spacing | `4px` | `4px` |
| Transform | `writing-mode: vertical-rl` | `writing-mode: vertical-rl` |
| Text-transform | UPPERCASE | UPPERCASE |

---

### 1.3 Header Extraído do Vídeo

#### LOGO — "XIK" (adaptar para "MELLO'S")

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Posição | Top-left | Top-left |
| Fonte | Custom bold/italic geometric | Bebas Neue + sub em JetBrains Mono |
| Tamanho | ~28px | `1.8rem` (logo) |
| Color | `#FFFFFF` | `var(--heat-fuel)` (#E8A020) |
| Background header | **Nenhum — 100% transparente** | **Nenhum — 100% transparente** |

#### NAV LINKS — "Zeno, Enterprise, Studios"

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Posição | Centered | Centered |
| Fonte | Clean sans-serif 300–400 | DM Sans 400 |
| Tamanho | `~14px` | `0.875rem` |
| Color | `rgba(255,255,255,0.85)` | `rgba(242,242,240,0.75)` |
| Gap entre links | `~50px` | `var(--sp-5)` (40px) |
| Hover | Sem sublinhado visível — leve opacity change | Underline âmbar |
| Background header | **Transparente total** | **Transparente total** |

#### BOTÃO "Sign in" (adaptar para CTA WhatsApp)

| Propriedade | Valor do Vídeo | Adaptação Mello's |
|-------------|---------------|-------------------|
| Forma | Pill — `border-radius: 50px` | Sharp — `border-radius: 2px` |
| Background | `#2C2C2C` (dark grey) | `var(--heat-fuel)` (#E8A020) |
| Color | `#FFFFFF` | `var(--void-abyss)` |
| Padding | `~10px 22px` | `11px 24px` |
| Fonte | Regular, ~13px | Barlow Condensed 700, 0.8rem |
| Letter-spacing | `0.5px` | `1.5px` + UPPERCASE |

---

## 2. Filosofia Visual

### Conceito: **"GARAGEM CINEMATOGRÁFICA"**

O site da Mello's funciona como uma garagem de alto luxo que você entra ao abrir o browser. O vídeo não é decoração — é o espaço onde a marca vive. Tudo que é construído em CSS existe dentro desse ambiente.

### Hierarquia de impacto

```
1° IMPACTO  — Vídeo full-screen (carros, luz, movimento) — < 0.5s
2° IMPACTO  — Título thin "MELLO'S" emergindo do vídeo — ~1-2s
3° IMPACTO  — Subtítulo + badge de avaliação — ~2-3s
4° IMPACTO  — CTAs (WhatsApp / Ver Serviços) — ~3s
5° AÇÃO     — Click no CTA — conversão
```

### O que NÃO fazer

- ❌ Background sólido atrás do header
- ❌ Título centralizado verticalmente (vai para o FUNDO)
- ❌ Letter-spacing normal no título hero
- ❌ Fonte bold/pesada no título hero (deve ser thin)
- ❌ Overlay escuro demais que oculte o vídeo
- ❌ Animações de entrada antes de 1s (deixar o vídeo respirar)

---

## 3. Sistema de Cores — Tokens Finais

### 3.1 Paleta Void (backgrounds)

```css
--void-abyss:   #060604;   /* Hero background, over-overlay */
--void-base:    #0A0A08;   /* Background principal da página */
--void-lifted:  #0E0E0C;   /* Seções alternadas */
--void-glow:    #131210;   /* Seções com calor âmbar */
```

> Todos os tones de void têm temperatura âmbar mínima (R ligeiramente > G > B). Isso cria coerência térmica com os acentos sem ser perceptível isolado.

### 3.2 Paleta Metal (superfícies e texto)

```css
--metal-deep:    #1A1A18;   /* Cards, superfícies elevadas */
--metal-surface: #222220;   /* Cards hover, modais */
--metal-border:  #2E2E2C;   /* Bordas, divisores */
--metal-mid:     #3C3C3A;   /* Elementos desabilitados */
--metal-smoke:   #4E4E4C;   /* Ícones neutros */
--metal-chrome:  #6C6C6A;   /* Texto terciário */
--metal-silver:  #8E8E8C;   /* Texto secundário */
--metal-frost:   #B4B4B2;   /* Texto de apoio */
--metal-ice:     #D8D8D6;   /* Subtítulos */
--metal-white:   #F2F2F0;   /* Títulos principais */
```

### 3.3 Paleta Heat (acentos âmbar — marca)

```css
--heat-trace:       #3A2008;   /* Background de destaque sutil */
--heat-dim:         #8A5610;   /* Estados desabilitados warm */
--heat-ember:       #C4851A;   /* Sombra de botão / pressed */
--heat-fuel:        #E8A020;   /* ACENTO PRIMÁRIO — CTA, highlights */
--heat-gold:        #F0B83A;   /* Hover de botão */
--heat-combustion:  #F5C842;   /* Estrelas de rating */
--heat-core:        #FF8C00;   /* Glow extremo, active states */
```

### 3.4 Glow Shadows (âmbar — inspirado no neon do vídeo)

```css
--glow-xs:   0 0 6px rgba(232,160,32,0.25);
--glow-sm:   0 0 14px rgba(232,160,32,0.35);
--glow-md:   0 0 28px rgba(232,160,32,0.40), 0 4px 12px rgba(0,0,0,0.5);
--glow-lg:   0 0 56px rgba(232,160,32,0.22), 0 0 112px rgba(232,160,32,0.10), 0 8px 32px rgba(0,0,0,0.7);
--glow-line: 0 0 8px rgba(232,160,32,0.70);   /* Para linhas finas */
```

### 3.5 Paleta Semântica

```css
--semantic-danger:   #B91C1C;   /* Erros, alertas */
--semantic-success:  #16A34A;   /* Sucesso, formulário enviado */
--semantic-info:     #1D6FA4;   /* Info contextual */
--semantic-whatsapp: #25D366;   /* FAB e botão WhatsApp */
```

### 3.6 Overlay de Vídeo (depth layers — influência XIK3D)

Usados exclusivamente como overlays dentro do hero sobre o vídeo:

```css
--overlay-dark:  rgba(6, 6, 4, 0.45);    /* Overlay base leve sobre vídeo */
--overlay-bottom: rgba(6, 6, 4, 0.75);   /* Gradiente na parte inferior, para texto */
--overlay-navy:  rgba(12, 16, 27, 0.35); /* Tom azul-navy do XIK3D como profundidade */
```

---

## 4. Sistema Tipográfico Completo

### 4.1 Famílias — Stack Final (4 fontes + 1 nova)

| Variável CSS | Família | Pesos | Papel | Google Fonts |
|---|---|---|---|---|
| `--font-display-thin` | **Raleway** | 200, 300 | Hero title thin (extraído do vídeo) | `Raleway:wght@200;300` |
| `--font-display` | **Bebas Neue** | 400 | Títulos de seção, branding | `Bebas+Neue` |
| `--font-heading` | **Barlow Condensed** | 600, 700 | H2, H3, botões | `Barlow+Condensed:wght@600;700` |
| `--font-body` | **DM Sans** | 400, 500 | Corpo, nav links, UI | `DM+Sans:wght@400;500` |
| `--font-mono` | **JetBrains Mono** | 500 | Labels, badges, contadores | `JetBrains+Mono:wght@500` |

**Google Fonts import — único `<link>` otimizado:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300&family=Bebas+Neue&family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

---

### 4.2 Escala Tipográfica Completa

```css
/* ── RALEWAY THIN — Hero display (extraído do vídeo) ── */
--text-hero-xl:  clamp(4rem, 10vw, 8rem);    /* "MELLO'S" principal */
--text-hero-lg:  clamp(3rem, 7vw, 6rem);     /* Variante menor */

/* ── BEBAS NEUE — Section display ── */
--text-display-xl: clamp(3.5rem, 8vw, 7rem); /* Seção impacto */
--text-display-lg: clamp(2.5rem, 5vw, 5rem); /* H1 de seção */
--text-display-md: clamp(2rem, 4vw, 3.5rem); /* Sub-display */

/* ── BARLOW CONDENSED — Headings ── */
--text-h2: 2rem;      /* 32px */
--text-h3: 1.5rem;    /* 24px */
--text-h4: 1.15rem;   /* ~18px */

/* ── DM SANS — Body ── */
--text-body-xl: 1.15rem;  /* 18px — Lead/hero sub */
--text-body-lg: 1rem;     /* 16px — Corpo padrão */
--text-body-md: 0.9rem;   /* 14px — Meta, suporte */
--text-body-sm: 0.8rem;   /* 13px — Caption */

/* ── JETBRAINS MONO — Labels ── */
--text-mono-lg: 0.85rem;  /* 13px */
--text-mono-md: 0.75rem;  /* 12px */
--text-mono-sm: 0.65rem;  /* 10px — SCROLL DOWN, eyebrows */
```

---

### 4.3 Letter-Spacing — Valores Exatos

```css
/* Extraídos da análise do vídeo */
--ls-hero:    0.45em;   /* Raleway hero title — definidor da estética */
--ls-sub:     5px;      /* Subtítulo hero */
--ls-counter: 2px;      /* "2 / 4" indicator */
--ls-scroll:  4px;      /* "SCROLL DOWN" */

/* Sistema padrão */
--ls-display: 1px;      /* Bebas Neue */
--ls-heading: 1px;      /* Barlow Condensed uppercase */
--ls-mono:    3px;      /* Labels JetBrains */
--ls-label:   4px;      /* Eyebrows de seção */
--ls-nav:     0.5px;    /* Nav links */
```

---

### 4.4 Hierarquia Visual Aplicada

```
HERO — POSIÇÃO INFERIOR (extraído do vídeo)
  ├── Badge rating: JetBrains Mono 500 | 0.7rem | amber | ls: 3px
  ├── Título: Raleway 200 | clamp(4–8rem) | #F2F2F0 | ls: 0.45em | UPPERCASE
  ├── Subtítulo: Raleway 300 | 1rem | rgba(242,242,240,0.75) | ls: 5px
  ├── CTAs: Barlow Condensed 700 | 0.875rem | UPPERCASE | ls: 1.5px
  └── Scroll: JetBrains Mono 500 | 0.6rem | dim | ls: 4px | vertical-rl

NAV HEADER (extraído do vídeo)
  ├── Logo: Bebas Neue 400 | 1.8rem | amber + Mono sub
  ├── Links: DM Sans 400 | 0.875rem | rgba(255,255,255,0.75) | ls: 0.5px
  └── CTA nav: Barlow Condensed 700 | 0.8rem | UPPERCASE

SEÇÕES
  ├── Eyebrow: JetBrains Mono 500 | 0.65rem | amber | ls: 4px | UPPERCASE
  ├── Título: Bebas Neue 400 | clamp(2.5–7rem) | metal-white
  ├── H3: Barlow Condensed 700 | 1.5rem | metal-ice | UPPERCASE
  ├── Corpo: DM Sans 400 | 1rem | metal-silver | lh: 1.7
  └── Badge: JetBrains Mono 500 | 0.65rem | contextual
```

---

## 5. Espaçamento & Grid

```css
/* Grid 8px */
--sp-1:  8px;   --sp-2:  16px;  --sp-3:  24px;
--sp-4:  32px;  --sp-5:  40px;  --sp-6:  48px;
--sp-8:  64px;  --sp-10: 80px;  --sp-12: 96px;
--sp-16: 128px; --sp-20: 160px;

/* Layout */
--container-max: 1280px;
--container-pad: clamp(24px, 5vw, 64px);
--grid-gutter:   24px;

/* Breakpoints (mobile-first) */
/* xs: 0    | sm: 480px | md: 768px | lg: 1024px | xl: 1280px */
```

---

## 6. Elevação & Sombras

```css
--shadow-0: none;
--shadow-1: 0 1px 4px rgba(0,0,0,0.50);
--shadow-2: 0 4px 12px rgba(0,0,0,0.55);
--shadow-3: 0 8px 24px rgba(0,0,0,0.65);
--shadow-4: 0 16px 48px rgba(0,0,0,0.75);

/* Botão físico — 3D press effect */
--shadow-btn-rest:  0 4px 0 var(--heat-ember), 0 6px 20px rgba(232,160,32,0.20);
--shadow-btn-hover: 0 6px 0 var(--heat-ember), 0 12px 32px rgba(232,160,32,0.35);
--shadow-btn-press: 0 1px 0 var(--heat-ember), 0 2px 8px rgba(232,160,32,0.15);

/* Z-Index stack */
--z-base:    0;
--z-raised:  10;
--z-overlay: 50;
--z-header:  100;
--z-fab:     400;
```

---

## 7. Superfícies & Texturas CSS

### Carbon Fiber
```css
background-color: #0E0E0C;
background-image:
  repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 6px),
  repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px);
```

### Metal Escovado (cards)
```css
background-color: #1A1A18;
background-image: repeating-linear-gradient(90deg,
  rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px,
  rgba(0,0,0,0.04) 1px, rgba(0,0,0,0.04) 2px);
```

### Forja Âmbar (seção de CTA, hero de seções)
```css
background: radial-gradient(ellipse 80% 60% at 50% 110%,
  rgba(232,160,32,0.18) 0%, rgba(232,160,32,0.06) 40%, transparent 70%);
```

### Asfalto / Road Lines (footer, detalhe)
```css
background-color: #0A0A08;
background-image: repeating-linear-gradient(90deg,
  transparent 0px, transparent 100px,
  rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 102px);
```

### Glass (header scrollado)
```css
background: rgba(8, 8, 6, 0.82);
backdrop-filter: blur(20px) saturate(1.3);
-webkit-backdrop-filter: blur(20px) saturate(1.3);
border-bottom: 1px solid rgba(232, 160, 32, 0.10);
```

---

## 8. Hero com Vídeo — Especificação Completa

> Esta seção replica exatamente o que foi visto no vídeo de referência, adaptado para a identidade Mello's.

### 8.1 HTML do Hero

```html
<section id="hero" aria-label="Mello's Oficina — Início">

  <!-- VÍDEO BACKGROUND (arquivo enviado pelo usuário) -->
  <div class="hero-video-wrap" aria-hidden="true">
    <video
      class="hero-video"
      src="f15e34bdccb0c0ce14a493fe36564fec.mp4"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    ></video>
    <!-- Overlay em camadas — igual ao vídeo de referência -->
    <div class="hero-overlay-base"></div>
    <div class="hero-overlay-bottom"></div>
    <div class="hero-overlay-depth"></div>
  </div>

  <!-- CONTEÚDO POSICIONADO (replicando layout do vídeo) -->
  <div class="hero-content">

    <!-- BADGE DE AVALIAÇÃO — aparece antes do título -->
    <div class="hero-badge" aria-label="Avaliação Google">
      <span class="hero-badge-stars">★★★★★</span>
      <span class="hero-badge-score">4,8</span>
      <span class="hero-badge-sep">·</span>
      <span class="hero-badge-count">45 avaliações no Google</span>
    </div>

    <!-- TÍTULO PRINCIPAL — estilo "ZENO" do vídeo -->
    <h1 class="hero-title" aria-label="Mello's Oficina">
      MELLO'S
    </h1>

    <!-- SUBTÍTULO — estilo "3D car configurator for business" -->
    <p class="hero-subtitle">
      Especialistas em veículos importados e nacionais · Curitiba / PR
    </p>

    <!-- CTAs -->
    <div class="hero-ctas" role="group" aria-label="Ações principais">
      <a href="https://wa.me/5541997576883?text=Ol%C3%A1%2C%20vim%20pelo%20site%21%20Gostaria%20de%20or%C3%A7ar%20um%20servi%C3%A7o."
         class="btn btn-primary"
         target="_blank" rel="noopener noreferrer"
         aria-label="Falar no WhatsApp da Mello's">
        Falar no WhatsApp
      </a>
      <a href="#servicos" class="btn btn-secondary" aria-label="Ver serviços">
        Ver Serviços
      </a>
    </div>

  </div>

  <!-- SCROLL INDICATOR — bottom-right (replicando vídeo) -->
  <div class="hero-scroll" aria-hidden="true">
    <span class="hero-scroll-text">SCROLL DOWN</span>
    <div class="hero-scroll-line"></div>
  </div>

</section>
```

---

### 8.2 CSS Completo do Hero

```css
/* ── HERO BASE ──────────────────────────────── */
#hero {
  position: relative;
  min-height: 100svh;        /* svh para mobile correto */
  display: flex;
  align-items: flex-end;     /* CONTEÚDO NA PARTE INFERIOR — como no vídeo */
  overflow: hidden;
}

/* ── VÍDEO ────────────────────────────────── */
.hero-video-wrap {
  position: absolute; inset: 0;
  z-index: 0;
}

.hero-video {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center center;
  /* Sem filtros — vídeo aparece ao natural */
}

/* ── OVERLAYS (camadas de profundidade) ───── */
/* Overlay base — levíssimo escurecimento geral */
.hero-overlay-base {
  position: absolute; inset: 0;
  background: var(--overlay-dark);           /* rgba(6,6,4,0.45) */
  z-index: 1;
}

/* Overlay inferior — garante legibilidade do texto */
.hero-overlay-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: linear-gradient(
    to top,
    rgba(6, 6, 4, 0.88) 0%,
    rgba(6, 6, 4, 0.60) 40%,
    transparent 100%
  );
  z-index: 2;
}

/* Overlay de profundidade — tom azul-navy do XIK3D */
.hero-overlay-depth {
  position: absolute; inset: 0;
  background: linear-gradient(
    150deg,
    rgba(12, 16, 27, 0.30) 0%,
    transparent 55%
  );
  z-index: 1;
}

/* ── CONTEÚDO ─────────────────────────────── */
.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--sp-16) var(--container-pad) var(--sp-12);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--sp-3);
}

/* ── BADGE ────────────────────────────────── */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  font-family: var(--font-mono);
  font-size: var(--text-mono-md);    /* 0.75rem */
  color: rgba(232, 160, 32, 0.90);
  letter-spacing: var(--ls-mono);   /* 3px */
  background: rgba(232, 160, 32, 0.08);
  border: 1px solid rgba(232, 160, 32, 0.20);
  padding: 5px 14px;
  border-radius: 2px;
  animation: reveal-up 0.7s var(--ease-enter) 1.4s both;
}
.hero-badge-stars { color: var(--heat-combustion); letter-spacing: 2px; }
.hero-badge-score { font-size: 0.85rem; font-weight: 700; color: var(--heat-fuel); }
.hero-badge-sep, .hero-badge-count { opacity: 0.65; }

/* ── TÍTULO — Estilo "ZENO" do vídeo ─────── */
.hero-title {
  font-family: var(--font-display-thin);   /* Raleway 200 */
  font-weight: 200;
  font-size: var(--text-hero-xl);          /* clamp(4rem, 10vw, 8rem) */
  letter-spacing: var(--ls-hero);          /* 0.45em — DEFINIDOR */
  color: var(--metal-white);
  line-height: 1.0;
  text-transform: uppercase;
  margin: 0;
  /* Texto brilha suavemente como as luzes do vídeo */
  text-shadow: 0 0 60px rgba(232, 160, 32, 0.15);
  animation: reveal-up 1.2s var(--ease-cinematic) 1.7s both;
}

/* ── SUBTÍTULO — Estilo "3D car configurator" ── */
.hero-subtitle {
  font-family: var(--font-display-thin);   /* Raleway 300 */
  font-weight: 300;
  font-size: var(--text-body-lg);          /* 1rem */
  letter-spacing: var(--ls-sub);           /* 5px */
  color: rgba(242, 242, 240, 0.72);
  margin: 0;
  animation: reveal-up 1s var(--ease-enter) 2.1s both;
}

/* ── CTAS ─────────────────────────────────── */
.hero-ctas {
  display: flex;
  gap: var(--sp-2);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--sp-2);
  animation: reveal-up 0.9s var(--ease-spring) 2.5s both;
}

/* ── SCROLL INDICATOR — bottom-right ─────── */
.hero-scroll {
  position: absolute;
  bottom: var(--sp-6);
  right: var(--container-pad);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-2);
  opacity: 0;
  animation: fade-in 0.8s ease 3.2s forwards;
}
.hero-scroll-text {
  font-family: var(--font-mono);
  font-size: var(--text-mono-sm);   /* 0.6rem */
  color: rgba(180, 180, 178, 0.55);
  letter-spacing: var(--ls-scroll); /* 4px */
  text-transform: uppercase;
  writing-mode: vertical-rl;
}
.hero-scroll-line {
  width: 1px; height: 52px;
  background: linear-gradient(to bottom,
    rgba(232,160,32,0.0) 0%,
    rgba(232,160,32,0.7) 100%);
  animation: scroll-line-pulse 2s ease-in-out infinite 3.5s;
}
@keyframes scroll-line-pulse {
  0%,100% { transform: scaleY(1); opacity: 0.7; }
  50%      { transform: scaleY(0.5) translateY(8px); opacity: 1; }
}

/* ── ANIMAÇÕES DE ENTRADA ─────────────────── */
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── RESPONSIVE ───────────────────────────── */
@media (max-width: 767px) {
  .hero-content { padding-bottom: var(--sp-10); }
  .hero-title { letter-spacing: 0.25em; } /* reduz tracking em mobile */
  .hero-subtitle { letter-spacing: 3px; font-size: 0.875rem; }
  .hero-scroll { display: none; } /* oculto em mobile */
}

/* ── ACCESSIBILITY ────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero-title, .hero-subtitle, .hero-badge, .hero-ctas,
  .hero-scroll, .hero-scroll-line {
    animation: none;
    opacity: 1; transform: none; filter: none;
  }
}
```

---

## 9. Header — Especificação Completa

### 9.1 HTML do Header

```html
<header id="site-header" aria-label="Cabeçalho e navegação principal">
  <div class="header-inner">

    <!-- LOGO (top-left — como no vídeo) -->
    <a href="#hero" class="header-logo" aria-label="Mello's Oficina — início">
      <span class="logo-brand">MELLO'S</span>
      <span class="logo-sub" aria-hidden="true">OFICINA</span>
    </a>

    <!-- NAV CENTRAL (links centralizados — como no vídeo) -->
    <nav class="header-nav" id="main-nav" aria-label="Navegação principal">
      <a href="#servicos"    class="nav-link">Serviços</a>
      <a href="#sobre"       class="nav-link">Sobre</a>
      <a href="#avaliacoes"  class="nav-link">Avaliações</a>
      <a href="#localizacao" class="nav-link">Localização</a>
    </nav>

    <!-- ACTIONS (right — como "Contact us" + "Sign in" do vídeo) -->
    <div class="header-actions">
      <a href="tel:+5541997576883"
         class="header-phone"
         aria-label="Ligar para Mello's Oficina">
        (41) 99757-6883
      </a>
      <a href="https://wa.me/5541997576883?text=Ol%C3%A1%2C%20vim%20pelo%20site%21%20Gostaria%20de%20or%C3%A7ar%20um%20servi%C3%A7o."
         class="btn-header-cta"
         target="_blank" rel="noopener noreferrer"
         aria-label="WhatsApp Mello's Oficina">
        WhatsApp
      </a>
    </div>

    <!-- HAMBURGER (mobile only) -->
    <button class="hamburger"
            aria-label="Abrir menu de navegação"
            aria-expanded="false"
            aria-controls="mobile-nav">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>

  </div>

  <!-- MOBILE NAV -->
  <nav id="mobile-nav"
       class="mobile-nav"
       aria-label="Navegação mobile"
       aria-hidden="true">
    <a href="#servicos"    class="mobile-nav-link">Serviços</a>
    <a href="#sobre"       class="mobile-nav-link">Sobre</a>
    <a href="#avaliacoes"  class="mobile-nav-link">Avaliações</a>
    <a href="#localizacao" class="mobile-nav-link">Localização</a>
    <a href="#contato"     class="mobile-nav-link">Contato</a>
    <div class="mobile-nav-ctas">
      <a href="tel:+5541997576883" class="btn btn-ghost">Ligar</a>
      <a href="https://wa.me/5541997576883" class="btn btn-primary" target="_blank">WhatsApp</a>
    </div>
  </nav>
</header>
```

---

### 9.2 CSS Completo do Header

```css
/* ── HEADER BASE ─────────────────────────── */
#site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: var(--z-header);
  /* ESTADO INICIAL: 100% TRANSPARENTE — exatamente como no vídeo */
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background    350ms var(--ease-standard),
    border-color  350ms var(--ease-standard),
    transform     260ms var(--ease-exit);
}

.header-inner {
  display: flex;
  align-items: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 22px var(--container-pad);
  gap: var(--sp-4);
}

/* ── ESTADO GLASS (scroll > 60px) ────────── */
#site-header.is-glass {
  background: rgba(8, 8, 6, 0.84);
  backdrop-filter: blur(20px) saturate(1.3);
  -webkit-backdrop-filter: blur(20px) saturate(1.3);
  border-bottom-color: rgba(232, 160, 32, 0.08);
}

/* ── ESTADO HIDDEN (scroll down) ─────────── */
#site-header.is-hidden {
  transform: translateY(-100%);
}

/* ── LOGO ────────────────────────────────── */
.header-logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  flex-shrink: 0;
  transition: opacity 200ms ease;
}
.header-logo:hover { opacity: 0.8; }

.logo-brand {
  font-family: var(--font-display);    /* Bebas Neue */
  font-size: 1.7rem;
  color: var(--heat-fuel);
  letter-spacing: 2px;
}
.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--metal-chrome);
  letter-spacing: 5px;
  margin-top: 1px;
}

/* ── NAV CENTRAL (centralizado — como no vídeo) ── */
.header-nav {
  display: flex;
  align-items: center;
  gap: var(--sp-5);          /* ~40px — similar ao espaçamento do vídeo */
  margin: 0 auto;            /* centraliza entre logo e actions */
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(242, 242, 240, 0.72);   /* 72% opacity — como no vídeo */
  text-decoration: none;
  letter-spacing: var(--ls-nav);      /* 0.5px */
  position: relative;
  padding: 4px 0;
  transition: color 200ms var(--ease-standard);
}

/* Underline âmbar (adaptação do hover do vídeo) */
.nav-link::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: var(--heat-fuel);
  transform: scaleX(0); transform-origin: left;
  transition: transform 250ms var(--ease-spring);
  box-shadow: var(--glow-line);
}
.nav-link:hover { color: var(--metal-white); }
.nav-link:hover::after { transform: scaleX(1); }
.nav-link.is-active { color: var(--heat-fuel); }
.nav-link.is-active::after { transform: scaleX(1); }
.nav-link:focus-visible {
  outline: 2px solid var(--heat-fuel);
  outline-offset: 4px;
  border-radius: 2px;
}

/* ── ACTIONS (direita) ───────────────────── */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  flex-shrink: 0;
}

/* "Contact us" equivalente — texto simples */
.header-phone {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgba(242, 242, 240, 0.55);
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 200ms ease;
}
.header-phone:hover { color: var(--metal-frost); }

/* "Sign in" equivalente — CTA âmbar (sharp, não pill) */
.btn-header-cta {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--void-abyss);
  background: var(--heat-fuel);
  padding: 10px 22px;
  border-radius: 2px;             /* Sharp — diferente do pill do vídeo */
  text-decoration: none;
  transition: background 200ms ease, box-shadow 200ms ease, transform 150ms ease;
  box-shadow: 0 2px 0 var(--heat-ember);
}
.btn-header-cta:hover {
  background: var(--heat-gold);
  transform: translateY(-1px);
  box-shadow: 0 4px 0 var(--heat-ember), var(--glow-sm);
}
.btn-header-cta:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 var(--heat-ember);
}

/* ── HAMBURGER ───────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px; height: 44px;
  background: none; border: none; cursor: pointer; padding: 0;
  flex-shrink: 0;
}
.hamburger span {
  display: block; height: 1.5px;
  background: var(--metal-frost);
  transition: transform 300ms var(--ease-spring), opacity 200ms ease;
}
.hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* ── MOBILE NAV ──────────────────────────── */
.mobile-nav {
  position: fixed; inset: 0;
  background: rgba(6, 6, 4, 0.97);
  backdrop-filter: blur(10px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: var(--sp-5);
  transform: translateX(100%);
  transition: transform 400ms var(--ease-cinematic);
  z-index: calc(var(--z-header) - 1);
}
.mobile-nav.is-open { transform: translateX(0); }
.mobile-nav-link {
  font-family: var(--font-display);  /* Bebas Neue para mobile nav */
  font-size: 3rem; letter-spacing: 3px;
  color: var(--metal-ice); text-decoration: none;
  transition: color 200ms ease;
}
.mobile-nav-link:hover { color: var(--heat-fuel); }
.mobile-nav-ctas { display: flex; gap: var(--sp-2); margin-top: var(--sp-4); }

/* ── RESPONSIVE ─────────────────────────── */
@media (max-width: 1023px) {
  .header-nav { display: none; }
  .header-phone { display: none; }
}
@media (max-width: 767px) {
  .header-actions { display: none; }
  .hamburger { display: flex; }
}
```

---

### 9.3 JavaScript do Header

```javascript
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
        header.classList.toggle('is-glass', y > 60);

        // Hide/show
        if (y < 80) {
          header.classList.remove('is-hidden');
        } else if (scrollingDown && y > 120) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
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

  // ── Active nav links via IntersectionObserver ──
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('[data-nav-section]');
    const navLinks = document.querySelectorAll('.nav-link');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (active) active.classList.add('is-active');
      }
    });
  }
}
```

---

## 10. Seções do Site

### 10.1 Ordem e IDs

```html
<section id="hero"         data-nav-section> <!-- vídeo hero -->
<section id="diferenciais" data-nav-section> <!-- 3 pillars rápidos -->
<section id="servicos"     data-nav-section> <!-- 8 serviços em grid -->
<section id="sobre"        data-nav-section> <!-- história + importados -->
<section id="avaliacoes"   data-nav-section> <!-- Google reviews -->
<section id="localizacao"  data-nav-section> <!-- mapa + horários -->
<section id="contato"      data-nav-section> <!-- form + CTA final -->
<footer>                                     <!-- rodapé -->
```

### 10.2 Padrão de Seção

```html
<section id="servicos" class="section reveal" data-nav-section>
  <div class="section-container">

    <!-- Eyebrow (JetBrains Mono, âmbar, 0.65rem, ls: 4px) -->
    <p class="section-eyebrow" aria-hidden="true">02 / SERVIÇOS</p>

    <!-- Título (Bebas Neue, clamp display) -->
    <h2 class="section-title">O QUE FAZEMOS PELA SUA MÁQUINA</h2>

    <!-- Descrição (DM Sans 400, metal-silver) -->
    <p class="section-desc">
      Do diagnóstico eletrônico à revisão completa — importados e nacionais.
    </p>

    <!-- Conteúdo da seção -->
    <div class="section-body">
      ...
    </div>

  </div>
</section>
```

```css
.section {
  padding: var(--sp-12) 0;
  position: relative;
}
.section:nth-child(even) { background: var(--void-lifted); }
.section-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-pad);
}
.section-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-mono-sm);    /* 0.65rem */
  color: var(--heat-fuel);
  letter-spacing: var(--ls-label);  /* 4px */
  text-transform: uppercase;
  margin-bottom: var(--sp-1);
}
.section-title {
  font-family: var(--font-display); /* Bebas Neue */
  font-size: var(--text-display-lg);
  color: var(--metal-white);
  line-height: 0.95;
  margin-bottom: var(--sp-2);
}
.section-desc {
  font-family: var(--font-body);
  font-size: var(--text-body-lg);
  color: var(--metal-silver);
  max-width: 560px;
  line-height: 1.7;
  margin-bottom: var(--sp-6);
}
```

### 10.3 Conteúdo das Seções — Copy Final

**DIFERENCIAIS (3 pillars):**
```
★ Especialistas em Importados
  BMW, Audi, Mercedes, Volvo, Toyota e mais — diagnóstico com scanner dedicado

⚙ Atendimento Personalizado
  Explicamos cada serviço antes de executar. Nenhuma surpresa no orçamento.

✓ Preço Justo
  Transparência total. Compare, você vai perceber a diferença.
```

**SERVIÇOS (8 cards):**
```
Diagnóstico de Motor    · Freios
Suspensão & Direção     · Troca de Óleo
Transmissão             · Filtros (cabine + ar)
Pneus                   · Ar Condicionado
```

**SOBRE:**
```
Headline: "MECÂNICA COM AUTORIDADE TÉCNICA"
Body: A Mello's é especialista em veículos importados e nacionais em Curitiba/PR.
Nossa oficina em Santa Quitéria combina diagnóstico eletrônico de precisão com
atendimento direto e transparente — para que você nunca leve o carro sem entender
o que será feito.
Stats: 45+ Avaliações · 4,8★ Google · Importados & Nacionais
```

**AVALIAÇÕES (3 depoimentos reais do Google):**
```
★★★★★ "No que precisei, troca de óleo e filtro, fui muito bem atendido." — Cliente Google
★★★★★ "Não levo meus carros em nenhum outro lugar." — Cliente Google
★★★★  "Bom atendimento, preços justos, execução dos serviços precisa melhorar." — Cliente Google
```

**LOCALIZAÇÃO:**
```
Endereço:   R. Prof. Ulisses Vieira, 2081 — Santa Quitéria, Curitiba/PR
CEP:        80310-120
Telefone:   (41) 99757-6883
WhatsApp:   (41) 99757-6883
Horário:    Segunda–Sexta 08:00 às 18:00
Google Maps iframe: R. Prof. Ulisses Vieira, 2081 Curitiba
```

**CONTATO — CTA Final:**
```
Headline: "PRONTO PARA CUIDAR DO SEU CARRO?"
Subtitle: "Entre em contato. Sem complicação, sem enrolação."
Campos: Nome · Veículo/Modelo · Serviço desejado
Nota:    "Retornamos em até 2 horas."
```

---

## 11. Componentes UI

### 11.1 Botões

```css
/* BASE */
.btn {
  font-family: var(--font-heading); font-weight: 700;
  font-size: 0.875rem; letter-spacing: 1.5px; text-transform: uppercase;
  padding: 14px 32px; border-radius: 2px; border: none;
  cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
  transition: transform 150ms var(--ease-standard), box-shadow 150ms var(--ease-standard), background 200ms ease;
}
.btn:active { transform: translateY(2px) scale(0.98); }
.btn:focus-visible { outline: 2px solid var(--heat-fuel); outline-offset: 3px; }

/* PRIMARY */
.btn-primary { background: var(--heat-fuel); color: var(--void-abyss); box-shadow: var(--shadow-btn-rest); }
.btn-primary:hover { background: var(--heat-gold); box-shadow: var(--shadow-btn-hover); transform: translateY(-2px); }
.btn-primary:active { box-shadow: var(--shadow-btn-press); transform: translateY(3px); }

/* SECONDARY */
.btn-secondary { background: transparent; color: var(--heat-fuel); border: 1px solid var(--heat-fuel); }
.btn-secondary:hover { background: rgba(232,160,32,0.08); box-shadow: var(--glow-sm); transform: translateY(-1px); }

/* GHOST */
.btn-ghost { background: var(--metal-deep); color: var(--metal-silver); border: 1px solid var(--metal-border); }
.btn-ghost:hover { background: var(--metal-surface); color: var(--metal-white); border-color: var(--metal-frost); transform: translateY(-1px); }

/* SIZES */
.btn-sm { padding: 9px 20px; font-size: 0.75rem; }
.btn-lg { padding: 18px 44px; font-size: 1rem; }
```

### 11.2 Cards de Serviço

```css
.service-card {
  background: var(--metal-deep);
  border: 1px solid var(--metal-border);
  border-radius: 2px; padding: var(--sp-4);
  position: relative; overflow: hidden;
  transition: border-color 250ms var(--ease-standard), transform 400ms var(--ease-spring), box-shadow 250ms var(--ease-standard);
}
.service-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: var(--heat-fuel); transform: scaleX(0); transform-origin: left;
  transition: transform 300ms var(--ease-spring); box-shadow: var(--glow-line);
}
.service-card:hover { border-color: rgba(232,160,32,0.40); transform: translateY(-5px); box-shadow: var(--shadow-glow-md); }
.service-card:hover::before { transform: scaleX(1); }
.service-card:focus-within { border-color: var(--heat-fuel); }
```

### 11.3 Badge de Avaliação 3D

```css
.rating-badge {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: var(--heat-fuel); color: var(--void-abyss);
  padding: 12px 22px; border-radius: 2px;
  box-shadow: 0 6px 0 var(--heat-ember), var(--glow-md);
  transform-style: preserve-3d;
  transition: transform 400ms var(--ease-spring), box-shadow 400ms var(--ease-spring);
  cursor: default;
}
.rating-badge:hover {
  transform: rotateX(-10deg) rotateY(6deg) translateZ(4px);
  box-shadow: 8px 14px 0 var(--heat-ember), var(--glow-lg);
}
.rating-score { font-family: var(--font-mono); font-size: 1.6rem; font-weight: 700; }
.rating-stars { font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 2px; }
.rating-count { font-family: var(--font-mono); font-size: 0.65rem; opacity: 0.65; }
```

### 11.4 Inputs & Formulário

```css
.form-label {
  font-family: var(--font-mono); font-size: var(--text-mono-sm);
  color: var(--metal-chrome); letter-spacing: 3px; text-transform: uppercase;
  display: block; margin-bottom: var(--sp-1);
}
.form-input {
  width: 100%; background: var(--metal-deep); border: 1px solid var(--metal-border);
  border-radius: 2px; color: var(--metal-white);
  font-family: var(--font-body); font-size: 0.9rem;
  padding: 13px 16px; outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.form-input::placeholder { color: var(--metal-smoke); }
.form-input:focus { border-color: var(--heat-fuel); box-shadow: 0 0 0 3px rgba(232,160,32,0.12); }
.form-input:focus-visible { outline: 2px solid var(--heat-fuel); outline-offset: 2px; }
```

### 11.5 WhatsApp FAB

```css
.fab-whatsapp {
  position: fixed; bottom: 28px; right: 28px; z-index: var(--z-fab);
  width: 60px; height: 60px; border-radius: 50%;
  background: var(--semantic-whatsapp); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; text-decoration: none;
  box-shadow: 0 4px 20px rgba(37,211,102,0.40);
  transition: transform 300ms var(--ease-spring), box-shadow 300ms var(--ease-spring);
  aria-label: "Chamar Mello's no WhatsApp";
}
.fab-whatsapp:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 8px 32px rgba(37,211,102,0.55); }
.fab-whatsapp:focus-visible { outline: 3px solid var(--semantic-whatsapp); outline-offset: 3px; }
.fab-whatsapp::before {
  content: ''; position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid rgba(37,211,102,0.35);
  animation: fab-pulse 2.5s ease-in-out infinite;
}
@keyframes fab-pulse {
  0%,100% { transform: scale(1); opacity: 0.8; }
  50%      { transform: scale(1.18); opacity: 0; }
}

/* Sticky mobile bar (complementar ao FAB) */
.mobile-cta-bar {
  display: none;
  position: fixed; bottom: 0; left: 0; right: 0; z-index: var(--z-fab);
  background: rgba(8,8,6,0.95); backdrop-filter: blur(10px);
  border-top: 1px solid var(--metal-border);
  padding: var(--sp-2) var(--container-pad);
  gap: var(--sp-2);
}
@media (max-width: 767px) {
  .mobile-cta-bar { display: flex; }
  .mobile-cta-bar .btn { flex: 1; justify-content: center; }
}
```

---

## 12. Sistema de Animação & Motion

### 12.1 Easing Variables

```css
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);      /* 250ms — geral */
--ease-enter:     cubic-bezier(0, 0, 0.2, 1);         /* 600ms — entradas */
--ease-exit:      cubic-bezier(0.4, 0, 1, 1);         /* 200ms — saídas */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* 400ms — hover 3D */
--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);      /* 1000ms — reveals */
```

### 12.2 Keyframes Globais

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes reveal-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes neon-line-scan {
  0%   { transform: scaleX(0) translateX(-100%); opacity: 0; }
  30%  { opacity: 1; }
  70%  { opacity: 1; }
  100% { transform: scaleX(1) translateX(0); opacity: 0.6; }
}
@keyframes glow-pulse {
  0%,100% { opacity: 0.75; transform: scaleY(1); }
  50%      { opacity: 1.0;  transform: scaleY(1.08); }
}
```

### 12.3 Scroll Reveal

```css
.reveal {
  opacity: 0; transform: translateY(32px); filter: blur(2px);
  transition: opacity 700ms var(--ease-enter), transform 700ms var(--ease-enter), filter 500ms var(--ease-enter);
}
.reveal.delay-1 { transition-delay: 100ms; }
.reveal.delay-2 { transition-delay: 200ms; }
.reveal.delay-3 { transition-delay: 300ms; }
.reveal.delay-4 { transition-delay: 400ms; }
.reveal.in-view { opacity: 1; transform: translateY(0); filter: blur(0); }

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 200ms ease; transform: none; filter: none; }
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}
```

### 12.4 3D Mouse Tilt

```javascript
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
```

### 12.5 Scroll Reveal via IntersectionObserver

```javascript
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
```

### 12.6 Smooth Scroll

```javascript
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
```

### 12.7 Formulário de Contato

```javascript
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Enviando...';
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
```

### 12.8 Init Global

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSmoothScroll();
  initScrollReveal();
  init3DTilt('.service-card', 10);
  init3DTilt('.rating-badge', 8);
  initContactForm();
});
```

---

## 13. Ícones

**Especificação universal:**
- Formato: SVG inline (zero dependências externas)
- Stroke: `1.5px` | `stroke-linecap: round` | `stroke-linejoin: round`
- Fill: `none`
- ViewBox: `0 0 24 24`
- Tamanho: `20px` inline | `28px` em cards | `36px` em seções

**Biblioteca obrigatória:**

```
chave      → Diagnóstico / Serviços
freio      → Freios
pneu       → Pneus / Rodas
motor      → Motor / Diagnóstico
oleo       → Troca de Óleo
escudo     → Garantia / Qualidade
estrela    → Avaliações
whatsapp   → CTA / FAB
telefone   → Contato
location   → Endereço / Mapa
clock      → Horários
chevron-down → Scroll, acordeão
```

---

## 14. SEO — Schema & Meta

### 14.1 `<head>` Completo

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO -->
  <title>Mello's Oficina | Mecânica para Importados e Nacionais em Curitiba</title>
  <meta name="description" content="Oficina mecânica especializada em importados e nacionais em Curitiba/PR. Avaliação 4,8★ Google. Diagnóstico, freios, suspensão, câmbio e troca de óleo. Fale no WhatsApp!">
  <meta name="keywords" content="oficina mecânica curitiba, mecânica importados curitiba, troca de óleo curitiba, suspensão direção curitiba, Santa Quitéria">
  <link rel="canonical" href="https://mellosoficina.com.br">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="Mello's Oficina | Mecânica em Curitiba">
  <meta property="og:description" content="Especialistas em importados e nacionais. 4,8★ Google. Santa Quitéria, Curitiba/PR.">
  <meta property="og:url" content="https://mellosoficina.com.br">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Mello's Oficina | Mecânica em Curitiba">
  <meta name="twitter:description" content="Especialistas em importados e nacionais. 4,8★ Google.">

  <!-- Schema.org: AutoRepair > LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Mello's Oficina de Automóveis Importados & Nacionais",
    "description": "Oficina mecânica especializada em veículos importados e nacionais em Curitiba/PR",
    "url": "https://mellosoficina.com.br",
    "telephone": "+55-41-99757-6883",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Prof. Ulisses Vieira, 2081",
      "addressLocality": "Curitiba",
      "addressRegion": "PR",
      "postalCode": "80310-120",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.4244,
      "longitude": -49.2728
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00", "closes": "18:00"
    }],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8", "reviewCount": "45",
      "bestRating": "5", "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Automotivos",
      "itemListElement": [
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Diagnóstico de Motor"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Troca de Óleo"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Revisão de Freios"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Suspensão e Direção"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Transmissão"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Troca de Filtros"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Pneus"}},
        {"@type":"Offer","itemOffered":{"@type":"Service","name":"Ar Condicionado"}}
      ]
    }
  }
  </script>

  <!-- Fonts (único link) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300&family=Bebas+Neue&family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">

</head>
```

---

## 15. CSS Variables — Arquivo Completo

Cole este bloco no início do `<style>` antes de qualquer outra regra:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--void-base); color: var(--metal-frost); font-family: var(--font-body); font-size: 16px; line-height: 1.7; overflow-x: hidden; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--void-abyss); }
::-webkit-scrollbar-thumb { background: var(--heat-ember); border-radius: 2px; }

:root {
  /* VOID */
  --void-abyss:   #060604;
  --void-base:    #0A0A08;
  --void-lifted:  #0E0E0C;
  --void-glow:    #131210;

  /* METAL */
  --metal-deep:    #1A1A18;
  --metal-surface: #222220;
  --metal-border:  #2E2E2C;
  --metal-mid:     #3C3C3A;
  --metal-smoke:   #4E4E4C;
  --metal-chrome:  #6C6C6A;
  --metal-silver:  #8E8E8C;
  --metal-frost:   #B4B4B2;
  --metal-ice:     #D8D8D6;
  --metal-white:   #F2F2F0;

  /* HEAT */
  --heat-trace:      #3A2008;
  --heat-dim:        #8A5610;
  --heat-ember:      #C4851A;
  --heat-fuel:       #E8A020;
  --heat-gold:       #F0B83A;
  --heat-combustion: #F5C842;
  --heat-core:       #FF8C00;

  /* SEMANTIC */
  --semantic-danger:   #B91C1C;
  --semantic-success:  #16A34A;
  --semantic-info:     #1D6FA4;
  --semantic-whatsapp: #25D366;

  /* OVERLAYS (hero) */
  --overlay-dark:   rgba(6, 6, 4, 0.45);
  --overlay-bottom: rgba(6, 6, 4, 0.80);
  --overlay-navy:   rgba(12, 16, 27, 0.35);

  /* GLOW */
  --glow-xs:   0 0 6px rgba(232,160,32,0.25);
  --glow-sm:   0 0 14px rgba(232,160,32,0.35);
  --glow-md:   0 0 28px rgba(232,160,32,0.40), 0 4px 12px rgba(0,0,0,0.5);
  --glow-lg:   0 0 56px rgba(232,160,32,0.22), 0 0 112px rgba(232,160,32,0.10), 0 8px 32px rgba(0,0,0,0.7);
  --glow-line: 0 0 8px rgba(232,160,32,0.70);

  /* SHADOWS */
  --shadow-1: 0 1px 4px rgba(0,0,0,0.50);
  --shadow-2: 0 4px 12px rgba(0,0,0,0.55);
  --shadow-3: 0 8px 24px rgba(0,0,0,0.65);
  --shadow-4: 0 16px 48px rgba(0,0,0,0.75);
  --shadow-btn-rest:  0 4px 0 #C4851A, 0 6px 20px rgba(232,160,32,0.20);
  --shadow-btn-hover: 0 6px 0 #C4851A, 0 12px 32px rgba(232,160,32,0.35);
  --shadow-btn-press: 0 1px 0 #C4851A, 0 2px 8px rgba(232,160,32,0.15);

  /* TYPOGRAPHY */
  --font-display-thin: 'Raleway', sans-serif;
  --font-display:      'Bebas Neue', sans-serif;
  --font-heading:      'Barlow Condensed', sans-serif;
  --font-body:         'DM Sans', sans-serif;
  --font-mono:         'JetBrains Mono', monospace;

  /* TYPE SCALE */
  --text-hero-xl:    clamp(4rem, 10vw, 8rem);
  --text-hero-lg:    clamp(3rem, 7vw, 6rem);
  --text-display-xl: clamp(3.5rem, 8vw, 7rem);
  --text-display-lg: clamp(2.5rem, 5vw, 5rem);
  --text-display-md: clamp(2rem, 4vw, 3.5rem);
  --text-h2:         2rem;
  --text-h3:         1.5rem;
  --text-body-xl:    1.15rem;
  --text-body-lg:    1rem;
  --text-body-md:    0.9rem;
  --text-body-sm:    0.8rem;
  --text-mono-lg:    0.85rem;
  --text-mono-md:    0.75rem;
  --text-mono-sm:    0.65rem;

  /* LETTER SPACING */
  --ls-hero:    0.45em;
  --ls-sub:     5px;
  --ls-display: 1px;
  --ls-heading: 1px;
  --ls-mono:    3px;
  --ls-label:   4px;
  --ls-nav:     0.5px;
  --ls-counter: 2px;
  --ls-scroll:  4px;

  /* SPACING */
  --sp-1: 8px;  --sp-2: 16px; --sp-3: 24px; --sp-4: 32px;
  --sp-5: 40px; --sp-6: 48px; --sp-8: 64px; --sp-10: 80px;
  --sp-12: 96px; --sp-16: 128px; --sp-20: 160px;

  /* LAYOUT */
  --container-max: 1280px;
  --container-pad: clamp(24px, 5vw, 64px);
  --grid-gutter:   24px;

  /* RADIUS */
  --r-sharp: 2px;
  --r-base:  4px;

  /* EASING */
  --ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter:     cubic-bezier(0, 0, 0.2, 1);
  --ease-exit:      cubic-bezier(0.4, 0, 1, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);

  /* Z-INDEX */
  --z-base:    0;
  --z-raised:  10;
  --z-overlay: 50;
  --z-header:  100;
  --z-fab:     400;
}
```

---

## 16. Checklist de Aceitação

### Hero + Vídeo
```
[ ] Vídeo ocupa 100svh, object-fit: cover, sem controles visíveis
[ ] Header flutua sobre o vídeo com fundo 100% transparente
[ ] Título "MELLO'S" em Raleway 200, letter-spacing: 0.45em, na parte inferior
[ ] Subtítulo com tracking 5px abaixo do título
[ ] Scroll indicator no canto inferior direito, vertical-rl
[ ] Overlay em 3 camadas: base leve + bottom gradiente + navy depth
[ ] Animações de entrada com stagger: badge(1.4s) → título(1.7s) → sub(2.1s) → CTAs(2.5s)
[ ] Video autoplay, muted, loop, playsinline
[ ] prefers-reduced-motion desabilita animações do hero
```

### Header
```
[ ] Background 100% transparente no topo
[ ] Transição para glass (rgba+blur) ao scroll > 60px em 350ms
[ ] Hide ao scroll down > 120px, show ao scroll up
[ ] Logo âmbar top-left, sub em mono abaixo
[ ] Nav links centralizados, 72% opacity, underline âmbar no hover
[ ] CTA "WhatsApp" top-right em âmbar bold
[ ] Mobile: hamburger → fullscreen nav em Bebas Neue 3rem
[ ] Mobile nav fecha ao clicar em link e ao pressionar Escape
[ ] Todos os links com :focus-visible visível
```

### Componentes
```
[ ] Botão primary: 3D press (sombra muda no :active)
[ ] Cards de serviço: linha âmbar no topo ao hover + translateY(-5px)
[ ] Rating badge: tilt 3D no hover
[ ] FAB WhatsApp: pulse animation + scale no hover
[ ] Mobile sticky bar: dois CTAs (Ligar + WhatsApp)
[ ] Form: preventDefault + feedback de sucesso sem reload
[ ] Google Maps iframe com loading="lazy" e title
```

### Acessibilidade
```
[ ] Contraste ≥ 4.5:1 em todo texto normal
[ ] :focus-visible em todos os elementos interativos
[ ] aria-label em ícones sem texto
[ ] alt em todas as imagens
[ ] Landmarks: header/main/nav/section/footer
[ ] Form: label explícito para cada input
[ ] Video: muted (obrigatório para autoplay) + aria-hidden="true" no wrapper
[ ] Mobile touch targets ≥ 44×44px
```

### Performance
```
[ ] LCP ≤ 2.5s (4G)
[ ] Nenhuma animação em propriedades não-GPU (width, height, top, etc.)
[ ] requestAnimationFrame em todos os scroll listeners
[ ] Google Fonts com display=swap
[ ] Imagens com loading="lazy"
[ ] Vídeo com preload="auto" (hero crítico) ou preload="metadata" se performance preocupar
[ ] Zero console.error em produção
[ ] Zero !important no CSS
[ ] Zero style="" inline no HTML (apenas classes)
```

### Conversão
```
[ ] WhatsApp link: wa.me/5541997576883?text=Olá%2C%20vim%20pelo%20site%21%20Gostaria%20de%20orçar%20um%20serviço.
[ ] Telefone: tel:+5541997576883
[ ] Pelo menos 3 pontos de CTA WhatsApp na página (hero + seção + FAB)
[ ] Formulário com 3 campos: nome, veículo/modelo, serviço
[ ] Google Maps embed com endereço correto
```

---

*Design System Mello's — Versão Final 3.0*  
*Maio de 2026 · Gerado a partir de: PRD v1.0 + análise frame-a-frame do vídeo XIK3D/Zeno + Design System v1 e v2*  
*Este documento substitui todas as versões anteriores.*
