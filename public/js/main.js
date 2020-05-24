// DOM Elements
const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('length');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');

const randomFunction = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

// Add event listener for on generate button element
generateElement.addEventListener('click', () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    resultElement.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
});

// Copy password to clip board
clipboardElement.addEventListener('click', () => {
    const textareaElement = document.createElement('textarea');
    const password = resultElement.innerText;

    if (!password) {
        document.getElementById('copy-alert').className = 'alert alert-warning';
        document.getElementById('copy-alert').innerText = 'Password is empty. Generate one';
        setTimeout(() => {
            document.getElementById('copy-alert').className = '';
            document.getElementById('copy-alert').innerText = '';
        }, 2000);

        return;
    }

    textareaElement.value = password;
    document.body.appendChild(textareaElement);
    textareaElement.select();
    document.execCommand('copy');
    textareaElement.remove();

    // Success alert messsage display
    document.getElementById('copy-alert').className = 'alert alert-success';
    document.getElementById('copy-alert').innerText = 'Copied to clipboard!';

    // Alert closed after 2 sec 
    setTimeout(() => {
        document.getElementById('copy-alert').className = '';
        document.getElementById('copy-alert').innerText = '';
    }, 2000);
});

// Generate function

// Generate password function
function generatePassword(length, lower, upper, number, symbol) {
    if (length < 4 || length > 20) {
        document.getElementById('copy-alert').className = 'alert alert-warning';
        document.getElementById('copy-alert').innerHTML = '<p>Password length should be between <strong>4-20</strong></p>';
        setTimeout(() => {
            document.getElementById('copy-alert').className = '';
            document.getElementById('copy-alert').innerHTML = '';
        }, 3000);
        return '';
    }

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        document.getElementById('copy-alert').className = 'alert alert-danger';
        document.getElementById('copy-alert').innerText = 'Select any desired checkbox';

        // Alert closed after 2 sec 
        setTimeout(() => {
            document.getElementById('copy-alert').className = '';
            document.getElementById('copy-alert').innerText = '';
        }, 2000);

        return '';
    }

    for (let i = 0; i < length; i++) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunction[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

// Generate random uppercase letter function
function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate random lowercase letter function
function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate random number function
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate random symbols
function getRandomSymbols() {
    const symbols = "!@#$%^&*(){}=<>/~";
    return symbols[Math.floor(Math.random() * symbols.length)];
}