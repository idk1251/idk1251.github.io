document.getElementById('roll-button').addEventListener('click', function() {
    let diceResult = Math.floor(Math.random() * 6) + 1; // Generate random number between 1 and 6
    document.getElementById('dice').innerText = diceResult;
    document.getElementById('result-text').innerText = `Result: ${diceResult}`;
});

document.getElementById('place-bet').addEventListener('click', function() {
    let betAmount = parseInt(document.getElementById('bet-amount').value);
    let userBalance = parseInt(document.getElementById('user-balance').innerText.slice(1)); // Extract number from balance string

    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Please enter a valid bet amount.');
    } else if (betAmount > userBalance) {
        alert('Insufficient balance!');
    } else {
        // Update user balance (front-end only example)
        userBalance -= betAmount;
        document.getElementById('user-balance').innerText = `$${userBalance}`;

        // Handle bet logic (not backend, just UI update)
        // For simplicity, not implementing full bet handling without backend
    }
});

