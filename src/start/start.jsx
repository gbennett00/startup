import React from 'react';

import { StartHome } from './startHome';
import { Hosting } from './hosting';
import { StartState } from './startState';
import { useNavigate } from 'react-router-dom';

export function Start({gamePin, setGamePin}) {
  const navigate = useNavigate();

  const [startState, setStartState] = React.useState(StartState.StartHome); 
  const [playerList, setPlayerList] = React.useState(JSON.parse(localStorage.getItem('playerList')) || []); 
  
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
    
    if (data.type === 'join') {
      console.log('playerlist before: ' + playerList);
      const newList = [...playerList, data.username];
      setPlayerList(newList);
      localStorage.setItem('playerList', JSON.stringify(playerList));
      console.log('playerlist after: ' + playerList);
    } else if (data.type === 'leave') {
      if (data.host) {
        alert('Host left game');
        setStartState(StartState.StartHome);
        navigate('/start');
      }
      alert(data.username + ' left game');
      newList = [...playerList];
      newList.splice(newList.indexOf(data.username), 1);
      setPlayerList(newList);
      localStorage.setItem('playerList', JSON.stringify(playerList));
    } else if (data.type === 'start') {
      navigate('/game');
    }
  };

  // If the webSocket is closed then return to start
  socket.onclose = (event) => {
    alert('connection reset');
    setStartState(StartState.StartHome);
    navigate('/start');
  };

  console.log('playerList: ' + playerList);

  return (
    <main className='container-fluid text-center'>
      {startState === StartState.StartHome && 
        <StartHome socket={socket} setStartState={setStartState} setPlayerList={setPlayerList} setGamePin={setGamePin}/>
      }
      {startState === StartState.Hosting &&
        <Hosting socket={socket} playerList={playerList} gamePin={gamePin}/>
      }
      {startState === StartState.Joining &&
        <Joining />
      }
    </main>
  );
}

function Joining() {
  return (
    <div className="text-center">
      <h1>Waiting on game admin to start</h1>
    </div>
  );
}
