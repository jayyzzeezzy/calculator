// basic calculation logic
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

let firstNumb = 0;
let secondNumb = 0;
let operator = "+";

function operate(a, operator, b) {
    if (operator == "+") return add(a, b);
    if (operator == "-") return subtract(a, b);
    if (operator == "*") return multiply(a, b);
    if (operator == "/") return divide(a, b);
};