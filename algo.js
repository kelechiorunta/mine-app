let newarr = new Set()
const findCells = (arr, n, l) => {
    if (l <= 0) {
        return newarr
    }
    if (n <= 4) {
        
        arr = arr.slice(0, 8)
        let cell = arr[l - 1];
        if (cell - n === 8 || cell - n === 5
            || cell - n === 1 || n - cell === 8 || n - cell === 4 || n - cell === 5
            || n - cell === 1 ){
            // let newVal = total + 1
            if ( n + 3 == 4 ) {
                newarr.add(n)
                newarr.add(n+4)
                newarr.add(n+1)
                newarr.add(cell, n)
            }else if ( n + 1 == 5 ) {
                newarr.add(n)
                newarr.add(n+4)
                newarr.add(n+3)
                newarr.add(n-1)
                newarr.add( n)
            }
            else{
                newarr.add(n)
            newarr.add(n+4)
            newarr.add(n+3)
            newarr.add(n+1)
            newarr.add(cell, n)
            }
            
        }
    } else {
        let cell = arr[l - 1];
        if (cell - n === 8 || cell - n === 4 ||cell - n === 5
            || cell - n === 1 ||cell - n === 3 || n - cell === 8 || n - cell === 4 || n - cell === 5
            || n - cell === 1 ||n - cell === 3){
    
        newarr.add(n)
        newarr.add(cell, n)

    }
}
    // arr.push(total)
    return findCells(arr,n, l-1)
}

const cellnumbers = [1,2,3,4,5,6,7,8,9,10,11,12]
// console.log(findCells(cellnumbers, 5, cellnumbers.length))

const roundup = (n, q) => {
    return Math.trunc(n/q)
}

// console.log(roundup(4, 4))

const columnNo = (n) => {
    let index = roundup(n,3) - 1
    return n - (Math.pow(2, index)+(2*index))//n-((2^index)+(2*index))
}
console.log(columnNo(4))

const findColumnCells = (arr, n) => {
    let newArr = arr.filter(num => columnNo(num) === n)
    // if (n <= 0) {
        newArr[0] = newArr[0] - 1
    // }
    return newArr
}

// console.log(findColumnCells(cellnumbers,1))

const mergeCells = (arr, n) => {
    if (n === 1) {
        let firstArr = [1,5,9];//findColumnCells(arr,n);
        let lastArr = findColumnCells(arr,n+1);
        return firstArr.concat(lastArr)
    }else if (n===2) {
        let firstArr = [1,5,9]//findColumnCells(arr,n-1);
        let middleArr = findColumnCells(arr,n);
        let lastArr = findColumnCells(arr,n+1);
        let result = firstArr.concat(middleArr)
        return result.concat(lastArr)
    }else if (n===3) {
        let firstArr = findColumnCells(arr,n-1);
        let middleArr = findColumnCells(arr,n);
        let lastArr = findColumnCells(arr,n+1);
        return firstArr.concat(middleArr).concat(lastArr, 12)
    }else if (n===4) {
        let firstArr = findColumnCells(arr,n);
        let lastArr = findColumnCells(arr,n-1);
        return firstArr.concat(lastArr, 12)
    }
}

// console.log(mergeCells(cellnumbers,1).sort((a, b) => a-b))

const calculateCell = (n, cols) => {
    const row = Math.floor((n - 1) / cols);
    const col = (n - 1) % cols;
    return [row, col]
}

 console.log(calculateCell(5,4))

export const getSurroundingCells = (n, cols, rows) => {
    const neighbors = [];
    
    // Calculate the row and column of the target cell
    const row = Math.floor((n - 1) / cols);
    const col = (n - 1) % cols;
  
    // Define relative neighbor directions
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1]
    ];
  
    for (const [rowOffset, colOffset] of directions) {
      const newRow = row + rowOffset;
      const newCol = col + colOffset;
    
      // Check if the neighbor is within grid boundaries
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const neighbor = newRow * cols + newCol + 1; // Convert back to cell number
        
        neighbors.push(neighbor);
      }
    }
 
    return neighbors;
  };
  
  // Example Usage
  const cols = 4; // Number of columns
  const rows = 3; // Number of rows
  
  console.log(getSurroundingCells(1, cols, rows)); // Output: [2, 5, 6]
  console.log(getSurroundingCells(6, cols, rows)); // Output: [2, 3, 4, 5, 7, 9, 10, 11]
  console.log(getSurroundingCells(12, cols, rows)); // Output: [7, 8, 11]
  
  
    /**shuffles the array based on this recursive algorithm */
    export const shuffleArr = (arr, n=arr.length) => {
        const shuffled = [...arr];
        if (n <= 0) {
            return shuffled
        } else {
            let id = Math.floor(Math.random() * n);
            
            [shuffled[n-1], shuffled[id]] = [shuffled[id], shuffled[n-1]];

            return [...shuffleArr(shuffled, n-1)]
           
        }
    }

    const nums = [97, 24, 3, 5, 9];
    console.log(shuffleArr(nums, 4))

    const checkValue = (val) => {
        return new Promise((resolve, reject) => {
            if (val > 10) {
                resolve(`Value ${val} is greater than 10`);
            } else {
                reject("Value is not greater than 10");
            }
        });
    };

    const retrieveVal = (resolved) => {
        return resolved
    }

    const myPromise = (val) => {
        return new Promise((resolve, reject) => {

                setTimeout(() => {
                    if (val < 20) {
                        resolve(val + 2);
                    }else{
                        reject("Value is higher than 20")
                    }   
            }, 3000)
            
        })
    }

    const ourPromise = (val) => {
        return myPromise(val) // Resolves myPromise
            .then((firstResult) => {
                return checkValue(firstResult); // Resolves checkValue
            })
            .then((finalResult) => {
                console.log(finalResult); // Logs the final result
            })
            .catch((err) => {
                console.error(err); // Logs any error
            });
    };
    

    const asyncmyPromise = async(val) => {
        try{
            console.log(await ourPromise(val));
        }
       catch(err) {
            console.error(err)
       }
    }

    asyncmyPromise(8)

    const computeNo = (n) => {
        return new Promise((res, rej) => {
            if (n <= 2) {
                res(n + 3) //Add the no by 3
            }else{
                rej("Not a number")//Return an error "Not a number"
            }
        })
    }

    Promise.all([computeNo(1), computeNo(2), computeNo(0)])
    .then(responses => {
        for (const response of responses){
            console.log(`${response} is good. It's a number`)
        }
    })
    .catch(err => console.error(err))

    // const myPromise = (val) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (val < 20) {
    //                 resolve(val + 2);
    //             } else {
    //                 reject("Value is higher than 20");
    //             }
    //         }, 3000);
    //     });
    // };
    
    // const checkValue = (val) => {
    //     return new Promise((resolve, reject) => {
    //         if (val > 10) {
    //             resolve(`Value ${val} is greater than 10`);
    //         } else {
    //             reject("Value is not greater than 10");
    //         }
    //     });
    // };
    
    // const ourPromise = async (val) => {
    //     try {
    //         const firstResult = await myPromise(val); // Resolves myPromise
    //         const finalResult = await checkValue(firstResult); // Resolves checkValue
    //         console.log(finalResult); // Logs the final result
    //     } catch (err) {
    //         console.error(err); // Logs any error
    //     }
    // };
    
    // const asyncmyPromise = async (val) => {
    //     try {
    //         await ourPromise(val); // Calls ourPromise and waits for completion
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    
    // asyncmyPromise(8);
    