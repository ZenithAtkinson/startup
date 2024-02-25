//Ripped from Simon
function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "index.html";
  }
  function updateWelcomeMessage() {
    const userName = localStorage.getItem("userName");
    if (userName) {
      document.querySelector("#welcome-message").textContent = `Welcome, ${userName}`;
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    updateWelcomeMessage();
  });