import Color from 'color';
import colorString from 'color-string';

/**
 * Calculare Contrast
 *
 * Wraps the color npm package ang returns the contrast between two colors
 *
 * @param {string} color1
 * @param {string} color2
 */
export function calculateContrast(color1, color2) {
  return Color(color1).contrast(Color(color2));
}

/**
 * Is Valid
 *
 * Determines whether a string is a valid color.
 * RGBA and HSLA are considered invalid.
 *
 *
 * @param {string} color
 * @returns {boolean}
 */
export function isValid(color) {
  return Boolean(colorString.get.rgb(color));
}
