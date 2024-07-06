let balance = 1000000;
let difficulty = 'easy';
let betAmount = 10;
let rows = 10;

function updateBalance() {
    document.getElementById('balance').innerText = balance.toLocaleString();
}

function setDifficulty(level) {
    difficulty = level;
    console.log(`Difficulty set to ${level}`);
}

function adjustBet(action) {
    if (action === 'half') {
        betAmount = Math.max(1, Math.floor(betAmount / 2));
    } else if (action === 'double') {
        betAmount *= 2;
    } else if (action === 'max') {
        betAmount = balance;
    }
    document.getElementById('bet-amount').value = betAmount;
}

function setRows(rowCount) {
    rows = rowCount;
    console.log(`Rows set to ${rows}`);
}

function startNewGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    generatePlinkoBoard();
    generateSlots();
    console.log('New game started');
}

function generatePlinkoBoard() {
    const gameBoard = document.getElementById('game-board');
    const width = gameBoard.clientWidth;
    const height = gameBoard.clientHeight;
    const dotSize = 10;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = `${(width / (rows + 1)) * (j + 1) - dotSize / 2}px`;
            dot.style.top = `${(height / (rows + 1)) * (i + 1) - dotSize / 2}px`;
            gameBoard.appendChild(dot);
        }
    }
}

function generateSlots() {
    const gameBoard = document.getElementById('game-board');
    const width = gameBoard.clientWidth;
    const slotWidth = 50;
    const slotValues = [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9];

    for (let i = 0; i < slotValues.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.width = `${slotWidth}px`;
        slot.style.left = `${(width / slotValues.length) * i + (width / slotValues.length - slotWidth) / 2}px`;
        slot.innerHTML = `<p>${slotValues[i]}x</p>`;
        gameBoard.appendChild(slot);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    startNewGame();
});
