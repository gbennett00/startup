import React, { useEffect } from 'react';

export function DOMManipulator(props) {
    useEffect(() => {
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
                tile.addEventListener("click", async function() {
                    const selected = document.querySelector(".selected");
                    if (removeTile(tile)) {
                        socket.send(JSON.stringify({type: 'remove', gameID: gamePin, username: username}));
                    }
                    if (selected) {
                        replaceTile(selected, tile);
                        socket.send(JSON.stringify({type: 'place', gameID: gamePin, username: username}));
                        expandTable(tile);

                        const finishedBoard = getBoard();
                        if (document.querySelectorAll("#userPile td").length === 0) {
                            let response = await fetch('/api/checkBoard', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    board: finishedBoard,
                                })
                            }).then(response => response.json());
                            if (response.valid) {
                                response = await fetch('/api/score', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        board: finishedBoard,
                                    })
                                }).then(response => response.json());
                                alert("You win with a score of " + response + "!");
                                window.location.href = "start.html";
                            } else {
                                alert("Invalid word: " + response.word);
                            }
                        }
                    }
                });
                tr.appendChild(tile);
            }
            rows.push(tr);
        }
        board.replaceChildren(...rows);

        const table = document.getElementById("playerTable");
        rows = [];
        if (props.players) {
            // Create player table
            rows = [document.createElement("tr")];
            rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Player</h2>';
            rows[0].appendChild(document.createElement("th")).innerHTML = '<h2>Tiles played</h2>';
            for (let player of props.players) {
                if (player !== username) {
                    const row = document.createElement("tr");
                    row.id = player;
                    row.appendChild(document.createElement("td")).innerHTML = player;
                    row.appendChild(document.createElement("td")).innerHTML = "0/14";
                    rows.push(row);
                }
            }
        }
        table.replaceChildren(...rows);
    
        const startingTiles = 12;
        const totalTiles = document.getElementById("numTiles");
        totalTiles.innerText = startingTiles;
    })

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

    function getBoard() {
        const board = document.getElementById("board");
        let rows = [];
        for (let i = 0; i < board.children.length; i++) {
            let row = [];
            for (let j = 0; j < board.children[i].children.length; j++) {
                let letter = board.children[i].children[j].children[0].innerText
                row.push(letter === "" ? " " : letter);
            }
            rows.push(row);
        }
        return rows;
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
            return false;
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
        return true;
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

    return null;
}