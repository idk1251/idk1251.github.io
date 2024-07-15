document.addEventListener('DOMContentLoaded', () => {
    const quotes = document.querySelectorAll('.quote');
    let index = 0;

    function showQuote() {
        quotes.forEach((quote, i) => {
            quote.style.opacity = i === index ? '1' : '0';
        });
        index = (index + 1) % quotes.length;
    }

    setInterval(showQuote, 5000);
    showQuote();
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Address copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
