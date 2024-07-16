function nextQuestion(next) {
    const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
    currentQuestion.style.display = 'none';
    
    if (next === 'donation') {
        document.getElementById('donation-container').style.display = 'block';
    } else {
        document.getElementById(`question-${next}`).style.display = 'block';
    }
}

function showQR(crypto) {
    let address = "";
    let qrCode = "";

    switch (crypto) {
        case 'btc':
            address = "your_btc_address";
            qrCode = "qr_btc.png";
            break;
        case 'ltc':
            address = "your_ltc_address";
            qrCode = "qr_ltc.png";
            break;
        case 'eth':
            address = "your_eth_address";
            qrCode = "qr_eth.png";
            break;
    }

    document.getElementById('crypto-title').textContent = `Donate with ${crypto.toUpperCase()}`;
    document.getElementById('qr-code').src = qrCode;
    document.getElementById('crypto-address').textContent = address;
    document.getElementById('donation-container').style.display = 'none';
    document.getElementById('qr-container').style.display = 'block';
}

function copyAddress() {
    const address = document.getElementById('crypto-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
        alert('Address copied to clipboard');
    });
}

