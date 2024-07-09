// script.js
document.addEventListener('DOMContentLoaded', () => {
    const betAmountInput = document.getElementById('betAmount');
    const profitInput = document.getElementById('profit');
    const slider = document.getElementById('slider');
    const multiplierInput = document.getElementById('multiplier');
    const rollOverInput = document.getElementById('rollOver');
    const winChanceInput = document.getElementById('winChance');
    const betButton = document.getElementById('betButton');
    const halfBetButton = document.getElementById('halfBet');
    const doubleBetButton = document.getElementById('doubleBet');
    const resultsContainer = document.getElementById('resultsContainer');

    function calculateProfit() {
        const betAmount = parseFloat(betAmountInput.value);
        const multiplier = parseFloat(multiplierInput.value);
        if (betAmount && multiplier) {
            const profit = betAmount * (multiplier - 1);
            profitInput.value = profit.toFixed(8);
        } else {
            profitInput.value = '0.00';
        }
    }

    function updateMultiplierAndChance() {
        const rollOver = parseFloat(rollOverInput.value);
        const winChance = 100 - rollOver;
        const multiplier = 100 / winChance;

        winChanceInput.value = winChance.toFixed(4);
        multiplierInput.value = multiplier.toFixed(4);

        calculateProfit();
    }

    rollOverInput.addEventListener('input', updateMultiplierAndChance);
    betAmountInput.addEventListener('input', calculateProfit);

    halfBetButton.addEventListener('click', () => {
        betAmountInput.value = (parseFloat(betAmountInput.value) / 2).toFixed(8);
        calculateProfit();
    });

    doubleBetButton.addEventListener('click', () => {
        betAmountInput.value = (parseFloat(betAmountInput.value) * 2).toFixed(8);
        calculateProfit();
    });

    betButton.addEventListener('click', () => {
        const result = Math.random() * 100;
        const rollOver = parseFloat(rollOverInput.value);

        const resultDiv = document.createElement('div');
        resultDiv.textContent = result.toFixed(2);

        if (result > rollOver) {
            resultDiv.style.backgroundColor = '#48BB78'; // Win
        } else {
            resultDiv.style.backgroundColor = '#E53E3E'; // Lose
        }

        resultsContainer.prepend(resultDiv);
    });

    // Initialize with default values
    rollOverInput.value = 50;
    updateMultiplierAndChance();
});
