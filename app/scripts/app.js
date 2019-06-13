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

    shareLink: document.getElementById('js-share-link'),
}

const standards = {
    smallText: [
        {
            minimum: 7,
            score: "AAA",
            details: `
                This contrast ratio meets the highest level of contrast 
                requirements for small text outlined by the WCAG.
            `
        },
        {
            minimum: 4.5,
            score: "AA",
            details: `
                This contrast ratio meets the minimum requirements for 
                small text. To meet the more stringent AAA requirements you need
                a contrast ratio of 7 or above.
            `
        },
        {
            minimum: 0,
            score: "Fail",
            details: `
                This contrast ratio fails to meet the minimum contrast ratios 
                for small text. To meet the more minimum AA requirements you
                need a contrast ratio of 4.5 or above.
            `
        },
    ],
    largeText: [
        {
            minimum: 4.5,
            score: "AAA",
            details: `
                This contrast ratio meets the highest level of contrast 
                requirements for large text outlined by the WCAG.
            `
        },
        {
            minimum: 3,
            score: "AA",
            details: `
                This contrast ratio meets the minimum requirements for 
                large text. To meet the more stringent AAA requirements you need
                a contrast ratio of 4.5 or above.
            `
        },
        {
            minimum: 0,
            score: "Fail",
            details: `
                This contrast ratio fails to meet the minimum contrast ratios 
                for large text. To meet the more minimum AA requirements you
                need a contrast ratio of 3 or above.
            `
        },
    ]
};

const state = {
    foregroundColor: ui.foregroundInput.value,
    backgroundColor: ui.backgroundInput.value,
    contrast: calculateContrast(ui.foregroundInput.value, ui.backgroundInput.value)
};

const shareLinkBase = 'fakeurl.com';

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
    updateShareLink();
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

    // TODO: This logic and naming could be improved.
    Object.keys(standards).forEach(key => {
        let value = "";

        var textSize = standards[key];

        for(let i = 0; i < textSize.length; i++) {
            if(contrast >= textSize[i].minimum) {
                value = `<b>${textSize[i].score}</b> — ${textSize[i].details}`;
                break;
            }
        }

        ui[key].innerHTML = value;
    });
}

function updateShareLink() {
    const shareLinkText = `${shareLinkBase}?fg=${state.foregroundColor}&bg=${state.backgroundColor}`;

    ui.shareLink.value = shareLinkText;
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
