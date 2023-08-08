let num1 = ''
let num2 = ''
let operator = ''
let result = ''
let error = false
let decimal = false

const displayText = document.querySelector('.display-text')
const buttonCE = document.querySelector('#clear')
const buttonEquals = document.querySelector('#equals')
const buttonDelete = document.querySelector('#delete')

const buttons = document.querySelectorAll('button')
console.log(buttons)
let numbers = Array.from(buttons).slice(2,13)
let operators = Array.from(buttons).slice(14,18)

numbers.forEach((button) => {
    button.onclick = () => {
        displayText.style.fontSize = "30px"
        error = false
        if (button.textContent === '.' && decimal) {
            //do nothing
        }
        else if (operator === '' ) {
            if (button.textContent === '.')
                decimal = true
            num1 += button.textContent
            displayText.textContent = num1.toString()
        }
        else {
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
        decimal = false
        if (!error) {
            if (num2 !== '')
                equals()
            operator = button.textContent
        }
    }
})

//Clears display and resets all variables
buttonCE.onclick = () => reset()

//Calls respective arithmetic method depending on operator
buttonEquals.onclick = () => {
    displayText.style.fontSize = "30px"
    if (num1 !== '' && num2 !== '' && operator !== '') {
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
    decimal = false
    result = operate(num1, num2)
    console.log(`num1: ${num1} num2: ${num2} operator: ${operator} result: ${result}`)
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
    decimal = false
    error = false
    displayText.style.fontSize = "30px"
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
    return num1 * num2
}

function divide(num1, num2) {
    if (num2 === 0) {
        reset()
        displayText.textContent = "Can't divide by zero!"
        displayText.style.fontSize = "22px"
        error = true
        return ''
    }
    else
        return Math.round((num1 / num2) * 10**5) / 10**5
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

