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

    function calculateProfit() {
        const betAmount = parseFloat(betAmountInput.value);
        const winChance = parseFloat(winChanceInput.value);
        const multiplier = parseFloat(multiplierInput.value);

        if (betAmount && winChance && multiplier) {
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
        // Here you would handle the bet placement and result
        alert('Bet placed!');
    });

    // Initialize with default values
    rollOverInput.value = 50;
    updateMultiplierAndChance();
});
