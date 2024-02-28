function setUpPage() {
    // Display username
    const username = localStorage.getItem("username");
    const display = document.getElementById("username-display");
    if (username && display) {
        display.textContent = "Player: " + username;
    }

    // Get the game pin from local storage
    let gamePin = localStorage.getItem("gamePin");
    if (gamePin) {
        document.getElementById("game-id").innerText = "Game ID: " + gamePin;
    } else {
        alert("Please create or join a game");
        window.location.href = "start.html";
    }

    // Create player table
    const table = document.getElementById("playerTable");
    const rows = [document.createElement("tr")];
    rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Player</h2>';
    rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Tiles played</h2>';

    const players = JSON.parse(localStorage.getItem("players"));
    if (players) {
        for (let player of players) {
            const row = document.createElement("tr");
            row.id = player;
            row.appendChild(document.createElement("td")).innerHTML = player;
            row.appendChild(document.createElement("td")).innerHTML = "0/16";
            rows.push(row);

            localStorage.setItem(player + "-tiles-played", "0");
            localStorage.setItem(player + "-tiles", "16");
        }
    }
    table.replaceChildren(...rows);

    let tiles = 10; 
    
    // mockWebSocket(players, tiles);
}

async function mockWebSocket(players, tiles) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    while (tiles > 0) {
        await delay(Math.random() * 1000);
        const player = players[Math.floor(Math.random() * players.length)];
        console.log("Updating %s's tiles", player);
        let tilesPlayed = parseInt(localStorage.getItem(player + "-tiles-played"));
        let tilesLeft = parseInt(localStorage.getItem(player + "-tiles"));

        if (Math.floor(Math.random() * 10) < 9) {
            // player places tile
            tilesPlayed++;
            if (tilesPlayed == tilesLeft) {
                // split
                if (tiles < players.length) {
                    // bananagrams!!
                    alert("Player " + player + " wins");
                    window.location.href = "start.html";
                    return;
                }
                for (const player of players) {
                    const tilesLeft = parseInt(localStorage.getItem(player + "-tiles"));
                    localStorage.setItem(player + "-tiles", tilesLeft + 1);
                }
                tilesLeft++;
                tiles -= players.length;
            }
            document.getElementById(player).children[1].innerText = tilesPlayed + "/" + tilesLeft;
        } else if (tiles > 3) {
            // random player peels
            tilesLeft += 3;
            tiles -= 3;
            document.getElementById(player).children[1].innerText = tilesPlayed + "/" + tilesLeft;
        }

        localStorage.setItem(player + "-tiles-played", tilesPlayed);
        localStorage.setItem(player + "-tiles", tilesLeft);
        const totalTiles = document.getElementById("numTiles");
        totalTiles.innerText = tiles;
    }
}
