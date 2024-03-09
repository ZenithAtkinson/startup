//Ripped from Simon
function login() {
  const nameEl = document.querySelector("#name");
  const userName = nameEl.value;
  localStorage.setItem("userName", userName);

  // Immediately use fetch to interact with the server after setting the username
  fetch(`/api/user/${encodeURIComponent(userName)}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('User found:', data.username);
      // Proceed with redirection or additional actions here after successful fetch
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Handle errors or failed fetch operation here
    });
}