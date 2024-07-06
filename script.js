const settings = {
    difficulty: 'Easy',
    betAmount: 10,
    rowAmount: 10,
    balance: 1000000
};

document.getElementById('easy').addEventListener('click', () => settings.difficulty = 'Easy');
document.getElementById('normal').addEventListener('click', () => settings.difficulty = 'Normal');
document.getElementById('hard').addEventListener('click', () => settings.difficulty = 'Hard');

document.getElementById('bet-amount').addEventListener('change', (e) => settings.betAmount = parseInt(e.target.value));
document.getElementById('half').addEventListener('click', () => {
    settings.betAmount = Math.max(1, settings.betAmount / 2);
    document.getElementById('bet-amount').value = settings.betAmount;
});
document.getElementById('double').addEventListener('click', () => {
    settings.betAmount *= 2;
    document.getElementById('bet-amount').value = settings.betAmount;
});
document.getElementById('max').addEventListener('click', () => {
    settings.betAmount = settings.balance;
    document.getElementById('bet-amount').value = settings.betAmount;
});

document.getElementById('row-amount').addEventListener('change', (e) => settings.rowAmount = parseInt(e.target.value));

document.getElementById('start-game').addEventListener('click', () => {
    startGame();
});

function startGame() {
    const board = document.getElementById('plinko-board');
    board.innerHTML = '';

    const numRows = settings.rowAmount;
    const numPins = numRows * (numRows + 1) / 2;

    for (let i = 0; i < numPins; i++) {
        const pin = document.createElement('div');
        pin.className = 'pin';
        board.appendChild(pin);
    }

    const slots = [0.5, 1, 1.1, 1.4, 3, 8.9];
    slots.forEach((multiplier, index) => {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.style.left = `${index * 60}px`;
        slot.innerText = `${multiplier}x`;
        board.appendChild(slot);
    });

    document.getElementById('balance').innerText = `Balance: ${settings.balance}`;
}

// Initialize game on page load
startGame();

