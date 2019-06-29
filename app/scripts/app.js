import { ui } from './helpers/ui';
import { state } from './helpers/state';
import { updateView } from './helpers/update-view';

init();

function init() {
  updateView();

  ui.colorInputs.forEach(input => {
    input.addEventListener('input', () => {
      const stateProp = input.getAttribute('name');

      state[stateProp] = input.value;

      updateView();
    });
  });

  // TODO: Handle keyboard event submission
  ui.swapButton.addEventListener('click', e => {
    e.preventDefault();

    const oldForeground = state.foregroundColor;
    const oldBackground = state.backgroundColor;

    state.foregroundColor = oldBackground;
    state.backgroundColor = oldForeground;

    updateView();
  });
}
