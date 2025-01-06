import { getSurroundingCells, shuffleArr } from "./algo.js";
import { mySuperH, myGrid } from "./custom.js";

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const cells = document.querySelectorAll('.cell');
    const shuffleBtn = document.querySelector('.shuffle');
    const showSafeBtn = document.querySelector('.showSafe');

    showSafeBtn.addEventListener('click', () => {
            // Example of untrusted input
    const userInput = `
    <img src="x" onerror="alert('Hacked!')">
    <p>This is <strong>safe</strong> content.</p>
    `;

    // Use DOMPurify to sanitize the input
    const sanitizedInput = DOMPurify.sanitize(userInput);
    // const sanitizedInput = DOMPurify.sanitize(document.documentElement.innerHTML);

    // Inject sanitized content into the DOM
    document.getElementById('output').innerHTML = sanitizedInput;
    })

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
        cells.forEach((cell, index)=> {
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
                    cells[shuffledCell-1].style.color = "blue"
                }
            
            })

            let originalArr = Array.from(cells, (cell, index) => index + 1);
            let unslicedArr = originalArr.filter((item, index) => {
                return !slicedShuffledCells.includes(item);
            })
                
            console.log(unslicedArr)

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
                        cell.textContent = lengthofCell
                    } 
             })
            })
            
            
    })
    
    // Append the custom element to the DOM
    container.appendChild(myGrid);
    container.insertBefore(mySuperH, shuffleBtn);

    const clear = () => {

        cells.forEach(cell => {
            cell.style.backgroundColor = 'transparent';
            cell.style.Color = 'black';
        })

    }
})