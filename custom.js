//For creating custom Elements

class MyH extends HTMLHeadingElement {
    constructor() {
        super(); // Call parent constructor
        this.handleClick = this.handleClick.bind(this); // Bind `this` to the method
        this.addEventListener('click', this.handleClick); // Attach event listener
        
    }

    // Custom method to initialize properties after creation
    initialize(name, text, pointer) {
        this.setAttribute('class', name); // Store the name property
        this.textContent = text; // Set the text content of the element
        this.style.cursor = pointer;
        this.style.color = 'black';
        this.style.fontWeight = '600';
    }

    handleClick() {
        alert(`Hello, ${this.className}`); // Alert using the `name` property
    }
}

class GridCells extends HTMLElement{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
        this.gridRects = new Map(); // Store grid rects here
        
    }

    // Lifecycle callback when the element is added to the DOM
    connectedCallback() {
        // alert("Hello there friend")
        this.addEventListener('click', this.handleClick); // Attach event listener to the custom element
        this.calculateGridRects();
        this.getGridRects();
    }

    // Lifecycle callback when the element is removed from the DOM
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick); // Clean up event listener
    }

    initialize(name, cells){
        const container = document.createElement('div')
        container.setAttribute('class', 'gridCont')
        container.style.setProperty('background-color', 'white')
        container.style.setProperty('position', 'relative')
        const range = document.createRange();
        this.appendChild(container);
        for (let n = 0; n < cells; n++){
            const btn = document.createElement('button');
           
            btn.setAttribute('class', name)
            btn.setAttribute('id', n+1)
            btn.style.setProperty('min-width', '50px')
            btn.style.setProperty('min-height', '50px');
            
            container.append(btn);

            // range.setStartBefore(btn, 0);
            // range.setEndAfter(btn, 50);
            // const btnRect = range.getBoundingClientRect();
            // // // Store bounding rect in the Map with button ID as key
            // this.gridRects.set(`${btn.getAttribute('id')}}`, btnRect);
            // // // console.log(btnRect)
        }
        const ping = document.createElement('div');
        ping.style.setProperty('width', '40%');
        ping.style.setProperty('height', '10px');
        ping.style.setProperty('background-color', 'green');
        ping.setAttribute('class', 'ping');

        const ball = document.createElement('div');
        ball.style.setProperty('width', '30px');
        ball.style.setProperty('height', '30px');
        ball.style.setProperty('border-radius', '100%');
        ball.style.setProperty('background-color', 'red');
        ball.style.setProperty('bottom', '100px')
        ball.setAttribute('class', 'ball');
        
        container.appendChild(ball);
        container.appendChild(ping);

        // console.log(this.gridRects);
    }

    calculateGridRects() {
        // Use requestAnimationFrame to ensure layout updates
        requestAnimationFrame(() => {
            const buttons = this.querySelectorAll('button');
            buttons.forEach((btn) => {
                const range = document.createRange();
                range.setStartBefore(btn, 0);
                range.setEndAfter(btn, 30);
                const rect = range.getBoundingClientRect();
                this.gridRects.set(btn.id, rect);
            });
            console.log('Updated gridRects:', this.gridRects);
        });
    }

    getGridRects() {
        return this.gridRects;
    }

    handleClick(event) {
        if (event.target.tagName === 'BUTTON') {
            const buttonRect = event.target.getBoundingClientRect();
            alert(`You clicked button ${event.target.id} with x: ${buttonRect.x} and y: ${buttonRect.y}`);
        } else if (event.target.classList.contains('gridCont')) {
            alert("The grid space is here");
        }
    }    
}
// Define the custom grid element
customElements.define('grid-cells', GridCells)
// Define the custom heading element
customElements.define('custom-heading', MyH, { extends: 'h1' });

const myGrid = document.createElement('grid-cells')
myGrid.initialize("cells", 12);

// After layout update, calculate boundingClientRect
// const buttons = myGrid.querySelectorAll('button');
// buttons.forEach((btn) => {
//     // const btnRect = btn.getBoundingClientRect();

//     // range.setStartBefore(btn, 0);
//     // range.setEndAfter(btn, 50);
//     const btnRect = btn.getBoundingClientRect();
//     console.log(btn,btnRect)
//     // Store bounding rect in the Map with button ID as key
//     // this.gridRects.set(`btn-${n + 1}`, btnRect);
//     // this.gridRects.set(btn.id, btnRect);
// });

// console.log(this.gridRects); // Verify the stored rects

// Create a new instance of the custom element
const mySuperH = document.createElement('h1', { is: 'custom-heading' });
mySuperH.initialize("superH", "MINE COUNT", "pointer"); // Initialize properties

export { mySuperH, myGrid }