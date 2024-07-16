document.addEventListener("DOMContentLoaded", function() {
  let selectedCrypto = null;
  let showIntroduction = true;
  let introductionStep = 1;

  const handleCryptoSelect = (crypto) => {
    selectedCrypto = crypto;
    document.getElementById("selectedCrypto").textContent = crypto.toUpperCase() + " Address";
    document.getElementById("qrCode").src = "/placeholder.svg"; // Update this with actual QR code links
    document.getElementById("cryptoModal").style.display = "flex";
  };

  const handleClose = () => {
    selectedCrypto = null;
    document.getElementById("cryptoModal").style.display = "none";
  };

  const handleIntroductionNext = () => {
    if (introductionStep === 1) {
      introductionStep = 2;
      document.getElementById("introductionText").innerHTML = `
        <h1 class="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Welcome!</h1>
        <p class="text-[#b3b3b3]">This website is designed by me (discord: s6eg4se54g), I have worked very hard on this website for my donators!</p>
      `;
    } else if (introductionStep === 2) {
      introductionStep = 3;
      document.getElementById("introductionText").innerHTML = `
        <h1 class="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Donations are welcome!</h1>
        <p class="text-[#b3b3b3]">Donations will help me in education and my own life decisions!</p>
      `;
    } else if (introductionStep === 3) {
      showIntroduction = false;
      document.getElementById("introductionModal").style.display = "none";
    } else if (introductionStep === 4) {
      showIntroduction = false;
      document.getElementById("introductionModal").style.display = "none";
    }
  };

  const handleIntroductionBad = () => {
    introductionStep = 4;
    document.getElementById("introductionText").innerHTML = `
      <h1 class="text-3xl font-bold tracking-tight text-[#f0f0f0] sm:text-4xl">Oh, I'm sorry to hear that!</h1>
      <p class="text-[#b3b3b3]">I hope your day gets better. Please let me know if there's anything I can do to help.</p>
    `;
  };

  document.getElementById("cryptoModalClose").addEventListener("click", handleClose);
  document.querySelectorAll(".cryptoButton").forEach(button => {
    button.addEventListener("click", (e) => {
      handleCryptoSelect(e.target.dataset.crypto);
    });
  });
  document.getElementById("introductionNext").addEventListener("click", handleIntroductionNext);
  document.getElementById("introductionBad").addEventListener("click", handleIntroductionBad);
});

