import React, { ReactNode, createContext, useReducer } from 'react';

interface State {
  email: null | string;
  username: null | string;
}

interface Action {
  type: 'LOGIN' | 'LOGOUT';
  payload: State;
}

export type AuthContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return { email: null, username: null };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    email: null,
    username: null
  });

  console.log(state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
