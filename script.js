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

function updateGrid(rows) {
    const gameBoardGrid = document.querySelector('.game-board-grid');
    gameBoardGrid.innerHTML = '';
    gameBoardGrid.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
    gameBoardGrid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
            const gridElement = document.createElement('div');
            gameBoardGrid.appendChild(gridElement);
        }
    }
}

// Initialize the grid with default rows (10)
updateGrid(10);
