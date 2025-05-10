# Slot Machine Game

A simple command-line slot machine game built with Node.js.

## Description

This application simulates a slot machine where users can:
- Deposit money
- Choose the number of lines to bet on (1-3)
- Place bets
- Spin the slot machine
- Win based on matching symbols
---
## Features

- Interactive command-line interface
- Configurable betting options
- Random symbol generation
- Win calculation based on matched symbols
- Balance tracking
---
## Symbol Values

| Symbol | Value Multiplier |
|--------|------------------|
| A      | 5x               |
| B      | 4x               |
| C      | 3x               |
| D      | 2x               |
---
## Getting Started

### Prerequisites

- Node.js installed on your system

### Installation

1. Clone this repository or download the source code
2. Install dependencies:
   ```
   npm install prompt-sync
   ```

### Running the Game

Execute the following command in your terminal:
```
node project.js
```
---
## How to Play

1. Enter a deposit amount when prompted
2. Choose the number of lines to bet on (1-3)
3. Enter your bet amount
4. The slot machine will spin automatically
5. If you win, your winnings will be added to your balance
6. Choose whether to play again or exit
---
## Game Rules

- You win if you get matching symbols on a line you bet on
- The payout is determined by the symbol value multiplied by your bet
- The game ends when you run out of money or choose to exit
---
## Authored and Maintained by
[Granth Agarwal](https://www.github.com/hey-granth/)

---