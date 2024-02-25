document.addEventListener('DOMContentLoaded', function() {
  const username = localStorage.getItem('userName');
  if (username) {
    document.getElementById('welcome-message').textContent = `Welcome, ${username}`;
    document.getElementById('logged-in?').style.display = 'block';
    
    //logout button
    document.getElementById('logout-button').addEventListener('click', function() {
      localStorage.removeItem('userName');
      window.location.href = 'index.html'; 
    });
  } else {
    document.getElementById('not-loggedin').style.display = 'block';
  }
});
