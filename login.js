let database;

if (localStorage.getItem('users') == null) { 
    console.log('Creating database');
    database = new Map();
    database.set('admin', 'admin');
    saveDatabase();
} else {
    updateDatabase();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (database.has(username) && database.get(username) == password) {
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
        saveDatabase();
        window.location = "start.html"; // Redirecting to other page.
        return false;
    }
}

function saveDatabase() {
    localStorage.setItem('users', JSON.stringify(Array.from(database.entries())));
}

function updateDatabase() {
    database = new Map(JSON.parse(localStorage.getItem('users')));
}

