import React from 'react';

import { StartState } from './startState';

export function StartHome({socket, setStartState, setPlayerList, setGamePin}) {

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
          setPlayerList([username]);
          localStorage.setItem('playerList', JSON.stringify([username]));
          setStartState(StartState.Hosting);
          setGamePin(response.gameID);
        } else {
            alert('Failed to create game');
        }
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
          setGamePin(gamePin);
          setStartState(StartState.Joining);
        } else {
          alert('Failed to join game: ' + response.msg);
        }
    }
    
    return (
        <div className="text-center">
            <h1>Create a New Game</h1>
  
            <button onClick={() => createGame()} className="btn btn-primary" id="createGame">Create New Game</button>             
  
            <h1 className="pt-5">Join Game</h1>
  
            <div className="m-3 form-inline">
                <input type="text" id="gamePinInput" name="gamePin" placeholder="game pin" className="form-control" required />
                <button onClick={() => joinGame()} className="btn btn-primary mt-3">Join Game</button>
            </div>
        </div> 
    );
}