import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    props.onLogout();
    fetch(`/api/user/logout`, {
      method: 'delete',
    })
    .catch(() => {
    // Logout failed. Assuming offline
    })
    .finally(() => {
    localStorage.removeItem('userName');
    props.onLogout();
    });
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/start')}>
        Start
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
