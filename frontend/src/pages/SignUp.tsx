import React, { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signup, isLoading, error } = useSignUp();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    await signup({ email, username, password }, confirmPassword);

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email: </label>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label>Username: </label>
      <input
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <label>Password: </label>
      <input
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {password && (
        <>
          <label>Confirm Password:</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={
              confirmPassword && password !== confirmPassword ? 'error' : ''
            }
          />
        </>
      )}

      <button
        type='submit'
        disabled={isLoading || password !== confirmPassword}
      >
        Sign Up
      </button>
      {error && <div className='error'>{error}</div>}
      {confirmPassword && password !== confirmPassword && (
        <div className='error'>Passwords do not Match</div>
      )}
    </form>
  );
};

export default SignUp;
