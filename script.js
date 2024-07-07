document.addEventListener('DOMContentLoaded', () => {
    const difficultySelect = document.getElementById('difficulty');
    const betAmountInput = document.getElementById('bet-amount');
    const rowsInput = document.getElementById('rows');
    const startGameButton = document.getElementById('start-game');
    const balanceDisplay = document.getElementById('balance');
    const plinkoBoard = document.getElementById('plinko-board');
    let balance = 50000;

    balanceDisplay.textContent = `Balance: ${balance}`;

    const updatePlinkoBoard = () => {
        const rows = parseInt(rowsInput.value);
        plinkoBoard.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('plinko-row');
            for (let j = 0; j <= i; j++) {
                const cell = document.createElement('div');
                cell.classList.add('plinko-cell');
                row.appendChild(cell);
            }
            plinkoBoard.appendChild(row);
        }
    };

    const startGame = () => {
        const difficulty = difficultySelect.value;
        const betAmount = parseInt(betAmountInput.value);
        const rows = parseInt(rowsInput.value);

        if (betAmount < 1 || betAmount > 1000) {
            alert('Bet amount must be between 1 and 1000.');
            return;
        }

        if (rows < 8 || rows > 16) {
            alert('Rows must be between 8 and 16.');
            return;
        }

        updatePlinkoBoard();

        // Placeholder for game logic
        console.log(`Starting game with difficulty: ${difficulty}, bet amount: ${betAmount}, rows: ${rows}`);
    };

    startGameButton.addEventListener('click', startGame);
    rowsInput.addEventListener('change', updatePlinkoBoard);
    updatePlinkoBoard();
});
