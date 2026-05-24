/**
 * @file main.js
 * @description Ponto de entrada do JavaScript.
 *              Importa e inicializa todos os módulos após o DOM carregar.
 */

import { initNavigation } from './navigation.js';
import { initAnimations  } from './animations.js';
import { initForm        } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation(); // menu mobile e efeito de scroll no header
  initAnimations(); // reveal no scroll e accordion do FAQ
  initForm();       // envio do formulário via WhatsApp
});
