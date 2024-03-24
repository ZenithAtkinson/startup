//Unused
document.addEventListener('DOMContentLoaded', () => {
    checkUserLoggedIn();
});

function checkUserLoggedIn() {
    const email = localStorage.getItem('email');
    if (email) {
        setDisplay('authControls', 'none');
        setDisplay('userControls', 'block');
        document.querySelector('#loggedInUser').textContent = `Logged in as: ${email}`;
    } else {
        setDisplay('authControls', 'block');
        setDisplay('userControls', 'none');
    }
}

function signUp() {
    const email = document.querySelector('#email')?.value;
    const password = document.querySelector('#password')?.value;
    const response = fetch('/api/auth/create', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    response.then((res) => {
        if (res.ok) {
            alert('Signup successful. You can now login.');
            localStorage.setItem('email', email);
            window.location.href = 'index.html';
        } else {
            res.json().then(body => {
                // Specific check for the email already taken error
                if (body.msg.includes('User already exists')) {
                    alert('Email already taken. Please use a different email.');
                } else {
                    alert(`Error during signup: ${body.msg}`);
                }
            });
        }
    }).catch(error => {
        console.error('Signup failed:', error);
    });
}

function login() {
    const email = document.querySelector('#email')?.value;
    const password = document.querySelector('#password')?.value;
    const response = fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    response.then((res) => {
        if (res.ok) {
            localStorage.setItem('email', email);
            window.location.href = 'profile.html'; // Adjust as necessary
        } else {
            alert('Login failed. Please check your credentials.');
        }
    }).catch(error => {
        console.error('Login failed:', error);
    });
}

function logout() {
    localStorage.removeItem('email');
    fetch('/api/auth/logout', {
        method: 'DELETE',
    }).then(() => {
        window.location.href = 'index.html';
    }).catch(error => {
        console.error('Logout failed:', error);
    });
}

function setDisplay(selector, displayStyle) {
    const element = document.querySelector(`#${selector}`);
    if (element) {
        element.style.display = displayStyle;
    }
}

// Bind form submission for signup and login forms if they exist on the page
document.querySelector('#signupForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    signUp();
});

document.querySelector('#loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    login();
});

// Optionally, bind the logout function to a logout button if it exists
document.querySelector('#logoutButton')?.addEventListener('click', logout);
