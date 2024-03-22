async function setUpProfile() {
    // Get the username from local storage
    const data = await fetch('/api/user/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        if (data.username) {
            return data;
        } else {
            alert('You are not logged in. Please log in to view your profile.');
            window.location = "index.html";
        }
    });
    const username = data.username;
    if (username) {
        document.getElementById("username-display").innerText = "Player: " + username;
    }
    if (!data.isAdmin) {
        const response = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json());
    
        document.getElementById("Username").innerText = username;
        document.getElementById("numWins").innerText = response.wins;
        document.getElementById("highestScoringGame").innerText = response.score;
    } else {
        const response = await fetch("/api/user/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json());

        const table = document.getElementById("profile-table");
        table.innerHTML = "";
        const header = table.createTHead();
        const headerRow = header.insertRow(0);
        const headerCell1 = headerRow.insertCell(0);
        const headerCell2 = headerRow.insertCell(1);
        const headerCell3 = headerRow.insertCell(2);
        headerCell1.innerText = "Username";
        headerCell2.innerText = "Wins";
        headerCell3.innerText = "High Score";

        for (const user of response.users) {
            const row = table.insertRow(-1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            cell1.innerText = user.username;
            cell2.innerText = user.numWins;
            cell3.innerText = user.highScore;
        }        
    }

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