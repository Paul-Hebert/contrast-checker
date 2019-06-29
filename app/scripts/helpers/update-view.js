import { ui } from './ui';
import { state } from './state';
import { standards } from './standards';
import { isValid, calculateContrast } from './colors';

const shareLinkBase = 'fakeurl.com';

export function updateView() {
  updateInputs();
  updateColors();
  updateResults();
  updateShareLink();
}

function updateInputs() {
  ui.foregroundInput.value = state.foregroundColor;
  ui.backgroundInput.value = state.backgroundColor;
}

function updateColors() {
  if (isValid(ui.foregroundInput.value) && isValid(ui.foregroundInput.value)) {
    document.body.style.background = state.backgroundColor;
    ui.example.style.color = state.foregroundColor;
  }
}

function updateResults() {
  const contrast = calculateContrast(
    state.foregroundColor,
    state.backgroundColor
  );

  // ToDo: Investigate odd edge cases mentioned here:
  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
  ui.contrast.innerText = contrast.toFixed(2);

  // TODO: This logic and naming could be improved.
  Object.keys(standards).forEach(key => {
    let value = '';

    const textSize = standards[key];

    for (let i = 0; i < textSize.length; i++) {
      if (contrast >= textSize[i].minimum) {
        value = `<b>${textSize[i].score}</b> — ${textSize[i].details}`;
        break;
      }
    }

    ui[key].innerHTML = value;
  });
}

function updateShareLink() {
  if (ui.shareLink) {
    const shareLinkText = `${shareLinkBase}?fg=${state.foregroundColor}&bg=${state.backgroundColor}`;

    ui.shareLink.value = shareLinkText;
  }
}
