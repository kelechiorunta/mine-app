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
        this.addEventListener('click', this.handleClick, false);
    }

    // Lifecycle callback when the element is added to the DOM
    connectedCallback() {
        // alert("Hello there friend")
        this.addEventListener('click', this.handleClick); // Attach event listener to the custom element
    }

    // Lifecycle callback when the element is removed from the DOM
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick); // Clean up event listener
    }

    initialize(name, cells){
        const container = document.createElement('div')
        container.setAttribute('class', 'gridCont')
        container.style.setProperty('background-color', 'white')
        for (let n = 0; n < cells; n++){
            const btn = document.createElement('button')
            btn.setAttribute('class', name)
            btn.setAttribute('id', n+1)
            btn.style.setProperty('min-width', '50px')
            btn.style.setProperty('min-height', '50px');
            container.append(btn);
        }
        const ping = document.createElement('div');
        ping.style.setProperty('width', '40%');
        ping.style.setProperty('height', '10px');
        ping.style.setProperty('background-color', 'green');
        ping.setAttribute('class', 'ping');
        
        container.appendChild(ping);
        this.appendChild(container);
        
    }

    handleClick(event) {
        if (event.target.tagName === 'BUTTON') {
            alert(`You clicked button ${event.target.id}`);
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
myGrid.initialize("cells", 10);
// Create a new instance of the custom element
const mySuperH = document.createElement('h1', { is: 'custom-heading' });
mySuperH.initialize("superH", "MINE COUNT", "pointer"); // Initialize properties

export { mySuperH, myGrid }