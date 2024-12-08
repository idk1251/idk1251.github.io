const allowedUsers = ["inhxle", "zirjagor", "test1", "test2", "test3", "tests"];
const rewardedUsers = [];
const signInButton = document.getElementById("sign-in-button");
const modal = document.getElementById("sign-in-modal");
const closeModal = document.getElementById("close-modal");
const submitSignIn = document.getElementById("submit-sign-in");
const usernameInput = document.getElementById("username-input");
const userProfile = document.getElementById("user-profile");
const usernameSpan = document.getElementById("username");
const claimButton = document.getElementById("claim-tokens-button");
const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");
const signInBtnHome = document.getElementById('sign-in-btn-home');

// Page navigation
navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const targetPage = button.getAttribute("data-page");

    pages.forEach(page => {
      if (page.id === `${targetPage}-page`) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
  });
});

// Open sign-in modal
signInButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close sign-in modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Handle sign-in
submitSignIn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!allowedUsers.includes(username)) {
    alert("You are not the code inhxle yet!");
    return;
  }

  userProfile.style.display = "flex";
  usernameSpan.textContent = username;
  signInButton.style.display = "none";
  modal.style.display = "none";
  claimButton.disabled = false;
});

// Claim tokens
claimButton.addEventListener("click", () => {
  const username = usernameSpan.textContent;
  if (rewardedUsers.includes(username)) {
    alert("You have already claimed 500 tokens!");
    return;
  }

  rewardedUsers.push(username);
  alert("You will receive your 500 tokens very soon, thank you for signing up on code inhxle!");
});

// Redirect to rbxgold when "Sign In Now" button is clicked
signInBtnHome.addEventListener("click", () => {
  window.location.href = 'https://rbxgold.com/r/inhxle';
});
