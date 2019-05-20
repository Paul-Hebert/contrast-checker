var Color = require("color");

const ui = {
    colorInputs: document.querySelectorAll('.js-color-input'),
    foregroundInput: document.getElementById('js-foreground'),
    backgroundInput: document.getElementById('js-background'),
    swapButton: document.getElementById('js-swap'),

    contrast: document.getElementById('js-contrast'),
    smallText: document.getElementById('js-small-text'),
    largeText: document.getElementById('js-large-text'),

    example: document.getElementById('js-example'),
}

init();

function init(){
    updateColors();

    ui.colorInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateColors();
        });
    })

    // TODO: Handle keyboard event submission
    ui.swapButton.addEventListener('click', e => {
        e.preventDefault();

        let oldForeground = foreground();
        let oldBackground = background();

        ui.foregroundInput.value = oldBackground;
        ui.backgroundInput.value = oldForeground;

        updateColors();
    });
}

function updateColors(){
    if(isValid(ui.foregroundInput.value) && isValid(ui.foregroundInput.value)) {
        document.body.style.background = background();
        ui.example.style.color = foreground();

        // ToDo: Investigate odd edge cases mentioned here:
        // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
        ui.contrast.innerText = Color(background()).contrast(Color(foreground())).toFixed(2);
    }
}

function isValid(color) {
    let valid = true;

    // TODO: Figure out why rollup doesn't like this and fix it
    // Or, even better, figure out how to validate a color in Color.js
    // try {
    //     Color(color);
    // } catch {
    //     valid = false;
    // }

    return valid;
};

function background() {
    return ui.backgroundInput.value;
}

function foreground() {
    return ui.foregroundInput.value;
}
