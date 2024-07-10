// script.js
document.addEventListener('DOMContentLoaded', () => {
    const minefield = document.getElementById('minefield');
    const betButton = document.getElementById('bet-button');
    const randomTileButton = document.getElementById('random-tile-button');
    const cashoutButton = document.getElementById('cashout-button');
    const minesSelect = document.getElementById('mines-select');
    const mineCountDisplay = document.getElementById('mine-count');
    const gemCountDisplay = document.getElementById('gem-count');
    const totalProfitDisplay = document.getElementById('total-profit');
    let mines = [];
    let revealedCells = 0;
    let betAmount = 0.0;
    let totalCells = 25;

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
        mineCountDisplay.textContent = mineCount;
        gemCountDisplay.textContent = totalCells - mineCount;
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
            totalProfitDisplay.textContent = '0.00000000 LTC';
        } else {
            cell.innerHTML = '💎';
            cell.classList.add('revealed');
            revealedCells++;
            let profitMultiplier = (revealedCells + 1) / (totalCells - mines.length);
            totalProfitDisplay.textContent = (betAmount * profitMultiplier).toFixed(8) + ' LTC';
            if (revealedCells === totalCells - mines.length) {
                alert('Congratulations! You won.');
                initializeMinefield();
                revealedCells = 0;
            }
        }
    }

    function pickRandomTile() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * totalCells);
        } while (minefield.children[randomIndex].classList.contains('revealed'));
        revealCell(randomIndex);
    }

    betButton.addEventListener('click', () => {
        betAmount = parseFloat(document.getElementById('bet-amount-input').value);
        placeMines();
        initializeMinefield();
        totalProfitDisplay.textContent = (betAmount * 1.0).toFixed(8) + ' LTC';
    });

    randomTileButton.addEventListener('click', () => {
        pickRandomTile();
    });

    cashoutButton.addEventListener('click', () => {
        alert('You cashed out with a profit of ' + totalProfitDisplay.textContent);
        initializeMinefield();
        revealedCells = 0;
        totalProfitDisplay.textContent = '0.00000000 LTC';
    });

    initializeMinefield();
});
