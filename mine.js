import { getSurroundingCells, shuffleArr } from "./algo.js";
import { mySuperH, createGrid, createCells } from "./custom.js";
import './ball.js'

document.addEventListener('DOMContentLoaded', async() => {
    const container = document.querySelector('.container');
    const gridContainer = document.querySelector('.grid_container')
    const cells = gridContainer.querySelectorAll('div .cell');
    const board = container.querySelector('.board');
    const shuffleBtn = board.querySelector('.shuffle');
    const resultBrd = board.querySelector('.result_board');
    // const showSafeBtn = document.querySelector('.showSafe');
    const checkResult = resultBrd.querySelector('.check_result');
    const answerResult = resultBrd.querySelector('.answer');
    const navCont = document.querySelector('.tab-menu')
    const gameOne = document.querySelector('.game-one');
    const gameTwo = document.querySelector('.game-two');
    const gameThree = document.querySelector('.game-three');

    let gameSection = createCells(12)
    // const gameSection = document.querySelector('.game_section')
    let arr = [];
    let arr_result = [];
    // container.append(myGrid);
    navCont.append(mySuperH)
    let myGrid;
    let fragment = new DocumentFragment();
    let section = document.createElement('section');
    // container.insertBefore(mySuperH, board);

    gameOne.addEventListener('click', () => {
        document.querySelector('.superH').textContent = 'MINE COUNT'
        document.querySelector('.superH').style.setProperty('text-transform', 'uppercase')
        document.querySelector('.superH').style.setProperty('font-weight', 'bold')
        document.querySelector('.superH').style.setProperty('text-align', 'center')
        myGrid.remove();
        gameSection.remove();
        container.append(board, gridContainer)
    })
    
    gameTwo.addEventListener('click', async() => {
        // board.remove();
        document.querySelector('.superH').textContent = 'MY GRID'
        gridContainer.remove();
        gameSection.remove();
        await import('./ball.js').then((file) => {console.log(file.default); container.append(file.default); myGrid = file.default})
    })

    gameThree.addEventListener('click', () => {
        document.querySelector('.superH').textContent = 'GAME CELL'
        gridContainer.remove();
        // section.remove();
        if (myGrid) {
            myGrid.remove();
        }

        /**
         * FOR LEARNING PURPOSES. DO NOT REMOVE.
         * The object fragment is created from the class new DocumentFragment()
         * Also created from document.createFragment(). A fragment to nest elements but itself
         * does not have style or class attributes
         * 
         * The document.createRange creates a range object to set a boundary to abstract or extract nodes from 
         * one node child (either a text or element node) to another using the setStart and setEnd APIs. To reproduce or clone
         * the abstracted nodes we use range object function cloneContents().
         */
        // if (!section && section.length <= 0) {
            // const heading = document.createElement('h1');
            // const para = document.createElement('p');
            // heading.setAttribute('class', 'three')
            // heading.textContent = "Game Three";
            // para.textContent = "This is game three"
            // const newCells = document.createElement('grid-cells')
            // newCells.initialize("gamecells", 5)

            // const range = document.createRange();
            // const startElem = container.querySelectorAll('h1')[0].childNodes[0]
            // range.setStart(startElem,0);
            // range.setEnd(startElem, startElem.length);
            // const threeRange = range.cloneContents();
            
            //.setAttribute('class', 'fragment') //Has no class attribute. Cannot style it.
            //fragment.append(heading, para, newCells);
            //section.append(fragment)
            container.append(gameSection);
        // }
        

        
        // container.append(threeRange)
    })

    // showSafeBtn.addEventListener('click', () => {
    // // Example of untrusted input
    // const userInput = `
    // <img src="x" onerror="alert('Hacked!')">
    // <p>This is <strong>safe</strong> content.</p>
    // `;

    // // Use DOMPurify to sanitize the input
    // const sanitizedInput = DOMPurify.sanitize(userInput);
    // // const sanitizedInput = DOMPurify.sanitize(document.documentElement.innerHTML);

    // // Inject sanitized content into the DOM
    // document.getElementById('output').innerHTML = sanitizedInput;
    // })

    cells.forEach((cell, _) => {
        
        cell.addEventListener('click', () => {
            
            const filteredSurrondingCells = getSurroundingCells(parseInt(cell.textContent), 4, 3);
            console.log(filteredSurrondingCells)

            if (filteredSurrondingCells) {
                clear();
                filteredSurrondingCells.forEach((val,ind) => {
                    
                    cells[val-1].style.backgroundColor = 'none';
                    cells[val-1].style.Color = 'black';
                    cells[val-1].style.backgroundColor = 'rgba(0,0,0,0.3)';
                    cells[val-1].style.Color = 'white';
                   
                })
            }
            
        })
    })

    
    shuffleBtn.addEventListener('click', () => {
        let newArray = [];
        arr = [];
        arr_result = [];
        document.querySelector('.answer').textContent = getResult().toString();
        cells.forEach((cell, index)=> {
            cell.removeAttribute('cellLength')
            cell.textContent = ""
            cell.style.color = "white"
            cell.textContent =  index + 1
            newArray.push(parseInt(cell.textContent))
        })
        const shuffledCells = shuffleArr(newArray);
            
            const randomPos = Math.floor(Math.random() * shuffledCells.length) ;
            const slicedShuffledCells = shuffledCells.slice(0,randomPos-4)
            slicedShuffledCells.forEach((shuffledCell, index) => {
                
                if (cells[shuffledCell-1]) {
                    cells[shuffledCell-1].textContent = "∆"
                    cells[shuffledCell-1].style.color = "none"
                    cells[shuffledCell-1].style.color = "white"
                    cells[shuffledCell-1].style.setProperty('-webkit-text-stroke-color', 'blue');
                    cells[shuffledCell-1].style.setProperty('-webkit-text-stroke-width', '5px');
                }
            
            })

            let originalArr = Array.from(cells, (cell, index) => index + 1);
            let unslicedArr = originalArr.filter((item, index) => {
                return !slicedShuffledCells.includes(item);
            })
                
            console.log(unslicedArr);

            //The array result
            // let arr_result = [];

            unslicedArr.forEach((value, indx) => {
                const filteredSurrondingCells = getSurroundingCells(parseInt(value), 4, 3);
                const filteredCells = filteredSurrondingCells.filter(item => {
                    return !unslicedArr.includes(item)
                })
                const lengthofCell = filteredCells.length;
                if (lengthofCell <= 0) return 
                else
                console.log(value, lengthofCell)
                // cells[value - 1].textContent = lengthofCell
                cells.forEach((cell, index) => {
                    if (cell.textContent==value && cell.textContent != filteredCells[index]) {
                        cell.textContent = ""//lengthofCell
                        cell.setAttribute('cellLength', lengthofCell)
                        arr_result.push(lengthofCell)
                    } 
                    else if (cell.textContent==value && cell.textContent != unslicedArr[index]){
                        cell.textContent = "H"
                    }
             })
            })

            console.log(arr_result)
        
    })

    
            cells.forEach((cell, indx) => 
                cell.addEventListener('click', () => {
                console.log(indx)
               
                    if (cell.getAttribute('cellLength') > 0 && indx==cell.id-1) {
                        
                        cell.style.setProperty('color', 'green')
                        if (cell.textContent == "") {
                            cell.textContent =  enterTheResult(cell)
                            arr.push(parseInt(cell.textContent))
                        }else if (cell.textContent !== ''){
                            const findResultIndex = arr.findIndex((result, ind) => result == parseInt(cell.textContent));
                            console.log(findResultIndex);
                            arr[findResultIndex] = parseInt(enterTheResult(cell));
                            cell.textContent = arr[findResultIndex]
                        }
                        //cell.getAttribute('cellLength');
                        
                        
                    }
                console.log(arr)
            })
        )


        checkResult.addEventListener('click', () => {
            answerResult.textContent = getResult().toString();
            if (answerResult.textContent==="Correct!"){
                answerResult.style.setProperty('color', 'green')
            }else{
                answerResult.style.setProperty('color', 'red')
            }
        })

        const getResult = () => {
            console.log(arr, arr_result)
            if (arr_result && arr_result.length > 0 && arr && arr.length > 0) {
                const isEqual = arr_result.every((val, index, array) => arr.includes(val) )
                if (isEqual) {
                    return "Correct!"
                }else{
                    return "Wrong!"
                }
            } return ""
            
        }
    
    // Append the custom element to the DOM
    
    const enterTheResult = (cell) => {
        console.log(cell)
        
        if (cell) {
            // Ensure cell is visible and on top
            cell.style.setProperty('display', 'block')
            cell.style.setProperty('z-index', '10');
            return prompt("Enter the answer", "" )
        }
        
    }

    const clear = () => {

        cells.forEach(cell => {
            cell.style.backgroundColor = 'transparent';
            cell.style.Color = 'black';
        })

    }
    const registerWorker = async(scriptUrl) => {

        if ("serviceWorker" in navigator) {
            try{
                const registration = await navigator.serviceWorker.register(scriptUrl, {scope: './'});
                if (registration.installing) {
                    console.log("Registered successfully", registration)
                }else if (registration.waiting) {
                    console.log("Registered worker is waiting.")
                    await registration.sync.register("sync-messages");
                }else if (registration.active) {
                    console.log('Registered Service worker is active');
                }
            }
            catch(err){
                console.log(err.message);
                throw new Error(err.message);
            }
        }
    }

    const syncMessagesLater = async() => {
            const registration = await navigator.serviceWorker.ready;
                try{
                    await registration.sync.register("sync-messages");
                    // console.log("Sync success")
               } catch {
                 console.log("Background Sync could not be registered!");
               }    
    }

    await registerWorker('./webWorker.js')
    await syncMessagesLater();

})

//SVG ANIMATION with the offset value

const pathElement = document.querySelector(".shape-fill");

  // Calculate the total length of the path
  const pathLength = pathElement.getTotalLength();

  // Set stroke-dasharray and stroke-dashoffset for animation
  pathElement.style.strokeDasharray = pathLength;
  pathElement.style.strokeDashoffset = pathLength;
  pathElement.style.opacity = 0.51;
  pathElement.style.transition = "all 1s linear";
let n= 110;
let timeOut;
  // Start animation after setting properties
timeOut = setInterval(() => {
    if (n < 110) {
        pathElement.style.fill = 'white'
        
        clearInterval(timeOut);
    } n--
    console.log(n)
    pathElement.style.strokeDashoffset = 0;
    // Animate the stroke along the path
    // if (pathLength >= 200) 
}, 3000);

//Initiating serviceWorker

