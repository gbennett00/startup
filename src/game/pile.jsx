import React from 'react';

import './game.css';

export function Pile() {
    return (
        <div className="column">
            <h1>Tiles</h1>
            <table id="userPile">
                <tbody>
                    <tr>
                        <td>
                            <div>A</div>
                        </td>
                        <td>
                            <div>I</div>
                        </td>
                        <td>
                            <div>C</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>Q</div>
                        </td>
                        <td>
                            <div>T</div>
                        </td>
                        <td>
                            <div>V</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>O</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}