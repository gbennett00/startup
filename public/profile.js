async function setUpProfile() {
    // Get the username from local storage
    const username = await fetch('/api/user/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        if (data.username) {
            return data.username;
        } else {
            alert('You are not logged in. Please log in to view your profile.');
            window.location = "index.html";
        }
    });
    if (username) {
        document.getElementById("username-display").innerText = "Player: " + username;
    }

    const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json());

    document.getElementById("numWins").innerText = response.wins;
    document.getElementById("highestScoringGame").innerText = response.score;
    document.getElementById("Username").innerText = username;
}

async function deleteProfile() {
    await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.msg);
        if (data.success) {
            window.location = "index.html";
        }
    });
}