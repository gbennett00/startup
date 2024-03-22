let database;

if (localStorage.getItem('users') == null) { 
    console.log('Creating database');
    database = new Map();
    database.set('admin', 'admin');
    saveDatabase();
} else {
    updateDatabase();
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    });

    if (response.status === 200) {
        // TODO : remove this save when other functions rely on db instead of localStorage
        localStorage.setItem('username', username);
        window.location = "start.html"; // Redirecting to other page.
    } else {
        alert('Login failed');
    }
}

async function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username == '' || password == '') {
        alert('Username and password cannot be empty');
        return;
    }
    const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    });
    if (response.status === 409) {
        alert('Username already exists');
    } else {
        // TODO : remove these saves when other functions rely on db instead of localStorage
        database.set(username, password);
        saveDatabase();
        localStorage.setItem('username', username);
        window.location = "start.html"; // Redirecting to other page.;
    }
}

function saveDatabase() {
    localStorage.setItem('users', JSON.stringify(Array.from(database.entries())));
}

function updateDatabase() {
    database = new Map(JSON.parse(localStorage.getItem('users')));
}