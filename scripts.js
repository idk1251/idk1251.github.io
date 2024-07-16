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
      <h2>Bitcoin (BTC)</h2>
      <p>Please send Bitcoin to the following address:</p>
      <p class="address">bc1qsdfmw4n8mzh0fg</p>
      <button onclick="copyText('bc1qsdfmw4n8mzh0fg')">Copy</button>
    `;
  } else if (crypto === 'ETH') {
    info = `
      <h2>Ethereum (ETH)</h2>
      <p>Please send Ethereum to the following address:</p>
      <p class="address">0x9nfp47wn8fn47</p>
      <button onclick="copyText('0x9nfp47wn8fn47')">Copy</button>
    `;
  } else if (crypto === 'USDT') {
    info = `
      <h2>Tether (USDT)</h2>
      <p>Please send Tether to the following address:</p>
      <p class="address">T9nb47nf8w4</p>
      <button onclick="copyText('T9nb47nf8w4')">Copy</button>
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
