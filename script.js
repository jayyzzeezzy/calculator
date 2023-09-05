// maximum digits allowed
const DIGITMAX = 17;

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
let operator = null;
let shouldResetScreen = false;

function operate(a, operator, b) {
    a = Number(a);
    b= Number(b);
    if (operator == "+") return add(a, b);
    if (operator == "-") return subtract(a, b);
    if (operator == "×") return multiply(a, b);
    if (operator == "÷") return divide(a, b);
};

// for click events and only numbers
const numberBtn = document.querySelectorAll('[data-number]');
numberBtn.forEach(
    (button) => button.addEventListener('click', () => appendNumber(button.textContent))
);

const screen = document.querySelector('#screen');

function appendNumber(string) {
    if (screen.textContent.length >= DIGITMAX) return;
    if (screen.textContent === '0'|| shouldResetScreen) {
        resetScreen();
    };
    screen.textContent += string;
};

function resetScreen() {
    screen.textContent = '';
    shouldResetScreen = false;
};

const operatorBtn = document.querySelectorAll('[data-operator]');
operatorBtn.forEach(
    (button) => button.addEventListener('click', () => recordOperation(button.textContent))
);

function recordOperation(sign) {
    if (operator !== null) calculate();
    firstNumb = screen.textContent;
    operator = sign;
    shouldResetScreen = true;
};

const equalBtn = document.querySelector('#equalBtn');
equalBtn.onclick = () => calculate();

function calculate() {
    if (operator === null || shouldResetScreen) return; 
    if (screen.textContent === '0' && operator === '÷') {
        alert("You can't divide by 0!");
        return;
    }
    secondNumb = screen.textContent;
    screen.textContent = roundResult(operate(firstNumb, operator, secondNumb));
    operator = null;
};

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

const allClearBtn = document.querySelector('#allClearBtn');
allClearBtn.onclick = () => clearScreen();

function clearScreen() {
    firstNumb = '';
    operator = null;
    secondNumb = '';
    screen.textContent = 0;
};

const percentBtn = document.querySelector('#percentBtn');
percentBtn.onclick = () => setPercentage(screen.textContent);
function setPercentage(number) {
    screen.textContent = Math.round((number / 100) * 1000) / 1000;
};

const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.onclick = () => deleteNumber();
function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
};

const decimalBtn = document.querySelector('#decimalBtn');
decimalBtn.onclick = () => appendDecimal();
function appendDecimal() {
    if (screen.textContent === '') {
        screen.textContent = '0';
    }
    if (screen.textContent.includes('.')) return
    screen.textContent += '.';
};

window.addEventListener('keydown', handleKeyboardEvents);
function handleKeyboardEvents(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
        recordOperation(convertOperator(e.key));
    }
};

function convertOperator(sign) {
    switch (sign) {
        case '/':
            return '÷';
        case '*':
            return '×';
        case '-':
            return '-';
        case '+':
            return '+';
        default:
            return;
    }
};