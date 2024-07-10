function startDice() {
    const gameContainer = document.getElementById('dice-game');
    gameContainer.innerHTML = '';

    // Display dice game content
    const diceContent = document.createElement('div');
    diceContent.classList.add('dice-content');
    diceContent.innerHTML = `
        <label for="bet">Enter your bet amount:</label>
        <input type="number" id="bet" min="1" step="1">
        <button onclick="rollDice()">Roll Dice</button>
        <div id="dice-result" class="game-result"></div>
    `;
    gameContainer.appendChild(diceContent);

    // Function to roll the dice
    function rollDice() {
        const bet = parseInt(document.getElementById('bet').value);
        if (!bet || bet <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }

        // Simulate dice roll
        const diceRoll = Math.floor(Math.random() * 6) + 1; // Random dice roll from 1 to 6
        const payout = calculatePayout(bet, diceRoll);

        // Determine outcome based on dice roll
        let resultText = '';
        if (payout > 0) {
            resultText = `You rolled a ${diceRoll}! You win $${payout.toFixed(2)}.`;
        } else {
            resultText = `You rolled a ${diceRoll}. Sorry, you lose your bet.`;
        }

        document.getElementById('dice-result').textContent = resultText;
    }

    // Function to calculate payout based on dice roll
    function calculatePayout(bet, diceRoll) {
        let payout = 0;
        switch (diceRoll) {
            case 6:
                payout = bet * 2; // Example payout for rolling a specific number
                break;
            default:
                payout = 0; // Player loses their bet
        }
        return payout;
    }
}
