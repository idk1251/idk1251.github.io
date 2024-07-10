document.addEventListener('DOMContentLoaded', () => {
    const minefield = document.getElementById('minefield');
    const betButton = document.getElementById('bet-button');
    const randomTileButton = document.getElementById('random-tile-button');
    const cashoutButton = document.getElementById('cashout-button');
    const minesSelect = document.getElementById('mines-select');
    const mineCountDisplay = document.getElementById('mine-count');
    const gemCountDisplay = document.getElementById('gem-count');
    const totalProfitDisplay = document.getElementById('total-profit');
    const balanceDisplay = document.getElementById('balance');
    const betAmountInput = document.getElementById('bet-amount-input');
    const halfButton = document.getElementById('half-button');
    const doubleButton = document.getElementById('double-button');
    let mines = [];
    let revealedCells = 0;
    let betAmount = 0;
    let balance = 1000000;
    const totalCells = 25;

    function initializeMinefield() {
        minefield.innerHTML = '';
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('mine-cell');
            cell.dataset.index = i;
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
        const cell = minefield.querySelector(`[data-index="${index}"]`);
        if (mines.includes(index)) {
            cell.innerHTML = '💣';
            cell.style.backgroundColor = '#d32f2f'; // Red background for mine
            setTimeout(() => {
                alert('Game over! You hit a mine.');
                initializeMinefield();
                revealedCells = 0;
                totalProfitDisplay.textContent = '0.00';
                betButton.style.display = 'block';
                cashoutButton.style.display = 'none';
                randomTileButton.style.display = 'none';
                cell.style.backgroundColor = '#263547'; // Reset cell background
            }, 500);
        } else {
            cell.innerHTML = '💎';
            cell.classList.add('revealed');
            cell.style.backgroundColor = '#4e7eab'; // Blue background for gem
            revealedCells++;
            let profitMultiplier = (revealedCells + 1) / (totalCells - mines.length);
            totalProfitDisplay.textContent = (betAmount * profitMultiplier).toFixed(2);
            if (revealedCells === totalCells - mines.length) {
                setTimeout(() => {
                    alert('Congratulations! You won.');
                    initializeMinefield();
                    revealedCells = 0;
                    balance += parseFloat(totalProfitDisplay.textContent);
                    balanceDisplay.textContent = balance.toFixed(2);
                    betButton.style.display = 'block';
                    cashoutButton.style.display = 'none';
                    randomTileButton.style.display = 'none';
                    // Reset all cell backgrounds
                    document.querySelectorAll('.mine-cell').forEach(cell => {
                        cell.style.backgroundColor = '#263547';
                    });
                }, 500);
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
        betAmount = parseFloat(betAmountInput.value);
        if (betAmount < 1 || betAmount > 1000 || betAmount > balance) {
            alert('Invalid bet amount.');
            return;
        }
        balance -= betAmount;
        balanceDisplay.textContent = balance.toFixed(2);
        placeMines();
        initializeMinefield();
        totalProfitDisplay.textContent = (betAmount * 1.0).toFixed(2);
        betButton.style.display = 'none';
        cashoutButton.style.display = 'block';
        randomTileButton.style.display = 'block';
    });

    randomTileButton.addEventListener('click', () => {
        pickRandomTile();
    });

    cashoutButton.addEventListener('click', () => {
        alert(`You cashed out ${totalProfitDisplay.textContent} units.`);
        balance += parseFloat(totalProfitDisplay.textContent);
        balanceDisplay.textContent = balance.toFixed(2);
        initializeMinefield();
        revealedCells = 0;
        betButton.style.display = 'block';
        cashoutButton.style.display = 'none';
        randomTileButton.style.display = 'none';
    });

    halfButton.addEventListener('click', () => {
        betAmountInput.value = Math.floor(betAmountInput.value / 2);
    });

    doubleButton.addEventListener('click', () => {
        betAmountInput.value = Math.min(betAmountInput.value * 2, 1000);
    });

    initializeMinefield(); // Initialize minefield grid on page load
});
