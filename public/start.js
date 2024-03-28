// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  console.log('websocket opened');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const data = JSON.parse(text);
  const playerList = document.getElementById("playerList");
  if (!!playerList) {
    playerList.innerHTML += `<li class="list-group-item">${data.username}</li>`;
  } else {
    alert(data.username + ' joined game: ' + data.gameID);
  }
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  socket.send('user left game')
  console.log('websocket closed');
};

async function setUsername() {
   // Get the username from local storage
  let username = await fetch('/api/user/me', {
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
  document.getElementById("username-display").innerText = "Player: " + username;
}

async function createGame() {
  const response = await fetch('/api/game/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => response.json());

  if (response.gameID) {
    localStorage.setItem("gamePin", response.gameID);
    const username = localStorage.getItem("username");
    if (username === null) {
      alert("Please login before creating a game");
      return;
    }
    socket.send(JSON.stringify({gameID: response.gameID, username: username}));
    const main = document.querySelector("main");
    main.innerHTML = 
          `<div class="text-center">
              <h1>Game Pin: ${response.gameID}</h1>
              <button onclick="startGame()" class="btn btn-primary" id="startGame">Start Game</button>
  
              <div style="padding: 5vh 0">
                <h2>Players</h2>
                <ul class="list-group" id="playerList">
                  <li class="list-group-item">${username}</li>
                </ul>
              </div>
          </div>`;
  } else {
      alert('Failed to create game');
  }
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

async function joinGame() {
  const response = await fetch('/api/game/join', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({gameID: document.getElementById("gamePinInput").value})
  }).then(response => response.json());

  if (response.success) {
    const gamePin = document.getElementById("gamePinInput").value;
    socket.send(JSON.stringify({gameID: gamePin, username: response.username}));
    localStorage.setItem("gamePin", gamePin);
    const main = document.querySelector("main");
    main.innerHTML = 
          `<div class="text-center">
              <h1>Waiting on game admin to start</h1>
          </div>`;
  } else {
      alert('Failed to join game: ' + response.msg);
  }
}