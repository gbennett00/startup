import React from 'react';

import { Summary } from './summary';
import { DOMManipulator } from './DOMManipulator';
import './game.css';
import { useNavigate } from 'react-router-dom';

export function Game(props) {
  const navigate = useNavigate();

  const [players, setPlayers] = React.useState([]);

  // Adjust the webSocket protocol to what is being used for HTTP
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

  // Display that we have opened the webSocket
  socket.onopen = (event) => {
    console.log('websocket opened');
    socket.send(JSON.stringify({type: 'init', gameID: props.gamePin, username: props.username}));
  };

  // Display messages we receive from our friends
  socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.score !== null) {
          const row = document.getElementById(data.username);
          if (row) {
            row.children[1].innerText = data.score + "/14";
          }
      }
  };

  // If the webSocket is closed then return to start
  socket.onclose = (event) => {
    alert('connection reset');
    navigate('/start');
  };

  if (!props.userName) {
    navigate('/start');
    return null;
  }

  // Get the game pin from local storage
  if (!props.gamePin) {
      alert("Please create or join a game");
      navigate('/start');
  }

  if (players.length === 0) {
    fetch('/api/players', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json()
    .then(data => setPlayers(data.players)));
  }

  return (
    <div className="main">
      <div className="column">
          <h1>Tiles</h1>
          <table id="userPile"></table>
      </div>
      <div className="column text-center">
          <table id="board"></table>        
      </div>
      <DOMManipulator players={players} userName={props.userName}/>
      <Summary gamePin={props.gamePin}/>
    </div>
  );
}