
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


// the div creating part

function makeRows(rows, cols) {
    
    contentDOM.style.setProperty('--grid-rows', rows);
    contentDOM.style.setProperty('--grid-cols', cols);
    
    for (i = 0; i < (rows * cols); i++) {

        let cell = document.createElement("div");
        contentDOM.appendChild(cell).className = "square";
        
        // mouseover event -> apparently it doesn't work if these are outside because of their dynamic structure. 

        cell.addEventListener("mouseenter", () => {
    
            // rainbow mode mouseover
            
            if (isRainbow) {

                currentColor = RAINBOW[Math.floor(Math.random() * RAINBOW.length)];
                cell.style.setProperty('background-color', currentColor);


            }

            // default color mouseover

            else if (!isRainbow) {

                cell.style.setProperty('background-color', currentColor);

            }
            

            // shadow mode


            if (isShadow) {

                if (opacity < 1) {

                    cell.setAttribute('style' , `background-color: black; opacity: ${opacity}`);
                    opacity = opacity + 0.1
                }

            }
            

            // clear button eventlistener

            btnClearDOM.addEventListener("click", () => {
    
                cell.style.setProperty('background-color', 'white')
            
            });
          
        });

    };
};
  
makeRows(16, 16);


// buttons

btnBlackDOM.addEventListener("click", () => {
    
    currentColor = 'black';
    isRainbow = false;
    isShadow = false;

});

btnWhiteDOM.addEventListener("click", () => {
    
    currentColor = 'white';
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

