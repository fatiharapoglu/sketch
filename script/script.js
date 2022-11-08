
// constants and settings
const contentDOM = document.querySelector("#content");
const btnBlackDOM = document.querySelector("#btnBlack");
const btnWhiteDOM = document.querySelector("#btnWhite");
const btnRainbowDOM = document.querySelector("#btnRainbow");
const btnClearDOM = document.querySelector("#btnClear");
const btnShadowDOM = document.querySelector("#btnShadow")
const RAINBOW = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];

let isRainbow;
let isShadow;
let currentColor = 'black';
let opacity = 0;
let mouseDown = false

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)


// the div creating part
function makeRows(rows, cols) {
    
    contentDOM.style.setProperty('--grid-rows', rows);
    contentDOM.style.setProperty('--grid-cols', cols);
    
    for (i = 0; i < (rows * cols); i++) {

        const cell = document.createElement("div");
        
        // mouse events -> apparently it doesn't work if these are outside of "for" because of their dynamic structure. 
        cell.addEventListener("mousedown", changeColor);
        cell.addEventListener("mouseover", changeColor);

        contentDOM.appendChild(cell).className = "square";

    };
};
  
makeRows(16, 16);


// changeColor function

function changeColor(e) {

    if (e.type == "mouseover" && !mouseDown) 
        return

    else if (e.type == "mouseover" && mouseDown) {
        // rainbow mode mouseover
         if (isRainbow) {

            currentColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
            e.target.style.setProperty('background-color', currentColor);
        
        }
    
        // default color mouseover
        else if (!isRainbow) {
        
            e.target.style.setProperty('background-color', currentColor);
        
        }
    
    }
    
    // clear button eventlistener
    
    btnClearDOM.addEventListener("click", () => {
        
        e.target.style.setProperty('background-color', '')
        
    });

}








// buttons

btnBlackDOM.addEventListener("click", () => {
    
    currentColor = 'black';
    isRainbow = false;
    isShadow = false;

});

btnWhiteDOM.addEventListener("click", () => {
    
    currentColor = '';
    isRainbow = false;
    isShadow = false;

});

btnRainbowDOM.addEventListener("click", () => {
    
    isRainbow = true;
    isShadow = false;

});

btnShadowDOM.addEventListener("click", () => {
    
    isShadow = true;
    currentColor ='black';
    isRainbow = false;

});

