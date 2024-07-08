document.addEventListener('DOMContentLoaded', function() {
    // Implement slider functionality
    const slider = document.querySelector('.slider-wrap input');
    const betInput = document.querySelector('.bet-input');
    slider.addEventListener('input', function() {
        betInput.value = slider.value;
    });

    // Implement button functionalities
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', function() {
        betInput.value = '';
        slider.value = 5; // reset slider to minimum
    });

    // Add event listeners to amount buttons
    document.querySelectorAll('.amount-button').forEach(button => {
        button.addEventListener('click', function() {
            const currentValue = parseFloat(betInput.value);
            if (this.textContent === '1/2') betInput.value = currentValue / 2;
            if (this.textContent === '2X') betInput.value = currentValue * 2;
            if (this.textContent === 'MIN') betInput.value = slider.min;
            if (this.textContent === 'MAX') betInput.value = slider.max;
            slider.value = betInput.value;
        });
    });

    // Toggle active class for risk buttons
    const riskButtons = document.querySelectorAll('.risk-button');
    riskButtons.forEach(button => {
        button.addEventListener('click', function() {
            riskButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Place Bet button functionality
    const placeBetButton = document.querySelector('.place-bet-button');
    placeBetButton.addEventListener('click', function() {
        alert('Bet placed with amount: ' + betInput.value);
    });
});

