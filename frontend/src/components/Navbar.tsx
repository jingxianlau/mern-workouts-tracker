import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import UseAuthContext from '../hooks/useAuthContext';

const Navbar: React.FC = () => {
  const { state } = UseAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Workout Buddy</h1>
        </Link>
        {state.username ? (
          <nav>
            <h3>{state.username}</h3>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
