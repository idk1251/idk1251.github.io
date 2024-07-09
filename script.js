document.querySelector('.bet-button').addEventListener('click', function() {
    let dice = document.getElementById('dice');
    dice.style.transform = 'rotate(' + (Math.floor(Math.random() * 360)) + 'deg)';
});
