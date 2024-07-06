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

function halveBet() {
    betAmount = Math.max(1, betAmount / 2);
    document.getElementById('bet-amount').value = betAmount;
}

function doubleBet() {
    betAmount *= 2;
    document.getElementById('bet-amount').value = betAmount;
}

function maxBet() {
    betAmount = balance;
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
    console.log('New game started');
}

function generatePlinkoBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = `${(gameBoard.clientWidth / (i + 1)) * j}px`;
            dot.style.top = `${(gameBoard.clientHeight / rows) * i}px`;
            gameBoard.appendChild(dot);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    generatePlinkoBoard();
});
