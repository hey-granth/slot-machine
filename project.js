// 1. Deposit some money
// 2. determine a number of lines to bet on
// 3. collect a bet amount
// 4. spin the slot machine
// 5. check if the user won
// 6. if the user won, add the winnings to the balance
// 7. if the user lost, deduct the bet amount from the balance
// 8. ask the user if they want to play again

"use strict";

// prompt is a built-in module in Node.js that allows you to read input from the console.
const prompt = require('prompt-sync')();

const rows = 3;
const columns = 3;

const symbolsCount = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};
const symbolsValues = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

const deposit = () => {
    while (true) {
        const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
        // parseFloat will convert the input to a number
        // parseInt will convert the input to an integer
        if (isNaN(depositAmount) || depositAmount <= 0) {
            // isNaN will check if the input is a number
            console.log("Invalid deposit amount. Please enter a positive number.");
        } else {
            return depositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = parseInt(prompt("Enter the number of lines you wanna bet on (1-3): "));
        if (isNaN(lines) || lines <= 0 || lines > 3) {
            console.log("Invalid number of lines. Please enter a number between 1 and 3.");
        } else {
            return lines;
        }
    }
};

const getBet = (balance, lines) => {
    const bet = parseFloat(prompt("Enter the total bet: "));
    if (isNaN(bet) || bet <= 0 || bet > balance / lines) {
        console.log("Invalid balance.");
    } else {
        return bet;
    }
};

const spin = () => {
    const symbols = [];
    // I used const for symbols even when I'd be appending or deleting the values within the array, because I'd be playing with the values within the array, but not the array itself.
    for (const [symbol, count] of Object.entries(symbolsValues)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
            // push will add the symbol to the array, it is like an append function in python
        }
    }
    const reels = [];
    for (let i = 0; i < columns; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];   // spread operator will create a copy of the symbols array
        // we'll keep adding the symbols to the reels and consequently keep removing them from reelSymbols, rather than removing them from the original array, which is symbols.
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); // it is going to generate a random number between 0 and the length of the reelSymbols array, minus 1
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
            // splice function would remove 1 element from the index `randomIndex` as it is pushed into the reels.
        }
    }
    return reels;
};

const transpose = (reels) => {
    const transposedReels = [];
    for (let i = 0; i < rows; i++) {
        transposedReels.push([]);
        for (let j = 0; j < columns; j++) {
            transposedReels[i].push(reels[j][i]);
            // this will create a new array with the same values as the reels array, but in a different order.
        }
    }
    return transposedReels;
};

const printRows = (transposedReels) => {
    for (const row of transposedReels) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i !== row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (transposedReels, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = transposedReels[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;  // this break statement is going to break out of the for loop if the symbols are not the same.
            }
        }
        if (allSame) {
            winnings += bet * symbolsValues[symbols[0]];
            // this will add the winnings to the total winnings.
        }
    }
    return winnings;
};

// Main function
const game = () => {
    let balance = deposit();
    while (true) {
        console.log(`Your balance is: $${balance}`);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines); // this is the bet per line
        balance -= bet * numberOfLines;
        const reels = spin();
        const transposedReels = transpose(reels);
        printRows(transposedReels);
        const winnings = getWinnings(transposedReels, bet, numberOfLines);
        console.log('You won: $' + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n): ");
        if (playAgain.toLowerCase() !== 'y') {
            console.log("Thanks for playing!");
            break;
        }
    }
}

game();
