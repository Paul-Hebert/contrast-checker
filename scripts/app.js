var Color = require("color");

const colorInputs = document.querySelectorAll('.js-color-input');

const foregroundInput = document.getElementById('js-foreground');
const backgroundInput = document.getElementById('js-background');
const example = document.getElementById('js-example');
const contrast = document.getElementById('js-contrast');
const swapButton = document.getElementById('js-swap');

init();

function init(){
    updateColors();

    colorInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateColors();
        });
    })

    // TODO: Handle keyboard event submission
    swapButton.addEventListener('click', e => {
        e.preventDefault();

        let oldForeground = foreground();
        let oldBackground = background();

        foregroundInput.value = oldBackground;
        backgroundInput.value = oldForeground;

        updateColors();
    });
}

function updateColors(){
    if(isValid(foregroundInput.value) && isValid(foregroundInput.value)) {
        document.body.style.background = background();
        example.style.color = foreground();

        // ToDo: Investigate odd edge cases mentioned here:
        // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
        contrast.innerText = Color(background()).contrast(Color(foreground())).toFixed(2);
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
    return backgroundInput.value;
}

function foreground() {
    return foregroundInput.value;
}
