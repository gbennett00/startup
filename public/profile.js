async function setUpProfile() {
    // Get the username from local storage
    let username = localStorage.getItem("username");
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
