document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const qrImages = document.querySelectorAll('.qr-img');
    const closeModal = document.querySelector(".close");
    const navbar = document.querySelector(".navbar");

    // Navbar smooth scroll
    navbar.addEventListener('click', function (e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Copy button functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const clipboardText = button.getAttribute('data-clipboard');
            navigator.clipboard.writeText(clipboardText).then(() => {
                alert('Address copied to clipboard!');
            }, () => {
                alert('Failed to copy address.');
            });
        });
    });

    // Modal functionality
    qrImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.getAttribute('data-modal');
        });
    });

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
