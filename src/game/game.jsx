import React from 'react';

import { Summary } from './summary';
import { Pile } from './pile';
import { Board } from './board';
import './game.css';
import { useNavigate } from 'react-router-dom';

export function Game(props) {
  const navigate = useNavigate();

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
      console.log(data);
      if (data.score !== null) {
          const row = document.getElementById(data.username);
          row.children[1].innerText = data.score + "/14";
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

  return (
    <div className="main">
      <Pile />
      <Board />
      <Summary gamePin={props.gamePin}/>
    </div>
  );
}