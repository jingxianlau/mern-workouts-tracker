import { useState } from 'react';
import UseAuthContext from './useAuthContext';

interface User {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = UseAuthContext();

  const login = async (user: User) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
    } else {
      localStorage.setItem('user', JSON.stringify(json));

      dispatch({
        type: 'LOGIN',
        payload: json
      });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
