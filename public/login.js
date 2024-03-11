let database = new Map();
database.set('admin', 'admin');

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (database.has(username) && database.get(username) == password) {
        localStorage.setItem('username', username);
        window.location = "start.html"; // Redirecting to other page.
        return false;
    } else {
        alert('Login failed');
    }
}

function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (database.has(username)) {
        alert('Username already exists');
    } else if (username == '' || password == '') {
        alert('Username and password cannot be empty');
    } else {
        database.set(username, password);
        localStorage.setItem('username', username);
        window.location = "start.html"; // Redirecting to other page.
        return false;
    }
}
