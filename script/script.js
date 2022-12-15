// constants and settings
const contentDOM = document.querySelector("#content");
const btnBlackDOM = document.querySelector("#btn-black");
const btnWhiteDOM = document.querySelector("#btn-white");
const btnRainbowDOM = document.querySelector("#btn-rainbow");
const btnClearDOM = document.querySelector("#btn-clear");
const btnColorPickerDOM = document.querySelector("#btn-color-picker");
const sliderDOM = document.querySelector("#slider");
const sliderValueDOM = document.querySelector("#slider-value");
const lofiDOM = document.querySelector("#lofi");
const btnMuteDOM = document.querySelector("#btn-mute");
const RAINBOW = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000", "#00ff80", "#00ffff", "#0080ff", "#8000ff", "#ff0080"];

let isRainbow;
let currentColor = "black";
let mouseDown = false;
let currentSize = 36;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

makeGrids(currentSize, currentSize);

// the div creating part
function makeGrids(rows, cols) {
    contentDOM.style.setProperty("--grid-rows", rows);
    contentDOM.style.setProperty("--grid-cols", cols);
    for (i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        // mouse events -> apparently it doesn't work if these are outside of "for" because of their dynamic structure.
        cell.addEventListener("mousedown", changeColor);
        cell.addEventListener("mouseover", changeColor);
        contentDOM.appendChild(cell).className = "square";
    }
}

// changeColor function
function changeColor(e) {
    if (e.type == "mouseover" && !mouseDown) return;
    else if (e.type == "mouseover" && mouseDown) {
        // rainbow mode mouseover
        if (isRainbow) {
            currentColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
            e.target.style.setProperty("background-color", currentColor);
        }
        // default color mouseover
        else if (!isRainbow) {
            e.target.style.setProperty("background-color", currentColor);
        }
    }

    // soft clear button (changing only background color to default, not deleting all innerHTML)
    btnClearDOM.addEventListener("click", () => {
        e.target.style.setProperty("background-color", "");
    });
}

// changing size function which includes three other functions
function changeSize(value) {
    setCurrentSize(value);
    updateSliderValue(value);
    hardClear();
}

// this function is changing the value of the slider dynamically
function updateSliderValue(value) {
    sliderValueDOM.textContent = `${value} x ${value}`;
}

// hard clear function for after changing size with slider and refreshes the container
function hardClear() {
    containerClear();
    makeGrids(currentSize, currentSize);
}

// for hardClear function
function containerClear() {
    contentDOM.innerHTML = "";
}

// size tweak
function setCurrentSize(num) {
    currentSize = num;
}

// button events
btnBlackDOM.addEventListener("click", () => {
    currentColor = "black";
    isRainbow = false;
});

btnWhiteDOM.addEventListener("click", () => {
    currentColor = "";
    isRainbow = false;
});

btnRainbowDOM.addEventListener("click", () => {
    isRainbow = true;
});

btnColorPickerDOM.addEventListener("input", (e) => {
    currentColor = e.target.value;
    isRainbow = false;
});

// slider events
sliderDOM.onmousemove = (e) => updateSliderValue(e.target.value);
sliderDOM.onchange = (e) => changeSize(e.target.value);

// mute button and background audio settings
contentDOM.addEventListener("click", () => {
    lofiDOM.play();
});

lofiDOM.muted = false;
lofiDOM.volume = 0.4;

btnMuteDOM.addEventListener("click", () => {
    if (lofiDOM.muted == false) {
        lofiDOM.muted = true;
        btnMuteDOM.setAttribute("src", "assets/mute.png");
    } else {
        lofiDOM.muted = false;
        btnMuteDOM.setAttribute("src", "assets/volume.png");
    }
});

// typing effect
let letter = 0;
let animationText = "etch-a-sketch"; /* The text */
let speed = 100; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (letter < animationText.length) {
        document.getElementById("sketch").innerHTML += animationText.charAt(letter);
        letter++;
        setTimeout(typeWriter, speed);
    }
};

typeWriter();
