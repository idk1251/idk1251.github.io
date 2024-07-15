document.addEventListener('DOMContentLoaded', () => {
    const quotes = document.querySelectorAll('.quote');
    let index = 0;

    setInterval(() => {
        quotes.forEach((quote, i) => {
            quote.style.display = i === index ? 'block' : 'none';
        });
        index = (index + 1) % quotes.length;
    }, 5000);
});
