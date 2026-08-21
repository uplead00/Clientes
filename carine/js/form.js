/**
 * @file form.js
 * @description Envio do formulário de contato via redirecionamento para WhatsApp.
 *              Monta a mensagem com os dados do formulário e abre o link wa.me.
 */

/* Número de WhatsApp da Carine (formato internacional, sem +) */
const WHATSAPP_NUMBER = '5541998003873';

export function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', _handleSubmit);
}

/**
 * Captura os dados do formulário, monta a mensagem e abre o WhatsApp.
 *
 * @param {SubmitEvent} e
 */
function _handleSubmit(e) {
  e.preventDefault();

  const nome    = document.getElementById('nome').value.trim();
  const desafio = document.getElementById('desafio').value.trim();

  const message = `Olá, Carine! Meu nome é ${nome}. Gostaria de agendar minha consultoria gratuita. Meu maior desafio ou objetivo financeiro hoje é: ${desafio}.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}
