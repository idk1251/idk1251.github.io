document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.classList.add('fade-in');

    // Initialize clipboard.js
    const clipboard = new ClipboardJS('.copy-btn');

    clipboard.on('success', function(e) {
        e.trigger.textContent = 'Copied!';
        setTimeout(() => {
            e.trigger.textContent = 'Copy Address';
        }, 2000);
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        e.trigger.textContent = 'Press Ctrl+C to copy';
        setTimeout(() => {
            e.trigger.textContent = 'Copy Address';
        }, 2000);
    });
});
