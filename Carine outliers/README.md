# Carine Hernandes | Outliers — Landing Page

Landing page de consultoria financeira premium para Carine Hernandes / Outliers.

---

## 📁 Estrutura do Projeto

```
carine/
│
├── index.html              # HTML da página (sem CSS ou JS inline)
│
├── css/
│   ├── base.css            # Reset, variáveis CSS e tipografia global
│   ├── layout.css          # Container, header, footer, WhatsApp flutuante
│   ├── components.css      # Botões, cards, FAQ, formulário
│   ├── sections.css        # Estilos específicos de cada seção
│   └── animations.css      # Keyframes, reveal no scroll e responsividade
│
├── js/
│   ├── main.js             # Ponto de entrada — inicializa os módulos
│   ├── navigation.js       # Menu mobile e efeito de scroll no header
│   ├── animations.js       # Reveal no scroll e accordion do FAQ
│   └── form.js             # Envio do formulário via WhatsApp
│
├── assets/
│   ├── images/
│   │   ├── carine-hero.jpeg
│   │   ├── carine-sobre.jpeg
│   │   └── logo-outliers.png
│   └── icons/              # Ícones SVG avulsos (se necessário)
│
└── README.md
```

---

## 🚀 Como Rodar

**Opção 1 — Live Server (VS Code)**
1. Instale a extensão **Live Server**
2. Clique com botão direito em `index.html` → **Open with Live Server**

**Opção 2 — Servidor Python**
```bash
python -m http.server 8000
# Acesse http://localhost:8000
```

> ⚠️ O JavaScript usa `type="module"` (ES Modules). É necessário abrir via servidor HTTP — não funciona direto pelo `file://`.

---

## 🛠️ Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — design system com custom properties
- **JavaScript ES6+** — módulos nativos, sem dependências externas
- **Google Fonts** — Playfair Display + Inter + DM Sans
- **Phosphor Icons** — biblioteca de ícones via CDN

---

## 📞 Contato

- 📷 [@carinebozzareis](https://www.instagram.com/carinebozzareis/)
- 💼 [LinkedIn](https://www.linkedin.com/in/carine-bozza-reis-hernandes-11439732/)
- 📱 WhatsApp: (41) 99800-3873

---

© 2026 Outliers / Carine Hernandes. Todos os direitos reservados.
