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
