import React from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';

export function Profile({ userName, onAuthChange }) {
  const navigate = useNavigate();

  const [score, setScore] = React.useState(0);
  const [wins, setWins] = React.useState(0);

  async function deleteProfile() {
    await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.msg);
        if (data.success) {
            onAuthChange('', AuthState.Unauthenticated);
            localStorage.removeItem('username');
            navigate('/');
        }
    });
  }

  fetch("/api/profile", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    setScore(data.score);
    setWins(data.wins);
  });
  

  // console.log('username: ', userName);
  // console.log('response: ', response);

  return (
    <main>
        <div>
            <h1 className="text-center">User Profile</h1>
            <table id="profile-table" class="table table-striped-columns">
                <thead>
                    <tr>
                        <td>Username:</td>
                        <td id="Username">{userName}</td>
                    </tr>
                    <tr>
                        <td>Number of Wins:</td>
                        <td id="numWins">{wins}</td>
                    </tr>
                    <tr>
                        <td>Highest Scoring Game:</td>
                        <td id="highestScoringGame">{score}</td>
                    </tr>
                </thead>
            </table>
            <button onClick={() => deleteProfile()} className="btn btn-danger">Delete Profile</button>
        </div>
    </main>
  );
}