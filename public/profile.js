async function setUpProfile() {
    // Get the username from local storage
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username-display").innerText = "Player: " + username;
    }

    const score = await fetch("/api/score", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json());

    document.getElementById("numWins").innerText = score;
    document.getElementById("highestScoringGame").innerText = 72;
    document.getElementById("Username").innerText = username;
}
