// script.js

// Initialize wheel
const wheel = new Winwheel({
    'numSegments': 8,
    'segments': [
        {'fillStyle': '#eae56f', 'text': 'Prize 1'},
        {'fillStyle': '#89f26e', 'text': 'Prize 2'},
        {'fillStyle': '#7de6ef', 'text': 'Prize 3'},
        {'fillStyle': '#e7706f', 'text': 'Prize 4'},
        {'fillStyle': '#eae56f', 'text': 'Prize 5'},
        {'fillStyle': '#89f26e', 'text': 'Prize 6'},
        {'fillStyle': '#7de6ef', 'text': 'Prize 7'},
        {'fillStyle': '#e7706f', 'text': 'Prize 8'}
    ],
    'pointerAngle': 90
});

// Update countdown timer
function updateCountdown(seconds) {
    const endTime = Date.now() + seconds * 1000;
    const timerElement = document.getElementById('timer');

    function refreshTimer() {
        const timeLeft = Math.max(endTime - Date.now(), 0);
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) clearInterval(timerInterval);
    }

    refreshTimer();
    const timerInterval = setInterval(refreshTimer, 1000);
}

// Event listeners
document.getElementById('enter-btn').addEventListener('click', function() {
    const username = document.getElementById('discord-username').value;
    if (username) {
        fetch('/enter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('You have entered the giveaway!');
              } else {
                  alert('Error: ' + data.message);
              }
          });
    }
});

document.getElementById('start-btn').addEventListener('click', function() {
    fetch('/start', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                wheel.startAnimation();
                setTimeout(() => {
                    document.getElementById('winner-name').textContent = data.winner;
                }, 5000); // Delay to show result
            }
        });
});

document.getElementById('update-settings-btn').addEventListener('click', function() {
    const countdownMinutes = prompt('Enter countdown time in minutes:');
    if (countdownMinutes !== null) {
        fetch('/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newCountdown: parseInt(countdownMinutes) })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Settings updated!');
                  updateCountdown(countdownMinutes * 60);
              }
          });
    }
});

