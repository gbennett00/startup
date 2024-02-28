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

    // initialize pile
    const pile = document.getElementById("userPile");
    const originalTiles = "ANDRWDOGAMEIDE";
    localStorage.setItem("userPile", originalTiles);
    let rows = [];
    let tr = document.createElement("tr");
    for (let i = 0; i < originalTiles.length; i++) {
        if (i % 3 === 0) {
            rows.push(tr);
            tr = document.createElement("tr");
        }
        const tile = document.createElement("td");
        tile.innerHTML = "<div>" + originalTiles[i] + "</div>";
        tile.addEventListener("click", pileClickListener);
        tr.appendChild(tile);
    }
    rows.push(tr);
    pile.replaceChildren(...rows);

    // Initialize board
    const board = document.getElementById("board");
    rows = [];
    for (let i = 0; i < 5; i++) {
        tr = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("td");
            tile.innerHTML = "<div></div>";
            tile.addEventListener("click", function() {
                const selected = document.querySelector(".selected");
                removeTile(tile);
                if (selected) {
                    replaceTile(selected, tile);
                    expandTable(tile);

                    if (document.querySelectorAll("#userPile td").length === 0) {
                        alert("You win!");
                        window.location.href = "start.html";
                    }
                }
            });
            tr.appendChild(tile);
        }
        rows.push(tr);
    }
    board.replaceChildren(...rows);

    // Create player table
    const table = document.getElementById("playerTable");
    rows = [document.createElement("tr")];
    rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Player</h2>';
    rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Tiles played</h2>';

    const players = JSON.parse(localStorage.getItem("players"));
    if (players) {
        for (let player of players) {
            const row = document.createElement("tr");
            row.id = player;
            row.appendChild(document.createElement("td")).innerHTML = player;
            row.appendChild(document.createElement("td")).innerHTML = "0/12";
            rows.push(row);

            localStorage.setItem(player + "-tiles-played", "0");
            localStorage.setItem(player + "-tiles", "12");
        }
    }
    table.replaceChildren(...rows);

    const startingTiles = 12;
    const totalTiles = document.getElementById("numTiles");
    totalTiles.innerText = startingTiles;
    localStorage.setItem("numTiles", startingTiles);
    
    // mockWebSocket(players, startingTiles);
}

function peel() {
    const selected = document.querySelector(".selected");
    if (!selected) {
        alert("Please select a tile to peel");
        return;
    }

    const tiles = parseInt(localStorage.getItem("numTiles"));
    if (tiles < 3) {
        alert("Not enough tiles to peel");
        return;
    }
    localStorage.setItem("numTiles", tiles - 2);
    const totalTiles = document.getElementById("numTiles");
    totalTiles.innerText = tiles - 2;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pile = document.getElementById("userPile");
    let lastRow = pile.children[pile.children.length-1];
    for (let i = 0; i < 3; i++) {
        const newTile = document.createElement("td");
        newTile.innerHTML = "<div>" + letters[Math.floor(Math.random() * 26)] + "</div>";
        newTile.addEventListener("click", pileClickListener);
        if (lastRow.children.length === 3) {
            const newRow = document.createElement("tr");
            pile.appendChild(newRow);
            lastRow = newRow;
        }
        if (i === 0) {
            const td = selected.parentElement;
            console.log(td);
            console.log(td.parentElement);
            td.innerHTML = newTile.innerHTML;
        } else {
            lastRow.appendChild(newTile);
        }
    }
  
}

function replaceTile(selected, tile) {
    const pile = document.getElementById("userPile");
    const lastRow = pile.children[pile.children.length-1];
    const lastTile = lastRow.children[lastRow.children.length-1];
    const movedTile = selected.parentElement;

    if (movedTile !== lastTile) {
        movedTile.replaceChildren(lastTile.children[0]);
    }
    tile.replaceChildren(selected);
    selected.classList.remove("selected");
    lastRow.removeChild(lastTile);
    if (lastRow.children.length === 0) {
        pile.removeChild(lastRow);
    }
}

function removeTile(tile) {
    if (tile.innerHTML === "<div></div>") {
        // do nothing if blank tile
        return;
    }
    const pile = document.getElementById("userPile");
    let lastRow = pile.children[pile.children.length-1];
    if (lastRow.children.length === 3) {
        const newRow = document.createElement("tr");
        pile.appendChild(newRow);
        lastRow = newRow;
    }
    const newTile = document.createElement("td");
    newTile.appendChild(tile.children[0].cloneNode(true));
    newTile.addEventListener("click", pileClickListener);
    lastRow.appendChild(newTile);

    // remove from board
    tile.innerHTML = "<div></div>";
}

function expandTable(tile) {
    const board = document.getElementById("board");
    const row = tile.parentElement;
    let rowLength = row.children.length;

    if (row === board.children[board.children.length-1]) {
        const newNode = document.createElement("tr");
        for (let i = 0; i < rowLength; i++) {
            const newTile = document.createElement("td");
            newTile.innerHTML = "<div></div>";
            newTile.addEventListener("click", function() {
                const selected = document.querySelector(".selected");
                removeTile(newTile);
                if (selected) {
                    replaceTile(selected, newTile);
                    expandTable(newTile);
                }
            });
            newNode.appendChild(newTile);
        }
        board.appendChild(newNode);
    } else if (row === board.children[0]) {
        const newNode = document.createElement("tr");
        for (let i = 0; i < rowLength; i++) {
            const newTile = document.createElement("td");
            newTile.innerHTML = "<div></div>";
            newTile.addEventListener("click", function() {
                const selected = document.querySelector(".selected");
                removeTile(newTile);
                if (selected) {
                    replaceTile(selected, newTile);
                    expandTable(newTile);
                }
            });
            newNode.appendChild(newTile);
        }
        board.prepend(newNode);
    }

    if (tile === row.children[rowLength-1]) {
        for (const row in board.children) {
            const newNode = document.createElement("td");
            newNode.innerHTML = "<div></div>";
            newNode.addEventListener("click", function() {
                const selected = document.querySelector(".selected");
                removeTile(newNode);
                if (selected) {
                    replaceTile(selected, newNode);
                    expandTable(newNode);
                }
            });
            board.children[row].appendChild(newNode);
        }
    } else if (tile === row.children[0]) {
        for (const row in board.children) {
            const newNode = document.createElement("td");
            newNode.innerHTML = "<div></div>";
            newNode.addEventListener("click", function() {
                const selected = document.querySelector(".selected");
                removeTile(newNode);
                if (selected) {
                    replaceTile(selected, newNode);
                    expandTable(newNode);
                }
            });
            board.children[row].prepend(newNode);
        }
    }
}

function pileClickListener() {
    const tile = this;
    if (tile.children[0].classList.contains("selected")) {
        tile.children[0].classList.remove("selected");
        return;
    }
    const prev = document.querySelector(".selected");
    if (prev) {
        prev.classList.remove("selected");
    }
    tile.children[0].classList.add("selected");
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
