function startLimbo() {
    const gameContainer = document.getElementById('limbo-game');
    gameContainer.innerHTML = '';

    // Initialize game variables
    let multiplier = 1.00; // Initial multiplier
    let linePosition = 0; // Initial position of the rising line
    let isGameOver = false;

    // Display limbo game content
    const limboContent = document.createElement('div');
    limboContent.classList.add('limbo-content');
    limboContent.innerHTML = `
        <p>Multiplier: <span id="limbo-multiplier">${multiplier.toFixed(2)}</span>x</p>
        <div class="line-container">
            <div class="line"></div>
        </div>
        <button id="limbo-cashout-btn" onclick="cashout()" disabled>Cash Out</button>
        <div id="limbo-result" class="game-result"></div>
    `;
    gameContainer.appendChild(limboContent);

    // Function to update the rising line
    const interval = setInterval(() => {
        if (isGameOver) {
            clearInterval(interval);
            return;
        }

        linePosition += 1; // Adjust speed of line movement here
        const line = document.querySelector('.line');
        line.style.height = `${linePosition}%`;

        // Check if line has crossed multiplier
        if (linePosition > 90) {
            gameOver();
        }
    }, 50); // Adjust interval for smoother animation

    // Function to cash out
    function cashout() {
        const payout = multiplier * 100; // Example payout calculation
        document.getElementById('limbo-result').textContent = `You cashed out at ${multiplier.toFixed(2)}x! Payout: $${payout.toFixed(2)}`;
        isGameOver = true;
    }

    // Function for game over
    function gameOver() {
        const line = document.querySelector('.line');
        line.style.background = 'red'; // Visual indicator of game over
        document.getElementById('limbo-cashout-btn').disabled = true;
        document.getElementById('limbo-result').textContent = 'Game Over! You missed your cash out opportunity.';
        isGameOver = true;
    }
}
