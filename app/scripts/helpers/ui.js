/**
 * An object storing references to DOM nodes that need to be manipulated
 */
export const ui = {
  colorInputs: document.querySelectorAll('.js-color-input'),
  foregroundInput: document.getElementById('js-foreground'),
  backgroundInput: document.getElementById('js-background'),
  swapButton: document.getElementById('js-swap'),

  contrast: document.getElementById('js-contrast'),
  smallText: document.getElementById('js-small-text'),
  largeText: document.getElementById('js-large-text'),

  example: document.getElementById('js-example'),

  shareLink: document.getElementById('js-share-link')
};
