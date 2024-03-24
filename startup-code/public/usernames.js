document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username'); // Assume username is stored in localStorage
  if (username) {
      displayWelcomeMessage(username);
  } else {
      // Ensure login form is visible and welcome message is hidden if not logged in
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('welcomeMessage').style.display = 'none';
  }
});

function displayWelcomeMessage(username) {
  // Hide login form and display welcome message
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('welcomeMessage').style.display = 'block';
  document.getElementById('usernameDisplay').textContent = username; // Display the username
}
