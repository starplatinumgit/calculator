const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");


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
    a = parseInt(a);
    b = parseInt(b);
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
        else {
            console.log("error!");
        }
    })
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