let introductionStep = 1;

document.addEventListener('DOMContentLoaded', (event) => {
  showStep(introductionStep);
});

function showStep(step) {
  document.querySelectorAll('.step').forEach((el) => el.classList.remove('active'));
  document.getElementById(`step${step}`).classList.add('active');
}

function nextStep(step) {
  introductionStep = step;
  showStep(step);
}

function badStep() {
  introductionStep = 4;
  showStep(4);
}

function closeIntroduction() {
  document.getElementById('introduction').style.display = 'none';
}

function selectCrypto(crypto) {
  const details = document.getElementById('crypto-details');
  let info = '';
  if (crypto === 'BTC') {
    info = `
      <h2>Bitcoin (BTC) <img src="btc_logo.png" alt="BTC Logo" class="crypto-logo"></h2>
      <p>Please send Bitcoin to the following address:</p>
      <p class="address">bc1q6w98k259drnsmcaq4ujwz9u3tluzdvypj60729</p>
      <img src="qr_btc.png" alt="BTC QR Code" class="qr-code">
      <button onclick="copyText('bc1q6w98k259drnsmcaq4ujwz9u3tluzdvypj60729')">Copy</button>
    `;
  } else if (crypto === 'ETH') {
    info = `
      <h2>Ethereum (ETH) <img src="eth_logo.png" alt="ETH Logo" class="crypto-logo"></h2>
      <p>Please send Ethereum to the following address:</p>
      <p class="address">0x1E99CE07F50B6749f1d5cEC360f0faAd738E1DEb</p>
      <img src="qr_eth.png" alt="ETH QR Code" class="qr-code">
      <button onclick="copyText('0x1E99CE07F50B6749f1d5cEC360f0faAd738E1DEb')">Copy</button>
    `;
  } else if (crypto === 'LTC') {
    info = `
      <h2>Litecoin (LTC) <img src="ltc_logo.png" alt="LTC Logo" class="crypto-logo"></h2>
      <p>Please send Litecoin to the following address:</p>
      <p class="address">LVghbfTm5ZuRpHgLhUwWvR6YG5svRDUSrk</p>
      <img src="qr_ltc.png" alt="LTC QR Code" class="qr-code">
      <button onclick="copyText('LVghbfTm5ZuRpHgLhUwWvR6YG5svRDUSrk')">Copy</button>
    `;
  }
  details.innerHTML = info;
  document.getElementById('crypto-info').style.display = 'block';
}

function closeCryptoInfo() {
  document.getElementById('crypto-info').style.display = 'none';
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Address copied to clipboard');
  });
}
