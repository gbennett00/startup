import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className='body'>
      <header class="bg-primary container-fluid">
          <nav class="navbar fixed-top navbar-dark">
            <a class="navbar-brand">WordBlitz<sup>&reg;</sup></a>
            <menu class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="start.html">Start</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="game.html">Game</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="profile.html">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
            </menu>
          </nav>
        </header>
      <main>App components go here</main>
      <footer class="bg-secondary">
          <div>
            <span class="text-reset">Author: Garrett B.</span>
            <a class="text-light px-3" href="https://github.com/gbennett00/startup">GitHub</a>
          </div>
        </footer>
    </div>);
}