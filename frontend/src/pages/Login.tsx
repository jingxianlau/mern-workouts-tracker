import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useLogin();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await login({ email, password });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email: </label>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password: </label>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type='submit' disabled={isLoading}>
        Login
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Login;
