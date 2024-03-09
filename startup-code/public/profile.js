// username is username variable, sotre in storage as userName

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


  //FOR USERNAME AND PASSWORD CHANGE
  
});
function changeUsername() {
  const oldName = localStorage.getItem('userName');
  const newName = document.getElementById('new-name').value;

  fetch(`/user/${encodeURIComponent(oldName)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newUsername: newName}),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Net Error');
    }
    localStorage.setItem('userName', newName);
    window.location.reload(); //Refreshing
  })
  .catch(error => {
    console.error('FAILURE', error);
  });
}

function changePassowrd() {//UNSUED //THIS NEEDS TO BE UPDATED WITH WEBSOCKET STUFF SO PASSWORDS CAN BE UPDATED.
  const newPassword = document.getElementById('new-password').value;

  //to local storage
  localStorage.setItem('userName', newName);
}
