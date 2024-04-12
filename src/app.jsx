import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Start } from './start/start';
import { Game } from './game/game';
import { Profile } from './profile/profile';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('username') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [gamePin, setGamePin] = React.useState(localStorage.getItem('gamePin') || '');

  return (
    <BrowserRouter>
      <div className='body'>
        <header className='bg-primary container-fluid'>
            <nav className='navbar fixed-top navbar-dark'>
              <a className='navbar-brand'>WordBlitz<sup>&reg;</sup></a>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to=''>Home</NavLink>
                </li>
                {authState === AuthState.Authenticated  && 
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='start'>Start</NavLink>
                  </li>
                }
                {authState === AuthState.Authenticated  && 
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='game'>Game</NavLink>
                  </li>
                }
                {authState === AuthState.Authenticated  && 
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='profile'>Profile</NavLink>
                  </li>
                }
                <li className='nav-item'>
                  <NavLink className='nav-link' to='about'>About</NavLink>
                </li>
              </menu>
            </nav>
        </header>
        <Routes>
          <Route path='/' element={
            <Login 
              userName={userName} 
              authState={authState} 
              onAuthChange={(userName, authState) => {
                setUserName(userName);
                setAuthState(authState);
              }}/>
            } exact />
          <Route path='/start' element={<Start gamePin={gamePin} setGamePin={setGamePin}/>} />
          <Route path='/game' element={<Game />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <footer className='bg-secondary'>
            <div>
              <span className='text-reset'>Author: Garrett B.</span>
              <a className='text-light px-3' href='https://github.com/gbennett00/startup'>GitHub</a>
            </div>
        </footer>
      </div>
    </BrowserRouter>);
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknowwn. </main>;
}

export default App;