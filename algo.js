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

console.log(mergeCells(cellnumbers,1).sort((a, b) => a-b))
