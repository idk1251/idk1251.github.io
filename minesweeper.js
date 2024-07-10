function startMinesweeper() {
    const board = document.getElementById('minesweeper-board');
    board.innerHTML = '';

    const gridSize = 10;
    const numMines = 10;
    let mines = [];

    // Initialize mines array
    for (let i = 0; i < gridSize; i++) {
        mines[i] = [];
        for (let j = 0; j < gridSize; j++) {
            mines[i][j] = 0; // 0 indicates no mine
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (mines[row][col] !== -1) {
            mines[row][col] = -1; // -1 indicates a mine
            minesPlaced++;
        }
    }

    // Create grid cells
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => revealCell(i, j));

            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    // Function to reveal cell
    function revealCell(row, col) {
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell.classList.contains('revealed')) return;

        cell.classList.add('revealed');

        if (mines[row][col] === -1) {
            gameOver();
        } else {
            const minesNearby = countNearbyMines(row, col);
            if (minesNearby > 0) {
                cell.textContent = minesNearby;
            } else {
                // Automatically reveal nearby cells if no mines nearby
                revealNearbyCells(row, col);
            }
        }
    }

    // Function to count nearby mines
    function countNearbyMines(row, col) {
        let count = 0;
        for (let r = Math.max(0, row - 1); r <= Math.min(gridSize - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(gridSize - 1, col + 1); c++) {
                if (mines[r][c] === -1) {
                    count++;
                }
            }
        }
        return count;
    }

    // Function to reveal nearby cells recursively
    function revealNearbyCells(row, col) {
        for (let r = Math.max(0, row - 1); r <= Math.min(gridSize - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(gridSize - 1, col + 1); c++) {
                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                if (!cell.classList.contains('revealed')) {
                    cell.classList.add('revealed');
                    const minesNearby = countNearbyMines(r, c);
                    if (minesNearby === 0) {
                        revealNearbyCells(r, c);
                    } else {
                        cell.textContent = minesNearby;
                    }
                }
            }
        }
    }

    // Function for game over
    function gameOver() {
        board.querySelectorAll('.cell').forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (mines[row][col] === -1) {
                cell.textContent = '*'; // Display all mines
            }
        });
        document.getElementById('minesweeper-result').textContent = 'Game Over! You hit a mine.';
    }
}
