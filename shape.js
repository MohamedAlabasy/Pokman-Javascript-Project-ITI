// export class Shape{
class Shape {
    #color;
    constructor(_color) {
        if (!new.target) {//=> Not important in ES6(Class) but Very important in ES5 (fun)
            throw new Error(`Shape() must be called with new`);
        }
        if (_color == "" || _color == undefined || _color == null || !isNaN(_color))  //mack No object with out parameter
        {
            throw new Error(`You must Enter name of color only`);
        }
        this.#color = _color;
    }
    //getter & setter for color in ES10
    get Color() {
        return this.#color;
    }
    set Color(_colorValue) {
        if (!_colorValue == "" && isNaN(_colorValue)) {//=> !_colorValue == undefined && _colorValue == null ==>Not why?
            this.#color = _colorValue;
        }
        else {
            throw new Error(`You must Enter name of color only`);
        }
    }
}


