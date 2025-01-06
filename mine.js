import { getSurroundingCells, shuffleArr } from "./algo.js";

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const shuffleBtn = document.querySelector('.shuffle');

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
            console.log(shuffledCells)
            const randomPos = Math.floor(Math.random() * shuffledCells.length) ;
            shuffledCells.slice(0,randomPos-1).forEach((shuffledCell, index) => {
                
                if (cells[shuffledCell]) {
                    cells[shuffledCell].textContent = "√"
                     cells[shuffledCell].style.color = "none"
                    cells[shuffledCell].style.color = "blue"
                }
    
            })
            
    })

    const clear = () => {

        cells.forEach(cell => {
            cell.style.backgroundColor = 'transparent';
            cell.style.Color = 'black';
        })

    }
})