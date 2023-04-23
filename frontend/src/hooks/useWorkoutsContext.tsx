import { useContext } from 'react';
import {
  WorkoutsContext,
  WorkoutsContextValue
} from '../context/WorkoutContext';

export const UseWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  return context as WorkoutsContextValue;
};

export default UseWorkoutsContext;
