let balance = 1000000;
let gameInterval;
let difficultySpeeds = {
    easy: 3000,
    normal: 2000,
    hard: 1000
};

document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
});

function updateBalance() {
    document.getElementById('balance').innerText = `Balance: $${balance.toLocaleString()}`;
}

function startGame(difficulty) {
    clearInterval(gameInterval);
    document.querySelectorAll('.chicken').forEach(chicken => chicken.remove());
    gameInterval = setInterval(() => {
        let chicken = document.createElement('img');
        chicken.src = "https://play-lh.googleusercontent.com/vDQFHtxOHFl5Q39BtHt3R0PQBRB2RGPMGUgYc7T6yGiBN1NKB-j26SGk4IHZ9Tzo5pnH=w240-h480-rw";
        chicken.className = 'chicken';
        chicken.style.left = `${Math.floor(Math.random() * 560)}px`;
        document.getElementById('game-area').appendChild(chicken);
        moveChicken(chicken, difficulty);
    }, difficultySpeeds[difficulty]);
}

function moveChicken(chicken, difficulty) {
    let speed = difficultySpeeds[difficulty];
    let interval = setInterval(() => {
        let top = parseInt(chicken.style.top) || -40;
        if (top > 400) {
            clearInterval(interval);
            chicken.remove();
            updateBalance();
        } else {
            chicken.style.top = `${top + 5}px`;
            checkCollision(chicken, interval);
        }
    }, 50);
}

function checkCollision(chicken, interval) {
    let car = document.getElementById('car');
    let carRect = car.getBoundingClientRect();
    let chickenRect = chicken.getBoundingClientRect();

    if (!(carRect.right < chickenRect.left || 
          carRect.left > chickenRect.right || 
          carRect.bottom < chickenRect.top || 
          carRect.top > chickenRect.bottom)) {
        clearInterval(interval);
        chicken.remove();
        balance -= 100;
        updateBalance();
    }
}
