let firstNumb = 0;
let secondNumb = 0;
let operator = null;
let shouldResetScreen = false;
// maximum digits allowed
const DIGITMAX = 17;

const screen = document.querySelector('#screen');
const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const equalBtn = document.querySelector('#equalBtn');
const allClearBtn = document.querySelector('#allClearBtn');
const percentBtn = document.querySelector('#percentBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const decimalBtn = document.querySelector('#decimalBtn');

numberBtn.forEach(
    (button) => button.addEventListener('click', () => appendNumber(button.textContent))
);
operatorBtn.forEach(
    (button) => button.addEventListener('click', () => recordOperation(button.textContent))
);
equalBtn.onclick = () => calculate();
allClearBtn.onclick = () => clearScreen();
percentBtn.onclick = () => setPercentage(screen.textContent);
deleteBtn.onclick = () => deleteNumber();
decimalBtn.onclick = () => appendDecimal();

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

// function declaration
function roundResult(number) {
    return Math.round(number * 1000) / 1000;
};

function setPercentage(number) {
    screen.textContent = Math.round((number / 100) * 1000) / 1000;
};

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
};

function operate(a, operator, b) {
    a = Number(a);
    b= Number(b);
    if (operator == "+") return add(a, b);
    if (operator == "-") return subtract(a, b);
    if (operator == "×") return multiply(a, b);
    if (operator == "÷") return divide(a, b);
};

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

function recordOperation(sign) {
    if (operator !== null) calculate();
    firstNumb = screen.textContent;
    operator = sign;
    shouldResetScreen = true;
};

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

function clearScreen() {
    firstNumb = '';
    operator = null;
    secondNumb = '';
    screen.textContent = 0;
};

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
    };
    if (e.key === 'Shift' && e.key === '+') {
        recordOperation('+');
    };
    if (e.key === 'Shift' && e.key === '*') {
        recordOperation('×');
    };
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