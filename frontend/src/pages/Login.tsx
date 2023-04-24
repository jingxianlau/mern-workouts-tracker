import React, { useState } from 'react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email: </label>
      <input type='email' onChange={e => setEmail(e.target.value)} />

      <label>Password: </label>
      <input type='password' onChange={e => setPassword(e.target.value)} />

      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
