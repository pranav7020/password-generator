const Playground = document.getElementById("playground");
const Password = document.getElementById("password");
const PasswordLengthLabel = document.getElementById("passwd-length");
const CopyLabel = document.getElementById("copy");
const LengthInput = document.getElementById("length");
const LowercaseCheck = document.getElementById("lowercase");
const UppercaseCheck = document.getElementById("uppercase");
const NumberCheck = document.getElementById("number");
const SymbolCheck = document.getElementById("symbol");

let length = ("0" + LengthInput.value).slice(-2);
let randomFunctions = [];

function changedPasswordLength() {
    length = ("0" + LengthInput.value).slice(-2);
    PasswordLengthLabel.innerText = length;
    generatePassword();
}

function checkLowercaseState() {
    if (LowercaseCheck.checked) {
        randomFunctions.push(randomLowercase);
        generatePassword();
        return;
    }

    if (randomFunctions.length > 1) {
        randomFunctions = randomFunctions.filter(el => el != randomLowercase);
        generatePassword();
        return;
    }

    LowercaseCheck.checked = true;
}

function checkUppercaseState() {
    if (UppercaseCheck.checked) {
        randomFunctions.push(randomUppercase);
        generatePassword();
        return;
    }

    if (randomFunctions.length > 1) {
        randomFunctions = randomFunctions.filter(el => el != randomUppercase);
        generatePassword();
        return;
    }

    UppercaseCheck.checked = true;
}

function checkNumberState() {
    if (NumberCheck.checked) {
        randomFunctions.push(randomNumber);
        generatePassword();
        return;
    }

    if (randomFunctions.length > 1) {
        randomFunctions = randomFunctions.filter(el => el !== randomNumber);
        generatePassword();
        return;
    }

    NumberCheck.checked = true;
}

function checkSymbolState() {
    if (SymbolCheck.checked) {
        randomFunctions.push(randomSymbol);
        generatePassword();
        return;
    }

    if (randomFunctions.length > 1) {
        randomFunctions = randomFunctions.filter(el => el !== randomSymbol);
        generatePassword();
        return;
    }

    SymbolCheck.checked = true;
}

function copyToClipboard() {
    navigator.clipboard
        .writeText(Password.innerText)
        .then(() => {
            CopyLabel.innerText = "copied!";
            CopyLabel.classList.add('copied');
            setTimeout(() => {
                CopyLabel.innerText = "copy";
                CopyLabel.classList.remove('copied');
            }, 1000);
        })
}

function getRandomFrom(start = 0, end = 9) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

function randomLowercase() {
    // ASCII number for lowercase starts from 97 to 122
    let value = String.fromCharCode(getRandomFrom(97, 122));
    return createSpanElement('char_lower', value);
}

function randomUppercase() {
    // ASCII number for uppercase starts from 65 to 90
    let value = String.fromCharCode(getRandomFrom(65, 90));
    return createSpanElement('char_upper', value);
}

function randomNumber() {
    // ASCII number for numbers starts from 48 to 57
    let value = String.fromCharCode(getRandomFrom(48, 57));
    return createSpanElement('char_number', value);
}

function randomSymbol() {
    let symbols = ['!', '#', '$', '%', '&', '*', '-', '.', '=', '_', '@', '<', '>', '?', ',', ';'];
    let value = symbols[getRandomFrom(0, symbols.length - 1)];
    return createSpanElement('char_symbol', value);
}

function createSpanElement(className, text) {
    return `<span class="${className}">${text}</span>`;
}

function generatePassword() {
    let passwordStr = '';
    for (let i = 0; i < length; i++) {
        let randomIdx = getRandomFrom(0, randomFunctions.length - 1);
        passwordStr = passwordStr + randomFunctions[randomIdx]();
    }

    Password.innerHTML = passwordStr;
}

document.addEventListener('DOMContentLoaded', () => {
    LengthInput.addEventListener("input", changedPasswordLength);
    LowercaseCheck.addEventListener("change", checkLowercaseState);
    UppercaseCheck.addEventListener("change", checkUppercaseState);
    NumberCheck.addEventListener("change", checkNumberState);
    SymbolCheck.addEventListener("change", checkSymbolState);
    Playground.addEventListener("click", copyToClipboard);

    PasswordLengthLabel.innerText = length;
    checkLowercaseState();
    checkUppercaseState();
    checkNumberState();
    checkSymbolState();
    generatePassword();
})