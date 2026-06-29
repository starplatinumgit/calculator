const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");
const decimalButton = document.querySelector(".decimal-button");
const backspaceButton = document.querySelector(".backspace-button");
const screenText = document.querySelector(".screen .text");
const allButtons = document.querySelectorAll("button");


const operators = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b, 
    divide: (a, b) => (b === 0) ? NaN : (a / b),
}

const isEmpty = (str) => str.length === 0;

const operation = {
    numberA: "",
    numberB: "",
    operator: "",
    
    wipeCurrentOperation: function() {
        operation.numberB = "";
        operation.operator = "";
    }
}

function operate(a, b, operator) {
    operation.wipeCurrentOperation();
    a = parseFloat(a);
    b = parseFloat(b);
    return `${operators[operator](a, b)}`;
}

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleNumberInput(e.target.value);
    })
})

const handleNumberInput = function(e) {
    console.log(e);
    if (isEmpty(operation.operator)) {
            operation.numberA += e;
                console.log("hi");

        }
    else if (!(isEmpty(operation.operator))) {
        operation.numberB += e;
            console.log("hi2");

    }
    
}

document.addEventListener('keydown', (e) => {
    if (keyActions[e.key]) {
        keyActions[e.key]();
        printScreenPlaySound();
    }
})

const keyActions = {
    0: () => handleNumberInput("0"),
    1: () => handleNumberInput("1"),
    2: () => handleNumberInput("2"),
    3: () => handleNumberInput("3"),
    4: () => handleNumberInput("4"),
    5: () => handleNumberInput("5"),
    6: () => handleNumberInput("6"),
    7: () => handleNumberInput("7"),
    8: () => handleNumberInput("8"),
    9: () => handleNumberInput("9"),
    '.': () => handleDecimalInput(),
    '+': () => handleOperatorInput('add'),
    '-': () => handleOperatorInput('subtract'),
    '*': () => handleOperatorInput('multiply'),
    'x': () => handleOperatorInput('multiply'),
    '/': () => handleOperatorInput('divide'),
    'Backspace': () => handleBackspaceInput(),
}

decimalButton.addEventListener('click', () => {
    handleDecimalInput();
})

const handleDecimalInput = function() {
    //the logic for if a decimal is allowed
    const clickDecimal = function(number) {
        if (isEmpty(operation[number])) {
            operation[number] = "0.";
        }
        else {
            if (!(operation[number].includes('.'))) {
                operation[number] += '.';
            }
        }
    }
    //checking to put decimal on first or second number
    if (isEmpty(operation.operator)) {
        clickDecimal("numberA")
    }
    else if (!(isEmpty(operation.operator))) {
        clickDecimal("numberB");
    }
}



operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        handleOperatorInput(e.target.value);
    })
})

const handleOperatorInput = function(e) {
    if (isEmpty(operation.numberA)) {
        return;
    }
    else if (!(isEmpty(operation.numberA)) && isEmpty(operation.numberB)) {
        operation.operator = e;
    }
    else if (!(isEmpty(operation.numberB)) && !(isEmpty(operation.numberA))) {
        operation.numberA = (operate(operation.numberA, operation.numberB, operation.operator));
        operation.operator = e;
    }
}

clearButton.addEventListener('click', () => {
    operation.wipeCurrentOperation();
    operation.numberA = "";
})

equalsButton.addEventListener('click', () => {
    if(!(isEmpty(operation.numberB)) && !(isEmpty(operation.numberA))) {
        operation.numberA = (operate(operation.numberA, operation.numberB, operation.operator));
    }
})

backspaceButton.addEventListener('click', () => {
    handleBackspaceInput();
}) 

const handleBackspaceInput = function() {
    if (isEmpty(operation.numberA)) {
            return;
        }
    else if (!(isEmpty(operation.operator)) && isEmpty(operation.numberB)) {
        operation.operator = "";
    }
    else if (!(isEmpty(operation.numberA)) && isEmpty(operation.numberB)) {
        operation.numberA = operation.numberA.slice(0, -1);
        }
    else if (!(isEmpty(operation.numberB))) {
        operation.numberB = operation.numberB.slice(0, -1);
    }
}


const playClickSound = function() {
    const clickSound = new Audio('audio/clickSound.mp3');
    clickSound.play();
}

allButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        printScreenPlaySound();
    })
})

const printScreenPlaySound = function() {
    playClickSound();
    screenText.textContent = `${operation.numberA}${operatorToSymbol(operation.operator)}${operation.numberB}`;
}

const operatorToSymbol = function(op) {
    switch (op) {
        case "":
            return "";
        case "add":
            return '+';
        case "subtract":
            return '-';
        case "multiply":
            return '×';
        case "divide":
            return '÷'
    }
}