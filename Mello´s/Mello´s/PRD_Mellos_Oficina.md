# PRD — Site Institucional
## Mello's Oficina de Automóveis Importados & Nacionais

---

> **Documento:** Product Requirements Document (PRD)  
> **Versão:** 1.0  
> **Data:** Maio de 2026  
> **Responsável:** Front-End / UI·UX Lead  
> **Status:** Aprovação Pendente

---

## 1. Visão Geral do Produto

### 1.1 Contexto

A Mello's é uma oficina mecânica especializada em veículos importados e nacionais localizada no bairro Santa Quitéria, em Curitiba/PR. Com avaliação de **4,8/5 no Google (45 avaliações)**, a empresa possui reputação consolidada localmente, mas ainda **não conta com presença digital própria** além de um site básico em plataforma genérica — o que limita a captação de novos clientes e a percepção de autoridade da marca.

### 1.2 Problema

| Problema | Impacto |
|---|---|
| Ausência de site profissional de alto nível | Perda de credibilidade frente a concorrentes |
| Nenhum canal digital para captação de leads | Dependência total do boca a boca e Google Maps |
| Dificuldade de transmitir diferenciais (importados + nacionais) | Cliente não consegue perceber autoridade técnica |
| Sem agendamento online | Atrito desnecessário para novos clientes |

### 1.3 Solução

Construir um **site institucional de alta conversão**, com identidade visual forte, focado em transmitir confiança, especialidade técnica e facilitar o contato — tanto para clientes de veículos nacionais quanto importados.

---

## 2. Objetivos do Produto

### 2.1 Objetivo Principal
Converter visitantes do Google em **leads qualificados** (ligação, WhatsApp ou agendamento) com uma taxa de conversão-alvo de **≥ 8%**.

### 2.2 Objetivos Secundários
- Reforçar autoridade da marca com prova social (avaliações Google)
- Transmitir especialidade em **veículos importados** como diferencial competitivo
- Melhorar posicionamento local em SEO (Google Search + Maps)
- Reduzir fricção no primeiro contato com novos clientes

### 2.3 KPIs de Sucesso

| KPI | Meta |
|---|---|
| Taxa de clique no CTA principal (WhatsApp/Ligar) | ≥ 8% das sessões |
| Tempo médio na página | ≥ 1min 45s |
| Taxa de rejeição (bounce rate) | ≤ 55% |
| Posição no Google para termos locais | Top 3 em Curitiba |
| Leads mensais gerados pelo site | ≥ 30/mês |

---

## 3. Público-Alvo

### 3.1 Personas Primárias

**Persona A — O Motorista Pragmático**
- Homem, 30–55 anos, Curitiba
- Possui veículo nacional (HB20, Onix, Argo, etc.)
- Busca mecânica de confiança com preço justo
- Decisão por avaliações e localização
- Ponto de entrada: Google Search + Google Maps

**Persona B — O Dono de Importado**
- Homem/Mulher, 35–60 anos, classe B/A
- Possui veículo europeu ou asiático (BMW, Audi, Toyota, Jeep, etc.)
- Precisa de especialista — não confia em qualquer oficina
- Decisão por reputação, aparência profissional e clareza técnica
- Ponto de entrada: indicação + pesquisa ativa

### 3.2 Persona Secundária

**Persona C — O Agendador Online**
- 25–40 anos, habituado a resolver tudo pelo celular
- Não quer ligar — prefere WhatsApp ou formulário
- Exige UX fluida e informação objetiva

---

## 4. Escopo do Produto

### 4.1 MVP — v1.0 (Entrega Inicial)

| Seção | Descrição |
|---|---|
| **Hero** | Headline impactante, subheadline de posicionamento, CTA principal (WhatsApp), foto/visual de alta qualidade da oficina |
| **Sobre** | História da Mello's, diferenciais, anos de experiência, público atendido (importados + nacionais) |
| **Serviços** | Cards visuais dos serviços: diagnóstico de motor, freios, suspensão/direção, troca de óleo, transmissão, filtros, pneus |
| **Diferenciais** | Seção curta e direta com ícones: especialistas em importados, atendimento personalizado, preço justo |
| **Prova Social** | Carrossel ou grid com depoimentos do Google (4,8 ★ — 45 avaliações) + badge de avaliação |
| **Localização** | Mapa incorporado (Google Maps), endereço, horários de funcionamento, botão de rota |
| **Contato / CTA Final** | Botão WhatsApp flutuante, número de telefone clicável, formulário simples (nome, veículo, serviço) |
| **Header** | Logo, navegação âncora, botão de contato fixo no scroll |
| **Footer** | Endereço, horários, redes sociais (se houver), copyright |

