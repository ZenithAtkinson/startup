window.onload = function() {
    var userName = localStorage.getItem('userName');
    if (userName) {
        //for login-sect div
      document.getElementById('login-sect').innerHTML = 'Welcome, ' + userName;
    }
  };
  