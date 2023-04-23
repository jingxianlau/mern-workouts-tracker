import React, { Reducer } from 'react';
import { ReactNode, createContext, useReducer } from 'react';
import { Workout } from '../types';

type WorkoutsState = Workout[];

type WorkoutsAction =
  | {
      type: 'CREATE_WORKOUT' | 'DELETE_WORKOUT';
      payload: Workout;
    }
  | { type: 'SET_WORKOUTS'; payload: Workout[] };

export type WorkoutsContextValue = {
  state: WorkoutsState;
  dispatch: React.Dispatch<WorkoutsAction>;
};

export const WorkoutsContext = createContext<WorkoutsContextValue | null>(null);

export const workoutsReducer: Reducer<WorkoutsState, WorkoutsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return action.payload;
    case 'CREATE_WORKOUT':
      return [...state, action.payload];
    case 'DELETE_WORKOUT':
      return state.filter(workout => workout._id !== action.payload._id);
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const WorkoutsContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, []);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
