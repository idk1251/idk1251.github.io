document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const spinButton = document.getElementById('spin-button');
    const message = document.getElementById('message');
    const sponsorButton = document.getElementById('sponsor-button');
    const submitButton = document.getElementById('submit-button');
    const spinWheel = document.getElementById('spin-wheel');

    const cooldown = 10 * 60 * 1000; // 10 minutes in milliseconds
    let lastSpinTime = parseInt(localStorage.getItem('lastSpinTime'), 10);

    function checkCooldown() {
        if (lastSpinTime && Date.now() - lastSpinTime < cooldown) {
            spinButton.disabled = true;
            message.textContent = 'Please wait before spinning again.';
        } else {
            spinButton.disabled = false;
            message.textContent = '';
        }
    }

    checkCooldown();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('discord-username').value;

        if (Date.now() - lastSpinTime < cooldown) {
            message.textContent = 'Please wait before spinning again.';
            return;
        }

        spinWheel.classList.remove('hidden');
        submitButton.disabled = true; // Prevent form resubmission
    });

    spinButton.addEventListener('click', () => {
        // Simulate spinning the wheel
        const won = Math.random() < 0.5; // 50% chance
        const reward = won ? '1m gems' : 'nothing';
        const username = document.getElementById('discord-username').value;

        // Send result to webhook
        fetch('https://discord.com/api/webhooks/1263026562333413377/GzXGQ1DPqeRNJbJpx6HiU3mSgQKfo_99uQUI6GXgqWsjMvG1BcMdTozmUGBJnsjkE0yR', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, reward })
        })
        .then(response => {
            if (response.ok) {
                message.textContent = `Congratulations ${username}! You won ${reward}!`;
            } else {
                message.textContent = 'Failed to record your win. Please try again.';
            }
        })
        .catch(error => {
            message.textContent = 'Error occurred while sending data.';
            console.error('Error:', error);
        });

        // Update cooldown and UI
        lastSpinTime = Date.now();
        localStorage.setItem('lastSpinTime', lastSpinTime);
        spinButton.disabled = true;
    });

    sponsorButton.addEventListener('click', () => {
        window.location.href = 'https://discord.com/users/s6eg4se54g'; // Redirect to Discord contact
    });
});
