// script.js
document.addEventListener('DOMContentLoaded', () => {
    const minefield = document.getElementById('minefield');
    const betButton = document.getElementById('bet-button');
    const minesSelect = document.getElementById('mines-select');
    let mines = [];
    let revealedCells = 0;
    const totalCells = 25;

    function initializeMinefield() {
        minefield.innerHTML = '';
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('mine-cell');
            cell.addEventListener('click', () => revealCell(i));
            minefield.appendChild(cell);
        }
    }

    function placeMines() {
        mines = [];
        const mineCount = parseInt(minesSelect.value);
        while (mines.length < mineCount) {
            const minePosition = Math.floor(Math.random() * totalCells);
            if (!mines.includes(minePosition)) {
                mines.push(minePosition);
            }
        }
    }

    function revealCell(index) {
        const cell = minefield.children[index];
        if (mines.includes(index)) {
            cell.innerHTML = '💣';
            alert('Game over! You hit a mine.');
            initializeMinefield();
            revealedCells = 0;
        } else {
            cell.innerHTML = '💎';
            cell.classList.add('revealed');
            revealedCells++;
            if (revealedCells === totalCells - mines.length) {
                alert('Congratulations! You won.');
                initializeMinefield();
                revealedCells = 0;
            }
        }
    }

    betButton.addEventListener('click', () => {
        placeMines();
        initializeMinefield();
    });

    initializeMinefield();
});
