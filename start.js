function createGame() {
  const gamePin = generatePin();
  localStorage.setItem("gamePin", gamePin);
  const main = document.querySelector("main");
  main.innerHTML = 
        `<div class="text-center">
            <h1>Game Pin: ${gamePin}</h1>
            <button onclick="startGame()" class="btn btn-primary" id="startGame">Start Game</button>

            <div style="padding: 5vh 0">
              <h2>Players</h2>
              <ul class="list-group" id="playerList">
              </ul>
            </div>
        </div>`;
  addPlayers();
}

async function addPlayers() {
  localStorage.removeItem("players");
  const playerList = document.getElementById("playerList");
  const players = ['John', 'Jane', 'Doe', 'Bob', 'Alice'];
  playerList.innerHTML = '';
  let currPlayers = [];
  for (let i = 0; i < 5; i++) {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(i % 2 === 0 ? 250 : 1000);
    console.log("Adding player: " + players[i]);
    playerList.innerHTML += `<li class="list-group-item">${players[i]}</li>`;
    currPlayers.push(players[i]);
    localStorage.setItem("players", JSON.stringify(currPlayers));
  }
}

function startGame() {
  const gamePin = localStorage.getItem("gamePin");
  if (gamePin === null) {
    alert("No game pin found");
    return;
  }
  window.location.href = "game.html";
}

function generatePin() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let gamePin = '';
  for (let i = 0; i < 4; i++) {
    gamePin += letters.charAt(Math.floor(Math.random() * 26));
  }
  console.log("Game pin: " + gamePin);
  return gamePin;
}

function joinGame() {
  const gamePin = document.getElementById("gamePinInput").value;
  localStorage.setItem("gamePin", gamePin);
  window.location.href = "game.html";
}