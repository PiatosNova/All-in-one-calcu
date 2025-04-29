// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Sidebar Toggle
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
});

// Calculator Functions
class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.displayElement.innerText = this.currentOperand;
    }
}

// Initialize calculator when on calculator page
document.addEventListener('DOMContentLoaded', function() {
    const calculatorDisplay = document.querySelector('.calculator-display');
    if (calculatorDisplay) {
        const calculator = new Calculator(calculatorDisplay);

        document.querySelectorAll('.calculator-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('number')) {
                    calculator.appendNumber(button.innerText);
                } else if (button.classList.contains('operator')) {
                    calculator.chooseOperation(button.innerText);
                } else if (button.classList.contains('equals')) {
                    calculator.compute();
                } else if (button.classList.contains('clear')) {
                    calculator.clear();
                }
            });
        });
    }
});
