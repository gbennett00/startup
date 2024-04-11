import React from 'react';
import { useNavigate } from 'react-router';
import './index.css';

export function Login() {
  const navigate = useNavigate();
  async function login() {
    console.log("login");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    });

    if (response.status === 200) {
      navigate('/start');
    } else {
      alert('Login failed');
    }
  }

  async function signup() {
    console.log("signup");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username == '' || password == '') {
        alert('Username and password cannot be empty');
        return;
    }
    const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        })
    });
    if (response.status === 409) {
        alert('Username already exists');
    } else {
        localStorage.setItem('username', username);
        navigate('/start');
    }
  }

  return (
    <main className="container-fluid">
      <div className="text-center">
        <h2>Welcome</h2>
        <p>Login/sign up to play</p>
        <div>
          <label className="text-justify" htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="username" required/>

          <label htmlFor="password">Password</label>
          <input type="text" id="password" placeholder="password" required/>

          <div className="p-3">
            <button className="btn btn-primary" id="login" onClick={() => login()}>Login</button>
            <button className="btn btn-primary" id="signup" onClick={() => signup()}>Signup</button>
          </div>
        </div>
      </div>
    </main>);
}