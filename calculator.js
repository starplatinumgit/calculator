const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-buttons");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a -b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

const isEmpty = (str) => str.length = 0;

const operation = {
    numberA: "",
    numberB: "",
    operator: "",
    pastResult: "",
}


function operate(a, b, operator) {
    return operator(a, b);
}

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!(operation.operator)) {
            operation.numberA += e.target.value;
        }
    })
})

operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (isEmpty(operation.numberA) || isEmpty(operation.pastResult)) {
            return;
        }
        else if (!(isEmpty(operation.numberB))) {
            operation.pastResult(operate(operation.numberA, operation.numberB, operation.operator));
            
        }
    })
})