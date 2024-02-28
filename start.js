function createGame() {
  const gamePin = generatePin();
  localStorage.setItem("gamePin", gamePin);
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