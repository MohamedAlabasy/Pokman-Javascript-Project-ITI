// import * as ParentClass from "./shape.js";  

class Ball extends Shape {
    #top;   // privet vertical direction 
    #left;   // privet horizontal direction
    #reduce;
    #ballShape;  //The ball that creat from this Class
    #innerRectangle;    //The inner Rectangle that creat inside the ball that created from this Class
    constructor(_reduce, _top, _left, _color) {
        super(_color);   //to chan color to parent  => check of color will be in the parent class
        if (this.check(_reduce, _top, _left)) {  //fun return Boolean value
            throw new Error(`You must Enter ball Location in positive number only`);
        } else {
            this.#top = _top;
            this.#left = _left;
            this.#reduce = _reduce;
            this.createBall();   // to  call this fun in while creating object
            this.moveBall();
        }
    }
    //getter & Setter for vertical direction 
    get Top() {
        return this.#top;
    }
    set Top(_topValue) {
        this.#top = _topValue;
    }
    //getter & Setter for horizontal direction 
    get Left() {
        return this.#left;
    }
    set Left(_leftValue) {
        this.#left = _leftValue;
    }
    createBall() {
        //CSS Style for Main Shape (ball)
        let cssBallStyle = {
            "position": "fixed",
            "border-radius": "50%",
            "width": `${this.#reduce}px`,
            "height": `${this.#reduce}px`,
            "top": `${this.#top}px`,
            "left": `${this.#left}px`,
            "background-color": `${super.Color}`
        }
        //CSS Style for inner Shape(rectangle)
        let cssRectangleStyle = {
            "width": `${this.#reduce / 2}px`,
            "height": `${this.#reduce / 2}px`,
            "background-color": "white",
            "visibility": "hidden"
        }
        //main ball
        this.#ballShape = document.createElement("div");
        for (let i in cssBallStyle) {
            this.#ballShape.style[i] = cssBallStyle[i];
        }
        //shape inside of the main ball which is rectangle
        this.#innerRectangle = document.createElement("div");    //for inner shape that make Pacman
        for (let i in cssRectangleStyle) {
            this.#innerRectangle.style[i] = cssRectangleStyle[i];
        }
        this.#ballShape.append(this.#innerRectangle);
        window.document.body.append(this.#ballShape);
    }
    moveBall() {
        let timeIDReturn;
        window.document.addEventListener("keydown", (event) => {
            let keyName = "";
            let rotateValue = "";
            console.log(event.key);
            switch (event.key) {
                case "ArrowRight":
                    this.stopMove(timeIDReturn);
                    keyName = "ArrowRight";
                    rotateValue = `rotate(135deg)`;
                    this.#ballShape.style.left = `${this.#left += 10}px`;
                    break;
                case "ArrowLeft":
                    this.stopMove(timeIDReturn);
                    keyName = "ArrowLeft";
                    rotateValue = "rotate(315deg)";
                    this.#ballShape.style.left = `${this.#left -= 10}px`;
                    break;
                case "ArrowUp":
                    this.stopMove(timeIDReturn);
                    keyName = "ArrowUp";
                    rotateValue = "rotate(45deg)";
                    this.#ballShape.style.top = `${this.#top -= 10}px`;
                    break;
                case "ArrowDown":
                    this.stopMove(timeIDReturn);
                    keyName = "ArrowDown";
                    rotateValue = "rotate(225deg)";
                    this.#ballShape.style.top = `${this.#top += 10}px`;
                    break;
                case "Escape":
                    this.stopMove(timeIDReturn);
                    this.#innerRectangle.style.visibility = "hidden";
                    break;
            }
            if (!keyName == "" && !rotateValue == "") {
                timeIDReturn = this.startMove(keyName);
                this.#ballShape.style.transform = rotateValue;
                this.#innerRectangle.style.visibility = "visible";
            }
        });
    }
    //for make shape move by creat Interval
    startMove(_ketName) {
        let ketName = _ketName;
        let rotateValue; //undefined at the first of fun the full from switch
        return setInterval(() => {
            switch (ketName) {
                case "ArrowRight":
                    if ((this.#left + this.#reduce) >= window.innerWidth) {
                        this.#left = window.innerWidth - this.#reduce;   //if set value to left from oject (Setter)  or click for long on ArrowRight
                        ketName = "ArrowLeft";
                        rotateValue = "rotate(315deg)"; //to make Pacman change his direction 
                        this.#ballShape.style.left = `${this.#left -= 1}px`;  // - mean move to left 
                    } else {
                        this.#ballShape.style.left = `${this.#left += 1}px`; // + mean move to right 
                    }
                    break;
                case "ArrowLeft":
                    if (this.#left <= 0) {
                        this.#left = 0;
                        ketName = "ArrowRight";
                        rotateValue = `rotate(135deg)`;
                        this.#ballShape.style.left = `${this.#left += 1}px`;
                    } else {
                        this.#ballShape.style.left = `${this.#left -= 1}px`;
                    }
                    break;
                case "ArrowUp":
                    if (this.#top <= 0) {
                        this.#top = 0;
                        ketName = "ArrowDown";
                        rotateValue = "rotate(225deg)";
                        this.#ballShape.style.top = `${this.#top += 1}px`; // + mean move to down 
                    } else {
                        this.#ballShape.style.top = `${this.#top -= 1}px`; // - mean move to up 
                    }
                    break;
                case "ArrowDown":
                    if ((this.#top + this.#reduce) >= window.innerHeight) {
                        this.#top = window.innerHeight - this.#reduce;
                        ketName = "ArrowUp";
                        rotateValue = "rotate(45deg)";
                        this.#ballShape.style.top = `${this.#top -= 1}px`;
                    } else {
                        this.#ballShape.style.top = `${this.#top += 1}px`;
                    }
                    break;
            }
            this.#ballShape.style.transform = rotateValue;
        }, 10);
    }
    //for make shape stop by clear Interval 
    stopMove(_timerID) {
        clearInterval(_timerID);
    }
    //for checking the value pass when creat object 
    check(_reduce, _top, _left) {
        if (_reduce == "" || _reduce == undefined || _reduce == null || _reduce < 0
            || _top == "" || _top == undefined || _top == null || _top <= 0 || typeof _top == 'string'
            || _left == "" || _left == undefined || _left == null || _left <= 0 || typeof _reduce == 'string')
            return true;
        return false;
    }

}
let firstBall = new Ball(50, 100, 100, "black");

