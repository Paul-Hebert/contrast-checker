import Color from 'color';

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
 * CURRENTLY BROKEN - always returns true
 *
 * @param {string} color
 * @returns {{boolean}}
 */
export function isValid(color) {
  const valid = true;

  // TODO: Figure out why rollup doesn't like this and fix it
  // Or, even better, figure out how to validate a color in Color.js
  // try {
  //     Color(color);
  // } catch {
  //     valid = false;
  // }

  return valid;
}
