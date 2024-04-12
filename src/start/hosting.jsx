import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hosting({socket, playerList, gamePin}) {
    const navigate = useNavigate();

    function startGame() {
        const gamePin = localStorage.getItem("gamePin");
        if (gamePin === null) {
          alert("No game pin found");
          return;
        }
        socket.send(JSON.stringify({type: 'start', gameID: gamePin}));
        navigate('/game');
    }

    console.log('player list in hosting: ' + playerList);
    const playerRows = [];
    playerList.forEach(player => {
        playerRows.push(<li className="list-group-item" key={player}>{player}</li>);
    });

    return (
        <div className="text-center">
            <h1>Game Pin: {gamePin}</h1>
            <button onClick={() => startGame()} className="btn btn-primary" id="startGame">Start Game</button>

            <div> 
                {/* //style="padding: 5vh 0" */}
                <h2>Players</h2>
                <ul className="list-group" id="playerList">
                    {playerRows} 
                </ul>
            </div>
        </div>
    );
}