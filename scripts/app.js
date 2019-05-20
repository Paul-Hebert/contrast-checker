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

const standards = {
    smallText: {
        AA: 4.5,
        AAA: 7
    },
    largeText: {
        AA: 3,
        AAA: 4.5
    }
};

const state = {
    foregroundColor: ui.foregroundInput.value,
    backgroundColor: ui.backgroundInput.value,
    contrast: calculateContrast(ui.foregroundInput.value, ui.backgroundInput.value)
};

init();

function init(){
    updateView();

    ui.colorInputs.forEach(input => {
        input.addEventListener('input', () => {
            let stateProp = input.getAttribute('name');

            state[stateProp] = input.value;

            updateView();
        });
    })

    // TODO: Handle keyboard event submission
    ui.swapButton.addEventListener('click', e => {
        e.preventDefault();

        let oldForeground = state.foregroundColor;
        let oldBackground = state.backgroundColor;

        state.foregroundColor = oldBackground;
        state.backgroundColor = oldForeground;

        updateView();
    });
}

function updateView(){
    updateInputs();
    updateColors();
    updateResults();
}

function updateInputs(){
    ui.foregroundInput.value = state.foregroundColor;
    ui.backgroundInput.value = state.backgroundColor;
}

function updateColors(){
    if(isValid(ui.foregroundInput.value) && isValid(ui.foregroundInput.value)) {
        document.body.style.background = state.backgroundColor;
        ui.example.style.color = state.foregroundColor;
    }
}

function updateResults(){
    let contrast = calculateContrast(state.foregroundColor, state.backgroundColor);

    // ToDo: Investigate odd edge cases mentioned here:
    // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
    ui.contrast.innerText = contrast.toFixed(2);

    Object.keys(standards).forEach(key => {
        let value = "Fail";

        if(contrast >= standards[key].AAA) {
            value = "AAA";
        } else if(contrast >= standards[key].AA) {
            value = "AA";
        }

        ui[key].innerText = value;
    });
}

function calculateContrast(color1, color2) {
    return Color(color1).contrast(Color(color2));
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
