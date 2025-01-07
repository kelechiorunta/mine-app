import { myGrid } from "./custom.js";

const blockContainer = myGrid;//document.querySelector('.gridCont');
const blocks = blockContainer.querySelectorAll('.cells');
const paddle = blockContainer.querySelector('.ping');
const gridCont = document.querySelector('.gridCont');

let clientRect;
let blockRect;
const range = document.createRange();
const block_range = document.createRange();

if (gridCont) {
    console.log(gridCont, gridCont.getBoundingClientRect())
}

const intersectOptions = {
    root: myGrid,
    margin: '2px',
    threshold: 0.5
}

const intersectingBlocks = (entries, observer) => {
    entries.forEach(entry => {
        console.log(entry.target, entry.target.getBoundingClientRect());
        observer.observe(entry.target);
        
        block_range.setStartBefore(entry.target, 0);
        block_range.setEndAfter(entry.target, 50);
        blockRect = range.getBoundingClientRect();
        console.log(blockRect)
    })
}

const intersectingPaddle = (entries, observer) => {
    let posX = 0;
    entries.forEach(entry => {
        console.log(entry.target);
        observer.observe(entry.target);
        const targetRect = entry.target.getBoundingClientRect();
       
        
        window.addEventListener('keydown', (event) => {
            if (event.key == "ArrowRight" && posX < '230') {
                posX += 5
                entry.target.style.setProperty('left', `${posX}px`)
            }
            else if (event.key == "ArrowLeft" && posX > '0') {
                posX -= 5
                entry.target.style.setProperty('left', `${posX}px`)
                
            }
                range.setStartBefore(entry.target, 0);
                range.setEndAfter(entry.target, posX);
                clientRect = range.getBoundingClientRect();
                console.log(clientRect, blockRect);
                console.log(entry.target)
        })
    })
}

const blockObserver = new IntersectionObserver(intersectingBlocks, intersectOptions);
const paddleObserver = new IntersectionObserver(intersectingPaddle, intersectOptions);

blocks.forEach(block => {
    blockObserver.observe(block);
})

paddleObserver.observe(paddle)

// console.log(blocks)