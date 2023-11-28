const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    updateDisplay();
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber) {
        calculator.displayNumber = digit;
        calculator.waitingForSecondNumber = false;
    } else {
        calculator.displayNumber =
            calculator.displayNumber === '0' ? digit : calculator.displayNumber + digit;
    }
    updateDisplay();
}

function inverseNumber() {
    if (calculator.displayNumber !== '0') {
        calculator.displayNumber = (-parseFloat(calculator.displayNumber)).toString();
        updateDisplay();
    }
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        if (calculator.firstNumber === null) {
            calculator.firstNumber = calculator.displayNumber;
        } else {
            performCalculation();
        }

        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.displayNumber = '0';
        updateDisplay();
    }
}

function performCalculation() {
    if (calculator.firstNumber !== null && calculator.operator !== null) {
        const secondNumber = calculator.displayNumber;
        let result = 0;

        switch (calculator.operator) {
            case '+':
                result = parseFloat(calculator.firstNumber) + parseFloat(secondNumber);
                break;
            case '-':
                result = parseFloat(calculator.firstNumber) - parseFloat(secondNumber);
                break;
            // Add more cases for other operators if needed

            default:
                alert('Operator tidak valid');
                return;
        }

        calculator.displayNumber = result.toString();
        calculator.operator = null;
        calculator.firstNumber = null;
        calculator.waitingForSecondNumber = false;
        updateDisplay();
    }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('clear')) {
            clearCalculator();
        } else if (target.classList.contains('negative')) {
            inverseNumber();
        } else if (target.classList.contains('equals')) {
            performCalculation();
        } else if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
        } else {
            inputDigit(target.innerText);
        }
    });
}
