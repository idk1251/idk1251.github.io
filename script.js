let balance = 1000000;
let difficulty = 'easy';
let betAmount = 10;
let rows = 10;
let slots = [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9];
let plinkoBoard = [];

function updateBalance() {
    document.getElementById('balance').innerText = balance.toLocaleString();
}

function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.difficulty-button[onclick="setDifficulty('${level}')"]`).classList.add('active');
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
    document.querySelectorAll('.row-buttons button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.row-buttons button[onclick="setRows(${rowCount})"]`).classList.add('active');
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

    plinkoBoard = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j <= i; j++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            const left = (width / (rows + 1)) * (j + 1) - dotSize / 2;
            const top = (height / (rows + 1)) * (i + 1) - dotSize / 2;
            dot.style.left = `${left}px`;
            dot.style.top = `${top}px`;
            row.push({left, top});
            gameBoard.appendChild(dot);
        }
        plinkoBoard.push(row);
    }
}

function generateSlots() {
    const gameBoard = document.getElementById('game-board');
    const width = gameBoard.clientWidth;
    const slotWidth = 50;

    for (let i = 0; i < slots.length; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.width = `${slotWidth}px`;
        slot.style.left = `${(width / slots.length) * i + (width / slots.length - slotWidth) / 2}px`;
        slot.innerHTML = `<p>${slots[i]}x</p>`;
        gameBoard.appendChild(slot);
    }
}

function dropBall() {
    const gameBoard = document.getElementById('game-board');
    const width = gameBoard.clientWidth;
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.left = `${(width / 2) - 10}px`;
    gameBoard.appendChild(ball);
    
    let position = {left: width / 2 - 10, top: 0};
    let rowIndex = 0;

    const interval = setInterval(() => {
        if (rowIndex < plinkoBoard.length) {
            const row = plinkoBoard[rowIndex];
            const nearestDot = row.reduce((prev, curr) => {
                return (Math.abs(curr.left - position.left) < Math.abs(prev.left - position.left) ? curr : prev);
            });

            const direction = Math.random() > 0.5 ? 1 : -1;
            position.left += direction * 10;
            position.top = nearestDot.top + 10;
            ball.style.left = `${position.left}px`;
            ball.style.top = `${position.top}px`;

            rowIndex++;
        } else {
            clearInterval(interval);
            calculateWinnings(position.left);
            gameBoard.removeChild(ball);
        }
    }, 100);
}

function calculateWinnings(ballLeftPosition) {
    const gameBoard = document.getElementById('game-board');
    const width = gameBoard.clientWidth;
    const slotIndex = Math.floor(ballLeftPosition / (width / slots.length));
    const winnings = betAmount * slots[slotIndex];
    balance += winnings;
    updateBalance();
    console.log(`Ball landed in slot ${slotIndex} with ${slots[slotIndex]}x multiplier. Winnings: ${winnings}`);
}

document.getElementById('bet-amount').addEventListener('input', function() {
    betAmount = parseInt(this.value);
});

startNewGame();
updateBalance();
