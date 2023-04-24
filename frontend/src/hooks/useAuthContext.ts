import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '../context/AuthContext';

const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextValue;
};

export default UseAuthContext;
