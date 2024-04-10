// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  console.log('websocket opened');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
    const data = JSON.parse(event.data);
  const playerList = document.getElementById("playerList");
  if (data.type === 'join') {
    if (!!playerList) {
      playerList.innerHTML += `<li class="list-group-item">${data.username}</li>`;
    } else {
      alert(data.username + ' joined game: ' + data.gameID);
    }
  } else if (data.type === 'leave') {
    if (data.host) {
      alert('Host left game');
      window.location = "start.html";
    }

    if (!!playerList) {
      console.log('removing player: ' + data.username);
      playerList.innerHTML = playerList.innerHTML.replace(`<li class="list-group-item">${data.username}</li>`, '');
    } else {
      alert(data.username + ' left game');
    }
  } else if (data.type === 'start') {
    window.location = "game.html";
  }
};

// If the webSocket is closed then return to start
socket.onclose = (event) => {
  alert('connection reset');
  window.location = "start.html";
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
    socket.send(JSON.stringify({type: 'create', gameID: response.gameID, username: username, host:true}));
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

function startGame() {
  const gamePin = localStorage.getItem("gamePin");
  if (gamePin === null) {
    alert("No game pin found");
    return;
  }
  socket.send(JSON.stringify({type: 'start', gameID: gamePin}));
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
    socket.send(JSON.stringify({type: 'join', gameID: gamePin, username: response.username, host: false}));
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