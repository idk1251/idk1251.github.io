let balance = 50000;
let difficulty = 'easy';
let rows = 10;
let multipliers = {
    easy: [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9],
    normal: [8.1, 4, 3, 1.9, 1.2, 0.9, 0.7, 0.7, 0.9, 1.2, 1.9, 3, 4, 8.1],
    hard: [260, 37, 11, 4, 1, 0.2, 0.2, 1, 4, 11, 37, 260]
};

function setDifficulty(level) {
    difficulty = level;
    document.querySelectorAll('.difficulty-button').forEach(button => button.classList.remove('active'));
    document.getElementById(level).classList.add('active');
    updateBoard();
}

function updateBoard() {
    rows = document.getElementById('rowsAmount').value;
    document.documentElement.style.setProperty('--rows', rows);
    updateMultipliers();
}

function updateMultipliers() {
    const board = document.getElementById('multipliers');
    board.innerHTML = '';
    let currentMultipliers = multipliers[difficulty];
    let colCount = currentMultipliers.length;

    for (let i = 0; i < colCount; i++) {
        let multiplier = document.createElement('div');
        multiplier.className = 'multiplier';
        multiplier.style.gridColumn = i + 1;
        multiplier.textContent = `${currentMultipliers[i]}x`;
        board.appendChild(multiplier);
    }
}

function startNewGame() {
    let bet = document.getElementById('betAmount').value;
    if (bet > balance) {
        alert("Insufficient balance!");
        return;
    }
    balance -= bet;
    document.getElementById('balance').textContent = balance;
    updateBoard();
}

document.addEventListener('DOMContentLoaded', () => {
    updateBoard();
});
