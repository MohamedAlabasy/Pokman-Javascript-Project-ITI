/*
ES5
Class Employee with properties(name,salary,ID)
ID is private with setter and getter.
Override toString to print all employee’s data
*/
//in ES5
let Employee = function (_name, _salary, _iD) {
    this.employeeName = _name;
    this.employeeSalary = _salary;
    var employeeID = _iD;
    this.getID = function () {
        return employeeID;
    }
    this.setID = function (_idValue) {
        employeeID = _idValue;
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// in Es6
// class Employee {
//     employeeName;
//     employeeSalary;
//     #employeeID;
//     constructor(_name, _salary, _iD) {
//         this.employeeName = _name;
//         this.employeeSalary = _salary;
//         this.#employeeID = _iD;
//     }
//     get ID() {
//         return this.#employeeID;
//     }
//     set ID(_idValue) {
//         this.#employeeID = _idValue;
//     }
// }
//////////////////////////////////////////////////////////////////
// let ahmed = new Employee("Ahmed", 3000, 150);
// let mohamed = new Employee("Mohamed", 6000, 250);