import { useState } from 'react';
import UseAuthContext from './useAuthContext';

export interface User {
  email: string;
  username: string;
  password: string;
}

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = UseAuthContext();

  const signup = async (user: User, confirm: string) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch('http://localhost:4000/api/users/signup', {
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

  return { signup, isLoading, error };
};