### 4.2 Fora do Escopo — v1.0
- Sistema de agendamento integrado (backend)
- Área do cliente / login
- Blog / conteúdo editorial
- E-commerce de peças
- App mobile nativo

### 4.3 Roadmap — Versões Futuras

| Versão | Feature |
|---|---|
| v1.1 | Formulário de agendamento com confirmação por e-mail |
| v1.2 | Galeria de serviços realizados (before/after) |
| v2.0 | Blog de manutenção preventiva (SEO de conteúdo) |
| v2.1 | Integração com sistema interno de OS |

---

## 5. Design System & Identidade Visual

### 5.1 Direção Estética

**Tom:** Industrial refinado com toques de premium automotivo.  
**Referências visuais:** Garagens de luxo europeias, identidade de marcas como Bosch Service e oficinas premium americanas.  
**Diferencial estético:** Profissionalismo que transmite confiança sem parecer genérico — deve se destacar visualmente de qualquer concorrente local.

### 5.2 Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0E0E0E` | Background principal (dark) |
| `--color-surface` | `#1A1A1A` | Cards, seções alternadas |
| `--color-accent` | `#E8A020` | Amarelo âmbar — CTA, destaques, hover |
| `--color-accent-dark` | `#C4851A` | Hover states dos CTAs |
| `--color-text-primary` | `#F5F5F0` | Títulos e texto principal |
| `--color-text-secondary` | `#9A9A90` | Subtexto, labels, placeholders |
| `--color-border` | `#2C2C2C` | Divisores, bordas de cards |

> **Racional:** Fundo escuro passa solidez e seriedade. O amarelo âmbar remete a motores, luz de advertência, ferramentas — e tem altíssimo contraste para CTAs.

### 5.3 Tipografia

| Papel | Família | Peso | Fonte |
|---|---|---|---|
| Display / H1 | `Bebas Neue` | 400 | Google Fonts |
| Títulos / H2–H3 | `Barlow Condensed` | 600–700 | Google Fonts |
| Corpo / Parágrafos | `DM Sans` | 400–500 | Google Fonts |
| Labels / Badges | `JetBrains Mono` | 500 | Google Fonts |

> **Racional:** Bebas Neue é condensada e impactante — muito usada em marcas automotivas. DM Sans é legível e moderna no corpo de texto. JetBrains Mono em detalhes técnicos reforça precisão.

### 5.4 Espaçamento & Grid

- Grid: **12 colunas**, gutter de 24px
- Container máximo: **1280px**
- Unidade base de espaçamento: **8px** (múltiplos: 8, 16, 24, 32, 48, 64, 96px)
- Bordas: `border-radius` de **4px** (sharp/industrial) — sem excesso de arredondamento

### 5.5 Componentes UI

| Componente | Especificação |
|---|---|
| Botão Primário | Background `--accent`, texto dark, `font: Barlow Condensed 700`, uppercase, padding `14px 32px`, hover com leve escala e brilho |
| Botão Secundário | Outline `1px --accent`, texto `--accent`, mesmo padding, hover fill |
| Card de Serviço | Fundo `--surface`, ícone SVG tonal, título Barlow, texto DM Sans, hover com borda `--accent` e leve translate-Y |
| Badge de Avaliação | Fundo âmbar, estrelas Unicode `★`, número em Mono, sombra sutil |
| Flutuante WhatsApp | Botão fixo bottom-right, ícone SVG nativo, pulse animation sutil |

---

## 6. Requisitos de UX

### 6.1 Hierarquia de Informação (Scroll Flow)

