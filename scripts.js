// script.js

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
    'pointerAngle': 90,
    'animation': {
        'type': 'spinToStop',
        'duration': 5,
        'spins': 8
    }
});

document.getElementById('enter-btn').addEventListener('click', function() {
    const username = document.getElementById('discord-username').value.trim();
    if (username) {
        fetch('/enter', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('You have entered the giveaway!');
                  document.getElementById('discord-username').value = '';
              } else {
                  alert('Error: ' + data.message);
              }
          }).catch(error => {
              console.error('Error:', error);
              alert('Something went wrong. Please try again.');
          });
    } else {
        alert('Please enter a valid username.');
    }
});

document.getElementById('spin-btn').addEventListener('click', function() {
    fetch('/start', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                wheel.startAnimation();
                setTimeout(() => {
                    document.getElementById('winner-name').textContent = data.winner;
                }, 5000); // Delay to show result
            } else {
                alert('Error: ' + data.message);
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        });
});

document.getElementById('update-settings-btn').addEventListener('click', function() {
    const countdownMinutes = parseInt(document.getElementById('countdown-input').value.trim());
    if (!isNaN(countdownMinutes) && countdownMinutes > 0) {
        fetch('/settings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ newCountdown: countdownMinutes })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Settings updated!');
                  updateCountdown(countdownMinutes * 60);
              } else {
                  alert('Error: ' + data.message);
              }
          }).catch(error => {
              console.error('Error:', error);
              alert('Something went wrong. Please try again.');
          });
    } else {
        alert('Please enter a valid number of minutes.');
    }
});

function updateCountdown(seconds) {
    const endTime = Date.now() + seconds * 1000;
    const timerElement = document.getElementById('countdown-timer');

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
