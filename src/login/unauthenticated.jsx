import React from 'react';
import './login.css';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function login() {
    console.log("login");

    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: userName, 
            password: password 
        })
    });

    if (response.status === 200) {
      localStorage.setItem('username', userName);
      props.onLogin(userName);
    } else {
      alert('Login failed');
    }
  }

  async function signup() {
    console.log("signup");

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
            username: userName, 
            password: password 
        })
    });
    if (response.status === 409) {
        alert('Username already exists');
    } else if (response.status === 200) {
        localStorage.setItem('username', username);
        props.onLogin(username);
    } else {
        alert('Signup failed');
    }
  }

  return (
    <main className="container-fluid">
      <div className="text-center">
        <p>Login/sign up to play</p>
        <div>
          <label className="text-justify" htmlFor="username">Username</label>
          <input type="text" id="username" onChange={(e) => setUserName(e.target.value)} placeholder="username" value={userName} required/>

          <label htmlFor="password">Password</label>
          <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" required/>

          <div className="p-3">
            <button className="btn btn-primary" id="login" onClick={() => login()}>Login</button>
            <button className="btn btn-primary" id="signup" onClick={() => signup()}>Signup</button>
          </div>
        </div>
      </div>
    </main>);
}