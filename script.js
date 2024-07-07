document.querySelectorAll('.mode button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.mode .active').classList.remove('active');
        button.classList.add('active');
    });
});

document.querySelectorAll('.difficulty button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.difficulty .active').classList.remove('active');
        button.classList.add('active');
    });
});

document.querySelectorAll('.rows button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.rows .active').classList.remove('active');
        button.classList.add('active');
        updateGrid(parseInt(button.getAttribute('data-rows')));
    });
});

const gameBoardGrid = document.querySelector('.game-board-grid');

function updateGrid(rows) {
    gameBoardGrid.innerHTML = ''; // Clear existing grid
    gameBoardGrid.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    gameBoardGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < rows; col++) {
            const gridElement = document.createElement('div');
            if ((row + col) % 2 === 0) { // Adjust the condition to match the dot pattern in the image
                gameBoardGrid.appendChild(gridElement);
            }
        }
    }
}

// Initialize the grid with default value
updateGrid(10);
