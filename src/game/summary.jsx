import React from "react";

import './game.css';

export function Summary({gamePin}) {
    return (
        <div className="column">
            <h3 id="game-id" className="text-end mx-5">Game ID: {gamePin}</h3>
            <table className="table text-center table-striped" id="playerTable">
                <thead>
                    <tr>
                        <th><h2>Player</h2></th>
                        <th><h2>Tiles played</h2></th>
                    </tr>
                </thead>
            </table>
            <div className="text-center">
                <h2>Tiles remaining in pile:</h2>
                <h2 id="numTiles" className="text-danger">10</h2>
            </div>
        </div>
    );
}