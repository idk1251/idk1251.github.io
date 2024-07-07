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
    });
});

// Optionally, add grid generation logic if needed
const gameBoardGrid = document.querySelector('.game-board-grid');
const rows = 10;
const columns = 10;

for (let i = 0; i < rows * columns; i++) {
    const gridElement = document.createElement('div');
    gameBoardGrid.appendChild(gridElement);
}
