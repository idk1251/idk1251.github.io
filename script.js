document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.classList.add('fade-in');

    const copyButtons = document.querySelectorAll('.copy-btn');
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

    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const qrImages = document.querySelectorAll('.qr-img');

    qrImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.getAttribute('data-modal');
        });
    });

    const closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