```
[HERO] → Captura atenção, CTA imediato
   ↓
[DIFERENCIAIS] → Por que a Mello's? (3 pillars rápidos)
   ↓
[SERVIÇOS] → O que fazemos (scannable, visual)
   ↓
[SOBRE] → Quem somos, história, especialidade em importados
   ↓
[PROVA SOCIAL] → Avaliações Google, depoimentos
   ↓
[LOCALIZAÇÃO] → Mapa + horários + botão rota
   ↓
[CTA FINAL] → Último empurrão — WhatsApp ou Formulário
```

### 6.2 Padrões de Interação

- **CTA WhatsApp fixo** visível em 100% do scroll (mobile e desktop)
- **Navegação âncora** no header que some no scroll down e volta no scroll up (hide-on-scroll)
- **Smooth scroll** nativo para todas as âncoras internas
- **Hover states** em todos os elementos clicáveis (transições de 200ms)
- **Lazy loading** em imagens e seção de mapa

### 6.3 Acessibilidade (WCAG 2.1 — Nível AA)

- Contraste mínimo de 4.5:1 para texto normal
- Todos os elementos interativos acessíveis por teclado (`:focus-visible` customizado)
- `alt` descritivo em todas as imagens
- Landmarks semânticos: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`
- Formulário com `<label>` explícito para cada campo

---

## 7. Requisitos Técnicos

### 7.1 Stack Técnica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Markup | HTML5 semântico | SEO, acessibilidade |
| Estilo | CSS3 + Custom Properties | Performance, manutenibilidade |
| Interação | Vanilla JS (ES6+) | Zero dependência, velocidade |
| Fontes | Google Fonts (preconnect) | Carregamento otimizado |
| Ícones | SVG inline ou Lucide Icons | Leve, escalável, sem dependência |
| Mapa | Google Maps Embed API | Familiar para o usuário |
| Deploy | Vercel / Netlify / Hostinger | Simples, CDN global |

> **Nota:** Não utilizar frameworks pesados (React, Vue) para o MVP — a simplicidade garante performance máxima e manutenção acessível pelo cliente.

### 7.2 Performance

| Métrica | Meta |
|---|---|
| LCP (Largest Contentful Paint) | ≤ 2,5s |
| FID / INP | ≤ 200ms |
| CLS (Cumulative Layout Shift) | ≤ 0,1 |
| PageSpeed Insights (Mobile) | ≥ 85 |
| PageSpeed Insights (Desktop) | ≥ 95 |
| Tamanho total da página | ≤ 1,5MB |

### 7.3 SEO Técnico

- Meta tags: `title`, `description`, `og:*`, `twitter:card`
- Schema.org markup: `LocalBusiness` → `AutoRepair`
  - `name`, `address`, `telephone`, `openingHours`, `aggregateRating`
- `sitemap.xml` e `robots.txt`
- URLs canônicas
- Google Analytics 4 (ou Plausible para privacidade)
- Google Search Console configurado

### 7.4 Responsividade

| Breakpoint | Largura | Layout |
|---|---|---|
| Mobile S | 320px | 1 coluna, stack vertical |
| Mobile L | 425px | 1 coluna, ajustes de padding |
| Tablet | 768px | 2 colunas para cards |
| Desktop | 1024px | Layout completo |
| Desktop L | 1280px+ | Container max-width |

**Mobile-first:** todo CSS base é escrito para mobile, desktop usa `@media (min-width: ...)`.

---

## 8. Conteúdo & Copy

### 8.1 Headlines Sugeridos

**Hero H1:**
> "Sua Máquina Merece Quem Entende."

**Hero Subheadline:**
> "Especialistas em veículos importados e nacionais. Atendimento técnico de confiança desde [ano de fundação] — Curitiba/PR."

**CTA Principal:**
> "Falar no WhatsApp"

**Seção Diferenciais:**
> "Por que a Mello's?"

**Seção Serviços:**
> "O que fazemos pela sua máquina"

### 8.2 Conteúdo Necessário do Cliente

Antes do desenvolvimento iniciar, o cliente deve fornecer:

- [ ] Ano de fundação da oficina
- [ ] Foto profissional da fachada e interior (mín. 1200×800px)
- [ ] Foto do(s) mecânico(s) em ação (humaniza a marca)
- [ ] Logotipo em SVG ou PNG com fundo transparente
- [ ] Marcas/modelos de importados que atende (BMW, Audi, VW, Toyota, etc.)
- [ ] Horário de funcionamento completo
- [ ] Link do perfil do Google Business (para integração de avaliações)
- [ ] Número de WhatsApp Business

---

## 9. Fluxo de Conversão Principal

```
USUÁRIO PESQUISA "oficina mecânica curitiba"
            ↓
    Encontra a Mello's no Google
            ↓
    Clica e acessa o site
            ↓
    Hero captura atenção em < 3s
            ↓
    Scroll natural pela hierarquia de conteúdo
            ↓
    Identificação com serviço ou avaliações
            ↓
    CTA: WhatsApp flutuante ou botão de seção
            ↓
    Abertura direta do WhatsApp com mensagem pré-preenchida:
    "Olá, vim pelo site! Gostaria de orçar um serviço."
            ↓
    CONVERSÃO ✓
