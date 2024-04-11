import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="container-fluid">
      <div className="text-center">
        <h2>Welcome to WordBlitz</h2>
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated userName={userName} onLogin={(loginUser) => onAuthChange(loginUser, AuthState.Authenticated)} />
        )}
      </div>
    </main>);
}