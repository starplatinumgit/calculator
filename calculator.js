const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");
const decimalButton = document.querySelector(".decimal-button");
const screenText = document.querySelector(".screen .text");
const allButtons = document.querySelectorAll("button");

const operators = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b, 
    divide: (a, b) => a / b,
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
        if (isEmpty(operation.operator)) {
            operation.numberA += e.target.value;
        }
        else if (!(isEmpty(operation.operator))) {
            operation.numberB += e.target.value;
        }
    })
})

decimalButton.addEventListener('click', () => {
    //the logic for if a decimal is allowed
    const clickDecimal = function(number) {
        if (isEmpty(operation[number])) {
            operation[number] = "0.";
            console.log("EMPTY");
        }
        else {
            if (!(operation[number].includes('.'))) {
                operation[number] += '.';
                console.log("INCLUDES");
            }
            console.log("ELSE");
        }
    }
    //checking to put decimal on first or second number
    if (isEmpty(operation.operator)) {
        clickDecimal("numberA")
    }
    else if (!(isEmpty(operation.operator))) {
        clickDecimal("numberB");
    }
})



operatorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (isEmpty(operation.numberA)) {
            return;
        }
        else if (!(isEmpty(operation.numberA)) && isEmpty(operation.numberB)) {
            operation.operator = e.target.value;
        }
        else if (!(isEmpty(operation.numberB)) && !(isEmpty(operation.numberA))) {
            operation.numberA = (operate(operation.numberA, operation.numberB, operation.operator));
            operation.operator = e.target.value;
        }
    })
})

clearButton.addEventListener('click', () => {
    operation.wipeCurrentOperation();
    operation.numberA = "";
})

equalsButton.addEventListener('click', () => {
    if(!(isEmpty(operation.numberB)) && !(isEmpty(operation.numberA))) {
        operation.numberA = (operate(operation.numberA, operation.numberB, operation.operator));
    }
})

allButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        screenText.textContent = `${operation.numberA} ${operatorToSymbol(operation.operator)} ${operation.numberB}`;
    })
})

const operatorToSymbol = function(op) {
    switch (op) {
        case "":
            break;
        case "add":
            return '+';
        case "subtract":
            return '-';
        case "multiply":
            return '×';
        case "divide":
            return '+';
    }
}