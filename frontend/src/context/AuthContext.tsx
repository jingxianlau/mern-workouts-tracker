import React, {
  ReactNode,
  Reducer,
  createContext,
  useEffect,
  useReducer
} from 'react';

type AuthState = {
  email: string;
  username: string;
  token: string;
} | null;

type AuthAction =
  | {
      type: 'LOGIN';
      payload: AuthState;
    }
  | { type: 'LOGOUT' };

export type AuthContextValue = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const authReducer: Reducer<AuthState, AuthAction> = (
  state: AuthState,
  action: AuthAction
) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, null);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
