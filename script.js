document.addEventListener('DOMContentLoaded', function() {
    const betInput = document.getElementById('bet-amount');
    const betSlider = document.getElementById('bet-slider');
    const rowsInput = document.getElementById('rows');
    const riskButtons = document.querySelectorAll('.risk-button');
    const placeBetButton = document.querySelector('.place-bet-button');

    // Sync slider and input
    betSlider.addEventListener('input', function() {
        betInput.value = betSlider.value;
    });

    betInput.addEventListener('input', function() {
        betSlider.value = betInput.value;
    });

    // Clear button functionality
    document.querySelector('.clear-button').addEventListener('click', function() {
        betInput.value = 0;
        betSlider.value = 0;
    });

    // Risk button functionality
    riskButtons.forEach(button => {
        button.addEventListener('click', function() {
            riskButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Place Bet button functionality
    placeBetButton.addEventListener('click', function() {
        alert('Bet placed with amount: ' + betInput.value);
        createPlinkoBoard(rowsInput.value);
    });

    // Function to create the Plinko board
    function createPlinkoBoard(rows) {
        const plinkoContainer = document.getElementById('plinko');
        plinkoContainer.innerHTML = ''; // Clear previous board
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 700;
        plinkoContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const pegRadius = 5;
        const spacing = 40;
        const boardWidth = (rows + 1) * spacing;

        // Adjust canvas width based on rows
        canvas.width = boardWidth;

        // Draw pegs
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col <= row; col++) {
                const x = canvas.width / 2 + (col - row / 2) * spacing;
                const y = (row + 1) * spacing;
                ctx.beginPath();
                ctx.arc(x, y, pegRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }
        }

        // Generate payout tiles dynamically
        const payoutContainer = document.querySelector('.payout');
        payoutContainer.innerHTML = ''; // Clear previous tiles
        const payoutMultipliers = generatePayoutMultipliers(rows);
        
        payoutMultipliers.forEach((multiplier, index) => {
            const tile = document.createElement('div');
            tile.className = `payout-tile ${getPayoutClass(multiplier)}`;
            tile.innerHTML = `
                <div class="rarity-line ${getPayoutClass(multiplier)}"></div>
                <div class="payout-tile-multiplier">${multiplier}x</div>
            `;
            payoutContainer.appendChild(tile);
        });
    }

    // Function to generate payout multipliers based on number of rows
    function generatePayoutMultipliers(rows) {
        const multipliers = [];
        for (let i = 0; i <= rows; i++) {
            multipliers.push((Math.random() * (10 - 1) + 1).toFixed(2));
        }
        return multipliers;
    }

    // Function to get the class based on payout multiplier
    function getPayoutClass(multiplier) {
        if (multiplier >= 7) return 'payout-rare';
        if (multiplier >= 4) return 'payout-uncommon';
        return 'payout-common';
    }
});
