const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");

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
    pastResult: "",
    wipeCurrentOperation: function() {
        operation.numberA = "";
        operation.numberB = "";
        operation.operator = "";
    }
}


function operate(a, b, operator) {
    return operators[operator](a, b);
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
        if (isEmpty(operation.numberA) && isEmpty(operation.pastResult)) {
            console.log("1");
            return;
        }
        else if (!(isEmpty(operation.numberA)) && isEmpty(operation.numberB)) {
            console.log("2");
            operation.operator = e.target.value;
            console.log("triggered");
        }
        else if (!(isEmpty(operation.numberB)) && !(isEmpty(operation.numberA))) {
            console.log("3");
            operation.pastResult = (operate(operation.numberA, operation.numberB, operation.operator));
            operation.wipeCurrentOperation();
        }
        else {
            console.log("4");
        }
    })
})

