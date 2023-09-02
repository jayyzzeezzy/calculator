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
let operationIsSet = false;

function operate(a, operator, b) {
    if (operator == "+") return add(a, b);
    if (operator == "-") return subtract(a, b);
    if (operator == "*") return multiply(a, b);
    if (operator == "/") return divide(a, b);
};

// for click events and only numbers
const numberBtn = document.querySelectorAll('[data-number]');
numberBtn.forEach(
    (button) => button.addEventListener('click', () => appendNumber(button.textContent))
);

const screen = document.querySelector('#screen');

function appendNumber(string) {
    if (screen.textContent === '0'|| operationIsSet) {
        operationIsSet = false;
        resetScreen();
    };
    screen.textContent += string;
};

function resetScreen() {
    screen.textContent = '';
};

const operatorBtn = document.querySelectorAll('[data-operator]');
operatorBtn.forEach(
    (button) => button.addEventListener('click', () => setOperation(screen.textContent, button.textContent))
);

function setOperation(number, operator) {
    firstNumb = number;
    operator = operator;
    operationIsSet = true;
};