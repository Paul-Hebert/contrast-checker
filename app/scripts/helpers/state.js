import { ui } from './ui';
import { calculateContrast } from './colors';

/**
 * State
 *
 * An object to track our app state. Returns the apps starting state.
 */
export const state = {
  foregroundColor: ui.foregroundInput.value,
  backgroundColor: ui.backgroundInput.value,
  contrast: calculateContrast(
    ui.foregroundInput.value,
    ui.backgroundInput.value
  )
};
