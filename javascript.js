let num1 = ''
let num2 = ''
let operator = ''
let result = ''
let error = false
let decimal = false
const ROUND_ERROR = 10000

const displayText = document.querySelector('.display-text')
const buttonCE = document.querySelector('#clear')
const buttonEquals = document.querySelector('#equals')
const buttonDelete = document.querySelector('#delete')
const buttonHistory = document.querySelector('.history')

const buttons = document.querySelectorAll('button')
let numbers = Array.from(buttons).slice(2,13)
let operators = Array.from(buttons).slice(14,18)

numbers.forEach((button) => {
    button.onclick = () => {
        displayText.style.fontSize = "30px"
        error = false
        if (button.textContent === '.' && decimal) {
            //do nothing
        }
        else if (operator === '' && num1.length < 12) {
            if (button.textContent === '.')
                decimal = true
            num1 += button.textContent
            displayText.textContent = num1.toString()
        }
        else if (operator !== '' && num2.length < 12) {
            operators.forEach((button) => button.classList.remove('toggled'))
            if (button.textContent === '.')
                decimal = true
            num2 += button.textContent
            displayText.textContent = num2.toString()
        }
    }
})

//If only 2 operands, stores respective operator. Otherwise, automatically calls equals() function on
//first two operands and stores result in num1
operators.forEach((button) => {
    button.onclick = () => {
        operators.forEach((button) => button.classList.remove('toggled'))
        button.classList.add('toggled')
        decimal = false
        if (!error) {
            if (num2 !== '')
                equals()
            operator = button.textContent
            buttonHistory.textContent = `${num1.toString()} ${operator} `
        }
    }
})

//Clears display and resets all variables
buttonCE.onclick = () => reset()

//Calls respective arithmetic method depending on operator
buttonEquals.onclick = () => {
    displayText.style.fontSize = "30px"
    if (num1 !== '' && num2 !== '' && operator !== '') {
        if (!buttonHistory.textContent.includes('='))
            buttonHistory.textContent += `${num2.toString()} =`
        equals()
    }
}

buttonDelete.onclick = () => {
    if (num2 === '') {
        num1 = num1.slice(0, -1)
        displayText.textContent = num1
    }
    else {
        num2 = num2.slice(0, -1)
        displayText.textContent = num2
    }
}

function equals() {
    operators.forEach((button) => button.classList.remove('toggled'))
    decimal = false
    result = operate(num1, num2)
    if (result.toString().length > 12) {
        reset()
        displayText.textContent = "Overflow Error"
        error = true
        result = ''
    }
    if (!error) {
        displayText.textContent = result.toString()
        num1 = result
        num2 = ''
    }
}

function reset() {
    operators.forEach((button) => button.classList.remove('toggled'))
    decimal = false
    error = false
    displayText.style.fontSize = "30px"
    buttonHistory.textContent = ''
    num1 = ''
    num2 = ''
    operator = ''
    result = ''
    displayText.textContent = '0'
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return Math.round(num1 * num2 * ROUND_ERROR) / ROUND_ERROR
}

function divide(num1, num2) {
    if (num2 === 0) {
        reset()
        displayText.textContent = "Can't divide by zero!"
        displayText.style.fontSize = "20px"
        error = true
        return ''
    }
    else
        return Math.round((num1 / num2) * ROUND_ERROR) / ROUND_ERROR
}

function operate(num1, num2) {
    if (operator === '+')
        return add(+num1, +num2)
    if (operator === '-')
        return subtract(+num1, +num2)
    if (operator === 'x')
        return multiply(+num1, +num2)
    if (operator === '÷')
        return divide(+num1, +num2)
}

