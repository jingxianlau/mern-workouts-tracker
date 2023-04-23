import React, { Reducer } from 'react';
import { ReactNode, createContext, useReducer } from 'react';
import { Workout } from '../types';

interface WorkoutsState {
  workouts: Workout[];
}

interface WorkoutsAction {
  type: 'SET_WORKOUTS' | 'CREATE_WORKOUTS';
  payload: Workout[];
}

export const WorkoutsContext = createContext({});

export const workoutsReducer: Reducer<WorkoutsState, WorkoutsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload };
    case 'CREATE_WORKOUTS':
      return {
        workouts: [...action.payload, ...state.workouts]
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const WorkoutsContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: []
  });

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