```

---

## 10. Critérios de Aceitação

### 10.1 Funcional

- [ ] Todos os links e botões funcionam corretamente
- [ ] WhatsApp abre com mensagem pré-preenchida (deep link `wa.me/`)
- [ ] Telefone é clicável em mobile (`tel:`)
- [ ] Mapa do Google renderiza corretamente
- [ ] Formulário valida campos obrigatórios antes de envio
- [ ] Navegação âncora funciona em todos os breakpoints

### 10.2 Visual

- [ ] Site renderiza corretamente em Chrome, Firefox, Safari e Edge
- [ ] Responsivo em mobile (320px), tablet (768px) e desktop (1280px)
- [ ] Todos os textos têm contraste ≥ 4.5:1 (WCAG AA)
- [ ] Animações não causam CLS
- [ ] Imagens com lazy loading e sem distorção de proporção

### 10.3 Performance

- [ ] PageSpeed Insights mobile ≥ 85
- [ ] LCP ≤ 2,5s em conexão 4G simulada
- [ ] Nenhum erro no console em produção

### 10.4 SEO

- [ ] Schema LocalBusiness validado em rich results test
- [ ] Meta title entre 50–60 caracteres
- [ ] Meta description entre 150–160 caracteres
- [ ] Sitemap enviado ao Google Search Console

---

## 11. Estimativa de Esforço

| Fase | Descrição | Estimativa |
|---|---|---|
| **Fase 0** | Coleta de assets do cliente, briefing, referências | 0,5 dia |
| **Fase 1** | Wireframes (mobile + desktop) para aprovação | 1 dia |
| **Fase 2** | Design visual (Figma ou direto em código) | 1,5 dias |
| **Fase 3** | Desenvolvimento HTML/CSS/JS | 2,5 dias |
| **Fase 4** | SEO técnico, Schema, otimização de performance | 0,5 dia |
| **Fase 5** | Revisão, testes cross-browser, ajustes finais | 0,5 dia |
| **Fase 6** | Deploy, configuração de domínio, Analytics | 0,5 dia |
| **Total** | | **~7 dias úteis** |

---

## 12. Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Cliente sem fotos profissionais | Alta | Alto | Orientar uso de câmera de celular com luz natural + guia de fotografia |
| Alterações de escopo durante desenvolvimento | Média | Médio | Congelar requisitos após aprovação de wireframe |
| Domínio/hospedagem não configurados | Média | Alto | Iniciar processo de domínio paralelamente ao desenvolvimento |
| Conteúdo textual não fornecido a tempo | Alta | Médio | Usar copy provisório e travar aprovação visual antes de receber textos finais |

---

## 13. Próximos Passos

1. **[CLIENTE]** Aprovação deste PRD
2. **[CLIENTE]** Envio dos assets (logo, fotos, informações)
3. **[DEV]** Entrega dos wireframes para aprovação
4. **[CLIENTE]** Aprovação dos wireframes
5. **[DEV]** Início do desenvolvimento
6. **[DEV]** Entrega do ambiente de staging para revisão
7. **[CLIENTE]** Aprovação final
8. **[DEV]** Deploy em produção

---

*PRD elaborado com base nos dados públicos da Mello's Oficina disponíveis no Google Business Profile.*  
*Versão 1.0 — sujeito a revisão após reunião de alinhamento com o cliente.*
