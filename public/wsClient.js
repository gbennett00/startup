// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  alert('websocket connected');
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  alert('received:', chat);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  alert('websocket closed');
};

// Send a message over the webSocket
function sendMessage() {
  alert('sending message');
}
