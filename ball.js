import { myGrid } from "./custom.js";

let blockContainer = myGrid;//document.querySelector('.gridCont');
let blocks = blockContainer.querySelectorAll('.cells');
let paddle = blockContainer.querySelector('.ping');
let ball = blockContainer.querySelector('.ball');
let gridCont = document.querySelector('.gridCont');
const container = document.querySelector('.container');

var timerId;
let paddleRect;
let blockRect;
let range = document.createRange();
let block_range = document.createRange();
let posX = 0;
let timeoutId;
let pongarr = [];

if (gridCont) {
    console.log(gridCont, gridCont.getBoundingClientRect());
}

let intersectOptions = {
    root: blockContainer,
    margin: '2px',
    threshold: 1
}

let intersectingBlocks = (entries, observer) => {
    entries.forEach(entry => {
        // if (entry.isIntersecting) {
            const btnId = entry.target.id;
            const rect = blockContainer.getGridRects().get(btnId);
            console.log(`Intersecting button: ${btnId}, Bounding Rect:`, rect);
        // }
        
    })
}



let intersectingPaddle = (entries, observer) => {
    
    entries.forEach(entry => {
        // console.log(entry.target);
        observer.observe(entry.target);
        const targetRect = entry.target.getBoundingClientRect();
    //    let timeoutId;
        
        window.addEventListener('keydown', (event) => {
            if (event.key == "ArrowRight" && posX < '230') {
                if (!timerId) {
                    timeoutId = setTimeout(()=>{
                        startGame(ball); clearTimeout(timeoutId)
                    }, 100)
                    // alert("Here")
                    // clearTimeout(timeoutId)
                }
                
                posX += 5
                entry.target.style.setProperty('left', `${posX}px`)
            }
            else if (event.key == "ArrowLeft" && posX > '0') {
                posX -= 5
                entry.target.style.setProperty('left', `${posX}px`)
                
            }
            
                range.setStartBefore(entry.target, 0);
                range.setEndAfter(entry.target, posX);
                paddleRect = range.getBoundingClientRect();
                blocks.forEach(block => {
                    blockObserver.observe(block);
                    // console.log(blocks[0].getBoundingClientRect())
                })
                
        })
    })
}
let intersectingBall = (entries, observer) => {
    entries.forEach(entry => {
        observer.observe(entry.target)
        entry.target.style.setProperty('bottom', '10px');
        
        
        

    })
}

let blockObserver = new IntersectionObserver(intersectingBlocks, intersectOptions);
let paddleObserver = new IntersectionObserver(intersectingPaddle, intersectOptions);
let ballObserver = new IntersectionObserver(intersectingBall, intersectOptions)


blocks.forEach(block => {
    blockObserver.observe(block);
})

paddleObserver.observe(paddle);

ballObserver.observe(ball)

    let goleft;
    let goup = true;
    let xpos = 0;
    let ypos = 0;

let startGame = (target) => {
    timerId = setInterval(() => {
        animateBall(target);  
     }, 100);
}

const getblockRect = (ball, block) => {
    const ballCurrentRect = ball.getBoundingClientRect();
    const currentRect = block.getBoundingClientRect();
    if (ballCurrentRect.x >= currentRect.x - 100 && ballCurrentRect.x <= currentRect.x + 0){
        // goleft = false
        console.log('Current block on left', block.getAttribute('id'))
        return block.getAttribute('id')
    }
    if (ballCurrentRect.y >= currentRect.y + 0 && ballCurrentRect.y <= currentRect.y + 100){
        // goup = false
        console.log('Current block on top', block.getAttribute('id'))
        return block.getAttribute('id')
        
    }

    
}

