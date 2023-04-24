import React from 'react';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    console.log(email, username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Email: </label>
      <input type='email' onChange={e => setEmail(e.target.value)} />

      <label>Username: </label>
      <input type='text' onChange={e => setUsername(e.target.value)} />

      <label>Password: </label>
      <input type='password' onChange={e => setPassword(e.target.value)} />
    </form>
  );
};

export default SignUp;
