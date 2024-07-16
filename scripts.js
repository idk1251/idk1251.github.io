document.addEventListener("DOMContentLoaded", function() {
  const app = document.getElementById("app");
  const qrCodes = {
    btc: "qr_btc.png",
    eth: "qr_eth.png",
    ltc: "qr_ltc.png"
  };

  const addresses = {
    btc: "bc1q6w98k259drnsmcaq4ujwz9u3tluzdvypj60729",
    eth: "0x1E99CE07F50B6749f1d5cEC360f0faAd738E1DEb",
    ltc: "LVghbfTm5ZuRpHgLhUwWvR6YG5svRDUSrk"
  };

  const modalContent = [
    {
      title: "Hey! How are you doing today?",
      buttons: ["Good", "Bad"]
    },
    {
      title: "Welcome!",
      text: "This website is designed by me (discord: s6eg4se54g), I have worked very hard on this website for my donators!",
      buttons: ["Next"]
    },
    {
      title: "Donations are welcome!",
      text: "Donations will help me in education and my own life decisions!",
      buttons: ["Next"]
    },
    {
      title: "Oh, I'm sorry to hear that!",
      text: "I hope your day gets better. Please let me know if there's anything I can do to help.",
      buttons: ["Okay"]
    }
  ];

  let step = 0;

  function showModal() {
    const modal = document.createElement("div");
    modal.className = "fixed";

    const content = document.createElement("div");
    content.className = "modal";

    const title = document.createElement("h1");
    title.textContent = modalContent[step].title;
    content.appendChild(title);

    if (modalContent[step].text) {
      const text = document.createElement("p");
      text.textContent = modalContent[step].text;
      content.appendChild(text);
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttons";

    modalContent[step].buttons.forEach(buttonText => {
      const button = document.createElement("button");
      button.textContent = buttonText;
      button.addEventListener("click", handleModalButton);
      buttonContainer.appendChild(button);
    });

    content.appendChild(buttonContainer);
    modal.appendChild(content);
    app.appendChild(modal);
  }

  function handleModalButton(event) {
    if (step === 0 && event.target.textContent === "Bad") {
      step = 3;
    } else {
      step++;
    }

    if (step >= modalContent.length) {
      document.querySelector(".fixed").remove();
    } else {
      document.querySelector(".fixed").remove();
      showModal();
    }
  }

  function showCrypto(crypto) {
    const qrContainer = document.querySelector(".qr-container");
    const cryptoInfos = document.querySelectorAll(".crypto-info");

    cryptoInfos.forEach(info => {
      info.classList.remove("show");
    });

    const selectedCryptoInfo = document.getElementById(crypto);
    selectedCryptoInfo.classList.add("show");
  }

  app.innerHTML = `
    <div class="container">
      <div class="buttons">
        <button onclick="showCrypto('btc')">BTC</button>
        <button onclick="showCrypto('eth')">ETH</button>
        <button onclick="showCrypto('ltc')">LTC</button>
      </div>
      <div class="qr-container">
        <div class="crypto-info" id="btc">
          <img src="${qrCodes.btc}" alt="BTC QR Code">
          <p>${addresses.btc}</p>
        </div>
        <div class="crypto-info" id="eth">
          <img src="${qrCodes.eth}" alt="ETH QR Code">
          <p>${addresses.eth}</p>
        </div>
        <div class="crypto-info" id="ltc">
          <img src="${qrCodes.ltc}" alt="LTC QR Code">
          <p>${addresses.ltc}</p>
        </div>
      </div>
    </div>
  `;

  showModal();
});