let animateBall = (ball) => {
    let ballRange = document.createRange();
    ballRange.setStartBefore(ball, 0);
    ballRange.setEndAfter(ball, 50);
    let ballRect = ballRange.getBoundingClientRect();
    

    if (goleft) {
        xpos -= 10;
    }else if (!goleft) {
        xpos += 10;
    }if (!goup) {
        ypos -= 10;
    }else if (goup) {
        ypos += 10
    }

    ball.style.setProperty('left', `${xpos}px`);
    ball.style.setProperty('bottom', `${parseInt(ypos + 10)}px`);
    // console.log(ballRect)

    if (xpos >= 370) {
        goleft = true
    }else if (xpos <= 0) {
        goleft = false
    // }
    // else if (ballRect.y >= paddleRect.y - 40){
    //     goup = true
    }else if (ballRect.y <= 264){
        goup = false
    }

    /** The logic that handels the direction of the ball basec on the 
     * interaction of its boundary client rectangle with each block rectangles
     */
    

    blocks.forEach((block, index) => {
        let id;
        blockObserver.observe(block);
        
        let blockRect = block.getBoundingClientRect();
        
            if ((ballRect.y >= blockRect.y + ballRect.height && ballRect.y <= blockRect.y + 100) &&
            (ballRect.x >= blockRect.x - 10 && ballRect.x <= blockRect.x + 100)){
                goup = false
               
                goleft = goleft//false
                id = block.id - 1//getblockRect(ball, block)
                    
            } else if ((ballRect.y >= blockRect.y + ballRect.height && ballRect.y <= blockRect.y + 100)  &&
            (ballRect.x <= blockRect.x && ballRect.x >= blockRect.x - 50 )){
                goup = false
            
                goleft = true
                id = block.id - 1
                    
            }else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
            (ballRect.x >= blockRect.x - 50 && ballRect.x <= blockRect.x + 100)){
                goup = true
            
                goleft = goleft//true
                id = block.id - 1

                    
            }
            else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
            (ballRect.x >= blockRect.x + 50 && ballRect.x <= blockRect.x + 100) && (!goleft)){
                goup = true
            
                goleft = true
                id = block.id - 1
                    
            }
            else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
            (ballRect.x >= blockRect.x - 50 && ballRect.x <= blockRect.x + 50)){
                goup = true
            
                goleft = false;
                id = block.id - 1
                    
            }
            else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y + 100)  &&
            (ballRect.x >= blockRect.x + 100 && ballRect.x <= blockRect.x + 130 )){
                goup = goup
            
                goleft = false;
                id = block.id - 1
                    
            }

            if (index === id){
                console.log("I am removed", block.id)
                blocks[id].classList.add('remove'); 
                pongarr.push(block.id)
                console.log(pongarr)
                if (pongarr.length == 12 ) {
                    clearInterval(timerId)
                    console.log("Complete")
                }
                // checkPongs(blocks)
            }
        
        })
       

        /**
         * The logic to handle the interaction of the ball's client 
         * rectangle with the paddle's client rectangle
         */

        

        if ((ballRect.x > paddleRect.x - 30 && ballRect.x <= paddleRect.x + paddleRect.width + 30) && (ballRect.y >= (paddleRect.y - paddleRect.height - 30) && ballRect.y <= (paddleRect.y - paddleRect.height))) {
            goup = true
            goleft = goleft
        } 
        else if (ballRect.y > paddleRect.y + paddleRect.height) {//(!(ballRect.x > paddleRect.x - 30 && ballRect.x <= paddleRect.x + paddleRect.width + 30) && (ballRect.y >= (paddleRect.y - paddleRect.height - 30) && ballRect.y >= (paddleRect.y - paddleRect.height))) {
            alert('game over');
            
            myGrid.remove();
            clearInterval(timerId);
            // clearTimeout(timeoutId);
            // timerId = null;

            // Create a new grid instance and initialize it
            const newGrid = document.createElement('grid-cells');
            newGrid.initialize("cells", 12);

            // Replace the old grid with the new one in the container
            container.appendChild(newGrid);

            // Update references to the new grid and its elements
             blockContainer = newGrid;
             blocks = blockContainer.querySelectorAll('.cells');

             paddle = blockContainer.querySelector('.ping');
             ball = blockContainer.querySelector('.ball');
             gridCont = document.querySelector('.gridCont');

            var newtimerId;
            let paddleRect;
            let blockRect;
            let range = document.createRange();
            let block_range = document.createRange();
            posX = 0;
            // let timerId;
            let timeoutId;
            // timeoutId = null;


            if (gridCont) {
                console.log(gridCont, gridCont.getBoundingClientRect());
            }

            intersectOptions = {
                root: blockContainer,
                margin: '2px',
                threshold: 1
            }

            intersectingBlocks = (entries, observer) => {
                entries.forEach(entry => {
                    // if (entry.isIntersecting) {
                        entry.target.classList.remove('remove')
                        const btnId = entry.target.id;
                        const rect = blockContainer.getGridRects().get(btnId);
                        console.log(`Intersecting button: ${btnId}, Bounding Rect:`, rect);
                    // }
                    
                })
            }



            intersectingPaddle = (entries, observer) => {
                
                entries.forEach(entry => {
                    // console.log(entry.target);
                    observer.observe(entry.target);
                    const targetRect = entry.target.getBoundingClientRect();
                //    let timeoutId;
                    
                    window.addEventListener('keydown', (event) => {
                        if (event.key == "ArrowRight" && posX < '230') {
                            if (!newtimerId) {
                                timeoutId = setTimeout(()=>{
                                    // alert("Here");
                                    startnewGame(ball); clearTimeout(timeoutId)
                                }, 100)
                                
                                // clearTimeout(timeoutId)
                            }
                            
                            posX += 5
                            entry.target.style.setProperty('left', `${posX}px`)
                        }
                        else if (event.key == "ArrowLeft" && posX > '0') {
                            posX -= 5
                            entry.target.style.setProperty('left', `${posX}px`)
                            
                        }
                        
                            range.setStartBefore(entry.target, 0);
                            range.setEndAfter(entry.target, posX);
                            paddleRect = range.getBoundingClientRect();
                            blocks.forEach(block => {
                                blockObserver.observe(block);
                                // console.log(blocks[0].getBoundingClientRect())
                            })
                            
                    })
                })
            }
            intersectingBall = (entries, observer) => {
                entries.forEach(entry => {
                    observer.observe(entry.target)
                    entry.target.style.setProperty('bottom', '10px');
                    
                    
                    

                })
            }

            blockObserver = new IntersectionObserver(intersectingBlocks, intersectOptions);
            paddleObserver = new IntersectionObserver(intersectingPaddle, intersectOptions);
            ballObserver = new IntersectionObserver(intersectingBall, intersectOptions)


            blocks.forEach(block => {
                blockObserver.observe(block);
            })

            paddleObserver.observe(paddle);

            ballObserver.observe(ball)

            goleft = goleft;
            goup = true;
            xpos = 0;
            ypos = 0;

            let startnewGame = (target) => {
                newtimerId = setInterval(() => {
                    animatenewBall(target);  
                }, 100);
            }

        
            let animatenewBall = (ball) => {
                ballRange = document.createRange();
                ballRange.setStartBefore(ball, 0);
                ballRange.setEndAfter(ball, 50);
                ballRect = ballRange.getBoundingClientRect();
                

                if (goleft) {
                    xpos -= 10;
                }else if (!goleft) {
                    xpos += 10;
                }if (!goup) {
                    ypos -= 10;
                }else if (goup) {
                    ypos += 10
                }

                ball.style.setProperty('left', `${xpos}px`);
                ball.style.setProperty('bottom', `${parseInt(ypos + 10)}px`);
                // console.log(ballRect)

                if (xpos >= 370) {
                    goleft = true
                }else if (xpos <= 0) {
                    goleft = false
                }
                else if (ballRect.y >= paddleRect.y - 40){
                    goup = true
                }
                else if (ballRect.y <= 264){
                    goup = false
                }

                /** The logic that handels the direction of the ball basec on the 
                 * interaction of its boundary client rectangle with each block rectangles
                 */
                
                blocks.forEach((block, index) => {
                    let id;
                    blockObserver.observe(block);
                    
                    blockRect = block.getBoundingClientRect();
                    
                        if ((ballRect.y >= blockRect.y + ballRect.height && ballRect.y <= blockRect.y + 100) &&
                        (ballRect.x >= blockRect.x - 10 && ballRect.x <= blockRect.x + 100)){
                            goup = false
                        
                            goleft = goleft//false
                            id = block.id - 1//getblockRect(ball, block)
                                
                        } else if ((ballRect.y >= blockRect.y + ballRect.height && ballRect.y <= blockRect.y + 100)  &&
                        (ballRect.x <= blockRect.x && ballRect.x >= blockRect.x - 50 )){
                            goup = false
                        
                            goleft = true
                            id = block.id - 1
                                
                        }else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
                        (ballRect.x >= blockRect.x - 50 && ballRect.x <= blockRect.x + 100)){
                            goup = true
                        
                            goleft = goleft//true
                            id = block.id - 1

                                
                        }
                        else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
                        (ballRect.x >= blockRect.x + 50 && ballRect.x <= blockRect.x + 100) && (!goleft)){
                            goup = true
                        
                            goleft = true
                            id = block.id - 1
                                
                        }
                        else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y)  &&
                        (ballRect.x >= blockRect.x - 50 && ballRect.x <= blockRect.x + 50)){
                            goup = true
                        
                            goleft = false;
                            id = block.id - 1
                                
                        }
                        else if ((ballRect.y >= blockRect.y - 50 && ballRect.y <= blockRect.y + 100)  &&
                        (ballRect.x >= blockRect.x + 100 && ballRect.x <= blockRect.x + 130 )){
                            goup = goup
                        
                            goleft = false;
                            id = block.id - 1
                                
                        }

                        if (index === id){
                            console.log("I am removed",block.id)
                            blocks[id].classList.add('remove'); 
                        }
                    
                    })
                    
                }}
        

}
// console.log(blocks)
// console.log(blocks)